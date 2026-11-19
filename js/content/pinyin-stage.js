/* Pinyin stage helpers: load data/pinyin.json, index its sound units and
   words, track which groups are passed, and keep the stage state (unlocks,
   orientation) in the meta store. */
import { loadLevel } from './loader.js';
import { progress } from '../store/progress.js';
import { db } from '../store/db.js';
import { HSK_ORDER } from './ids.js';
import { syllables } from '../engine/pinyin.js';
import { t, tr } from '../i18n/index.js';

let cache = null;

export async function loadPinyin() {
  if (cache) return cache;
  cache = (async () => {
    const level = await loadLevel('pinyin');
    const data = level.data.pinyin;
    const charsById = new Map(), wordsById = new Map();
    const allChars = [], allWords = [];
    data.groups.forEach((g, gi) => {
      g.index = gi;
      g.chars.forEach((c) => { c.group = g.id; charsById.set(c.id, c); allChars.push(c); });
      (g.words || []).forEach((w) => { w.group = g.id; w.syl = syllables(w.pinyin); wordsById.set(w.id, w); allWords.push(w); });
    });
    return { id: 'pinyin', data, charsById, wordsById, allChars, allWords, groups: data.groups };
  })();
  cache.catch(() => { cache = null; });
  return cache;
}

/* ---------- stage state (meta store) ---------- */
export async function passedGroups() {
  const row = await db.get('meta', 'pinyin:passed');
  return new Set(row?.value || []);
}
export async function markGroupPassed(groupId) {
  const set = await passedGroups();
  set.add(groupId);
  await db.put('meta', { id: 'pinyin:passed', value: [...set] });
}
export async function examPassed() {
  const row = await db.get('meta', 'pinyin:exam');
  return row?.value || null; // { date, score }
}
export async function markExamPassed(result) {
  await db.put('meta', { id: 'pinyin:exam', value: result });
  await unlockLevel('hsk1');
}
export async function isUnlocked(levelId) {
  if (levelId === 'orientation' || levelId === 'pinyin' || levelId === 'guides') return true;
  const unlocked = (await db.get('meta', 'unlocked'))?.value || [];
  return unlocked.includes(levelId);
}
export async function unlockLevel(levelId) {
  const unlocked = (await db.get('meta', 'unlocked'))?.value || [];
  if (!unlocked.includes(levelId)) await db.put('meta', { id: 'unlocked', value: [...unlocked, levelId] });
}
export async function orientationDone() { return !!(await db.get('meta', 'orientation:done'))?.value; }
export async function markOrientationDone() { await db.put('meta', { id: 'orientation:done', value: true }); }

/** Stage status for the path and for Home's "Continue learning". */
export async function pinyinStatus() {
  const py = await loadPinyin();
  const passed = await passedGroups();
  const exam = await examPassed();
  const nextGroup = py.groups.find((g) => !passed.has(g.id)) || null;
  return { py, passed, exam, nextGroup, allPassed: !nextGroup, total: py.groups.length };
}

/** Where "Continue learning" should go. */
export async function nextStep() {
  if (!(await orientationDone())) return { href: '#/learn/orientation', label: t('next_orientation'), sub: t('next_orientation_sub') };
  const s = await pinyinStatus();
  if (s.nextGroup && !s.exam) return { href: `#/lesson/${s.nextGroup.id}`, label: `${t('stage_pinyin_short')}: ${tr(s.nextGroup, 'title')}`, sub: t('group_n_of', { n: s.nextGroup.index + 1, total: s.total }) };
  if (!s.exam) return { href: '#/exam/pinyin', label: t('next_pinyin_exam'), sub: t('next_pinyin_exam_sub') };
  const { hskStatus } = await import('./hsk.js');
  let last = null;
  for (const id of HSK_ORDER) {
    const st = await hskStatus(id).catch(() => null);
    if (!st) break;
    const name = id.toUpperCase().replace('HSK', 'HSK ');
    if (!st.unlocked) return last ? { href: `#/learn/${last}`, label: t('level_complete_keep', { level: last.toUpperCase().replace('HSK', 'HSK ') }), sub: t('level_unlocks_when', { next: name, prev: last.toUpperCase().replace('HSK', 'HSK ') }) } : { href: '#/learn', label: t('learning_path'), sub: t('unlock_hsk1_hint') };
    if (st.nextUnit) return { href: `#/unit/${id}/${st.nextUnit.no}`, label: `${name} · ${t('unit_n', { n: st.nextUnit.no })}: ${tr(st.nextUnit, 'title')}`, sub: t('unit_n_of', { n: st.nextUnit.no, total: st.total }) };
    last = id;
  }
  return { href: last ? `#/learn/${last}` : '#/learn', label: last ? t('level_complete_keep', { level: last.toUpperCase().replace('HSK', 'HSK ') }) : t('learning_path'), sub: t('next_level_later') };
}

/** Progress records for the pinyin stage keyed by id. */
export async function pinyinRecords(py) {
  const rows = (await progress.all()) || [];
  const map = new Map();
  for (const r of rows) if (py.charsById.has(r.id) || py.wordsById.has(r.id)) map.set(r.id, r);
  return map;
}
