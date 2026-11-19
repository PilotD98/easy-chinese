/* HSK-level content helpers: load a level, index characters/vocab/grammar/
   readings/listening/units, track passed units, and build the reading
   dictionary used to turn the recogniser's characters into pinyin. */
import { loadLevel } from './loader.js';
import { loadStrokes } from '../ui/stroke.js';
import { progress } from '../store/progress.js';
import { db } from '../store/db.js';
import { isUnlocked, unlockLevel } from './pinyin-stage.js';
import { HSK_ORDER, nextHsk } from './ids.js';
import { readingDict } from '../engine/reading.js';

const cache = new Map();

export async function loadHsk(levelId = 'hsk1') {
  if (cache.has(levelId)) return cache.get(levelId);
  const p = (async () => {
    const level = await loadLevel(levelId);
    if (!level.files || !Object.keys(level.files).length) throw new Error(`Level ${levelId} is not in this build`);
    const d = level.data;
    let strokes = {};
    try { strokes = await loadStrokes(levelId); } catch { /* optional */ }
    const chars = d.chars || [], vocab = d.vocab || [], grammar = d.grammar || [], readings = d.readings || [], listening = d.listening || [], units = d.units || [];
    const byId = new Map();
    for (const list of [chars, vocab, grammar, readings, listening, units]) for (const it of list) byId.set(it.id, it);
    const charByGlyph = new Map(chars.map((k) => [k.char, k]));
    const vocabBySurface = new Map();
    for (const v of vocab) { if (!vocabBySurface.has(v.zh)) vocabBySurface.set(v.zh, []); vocabBySurface.get(v.zh).push(v); }
    // Earlier levels are known material: include their words and characters for lookups and pinyin.
    const allById = new Map(byId);
    const allVocab = [...vocab], allChars = [...chars];
    for (const prevId of HSK_ORDER.slice(0, HSK_ORDER.indexOf(levelId))) {
      const prev = await loadHsk(prevId);
      for (const [id, it] of prev.byId) if (!allById.has(id)) allById.set(id, it);
      for (const v of prev.vocab) { if (!vocabBySurface.has(v.zh)) vocabBySurface.set(v.zh, []); vocabBySurface.get(v.zh).push(v); allVocab.push(v); }
      for (const [c, k] of prev.charByGlyph) if (!charByGlyph.has(c)) charByGlyph.set(c, k);
      allChars.push(...prev.chars);
    }
    const surfaces = [...vocabBySurface.keys()].sort((a, b) => b.length - a.length);
    const dict = readingDict(allVocab, allChars);
    return { id: levelId, title: level.title, targets: level.targets, strokes, chars, vocab, grammar, readings, listening, units, byId, allById, charByGlyph, vocabBySurface, surfaces, dict };
  })();
  cache.set(levelId, p);
  p.catch(() => cache.delete(levelId));
  return p;
}

/** Every HSK level that is in this build, in order (stops at the first missing). */
export async function loadAllHsk() {
  const out = {};
  for (const id of HSK_ORDER) { try { out[id] = await loadHsk(id); } catch { break; } }
  return out;
}

/* ---------- unit progress (meta store) ---------- */
export async function passedUnits(levelId = 'hsk1') {
  const row = await db.get('meta', `${levelId}:units`);
  return new Set(row?.value || []);
}
export async function markUnitPassed(levelId, unitId) {
  const set = await passedUnits(levelId);
  set.add(unitId);
  await db.put('meta', { id: `${levelId}:units`, value: [...set] });
  const lv = await loadHsk(levelId);
  if (lv.units.every((u) => set.has(u.id))) { const next = nextHsk(levelId); if (next) await unlockLevel(next); }
}
export async function hskStatus(levelId = 'hsk1') {
  const lv = await loadHsk(levelId);
  const passed = await passedUnits(levelId);
  const nextUnit = lv.units.find((u) => !passed.has(u.id)) || null;
  return { level: lv, passed, nextUnit, total: lv.units.length, unlocked: await isUnlocked(levelId) };
}

/** Items of a unit as [{ id, type }] for the scheduler. */
export function unitItems(lv, unit) {
  const out = [];
  for (const id of unit.chars) out.push({ id, type: 'hanzi', display: 3 });
  for (const id of unit.vocab) out.push({ id, type: 'vocab', display: 3 });
  for (const id of unit.grammar) out.push({ id, type: 'grammar', display: 3 });
  return out;
}

/** Tokenise a sentence into vocabulary matches: [{ text, vocab? }] (longest match first). */
export function tokenize(lv, text) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    const s = lv.surfaces.find((sf) => sf.length > 1 && text.startsWith(sf, i)) || lv.surfaces.find((sf) => text.startsWith(sf, i));
    if (s) { out.push({ text: s, vocab: lv.vocabBySurface.get(s)[0] }); i += s.length; }
    else { out.push({ text: text[i] }); i += 1; }
  }
  return out;
}

/** Look up a word by surface (for tap-to-lookup in readings). */
export function lookup(lv, text) { return lv.vocabBySurface.get(text)?.[0] || null; }

/** Progress records for all items of a level (and earlier ones), keyed by id. */
export async function recordsFor(lv) {
  const rows = (await progress.all()) || [];
  const map = new Map();
  for (const r of rows) if (lv.allById.has(r.id)) map.set(r.id, r);
  return map;
}

/** Which HSK level teaches this character (from the loaded levels), or null. */
export async function levelOfChar(ch) {
  for (const id of HSK_ORDER) { try { const lv = await loadHsk(id); if (lv.charByGlyph.get(ch)?.level === id) return id; } catch { break; } }
  return null;
}
