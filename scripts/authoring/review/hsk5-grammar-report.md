# HSK 5 grammar accuracy review

File: `scripts/authoring/hsk5/grammar-src.mjs` (56 points). Every point was checked for:
explanation accuracy (en/ja, register notes), example characters / pinyin / translations,
exercise answers and distractors, order-piece concatenation, produce `answerPinyin`,
and mistakes/why texts. Pinyin was additionally cross-checked mechanically against
CC-CEDICT and the project's own HSK word lists (`cache/hsk<N>-words.tsv`); order pieces,
answer-in-choices and blank markers were checked by script.

Structure, ids and units are unchanged. Character constraint (HSK 1–4 + HSK 5 characters
taught by the end of the point's unit) still holds: `node scripts/authoring/build-level.mjs hsk5`
and `node scripts/validate-content.mjs` both pass (0 warnings).

## Changes

| # | Point id | What was wrong | Fix |
|---|----------|----------------|-----|
| 1 | `ba-gei-cheng-dao-zai` | Example 2 pinyin `bié rén`; project list and CEDICT give neutral-tone 别人. | `bié ren` |
| 2 | `ba-gei-cheng-dao-zai` | Choose prompt "I wrote the sentence out in Chinese" does not match 写成了汉语 (rewrite/convert into Chinese; ja says 書き換えました). | Prompt → "I rewrote this sentence in Chinese" |
| 3 | `dui-lai-shuo` | 学生 pinyin `xué shēng`; project convention (HSK 1–4 sources, word list) is `xué sheng`. | `xué sheng` |
| 4 | `wei-bi` | Explanation (en + ja) claimed 未必 cannot stand alone as an answer (「未必。」 is a normal terse reply). First mistake repeated the wrong claim. | Explanation now says it can stand alone like 不一定; mistake replaced with "未必 before a noun (未必好人) is wrong; it needs a verb/adjective" (en + ja) |
| 5 | `wei-bi` | Fill `价格高的东西＿好。` — distractor 一定 also yields a grammatical sentence, so the answer was not unique. | Prompt → `价格高的东西＿好，便宜的也可能不错。` (HSK 2–3 characters only) |
| 6 | `jing-ran` | Example 4 `他居然赢了冠军` is unidiomatic (赢 takes an opponent/match, not 冠军). | `他居然得了冠军。` / `tā jū rán dé le guàn jūn.` |
| 7 | `bu-shi-er-shi` | 学生 pinyin `xué shēng`. | `xué sheng` |
| 8 | `suo-wei` | Example 1 en "A so-called friend is…" imports the doubtful tone of so-called into the defining use 所谓X，就是…; order prompt had the same wording. | "What we call a friend is someone who…"; order prompt → "What we call a friend is a person who can help you." |
| 9 | `suo-wei` | Fill `＿的好朋友，就是…` produced 所谓的…，就是…, exactly the form the point's own mistake list says to avoid. | Prompt → `＿好朋友，就是能一起吃苦的人。` |
| 10 | `ren-he-dou` | 困难 pinyin `kùn nán`; project list gives `kùn nan`. | `kùn nan` |
| 11 | `jian-zhi` | explanation_ja listed 「太…了」「像…一样」 as 否定表現. | Reworded: 「太…了」「像…一样」や「不敢相信」のような否定表現 |
| 12 | `dao` | 看起来 pinyin `qǐ lái`; project convention is `qǐ lai`. | `qǐ lai` |
| 13 | `fan-zheng` | Fill distractor 正好 also gives a grammatical sentence (你去不去都行，正好我要去). | Distractor → 即使 (ungrammatical here) |
| 14 | `yi-wei-zhu` | Example 4 `这个节目以年轻人为主` is ambiguous (programme consists of young people?). | `这个节目的观众以年轻人为主。` with pinyin, en "The audience of this programme is mainly young people.", ja この番組の視聴者は若者が中心です。 |
| 15 | `zai-kan-lai` | 学生 pinyin `xué shēng`. | `xué sheng` |
| 16 | `wu-lun-ru-he` | "It is the dignified cousin of 反正" (en + ja) equates two phrases with different meanings (反正 = "it makes no difference anyway"; 无论如何 = "no matter what, by all means"). | Replaced with a contrast sentence in en and ja |
| 17 | `jiu-er-yan` | Mistake claimed 对…而言 is non-standard; it is a standard, common frame. | Mistake replaced with "dropping 而 (就价格言) is not a sentence; 对…而言 is also fine" (en + ja) |
| 18 | `er-yi` | Mistake "Using 而已 without 只是/不过: the sentence loses its frame" was too strong (而已 without them is possible). | Softened to "normally echoes one of them; 我开个玩笑而已 sounds abrupt" (en + ja) |
| 19 | `lai-qu` | 还是 pinyin `hái shì` (ex 2, ex 3, produce answerPinyin); project list gives `hái shi`. | `hái shi` |
| 20 | `dong-bu-dong` | 动不动 pinyin `dòng bù dòng` (4 examples + produce answerPinyin); CEDICT gives neutral `dòng bu dòng`, matching how earlier levels write lexicalised 不 (来不及 `lái bu jí`). | `dòng bu dòng` |
| 21 | `nan-guai` | 怪不得 pinyin `guài bù de` (ex 2, ex 4); project list gives `guài bu de`. | `guài bu de` |
| 22 | `zong-zhi` | 聪明 pinyin `cōng míng`; project list gives `cōng ming`. | `cōng ming` |
| 23 | `he-kuang` | 大人 pinyin `dà rén` (ex 1, produce answerPinyin); CEDICT gives `dà ren`. | `dà ren` |
| 24 | `ning-ke` | 别人 pinyin `bié rén`. | `bié ren` |
| 25 | `fan-shi` | 学生 pinyin `xué shēng`. | `xué sheng` |
| 26 | `yu-qi-bu-ru` | 别人 pinyin `bié rén`. | `bié ren` |
| 27 | `yu-qi-bu-ru` | Fill distractor 其实 gives a grammatical sentence (其实坐在这里发愁不如去问问老师), so the answer was not unique. | Distractor → 宁可 (wrong: 宁可 pairs with 也不, not 不如) |
| 28 | `bu-jian-de` | Explanation (en + ja) said "unlike 未必 it can stand alone as an answer"; 未必 can too. | "like 未必 it can stand alone" (en + ja) |

## Counts

- Points reviewed: 56
- Points changed: 20
- Individual changes: 28 (explanation/mistake text: 7; example sentences/translations: 4; exercise prompts/distractors: 5; pinyin normalisation: 12)
- Points found fully correct: 36

## Checked and left as is

- Potential complements keep dictionary-tone 不 (`tīng bù jiàn`, `zhǎo bù dào`), matching HSK 3–4 sources; 一个人 `yī ge rén`, 那里 `nà lǐ` and 在我看来 `kàn lái` also follow the existing convention / CEDICT.
- All order exercises concatenate to their answer; every fill/choose answer is among its choices; every produce `answerPinyin` has one syllable per character (erhua merged).
- `随着时间的过去` (sui-zhe) is acceptable, if less idiomatic than 推移; left because 推移 is not on the HSK 5 list.
