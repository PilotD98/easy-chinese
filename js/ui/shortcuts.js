/* Keyboard shortcut reference sheet (opened with "?" or from Settings). */
import { h } from './dom.js';
import { openSheet } from './dialog.js';
import { t } from '../i18n/index.js';

export function showShortcuts() {
  const rows = [
    ['/', t('sc_lookup')],
    ['?', t('sc_list')],
    ['Esc', t('sc_close')],
    ['Space', t('sc_reveal')],
    ['1 – 4', t('sc_grade')],
    ['Enter', t('sc_continue')]
  ];
  const dl = h('dl', { class: 'kbd-list' }, rows.flatMap(([k, d]) => [h('dt', null, h('kbd', null, k)), h('dd', null, d)]));
  openSheet({ title: t('keyboard_shortcuts'), body: h('div', null, dl) });
}
