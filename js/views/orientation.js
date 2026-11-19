/* How Chinese works: short, visual, with pinyin under every example. */
import { h, append, icon, zh } from '../ui/dom.js';
import { loadLevel } from '../content/loader.js';
import { markOrientationDone, orientationDone } from '../content/pinyin-stage.js';
import { speak, canSpeak, initAudio } from '../ui/audio.js';
import { t, tr } from '../i18n/index.js';

export const title = 'orientation_title';

const ROLE_CLASS = { subject: 'ex-subject', verb: 'ex-verb', object: 'ex-object', particle: 'ex-particle', measure: 'ex-measure', tone1: 'ex-t1', tone2: 'ex-t2', tone3: 'ex-t3', tone4: 'ex-t4', tone0: 'ex-t0' };

export async function render(el) {
  const level = await loadLevel('orientation');
  const o = level.data.orientation;
  const done = await orientationDone();
  await initAudio();

  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, tr(o, 'title')), h('p', { class: 'lede' }, t('orientation_lede', { min: o.minutes }))),
    o.sections.map((s) => h('section', { class: 'card', 'aria-labelledby': `o-${s.id}` },
      h('h2', { id: `o-${s.id}` }, tr(s, 'title')),
      (tr(s, 'body') || []).map((p) => h('p', null, p)),
      s.example ? example(s.example) : null
    )),
    h('div', { class: 'card card-accent' },
      h('p', null, done ? t('orientation_done') : t('orientation_end')),
      h('div', { class: 'btn-row' },
        h('a', { class: 'btn btn-primary btn-lg', href: '#/learn/pinyin', onClick: () => markOrientationDone() }, t('start_pinyin')),
        done ? null : h('button', { class: 'btn', type: 'button', onClick: async () => { await markOrientationDone(); location.hash = '#/learn'; } }, t('mark_as_read'))
      )
    )
  ]);
}

function example(ex) {
  const box = h('div', { class: 'example' });
  if (ex.parts) {
    const line = h('div', { class: 'zh zh-xl ex-line', lang: 'zh-Hans' }, ex.parts.map(([text, cls]) => h('span', { class: ROLE_CLASS[cls] || '', title: t(`role_${cls}`) }, text)));
    box.append(line, h('div', { class: 'ex-legend' }, [...new Set(ex.parts.map((p) => p[1]))].map((k) => h('span', { class: `pill ${ROLE_CLASS[k] || ''}` }, t(`role_${k}`)))));
  } else {
    box.append(zh(ex.zh, 'zh-xl ex-line'));
  }
  box.append(h('div', { class: 'ex-pinyin' }, ex.pinyin), h('div', { class: 'muted' }, tr(ex, 'en', 'ja')));
  if (canSpeak() && ex.zh) box.append(h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), onClick: () => speak(ex.zh) }, icon('speak')));
  return box;
}
