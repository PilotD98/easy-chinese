/* Interface language. Every UI string goes through t(); content fields with a
   `_ja` twin go through tr(). English is the default and the fallback; the
   Japanese table is loaded only when selected. */
import en from './en.js';

let lang = 'en';
let table = en;
const loaded = { en };

export const LANGUAGES = [['en', 'English'], ['ja', '日本語']];

/** Load the table for `code` and make it current. Safe to call before the DOM is ready. */
export async function setLanguage(code) {
  const c = code === 'ja' ? 'ja' : 'en';
  if (!loaded[c]) {
    try { loaded[c] = (await import(`./${c}.js`)).default; }
    catch (err) { console.warn('Language table failed to load', err); loaded[c] = en; }
  }
  lang = c;
  table = loaded[c];
  document.documentElement.lang = c;
  window.dispatchEvent(new CustomEvent('ec:language', { detail: { lang: c } }));
}

export function language() { return lang; }
export function isJa() { return lang === 'ja'; }

/** Locale for Intl formatting. */
export function locale() { return lang === 'ja' ? 'ja-JP' : undefined; }

function format(str, params) {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => {
    if (k === 's') return params.n === 1 ? '' : 's';
    if (k === 'es') return params.n === 1 ? '' : 'es';
    return k in params ? String(params[k]) : m;
  });
}

/** Translate a key with optional {params}. {s} / {es} pluralise on params.n. */
export function t(key, params) {
  const s = table[key] ?? en[key];
  if (s === undefined) { console.warn('Missing string', key); return key; }
  return format(s, params);
}

/** Does the current table have this key (used for optional strings)? */
export function has(key) { return key in table || key in en; }

/**
 * Pick the localised field of a content item: tr(item, 'meanings') returns
 * item.meanings_ja in Japanese when present, else item.meanings.
 * tr(ex, 'en', 'ja') handles {en, ja} pairs.
 */
export function tr(obj, key, jaKey = `${key}_ja`) {
  if (!obj) return undefined;
  if (lang === 'ja') {
    const v = obj[jaKey];
    if (v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length)) return v;
  }
  return obj[key];
}

/** Localised meanings joined for display (items with `meanings` or `meaning`). */
export function meaningsOf(item, sep = '; ') {
  if (!item) return '';
  const m = tr(item, 'meanings');
  if (Array.isArray(m)) return m.join(sep);
  return tr(item, 'meaning') || '';
}
/** First localised meaning. */
export function meaningOf(item) {
  if (!item) return '';
  const m = tr(item, 'meanings');
  if (Array.isArray(m)) return m[0] || '';
  return tr(item, 'meaning') || '';
}

/** Format a date in the current locale. */
export function fmtDate(iso, opts = { dateStyle: 'medium' }) {
  try { return new Intl.DateTimeFormat(locale(), opts).format(new Date(iso)); }
  catch { return String(iso); }
}
