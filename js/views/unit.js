/* One HSK unit: character cards → vocabulary → grammar (with exercises) → reading → quiz.
   Items marked "already know this" are skipped and left out of the quiz.
   Route: #/unit/hsk1/<no> */
import { h, append, icon, zh, levelName } from '../ui/dom.js';
import { loadHsk, markUnitPassed, unitItems, recordsFor } from '../content/hsk.js';
import { strokeDiagram } from '../ui/stroke.js';
import { tracePad } from '../ui/tracepad.js';
import { speak, canSpeak, initAudio, stopSpeaking } from '../ui/audio.js';
import { vocabWord, sentence, markupText, withTrad } from '../ui/zhtext.js';
import { runQuiz } from '../ui/quiz.js';
import { unitQuiz, qGrammar } from '../ui/quiz-hsk.js';
import { learnItems } from '../engine/scheduler.js';
import { markKnown, unmarkKnown } from '../engine/known.js';
import { days } from '../store/days.js';
import { settings } from '../store/settings.js';
import { isTouch } from '../util/platform.js';
import { toast } from '../ui/toast.js';
import { confirm } from '../ui/dialog.js';
import { t, tr, meaningOf, meaningsOf, isJa } from '../i18n/index.js';

export const title = 'unit';
const VOCAB_PAGE = 10;

