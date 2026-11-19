#!/usr/bin/env node
/* Stroke-order and character data for Chinese characters.

   1. Stroke data from hanzi-writer-data (https://github.com/chanind/hanzi-writer-data),
      itself derived from Make Me a Hanzi (https://github.com/skishore/makemeahanzi).
      Both are released under the Arphic Public License; the extracted files in
      data/strokes/ are redistributed under the same licence (see data/strokes/README.md).
      Each character gives stroke outlines (SVG paths in a 1024-unit box, y axis up,
      drawn with transform "scale(1,-1) translate(0,-900)") and stroke medians.
   2. Radical, component decomposition and etymology hints from Make Me a Hanzi's
      dictionary.txt, kept in the authoring cache (not in the app).

   Usage:
     node scripts/fetch-hanzi.mjs strokes <level> "<characters>" [localPackageDir]
         → data/strokes/<level>.json   (downloads each character from jsDelivr unless a local
           extracted hanzi-writer-data package folder is given)
     node scripts/fetch-hanzi.mjs dictionary [localDictionaryTxt]
         → scripts/authoring/cache/mmah.json */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts/authoring/cache');
const RAW_DIR = path.join(os.tmpdir(), 'easy-chinese-hanzi-raw');
const CDN = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/';
const MMAH = 'https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt';

const [, , mode, a, b, c] = process.argv;

if (mode === 'strokes') {
  const level = a, chars = [...new Set([...(b || '')])].filter((ch) => /\p{Script=Han}/u.test(ch));
  const localDir = c;
  if (!level || !chars.length) { console.error('Usage: node scripts/fetch-hanzi.mjs strokes <level> "<characters>" [localPackageDir]'); process.exit(2); }
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const out = {};
  const missing = [];
  let fetched = 0, cached = 0;
  for (const ch of chars) {
    let raw = null;
    const localFile = localDir ? path.join(localDir, `${ch}.json`) : null;
    const rawFile = path.join(RAW_DIR, `${ch.codePointAt(0).toString(16)}.json`);
    if (localFile && fs.existsSync(localFile)) { raw = fs.readFileSync(localFile, 'utf8'); cached++; }
    else if (fs.existsSync(rawFile)) { raw = fs.readFileSync(rawFile, 'utf8'); cached++; }
    else {
      try {
        const res = await fetch(CDN + encodeURIComponent(ch) + '.json');
        if (!res.ok) { missing.push(ch); continue; }
        raw = await res.text();
        fs.writeFileSync(rawFile, raw);
        fetched++;
      } catch { missing.push(ch); continue; }
    }
    let json;
    try { json = JSON.parse(raw); } catch { missing.push(ch); continue; }
    const strokes = (json.strokes || []).map((d) => String(d).replace(/\s+/g, ' ').trim());
    const medians = (json.medians || []).map((m) => m.map(([x, y]) => [Math.round(x), Math.round(y)]));
    // Only well-formed path data is kept (letters, digits, spaces, signs, dots).
    if (!strokes.length || !strokes.every((d) => /^[MmLlHhVvCcSsQqTtAaZz0-9 .\-eE]+$/.test(d)) || medians.length !== strokes.length) { missing.push(ch); continue; }
    out[ch] = { strokes, medians };
  }
  const file = path.join(ROOT, 'data/strokes', `${level}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(out));
  console.log(`Wrote ${Object.keys(out).length} characters to data/strokes/${level}.json (${fetched} downloaded, ${cached} from cache).`);
  if (missing.length) console.log(`Not available: ${missing.join(' ')}`);
} else if (mode === 'dictionary') {
  let text;
  if (a && fs.existsSync(a)) text = fs.readFileSync(a, 'utf8');
  else {
    fs.mkdirSync(RAW_DIR, { recursive: true });
    const file = path.join(RAW_DIR, 'dictionary.txt');
    if (!fs.existsSync(file)) {
      const res = await fetch(MMAH);
      if (!res.ok) { console.error(`Download failed: ${res.status}`); process.exit(1); }
      fs.writeFileSync(file, await res.text());
    }
    text = fs.readFileSync(file, 'utf8');
  }
  const out = {};
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    let e; try { e = JSON.parse(line); } catch { continue; }
    out[e.character] = { radical: e.radical || '', decomposition: e.decomposition || '', definition: e.definition || '', pinyin: e.pinyin || [], hint: e.etymology?.hint || '', type: e.etymology?.type || '' };
  }
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(path.join(CACHE, 'mmah.json'), JSON.stringify(out));
  console.log(`Make Me a Hanzi: ${Object.keys(out).length} characters → scripts/authoring/cache/mmah.json`);
} else {
  console.error('Usage: node scripts/fetch-hanzi.mjs strokes <level> "<chars>" [localDir] | dictionary [localFile]');
  process.exit(2);
}
