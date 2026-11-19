# Curriculum data schema

All curriculum lives in `data/` as JSON. `data/index.json` is the manifest; it
lists stages (what the learner sees on the path) and levels (which files hold
the content). Levels are lazy-loaded by the app the first time they are needed.

`node scripts/validate-content.mjs` checks every rule below and exits non-zero
on any error. Run it before committing content.

Every learner-facing string exists in English and, where the field has a `_ja`
twin, in Japanese. The app shows the Japanese field when the interface language
is Japanese and falls back to English when it is missing.

## Pinyin conventions

- `pinyin` fields use tone marks (`nǐ hǎo`), one space between syllables, lower
  case except proper nouns, ü written as ü. Dictionary (underlying) tones are
  written: `bù`, `yī`, `nǐ hǎo` (third-tone sandhi is not written).
- `num` fields are the same syllables with tone numbers (`ni3 hao3`, ü as `v`:
  `nv3`, neutral tone `5`). The app converts between the two forms.
- One Han character corresponds to one syllable, except erhua (`花儿 huār`).

## Stable IDs

| Type | Format | Example |
|---|---|---|
| Sound unit (Pinyin stage) | `py:<kind>:<slug>` (kind `t` tone, `i` initial, `f` final, `p` tone pair, `s` sandhi rule) | `py:t:1`, `py:i:zh`, `py:f:ang`, `py:p:3-3`, `py:s:bu` |
| Pinyin-stage word | `vocab:py:<num>-<zh>` | `vocab:py:ma1-妈` |
| Character | `hanzi:<character>` | `hanzi:爱` |
| Vocabulary | `vocab:<level>:<num>-<zh>` (num without spaces) | `vocab:hsk1:xue2sheng5-学生` |
| Grammar | `gram:<level>:<slug>` | `gram:hsk1:shi` |
| Reading | `read:<level>:<nnn>` | `read:hsk1:001` |
| Listening | `listen:<level>:<nnn>` | `listen:hsk1:001` |
| Speaking item | `spk:<set>:<nn>` | `spk:py:greet:01` |
| Unit | `unit:<level>:<nn>` | `unit:hsk1:01` |

Levels, in teaching order: `pinyin`, `hsk1` … `hsk6`. "Taught before" means an
earlier level, or the same level with a smaller `order`.

## `data/index.json`

```json
{
  "schema": 1,
  "stages": [ { "id": "pinyin", "no": 0, "title": "Pinyin and tones", "title_ja": "ピンインと声調", "summary": "…", "summary_ja": "…", "level": "pinyin" } ],
  "levels": [
    { "id": "hsk1", "title": "HSK 1",
      "targets": { "hanzi": 178, "vocab": 150, "grammar": 40 },
      "files": { "chars": "hsk1/chars.json", "vocab": "hsk1/vocab.json", "grammar": "hsk1/grammar.json",
                 "readings": "hsk1/readings.json", "listening": "hsk1/listening.json", "units": "hsk1/units.json" } }
  ]
}
```

## Pinyin stage (`pinyin.json`)

```json
{
  "title": "Pinyin and tones", "title_ja": "ピンインと声調",
  "quiz": { "questions": 12, "passPercent": 80 },
  "exam": { "questions": 40, "passPercent": 85, "unlocks": "hsk1" },
  "groups": [
    { "id": "py-tones", "kind": "tones", "title": "The four tones", "title_ja": "四声",
      "intro": "…", "intro_ja": "…", "note": "…", "note_ja": "…",
      "chars": [
        { "id": "py:t:1", "char": "ā", "label": "first tone", "label_ja": "第一声",
          "hint": "High and flat, like singing one steady note.", "hint_ja": "…",
          "sample": { "zh": "妈", "pinyin": "mā", "num": "ma1", "en": "mother", "ja": "お母さん" },
          "mnemonic": "…", "mnemonic_ja": "…" }
      ],
      "words": [
        { "id": "vocab:py:ma1-妈", "zh": "妈", "pinyin": "mā", "num": "ma1", "meaning": "mother", "meaning_ja": "お母さん" }
      ] }
  ]
}
```

Rules: `kind` is `tones | initials | finals | pairs | sandhi`. A sound unit's
`char` is the pinyin letter(s) (initials `b`, finals `ang`, tones shown on `a`:
`ā á ǎ à a`, pairs `1-3`, sandhi `bù/bú`). Every word in a group may only use
initials, finals and tones introduced in that group or an earlier one (the
validator parses each syllable). `sample` is the character the audio plays for
that sound. Sandhi units carry `rule` text explaining the change.

## Characters (`<level>/chars.json`)

```json
[
  { "id": "hanzi:爱", "char": "爱", "trad": "愛", "level": "hsk1", "unit": 1, "order": 100,
    "pinyin": ["ài"], "num": ["ai4"],
    "meanings": ["love", "like"], "meanings_ja": ["愛", "好む"],
    "strokes": 10, "radical": "爫", "components": ["爫", "冖", "友"],
    "mnemonic": "…", "mnemonic_ja": "…", "hint": "Make Me a Hanzi etymology hint, if any",
    "examples": ["vocab:hsk1:ai4-爱"] }
]
```

Rules: `examples` must reference existing vocabulary containing the character.
`strokes` must equal the number of strokes in `data/strokes/<level>.json`.

## Vocabulary (`<level>/vocab.json`)

```json
[
  { "id": "vocab:hsk1:xue2sheng5-学生", "zh": "学生", "trad": "學生", "pinyin": "xuésheng", "num": "xue2 sheng5",
    "level": "hsk1", "unit": 2, "order": 220,
    "meanings": ["student"], "meanings_ja": ["学生"], "note_ja": null,
    "pos": ["n"], "chars": ["hanzi:学", "hanzi:生"], "freq": 310,
    "verified": true, "common": true }
]
```

