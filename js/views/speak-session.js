/* A speaking practice session for one set (repeat, shadow, question, roleplay).
   Each "say" step: listen → speak (recognition with syllable-and-tone feedback)
   or record and compare → next. Keyboard: Space = play, Enter = continue. */
import { h, append, icon, zh } from '../ui/dom.js';
import { loadSpeaking, stepsFor } from '../content/speaking.js';
import { loadAllHsk } from '../content/hsk.js';
import { loadPinyin } from '../content/pinyin-stage.js';
import { speak, canSpeak, initAudio, stopSpeaking } from '../ui/audio.js';
import { createRecognizer, recognitionSupported } from '../ui/recognizer.js';
import { startRecording, recordingSupported, micErrorMessage } from '../ui/recorder.js';
import { compare, bestOf } from '../engine/syllables.js';
import { readingDict, toPinyin } from '../engine/reading.js';
import { toMarked } from '../engine/pinyin.js';
import { toneDiagram } from '../ui/tone.js';
import { zhRuby } from '../ui/zhtext.js';
import { settings } from '../store/settings.js';
import { days } from '../store/days.js';
import { t, tr } from '../i18n/index.js';

export const title = 'nav_speak';

export async function render(el, ctx) {
  const setId = decodeURIComponent(ctx.segs[1]);
  const { setsById } = await loadSpeaking();
  const set = setsById.get(setId);
  if (!set) { append(el, [h('h1', null, t('set_not_found')), h('a', { class: 'btn', href: '#/speak' }, t('back_to_speak'))]); return; }
  await initAudio();
  const steps = stepsFor(set);
  const startedAt = Date.now();
  let logged = false;
  const logTime = async () => { if (logged) return; logged = true; await days.log({ seconds: Math.round((Date.now() - startedAt) / 1000) }); };

  const sr = recognitionSupported();
  const recOk = recordingSupported();
  const scores = [];
  // Reading dictionary: every loaded level's words and characters, plus this set's own lines (and their alt spellings).
  const hsk = await loadAllHsk();
  const py = await loadPinyin().catch(() => null);
  const words = [], chars = [];
  for (const lv of Object.values(hsk)) { words.push(...lv.vocab); chars.push(...lv.chars); }
  if (py) words.push(...py.allWords);
  for (const s of steps) {
    for (const [text, pinyin] of [[s.zh, s.pinyin], [s.q, s.qPinyin]]) if (text && pinyin) { words.push({ zh: text.replace(/\[[^\]]+\]/g, ''), pinyin: pinyin.replace(/\[[^\]]+\]/g, '') }); }
    for (const alt of s.alt || []) if (s.pinyin) words.push({ zh: alt, pinyin: s.pinyin.replace(/\[[^\]]+\]/g, '') });
  }
  const dict = readingDict(words.filter((w) => w.zh && !/[\s\p{P}]/u.test(w.zh)), chars);
  // whole lines first so punctuation-free matches win, then fall back to character level
  let idx = set.tips?.length ? -1 : 0;
  let recognizer = null, recording = null;

  const bar = h('div', { class: 'bar' }, h('span', { style: { width: '0%' } }));
  const counter = h('span', { class: 'small muted' });
  const stage = h('div', { class: 'speak-stage' });
  append(el, [
    h('header', { class: 'page-head row', style: { justifyContent: 'space-between' } },
      h('div', null, h('h1', null, tr(set, 'title')), h('p', { class: 'lede' }, `${t(`mode_${set.mode}`)}${set.partner ? ` · ${t('you_talk_with', { who: set.partner })}` : ''}`)),
      h('a', { class: 'btn', href: '#/speak', onClick: () => cleanup() }, t('exit'))),
    h('div', { class: 'row', style: { justifyContent: 'flex-end' } }, counter),
    bar,
    stage
  ]);

  function cleanup() { stopSpeaking(); recognizer?.abort(); recording?.stop?.(); logTime(); }

  const show = () => {
    stopSpeaking(); recognizer?.abort(); recognizer = null;
    if (idx >= steps.length) { summary(); return; }
    if (idx < 0) { counter.textContent = t('before_you_start'); stage.replaceChildren(tipsCard()); window.scrollTo(0, 0); return; }
    const step = steps[idx];
    counter.textContent = `${idx + 1} / ${steps.length}`;
    bar.firstChild.style.width = `${(Math.max(0, idx) / steps.length) * 100}%`;
    stage.replaceChildren(step.kind === 'listen' ? listenCard(step) : sayCard(step));
    window.scrollTo(0, 0);
  };
  const nextBtn = (label = t('continue')) => h('button', { class: 'btn btn-primary btn-lg btn-block speak-next', type: 'button', onClick: () => { idx += 1; show(); } }, label);

  function tipsCard() {
    return h('section', { class: 'card' },
      h('h2', null, t('good_to_know')),
      h('ul', { class: 'speak-tips' }, (tr(set, 'tips') || []).map((x) => h('li', null, x))),
      h('p', { class: 'small muted' }, set.mode === 'roleplay' ? t('roleplay_howto', { who: set.partner || t('the_other_person') }) : t('repeat_howto')),
      h('div', { class: 'lesson-foot' }, nextBtn(t('start'))));
  }

  function listenCard(step) {
    if (canSpeak() && settings.get('autoplayAudio')) setTimeout(() => speak(step.zh), 300);
    return h('section', { class: 'card' },
      h('div', { class: 'speak-who' }, t('partner_says', { who: set.partner || t('partner') })),
      phraseBlock(step),
      h('div', { class: 'btn-row', style: { marginTop: '12px' } }, playButtons(step.zh)),
      h('div', { class: 'lesson-foot' }, nextBtn(t('your_turn')))
    );
  }

  function sayCard(step) {
    const isAnswer = step.kind === 'answer';
    const isShadow = step.kind === 'shadow';
    const target = step.zh;
    const targetPinyin = step.pinyin;
    const resultBox = h('div', { class: 'speak-result' });
    const live = h('div', { class: 'speak-live zh', lang: 'zh-Hans', 'aria-live': 'polite' });
    const status = h('div', { class: 'small muted', 'aria-live': 'polite' });
    const foot = h('div', { class: 'lesson-foot' });

    const onFinal = (alts) => {
      const converted = alts.map((a) => ({ raw: a, py: toPinyin(a, dict) }));
      let best = null;
      for (const c of converted) { const r = compare(targetPinyin, c.py); if (!best || r.score > best.score) best = { ...r, transcript: c.raw, pinyin: c.py }; }
      showResult(best);
    };
    const speakLabel = () => (isShadow ? t('shadow_btn') : t('speak_btn'));
    const listenBtn = h('button', { class: 'btn btn-primary btn-lg', type: 'button' }, icon('speak'), speakLabel());
    listenBtn.addEventListener('click', () => {
      if (recognizer?.active) { recognizer.stop(); return; }
      live.textContent = ''; resultBox.replaceChildren();
      recognizer = createRecognizer({
        onInterim: (x) => { live.textContent = x; },
        onFinal,
        onError: (code, msg) => { status.textContent = msg; listenBtn.classList.remove('is-listening'); listenBtn.lastChild.textContent = speakLabel(); },
        onEnd: () => { listenBtn.classList.remove('is-listening'); listenBtn.lastChild.textContent = speakLabel(); if (!live.textContent && !resultBox.childElementCount) status.textContent = status.textContent || t('nothing_heard'); }
      });
      status.textContent = isShadow ? t('listening_shadow') : t('listening_say');
      listenBtn.classList.add('is-listening'); listenBtn.lastChild.textContent = t('stop');
      recognizer.start();
      if (isShadow) speak(target, { rate: 0.7, interrupt: true });
    });

    const recBtn = h('button', { class: 'btn btn-lg', type: 'button', disabled: !recOk }, icon('install'), t('record'));
    const playback = h('div', { class: 'speak-playback' });
    recBtn.addEventListener('click', async () => {
      if (recording) {
        const r = await recording.stop(); recording = null;
        recBtn.lastChild.textContent = t('record'); recBtn.classList.remove('is-listening');
        const audio = h('audio', { controls: true, src: r.url, style: { width: '100%' } });
        playback.replaceChildren(
          h('div', { class: 'small muted' }, t('your_recording', { s: (r.duration / 1000).toFixed(1) })),
          audio,
          h('div', { class: 'btn-row' }, h('button', { class: 'btn', type: 'button', onClick: () => { audio.play(); } }, t('play_mine')), h('button', { class: 'btn', type: 'button', onClick: () => speak(target) }, icon('speak'), t('play_native')),
            !sr ? selfRate() : null));
        return;
      }
      try {
        recording = await startRecording();
        recBtn.lastChild.textContent = t('stop'); recBtn.classList.add('is-listening');
        status.textContent = t('recording_tap_stop');
      } catch (err) { status.textContent = micErrorMessage(err); }
    });

    function selfRate() {
      return h('div', { class: 'row' }, h('span', { class: 'small muted' }, t('how_close')),
        [[t('way_off'), 40], [t('close_lc'), 75], [t('spot_on'), 100]].map(([l, v]) => h('button', { class: 'btn', type: 'button', onClick: () => { scores.push({ id: step.id, score: v, self: true }); foot.replaceChildren(nextBtn()); } }, l)));
    }

    function showResult(res) {
      live.textContent = '';
      status.textContent = '';
      scores.push({ id: step.id, score: res.score });
      const chips = h('div', { class: 'mora-row', 'aria-label': t('syllable_result') });
      for (const o of res.ops) {
        if (o.type === 'match') chips.append(h('span', { class: 'mora is-ok' }, o.t.text));
        else if (o.type === 'sub') chips.append(h('span', { class: `mora is-bad ${o.ini && o.fin && !o.tone ? 'is-tone' : ''}`, title: t('heard_x', { x: o.s.text }) }, o.t.text, h('small', null, o.s.text)));
        else if (o.type === 'del') chips.append(h('span', { class: 'mora is-bad is-missing', title: t('missing') }, o.t.text));
        else if (o.type === 'wild') chips.append(h('span', { class: 'mora is-wild' }, o.s.text));
        else if (o.type === 'ins') chips.append(h('span', { class: 'mora is-extra', title: t('extra') }, o.s.text));
      }
      const grade = res.score >= 90 ? t('grade_excellent') : res.score >= 75 ? t('grade_good_lc') : res.score >= 50 ? t('grade_getting_there') : t('try_again');
      resultBox.replaceChildren();
      append(resultBox, [
        h('div', { class: 'row', style: { justifyContent: 'space-between' } }, h('strong', { class: `speak-score ${res.score >= 75 ? 'is-good' : ''}` }, `${res.score}%`), h('span', null, grade)),
        chips,
        h('div', { class: 'small muted' }, t('heard_colon'), ' ', h('span', { lang: 'zh-Hans' }, res.transcript || '—'), res.pinyin ? ` · ${toMarked(res.pinyin)}` : ''),
        res.unknown ? h('div', { class: 'small muted' }, t('unknown_chars_note')) : null,
        res.tips.length ? h('ul', { class: 'speak-tips' }, res.tips.map((x) => h('li', null, x))) : h('p', { class: 'small', style: { color: 'var(--ok)' } }, t('every_syllable_landed')),
        isAnswer ? h('p', { class: 'small muted' }, t('answer_may_differ')) : null,
        h('div', { class: 'btn-row' }, h('button', { class: 'btn', type: 'button', onClick: () => { resultBox.replaceChildren(); live.textContent = ''; } }, t('try_again')))
      ]);
      foot.replaceChildren(nextBtn());
    }

    if (canSpeak() && settings.get('autoplayAudio') && !isAnswer) setTimeout(() => speak(target), 300);
    if (isAnswer && canSpeak() && settings.get('autoplayAudio')) setTimeout(() => speak(step.q), 300);

    const card = h('section', { class: 'card' });
    if (isAnswer) {
      card.append(h('div', { class: 'speak-who' }, t('question_colon')),
        h('div', { class: 'speak-q' }, zhRuby(step.q, step.qPinyin, { cls: 'zh' }), h('div', { class: 'muted' }, tr(step, 'qEn', 'qJa'))),
        h('div', { class: 'btn-row' }, playButtons(step.q)),
        h('details', { class: 'speak-model' }, h('summary', null, t('show_model_answer')), phraseBlock(step)));
    } else {
      append(card, [step.kind === 'say' && set.mode === 'roleplay' ? h('div', { class: 'speak-who' }, t('you_say')) : null,
        phraseBlock(step),
        h('div', { class: 'btn-row' }, playButtons(target))]);
    }
    card.append(
      h('hr'),
      h('div', { class: 'btn-row' }, sr ? listenBtn : null, recBtn),
      status, live, resultBox, playback,
      foot
    );
    if (!sr && !recOk) foot.replaceChildren(h('p', { class: 'small muted' }, t('no_sr_no_rec')), nextBtn());
    else if (!sr) foot.replaceChildren(nextBtn(t('skip')));
    else foot.replaceChildren(h('button', { class: 'btn btn-block', type: 'button', onClick: () => { idx += 1; show(); } }, t('skip')));
    return card;
  }

  function phraseBlock(step) {
    const block = h('div', { class: 'speak-phrase' },
      h('div', { class: 'speak-zh' }, zhRuby(step.zh, step.pinyin, { cls: 'zh' })),
      h('div', { class: 'muted' }, tr(step, 'en', 'ja')));
    if (step.pinyin && !/\[/.test(step.zh) && [...step.zh].filter((c) => /\p{Script=Han}/u.test(c)).length <= 6) block.append(h('div', { class: 'row', style: { marginTop: '8px' } }, toneDiagram(step.pinyin)));
    return block;
  }

  function playButtons(text) {
    if (!canSpeak()) return h('span', { class: 'small muted' }, t('no_zh_voice_short'));
    return [
      h('button', { class: 'btn', type: 'button', onClick: () => speak(text, { rate: 1 }) }, icon('speak'), t('natural_speed')),
      h('button', { class: 'btn', type: 'button', onClick: () => speak(text, { rate: 0.7 }) }, icon('speak'), t('slow_speed'))
    ];
  }

  async function summary() {
    await logTime();
    bar.firstChild.style.width = '100%';
    const spoken = scores.filter((s) => !s.self);
    const avg = scores.length ? Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length) : null;
    const weakest = [...scores].sort((a, b) => a.score - b.score).slice(0, 3).map((s) => steps.find((x) => x.id === s.id)).filter(Boolean);
    stage.replaceChildren(h('section', { class: 'card' },
      h('h2', null, t('set_complete')),
      h('div', { class: 'stat-grid' },
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, avg == null ? '—' : `${avg}%`), h('div', { class: 'stat-label' }, spoken.length ? t('average_match') : scores.length ? t('self_rated') : t('no_lines_attempted'))),
        h('div', { class: 'stat' }, h('div', { class: 'stat-value' }, String(scores.length)), h('div', { class: 'stat-label' }, t('of_n_lines_attempted', { n: steps.filter((s) => s.kind !== 'listen').length })))),
      weakest.length && avg != null && avg < 100 ? h('p', { style: { marginTop: '12px' } }, t('worth_another_go'), ' ', weakest.map((s) => h('span', { class: 'pill', lang: 'zh-Hans' }, s.zh))) : null,
      h('div', { class: 'btn-row', style: { marginTop: '16px' } },
        h('button', { class: 'btn btn-primary', type: 'button', onClick: () => { idx = 0; scores.length = 0; logged = false; show(); } }, t('again')),
        h('a', { class: 'btn', href: '#/speak' }, t('all_sets')))
    ));
  }

  const onKey = (e) => {
    if (e.target.tagName === 'INPUT' || document.querySelector('dialog[open]')) return;
    if (e.key === ' ' && e.target.tagName !== 'BUTTON') { e.preventDefault(); stage.querySelector('.btn-row .btn')?.click(); }
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') { const b = stage.querySelector('.speak-next'); if (b) { e.preventDefault(); b.click(); } }
  };
  document.addEventListener('keydown', onKey);
  show();
  return () => { document.removeEventListener('keydown', onKey); cleanup(); };
}
