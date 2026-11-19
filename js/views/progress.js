/* Progress dashboard: current level and progress toward the next, mastery
   stages, known items, accuracy by item type and level, most-missed items
   with one-tap practice, readiness estimate, mock exam history, study history
   and items learned over time. Every number comes from the device. */
import { h, append, formatMinutes, levelName } from '../ui/dom.js';
import { progress, STAGES } from '../store/progress.js';
import { days } from '../store/days.js';
import { db } from '../store/db.js';
import { getManifest } from '../content/loader.js';
import { loadPinyin } from '../content/pinyin-stage.js';
import { loadAllHsk } from '../content/hsk.js';
import { parseId, HSK_ORDER } from '../content/ids.js';
import { t, tr, meaningOf, locale } from '../i18n/index.js';

export const title = 'nav_progress';

const SKILLS = [['hanzi', 'skill_hanzi'], ['vocab', 'skill_vocab'], ['grammar', 'skill_grammar'], ['reading', 'skill_reading'], ['listening', 'skill_listening']];

export async function render(el) {
  const [summary, recent, longer, streak, totals, manifest, all, mocks] = await Promise.all([
    progress.summary(), days.recent(14), days.recent(56), days.streak(), days.totals(), getManifest().catch(() => null), progress.all(), mergedMocks()
  ]);
  const records = all || [];
  const levels = (manifest?.levels || []).filter((l) => HSK_ORDER.includes(l.id));
  const glyphs = await glyphMap();

  const masteredByType = {}, learnedByType = {}, knownByType = {};
  for (const r of records) {
    if (r.known) { knownByType[r.type] = (knownByType[r.type] || 0) + 1; continue; }
    learnedByType[r.type] = (learnedByType[r.type] || 0) + 1;
    if (r.stage === 'mastered' || r.stage === 'burned') masteredByType[r.type] = (masteredByType[r.type] || 0) + 1;
  }
  const coveredByType = {};
  for (const k of new Set([...Object.keys(masteredByType), ...Object.keys(knownByType)])) coveredByType[k] = (masteredByType[k] || 0) + (knownByType[k] || 0);

  let current = levels[0] || null;
  for (const l of levels) { if (coverage(l, coveredByType) < 0.8) { current = l; break; } current = l; }
  const accuracy = totals.answered ? Math.round((totals.correct / totals.answered) * 100) : null;
  const readiness = readinessEstimate(current, coveredByType, learnedByType, knownByType, accuracy, totals.answered);
  const curName = current ? levelName(current.id) : 'HSK 1';

  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('nav_progress')), h('p', { class: 'lede' }, t('progress_lede'))),

    h('section', { class: 'card card-accent', 'aria-labelledby': 'lvl-h' },
      h('div', { class: 'card-title' }, h('h2', { id: 'lvl-h' }, t('working_toward', { level: curName })), h('span', { class: 'pill' }, readiness.label)),
      h('p', { class: 'muted', style: { marginBottom: '16px' } }, readiness.text),
      SKILLS.map(([key, labelKey]) => {
        const target = current?.targets?.[key] || 0;
        const have = coveredByType[key] || 0;
        const learned = (learnedByType[key] || 0) + (knownByType[key] || 0);
        const pct = target ? Math.min(100, Math.round((have / target) * 100)) : 0;
        const lpct = target ? Math.min(100, Math.round((learned / target) * 100)) : 0;
        return h('div', { class: 'bar-row' },
          h('span', null, t(labelKey)),
          h('div', { class: 'bar bar-dual', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': `${t(labelKey)}: ${pct}% / ${lpct}%` },
            h('span', { class: 'bar-learned', style: { width: `${lpct}%` } }), h('span', { style: { width: `${pct}%` } })),
          h('span', { class: 'pct' }, `${pct}%`));
      }),
      h('p', { class: 'small muted', style: { marginTop: '8px', marginBottom: 0 } }, t('bars_note'))),

    h('section', { class: 'card', 'aria-labelledby': 'stage-h' },
      h('h2', { id: 'stage-h' }, t('mastery_stages')),
      h('div', { class: 'stat-grid' }, [...STAGES.map((s) => h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(summary.byStage[s])), h('div', { class: 'stat-label' }, t(`stage_${s}`)))),
        h('div', { class: 'stat stat-known' }, h('div', { class: 'stat-value' }, String(summary.known)), h('div', { class: 'stat-label' }, t('marked_known')))]),
      h('p', { class: 'small muted', style: { marginTop: '8px', marginBottom: 0 } }, t('known_stat_note'))),

    accuracyCard(records, accuracy),

    mocks.length ? mockCard(mocks) : null,

    h('section', { class: 'card', 'aria-labelledby': 'hist-h' },
      h('div', { class: 'card-title' }, h('h2', { id: 'hist-h' }, t('study_time')), h('span', { class: 'pill', title: t('streak_note') }, t('streak_days', { n: streak }))),
      sparkline(recent, (r) => r.seconds / 60, (r) => `${r.id}: ${Math.round(r.seconds / 60)} min`),
      h('div', { class: 'stat-grid', style: { marginTop: '16px' } },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, formatMinutes(totals.seconds)), h('div', { class: 'stat-label' }, t('total_study_time'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(totals.activeDays)), h('div', { class: 'stat-label' }, t('active_days'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(totals.reviews)), h('div', { class: 'stat-label' }, t('reviews_answered'))))),

    h('section', { class: 'card', 'aria-labelledby': 'learned-h' },
      h('h2', { id: 'learned-h' }, t('items_learned_8w')),
      weeklyLearned(records.filter((r) => !r.known), longer),
      h('p', { class: 'small muted', style: { marginTop: '8px', marginBottom: 0 } }, t('items_in_queue_total', { n: summary.learned, k: summary.known }))),

    mostMissed(records, glyphs)
  ]);
}

