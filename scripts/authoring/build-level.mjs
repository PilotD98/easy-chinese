// Builds data/<level>/{chars,vocab,grammar,readings,listening,units}.json for an HSK
// level from its authored sources plus the CC-CEDICT / Make Me a Hanzi extracts.
//   node scripts/authoring/build-level.mjs hsk1
// Needs: cache/verified-<level>.json (check-vocab.mjs), cache/hsk-words.json (fetch-hsk.mjs),
// cache/cedict.json, cache/mmah.json (fetch-hanzi.mjs dictionary) and data/strokes/<level>.json.
// Optional sources in <level>/: units-src.mjs, grammar-src.mjs, readings-src.mjs;
// ja/<level>-vocab.json, ja/<level>-chars.json (Japanese glosses), mnemonics/<level>.json,
// overrides/<level>.json ({ "词": { "meanings": [...], "pos": [...] } }).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syllables, toMarked, toNumbered } from '../../js/engine/pinyin.js';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '../..');
const CACHE = path.join(__dir, 'cache');
const LEVEL = process.argv[2];
if (!/^hsk[1-6]$/.test(LEVEL || '')) { console.error('Usage: node scripts/authoring/build-level.mjs hsk1…hsk6'); process.exit(2); }
const N = Number(LEVEL.slice(3));
const LEVEL_ORDER = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'];
const PREVIOUS = LEVEL_ORDER.slice(0, N - 1);
const UNIT_SIZE = Number(process.env.UNIT_SIZE || (N <= 2 ? 14 : N <= 4 ? 15 : 16));
const isHan = (c) => /\p{Script=Han}/u.test(c);

const readJ = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const optional = (p) => (fs.existsSync(p) ? readJ(p) : {});
const src = async (name) => { const f = path.join(__dir, LEVEL, name); return fs.existsSync(f) ? import(`file:///${f.replace(/\\/g, '/')}`) : null; };

const verified = readJ(path.join(CACHE, `verified-${LEVEL}.json`));
const hskWords = readJ(path.join(CACHE, 'hsk-words.json'))[N];
const cedict = readJ(path.join(CACHE, 'cedict.json'));
const mmah = readJ(path.join(CACHE, 'mmah.json'));
const strokes = readJ(path.join(ROOT, 'data/strokes', `${LEVEL}.json`));
const jaVocab = optional(path.join(__dir, 'ja', `${LEVEL}-vocab.json`));
const jaChars = optional(path.join(__dir, 'ja', `${LEVEL}-chars.json`));
const mnemonics = optional(path.join(__dir, 'mnemonics', `${LEVEL}.json`));
const overrides = optional(path.join(__dir, 'overrides', `${LEVEL}.json`));
const unitsSrc = await src('units-src.mjs');
const grammarSrc = await src('grammar-src.mjs');
const readingsSrc = await src('readings-src.mjs');
const problems = [];

// Characters and words taught at earlier levels count as known from unit 0.
const priorChars = new Set();
const priorVocab = [];
for (const lv of PREVIOUS) {
  for (const k of readJ(path.join(ROOT, 'data', lv, 'chars.json'))) priorChars.add(k.char);
  priorVocab.push(...readJ(path.join(ROOT, 'data', lv, 'vocab.json')));
}

/* ---------- word records (from the CC-CEDICT check) ---------- */
const words = hskWords.map((w) => {
  const v = verified[w.zh] || {};
  const ov = overrides[w.zh] || {};
  const pinyin = v.pinyin || toMarked(w.num);
  const num = v.num || toNumbered(w.num);
  return { zh: w.zh, trad: v.trad || w.trad, pinyin, num, glosses: ov.meanings || v.glosses || w.meanings, pos: ov.pos || w.pos, freq: w.freq, verified: !!v.found };
});
const newChars = [];
const seen = new Set(priorChars);
for (const w of words) for (const ch of w.zh) if (isHan(ch) && !seen.has(ch)) { seen.add(ch); newChars.push(ch); }

/* ---------- unit plan ---------- */
let plan; // [{ title, title_ja, chars: [] }]
if (unitsSrc?.UNITS) {
  plan = unitsSrc.UNITS.map((u) => ({ ...u }));
  const placed = new Set();
  for (const u of plan) for (const c of u.chars) { if (placed.has(c)) problems.push(`character ${c} placed twice in units-src`); placed.add(c); if (!newChars.includes(c)) problems.push(`character ${c} in units-src is not a new character of ${LEVEL}`); }
  for (const c of newChars) if (!placed.has(c)) problems.push(`character ${c} is missing from units-src`);
} else {
  plan = [];
  const count = Math.ceil(newChars.length / UNIT_SIZE);
  const size = Math.ceil(newChars.length / count);
  const titles = optional(path.join(__dir, LEVEL, 'unit-titles.json'));
  for (let i = 0; i < newChars.length; i += size) { const no = plan.length + 1; plan.push({ title: titles[no]?.title || `Unit ${no}`, title_ja: titles[no]?.title_ja, chars: newChars.slice(i, i + size) }); }
}
const charUnit = new Map();
plan.forEach((u, i) => u.chars.forEach((c) => charUnit.set(c, i + 1)));
const totalUnits = plan.length;

