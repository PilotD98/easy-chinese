/* User settings. Stored in the `settings` store as { id, value }.
   Appearance settings and the interface language are mirrored to localStorage
   ('ec:appearance') so the inline script in index.html can apply them before
   first paint. */
import { db } from './db.js';
import { appearanceKeyFor } from './profiles.js';

export const DEFAULTS = Object.freeze({
  // Interface
  language: 'en',         // en | ja
  // Appearance
  theme: 'system',        // system | light | dark
  fontSize: 'medium',     // small | medium | large | xlarge
  zhFont: 'sans',         // sans | serif
  motion: 'system',       // system | reduce | full
  // Script support
  pinyin: 'auto',         // auto | always | never  (pinyin above characters)
  traditional: false,     // show traditional forms next to simplified
  // Study plan
  dailyNew: 10,           // new items per day
  dailyReviewCap: 100,    // max reviews scheduled per day; the rest spill to later days
  audioRate: 1.0,         // 0.7 | 1.0
  voice: '',              // name of a speechSynthesis voice; '' = best available
  autoplayAudio: true,
  // Flags
  onboarded: false
});

/** Option lists: [value, i18n key]. Labels are translated by the Settings view. */
export const OPTIONS = Object.freeze({
  language: [['en', 'English'], ['ja', '日本語']],
  theme: [['system', 'opt_system'], ['light', 'opt_light'], ['dark', 'opt_dark']],
  fontSize: [['small', 'opt_small'], ['medium', 'opt_medium'], ['large', 'opt_large'], ['xlarge', 'opt_xlarge']],
  zhFont: [['sans', 'opt_font_sans'], ['serif', 'opt_font_serif']],
  motion: [['system', 'opt_system'], ['reduce', 'opt_reduced'], ['full', 'opt_full']],
  pinyin: [['auto', 'opt_pinyin_auto'], ['always', 'opt_pinyin_always'], ['never', 'opt_pinyin_never']],
  audioRate: [['0.7', 'opt_rate_slow'], ['1', 'opt_rate_natural']]
});

const state = { ...DEFAULTS };
let loaded = false;

export const settings = {
  async load() {
    const rows = await db.getAll('settings');
    for (const row of rows || []) {
      if (row && row.id in DEFAULTS) state[row.id] = row.value;
    }
    loaded = true;
    this.apply();
    return { ...state };
  },
  get(key) { return state[key]; },
  all() { return { ...state }; },
  isLoaded() { return loaded; },
  async set(key, value) {
    if (!(key in DEFAULTS)) throw new Error(`Unknown setting: ${key}`);
    state[key] = value;
    await db.put('settings', { id: key, value });
    this.apply();
    window.dispatchEvent(new CustomEvent('ec:settings', { detail: { key, value } }));
  },
  async setMany(obj) {
    for (const [k, v] of Object.entries(obj)) {
      if (k in DEFAULTS) { state[k] = v; await db.put('settings', { id: k, value: v }); }
    }
    this.apply();
    window.dispatchEvent(new CustomEvent('ec:settings', { detail: { key: null, value: null } }));
  },
  async resetToDefaults() {
    await db.clear('settings');
    Object.assign(state, DEFAULTS);
    this.apply();
    window.dispatchEvent(new CustomEvent('ec:settings', { detail: { key: null, value: null } }));
  },
  /** Push appearance settings onto <html> and mirror them for the pre-paint script. */
  apply() {
    const root = document.documentElement;
    root.dataset.theme = state.theme;
    root.dataset.fontSize = state.fontSize;
    root.dataset.zhFont = state.zhFont;
    root.dataset.motion = state.motion;
    try {
      localStorage.setItem(appearanceKeyFor(), JSON.stringify({
        theme: state.theme, fontSize: state.fontSize, zhFont: state.zhFont, motion: state.motion, language: state.language
      }));
    } catch { /* storage may be unavailable; harmless */ }
  }
};

/** The language saved for this profile, readable before the database opens (for boot). */
export function savedLanguage() {
  try { const a = JSON.parse(localStorage.getItem(appearanceKeyFor()) || 'null'); return a?.language || 'en'; }
  catch { return 'en'; }
}
