// HSK 6 grammar points. Examples and exercises use only HSK 1–5 characters plus
// the HSK 6 characters taught by the end of the point's unit (see cache/hsk6-plan.txt).

export const GRAMMAR = [
  // ───────────────────────── Unit 1 ─────────────────────────
  { id: 'eryi', unit: 1, title: '…而已: that is all', title_ja: '…而已：…にすぎない',
    pattern: '(只是/不过/只不过) … 而已', summary: 'Playing something down: "merely, nothing more"', summary_ja: '「ただ…だけ」と軽く扱う',
    explanation: '而已 closes a sentence to say that what was mentioned is all there is: "that is all, nothing more". It is usually announced earlier by 只是, 不过 or 只不过, which makes the limiting tone clear. Compared with 罢了, which sounds a little dismissive and colloquial, 而已 is neutral and common in both speech and writing. It is often used to soften a statement or to play down one\'s own role.',
    explanation_ja: '「而已」は文末に置いて、「それだけのことだ、それ以上ではない」と範囲を限定します。多くの場合、前に「只是」「不过」「只不过」を置いて、限定の意味をはっきりさせます。「罢了」はやや投げやりで口語的ですが、「而已」は中立的で、話し言葉にも書き言葉にも使われます。主張をやわらげたり、自分の役割を控えめに言ったりするときによく使います。',
    ex: [
      ['我只是随便问问而已。', 'wǒ zhǐ shì suí biàn wèn wèn ér yǐ.', 'I was just asking casually, that is all.', '私はただ何となく聞いてみただけです。'],
      ['这不过是一个小小的事故而已。', 'zhè bù guò shì yī ge xiǎo xiǎo de shì gù ér yǐ.', 'This is merely a minor accident, nothing more.', 'これは小さな事故にすぎません。'],
      ['他只不过是个普通的成员而已，没有决定权。', 'tā zhǐ bù guò shì ge pǔ tōng de chéng yuán ér yǐ, méi yǒu jué dìng quán.', 'He is just an ordinary member; he has no power to decide.', '彼はただの一般メンバーにすぎず、決定権はありません。'],
      ['我说说而已，你别当真。', 'wǒ shuō shuō ér yǐ, nǐ bié dàng zhēn.', 'I am only saying it; do not take it seriously.', '言ってみただけですから、本気にしないでください。'],
    ],
    mistakes: ['Putting 而已 before the verb: it always ends the sentence.', 'Using 而已 to mean "already" (already is 已经).'],
    mistakes_ja: ['「而已」を動詞の前に置かないでください。必ず文末です。', '「もう…した」の意味ではありません。それは「已经」です。'],
    exercises: [
      { type: 'fill', prompt: '我只是想帮帮你＿。', answer: '而已', choices: ['而已', '已经', '不过'], why: '只是 … 而已 frames the help as nothing more than a small gesture.', why_ja: '「只是…而已」で「ちょっと手伝いたいだけ」と限定します。' },
      { type: 'choose', prompt: 'Which sentence means "It is just a cold, nothing serious"?', prompt_ja: '「ただの風邪で、大したことはない」はどれですか。', answer: '不过是感冒而已，没什么大问题。', choices: ['不过是感冒而已，没什么大问题。', '感冒已经不过，没什么大问题。', '而已感冒不过，没什么大问题。'], why: '不过是 … 而已 wraps the noun; 而已 stays at the end.', why_ja: '「不过是…而已」で名詞を挟み、「而已」は文末に置きます。' },
      { type: 'order', prompt: 'Make: "He only said a few words, that is all."', prompt_ja: '「彼はただ少し話しただけです」を作る', answer: '他只不过说了几句话而已', choices: ['他', '只不过', '说了', '几句话', '而已'], why: '只不过 precedes the verb phrase and 而已 closes it.', why_ja: '「只不过」は動詞句の前、「而已」は最後に置きます。' },
    ] },

  // ───────────────────────── Unit 2 ─────────────────────────
  { id: 'bingfei', unit: 2, title: '并非: it is not the case that', title_ja: '并非：決して…ではない',
    pattern: '并非 + N/V/Adj; 并非 … 而是 …', summary: 'Formal, emphatic negation 并不是', summary_ja: '書き言葉の強い否定「并不是」',
    explanation: '并非 is the written-register equivalent of 并不是: it denies something firmly, often correcting a wrong assumption. It can be followed directly by a noun, a verb phrase or an adjective, without 是. The correction frequently follows with 而是 ("but rather"). In speech you will hear 并不是 more often; 并非 belongs to essays, news and formal talk.',
    explanation_ja: '「并非」は「并不是」の書き言葉で、思い込みを正すように強く否定します。後ろには「是」を付けずに、名詞・動詞句・形容詞を直接続けられます。訂正の内容は「而是」（そうではなく…）で続けることが多いです。会話では「并不是」のほうがふつうで、「并非」は論説文やニュース、改まった話に使われます。',
    ex: [
      ['这并非我的本意。', 'zhè bìng fēi wǒ de běn yì.', 'This is not my intention at all.', 'これは決して私の本意ではありません。'],
      ['成功并非偶然，而是长期努力的结果。', 'chéng gōng bìng fēi ǒu rán, ér shì cháng qī nǔ lì de jié guǒ.', 'Success is no accident but the result of long effort.', '成功は偶然ではなく、長い努力の結果です。'],
      ['他并非不想去，只是没有时间。', 'tā bìng fēi bù xiǎng qù, zhǐ shì méi yǒu shí jiān.', 'It is not that he does not want to go; he simply has no time.', '彼は行きたくないのではなく、ただ時間がないだけです。'],
      ['这种疾病并非无法治疗。', 'zhè zhǒng jí bìng bìng fēi wú fǎ zhì liáo.', 'This disease is by no means untreatable.', 'この病気は決して治療できないわけではありません。'],
    ],
    mistakes: ['Writing 并非是: 非 already contains "is not", so 是 is redundant.', 'Using 并非 in casual chat where 并不是 or 不是 sounds natural.'],
    mistakes_ja: ['「并非是」とは書きません。「非」にすでに「…ではない」の意味があります。', 'くだけた会話では「并不是」「不是」が自然です。'],
    exercises: [
      { type: 'fill', prompt: '他的成功＿偶然。', answer: '并非', choices: ['并非', '并且', '非常'], why: '并非 negates 偶然 formally: his success was no accident.', why_ja: '「并非」で「偶然ではない」と改まって否定します。' },
      { type: 'choose', prompt: 'Which is correct?', prompt_ja: '正しい文はどれですか。', answer: '这并非易事。', choices: ['这并非易事。', '这并非是易事。', '这是并非易事。'], why: '并非 is followed directly by the predicate; no 是.', why_ja: '「并非」の後ろには「是」を付けずに述語を続けます。' },
      { type: 'produce', prompt: 'Say formally: "This is not what I meant, but rather a misunderstanding."', prompt_ja: '改まった言い方で「これは私の意図ではなく、誤解です」と言う', answer: '这并非我的意思，而是一个误会', answerPinyin: 'zhè bìng fēi wǒ de yì si, ér shì yī ge wù huì', why: '并非 … 而是 … states what is false and then what is true.', why_ja: '「并非…而是…」で、否定した後に正しい内容を示します。' },
    ] },

  // ───────────────────────── Unit 3 ─────────────────────────
  { id: 'yuyi-jiayi', unit: 3, title: '给予 / 予以 / 加以: formal verb support', title_ja: '给予・予以・加以：改まった動詞の支え',
    pattern: '给予 + N + 双音节V; 予以/加以 + 双音节V', summary: 'Formal "give (support)" and "carry out (an action on something)"', summary_ja: '「…を与える」「…を加える」の書き言葉表現',
    explanation: '给予 (jǐ yǔ) is the formal counterpart of 给: 给予帮助, 给予支持, 给予奖励. 予以 and 加以 take a two-syllable verb as their object and turn it into a formal action: 予以解决 "resolve", 加以说明 "explain". The thing acted on is placed in front of the sentence or introduced with 对 / 对于. 加以 stresses that something is done to an object already mentioned; 予以 is used when the subject grants or applies something. These are typical of official notices, reports and academic writing.',
    explanation_ja: '「给予」は「给」の書き言葉で、「给予帮助」「给予支持」「给予奖励」のように使います。「予以」「加以」は二音節の動詞を目的語にとり、「予以解决」「加以说明」のように改まった動作を表します。対象は文頭に置くか、「对／对于」で導きます。「加以」は前に述べた対象に処理を加えること、「予以」は主体が何かを与える・適用することを強調します。公的な通知、報告書、論文によく見られます。',
    ex: [
      ['公司决定给予他一定的奖励。', 'gōng sī jué dìng jǐ yǔ tā yī dìng de jiǎng lì.', 'The company decided to grant him a certain reward.', '会社は彼に一定の報酬を与えることにしました。'],
      ['对这些问题，我们将予以解决。', 'duì zhè xiē wèn tí, wǒ men jiāng yǔ yǐ jiě jué.', 'As for these problems, we will resolve them.', 'これらの問題については、私たちが解決いたします。'],
      ['这个方案还需要加以改进。', 'zhè ge fāng àn hái xū yào jiā yǐ gǎi jìn.', 'This plan still needs to be improved.', 'この案はまだ改善を加える必要があります。'],
      ['对于违反协议的行为，必须加以处理。', 'duì yú wéi fǎn xié yì de xíng wéi, bì xū jiā yǐ chǔ lǐ.', 'Actions that violate the agreement must be dealt with.', '協定に違反する行為には、必ず処理を加えなければなりません。'],
    ],
    mistakes: ['Following 予以 / 加以 with a single-syllable verb (加以看 is wrong; use 加以观察).', 'Placing the object after 加以: the object comes first, as in 对问题加以分析.'],
    mistakes_ja: ['「予以」「加以」の後ろに一音節の動詞は置けません（「加以看」は誤り、「加以观察」が正しい）。', '目的語は「加以」の後ではなく前に置きます（「对问题加以分析」）。'],
    exercises: [
      { type: 'fill', prompt: '对这个计划，大家应该＿讨论。', answer: '加以', choices: ['加以', '给予', '以后'], why: '加以 + 讨论: carry out a discussion on the plan.', why_ja: '「加以＋讨论」で計画について検討を加えます。' },
      { type: 'choose', prompt: 'Which sentence is correct formal usage?', prompt_ja: '改まった表現として正しいのはどれですか。', answer: '学校给予他很大的支持。', choices: ['学校给予他很大的支持。', '学校加以他很大的支持。', '学校予以他看。'], why: '给予 takes a recipient and a noun; 予以 / 加以 take only a two-syllable verb.', why_ja: '「给予」は相手と名詞をとり、「予以／加以」は二音節動詞だけをとります。' },
      { type: 'order', prompt: 'Make: "These suggestions will be given serious consideration."', prompt_ja: '「これらの提案は真剣に検討されます」を作る', answer: '这些建议将予以认真考虑', choices: ['这些建议', '将', '予以', '认真', '考虑'], why: 'Object first, then 将 予以 + adverb + verb.', why_ja: '対象を先に置き、「将予以＋副詞＋動詞」と続けます。' },
    ] },

  // ───────────────────────── Unit 4 ─────────────────────────
  { id: 'yu-formal', unit: 4, title: '于: formal 在 / 对 / 比', title_ja: '于：書き言葉の在・对・比',
    pattern: 'V + 于 + 场所/时间; Adj + 于 + N', summary: 'A literary preposition attached after a verb or adjective', summary_ja: '動詞・形容詞の後ろに付く文語の前置詞',
    explanation: '于 attaches directly after a verb or adjective and covers several colloquial prepositions. After verbs of place and time it means 在: 位于 "be located at", 生于 "be born in", 死于 "die of/in". After verbs of attitude it means 对 / 向: 有利于 "beneficial to", 忠于 "loyal to". After adjectives it means 比: 高于 "higher than", 低于 "lower than". Unlike 在 or 比, 于 never stands before the verb; the whole 于-phrase follows it, which gives the sentence a written flavour.',
    explanation_ja: '「于」は動詞や形容詞の直後に付き、いくつかの口語の前置詞に相当します。場所・時間の動詞の後では「在」の意味で、「位于」「生于」「死于」のように使います。態度を表す動詞の後では「对／向」の意味になり、「有利于」「忠于」などがあります。形容詞の後では「比」の意味で、「高于」「低于」と比較します。「在」「比」と違って動詞の前には置かず、「于」の句はつねに後ろに続くため、書き言葉らしい響きになります。',
    ex: [
      ['这座城市位于中国的南部。', 'zhè zuò chéng shì wèi yú zhōng guó de nán bù.', 'This city is located in the south of China.', 'この都市は中国の南部に位置しています。'],
      ['他生于上海，长于北京。', 'tā shēng yú shàng hǎi, zhǎng yú běi jīng.', 'He was born in Shanghai and grew up in Beijing.', '彼は上海に生まれ、北京で育ちました。'],
      ['今年的产量高于去年。', 'jīn nián de chǎn liàng gāo yú qù nián.', 'This year\'s output is higher than last year\'s.', '今年の生産量は昨年より高いです。'],
      ['这种做法不利于团结。', 'zhè zhǒng zuò fǎ bù lì yú tuán jié.', 'This practice is not conducive to unity.', 'このやり方は団結のためになりません。'],
    ],
    mistakes: ['Putting 于 before the verb like 在 (于北京位于 is wrong).', 'Using 于 in casual speech: 他住于上海 sounds stiff; say 他住在上海.'],
    mistakes_ja: ['「在」のように動詞の前に置かないでください。', 'くだけた会話で「他住于上海」と言うと硬すぎます。「他住在上海」が自然です。'],
    exercises: [
      { type: 'fill', prompt: '这家公司成立＿2005年。', answer: '于', choices: ['于', '在', '对'], why: '成立于 + year: founded in (formal 在).', why_ja: '「成立于＋年」で「…年に設立された」という書き言葉です。' },
      { type: 'choose', prompt: 'Which sentence means "The cost is lower than expected"?', prompt_ja: '「コストは予想より低い」はどれですか。', answer: '成本低于预期。', choices: ['成本低于预期。', '成本于低预期。', '成本比于预期低。'], why: 'Adj + 于 + N expresses comparison; 于 follows the adjective.', why_ja: '「形容詞＋于＋名詞」で比較を表し、「于」は形容詞の後に置きます。' },
      { type: 'produce', prompt: 'Say formally: "The hospital is located in the east of the city."', prompt_ja: '改まった言い方で「病院は市の東部に位置する」と言う', answer: '医院位于城市的东部', answerPinyin: 'yī yuàn wèi yú chéng shì de dōng bù', why: '位于 is the standard written way to give a location.', why_ja: '「位于」は場所を示す標準的な書き言葉です。' },
    ] },

  // ───────────────────────── Unit 5 ─────────────────────────
  { id: 'jibian', unit: 5, title: '即便…也: even if', title_ja: '即便…也：たとえ…でも',
    pattern: '即便 + 假设, (主语) 也 + …', summary: 'Hypothetical concession, more formal than 即使', summary_ja: '仮定の譲歩。「即使」より改まった言い方',
    explanation: '即便 introduces a supposed or extreme condition, and 也 in the second clause says that the result does not change. It means the same as 即使 and 就算 but is more formal and slightly more emphatic; 就算 is the most colloquial of the three. The condition can be real or imaginary. 即便 can also be followed by 如此 ("even so") to refer back to a situation just described.',
    explanation_ja: '「即便」は仮定の、あるいは極端な条件を提示し、後半の「也」で「それでも結果は変わらない」と述べます。「即使」「就算」と同じ意味ですが、より改まっていて、やや強調が強い言い方です。「就算」が最も口語的です。条件は事実でも想像でもかまいません。「即便如此」（そうであっても）の形で、直前の状況を受けることもできます。',
    ex: [
      ['即便遇到困难，我们也不会放弃。', 'jí biàn yù dào kùn nan, wǒ men yě bù huì fàng qì.', 'Even if we meet difficulties, we will not give up.', 'たとえ困難にあっても、私たちはあきらめません。'],
      ['即便他不来，会议也照常举行。', 'jí biàn tā bù lái, huì yì yě zhào cháng jǔ xíng.', 'Even if he does not come, the meeting will be held as usual.', 'たとえ彼が来なくても、会議は予定どおり行われます。'],
      ['工作很辛苦，即便如此，他也从不抱怨。', 'gōng zuò hěn xīn kǔ, jí biàn rú cǐ, tā yě cóng bù bào yuàn.', 'The work is hard; even so, he never complains.', '仕事はつらいですが、それでも彼は決して不平を言いません。'],
      ['即便是专家，也可能判断错误。', 'jí biàn shì zhuān jiā, yě kě néng pàn duàn cuò wù.', 'Even an expert may misjudge.', 'たとえ専門家であっても、判断を誤ることがあります。'],
    ],
    mistakes: ['Forgetting 也 in the main clause; it is what carries "still".', 'Using 即便 for a real reason (that is 既然 "since").'],
    mistakes_ja: ['主節の「也」を忘れないでください。「それでも」の意味を担います。', '事実の理由を述べるのは「既然」（…である以上）です。「即便」とは違います。'],
    exercises: [
      { type: 'fill', prompt: '＿下大雨，比赛也会按时开始。', answer: '即便', choices: ['即便', '既然', '尽管'], why: 'A hypothetical "even if it rains hard" needs 即便; 尽管 is for real facts.', why_ja: '仮定の「たとえ大雨でも」には「即便」です。「尽管」は事実に使います。' },
      { type: 'order', prompt: 'Make: "Even if I fail, I will try again."', prompt_ja: '「たとえ失敗しても、もう一度挑戦します」を作る', answer: '即便失败了我也要再试一次', choices: ['即便', '失败了', '我', '也要', '再试一次'], why: '即便 opens the condition; 也 goes after the subject of the result clause.', why_ja: '「即便」で条件を示し、「也」は結果の文の主語の後に置きます。' },
      { type: 'choose', prompt: 'Which sentence uses 即便如此 correctly?', prompt_ja: '「即便如此」の使い方が正しいのはどれですか。', answer: '价格很高，即便如此，还是有很多人买。', choices: ['价格很高，即便如此，还是有很多人买。', '即便如此价格很高，很多人买。', '价格即便如此很高，很多人买。'], why: '即便如此 stands at the start of the second clause and refers back to the first.', why_ja: '「即便如此」は後半の文頭に置き、前の内容を受けます。' },
    ] },

  // ───────────────────────── Unit 7 ─────────────────────────
  { id: 'jianyu', unit: 7, title: '鉴于 / 基于: in view of, based on', title_ja: '鉴于・基于：…に鑑みて、…に基づいて',
    pattern: '鉴于 + 情况, …; 基于 + 理由/原则, …', summary: 'Formal openers that give the grounds for a decision', summary_ja: '決定の根拠を示す改まった文頭表現',
    explanation: '鉴于 ("in view of") opens a sentence with a situation that has been taken into account, and the main clause states the decision or conclusion that follows from it. 基于 ("based on") introduces the principle, data or reason that something rests on. Both are written-register prepositions typical of announcements, reports and academic prose; in conversation 考虑到 or 因为 would be used. 鉴于 is often followed by a longer clause, while 基于 usually takes a noun phrase.',
    explanation_ja: '「鉴于」（…に鑑みて）は考慮した状況を文頭で示し、主節でそれに基づく決定や結論を述べます。「基于」（…に基づいて）は、物事のよりどころとなる原則・データ・理由を導きます。どちらも通知、報告書、論文に典型的な書き言葉の前置詞で、会話では「考虑到」や「因为」を使います。「鉴于」は比較的長い節を、「基于」はふつう名詞句を後ろにとります。',
    ex: [
      ['鉴于目前的情况，会议推迟到下周举行。', 'jiàn yú mù qián de qíng kuàng, huì yì tuī chí dào xià zhōu jǔ xíng.', 'In view of the current situation, the meeting is postponed to next week.', '現在の状況に鑑み、会議は来週に延期されます。'],
      ['鉴于他的表现，公司决定给予奖励。', 'jiàn yú tā de biǎo xiàn, gōng sī jué dìng jǐ yǔ jiǎng lì.', 'In view of his performance, the company decided to grant a reward.', '彼の働きぶりに鑑み、会社は報酬を与えることにしました。'],
      ['基于以上的分析，我们提出了三点建议。', 'jī yú yǐ shàng de fēn xī, wǒ men tí chū le sān diǎn jiàn yì.', 'Based on the above analysis, we put forward three suggestions.', '以上の分析に基づき、私たちは三つの提案を行いました。'],
      ['这个结论是基于大量数据得出的。', 'zhè ge jié lùn shì jī yú dà liàng shù jù dé chū de.', 'This conclusion was reached on the basis of a large amount of data.', 'この結論は大量のデータに基づいて導かれたものです。'],
    ],
    mistakes: ['Using 鉴于 in casual speech: 鉴于我累了 sounds like a legal notice.', 'Ending the sentence after 鉴于 + situation; a main clause with the decision must follow.'],
    mistakes_ja: ['くだけた会話で「鉴于我累了」と言うと公的な通知のように聞こえます。', '「鉴于＋状況」だけで文を終えないでください。決定を述べる主節が必要です。'],
    exercises: [
      { type: 'fill', prompt: '＿天气恶劣，所有航班取消。', answer: '鉴于', choices: ['鉴于', '对于', '由于…所以'], why: '鉴于 formally presents the circumstance that led to the cancellation.', why_ja: '「鉴于」で欠航の原因となった状況を改まって示します。' },
      { type: 'choose', prompt: 'Which sentence means "The decision is based on facts"?', prompt_ja: '「この決定は事実に基づいている」はどれですか。', answer: '这个决定是基于事实做出的。', choices: ['这个决定是基于事实做出的。', '这个决定基于是事实做出。', '基于这个决定做出事实。'], why: '是 … 基于 N … 的 frames the basis of the decision.', why_ja: '「是…基于＋名詞…的」で決定の根拠を示します。' },
      { type: 'order', prompt: 'Make: "In view of this, we have adjusted the plan."', prompt_ja: '「これに鑑み、私たちは計画を調整しました」を作る', answer: '鉴于此我们调整了计划', choices: ['鉴于', '此', '我们', '调整了', '计划'], why: '鉴于此 is a fixed written opener meaning "in view of this".', why_ja: '「鉴于此」は「これに鑑みて」という決まった書き言葉です。' },
    ] },

  // ───────────────────────── Unit 8 ─────────────────────────
  { id: 'yi-formal', unit: 8, title: '以: formal 用 / 因 / 把', title_ja: '以：書き言葉の用・因・把',
    pattern: '以 + N + V; 以 + N + 为 + N; 足以 + V', summary: 'A literary preposition for means, reason and standard', summary_ja: '手段・理由・基準を表す文語の前置詞',
    explanation: '以 is the written form of 用 ("by means of"): 以英语交流 "communicate in English", 以最快的速度 "at top speed". It also gives a reason in set phrases such as 以此为理由, and the pattern 以 A 为 B means "take A as B": 以客户为中心 "customer-centred". 足以 + verb means "enough to", and 以…的方式 is "in the manner of". Because 以 is literary, it is paired with two-syllable, formal verbs rather than with everyday ones.',
    explanation_ja: '「以」は「用」（…を用いて）の書き言葉で、「以英语交流」「以最快的速度」のように使います。「以此为理由」のように理由を表す慣用句もあり、「以A为B」はAをBとみなす・Bとするという意味です（「以客户为中心」）。「足以＋動詞」は「…するのに十分だ」、「以…的方式」は「…の方法で」です。「以」は文語なので、日常的な動詞よりも二音節の改まった動詞と組み合わせます。',
    ex: [
      ['我们应该以事实为依据。', 'wǒ men yīng gāi yǐ shì shí wéi yī jù.', 'We should take the facts as our basis.', '私たちは事実を根拠とすべきです。'],
      ['他以优异的成绩毕业。', 'tā yǐ yōu yì de chéng jì bì yè.', 'He graduated with outstanding results.', '彼は優秀な成績で卒業しました。'],
      ['这些证据足以证明他是清白的。', 'zhè xiē zhèng jù zú yǐ zhèng míng tā shì qīng bái de.', 'This evidence is enough to prove that he is innocent.', 'これらの証拠は、彼が潔白であることを証明するのに十分です。'],
      ['公司以合理的价格提供服务。', 'gōng sī yǐ hé lǐ de jià gé tí gōng fú wù.', 'The company provides services at a reasonable price.', '会社は適正な価格でサービスを提供しています。'],
    ],
    mistakes: ['Writing 以 + verb directly: 以用 is wrong; 以 takes a noun phrase.', 'Confusing 足以 ("enough to") with 足够 ("enough", an adjective).'],
    mistakes_ja: ['「以」の直後に動詞は置きません（「以用」は誤り）。名詞句をとります。', '「足以」（…するに足る）と形容詞の「足够」（十分だ）を混同しないでください。'],
    exercises: [
      { type: 'fill', prompt: '学校一直＿学生为中心。', answer: '以', choices: ['以', '用', '把'], why: '以 … 为中心 is the fixed formal pattern "centred on".', why_ja: '「以…为中心」は「…を中心とする」の決まった書き言葉です。' },
      { type: 'choose', prompt: 'Which sentence means "This amount is enough to cover the cost"?', prompt_ja: '「この金額はコストをまかなうのに十分だ」はどれですか。', answer: '这笔钱足以支付成本。', choices: ['这笔钱足以支付成本。', '这笔钱足够以支付成本。', '这笔钱以足支付成本。'], why: '足以 + verb: enough to pay.', why_ja: '「足以＋動詞」で「…するのに十分だ」です。' },
      { type: 'produce', prompt: 'Say formally: "He answered in fluent Chinese."', prompt_ja: '改まった言い方で「彼は流暢な中国語で答えた」と言う', answer: '他以流利的中文回答', answerPinyin: 'tā yǐ liú lì de zhōng wén huí dá', why: '以 + means + verb replaces 用 in writing.', why_ja: '「以＋手段＋動詞」は書き言葉で「用」の代わりになります。' },
    ] },

  // ───────────────────────── Unit 10 ─────────────────────────
  { id: 'yuqishuo', unit: 10, title: '与其说…不如说: rather than A, B', title_ja: '与其说…不如说：AというよりむしろB',
    pattern: '与其说 A, 不如说 B; 与其 A, 宁愿/不如 B', summary: 'Choosing the better description or the lesser evil', summary_ja: 'より適切な言い方、あるいはましな選択を示す',
    explanation: '与其说 A, 不如说 B compares two descriptions and declares the second more accurate: "it is not so much A as B". The simpler 与其 A, 不如 B compares two courses of action and prefers the second; 宁愿 / 宁可 can replace 不如 to stress a willing choice of the lesser evil: 与其坐着等, 宁愿自己去找. The B clause can be strengthened with 还 or 倒 (不如 / 倒不如). Both patterns are common in argumentative writing and reflective speech.',
    explanation_ja: '「与其说A，不如说B」は二つの言い方を比べ、後者のほうが正確だと述べます（AというよりむしろB）。より単純な「与其A，不如B」は二つの行動を比べて後者を選びます。「不如」の代わりに「宁愿／宁可」を使うと、ましなほうを進んで選ぶ気持ちが強まります（「与其坐着等，宁愿自己去找」）。Bの節は「还不如」「倒不如」のように強めることができます。どちらも論説文や思慮深い話し方によく使われます。',
    ex: [
      ['与其说他懒，不如说他没有动力。', 'yǔ qí shuō tā lǎn, bù rú shuō tā méi yǒu dòng lì.', 'It is not so much that he is lazy as that he lacks motivation.', '彼は怠け者というより、むしろやる気がないのです。'],
      ['与其说这是一次失败，不如说这是一次学习。', 'yǔ qí shuō zhè shì yī cì shī bài, bù rú shuō zhè shì yī cì xué xí.', 'Rather than a failure, this was a learning experience.', 'これは失敗というより、むしろ学びの機会でした。'],
      ['与其在家等消息，不如自己去问问。', 'yǔ qí zài jiā děng xiāo xi, bù rú zì jǐ qù wèn wèn.', 'Rather than waiting at home for news, better go and ask yourself.', '家で知らせを待つより、自分で聞きに行くほうがいいです。'],
      ['与其让别人决定，我宁愿自己承担责任。', 'yǔ qí ràng bié ren jué dìng, wǒ nìng yuàn zì jǐ chéng dān zé rèn.', 'Rather than let others decide, I would prefer to take responsibility myself.', '他人に決めさせるくらいなら、私は自分で責任を負うほうがいいです。'],
    ],
    mistakes: ['Using 与其 alone without 不如 / 宁愿 in the second clause.', 'Reversing the preference: the clause after 不如 is the one chosen.'],
    mistakes_ja: ['「与其」だけで、後半に「不如／宁愿」がない文は不完全です。', '選ばれるのは「不如」の後ろの内容です。逆にしないでください。'],
    exercises: [
      { type: 'fill', prompt: '与其说他是老师，＿说他是朋友。', answer: '不如', choices: ['不如', '宁愿', '不但'], why: '与其说 … 不如说 … picks "friend" as the better description.', why_ja: '「与其说…不如说…」で「友だち」のほうがふさわしいと述べます。' },
      { type: 'order', prompt: 'Make: "Rather than complain, it is better to find a solution."', prompt_ja: '「不平を言うより、解決策を探すほうがいい」を作る', answer: '与其抱怨不如寻找解决办法', choices: ['与其', '抱怨', '不如', '寻找', '解决办法'], why: '与其 + rejected option, 不如 + preferred option.', why_ja: '「与其＋退ける選択、不如＋選ぶ選択」の順です。' },
      { type: 'produce', prompt: 'Say: "Rather than wait, I would rather go now."', prompt_ja: '「待つくらいなら、今行くほうがましです」と言う', answer: '与其等待，我宁愿现在就去', answerPinyin: 'yǔ qí děng dài, wǒ nìng yuàn xiàn zài jiù qù', why: '宁愿 in the second clause expresses the willing choice.', why_ja: '後半の「宁愿」で、進んで選ぶ気持ちを表します。' },
    ] },

  // ───────────────────────── Unit 11 ─────────────────────────
  { id: 'yibian', unit: 11, title: '以便: so that', title_ja: '以便：…できるように',
    pattern: 'A, 以便 + B(目的)', summary: 'Purpose clause stating what A makes possible', summary_ja: 'Aによって可能になる目的を述べる',
    explanation: '以便 joins two clauses: the first is an action, the second the purpose that it makes convenient or possible. It translates as "so that, in order to" and is more formal than 为了 or 好 (好让). Unlike 为了, which usually opens the sentence, 以便 stands at the start of the second clause. Its negative counterpart is 以免 "so as to avoid", taught later.',
    explanation_ja: '「以便」は二つの節をつなぎ、前半の行動によって便利になる・可能になる目的を後半で述べます。「…できるように、…するために」にあたり、「为了」や「好（好让）」より改まった表現です。文頭に置くことが多い「为了」と違い、「以便」は後半の節の頭に置きます。否定の相手は「以免」（…しないように）で、後の課で学びます。',
    ex: [
      ['请留下电话号码，以便我们联系您。', 'qǐng liú xià diàn huà hào mǎ, yǐ biàn wǒ men lián xì nín.', 'Please leave your phone number so that we can contact you.', 'ご連絡できるように、電話番号を残してください。'],
      ['他提前到达，以便熟悉环境。', 'tā tí qián dào dá, yǐ biàn shú xī huán jìng.', 'He arrived early so as to get familiar with the surroundings.', '彼は環境に慣れるために、早めに到着しました。'],
      ['资料请按日期整理，以便查找。', 'zī liào qǐng àn rì qī zhěng lǐ, yǐ biàn chá zhǎo.', 'Please sort the materials by date for easy searching.', '探しやすいように、資料は日付順に整理してください。'],
      ['我把地址写在卡片上，以便你记住。', 'wǒ bǎ dì zhǐ xiě zài kǎ piàn shàng, yǐ biàn nǐ jì zhu.', 'I wrote the address on the card so that you can remember it.', 'あなたが覚えられるように、住所をカードに書きました。'],
    ],
    mistakes: ['Opening the sentence with 以便 (that position belongs to 为了).', 'Using 以便 for something to avoid; that is 以免.'],
    mistakes_ja: ['「以便」で文を始めないでください。文頭は「为了」の位置です。', '避けたいことには「以便」ではなく「以免」を使います。'],
    exercises: [
      { type: 'fill', prompt: '请把问题写清楚，＿我们尽快回答。', answer: '以便', choices: ['以便', '以免', '为了'], why: 'Writing clearly makes a quick answer possible: 以便.', why_ja: 'はっきり書くことで素早い回答が可能になるので「以便」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '我们早点出发，以便赶上第一班车。', choices: ['我们早点出发，以便赶上第一班车。', '以便赶上第一班车，我们早点出发。', '我们以便早点出发赶上第一班车。'], why: '以便 begins the second clause, after the action.', why_ja: '「以便」は行動を述べた後、後半の節の頭に置きます。' },
      { type: 'produce', prompt: 'Say: "Please speak slowly so that everyone can understand."', prompt_ja: '「みんなが理解できるように、ゆっくり話してください」と言う', answer: '请说慢一点，以便大家都能听懂', answerPinyin: 'qǐng shuō màn yī diǎn, yǐ biàn dà jiā dōu néng tīng dǒng', why: 'Request + 以便 + purpose.', why_ja: '「依頼＋以便＋目的」の形です。' },
    ] },

  // ───────────────────────── Unit 12 ─────────────────────────
  { id: 'zhi', unit: 12, title: '之: literary 的', title_ja: '之：文語の「的」',
    pattern: 'N + 之 + N; …之一; …之后/之前/之中', summary: 'The classical attributive particle in set phrases', summary_ja: '決まった表現に残る古典の連体助詞',
    explanation: '之 is the classical equivalent of 的 and survives in many fixed expressions. The most frequent are …之一 "one of", …之后 / 之前 / 之中 / 之间 "after / before / among / between", and fractions like 三分之一 "one third". In writing it also links a noun and a noun in four-character or formal phrases: 成功之路 "the road to success", 人生之乐 "the joys of life". It is never used for ordinary attributives in speech; 我之书 is wrong, 我的书 is right.',
    explanation_ja: '「之」は「的」にあたる古典語で、多くの決まった表現に残っています。最も多いのは「…之一」（…の一つ）、「…之后／之前／之中／之间」、そして「三分之一」のような分数です。書き言葉では「成功之路」「人生之乐」のように、名詞と名詞を結ぶ四字句や改まった句にも使います。話し言葉のふつうの連体修飾には使いません（「我之书」は誤り、「我的书」が正しい）。',
    ex: [
      ['长城是世界著名的建筑之一。', 'cháng chéng shì shì jiè zhù míng de jiàn zhù zhī yī.', 'The Great Wall is one of the world\'s famous structures.', '万里の長城は世界的に有名な建築物の一つです。'],
      ['会议之后，我们一起吃了晚饭。', 'huì yì zhī hòu, wǒ men yī qǐ chī le wǎn fàn.', 'After the meeting we had dinner together.', '会議の後、私たちは一緒に夕食をとりました。'],
      ['大约三分之二的学生通过了考试。', 'dà yuē sān fēn zhī èr de xué sheng tōng guò le kǎo shì.', 'About two thirds of the students passed the exam.', '学生の約三分の二が試験に合格しました。'],
      ['这是一条通往成功之路。', 'zhè shì yī tiáo tōng wǎng chéng gōng zhī lù.', 'This is a road leading to success.', 'これは成功へ通じる道です。'],
    ],
    mistakes: ['Replacing everyday 的 with 之: 很大之房子 is wrong.', 'Writing 之 after a verb phrase; it links nouns.'],
    mistakes_ja: ['日常の「的」を「之」に置き換えないでください（「很大之房子」は誤り）。', '「之」は名詞と名詞を結びます。動詞句の後には置きません。'],
    exercises: [
      { type: 'fill', prompt: '他是我最好的朋友＿一。', answer: '之', choices: ['之', '的', '其'], why: '…之一 "one of" is a fixed phrase.', why_ja: '「…之一」（…の一つ）は決まった表現です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '四分之一的人反对这个计划。', choices: ['四分之一的人反对这个计划。', '四分的一之人反对这个计划。', '四之分一的人反对这个计划。'], why: 'Fractions follow the pattern 分母 分之 分子.', why_ja: '分数は「分母＋分之＋分子」の順です。' },
      { type: 'order', prompt: 'Make: "Between the two of us there are no secrets."', prompt_ja: '「私たち二人の間には秘密がありません」を作る', answer: '我们两人之间没有秘密', choices: ['我们', '两人', '之间', '没有', '秘密'], why: '之间 attaches to the noun phrase it relates to.', why_ja: '「之间」は関係する名詞句の後に付けます。' },
    ] },

  // ───────────────────────── Unit 13 ─────────────────────────
  { id: 'qi', unit: 13, title: '其: formal 他的 / 那个', title_ja: '其：書き言葉の「他的」「その」',
    pattern: '其 + N; 其中; 其他; 其实', summary: 'A written third-person possessive and demonstrative', summary_ja: '書き言葉の三人称の所有・指示',
    explanation: '其 stands for 他的 / 她的 / 它的 / 他们的 or "that, those" in written Chinese: 其原因 "its cause", 其成员 "its members". It refers back to something already mentioned and cannot start a text. Common compounds are 其中 "among them", 其他 / 其余 "the others", 其实 "in fact", 尤其 "especially", and the fixed 名副其实 "live up to its name". Use it in reports and essays; in speech prefer 他的 / 它的.',
    explanation_ja: '「其」は書き言葉で「他的／她的／它的／他们的」や「その、それらの」にあたります（「其原因」「其成员」）。すでに述べたものを指すので、文章の冒頭には使えません。「其中」（その中で）、「其他／其余」（そのほか）、「其实」（実は）、「尤其」（とりわけ）、「名副其实」（名実ともに）などの複合語がよく使われます。報告書や論説文で用い、会話では「他的／它的」が自然です。',
    ex: [
      ['这个协会有五百名成员，其中一半是学生。', 'zhè ge xié huì yǒu wǔ bǎi míng chéng yuán, qí zhōng yī bàn shì xué sheng.', 'This association has five hundred members, half of whom are students.', 'この協会には五百名の会員がおり、その半数は学生です。'],
      ['他离开公司，其原因至今不明。', 'tā lí kāi gōng sī, qí yuán yīn zhì jīn bù míng.', 'He left the company; the reason remains unknown.', '彼は会社を去りましたが、その理由は今も不明です。'],
      ['报告指出了问题，但没有说明其来源。', 'bào gào zhǐ chū le wèn tí, dàn méi yǒu shuō míng qí lái yuán.', 'The report pointed out the problem but did not explain its source.', '報告は問題を指摘しましたが、その出所は説明していません。'],
      ['这家饭店名副其实，菜确实好吃。', 'zhè jiā fàn diàn míng fù qí shí, cài què shí hǎo chī.', 'This restaurant lives up to its name; the food really is good.', 'このレストランは名実ともに、料理が本当においしいです。'],
    ],
    mistakes: ['Using 其 as a subject pronoun ("he") in modern prose; it is possessive or demonstrative.', 'Starting a paragraph with 其 when nothing has been mentioned yet.'],
    mistakes_ja: ['現代文で「其」を主語の「彼」として使わないでください。所有・指示の用法です。', 'まだ何も述べていない段落の冒頭に「其」は使えません。'],
    exercises: [
      { type: 'fill', prompt: '我买了三本书，＿中一本是词典。', answer: '其', choices: ['其', '之', '那'], why: '其中 "among them" refers back to the three books.', why_ja: '「其中」は前に述べた三冊の本を受けて「その中で」です。' },
      { type: 'choose', prompt: 'Which sentence means "The company announced its new plan"?', prompt_ja: '「会社はその新しい計画を発表した」はどれですか。', answer: '公司公布了其新计划。', choices: ['公司公布了其新计划。', '其公司公布了新计划。', '公司其公布了新计划。'], why: '其 precedes the noun it possesses.', why_ja: '「其」は所有する名詞の前に置きます。' },
      { type: 'produce', prompt: 'Write formally: "Each product has its advantages."', prompt_ja: '書き言葉で「どの製品にもその長所がある」と書く', answer: '每种产品都有其优点', answerPinyin: 'měi zhǒng chǎn pǐn dōu yǒu qí yōu diǎn', why: '其 replaces 它的 in formal writing.', why_ja: '改まった文章では「其」が「它的」の代わりになります。' },
    ] },

  // ───────────────────────── Unit 14 ─────────────────────────
  { id: 'buzhi', unit: 14, title: '不止 / 不只: more than, not only', title_ja: '不止・不只：…にとどまらない、…だけでなく',
    pattern: '不止 + 数量; 不只 … 还/也 …', summary: 'Exceeding a number vs. "not only"', summary_ja: '数量を超えること、「…だけでなく」',
    explanation: '不止 means "not stopping at, more than" and goes before a number or quantity: 不止一次 "more than once", 不止三年 "over three years". 不只 means "not only" and works like 不但 / 不仅, with 还, 也 or 而且 in the second clause: 不只他, 我们也去 "not only he, we are going too". Because they sound the same, learners mix them up; remember 止 "stop" for quantities and 只 "only" for "not only". 不止 can also stand alone after a verb: 大笑不止 "laugh without stopping".',
    explanation_ja: '「不止」は「…で止まらない、…以上」の意味で、数量の前に置きます（「不止一次」「不止三年」）。「不只」は「…だけでなく」で、「不但／不仅」と同じように後半に「还」「也」「而且」を伴います（「不只他，我们也去」）。同音なので混同しやすいですが、数量には「止」（止まる）、「…だけでなく」には「只」（だけ）と覚えてください。「不止」は「大笑不止」のように動詞の後に置いて「止まらない」を表すこともあります。',
    ex: [
      ['我提醒过他不止一次。', 'wǒ tí xǐng guò tā bù zhǐ yī cì.', 'I have reminded him more than once.', '私は彼に一度ならず注意しました。'],
      ['参加的人不止一百个。', 'cān jiā de rén bù zhǐ yī bǎi ge.', 'More than a hundred people took part.', '参加者は百人にとどまりませんでした。'],
      ['不只孩子喜欢，大人也喜欢这个节目。', 'bù zhǐ hái zi xǐ huan, dà ren yě xǐ huan zhè ge jié mù.', 'Not only children but adults like this programme too.', '子どもだけでなく、大人もこの番組が好きです。'],
      ['他不只会说英语，还会说法语。', 'tā bù zhǐ huì shuō yīng yǔ, hái huì shuō fǎ yǔ.', 'He not only speaks English but also French.', '彼は英語だけでなく、フランス語も話せます。'],
    ],
    mistakes: ['Writing 不只一次 for "more than once"; quantities take 不止.', 'Leaving out 还 / 也 after 不只: the second clause needs it.'],
    mistakes_ja: ['「一度ならず」は「不止一次」です。数量には「不止」を使います。', '「不只」の後半には「还／也」が必要です。'],
    exercises: [
      { type: 'fill', prompt: '这个问题我想了＿一天。', answer: '不止', choices: ['不止', '不只', '不但'], why: 'Before a quantity (一天) the word is 不止 "more than".', why_ja: '数量（一天）の前なので「不止」（…以上）です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '他不只是我的老师，还是我的朋友。', choices: ['他不只是我的老师，还是我的朋友。', '他不止是我的老师，一个我的朋友。', '他不只是我的老师，三个朋友。'], why: '不只 … 还 … expresses "not only … but also".', why_ja: '「不只…还…」で「…だけでなく…も」を表します。' },
      { type: 'produce', prompt: 'Say: "I have been to Beijing more than three times."', prompt_ja: '「私は北京に三回以上行ったことがあります」と言う', answer: '我去过北京不止三次', answerPinyin: 'wǒ qù guò běi jīng bù zhǐ sān cì', why: '不止 + 三次 exceeds the number.', why_ja: '「不止＋三次」で回数を超えることを表します。' },
    ] },

  // ───────────────────────── Unit 15 ─────────────────────────
  { id: 'zongran', unit: 15, title: '纵然 / 哪怕 / 尽管: concession review', title_ja: '纵然・哪怕・尽管：譲歩の総まとめ',
    pattern: '纵然/哪怕 + 假设, 也 …; 尽管 + 事实, 还是/仍然 …', summary: 'Hypothetical vs. factual concession, formal to colloquial', summary_ja: '仮定の譲歩と事実の譲歩、改まった語から口語まで',
    explanation: 'Chinese separates two kinds of concession. Hypothetical ("even if") uses 即使 / 即便 / 哪怕 / 就算, and the literary 纵然 or 纵使, always with 也 in the main clause. Factual ("although") uses 虽然 / 尽管, with 但是 / 还是 / 仍然 / 却 in the main clause. 哪怕 is colloquial and often precedes a small or extreme amount: 哪怕一分钟; 纵然 is written and solemn. 尽管 can also be an adverb meaning "feel free to": 有问题尽管问.',
    explanation_ja: '中国語の譲歩は二種類に分かれます。仮定の譲歩（たとえ…でも）には「即使／即便／哪怕／就算」や、文語の「纵然／纵使」を使い、主節には必ず「也」を置きます。事実の譲歩（…ではあるが）には「虽然／尽管」を使い、主節に「但是／还是／仍然／却」を置きます。「哪怕」は口語的で、「哪怕一分钟」のように小さな量や極端な量の前によく置かれます。「纵然」は書き言葉で重々しい響きです。「尽管」には「遠慮なく…してよい」という副詞の用法もあります（「有问题尽管问」）。',
    ex: [
      ['纵然前面有再多的困难，我们也要坚持下去。', 'zòng rán qián miàn yǒu zài duō de kùn nan, wǒ men yě yào jiān chí xià qù.', 'Even if there are ever so many difficulties ahead, we must keep going.', 'たとえ行く手にどれほど困難があっても、私たちは続けなければなりません。'],
      ['哪怕只有一点希望，也不能放弃。', 'nǎ pà zhǐ yǒu yī diǎn xī wàng, yě bù néng fàng qì.', 'Even if there is only a little hope, we must not give up.', 'たとえわずかな希望しかなくても、あきらめてはいけません。'],
      ['尽管他很累，还是坚持完成了工作。', 'jǐn guǎn tā hěn lèi, hái shi jiān chí wán chéng le gōng zuò.', 'Although he was very tired, he still finished the work.', '彼はとても疲れていましたが、それでも仕事をやり遂げました。'],
      ['有什么需要，尽管告诉我。', 'yǒu shén me xū yào, jǐn guǎn gào su wǒ.', 'Whatever you need, just tell me.', '必要なものがあれば、遠慮なく言ってください。'],
    ],
    mistakes: ['Using 尽管 for a hypothesis: 尽管明天下雨 should be 即使明天下雨.', 'Pairing 纵然 with 但是 instead of 也.'],
    mistakes_ja: ['仮定に「尽管」は使えません。「尽管明天下雨」ではなく「即使明天下雨」です。', '「纵然」の相手は「但是」ではなく「也」です。'],
    exercises: [
      { type: 'fill', prompt: '＿他已经道歉了，我还是很生气。', answer: '尽管', choices: ['尽管', '纵然', '哪怕'], why: 'He really did apologize: a fact, so 尽管 … 还是.', why_ja: '彼が謝ったのは事実なので「尽管…还是」です。' },
      { type: 'choose', prompt: 'Which sentence is a correct hypothetical concession?', prompt_ja: '仮定の譲歩として正しいのはどれですか。', answer: '哪怕失败一百次，我也不放弃。', choices: ['哪怕失败一百次，我也不放弃。', '哪怕失败一百次，但是我不放弃。', '尽管失败一百次，我也会放弃。'], why: '哪怕 … 也 is the correct pair; 但是 belongs with 虽然.', why_ja: '「哪怕…也」が正しい組み合わせです。「但是」は「虽然」の相手です。' },
      { type: 'order', prompt: 'Make: "Even if the price is very high, I will buy it."', prompt_ja: '「たとえ値段がとても高くても、私は買います」を作る', answer: '纵然价格很高我也要买', choices: ['纵然', '价格很高', '我', '也要', '买'], why: '纵然 + condition, subject + 也要 + verb.', why_ja: '「纵然＋条件、主語＋也要＋動詞」の順です。' },
    ] },

  // ───────────────────────── Unit 16 ─────────────────────────
  { id: 'buxi', unit: 16, title: '不惜: not hesitate to', title_ja: '不惜：…を惜しまない',
    pattern: '不惜 + 代价/一切 + V; 不惜 + V', summary: 'Willing to pay any price for a goal', summary_ja: '目的のためにどんな代償も惜しまない',
    explanation: '不惜 means "not to grudge, not to shrink from": the subject is willing to spend, lose or do something costly in order to reach a goal. It is usually followed by 一切代价 "any price", 一切 "everything", or a verb phrase describing the sacrifice: 不惜牺牲自己. The goal is often stated first with 为了. The tone is strong and sometimes critical (不惜撒谎 "did not even shrink from lying"). It belongs to the written and news register.',
    explanation_ja: '「不惜」は「惜しまない、ためらわない」という意味で、目的を達成するために、費用や損失、代償を進んで引き受けることを表します。多くは「一切代价」「一切」、あるいは犠牲を表す動詞句を後ろにとります（「不惜牺牲自己」）。目的はしばしば「为了」で先に示します。語気は強く、「不惜撒谎」（嘘をつくことさえ厭わない）のように批判的に使うこともあります。書き言葉やニュースの表現です。',
    ex: [
      ['为了救孩子，他不惜牺牲自己的生命。', 'wèi le jiù hái zi, tā bù xī xī shēng zì jǐ de shēng mìng.', 'To save the child, he did not hesitate to sacrifice his own life.', '子どもを救うために、彼は自分の命を犠牲にすることも厭いませんでした。'],
      ['公司不惜一切代价保护客户的信息。', 'gōng sī bù xī yī qiè dài jià bǎo hù kè hù de xìn xī.', 'The company spares no cost to protect its customers\' information.', '会社はどんな代償を払ってでも顧客の情報を守ります。'],
      ['他为了赢，不惜违反规则。', 'tā wèi le yíng, bù xī wéi fǎn guī zé.', 'In order to win, he did not shrink from breaking the rules.', '彼は勝つために、規則を破ることさえ厭いませんでした。'],
      ['她不惜花大量时间练习。', 'tā bù xī huā dà liàng shí jiān liàn xí.', 'She did not begrudge spending a great deal of time practising.', '彼女は多くの時間を練習に費やすことを惜しみませんでした。'],
    ],
    mistakes: ['Using 不惜 for an ordinary wish ("do not mind"); it implies real cost or risk.', 'Writing 不惜 without an object or verb phrase after it.'],
    mistakes_ja: ['「かまわない」程度の軽い気持ちには使いません。実際の代償や危険を伴います。', '「不惜」の後には必ず目的語や動詞句が必要です。'],
    exercises: [
      { type: 'fill', prompt: '为了成功，他＿一切代价。', answer: '不惜', choices: ['不惜', '不禁', '可惜'], why: '不惜一切代价 "at any cost" is the set phrase.', why_ja: '「不惜一切代价」（どんな代償を払っても）は決まった表現です。' },
      { type: 'order', prompt: 'Make: "To protect the environment, the city did not hesitate to close the factory."', prompt_ja: '「環境を守るため、市は工場を閉鎖することも厭わなかった」を作る', answer: '为了保护环境市政府不惜关闭工厂', choices: ['为了保护环境', '市政府', '不惜', '关闭', '工厂'], why: '为了 + goal, subject + 不惜 + costly action.', why_ja: '「为了＋目的、主語＋不惜＋代償を伴う行動」の順です。' },
      { type: 'produce', prompt: 'Say: "He would spare no effort to help his friend."', prompt_ja: '「彼は友人を助けるためにどんな努力も惜しまない」と言う', answer: '他为了帮助朋友不惜付出一切', answerPinyin: 'tā wèi le bāng zhù péng you bù xī fù chū yī qiè', why: '不惜付出一切 "give everything without hesitation".', why_ja: '「不惜付出一切」で「すべてを惜しみなく差し出す」です。' },
    ] },

  // ───────────────────────── Unit 17 ─────────────────────────
  { id: 'yaome', unit: 17, title: '要么…要么 / 不是…便是: either … or', title_ja: '要么…要么・不是…便是：…か、…か',
    pattern: '要么 A, 要么 B; 不是 A, 就是/便是 B; 或者 A, 或者 B', summary: 'Presenting alternatives, from choice to fact', summary_ja: '選択肢を並べる。選択から事実まで',
    explanation: '要么 A, 要么 B lists alternatives for a choice: "either A or B (choose one)", often followed by a demand to decide. 或者 A, 或者 B is a softer list of possibilities that may both be true. 不是 A, 就是 B describes a factual either/or: "if not A, then B", with 便是 as the written form of 就是. All three put the same structure in both halves (verb phrase with verb phrase, noun with noun).',
    explanation_ja: '「要么A，要么B」は選択のための代案を並べ、「AかBか（どちらかを選べ）」という意味で、決断を迫る場面でよく使います。「或者A，或者B」はより穏やかで、両方とも成り立ちうる可能性の列挙です。「不是A，就是B」は事実としての二者択一（Aでなければ Bだ）で、「便是」は「就是」の書き言葉です。三つとも前後に同じ構造（動詞句と動詞句、名詞と名詞）を置きます。',
    ex: [
      ['要么现在走，要么等到明天，你决定吧。', 'yào me xiàn zài zǒu, yào me děng dào míng tiān, nǐ jué dìng ba.', 'Either leave now or wait until tomorrow; you decide.', '今出発するか、明日まで待つか、あなたが決めてください。'],
      ['他每天不是加班，便是出差。', 'tā měi tiān bù shì jiā bān, biàn shì chū chāi.', 'Every day he is either working overtime or on a business trip.', '彼は毎日残業か出張のどちらかです。'],
      ['周末我或者在家看书，或者去公园散步。', 'zhōu mò wǒ huò zhě zài jiā kàn shū, huò zhě qù gōng yuán sàn bù.', 'At weekends I either read at home or walk in the park.', '週末は家で本を読むか、公園を散歩するかです。'],
      ['这件事要么做好，要么不做。', 'zhè jiàn shì yào me zuò hǎo, yào me bù zuò.', 'Either do this properly or do not do it at all.', 'この仕事はきちんとやるか、まったくやらないかのどちらかです。'],
    ],
    mistakes: ['Mixing the pairs: 要么 … 或者 … is not a set.', 'Using 要么 to describe habitual facts; use 不是 … 就是 for that.'],
    mistakes_ja: ['「要么…或者…」のように組み合わせを混ぜないでください。', '習慣的な事実を述べるのは「不是…就是…」です。「要么」は選択に使います。'],
    exercises: [
      { type: 'fill', prompt: '你＿坐飞机，要么坐火车，没有别的办法。', answer: '要么', choices: ['要么', '不是', '宁愿'], why: 'A forced choice between two means of travel: 要么 … 要么.', why_ja: '二つの交通手段からの選択なので「要么…要么」です。' },
      { type: 'choose', prompt: 'Which sentence means "He is always either eating or sleeping"?', prompt_ja: '「彼はいつも食べているか寝ているかだ」はどれですか。', answer: '他不是在吃，就是在睡。', choices: ['他不是在吃，就是在睡。', '他要么在吃，便是在睡。', '他或者吃，就是睡。'], why: 'A habitual fact takes 不是 … 就是 ….', why_ja: '習慣的な事実には「不是…就是…」を使います。' },
      { type: 'order', prompt: 'Make: "Either you apologize, or we end the cooperation."', prompt_ja: '「あなたが謝るか、協力を終えるかだ」を作る', answer: '要么你道歉要么我们结束合作', choices: ['要么', '你道歉', '要么', '我们', '结束合作'], why: 'Two parallel 要么 clauses present the ultimatum.', why_ja: '二つの「要么」節を並べて最後通告を示します。' },
    ] },

  // ───────────────────────── Unit 19 ─────────────────────────
  { id: 'yimian', unit: 19, title: '以免: so as to avoid', title_ja: '以免：…しないように',
    pattern: 'A, 以免 + 不好的结果', summary: 'Doing A to prevent an unwanted outcome', summary_ja: '望ましくない結果を防ぐためにAをする',
    explanation: '以免 begins the second clause and names the bad result that the first action is meant to prevent: "so as not to, lest". It is the negative twin of 以便. The clause after 以免 states the unwanted event directly, without 不: 以免迟到 "so as not to be late", never 以免不迟到. 免得 and 省得 have the same meaning but are colloquial, while 以免 is used in notices, instructions and formal writing.',
    explanation_ja: '「以免」は後半の節の頭に置き、前半の行動が防ごうとする悪い結果を示します（…しないように）。「以便」の否定版にあたります。「以免」の後には望ましくない出来事をそのまま置き、「不」は付けません（「以免迟到」であって「以免不迟到」ではありません）。「免得」「省得」も同じ意味ですが口語的で、「以免」は掲示、説明書、改まった文章に使われます。',
    ex: [
      ['请提前出发，以免错过航班。', 'qǐng tí qián chū fā, yǐ miǎn cuò guò háng bān.', 'Please leave early so as not to miss the flight.', 'フライトに乗り遅れないよう、早めに出発してください。'],
      ['把药放在高处，以免孩子拿到。', 'bǎ yào fàng zài gāo chù, yǐ miǎn hái zi ná dào.', 'Keep the medicine up high so that children cannot reach it.', '子どもの手が届かないように、薬は高いところに置いてください。'],
      ['请详细说明，以免引起误解。', 'qǐng xiáng xì shuō míng, yǐ miǎn yǐn qǐ wù jiě.', 'Please explain in detail to avoid causing misunderstanding.', '誤解を招かないよう、詳しくご説明ください。'],
      ['多穿点衣服，以免感冒。', 'duō chuān diǎn yī fu, yǐ miǎn gǎn mào.', 'Put on more clothes so that you do not catch a cold.', '風邪をひかないように、もっと服を着てください。'],
    ],
    mistakes: ['Adding 不 after 以免: 以免不感冒 reverses the meaning.', 'Starting the sentence with 以免; it opens the second clause.'],
    mistakes_ja: ['「以免」の後に「不」を付けると意味が逆になります（「以免不感冒」は誤り）。', '「以免」で文を始めないでください。後半の節の頭に置きます。'],
    exercises: [
      { type: 'fill', prompt: '请记下地址，＿忘记。', answer: '以免', choices: ['以免', '以便', '免费'], why: 'Writing it down prevents forgetting: 以免 + unwanted result.', why_ja: '書き留めることで忘れるのを防ぐので「以免＋望ましくない結果」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '开车要小心，以免发生事故。', choices: ['开车要小心，以免发生事故。', '开车要小心，以免不发生事故。', '以免发生事故，开车要小心了吗。'], why: '以免 is followed by the event to avoid, with no 不.', why_ja: '「以免」の後には避けたい出来事を「不」なしで置きます。' },
      { type: 'produce', prompt: 'Say: "Please lock the door so that things do not get stolen."', prompt_ja: '「物が盗まれないように、ドアに鍵をかけてください」と言う', answer: '请锁好门，以免东西被偷', answerPinyin: 'qǐng suǒ hǎo mén, yǐ miǎn dōng xi bèi tōu', why: 'Instruction + 以免 + unwanted result.', why_ja: '「指示＋以免＋望ましくない結果」の形です。' },
    ] },

  // ───────────────────────── Unit 20 ─────────────────────────
  { id: 'mofei', unit: 20, title: '莫非: could it be that …?', title_ja: '莫非：ひょっとして…なのか',
    pattern: '莫非 + 猜测 (+吗/不成)?', summary: 'A rhetorical guess expressing surprise or suspicion', summary_ja: '驚きや疑いを込めた反語的な推測',
    explanation: '莫非 opens a question that voices a sudden guess: "could it be that …?, don\'t tell me …". It is used when the speaker suspects an unexpected explanation and often ends with 吗 or the literary 不成. 难道 is the everyday equivalent and is more common; 莫非 sounds literary or dramatic, as in novels and films. The related 莫 appears in 莫名其妙 "inexplicable" and the written prohibition 莫 "do not".',
    explanation_ja: '「莫非」は、ふと浮かんだ推測を問いかける形で表します（ひょっとして…なのか、まさか…ではあるまい）。話し手が意外な理由を疑うときに使い、文末に「吗」や文語の「不成」を付けることが多いです。日常では「难道」がふつうで、「莫非」は小説や映画のような文語的・劇的な響きがあります。関連語の「莫」は「莫名其妙」（わけがわからない）や、書き言葉の禁止「莫」（…するな）に見られます。',
    ex: [
      ['他今天没来，莫非生病了？', 'tā jīn tiān méi lái, mò fēi shēng bìng le?', 'He did not come today; could he be ill?', '彼は今日来ていない。ひょっとして病気なのだろうか。'],
      ['门开着，莫非有人进来过？', 'mén kāi zhe, mò fēi yǒu rén jìn lái guò?', 'The door is open; could someone have come in?', 'ドアが開いている。まさか誰かが入ったのだろうか。'],
      ['你这么高兴，莫非有什么好消息？', 'nǐ zhè me gāo xìng, mò fēi yǒu shén me hǎo xiāo xi?', 'You look so happy; is there perhaps some good news?', 'そんなに嬉しそうで、ひょっとして何かいい知らせでもあるのですか。'],
      ['他莫名其妙地离开了会场。', 'tā mò míng qí miào de lí kāi le huì chǎng.', 'He left the hall for no apparent reason.', '彼はわけもなく会場を去りました。'],
    ],
    mistakes: ['Using 莫非 for a neutral question; it carries surprise or suspicion.', 'Combining 莫非 with 难道 in the same clause.'],
    mistakes_ja: ['中立的な質問には使いません。驚きや疑いを含みます。', '同じ節の中で「莫非」と「难道」を重ねないでください。'],
    exercises: [
      { type: 'fill', prompt: '灯都关了，＿家里没人？', answer: '莫非', choices: ['莫非', '并非', '除非'], why: 'The lights being off prompts a surprised guess: 莫非.', why_ja: '明かりが消えていることから驚きの推測をするので「莫非」です。' },
      { type: 'choose', prompt: 'Which sentence expresses a suspicious guess?', prompt_ja: '疑いを込めた推測を表す文はどれですか。', answer: '他一直不回电话，莫非出事了？', choices: ['他一直不回电话，莫非出事了？', '他一直不回电话，所以出事了。', '他一直不回电话，除非出事了。'], why: '莫非 + guess + question mark.', why_ja: '「莫非＋推測＋？」の形です。' },
      { type: 'order', prompt: 'Make: "Could it be that you have forgotten me?"', prompt_ja: '「まさか私のことを忘れたのですか」を作る', answer: '莫非你把我忘了', choices: ['莫非', '你', '把我', '忘了'], why: '莫非 stands first, then the suspected fact.', why_ja: '「莫非」を先に置き、疑っている内容を続けます。' },
    ] },

  // ───────────────────────── Unit 21 ─────────────────────────
  { id: 'bulun', unit: 21, title: '不论 / 不管怎样: no matter', title_ja: '不论・不管怎样：…にかかわらず、いずれにせよ',
    pattern: '不论/无论/不管 + 疑问词/A还是B, 都/也 …; 不管怎样, …', summary: 'Unconditional statements, formal and colloquial', summary_ja: '条件を問わない表現。改まった形と口語形',
    explanation: '不论, 无论 and 不管 all mean "no matter, regardless of" and are followed by a question word (谁, 什么, 怎么, 多), a choice with 还是, or an opposite pair (大小, 好坏); the main clause has 都 or 也. 不管 is colloquial, 不论 and 无论 are written, with 无论 the most formal. 不管怎样 / 不管怎么说 / 无论如何 are fixed openers meaning "in any case, anyway". 不论 can also pair with 是 … 还是 … to list the cases.',
    explanation_ja: '「不论」「无论」「不管」はいずれも「…にかかわらず」の意味で、後ろに疑問詞（谁、什么、怎么、多）、「还是」による選択、または対になる語（大小、好坏）を置き、主節に「都」や「也」を伴います。「不管」は口語、「不论」「无论」は書き言葉で、「无论」が最も改まっています。「不管怎样」「不管怎么说」「无论如何」は「いずれにせよ、とにかく」という決まった文頭表現です。「不论」は「是…还是…」と組んで場合を列挙することもできます。',
    ex: [
      ['不论结果如何，我们都尽力了。', 'bù lùn jié guǒ rú hé, wǒ men dōu jìn lì le.', 'Whatever the result, we did our best.', '結果がどうであれ、私たちは全力を尽くしました。'],
      ['不论是老人还是孩子，都应该受到尊重。', 'bù lùn shì lǎo rén hái shi hái zi, dōu yīng gāi shòu dào zūn zhòng.', 'Old or young, everyone should be respected.', '年寄りであれ子どもであれ、誰もが尊重されるべきです。'],
      ['不管怎样，先把眼前的工作做完。', 'bù guǎn zěn yàng, xiān bǎ yǎn qián de gōng zuò zuò wán.', 'In any case, finish the work at hand first.', 'いずれにせよ、まず目の前の仕事を終わらせましょう。'],
      ['无论多忙，他每天都坚持锻炼。', 'wú lùn duō máng, tā měi tiān dōu jiān chí duàn liàn.', 'No matter how busy he is, he exercises every day.', 'どんなに忙しくても、彼は毎日運動を続けています。'],
    ],
    mistakes: ['Dropping 都 / 也 from the main clause.', 'Following 不论 with a plain statement: 不论下雨 needs a question element (不论下不下雨).'],
    mistakes_ja: ['主節の「都／也」を落とさないでください。', '「不论」の後は疑問の要素が必要です（「不论下雨」ではなく「不论下不下雨」）。'],
    exercises: [
      { type: 'fill', prompt: '＿价格多高，他都要买。', answer: '不论', choices: ['不论', '不但', '不如'], why: '不论 + 多高 + 都: no matter how high the price.', why_ja: '「不论＋多高＋都」で「値段がどれほど高くても」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '不管你去不去，我都去。', choices: ['不管你去不去，我都去。', '不管你去，我都去。', '不管你去不去，我去。'], why: 'A question form after 不管 and 都 in the main clause.', why_ja: '「不管」の後に疑問形、主節に「都」が必要です。' },
      { type: 'produce', prompt: 'Say: "Anyway, thank you for your help."', prompt_ja: '「いずれにせよ、助けてくれてありがとう」と言う', answer: '不管怎样，谢谢你的帮助', answerPinyin: 'bù guǎn zěn yàng, xiè xie nǐ de bāng zhù', why: '不管怎样 is the fixed phrase "in any case".', why_ja: '「不管怎样」は「いずれにせよ」の決まった表現です。' },
    ] },

  // ───────────────────────── Unit 22 ─────────────────────────
  { id: 'bufang', unit: 22, title: '不妨 / 罢了: might as well; that is all', title_ja: '不妨・罢了：…してみてもよい／…にすぎない',
    pattern: '不妨 + V; … 罢了', summary: 'A mild suggestion and a dismissive "merely"', summary_ja: '控えめな提案と、軽く扱う「…だけ」',
    explanation: '不妨 (literally "there is no harm") makes a mild suggestion: "might as well, why not". It precedes the verb: 不妨试试 "why not give it a try". 罢了 ends a sentence to play something down, much like 而已, but with a slightly dismissive or resigned tone: 我随便说说罢了 "I was only talking". 罢了 is often preceded by 只是 / 不过 / 无非是. Both words belong to a calm, reflective register.',
    explanation_ja: '「不妨」（文字どおりには「差し支えない」）は「…してみてもよい、…したらどうか」という控えめな提案で、動詞の前に置きます（「不妨试试」）。「罢了」は文末で物事を軽く扱い、「而已」に似ていますが、やや投げやりで諦めを含んだ語気です（「我随便说说罢了」）。「罢了」の前にはしばしば「只是／不过／无非是」を置きます。どちらも落ち着いた、思慮深い語調の表現です。',
    ex: [
      ['你不妨先听听他的意见。', 'nǐ bù fáng xiān tīng tīng tā de yì jiàn.', 'You might as well hear his opinion first.', 'まず彼の意見を聞いてみてはどうでしょうか。'],
      ['既然有机会，不妨去试一试。', 'jì rán yǒu jī huì, bù fáng qù shì yī shì.', 'Since there is a chance, why not give it a try?', 'せっかく機会があるのですから、試してみてもいいでしょう。'],
      ['他不过是开个玩笑罢了，别生气。', 'tā bù guò shì kāi ge wán xiào bà le, bié shēng qì.', 'He was only joking; do not be angry.', '彼はただ冗談を言っただけですから、怒らないでください。'],
      ['我只是运气好罢了。', 'wǒ zhǐ shì yùn qi hǎo bà le.', 'I was merely lucky, that is all.', '私はただ運がよかっただけです。'],
    ],
    mistakes: ['Using 不妨 in the negative (不不妨): the word is already a suggestion.', 'Putting 罢了 in the middle of a sentence; it is final.'],
    mistakes_ja: ['「不妨」を否定形にすることはありません。それ自体が提案です。', '「罢了」は文末に置きます。文の途中には入りません。'],
    exercises: [
      { type: 'fill', prompt: '如果不确定，＿问问专家。', answer: '不妨', choices: ['不妨', '不免', '难免'], why: 'A gentle suggestion to ask an expert: 不妨.', why_ja: '専門家に聞いてはどうかという控えめな提案なので「不妨」です。' },
      { type: 'choose', prompt: 'Which sentence means "It is just a small gift, nothing more"?', prompt_ja: '「ほんの小さな贈り物にすぎません」はどれですか。', answer: '只是一点小礼物罢了。', choices: ['只是一点小礼物罢了。', '罢了只是一点小礼物。', '只是罢了一点小礼物。'], why: '只是 … 罢了 wraps the item, 罢了 last.', why_ja: '「只是…罢了」で挟み、「罢了」は最後です。' },
      { type: 'order', prompt: 'Make: "You might as well tell him the truth."', prompt_ja: '「彼に本当のことを話してみてはどうですか」を作る', answer: '你不妨告诉他真相', choices: ['你', '不妨', '告诉他', '真相'], why: '不妨 goes before the verb phrase.', why_ja: '「不妨」は動詞句の前に置きます。' },
    ] },

  // ───────────────────────── Unit 24 ─────────────────────────
  { id: 'bujin', unit: 24, title: '不禁 / 大不了: cannot help; at worst', title_ja: '不禁・大不了：思わず…／せいぜい',
    pattern: '不禁 + V(感情/反应); 大不了 + 最坏的结果', summary: 'An involuntary reaction and a reassuring "the worst case is"', summary_ja: '思わず出る反応と、安心させる「最悪でも」',
    explanation: '不禁 ("cannot help") precedes a verb of spontaneous emotion or reaction: 不禁笑了 "could not help laughing", 不禁想起 "could not help recalling". It is written-register; the colloquial equivalents are 忍不住 and 不由得. 大不了 means "at the worst, the most that can happen is": it names the worst outcome to show it is bearable, often with 也就是 or 无非. Note the tone: 大不了 reassures (大不了再来一次), and 没什么大不了的 means "it is no big deal".',
    explanation_ja: '「不禁」（思わず、こらえきれずに）は、自然に起こる感情や反応の動詞の前に置きます（「不禁笑了」「不禁想起」）。書き言葉で、口語では「忍不住」「不由得」を使います。「大不了」は「最悪でも、せいぜい」の意味で、最悪の結果を挙げて耐えられることを示し、「也就是」や「无非」とともに使うことが多いです。語気に注意してください。「大不了再来一次」は安心させる言い方で、「没什么大不了的」は「大したことはない」です。',
    ex: [
      ['看到老照片，她不禁流下了眼泪。', 'kàn dào lǎo zhào piàn, tā bù jīn liú xià le yǎn lèi.', 'Seeing the old photos, she could not help shedding tears.', '古い写真を見て、彼女は思わず涙を流しました。'],
      ['听到这个消息，大家不禁欢呼起来。', 'tīng dào zhè ge xiāo xi, dà jiā bù jīn huān hū qi lai.', 'Hearing the news, everyone burst into cheers.', 'その知らせを聞いて、みんな思わず歓声を上げました。'],
      ['别担心，大不了重新开始。', 'bié dān xīn, dà bù liǎo chóng xīn kāi shǐ.', 'Do not worry; at worst we start again.', '心配しないで。最悪でもやり直せばいいだけです。'],
      ['失败了也没什么大不了的。', 'shī bài le yě méi shén me dà bù liǎo de.', 'Even if we fail, it is no big deal.', '失敗しても大したことではありません。'],
    ],
    mistakes: ['Using 不禁 with a deliberate action: 不禁决定 is wrong; the verb must be involuntary.', 'Reading 大不了 as "very big"; it means "the worst case".'],
    mistakes_ja: ['意図的な行動には使えません（「不禁决定」は誤り）。動詞は無意識の反応でなければなりません。', '「大不了」を「とても大きい」と読まないでください。「最悪の場合」の意味です。'],
    exercises: [
      { type: 'fill', prompt: '听了他的故事，我＿笑了起来。', answer: '不禁', choices: ['不禁', '不惜', '禁止'], why: 'Laughing is an involuntary reaction: 不禁.', why_ja: '笑うのは思わず出る反応なので「不禁」です。' },
      { type: 'choose', prompt: 'Which sentence reassures someone?', prompt_ja: '相手を安心させる文はどれですか。', answer: '大不了明年再考一次。', choices: ['大不了明年再考一次。', '不禁明年再考一次。', '明年再考一次大不了很难。'], why: '大不了 + worst case shows it is acceptable.', why_ja: '「大不了＋最悪の場合」で、それでも受け入れられると示します。' },
      { type: 'produce', prompt: 'Say: "Hearing the song, he could not help thinking of his hometown."', prompt_ja: '「その歌を聞いて、彼は思わず故郷を思い出した」と言う', answer: '听到这首歌，他不禁想起了家乡', answerPinyin: 'tīng dào zhè shǒu gē, tā bù jīn xiǎng qǐ le jiā xiāng', why: '不禁 + 想起: an involuntary memory.', why_ja: '「不禁＋想起」で思わず思い出すことを表します。' },
    ] },

  // ───────────────────────── Unit 25 ─────────────────────────
  { id: 'nanmian', unit: 25, title: '难免 / 不免: inevitably', title_ja: '难免・不免：避けられない、どうしても',
    pattern: '难免 + (会/有) …; 不免 + V', summary: 'Something is hard to avoid, so it is understandable', summary_ja: '避けにくいこと、だから仕方がない',
    explanation: '难免 means "hard to avoid, bound to happen" and is used to excuse or explain a natural consequence: 刚开始工作, 难免出错 "when you start a job, mistakes are inevitable". It can stand before a verb phrase or be the predicate itself (错误是难免的). 不免 is close in meaning but is only an adverb before the verb and sounds a little more literary: 不免有些担心 "could not avoid being a bit worried". Both are objective; contrast 未免 (next units), which gives a subjective judgement.',
    explanation_ja: '「难免」は「避けがたい、必ずそうなる」の意味で、当然の結果を弁解したり説明したりするときに使います（「刚开始工作，难免出错」）。動詞句の前に置くことも、述語そのものにもなります（「错误是难免的」）。「不免」は意味が近いですが、動詞の前の副詞としてのみ使い、やや文語的です（「不免有些担心」）。どちらも客観的な言い方で、後の課で学ぶ「未免」は主観的な評価を表す点が異なります。',
    ex: [
      ['第一次上台，紧张是难免的。', 'dì yī cì shàng tái, jǐn zhāng shì nán miǎn de.', 'Being nervous the first time on stage is unavoidable.', '初めて舞台に立つのですから、緊張するのは仕方ありません。'],
      ['工作中难免会遇到困难。', 'gōng zuò zhōng nán miǎn huì yù dào kùn nan.', 'At work one is bound to meet difficulties.', '仕事では困難に出会うのは避けられません。'],
      ['听到这个消息，他不免有些失望。', 'tīng dào zhè ge xiāo xi, tā bù miǎn yǒu xiē shī wàng.', 'Hearing the news, he could not help feeling a little disappointed.', 'その知らせを聞いて、彼はどうしても少しがっかりしました。'],
      ['时间长了，机器难免出故障。', 'shí jiān cháng le, jī qì nán miǎn chū gù zhàng.', 'Over time a machine is bound to break down.', '長く使えば、機械は故障するものです。'],
    ],
    mistakes: ['Using 难免 for a positive outcome; it is for problems, errors and feelings.', 'Writing 不免 as a predicate (是不免的 is wrong; use 是难免的).'],
    mistakes_ja: ['良い結果には使いません。問題、誤り、感情に使います。', '「不免」は述語になれません（「是不免的」は誤り、「是难免的」が正しい）。'],
    exercises: [
      { type: 'fill', prompt: '刚学中文，发音＿不准。', answer: '难免', choices: ['难免', '未免', '不妨'], why: 'Inaccurate pronunciation is natural for a beginner: 难免.', why_ja: '初心者の発音が不正確なのは当然なので「难免」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '离开家乡，不免想念父母。', choices: ['离开家乡，不免想念父母。', '离开家乡，想念父母是不免的。', '不免离开家乡想念父母。'], why: '不免 is an adverb before the verb only.', why_ja: '「不免」は動詞の前の副詞としてのみ使います。' },
      { type: 'order', prompt: 'Make: "A new employee is bound to make some mistakes."', prompt_ja: '「新入社員は多少のミスをするものだ」を作る', answer: '新员工难免会犯一些错误', choices: ['新员工', '难免', '会', '犯', '一些错误'], why: 'Subject + 难免 + 会 + verb phrase.', why_ja: '「主語＋难免＋会＋動詞句」の順です。' },
    ] },

  // ───────────────────────── Unit 26 ─────────────────────────
  { id: 'bushi', unit: 26, title: '不时 / 时不时: now and then', title_ja: '不时・时不时：ときどき、折にふれて',
    pattern: '不时 + V; 时不时(地) + V; 时而 A 时而 B', summary: 'Repeated occasional actions', summary_ja: '繰り返し時おり起こる動作',
    explanation: '不时 means "from time to time, now and then" and is placed before the verb in written and spoken Chinese: 不时看表 "kept glancing at the watch". 时不时 (often with 地) is its colloquial form with the same meaning. Both describe actions repeated at irregular intervals, usually observable from outside. 有时 "sometimes" is more neutral and can describe states; 不时 suggests repeated small actions. The literary 时而 A, 时而 B describes alternation between two states.',
    explanation_ja: '「不时」は「ときどき、折にふれて」の意味で、書き言葉でも話し言葉でも動詞の前に置きます（「不时看表」）。「时不时」（多く「地」を伴う）はその口語形で、意味は同じです。どちらも不規則な間隔で繰り返される動作を表し、多くは外から観察できる行動です。「有时」（ときには）はより中立的で、状態にも使えますが、「不时」は小さな動作の繰り返しを感じさせます。文語の「时而A，时而B」は二つの状態の交替を表します。',
    ex: [
      ['他一边等，一边不时看看手机。', 'tā yī biān děng, yī biān bù shí kàn kan shǒu jī.', 'While waiting, he glanced at his phone from time to time.', '彼は待ちながら、ときどき携帯を見ていました。'],
      ['会议中，窗外不时传来笑声。', 'huì yì zhōng, chuāng wài bù shí chuán lái xiào shēng.', 'During the meeting, laughter came from outside now and then.', '会議中、窓の外からときおり笑い声が聞こえてきました。'],
      ['她时不时地回头看一眼。', 'tā shí bù shí de huí tóu kàn yī yǎn.', 'She kept looking back every now and then.', '彼女はときどき振り返って一目見ていました。'],
      ['老人时不时来店里坐坐。', 'lǎo rén shí bù shí lái diàn lǐ zuò zuò.', 'The old man drops by the shop to sit a while every so often.', 'その老人はときどき店に来て座っていきます。'],
    ],
    mistakes: ['Placing 不时 at the end of the sentence; it is a pre-verbal adverb.', 'Reading 不时 as "not on time" (that is 不准时).'],
    mistakes_ja: ['「不时」は動詞の前の副詞です。文末には置きません。', '「不时」を「時間どおりでない」と読まないでください。それは「不准时」です。'],
    exercises: [
      { type: 'fill', prompt: '演讲的时候，他＿看看笔记。', answer: '不时', choices: ['不时', '及时', '一时'], why: 'Repeated glances during the speech: 不时.', why_ja: 'スピーチ中にときどき見る動作なので「不时」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '他时不时地给我打电话。', choices: ['他时不时地给我打电话。', '他给我打电话时不时。', '时不时他的给我打电话。'], why: '时不时(地) precedes the verb phrase.', why_ja: '「时不时（地）」は動詞句の前に置きます。' },
      { type: 'produce', prompt: 'Say: "The teacher looks at the clock now and then."', prompt_ja: '「先生はときどき時計を見ます」と言う', answer: '老师不时看看钟', answerPinyin: 'lǎo shī bù shí kàn kan zhōng', why: '不时 + verb for a repeated small action.', why_ja: '「不时＋動詞」で繰り返す小さな動作を表します。' },
    ] },

  // ───────────────────────── Unit 27 ─────────────────────────
  { id: 'yilai-erlai', unit: 27, title: '一来…二来 / 一方面…另一方面: listing reasons', title_ja: '一来…二来・一方面…另一方面：理由を並べる',
    pattern: '一来 …, 二来 …; 一方面 …, 另一方面 …', summary: 'Organising two reasons or two aspects', summary_ja: '二つの理由や側面を整理して述べる',
    explanation: '一来 …, 二来 … lists reasons or purposes in order: "for one thing …, for another …". It is conversational but orderly, and a third point can be added with 三来. 一方面 …, 另一方面 … presents two aspects of the same matter, often contrasting ones, and is common in written argument; the second half frequently includes 又 or 也. Use 一来/二来 for reasons behind a decision, and 一方面/另一方面 for sides of a situation.',
    explanation_ja: '「一来…，二来…」は理由や目的を順に並べます（一つには…、二つには…）。会話的ですが整った言い方で、「三来」で三つ目を加えることもできます。「一方面…，另一方面…」は同じ事柄の二つの側面、多くは対照的な側面を示し、論説文でよく使われ、後半に「又」や「也」を含むことが多いです。決定の理由には「一来／二来」、状況の側面には「一方面／另一方面」を使い分けてください。',
    ex: [
      ['我不去，一来太远，二来没时间。', 'wǒ bù qù, yī lái tài yuǎn, èr lái méi shí jiān.', 'I am not going: for one thing it is too far, for another I have no time.', '私は行きません。一つには遠すぎるし、二つには時間がないからです。'],
      ['他学中文，一来为了工作，二来对文化感兴趣。', 'tā xué zhōng wén, yī lái wèi le gōng zuò, èr lái duì wén huà gǎn xìng qù.', 'He studies Chinese partly for work and partly from interest in the culture.', '彼が中国語を学ぶのは、一つには仕事のため、二つには文化に興味があるからです。'],
      ['一方面要发展经济，另一方面也要保护环境。', 'yī fāng miàn yào fā zhǎn jīng jì, lìng yī fāng miàn yě yào bǎo hù huán jìng.', 'On the one hand we must develop the economy; on the other we must protect the environment.', '一方では経済を発展させ、他方では環境も守らなければなりません。'],
      ['这份工作一方面很累，另一方面收入不错。', 'zhè fèn gōng zuò yī fāng miàn hěn lèi, lìng yī fāng miàn shōu rù bù cuò.', 'This job is tiring on the one hand, but the pay is good on the other.', 'この仕事は一方ではとても疲れますが、他方で収入は悪くありません。'],
    ],
    mistakes: ['Pairing 一来 with 另一方面.', 'Using 一方面 for a single reason without the second half.'],
    mistakes_ja: ['「一来」と「另一方面」を組み合わせないでください。', '「一方面」を後半なしで一つの理由だけに使わないでください。'],
    exercises: [
      { type: 'fill', prompt: '我选这所大学，一来离家近，＿学费便宜。', answer: '二来', choices: ['二来', '另一方面', '再说'], why: '一来 … 二来 … lists the two reasons.', why_ja: '「一来…二来…」で二つの理由を並べます。' },
      { type: 'choose', prompt: 'Which sentence presents two aspects correctly?', prompt_ja: '二つの側面を正しく示している文はどれですか。', answer: '城市生活一方面方便，另一方面压力很大。', choices: ['城市生活一方面方便，另一方面压力很大。', '城市生活一来方便，另一方面压力很大。', '城市生活一方面方便，二来压力很大。'], why: '一方面 … 另一方面 … is the matching pair.', why_ja: '「一方面…另一方面…」が正しい組み合わせです。' },
      { type: 'order', prompt: 'Make: "I exercise, firstly for health, secondly to relax."', prompt_ja: '「私が運動するのは、一つには健康のため、二つにはリラックスするためです」を作る', answer: '我锻炼一来为了健康二来为了放松', choices: ['我锻炼', '一来', '为了健康', '二来', '为了放松'], why: 'Statement first, then 一来 … 二来 ….', why_ja: '先に主張を述べ、「一来…二来…」と続けます。' },
    ] },

  // ───────────────────────── Unit 28 ─────────────────────────
  { id: 'miande', unit: 28, title: '免得 / 省得: so as not to (colloquial)', title_ja: '免得・省得：…しないように（口語）',
    pattern: 'A, 免得/省得 + 麻烦/不好的结果', summary: 'The spoken counterparts of 以免', summary_ja: '「以免」の話し言葉版',
    explanation: '免得 and 省得 both mean "so as to avoid, to save (someone) the trouble of" and begin the second clause, exactly like 以免. They are colloquial: 免得 is neutral everyday speech, 省得 stresses saving effort or trouble (省 "save"). The clause after them names the unwanted result directly, without 不. In a formal notice choose 以免; in conversation 免得 / 省得 sound natural.',
    explanation_ja: '「免得」「省得」はどちらも「…しないように、…の手間を省くために」の意味で、「以免」と同じく後半の節の頭に置きます。口語的で、「免得」は日常のふつうの言い方、「省得」は手間や面倒を省くことを強調します（「省」は「省く」）。後ろには望ましくない結果を「不」なしでそのまま置きます。改まった掲示では「以免」を、会話では「免得／省得」を使うと自然です。',
    ex: [
      ['你先打个电话，免得白跑一趟。', 'nǐ xiān dǎ ge diàn huà, miǎn de bái pǎo yī tàng.', 'Call first so that you do not make a wasted trip.', '無駄足にならないように、先に電話しておきなさい。'],
      ['带把伞吧，免得淋雨。', 'dài bǎ sǎn ba, miǎn de lín yǔ.', 'Take an umbrella so that you do not get rained on.', '雨に濡れないように、傘を持って行きなさい。'],
      ['我今天把作业做完，省得明天着急。', 'wǒ jīn tiān bǎ zuò yè zuò wán, shěng de míng tiān zháo jí.', 'I will finish the homework today to save myself rushing tomorrow.', '明日慌てなくて済むように、今日宿題を終わらせます。'],
      ['早点告诉他，省得他担心。', 'zǎo diǎn gào su tā, shěng de tā dān xīn.', 'Tell him early to spare him worry.', '彼が心配しなくて済むように、早めに伝えてください。'],
    ],
    mistakes: ['Adding 不 after 免得: 免得不淋雨 is wrong.', 'Using 省得 in a formal written notice; 以免 is expected there.'],
    mistakes_ja: ['「免得」の後に「不」を付けないでください（「免得不淋雨」は誤り）。', '改まった掲示に「省得」は不向きです。「以免」を使います。'],
    exercises: [
      { type: 'fill', prompt: '把钥匙放在固定的地方，＿找不到。', answer: '免得', choices: ['免得', '以便', '为了'], why: 'Keeping keys in one place avoids losing them: 免得.', why_ja: '鍵を決まった場所に置くのは見失わないためなので「免得」です。' },
      { type: 'choose', prompt: 'Which sentence is natural spoken Chinese?', prompt_ja: '自然な話し言葉はどれですか。', answer: '我们早点走，省得堵车。', choices: ['我们早点走，省得堵车。', '我们早点走，省得不堵车。', '省得堵车了我们才早点走。'], why: '省得 + unwanted result, no 不.', why_ja: '「省得＋望ましくない結果」で、「不」は付けません。' },
      { type: 'produce', prompt: 'Say: "Write it down so that you do not forget."', prompt_ja: '「忘れないように書いておきなさい」と言う', answer: '写下来，免得忘了', answerPinyin: 'xiě xià lái, miǎn de wàng le', why: '免得 + 忘了: to avoid forgetting.', why_ja: '「免得＋忘了」で忘れるのを防ぎます。' },
    ] },

  // ───────────────────────── Unit 29 ─────────────────────────
  { id: 'duici', unit: 29, title: '对此 / 就此: regarding this', title_ja: '对此・就此：これについて',
    pattern: '对此, …; 就此 + V; 为此, …; 因此, …', summary: 'Formal back-references built on 此', summary_ja: '「此」を用いた改まった指示表現',
    explanation: '此 is the written form of 这 and combines with prepositions to refer back to what was just said. 对此 "regarding this" opens a sentence that gives a response or attitude: 对此, 公司表示遗憾. 就此 means "on this matter" or "at this point": 就此发表意见, 就此结束. 为此 "for this reason / to this end" introduces an action taken, and 因此 "therefore" a conclusion. These compact links are a hallmark of news and report style.',
    explanation_ja: '「此」は「这」の書き言葉で、前置詞と結びついて直前の内容を指します。「对此」（これについて）は、反応や態度を述べる文の頭に置きます（「对此，公司表示遗憾」）。「就此」は「この件について」または「ここで」の意味です（「就此发表意见」「就此结束」）。「为此」（このために）は取られた行動を、「因此」（したがって）は結論を導きます。こうした簡潔なつなぎ語はニュースや報告書の文体の特徴です。',
    ex: [
      ['对此，我们深表遗憾。', 'duì cǐ, wǒ men shēn biǎo yí hàn.', 'We deeply regret this.', 'この件について、私たちは深く遺憾に思います。'],
      ['专家就此问题发表了不同的看法。', 'zhuān jiā jiù cǐ wèn tí fā biǎo le bù tóng de kàn fǎ.', 'Experts expressed differing views on this question.', '専門家はこの問題について異なる見解を発表しました。'],
      ['今天的讨论就此结束。', 'jīn tiān de tǎo lùn jiù cǐ jié shù.', 'Today\'s discussion ends here.', '本日の討論はここで終わりにします。'],
      ['公司为此投入了大量资金。', 'gōng sī wèi cǐ tóu rù le dà liàng zī jīn.', 'The company invested a great deal of money for this purpose.', '会社はこのために多額の資金を投じました。'],
    ],
    mistakes: ['Using 对此 with nothing mentioned before it.', 'Mixing 为此 ("to this end") and 因此 ("therefore").'],
    mistakes_ja: ['前に何も述べていないのに「对此」を使うことはできません。', '「为此」（このために）と「因此」（したがって）を混同しないでください。'],
    exercises: [
      { type: 'fill', prompt: '产品出现了问题，＿公司向客户道歉。', answer: '对此', choices: ['对此', '从此', '由此'], why: '对此 introduces the company\'s response to the problem.', why_ja: '「对此」で問題に対する会社の反応を導きます。' },
      { type: 'choose', prompt: 'Which sentence means "The matter ends here"?', prompt_ja: '「この件はここで終わりです」はどれですか。', answer: '这件事就此结束。', choices: ['这件事就此结束。', '这件事对此结束。', '这件事为此结束。'], why: '就此结束 is the fixed phrase "end here".', why_ja: '「就此结束」は「ここで終える」の決まった表現です。' },
      { type: 'produce', prompt: 'Write formally: "Regarding this, the government has not yet responded."', prompt_ja: '書き言葉で「これについて、政府はまだ回答していない」と書く', answer: '对此，政府尚未回应', answerPinyin: 'duì cǐ, zhèng fǔ shàng wèi huí yìng', why: '对此 opens the response; 尚未 is formal "not yet".', why_ja: '「对此」で反応を導き、「尚未」は書き言葉の「まだ…していない」です。' },
    ] },

  // ───────────────────────── Unit 31 ─────────────────────────
  { id: 'fei-buke', unit: 31, title: '非…不可 / 不得不: must, have no choice', title_ja: '非…不可・不得不：どうしても…／…せざるを得ない',
    pattern: '非 + V + 不可; 非得 + V; 不得不 + V', summary: 'Strong necessity vs. reluctant necessity', summary_ja: '強い必然と、やむを得ない必然',
    explanation: '非 … 不可 (also 非 … 不行 / 不成) wraps a verb phrase to say "must absolutely, cannot do without": 这件事非你去不可. It expresses determination or an objective necessity and is emphatic. In speech 非 can appear alone with 得: 我非得去. 不得不 means "have no choice but to": the subject does something unwillingly because circumstances force it. So 非去不可 is "I simply must go", while 不得不去 is "I am forced to go".',
    explanation_ja: '「非…不可」（「非…不行／不成」も）は動詞句を挟んで「どうしても…しなければならない、…なしでは済まない」を表します（「这件事非你去不可」）。決意や客観的な必然を強く述べる言い方です。話し言葉では「非得」だけで使うこともあります（「我非得去」）。「不得不」は「…せざるを得ない」で、状況に迫られて不本意ながら行動することを表します。つまり「非去不可」は「ぜひ行かねばならない」、「不得不去」は「行くしかない」という違いです。',
    ex: [
      ['这个问题非解决不可。', 'zhè ge wèn tí fēi jiě jué bù kě.', 'This problem absolutely must be solved.', 'この問題はどうしても解決しなければなりません。'],
      ['他非要亲自去看看不可。', 'tā fēi yào qīn zì qù kàn kan bù kě.', 'He insists on going to see for himself.', '彼はどうしても自分で見に行くと言ってききません。'],
      ['雨太大了，我们不得不取消活动。', 'yǔ tài dà le, wǒ men bù dé bù qǔ xiāo huó dòng.', 'The rain was too heavy; we had no choice but to cancel the event.', '雨がひどすぎて、私たちはイベントを中止せざるを得ませんでした。'],
      ['为了养家，他不得不同时做两份工作。', 'wèi le yǎng jiā, tā bù dé bù tóng shí zuò liǎng fèn gōng zuò.', 'To support his family he had to work two jobs at once.', '家族を養うために、彼は二つの仕事を掛け持ちせざるを得ませんでした。'],
    ],
    mistakes: ['Dropping 不可 after 非 in writing: 非解决 alone is incomplete.', 'Using 不得不 for an eager decision; it implies reluctance.'],
    mistakes_ja: ['書き言葉で「非」の後の「不可」を落とさないでください。「非解决」だけでは不完全です。', '進んでする決定に「不得不」は使いません。不本意さを含みます。'],
    exercises: [
      { type: 'fill', prompt: '明天的会议很重要，你非参加＿。', answer: '不可', choices: ['不可', '不得', '不了'], why: '非 … 不可 closes the emphatic "must".', why_ja: '「非…不可」で強い「必ず」を締めくくります。' },
      { type: 'choose', prompt: 'Which sentence expresses reluctant necessity?', prompt_ja: 'やむを得ない必然を表す文はどれですか。', answer: '钱不够，我不得不放弃这次旅行。', choices: ['钱不够，我不得不放弃这次旅行。', '钱不够，我非放弃这次旅行不可了吗。', '钱不够，我不可放弃这次旅行。'], why: '不得不 shows the subject is forced by circumstances.', why_ja: '「不得不」は状況に迫られてのことだと示します。' },
      { type: 'order', prompt: 'Make: "I simply must see her today."', prompt_ja: '「今日はどうしても彼女に会わなければならない」を作る', answer: '我今天非见她不可', choices: ['我', '今天', '非', '见她', '不可'], why: '非 + verb phrase + 不可.', why_ja: '「非＋動詞句＋不可」の形です。' },
    ] },

  // ───────────────────────── Unit 32 ─────────────────────────
  { id: 'yizhi', unit: 32, title: '以致 / 以至于 / 以至: so that, to the point of', title_ja: '以致・以至于・以至：その結果…、…するほどに',
    pattern: 'A, 以致 + 坏结果; A, 以至于 + 程度/结果; 从 … 以至 …', summary: 'Result clauses in the written register', summary_ja: '書き言葉の結果表現',
    explanation: '以致 introduces an unwanted result caused by what precedes: 他没有准备, 以致失败. It is only used for bad outcomes. 以至于 (or 以至) introduces a result that shows the degree of the preceding situation, good or bad: 他太专心了, 以至于没听见电话. 以至 also means "up to, even" when extending a range: 从几天以至几个月 "from several days up to several months". 致使 "cause (a bad result)" is a verb with the same flavour as 以致. These are all written-register; in speech 结果 or 所以 would be used.',
    explanation_ja: '「以致」は前の内容が引き起こした望ましくない結果を導きます（「他没有准备，以致失败」）。悪い結果にしか使いません。「以至于」（または「以至」）は前の状況の程度を示す結果を導き、良い結果にも悪い結果にも使えます（「他太专心了，以至于没听见电话」）。「以至」は範囲を広げて「…から…にまで、さらには」の意味にもなります（「从几天以至几个月」）。「致使」（悪い結果を引き起こす）は「以致」と同じ趣の動詞です。いずれも書き言葉で、会話では「结果」「所以」を使います。',
    ex: [
      ['他没有听从医生的建议，以致病情恶化。', 'tā méi yǒu tīng cóng yī shēng de jiàn yì, yǐ zhì bìng qíng è huà.', 'He did not follow the doctor\'s advice, so that his condition worsened.', '彼は医師の助言に従わず、その結果病状が悪化しました。'],
      ['她工作太投入了，以至于忘了吃饭。', 'tā gōng zuò tài tóu rù le, yǐ zhì yú wàng le chī fàn.', 'She was so absorbed in her work that she forgot to eat.', '彼女は仕事に夢中になりすぎて、食事を忘れるほどでした。'],
      ['这个问题影响了几十人以至几百人。', 'zhè ge wèn tí yǐng xiǎng le jǐ shí rén yǐ zhì jǐ bǎi rén.', 'This problem affected dozens, even hundreds, of people.', 'この問題は数十人、さらには数百人にまで影響しました。'],
      ['大雨致使道路中断。', 'dà yǔ zhì shǐ dào lù zhōng duàn.', 'Heavy rain caused the road to be cut off.', '大雨によって道路が寸断されました。'],
    ],
    mistakes: ['Using 以致 for a good result: 努力学习, 以致成功 is wrong (use 终于 / 因此).', 'Starting a sentence with 以致 or 以至于; they open the second clause.'],
    mistakes_ja: ['良い結果に「以致」は使えません（「努力学习，以致成功」は誤り。「终于／因此」を使います）。', '「以致」「以至于」で文を始めないでください。後半の節の頭に置きます。'],
    exercises: [
      { type: 'fill', prompt: '他经常熬夜，＿身体越来越差。', answer: '以致', choices: ['以致', '以便', '以免'], why: 'Staying up late caused a bad result: 以致.', why_ja: '夜更かしが悪い結果を招いたので「以致」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '他高兴得以至于跳了起来。', choices: ['他高兴得以至于跳了起来。', '他高兴得以致跳了起来。', '以至于他高兴跳了起来。'], why: '以至于 expresses degree, including happy results; 以致 is for bad ones.', why_ja: '「以至于」は程度を表し、良い結果にも使えます。「以致」は悪い結果専用です。' },
      { type: 'produce', prompt: 'Write formally: "The company ignored the warning, with the result that it lost many customers."', prompt_ja: '書き言葉で「会社は警告を無視し、その結果多くの顧客を失った」と書く', answer: '公司忽视了警告，以致失去了很多客户', answerPinyin: 'gōng sī hū shì le jǐng gào, yǐ zhì shī qù le hěn duō kè hù', why: '以致 links the cause to the unwanted loss.', why_ja: '「以致」で原因と望ましくない損失を結びます。' },
    ] },

  // ───────────────────────── Unit 33 ─────────────────────────
  { id: 'ze', unit: 33, title: '则: then / whereas', title_ja: '则：…ならば／一方…は',
    pattern: '如果/若 A, 则 B; A …, B 则 …', summary: 'A literary connector for condition and contrast', summary_ja: '条件と対比を示す文語の接続詞',
    explanation: '则 has two main uses in modern written Chinese. After a condition it means "then": 如果没有问题, 则可以签字 "if there is no problem, then it can be signed". Between two parallel clauses it marks a contrast, "whereas": 南方多雨, 北方则干燥. 则 always stands at the head of the second clause, after its subject if there is one. It also appears in fixed phrases such as 否则 "otherwise" and 不进则退 "if you do not advance, you fall back". The colloquial equivalents are 就 (then) and 而 / 可是 (whereas).',
    explanation_ja: '「则」の現代書き言葉での主な用法は二つです。条件の後では「…ならば」の意味です（「如果没有问题，则可以签字」）。並列する二つの節の間では対比を示し、「一方…は」にあたります（「南方多雨，北方则干燥」）。「则」はつねに後半の節の頭、主語があればその後に置きます。「否则」（さもなければ）、「不进则退」（進まなければ退く）などの決まった句にも見られます。口語では「就」（ならば）や「而／可是」（一方）を使います。',
    ex: [
      ['如果天气允许，则按原计划进行。', 'rú guǒ tiān qì yǔn xǔ, zé àn yuán jì huà jìn xíng.', 'If the weather permits, then we proceed as planned.', '天候が許せば、元の計画どおりに進めます。'],
      ['有的人喜欢热闹，有的人则喜欢安静。', 'yǒu de rén xǐ huan rè nao, yǒu de rén zé xǐ huan ān jìng.', 'Some people like liveliness, whereas others prefer quiet.', 'にぎやかなのが好きな人もいれば、静かなのを好む人もいます。'],
      ['学习必须坚持，不进则退。', 'xué xí bì xū jiān chí, bù jìn zé tuì.', 'Study must be kept up: if you do not advance, you fall back.', '学問は続けなければなりません。進まなければ退くのです。'],
      ['请按时交费，否则将停止服务。', 'qǐng àn shí jiāo fèi, fǒu zé jiāng tíng zhǐ fú wù.', 'Please pay on time; otherwise the service will be stopped.', '期日どおりにお支払いください。さもなければサービスは停止されます。'],
    ],
    mistakes: ['Placing 则 before the subject of the second clause (则北方干燥 is wrong order).', 'Using 则 in casual speech where 就 is natural.'],
    mistakes_ja: ['後半の節の主語の前に「则」を置かないでください（「则北方干燥」は語順が誤り）。', 'くだけた会話では「就」が自然です。「则」は書き言葉です。'],
    exercises: [
      { type: 'fill', prompt: '哥哥性格外向，弟弟＿比较安静。', answer: '则', choices: ['则', '就', '才'], why: '则 contrasts the two brothers in written style.', why_ja: '「则」で二人の兄弟を書き言葉らしく対比します。' },
      { type: 'choose', prompt: 'Which sentence uses 则 correctly?', prompt_ja: '「则」の使い方が正しいのはどれですか。', answer: '若不努力，则难以成功。', choices: ['若不努力，则难以成功。', '则不努力，若难以成功。', '若不努力，难以成功则。'], why: '则 heads the result clause after the condition.', why_ja: '「则」は条件の後の結果の節の頭に置きます。' },
      { type: 'order', prompt: 'Make: "The city is lively, whereas the countryside is quiet."', prompt_ja: '「都市はにぎやかだが、田舎は静かだ」を作る', answer: '城市热闹农村则安静', choices: ['城市', '热闹', '农村', '则', '安静'], why: 'Subject of the second clause, then 则, then predicate.', why_ja: '後半の主語、「则」、述語の順です。' },
    ] },

  // ───────────────────────── Unit 34 ─────────────────────────
  { id: 'jinxing', unit: 34, title: '进行 + V / 作为: formal action frames', title_ja: '进行＋動詞・作为：改まった動作の枠組み',
    pattern: '(对 N) 进行 + 双音节V; 作为 + 身份/角色, …', summary: 'Nominalised verbs and stated roles in formal prose', summary_ja: '名詞化した動詞と役割の提示',
    explanation: '进行 ("carry out") is a light verb that takes a two-syllable action verb as its object: 进行讨论, 进行调查, 进行研究. The thing acted on is introduced with 对 before 进行, so 我们讨论了这个问题 becomes 我们对这个问题进行了讨论. This makes the sentence longer and more formal, which is why reports and speeches use it. 作为 "as, in the capacity of" states the role from which someone acts: 作为老师, 我有责任 …; it can also be a verb, 把 … 作为 … "take … as". Both are typical of official and academic style.',
    explanation_ja: '「进行」（行う）は二音節の動作動詞を目的語にとる軽い動詞です（「进行讨论」「进行调查」「进行研究」）。対象は「进行」の前に「对」で導くので、「我们讨论了这个问题」は「我们对这个问题进行了讨论」となります。文が長く改まった印象になるため、報告書やスピーチで多用されます。「作为」（…として）は行動する立場を示し（「作为老师，我有责任…」）、「把…作为…」（…を…とする）という動詞の用法もあります。どちらも公的・学術的な文体に典型的です。',
    ex: [
      ['警方对事故原因进行了调查。', 'jǐng fāng duì shì gù yuán yīn jìn xíng le diào chá.', 'The police conducted an investigation into the cause of the accident.', '警察は事故の原因について調査を行いました。'],
      ['双方将就合作问题进行讨论。', 'shuāng fāng jiāng jiù hé zuò wèn tí jìn xíng tǎo lùn.', 'The two sides will hold discussions on cooperation.', '双方は協力の問題について討議を行う予定です。'],
      ['作为一名医生，他必须保护患者的隐私。', 'zuò wéi yī míng yī shēng, tā bì xū bǎo hù huàn zhě de yǐn sī.', 'As a doctor, he must protect his patients\' privacy.', '医師として、彼は患者のプライバシーを守らなければなりません。'],
      ['我们把这次失败作为一次教训。', 'wǒ men bǎ zhè cì shī bài zuò wéi yī cì jiào xun.', 'We take this failure as a lesson.', '私たちはこの失敗を一つの教訓とします。'],
    ],
    mistakes: ['Following 进行 with a single-syllable verb or a noun object: 进行看 and 进行问题 are wrong.', 'Using 进行 for everyday actions (进行吃饭) where it sounds absurd.'],
    mistakes_ja: ['「进行」の後に一音節の動詞や名詞目的語は置けません（「进行看」「进行问题」は誤り）。', '日常の動作（「进行吃饭」）に使うと滑稽に聞こえます。'],
    exercises: [
      { type: 'fill', prompt: '专家对这个方案＿了评估。', answer: '进行', choices: ['进行', '进入', '实行'], why: '对 … 进行评估: carry out an evaluation of the plan.', why_ja: '「对…进行评估」で案に対して評価を行います。' },
      { type: 'choose', prompt: 'Which sentence is correct formal usage?', prompt_ja: '改まった表現として正しいのはどれですか。', answer: '学校对学生进行了安全教育。', choices: ['学校对学生进行了安全教育。', '学校进行了学生安全教育对。', '学校进行学生看安全。'], why: '对 + object + 进行 + two-syllable verb-noun.', why_ja: '「对＋対象＋进行＋二音節の動作」の形です。' },
      { type: 'produce', prompt: 'Say: "As a student, I should study hard."', prompt_ja: '「学生として、私は一生懸命勉強すべきです」と言う', answer: '作为学生，我应该努力学习', answerPinyin: 'zuò wéi xué sheng, wǒ yīng gāi nǔ lì xué xí', why: '作为 + role opens the sentence.', why_ja: '「作为＋立場」で文を始めます。' },
    ] },

  // ───────────────────────── Unit 35 ─────────────────────────
  { id: 'youzhuyu', unit: 35, title: '有助于 / 有利于 / 有益于: beneficial to', title_ja: '有助于・有利于・有益于：…に役立つ',
    pattern: 'A 有助于/有利于/有益于 + N/V', summary: 'Formal ways to say something helps or benefits', summary_ja: '役立つ・有利だ・ためになるを改まって言う',
    explanation: 'These three verbs all take 于 and an object and mean that the subject is good for it. 有助于 "helps to, contributes to" usually takes a verb phrase: 有助于提高效率. 有利于 "is advantageous to" takes a noun or verb phrase and is the most common in policy language: 有利于经济发展. 有益于 "is beneficial to" is used for health and well-being: 有益于健康. The negative forms are 不利于 and 无助于. In conversation 对 … 有帮助 / 有好处 is the everyday equivalent.',
    explanation_ja: 'この三つの動詞はいずれも「于」と目的語をとり、主語がそれにとって良いことを表します。「有助于」（…の助けになる）はふつう動詞句をとります（「有助于提高效率」）。「有利于」（…に有利だ）は名詞句も動詞句もとり、政策の文章で最も一般的です（「有利于经济发展」）。「有益于」（…のためになる）は健康や幸福について使います（「有益于健康」）。否定形は「不利于」「无助于」です。会話では「对…有帮助／有好处」が日常的な言い方です。',
    ex: [
      ['多读书有助于扩大词汇量。', 'duō dú shū yǒu zhù yú kuò dà cí huì liàng.', 'Reading a lot helps to expand one\'s vocabulary.', 'たくさん読書することは語彙を増やすのに役立ちます。'],
      ['这项政策有利于中小企业的发展。', 'zhè xiàng zhèng cè yǒu lì yú zhōng xiǎo qǐ yè de fā zhǎn.', 'This policy is favourable to the development of small and medium enterprises.', 'この政策は中小企業の発展に有利です。'],
      ['适当的运动有益于身心健康。', 'shì dàng de yùn dòng yǒu yì yú shēn xīn jiàn kāng.', 'Moderate exercise is beneficial to physical and mental health.', '適度な運動は心身の健康のためになります。'],
      ['争吵无助于解决问题。', 'zhēng chǎo wú zhù yú jiě jué wèn tí.', 'Quarrelling does not help solve the problem.', '口論は問題の解決には役立ちません。'],
    ],
    mistakes: ['Adding 对 before the object: 有助于对学习 is wrong; 于 already links it.', 'Using 有益于 for abstract advantage (policy, competition); 有利于 fits there.'],
    mistakes_ja: ['目的語の前に「对」を加えないでください（「有助于对学习」は誤り）。「于」がすでにつないでいます。', '政策や競争などの抽象的な利益には「有益于」ではなく「有利于」が合います。'],
    exercises: [
      { type: 'fill', prompt: '早睡早起＿健康。', answer: '有益于', choices: ['有益于', '有助于对', '利于有'], why: '有益于健康 is the standard collocation.', why_ja: '「有益于健康」が標準的な組み合わせです。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '新的交通规则有利于减少事故。', choices: ['新的交通规则有利于减少事故。', '新的交通规则有利于对减少事故。', '新的交通规则减少事故有利于。'], why: '有利于 + verb phrase directly.', why_ja: '「有利于」の直後に動詞句を置きます。' },
      { type: 'produce', prompt: 'Say formally: "Communication helps to reduce misunderstanding."', prompt_ja: '改まった言い方で「コミュニケーションは誤解を減らすのに役立つ」と言う', answer: '沟通有助于减少误解', answerPinyin: 'gōu tōng yǒu zhù yú jiǎn shǎo wù jiě', why: '有助于 + verb phrase.', why_ja: '「有助于＋動詞句」の形です。' },
    ] },

  // ───────────────────────── Unit 36 ─────────────────────────
  { id: 'sizige', unit: 36, title: '四字格: 不A不B, 一A一B, 有A有B, 半A半B', title_ja: '四字格：不A不B・一A一B・有A有B・半A半B',
    pattern: '不A不B; 一A一B; 有A有B; 半A半B', summary: 'Productive four-character frames', summary_ja: '生産性のある四字の型',
    explanation: 'Chinese loves four-character rhythm, and several frames generate new expressions. 不A不B with opposite words means "neither … nor" or "just right": 不大不小, 不快不慢; with synonyms it is a strong negative: 不知不觉 "unconsciously". 一A一B with nouns or verbs expresses one-by-one or alternation: 一步一步, 一问一答. 有A有B lists things present and often means "complete, well-ordered": 有说有笑, 有头有尾. 半A半B means "half … half": 半信半疑 "half believing, half doubting". Treat these as idiomatic rather than freely inventing new ones.',
    explanation_ja: '中国語は四字のリズムを好み、いくつかの型が新しい表現を生み出します。「不A不B」は反対語を入れると「…でも…でもない、ちょうどよい」を表し（「不大不小」「不快不慢」）、類義語を入れると強い否定になります（「不知不觉」）。「一A一B」は名詞や動詞を入れて一つずつ・交互の意味を表します（「一步一步」「一问一答」）。「有A有B」はそろっているものを並べ、「完全な、整った」という意味になることが多いです（「有说有笑」「有头有尾」）。「半A半B」は「半分…半分…」です（「半信半疑」）。自由に新語を作るより、慣用句として覚えてください。',
    ex: [
      ['这件衣服不大不小，正合适。', 'zhè jiàn yī fu bù dà bù xiǎo, zhèng hé shì.', 'This garment is neither too big nor too small; it fits just right.', 'この服は大きすぎず小さすぎず、ちょうどいいです。'],
      ['他们一边走一边聊，不知不觉到了车站。', 'tā men yī biān zǒu yī biān liáo, bù zhī bù jué dào le chē zhàn.', 'They chatted as they walked and reached the station before they knew it.', '二人は歩きながらおしゃべりをして、気づかないうちに駅に着きました。'],
      ['孩子们有说有笑，气氛很热闹。', 'hái zi men yǒu shuō yǒu xiào, qì fēn hěn rè nao.', 'The children were talking and laughing; the atmosphere was lively.', '子どもたちは話したり笑ったりして、とてもにぎやかでした。'],
      ['对这个消息，他半信半疑。', 'duì zhè ge xiāo xi, tā bàn xìn bàn yí.', 'He half believed and half doubted the news.', 'その知らせを、彼は半信半疑で聞きました。'],
    ],
    mistakes: ['Inventing frames with random words (不书不笔 means nothing).', 'Using 不A不B with non-opposites expecting "just right".'],
    mistakes_ja: ['好きな語を入れて型を作らないでください（「不书不笔」は意味をなしません）。', '反対語でない語を「不A不B」に入れても「ちょうどよい」の意味にはなりません。'],
    exercises: [
      { type: 'fill', prompt: '他＿步＿步地走上了山顶。', answer: '一', choices: ['一', '不', '半'], why: '一步一步 "step by step".', why_ja: '「一步一步」は「一歩一歩」です。' },
      { type: 'choose', prompt: 'Which phrase means "half believing, half doubting"?', prompt_ja: '「半信半疑」の意味を持つのはどれですか。', answer: '半信半疑', choices: ['半信半疑', '有信有疑', '不信不疑'], why: '半A半B expresses two halves of an attitude.', why_ja: '「半A半B」で態度の半分ずつを表します。' },
      { type: 'order', prompt: 'Make: "The water is neither hot nor cold."', prompt_ja: '「水は熱くも冷たくもない」を作る', answer: '水不冷不热', choices: ['水', '不冷', '不热'], why: '不A不B with the opposites 冷 / 热.', why_ja: '反対語の「冷／热」を「不A不B」に入れます。' },
    ] },

  // ───────────────────────── Unit 37 ─────────────────────────
  { id: 'er', unit: 37, title: '而: contrast and sequence', title_ja: '而：対比と連続',
    pattern: 'A 而 B (对比); Adj 而 Adj; V 而 V; 为了…而…', summary: 'The literary connector between predicates', summary_ja: '述語と述語を結ぶ文語の接続詞',
    explanation: '而 joins two predicates or clauses, never two nouns. Between contrasting ideas it means "but, whereas": 他喜欢安静, 而我喜欢热闹. Between compatible adjectives it means "and": 简单而有效 "simple and effective". Between a manner or purpose and an action it marks sequence or means: 为了理想而奋斗 "strive for an ideal", 从北京而来. 而 also forms 而且, 然而, 反而 and 从而. Because 而 is literary, it fits writing and speeches; in casual talk 但是 / 可是 / 又 are used.',
    explanation_ja: '「而」は二つの述語や節を結び、名詞と名詞は結びません。対立する内容の間では「しかし、一方」の意味です（「他喜欢安静，而我喜欢热闹」）。相容れる形容詞の間では「そして」にあたります（「简单而有效」）。様態や目的と動作の間では連続や手段を示します（「为了理想而奋斗」「从北京而来」）。「而且」「然而」「反而」「从而」も「而」から作られています。「而」は文語なので文章やスピーチに合い、くだけた会話では「但是／可是／又」を使います。',
    ex: [
      ['这种方法简单而有效。', 'zhè zhǒng fāng fǎ jiǎn dān ér yǒu xiào.', 'This method is simple and effective.', 'この方法はシンプルで効果的です。'],
      ['他喜欢城市，而他的妻子更喜欢农村。', 'tā xǐ huan chéng shì, ér tā de qī zi gèng xǐ huan nóng cūn.', 'He likes the city, whereas his wife prefers the countryside.', '彼は都市が好きですが、妻のほうは田舎を好みます。'],
      ['我们要为了共同的目标而努力。', 'wǒ men yào wèi le gòng tóng de mù biāo ér nǔ lì.', 'We must work hard for our common goal.', '私たちは共通の目標のために努力しなければなりません。'],
      ['他不是不会，而是不愿意做。', 'tā bù shì bù huì, ér shì bù yuàn yì zuò.', 'It is not that he cannot, but that he is unwilling to.', '彼はできないのではなく、やりたくないのです。'],
    ],
    mistakes: ['Joining nouns with 而: 老师而学生 is wrong (use 和).', 'Using 而 between adjectives that conflict without a contrast meaning (便宜而贵).'],
    mistakes_ja: ['名詞同士を「而」で結ばないでください（「老师而学生」は誤り。「和」を使います）。', '対比の意味がないのに相反する形容詞を「而」で結ばないでください（「便宜而贵」）。'],
    exercises: [
      { type: 'fill', prompt: '这里的冬天寒冷＿漫长。', answer: '而', choices: ['而', '和', '也'], why: '而 joins two compatible adjectives in written style.', why_ja: '「而」は相容れる二つの形容詞を書き言葉らしく結びます。' },
      { type: 'choose', prompt: 'Which sentence uses 而 for contrast correctly?', prompt_ja: '対比の「而」が正しく使われている文はどれですか。', answer: '南方湿润，而北方干燥。', choices: ['南方湿润，而北方干燥。', '南方而北方湿润干燥。', '而南方湿润，北方干燥。'], why: '而 stands between the two contrasting clauses.', why_ja: '「而」は対比する二つの節の間に置きます。' },
      { type: 'order', prompt: 'Make: "They fought for freedom."', prompt_ja: '「彼らは自由のために戦った」を作る', answer: '他们为了自由而战斗', choices: ['他们', '为了自由', '而', '战斗'], why: '为了 + purpose + 而 + verb.', why_ja: '「为了＋目的＋而＋動詞」の形です。' },
    ] },

  // ───────────────────────── Unit 38 ─────────────────────────
  { id: 'wufei', unit: 38, title: '无非: nothing but', title_ja: '无非：…にほかならない',
    pattern: '无非 (是) + N/V (+而已/罢了)', summary: 'Reducing something to its simple essence', summary_ja: '物事を単純な本質に限定する',
    explanation: '无非 means "nothing more than, simply": it declares that the matter amounts only to what follows, often with a slightly dismissive tone. It precedes the predicate, usually with 是, and is frequently closed with 而已 or 罢了: 他无非是想多赚点钱罢了. It can also introduce a short list of the only possibilities: 原因无非两个. Compared with 只是 / 只不过, 无非 sounds more analytical and belongs to a more formal register.',
    explanation_ja: '「无非」は「…にすぎない、…にほかならない」の意味で、事柄が後に続く内容だけであると断じ、やや軽く見る語気を含みます。述語の前、多くは「是」とともに置き、文末を「而已」や「罢了」で締めることがよくあります（「他无非是想多赚点钱罢了」）。「原因无非两个」のように、考えられる可能性を短く列挙することもできます。「只是／只不过」より分析的で、改まった文体です。',
    ex: [
      ['他这样做无非是为了钱。', 'tā zhè yàng zuò wú fēi shì wèi le qián.', 'He is doing this for nothing but money.', '彼がそうするのは、ただ金のためにほかなりません。'],
      ['失败的原因无非两个：准备不足和运气不好。', 'shī bài de yuán yīn wú fēi liǎng ge: zhǔn bèi bù zú hé yùn qi bù hǎo.', 'There are only two reasons for failure: poor preparation and bad luck.', '失敗の原因は二つしかありません。準備不足と運の悪さです。'],
      ['我无非是说了几句实话罢了。', 'wǒ wú fēi shì shuō le jǐ jù shí huà bà le.', 'I merely said a few true words, that is all.', '私はただ本当のことを少し言っただけです。'],
      ['所谓的办法，无非是多练习。', 'suǒ wèi de bàn fǎ, wú fēi shì duō liàn xí.', 'The so-called method is nothing but lots of practice.', 'いわゆる方法とは、練習を重ねることにほかなりません。'],
    ],
    mistakes: ['Reading 无非 as "right and wrong" (that is 是非).', 'Using 无非 when the content is impressive; it minimises.'],
    mistakes_ja: ['「无非」を「是非」（善悪）と混同しないでください。', '内容を立派に見せたいときには使いません。小さく見せる語です。'],
    exercises: [
      { type: 'fill', prompt: '他们聊的＿是工作和孩子。', answer: '无非', choices: ['无非', '并非', '除非'], why: '无非 limits the topics to those two.', why_ja: '「无非」で話題をその二つに限定します。' },
      { type: 'choose', prompt: 'Which sentence means "Her aim is simply to pass the exam"?', prompt_ja: '「彼女の目的は試験に受かることにすぎない」はどれですか。', answer: '她的目的无非是通过考试。', choices: ['她的目的无非是通过考试。', '她的目的是通过考试无非。', '无非她的目的通过考试。'], why: '无非是 precedes the predicate.', why_ja: '「无非是」は述語の前に置きます。' },
      { type: 'produce', prompt: 'Say: "He merely wants to help, nothing more."', prompt_ja: '「彼はただ手伝いたいだけにすぎない」と言う', answer: '他无非是想帮忙而已', answerPinyin: 'tā wú fēi shì xiǎng bāng máng ér yǐ', why: '无非是 … 而已 frames the simple motive.', why_ja: '「无非是…而已」で単純な動機を限定します。' },
    ] },

  // ───────────────────────── Unit 39 ─────────────────────────
  { id: 'weimian', unit: 39, title: '未免: rather too', title_ja: '未免：いささか…すぎる',
    pattern: '未免 + 太/有点/过于 + Adj', summary: 'A polite judgement that something goes too far', summary_ja: '「少しやりすぎでは」という婉曲な評価',
    explanation: '未免 expresses the speaker\'s judgement that something is excessive or inappropriate: "rather, a bit too". It is softened and polite, so it goes with 太, 有点, 过于 or 有些: 这样说未免太过分了. Unlike 难免 ("inevitable", objective), 未免 gives a personal evaluation and often hints at disagreement. It appears in discussions, reviews and polite objections.',
    explanation_ja: '「未免」は、物事が度を越している、あるいは適切でないという話し手の評価を表します（いささか…すぎる）。やわらかく丁寧な言い方なので、「太」「有点」「过于」「有些」とともに使います（「这样说未免太过分了」）。客観的な「难免」（避けられない）と違い、「未免」は個人的な評価で、しばしば不賛成をほのめかします。議論、批評、丁寧な反論に見られます。',
    ex: [
      ['你这样说未免太不客气了。', 'nǐ zhè yàng shuō wèi miǎn tài bù kè qi le.', 'Saying that is rather too impolite of you.', 'そんな言い方はいささか失礼すぎます。'],
      ['一万块钱买一双鞋，未免贵了点。', 'yī wàn kuài qián mǎi yī shuāng xié, wèi miǎn guì le diǎn.', 'Ten thousand yuan for a pair of shoes is a bit too expensive.', '靴一足に一万元は、少し高すぎるのではないでしょうか。'],
      ['这个要求未免有些过分。', 'zhè ge yāo qiú wèi miǎn yǒu xiē guò fèn.', 'This demand is somewhat excessive.', 'この要求はいささか行きすぎています。'],
      ['现在下结论未免太早。', 'xiàn zài xià jié lùn wèi miǎn tài zǎo.', 'It is rather too early to draw a conclusion now.', '今結論を出すのはいささか早すぎます。'],
    ],
    mistakes: ['Confusing 未免 with 难免: 刚开始未免出错 should be 难免出错.', 'Using 未免 without a degree word; it needs 太 / 有点 / 过于.'],
    mistakes_ja: ['「未免」と「难免」を混同しないでください。「刚开始未免出错」は「难免出错」が正しいです。', '「未免」には程度を表す語（太／有点／过于）が必要です。'],
    exercises: [
      { type: 'fill', prompt: '为了一点小事就辞职，＿太冲动了。', answer: '未免', choices: ['未免', '难免', '不免'], why: 'The speaker judges the resignation as too impulsive: 未免.', why_ja: '辞職を衝動的すぎると評価しているので「未免」です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '这个价格未免高了一些。', choices: ['这个价格未免高了一些。', '这个价格未免高。', '未免这个价格高了一些吗。'], why: '未免 + adjective + degree marker (了一些).', why_ja: '「未免＋形容詞＋程度の表現（了一些）」の形です。' },
      { type: 'produce', prompt: 'Say politely: "Your request is a bit too demanding."', prompt_ja: '丁寧に「あなたの要求は少し厳しすぎます」と言う', answer: '你的要求未免有点太高了', answerPinyin: 'nǐ de yāo qiú wèi miǎn yǒu diǎn tài gāo le', why: '未免有点太 softens the objection.', why_ja: '「未免有点太」で反対をやわらげます。' },
    ] },

  // ───────────────────────── Unit 40 ─────────────────────────
  { id: 'fuza-dingyu', unit: 40, title: '复杂定语: long attributive chains', title_ja: '複雑な連体修飾：長い「的」の連鎖',
    pattern: '[所属] + [时间/地点] + [动词短语的] + [性质] + 中心语', summary: 'Stacking modifiers before a noun in formal prose', summary_ja: '名詞の前に修飾語を重ねる',
    explanation: 'Chinese puts every modifier before the noun, so formal prose builds long chains: 去年在北京举办的国际会议 "the international conference held in Beijing last year". A usual order is: possessor or demonstrative (我们的, 这个), then number, then time or place, then verb phrase + 的, then descriptive adjective, then the head noun. Usually only one or two 的 are kept; the one after the verb phrase is obligatory. When reading, find the head noun first, then work backwards through the modifiers. When writing, keep the chain under about four parts or split it into two sentences.',
    explanation_ja: '中国語では修飾語をすべて名詞の前に置くため、改まった文章では長い連鎖ができます（「去年在北京举办的国际会议」）。ふつうの順序は、所有者や指示語（我们的、这个）、数量、時間や場所、動詞句＋的、性質を表す形容詞、そして中心となる名詞です。「的」は通常一つか二つだけ残し、動詞句の後の「的」は省けません。読むときは先に中心語を見つけ、修飾語を後ろから順にたどってください。書くときは四つほどの要素に抑えるか、二文に分けるとよいでしょう。',
    ex: [
      ['这是我去年在上海买的一本旧书。', 'zhè shì wǒ qù nián zài shàng hǎi mǎi de yī běn jiù shū.', 'This is an old book I bought in Shanghai last year.', 'これは私が去年上海で買った古い本です。'],
      ['参加会议的来自世界各地的专家都发了言。', 'cān jiā huì yì de lái zì shì jiè gè dì de zhuān jiā dōu fā le yán.', 'The experts from all over the world who attended the meeting all spoke.', '会議に参加した世界各地からの専門家が全員発言しました。'],
      ['他提出的解决交通问题的新方案得到了支持。', 'tā tí chū de jiě jué jiāo tōng wèn tí de xīn fāng àn dé dào le zhī chí.', 'The new plan he proposed for solving the traffic problem won support.', '彼が提案した交通問題を解決する新しい案は支持を得ました。'],
      ['那位穿红衣服的年轻女士是我们的新经理。', 'nà wèi chuān hóng yī fu de nián qīng nǚ shì shì wǒ men de xīn jīng lǐ.', 'That young lady in red is our new manager.', 'あの赤い服を着た若い女性が私たちの新しいマネージャーです。'],
    ],
    mistakes: ['Putting a relative-style clause after the noun as in English: 书我买的 is wrong.', 'Keeping a 的 after every single modifier, which makes the phrase heavy.'],
    mistakes_ja: ['英語のように名詞の後に修飾節を置かないでください（「书我买的」は誤り）。', 'すべての修飾語に「的」を付けると重くなります。'],
    exercises: [
      { type: 'order', prompt: 'Make: "the house my grandfather built in the countryside"', prompt_ja: '「祖父が田舎に建てた家」を作る', answer: '我爷爷在农村建的房子', choices: ['我爷爷', '在农村', '建的', '房子'], why: 'Possessor + place + verb + 的 + head noun.', why_ja: '「所有者＋場所＋動詞＋的＋中心語」の順です。' },
      { type: 'choose', prompt: 'Which phrase is in the correct order?', prompt_ja: '語順が正しいのはどれですか。', answer: '一位昨天刚来的年轻老师', choices: ['一位昨天刚来的年轻老师', '年轻的一位老师昨天刚来的', '昨天一位年轻刚来老师的'], why: 'Number, time + verb phrase + 的, adjective, noun.', why_ja: '「数量、時間＋動詞句＋的、形容詞、名詞」の順です。' },
      { type: 'fill', prompt: '他是我们公司最有经验＿工程师。', answer: '的', choices: ['的', '之', '地'], why: 'A superlative attributive needs 的 before the noun.', why_ja: '最上級の連体修飾には名詞の前に「的」が必要です。' },
    ] },

  // ───────────────────────── Unit 41 ─────────────────────────
  { id: 'fan', unit: 41, title: '凡 / 凡是: whoever, whatever', title_ja: '凡・凡是：およそ…はすべて',
    pattern: '凡(是) + N/V 的, 都/一律/均 …', summary: 'Generalising over a whole category', summary_ja: 'ある種類すべてについて一般化する',
    explanation: '凡是 (written also as 凡) opens a phrase that covers every member of a category: 凡是参加的人 "everyone who participates". The main clause then uses 都, or in formal text 一律 / 均 / 无不, to state what applies to all of them. It is typical of rules, notices and generalisations. 凡 alone is more literary; 凡是 is neutral. Do not confuse with 平凡 "ordinary".',
    explanation_ja: '「凡是」（書き言葉では「凡」とも）は、ある種類に属するすべてを指す句を導きます（「凡是参加的人」）。主節では「都」、改まった文では「一律／均／无不」を使って、それら全部に当てはまることを述べます。規則、掲示、一般論に典型的です。「凡」だけのほうが文語的で、「凡是」は中立的です。「平凡」（平凡な）と混同しないでください。',
    ex: [
      ['凡是报名的人都可以参加培训。', 'fán shì bào míng de rén dōu kě yǐ cān jiā péi xùn.', 'Everyone who registers may take part in the training.', '申し込んだ人は誰でも研修に参加できます。'],
      ['凡是过期的食品一律不能出售。', 'fán shì guò qī de shí pǐn yī lǜ bù néng chū shòu.', 'Any food past its date may not be sold.', '期限切れの食品はすべて販売してはいけません。'],
      ['凡是他说过的话，他都会做到。', 'fán shì tā shuō guò de huà, tā dōu huì zuò dào.', 'Whatever he has said, he will do.', '彼は自分が言ったことはすべて実行します。'],
      ['凡与本案有关的材料均已提交。', 'fán yǔ běn àn yǒu guān de cái liào jūn yǐ tí jiāo.', 'All materials related to this case have been submitted.', '本件に関する資料はすべて提出済みです。'],
    ],
    mistakes: ['Omitting 都 / 一律 in the main clause.', 'Using 凡是 for a single specific item; it generalises.'],
    mistakes_ja: ['主節の「都／一律」を落とさないでください。', '特定の一つの物には使いません。全体を一般化する語です。'],
    exercises: [
      { type: 'fill', prompt: '＿年满十八岁的公民都有投票权。', answer: '凡是', choices: ['凡是', '平凡', '非凡'], why: '凡是 + category … 都: all citizens over eighteen.', why_ja: '「凡是＋種類…都」で十八歳以上の市民すべてです。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '凡是新来的员工，都要参加培训。', choices: ['凡是新来的员工，都要参加培训。', '凡是新来的员工，要参加培训他。', '新来的员工凡是，都要参加培训。'], why: '凡是 opens the phrase; 都 follows in the main clause.', why_ja: '「凡是」が句を導き、主節に「都」が続きます。' },
      { type: 'produce', prompt: 'Write a rule: "All visitors must register."', prompt_ja: '規則として「来訪者は全員登録しなければならない」と書く', answer: '凡是来访者，一律要登记', answerPinyin: 'fán shì lái fǎng zhě, yī lǜ yào dēng jì', why: '凡是 … 一律 is the formal rule pattern.', why_ja: '「凡是…一律」は規則の改まった型です。' },
    ] },

  // ───────────────────────── Unit 42 ─────────────────────────
  { id: 'tangruo', unit: 42, title: '倘若 / 若 / 假使: formal "if"', title_ja: '倘若・若・假使：書き言葉の「もし」',
    pattern: '倘若/若/假使 + 条件, (就/则/便) …', summary: 'Literary conditionals', summary_ja: '文語の条件表現',
    explanation: '若, 倘若, 倘使 and 假使 are written-register forms of 如果 "if". 若 is the shortest and most literary, common in proverbs and formal prose (若有问题, 请联系我们); 倘若 is a full conjunction used in essays and speeches; 假使 and 假如 stress that the condition is imagined. The main clause may use 就, 便 (literary 就) or 则. The literary negative is 若不 / 若非. In speech, 如果 and 要是 remain the natural choices.',
    explanation_ja: '「若」「倘若」「倘使」「假使」は「如果」（もし）の書き言葉です。「若」は最も短く文語的で、ことわざや改まった文に多く見られます（「若有问题，请联系我们」）。「倘若」は論説文やスピーチで使う本格的な接続詞で、「假使」「假如」は条件が想像上のものであることを強調します。主節には「就」「便」（「就」の文語）「则」を使えます。文語の否定は「若不／若非」です。会話では「如果」「要是」が自然です。',
    ex: [
      ['倘若明天下雨，活动将改期举行。', 'tǎng ruò míng tiān xià yǔ, huó dòng jiāng gǎi qī jǔ xíng.', 'Should it rain tomorrow, the event will be rescheduled.', 'もし明日雨が降れば、イベントは日を改めて行われます。'],
      ['若有任何疑问，请随时联系我们。', 'ruò yǒu rèn hé yí wèn, qǐng suí shí lián xì wǒ men.', 'If you have any questions, please contact us at any time.', 'ご質問があれば、いつでもご連絡ください。'],
      ['假使当时他听了劝告，就不会出事。', 'jiǎ shǐ dāng shí tā tīng le quàn gào, jiù bù huì chū shì.', 'Had he taken the advice at the time, nothing would have happened.', 'もしあのとき彼が忠告を聞いていたら、事故は起きなかったでしょう。'],
      ['若不努力，便难以成功。', 'ruò bù nǔ lì, biàn nán yǐ chéng gōng.', 'Without effort, success is hard to achieve.', '努力しなければ、成功は難しいです。'],
    ],
    mistakes: ['Writing 若 in a casual text message, where 要是 fits.', 'Pairing 倘若 with 但是 instead of 就 / 则 / 便.'],
    mistakes_ja: ['くだけたメッセージに「若」は硬すぎます。「要是」が合います。', '「倘若」の相手は「但是」ではなく「就／则／便」です。'],
    exercises: [
      { type: 'fill', prompt: '＿你同意，我们明天就签合同。', answer: '倘若', choices: ['倘若', '尽管', '即便'], why: 'A condition followed by 就: 倘若.', why_ja: '条件に「就」が続くので「倘若」です。' },
      { type: 'choose', prompt: 'Which sentence is a formal conditional?', prompt_ja: '改まった条件文はどれですか。', answer: '若需帮助，请按此键。', choices: ['若需帮助，请按此键。', '若需帮助，但是请按此键。', '请按此键若需帮助了。'], why: '若 + condition, then the instruction.', why_ja: '「若＋条件」の後に指示を続けます。' },
      { type: 'produce', prompt: 'Write formally: "If the price rises, demand will fall."', prompt_ja: '書き言葉で「もし価格が上がれば、需要は下がる」と書く', answer: '倘若价格上涨，需求便会下降', answerPinyin: 'tǎng ruò jià gé shàng zhǎng, xū qiú biàn huì xià jiàng', why: '倘若 … 便 … is a literary condition-result pair.', why_ja: '「倘若…便…」は文語の条件と結果の組み合わせです。' },
    ] },

  // ───────────────────────── Unit 43 ─────────────────────────
  { id: 'shenzhiyu', unit: 43, title: '甚至 / 甚至于: even, to the extent that', title_ja: '甚至・甚至于：…さえ、…にいたるまで',
    pattern: 'A, B, 甚至 C; 甚至于 + 极端的情况', summary: 'Climaxing a list with the most extreme case', summary_ja: '最も極端な例で列挙を締めくくる',
    explanation: '甚至 "even" introduces the most extreme item in a series, showing how far something goes: 他会说英语, 法语, 甚至阿拉伯语. 甚至于 is a fuller, more written form, often introducing a whole clause that describes an extreme consequence: 他忙得甚至于忘了自己的生日. Both can be followed by 连 … 都 for extra emphasis. 乃至 is a still more literary equivalent in formal prose. Note that 甚至 can stand before the subject, verb or object.',
    explanation_ja: '「甚至」（…さえ）は列挙の中で最も極端な項目を導き、物事がどこまで及ぶかを示します（「他会说英语，法语，甚至阿拉伯语」）。「甚至于」はより完全で書き言葉的な形で、極端な結果を述べる節を丸ごと導くことが多いです（「他忙得甚至于忘了自己的生日」）。どちらも「连…都」を続けて強調できます。「乃至」は改まった文章でのさらに文語的な同義語です。「甚至」は主語、動詞、目的語のいずれの前にも置けます。',
    ex: [
      ['他每天工作十小时，甚至周末也不休息。', 'tā měi tiān gōng zuò shí xiǎo shí, shèn zhì zhōu mò yě bù xiū xī.', 'He works ten hours a day and does not even rest at weekends.', '彼は毎日十時間働き、週末さえ休みません。'],
      ['这个消息传得很快，甚至国外的朋友都知道了。', 'zhè ge xiāo xi chuán de hěn kuài, shèn zhì guó wài de péng you dōu zhī dào le.', 'The news spread fast; even friends abroad heard of it.', 'その知らせはすぐに広まり、海外の友人までもが知っていました。'],
      ['他紧张得甚至于说不出话来。', 'tā jǐn zhāng de shèn zhì yú shuō bù chū huà lái.', 'He was so nervous that he could not even speak.', '彼は緊張のあまり、言葉さえ出ませんでした。'],
      ['有些人为了工作甚至牺牲了健康。', 'yǒu xiē rén wèi le gōng zuò shèn zhì xī shēng le jiàn kāng.', 'Some people have even sacrificed their health for work.', '仕事のために健康まで犠牲にした人もいます。'],
    ],
    mistakes: ['Putting 甚至 before an ordinary item instead of the extreme one.', 'Using 甚至 as a verb or noun; it is an adverb/conjunction.'],
    mistakes_ja: ['極端でない項目の前に「甚至」を置かないでください。', '「甚至」は副詞・接続詞です。動詞や名詞としては使えません。'],
    exercises: [
      { type: 'fill', prompt: '他很节约，＿一张纸也不浪费。', answer: '甚至', choices: ['甚至', '至于', '以至'], why: 'Not wasting a single sheet is the extreme example: 甚至.', why_ja: '紙一枚も無駄にしないのが極端な例なので「甚至」です。' },
      { type: 'choose', prompt: 'Which sentence uses 甚至于 correctly?', prompt_ja: '「甚至于」の使い方が正しいのはどれですか。', answer: '他累得甚至于站不起来。', choices: ['他累得甚至于站不起来。', '甚至于他累得站不起来了吗。', '他甚至于累得了站不起来。'], why: '甚至于 introduces the extreme consequence after 得.', why_ja: '「甚至于」は「得」の後に極端な結果を導きます。' },
      { type: 'order', prompt: 'Make: "Even children can understand this book."', prompt_ja: '「この本は子どもでさえ理解できる」を作る', answer: '这本书甚至孩子都能看懂', choices: ['这本书', '甚至', '孩子', '都能', '看懂'], why: '甚至 + extreme subject + 都.', why_ja: '「甚至＋極端な主語＋都」の形です。' },
    ] },

  // ───────────────────────── Unit 45 ─────────────────────────
  { id: 'guran', unit: 45, title: '固然…但是: admittedly … but', title_ja: '固然…但是：確かに…だが',
    pattern: 'A 固然 …, 但是/可是/却 …', summary: 'Conceding a point before making the real one', summary_ja: '相手の点を認めてから本題を述べる',
    explanation: '固然 concedes that something is true ("admittedly, it is true that") and prepares a 但是 / 可是 / 却 clause that carries the speaker\'s real point. It follows the subject: 这个方法固然好, 但是太贵. Unlike 虽然, which simply reports a fact, 固然 signals that the speaker accepts the point but does not consider it decisive, which makes it ideal for debate and essays. A second use, 固然 … 也 …, admits one case and adds another: 成功固然可喜, 失败也不可怕.',
    explanation_ja: '「固然」は何かが事実であることを認め（確かに…ではあるが）、話し手の本当の主張を載せる「但是／可是／却」の節を準備します。主語の後に置きます（「这个方法固然好，但是太贵」）。単に事実を述べる「虽然」と違い、「固然」はその点を認めつつ決定的ではないと考えていることを示すので、討論や論説文に向いています。もう一つの用法「固然…也…」は、一方を認めてもう一方を付け加えます（「成功固然可喜，失败也不可怕」）。',
    ex: [
      ['这个计划固然不错，但是成本太高。', 'zhè ge jì huà gù rán bù cuò, dàn shì chéng běn tài gāo.', 'Admittedly this plan is good, but the cost is too high.', 'この計画は確かに悪くありませんが、コストが高すぎます。'],
      ['钱固然重要，可是健康更重要。', 'qián gù rán zhòng yào, kě shì jiàn kāng gèng zhòng yào.', 'Money is important, to be sure, but health matters more.', 'お金は確かに大切ですが、健康のほうがもっと大切です。'],
      ['他固然有错，你也不该这样骂他。', 'tā gù rán yǒu cuò, nǐ yě bù gāi zhè yàng mà tā.', 'He was wrong, admittedly, but you should not scold him like that either.', '彼に非があるのは確かですが、あなたもあんなふうに叱るべきではありません。'],
      ['成功固然令人高兴，失败也是一种经验。', 'chéng gōng gù rán lìng rén gāo xìng, shī bài yě shì yī zhǒng jīng yàn.', 'Success is pleasing, of course, but failure is also an experience.', '成功は確かに嬉しいものですが、失敗もまた一つの経験です。'],
    ],
    mistakes: ['Placing 固然 before the subject (固然这个计划不错 is unusual).', 'Using 固然 without a second clause that turns the argument.'],
    mistakes_ja: ['「固然」を主語の前に置くのはふつうではありません。', '論を転じる後半の節なしに「固然」だけで終わらないでください。'],
    exercises: [
      { type: 'fill', prompt: '汽车＿方便，但是污染环境。', answer: '固然', choices: ['固然', '虽说', '即便'], why: '固然 concedes convenience before the objection.', why_ja: '「固然」で便利さを認めてから反論します。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '价格固然便宜，质量却不好。', choices: ['价格固然便宜，质量却不好。', '固然价格便宜，质量却不好了吗。', '价格便宜固然，质量不好。'], why: '固然 after the subject, 却 in the second clause.', why_ja: '「固然」は主語の後、「却」は後半の節に置きます。' },
      { type: 'produce', prompt: 'Say: "Experience is certainly important, but attitude matters more."', prompt_ja: '「経験は確かに大事だが、態度のほうが重要だ」と言う', answer: '经验固然重要，但是态度更重要', answerPinyin: 'jīng yàn gù rán zhòng yào, dàn shì tài du gèng zhòng yào', why: '固然 … 但是 … concedes and then asserts.', why_ja: '「固然…但是…」で認めてから主張します。' },
    ] },

  // ───────────────────────── Unit 46 ─────────────────────────
  { id: 'zaiyu', unit: 46, title: '在于: lies in', title_ja: '在于：…にある',
    pattern: 'A 在于 B; 关键/问题/原因/目的 在于 …', summary: 'Locating the essence or key of something', summary_ja: '本質や要点がどこにあるかを示す',
    explanation: '在于 links an abstract subject (关键, 问题, 原因, 目的, 区别) to what it consists of: 成功的关键在于坚持 "the key to success lies in persistence". It is followed by a noun, verb phrase or clause. The negative is 不在于, often paired with 而在于: 问题不在于钱, 而在于时间. 取决于 "depends on" is similar but stresses dependence on a factor; 在于 identifies the content itself. The word is formal but common in speech when analysing.',
    explanation_ja: '「在于」は抽象的な主語（关键、问题、原因、目的、区别）と、その内容とを結びます（「成功的关键在于坚持」）。後ろには名詞、動詞句、節を置けます。否定は「不在于」で、「而在于」と組んで使うことが多いです（「问题不在于钱，而在于时间」）。「取决于」（…次第だ）も似ていますが、ある要因への依存を強調するのに対し、「在于」は内容そのものを示します。改まった語ですが、分析的に話すときは会話でもよく使われます。',
    ex: [
      ['学习语言的关键在于每天练习。', 'xué xí yǔ yán de guān jiàn zài yú měi tiān liàn xí.', 'The key to learning a language lies in daily practice.', '言語学習の鍵は毎日練習することにあります。'],
      ['问题不在于钱，而在于时间。', 'wèn tí bù zài yú qián, ér zài yú shí jiān.', 'The problem is not money but time.', '問題はお金ではなく、時間にあります。'],
      ['这两种方法的区别在于速度。', 'zhè liǎng zhǒng fāng fǎ de qū bié zài yú sù dù.', 'The difference between the two methods lies in speed.', 'この二つの方法の違いは速さにあります。'],
      ['我们的目的在于提高服务质量。', 'wǒ men de mù dì zài yú tí gāo fú wù zhì liàng.', 'Our aim is to improve the quality of service.', '私たちの目的はサービスの質を高めることにあります。'],
    ],
    mistakes: ['Using 在于 with a concrete location (书在于桌子上 is wrong; use 在).', 'Writing 在于 + 是.'],
    mistakes_ja: ['具体的な場所には使えません（「书在于桌子上」は誤り。「在」を使います）。', '「在于」の後に「是」は付けません。'],
    exercises: [
      { type: 'fill', prompt: '健康的关键＿良好的习惯。', answer: '在于', choices: ['在于', '对于', '由于'], why: '关键在于 …: the key lies in good habits.', why_ja: '「关键在于…」で鍵が良い習慣にあることを示します。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '成功不在于运气，而在于努力。', choices: ['成功不在于运气，而在于努力。', '成功在于不运气，而是努力在于。', '成功不在于是运气，在于是努力。'], why: '不在于 … 而在于 … corrects the location of the essence.', why_ja: '「不在于…而在于…」で本質のありかを訂正します。' },
      { type: 'produce', prompt: 'Say: "The difference lies in attitude."', prompt_ja: '「違いは態度にある」と言う', answer: '区别在于态度', answerPinyin: 'qū bié zài yú tài du', why: 'Abstract subject + 在于 + content.', why_ja: '「抽象的な主語＋在于＋内容」の形です。' },
    ] },

  // ───────────────────────── Unit 47 ─────────────────────────
  { id: 'youyu-formal', unit: 47, title: '由于…(因而/因此): formal cause', title_ja: '由于…（因而・因此）：改まった原因表現',
    pattern: '由于 + 原因, (因此/因而/所以) …; 由于 + N', summary: 'Stating causes in reports and essays', summary_ja: '報告書や論説文で原因を述べる',
    explanation: '由于 "owing to, because of" is the formal counterpart of 因为. It can take a clause or a noun phrase, and the result is introduced by 因此, 因而 (written) or 所以: 由于天气原因, 航班因此延误. Unlike 因为, 由于 usually opens the sentence and is rarely placed in the second clause (因为 can follow the result: 我没去, 因为太忙; 由于 cannot). 因而 and 从而 both mean "thus"; 从而 adds the idea of a further step enabled by the first.',
    explanation_ja: '「由于」（…のため）は「因为」の改まった形です。節も名詞句もとることができ、結果は「因此」「因而」（書き言葉）「所以」で導きます（「由于天气原因，航班因此延误」）。「因为」と違い、「由于」はふつう文頭に置き、後半の節にはほとんど置きません（「我没去，因为太忙」は可能ですが、「由于」ではできません）。「因而」「从而」はどちらも「それによって」の意味で、「从而」は前の事柄によって可能になる次の段階を含みます。',
    ex: [
      ['由于交通堵塞，他迟到了半个小时。', 'yóu yú jiāo tōng dǔ sè, tā chí dào le bàn ge xiǎo shí.', 'Owing to the traffic jam, he was half an hour late.', '交通渋滞のため、彼は三十分遅刻しました。'],
      ['由于准备充分，因此比赛取得了好成绩。', 'yóu yú zhǔn bèi chōng fèn, yīn cǐ bǐ sài qǔ dé le hǎo chéng jì.', 'Because of thorough preparation, the team achieved good results in the competition.', '準備が十分だったため、試合で良い成績を収めました。'],
      ['由于种种原因，这个项目最终被取消。', 'yóu yú zhǒng zhǒng yuán yīn, zhè ge xiàng mù zuì zhōng bèi qǔ xiāo.', 'For various reasons, the project was finally cancelled.', 'さまざまな理由により、このプロジェクトは最終的に中止されました。'],
      ['公司改进了技术，从而降低了成本。', 'gōng sī gǎi jìn le jì shù, cóng ér jiàng dī le chéng běn.', 'The company improved its technology and thereby lowered costs.', '会社は技術を改良し、それによってコストを下げました。'],
    ],
    mistakes: ['Placing 由于 in the second clause: 他迟到了, 由于堵车 is unnatural.', 'Writing 由于 … 所以 in a formal text where 因此 / 因而 is expected.'],
    mistakes_ja: ['「由于」を後半の節に置くのは不自然です（「他迟到了，由于堵车」）。', '改まった文では「由于…所以」より「因此／因而」が期待されます。'],
    exercises: [
      { type: 'fill', prompt: '＿天气恶劣，比赛被迫取消。', answer: '由于', choices: ['由于', '因此', '从而'], why: '由于 opens the cause clause.', why_ja: '「由于」で原因の節を始めます。' },
      { type: 'choose', prompt: 'Which sentence is natural formal Chinese?', prompt_ja: '自然な改まった中国語はどれですか。', answer: '由于缺乏资金，计划因而推迟。', choices: ['由于缺乏资金，计划因而推迟。', '计划推迟，由于缺乏资金。', '因而缺乏资金，计划由于推迟。'], why: '由于 + cause first, 因而 + result.', why_ja: '「由于＋原因」を先に、「因而＋結果」を後に置きます。' },
      { type: 'produce', prompt: 'Write formally: "Owing to his efforts, the problem was finally solved."', prompt_ja: '書き言葉で「彼の努力により、問題はついに解決された」と書く', answer: '由于他的努力，问题终于得到了解决', answerPinyin: 'yóu yú tā de nǔ lì, wèn tí zhōng yú dé dào le jiě jué', why: '由于 + noun phrase, then the result.', why_ja: '「由于＋名詞句」の後に結果を述べます。' },
    ] },

  // ───────────────────────── Unit 49 ─────────────────────────
  { id: 'suo', unit: 49, title: '所: 所 + V and 为…所…', title_ja: '所：所＋動詞と「为…所…」',
    pattern: '(N) 所 + V + 的 + N; 为 + N + 所 + V; 所谓; 所有', summary: 'A literary nominaliser and passive marker', summary_ja: '文語の名詞化と受身の標識',
    explanation: '所 placed before a verb turns it into "what is V-ed": 我所知道的 "what I know", 他所说的话 "the words he said". It is optional before 的 in modern Chinese but adds a formal, precise tone and is common in documents: 所需材料 "the materials required". 为 … 所 … is a written passive: 为大家所接受 "accepted by everyone". 所 also forms fixed words: 所谓 "so-called", 所有 "all", 所以 "therefore", 无所谓 "it does not matter". Remember that 所 needs a verb immediately after it.',
    explanation_ja: '「所」を動詞の前に置くと「…されるもの、…すること」になります（「我所知道的」「他所说的话」）。現代語では「的」の前の「所」は省略できますが、改まった正確な響きが加わるため、文書でよく使われます（「所需材料」）。「为…所…」は書き言葉の受身です（「为大家所接受」）。「所」は「所谓」（いわゆる）、「所有」（すべての）、「所以」（したがって）、「无所谓」（かまわない）などの語も作ります。「所」の直後には必ず動詞が来ます。',
    ex: [
      ['这就是我所了解的全部情况。', 'zhè jiù shì wǒ suǒ liǎo jiě de quán bù qíng kuàng.', 'This is all that I know of the situation.', 'これが私の知っている状況のすべてです。'],
      ['请准备好申请所需的材料。', 'qǐng zhǔn bèi hǎo shēn qǐng suǒ xū de cái liào.', 'Please prepare the materials required for the application.', '申請に必要な書類を準備してください。'],
      ['他的建议为大家所接受。', 'tā de jiàn yì wéi dà jiā suǒ jiē shòu.', 'His suggestion was accepted by everyone.', '彼の提案はみんなに受け入れられました。'],
      ['所谓成功，就是不断进步。', 'suǒ wèi chéng gōng, jiù shì bù duàn jìn bù.', 'So-called success is simply constant progress.', 'いわゆる成功とは、絶えず進歩することにほかなりません。'],
    ],
    mistakes: ['Putting a noun directly after 所 (所问题 is wrong).', 'Using 为 … 所 … in casual speech where 被 is natural.'],
    mistakes_ja: ['「所」の直後に名詞は置けません（「所问题」は誤り）。', 'くだけた会話では「为…所…」ではなく「被」が自然です。'],
    exercises: [
      { type: 'fill', prompt: '他＿做的一切都是为了家人。', answer: '所', choices: ['所', '之', '其'], why: '所做的一切: everything that he does.', why_ja: '「所做的一切」で彼がすることすべてです。' },
      { type: 'choose', prompt: 'Which sentence is a correct written passive?', prompt_ja: '書き言葉の受身として正しいのはどれですか。', answer: '这个观点为许多学者所支持。', choices: ['这个观点为许多学者所支持。', '这个观点所许多学者为支持。', '许多学者为这个观点所了。'], why: '为 + agent + 所 + verb.', why_ja: '「为＋動作主＋所＋動詞」の形です。' },
      { type: 'order', prompt: 'Make: "what the teacher said"', prompt_ja: '「先生が言ったこと」を作る', answer: '老师所说的话', choices: ['老师', '所', '说的', '话'], why: 'Agent + 所 + verb + 的 + noun.', why_ja: '「動作主＋所＋動詞＋的＋名詞」の順です。' },
    ] },

  // ───────────────────────── Unit 50 ─────────────────────────
  { id: 'shuolaishuoqu', unit: 50, title: '说来说去 / 总而言之: summing up', title_ja: '说来说去・总而言之：要するに',
    pattern: '说来说去, …; 总而言之/总之, …; V来V去', summary: 'Closing a discussion with its essence', summary_ja: '議論を本質でまとめる',
    explanation: '说来说去 "after all that talk" introduces the conclusion that remains once the discussion is stripped down, often with a note of impatience: 说来说去, 还是钱的问题. It uses the frame V来V去 "V back and forth", also seen in 想来想去 "think it over and over" and 走来走去 "pace up and down". 总而言之 and the shorter 总之 mean "in a word, all in all" and are neutral summarisers suited to essays and speeches. 归根到底 "in the final analysis" points to the root cause.',
    explanation_ja: '「说来说去」（あれこれ言っても結局）は、議論をそぎ落とした後に残る結論を導き、しばしばいらだちを含みます（「说来说去，还是钱的问题」）。「V来V去」（…したり…したり）という型で、「想来想去」（あれこれ考える）、「走来走去」（行ったり来たりする）にも見られます。「总而言之」と短い「总之」は「要するに、結局のところ」の意味で、論説文やスピーチに合う中立的なまとめの語です。「归根到底」（突き詰めれば）は根本的な原因を指します。',
    ex: [
      ['说来说去，问题还是出在管理上。', 'shuō lái shuō qù, wèn tí hái shi chū zài guǎn lǐ shàng.', 'When all is said and done, the problem still lies in management.', 'あれこれ言っても、問題はやはり管理にあります。'],
      ['我想来想去，还是决定留下来。', 'wǒ xiǎng lái xiǎng qù, hái shi jué dìng liú xià lái.', 'After much thought, I decided to stay after all.', '私はあれこれ考えた末、やはり残ることにしました。'],
      ['总而言之，这次合作是成功的。', 'zǒng ér yán zhī, zhè cì hé zuò shì chéng gōng de.', 'All in all, this cooperation was a success.', '要するに、今回の協力は成功でした。'],
      ['归根到底，还是要靠自己努力。', 'guī gēn dào dǐ, hái shi yào kào zì jǐ nǔ lì.', 'In the final analysis, it still comes down to one\'s own effort.', '突き詰めれば、やはり自分の努力にかかっています。'],
    ],
    mistakes: ['Using 说来说去 at the start of a discussion; it closes one.', 'Treating 总而言之 as "in general" (大体上); it means "in conclusion".'],
    mistakes_ja: ['「说来说去」は議論の最初には使いません。締めくくりに使います。', '「总而言之」は「大体上」（おおむね）ではなく「結論として」の意味です。'],
    exercises: [
      { type: 'fill', prompt: '＿，这件事还是得你自己决定。', answer: '说来说去', choices: ['说来说去', '说不定', '说实话'], why: 'The discussion ends where it began: 说来说去.', why_ja: '議論が元の点に戻るので「说来说去」です。' },
      { type: 'choose', prompt: 'Which sentence sums up a speech?', prompt_ja: 'スピーチをまとめる文はどれですか。', answer: '总而言之，我们必须保护环境。', choices: ['总而言之，我们必须保护环境。', '走来走去，我们必须保护环境。', '总而言之是我们保护环境吗。'], why: '总而言之 opens the final conclusion.', why_ja: '「总而言之」で最後の結論を始めます。' },
      { type: 'produce', prompt: 'Say: "In short, we have no time left."', prompt_ja: '「要するに、私たちにはもう時間がない」と言う', answer: '总之，我们没有时间了', answerPinyin: 'zǒng zhī, wǒ men méi yǒu shí jiān le', why: '总之 is the compact form of 总而言之.', why_ja: '「总之」は「总而言之」の短い形です。' },
    ] },

  // ───────────────────────── Unit 53 ─────────────────────────
  { id: 'buliao', unit: 53, title: '不料 / 不至于: unexpectedly; not go so far as', title_ja: '不料・不至于：思いがけず／…ほどではない',
    pattern: '…, 不料 + 意外的结果; 不至于 + 极端情况', summary: 'An unexpected turn and an excluded extreme', summary_ja: '意外な展開と、ありえない極端',
    explanation: '不料 "who would have thought, unexpectedly" opens the second clause and introduces an outcome that contradicts what was expected: 本想早点到, 不料路上堵车. The colloquial equivalents are 没想到 and 谁知(道). 不至于 "would not go so far as to" denies that a situation reaches an extreme: 他不至于骗你 "he would not go as far as to deceive you". It can stand alone as a reply (不至于吧 "surely not that bad"). Both are frequent in narrative and in reassurance.',
    explanation_ja: '「不料」（思いがけず、意外にも）は後半の節の頭に置き、予想に反する結果を導きます（「本想早点到，不料路上堵车」）。口語では「没想到」「谁知（道）」を使います。「不至于」（…というほどではない）は、状況が極端に至ることを否定します（「他不至于骗你」）。単独で返事にもなります（「不至于吧」）。どちらも物語や、相手を安心させる場面でよく使われます。',
    ex: [
      ['我本来打算去旅行，不料突然生病了。', 'wǒ běn lái dǎ suàn qù lǚ xíng, bù liào tū rán shēng bìng le.', 'I had planned to travel, but unexpectedly I fell ill.', '旅行に行くつもりでしたが、思いがけず急に病気になりました。'],
      ['他以为考试很容易，不料题目特别难。', 'tā yǐ wéi kǎo shì hěn róng yì, bù liào tí mù tè bié nán.', 'He thought the exam would be easy, but the questions turned out to be very hard.', '彼は試験が簡単だと思っていましたが、意外にも問題はとても難しかったのです。'],
      ['他只是迟到了几分钟，不至于被开除吧。', 'tā zhǐ shì chí dào le jǐ fēn zhōng, bù zhì yú bèi kāi chú ba.', 'He was only a few minutes late; surely he will not be fired for that.', '彼は数分遅れただけですから、解雇されるほどではないでしょう。'],
      ['情况虽然不好，但还不至于绝望。', 'qíng kuàng suī rán bù hǎo, dàn hái bù zhì yú jué wàng.', 'The situation is bad, but not so bad as to be hopeless.', '状況は良くありませんが、絶望するほどではありません。'],
    ],
    mistakes: ['Using 不料 for an expected result.', 'Reading 不至于 as "not arrive"; it means "not reach that extreme".'],
    mistakes_ja: ['予想どおりの結果に「不料」は使いません。', '「不至于」は「到着しない」ではなく「そこまでは至らない」の意味です。'],
    exercises: [
      { type: 'fill', prompt: '我们计划周末爬山，＿下起了大雨。', answer: '不料', choices: ['不料', '不至于', '不禁'], why: 'The rain contradicts the plan: 不料.', why_ja: '雨が計画に反する展開なので「不料」です。' },
      { type: 'choose', prompt: 'Which sentence reassures that things are not that extreme?', prompt_ja: 'そこまでひどくないと安心させる文はどれですか。', answer: '只是小问题，不至于影响整个项目。', choices: ['只是小问题，不至于影响整个项目。', '只是小问题，不料影响整个项目。', '只是小问题，不至于了影响。'], why: '不至于 + extreme result denies that it will happen.', why_ja: '「不至于＋極端な結果」でそうはならないと否定します。' },
      { type: 'produce', prompt: 'Say: "I thought he had left, but unexpectedly he was still waiting."', prompt_ja: '「彼は帰ったと思ったが、意外にもまだ待っていた」と言う', answer: '我以为他走了，不料他还在等', answerPinyin: 'wǒ yǐ wéi tā zǒu le, bù liào tā hái zài děng', why: '以为 … 不料 … contrasts expectation and reality.', why_ja: '「以为…不料…」で予想と現実を対比します。' },
    ] },

  // ───────────────────────── Unit 57 ─────────────────────────
  { id: 'qi3', unit: 57, title: '岂 / 何尝: rhetorical questions', title_ja: '岂・何尝：反語の疑問',
    pattern: '岂 + 能/不/非 …?; 何尝 + V/不 V?', summary: 'Literary rhetorical adverbs', summary_ja: '文語の反語副詞',
    explanation: '岂 asks a rhetorical question that expects the opposite answer: 岂能放弃 "how could we possibly give up?", 岂不是 "is it not …?", 岂有此理 "how outrageous!". 何尝 means "when did (I) ever …?": 我何尝不想去 "it is not that I do not want to go". Both are literary and give the sentence a strong, dignified emphasis; the everyday equivalent is 难道 … 吗. Remember that the surface question is really an assertion of the contrary.',
    explanation_ja: '「岂」は反対の答えを期待する反語を作ります（「岂能放弃」どうしてあきらめられようか、「岂不是」…ではないか、「岂有此理」とんでもない）。「何尝」は「いつ…したことがあろうか」の意味です（「我何尝不想去」行きたくないわけではない）。どちらも文語で、文に強く格調ある強調を与えます。日常では「难道…吗」が相当します。表面は疑問でも、実際には反対の内容を断言していると覚えてください。',
    ex: [
      ['这么好的机会，我们岂能放弃？', 'zhè me hǎo de jī huì, wǒ men qǐ néng fàng qì?', 'Such a good opportunity: how could we give it up?', 'こんな良い機会を、どうしてあきらめられるでしょうか。'],
      ['他不打招呼就走了，岂有此理！', 'tā bù dǎ zhāo hu jiù zǒu le, qǐ yǒu cǐ lǐ!', 'He left without a word; how outrageous!', '彼は挨拶もなしに帰ってしまった。まったくけしからん。'],
      ['这样做岂不是更麻烦？', 'zhè yàng zuò qǐ bù shì gèng má fan?', 'Would that not be even more troublesome?', 'そうするともっと面倒ではありませんか。'],
      ['我何尝不想回家？只是工作太忙。', 'wǒ hé cháng bù xiǎng huí jiā? zhǐ shì gōng zuò tài máng.', 'It is not that I do not want to go home; I am simply too busy with work.', '家に帰りたくないわけではありません。ただ仕事が忙しすぎるのです。'],
    ],
    mistakes: ['Answering a 岂 question as if it were real.', 'Using 岂 in casual speech; 难道 is the spoken form.'],
    mistakes_ja: ['「岂」の疑問に本当の質問として答えないでください。', 'くだけた会話では「岂」ではなく「难道」です。'],
    exercises: [
      { type: 'fill', prompt: '朋友有困难，我＿能不帮？', answer: '岂', choices: ['岂', '何', '莫'], why: '岂能不帮: how could I not help?', why_ja: '「岂能不帮」でどうして助けずにいられようかという反語です。' },
      { type: 'choose', prompt: 'Which sentence means "It is not that I have never tried"?', prompt_ja: '「試したことがないわけではない」はどれですか。', answer: '我何尝没有试过？', choices: ['我何尝没有试过？', '我岂有试过？', '我何尝试过没有。'], why: '何尝 + negative asserts the positive.', why_ja: '「何尝＋否定」で肯定を断言します。' },
      { type: 'order', prompt: 'Make: "Would this not be a waste of time?"', prompt_ja: '「これは時間の無駄ではないか」を作る', answer: '这岂不是浪费时间', choices: ['这', '岂不是', '浪费', '时间'], why: '岂不是 + the thing asserted.', why_ja: '「岂不是＋断言する内容」の形です。' },
    ] },

  // ───────────────────────── Unit 58 ─────────────────────────
  { id: 'jieci-qianzhi', unit: 58, title: '介词短语前置: formal word order', title_ja: '介詞句の前置：改まった語順',
    pattern: '对于/关于/在…方面/就…而言 + 话题, 主语 + …', summary: 'Fronting the topic phrase in written Chinese', summary_ja: '書き言葉で話題の句を文頭に置く',
    explanation: 'In formal Chinese, a prepositional phrase that sets the topic or scope is often moved to the front of the sentence, before the subject: 对于这个问题, 我们已经讨论过 instead of 我们已经讨论过这个问题. Typical fronted phrases are 对于 / 关于 "regarding", 在 … 方面 / 在 … 上 "in the area of", 就 … 而言 / 就 … 来说 "as far as … is concerned", 随着 "along with", and 通过 "through". The fronted phrase is followed by a comma and the main clause keeps its normal order. This creates the measured, topic-first rhythm of reports and speeches; in speech the phrase more often stays inside the clause.',
    explanation_ja: '改まった中国語では、話題や範囲を示す介詞句を主語の前、文頭に移すことがよくあります（「我们已经讨论过这个问题」ではなく「对于这个问题，我们已经讨论过」）。前置される典型的な句は、「对于／关于」（…について）、「在…方面／在…上」（…の面で）、「就…而言／就…来说」（…に関して言えば）、「随着」（…につれて）、「通过」（…を通じて）です。前置した句の後にはコンマを置き、主節はふつうの語順を保ちます。これにより報告書やスピーチらしい、話題を先に示す落ち着いたリズムが生まれます。会話では句を節の中に残すことが多いです。',
    ex: [
      ['对于这个建议，我们表示欢迎。', 'duì yú zhè ge jiàn yì, wǒ men biǎo shì huān yíng.', 'As for this suggestion, we welcome it.', 'この提案について、私たちは歓迎の意を表します。'],
      ['在环境保护方面，这个城市做得很好。', 'zài huán jìng bǎo hù fāng miàn, zhè ge chéng shì zuò de hěn hǎo.', 'In the area of environmental protection, this city does very well.', '環境保護の面で、この都市はとてもよくやっています。'],
      ['就目前的情况而言，计划需要调整。', 'jiù mù qián de qíng kuàng ér yán, jì huà xū yào tiáo zhěng.', 'As far as the current situation goes, the plan needs adjusting.', '現状について言えば、計画は調整が必要です。'],
      ['随着经济的发展，人们的生活水平不断提高。', 'suí zhe jīng jì de fā zhǎn, rén men de shēng huó shuǐ píng bù duàn tí gāo.', 'With economic development, people\'s living standards keep rising.', '経済の発展につれて、人々の生活水準は絶えず向上しています。'],
    ],
    mistakes: ['Making the fronted phrase the subject: 对于这个问题很重要 has no subject.', 'Forgetting the comma after a long fronted phrase.'],
    mistakes_ja: ['前置した句を主語にしないでください（「对于这个问题很重要」には主語がありません）。', '長い前置句の後のコンマを忘れないでください。'],
    exercises: [
      { type: 'order', prompt: 'Make: "Regarding this plan, everyone has different opinions."', prompt_ja: '「この計画について、みんな意見が異なる」を作る', answer: '对于这个计划大家有不同的意见', choices: ['对于这个计划', '大家', '有', '不同的意见'], why: 'Fronted 对于-phrase, then subject and predicate.', why_ja: '前置した「对于」の句、次に主語と述語です。' },
      { type: 'choose', prompt: 'Which sentence is correct?', prompt_ja: '正しい文はどれですか。', answer: '就价格而言，这款手机很有竞争力。', choices: ['就价格而言，这款手机很有竞争力。', '就价格而言很有竞争力这款手机。', '这款手机就而言价格很有竞争力。'], why: '就 … 而言 is fronted and followed by a full clause.', why_ja: '「就…而言」を前置し、完全な節を続けます。' },
      { type: 'fill', prompt: '＿教育方面，政府投入了大量资金。', answer: '在', choices: ['在', '对', '从'], why: '在 … 方面 frames the area of investment.', why_ja: '「在…方面」で投資の分野を示します。' },
    ] },

];
