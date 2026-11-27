/* Browser and device capability detection, PWA install handling, connectivity. */

export const APP_VERSION = '1.0.2';

const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

export function isIOS() {
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
export function isAndroid() { return /Android/.test(ua); }
export function isSafari() { return /Safari/.test(ua) && !/Chrome|CriOS|Chromium|Edg/.test(ua); }
export function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
}
export function isTouch() { return navigator.maxTouchPoints > 0 || 'ontouchstart' in window; }

export function osName() {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  if (/Windows/.test(ua)) return 'windows';
  if (/Mac OS X|Macintosh/.test(ua)) return 'macos';
  if (/Linux/.test(ua)) return 'linux';
  return 'other';
}

/** Feature support map used by Speak and Settings to show honest capability notes. */
export function supports() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  return {
    indexedDB: typeof indexedDB !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator,
    dialog: typeof HTMLDialogElement !== 'undefined',
    speechSynthesis: 'speechSynthesis' in window,
    speechRecognition: !!SR,
    mediaRecorder: typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia,
    storageEstimate: !!navigator.storage?.estimate,
    fileSystemAccess: 'showSaveFilePicker' in window
  };
}

/** Every speechSynthesis voice on this device (may be empty until voices load). */
export function allVoices() {
  if (!('speechSynthesis' in window)) return [];
  try { return speechSynthesis.getVoices() || []; } catch { return []; }
}
/** Is this a Chinese voice (Mandarin, Taiwanese Mandarin or Cantonese)? */
export function isChineseVoice(v) { return /^(zh|cmn|yue)([-_]|$)/i.test(v?.lang || ''); }
/** 0 = Mandarin (mainland), 1 = Mandarin (Taiwan), 2 = other Chinese, 3 = Cantonese. */
export function chineseRegion(v) {
  const l = v?.lang || '';
  return /zh[-_]CN|cmn[-_]Hans|zh[-_]Hans|^cmn$|^zh$/i.test(l) ? 0 : /zh[-_]TW|zh[-_]Hant|cmn[-_]Hant/i.test(l) ? 1 : /zh[-_]HK|zh[-_]MO|yue/i.test(l) ? 3 : 2;
}
/** Chinese voices currently installed for speechSynthesis (may be empty until voices load). zh-CN first. */
export function chineseVoices() {
  return allVoices().filter(isChineseVoice).sort((a, b) => chineseRegion(a) - chineseRegion(b));
}
/** Stable id for a voice. iOS can list several voices with the same name
    (compact, enhanced, premium), so the voiceURI is preferred over the name. */
export function voiceId(v) { return v ? (v.voiceURI || v.name) : ''; }

/** Resolve once the voice list is populated. Chrome fills it asynchronously and
    fires voiceschanged; Safari, especially in a Home Screen web app, often fills
    it late without firing the event, so the list is also polled. */
export function waitForVoices(timeoutMs = 3000) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) { resolve([]); return; }
    const have = allVoices();
    if (have.length) { resolve(have); return; }
    let done = false;
    const finish = () => { if (done) return; done = true; clearInterval(poll); resolve(allVoices()); };
    speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    const poll = setInterval(() => { if (allVoices().length) finish(); }, 150);
    setTimeout(finish, timeoutMs);
  });
}

/* ---------- Install prompt ---------- */
let deferredPrompt = null;
const installListeners = new Set();
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installListeners.forEach((fn) => fn(true));
});
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installListeners.forEach((fn) => fn(false));
});
export function canPromptInstall() { return !!deferredPrompt; }
export function onInstallAvailable(fn) { installListeners.add(fn); return () => installListeners.delete(fn); }
export async function promptInstall() {
  if (!deferredPrompt) return 'unavailable';
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return choice?.outcome || 'dismissed';
}

/* ---------- Connectivity ---------- */
export function isOnline() { return navigator.onLine !== false; }
export function onConnectivity(fn) {
  const on = () => fn(true), off = () => fn(false);
  window.addEventListener('online', on);
  window.addEventListener('offline', off);
  fn(isOnline());
  return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
}