Rules: every character in `zh` must be taught before this word (same or earlier
level, smaller `order`), or the word carries `pinyinException: true` (it then
always shows pinyin). `verified` means the word, its pinyin and its first gloss
were found in CC-CEDICT. `note_ja` warns Japanese learners about false friends
(手纸 is toilet paper, not a letter).

## Units (`<level>/units.json`)

```json
[ { "id": "unit:hsk1:01", "no": 1, "level": "hsk1", "title": "You, me and hello", "title_ja": "…",
    "chars": ["hanzi:我", …], "vocab": ["vocab:hsk1:…", …], "grammar": ["gram:hsk1:shi", …],
    "readings": ["read:hsk1:001"], "listening": ["listen:hsk1:001"] } ]
```

A unit is the lesson the learner takes: its characters first, then its words,
then its grammar points with exercises, then the reading, then a 12-question check.
Items the learner has marked as already known are skipped.

## Grammar (`<level>/grammar.json`)

```json
[
  { "id": "gram:hsk1:shi", "level": "hsk1", "unit": 1, "order": 150, "title": "是: A is B", "title_ja": "是：AはBです",
    "pattern": "A 是 B", "summary": "Linking two nouns", "summary_ja": "…",
    "explanation": "…", "explanation_ja": "…",
    "examples": [ { "zh": "我是学生。", "pinyin": "wǒ shì xuésheng.", "en": "I am a student.", "ja": "私は学生です。" } ],
    "mistakes": ["…"], "mistakes_ja": ["…"],
    "exercises": [ { "type": "fill", "prompt": "我＿学生。", "answer": "是", "choices": ["是", "有", "在"], "why": "…", "why_ja": "…" } ] }
]
```

Rules: at least three examples; every example uses only characters taught by
its unit (the validator reports others). Exercise `type` is
`fill | choose | order | produce`; `order` lists the pieces in `choices`;
`produce` carries `answerPinyin` so typed pinyin is accepted.

## Readings and listening (`<level>/readings.json`, `<level>/listening.json`)

```json
[
  { "id": "read:hsk1:001", "level": "hsk1", "unit": 3, "order": 390, "title": "我的家", "en": "My family", "ja": "私の家族",
    "text": "我家有四口人。…", "pinyin": "wǒ jiā yǒu sì kǒu rén. …", "enText": "…", "jaText": "…",
    "questions": [ { "q": "他家有几口人？", "choices": ["三口", "四口", "五口"], "answer": 1, "why": "…", "why_ja": "…" } ] }
]
```

Readings and listening items use only characters taught by the end of their
unit. Listening drills have `type` (`dictation | comprehension | shadow`) and
`items`, each with `text`, `pinyin`, `en`, `ja` and, for comprehension, `questions`.

## Speaking (`speaking.json`, `situations.json`)

```json
{ "sets": [
  { "id": "spk:py:greet", "mode": "repeat", "level": "pinyin", "title": "Greetings", "title_ja": "…", "summary": "…", "summary_ja": "…",
    "items": [ { "id": "spk:py:greet:02", "zh": "你好", "pinyin": "nǐ hǎo", "en": "Hello", "ja": "こんにちは", "alt": ["您好"] } ] },
  { "id": "spk:py:qa1", "mode": "question", "level": "pinyin", "title": "…", "summary": "…",
    "items": [ { "id": "…", "q": "你叫什么名字？", "qPinyin": "…", "qEn": "…", "qJa": "…", "model": "我叫[name]。", "modelPinyin": "wǒ jiào [name].", "en": "…", "ja": "…" } ] },
  { "id": "spk:real:rp-airport", "mode": "roleplay", "level": "hsk1", "group": "situations", "title": "…", "partner": "Officer", "tips": ["…"], "tips_ja": ["…"],
    "turns": [ { "who": "partner", "zh": "…", "pinyin": "…", "en": "…", "ja": "…" }, { "who": "you", "zh": "…", "pinyin": "…", "en": "…", "ja": "…", "alt": [] } ] }
] }
```

`mode` is `repeat | shadow | question | roleplay`. `[slot]` marks a part the
learner fills in (name, place, time) that is not scored. `alt` lists other
character spellings the recogniser commonly returns. `level` gates the set.

## Guides (`guides.json`)

```json
{ "title": "Real-world Chinese", "title_ja": "…", "intro": "…", "intro_ja": "…",
  "guides": [ { "id": "everyday", "title": "…", "title_ja": "…", "summary": "…", "summary_ja": "…", "minutes": 10,
    "sections": [ { "title": "…", "title_ja": "…", "body": ["…"], "body_ja": ["…"], "style": "signs",
      "items": [ { "zh": "入口", "pinyin": "rùkǒu", "en": "entrance", "ja": "入口", "note": "…", "note_ja": "…" } ],
      "links": [ { "level": "HSK 3+", "name": "…", "url": "https://…", "note": "…", "note_ja": "…" } ] } ] } ] }
```

## Progress records (device storage, not in the repo)

```json
{ "id": "hanzi:爱", "type": "hanzi", "state": 2, "due": "2026-11-20T08:00:00.000Z",
  "stability": 12.4, "difficulty": 5.1, "reps": 6, "lapses": 1, "lastReview": "…",
  "stage": "familiar", "display": 3, "streak": 3, "known": false, "createdAt": "…", "updatedAt": "…" }
```

`display` is the per-item pinyin scaffolding level (3 characters with pinyin,
4 characters only, tap to reveal). `stage` is derived from FSRS stability.
`known: true` marks an item the learner said they already knew: lessons skip
it, unit quizzes leave it out, and it is reviewed with a long interval.
