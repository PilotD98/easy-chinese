/* Mock HSK: question generators in the real exam's section format.
   HSK 1–2:  Listening (听力) + Reading (阅读), 100 points each, pass at 120 / 200.
   HSK 3–6:  Listening + Reading + Writing (书写), 100 each, pass at 180 / 300.
   Sections (scaled to fewer questions, times scaled to match):
     L  word recognition, sentence comprehension (from listening drills)
     R  words in context, grammar choice, passages (and pinyin matching at HSK 1–2)
     W  sentence composition (order), write the character (draw)
   Everything here is an estimate. */
import { canSpeak } from './audio.js';
import { shuffle, pick } from './quiz.js';
import { tr, meaningOf, t } from '../i18n/index.js';

/* ---- Listening ---- */
function qListenWord(v, pool) {
  const distractors = pick(pool.filter((x) => x.id !== v.id && x.pinyin !== v.pinyin).map((x) => x.zh), 3, v.zh);
  return { kind: 'listen', section: 'L', sub: 'word', itemId: v.id, prompt: { audio: v.zh, hint: t('q_hint_which_word') }, options: shuffle([v.zh, ...distractors]), optionsZh: true, answer: v.zh, why: t('q_why_heard', { zh: v.zh, py: v.pinyin, m: meaningOf(v) }) };
}
function qListenComp(l, it, q) {
  return { kind: 'listen', section: 'L', sub: 'comprehension', itemId: l.id, prompt: { audio: it.text, markup: q.q, hint: t('listen_then_answer') }, options: q.choices, optionsZh: true, answer: q.choices[q.answer], why: `${tr(q, 'why')} (${tr(it, 'en', 'ja')})` };
}
function qListenTrueFalse(ex) {
  // "Does the sentence match the meaning?" — a yes/no judgement like HSK listening part 1
  return null;
}

/* ---- Reading ---- */
function qPinyinMatch(v, pool) {
  const same = pool.filter((x) => x.id !== v.id && x.zh.length === v.zh.length).map((x) => x.pinyin);
  const distractors = pick(same.length >= 3 ? same : pool.filter((x) => x.id !== v.id).map((x) => x.pinyin), 3, v.pinyin);
  return { kind: 'choice', section: 'R', sub: 'pinyin', itemId: v.id, prompt: { zh: v.zh, hint: t('q_hint_which_pinyin') }, options: shuffle([v.pinyin, ...distractors]), answer: v.pinyin, why: t('q_why_pinyin', { zh: v.zh, py: v.pinyin, num: v.num }) };
}
function tokenizeWords(lv, text) {
  const out = []; let i = 0;
  while (i < text.length) {
    const s = lv.surfaces.find((sf) => sf.length > 1 && text.startsWith(sf, i));
    if (s) { out.push({ text: s, vocab: lv.vocabBySurface.get(s)[0] }); i += s.length; } else { out.push({ text: text[i] }); i++; }
  }
  return out;
}
/** Context: a grammar example with one vocabulary word blanked out. */
function qContext(lv, ex, pool) {
  const toks = tokenizeWords(lv, ex.zh);
  const cands = toks.filter((tk) => tk.vocab && tk.text.length >= 2);
  if (!cands.length) return null;
  const target = cands[Math.floor(Math.random() * cands.length)];
  const blanked = ex.zh.replace(target.text, '（　）');
  const samePos = pool.filter((x) => x.id !== target.vocab.id && x.pos?.[0] === target.vocab.pos?.[0]).map((x) => x.zh);
  const distractors = pick(samePos.length >= 3 ? samePos : pool.map((x) => x.zh), 3, target.text);
  return { kind: 'choice', section: 'R', sub: 'context', itemId: target.vocab.id, prompt: { zh: blanked, hint: tr(ex, 'en', 'ja') }, options: shuffle([target.text, ...distractors]), optionsZh: true, answer: target.text, why: `${ex.zh}: ${target.text} = ${meaningOf(target.vocab)}.` };
}
function qGrammarFill(g) {
  const x = g.exercises.find((e) => e.type === 'fill' || e.type === 'choose');
  if (!x) return null;
  return { kind: 'choice', section: 'R', sub: 'grammar', itemId: g.id, prompt: { markup: x.prompt, markupPinyin: x.promptPinyin }, options: shuffle(x.choices), optionsZh: true, answer: x.answer, why: `${tr(x, 'why')} (${tr(g, 'title')})` };
}
function qPassage(r, q) {
  return { kind: 'choice', section: 'R', sub: 'reading', itemId: r.id, prompt: { markup: r.text, markupPinyin: r.pinyin, markupSub: q.q, hint: r.title }, options: q.choices, optionsZh: true, answer: q.choices[q.answer], why: tr(q, 'why') };
}

