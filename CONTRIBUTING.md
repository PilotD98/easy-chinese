# Contributing to Easy Chinese

Most contributions are curriculum content: a wrong gloss, a better mnemonic, a
missing false-friend note for Japanese readers, a new reading passage. This
guide explains how content is organised and how to check your change before
opening a pull request.

## Where content lives

```
data/index.json          manifest: stages, levels, targets, file list
data/SCHEMA.md           field-by-field reference for every file type
data/orientation.json    How Chinese works
data/pinyin.json         Pinyin stage: sound groups, sample characters, words
data/speaking.json       base speaking sets; data/situations.json real-world sets
data/guides.json         Real-world Chinese guides
data/strokes/*.json      stroke outlines and medians (regenerate, do not hand-edit)
data/hsk1/units.json     the units (which characters, words, grammar, readings go together)
data/hsk1/chars.json     characters of HSK 1 (and hsk2/ … hsk6/ likewise)
data/hsk1/vocab.json     vocabulary
data/hsk1/grammar.json   grammar points
data/hsk1/readings.json  graded reading passages
data/hsk1/listening.json listening drills
```

The HSK level files are **generated**: edit the sources in
`scripts/authoring/` (grammar, readings, unit plans, Japanese glosses,
mnemonics, gloss overrides) and rebuild with
`node scripts/authoring/build-level.mjs hsk1`. See `scripts/authoring/README.md`.

## Rules the validator enforces

Run it after every change:

```bash
node scripts/validate-content.mjs
```

It fails the build if an id is missing, malformed or duplicated; an item lacks
a required field; a pinyin string does not have one syllable per character
(erhua excepted); a word, sentence or reading uses a character taught later;
a pinyin-stage word uses a sound not yet introduced; a character's stroke
count disagrees with the stroke data; or an example word does not contain its
character.

## Conventions

- Simplified characters; traditional forms live in `trad`.
- Pinyin with tone marks, one space per syllable, dictionary tones (`bù`,
  `yī`), lower case, neutral tones unmarked; `num` holds the numbered form.
- Every learner-facing field has a `_ja` twin (or `ja` next to `en`); the app
  falls back to English when it is missing.
- No API keys, tokens or credentials anywhere; no analytics; nothing that
  talks to a server. The deploy workflow scans for anything that looks like a
  secret and fails.
