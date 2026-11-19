/* Review: the spaced-repetition session. Due items come first; learning-step
   items that fall due during the session are re-queued. With ?items=id,id the
   session runs focused practice on those items instead.
   Keyboard: 1–4 pick an option / grade, Enter continues, Space reveals (drawing). */
import { h, append, icon, zh } from '../ui/dom.js';
import { progress, STAGES } from '../store/progress.js';
import { dueQueue, answer } from '../engine/scheduler.js';
import { previewIntervals, Rating } from '../engine/fsrs.js';
import { loadPinyin } from '../content/pinyin-stage.js';
import { loadAllHsk } from '../content/hsk.js';
import { qCharMeaning, qCharPinyin, qCharFromMeaning, qCharDraw, qVocabMeaning, qVocabPinyin, qVocabRecall, qVocabListen, qGrammar } from '../ui/quiz-hsk.js';
import { parseId } from '../content/ids.js';
import { qListenPinyin, qToneListen, qPinyinTyped, qWordMeaning, qSoundListen, renderQuestion } from '../ui/quiz.js';
import { canSpeak, initAudio, stopSpeaking } from '../ui/audio.js';
import { days } from '../store/days.js';
import { t, fmtDate } from '../i18n/index.js';

export const title = 'nav_review';
const SESSION_WINDOW_MS = 20 * 60_000;

export async function render(el, ctx) {
  const summary = await progress.summary();
  const focus = ctx.params.items ? ctx.params.items.split(',').filter(Boolean) : null;
  const { queue, total, capped } = await dueQueue();
  const session = focus ? (await Promise.all(focus.map((id) => progress.get(id)))).filter(Boolean) : queue;

  if (ctx.params.start === '1' && session.length) { const stop = await runSession(el, session, { focus: !!focus }); return () => { stopSpeaking(); stop?.(); }; }

  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('nav_review')), h('p', { class: 'lede' }, t('review_lede'))),
    h('section', { class: 'card' },
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(session.length)), h('div', { class: 'stat-label' }, focus ? t('focused_items') : t('due_now'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(summary.learned)), h('div', { class: 'stat-label' }, t('items_in_queue'))),
        summary.known ? h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(summary.known)), h('div', { class: 'stat-label' }, t('marked_known'))) : null),
      capped ? h('p', { class: 'small muted', style: { marginTop: '8px' } }, t('capped_review_note', { n: capped })) : null,
      h('div', { class: 'btn-row', style: { marginTop: '16px' } },
        h('a', { class: `btn btn-primary btn-lg ${session.length ? '' : 'is-disabled'}`, href: `#/review?start=1${focus ? `&items=${encodeURIComponent(focus.join(','))}` : ''}`, 'aria-disabled': session.length ? null : 'true', onClick: (e) => { if (!session.length) e.preventDefault(); } }, icon('review'), focus ? t('practice_these') : t('start_reviews')),
        focus ? h('a', { class: 'btn', href: '#/review' }, t('all_reviews')) : null)),
    summary.total === 0
      ? h('div', { class: 'empty' }, zh('复习', 'zh-xl'), h('p', null, t('nothing_to_review_yet')), h('a', { class: 'btn', href: '#/learn' }, t('go_to_path')))
      : h('section', { class: 'card' },
        h('h2', null, t('mastery_stages')),
        STAGES.map((s) => h('div', { class: 'bar-row' }, h('span', null, t(`stage_${s}`)), h('div', { class: 'bar' }, h('span', { style: { width: `${summary.learned ? (summary.byStage[s] / summary.learned) * 100 : 0}%` } })), h('span', { class: 'pct' }, String(summary.byStage[s])))),
        session.length === 0 && !focus ? h('p', { class: 'small muted', style: { marginTop: '12px' } }, nextDueText(summary)) : null)
  ]);
  return () => stopSpeaking();
}

function nextDueText(summary) {
  const soon = summary.nextDue ? ' ' + t('next_due_at', { when: fmtDate(summary.nextDue, { dateStyle: 'medium', timeStyle: 'short' }) }) : '';
  return t('nothing_due_now') + soon;
}

