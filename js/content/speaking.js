/* Speaking content: loads data/speaking.json and data/situations.json and indexes their sets. */
import { loadLevel } from './loader.js';
import { isUnlocked } from './pinyin-stage.js';
import { t } from '../i18n/index.js';

let cache = null;

export async function loadSpeaking() {
  if (!cache) {
    cache = Promise.all([loadLevel('speaking'), loadLevel('situations').catch(() => null)]).then(([base, real]) => {
      const data = base.data.speaking;
      const sets = [...data.sets, ...(real?.data?.speaking?.sets || [])];
      const setsById = new Map(sets.map((s) => [s.id, s]));
      return { data, sets, setsById };
    });
    cache.catch(() => { cache = null; });
  }
  return cache;
}

export function levelLabel(level) {
  if (level === 'pinyin') return t('spk_from_pinyin');
  return t('spk_from_level', { level: String(level).toUpperCase().replace('HSK', 'HSK ') });
}

export const MODE_KEYS = ['situations', 'repeat', 'shadow', 'question', 'roleplay'];
export const MODE_ICONS = { situations: 'read', repeat: 'speak', shadow: 'review', question: 'info', roleplay: 'read' };

/** Sets grouped by mode, each flagged with whether its level is unlocked. */
export async function speakingMenu() {
  const { sets } = await loadSpeaking();
  const out = {};
  for (const s of sets) {
    const unlocked = await isUnlocked(s.level || 'pinyin');
    const key = s.group === 'situations' ? 'situations' : s.mode;
    (out[key] = out[key] || []).push({ ...s, unlocked });
  }
  return out;
}

/** Normalise a set into a list of practice steps the session view can run. */
export function stepsFor(set) {
  if (set.mode === 'roleplay') return set.turns.map((tn, i) => ({ ...tn, id: `${set.id}:${i + 1}`, kind: tn.who === 'you' ? 'say' : 'listen' }));
  if (set.mode === 'question') return set.items.map((it) => ({ ...it, kind: 'answer', zh: it.model, pinyin: it.modelPinyin }));
  return set.items.map((it) => ({ ...it, kind: set.mode === 'shadow' ? 'shadow' : 'say' }));
}
