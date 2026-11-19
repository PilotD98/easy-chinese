/* Question generators for HSK-level content: characters, vocabulary, grammar. */
import { shuffle, pick, qDraw } from './quiz.js';
import { canSpeak } from './audio.js';
import { t, tr, meaningOf, meaningsOf } from '../i18n/index.js';

/* ---------- characters ---------- */
export function qCharMeaning(k, pool) {
  const distractors = pick(pool.filter((x) => x.id !== k.id).map((x) => meaningOf(x)), 3, meaningOf(k));
  return { kind: 'choice', itemId: k.id, type: 'recognition', prompt: { zh: k.char, hint: t('q_hint_meaning') }, options: shuffle([meaningOf(k), ...distractors]), answer: meaningOf(k), why: `${k.char} (${k.pinyin.join(', ')}): ${meaningsOf(k, ', ')}. ${tr(k, 'mnemonic') || ''}` };
}
export function qCharPinyin(k) {
  return { kind: 'typed', itemId: k.id, type: 'reading', prompt: { zh: k.char, hint: `${meaningOf(k)} · ${t('q_hint_type_pinyin')}` }, accepted: [...(k.num || []), ...(k.pinyin || [])], answer: k.pinyin[0], why: t('q_why_pinyin', { zh: k.char, py: k.pinyin.join(' / '), num: (k.num || []).join(' / ') }) };
}
export function qCharFromMeaning(k, pool) {
  const distractors = pick(pool.filter((x) => x.id !== k.id).map((x) => x.char), 3, k.char);
  return { kind: 'choice', itemId: k.id, type: 'recall', prompt: { text: meaningOf(k), hint: t('q_hint_which_char') }, options: shuffle([k.char, ...distractors]), optionsZh: true, answer: k.char, answerAudio: k.char, why: `${meaningOf(k)}: ${k.char} (${k.pinyin[0]}). ${tr(k, 'mnemonic') || ''}` };
}
export function qCharDraw(k, strokes) {
  return qDraw({ id: k.id, char: k.char, pinyinLabel: k.pinyin[0], meaning: meaningOf(k) }, strokes);
}

/* ---------- vocabulary ---------- */
export function qVocabMeaning(v, pool) {
  const distractors = pick(pool.filter((x) => x.id !== v.id).map((x) => meaningOf(x)), 3, meaningOf(v));
  return { kind: 'choice', itemId: v.id, type: 'recognition', prompt: { zh: v.zh, hint: t('q_hint_meaning') }, options: shuffle([meaningOf(v), ...distractors]), answer: meaningOf(v), why: t('q_why_means', { zh: v.zh, py: v.pinyin, m: meaningsOf(v) }) };
}
export function qVocabPinyin(v) {
  return { kind: 'typed', itemId: v.id, type: 'reading', prompt: { zh: v.zh, hint: `${meaningOf(v)} · ${t('q_hint_type_pinyin')}` }, accepted: [v.num, v.pinyin], answer: v.pinyin, why: t('q_why_pinyin', { zh: v.zh, py: v.pinyin, num: v.num }) };
}
export function qVocabRecall(v) {
  return { kind: 'typed', itemId: v.id, type: 'production', prompt: { text: meaningOf(v), hint: t('q_hint_type_chinese') }, accepted: [v.zh, v.num, v.pinyin, v.trad].filter(Boolean), answer: v.zh, answerAudio: v.zh, why: t('q_why_recall', { m: meaningOf(v), zh: v.zh, py: v.pinyin }) };
}
export function qVocabListen(v, pool) {
  const distractors = pick(pool.filter((x) => x.id !== v.id && x.pinyin !== v.pinyin).map((x) => x.zh), 3, v.zh);
  return { kind: 'listen', itemId: v.id, type: 'listening', prompt: { audio: v.zh, hint: t('q_hint_which_word') }, options: shuffle([v.zh, ...distractors]), optionsZh: true, answer: v.zh, why: t('q_why_heard', { zh: v.zh, py: v.pinyin, m: meaningOf(v) }) };
}
export function qVocabTone(v) {
  // reuse the pinyin-stage tone question shape through the typed pinyin (tones count)
  return qVocabPinyin(v);
}

/* ---------- grammar ---------- */
export function qGrammar(g, ex = null) {
  const x = ex || g.exercises[Math.floor(Math.random() * g.exercises.length)];
  const base = { itemId: g.id, type: 'grammar', why: `${tr(x, 'why')} (${tr(g, 'title')})` };
  if (x.type === 'fill' || x.type === 'choose') {
    return { ...base, kind: 'choice', prompt: { markup: x.prompt, markupPinyin: x.promptPinyin, hint: tr(g, 'title') }, options: shuffle(x.choices), optionsZh: true, answer: x.answer };
  }
  if (x.type === 'order') {
    return { ...base, kind: 'order', prompt: { text: tr(x, 'prompt'), hint: t('q_hint_order') }, tiles: shuffle(x.choices), answer: x.answer, answerAudio: x.answer };
  }
  return { ...base, kind: 'typed', prompt: { text: tr(x, 'prompt'), hint: t('q_hint_type_chinese') }, accepted: [x.answer, x.answerPinyin].filter(Boolean), answer: x.answer, answerAudio: x.answer };
}

/** Mixed quiz for a unit. `exclude` is a Set of item ids to leave out (marked known). */
export function unitQuiz(lv, unit, { n = 12, exclude = new Set() } = {}) {
  const chars = unit.chars.map((id) => lv.byId.get(id)).filter((k) => k && !exclude.has(k.id));
  const vocab = unit.vocab.map((id) => lv.byId.get(id)).filter((v) => v && !exclude.has(v.id));
  const grammar = unit.grammar.map((id) => lv.byId.get(id)).filter((g) => g && !exclude.has(g.id));
  const qs = [];
  const K = shuffle(chars), V = shuffle(vocab), G = shuffle(grammar);
  if (!K.length && !V.length && !G.length) return qs;
  let ki = 0, vi = 0, gi = 0;
  const nk = () => K[ki++ % K.length], nv = () => V[vi++ % V.length], ng = () => G[gi++ % G.length];
  const listen = canSpeak();
  for (let i = 0; qs.length < n && i < n * 3; i++) {
    const slot = i % 6;
    if (slot === 0 && K.length) qs.push(qCharMeaning(nk(), lv.chars));
    else if (slot === 1 && V.length) qs.push(qVocabMeaning(nv(), lv.vocab));
    else if (slot === 2 && V.length) qs.push(qVocabPinyin(nv()));
    else if (slot === 3 && G.length) qs.push(qGrammar(ng()));
    else if (slot === 4 && K.length) qs.push(qCharPinyin(nk()));
    else if (V.length) qs.push(listen && lv.vocab.length >= 4 ? qVocabListen(nv(), lv.vocab) : qVocabRecall(nv()));
    else if (K.length) qs.push(qCharFromMeaning(nk(), lv.chars));
    else if (G.length) qs.push(qGrammar(ng()));
  }
  for (let k = 1; k < qs.length; k++) if (qs[k].itemId === qs[k - 1].itemId && k + 1 < qs.length) [qs[k], qs[k + 1]] = [qs[k + 1], qs[k]];
  return qs.slice(0, n);
}
