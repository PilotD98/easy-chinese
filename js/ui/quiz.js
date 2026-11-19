/* Question generation for the Pinyin stage and a single-question renderer
   shared by lesson quizzes, the stage exam, review sessions and mock exams.

   Question shape:
   { kind: 'choice' | 'typed' | 'listen' | 'draw' | 'order',
     itemId, type, prompt: { zh?, pinyin?, text?, audio?, hint?, node?, markup?, markupPinyin? },
     options: [..], optionsZh?: bool, optionsPinyin?: [..parallel pinyin..],
     answer, accepted: [..], why: 'short explanation shown on mistakes' } */
import { h, icon, zh } from './dom.js';
import { speak, canSpeak } from './audio.js';
import { livePinyin, judge, numberedToMarked, syllables, markedToNumbered } from '../engine/pinyin.js';
import { tracePad } from './tracepad.js';
import { markupText } from './zhtext.js';
import { t, meaningOf, tr } from '../i18n/index.js';

export const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const pick = (arr, n, exclude) => shuffle([...new Set(arr.filter((x) => x !== exclude && x != null))]).slice(0, n);

/* ---------- generators (Pinyin stage) ---------- */

/** Hear a word, pick its pinyin. */
export function qListenPinyin(word, pool) {
  const distractors = pick(pool.filter((w) => w.id !== word.id && w.pinyin !== word.pinyin).map((w) => w.pinyin), 3, word.pinyin);
  return { kind: 'listen', itemId: word.id, type: 'listening', prompt: { audio: word.zh, hint: t('q_hint_which_pinyin') }, options: shuffle([word.pinyin, ...distractors]), answer: word.pinyin, why: t('q_why_heard', { zh: word.zh, py: word.pinyin, m: meaningOf(word) }) };
}

/** Change the tones of a word's syllables to make tone distractors. */
function toneVariants(word, n = 3) {
  const syls = syllables(word.pinyin);
  const out = new Set();
  let guard = 0;
  while (out.size < n && guard++ < 60) {
    const alt = syls.map((s) => {
      const change = syls.length === 1 || Math.random() < 0.6;
      let tone = s.tone;
      if (change) { const choices = [1, 2, 3, 4].filter((x) => x !== s.tone); tone = choices[Math.floor(Math.random() * choices.length)]; }
      return numberedToMarked(s.base.replace(/ü/g, 'v') + (tone || 5));
    }).join(' ');
    if (alt !== word.pinyin) out.add(alt);
  }
  return [...out];
}

/** Hear a word, pick the right tones (options differ only by tone). */
export function qToneListen(word) {
  const distractors = toneVariants(word, 3);
  return { kind: 'listen', itemId: word.id, type: 'tone', prompt: { audio: word.zh, zh: word.zh, hint: t('q_hint_which_tones') }, options: shuffle([word.pinyin, ...distractors]), answer: word.pinyin, why: t('q_why_tones', { zh: word.zh, py: word.pinyin, m: meaningOf(word) }) };
}

/** See the characters and meaning (and hear it), type the pinyin with tone numbers. */
export function qPinyinTyped(word) {
  return { kind: 'typed', itemId: word.id, type: 'reading', prompt: { zh: word.zh, audio: word.zh, hint: `${meaningOf(word)} · ${t('q_hint_type_pinyin')}` }, accepted: [word.num, word.pinyin], answer: word.pinyin, why: t('q_why_pinyin', { zh: word.zh, py: word.pinyin, num: word.num }) };
}

/** Hear and see a word, pick its meaning. */
export function qWordMeaning(word, pool) {
  const distractors = pick(pool.filter((w) => w.id !== word.id).map((w) => meaningOf(w)), 3, meaningOf(word));
  return { kind: 'choice', itemId: word.id, type: 'recognition', prompt: { zh: word.zh, pinyin: word.pinyin, audio: word.zh, hint: t('q_hint_meaning') }, options: shuffle([meaningOf(word), ...distractors]), answer: meaningOf(word), why: t('q_why_means', { zh: word.zh, py: word.pinyin, m: meaningOf(word) }) };
}

