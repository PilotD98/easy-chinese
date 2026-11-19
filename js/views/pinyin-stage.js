/* Pinyin stage: the list of sound groups, each unlocked by passing the
   previous group's quiz, then the stage exam. */
import { h, append, icon } from '../ui/dom.js';
import { pinyinStatus, orientationDone } from '../content/pinyin-stage.js';
import { progress } from '../store/progress.js';
import { t, tr } from '../i18n/index.js';

export const title = 'stage_pinyin_short';

export async function render(el) {
  const { py, passed, exam, nextGroup, total } = await pinyinStatus();
  const records = new Map(((await progress.all()) || []).map((r) => [r.id, r]));
  const learned = py.allChars.filter((c) => records.has(c.id)).length;
  const oDone = await orientationDone();

  append(el, [
    h('header', { class: 'page-head' },
      h('h1', null, tr(py.data, 'title')),
      h('p', { class: 'lede' }, `${t('groups_passed_of', { n: passed.size, total })} · ${t('sounds_learned_of', { n: learned, total: py.allChars.length })}`)),
    h('div', { class: 'bar', style: { marginBottom: '20px' }, role: 'progressbar', 'aria-valuenow': passed.size, 'aria-valuemax': total, 'aria-label': t('groups_passed') }, h('span', { style: { width: `${(passed.size / total) * 100}%` } })),
    oDone ? null : h('section', { class: 'card card-accent' },
      h('div', { class: 'card-title' }, h('h2', null, t('orientation_title')), h('span', { class: 'pill' }, t('six_min'))),
      h('p', { class: 'muted' }, t('orientation_card_blurb')),
      h('a', { class: 'btn btn-primary', href: '#/learn/orientation' }, t('read_first'))),
    h('section', { class: 'card' },
      h('ol', { class: 'path' }, py.groups.map((g, i) => {
        const isPassed = passed.has(g.id);
        const available = isPassed || g === nextGroup;
        const preview = g.chars.slice(0, 6).map((c) => c.char).join('  ');
        return h('li', null,
          h('span', { class: `step-no ${available ? 'is-available' : ''} ${isPassed ? 'is-passed' : ''}`, 'aria-hidden': 'true' }, isPassed ? icon('check') : String(i + 1)),
          h('div', null,
            h('div', { class: 'step-title' }, tr(g, 'title')),
            h('div', { class: 'step-sub' }, h('span', { class: 'py-preview' }, preview + (g.chars.length > 6 ? ' …' : '')), ` · ${t('sounds_and_words', { s: g.chars.length, w: (g.words || []).length })}`)
          ),
          available
            ? h('a', { class: `btn ${g === nextGroup ? 'btn-primary' : ''}`, href: `#/lesson/${g.id}`, 'aria-label': `${isPassed ? t('revisit') : t('start')} ${tr(g, 'title')}` }, isPassed ? t('revisit') : t('start'))
            : h('span', { class: 'icon lock', title: t('lock_prev_group') }, icon('lock'))
        );
      }))
    ),
    h('section', { class: `card ${nextGroup ? '' : 'card-accent'}` },
      h('div', { class: 'card-title' }, h('h2', null, t('pinyin_exam')), exam ? h('span', { class: 'pill' }, t('passed_pct', { pct: exam.score })) : null),
      h('p', { class: 'muted' }, t('pinyin_exam_blurb', { n: py.data.exam.questions, pct: py.data.exam.passPercent })),
      nextGroup
        ? h('p', { class: 'small muted' }, t('unlocks_after_groups', { n: total }))
        : h('a', { class: 'btn btn-primary btn-lg', href: '#/exam/pinyin' }, exam ? t('take_again') : t('take_exam'))
    )
  ]);
}
