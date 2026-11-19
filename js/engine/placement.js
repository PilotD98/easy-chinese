/* Placement: lets a learner who already knows some Chinese skip ahead.
   Two parts: what they say they know, then a short check. The result marks
   pinyin groups / the exam / HSK units as passed and seeds the review queue
   with those items as already known (the same mechanism as "I already know
   this"), so they are reviewed lightly rather than taught from scratch. */
import { db } from '../store/db.js';
import { loadPinyin, markGroupPassed, markExamPassed, markOrientationDone, unlockLevel } from '../content/pinyin-stage.js';
import { loadHsk, markUnitPassed, unitItems } from '../content/hsk.js';
import { markKnown } from './known.js';
import { HSK_ORDER, nextHsk } from '../content/ids.js';

/** Mark the whole pinyin stage known (groups + exam) and seed its items. */
export async function placePinyin() {
  const py = await loadPinyin();
  for (const g of py.groups) await markGroupPassed(g.id);
  await markExamPassed({ date: new Date().toISOString(), score: 100, placement: true });
  return markKnown([
    ...py.allChars.map((c) => ({ id: c.id, type: 'sound' })),
    ...py.allWords.map((w) => ({ id: w.id, type: 'vocab' }))
  ]);
}

/** Mark the first `count` units of a level known (all units if count is null) and seed their items. */
export async function placeLevel(levelId, count = null) {
  const lv = await loadHsk(levelId);
  let added = 0;
  const units = count == null ? lv.units : lv.units.slice(0, count);
  for (const u of units) {
    await markUnitPassed(levelId, u.id);
    added += await markKnown(unitItems(lv, u));
  }
  return added;
}

export async function markPlacementDone(summary) {
  await db.put('meta', { id: 'placement', value: { date: new Date().toISOString(), ...summary } });
}
export async function placementDone() { return (await db.get('meta', 'placement'))?.value || null; }

/**
 * Apply a placement decision.
 * level: 'none' | 'pinyin' | 'hsk1-half' | 'hsk1' | 'hsk2' | 'hsk3' …  (a level name means that level and all below are known)
 */
export async function applyPlacement(level, scores) {
  await markOrientationDone();
  let added = 0;
  if (level === 'none') { await markPlacementDone({ level, scores, added }); return added; }
  added += await placePinyin();
  if (level === 'pinyin') { await markPlacementDone({ level, scores, added }); return added; }
  if (level === 'hsk1-half') {
    const lv = await loadHsk('hsk1');
    added += await placeLevel('hsk1', Math.ceil(lv.units.length / 2));
  } else {
    const idx = HSK_ORDER.indexOf(level);
    for (const id of HSK_ORDER.slice(0, idx + 1)) {
      await unlockLevel(id);
      added += await placeLevel(id);
    }
    const next = nextHsk(level);
    if (next) await unlockLevel(next);
  }
  await markPlacementDone({ level, scores, added });
  return added;
}
