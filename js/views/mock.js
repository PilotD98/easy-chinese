/* Mock HSK exam: timed sections, no feedback until the end, section scores,
   and weak areas with one-tap practice. Route: #/mock/hsk1 */
import { h, append, icon, levelName } from '../ui/dom.js';
import { loadHsk } from '../content/hsk.js';
import { buildMock, scoreMock, SUB_KEYS, hasWriting } from '../ui/exam-hsk.js';
import { renderQuestion } from '../ui/quiz.js';
import { markupText } from '../ui/zhtext.js';
import { initAudio, stopSpeaking, canSpeak } from '../ui/audio.js';
import { db } from '../store/db.js';
import { days } from '../store/days.js';
import { isUnlocked } from '../content/pinyin-stage.js';
import { t, fmtDate } from '../i18n/index.js';

export const title = 'mock_exam';

export async function examHistory(levelId = 'hsk1') { return (await db.get('meta', `${levelId}:mocks`))?.value || []; }

export async function render(el, ctx) {
  const levelId = ctx.segs[1] || 'hsk1';
  const name = levelName(levelId);
  if (!(await isUnlocked(levelId))) { append(el, [h('h1', null, t('mock_exam')), h('div', { class: 'notice' }, icon('lock'), h('p', null, t('unlock_level_first', { level: name }))), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]); return; }
  const lv = await loadHsk(levelId);
  await initAudio();
  const history = await examHistory(levelId);
  const area = h('div');
  const max = hasWriting(levelId) ? 300 : 200, passMark = hasWriting(levelId) ? 180 : 120;
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('mock_hsk', { level: name })), h('p', { class: 'lede' }, t('mock_lede'))),
    area
  ]);
  intro();

  function intro() {
    const sections = buildMock(lv);
    area.replaceChildren();
    append(area, [h('section', { class: 'card' },
      h('ul', { class: 'path' }, sections.map((s) => h('li', null, h('span', { class: 'step-no is-available', 'aria-hidden': 'true' }, s.id), h('div', null, h('div', { class: 'step-title' }, s.title), h('div', { class: 'step-sub' }, `${t('n_questions', { n: s.questions.length })} · ${t('n_minutes', { n: s.minutes })}`)), h('span', null)))),
      canSpeak() ? null : h('div', { class: 'notice notice-warn' }, icon('info'), h('p', null, t('mock_no_voice'))),
      h('p', { class: 'small muted' }, t('mock_rules', { pass: passMark, max })),
      h('div', { class: 'btn-row' }, h('button', { class: 'btn btn-primary btn-lg', type: 'button', onClick: () => run(sections) }, t('begin')), h('a', { class: 'btn', href: `#/learn/${levelId}` }, t('not_now')))),
      history.length ? h('section', { class: 'card' }, h('h2', null, t('previous_attempts')), h('ul', { class: 'missed-list' }, history.slice(-5).reverse().map((x) => h('li', null, h('span', { class: 'grow' }, fmtDate(x.date)), h('span', { class: 'pill' }, `${x.total} / ${x.max} · ${x.passed == null ? t('incomplete') : x.passed ? t('pass') : t('fail')}`))))) : null]);
  }

  async function run(sections) {
    const startedAt = Date.now();
    const results = [];
    for (const s of sections) { const r = await runSection(s); results.push(...r); }
    await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000), answered: results.length, correct: results.filter((r) => r.correct).length });
    showResults(sections, results);
  }

  function runSection(s) {
    return new Promise((resolve) => {
      const results = [];
      let idx = 0, cleanup = null, ended = false;
      const endsAt = Date.now() + s.minutes * 60_000;
      const clock = h('span', { class: 'exam-clock', 'aria-live': 'off' });
      const counter = h('span', { class: 'small muted' });
      const qArea = h('div', { class: 'q-area exam-area' });
      const next = h('button', { class: 'btn btn-primary btn-lg btn-block', type: 'button', hidden: true }, t('next'));
      const submit = h('button', { class: 'btn', type: 'button', onClick: () => finish() }, t('submit_section'));
      area.replaceChildren(h('section', { class: 'card' },
        h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('strong', null, `${t('section_x', { x: s.id })}: ${s.title}`), clock),
        h('div', { class: 'row', style: { justifyContent: 'space-between' } }, counter, submit),
        qArea, next));
      const tick = setInterval(() => {
        const left = Math.max(0, endsAt - Date.now());
        clock.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
        clock.classList.toggle('is-low', left < 60_000);
        if (left <= 0) finish();
      }, 500);
      const finish = () => {
        if (ended) return; ended = true;
        clearInterval(tick); cleanup?.(); stopSpeaking();
        for (let k = idx; k < s.questions.length; k++) if (!results[k]) results[k] = { correct: false, q: s.questions[k], section: s.id, sub: s.questions[k].sub, itemId: s.questions[k].itemId, skipped: true };
        resolve(results.filter(Boolean));
      };
      const show = () => {
        if (idx >= s.questions.length) { finish(); return; }
        counter.textContent = `${idx + 1} / ${s.questions.length}`;
        next.hidden = true;
        cleanup?.();
        const q = s.questions[idx];
        cleanup = renderQuestion(qArea, q, { autoplay: true, silent: true, onAnswer: (r) => { results[idx] = { ...r, section: s.id, sub: q.sub, itemId: q.itemId }; next.hidden = false; next.focus({ preventScroll: true }); } });
        if (q.prompt.markupSub) qArea.querySelector('.q-prompt')?.append(h('div', { class: 'q-markup exam-sub' }, markupText(q.prompt.markupSub, q.prompt.markupSubPinyin)));
        window.scrollTo(0, 0);
      };
      next.addEventListener('click', () => { idx += 1; show(); });
      show();
    });
  }

  async function showResults(sections, results) {
    const sc = scoreMock(sections, results, levelId);
    const entry = { date: new Date().toISOString(), level: levelId, total: sc.total, max: sc.max, sec: sc.sec, passed: sc.passed };
    const hist = await examHistory(levelId);
    await db.put('meta', { id: `${levelId}:mocks`, value: [...hist, entry].slice(-20) });
    const weak = Object.entries(sc.bySub).map(([k, v]) => ({ k, label: t(SUB_KEYS[k] || k), pct: v.total ? v.correct / v.total : 0, ids: v.ids.filter((id) => /^(hanzi|vocab|gram):/.test(id)), raw: v.ids, total: v.total })).sort((a, b) => a.pct - b.pct);
    area.replaceChildren(
      h('section', { class: `card ${sc.passed ? 'card-accent' : ''}` },
        h('h2', null, sc.passed == null ? t('result_incomplete') : sc.passed ? t('estimated_pass') : t('estimated_fail')),
        h('div', { class: 'stat-grid' },
          h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${sc.total}`), h('div', { class: 'stat-label' }, t('of_max_overall', { max: sc.max, pass: sc.passMark }))),
          h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, sc.sec.L ?? '—'), h('div', { class: 'stat-label' }, `${t('exam_sec_listening')} / 100`)),
          h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, sc.sec.R ?? '—'), h('div', { class: 'stat-label' }, `${t('exam_sec_reading')} / 100`)),
          hasWriting(levelId) ? h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, sc.sec.W ?? '—'), h('div', { class: 'stat-label' }, `${t('exam_sec_writing')} / 100`)) : null),
        h('p', { class: 'small muted', style: { marginTop: '12px' } }, t('mock_scaled_note'))),
      h('section', { class: 'card' },
        h('h2', null, t('by_question_type')),
        weak.map((w) => h('div', { class: 'bar-row' }, h('span', null, w.label), h('div', { class: 'bar' }, h('span', { style: { width: `${Math.round(w.pct * 100)}%`, background: w.pct < 0.6 ? 'var(--err)' : undefined } })), h('span', { class: 'pct' }, `${Math.round(w.pct * 100)}%`))),
        weak.filter((w) => w.pct < 0.7 && w.raw.length).length ? h('div', { style: { marginTop: '12px' } }, h('h3', null, t('weak_areas')), weak.filter((w) => w.pct < 0.7 && w.raw.length).map((w) => h('div', { class: 'row', style: { marginBottom: '8px' } }, h('span', { class: 'grow' }, `${w.label}: ${t('n_missed', { n: w.raw.length })}`), w.ids.length ? h('a', { class: 'btn', href: `#/review?start=1&items=${encodeURIComponent(w.ids.join(','))}` }, t('practice')) : h('a', { class: 'btn', href: '#/read' }, w.k.startsWith('L') ? t('listening_drills') : t('readings'))))) : h('p', { class: 'muted' }, t('no_weak_areas'))),
      h('div', { class: 'btn-row' }, h('button', { class: 'btn btn-primary', type: 'button', onClick: intro }, t('take_again')), h('a', { class: 'btn', href: '#/progress' }, t('nav_progress')), h('a', { class: 'btn', href: `#/learn/${levelId}` }, t('back_to_x', { x: name })))
    );
  }
  return () => stopSpeaking();
}