export async function render(el, ctx) {
  const levelId = ctx.segs[1] || 'hsk1';
  const no = Number(ctx.segs[2]);
  const lv = await loadHsk(levelId);
  const unit = lv.units.find((u) => u.no === no);
  if (!unit) { append(el, [h('h1', null, t('unit_not_found')), h('a', { class: 'btn', href: `#/learn/${levelId}` }, t('back'))]); return; }
  await initAudio();
  let records = await recordsFor(lv);
  const startedAt = Date.now();
  let logged = false;
  const logTime = async () => { if (logged) return; logged = true; await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) }); };

  const chars = unit.chars.map((id) => lv.byId.get(id)).filter(Boolean);
  const vocab = unit.vocab.map((id) => lv.byId.get(id)).filter(Boolean);
  const grammar = unit.grammar.map((id) => lv.byId.get(id)).filter(Boolean);
  const readings = (unit.readings || []).map((id) => lv.byId.get(id)).filter(Boolean);
  const isKnown = (id) => !!records.get(id)?.known;

  let steps = [];
  let stepIdx = 0;
  const buildSteps = () => {
    const kn = chars.filter((k) => !isKnown(k.id));
    const vn = vocab.filter((v) => !isKnown(v.id));
    steps = ['intro', ...kn.map((k) => ['hanzi', k]), ...chunk(vn, VOCAB_PAGE).map((c, i) => ['vocab', c, i, vn.length]), ...grammar.map((g) => ['grammar', g]), ...(readings.length ? [['reading', readings[0]]] : []), 'quiz'];
  };
  buildSteps();
  const stage = h('div', { class: 'lesson' });
  const bar = h('div', { class: 'bar', role: 'progressbar', 'aria-label': t('unit_progress') }, h('span', { style: { width: '0%' } }));
  const counter = h('span', { class: 'small muted' });
  append(el, [
    h('header', { class: 'page-head row', style: { justifyContent: 'space-between' } },
      h('div', null, h('h1', null, `${t('unit_n', { n: unit.no })}: ${tr(unit, 'title')}`), h('p', { class: 'lede' }, `${levelName(levelId)} · ${t('unit_counts', { c: chars.length, w: vocab.length, g: grammar.length })}`)),
      h('a', { class: 'btn', href: `#/learn/${levelId}`, onClick: () => { stopSpeaking(); logTime(); } }, t('exit'))),
    h('div', { class: 'row', style: { justifyContent: 'flex-end' } }, counter),
    bar, stage
  ]);

  const show = () => {
    stopSpeaking();
    if (stepIdx >= steps.length) stepIdx = steps.length - 1;
    bar.firstChild.style.width = `${(stepIdx / steps.length) * 100}%`;
    counter.textContent = `${stepIdx + 1} / ${steps.length}`;
    const step = steps[stepIdx];
    stage.replaceChildren();
    if (step === 'intro') stage.append(introCard());
    else if (step[0] === 'hanzi') stage.append(charCard(step[1]));
    else if (step[0] === 'vocab') stage.append(vocabCard(step[1], step[2], step[3]));
    else if (step[0] === 'grammar') stage.append(grammarCard(step[1]));
    else if (step[0] === 'reading') stage.append(readingCard(step[1]));
    else if (step === 'quiz') runUnitQuiz();
    window.scrollTo(0, 0);
  };
  const nextBtn = (label = t('continue')) => h('div', { class: 'lesson-foot' }, h('button', { class: 'btn btn-primary btn-lg btn-block lesson-next', type: 'button', onClick: () => { stepIdx += 1; show(); } }, label));
  const onKey = (e) => { if (e.key === 'Enter' && !['INPUT', 'BUTTON'].includes(e.target.tagName) && !document.querySelector('dialog[open]')) { const b = stage.querySelector('.lesson-next'); if (b) { e.preventDefault(); b.click(); } } };
  document.addEventListener('keydown', onKey);

  /* ---------- known marks ---------- */
  async function toggleKnown(item, type, btn) {
    if (isKnown(item.id)) {
      await unmarkKnown(item.id);
      toast(t('known_removed', { zh: item.char || item.zh }));
    } else {
      await markKnown([{ id: item.id, type }]);
      toast(t('known_marked', { zh: item.char || item.zh }));
    }
    records = await recordsFor(lv);
    const wasStep = steps[stepIdx];
    buildSteps();
    // keep the position: if the current card was just marked known it is gone; move to the next one
    const idx = steps.findIndex((s) => s === wasStep || (Array.isArray(s) && Array.isArray(wasStep) && s[0] === wasStep[0] && s[1] === wasStep[1]));
    if (idx >= 0) stepIdx = idx; else if (Array.isArray(wasStep)) { stepIdx = Math.min(stepIdx, steps.length - 1); show(); return; }
    if (btn) knownButton(item, type, btn);
    if (wasStep === 'intro') show();
  }
  function knownButton(item, type, existing = null) {
    const known = isKnown(item.id);
    const b = existing || h('button', { class: 'btn btn-sm known-btn', type: 'button' });
    b.className = `btn btn-sm known-btn ${known ? 'is-known' : ''}`;
    b.replaceChildren(icon(known ? 'check' : 'plus'), h('span', null, known ? t('known_undo') : t('already_know')));
    b.setAttribute('aria-pressed', String(known));
    if (!existing) b.addEventListener('click', () => toggleKnown(item, type, b));
    return b;
  }
  const knownBadge = () => h('span', { class: 'pill pill-known' }, t('known_badge'));

  async function markAllKnown() {
    const ok = await confirm({ title: t('mark_all_known_q'), body: t('mark_all_known_body', { c: chars.length, w: vocab.length }), confirmLabel: t('mark_all_known') });
    if (!ok) return;
    const n = await markKnown([...chars.map((k) => ({ id: k.id, type: 'hanzi' })), ...vocab.map((v) => ({ id: v.id, type: 'vocab' }))]);
    records = await recordsFor(lv);
    buildSteps();
    toast(t('n_marked_known', { n }));
    show();
  }

  /* ---------- cards ---------- */
  function introCard() {
    const knownCount = chars.filter((k) => isKnown(k.id)).length + vocab.filter((v) => isKnown(v.id)).length;
    return h('section', { class: 'card' },
      h('h2', null, t('in_this_unit')),
      h('div', { class: 'char-grid' }, chars.map((k) => h('div', { class: `char-chip ${isKnown(k.id) ? 'is-known' : ''}` }, zh(k.char, 'zh-xl'), h('span', { class: 'small muted' }, meaningOf(k)), isKnown(k.id) ? knownBadge() : null))),
      h('p', { class: 'muted' }, t('unit_intro_blurb', { w: vocab.length, g: grammar.length, titles: grammar.map((g) => tr(g, 'title')).join('; ') }) + (readings.length ? ' ' + t('unit_intro_reading') : '')),
      h('details', { class: 'known-details', open: knownCount ? true : null },
        h('summary', null, t('already_know_some_q', { n: knownCount })),
        h('p', { class: 'small muted' }, t('known_explain')),
        h('ul', { class: 'known-list' },
          chars.map((k) => h('li', { class: 'row' }, zh(k.char, 'zh-lg'), h('span', { class: 'grow small muted' }, `${k.pinyin.join(', ')} · ${meaningOf(k)}`), knownButton(k, 'hanzi'))),
          vocab.map((v) => h('li', { class: 'row' }, zh(withTrad(v.zh, v.trad), 'zh-lg'), h('span', { class: 'grow small muted' }, `${v.pinyin} · ${meaningOf(v)}`), knownButton(v, 'vocab')))),
        h('div', { class: 'btn-row' }, h('button', { class: 'btn', type: 'button', onClick: markAllKnown }, icon('check'), t('mark_all_known')))),
      h('p', { class: 'small muted' }, t('pinyin_fade_note')),
      nextBtn(t('begin')));
  }

  function charCard(k) {
    const data = lv.strokes[k.char];
    const diagram = data ? strokeDiagram(data, { size: 180, label: k.char }) : null;
    const examples = k.examples.map((id) => lv.allById.get(id)).filter(Boolean);
    if (canSpeak() && settings.get('autoplayAudio')) setTimeout(() => speak(k.char), 400);
    const tradLine = settings.get('traditional') && k.trad && k.trad !== k.char ? h('div', { class: 'small muted' }, t('traditional_colon'), ' ', h('span', { lang: 'zh-Hant' }, k.trad)) : null;
    return h('section', { class: 'card' },
      h('div', { class: 'kanji-head' },
        h('div', { class: 'kanji-big', lang: 'zh-Hans' }, k.char),
        h('div', null,
          h('div', { class: 'kanji-meanings' }, meaningsOf(k, ', ')),
          h('dl', { class: 'kanji-readings' },
            h('dt', null, t('pinyin')), h('dd', null, k.pinyin.join(' · ')),
            h('dt', null, `${t('strokes_n', { n: k.strokes })}${k.radical ? ` · ${t('radical')}` : ''}`), h('dd', { class: 'components' }, k.radical ? h('span', { class: 'pill', lang: 'zh-Hans' }, k.radical) : null, (k.components || []).filter((c) => c !== k.radical).map((r) => h('span', { class: 'pill pill-soft', lang: 'zh-Hans' }, r))),
            tradLine ? h('dt', null, '') : null, tradLine ? h('dd', null, tradLine) : null))),
      h('div', { class: 'row', style: { alignItems: 'flex-start', marginTop: '12px' } }, diagram ? diagram.el : null, h('div', { class: 'btn-row' }, diagram ? h('button', { class: 'btn', type: 'button', onClick: () => diagram.play() }, t('replay_strokes')) : null, canSpeak() ? h('button', { class: 'btn', type: 'button', onClick: () => speak(k.char) }, icon('speak'), t('listen')) : null, knownButton(k, 'hanzi'))),
      tr(k, 'mnemonic') ? h('p', { class: 'mnemonic' }, h('strong', null, t('remember'), ' '), tr(k, 'mnemonic')) : null,
      k.hint && !isJa() ? h('p', { class: 'small muted' }, h('strong', null, t('origin'), ' '), k.hint) : null,
      examples.length ? h('h3', null, t('words_with'), ' ', zh(k.char)) : null,
      examples.length ? h('ul', { class: 'vocab-list' }, examples.map((v) => h('li', null, vocabWord(v, records.get(v.id), { cls: 'vw' }), h('div', { class: 'vm' }, meaningOf(v), h('small', null, v.pinyin)), canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen_to', { x: v.pinyin }), onClick: () => speak(v.zh) }, icon('speak')) : null))) : null,
      data ? traceSection(data) : null,
      nextBtn());
  }

  function traceSection(data) {
    const details = h('details', { class: 'trace-details', open: isTouch() ? true : null });
    details.append(h('summary', null, t('trace_it')));
    let built = false;
    const build = () => { if (built) return; built = true; details.append(tracePad(data, { size: Math.min(280, window.innerWidth - 72) }).el); };
    if (details.open) build(); else details.addEventListener('toggle', build, { once: true });
    return details;
  }

  function vocabCard(words, page, total) {
    return h('section', { class: 'card' },
      h('h2', null, t('vocab_range', { a: page * VOCAB_PAGE + 1, b: page * VOCAB_PAGE + words.length, total })),
      h('ul', { class: 'vocab-list' }, words.map((v) => h('li', null,
        vocabWord(v, records.get(v.id), { cls: 'vw' }),
        h('div', { class: 'vm' }, meaningsOf(v), h('small', null, `${v.pinyin}${v.pos?.length ? ' · ' + posLabel(v.pos[0]) : ''}`), isJa() && v.note_ja ? h('div', { class: 'note-ja' }, h('strong', null, '注意：'), v.note_ja) : null),
        h('div', { class: 'vocab-actions' }, canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen_to', { x: v.pinyin }), onClick: () => speak(v.zh) }, icon('speak')) : null, knownButton(v, 'vocab'))))),
      h('p', { class: 'small muted' }, t('vocab_card_blurb')),
      nextBtn());
  }

  function grammarCard(g) {
    const exArea = h('div');
    const card = h('section', { class: 'card' },
      h('h2', null, tr(g, 'title')),
      h('div', { class: 'gram-pattern', lang: 'zh-Hans' }, g.pattern),
      h('p', null, tr(g, 'explanation')),
      h('h3', null, t('examples')),
      h('div', null, g.examples.map((ex) => h('div', { class: 'gram-example' },
        h('div', { class: 'row' }, sentence(ex.zh, { pinyin: ex.pinyin, records, lv, cls: 'ex-zh' }), canSpeak() ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('listen'), onClick: () => speak(ex.zh) }, icon('speak')) : null),
        h('div', { class: 'ex-meta' }, ex.pinyin, ' · ', tr(ex, 'en', 'ja'))))),
      tr(g, 'mistakes')?.length ? h('div', null, h('h3', null, t('common_mistakes')), h('ul', { class: 'gram-mistakes' }, tr(g, 'mistakes').map((m) => h('li', null, m)))) : null,
      h('h3', null, t('try_it')),
      exArea,
      nextBtn());
    runQuiz(exArea, g.exercises.map((x) => qGrammar(g, x)), { title: t('practice') }).then((res) => {
      exArea.append(h('p', { class: 'small muted' }, t('n_of_total_correct', { n: res.correct, total: res.total })));
    });
    return card;
  }

  function readingCard(r) {
    return h('section', { class: 'card' },
      h('h2', null, `${t('reading_colon')} ${r.title}`),
      h('p', { class: 'muted' }, t('reading_card_blurb')),
      h('a', { class: 'btn btn-primary', href: `#/read/${levelId}/${encodeURIComponent(r.id)}` }, t('open_passage')),
      h('p', { class: 'small muted', style: { marginTop: '12px' } }, t('come_back_for_quiz')),
      nextBtn(t('go_to_quiz')));
  }

  async function runUnitQuiz() {
    const area = h('section', { class: 'card' });
    stage.append(area);
    const exclude = new Set([...chars, ...vocab].filter((x) => isKnown(x.id)).map((x) => x.id));
    const qs = unitQuiz(lv, unit, { n: 12, exclude });
    let res;
    if (!qs.length) res = { correct: 1, total: 1, missed: [] };
    else res = await runQuiz(area, qs, { title: t('unit_check', { n: unit.no }) });
    const pct = Math.round((res.correct / res.total) * 100);
    const ok = pct >= 80;
    bar.firstChild.style.width = '100%';
    if (ok) {
      const added = await learnItems(unitItems(lv, unit).filter((it) => !exclude.has(it.id)));
      await markUnitPassed(levelId, unit.id);
      if (added) toast(t('added_to_reviews', { n: added }));
    }
    await logTime();
    const missed = [...new Set(res.missed)].map((id) => lv.byId.get(id)).filter(Boolean);
    const next = lv.units.find((u) => u.no === unit.no + 1);
    area.replaceChildren();
    append(area, [
      h('h2', null, ok ? t('passed') : t('not_yet')),
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, `${pct}%`), h('div', { class: 'stat-label' }, t('n_of_total_correct', { n: res.correct, total: res.total }))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(missed.length)), h('div', { class: 'stat-label' }, t('to_look_at_again')))),
      missed.length ? h('div', { style: { marginTop: '12px' } }, h('strong', null, t('missed_colon'), ' '), missed.map((it) => h('a', { class: 'pill', lang: 'zh-Hans', href: `#/learn/item/${encodeURIComponent(it.id)}` }, it.char || it.zh || tr(it, 'title')))) : null,
      h('p', { class: 'muted', style: { marginTop: '12px' } }, ok ? t('unit_passed_blurb', { c: chars.length - exclude.size + vocab.filter((v) => exclude.has(v.id)).length, n: unitItems(lv, unit).length - exclude.size, k: exclude.size }) : t('need_pct_to_pass', { pct: 80 })),
      h('div', { class: 'btn-row', style: { marginTop: '16px' } },
        ok && next ? h('a', { class: 'btn btn-primary btn-lg', href: `#/unit/${levelId}/${next.no}` }, t('next_unit_n', { n: next.no })) : null,
        ok && !next ? h('a', { class: 'btn btn-primary btn-lg', href: `#/learn/${levelId}` }, t('back_to_level')) : null,
        !ok ? h('button', { class: 'btn btn-primary btn-lg', type: 'button', onClick: () => { stepIdx = 1; logged = false; show(); } }, t('review_the_cards')) : null,
        !ok ? h('button', { class: 'btn', type: 'button', onClick: () => { stepIdx = steps.length - 1; logged = false; show(); } }, t('retry_quiz')) : null,
        h('a', { class: 'btn', href: `#/learn/${levelId}` }, t('unit_list')))
    ]);
  }

  show();
  return () => { document.removeEventListener('keydown', onKey); stopSpeaking(); logTime(); };
}

export function posLabel(pos) { const key = `pos_${pos}`; return t(key) === key ? pos : t(key); }
function chunk(arr, n) { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; }