/* ---------- per-character readings observed in words (all HSK levels loaded so far + this one) ---------- */
const readingsOf = new Map(); // char -> Map(numbered reading -> count)
const observe = (zh, num) => {
  const syl = syllables(num);
  const hans = [...zh].filter(isHan);
  if (syl.length !== hans.length) return;
  hans.forEach((ch, i) => {
    const r = syl[i].base + (syl[i].tone || 5);
    if (!readingsOf.has(ch)) readingsOf.set(ch, new Map());
    const m = readingsOf.get(ch); m.set(r, (m.get(r) || 0) + 1);
  });
};
for (const v of priorVocab) observe(v.zh, v.num);
for (const w of words) observe(w.zh, w.num);

const cleanGloss = (g) => g.replace(/\s*\(CL:[^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '').replace(/[\p{Script=Han}]+\|([\p{Script=Han}]+)/gu, '$1').replace(/\s*\((Taiwan|colloquial|coll\.|also|literary|old) pr\.?[^)]*\)/g, '').replace(/^also pr\.?.*$/, '').replace(/\s+/g, ' ').trim();
const SKIP_GLOSS = /^(see |variant of|old variant|surname|abbr\. for|\(classical\)|\(literary\)|CL:|used in |\(onom\.\)|\(bound form\)|\(archaic\)|\(dialect\)|Kangxi radical|radical in Chinese characters)/i;

function charGlosses(ch, readingNum) {
  const entries = (cedict[ch] || []).filter((e) => !/^[A-Z]/.test(e.num));
  const want = readingNum ? syllables(readingNum)[0] : null;
  const same = want ? entries.filter((e) => { const s = syllables(e.num)[0]; return s && s.base === want.base && (s.tone || 5) === (want.tone || 5); }) : [];
  const pool = (same.length ? same : entries).flatMap((e) => e.glosses).map(cleanGloss).filter((g) => g && !SKIP_GLOSS.test(g));
  const out = [];
  for (const g of pool) { const s = g.replace(/^to /, '').split(';')[0].trim(); if (s && !out.includes(s)) out.push(s); if (out.length >= 3) break; }
  if (!out.length) { const d = mmah[ch]?.definition; if (d) out.push(...d.split(/[;,]/).map((x) => x.trim()).filter(Boolean).slice(0, 3)); }
  return out;
}

/* ---------- characters ---------- */
const chars = newChars.map((ch) => {
  const unit = charUnit.get(ch) || totalUnits;
  const observed = [...(readingsOf.get(ch) || new Map()).entries()].sort((a, b) => b[1] - a[1]).map(([r]) => r);
  let nums = observed;
  if (!nums.length) {
    const entries = (cedict[ch] || []).filter((e) => !/^[A-Z]/.test(e.num));
    nums = [...new Set(entries.map((e) => toNumbered(e.num)))].slice(0, 2);
  }
  if (!nums.length) problems.push(`no reading for ${ch}`);
  const sd = strokes[ch];
  if (!sd) problems.push(`no stroke data for ${ch}`);
  const mm = mmah[ch] || {};
  const comps = [...new Set([...(mm.decomposition || '')].filter((c) => isHan(c) || /[⺀-⿕]/.test(c)))].filter((c) => c !== ch).slice(0, 4);
  const ja = jaChars[ch] || {};
  const mn = mnemonics[ch] || {};
  const trad = (cedict[ch] || []).find((e) => !/^[A-Z]/.test(e.num))?.trad || (cedict[ch] || [])[0]?.trad || ch;
  const idx = plan[unit - 1].chars.indexOf(ch);
  return {
    id: `hanzi:${ch}`, char: ch, trad, level: LEVEL, unit, order: unit * 100 + (idx < 0 ? 0 : idx),
    pinyin: nums.map(toMarked), num: nums,
    meanings: ja.en?.length ? ja.en : charGlosses(ch, nums[0]), meanings_ja: ja.ja || undefined,
    strokes: sd ? sd.strokes.length : null, radical: mm.radical || '', components: comps,
    mnemonic: mn.en || undefined, mnemonic_ja: mn.ja || undefined, hint: mm.hint || undefined, examples: []
  };
});
const charSet = new Set(newChars);

/* ---------- vocabulary ---------- */
const seenIds = new Set(priorVocab.map((v) => v.id));
const vocab = [];
words.forEach((w, i) => {
  const hans = [...w.zh].filter(isHan);
  const levelChars = hans.filter((c) => charSet.has(c));
  const unit = levelChars.length ? Math.max(...levelChars.map((c) => charUnit.get(c))) : Math.min(totalUnits, Math.max(1, Math.ceil(((i + 1) / words.length) * totalUnits)));
  const id = `vocab:${LEVEL}:${w.num.replace(/\s+/g, '')}-${w.zh}`;
  if (seenIds.has(id)) problems.push(`duplicate id ${id}`);
  if (priorVocab.some((v) => v.zh === w.zh)) problems.push(`${w.zh} already taught at an earlier level`);
  seenIds.add(id);
  const ja = jaVocab[w.zh] || {};
  let meanings = (ja.en?.length ? ja.en : (w.glosses || [])).map(cleanGloss).filter((g) => g && !SKIP_GLOSS.test(g)).slice(0, 4);
  if (!meanings.length) meanings = (hskWords.find((x) => x.zh === w.zh)?.meanings || []).map(cleanGloss).filter(Boolean).slice(0, 4);
  if (!meanings.length) problems.push(`no gloss for ${w.zh}`);
  vocab.push({
    id, zh: w.zh, trad: w.trad, pinyin: w.pinyin, num: w.num, level: LEVEL, unit, order: unit * 100 + 20 + (i % 60) / 100,
    meanings, meanings_ja: ja.ja || undefined, note_ja: ja.note || undefined,
    pos: w.pos?.length ? w.pos : [w.zh.length >= 3 ? 'l' : 'n'], chars: [...new Set(hans)].map((c) => `hanzi:${c}`), freq: w.freq ?? undefined,
    verified: w.verified || undefined
  });
});

/* ---------- example words per character ---------- */
const allVocab = [...vocab, ...priorVocab];
for (const k of chars) {
  const unitOf = (v) => (v.level === LEVEL ? v.unit : 0);
  const cands = allVocab.filter((v) => v.zh.includes(k.char)).sort((a, b) => unitOf(a) - unitOf(b) || (a.freq ?? 1e9) - (b.freq ?? 1e9) || a.zh.length - b.zh.length);
  const early = cands.filter((v) => unitOf(v) <= k.unit).slice(0, 4);
  const later = cands.filter((v) => unitOf(v) > k.unit).slice(0, Math.max(0, 2 - early.length));
  k.examples = [...early, ...later].map((v) => v.id);
  if (!k.examples.length) problems.push(`no example word for ${k.char}`);
}

/* ---------- grammar ---------- */
const grammar = (grammarSrc?.GRAMMAR || []).map((g, j) => ({
  id: `gram:${LEVEL}:${g.id}`, level: LEVEL, unit: g.unit, order: g.unit * 100 + 50 + (j % 10),
  title: g.title, title_ja: g.title_ja, pattern: g.pattern, summary: g.summary, summary_ja: g.summary_ja,
  explanation: g.explanation, explanation_ja: g.explanation_ja,
  examples: g.ex.map(([zh, pinyin, en, ja]) => ({ zh, pinyin, en, ja })),
  mistakes: g.mistakes || [], mistakes_ja: g.mistakes_ja || [],
  exercises: g.exercises.map((x) => ({ ...x }))
}));
for (const g of grammar) if (g.unit > totalUnits) problems.push(`grammar ${g.id} unit ${g.unit} beyond ${totalUnits}`);

/* ---------- readings & listening ---------- */
const readings = (readingsSrc?.READINGS || []).map((r) => ({
  id: r.id, level: LEVEL, unit: r.unit, order: r.unit * 100 + 90, title: r.title, en: r.en, ja: r.ja,
  text: r.text, pinyin: r.pinyin, enText: r.enText, jaText: r.jaText, questions: r.questions
}));
const listening = (readingsSrc?.LISTENING || []).map((l) => ({
  id: l.id, level: LEVEL, unit: l.unit, order: l.unit * 100 + 95, type: l.type, title: l.title, title_ja: l.title_ja,
  items: l.items
}));

/* ---------- units ---------- */
const units = plan.map((u, i) => {
  const no = i + 1;
  return {
    id: `unit:${LEVEL}:${String(no).padStart(2, '0')}`, no, level: LEVEL, title: u.title || `Unit ${no}`, title_ja: u.title_ja || undefined,
    chars: chars.filter((k) => k.unit === no).map((k) => k.id),
    vocab: vocab.filter((v) => v.unit === no).map((v) => v.id),
    grammar: grammar.filter((g) => g.unit === no).map((g) => g.id),
    readings: readings.filter((r) => r.unit === no).map((r) => r.id),
    listening: listening.filter((l) => l.unit === no).map((l) => l.id)
  };
});

const outDir = path.join(ROOT, 'data', LEVEL);
fs.mkdirSync(outDir, { recursive: true });
const write = (name, data) => fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(data, null, 1), 'utf8');
write('chars', chars); write('vocab', vocab); write('grammar', grammar); write('readings', readings); write('listening', listening); write('units', units);
console.log(`${LEVEL}: chars ${chars.length}, vocab ${vocab.length} (${vocab.filter((v) => v.verified).length} verified, ${vocab.filter((v) => v.meanings_ja).length} with Japanese), grammar ${grammar.length}, readings ${readings.length}, listening ${listening.length}, units ${units.length}`);
console.log('vocab per unit:', units.map((u) => u.vocab.length).join(' '));
if (problems.length) { console.log('PROBLEMS:\n' + [...new Set(problems)].join('\n')); process.exit(1); }
