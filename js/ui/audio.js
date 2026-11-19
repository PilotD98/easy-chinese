/* Text-to-speech wrapper around the Web Speech API (speechSynthesis).
   Uses an installed Mandarin (zh-CN) voice; falls back gracefully if none exists. */
import { settings } from '../store/settings.js';
import { chineseVoices, waitForVoices } from '../util/platform.js';

let voice = null;
let ready = null;

/* Higher-quality voices first: premium/enhanced downloads, then the natural
   system voices, then whatever else is installed. */
const PREFERRED = [/premium/i, /enhanced/i, /tingting/i, /google 普通话|google 中文|google.*zh-cn/i, /xiaoxiao/i, /yunxi/i, /xiaoyi/i, /yunyang/i, /huihui/i, /yaoyao/i, /kangkang/i, /lili/i, /microsoft .*chinese/i];

/** Installed Mandarin voices, best first. */
export function rankedVoices() {
  const voices = chineseVoices();
  const rank = (v) => { const i = PREFERRED.findIndex((re) => re.test(v.name)); return i < 0 ? PREFERRED.length : i; };
  const region = (v) => (/zh[-_]CN|Hans|cmn/i.test(v.lang) ? 0 : 1);
  return [...voices].sort((a, b) => region(a) - region(b) || rank(a) - rank(b) || (b.localService ? 1 : 0) - (a.localService ? 1 : 0));
}

function pickVoice() {
  const want = settings.get('voice');
  const ranked = rankedVoices();
  voice = (want && ranked.find((v) => v.name === want)) || ranked[0] || null;
  return voice;
}
window.addEventListener('ec:settings', (e) => { if (e.detail?.key === 'voice') pickVoice(); });

export function initAudio() {
  if (ready) return ready;
  ready = waitForVoices().then(() => !!pickVoice());
  return ready;
}

export function canSpeak() { return 'speechSynthesis' in window && !!voice; }

/** Current voice (or null). */
export function currentVoice() { return voice; }

const SLOT = /\[[^\]]+\]/g;

/**
 * Speak Chinese text (characters). Returns a promise that resolves when playback ends.
 * [slot] markers are removed before speaking.
 */
export async function speak(text, { rate = null, interrupt = true } = {}) {
  await initAudio();
  if (!('speechSynthesis' in window)) return false;
  if (interrupt) speechSynthesis.cancel();
  const clean = String(text || '').replace(SLOT, '').trim();
  if (!clean) return false;
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = voice?.lang || 'zh-CN';
    if (voice) u.voice = voice;
    u.rate = rate ?? Number(settings.get('audioRate')) ?? 1;
    u.onend = () => resolve(true);
    u.onerror = () => resolve(false);
    speechSynthesis.speak(u);
  });
}

export function stopSpeaking() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