/* ---------- session ---------- */
async function runSession(el, records, { focus }) {
  await initAudio();
  const py = await loadPinyin().catch(() => null);
  const hsk = await loadAllHsk();
  const startedAt = Date.now();
  const queue = records.slice();
  let done = 0, correctCount = 0;
  const totalPlanned = queue.length;
  let qCleanup = null;

  const counter = h('span', { class: 'small muted' });
  const bar = h('div', { class: 'bar' }, h('span', { style: { width: '0%' } }));
  const qArea = h('div', { class: 'q-area' });
  const grades = h('div', { class: 'grade-row', hidden: true });
  const card = h('section', { class: 'card' }, h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('strong', null, focus ? t('focused_practice') : t('reviews')), counter), bar, qArea, grades);
  append(el, [
    h('header', { class: 'page-head row', style: { justifyContent: 'space-between' } }, h('h1', null, t('nav_review')), h('a', { class: 'btn', href: '#/review' }, t('end_session'))),
    card
  ]);

  const finishSession = async () => {
    qCleanup?.();
    await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) });
    const pct = done ? Math.round((correctCount / done) * 100) : 0;
    card.replaceChildren(
      h('h2', null, t('session_complete')),
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(done)), h('div', { class: 'stat-label' }, t('answers'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${pct}%`), h('div', { class: 'stat-label' }, t('correct_lc'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, t('fmt_min', { n: Math.max(1, Math.round((Date.now() - startedAt) / 60000)) })), h('div', { class: 'stat-label' }, t('study_time')))),
      h('div', { class: 'btn-row', style: { marginTop: '16px' } }, h('a', { class: 'btn btn-primary', href: '#/home' }, t('nav_home')), h('a', { class: 'btn', href: '#/learn' }, t('keep_learning')))
    );
  };

  const next = async () => {
    stopSpeaking();
    if (!queue.length) { await finishSession(); return; }
    const rec = queue.shift();
    counter.textContent = `${done + 1} / ${done + 1 + queue.length}`;
    bar.firstChild.style.width = `${(done / Math.max(totalPlanned, done + queue.length + 1)) * 100}%`;
    const q = questionFor(rec, py, hsk);
    if (!q) { next(); return; }
    grades.hidden = true;
    qCleanup?.();
    qCleanup = renderQuestion(qArea, q, { onAnswer: (r) => showGrades(rec, r) });
    window.scrollTo(0, 0);
  };

  const showGrades = (rec, r) => {
    const suggested = r.correct ? (r.close ? Rating.Hard : Rating.Good) : Rating.Again;
    const iv = previewIntervals(rec);
    const labels = { 1: t('grade_again'), 2: t('grade_hard'), 3: t('grade_good'), 4: t('grade_easy') };
    grades.replaceChildren();
    append(grades, [
      h('div', { class: 'small muted', style: { width: '100%' } }, t('grade_prompt')),
      [1, 2, 3, 4].map((g) => h('button', { class: `btn grade-btn ${g === suggested ? 'is-suggested' : ''} grade-${g}`, type: 'button', dataset: { grade: String(g) }, onClick: () => grade(rec, g, r) },
        h('span', { class: 'grade-label' }, h('kbd', { class: 'q-key', 'aria-hidden': 'true' }, String(g)), labels[g]), h('span', { class: 'small muted' }, iv[g])))
    ]);
    grades.hidden = false;
    grades.querySelector('.is-suggested')?.focus({ preventScroll: true });
  };

  const grade = async (rec, g, r) => {
    const updated = await answer(rec, g);
    done += 1; if (g !== Rating.Again) correctCount += 1;
    const dueIn = Date.parse(updated.due) - Date.now();
    if (dueIn <= SESSION_WINDOW_MS) queue.push(updated);
    await next();
  };

  const onKey = (e) => {
    if (e.target.tagName === 'INPUT' || document.querySelector('dialog[open]')) return;
    if (grades.hidden) {
      if (e.key === ' ') { const b = qArea.querySelector('.btn-primary'); if (b && b.textContent.includes(t('show_answer'))) { e.preventDefault(); b.click(); } }
      return;
    }
    const n = Number(e.key);
    if (n >= 1 && n <= 4) { e.preventDefault(); grades.querySelector(`[data-grade="${n}"]`)?.click(); }
    else if (e.key === 'Enter') { e.preventDefault(); grades.querySelector('.is-suggested')?.click(); }
  };
  document.addEventListener('keydown', onKey);
  await next();
  return () => { document.removeEventListener('keydown', onKey); qCleanup?.(); };
}

/** Pick a question type for a record, rotating by review count. */
function questionFor(rec, py, hsk) {
  const p = parseId(rec.id);
  if (!p) return null;
  if (p.type === 'py' || p.scope === 'py') {
    if (!py) return null;
    if (p.type === 'py') {
      const u = py.charsById.get(rec.id);
      if (!u || !u.sample?.zh) return null;
      const pool = py.allChars.filter((c) => c.group === u.group);
      return pool.length >= 4 && canSpeak() ? qSoundListen(u, pool) : null;
    }
    const w = py.wordsById.get(rec.id);
    if (!w) return null;
    const types = canSpeak() ? ['listen', 'tone', 'typed', 'meaning'] : ['typed', 'meaning'];
    const tp = types[rec.reps % types.length];
    if (tp === 'listen') return qListenPinyin(w, py.allWords);
    if (tp === 'tone') return qToneListen(w);
    if (tp === 'meaning') return qWordMeaning(w, py.allWords);
    return qPinyinTyped(w);
  }
  const lv = Object.values(hsk).find((l) => l.byId.has(rec.id));
  if (!lv) return null;
  const it = lv.byId.get(rec.id);
  if (p.type === 'hanzi') {
    const types = ['meaning', 'pinyin', 'recall', 'draw'];
    const tp = types[rec.reps % types.length];
    if (tp === 'meaning') return qCharMeaning(it, lv.chars);
    if (tp === 'pinyin') return qCharPinyin(it);
    if (tp === 'draw' && lv.strokes[it.char]) return qCharDraw(it, lv.strokes[it.char]);
    return qCharFromMeaning(it, lv.chars);
  }
  if (p.type === 'vocab') {
    const types = ['meaning', 'pinyin', 'recall', 'listen'];
    const tp = types[rec.reps % types.length];
    if (tp === 'meaning') return qVocabMeaning(it, lv.vocab);
    if (tp === 'pinyin') return qVocabPinyin(it);
    if (tp === 'listen' && canSpeak()) return qVocabListen(it, lv.vocab);
    return qVocabRecall(it);
  }
  if (p.type === 'gram') return qGrammar(it);
  return null;
}
