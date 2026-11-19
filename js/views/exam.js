/* Stage exam for the Pinyin stage. Route: #/exam/pinyin */
import { h, append, icon } from '../ui/dom.js';
import { loadPinyin, markExamPassed, examPassed, passedGroups } from '../content/pinyin-stage.js';
import { pinyinQuiz, runQuiz } from '../ui/quiz.js';
import { days } from '../store/days.js';
import { initAudio } from '../ui/audio.js';
import { toast } from '../ui/toast.js';
import { t, tr } from '../i18n/index.js';

export const title = 'exam';

export async function render(el) {
  const py = await loadPinyin();
  const passed = await passedGroups();
  const backHref = '#/learn/pinyin';
  if (passed.size < py.groups.length) {
    append(el, [h('h1', null, t('pinyin_exam')), h('div', { class: 'notice' }, icon('lock'), h('p', null, t('pass_all_groups_first', { n: py.groups.length }))), h('a', { class: 'btn', href: backHref }, t('back'))]);
    return;
  }
  await initAudio();
  const cfg = py.data.exam;
  const prior = await examPassed();
  const area = h('section', { class: 'card' });
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('pinyin_exam')), h('p', { class: 'lede' }, t('exam_lede', { n: cfg.questions, pct: cfg.passPercent }))),
    area
  ]);

  const start = h('button', { class: 'btn btn-primary btn-lg', type: 'button', onClick: begin }, t('begin'));
  append(area, [
    h('p', null, t('pinyin_exam_intro')),
    prior ? h('p', { class: 'muted' }, t('passed_on', { date: new Date(prior.date).toLocaleDateString(), pct: prior.score })) : null,
    h('div', { class: 'btn-row' }, start, h('a', { class: 'btn', href: backHref }, t('not_now')))
  ]);

  async function begin() {
    const startedAt = Date.now();
    const questions = pinyinQuiz(py.allChars, py.allWords, { n: cfg.questions, pool: py.allChars, wordPool: py.allWords });
    const res = await runQuiz(area, questions, { title: t('exam') });
    await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) });
    const pct = Math.round((res.correct / res.total) * 100);
    const ok = pct >= cfg.passPercent;
    if (ok) { await markExamPassed({ date: new Date().toISOString(), score: pct }); toast(t('hsk1_unlocked')); }
    const missed = [...new Set(res.missed)].map((id) => py.charsById.get(id) || py.wordsById.get(id)).filter(Boolean);
    area.replaceChildren();
    append(area, [
      h('h2', null, ok ? t('passed') : t('not_this_time')),
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${pct}%`), h('div', { class: 'stat-label' }, `${res.correct} / ${res.total}`)),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(missed.length)), h('div', { class: 'stat-label' }, t('items_missed')))),
      missed.length ? h('p', { style: { marginTop: '12px' } }, missed.map((it) => h('span', { class: 'pill' }, it.char || it.zh, ' ', it.pinyin || tr(it, 'label')))) : null,
      h('p', { class: 'muted' }, ok ? t('pinyin_exam_passed_blurb') : t('exam_failed_blurb', { pct: cfg.passPercent })),
      h('div', { class: 'btn-row' },
        ok ? h('a', { class: 'btn btn-primary', href: '#/learn' }, t('learning_path')) : h('button', { class: 'btn btn-primary', type: 'button', onClick: begin }, t('try_again')),
        h('a', { class: 'btn', href: backHref }, t('back'))
      )
    ]);
  }
}
