/* Pinyin utilities: numbered <-> tone-marked conversion, syllable parsing,
   live conversion for typed answers ("ni3" -> "nǐ"), normalisation and
   judging of typed answers. Pure functions; also used by the build scripts. */

const MARKS = {
  a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ',
  A: 'ĀÁǍÀ', E: 'ĒÉĚÈ', I: 'ĪÍǏÌ', O: 'ŌÓǑÒ', U: 'ŪÚǓÙ', Ü: 'ǕǗǙǛ'
};
const MARK_TO = {}; // marked vowel -> [plain, tone]
for (const [v, s] of Object.entries(MARKS)) [...s].forEach((ch, i) => { MARK_TO[ch] = [v, i + 1]; });

export const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's'];
/** Finals in the spelled forms of the pinyin chart (iu, ui, un stand for iou, uei, uen). */
export const FINALS = ['a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'er', 'ê',
  'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong',
  'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ueng', 'üe', 'üan', 'ün'];
// y-/w- spellings of finals without an initial
const Y_W = { yi: 'i', ya: 'ia', ye: 'ie', yao: 'iao', you: 'iu', yan: 'ian', yin: 'in', yang: 'iang', ying: 'ing', yong: 'iong',
  yu: 'ü', yue: 'üe', yuan: 'üan', yun: 'ün', wu: 'u', wa: 'ua', wo: 'uo', wai: 'uai', wei: 'ui', wan: 'uan', wen: 'un', wang: 'uang', weng: 'ueng' };
