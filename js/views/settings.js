/* Settings: language, appearance, script support, study plan, app, profiles, data, help.
   Every change saves immediately to the device. */
import { h, icon, zh, formatBytes, formatDate } from '../ui/dom.js';
import { settings, OPTIONS } from '../store/settings.js';
import { speak, rankedVoices } from '../ui/audio.js';
import { db } from '../store/db.js';
import { downloadExport, readBackupFile, validateImport, applyImport, clearAllData } from '../store/backup.js';
import { toast } from '../ui/toast.js';
import { openSheet, confirm } from '../ui/dialog.js';
import { showShortcuts } from '../ui/shortcuts.js';
import { offlineStatus, downloadAllContent } from '../content/loader.js';
import { listProfiles, activeProfileId, createProfile, renameProfile, switchProfile, deleteProfile } from '../store/profiles.js';
import { APP_VERSION, canPromptInstall, promptInstall, isStandalone, isIOS, onInstallAvailable, supports, osName } from '../util/platform.js';
import { resetKnown, knownIds } from '../engine/known.js';
import { setLanguage, t } from '../i18n/index.js';

export const title = 'nav_settings';

export async function render(el, ctx) {
  el.append(
    h('header', { class: 'page-head' }, h('h1', null, t('nav_settings')), h('p', { class: 'lede' }, t('settings_lede'))),

    group(t('sg_language'), [
      segField(t('language'), 'language', t('language_hint'), { raw: true })
    ]),

    group(t('sg_appearance'), [
      segField(t('theme'), 'theme'),
      segField(t('text_size'), 'fontSize', t('text_size_hint')),
      selectField(t('zh_font'), 'zhFont', h('span', null, t('sample_colon'), ' ', zh('简单中文，从零开始。'), ' ', t('zh_font_hint'))),
      segField(t('motion'), 'motion', t('motion_hint'))
    ]),

    group(t('sg_script'), [
      selectField(t('pinyin'), 'pinyin', t('pinyin_hint')),
      switchField(t('show_traditional'), 'traditional', t('traditional_hint'))
    ]),

    group(t('sg_study'), [
      stepperField(t('new_per_day'), 'dailyNew', 1, 50, 1, t('new_per_day_hint')),
      stepperField(t('review_cap'), 'dailyReviewCap', 20, 500, 10, t('review_cap_hint')),
      segField(t('audio_speed'), 'audioRate'),
      voiceField(),
      switchField(t('autoplay_audio'), 'autoplayAudio'),
      await knownField()
    ]),

    group(t('sg_app'), [appCard()]),
    group(t('sg_profiles'), [profilesCard()]),
    group(t('sg_data'), [await dataCard(ctx), await offlineCard()]),
    group(t('sg_help'), [
      h('div', { class: 'btn-row' },
        h('a', { class: 'btn', href: '#/placement' }, t('placement_test')),
        h('button', { class: 'btn', type: 'button', onClick: showShortcuts }, t('keyboard_shortcuts')),
        h('a', { class: 'btn', href: '#/about' }, t('about_credits'))
      )
    ])
  );
  if (location.hash.endsWith('#data')) {
    const target = el.querySelector('#data');
    if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 50);
  }
}

/* ---------- field builders ---------- */
function group(titleText, children) {
  const id = `sg-${titleText.toLowerCase().replace(/\W+/g, '-')}`;
  return h('section', { class: 'settings-group', 'aria-labelledby': id }, h('h2', { id }, titleText), children);
}

const label = (key, raw) => (raw ? key : t(key));

function segField(labelText, key, hint, { raw = false } = {}) {
  const name = `seg-${key}`;
  const current = String(settings.get(key));
  const seg = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': labelText },
    OPTIONS[key].map(([value, text]) => h('label', null,
      h('input', { type: 'radio', name, value, checked: value === current ? true : null, onChange: () => change(key, value) }),
      h('span', null, label(text, raw))
    ))
  );
  return h('div', { class: 'field' }, h('span', { class: 'label' }, labelText), seg, hint ? h('span', { class: 'hint' }, hint) : null);
}

