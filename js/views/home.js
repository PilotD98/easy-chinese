/* Home: today's plan, where to continue, and first-run setup. */
import { activeProfile, listProfiles } from '../store/profiles.js';
import { h, append, icon, formatMinutes } from '../ui/dom.js';
import { days } from '../store/days.js';
import { settings } from '../store/settings.js';
import { getManifest } from '../content/loader.js';
import { dailyPlan } from '../engine/scheduler.js';
import { nextStep } from '../content/pinyin-stage.js';
import { canPromptInstall, promptInstall, isStandalone, isIOS, onInstallAvailable } from '../util/platform.js';
import { toast } from '../ui/toast.js';
import { progress } from '../store/progress.js';
import { placementDone } from '../engine/placement.js';
import { t, tr, locale } from '../i18n/index.js';

export const title = 'nav_today';

function greeting() {
  const hr = new Date().getHours();
  if (hr < 5) return t('greet_night');
  if (hr < 12) return t('greet_morning');
  if (hr < 18) return t('greet_afternoon');
  return t('greet_evening');
}

export async function render(el) {
  const [plan, streak, manifest, step, itemCount, placed] = await Promise.all([
    dailyPlan(), days.streak(), getManifest().catch(() => null), nextStep().catch(() => null), progress.count(), placementDone()
  ]);
  const today = plan.today;
  const dateLine = new Intl.DateTimeFormat(locale(), { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  append(el, [
    h('header', { class: 'page-head' },
      h('h1', null, listProfiles().length > 1 ? t('greet_name', { greet: greeting(), name: activeProfile().name }) : `${greeting()}`),
      h('p', { class: 'lede' }, dateLine)),

    h('section', { class: 'card', 'aria-labelledby': 'plan-h' },
      h('div', { class: 'card-title' }, h('h2', { id: 'plan-h' }, t('todays_plan')),
        h('span', { class: 'pill', title: t('streak_note') }, streak ? t('streak_days', { n: streak }) : t('no_streak'))),
      h('div', { class: 'stat-grid' },
        stat(plan.due, t('reviews_due')),
        stat(plan.newLeft, t('new_items_left')),
        stat(formatMinutes(today.seconds), t('studied_today'))),
      h('div', { class: 'btn-row', style: { marginTop: '16px' } },
        h('a', { class: `btn btn-primary ${plan.due ? '' : 'is-disabled'}`, href: '#/review?start=1', 'aria-disabled': plan.due ? null : 'true', onClick: (e) => { if (!plan.due) { e.preventDefault(); toast(t('nothing_due')); } } }, icon('review'), plan.due ? t('start_reviews_n', { n: plan.due }) : t('start_reviews')),
        step ? h('a', { class: `btn ${plan.due ? '' : 'btn-primary'}`, href: step.href }, icon('learn'), step.label) : h('a', { class: 'btn', href: '#/learn' }, icon('learn'), t('continue_learning'))),
      step?.sub ? h('p', { class: 'small muted', style: { marginTop: '8px', marginBottom: 0 } }, step.sub) : null,
      h('p', { class: 'small muted', style: { marginTop: '12px', marginBottom: 0 } },
        plan.eased ? t('goal_eased', { acc: Math.round(plan.accuracy * 100), n: plan.newAllowance }) : t('goal_normal', { n: plan.newAllowance })),
      plan.capped ? h('p', { class: 'small muted', style: { marginTop: '8px', marginBottom: 0 } }, t('capped_note', { n: plan.capped })) : null),

    itemCount === 0 && !placed && !settings.get('onboarded') ? h('section', { class: 'card card-accent', 'aria-labelledby': 'place-h' },
      h('h2', { id: 'place-h' }, t('already_know_some')),
      h('p', null, t('placement_blurb')),
      h('div', { class: 'btn-row' }, h('a', { class: 'btn', href: '#/placement' }, t('take_placement')))) : null,
    setupCard()
  ]);

  if (manifest && tr(manifest, 'note')) el.append(h('p', { class: 'small muted' }, tr(manifest, 'note')));
}

function stat(value, label) {
  return h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(value)), h('div', { class: 'stat-label' }, label));
}

function setupCard() {
  if (settings.get('onboarded')) return null;
  const list = h('ul', { class: 'stack', style: { listStyle: 'none', padding: 0 } });

  if (!isStandalone()) {
    const row = h('li', { class: 'row' });
    const describe = () => {
      row.replaceChildren();
      if (canPromptInstall()) {
        row.append(h('span', { class: 'grow' }, t('install_blurb')),
          h('button', { class: 'btn', type: 'button', onClick: async () => { const r = await promptInstall(); if (r === 'accepted') toast(t('installed_toast')); } }, icon('install'), t('install')));
      } else if (isIOS()) {
        row.append(h('span', null, t('install_ios')));
      } else {
        row.append(h('span', null, t('install_menu')));
      }
    };
    describe();
    onInstallAvailable(describe);
    list.append(row);
  }

  list.append(
    h('li', { class: 'row' }, h('span', { class: 'grow' }, t('setup_language')), h('a', { class: 'btn', href: '#/settings' }, t('nav_settings'))),
    h('li', { class: 'row' }, h('span', { class: 'grow' }, t('setup_voice')), h('a', { class: 'btn', href: '#/speak' }, t('nav_speak'))),
    h('li', { class: 'row' }, h('span', { class: 'grow' }, t('setup_backup')), h('a', { class: 'btn', href: '#/settings#data' }, t('backup')))
  );

  const card = h('section', { class: 'card', 'aria-labelledby': 'setup-h' },
    h('div', { class: 'card-title' }, h('h2', { id: 'setup-h' }, t('get_set_up')),
      h('button', { class: 'btn', type: 'button', onClick: async () => { await settings.set('onboarded', true); card.remove(); } }, t('done'))),
    list
  );
  return card;
}
