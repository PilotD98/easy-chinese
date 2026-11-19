/* Export / import of all device data as one JSON file.
   File shape (schema 1):
   {
     app: 'easy-chinese', schema: 1, appVersion, exportedAt,
     settings: { key: value, ... },
     progress: [ record, ... ],
     days:     [ row, ... ],
     meta:     [ { id, value }, ... ]
   } */
import { appearanceKeyFor } from './profiles.js';
import { db, STORES } from './db.js';
import { settings, DEFAULTS } from './settings.js';
import { APP_VERSION } from '../util/platform.js';
import { t } from '../i18n/index.js';

export const BACKUP_SCHEMA = 1;
export const APP_MARKER = 'easy-chinese';

export async function buildExport() {
  const [progress, daysRows, meta] = await Promise.all([db.getAll('progress'), db.getAll('days'), db.getAll('meta')]);
  return {
    app: APP_MARKER,
    schema: BACKUP_SCHEMA,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    settings: settings.all(),
    progress: progress || [],
    days: daysRows || [],
    meta: meta || []
  };
}

/** Trigger a file download of the current data. Returns the filename. */
export async function downloadExport() {
  const data = await buildExport();
  const name = `easy-chinese-backup-${data.exportedAt.slice(0, 10)}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return name;
}

/** Validate a parsed backup object. Returns { ok, errors, summary }. */
export function validateImport(obj) {
  const errors = [];
  if (!obj || typeof obj !== 'object') errors.push(t('imp_not_object'));
  else {
    if (obj.app !== APP_MARKER) errors.push(t('imp_not_backup'));
    if (typeof obj.schema !== 'number') errors.push(t('imp_no_schema'));
    else if (obj.schema > BACKUP_SCHEMA) errors.push(t('imp_newer_schema', { have: obj.schema, mine: BACKUP_SCHEMA }));
    if (obj.progress && !Array.isArray(obj.progress)) errors.push(t('imp_bad_list', { field: 'progress' }));
    if (obj.days && !Array.isArray(obj.days)) errors.push(t('imp_bad_list', { field: 'days' }));
    if (obj.settings && typeof obj.settings !== 'object') errors.push(t('imp_bad_settings'));
    for (const r of obj.progress || []) { if (!r || typeof r.id !== 'string') { errors.push(t('imp_record_no_id')); break; } }
    for (const r of obj.days || []) { if (!r || !/^\d{4}-\d{2}-\d{2}$/.test(r.id || '')) { errors.push(t('imp_bad_day')); break; } }
  }
  const summary = obj && typeof obj === 'object' ? {
    exportedAt: obj.exportedAt || null,
    appVersion: obj.appVersion || null,
    progress: Array.isArray(obj.progress) ? obj.progress.length : 0,
    days: Array.isArray(obj.days) ? obj.days.length : 0,
    settings: obj.settings ? Object.keys(obj.settings).length : 0
  } : null;
  return { ok: errors.length === 0, errors, summary };
}

/** Read a File object and parse it. Throws with a friendly message on failure. */
export async function readBackupFile(file) {
  if (file.size > 50 * 1024 * 1024) throw new Error(t('imp_too_large'));
  const text = await file.text();
  try { return JSON.parse(text); }
  catch { throw new Error(t('imp_invalid_json')); }
}

/**
 * Apply a validated backup.
 * mode 'replace': wipe device data first, then load the file.
 * mode 'merge':   keep newer progress records, keep the larger daily totals, overwrite settings.
 */
export async function applyImport(obj, { mode = 'replace' } = {}) {
  const check = validateImport(obj);
  if (!check.ok) throw new Error(check.errors.join(' '));

  if (mode === 'replace') {
    await db.clearAll();
    if (obj.progress?.length) await db.putMany('progress', obj.progress);
    if (obj.days?.length) await db.putMany('days', obj.days);
    if (obj.meta?.length) await db.putMany('meta', obj.meta);
  } else {
    const existing = new Map(((await db.getAll('progress')) || []).map((r) => [r.id, r]));
    const merged = [];
    for (const r of obj.progress || []) {
      const cur = existing.get(r.id);
      if (!cur || Date.parse(r.updatedAt || 0) >= Date.parse(cur.updatedAt || 0)) merged.push(r);
    }
    if (merged.length) await db.putMany('progress', merged);
    const curDays = new Map(((await db.getAll('days')) || []).map((r) => [r.id, r]));
    const mergedDays = [];
    for (const r of obj.days || []) {
      const cur = curDays.get(r.id);
      if (!cur) { mergedDays.push(r); continue; }
      mergedDays.push({ id: r.id, seconds: Math.max(cur.seconds || 0, r.seconds || 0), reviews: Math.max(cur.reviews || 0, r.reviews || 0), newItems: Math.max(cur.newItems || 0, r.newItems || 0), answered: Math.max(cur.answered || 0, r.answered || 0), correct: Math.max(cur.correct || 0, r.correct || 0) });
    }
    if (mergedDays.length) await db.putMany('days', mergedDays);
    if (obj.meta?.length) await db.putMany('meta', obj.meta);
  }

  const incoming = {};
  for (const [k, v] of Object.entries(obj.settings || {})) if (k in DEFAULTS) incoming[k] = v;
  if (mode === 'replace') await settings.resetToDefaults();
  if (Object.keys(incoming).length) await settings.setMany(incoming);
  window.dispatchEvent(new CustomEvent('ec:data-changed'));
  return check.summary;
}

/** Delete everything stored by the app on this device. */
export async function clearAllData() {
  await db.clearAll();
  for (const s of STORES) await db.clear(s);
  try { localStorage.removeItem(appearanceKeyFor()); } catch { /* ignore */ }
  await settings.resetToDefaults();
  window.dispatchEvent(new CustomEvent('ec:data-changed'));
}