function selectField(labelText, key, hint) {
  const id = `sel-${key}`;
  const current = String(settings.get(key));
  const sel = h('select', { class: 'select', id, onChange: (e) => change(key, e.target.value) },
    OPTIONS[key].map(([value, text]) => h('option', { value, selected: value === current ? true : null }, t(text))));
  return h('div', { class: 'field' }, h('label', { for: id }, labelText), sel, hint ? h('span', { class: 'hint' }, hint) : null);
}

function stepperField(labelText, key, min, max, step, hint) {
  const out = h('output', { 'aria-live': 'polite' }, String(settings.get(key)));
  const update = async (delta) => {
    const next = Math.min(max, Math.max(min, Number(settings.get(key)) + delta));
    await settings.set(key, next);
    out.textContent = String(next);
  };
  return h('div', { class: 'field' },
    h('span', { class: 'label', id: `lbl-${key}` }, labelText),
    h('div', { class: 'stepper', role: 'group', 'aria-labelledby': `lbl-${key}` },
      h('button', { type: 'button', 'aria-label': t('decrease_x', { x: labelText }), onClick: () => update(-step) }, '−'),
      out,
      h('button', { type: 'button', 'aria-label': t('increase_x', { x: labelText }), onClick: () => update(step) }, '+')
    ),
    hint ? h('span', { class: 'hint' }, hint) : null
  );
}

function switchField(labelText, key, hint) {
  const id = `sw-${key}`;
  return h('div', { class: 'field' }, h('label', { class: 'switch', for: id },
    h('span', null, labelText),
    h('input', { type: 'checkbox', id, role: 'switch', checked: settings.get(key) ? true : null, onChange: (e) => settings.set(key, e.target.checked) })
  ), hint ? h('span', { class: 'hint' }, hint) : null);
}

async function change(key, value) {
  const v = key === 'audioRate' ? Number(value) : value;
  await settings.set(key, v);
  if (key === 'language') await setLanguage(v);
}

/* ---------- Known marks ---------- */
async function knownField() {
  const ids = await knownIds();
  const line = h('span', { class: 'hint' }, t('known_count_hint', { n: ids.size }));
  const btn = h('button', { class: 'btn', type: 'button', disabled: ids.size ? null : true, onClick: async () => {
    const ok = await confirm({ title: t('reset_known_q'), body: t('reset_known_body', { n: ids.size }), confirmLabel: t('reset_known'), danger: true });
    if (!ok) return;
    const r = await resetKnown();
    toast(t('reset_known_done', { n: r.deleted + r.cleared }));
    btn.disabled = true;
    line.textContent = t('known_count_hint', { n: 0 });
  } }, icon('trash'), t('reset_known'));
  return h('div', { class: 'field' }, h('span', { class: 'label' }, t('known_marks')), h('div', { class: 'btn-row' }, btn), line);
}

/* ---------- Voice ---------- */
function voiceField() {
  const voices = rankedVoices();
  const current = settings.get('voice') || '';
  const id = 'sel-voice';
  const sel = h('select', { class: 'select', id, onChange: (e) => settings.set('voice', e.target.value) },
    h('option', { value: '', selected: current === '' ? true : null }, voices.length ? t('voice_auto_named', { name: voices[0].name }) : t('voice_auto')),
    voices.map((v) => h('option', { value: v.name, selected: v.name === current ? true : null }, `${v.name} (${v.lang})${v.localService ? '' : ' · ' + t('online')}`)));
  const test = h('button', { class: 'btn', type: 'button', disabled: !voices.length, onClick: () => speak('你好，我是学生。我们一起学习汉语吧。') }, icon('speak'), t('test'));
  const os = osName();
  const better = t(`voice_better_${os}`);
  return h('div', { class: 'field' }, h('label', { for: id }, t('zh_voice')),
    h('div', { class: 'row' }, sel, test),
    h('span', { class: 'hint' }, voices.length ? `${t('n_voices_installed', { n: voices.length })} ${better}` : `${t('no_zh_voice_installed')} ${better}`));
}

