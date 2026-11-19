/* About & credits. Every open-licensed source used by the app is listed here
   and in README.md, with its license. */
import { h, zh } from '../ui/dom.js';
import { APP_VERSION } from '../util/platform.js';
import { t } from '../i18n/index.js';

export const title = 'about';

const SOURCES = [
  { name: 'Noto Sans SC, Noto Serif SC', use: 'src_fonts', license: 'SIL Open Font License 1.1', url: 'https://fonts.google.com/noto' },
  { name: 'CC-CEDICT', use: 'src_cedict', license: 'CC BY-SA 4.0', url: 'https://www.mdbg.net/chinese/dictionary?page=cc-cedict' },
  { name: 'HSK 2.0 vocabulary lists (complete-hsk-vocabulary)', use: 'src_hsk', license: 'MIT (compilation); lists published by Hanban / 国家汉办', url: 'https://github.com/drkameleon/complete-hsk-vocabulary' },
  { name: 'Make Me a Hanzi', use: 'src_mmah', license: 'Arphic Public License (character data), LGPL (dictionary)', url: 'https://github.com/skishore/makemeahanzi' },
  { name: 'hanzi-writer-data', use: 'src_hwd', license: 'Arphic Public License', url: 'https://github.com/chanind/hanzi-writer-data' }
];

export async function render(el) {
  el.append(
    h('header', { class: 'page-head' }, h('h1', null, t('about_app')), h('p', { class: 'lede' }, zh('简单中文'), ' — ', t('about_tagline'), ' ', t('version_x', { v: APP_VERSION }))),
    h('section', { class: 'card' },
      h('h2', null, t('what_it_is')),
      h('p', null, t('about_what_1')),
      h('p', null, t('about_what_2'))
    ),
    h('section', { class: 'card' },
      h('h2', null, t('content_sources')),
      h('p', { class: 'muted small' }, t('sources_note')),
      h('ul', { class: 'path' }, SOURCES.map((s) => h('li', { style: { gridTemplateColumns: '1fr' } },
        h('div', null, h('div', { class: 'step-title' }, h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, s.name)), h('div', { class: 'step-sub' }, `${t(s.use)} · ${s.license}`))
      )))
    ),
    h('section', { class: 'card' },
      h('h2', null, t('privacy')),
      h('p', null, t('about_privacy'))
    ),
    h('p', { class: 'small muted' }, t('code_license'))
  );
}
