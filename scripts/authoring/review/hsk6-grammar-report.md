# HSK 6 grammar accuracy review

Source: `scripts/authoring/hsk6/grammar-src.mjs` (46 points, 184 examples, 138 exercises).

Method: every explanation / explanation_ja, example (characters, pinyin, en, ja), exercise
(answer, distractors, order pieces, produce pinyin) and mistake note was read; a script
additionally checked the HSK 1–5 + unit-plan character constraint, pinyin syllable
alignment and per-character readings against CC-CEDICT, `order` concatenation and
answer-in-choices. After the fixes `node scripts/authoring/build-level.mjs hsk6` and
`node scripts/validate-content.mjs` both pass (0 errors, 0 warnings).

## Changes (12 edits in 11 points)

| Point | What was wrong | Fix |
|---|---|---|
| `bingfei` (U2) | Mistake note stated flatly that 并非是 is wrong; it is redundant rather than ungrammatical and is widely used, so the `choose` distractor 这并非是易事 was not clearly wrong. | Mistake note (en/ja) now says 是 is redundant and careful writers omit it; distractor replaced by 这非并易事. |
| `jianyu` (U7) | `fill` distractor was the multi-word string 由于…所以, not a word a learner could put in the blank. | Replaced by 至于 (clearly wrong in the blank). |
| `yi-formal` (U8) | Explanation cited 以此为理由 as the "reason" use of 以, but that phrase is just the 以A为B pattern. Mistake note "以 + verb is wrong" contradicts 以便 / 以免 taught in later units. | Explanation (en/ja) now cites 以此为由 "on these grounds"; mistake note (en/ja) limits the rule to the 用 sense and names 以便 / 以免 as the purpose exception. |
| `zhi` (U12) | Mistake note "writing 之 after a verb phrase is wrong" contradicted the point's own example 通往成功之路. | Note (en/ja) now warns against using 之 as an object pronoun outside set phrases (取而代之, 总而言之 vs 我看之). |
| `bufang` (U22) | Mistake note "using 不妨 in the negative (不不妨)" described no real learner error. | Replaced (en/ja) by the real error: using 不妨 for an order or obligation (你不妨必须去). |
| `yilai-erlai` (U27) | `fill` distractor 再说 also yields a correct sentence (一来离家近，再说学费便宜). | Replaced by 一方面 (mismatched pair, wrong). |
| `duici` (U29) | `fill` distractor 由此 is marginally acceptable in 产品出现了问题，由此公司向客户道歉. | Replaced by 对于 (wrong without 此). |
| `yizhi` (U32) | `choose` answer 他高兴得以至于跳了起来 is unnatural (得 + 以至于; 得以 misparse). | Answer now 他太高兴了，以至于跳了起来; distractors 他太高兴了，以致跳了起来 (以致 for a non-bad result) and 以至于他太高兴了，跳了起来 (clause-initial). |
| `ze` (U33) | `fill` distractor 就 also yields acceptable colloquial contrast (弟弟就比较安静). | Replaced by 而 (cannot follow the subject here). |
| `shenzhiyu` (U43) | Pinyin 休息 given as xiū xī; dictionary / project convention is xiū xi. | Changed to xiū xi. |
| `guran` (U45) | `fill` distractor 虽说 yields a fully correct sentence (汽车虽说方便，但是污染环境). | Replaced by 未免. |
| `shuolaishuoqu` (U50) | `fill` distractor 说实话 yields a fully correct sentence (说实话，这件事还是得你自己决定). | Replaced by 走来走去. |

## Checked and left unchanged

- All 184 examples: characters are correct simplified forms within the HSK 1–5 + unit
  constraint; pinyin syllables align one per character with dictionary tones (bù / yī kept
  as dictionary tones; neutral tones unmarked for 个, 意思, 困难, 消息, 别人, 记住, 学生, 喜欢,
  大人, 还是, 告诉, 朋友, 衣服, 东西, 谢谢, 运气, 起来, 看看, 教训, 热闹, 客气, 态度, 招呼,
  麻烦, matching the project word lists and earlier levels).
- All `order` exercises concatenate to their answer; all `fill` / `choose` answers are among
  the choices; all `produce` answerPinyin strings match their answers syllable for syllable.
- Register notes and near-synonym contrasts (而已/罢了, 并非/并不是, 予以/加以, 即便/即使/就算,
  鉴于/基于, 不止/不只, 纵然/哪怕/尽管, 以便/以免/免得/省得, 难免/不免/未免, 不时/有时,
  以致/以至于/以至, 则, 进行/作为, 有助于/有利于/有益于, 非…不可/不得不, 不料/不至于,
  岂/何尝) were verified as accurate.
- The double-blank `fill` prompt 他＿步＿步地走上了山顶 (answer 一) is rendered as plain
  markup with the choices below, so it is unambiguous and was kept.

## Counts

- Points reviewed: 46; examples: 184; exercises: 138.
- Points changed: 11; edits: 12 (1 pinyin, 4 explanation / mistake-note corrections,
  1 `choose` answer rewrite, 6 distractor replacements).
- Build: pass. Validation: pass (0 errors, 0 warnings).
