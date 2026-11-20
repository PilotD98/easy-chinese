# HSK 4 grammar review (`scripts/authoring/hsk4/grammar-src.mjs`)

Scope: all 58 points checked for explanation accuracy (en/ja), example characters,
pinyin (tone marks, one space per syllable, dictionary tones, neutral tones, erhua),
en/ja translations, exercise correctness (answer right, distractors wrong, order
pieces concatenate, produce pinyin matches), and mistakes/why texts. Character
constraint (HSK 1–3 + HSK 4 characters taught by the end of the point's unit) was
re-verified by `node scripts/validate-content.mjs` after the edits.

No example sentence, pinyin string or translation needed changing. All problems
were in exercises (mostly distractors that were actually grammatical sentences)
and in three mistakes/explanation claims that were linguistically wrong.

## Changes (22 points, 27 edits)

| Point id | What was wrong | Fix |
|---|---|---|
| bei-passive | fill distractor 给: 我的钱包给人拿走了 is a valid colloquial passive | distractor 给 → 对 |
| zhiyao-zhiyou | fill distractor 都: 只要有时间，我都去看你 is acceptable (只要…都) | distractor 都 → 却 |
| shouxian-qici | fill distractor 另外: 首先要准备好票，另外要早点儿到车站 is a correct sentence | distractors → 但是, 所以 |
| jinguan-danshi | choose distractor 尽管很累，他也来了 and mistake "也 after 尽管 is wrong": 尽管…也 is attested and acceptable | distractor → 尽管很累，他就来了; why/why_ja updated; mistakes[0] rewritten (所以/就 are the real errors) |
| lian-dou | fill distractor 把: 他把自己的名字都写错了 is a correct sentence | distractor 把 → 被 |
| dagai-yexu | fill distractor 也许: 从这里到学校也许要二十分钟 is a correct sentence | distractors → 难道, 永远 |
| ji-you | fill distractors 也/还: 既…也 and 既…还 are both standard pairings | distractors → 就, 才 |
| yaoshi-jiu | fill distractor 既然: 既然你累了，就先休息一下 is a correct sentence | distractors → 尽管, 虽然 |
| suizhe | produce 随着时间的过去我越来越理解 is unnatural (理解 with no object) | answer → 随着时间的过去我越来越理解他了; prompt, prompt_ja, answerPinyin updated |
| kongpa | fill distractors 反正/难道 both yield plausible sentences | distractors → 到底, 永远 |
| laibuji | mistakes[1] "Using 没 before 来得及 is wrong" is false (没来得及 + V is standard); choose distractor 没来得及写信吗 relied on it | mistake replaced (来不及了 ≠ "cannot come"), ja likewise; explanation (en/ja) now teaches 没来得及; distractor → 来得及不写信了 |
| buru | fill distractor 不比: 今天不比昨天热 is a correct sentence | distractor 不比 → 不太 |
| yifangmian | fill distractors 另外/其次 give acceptable sentences | distractors → 另外方面, 第二方面 (the wrong forms named in mistakes); why wording tightened |
| jieguo | fill distractor 甚至: 他吃得太多，甚至肚子疼了 is defensible | distractor 甚至 → 否则 |
| jihu | fill distractor 反正: 他太累了，反正站不住了 is a plausible sentence | distractor 反正 → 从来 |
| yi-wei | order 他以父亲为例子 is unidiomatic (以…为例 = "take as an illustration", not a role model) | exercise → 我们以这个问题为例 (pieces 我们/以这个问题/为/例), prompts and why updated |
| yixiazi | fill distractor 一下: 她一下哭了起来 is acceptable (一下 = 一下子) | distractors → 一点儿, 一直 |
| qilai | fill 孩子们一下子跑＿了: 跑下去/跑出来 are both grammatical | prompt → 春天到了，天气热＿了 (起来 / 过来 / 出去), why updated |
| chulai | fill distractor 下去: 看不下去 is a real expression; order answer 我听出来了他的声音 is not the textbook form | distractor 下去 → 回来; order → 我听出他的声音来了 (pieces 我/听出/他的声音/来了), why updated |
| le-vs-guo | choose distractor 我今天早上去过医院 is acceptable Chinese (过 = completed, cf. 昨天他来过了); mistakes[1] made the same over-strong claim | distractor → 我今天早上去医院过 (wrong word order); mistakes[1] en/ja reworded as a tendency, not a prohibition |
| zhe-review | fill distractor 了: 桌子上放了一本书 is a correct existential sentence | prompt → 他笑＿说："没关系。" (着 / 了 / 过), why/why_ja updated |

## Counts

- Points reviewed: 58
- Points changed: 22
- Individual edits: 27 (18 distractor replacements, 3 exercise rewrites, 2 answer/prompt changes, 3 mistakes corrections, 1 explanation addition)
- Example sentences / pinyin / translations changed: 0
- `node scripts/authoring/build-level.mjs hsk4`: passes (grammar 58)
- `node scripts/validate-content.mjs`: passes, 0 warnings
