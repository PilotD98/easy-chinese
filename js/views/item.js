/* Item detail: a sound, pinyin-stage word, character, word or grammar point, with its progress.
   Route: #/learn/item/<id> */
import { h, append, icon, zh, formatDate, levelName } from '../ui/dom.js';
import { loadPinyin } from '../content/pinyin-stage.js';
import { parseId } from '../content/ids.js';
import { progress } from '../store/progress.js';
import { strokeDiagram } from '../ui/stroke.js';
import { speak, canSpeak, initAudio } from '../ui/audio.js';
import { zhRuby, vocabWord, sentence } from '../ui/zhtext.js';
import { toneDiagram } from '../ui/tone.js';
import { loadHsk, recordsFor, levelOfChar } from '../content/hsk.js';
import { markKnown, unmarkKnown } from '../engine/known.js';
import { toast } from '../ui/toast.js';
import { t, tr, meaningOf, meaningsOf, isJa } from '../i18n/index.js';
import { settings } from '../store/settings.js';

export const title = 'item';

export async function render(el, id) {
  const p = parseId(id);
  const rec = await progress.get(id);
  await initAudio();
  if (p?.type === 'py' || (p?.type === 'vocab' && p.scope === 'py')) return renderPinyinItem(el, id, p, rec);
  const levelId = p?.type === 'hanzi' ? await levelOfChar(p.slug) : (p?.scope && /^hsk[1-6]$/.test(p.scope) ? p.scope : null);
  if (levelId) return renderHskItem(el, id, p, levelId, rec);
  append(el, [h('h1', null, t('item')), h('div', { class: 'notice' }, icon('info'), h('p', null, t('item_not_in_build'))), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]);
}

async function renderPinyinItem(el, id, p, rec) {
  const py = await loadPinyin();
  const ch = py.charsById.get(id);
  const word = py.wordsById.get(id);
  if (!ch && !word) { append(el, [h('h1', null, t('item_not_found')), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]); return; }
  const group = py.groups.find((g) => g.id === (ch || word).group);
  if (ch) {
    const s = ch.sample || {};
    append(el, [
      h('header', { class: 'page-head' }, h('h1', null, h('span', { class: 'py-big' }, ch.char), ' ', h('span', { class: 'muted' }, tr(ch, 'label'))), h('p', { class: 'lede' }, `${tr(py.data, 'title')} · ${tr(group, 'title')}`)),
      h('section', { class: 'card' },
        s.zh ? h('div', { class: 'row' }, zh(s.zh, 'zh-xl'), h('span', { class: 'muted' }, `${s.pinyin} · ${tr(s, 'en', 'ja')}`), canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(s.zh) }, icon('speak'), t('listen')) : null) : null,
        s.pinyin ? h('div', { style: { marginTop: '8px' } }, toneDiagram(s.pinyin)) : null,
        h('p', { class: 'hint-box' }, h('strong', null, t('how_to_say'), ' '), tr(ch, 'hint')),
        ch.rule ? h('div', { class: 'notice' }, icon('info'), h('p', null, tr(ch, 'rule'))) : null,
        tr(ch, 'mnemonic') ? h('p', { class: 'mnemonic' }, h('strong', null, t('remember'), ' '), tr(ch, 'mnemonic')) : null),
      progressCard(rec, `#/lesson/${group.id}`)
    ]);
  } else {
    append(el, [
      h('header', { class: 'page-head' }, h('h1', null, zhRuby(word.zh, word.pinyin, { cls: 'zh-xl' })), h('p', { class: 'lede' }, `${meaningOf(word)} · ${word.pinyin}`)),
      h('section', { class: 'card' },
        h('div', { class: 'btn-row' }, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(word.zh) }, icon('speak'), t('listen')) : null, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(word.zh, { rate: 0.7 }) }, icon('speak'), t('slow')) : null),
        h('div', { style: { marginTop: '12px' } }, h('h3', null, t('tones')), toneDiagram(word.pinyin))),
      progressCard(rec, `#/lesson/${group.id}`)
    ]);
  }
}

