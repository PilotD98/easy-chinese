/* Tiny DOM helpers. No framework: views build elements with h() and return them. */
import { t, locale } from '../i18n/index.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * h('div', { class: 'card', onClick: fn, dataset: {...}, aria: {...} }, ...children)
 * Children may be strings, nodes, arrays, or null/false (skipped).
 */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class' || k === 'className') el.className = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'aria' && typeof v === 'object') for (const [ak, av] of Object.entries(v)) el.setAttribute(`aria-${ak}`, av);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'html') el.innerHTML = v;
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

/** Inline SVG icon from the sprite in index.html. */
export function icon(name, cls = 'icon') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', cls);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}

export function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

/** Chinese text span with lang="zh-Hans" so screen readers switch voices. */
export function zh(text, cls = '') {
  return h('span', { class: `zh ${cls}`.trim(), lang: 'zh-Hans' }, text);
}

/** Ruby text: base with pinyin above. */
export function ruby(base, reading) {
  const r = h('ruby', { lang: 'zh-Hans' }, base);
  r.append(h('rp', null, '('), h('rt', { class: 'py' }, reading), h('rp', null, ')'));
  return r;
}

export function formatMinutes(seconds) {
  const m = Math.round(seconds / 60);
  if (m < 60) return t('fmt_min', { n: m });
  const hrs = Math.floor(m / 60), rem = m % 60;
  return rem ? t('fmt_h_min', { h: hrs, m: rem }) : t('fmt_h', { h: hrs });
}

export function formatBytes(n) {
  if (n == null) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso, opts = { dateStyle: 'medium' }) {
  try { return new Intl.DateTimeFormat(locale(), opts).format(new Date(iso)); }
  catch { return String(iso); }
}

/** Level id -> display name ("hsk1" -> "HSK 1", "pinyin" -> translated). */
export function levelName(id) {
  if (!id) return '';
  if (id === 'pinyin') return t('stage_pinyin_short');
  const m = /^hsk([1-6])$/.exec(id);
  return m ? `HSK ${m[1]}` : id.toUpperCase();
}
