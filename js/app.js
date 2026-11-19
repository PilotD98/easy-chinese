/* App entry point: load settings and the interface language, start the router,
   register the service worker, wire global UI (offline badge, quick lookup,
   keyboard shortcuts). */
import { settings, savedLanguage } from './store/settings.js';
import { setLanguage, t } from './i18n/index.js';
import { startRouter } from './router.js';
import { toast } from './ui/toast.js';
import { openSearch } from './ui/search.js';
import { showShortcuts } from './ui/shortcuts.js';
import { onConnectivity } from './util/platform.js';

async function boot() {
  await setLanguage(savedLanguage());
  try { await settings.load(); }
  catch (err) { console.error('Settings failed to load; using defaults.', err); settings.apply(); }
  if (settings.get('language') !== document.documentElement.lang) await setLanguage(settings.get('language'));
  applyChrome();
  window.addEventListener('ec:language', applyChrome);

  await startRouter(document.getElementById('view'));

  const badge = document.getElementById('offline-badge');
  onConnectivity((online) => { badge.hidden = online; });

  document.getElementById('search-btn').addEventListener('click', openSearch);
  document.addEventListener('keydown', onGlobalKey);

  registerServiceWorker();
}

/** Translate the static shell (nav labels, buttons) outside the view. */
function applyChrome() {
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-label]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); if (el.title) el.title = t(el.dataset.i18nLabel); });
}

function onGlobalKey(e) {
  const el = e.target;
  const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
  if (document.querySelector('dialog[open]')) return;
  if (!typing && e.key === '/') { e.preventDefault(); openSearch(); }
  else if (!typing && e.key === '?') { e.preventDefault(); showShortcuts(); }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!(location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) return;
  const register = async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      const offerUpdate = (worker) => {
        toast(t('update_ready'), { sticky: true, action: { label: t('reload'), onClick: () => worker.postMessage({ type: 'SKIP_WAITING' }) } });
      };
      if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) offerUpdate(nw); });
      });
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (refreshing) return; refreshing = true; location.reload(); });
    } catch (err) {
      console.warn('Service worker registration failed', err);
    }
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}

boot();
