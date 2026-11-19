/* Real-world Chinese: short guides with audio. Routes: #/guides, #/guides/<id> */
import { h, append, icon, zh } from '../ui/dom.js';
import { loadLevel } from '../content/loader.js';
import { speak, canSpeak, initAudio } from '../ui/audio.js';
import { t, tr } from '../i18n/index.js';

export const title = 'realworld';

export async function render(el, ctx) {
  const level = await loadLevel('guides');
  const data = level.data.guides;
  await initAudio();
  const id = ctx.segs[1];
  const guide = id ? data.guides.find((g) => g.id === id) : null;
  if (id && !guide) { const nf = await import('./notfound.js'); return nf.render(el, ctx); }
  return guide ? renderGuide(el, data, guide) : renderIndex(el, data);
}

function renderIndex(el, data) {
  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, tr(data, 'title')), h('p', { class: 'lede' }, tr(data, 'intro'))),
    h('section', { class: 'card' },
      h('ol', { class: 'path' }, data.guides.map((g, i) => h('li', null,
        h('span', { class: 'step-no is-available', 'aria-hidden': 'true' }, String(i + 1)),
        h('div', null, h('div', { class: 'step-title' }, tr(g, 'title')), h('div', { class: 'step-sub' }, `${tr(g, 'summary')} · ${t('about_n_min', { n: g.minutes })}`)),
        h('a', { class: 'btn btn-primary', href: `#/guides/${g.id}`, 'aria-label': `${t('open')} ${tr(g, 'title')}` }, t('open')))))),
    h('p', { class: 'small muted' }, t('practise_in_speak'), ' ', h('a', { href: '#/speak' }, t('speak_situations_link')), '.')
  ]);
}

function renderGuide(el, data, guide) {
  const hideable = guide.sections.some((s) => s.items?.length);
  let hidden = false;
  const page = h('div', { class: 'guide' });
  const toggle = hideable ? h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false', onClick: () => { hidden = !hidden; page.classList.toggle('is-hiding', hidden); toggle.setAttribute('aria-pressed', String(hidden)); toggle.lastChild.textContent = hidden ? t('show_meanings') : t('hide_meanings'); } }, icon('review'), h('span', null, t('hide_meanings'))) : null;

  append(page, [
    h('header', { class: 'page-head' },
      h('h1', null, tr(guide, 'title')),
      h('p', { class: 'lede' }, `${tr(guide, 'summary')} · ${t('about_n_min', { n: guide.minutes })}`),
      toggle ? h('div', { class: 'btn-row' }, toggle, h('span', { class: 'small muted' }, t('hide_meanings_hint'))) : null),
    guide.sections.map((s, i) => h('section', { class: `card ${s.style === 'signs' ? 'span-2' : ''}`, 'aria-labelledby': `g-${guide.id}-${i}` },
      h('h2', { id: `g-${guide.id}-${i}` }, tr(s, 'title')),
      (tr(s, 'body') || []).map((p) => h('p', null, p)),
      s.items?.length ? (s.style === 'signs' ? signGrid(s.items) : itemList(s.items)) : null,
      s.links?.length ? h('ul', { class: 'guide-links' }, s.links.map((l) => h('li', null,
        h('span', { class: 'pill' }, l.level), ' ',
        h('a', { href: l.url, target: '_blank', rel: 'noopener noreferrer' }, l.name),
        h('div', { class: 'small muted' }, tr(l, 'note'))))) : null)),
    h('div', { class: 'btn-row' }, h('a', { class: 'btn', href: '#/guides' }, t('all_guides')), h('a', { class: 'btn btn-primary', href: '#/speak' }, icon('speak'), t('practise_out_loud')))
  ]);
  el.append(page);
}

function sayable(item) { return (item.zh || '').replace(/[→/].*$/, '').replace(/[〇…（）()]/g, '').trim(); }

function itemList(items) {
  return h('ul', { class: 'guide-list' }, items.map((it) => h('li', { class: 'guide-item' },
    h('button', { class: 'guide-say', type: 'button', lang: 'zh-Hans', 'aria-label': `${t('listen')}: ${it.zh}`, disabled: !canSpeak() || !sayable(it) ? true : null, onClick: () => speak(sayable(it)) },
      h('span', { class: 'zh guide-zh' }, it.zh),
      it.pinyin ? h('span', { class: 'small muted guide-pinyin', lang: 'en' }, it.pinyin) : null),
    h('div', { class: 'guide-en' }, tr(it, 'en', 'ja'), tr(it, 'note') ? h('div', { class: 'small muted' }, tr(it, 'note')) : null))));
}

function signGrid(items) {
  return h('div', { class: 'sign-grid' }, items.map((it) => h('button', { class: 'sign', type: 'button', lang: 'zh-Hans', 'aria-label': `${it.zh}, ${it.pinyin}: ${tr(it, 'en', 'ja')}`, disabled: !canSpeak() ? true : null, onClick: () => speak(sayable(it)) },
    h('span', { class: 'sign-zh zh' }, it.zh),
    h('span', { class: 'sign-pinyin small' }, it.pinyin),
    h('span', { class: 'sign-en guide-en' }, tr(it, 'en', 'ja')))));
}
