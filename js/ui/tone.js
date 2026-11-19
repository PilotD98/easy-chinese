/* Tone contour diagram: the pitch shape of each syllable on the five-level
   scale used in Chinese teaching (1 low … 5 high).
     tone 1: 55 (high level)   tone 2: 35 (rising)
     tone 3: 214 (dip)         tone 4: 51 (falling)   neutral: short, mid */
import { syllables } from '../engine/pinyin.js';
import { t } from '../i18n/index.js';

const NS = 'http://www.w3.org/2000/svg';
const SHAPES = { 1: [5, 5, 5], 2: [3, 4, 5], 3: [2, 1, 1.5, 4], 4: [5, 3, 1], 0: [3, 3] };

/** Returns an SVG element drawing one box per syllable. */
export function toneDiagram(pinyin, { size = 56 } = {}) {
  const syls = syllables(pinyin);
  const n = Math.max(1, syls.length);
  const w = n * (size + 8), hgt = size * 1.45;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
  svg.setAttribute('width', w); svg.setAttribute('height', hgt);
  svg.setAttribute('class', 'tone');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', syls.map((s) => `${s.text}: ${toneName(s.tone)}`).join(', '));
  syls.forEach((s, i) => {
    const x0 = i * (size + 8) + 4;
    const level = (v) => size - ((v - 1) / 4) * (size * 0.85) - size * 0.05;
    // grid
    for (let g = 1; g <= 5; g++) {
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', x0); ln.setAttribute('x2', x0 + size); ln.setAttribute('y1', level(g)); ln.setAttribute('y2', level(g));
      ln.setAttribute('class', 'tone-grid'); svg.append(ln);
    }
    const shape = SHAPES[s.tone] || SHAPES[0];
    const span = s.tone === 0 ? size * 0.35 : size * 0.8;
    const pts = shape.map((v, k) => [x0 + size * 0.1 + (span * k) / (shape.length - 1), level(v)]);
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', pts.map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));
    path.setAttribute('class', `tone-line tone-${s.tone}`);
    svg.append(path);
    const label = document.createElementNS(NS, 'text');
    label.setAttribute('x', x0 + size / 2); label.setAttribute('y', hgt - 4); label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'tone-label');
    label.textContent = s.text;
    svg.append(label);
  });
  return svg;
}

export function toneName(tone) { return t(`tone_name_${tone || 0}`); }
