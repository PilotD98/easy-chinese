/* Placement test: self-report, then a short check, then skip ahead. Route: #/placement */
import { h, append, icon, levelName } from '../ui/dom.js';
import { loadPinyin } from '../content/pinyin-stage.js';
import { loadHsk } from '../content/hsk.js';
import { qListenPinyin, qPinyinTyped, runQuiz, shuffle } from '../ui/quiz.js';
import { qCharMeaning, qVocabMeaning, qGrammar } from '../ui/quiz-hsk.js';
import { applyPlacement, placementDone } from '../engine/placement.js';
import { progress } from '../store/progress.js';
import { initAudio, canSpeak } from '../ui/audio.js';
import { toast } from '../ui/toast.js';
import { HSK_ORDER } from '../content/ids.js';
import { t, fmtDate } from '../i18n/index.js';

export const title = 'placement';

export async function render(el) {
  const done = await placementDone();
  const existing = await progress.count();
  await initAudio();
  const stage = h('div');
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('where_to_start')), h('p', { class: 'lede' }, t('placement_lede'))),
    stage
  ]);
  if (done) stage.append(h('div', { class: 'notice' }, icon('info'), h('p', null, t('placed_on', { date: fmtDate(done.date), level: labelFor(done.level) }))));
  if (existing > 0 && !done) stage.append(h('div', { class: 'notice' }, icon('info'), h('p', null, t('placement_adds_only'))));
  stage.append(chooser());

  function chooser() {
    const opts = [
      ['none', t('pl_none'), t('pl_none_sub')],
      ['pinyin', t('pl_pinyin'), t('pl_pinyin_sub')],
      ['hsk1', 'HSK 1', t('pl_hsk1_sub')],
      ['hsk2', 'HSK 2', t('pl_hsk2_sub')],
      ['hsk3', 'HSK 3', t('pl_hsk3_sub')],
      ['hsk4', 'HSK 4+', t('pl_hsk4_sub')]
    ];
    return h('section', { class: 'card' },
      h('h2', null, t('what_do_you_know')),
      h('ul', { class: 'path' }, opts.map(([key, tt, s]) => h('li', null,
        h('span', { class: 'step-no is-available', 'aria-hidden': 'true' }, icon(key === 'none' ? 'learn' : 'check')),
        h('div', null, h('div', { class: 'step-title' }, tt), h('div', { class: 'step-sub' }, s)),
        h('button', { class: `btn ${key === 'none' ? '' : 'btn-primary'}`, type: 'button', onClick: () => key === 'none' ? finish('none', {}) : check(key) }, key === 'none' ? t('start') : t('check'))))));
  }

  async function check(claim) {
    stage.replaceChildren();
    const area = h('section', { class: 'card' });
    stage.append(h('p', { class: 'muted' }, t('placement_check_blurb')), area);
    const scores = {};
    // Pinyin
    const py = await loadPinyin();
    const pq = shuffle(py.allWords).slice(0, 10).map((w, i) => (i % 2 && canSpeak() ? qListenPinyin(w, py.allWords) : qPinyinTyped(w)));
    const pr = await runQuiz(area, pq, { title: t('pinyin_check') });
    scores.pinyin = pr.correct / pr.total;
    if (scores.pinyin < 0.8) return finish('none', scores, t('pl_pinyin_weak'));
    if (claim === 'pinyin') return finish('pinyin', scores);
    // HSK levels in turn: a claim of hskN means hsk1..hskN are known; test each
    let reached = 'pinyin';
    const target = claim === 'hsk4' ? 'hsk4' : claim;
    for (const id of HSK_ORDER) {
      if (HSK_ORDER.indexOf(id) > HSK_ORDER.indexOf(target)) break;
      let lv;
      try { lv = await loadHsk(id); } catch { break; }
      const nq = [
        ...shuffle(lv.chars).slice(0, 6).map((k) => qCharMeaning(k, lv.chars)),
        ...shuffle(lv.vocab).slice(0, 8).map((v) => qVocabMeaning(v, lv.vocab)),
        ...shuffle(lv.grammar).slice(0, 6).map((g) => qGrammar(g, g.exercises.find((x) => x.type === 'fill' || x.type === 'choose') || g.exercises[0]))
      ];
      const nr = await runQuiz(area, shuffle(nq), { title: t('level_check', { level: levelName(id) }) });
      scores[id] = nr.correct / nr.total;
      if (scores[id] >= 0.8) { reached = id; continue; }
      if (id === 'hsk1' && scores[id] >= 0.5) return finish('hsk1-half', scores, t('pl_hsk1_half'));
      return finish(reached, scores, t('pl_stop_at', { level: levelName(id) }));
    }
    return finish(reached, scores);
  }

  async function finish(level, scores, note) {
    stage.replaceChildren(h('section', { class: 'card' }, h('p', null, t('setting_up'))));
    const added = await applyPlacement(level, scores);
    const dest = level === 'none' ? '#/learn/orientation' : level === 'pinyin' ? '#/unit/hsk1/1' : level === 'hsk1-half' ? '#/learn/hsk1' : '#/learn';
    stage.replaceChildren(h('section', { class: 'card card-accent' },
      h('h2', null, t('placed_colon'), ' ', labelFor(level)),
      note ? h('p', null, note) : null,
      Object.keys(scores).length ? h('p', { class: 'small muted' }, Object.entries(scores).map(([k, v]) => `${levelName(k)}: ${Math.round(v * 100)}%`).join(' · ')) : null,
      added ? h('p', { class: 'small muted' }, t('n_added_known', { n: added })) : null,
      h('div', { class: 'btn-row' }, h('a', { class: 'btn btn-primary btn-lg', href: dest }, t('continue')), h('a', { class: 'btn', href: '#/home' }, t('nav_home')))));
    if (added) toast(t('n_marked_known', { n: added }));
  }
}

function labelFor(level) {
  if (level === 'none') return t('pl_label_none');
  if (level === 'pinyin') return t('pl_label_pinyin');
  if (level === 'hsk1-half') return t('pl_label_hsk1_half');
  return t('pl_label_level', { level: levelName(level) });
}