const BARE = new Set(['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er', 'ê', 'm', 'n', 'ng', 'hm', 'hng', 'yo']);
const AFTER_JQX = new Set(['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'u', 'ue', 'uan', 'un', 'ü', 'üe', 'üan', 'ün']);
const AFTER_RETRO = new Set(['i', 'a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang']);

/** Numbered syllable ("ni3", "nv3", "lu:4", "ma", "ma5") -> tone-marked ("nǐ", "nǚ", "lǜ", "ma"). */
export function numberedToMarked(syl) {
  const m = /^([A-Za-zü:]+?)([0-5])?(r)?$/.exec(syl.trim());
  if (!m) return syl;
  const base = m[1].replace(/u:/g, 'ü').replace(/v/g, 'ü').replace(/V/g, 'Ü');
  const tone = Number(m[2] || 0);
  const er = m[3] || '';
  if (!tone || tone === 5) return base + er;
  const lower = base.toLowerCase();
  let idx = -1;
  if (lower.includes('a')) idx = lower.indexOf('a');
  else if (lower.includes('e')) idx = lower.indexOf('e');
  else if (lower.includes('ou')) idx = lower.indexOf('o');
  else { for (let i = lower.length - 1; i >= 0; i--) if ('iuüo'.includes(lower[i])) { idx = i; break; } }
  if (idx < 0) return base;
  const ch = base[idx];
  const marked = MARKS[ch]?.[tone - 1];
  return (marked ? base.slice(0, idx) + marked + base.slice(idx + 1) : base) + er;
}

/** Tone-marked syllable -> { base (plain letters, ü kept), tone (0–4) }. */
export function markedToNumbered(syl) {
  let tone = 0, base = '';
  for (const ch of syl) {
    const m = MARK_TO[ch];
    if (m) { base += m[0]; tone = m[1]; } else base += ch;
  }
  const digit = /([0-5])(r?)$/.exec(base);
  if (digit) { tone = Number(digit[1]) === 5 ? 0 : Number(digit[1]); base = base.slice(0, digit.index) + digit[2]; }
  return { base: base.replace(/u:/g, 'ü').replace(/v/g, 'ü'), tone };
}

/** Whole string, numbered -> marked: "ni3 hao3" -> "nǐ hǎo". Keeps spaces and punctuation. */
export function toMarked(s) {
  return String(s || '').replace(/[A-Za-zü:]+[0-5]?r?/g, (w) => numberedToMarked(w));
}

/** Whole string, marked -> numbered: "nǐ hǎo" -> "ni3 hao3"; neutral tone gets 5. */
export function toNumbered(s) {
  return syllables(s).map((x) => x.base + (x.tone || 5)).join(' ');
}

const LETTER = /[A-Za-züĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;

/**
 * Split a pinyin string (marked or numbered, spaces optional) into syllables.
 * Returns [{ text, base, tone, initial, final }]. `final` is canonical (chart
 * spelling): "you" -> iu, "wei" -> ui, ju -> jü, "yi" -> i.
 */
export function syllables(s) {
  const out = [];
  const str = String(s || '');
  let i = 0;
  while (i < str.length) {
    if (!LETTER.test(str[i])) { i++; continue; }
    let j = i;
    while (j < str.length && (LETTER.test(str[j]) || /[0-5]/.test(str[j]) || (str[j] === ':' && /[uU]/.test(str[j - 1])))) j++;
    const chunk = str.slice(i, j);
    for (const syl of splitChunk(chunk)) out.push(parseSyllable(syl));
    i = j;
  }
  return out;
}

/** Split a run of letters (no spaces) into syllables by longest valid match. */
function splitChunk(chunk) {
  const parts = [];
  let s = chunk;
  while (s.length) {
    let best = null;
    for (let len = Math.min(s.length, 7); len >= 1; len--) {
      const cand = s.slice(0, len);
      const m = /^([^0-5]+)([0-5]?)$/.exec(cand);
      if (!m) continue;
      const { base } = markedToNumbered(m[1].toLowerCase());
      if (isSyllable(base)) { best = cand; break; }
    }
    if (!best) best = s[0];
    // Erhua: a trailing r that cannot start a syllable of its own belongs to this syllable (diǎnr, huār).
    const after = s.slice(best.length);
    if (/^r/i.test(after) && !startsSyllable(after)) best += after[0];
    parts.push(best);
    s = s.slice(best.length);
  }
  return parts;
}

function startsSyllable(s) {
  for (let len = Math.min(s.length, 7); len >= 2; len--) {
    const m = /^([^0-5]+)([0-5]?)$/.exec(s.slice(0, len));
    if (m && isSyllable(markedToNumbered(m[1].toLowerCase()).base)) return true;
  }
  return false;
}

function isSyllable(base) {
  const b = base.toLowerCase().replace(/'/g, '');
  const init = INITIALS.find((x) => b.startsWith(x)) || '';
  const rest = b.slice(init.length);
  if (!rest) return false;
  if (!init) return BARE.has(rest) || rest in Y_W;
  if (['j', 'q', 'x'].includes(init)) return AFTER_JQX.has(rest);
  if (['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(init)) return AFTER_RETRO.has(rest) || (init !== 'r' && rest === 'ong') || (init === 'r' && ['ong', 'uan', 'un', 'ui', 'uo', 'ua'].includes(rest));
  return FINALS.includes(rest);
}

export function parseSyllable(text) {
  const { base, tone } = markedToNumbered(text.toLowerCase().replace(/'/g, ''));
  let initial = INITIALS.find((x) => base.startsWith(x)) || '';
  let final = base.slice(initial.length);
  if (!initial && Y_W[final]) final = Y_W[final];
  else if (!initial && /^y/.test(final)) { final = final.slice(1); if (/^[aeo]/.test(final)) final = 'i' + final; }
  else if (!initial && /^w/.test(final)) { final = 'u' + final.slice(1); }
  if (['j', 'q', 'x'].includes(initial)) final = final.replace(/^u/, 'ü');
  let erhua = false;
  if (final.length > 1 && /r$/.test(final) && final !== 'er') { final = final.slice(0, -1); erhua = true; }
  return { text, base, tone, initial, final, erhua };
}

/* ---------- typing ---------- */

/** Live conversion of typed input: "ni3hao3" -> "nǐhǎo", "nv3" -> "nǚ". */
export function livePinyin(input) {
  return String(input || '').replace(/[A-Za-z:ü]+[1-5]/g, (w) => numberedToMarked(w));
}

/** Normalise for comparison: numbered lower-case syllables without spaces, ü as v, neutral tone dropped. */
export function normalize(s) {
  const str = String(s || '');
  if (/\p{Script=Han}/u.test(str)) return str.replace(/[\s\p{P}]/gu, '');
  return syllables(str).map((x) => x.base.replace(/ü/g, 'v') + (x.tone ? x.tone : '')).join('');
}

/** Same but with tones removed, for the "almost" check. */
export function normalizeToneless(s) {
  const str = String(s || '');
  if (/\p{Script=Han}/u.test(str)) return normalize(str);
  return syllables(str).map((x) => x.base.replace(/ü/g, 'v')).join('');
}

/** Levenshtein distance. */
export function distance(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const prev = new Array(n + 1).fill(0).map((_, j) => j);
  for (let i = 1; i <= m; i++) {
    let last = prev[0]; prev[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return prev[n];
}

/**
 * Judge a typed answer against accepted answers (pinyin in any form, or characters).
 * Returns 'exact' | 'close' | 'wrong'. Toneless pinyin that otherwise matches counts
 * as 'close' (the learner is asked whether it was a slip).
 */
export function judge(input, accepted) {
  const raw = normalize(input);
  const rawTl = normalizeToneless(input);
  const list = (Array.isArray(accepted) ? accepted : [accepted]).filter(Boolean);
  const targets = list.map(normalize);
  if (!raw) return 'wrong';
  if (targets.some((x) => x && x === raw)) return 'exact';
  const tl = list.map(normalizeToneless);
  if (tl.some((x) => x && x === rawTl)) return 'close';
  if (targets.some((x) => x && x.length >= 3 && distance(x, raw) <= 1)) return 'close';
  return 'wrong';
}

export function toneOf(syl) { return markedToNumbered(syl).tone; }
