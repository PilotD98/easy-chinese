// Verifies a level's HSK word list against CC-CEDICT and writes cache/verified-<level>.json,
// the per-word record (pinyin, traditional form, glosses) that build-level.mjs uses.
//   node scripts/authoring/check-vocab.mjs hsk1
// Needs cache/cedict.json (fetch-cedict.mjs) and cache/hsk-words.json (fetch-hsk.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toNumbered, toMarked, syllables } from '../../js/engine/pinyin.js';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const CACHE = path.join(__dir, 'cache');
const LEVEL = process.argv[2];
if (!/^hsk[1-6]$/.test(LEVEL || '')) { console.error('Usage: node scripts/authoring/check-vocab.mjs hsk1…hsk6'); process.exit(2); }
const N = Number(LEVEL.slice(3));

const cedict = JSON.parse(fs.readFileSync(path.join(CACHE, 'cedict.json'), 'utf8'));
const hsk = JSON.parse(fs.readFileSync(path.join(CACHE, 'hsk-words.json'), 'utf8'));
const words = hsk[N];

// Readings the HSK list intends, where CC-CEDICT's first entry is a surname, a rare reading or a variant.
const OVERRIDES = JSON.parse(fs.existsSync(path.join(__dir, 'pinyin-overrides.json')) ? fs.readFileSync(path.join(__dir, 'pinyin-overrides.json'), 'utf8') : '{}');

const norm = (num) => syllables(num).map((s) => s.base + (s.tone || 5)).join(' ');
const isProper = (e) => /^[A-Z]/.test(e.num) || e.glosses.every((g) => /^(surname|variant of|old variant|see |abbr\.|\(archaic\)|CL:)/i.test(g));
const cleanGloss = (g) => g.replace(/\s*\(CL:[^)]*\)/g, '').replace(/^CL:.*$/, '').replace(/\s*\[[^\]]*\]/g, '').replace(/[\p{Script=Han}]+\|([\p{Script=Han}]+)/gu, '$1').replace(/\s*\((Taiwan|colloquial|coll\.|also|literary|old) pr\.?[^)]*\)/g, '').replace(/^also pr\.?.*$/, '').replace(/\s+/g, ' ').trim();

const out = {};
let found = 0, missing = [], mismatched = [], proper = 0;
for (const w of words) {
  const entries = cedict[w.zh] || [];
  if (!entries.length) { missing.push(w.zh); out[w.zh] = { found: false, pinyin: w.pinyin, num: w.num, trad: w.trad, glosses: w.meanings }; continue; }
  const want = OVERRIDES[w.zh] ? norm(OVERRIDES[w.zh]) : null;
  // Candidate readings: all HSK forms; prefer the one with an override, else a non-proper-noun entry with the most glosses.
  const forms = [{ num: w.num, meanings: w.meanings, trad: w.trad }, ...(w.altForms || [])];
  const listWords = new Set(forms.flatMap((f) => f.meanings.join(' ').toLowerCase().split(/[^a-z]+/)).filter((x) => x.length > 2));
  const overlap = (e) => e.glosses.join(' ').toLowerCase().split(/[^a-z]+/).filter((x) => x.length > 2 && listWords.has(x)).length;
  const scored = entries.filter((e) => !isProper(e)).map((e) => ({ e, score: Math.min(3, e.glosses.filter((g) => !/^(see |variant of|old variant|CL:)/.test(g)).length) + 4 * overlap(e) + (forms.some((f) => norm(f.num) === norm(e.num)) ? 5 : 0) + (want && norm(e.num) === want ? 100 : 0) }));
  const pool = scored.length ? scored : entries.map((e) => ({ e, score: 0 }));
  pool.sort((a, b) => b.score - a.score);
  const best = pool[0].e;
  const num = norm(best.num);
  const form = forms.find((f) => norm(f.num) === num) || forms[0];
  const listNum = norm(form.num);
  if (listNum !== num) mismatched.push(`${w.zh}: list ${form.num} vs cedict ${best.num}`);
  if (isProper(best)) proper++;
  const glosses = best.glosses.map(cleanGloss).filter((g) => g && !/^(see |variant of|old variant)/.test(g));
  out[w.zh] = { found: true, pinyin: toMarked(num), num, trad: best.trad, glosses: glosses.length ? glosses : form.meanings.map(cleanGloss), listGlosses: form.meanings, pos: w.pos, freq: w.freq };
  found++;
}
fs.mkdirSync(CACHE, { recursive: true });
fs.writeFileSync(path.join(CACHE, `verified-${LEVEL}.json`), JSON.stringify(out, null, 1));
console.log(`${LEVEL}: ${words.length} words, ${found} found in CC-CEDICT, ${missing.length} missing, ${proper} proper-noun readings`);
if (missing.length) console.log('NOT FOUND:', missing.join(' '));
if (mismatched.length) console.log(`READING DIFFERS (${mismatched.length}):\n  ` + mismatched.join('\n  '));