async function renderHskItem(el, id, p, levelId, rec) {
  let lv;
  try { lv = await loadHsk(levelId); } catch { append(el, [h('h1', null, t('item')), h('p', { class: 'muted' }, t('item_not_in_build')), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]); return; }
  let it = lv.byId.get(id);
  if (!it && p.type === 'hanzi') it = lv.charByGlyph.get(p.slug);
  if (!it) { append(el, [h('h1', null, t('item_not_found')), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]); return; }
  const records = await recordsFor(lv);
  const unitHref = `#/unit/${levelId}/${it.unit}`;
  const name = levelName(levelId);
  if (p.type === 'hanzi') {
    const data = lv.strokes[it.char];
    const diagram = data ? strokeDiagram(data, { size: 180, label: it.char }) : null;
    const examples = it.examples.map((x) => lv.allById.get(x)).filter(Boolean);
    append(el, [
      h('header', { class: 'page-head' }, h('h1', null, zh(it.char, 'zh-xl'), ' ', h('span', { class: 'muted' }, meaningsOf(it, ', '))), h('p', { class: 'lede' }, `${name} · ${t('unit_n', { n: it.unit })} · ${t('strokes_n', { n: it.strokes })}${settings.get('traditional') && it.trad !== it.char ? ` · ${t('traditional_colon')} ${it.trad}` : ''}`)),
      h('section', { class: 'card' },
        h('dl', { class: 'kanji-readings' }, h('dt', null, t('pinyin')), h('dd', null, it.pinyin.join(' · ')), it.radical ? h('dt', null, t('radical')) : null, it.radical ? h('dd', { class: 'components' }, h('span', { class: 'pill', lang: 'zh-Hans' }, it.radical), (it.components || []).filter((c) => c !== it.radical).map((r) => h('span', { class: 'pill pill-soft', lang: 'zh-Hans' }, r))) : null),
        h('div', { class: 'row', style: { alignItems: 'flex-start', marginTop: '12px' } }, diagram ? diagram.el : null, h('div', { class: 'btn-row' }, diagram ? h('button', { class: 'btn', type: 'button', onClick: () => diagram.play() }, t('replay_strokes')) : null, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(it.char) }, icon('speak'), t('listen')) : null)),
        tr(it, 'mnemonic') ? h('p', { class: 'mnemonic' }, h('strong', null, t('remember'), ' '), tr(it, 'mnemonic')) : null,
        it.hint && !isJa() ? h('p', { class: 'small muted' }, h('strong', null, t('origin'), ' '), it.hint) : null),
      examples.length ? h('section', { class: 'card' }, h('h2', null, t('words_with'), ' ', zh(it.char)), h('ul', { class: 'vocab-list' }, examples.map((v) => h('li', null, h('a', { href: `#/learn/item/${encodeURIComponent(v.id)}`, class: 'vw' }, vocabWord(v, records.get(v.id))), h('div', { class: 'vm' }, meaningOf(v), h('small', null, v.pinyin)), canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), onClick: () => speak(v.zh) }, icon('speak')) : null)))) : null,
      progressCard(rec, unitHref, { id: it.id, type: 'hanzi' })
    ]);
  } else if (p.type === 'vocab') {
    append(el, [
      h('header', { class: 'page-head' }, h('h1', null, vocabWord(it, rec, { cls: 'zh-xl' })), h('p', { class: 'lede' }, `${meaningsOf(it)} · ${it.pinyin}${settings.get('traditional') && it.trad !== it.zh ? ` · ${it.trad}` : ''}`)),
      h('section', { class: 'card' },
        h('div', { class: 'btn-row' }, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(it.zh) }, icon('speak'), t('listen')) : null, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(it.zh, { rate: 0.7 }) }, icon('speak'), t('slow')) : null),
        h('div', { style: { marginTop: '12px' } }, toneDiagram(it.pinyin)),
        isJa() && it.note_ja ? h('div', { class: 'notice notice-warn' }, icon('info'), h('p', null, h('strong', null, '注意：'), it.note_ja)) : null,
        h('p', { class: 'small muted', style: { marginTop: '12px' } }, `${name} · ${t('unit_n', { n: it.unit })}${it.verified ? ' · ' + t('verified_cedict') : ''}`),
        it.chars?.length ? h('div', null, h('h3', null, t('characters')), h('div', { class: 'char-grid' }, it.chars.map((kid) => { const k = lv.allById.get(kid); return k ? h('a', { class: 'char-chip', href: `#/learn/item/${encodeURIComponent(kid)}` }, zh(k.char, 'zh-xl'), h('span', { class: 'small muted' }, `${k.pinyin[0]} · ${meaningOf(k)}`)) : null; }))) : null),
      progressCard(rec, unitHref, { id: it.id, type: 'vocab' })
    ]);
  } else {
    append(el, [
      h('header', { class: 'page-head' }, h('h1', null, tr(it, 'title')), h('p', { class: 'lede' }, `${tr(it, 'summary')} · ${name} ${t('unit_n', { n: it.unit })}`)),
      h('section', { class: 'card' },
        h('div', { class: 'gram-pattern', lang: 'zh-Hans' }, it.pattern),
        h('p', null, tr(it, 'explanation')),
        h('h2', null, t('examples')),
        it.examples.map((ex) => h('div', { class: 'gram-example' }, h('div', { class: 'row' }, sentence(ex.zh, { pinyin: ex.pinyin, records, lv, cls: 'ex-zh' }), canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), onClick: () => speak(ex.zh) }, icon('speak')) : null), h('div', { class: 'ex-meta' }, ex.pinyin, ' · ', tr(ex, 'en', 'ja')))),
        tr(it, 'mistakes')?.length ? h('div', null, h('h2', null, t('common_mistakes')), h('ul', null, tr(it, 'mistakes').map((m) => h('li', null, m)))) : null),
      progressCard(rec, unitHref)
    ]);
  }
}

