#!/usr/bin/env node
/* Content validator. Run: node scripts/validate-content.mjs
   Checks data/index.json and every level file it references:
     - the manifest is well-formed and every referenced file exists and parses
     - every item has the required fields for its type
     - all IDs are unique across the whole curriculum and follow the ID format
     - pinyin-stage words use only initials, finals and tones already introduced
     - vocabulary uses only characters taught earlier, unless marked pinyinException
     - grammar examples/exercises and readings use only taught characters
     - every zh/pinyin pair has one syllable per character (erhua allowed)
     - character stroke counts agree with the stroke data; example words contain the character
   Exit code 1 on errors. Warnings do not fail the build. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ID_RE } from '../js/content/ids.js';
import { syllables, parseSyllable } from '../js/engine/pinyin.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const LEVEL_ORDER = ['orientation', 'speaking', 'situations', 'guides', 'pinyin', 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'];

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const isHan = (ch) => /\p{Script=Han}/u.test(ch);
const hanCount = (s) => [...String(s || '')].filter(isHan).length;
const SLOT = /\[[^\]]+\]/g;

function readJSON(rel) {
  const file = path.join(DATA, rel);
  if (!fs.existsSync(file)) { err(rel, 'file does not exist'); return null; }
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { err(rel, `invalid JSON: ${e.message}`); return null; }
}

function requireFields(where, obj, fields) {
  for (const f of fields) {
    const v = obj[f];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) err(where, `missing required field "${f}"`);
  }
}

/** One syllable per Han character, erhua excepted. */
function checkPair(where, zh, pinyin) {
  if (!zh || !pinyin) return;
  const z = String(zh).replace(SLOT, ''), p = String(pinyin).replace(SLOT, '');
  const n = hanCount(z), s = syllables(p).length;
  if (n === s) return;
  const er = [...z].filter((c) => c === '儿').length;
  if (s < n && n - s <= er) return;
  err(where, `pinyin has ${s} syllables for ${n} characters: "${z}" / "${p}"`);
}

/* ---------- manifest ---------- */
const manifest = readJSON('index.json');
if (!manifest) finish();
if (manifest.schema !== 1) err('index.json', `unsupported schema ${manifest.schema}`);
const levelIds = new Set();
for (const l of manifest.levels || []) {
  requireFields(`index.json level ${l.id}`, l, ['id', 'title']);
  if (levelIds.has(l.id)) err('index.json', `duplicate level id ${l.id}`);
  levelIds.add(l.id);
  if (!LEVEL_ORDER.includes(l.id)) err('index.json', `unknown level id ${l.id}`);
}
for (const s of manifest.stages || []) {
  requireFields(`index.json stage ${s.id}`, s, ['id', 'title', 'summary']);
  if (typeof s.no !== 'number') err(`index.json stage ${s.id}`, '"no" must be a number');
  if (s.level && !levelIds.has(s.level)) err(`index.json stage ${s.id}`, `references unknown level ${s.level}`);
}

/* ---------- gather all items ---------- */
const ids = new Map();
const unitIds = new Set();
const pendingUnitRefs = [];
const charTaught = new Map();      // char -> { level, order }
const vocabById = new Map();
const levelData = {};

function registerId(id, where) {
  if (typeof id !== 'string' || !ID_RE.test(id)) { err(where, `invalid id "${id}"`); return; }
  if (ids.has(id)) err(where, `duplicate id "${id}" (also in ${ids.get(id)})`);
  else ids.set(id, where);
}

for (const level of manifest.levels || []) {
  const data = {};
  for (const [kind, rel] of Object.entries(level.files || {})) {
    const json = readJSON(rel);
    if (json) data[kind] = { rel, json };
  }
  levelData[level.id] = data;
}