/** Hear a sound unit's sample, pick the sound (tone / initial / final) among its group. */
export function qSoundListen(unit, pool) {
  const distractors = pick(pool.filter((u) => u.id !== unit.id && u.char !== unit.char).map((u) => u.char), 3, unit.char);
  const s = unit.sample || {};
  return { kind: 'listen', itemId: unit.id, type: 'listening', prompt: { audio: s.zh, hint: t('q_hint_which_sound', { kind: tr(unit, 'label') ? '' : '' }) }, options: shuffle([unit.char, ...distractors]), answer: unit.char, why: t('q_why_sound', { zh: s.zh, py: s.pinyin, sound: unit.char, label: tr(unit, 'label') }) };
}

/** Handwriting: draw the character on the pad, then self-grade. */
export function qDraw(item, strokeData) {
  return { kind: 'draw', itemId: item.id, type: 'handwriting', prompt: { text: item.pinyinLabel || item.pinyin, hint: `${item.meaning || ''} · ${t('q_hint_draw')}` }, answer: item.char || item.zh, strokeData, why: t('q_why_draw', { py: item.pinyinLabel || item.pinyin, zh: item.char || item.zh }) };
}

/** A mixed quiz for one or more pinyin groups. */
export function pinyinQuiz(units, words, { n = 12, pool = units, wordPool = words, listening = canSpeak() } = {}) {
  const qs = [];
  const us = shuffle(units.filter((u) => u.sample?.zh));
  const ws = shuffle(words);
  let ui = 0, wi = 0;
  const nextUnit = () => us[ui++ % us.length];
  const nextWord = () => ws[wi++ % ws.length];
  let i = 0;
  while (qs.length < n && (us.length || ws.length)) {
    const slot = i % 5;
    if (slot === 0 && us.length && listening && pool.length >= 4) qs.push(qSoundListen(nextUnit(), pool));
    else if (slot === 1 && ws.length && listening && wordPool.length >= 4) qs.push(qListenPinyin(nextWord(), wordPool));
    else if (slot === 2 && ws.length) qs.push(listening ? qToneListen(nextWord()) : qPinyinTyped(nextWord()));
    else if (slot === 3 && ws.length) qs.push(qPinyinTyped(nextWord()));
    else if (ws.length) qs.push(wordPool.length >= 4 ? qWordMeaning(nextWord(), wordPool) : qPinyinTyped(nextWord()));
    else if (us.length && pool.length >= 4) qs.push(qSoundListen(nextUnit(), pool));
    else break;
    i++;
  }
  for (let k = 1; k < qs.length; k++) if (qs[k].itemId === qs[k - 1].itemId && k + 1 < qs.length) [qs[k], qs[k + 1]] = [qs[k + 1], qs[k]];
  return qs.slice(0, n);
}

/* ---------- renderer ---------- */

/**
 * renderQuestion(container, q, { onAnswer(result) })
 * result: { correct: boolean, close: boolean, given, q }
 * Returns a cleanup function.
 */