function progressCard(rec, lessonHref, knownItem = null) {
  const knownBtn = knownItem ? h('button', { class: `btn known-btn ${rec?.known ? 'is-known' : ''}`, type: 'button', onClick: async (e) => {
    if (rec?.known) { await unmarkKnown(knownItem.id); toast(t('known_removed', { zh: '' })); }
    else { await markKnown([knownItem]); toast(t('known_marked', { zh: '' })); }
    location.reload();
  } }, icon(rec?.known ? 'check' : 'plus'), rec?.known ? t('known_undo') : t('already_know')) : null;
  if (!rec) return h('section', { class: 'card' }, h('h2', null, t('nav_progress')), h('p', { class: 'muted' }, t('not_learned_yet')), h('div', { class: 'btn-row' }, h('a', { class: 'btn', href: lessonHref }, t('open_its_lesson')), knownBtn));
  return h('section', { class: 'card' },
    h('div', { class: 'card-title' }, h('h2', null, t('nav_progress')), rec.known ? h('span', { class: 'pill pill-known' }, t('known_badge')) : null),
    h('div', { class: 'stat-grid' },
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, t(`stage_${rec.stage}`)), h('div', { class: 'stat-label' }, t('mastery_stage'))),
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, rec.due ? formatDate(rec.due, { dateStyle: 'medium' }) : '—'), h('div', { class: 'stat-label' }, t('next_review'))),
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(rec.reps)), h('div', { class: 'stat-label' }, t('reviews_lapses', { n: rec.lapses }))),
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, rec.display >= 4 ? t('pinyin_hidden') : t('pinyin_shown')), h('div', { class: 'stat-label' }, t('display_level')))),
    h('div', { class: 'btn-row', style: { marginTop: '12px' } }, h('a', { class: 'btn', href: `#/review?items=${encodeURIComponent(rec.id)}` }, t('practice_now')), h('a', { class: 'btn', href: lessonHref }, t('open_its_lesson')), knownBtn)
  );
}
