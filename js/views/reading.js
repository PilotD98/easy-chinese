/* Reading passages and listening drills.
   Routes: #/read/hsk1/<readingId>   #/read/hsk1/listen/<listeningId> */
import { h, append, icon, levelName } from '../ui/dom.js';
import { loadHsk, recordsFor, tokenize } from '../content/hsk.js';
import { sentence, vocabWord, markupText } from '../ui/zhtext.js';
import { speak, canSpeak, initAudio, stopSpeaking } from '../ui/audio.js';
import { openSheet } from '../ui/dialog.js';
import { runQuiz } from '../ui/quiz.js';
import { learnItems } from '../engine/scheduler.js';
import { days } from '../store/days.js';
import { toast } from '../ui/toast.js';
import { t, tr, meaningsOf } from '../i18n/index.js';

export const title = 'nav_read';

export async function render(el, ctx) {
  const levelId = ctx.segs[1];
  const isListen = ctx.segs[2] === 'listen';
  const id = decodeURIComponent(ctx.segs[isListen ? 3 : 2] || '');
  const lv = await loadHsk(levelId);
  const item = lv.byId.get(id);
  if (!item) { append(el, [h('h1', null, t('not_found')), h('a', { class: 'btn', href: '#/read' }, t('reading_library'))]); return; }
  await initAudio();
  const records = await recordsFor(lv);
  const startedAt = Date.now();
  const cleanup = () => { stopSpeaking(); days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) }); };
  if (isListen) renderListening(el, lv, item, records); else renderPassage(el, lv, item, records);
  return cleanup;
}

const SPLIT = /(?<=[。！？!?])/;

/* ---------- passage ---------- */
function renderPassage(el, lv, r, records) {
  const sentences = r.text.split(SPLIT).filter((s) => s.trim());
  const pySentences = (r.pinyin || '').split(/(?<=[.!?。！？])/).filter((s) => s.trim());
  const passage = h('div', { class: 'passage', lang: 'zh-Hans' });
  sentences.forEach((s, i) => {
    const node = sentence(s, { pinyin: pySentences[i] || null, records, lv });
    makeTappable(node, lv, records, s);
    passage.append(node, canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen_sentence'), onClick: () => speak(s) }, icon('speak')) : null);
  });

  const translation = h('div', { class: 'translation', hidden: true }, tr(r, 'enText', 'jaText'));
  const quizArea = h('div');
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, r.title), h('p', { class: 'lede' }, `${tr(r, 'en', 'ja')} · ${levelName(lv.id)} ${t('unit_n', { n: r.unit })} · ${t('tap_word_lookup')}`)),
    h('section', { class: 'card' }, passage,
      h('div', { class: 'btn-row', style: { marginTop: '12px' } },
        canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(r.text) }, icon('speak'), t('read_aloud')) : null,
        canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(r.text, { rate: 0.7 }) }, icon('speak'), t('slow')) : null,
        h('button', { class: 'btn', type: 'button', onClick: (e) => { translation.hidden = !translation.hidden; e.currentTarget.lastChild.textContent = translation.hidden ? t('show_translation') : t('hide_translation'); } }, icon('read'), h('span', null, t('show_translation')))),
      translation),
    h('section', { class: 'card' }, h('h2', null, t('questions')), quizArea),
    h('a', { class: 'btn', href: '#/read' }, t('reading_library'))
  ]);
  const qs = r.questions.map((q) => ({ kind: 'choice', itemId: r.id, type: 'reading', prompt: { markup: q.q, markupPinyin: q.qPinyin }, options: q.choices, optionsZh: true, answer: q.answer === undefined ? q.choices[0] : q.choices[q.answer], why: tr(q, 'why') }));
  runQuiz(quizArea, qs, { title: t('comprehension') }).then((res) => {
    days.log({ answered: res.total, correct: res.correct });
    quizArea.append(h('p', { class: 'muted', style: { marginTop: '12px' } }, t('n_of_total_correct', { n: res.correct, total: res.total })));
  });
}

