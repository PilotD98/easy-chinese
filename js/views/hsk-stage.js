/* HSK level stage: the list of units (characters + vocabulary + grammar + reading), unlocked in order. */
import { h, append, icon, levelName } from '../ui/dom.js';
import { hskStatus } from '../content/hsk.js';
import { progress } from '../store/progress.js';
import { t, tr } from '../i18n/index.js';

export const title = 'nav_learn';

export async function render(el, ctx) {
  const levelId = ctx.levelId || 'hsk1';
  const { level: lv, passed, nextUnit, total, unlocked } = await hskStatus(levelId);
  const name = levelName(levelId);
  if (!unlocked) {
    append(el, [h('h1', null, name), h('div', { class: 'notice' }, icon('lock'), h('p', null, levelId === 'hsk1' ? t('unlock_hsk1_hint') : t('lock_prev_level'))), h('a', { class: 'btn', href: '#/learn' }, t('learning_path'))]);
    return;
  }
  const records = new Map(((await progress.all()) || []).map((r) => [r.id, r]));
  const learnedChars = lv.chars.filter((k) => records.has(k.id) && !records.get(k.id).known).length;
  const knownChars = lv.chars.filter((k) => records.get(k.id)?.known).length;
  const learnedVocab = lv.vocab.filter((v) => records.has(v.id) && !records.get(v.id).known).length;
  const knownVocab = lv.vocab.filter((v) => records.get(v.id)?.known).length;
  const mocks = await (await import('./mock.js')).examHistory(levelId);

  append(el, [
    h('header', { class: 'page-head' },
      h('h1', null, name),
      h('p', { class: 'lede' }, `${t('units_passed_of', { n: passed.size, total })} · ${t('chars_of', { n: learnedChars, total: lv.chars.length })}${knownChars ? ` (+${knownChars} ${t('known_lc')})` : ''} · ${t('words_of', { n: learnedVocab, total: lv.vocab.length })}${knownVocab ? ` (+${knownVocab} ${t('known_lc')})` : ''} · ${t('grammar_points_n', { n: lv.grammar.length })}`)),
    h('div', { class: 'bar', style: { marginBottom: '20px' }, role: 'progressbar', 'aria-valuenow': passed.size, 'aria-valuemax': total, 'aria-label': t('units_passed') }, h('span', { style: { width: `${(passed.size / total) * 100}%` } })),
    h('p', { class: 'small muted' }, t('hsk_stage_blurb')),
    h('section', { class: 'card' },
      h('ol', { class: 'path' }, lv.units.map((u) => {
        const isPassed = passed.has(u.id);
        const available = isPassed || u === nextUnit;
        const preview = u.chars.slice(0, 8).map((id) => lv.byId.get(id)?.char || '').join(' ');
        return h('li', null,
          h('span', { class: `step-no ${available ? 'is-available' : ''} ${isPassed ? 'is-passed' : ''}`, 'aria-hidden': 'true' }, isPassed ? icon('check') : String(u.no)),
          h('div', null,
            h('div', { class: 'step-title' }, tr(u, 'title')),
            h('div', { class: 'step-sub' }, h('span', { class: 'unit-chars', lang: 'zh-Hans' }, preview + (u.chars.length > 8 ? ' …' : '')), ` · ${t('unit_counts', { c: u.chars.length, w: u.vocab.length, g: u.grammar.length })}${u.readings?.length ? ` · ${t('reading_lc')}` : ''}${u.listening?.length ? ` · ${t('listening_lc')}` : ''}`)),
          available
            ? h('a', { class: `btn ${u === nextUnit ? 'btn-primary' : ''}`, href: `#/unit/${levelId}/${u.no}`, 'aria-label': `${isPassed ? t('revisit') : t('start')} ${t('unit_n', { n: u.no })}` }, isPassed ? t('revisit') : t('start'))
            : h('span', { class: 'icon lock', title: t('lock_prev_unit') }, icon('lock'))
        );
      }))),
    h('section', { class: `card ${passed.size >= Math.ceil(total / 2) ? 'card-accent' : ''}` },
      h('div', { class: 'card-title' }, h('h2', null, t('mock_hsk', { level: name })), mocks.length ? h('span', { class: 'pill' }, t('last_score', { total: mocks[mocks.length - 1].total, max: mocks[mocks.length - 1].max })) : null),
      h('p', { class: 'muted' }, t('mock_blurb')),
      h('a', { class: 'btn btn-primary', href: `#/mock/${levelId}` }, mocks.length ? t('take_again') : t('take_mock'))),
    h('section', { class: 'card' },
      h('h2', null, t('read_and_listen')),
      h('p', { class: 'muted' }, t('read_unlock_blurb')),
      h('a', { class: 'btn', href: '#/read' }, t('open_reading_library')))
  ]);
}
