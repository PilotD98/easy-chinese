/* One Pinyin-stage group lesson: intro → sound cards (contour or mouth hint,
   sample audio, mnemonic) → words → quiz → result. Route: #/lesson/<groupId> */
import { h, append, icon, zh } from '../ui/dom.js';
import { loadPinyin, markGroupPassed } from '../content/pinyin-stage.js';
import { speak, canSpeak, initAudio, stopSpeaking } from '../ui/audio.js';
import { zhRuby } from '../ui/zhtext.js';
import { toneDiagram } from '../ui/tone.js';
import { pinyinQuiz, runQuiz } from '../ui/quiz.js';
import { learnItems } from '../engine/scheduler.js';
import { days } from '../store/days.js';
import { settings } from '../store/settings.js';
import { toast } from '../ui/toast.js';
import { t, tr, meaningOf } from '../i18n/index.js';

export const title = 'lesson';

export async function render(el, ctx) {
  const groupId = ctx.segs[1];
  const py = await loadPinyin();
  const group = py.groups.find((g) => g.id === groupId);
  if (!group) {
    append(el, [h('h1', null, t('lesson_not_found')), h('a', { class: 'btn', href: '#/learn/pinyin' }, t('back'))]);
    return;
  }
  await initAudio();
  const startedAt = Date.now();
  let logged = false;
  const logTime = async () => { if (logged) return; logged = true; await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) }); };

  const prevUnits = py.groups.filter((g) => g.index < group.index).flatMap((g) => g.chars);
  const prevWords = py.groups.filter((g) => g.index < group.index).flatMap((g) => g.words || []);
  const words = group.words || [];

  const steps = ['intro', ...group.chars.map((_, i) => ['char', i]), ...(words.length ? ['words'] : []), 'quiz'];
  let stepIdx = 0;
  const stage = h('div', { class: 'lesson' });
  const progressBar = h('div', { class: 'bar', role: 'progressbar', 'aria-label': t('lesson_progress') }, h('span', { style: { width: '0%' } }));
  append(el, [
    h('header', { class: 'page-head row', style: { justifyContent: 'space-between' } },
      h('div', null, h('h1', null, tr(group, 'title')), h('p', { class: 'lede' }, `${tr(py.data, 'title')} · ${t('group_n_of', { n: group.index + 1, total: py.groups.length })}`)),
      h('a', { class: 'btn', href: '#/learn/pinyin', onClick: () => { stopSpeaking(); logTime(); } }, t('exit'))),
    progressBar,
    stage
  ]);

  const show = () => {
    stopSpeaking();
    progressBar.firstChild.style.width = `${(stepIdx / steps.length) * 100}%`;
    const step = steps[stepIdx];
    stage.replaceChildren();
    if (step === 'intro') stage.append(introCard());
    else if (step[0] === 'char') stage.append(soundCard(group.chars[step[1]]));
    else if (step === 'words') stage.append(wordsCard());
    else if (step === 'quiz') runLessonQuiz();
    stage.querySelector('h2')?.focus?.();
    window.scrollTo(0, 0);
  };
  const nextBtn = (label = t('continue')) => h('button', { class: 'btn btn-primary btn-lg btn-block', type: 'button', onClick: () => { stepIdx += 1; show(); } }, label);
  const onKey = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && !document.querySelector('dialog[open]')) {
      const b = stage.querySelector('.lesson-next'); if (b) { e.preventDefault(); b.click(); }
    }
  };
  document.addEventListener('keydown', onKey);

  function introCard() {
    return h('section', { class: 'card' },
      h('h2', { tabindex: '-1' }, t('in_this_group')),
      tr(group, 'intro') ? h('p', null, tr(group, 'intro')) : null,
      h('div', { class: 'char-grid' }, group.chars.map((c) => h('div', { class: 'char-chip' }, h('span', { class: 'py-big' }, c.char), h('span', { class: 'small muted' }, tr(c, 'label'))))),
      h('p', { class: 'muted' }, t('group_intro_blurb', { n: words.length })),
      wrapNext(nextBtn(t('begin')))
    );
  }

  function soundCard(c) {
    const s = c.sample || {};
    const audioBtn = canSpeak() && s.zh ? h('button', { class: 'btn', type: 'button', onClick: () => speak(s.zh) }, icon('speak'), t('listen')) : null;
    const slowBtn = canSpeak() && s.zh ? h('button', { class: 'btn', type: 'button', onClick: () => speak(s.zh, { rate: 0.7 }) }, icon('speak'), t('slow')) : null;
    if (canSpeak() && s.zh && settings.get('autoplayAudio')) setTimeout(() => speak(s.zh), 400);
    const isTone = group.kind === 'tones' || group.kind === 'pairs' || group.kind === 'sandhi';
    return h('section', { class: 'card char-card' },
      h('div', { class: 'char-head' },
        h('div', null, h('div', { class: 'py-huge' }, c.char), h('div', { class: 'char-romaji' }, tr(c, 'label'))),
        s.zh ? h('div', { class: 'sample' }, zh(s.zh, 'zh-xl'), h('div', { class: 'small muted' }, `${s.pinyin} · ${tr(s, 'en', 'ja')}`)) : null
      ),
      s.pinyin && (isTone || group.kind !== 'initials') ? h('div', { class: 'row', style: { marginTop: '8px' } }, toneDiagram(s.pinyin)) : null,
      h('div', { class: 'btn-row', style: { marginTop: '8px' } }, audioBtn, slowBtn),
      h('p', { class: 'hint-box' }, h('strong', null, t('how_to_say'), ' '), tr(c, 'hint')),
      c.rule ? h('div', { class: 'notice' }, icon('info'), h('p', null, tr(c, 'rule'))) : null,
      tr(c, 'mnemonic') ? h('p', { class: 'mnemonic' }, h('strong', null, t('remember'), ' '), tr(c, 'mnemonic')) : null,
      wrapNext(nextBtn())
    );
  }

  function wordsCard() {
    const list = h('ul', { class: 'word-list' }, words.map((w) => h('li', null,
      zhRuby(w.zh, w.pinyin, { cls: 'word-zh' }),
      h('span', { class: 'word-meaning grow' }, meaningOf(w)),
      canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen_to', { x: w.pinyin }), onClick: () => speak(w.zh) }, icon('speak')) : null
    )));
    return h('section', { class: 'card' },
      h('h2', { tabindex: '-1' }, t('words_you_can_say')),
      h('p', { class: 'muted' }, t('words_card_blurb')),
      list,
      tr(group, 'note') ? h('div', { class: 'notice' }, icon('info'), h('p', null, tr(group, 'note'))) : null,
      wrapNext(nextBtn(t('start_quiz')))
    );
  }

  async function runLessonQuiz() {
    const n = py.data.quiz.questions;
    const questions = pinyinQuiz(group.chars, words, { n, pool: [...prevUnits, ...group.chars].filter((u) => u.group === group.id || group.kind === 'tones' ? u.group === group.id : true), wordPool: [...prevWords, ...words] });
    const area = h('section', { class: 'card' });
    stage.append(area);
    const res = await runQuiz(area, questions, { title: t('group_check', { g: tr(group, 'title') }) });
    const pct = Math.round((res.correct / res.total) * 100);
    const ok = pct >= py.data.quiz.passPercent;
    progressBar.firstChild.style.width = '100%';
    if (ok) {
      const added = await learnItems([...group.chars.map((c) => ({ id: c.id, type: 'sound' })), ...words.map((w) => ({ id: w.id, type: 'vocab' }))]);
      await markGroupPassed(group.id);
      if (added) toast(t('added_to_reviews', { n: added }));
    }
    await logTime();
    const missedIds = [...new Set(res.missed)];
    const missedItems = missedIds.map((id) => py.charsById.get(id) || py.wordsById.get(id)).filter(Boolean);
    const next = py.groups[group.index + 1];
    area.replaceChildren();
    append(area, [
      h('h2', { tabindex: '-1' }, ok ? t('passed') : t('not_yet')),
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${pct}%`), h('div', { class: 'stat-label' }, t('n_of_total_correct', { n: res.correct, total: res.total }))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(missedIds.length)), h('div', { class: 'stat-label' }, t('to_look_at_again')))),
      missedItems.length ? h('div', { style: { marginTop: '12px' } }, h('strong', null, t('missed_colon'), ' '), missedItems.map((it) => h('span', { class: 'pill' }, it.char || it.zh, ' ', it.pinyin || tr(it, 'label')))) : null,
      h('p', { class: 'muted', style: { marginTop: '12px' } }, ok ? t('group_passed_blurb', { s: group.chars.length, w: words.length }) : t('need_pct_to_pass', { pct: py.data.quiz.passPercent })),
      h('div', { class: 'btn-row', style: { marginTop: '16px' } },
        ok && next ? h('a', { class: 'btn btn-primary btn-lg', href: `#/lesson/${next.id}` }, t('next_colon', { x: tr(next, 'title') })) : null,
        ok && !next ? h('a', { class: 'btn btn-primary btn-lg', href: '#/exam/pinyin' }, t('take_exam')) : null,
        !ok ? h('button', { class: 'btn btn-primary btn-lg', type: 'button', onClick: () => { stepIdx = 1; logged = false; show(); } }, t('review_the_sounds')) : null,
        !ok ? h('button', { class: 'btn', type: 'button', onClick: () => { stepIdx = steps.length - 1; logged = false; show(); } }, t('retry_quiz')) : null,
        h('a', { class: 'btn', href: '#/learn/pinyin' }, t('back_to_list'))
      )
    ]);
  }

  function wrapNext(btn) { btn.classList.add('lesson-next'); return h('div', { class: 'lesson-foot' }, btn); }

  show();
  return () => { document.removeEventListener('keydown', onKey); stopSpeaking(); logTime(); };
}