// Pass 1: register IDs and taught characters/vocab
for (const [levelId, data] of Object.entries(levelData)) {
  if (data.pinyin) {
    const { rel, json } = data.pinyin;
    requireFields(rel, json, ['title', 'groups', 'quiz', 'exam']);
    const known = { initials: new Set(['', 'y', 'w']), finals: new Set(['a', 'o', 'e', 'i', 'u', 'ü']), tones: new Set([0]) };
    for (const g of json.groups || []) {
      const where = `${rel} group ${g.id}`;
      requireFields(where, g, ['id', 'title', 'kind', 'chars']);
      if (!['tones', 'initials', 'finals', 'pairs', 'sandhi'].includes(g.kind)) err(where, `unknown kind "${g.kind}"`);
      for (const c of g.chars || []) {
        requireFields(`${where} unit ${c.char}`, c, ['id', 'char', 'label', 'hint', 'sample']);
        registerId(c.id, `${where} unit ${c.char}`);
        if (c.sample) { requireFields(`${where} unit ${c.char} sample`, c.sample, ['zh', 'pinyin', 'num', 'en']); checkPair(`${where} unit ${c.char} sample`, c.sample.zh, c.sample.pinyin); }
        const m = /^py:(t|i|f|p|s):(.+)$/.exec(c.id || '');
        if (m?.[1] === 't') known.tones.add(Number(m[2]));
        if (m?.[1] === 'i') known.initials.add(m[2]);
        if (m?.[1] === 'f') known.finals.add(m[2].replace(/^v/, 'ü').replace(/v/, 'ü'));
      }
      for (const w of g.words || []) {
        const ww = `${where} word ${w.zh}`;
        requireFields(ww, w, ['id', 'zh', 'pinyin', 'num', 'meaning']);
        registerId(w.id, ww);
        checkPair(ww, w.zh, w.pinyin);
        if (g.kind === 'tones') continue; // the very first group uses a few labial sounds before they are formally taught
        for (const s of syllables(w.pinyin)) {
          if (!known.initials.has(s.initial)) err(ww, `uses initial "${s.initial}" (${s.text}) before it is introduced`);
          if (!known.finals.has(s.final) && !(s.final === 'er')) err(ww, `uses final "${s.final}" (${s.text}) before it is introduced`);
          if (!known.tones.has(s.tone)) err(ww, `uses tone ${s.tone} (${s.text}) before it is introduced`);
        }
        const num = syllables(w.num).map((x) => x.base + x.tone).join(' ');
        const mk = syllables(w.pinyin).map((x) => x.base + x.tone).join(' ');
        if (num !== mk) err(ww, `num "${w.num}" does not match pinyin "${w.pinyin}"`);
      }
    }
  }
  if (data.orientation) {
    const { rel, json } = data.orientation;
    requireFields(rel, json, ['title', 'sections']);
    for (const s of json.sections || []) { requireFields(`${rel} section ${s.id}`, s, ['id', 'title', 'body']); if (s.example) checkPair(`${rel} section ${s.id} example`, s.example.zh, s.example.pinyin); }
  }
  if (data.chars) {
    const { rel, json } = data.chars;
    if (!Array.isArray(json)) err(rel, 'must be a list');
    const strokeFile = path.join(DATA, 'strokes', `${levelId}.json`);
    const strokeData = fs.existsSync(strokeFile) ? JSON.parse(fs.readFileSync(strokeFile, 'utf8')) : null;
    if (!strokeData) warn(rel, `no stroke data at data/strokes/${levelId}.json`);
    for (const k of json || []) {
      const where = `${rel} ${k.char || k.id}`;
      requireFields(where, k, ['id', 'char', 'level', 'order', 'pinyin', 'num', 'meanings', 'strokes', 'examples']);
      if (k.level !== levelId) err(where, `level "${k.level}" does not match file level "${levelId}"`);
      if (k.char && k.id !== `hanzi:${k.char}`) err(where, `id should be "hanzi:${k.char}"`);
      registerId(k.id, where);
      if (strokeData) { const sd = strokeData[k.char]; if (!sd) warn(where, 'no stroke data'); else if (sd.strokes.length !== k.strokes) err(where, `strokes is ${k.strokes} but stroke data has ${sd.strokes.length}`); }
      if (!k.mnemonic) warn(where, 'no mnemonic');
      if (k.char) {
        if (charTaught.has(k.char)) err(where, `character ${k.char} is also taught in ${charTaught.get(k.char).level}`);
        charTaught.set(k.char, { level: levelId, order: k.order });
      }
    }
  }
  if (data.vocab) {
    const { rel, json } = data.vocab;
    if (!Array.isArray(json)) err(rel, 'must be a list');
    for (const v of json || []) {
      const where = `${rel} ${v.zh || v.id}`;
      requireFields(where, v, ['id', 'zh', 'pinyin', 'num', 'level', 'order', 'meanings', 'pos']);
      if (v.level !== levelId) err(where, `level "${v.level}" does not match file level "${levelId}"`);
      registerId(v.id, where);
      checkPair(where, v.zh, v.pinyin);
      vocabById.set(v.id, { level: levelId, order: v.order, zh: v.zh });
    }
  }
  if (data.grammar) {
    const { rel, json } = data.grammar;
    if (!Array.isArray(json)) err(rel, 'must be a list');
    for (const g of json || []) {
      const where = `${rel} ${g.id}`;
      requireFields(where, g, ['id', 'level', 'order', 'title', 'pattern', 'explanation', 'examples', 'exercises']);
      if ((g.examples || []).length < 3) err(where, 'needs at least 3 examples');
      for (const ex of g.examples || []) { requireFields(`${where} example`, ex, ['zh', 'pinyin', 'en']); checkPair(`${where} example "${ex.zh}"`, ex.zh, ex.pinyin); }
      for (const x of g.exercises || []) {
        requireFields(`${where} exercise`, x, ['type', 'prompt', 'answer']);
        if (!['fill', 'choose', 'order', 'produce'].includes(x.type)) err(`${where} exercise`, `unknown exercise type ${x.type}`);
        if (x.type === 'fill' && !String(x.prompt).includes('＿')) err(`${where} exercise "${x.prompt}"`, 'fill prompt needs a ＿ blank');
        if ((x.type === 'fill' || x.type === 'choose') && !(x.choices || []).includes(x.answer)) err(`${where} exercise "${x.prompt}"`, 'answer is not among the choices');
        if (x.type === 'order' && (x.choices || []).join('') !== x.answer) err(`${where} exercise "${x.prompt}"`, 'order pieces do not concatenate to the answer');
      }
      registerId(g.id, where);
    }
  }
  for (const kind of ['readings', 'listening']) {
    if (!data[kind]) continue;
    const { rel, json } = data[kind];
    if (!Array.isArray(json)) err(rel, 'must be a list');
    for (const r of json || []) {
      const where = `${rel} ${r.id}`;
      requireFields(where, r, kind === 'listening' ? ['id', 'level', 'order', 'title', 'type', 'items'] : ['id', 'level', 'order', 'title', 'text', 'pinyin', 'questions']);
      if (kind === 'listening' && !['dictation', 'comprehension', 'shadow'].includes(r.type)) err(where, `unknown listening type ${r.type}`);
      if (kind === 'readings') checkPair(where, r.text, r.pinyin);
      for (const it of r.items || []) checkPair(`${where} item "${it.text}"`, it.text, it.pinyin);
      registerId(r.id, where);
    }
  }
  if (data.units) {
    const { rel, json } = data.units;
    if (!Array.isArray(json)) err(rel, 'must be a list');
    for (const u of json || []) {
      const where = `${rel} ${u.id}`;
      requireFields(where, u, ['id', 'no', 'level', 'title']);
      if (!/^unit:[a-z0-9]+:\d+$/.test(u.id || '')) err(where, 'unit id must look like unit:hsk1:01');
      if (unitIds.has(u.id)) err(where, 'duplicate unit id'); unitIds.add(u.id);
      pendingUnitRefs.push([where, [...(u.chars || []), ...(u.vocab || []), ...(u.grammar || []), ...(u.readings || []), ...(u.listening || [])]]);
    }
  }
  if (data.guides) {
    const { rel, json } = data.guides;
    const seen = new Set();
    for (const g of json.guides || []) {
      const where = `${rel} guide ${g.id}`;
      requireFields(where, g, ['id', 'title', 'summary', 'minutes', 'sections']);
      if (seen.has(g.id)) err(where, 'duplicate guide id'); seen.add(g.id);
      (g.sections || []).forEach((sec, i) => {
        const w = `${where} section ${i + 1}`;
        if (!sec.title) err(w, 'section needs a title');
        if (!(sec.body?.length || sec.items?.length || sec.links?.length)) err(w, 'section needs body, items or links');
        (sec.items || []).forEach((it, j) => { if (!it.zh || !it.en) err(`${w} item ${j + 1}`, 'item needs zh and en'); if (it.pinyin) checkPair(`${w} item ${j + 1}`, it.zh.replace(/[→/].*$/, ''), it.pinyin.replace(/[→/].*$/, '')); });
        (sec.links || []).forEach((l, j) => { if (!/^https:\/\//.test(l.url || '')) err(`${w} link ${j + 1}`, 'link needs an https url'); });
      });
    }
  }
  if (data.speaking) {
    const { rel, json } = data.speaking;
    for (const set of json.sets || []) {
      const where = `${rel} set ${set.id}`;
      requireFields(where, set, ['id', 'mode', 'level', 'title', 'summary']);
      if (!['repeat', 'shadow', 'question', 'roleplay'].includes(set.mode)) err(where, `unknown mode ${set.mode}`);
      if (!['pinyin', 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'].includes(set.level)) err(where, `unknown level ${set.level}`);
      registerId(set.id, where);
      const items = set.mode === 'roleplay' ? set.turns : set.items;
      if (!Array.isArray(items) || !items.length) { err(where, 'needs items (or turns for roleplay)'); continue; }
      items.forEach((it, i) => {
        const w = `${where} #${i + 1}`;
        if (set.mode === 'roleplay') { requireFields(w, it, ['who', 'zh', 'pinyin', 'en']); if (!['you', 'partner'].includes(it.who)) err(w, 'who must be you|partner'); }
        else if (set.mode === 'question') { requireFields(w, it, ['id', 'q', 'qPinyin', 'qEn', 'model', 'modelPinyin', 'en']); registerId(it.id, w); checkPair(w, it.q, it.qPinyin); checkPair(w, it.model, it.modelPinyin); }
        else { requireFields(w, it, ['id', 'zh', 'pinyin', 'en']); registerId(it.id, w); }
        if (it.zh) checkPair(w, it.zh, it.pinyin);
      });
    }
  }
}

/* ---------- Pass 2: prerequisite checks ---------- */
function taughtBefore(ch, level, order) {
  const tg = charTaught.get(ch);
  if (!tg) return false;
  const li = LEVEL_ORDER.indexOf(tg.level), lj = LEVEL_ORDER.indexOf(level);
  return li < lj || (li === lj && tg.order < order);
}
function untaught(text, level, order) {
  const out = new Set();
  for (const ch of String(text || '').replace(SLOT, '')) if (isHan(ch) && !taughtBefore(ch, level, order)) out.add(ch);
  return [...out];
}

for (const [levelId, data] of Object.entries(levelData)) {
  if (data.vocab) {
    const { rel, json } = data.vocab;
    for (const v of json || []) {
      const missing = untaught(v.zh, levelId, v.order);
      if (missing.length && !v.pinyinException) err(`${rel} ${v.zh}`, `uses untaught characters ${missing.join('')} (teach them first, reorder, or set pinyinException: true)`);
      for (const kid of v.chars || []) if (!ids.has(kid)) err(`${rel} ${v.zh}`, `references unknown character id ${kid}`);
    }
  }
  if (data.chars) {
    const { rel, json } = data.chars;
    for (const k of json || []) {
      for (const vid of k.examples || []) {
        const v = vocabById.get(vid);
        if (!v) { err(`${rel} ${k.char}`, `example ${vid} is not a known vocabulary id`); continue; }
        if (!v.zh.includes(k.char)) err(`${rel} ${k.char}`, `example ${vid} (${v.zh}) does not contain ${k.char}`);
      }
    }
  }
  if (data.grammar) {
    const { rel, json } = data.grammar;
    for (const g of json || []) {
      for (const ex of g.examples || []) {
        const missing = untaught(ex.zh, levelId, g.order);
        if (missing.length) err(`${rel} ${g.id} example "${ex.zh}"`, `uses untaught characters ${missing.join('')}`);
      }
      for (const x of g.exercises || []) {
        const missing = untaught(`${x.prompt} ${x.answer} ${(x.choices || []).join(' ')}`, levelId, g.order);
        if (missing.length) err(`${rel} ${g.id} exercise "${x.prompt}"`, `uses untaught characters: ${missing.join('')}`);
      }
    }
  }
  for (const [where, refs] of pendingUnitRefs) for (const id of refs) if (!ids.has(id)) err(where, `references unknown id ${id}`);
  for (const kind of ['readings', 'listening']) {
    if (!data[kind]) continue;
    const { rel, json } = data[kind];
    for (const r of json || []) {
      const text = kind === 'listening' ? (r.items || []).map((it) => it.text).join('') : r.text;
      const missing = untaught(text, levelId, r.order ?? Number.MAX_SAFE_INTEGER);
      if (missing.length) err(`${rel} ${r.id}`, `uses characters not taught by its unit: ${missing.join('')}`);
      const qs = kind === 'listening' ? (r.items || []).flatMap((it) => it.questions || []) : (r.questions || []);
      for (const q of qs) {
        if (typeof q.answer !== 'number' || !Array.isArray(q.choices) || q.answer < 0 || q.answer >= q.choices.length) err(`${rel} ${r.id}`, 'question needs "choices" and a valid "answer" index');
        const qm = untaught(`${q.q} ${(q.choices || []).join('')}`, levelId, r.order ?? Number.MAX_SAFE_INTEGER);
        if (qm.length) err(`${rel} ${r.id} question "${q.q}"`, `uses untaught characters: ${qm.join('')}`);
      }
    }
  }
}

finish();

function finish() {
  const files = Object.values(levelData).reduce((n, d) => n + Object.keys(d).length, 0);
  console.log(`Checked ${files} content file(s), ${ids.size} item(s).`);
  for (const w of warnings.slice(0, 40)) console.log(`warning  ${w}`);
  if (warnings.length > 40) console.log(`… ${warnings.length - 40} more warnings`);
  for (const e of errors) console.log(`error    ${e}`);
  console.log(errors.length ? `\n${errors.length} error(s), ${warnings.length} warning(s).` : `\nOK. ${warnings.length} warning(s).`);
  process.exit(errors.length ? 1 : 0);
}
