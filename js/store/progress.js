/* Progress records: one per learned item, keyed by the item's stable content ID.
   The scheduling fields follow FSRS so the review engine can work directly on
   these records.

   {
     id: 'hanzi:爱',            // content ID (see data/SCHEMA.md)
     type: 'hanzi',            // sound | hanzi | vocab | grammar | reading
     state: 0,                 // 0 new, 1 learning, 2 review, 3 relearning (FSRS states)
     due: ISO | null,
     stability: 0,             // FSRS stability (days)
     difficulty: 0,            // FSRS difficulty (1..10)
     reps: 0, lapses: 0,
     lastReview: ISO | null,
     stage: 'new',             // new | learning | familiar | mastered | burned (derived, cached)
     display: 3,               // pinyin scaffolding level for this item (3 pinyin shown, 4 hidden)
     streak: 0,                // consecutive correct answers
     known: false,             // learner marked it "already know this"
     knownSeed: false,         // the record was created by that mark (undo deletes it)
     createdAt, updatedAt      // ISO timestamps
   } */
import { db } from './db.js';

export const STAGES = ['new', 'learning', 'familiar', 'mastered', 'burned'];
export const ITEM_TYPES = ['sound', 'hanzi', 'vocab', 'grammar', 'reading'];

export function newRecord(id, type) {
  const now = new Date().toISOString();
  return {
    id, type, state: 0, due: null, stability: 0, difficulty: 0, reps: 0, lapses: 0,
    lastReview: null, stage: 'new', display: 3, streak: 0, known: false, createdAt: now, updatedAt: now
  };
}

/** Derive the mastery stage shown in the UI from FSRS stability (days). */
export function stageFor(rec) {
  if (!rec || rec.reps === 0) return 'new';
  if (rec.stability < 7) return 'learning';
  if (rec.stability < 30) return 'familiar';
  if (rec.stability < 180) return 'mastered';
  return 'burned';
}

export const progress = {
  get: (id) => db.get('progress', id),
  all: () => db.getAll('progress'),
  async save(rec) {
    rec.stage = stageFor(rec);
    rec.updatedAt = new Date().toISOString();
    await db.put('progress', rec);
    return rec;
  },
  remove: (id) => db.remove('progress', id),
  count: () => db.count('progress'),

  /** Counts per mastery stage, known items, plus number due now. */
  async summary(now = new Date()) {
    const rows = (await db.getAll('progress')) || [];
    const byStage = Object.fromEntries(STAGES.map((s) => [s, 0]));
    const byType = {};
    let due = 0, nextDue = null, known = 0;
    const nowMs = now.getTime();
    for (const r of rows) {
      if (r.known) known += 1;
      else byStage[r.stage || stageFor(r)] += 1;
      byType[r.type] = (byType[r.type] || 0) + 1;
      if (r.due && Date.parse(r.due) <= nowMs) due += 1;
      else if (r.due && (!nextDue || Date.parse(r.due) < Date.parse(nextDue))) nextDue = r.due;
    }
    return { total: rows.length, learned: rows.length - known, known, byStage, byType, due, nextDue };
  }
};
