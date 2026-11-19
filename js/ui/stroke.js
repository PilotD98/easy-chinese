/* Animated stroke-order diagram from hanzi-writer / Make Me a Hanzi data.
   Each character gives stroke outlines (filled SVG paths in a 1024-unit box,
   y axis pointing up) and stroke medians (centre-line points). A stroke is
   animated by drawing its median as a thick line clipped to its outline, so
   the brush shape "fills in" along the stroke. A faint copy of the whole
   character sits underneath. Reduced motion shows the finished character
   with stroke numbers. */
import { h } from './dom.js';
import { t } from '../i18n/index.js';

const NS = 'http://www.w3.org/2000/svg';
const BOX = 1024;
const TRANSFORM = 'translate(0 900) scale(1 -1)';
let strokeCache = new Map();
let uid = 0;

/** Load stroke data for a level ('hsk1' …) once. */
export async function loadStrokes(level) {
  if (strokeCache.has(level)) return strokeCache.get(level);
  const p = fetch(`data/strokes/${level}.json`).then((r) => { if (!r.ok) throw new Error('strokes'); return r.json(); });
  strokeCache.set(level, p);
  p.catch(() => strokeCache.delete(level));
  return p;
}

export function motionReduced() {
  const m = document.documentElement.dataset.motion;
  if (m === 'reduce') return true;
  if (m === 'full') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
}

/** Screen-space point (y flipped) from a median point. */
export function toScreen([x, y]) { return [x, 900 - y]; }

function polyline(points) { return points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' '); }
function pathLength(points) { let L = 0; for (let i = 1; i < points.length; i++) L += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]); return L; }

/**
 * strokeDiagram(data, { size, numbers, label })
 * data = { strokes: [outlinePath, …], medians: [[[x, y], …], …] }
 * Returns { el, play, strokeCount } where play() replays the animation.
 */
export function strokeDiagram(data, { size = 160, numbers = true, label = '' } = {}) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${BOX} ${BOX}`);
  svg.setAttribute('width', size); svg.setAttribute('height', size);
  svg.setAttribute('class', 'stroke-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', label ? t('stroke_order_for', { ch: label }) : t('stroke_order'));

  const guide = document.createElementNS(NS, 'path');
  guide.setAttribute('d', `M${BOX / 2} 0V${BOX}M0 ${BOX / 2}H${BOX}M0 0L${BOX} ${BOX}M${BOX} 0L0 ${BOX}`);
  guide.setAttribute('class', 'stroke-guide');
  svg.append(guide);

  const defs = document.createElementNS(NS, 'defs');
  const ghost = document.createElementNS(NS, 'g');
  ghost.setAttribute('class', 'stroke-ghost');
  ghost.setAttribute('transform', TRANSFORM);
  const live = document.createElementNS(NS, 'g');
  live.setAttribute('class', 'stroke-live');
  live.setAttribute('transform', TRANSFORM);
  const strokes = data?.strokes || [], medians = data?.medians || [];
  const lines = [];
  const base = `sk${++uid}`;
  strokes.forEach((d, i) => {
    const g = document.createElementNS(NS, 'path'); g.setAttribute('d', d); ghost.append(g);
    const clip = document.createElementNS(NS, 'clipPath'); clip.setAttribute('id', `${base}-${i}`);
    const cp = document.createElementNS(NS, 'path'); cp.setAttribute('d', d); clip.append(cp); defs.append(clip);
    const wrap = document.createElementNS(NS, 'g'); wrap.setAttribute('clip-path', `url(#${base}-${i})`);
    const med = medians[i] || [];
    const line = document.createElementNS(NS, 'path');
    line.setAttribute('d', med.length > 1 ? polyline(med) : `M${med[0]?.[0] || 0} ${med[0]?.[1] || 0} l0.1 0`);
    line.setAttribute('class', 'stroke-line');
    line.dataset.len = String(Math.max(1, pathLength(med)) + 300);
    wrap.append(line); live.append(wrap); lines.push(line);
  });
  svg.append(defs, ghost, live);

  if (numbers) {
    const nums = document.createElementNS(NS, 'g');
    nums.setAttribute('class', 'stroke-numbers');
    medians.forEach((m, i) => {
      if (!m?.length) return;
      const [x, y] = toScreen(m[0]);
      const tx = document.createElementNS(NS, 'text');
      tx.setAttribute('x', Math.max(30, Math.min(BOX - 40, x - 40))); tx.setAttribute('y', Math.max(70, Math.min(BOX - 10, y - 20))); tx.textContent = String(i + 1);
      nums.append(tx);
    });
    svg.append(nums);
  }

  let timers = [];
  function play() {
    timers.forEach(clearTimeout); timers = [];
    if (motionReduced() || !lines.length) { lines.forEach((p) => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; p.style.transition = ''; }); svg.classList.add('is-static'); return; }
    svg.classList.remove('is-static');
    lines.forEach((p) => { const len = p.dataset.len; p.style.transition = 'none'; p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    void svg.getBoundingClientRect();
    let tm = 0;
    lines.forEach((p) => {
      const len = Number(p.dataset.len);
      const dur = Math.max(220, Math.min(800, len * 0.9));
      timers.push(setTimeout(() => { p.style.transition = `stroke-dashoffset ${dur}ms ease-out`; p.style.strokeDashoffset = '0'; }, tm));
      tm += dur + 120;
    });
  }
  requestAnimationFrame(() => play());
  return { el: svg, play, strokeCount: strokes.length };
}

/** Diagrams for several characters side by side (a word). */
export function strokeDiagrams(chars, strokeData, opts = {}) {
  const wrap = h('div', { class: 'stroke-row' });
  const items = chars.filter((ch) => strokeData[ch]).map((ch) => strokeDiagram(strokeData[ch], { ...opts, label: ch }));
  items.forEach((it) => wrap.append(it.el));
  return { el: wrap, play: () => items.forEach((it) => it.play()) };
}
