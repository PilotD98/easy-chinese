/* Trace-it drawing pad. Shows the character faintly from its stroke outlines
   and lets the learner draw over it with finger, stylus or mouse. "Check"
   gives a rough score: stroke count, plus how much of the stroke medians the
   ink covers. It is a practice aid, not handwriting recognition. */
import { h, icon } from './dom.js';
import { t } from '../i18n/index.js';
import { toScreen } from './stroke.js';

const BOX = 1024;

export function tracePad(data, { size = 260, onCheck = null, showGuide = true } = {}) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const canvas = h('canvas', { class: 'trace-canvas', width: size * dpr, height: size * dpr, style: { width: `${size}px`, height: `${size}px` }, 'aria-label': t('trace_pad_label'), role: 'img' });
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const scale = size / BOX;
  const refPaths = (data?.strokes || []).map((d) => new Path2D(d));
  const medians = (data?.medians || []).map((m) => m.map(toScreen));
  const strokes = [];      // user strokes: arrays of {x, y} in 1024-box screen units
  let current = null;
  let guide = showGuide;

  const css = () => getComputedStyle(document.documentElement);
  function draw() {
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = css().getPropertyValue('--border'); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size); ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2); ctx.stroke();
    if (guide) {
      ctx.save(); ctx.scale(scale, scale); ctx.translate(0, 900); ctx.scale(1, -1);
      ctx.fillStyle = css().getPropertyValue('--text-3'); ctx.globalAlpha = 0.25;
      refPaths.forEach((p) => ctx.fill(p));
      ctx.restore();
    }
    ctx.save(); ctx.scale(scale, scale);
    ctx.strokeStyle = css().getPropertyValue('--accent'); ctx.lineWidth = 56; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const s of strokes.concat(current ? [current] : [])) {
      if (s.length < 2) { ctx.beginPath(); ctx.arc(s[0].x, s[0].y, 28, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); continue; }
      ctx.beginPath(); ctx.moveTo(s[0].x, s[0].y);
      for (let i = 1; i < s.length; i++) ctx.lineTo(s[i].x, s[i].y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * BOX, y: ((e.clientY - r.top) / r.height) * BOX };
  }
  canvas.addEventListener('pointerdown', (e) => { e.preventDefault(); try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ } current = [pos(e)]; draw(); });
  canvas.addEventListener('pointermove', (e) => { if (!current) return; current.push(pos(e)); draw(); });
  const end = () => { if (current) { strokes.push(current); current = null; draw(); counter(); } };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.style.touchAction = 'none';

  const count = h('span', { class: 'small muted', 'aria-live': 'polite' });
  const target = refPaths.length;
  function counter() { count.textContent = t('strokes_n_of', { n: strokes.length, total: target }); }
  counter();

  function check() {
    if (!strokes.length) return { score: 0, message: t('trace_draw_first') };
    const refPts = [];
    for (const m of medians) {
      for (let i = 0; i < m.length; i++) {
        const [x, y] = m[i];
        refPts.push({ x, y });
        if (i + 1 < m.length) {
          const [x2, y2] = m[i + 1];
          const d = Math.hypot(x2 - x, y2 - y), n = Math.floor(d / 24);
          for (let k = 1; k < n; k++) refPts.push({ x: x + ((x2 - x) * k) / n, y: y + ((y2 - y) * k) / n });
        }
      }
    }
    const ink = strokes.flat();
    const near = (p) => ink.some((q) => (q.x - p.x) ** 2 + (q.y - p.y) ** 2 < 80 ** 2);
    const covered = refPts.filter(near).length / Math.max(1, refPts.length);
    const stray = ink.filter((q) => !refPts.some((p) => (q.x - p.x) ** 2 + (q.y - p.y) ** 2 < 100 ** 2)).length / Math.max(1, ink.length);
    const countOk = strokes.length === target;
    let score = Math.round(100 * (0.6 * covered + 0.25 * (1 - stray) + 0.15 * (countOk ? 1 : Math.max(0, 1 - Math.abs(strokes.length - target) / target))));
    score = Math.max(0, Math.min(100, score));
    let message;
    if (!countOk) message = strokes.length < target ? t('trace_fewer', { n: target, drawn: strokes.length }) : t('trace_more', { n: target, drawn: strokes.length });
    else if (score >= 80) message = t('trace_good');
    else if (score >= 55) message = t('trace_ok');
    else message = t('trace_poor');
    return { score, message };
  }

  const result = h('div', { class: 'small', 'aria-live': 'polite', style: { minHeight: '1.4em' } });
  const undoBtn = h('button', { class: 'btn', type: 'button', onClick: () => { strokes.pop(); draw(); counter(); result.textContent = ''; } }, t('undo'));
  const clearBtn = h('button', { class: 'btn', type: 'button', onClick: () => { strokes.length = 0; draw(); counter(); result.textContent = ''; } }, t('clear'));
  const guideBtn = h('button', { class: 'btn', type: 'button', 'aria-pressed': String(guide), onClick: (e) => { guide = !guide; e.currentTarget.setAttribute('aria-pressed', String(guide)); draw(); } }, t('guide'));
  const checkBtn = h('button', { class: 'btn btn-primary', type: 'button', onClick: () => { const r = check(); result.textContent = `${r.score}% · ${r.message}`; onCheck?.(r); } }, icon('check'), t('check'));

  const el = h('div', { class: 'trace-pad' }, canvas,
    h('div', { class: 'row', style: { justifyContent: 'space-between', marginTop: '8px' } }, count, h('div', { class: 'btn-row' }, undoBtn, clearBtn, guideBtn, checkBtn)),
    result);
  requestAnimationFrame(draw);
  window.addEventListener('ec:settings', draw);
  return { el, check, clear: () => { strokes.length = 0; draw(); counter(); }, strokeCount: () => strokes.length };
}
