/* Text-to-speech wrapper around the Web Speech API (speechSynthesis).
   Uses any voice installed on the device: the one picked in Settings, else the
   best Mandarin voice, else the system default for zh-CN.

   iOS notes (Safari and Home Screen web apps):
   - speechSynthesis.speak() must be called synchronously inside the tap that
     asks for it. Awaiting anything first makes iOS drop the utterance silently,
     so speak() never awaits before speaking.
   - The voice list often arrives late and without a voiceschanged event, so it
     is re-read on every call and polled at start-up.
   - Speech follows the Ring/Silent switch: with the phone on Silent nothing is
     heard and no error is reported.
   - cancel() immediately followed by speak() can swallow the new utterance in
     WebKit, so cancel() is only called when something is actually playing. */
import { settings } from '../store/settings.js';
import { t } from '../i18n/index.js';
import { toast } from './toast.js';
import { allVoices, chineseVoices, chineseRegion, isChineseVoice, voiceId, waitForVoices, isIOS } from '../util/platform.js';

let voice = null;
let ready = null;
let current = null;           // keep the utterance referenced until it ends (Safari GC bug)
let lastErrorToast = 0;

/* Higher-quality voices first: premium/enhanced downloads, then the natural
   system voices, then whatever else is installed. */
const PREFERRED = [/premium/i, /enhanced/i, /tingting|婷婷/i, /lili|莉莉/i, /google 普通话|google 中文|google.*zh-cn/i, /xiaoxiao/i, /yunxi/i, /xiaoyi/i, /yunyang/i, /huihui/i, /yaoyao/i, /kangkang/i, /microsoft .*chinese/i];
const quality = (v) => /premium/i.test(v.voiceURI || '') ? 0 : /enhanced/i.test(v.voiceURI || '') ? 1 : 2;

/** Installed Chinese voices, best first (Mandarin mainland, then Taiwan, then Cantonese). */
export function rankedVoices() {
  const rank = (v) => { const i = PREFERRED.findIndex((re) => re.test(v.name)); return i < 0 ? PREFERRED.length : i; };
  return chineseVoices().sort((a, b) => chineseRegion(a) - chineseRegion(b) || quality(a) - quality(b) || rank(a) - rank(b) || (b.localService ? 1 : 0) - (a.localService ? 1 : 0));
}

/** Every voice on the device that is not a Chinese voice, sorted by language then name. */
export function otherVoices() {
  return allVoices().filter((v) => !isChineseVoice(v)).sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
}

/** Find the saved voice. Accepts the voiceURI (current) or the name (saved by 1.0.1). */
function findSaved(want) {
  if (!want) return null;
  const voices = allVoices();
  return voices.find((v) => voiceId(v) === want) || voices.find((v) => v.name === want) || null;
}

function pickVoice() {
  voice = findSaved(settings.get('voice')) || rankedVoices()[0] || null;
  return voice;
}

window.addEventListener('ec:settings', (e) => { if (e.detail?.key === 'voice' || e.detail?.key == null) pickVoice(); });
if ('speechSynthesis' in window) {
  speechSynthesis.addEventListener?.('voiceschanged', () => {
    pickVoice();
    window.dispatchEvent(new CustomEvent('ec:voices'));
  });
}

export function initAudio() {
  if (!ready) {
    ready = waitForVoices().then(() => {
      pickVoice();
      window.dispatchEvent(new CustomEvent('ec:voices'));
      return canSpeak();
    });
  }
  return ready;
}

/* iOS will not play speech that was not started by a tap. Speaking one silent
   utterance on the first tap anywhere unlocks speech for the session, so
   autoplay in lessons and quizzes works afterwards. */
function unlock() {
  window.removeEventListener('pointerdown', unlock, true);
  window.removeEventListener('touchend', unlock, true);
  window.removeEventListener('keydown', unlock, true);
  if (!('speechSynthesis' in window) || speechSynthesis.speaking) return;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    u.lang = 'zh-CN';
    speechSynthesis.speak(u);
  } catch { /* ignore */ }
}
if ('speechSynthesis' in window) {
  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('touchend', unlock, true);
  window.addEventListener('keydown', unlock, true);
}

/** Can this device play Chinese audio? iOS always ships a Mandarin voice, even
    when the list has not been reported yet, so it is trusted to have one. */
export function canSpeak() {
  if (!('speechSynthesis' in window)) return false;
  if (!voice) pickVoice();
  return !!voice || isIOS();
}

/** Current voice (or null). */
export function currentVoice() { if (!voice) pickVoice(); return voice; }

const SLOT = /\[[^\]]+\]/g;

function reportError(code) {
  if (code === 'interrupted' || code === 'canceled') return;
  const now = Date.now();
  if (now - lastErrorToast < 4000) return;
  lastErrorToast = now;
  toast(`${t('voice_failed')} (${code || 'error'})${isIOS() ? ' ' + t('voice_silent_switch') : ''}`, { duration: 9000 });
}

/**
 * Speak Chinese text (characters). Returns a promise that resolves when playback ends.
 * [slot] markers are removed before speaking. Starts speaking synchronously, so it
 * must be called directly from the tap handler (no await before it).
 */
export function speak(text, { rate = null, interrupt = true, voice: useVoice = null } = {}) {
  if (!('speechSynthesis' in window)) return Promise.resolve(false);
  initAudio();
  const clean = String(text || '').replace(SLOT, '').trim();
  if (!clean) return Promise.resolve(false);
  if (!voice) pickVoice();
  const v = useVoice || voice;
  if (interrupt && (speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel();
  return new Promise((resolve) => {
    let u;
    try {
      u = new SpeechSynthesisUtterance(clean);
      u.lang = v?.lang || 'zh-CN';
      if (v) u.voice = v;
      const r = Number(rate ?? settings.get('audioRate'));
      u.rate = Number.isFinite(r) && r > 0 ? r : 1;
      u.onend = () => { if (current === u) current = null; resolve(true); };
      u.onerror = (e) => { if (current === u) current = null; reportError(e?.error); resolve(false); };
      current = u;
      if (speechSynthesis.paused) speechSynthesis.resume();
      speechSynthesis.speak(u);
    } catch (err) {
      reportError(err?.name || 'error');
      resolve(false);
    }
  });
}

export function stopSpeaking() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
