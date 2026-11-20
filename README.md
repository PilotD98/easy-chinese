# Easy Chinese (简单中文)

Live app: https://pilotd98.github.io/easy-chinese/

A calm, serious Mandarin Chinese study tool that runs entirely in your browser
and deploys as a static site on GitHub Pages. It takes a learner from zero to
advanced reading and speaking, measured against HSK 1 → 6, with the interface
and every meaning available in **English or Japanese**.

It is the sibling of [Easy Nihongo](https://github.com/PilotD98/easy-nihongo)
and shares its architecture: no build step, no server, no accounts, no
analytics; all progress stays on the device.

## Features

- **How Chinese works**: six minutes of orientation (characters, pinyin, tones,
  no conjugation, measure words, what the HSK levels mean, and a section for
  readers who know Japanese).
- **Pinyin and tones (Stage 0)**: 13 groups covering the four tones and the
  neutral tone, every initial and final of the pinyin chart, the ü and
  y/w spelling rules, the 20 tone-pair patterns and the tone-change rules
  (third-tone sandhi, 不, 一, erhua). Each sound has a sample character with
  audio, a tone-contour diagram, a how-to-say-it hint and a memory aid; each
  group ends with real HSK words that use only sounds already taught, a
  12-question check (listening, tone discrimination, typed pinyin, meanings)
  and the stage closes with a 40-question exam that unlocks HSK 1.
- **HSK 1–6**: the HSK 2.0 word lists (150 / 300 / 600 / 1,200 / 2,500 / 5,000
  words cumulative, 2,632 characters) in 173 units with 293 grammar points,
  44 readings and 34 listening drills. Every level is taught in units: a
  handful of characters (stroke order animated from hanzi-writer / Make Me a
  Hanzi data, radical and components, mnemonic, trace-it pad), the words that
  use them, grammar points with examples and exercises (fill, choose, order,
  produce), graded readings and listening drills built only from what has
  been taught, a 12-question unit check and a timed **mock HSK** in the real
  format (听力, 阅读 and, from HSK 3, 书写).
- **Verified data**: every word's pinyin, traditional form and English glosses
  are taken from CC-CEDICT and checked word by word by
  `scripts/authoring/check-vocab.mjs`; learner-friendly glosses, Japanese
  glosses, false-friend notes for Japanese readers (手纸, 娘, 汤, 走, 丈夫, 爱人,
  勉强 …), mnemonics, grammar, readings and speaking sets are original.
- **"I already know this"**: every character and word card, and the unit
  intro list, has an *Already know this* button (plus *Mark all as known* per
  unit with confirmation). Known items are skipped in the lesson, left out of
  the unit quiz and enter the review queue with a long interval instead of as
  new items. Every mark can be undone per item or all at once in
  Settings → Study plan → Reset known marks; the Progress page counts known
  items separately from learned ones.
- **Pinyin scaffolding**: pinyin shows above every character until a word has
  been answered correctly four times in a row, then hides (tap to reveal) and
  returns after repeated misses. Settings can force it always or never, and
  can show traditional forms next to simplified ones.
- **Typing**: typed answers accept pinyin with tone numbers (`ni3 hao3`,
  `nv3`), tone-marked pinyin, or characters; the box shows the tone marks
  live, and a toneless answer gets an "almost" prompt instead of a hard fail.
- **Review engine**: FSRS-5 scheduling with learning steps, a per-day review
  cap and a new-item goal that eases off when recent accuracy drops. Review
  types rotate: meaning, pinyin, recall, listening, handwriting, grammar.
- **Speaking**: repeat-after-me, shadowing, answer-a-question and role-plays,
  plus real-world situation sets (airport, high-speed rail, metro, Didi,
  WeChat Pay, restaurants, hotels, pharmacy, hospital, shopping, bargaining,
  phone calls, deliveries, friends, work …). Speech recognition (`zh-CN`)
  returns characters; the app reads them back to pinyin with its own
  CC-CEDICT-derived dictionary and compares **syllable by syllable**, scoring
  initials, finals and tones separately, with tone-specific and
  pronunciation tips (retroflex vs dental, aspiration, n/ng, ü, the buzzing i).
  Settings → Study plan picks the Mandarin voice and explains how to install a
  more natural one on each OS.
- **Real-world Chinese**: guides with audio (everyday phrases by moment of the
  day, how people really talk, what staff say to you, signs and menus as sign
  cards with a hide-meanings test, numbers and money, survival phrases,
  politeness in practice, free real reading and listening by level).
- **Placement test**: optional; say what you know, take a short check, and
  skip ahead. Skipped stages are marked known and reviewed lightly.
- **Installable PWA** with offline support: the service worker stores the app
  shell plus the pinyin stage and HSK 1 at install; higher levels are cached
  the first time they are opened, or all at once from Settings.
- **Private by design**: no accounts, no server, no analytics. Progress lives
  in IndexedDB (localStorage fallback) with JSON export/import. Local profiles
  let several people share one device.
- **Responsive, accessible UI**: bottom tab bar on phones, sidebar on desktop,
  light/dark themes, four text sizes, sans/serif Chinese fonts, reduced
  motion, keyboard shortcuts (`/` search, `?` shortcuts, `1–4` grade,
  `Enter` continue, `Space` reveal).

## Running locally

No build step. Serve the folder with any static server, for example:

```bash
node scripts/serve.mjs        # http://localhost:5173
```

## Content pipeline

All curriculum is JSON under `data/` (see `data/SCHEMA.md`). The HSK levels are
generated from authored sources in `scripts/authoring/<level>/` plus dictionary
extracts (see `scripts/authoring/README.md`):

```bash
node scripts/fetch-cedict.mjs                 # CC-CEDICT → cache
node scripts/fetch-hsk.mjs                    # HSK 2.0 lists → cache
node scripts/fetch-hanzi.mjs dictionary       # Make Me a Hanzi → cache
node scripts/authoring/check-vocab.mjs hsk1   # verify the level's words against CC-CEDICT
node scripts/authoring/build-level.mjs hsk1   # build data/hsk1/*.json
node scripts/validate-content.mjs             # check every rule before committing
```

The validator checks IDs, required fields, that every word and sentence uses
only characters taught before it, that every pinyin string has one syllable
per character, that stroke counts agree with the stroke data, and that
pinyin-stage words use only sounds already introduced.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: it validates the
content, scans the tree for anything that looks like an API key, assembles the
site (everything except `scripts/` and `.github/`) and deploys it to GitHub
Pages. No secrets are needed or used.

## Data sources and licences

| Source | Used for | Licence |
|---|---|---|
| [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cc-cedict) | pinyin, traditional forms, English glosses (verification and base glosses) | CC BY-SA 4.0 |
| [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) | the HSK 2.0 word lists (published by Hanban) | MIT (compilation) |
| [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) | radicals, component decomposition, etymology hints | Arphic Public License (character data), LGPL (dictionary) |
| [hanzi-writer-data](https://github.com/chanind/hanzi-writer-data) | stroke outlines and medians (`data/strokes/`) | Arphic Public License |
| [Noto Sans SC / Noto Serif SC](https://fonts.google.com/noto) | Chinese typefaces | SIL Open Font License 1.1 |

Application code is released under the MIT License (see `LICENSE`).
`data/strokes/` is redistributed under the Arphic Public License (see
`data/strokes/ARPHICPL.txt`).

## What the app cannot do (yet)

- Speech recognition depends on the browser's engine (Chrome, Edge, Safari)
  and usually needs a network connection; Firefox has none, so it falls back
  to record-and-compare.
- Handwriting is a trace-and-check pad, not handwriting recognition.
- The mock HSK is an estimate built from the app's own content, not the real
  exam's item bank.
- There is no HSK 7–9 (3.0) stage.