/* ---- Writing ---- */
function qCompose(g) {
  const x = g.exercises.find((e) => e.type === 'order');
  if (!x) return null;
  return { kind: 'order', section: 'W', sub: 'composition', itemId: g.id, prompt: { text: tr(x, 'prompt'), hint: t('q_hint_order') }, tiles: shuffle(x.choices), answer: x.answer, why: `${tr(x, 'why')} (${tr(g, 'title')})` };
}
function qWriteChar(k, strokes) {
  return { kind: 'draw', section: 'W', sub: 'character', itemId: k.id, prompt: { text: k.pinyin[0], hint: `${meaningOf(k)} · ${t('q_hint_draw')}` }, answer: k.char, strokeData: strokes, why: t('q_why_draw', { py: k.pinyin[0], zh: k.char }) };
}

export function hasWriting(levelId) { return !/^hsk[12]$/.test(levelId); }

/** Build the sections. Counts are smaller than the real exam; times are scaled to match. */
export function buildMock(lv) {
  const writing = hasWriting(lv.id);
  const exs = lv.grammar.flatMap((g) => g.examples);
  const comps = lv.listening.filter((l) => l.type === 'comprehension').flatMap((l) => l.items.flatMap((it) => (it.questions || []).map((q) => qListenComp(l, it, q))));
  const L = canSpeak() ? [...shuffle(lv.vocab).slice(0, 8).map((v) => qListenWord(v, lv.vocab)), ...shuffle(comps).slice(0, 8)] : [];
  const R = [
    ...(writing ? [] : shuffle(lv.vocab).slice(0, 5).map((v) => qPinyinMatch(v, lv.vocab))),
    ...shuffle(exs).map((ex) => qContext(lv, ex, lv.vocab)).filter(Boolean).slice(0, writing ? 8 : 6),
    ...shuffle(lv.grammar).map(qGrammarFill).filter(Boolean).slice(0, 8),
    ...shuffle(lv.readings).slice(0, 2).flatMap((r) => r.questions.map((q) => qPassage(r, q)))
  ];
  const W = writing ? [
    ...shuffle(lv.grammar).map(qCompose).filter(Boolean).slice(0, 5),
    ...shuffle(lv.chars.filter((k) => lv.strokes[k.char])).slice(0, 5).map((k) => qWriteChar(k, lv.strokes[k.char]))
  ] : [];
  return [
    { id: 'L', title: t('exam_sec_listening'), minutes: 12, questions: L },
    { id: 'R', title: t('exam_sec_reading'), minutes: 18, questions: R },
    { id: 'W', title: t('exam_sec_writing'), minutes: 12, questions: W }
  ].filter((s) => s.questions.length);
}

/** Score sections into the HSK-style estimate (100 per section). */
export function scoreMock(sections, results, levelId = 'hsk1') {
  const writing = hasWriting(levelId);
  const pct = (id) => { const qs = results.filter((r) => r.section === id); return qs.length ? qs.filter((r) => r.correct).length / qs.length : null; };
  const l = pct('L'), r = pct('R'), w = writing ? pct('W') : null;
  const sec = { L: l == null ? null : Math.round(l * 100), R: r == null ? null : Math.round(r * 100), W: w == null ? null : Math.round(w * 100) };
  const max = writing ? 300 : 200;
  const passMark = writing ? 180 : 120;
  const total = (sec.L ?? 0) + (sec.R ?? 0) + (sec.W ?? 0);
  const complete = sec.L != null && sec.R != null && (!writing || sec.W != null);
  const passed = complete ? total >= passMark : null;
  const bySub = {};
  for (const x of results) { const k = `${x.section}:${x.sub}`; bySub[k] = bySub[k] || { correct: 0, total: 0, ids: new Set() }; bySub[k].total++; if (x.correct) bySub[k].correct++; else bySub[k].ids.add(x.itemId); }
  return { sec, total, max, passMark, passed, complete, bySub: Object.fromEntries(Object.entries(bySub).map(([k, v]) => [k, { ...v, ids: [...v.ids] }])) };
}

export const SUB_KEYS = { 'L:word': 'sub_listen_word', 'L:comprehension': 'sub_listen_comp', 'R:pinyin': 'sub_read_pinyin', 'R:context': 'sub_read_context', 'R:grammar': 'sub_read_grammar', 'R:reading': 'sub_read_passage', 'W:composition': 'sub_write_compose', 'W:character': 'sub_write_char' };
