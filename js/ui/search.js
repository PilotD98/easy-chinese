/* Global quick lookup: searches every sound, character, word and grammar point
   in the loaded curriculum. Opens with the search button or the "/" key. */
import { h, zh, levelName } from './dom.js';
import { openSheet } from './dialog.js';
import { searchContent, availableLevels } from '../content/loader.js';
import { t } from '../i18n/index.js';

let open = false;

export function openSearch() {
  if (open) return;
  open = true;
  const input = h('input', {
    class: 'search-input', type: 'search', placeholder: t('search_placeholder'),
    'aria-label': t('search_label'), autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'search'
  });
  const list = h('ul', { class: 'search-results', role: 'listbox', 'aria-label': t('results') });
  const status = h('div', { class: 'search-empty', role: 'status' });
  const body = h('div', null, input, status, list);
  const sheet = openSheet({ title: t('quick_lookup'), body, onClose: () => { open = false; } });

  let timer = null, seq = 0;
  availableLevels().then((levels) => { status.textContent = levels.length ? t('type_to_search') : t('no_content_yet'); })
    .catch(() => { status.textContent = t('index_failed'); });

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const mine = ++seq;
      const q = input.value.trim();
      if (!q) { list.replaceChildren(); return; }
      const results = await searchContent(q).catch(() => []);
      if (mine !== seq) return;
      list.replaceChildren(...results.map((r) =>
        h('li', { role: 'option' }, h('a', { href: `#/learn/item/${encodeURIComponent(r.id)}`, onClick: () => sheet.close() },
          zh(r.zh, 'r-zh'),
          h('span', null, h('div', null, r.meaning || ''), h('div', { class: 'r-meta' }, [r.reading, t(`type_${r.type}`), levelName(r.level)].filter(Boolean).join(' · ')))
        ))
      ));
      status.textContent = results.length ? t('n_results', { n: results.length }) : t('no_matches');
    }, 120);
  });
  setTimeout(() => input.focus(), 30);
}
