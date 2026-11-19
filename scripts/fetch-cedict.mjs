#!/usr/bin/env node
/* Downloads CC-CEDICT (Creative Commons Attribution-ShareAlike 4.0,
   https://www.mdbg.net/chinese/dictionary?page=cc-cedict) and converts it to a
   compact JSON lookup used by the authoring scripts. Nothing from the raw file
   is embedded in the app directly; build-level.mjs copies pinyin, traditional
   forms and short English glosses for the words it needs.

   Usage:
     node scripts/fetch-cedict.mjs                 # download to a temp folder, write cache
     node scripts/fetch-cedict.mjs path/to/cedict.txt   # use an already downloaded copy

   Output: scripts/authoring/cache/cedict.json
     { "爱": [ { "trad": "愛", "num": "ai4", "glosses": ["to love", "to be fond of", …] } ], … } */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts/authoring/cache');
const URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';
const RAW_DIR = path.join(os.tmpdir(), 'easy-chinese-cedict-raw');

let text;
const local = process.argv[2];
if (local && fs.existsSync(local)) {
  text = fs.readFileSync(local, 'utf8');
} else {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const file = path.join(RAW_DIR, 'cedict.txt.gz');
  if (!fs.existsSync(file)) {
    const res = await fetch(URL);
    if (!res.ok) { console.error(`Download failed: ${res.status}`); process.exit(1); }
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  text = zlib.gunzipSync(fs.readFileSync(file)).toString('utf8');
}

const dict = {};
let n = 0;
for (const line of text.split('\n')) {
  if (!line || line.startsWith('#')) continue;
  const m = /^(\S+) (\S+) \[([^\]]+)\] \/(.*)\/\s*$/.exec(line);
  if (!m) continue;
  const [, trad, simp, pinyin, rest] = m;
  const glosses = rest.split('/').filter(Boolean);
  (dict[simp] = dict[simp] || []).push({ trad, num: pinyin, glosses });
  n++;
}
fs.mkdirSync(CACHE, { recursive: true });
fs.writeFileSync(path.join(CACHE, 'cedict.json'), JSON.stringify(dict));
console.log(`CC-CEDICT: ${n} entries, ${Object.keys(dict).length} simplified headwords → scripts/authoring/cache/cedict.json`);
