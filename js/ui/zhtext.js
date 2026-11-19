/* Chinese text with pinyin scaffolding (display levels 3 and 4).
     3  characters with pinyin ruby above every character
     4  characters only; tap a character to reveal its pinyin
   One syllable maps to one character; erhua (花儿 huār) attaches the r to
   the preceding syllable. For sentences, the level of each character is the
   weakest level among vocabulary records that contain it. */
import { h } from './dom.js';
import { syllables } from '../engine/pinyin.js';
import { effectiveLevel, levelOf } from '../engine/scaffold.js';
import { settings } from '../store/settings.js';
import { tokenize } from '../content/hsk.js';
import { t } from '../i18n/index.js';

const HAN = /\p{Script=Han}/u;

/**
 * Split text with its pinyin into segments [{ text, ruby? }], one per Han
 * character (ruby = its syllable as written), punctuation/latin without ruby.
 */
export function pinyinSegments(text, pinyin) {
  const chars = [...String(text || '')];
  const syls = syllables(pinyin || '').map((s) => s.text);
  const hanCount = chars.filter((c) => HAN.test(c)).length;
  const out = [];
  let si = 0;
  const erhua = syls.length < hanCount; // fewer syllables than characters: 儿 shares its syllable
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (!HAN.test(c)) { out.push({ text: c }); continue; }
    if (erhua && c === '儿' && i > 0 && HAN.test(chars[i - 1]) && /r$/i.test(syls[si - 1] || '')) { out.push({ text: c, ruby: '' }); continue; }
    out.push({ text: c, ruby: syls[si++] || '' });
  }
  return out;
}

function rubyEl(text, ruby, { level, forced }) {
  const l = forced ? 3 : effectiveLevel(level);
  const r = h('ruby', { class: `zt ${l >= 4 ? 'zt-hidden' : ''}`, lang: 'zh-Hans' }, text);
  r.append(h('rp', null, '('), h('rt', { class: 'py' }, ruby), h('rp', null, ')'));
  if (l >= 4) {
    r.setAttribute('tabindex', '0'); r.setAttribute('role', 'button'); r.setAttribute('aria-label', t('tap_to_show_pinyin', { ch: text, py: ruby }));
    const toggle = () => r.classList.toggle('is-revealed');
    r.addEventListener('click', toggle);
    r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  }
  return r;
}

/** A single vocabulary word with pinyin according to its record. */
export function vocabWord(v, rec, { cls = '', forced = false } = {}) {
  const wrap = h('span', { class: `zw zh ${cls}`.trim(), lang: 'zh-Hans' });
  const level = v.pinyinException ? 3 : levelOf(rec);
  for (const sg of pinyinSegments(v.zh, v.pinyin)) wrap.append(sg.ruby !== undefined ? rubyEl(sg.text, sg.ruby, { level, forced: forced || v.pinyinException }) : sg.text);
  if (settings.get('traditional') && v.trad && v.trad !== v.zh) wrap.append(h('span', { class: 'trad', lang: 'zh-Hant' }, ` (${v.trad})`));
  return wrap;
}

/** Characters with pinyin always shown (used in the Pinyin stage and quizzes). */
export function zhRuby(text, pinyin, { cls = '', level = 3 } = {}) {
  const wrap = h('span', { class: `zw zh ${cls}`.trim(), lang: 'zh-Hans' });
  for (const sg of pinyinSegments(text, pinyin)) wrap.append(sg.ruby !== undefined ? rubyEl(sg.text, sg.ruby, { level, forced: level === 3 }) : sg.text);
  return wrap;
}

/**
 * A sentence with pinyin. `pinyin` is the full reading; `records` maps vocab
 * id -> progress record; `lv` is the loaded level for tokenising.
 */
export function sentence(text, { pinyin = null, records = new Map(), lv = null, cls = '' } = {}) {
  const wrap = h('span', { class: `zt-sentence zh ${cls}`.trim(), lang: 'zh-Hans' });
  const segs = pinyinSegments(text, pinyin);
  // level per character: weakest vocab record covering it (default 3 = show pinyin)
  const levels = new Array([...text].length).fill(null);
  if (lv) {
    let i = 0;
    for (const tok of tokenize(lv, text)) {
      const n = [...tok.text].length;
      if (tok.vocab) {
        const rec = records.get(tok.vocab.id);
        const l = tok.vocab.pinyinException ? 3 : levelOf(rec);
        for (let k = 0; k < n; k++) levels[i + k] = l;
      }
      i += n;
    }
  }
  segs.forEach((sg, idx) => {
    if (sg.ruby === undefined) { wrap.append(sg.text); return; }
    wrap.append(rubyEl(sg.text, sg.ruby, { level: levels[idx] ?? 3, forced: !pinyin ? false : false }));
  });
  return wrap;
}

/** Plain characters with ruby always visible (prompts, exercise choices). */
export function markupText(text, pinyin, { cls = '' } = {}) {
  const wrap = h('span', { class: `zh ${cls}`.trim(), lang: 'zh-Hans' });
  if (!pinyin) { wrap.textContent = text; return wrap; }
  for (const sg of pinyinSegments(text, pinyin)) wrap.append(sg.ruby !== undefined ? rubyEl(sg.text, sg.ruby, { level: 3, forced: true }) : sg.text);
  return wrap;
}

/** "简体 (繁體)" text when the traditional setting is on. */
export function withTrad(zh, trad) {
  if (settings.get('traditional') && trad && trad !== zh) return `${zh} (${trad})`;
  return zh;
}