/** Wrap vocabulary matches inside a rendered sentence so they open a lookup sheet. */
function makeTappable(node, lv, records, plainText) {
  const tokens = tokenize(lv, plainText);
  const parts = [];
  const walk = (n) => { for (const c of [...n.childNodes]) { if (c.nodeType === 3) parts.push(c); else if (c.tagName === 'RUBY') parts.push(c); else walk(c); } };
  walk(node);
  let pos = 0;
  const tokenAt = (p) => { let i = 0; for (const tk of tokens) { if (p >= i && p < i + tk.text.length) return tk; i += tk.text.length; } return null; };
  for (const part of parts) {
    const text = part.nodeType === 3 ? part.textContent : part.firstChild.textContent;
    const len = text.length;
    const tok = tokenAt(pos);
    if (tok && tok.vocab) {
      const btn = h('button', { class: 'tok', type: 'button', lang: 'zh-Hans', 'aria-label': t('look_up_x', { x: tok.vocab.zh }) });
      part.replaceWith(btn); btn.append(part);
      btn.addEventListener('click', (e) => { e.stopPropagation(); showLookup(tok.vocab, records); });
    }
    pos += len;
  }
}

function showLookup(v, records) {
  const rec = records.get(v.id);
  const body = h('div', null,
    h('div', { class: 'lookup-word' }, vocabWord(v, { display: 3 })),
    h('p', null, h('strong', null, meaningsOf(v)), h('div', { class: 'small muted' }, v.pinyin)),
    h('div', { class: 'btn-row' },
      canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(v.zh) }, icon('speak'), t('listen')) : null,
      h('a', { class: 'btn', href: `#/learn/item/${encodeURIComponent(v.id)}` }, t('details')),
      rec ? h('span', { class: 'pill' }, rec.known ? t('known_badge') : t('in_your_reviews')) : h('button', { class: 'btn btn-primary', type: 'button', onClick: async (e) => { await learnItems([{ id: v.id, type: 'vocab' }]); e.currentTarget.replaceWith(h('span', { class: 'pill' }, t('added'))); toast(t('added_to_your_reviews')); } }, t('add_to_reviews'))));
  openSheet({ title: t('word'), body });
}

/* ---------- listening ---------- */
function renderListening(el, lv, l, records) {
  const area = h('div');
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, tr(l, 'title')), h('p', { class: 'lede' }, `${t(`ltype_${l.type}`)} · ${levelName(lv.id)} ${t('unit_n', { n: l.unit })}`)),
    h('section', { class: 'card' }, area),
    h('a', { class: 'btn', href: '#/read' }, t('reading_library'))
  ]);
  if (!canSpeak()) { area.append(h('div', { class: 'notice notice-warn' }, icon('info'), h('p', null, t('drill_needs_voice')))); return; }

  let qs;
  if (l.type === 'dictation') {
    qs = l.items.map((it) => ({ kind: 'typed', itemId: l.id, type: 'listening', prompt: { audio: it.text, hint: t('type_what_you_hear') }, accepted: [it.text, it.pinyin], answer: it.text, why: `${it.text} (${it.pinyin}): ${tr(it, 'en', 'ja')}` }));
  } else if (l.type === 'comprehension') {
    qs = l.items.flatMap((it) => (it.questions || []).map((q) => ({ kind: 'choice', itemId: l.id, type: 'listening', prompt: { audio: it.text, markup: q.q, markupPinyin: q.qPinyin, hint: t('listen_then_answer') }, options: q.choices, optionsZh: true, answer: q.choices[q.answer], why: `${tr(q, 'why')} — ${tr(it, 'en', 'ja')}` })));
  } else {
    const list = h('div');
    l.items.forEach((it) => list.append(h('div', { class: 'gram-example' },
      h('div', { class: 'row' }, sentence(it.text, { pinyin: it.pinyin, records, lv, cls: 'ex-zh' }), h('button', { class: 'btn', type: 'button', onClick: () => speak(it.text, { rate: 0.7 }) }, icon('speak'), t('slow')), h('button', { class: 'btn', type: 'button', onClick: () => speak(it.text) }, icon('speak'), t('natural'))),
      h('div', { class: 'ex-meta' }, tr(it, 'en', 'ja')))));
    area.append(h('p', { class: 'muted' }, t('shadow_howto')), list);
    return;
  }
  runQuiz(area, qs, { title: tr(l, 'title') }).then((res) => {
    days.log({ answered: res.total, correct: res.correct });
    area.append(h('p', { class: 'muted', style: { marginTop: '12px' } }, t('n_of_total_correct', { n: res.correct, total: res.total })));
  });
}
