/* Syllable-and-tone comparison for speaking practice (replaces the Japanese
   mora comparison). compare(targetPinyin, saidPinyin) aligns the two syllable
   sequences and returns, per target syllable, whether its initial, final and
   tone matched, plus a score and targeted tips. Both inputs are pinyin
   (marked or numbered); the recogniser's characters are turned into pinyin
   first by engine/reading.js. */
import { syllables, numberedToMarked } from './pinyin.js';
import { t } from '../i18n/index.js';

/** Parse pinyin to comparable syllables; '[slot]' becomes a wildcard token. */
export function toSyllables(pinyin) {
  const parts = String(pinyin || '').split(/(\[[^\]]+\])/);
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    if (/^\[[^\]]+\]$/.test(p)) { out.push({ wild: true }); continue; }
    for (const s of syllables(p)) out.push({ ...s, text: /[0-5]$/.test(s.text) ? numberedToMarked(s.text) : s.text });
  }
  return out;
}

/** Cost of substituting target syllable a with said syllable b (0 = identical). */
function subCost(a, b) {
  if (!a || !b) return 1;
  const ini = a.initial === b.initial, fin = a.final === b.final, tone = a.tone === b.tone;
  if (ini && fin && tone) return 0;
  if (ini && fin) return 0.3;
  if (fin && tone) return 0.55;
  if (ini && tone) return 0.65;
  if (fin) return 0.7;
  return 1;
}

/**
 * Align target syllables to said syllables (weighted Levenshtein with backtrace).
 * Returns { ops: [{ type, t, s, ini, fin, tone }], matched, total, points }.
 */
export function align(target, said) {
  const n = target.length, m = said.length;
  const D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const B = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(null));
  for (let i = 1; i <= n; i++) { D[i][0] = target[i - 1].wild ? D[i - 1][0] : D[i - 1][0] + 1; B[i][0] = target[i - 1].wild ? 'wildskip' : 'del'; }
  for (let j = 1; j <= m; j++) { D[0][j] = j; B[0][j] = 'ins'; }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const tg = target[i - 1], sd = said[j - 1];
      if (tg.wild) {
        const skip = D[i - 1][j], eat = D[i][j - 1];
        if (eat <= skip) { D[i][j] = eat; B[i][j] = 'wild'; } else { D[i][j] = skip; B[i][j] = 'wildskip'; }
        continue;
      }
      const c = subCost(tg, sd);
      const diag = D[i - 1][j - 1] + c;
      const del = D[i - 1][j] + 1;
      const ins = D[i][j - 1] + 1;
      if (diag <= del && diag <= ins) { D[i][j] = diag; B[i][j] = c === 0 ? 'match' : 'sub'; }
      else if (del <= ins) { D[i][j] = del; B[i][j] = 'del'; }
      else { D[i][j] = ins; B[i][j] = 'ins'; }
    }
  }
  const ops = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    const b = i > 0 && j > 0 ? B[i][j] : i > 0 ? B[i][0] : 'ins';
    if (b === 'match' || b === 'sub') {
      const tg = target[i - 1], sd = said[j - 1];
      ops.push({ type: b, t: tg, s: sd, ini: tg.initial === sd.initial, fin: tg.final === sd.final, tone: tg.tone === sd.tone });
      i--; j--;
    } else if (b === 'del') { ops.push({ type: 'del', t: target[i - 1] }); i--; }
    else if (b === 'ins') { ops.push({ type: 'ins', s: said[j - 1] }); j--; }
    else if (b === 'wild') { ops.push({ type: 'wild', s: said[j - 1] }); j--; }
    else { ops.push({ type: 'wildskip' }); i--; }
  }
  ops.reverse();
  const scored = ops.filter((o) => o.type === 'match' || o.type === 'sub' || o.type === 'del');
  let points = 0;
  for (const o of scored) {
    if (o.type === 'match') points += 1;
    else if (o.type === 'sub') points += 0.35 * (o.ini ? 1 : 0) + 0.35 * (o.fin ? 1 : 0) + 0.3 * (o.tone ? 1 : 0);
  }
  return { ops, matched: ops.filter((o) => o.type === 'match').length, total: scored.length, points };
}

/** Compare a target (pinyin) with what was said (pinyin). Returns { score (0-100), ops, tips, said, unknown }. */
export function compare(targetPinyin, saidPinyin) {
  const tg = toSyllables(targetPinyin);
  const sd = toSyllables(saidPinyin).filter((x) => !x.wild);
  const { ops, total, points } = align(tg, sd);
  const score = total ? Math.round((points / total) * 100) : 0;
  return { score, ops, tips: tipsFor(ops), said: saidPinyin, unknown: /\?/.test(saidPinyin) };
}

/** Pick the best of several recogniser alternatives (already converted to pinyin). */
export function bestOf(targetPinyin, alternatives) {
  let best = null;
  for (const alt of alternatives) {
    const r = compare(targetPinyin, alt);
    if (!best || r.score > best.score) best = { ...r, transcript: alt };
  }
  return best;
}

const RETROFLEX = { zh: 'z', ch: 'c', sh: 's' };
const PALATAL = ['j', 'q', 'x'];
const ASPIRATION = { b: 'p', d: 't', g: 'k', j: 'q', zh: 'ch', z: 'c' };

function tipsFor(ops) {
  const tips = new Set();
  const toneTip = (tone) => t(`tone_tip_${tone}`);
  for (const o of ops) {
    if (o.type === 'del') { tips.add(t('syl_tip_missing', { syl: o.t.text })); continue; }
    if (o.type === 'ins') { tips.add(t('syl_tip_extra', { syl: o.s.text })); continue; }
    if (o.type !== 'sub') continue;
    const a = o.t, b = o.s;
    if (!o.tone && o.ini && o.fin) { tips.add(toneTip(a.tone)); continue; }
    if (!o.ini) {
      const ai = a.initial, bi = b.initial;
      if (RETROFLEX[ai] === bi || RETROFLEX[bi] === ai) tips.add(t('syl_tip_retroflex', { a: ai, b: bi }));
      else if (PALATAL.includes(ai) && (RETROFLEX[bi] || ['z', 'c', 's'].includes(bi))) tips.add(t('syl_tip_palatal', { a: ai }));
      else if (ASPIRATION[ai] === bi || ASPIRATION[bi] === ai) tips.add(t('syl_tip_aspiration', { a: ai, b: bi, asp: ASPIRATION[ai] ? bi : ai }));
      else if ((ai === 'n' && bi === 'l') || (ai === 'l' && bi === 'n')) tips.add(t('syl_tip_n_l'));
      else if (ai === 'r') tips.add(t('syl_tip_r'));
      else if (ai === 'h') tips.add(t('syl_tip_h'));
      else tips.add(t('syl_tip_initial', { a: a.text, b: b.text }));
    }
    if (!o.fin) {
      const af = a.final, bf = b.final;
      if (af.replace(/ng$/, 'n') === bf.replace(/ng$/, 'n') && af !== bf) tips.add(t('syl_tip_ng', { a: af, b: bf }));
      else if (af.includes('ü') && !bf.includes('ü')) tips.add(t('syl_tip_umlaut'));
      else if (af === 'e' || bf === 'e') tips.add(t('syl_tip_e'));
      else if (/^(zh|ch|sh|r|z|c|s)$/.test(a.initial) && af === 'i') tips.add(t('syl_tip_buzz_i'));
      else tips.add(t('syl_tip_final', { a: a.text, b: b.text }));
    }
    if (!o.tone && (!o.ini || !o.fin)) tips.add(toneTip(a.tone));
  }
  return [...tips].slice(0, 4);
}
