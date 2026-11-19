#!/usr/bin/env node
/* Downloads the HSK vocabulary compilation by Yanis Zafirópulos
   (https://github.com/drkameleon/complete-hsk-vocabulary, MIT) and extracts
   the HSK 2.0 lists (its "old-1" … "old-6" levels: 150 / 150 / 300 / 600 /
   1300 / 2500 words). Word order inside a level is the list's own order.

   Usage:
     node scripts/fetch-hsk.mjs                       # download
     node scripts/fetch-hsk.mjs path/to/complete.json # use a local copy

   Output: scripts/authoring/cache/hsk-words.json
     { "1": [ { "zh": "爱", "trad": "愛", "pinyin": "ài", "num": "ai4", "meanings": [...], "pos": ["v"], "freq": 130 } ], … } */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts/authoring/cache');
const URL = 'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.json';
const RAW_DIR = path.join(os.tmpdir(), 'easy-chinese-hsk-raw');

let json;
const local = process.argv[2];
if (local && fs.existsSync(local)) json = JSON.parse(fs.readFileSync(local, 'utf8'));
else {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const file = path.join(RAW_DIR, 'complete.json');
  if (!fs.existsSync(file)) {
    const res = await fetch(URL);
    if (!res.ok) { console.error(`Download failed: ${res.status}`); process.exit(1); }
    fs.writeFileSync(file, await res.text());
  }
  json = JSON.parse(fs.readFileSync(file, 'utf8'));
}

const out = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
for (const e of json) {
  const old = (e.level || []).filter((l) => l.startsWith('old-')).map((l) => Number(l.slice(4)));
  if (!old.length) continue;
  const level = Math.min(...old);
  const forms = e.forms || [];
  if (!forms.length) continue;
  const f = forms[0];
  out[level].push({
    zh: e.simplified,
    trad: f.traditional,
    pinyin: f.transcriptions?.pinyin || '',
    num: f.transcriptions?.numeric || '',
    meanings: f.meanings || [],
    altForms: forms.slice(1).map((x) => ({ trad: x.traditional, pinyin: x.transcriptions?.pinyin || '', num: x.transcriptions?.numeric || '', meanings: x.meanings || [] })),
    pos: e.pos || [],
    freq: e.frequency ?? null,
    radical: e.radical || ''
  });
}
for (const k of Object.keys(out)) out[k].sort((a, b) => (a.freq ?? 1e9) - (b.freq ?? 1e9));
fs.mkdirSync(CACHE, { recursive: true });
fs.writeFileSync(path.join(CACHE, 'hsk-words.json'), JSON.stringify(out, null, 1));
console.log('HSK 2.0 words per level:', Object.entries(out).map(([k, v]) => `${k}: ${v.length}`).join(', '));
