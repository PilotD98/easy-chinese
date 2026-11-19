/* "I already know this": marks items the learner does not want to be taught.
   A known item is skipped by lessons, left out of unit quizzes and enters the
   review queue in the review state with a long initial interval, so it is
   checked lightly instead of drilled. Marks can be undone per item (a record
   created only by the mark is deleted; a learned record just loses the flag)
   or all at once from Settings. */
import { progress, newRecord } from '../store/progress.js';
import { State } from './fsrs.js';

const DAY = 86_400_000;

/** Mark items [{ id, type }] known. Returns the number newly marked. */
export async function markKnown(items, { stabilityDays = 120, spreadDays = 60, now = Date.now() } = {}) {
  let n = 0;
  for (const { id, type } of items) {
    const existing = await progress.get(id);
    if (existing) {
      if (existing.known) continue;
      existing.known = true;
      existing.knownAt = new Date(now).toISOString();
      if (existing.reps === 0 || existing.state === State.New || existing.state === State.Learning) {
        // Not yet established: give it the long interval too.
        seedFields(existing, stabilityDays, spreadDays, now);
        existing.knownSeed = existing.reps <= 1;
      }
      await progress.save(existing);
      n++;
      continue;
    }
    const rec = newRecord(id, type);
    rec.known = true;
    rec.knownSeed = true;
    rec.knownAt = new Date(now).toISOString();
    seedFields(rec, stabilityDays, spreadDays, now);
    await progress.save(rec);
    n++;
  }
  return n;
}

function seedFields(rec, stabilityDays, spreadDays, now) {
  rec.state = State.Review;
  rec.stability = stabilityDays;
  rec.difficulty = 4;
  rec.reps = Math.max(1, rec.reps || 0);
  rec.display = 4;
  rec.streak = Math.max(4, rec.streak || 0);
  const due = now + Math.floor(Math.random() * spreadDays) * DAY + 14 * DAY;
  rec.due = new Date(due).toISOString();
  rec.lastReview = new Date(now).toISOString();
  rec.scheduledDays = Math.round((due - now) / DAY);
}

/** Undo a known mark. Returns 'deleted' | 'cleared' | null. */
export async function unmarkKnown(id) {
  const rec = await progress.get(id);
  if (!rec || !rec.known) return null;
  if (rec.knownSeed) { await progress.remove(id); return 'deleted'; }
  rec.known = false;
  delete rec.knownAt;
  await progress.save(rec);
  return 'cleared';
}

/** Undo every known mark. Returns { deleted, cleared }. */
export async function resetKnown() {
  const rows = (await progress.all()) || [];
  let deleted = 0, cleared = 0;
  for (const r of rows) {
    if (!r.known) continue;
    const res = await unmarkKnown(r.id);
    if (res === 'deleted') deleted++; else if (res === 'cleared') cleared++;
  }
  return { deleted, cleared };
}

/** Set of ids currently marked known. */
export async function knownIds() {
  const rows = (await progress.all()) || [];
  return new Set(rows.filter((r) => r.known).map((r) => r.id));
}

export function isKnown(rec) { return !!rec?.known; }