function coverage(level, byType) {
  const tg = level?.targets || {};
  const keys = Object.keys(tg).filter((k) => tg[k] > 0);
  if (!keys.length) return 0;
  return keys.reduce((acc, k) => acc + Math.min(1, (byType[k] || 0) / tg[k]), 0) / keys.length;
}

function readinessEstimate(level, covered, learned, known, accuracy, answered) {
  if (!level) return { label: t('no_level_data'), text: t('no_level_loaded') };
  const cov = coverage(level, covered);
  const tg = level.targets || {};
  const keys = Object.keys(tg).filter((k) => tg[k] > 0);
  const learnedCov = keys.reduce((acc, k) => acc + Math.min(1, ((learned[k] || 0) + (known[k] || 0)) / tg[k]), 0) / Math.max(1, keys.length);
  const name = levelName(level.id);
  if (answered < 50) return { label: t('estimate_pending'), text: t('estimate_pending_text', { pct: Math.round(learnedCov * 100), level: name }) };
  if (cov >= 0.85 && accuracy >= 85) return { label: t('approx_ready', { level: name }), text: t('approx_ready_text', { cov: Math.round(cov * 100), acc: accuracy, level: name }) };
  if (cov >= 0.5) return { label: t('halfway_to', { level: name }), text: t('halfway_text', { cov: Math.round(cov * 100), acc: accuracy, level: name }) };
  return { label: t('early_level', { level: name }), text: t('early_text', { intro: Math.round(learnedCov * 100), cov: Math.round(cov * 100), acc: accuracy, level: name }) };
}

function accuracyCard(records, overall) {
  const byType = {}, byLevel = {};
  for (const r of records) {
    const reps = r.reps || 0, wrong = r.wrong || 0;
    if (reps <= 1) continue;
    const add = (map, key) => { map[key] = map[key] || { reps: 0, wrong: 0 }; map[key].reps += reps - 1; map[key].wrong += wrong; };
    add(byType, r.type);
    const p = parseId(r.id);
    const level = p?.type === 'hanzi' ? 'hsk' : p?.type === 'py' || p?.scope === 'py' ? 'pinyin' : p?.scope || 'other';
    add(byLevel, level);
  }
  const row = (label, v) => { const pct = v.reps ? Math.max(0, Math.round(((v.reps - v.wrong) / v.reps) * 100)) : null; return h('div', { class: 'bar-row' }, h('span', null, label), h('div', { class: 'bar' }, h('span', { style: { width: `${pct ?? 0}%`, background: pct != null && pct < 70 ? 'var(--err)' : undefined } })), h('span', { class: 'pct' }, pct == null ? '—' : `${pct}%`)); };
  const hasData = Object.keys(byType).length > 0;
  return h('section', { class: 'card', 'aria-labelledby': 'acc-h' },
    h('div', { class: 'card-title' }, h('h2', { id: 'acc-h' }, t('accuracy')), h('span', { class: 'pill' }, overall == null ? t('no_answers_yet') : t('pct_overall', { pct: overall }))),
    hasData ? h('div', { class: 'acc-grid' },
      h('div', null, h('h3', null, t('by_item_type')), Object.entries(byType).map(([k, v]) => row(t(`type_${k}`), v))),
      h('div', null, h('h3', null, t('by_level')), Object.entries(byLevel).map(([k, v]) => row(k === 'hsk' ? t('type_hanzi') : levelName(k), v))))
      : h('p', { class: 'muted' }, t('accuracy_appears_later')));
}

async function mergedMocks() {
  const all = [];
  for (const id of HSK_ORDER) { const row = await db.get('meta', `${id}:mocks`); for (const x of row?.value || []) all.push({ ...x, level: x.level || id }); }
  return all.sort((a, b) => a.date.localeCompare(b.date));
}