/* ---------- App card ---------- */
function appCard() {
  const sup = supports();
  const installRow = h('div', { class: 'row' });
  const renderInstall = () => {
    installRow.replaceChildren();
    if (isStandalone()) installRow.append(h('span', { class: 'muted' }, t('installed_as_app')));
    else if (canPromptInstall()) installRow.append(h('span', { class: 'grow' }, t('install_blurb')), h('button', { class: 'btn', type: 'button', onClick: async () => { const r = await promptInstall(); if (r === 'accepted') renderInstall(); } }, icon('install'), t('install_app')));
    else if (isIOS()) installRow.append(h('span', null, t('install_ios')));
    else installRow.append(h('span', null, t('install_menu')));
  };
  renderInstall();
  onInstallAvailable(renderInstall);
  return h('div', { class: 'card' },
    installRow,
    h('hr'),
    h('div', { class: 'small muted' },
      h('div', null, t('version_x', { v: APP_VERSION })),
      h('div', null, sup.serviceWorker ? t('offline_available') : t('offline_unavailable'))
    )
  );
}

/* ---------- Data card ---------- */
async function dataCard(ctx) {
  const info = await db.storageInfo();
  const [progressCount, dayCount] = await Promise.all([db.count('progress'), db.count('days')]);
  const fileInput = h('input', { type: 'file', accept: 'application/json,.json', class: 'sr-only', 'aria-label': t('choose_backup_file'), onChange: (e) => onImportFile(e.target.files?.[0], ctx) });
  const storageLine = info.localMode ? t('storage_local_mode') : t('storage_using', { used: formatBytes(info.usage), quota: info.quota ? formatBytes(info.quota) : '—' });
  const persistBtn = info.persisted === false
    ? h('button', { class: 'btn', type: 'button', onClick: async (e) => {
        const ok = await db.requestPersist();
        toast(ok ? t('persist_ok') : t('persist_declined'));
        if (ok) e.currentTarget.remove();
      } }, t('keep_persistent'))
    : null;
  return h('div', { class: 'card', id: 'data' },
    h('p', null, t('records_and_days', { n: progressCount, d: dayCount }), ' ', h('span', { class: 'muted' }, storageLine)),
    info.persisted === true ? h('p', { class: 'small muted' }, t('storage_persistent')) : null,
    h('div', { class: 'btn-row' },
      h('button', { class: 'btn', type: 'button', onClick: async () => { const name = await downloadExport(); toast(t('saved_x', { x: name })); } }, icon('download'), t('export_backup')),
      h('button', { class: 'btn', type: 'button', onClick: () => fileInput.click() }, icon('upload'), t('import_backup')),
      persistBtn
    ),
    fileInput,
    h('hr'),
    h('div', { class: 'row' },
      h('span', { class: 'grow small muted' }, t('clear_all_blurb')),
      h('button', { class: 'btn btn-danger', type: 'button', onClick: () => onClear(ctx) }, icon('trash'), t('clear_all_data'))
    )
  );
}

function profilesCard() {
  const card = h('div', { class: 'card', id: 'profiles' });
  const nameSheet = (titleText, initial, onSave) => {
    const input = h('input', { type: 'text', class: 'input', value: initial || '', maxlength: 40, autocomplete: 'off', 'aria-label': t('profile_name'), placeholder: t('name') });
    const sheet = openSheet({ title: titleText, body: h('div', null, h('label', { class: 'field' }, h('span', { class: 'field-label' }, t('profile_name')), input)),
      actions: [{ label: t('cancel') }, { label: t('save'), primary: true, onClick: () => { const v = input.value.trim(); if (!v) { input.focus(); return false; } onSave(v); } }] });
    setTimeout(() => input.focus(), 50);
    return sheet;
  };
  const rebuild = () => {
    const active = activeProfileId();
    const list = listProfiles();
    card.replaceChildren(
      h('p', { class: 'small muted' }, t('profiles_blurb')),
      h('ul', { class: 'profile-list', 'aria-label': t('sg_profiles') }, list.map((p) => h('li', { class: 'row' },
        h('span', { class: 'grow' }, p.name, p.id === active ? h('span', { class: 'pill', style: { marginLeft: '8px' } }, t('active')) : null),
        p.id === active ? null : h('button', { class: 'btn', type: 'button', onClick: () => { switchProfile(p.id); location.hash = '#/home'; location.reload(); } }, t('switch')),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('rename_x', { x: p.name }), onClick: () => nameSheet(t('rename_profile'), p.name, (v) => { renameProfile(p.id, v); rebuild(); }) }, icon('edit')),
        p.id === active ? null : h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('delete_x', { x: p.name }), onClick: async () => {
          const ok = await confirm({ title: t('delete_x_q', { x: p.name }), body: t('delete_profile_body'), confirmLabel: t('delete_profile'), danger: true });
          if (!ok) return; await deleteProfile(p.id); toast(t('deleted_x', { x: p.name })); rebuild();
        } }, icon('trash'))
      ))),
      h('div', { class: 'btn-row' }, h('button', { class: 'btn', type: 'button', onClick: () => nameSheet(t('new_profile'), '', (v) => { createProfile(v); toast(t('added_profile', { x: v })); rebuild(); }) }, icon('plus'), t('add_profile')))
    );
  };
  rebuild();
  return card;
}