export function renderQuestion(container, q, { onAnswer, autoplay = true, silent = false } = {}) {
  container.replaceChildren();
  let answered = false;
  const keyHandlers = [];

  const promptEl = h('div', { class: 'q-prompt' });
  if (q.prompt.node) promptEl.append(q.prompt.node);
  if (q.prompt.markup) promptEl.append(markupText(q.prompt.markup, q.prompt.markupPinyin, { cls: 'q-zh q-markup' }));
  if (q.prompt.zh) promptEl.append(q.prompt.pinyin ? h('div', { class: 'q-zh zh-xl' }, markupText(q.prompt.zh, q.prompt.pinyin)) : zh(q.prompt.zh, 'zh-xl q-zh'));
  if (q.prompt.text) promptEl.append(h('div', { class: 'q-text' }, q.prompt.text));
  if (q.prompt.audio) {
    const play = h('button', { class: 'btn btn-lg', type: 'button', onClick: () => speak(q.prompt.audio) }, icon('speak'), t('play_again'));
    promptEl.append(play);
    if (autoplay && canSpeak()) setTimeout(() => speak(q.prompt.audio), 150);
  }
  if (q.prompt.hint) promptEl.append(h('div', { class: 'q-hint muted' }, q.prompt.hint));
  if (q.prompt.zh && !q.prompt.audio && canSpeak()) {
    promptEl.append(h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), onClick: () => speak(q.prompt.zh) }, icon('speak')));
  }
  container.append(promptEl);

  const feedback = h('div', { class: 'q-feedback', 'aria-live': 'assertive' });
  const finish = (correct, given, { close = false } = {}) => {
    if (answered) return;
    answered = true;
    if (silent) { onAnswer?.({ correct, close, given, q }); return; }
    feedback.className = `q-feedback ${correct ? 'is-correct' : 'is-wrong'}`;
    feedback.replaceChildren(
      h('div', { class: 'q-verdict' }, icon(correct ? 'check' : 'close'), correct ? (close ? t('correct_typo') : t('correct')) : t('not_quite')),
      h('div', { class: 'q-why' }, q.why)
    );
    if ((q.prompt.zh || q.answerAudio) && canSpeak() && autoplay) speak(q.answerAudio || q.prompt.zh);
    onAnswer?.({ correct, close, given, q });
  };

  if (q.kind === 'choice' || q.kind === 'listen') {
    const list = h('div', { class: 'q-options', role: 'group', 'aria-label': t('answers') });
    q.options.forEach((opt, idx) => {
      const label = q.optionsPinyin?.[idx] ? markupText(opt, q.optionsPinyin[idx]) : h('span', { lang: q.optionsZh ? 'zh-Hans' : null }, opt);
      const b = h('button', { class: `btn btn-lg q-option ${q.optionsZh ? 'zh' : ''} ${/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(opt) && !q.optionsZh ? 'q-py' : ''}`, type: 'button', lang: q.optionsZh ? 'zh-Hans' : null, dataset: { idx: String(idx + 1), value: opt } }, h('kbd', { class: 'q-key', 'aria-hidden': 'true' }, String(idx + 1)), label);
      b.addEventListener('click', () => {
        if (answered) return;
        const correct = opt === q.answer;
        if (!silent) b.classList.add(correct ? 'is-correct' : 'is-wrong'); else b.classList.add('is-chosen');
        if (!correct && !silent) [...list.children].find((c) => c.dataset.value === q.answer)?.classList.add('is-correct');
        [...list.children].forEach((c) => { c.disabled = true; });
        finish(correct, opt);
      });
      list.append(b);
    });
    container.append(list);
    keyHandlers.push((e) => { const n = Number(e.key); if (n >= 1 && n <= q.options.length && !answered) { list.children[n - 1].click(); } });
  } else if (q.kind === 'typed') {
    const input = h('input', { class: 'input q-input', type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', 'aria-label': t('your_answer'), enterkeyhint: 'done', placeholder: q.placeholder || 'ni3 hao3' });
    const preview = h('div', { class: 'q-ime', 'aria-live': 'polite' });
    let composing = false;
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => { composing = false; });
    input.addEventListener('input', () => {
      if (composing) return;
      const v = input.value;
      preview.textContent = /[a-z]/i.test(v) && /[1-5]/.test(v) ? livePinyin(v) : '';
    });
    const typoRow = h('div', { class: 'row', hidden: true });
    const submit = () => {
      if (answered) return;
      const given = input.value.trim();
      if (!given) return;
      const verdict = judge(given, q.accepted);
      if (verdict === 'exact') { input.classList.add('is-correct'); finish(true, given); }
      else if (verdict === 'close' && typoRow.hidden) {
        typoRow.hidden = false;
        typoRow.replaceChildren(h('span', { class: 'muted' }, t('almost_typo')),
          h('button', { class: 'btn', type: 'button', onClick: () => { input.classList.add('is-correct'); finish(true, given, { close: true }); } }, t('yes_typo')),
          h('button', { class: 'btn', type: 'button', onClick: () => { input.classList.add('is-wrong'); finish(false, given); } }, t('no_mark_wrong')));
      } else { input.classList.add('is-wrong'); finish(false, given); }
      if (answered) input.disabled = true;
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    const go = h('button', { class: 'btn btn-primary', type: 'button', onClick: submit }, t('check'));
    const dontKnow = h('button', { class: 'btn', type: 'button', onClick: () => { input.classList.add('is-wrong'); input.disabled = true; finish(false, ''); } }, t('dont_know'));
    container.append(h('div', { class: 'q-typed' }, input, preview, h('div', { class: 'small muted center' }, t('typing_hint')), typoRow, h('div', { class: 'btn-row' }, go, dontKnow)));
    setTimeout(() => input.focus(), 50);
  } else if (q.kind === 'order') {
    const chosen = [];
    const answerLine = h('div', { class: 'q-order-line zh', lang: 'zh-Hans', 'aria-live': 'polite' });
    const tiles = h('div', { class: 'q-tiles', role: 'group', 'aria-label': t('pieces') });
    const refresh = () => { answerLine.textContent = chosen.join(''); };
    q.tiles.forEach((tile) => {
      const b = h('button', { class: 'btn q-tile zh', type: 'button', lang: 'zh-Hans' }, tile);
      b.addEventListener('click', () => { if (answered) return; if (b.classList.toggle('is-used')) chosen.push(tile); else chosen.splice(chosen.indexOf(tile), 1); refresh(); });
      tiles.append(b);
    });
    const check = h('button', { class: 'btn btn-primary', type: 'button', onClick: () => {
      if (answered) return;
      const given = chosen.join('');
      const correct = given === q.answer;
      if (!silent) answerLine.classList.add(correct ? 'is-correct' : 'is-wrong');
      if (!correct && !silent) answerLine.append(h('div', { class: 'small muted' }, t('answer_colon'), ' ', zh(q.answer)));
      finish(correct, given);
    } }, t('check'));
    const reset = h('button', { class: 'btn', type: 'button', onClick: () => { if (answered) return; chosen.length = 0; tiles.querySelectorAll('.is-used').forEach((b) => b.classList.remove('is-used')); refresh(); } }, t('reset'));
    container.append(answerLine, tiles, h('div', { class: 'btn-row' }, check, reset));
  } else if (q.kind === 'draw') {
    const pad = tracePad(q.strokeData, { size: Math.min(280, window.innerWidth - 64), showGuide: false });
    const reveal = h('div', { class: 'row', style: { marginTop: '8px' } },
      h('button', { class: 'btn btn-primary', type: 'button', onClick: () => {
        reveal.replaceChildren(zh(q.answer, 'zh-xl'), h('span', { class: 'muted' }, t('did_you_get_it')),
          h('button', { class: 'btn', type: 'button', onClick: () => finish(true, 'self') }, icon('check'), t('yes')),
          h('button', { class: 'btn', type: 'button', onClick: () => finish(false, 'self') }, icon('close'), t('no')));
      } }, t('show_answer')));
    container.append(pad.el, reveal);
  }

  container.append(feedback);
  const onKey = (e) => { if (e.target.tagName === 'INPUT') return; keyHandlers.forEach((fn) => fn(e)); };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}

/**
 * Run a list of questions with a progress bar and a Continue button.
 * Resolves with { correct, total, missed: [itemId], results: [...] }.
 */
export function runQuiz(container, questions, { title = null, onProgress = null } = {}) {
  return new Promise((resolve) => {
    const results = [];
    let idx = 0;
    let cleanup = null;
    const bar = h('div', { class: 'bar' }, h('span', { style: { width: '0%' } }));
    const counter = h('span', { class: 'small muted' });
    const qArea = h('div', { class: 'q-area' });
    const next = h('button', { class: 'btn btn-primary btn-lg btn-block', type: 'button', hidden: true }, t('continue'));
    const wrap = h('div', { class: 'quiz' }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('strong', null, title || t('quiz')), counter), bar, qArea, next);
    container.replaceChildren(wrap);

    const show = () => {
      if (idx >= questions.length) {
        cleanup?.();
        const correct = results.filter((r) => r.correct).length;
        resolve({ correct, total: questions.length, missed: results.filter((r) => !r.correct).map((r) => r.q.itemId), results });
        return;
      }
      counter.textContent = `${idx + 1} / ${questions.length}`;
      bar.firstChild.style.width = `${(idx / questions.length) * 100}%`;
      next.hidden = true;
      cleanup?.();
      cleanup = renderQuestion(qArea, questions[idx], {
        onAnswer: (r) => { results.push(r); onProgress?.(r); next.hidden = false; next.focus({ preventScroll: true }); }
      });
      qArea.scrollIntoView?.({ block: 'nearest' });
    };
    next.addEventListener('click', () => { idx += 1; show(); });
    const onKey = (e) => { if (e.key === 'Enter' && !next.hidden && e.target.tagName !== 'INPUT') { e.preventDefault(); next.click(); } };
    document.addEventListener('keydown', onKey);
    const origResolve = resolve;
    resolve = (v) => { document.removeEventListener('keydown', onKey); origResolve(v); };
    show();
  });
}
