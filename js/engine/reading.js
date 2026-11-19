/* Reading back the recogniser's output. Speech recognition (zh-CN) returns
   characters; the comparison works on pinyin syllables. toPinyin() turns a
   character string into numbered pinyin using a dictionary built from the
   app's own content (words first, longest match, then single characters),
   with Arabic digits read as Chinese numerals. Characters outside the
   dictionary become "?" so the comparison can flag them rather than guess. */
import { toNumbered } from './pinyin.js';

const HAN = /\p{Script=Han}/u;
const PUNCT = /[\s\p{P}\p{S}]/gu;

export function hasHan(s) { return HAN.test(String(s || '')); }

/** Build a Map text -> numbered pinyin from words { zh, num|pinyin } and characters { char, num[]|pinyin[] }. */
export function readingDict(words = [], chars = []) {
  const dict = new Map();
  for (const w of words) {
    const zh = w.zh || w.text;
    const py = w.num || (w.pinyin ? toNumbered(w.pinyin) : null);
    if (zh && py && !dict.has(zh)) dict.set(zh, py.replace(/\s+/g, ' ').trim());
  }
  for (const c of chars) {
    const ch = c.char;
    const py = c.num?.[0] || (c.pinyin?.[0] ? toNumbered(c.pinyin[0]) : null);
    if (ch && py && !dict.has(ch)) dict.set(ch, py);
  }
  return dict;
}

const DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
/** 0–9999 -> Chinese numerals as spoken (21 -> 二十一, 105 -> 一百零五, 10 -> 十). */
export function numberToChars(n) {
  n = Number(n);
  if (!Number.isFinite(n) || n < 0) return String(n);
  if (n < 10) return DIGITS[n];
  if (n >= 10000) return [...String(n)].map((d) => DIGITS[Number(d)]).join('');
  const th = Math.floor(n / 1000), h = Math.floor((n % 1000) / 100), te = Math.floor((n % 100) / 10), u = n % 10;
  let s = '';
  if (th) s += DIGITS[th] + '千';
  if (h) s += DIGITS[h] + '百'; else if (th && (te || u)) s += '零';
  if (te) s += (te === 1 && !th && !h ? '' : DIGITS[te]) + '十'; else if ((th || h) && u) s += '零';
  if (u) s += DIGITS[u];
  return s;
}

/** Characters -> numbered pinyin ("ni3 hao3"). Unknown characters become "?". */
export function toPinyin(said, dict) {
  let s = String(said || '').replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/(\d),(\d)/g, '$1$2');
  s = s.replace(/\d+/g, (d) => numberToChars(d));
  s = s.replace(PUNCT, '');
  if (!s) return '';
  if (!HAN.test(s)) return s;
  const maxLen = Math.min(8, Math.max(1, ...[...(dict?.keys() || [])].map((k) => k.length)));
  const out = [];
  let i = 0;
  while (i < s.length) {
    let found = null;
    for (let len = Math.min(maxLen, s.length - i); len >= 1; len--) {
      const sub = s.slice(i, i + len);
      if (dict?.has(sub)) { found = [sub, dict.get(sub)]; break; }
    }
    if (found) { out.push(found[1]); i += found[0].length; }
    else { out.push(HAN.test(s[i]) ? '?' : s[i]); i += 1; }
  }
  return out.join(' ');
}