async function offlineCard() {
  const status = await offlineStatus();
  const line = h('p', { class: 'small muted' });
  const describe = (st) => { line.textContent = !st.supported ? t('offline_unsupported') : st.stored >= st.total ? t('offline_all_stored', { n: st.total }) : t('offline_partial', { n: st.stored, total: st.total }); };
  describe(status);
  const btn = h('button', { class: 'btn', type: 'button', disabled: !status.supported || status.stored >= status.total ? true : null, onClick: async () => {
    btn.disabled = true;
    const lbl = btn.querySelector('span');
    try {
      const res = await downloadAllContent((done, total) => { lbl.textContent = t('downloading_n_of', { n: done, total }); });
      describe(await offlineStatus());
      lbl.textContent = t('download_all_levels');
      toast(res.failed.length ? t('download_failed_n', { n: res.failed.length }) : t('download_done'));
      if (res.failed.length) btn.disabled = false;
    } catch (err) { lbl.textContent = t('download_all_levels'); btn.disabled = false; toast(t('download_error', { msg: err.message })); }
  } }, icon('download'), h('span', null, t('download_all_levels')));
  return h('div', { class: 'card', id: 'offline', 'aria-live': 'polite' },
    h('h3', null, t('offline_content')),
    line,
    h('div', { class: 'btn-row' }, btn));
}

async function onImportFile(file, ctx) {
  if (!file) return;
  let obj;
  try { obj = await readBackupFile(file); }
  catch (err) { toast(err.message); return; }
  const check = validateImport(obj);
  if (!check.ok) {
    openSheet({ title: t('cannot_import'), body: h('ul', null, check.errors.map((e) => h('li', null, e))) });
    return;
  }
  const s = check.summary;
  let mode = 'replace';
  const body = h('div', null,
    h('p', null, t('backup_summary', { date: s.exportedAt ? formatDate(s.exportedAt, { dateStyle: 'medium', timeStyle: 'short' }) : '?', v: s.appVersion || '?', p: s.progress, d: s.days, st: s.settings })),
    h('div', { class: 'seg', role: 'radiogroup', 'aria-label': t('import_mode') },
      h('label', null, h('input', { type: 'radio', name: 'imode', value: 'replace', checked: true, onChange: () => { mode = 'replace'; } }), h('span', null, t('replace_device_data'))),
      h('label', null, h('input', { type: 'radio', name: 'imode', value: 'merge', onChange: () => { mode = 'merge'; } }), h('span', null, t('merge_keep_newest')))
    ),
    h('p', { class: 'small muted', style: { marginTop: '12px' } }, t('import_mode_hint'))
  );
  openSheet({
    title: t('import_backup'),
    body,
    actions: [
      { label: t('cancel') },
      { label: t('import'), primary: true, onClick: async () => {
        try {
          await applyImport(obj, { mode });
          toast(t('imported_n', { n: s.progress, mode }));
          await setLanguage(settings.get('language'));
          ctx.navigate('settings', { replace: true });
        } catch (err) { toast(t('import_failed', { msg: err.message })); }
      } }
    ]
  });
}

async function onClear(ctx) {
  const ok = await confirm({
    title: t('clear_all_q'),
    body: h('div', null, h('p', null, t('clear_all_body')), h('p', null, t('export_first'))),
    confirmLabel: t('delete_everything'), danger: true
  });
  if (!ok) return;
  await clearAllData();
  toast(t('all_data_cleared'));
  await setLanguage('en');
  ctx.navigate('settings', { replace: true });
}
