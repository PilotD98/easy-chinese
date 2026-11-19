# Authoring sources and build scripts

The JSON under `data/` is generated from these sources plus dictionary extracts.
Edit the sources, rebuild, then run `node scripts/validate-content.mjs`.

## Dictionary extracts (`cache/`, not committed)

- `node scripts/fetch-cedict.mjs` → `cache/cedict.json` (CC-CEDICT, CC BY-SA 4.0)
- `node scripts/fetch-hsk.mjs` → `cache/hsk-words.json` (HSK 2.0 lists) and, via
  `build-level.mjs`, `cache/hsk<N>-words.tsv` (zh, pinyin, pos, glosses) and
  `cache/hsk<N>-chars.txt` (new characters of the level in list order)
- `node scripts/fetch-hanzi.mjs dictionary` → `cache/mmah.json` (Make Me a Hanzi:
  radical, decomposition, etymology)
- `node scripts/fetch-hanzi.mjs strokes hsk1 "<chars>"` → `data/strokes/hsk1.json`

## Per-level sources (`hsk<N>/`)

All are ES modules. Chinese text is simplified. Pinyin uses tone marks, one
space per syllable, dictionary tones (`bù`, `yī`), lower case.

### `units-src.mjs` (optional; HSK 1–2 are hand-planned, higher levels are planned by the build)

```js
export const UNITS = [
  { title: 'You, me and hello', title_ja: 'わたし、あなた、こんにちは', chars: ['我', '你', '好', '是', '不', …] },
  …
];
```

Every new character of the level appears in exactly one unit (the build
reports any missing or duplicated). Order units so that the words of the
level's list become writable as early as possible: a word is placed in the
unit where its last character is taught. Aim for 12–16 characters per unit.

### `grammar-src.mjs`

```js
export const GRAMMAR = [
  { id: 'shi', unit: 1, title: '是: A is B', title_ja: '是：AはBです',
    pattern: 'A 是 B', summary: 'Linking two nouns', summary_ja: '名詞と名詞をつなぐ',
    explanation: 'Plain-language explanation, 2–5 sentences.', explanation_ja: '…',
    ex: [ ['我是学生。', 'wǒ shì xuésheng.', 'I am a student.', '私は学生です。'], /* at least 3 */ ],
    mistakes: ['…'], mistakes_ja: ['…'],
    exercises: [
      { type: 'fill', prompt: '我＿学生。', answer: '是', choices: ['是', '有', '在'], why: '…', why_ja: '…' },
      { type: 'choose', prompt: 'Which sentence means "She is not a teacher"?', answer: '她不是老师。', choices: ['她不是老师。', '她没有老师。', '她不老师。'], why: '…', why_ja: '…' },
      { type: 'order', prompt: 'Make: "He is Chinese."', prompt_ja: '「彼は中国人です」を作る', answer: '他是中国人', choices: ['他', '是', '中国人'], why: '…', why_ja: '…' },
      { type: 'produce', prompt: 'Say: "I am a student."', prompt_ja: '…', answer: '我是学生', answerPinyin: 'wǒ shì xuésheng', why: '…', why_ja: '…' }
    ] }
];
```

Rules: examples and exercises use only characters taught by the end of the
grammar point's unit (earlier levels count as known) and, as far as possible,
only words from the level's list. Every grammar point needs 2–4 exercises of
mixed types. `＿` (full-width underscore) marks the blank in `fill` prompts.

### `readings-src.mjs`

```js
export const READINGS = [
  { id: 'read:hsk1:001', unit: 4, title: '我的家', en: 'My family', ja: '私の家族',
    text: '我家有四口人。爸爸、妈妈、哥哥和我。…', pinyin: 'wǒ jiā yǒu sì kǒu rén. bàba、māma、gēge hé wǒ. …',
    enText: 'There are four people in my family. …', jaText: '私の家は四人家族です。…',
    questions: [ { q: '他家有几口人？', choices: ['三口', '四口', '五口'], answer: 1, why: '…', why_ja: '…' } ] }
];
export const LISTENING = [
  { id: 'listen:hsk1:001', unit: 4, type: 'dictation', title: 'Dictation: introductions', title_ja: '…',
    items: [ { text: '我是学生。', pinyin: 'wǒ shì xuésheng.', en: 'I am a student.', ja: '私は学生です。' } ] },
  { id: 'listen:hsk1:002', unit: 6, type: 'comprehension', title: '…', title_ja: '…',
    items: [ { text: '…', pinyin: '…', en: '…', ja: '…', questions: [ { q: '…', choices: ['…', '…', '…'], answer: 0, why: '…', why_ja: '…' } ] } ] },
  { id: 'listen:hsk1:003', unit: 8, type: 'shadow', title: '…', title_ja: '…', items: [ { text: '…', pinyin: '…', en: '…', ja: '…' } ] }
];
```

The `pinyin` of a text has exactly one syllable per Han character (punctuation
is copied through); the build aligns them for the pinyin ruby and reports any
mismatch. Readings use only characters taught by the end of their unit.

### `ja/<N>-vocab.json`, `ja/<N>-chars.json` (Japanese glosses)

```json
{ "学生": { "ja": ["学生"], "note": null }, "手纸": { "ja": ["トイレットペーパー"], "note": "日本語の「手紙」ではない。手紙は 信 xìn。" } }
```

### `mnemonics/<N>.json`

```json
{ "爱": { "en": "…", "ja": "…" } }
```

## Build

- `node scripts/authoring/check-vocab.mjs hsk1` verifies the level's words
  against CC-CEDICT (existence, pinyin, gloss) and reports mismatches.
- `node scripts/authoring/build-level.mjs hsk1` builds `data/hsk1/*.json`.
  Earlier levels must be built first, since their characters and words count as known.
