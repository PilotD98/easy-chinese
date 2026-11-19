/* Read: the library of graded passages and listening drills, per level. */
import { h, append, icon, zh, levelName } from '../ui/dom.js';
import { availableLevels } from '../content/loader.js';
import { loadHsk, passedUnits } from '../content/hsk.js';
import { isUnlocked } from '../content/pinyin-stage.js';
import { t, tr } from '../i18n/index.js';

export const title = 'nav_read';

export async function render(el, ctx) {
  if (ctx.segs[1]) { const m = await import('./reading.js'); return m.render(el, ctx); }
  const levels = (await availableLevels().catch(() => [])).filter((l) => l.files && (l.files.readings || l.files.listening));
  const sections = [];
  for (const l of levels) {
    const unlocked = await isUnlocked(l.id);
    const lv = await loadHsk(l.id).catch(() => null);
    if (!lv) continue;
    const passed = await passedUnits(l.id);
    const unitPassed = (unitNo) => [...passed].some((id) => Number(id.split(':').pop()) >= unitNo);
    const name = levelName(l.id);
    sections.push(h('section', { class: 'card' },
      h('div', { class: 'card-title' }, h('h2', null, t('level_readings', { level: name })), unlocked ? null : h('span', { class: 'pill' }, t('locked'))),
      h('ol', { class: 'path' }, lv.readings.map((r, i) => {
        const open = unlocked && unitPassed(r.unit);
        return h('li', null,
          h('span', { class: `step-no ${open ? 'is-available' : ''}`, 'aria-hidden': 'true' }, String(i + 1)),
          h('div', null, h('div', { class: 'step-title' }, zh(r.title), ' · ', tr(r, 'en', 'ja')), h('div', { class: 'step-sub' }, `${t('unit_n', { n: r.unit })} · ${t('n_questions', { n: r.questions.length })}`)),
          open ? h('a', { class: 'btn', href: `#/read/${l.id}/${encodeURIComponent(r.id)}` }, t('read')) : h('span', { class: 'icon lock', title: t('pass_unit_to_unlock', { n: r.unit }) }, icon('lock')));
      }))),
      h('section', { class: 'card' },
        h('h2', null, t('level_listening', { level: name })),
        h('ol', { class: 'path' }, lv.listening.map((d) => {
          const open = unlocked && unitPassed(d.unit);
          return h('li', null,
            h('span', { class: `step-no ${open ? 'is-available' : ''}`, 'aria-hidden': 'true' }, icon('speak')),
            h('div', null, h('div', { class: 'step-title' }, tr(d, 'title')), h('div', { class: 'step-sub' }, `${t(`ltype_${d.type}`)} · ${t('unit_n', { n: d.unit })} · ${t('n_items', { n: d.items.length })}`)),
            open ? h('a', { class: 'btn', href: `#/read/${l.id}/listen/${encodeURIComponent(d.id)}` }, t('start')) : h('span', { class: 'icon lock', title: t('pass_unit_to_unlock', { n: d.unit }) }, icon('lock')));
        }))));
  }
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('read_and_listen')), h('p', { class: 'lede' }, t('read_lede'))),
    sections.length ? sections : h('div', { class: 'empty' }, zh('阅读', 'zh-xl'), h('p', null, t('readings_unlock_with_hsk1')))
  ]);
}
