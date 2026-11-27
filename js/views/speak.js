/* Speak: hub with capability check and the practice modes.
   Routes: #/speak, #/speak/<setId> (session) */
import { h, append, icon, zh } from '../ui/dom.js';
import { supports, chineseVoices, osName, isIOS } from '../util/platform.js';
import { settings } from '../store/settings.js';
import { speak, initAudio, canSpeak } from '../ui/audio.js';
import { speakingMenu, MODE_KEYS, MODE_ICONS, levelLabel } from '../content/speaking.js';
import { recognitionSupported } from '../ui/recognizer.js';
import { recordingSupported } from '../ui/recorder.js';
import { t, tr } from '../i18n/index.js';

export const title = 'nav_speak';

export async function render(el, ctx) {
  if (ctx.segs[1]) { const m = await import('./speak-session.js'); return m.render(el, ctx); }

  const sup = supports();
  await initAudio();
  const voices = chineseVoices();
  const sr = recognitionSupported();
  const recOk = recordingSupported();
  const allGood = (voices.length > 0 || canSpeak()) && sr && recOk;
  const menu = await speakingMenu().catch(() => ({}));

  append(el, [
    h('header', { class: 'page-head' }, h('h1', null, t('nav_speak')), h('p', { class: 'lede' }, t('speak_lede'))),
    !voices.length ? h('div', { class: 'notice notice-warn' }, icon('info'), h('p', null, t('no_zh_voice'))) : null,
    !sr ? h('div', { class: 'notice' }, icon('info'), h('p', null, t('no_sr'))) : null,

    MODE_KEYS.map((mode) => {
      const sets = menu[mode] || [];
      return h('section', { class: 'card', 'aria-labelledby': `m-${mode}` },
        h('div', { class: 'card-title' }, h('h2', { id: `m-${mode}` }, t(`mode_${mode}`))),
        h('p', { class: 'muted' }, t(`mode_${mode}_blurb`)),
        sets.length ? h('ul', { class: 'path' }, sets.map((s) => h('li', null,
          h('span', { class: `step-no ${s.unlocked ? 'is-available' : ''}`, 'aria-hidden': 'true' }, icon(MODE_ICONS[s.mode] || MODE_ICONS[mode])),
          h('div', null, h('div', { class: 'step-title' }, tr(s, 'title')), h('div', { class: 'step-sub' }, `${tr(s, 'summary')} · ${t('n_lines', { n: (s.items || s.turns).length })} · ${levelLabel(s.level)}`)),
          s.unlocked ? h('a', { class: 'btn btn-primary', href: `#/speak/${encodeURIComponent(s.id)}` }, t('start'))
            : h('span', { class: 'icon lock', title: t('unlocks_with_level') }, icon('lock'))
        ))) : h('p', { class: 'small muted' }, t('no_sets_yet'))
      );
    }),

    h('details', { class: 'card', open: allGood ? null : true },
      h('summary', { style: { cursor: 'pointer', fontWeight: 600, minHeight: '44px', display: 'flex', alignItems: 'center' } }, allGood ? t('browser_supports_all') : t('what_browser_supports')),
      h('ul', { class: 'stack', style: { listStyle: 'none', padding: 0, marginTop: '12px' } },
        cap(voices.length > 0 || canSpeak(), t('cap_voice'), voices.length ? t('cap_voice_installed', { n: voices.length, names: voices.slice(0, 3).map((v) => v.name).join(', ') + (voices.length > 3 ? '…' : '') }) : canSpeak() ? t('ios_voice_default') : sup.speechSynthesis ? t('cap_voice_none') : t('cap_no_synthesis')),
        cap(sr, t('cap_sr'), sr ? t('cap_sr_ok') : t('cap_sr_no')),
        cap(recOk, t('cap_rec'), recOk ? t('cap_rec_ok') : t('cap_rec_no'))),
      h('div', { class: 'btn-row', style: { marginTop: '12px' } },
        h('button', { class: 'btn', type: 'button', disabled: sup.speechSynthesis ? null : true, onClick: () => speak('你好') }, icon('speak'), t('test_voice')),
        h('span', { class: 'small muted' }, t('plays_at', { rate: settings.get('audioRate') }), ' ', zh('你好'))),
      voices.length ? null : voiceGuide(),
      isIOS() ? h('p', { class: 'small muted', style: { marginTop: '12px' } }, t('voice_silent_switch')) : null,
      isIOS() ? h('p', { class: 'small muted', style: { marginTop: '12px' } }, t('ios_sr_note')) : null)
  ]);
}

function cap(ok, label, detail) {
  return h('li', { class: 'row', style: { alignItems: 'flex-start' } },
    h('span', { class: 'pill', style: { background: ok ? 'var(--ok-soft)' : 'var(--warn-soft)', color: ok ? 'var(--ok)' : 'var(--warn)', flex: 'none', marginTop: '2px' } }, ok ? t('ready') : t('missing')),
    h('div', { class: 'grow' }, h('div', { style: { fontWeight: 500 } }, label), h('div', { class: 'small muted' }, detail)));
}

export function voiceGuide() {
  const os = osName();
  const keys = ['ios', 'android', 'windows', 'macos', 'linux', 'other'];
  const order = [os, ...keys.filter((k) => k !== os && k !== 'other')];
  return h('div', { style: { marginTop: '12px' } },
    h('h3', null, t('install_zh_voice')),
    h('p', { class: 'muted' }, t('voice_privacy_note')),
    order.map((k, i) => h('details', { open: i === 0 ? true : null },
      h('summary', { style: { cursor: 'pointer', minHeight: '44px', display: 'flex', alignItems: 'center', fontWeight: 500 } }, t(`os_${k}`)),
      h('ol', null, [1, 2, 3].map((n) => t(`voice_steps_${k}_${n}`)).filter((s) => !/^voice_steps_/.test(s)).map((s) => h('li', null, s))))));
}
