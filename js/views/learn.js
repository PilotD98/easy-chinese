/* Learn: the stage path from Pinyin to HSK 6, plus sub-routes:
     #/learn/orientation   How Chinese works
     #/learn/pinyin        pinyin group list
     #/learn/hsk1          unit list of a level
     #/learn/item/<id>     item detail (from quick lookup)
   data/index.json is the source of truth; the meta store says what is unlocked. */
import { h, append, icon } from '../ui/dom.js';
import { getManifest } from '../content/loader.js';
import { isUnlocked, orientationDone, pinyinStatus } from '../content/pinyin-stage.js';
import { hskStatus } from '../content/hsk.js';
import { HSK_ORDER } from '../content/ids.js';
import { t, tr } from '../i18n/index.js';

export const title = 'nav_learn';

export async function render(el, ctx) {
  const sub = ctx.segs[1];
  if (sub === 'item') { const m = await import('./item.js'); return m.render(el, ctx.segs[2] || ''); }
  if (sub === 'orientation') { const m = await import('./orientation.js'); return m.render(el, ctx); }
  if (sub === 'pinyin') { const m = await import('./pinyin-stage.js'); return m.render(el, ctx); }
  if (HSK_ORDER.includes(sub || '')) { const m = await import('./hsk-stage.js'); return m.render(el, { ...ctx, levelId: sub }); }

  let manifest = null;
  try { manifest = await getManifest(); }
  catch (err) {
    append(el, [h('header', { class: 'page-head' }, h('h1', null, t('nav_learn'))),
      h('div', { class: 'notice notice-err' }, icon('info'), h('p', null, t('index_failed_long')))]);
    return;
  }
  const levelsById = Object.fromEntries((manifest.levels || []).map((l) => [l.id, l]));
  const oDone = await orientationDone();
  const py = await pinyinStatus().catch(() => null);
  const hsk = {};
  for (const id of HSK_ORDER) hsk[id] = (await isUnlocked(id)) ? await hskStatus(id).catch(() => null) : null;

  const items = [];
  for (const s of manifest.stages || []) {
    const level = s.level ? levelsById[s.level] : null;
    const hasContent = !!(level && level.files && Object.keys(level.files).length);
    const unlocked = hasContent && (s.id === 'realworld' || await isUnlocked(s.level));
    let status = '', href = null, subText = tr(s, 'summary'), done = false, primary = false;
    if (s.id === 'realworld') { status = t('open'); href = '#/guides'; }
    else if (!hasContent) status = t('not_in_build');
    else if (!unlocked) status = t('locked');
    else if (s.id === 'pinyin' && py) {
      href = '#/learn/pinyin';
      done = !!py.exam;
      status = py.exam ? t('passed') : py.passed.size || oDone ? t('continue') : t('start');
      primary = !done;
      subText = t('groups_passed_of', { n: py.passed.size, total: py.total }) + (py.exam ? ` · ${t('exam_pct', { pct: py.exam.score })}` : '');
    } else if (hsk[s.level]) {
      const st = hsk[s.level];
      href = `#/learn/${s.level}`;
      done = !st.nextUnit;
      status = done ? t('complete') : st.passed.size ? t('continue') : t('start');
      primary = !done;
      subText = t('units_passed_of', { n: st.passed.size, total: st.total });
    } else { href = `#/learn/${s.level}`; status = t('open'); }
    items.push(h('li', null,
      h('span', { class: `step-no ${href ? 'is-available' : ''} ${done ? 'is-passed' : ''}`, 'aria-hidden': 'true' }, done ? icon('check') : String(s.no)),
      h('div', null,
        h('div', { class: 'step-title' }, tr(s, 'title')),
        h('div', { class: 'step-sub' }, subText),
        level && level.targets ? h('div', { class: 'step-sub' }, targetsLine(level.targets)) : null),
      href ? h('a', { class: `btn ${primary ? 'btn-primary' : ''}`, href, 'aria-label': `${status} ${tr(s, 'title')}` }, status)
        : status === t('locked') ? h('span', { class: 'icon lock', title: t('lock_prev_stage') }, icon('lock'))
          : h('span', { class: 'pill' }, status)
    ));
  }

  append(el, [
    h('header', { class: 'page-head' },
      h('h1', null, t('learning_path')),
      h('p', { class: 'lede' }, t('learning_path_lede'))),
    h('section', { class: 'card' }, h('ol', { class: 'path' }, items)),
    tr(manifest, 'note') ? h('p', { class: 'small muted' }, tr(manifest, 'note')) : null
  ]);
}

function targetsLine(tg) {
  const parts = [];
  if (tg.hanzi) parts.push(t('target_chars', { n: tg.hanzi }));
  if (tg.vocab) parts.push(t('target_words', { n: tg.vocab.toLocaleString() }));
  if (tg.grammar) parts.push(t('target_grammar', { n: tg.grammar }));
  return parts.join(' · ');
}
