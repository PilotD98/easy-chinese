/* Pinyin scaffolding: per-item display levels and how they move.
     3  characters with pinyin above      (introduced, not yet mastered)
     4  characters only, tap reveals      (four correct answers in a row)
   Levels move up after consistent correct answers and back down after misses.
   Settings can force pinyin always or never. */
import { settings } from '../store/settings.js';
import { Rating } from './fsrs.js';

export const PROMOTE_STREAK = 4;   // correct in a row to hide the pinyin
export const DEMOTE_LAPSES = 2;    // misses at level 4 before pinyin returns

/** Update the display level on a freshly scheduled record. Returns the record. */
export function afterAnswer(rec, rating) {
  const r = { ...rec };
  const top = 4, base = 3;
  if (!r.display || r.display < base) r.display = base;
  if (rating === Rating.Again) {
    r.missStreak = (rec.missStreak || 0) + 1;
    if (r.display >= top && r.missStreak >= DEMOTE_LAPSES) { r.display = base; r.missStreak = 0; }
  } else {
    r.missStreak = 0;
    if ((r.streak || 0) >= PROMOTE_STREAK && r.display < top) r.display = top;
  }
  return r;
}

/** Display level of an item from its record (no record = pinyin shown). */
export function levelOf(rec) { return rec?.display >= 4 ? 4 : 3; }

/** Apply the user's pinyin override to a computed level. */
export function effectiveLevel(level) {
  const p = settings.get('pinyin');
  if (p === 'always') return 3;
  if (p === 'never') return 4;
  return level >= 4 ? 4 : 3;
}
