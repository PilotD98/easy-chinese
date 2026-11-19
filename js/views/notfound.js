/* Fallback view for unknown routes and view load errors. */
import { h, icon } from '../ui/dom.js';
import { t } from '../i18n/index.js';

export const title = 'not_found';

export async function render(el, ctx) {
  const isError = !!ctx.error;
  el.append(
    h('header', { class: 'page-head' }, h('h1', null, isError ? t('something_wrong') : t('page_not_found'))),
    h('div', { class: `notice ${isError ? 'notice-err' : ''}` }, icon('info'),
      h('div', null,
        h('p', null, isError ? t('screen_load_failed') : t('no_page_at', { hash: location.hash })),
        isError && ctx.error?.message ? h('p', { class: 'small muted' }, h('code', null, ctx.error.message)) : null
      )),
    h('div', { class: 'btn-row' },
      h('a', { class: 'btn btn-primary', href: '#/home' }, t('go_home')),
      isError ? h('button', { class: 'btn', type: 'button', onClick: () => location.reload() }, t('try_again')) : null
    )
  );
}
