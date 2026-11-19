/* Easy Chinese service worker.
   Strategy:
   - App shell (HTML, CSS, JS, icons): precached on install, served cache-first.
     Bump VERSION whenever shell files change so clients pick up the new build.
   - Curriculum data (data/*.json): stale-while-revalidate in a stable cache, so
     content updates arrive on the next visit without a shell version bump.
     Pinyin and HSK 1 data are stored at install; the other levels (about 8 MB
     with stroke data) are stored when first opened or all at once from Settings.
   - Fonts (Google Fonts): stale-while-revalidate. Offline before first use, the
     CSS falls back to system Chinese fonts.
   Nothing here talks to any other origin. */

const VERSION = '0.1.0';
const SHELL_CACHE = `ec-shell-${VERSION}`;
const DATA_CACHE = 'ec-data';
const FONT_CACHE = 'ec-fonts';
const KEEP = new Set([SHELL_CACHE, DATA_CACHE, FONT_CACHE]);
const DEV = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

const CORE_DATA = [
  './data/index.json',
  './data/orientation.json',
  './data/pinyin.json',
  './data/speaking.json',
  './data/situations.json',
  './data/guides.json',
  './data/strokes/hsk1.json',
  './data/hsk1/chars.json',
  './data/hsk1/vocab.json',
  './data/hsk1/grammar.json',
  './data/hsk1/readings.json',
  './data/hsk1/listening.json',
  './data/hsk1/units.json'
];

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/tokens.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/lesson.css',
  './css/speak.css',
  './css/hsk.css',
  './js/app.js',
  './js/router.js',
  './js/i18n/index.js',
  './js/i18n/en.js',
  './js/i18n/ja.js',
  './js/store/db.js',
  './js/store/profiles.js',
  './js/store/settings.js',
  './js/store/progress.js',
  './js/store/days.js',
  './js/store/backup.js',
  './js/ui/dom.js',
  './js/ui/toast.js',
  './js/ui/dialog.js',
  './js/ui/search.js',
  './js/ui/shortcuts.js',
  './js/ui/audio.js',
  './js/ui/stroke.js',
  './js/ui/tracepad.js',
  './js/ui/zhtext.js',
  './js/ui/tone.js',
  './js/ui/quiz.js',
  './js/ui/quiz-hsk.js',
  './js/ui/exam-hsk.js',
  './js/ui/recognizer.js',
  './js/ui/recorder.js',
  './js/engine/fsrs.js',
  './js/engine/scheduler.js',
  './js/engine/scaffold.js',
  './js/engine/pinyin.js',
  './js/engine/syllables.js',
  './js/engine/reading.js',
  './js/engine/known.js',
  './js/engine/placement.js',
  './js/content/ids.js',
  './js/content/loader.js',
  './js/content/pinyin-stage.js',
  './js/content/hsk.js',
  './js/content/speaking.js',
  './js/util/platform.js',
  './js/views/home.js',
  './js/views/learn.js',
  './js/views/review.js',
  './js/views/speak.js',
  './js/views/speak-session.js',
  './js/views/read.js',
  './js/views/reading.js',
  './js/views/progress.js',
  './js/views/settings.js',
  './js/views/about.js',
  './js/views/notfound.js',
  './js/views/orientation.js',
  './js/views/pinyin-stage.js',
  './js/views/lesson.js',
  './js/views/exam.js',
  './js/views/item.js',
  './js/views/hsk-stage.js',
  './js/views/unit.js',
  './js/views/placement.js',
  './js/views/mock.js',
  './js/views/guides.js',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(SHELL);
    const data = await caches.open(DATA_CACHE);
    await Promise.all(CORE_DATA.map(async (path) => {
      if (await data.match(path)) return;
      try { const res = await fetch(path); if (res.ok) await data.put(path, res); } catch { /* fetched on demand later */ }
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => !KEEP.has(n)).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(DEV ? networkFirst(req, SHELL_CACHE, './index.html') : cacheFirst(req, SHELL_CACHE, './index.html'));
    return;
  }

  if (url.origin === self.location.origin) {
    if (url.pathname.includes('/data/')) {
      event.respondWith(staleWhileRevalidate(req, DATA_CACHE));
    } else if (DEV) {
      event.respondWith(networkFirst(req, SHELL_CACHE));
    } else {
      event.respondWith(cacheFirst(req, SHELL_CACHE));
    }
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
  }
});

async function cacheFirst(req, cacheName, fallbackKey) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    if (fallbackKey) { const fb = await cache.match(fallbackKey); if (fb) return fb; }
    return new Response('Offline and not cached.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

async function networkFirst(req, cacheName, fallbackKey) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true }) || (fallbackKey && await cache.match(fallbackKey));
    return hit || new Response('Offline and not cached.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  const refresh = fetch(req).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  if (hit) return hit;
  const res = await refresh;
  return res || new Response('Offline and not cached.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
}