function mockCard(list) {
  const last = list[list.length - 1];
  return h('section', { class: 'card', 'aria-labelledby': 'mock-h' },
    h('div', { class: 'card-title' }, h('h2', { id: 'mock-h' }, t('mock_exams')), h('a', { class: 'btn', href: `#/mock/${last.level || 'hsk1'}` }, t('take_one'))),
    h('div', { class: 'stat-grid' },
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${last.total}`), h('div', { class: 'stat-label' }, `/ ${last.max} · ${levelName(last.level)} · ${last.passed == null ? t('incomplete') : last.passed ? t('pass') : t('fail')}`)),
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, last.sec?.L ?? '—'), h('div', { class: 'stat-label' }, t('exam_sec_listening'))),
      h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, last.sec?.R ?? '—'), h('div', { class: 'stat-label' }, t('exam_sec_reading'))),
      last.sec?.W != null ? h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, last.sec.W), h('div', { class: 'stat-label' }, t('exam_sec_writing'))) : null),
    list.length > 1 ? h('div', { style: { marginTop: '12px' } }, sparkline(list.slice(-8).map((x) => ({ id: x.date.slice(0, 10), v: Math.round((x.total / x.max) * 100) })), (r) => r.v, (r) => `${r.id}: ${r.v}%`, 100)) : null);
}

function mostMissed(all, glyphs) {
  const missed = all.filter((r) => (r.wrong || 0) > 0).sort((a, b) => (b.wrong || 0) - (a.wrong || 0) || (b.lapses || 0) - (a.lapses || 0)).slice(0, 10);
  if (!missed.length) return h('section', { class: 'card' }, h('h2', null, t('most_missed')), h('p', { class: 'muted' }, t('no_misses_yet')));
  const ids = missed.map((r) => r.id);
  return h('section', { class: 'card', 'aria-labelledby': 'miss-h' },
    h('div', { class: 'card-title' }, h('h2', { id: 'miss-h' }, t('most_missed')), h('a', { class: 'btn btn-primary', href: `#/review?start=1&items=${encodeURIComponent(ids.join(','))}` }, t('practice_these'))),
    h('ul', { class: 'missed-list' }, missed.map((r) => h('li', null,
      h('a', { href: `#/learn/item/${encodeURIComponent(r.id)}`, class: 'grow', lang: 'zh-Hans' }, glyphs.get(r.id) || r.id),
      h('span', { class: 'small muted' }, `${t('n_missed', { n: r.wrong })} · ${t(`stage_${r.stage}`) }`)))));
}

async function glyphMap() {
  const map = new Map();
  try {
    const py = await loadPinyin();
    for (const c of py.allChars) map.set(c.id, `${c.char} (${tr(c, 'label')})`);
    for (const w of py.allWords) map.set(w.id, `${w.zh} (${w.pinyin}, ${meaningOf(w)})`);
  } catch { /* not loaded */ }
  try {
    const hsk = await loadAllHsk();
    for (const lv of Object.values(hsk)) {
      for (const k of lv.chars) map.set(k.id, `${k.char} (${meaningOf(k)})`);
      for (const v of lv.vocab) map.set(v.id, `${v.zh} (${v.pinyin}, ${meaningOf(v)})`);
      for (const g of lv.grammar) map.set(g.id, tr(g, 'title'));
    }
  } catch { /* level not in this build */ }
  return map;
}

function sparkline(rows, value, label, fixedMax = null) {
  const max = fixedMax ?? Math.max(1, ...rows.map(value));
  const desc = rows.map(label).join(', ');
  const bars = h('div', { class: 'spark', role: 'img', 'aria-label': `${desc}` },
    rows.map((r) => h('div', { class: `spark-bar ${value(r) > 0 ? 'has-data' : ''}`, style: { height: `${Math.max(4, (value(r) / max) * 100)}%` }, title: label(r) })));
  const labels = h('div', { class: 'spark-labels', 'aria-hidden': 'true' },
    rows.map((r) => h('span', null, rows.length <= 16 ? new Date(r.id + 'T12:00:00').toLocaleDateString(locale(), { weekday: 'narrow' }) : '')));
  return h('div', null, bars, labels);
}

function weeklyLearned(records, days56) {
  const start = new Date(days56[0].id + 'T00:00:00');
  const weeks = Array.from({ length: 8 }, (_, i) => ({ id: new Date(start.getTime() + i * 7 * 86400000).toISOString().slice(0, 10), n: 0 }));
  for (const r of records) {
    const tm = Date.parse(r.createdAt || 0);
    const i = Math.floor((tm - start.getTime()) / (7 * 86400000));
    if (i >= 0 && i < 8) weeks[i].n++;
  }
  const max = Math.max(1, ...weeks.map((w) => w.n));
  return h('div', null,
    h('div', { class: 'spark', role: 'img', 'aria-label': weeks.map((w) => `${w.id}: ${w.n}`).join(', ') },
      weeks.map((w) => h('div', { class: `spark-bar ${w.n ? 'has-data' : ''}`, style: { height: `${Math.max(4, (w.n / max) * 100)}%` }, title: `${w.id}: ${w.n}` }))),
    h('div', { class: 'spark-labels', 'aria-hidden': 'true' }, weeks.map((w) => h('span', null, new Date(w.id + 'T12:00:00').toLocaleDateString(locale(), { month: 'short', day: 'numeric' })))));
}
