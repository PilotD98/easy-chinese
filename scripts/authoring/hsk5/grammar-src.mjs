// HSK 5 grammar points. Examples and exercises use only HSK 1–4 characters plus
// the HSK 5 characters taught by the end of the point's unit (see cache/hsk5-plan.txt).

export const GRAMMAR = [
  // ───────────────────────── Unit 1 ─────────────────────────
  { id: 'ba-gei-cheng-dao-zai', unit: 1, title: '把…给/成/到/在: moving and changing an object', title_ja: '把…给／成／到／在：対象をどうするか',
    pattern: 'S + 把 + O + V + 给/成/到/在 + …', summary: 'After 把, the verb must say where the object ends up or what it becomes', summary_ja: '把の後の動詞には「どこへ・何に・誰に」が必要',
    explanation: 'A 把 sentence must not end with a bare verb; the verb needs a complement that tells the result. Four complements are especially common: 给 + person (who receives it), 成 + noun (what it turns into), 到 + place (where it arrives) and 在 + place (where it ends up). The pattern is neutral in register and used equally in speech and writing. The negative word, a modal verb or a time word all go before 把, not before the verb.',
    explanation_ja: '「把」構文は動詞で文を終えることができず、動詞の後に結果を示す補語が必要です。特に多いのが「给＋人（誰に渡すか）」「成＋名詞（何に変わるか）」「到＋場所（どこに着くか）」「在＋場所（どこに置かれるか）」の四つです。話し言葉でも書き言葉でも同じように使う中立的な表現です。否定語や助動詞、時間を表す語は動詞ではなく「把」の前に置きます。',
    ex: [
      ['请把这本书给我。', 'qǐng bǎ zhè běn shū gěi wǒ.', 'Please give me this book.', 'この本を私にください。'],
      ['我把他的名字看成了别人的名字。', 'wǒ bǎ tā de míng zi kàn chéng le bié rén de míng zi.', "I misread his name as someone else's.", '私は彼の名前を別の人の名前と見間違えました。'],
      ['他们把老人送到了医院。', 'tā men bǎ lǎo rén sòng dào le yī yuàn.', 'They took the old man to the hospital.', '彼らはお年寄りを病院へ送り届けました。'],
      ['我把钱放在桌子上了。', 'wǒ bǎ qián fàng zài zhuō zi shàng le.', 'I put the money on the table.', '私はお金を机の上に置きました。'],
    ],
    mistakes: ['Ending with a bare verb: 我把书给 is incomplete; say 我把书给他.', 'Putting 没 after 把: say 我没把钱放在这里, not 我把钱没放在这里.'],
    mistakes_ja: ['動詞だけで終えないこと。「我把书给」では不完全で、「我把书给他」と言います。', '「没」を「把」の後に置かないこと。「我没把钱放在这里」が正しく、「我把钱没放在这里」は誤りです。'],
    exercises: [
      { type: 'fill', prompt: '我把信＿了他。', answer: '给', choices: ['给', '到', '在'], why: 'The letter goes to a person, so the complement is 给 + person.', why_ja: '手紙は人に渡すので、補語は「给＋人」です。' },
      { type: 'order', prompt: 'Make: "He put the book on the table."', prompt_ja: '「彼は本を机の上に置きました」を作る', answer: '他把书放在桌子上', choices: ['他', '把书', '放在', '桌子上'], why: 'Subject, 把 + object, verb + 在, then the place.', why_ja: '主語→把＋目的語→動詞＋在→場所の順です。' },
      { type: 'choose', prompt: 'Which sentence means "I wrote the sentence out in Chinese"?', prompt_ja: '「私はその文を中国語に書き換えました」はどれですか', answer: '我把这句话写成了汉语。', choices: ['我把这句话写成了汉语。', '我把这句话写了汉语。', '我写成这句话把汉语。'], why: 'Changing something into something else uses V + 成 + result after 把.', why_ja: '「…に変える」は「把＋対象＋動詞＋成＋結果」で表します。' },
      { type: 'produce', prompt: 'Say: "Please give me the money."', prompt_ja: '「お金を私にください」と言う', answer: '请把钱给我', answerPinyin: 'qǐng bǎ qián gěi wǒ', why: '请 + 把 + object + 给 + person.', why_ja: '「请＋把＋目的語＋给＋人」の形です。' },
    ] },

  { id: 'dui-lai-shuo', unit: 1, title: '对…来说: for (someone), as far as … is concerned', title_ja: '对…来说：…にとって',
    pattern: '对 + N + 来说, …', summary: "Frames a statement from one person's or group's point of view", summary_ja: 'ある人や立場から見てどうかを述べる',
    explanation: '对…来说 puts a person, group or thing in the frame and then judges from that viewpoint: 对我来说 "for me", 对孩子来说 "for children". The phrase usually opens the sentence and is followed by a comma. It is common in both conversation and formal writing; the more formal 对于…来说 and 就…而言 mean the same. Do not confuse it with 对…说 (to say to someone), which has no 来.',
    explanation_ja: '「对…来说」は人や集団、物事を取り上げ、その立場から見た判断を述べます。「对我来说」は「私にとって」、「对孩子来说」は「子どもにとって」です。ふつう文頭に置き、後ろにコンマを打ちます。会話でも硬い文章でも使え、より改まった「对于…来说」「就…而言」も同じ意味です。「来」のない「对…说（…に言う）」と混同しないでください。',
    ex: [
      ['对我来说，这个问题很简单。', 'duì wǒ lái shuō, zhè ge wèn tí hěn jiǎn dān.', 'For me, this question is easy.', '私にとって、この問題は簡単です。'],
      ['对学生来说，时间就是钱。', 'duì xué shēng lái shuō, shí jiān jiù shì qián.', 'For students, time is money.', '学生にとって、時間はお金です。'],
      ['对这个家庭来说，这是一个重要的决定。', 'duì zhè ge jiā tíng lái shuō, zhè shì yī ge zhòng yào de jué dìng.', 'For this family, this is an important decision.', 'この家庭にとって、これは重要な決定です。'],
      ['对政府来说，经济是最重要的。', 'duì zhèng fǔ lái shuō, jīng jì shì zuì zhòng yào de.', 'For the government, the economy is the most important thing.', '政府にとって、経済が最も重要です。'],
    ],
    mistakes: ['Dropping 来: 对我说 means "say to me".', 'Putting 对…来说 after the verb; it opens the clause.'],
    mistakes_ja: ['「来」を落とさないこと。「对我说」は「私に言う」の意味になります。', '「对…来说」は動詞の後ではなく、節の最初に置きます。'],
    exercises: [
      { type: 'fill', prompt: '对孩子＿说，玩儿比学习重要。', answer: '来', choices: ['来', '去', '而'], why: 'The fixed phrase is 对…来说.', why_ja: '決まった形は「对…来说」です。' },
      { type: 'choose', prompt: 'Which sentence means "For me, this job is not hard"?', prompt_ja: '「私にとって、この仕事は難しくありません」はどれですか', answer: '对我来说，这个工作不难。', choices: ['对我来说，这个工作不难。', '我对这个工作不难。', '这个工作对我不难说。'], why: '对我来说 frames the judgement; the other orders are ungrammatical.', why_ja: '「对我来说」で立場を示します。ほかの語順は文として成り立ちません。' },
      { type: 'order', prompt: 'Make: "For old people, health is the most important thing."', prompt_ja: '「お年寄りにとって、健康が最も重要です」を作る', answer: '对老人来说健康最重要', choices: ['对老人来说', '健康', '最', '重要'], why: 'The viewpoint phrase comes first, then topic and comment.', why_ja: '立場を示す句→主題→述語の順です。' },
    ] },

  // ───────────────────────── Unit 2 ─────────────────────────
  { id: 'wei-bi', unit: 2, title: '未必: not necessarily', title_ja: '未必：必ずしも…とは限らない',
    pattern: 'S + 未必 + V/Adj', summary: 'A soft denial of what the listener expects', summary_ja: '相手の思い込みをやわらかく否定する',
    explanation: '未必 goes before the verb or adjective and means "not necessarily, may well not": 贵的未必好 "expensive is not necessarily good". It is softer than 不 and more literary than 不一定, which means the same thing in everyday speech; you will see 未必 in essays, news and careful conversation. It cannot be used alone as an answer; say 不一定 instead. A sentence with 未必 often contrasts with a common assumption stated before it.',
    explanation_ja: '「未必」は動詞や形容詞の前に置き、「必ずしも…とは限らない」を表します。「贵的未必好」は「高いものが良いとは限らない」です。「不」より控えめで、同じ意味の日常語「不一定」より書き言葉的で、評論や報道、改まった会話で見られます。単独で返事には使えないので、その場合は「不一定」と言います。「未必」の文は、前に述べた一般的な思い込みと対比されることが多いです。',
    ex: [
      ['贵的东西未必好。', 'guì de dōng xi wèi bì hǎo.', 'Expensive things are not necessarily good.', '高いものが良いとは限りません。'],
      ['他未必知道这件事。', 'tā wèi bì zhī dào zhè jiàn shì.', 'He may well not know about this.', '彼がこのことを知っているとは限りません。'],
      ['有钱未必快乐。', 'yǒu qián wèi bì kuài lè.', 'Having money does not necessarily make you happy.', 'お金があっても幸せとは限りません。'],
      ['明天未必下雨，别担心。', 'míng tiān wèi bì xià yǔ, bié dān xīn.', "It will not necessarily rain tomorrow; don't worry.", '明日雨が降るとは限りません。心配しないでください。'],
    ],
    mistakes: ['Answering a question with just 未必; use 不一定.', 'Writing 未必不 to mean "certainly"; it means "not necessarily not", a double hedge that is rarely wanted.'],
    mistakes_ja: ['返事として「未必」だけを言わないこと。「不一定」を使います。', '「未必不」を「きっと」の意味で使わないこと。「…でないとは限らない」という二重の留保になります。'],
    exercises: [
      { type: 'fill', prompt: '价格高的东西＿好。', answer: '未必', choices: ['未必', '一定', '必须'], why: 'The sentence hedges a common belief; 未必 means "not necessarily".', why_ja: '一般的な思い込みに留保をつける文なので、「必ずしも…ない」の「未必」が入ります。' },
      { type: 'choose', prompt: 'Which sentence means "He will not necessarily come"?', prompt_ja: '「彼が来るとは限りません」はどれですか', answer: '他未必会来。', choices: ['他未必会来。', '他一定会来。', '他必须来。'], why: '未必 denies certainty; 一定 and 必须 assert it.', why_ja: '「未必」は確実性を否定し、「一定」「必须」は断定します。' },
      { type: 'produce', prompt: 'Say: "He does not necessarily know."', prompt_ja: '「彼が知っているとは限りません」と言う', answer: '他未必知道', answerPinyin: 'tā wèi bì zhī dào', why: '未必 sits directly before the verb.', why_ja: '「未必」は動詞の直前に置きます。' },
    ] },

  { id: 'si-de', unit: 2, title: '像…似的: as if, like', title_ja: '像…似的：まるで…のように',
    pattern: '像/好像 + N/V + 似的', summary: 'Closes a comparison, like 一样', summary_ja: '比喩を締めくくる（一样と同じ働き）',
    explanation: '似的 (shì de) is attached to the end of a comparison that begins with 像, 好像 or 跟: 像飞似的 "as if flying". It works like 一样 but is more colloquial and vivid, so you meet it in stories and conversation rather than in formal reports. The whole 像…似的 phrase can describe a verb (跑得像飞似的) or a noun (像孩子似的笑). Note the pronunciation: 似 here is shì, not sì.',
    explanation_ja: '「似的（shì de）」は「像」「好像」「跟」で始まる比喩の末尾に付き、「像飞似的」で「飛ぶように」を表します。「一样」と同じ働きですが、より口語的で生き生きした響きがあり、物語や会話でよく使われ、改まった報告文には向きません。「像…似的」全体で動詞（跑得像飞似的）や名詞（像孩子似的笑）を修飾できます。発音は sì ではなく shì です。',
    ex: [
      ['他跑得像飞似的。', 'tā pǎo de xiàng fēi shì de.', 'He runs as if he were flying.', '彼は飛ぶように走ります。'],
      ['她高兴得像个孩子似的。', 'tā gāo xìng de xiàng ge hái zi shì de.', 'She is as happy as a child.', '彼女は子どものように喜んでいます。'],
      ['他说话像唱歌似的。', 'tā shuō huà xiàng chàng gē shì de.', 'He talks as if he were singing.', '彼は歌うように話します。'],
      ['他好像没听见似的，什么也没说。', 'tā hǎo xiàng méi tīng jiàn shì de, shén me yě méi shuō.', 'As if he had not heard, he said nothing.', '彼は聞こえなかったかのように、何も言いませんでした。'],
    ],
    mistakes: ['Using 似的 without 像/好像/跟 in front.', 'Reading 似的 as sì de; in this word it is shì de.'],
    mistakes_ja: ['前に「像／好像／跟」を付けずに「似的」だけを使わないこと。', '「似的」を sì de と読まないこと。この語では shì de です。'],
    exercises: [
      { type: 'fill', prompt: '他看起来像生病＿。', answer: '似的', choices: ['似的', '所以', '以为'], why: '像…似的 completes the comparison "as if he were ill".', why_ja: '「像…似的」で「病気のようだ」という比喩を完成させます。' },
      { type: 'order', prompt: 'Make: "She laughed like a child."', prompt_ja: '「彼女は子どものように笑いました」を作る', answer: '她像孩子似的笑了', choices: ['她', '像', '孩子', '似的', '笑了'], why: '像 + noun + 似的 describes the verb that follows.', why_ja: '「像＋名詞＋似的」が後ろの動詞を修飾します。' },
      { type: 'produce', prompt: 'Say: "He ran off as if flying."', prompt_ja: '「彼は飛ぶように走って行きました」と言う', answer: '他像飞似的跑了', answerPinyin: 'tā xiàng fēi shì de pǎo le', why: '像飞似的 sits before the verb 跑.', why_ja: '「像飞似的」を動詞「跑」の前に置きます。' },
    ] },

  // ───────────────────────── Unit 3 ─────────────────────────
  { id: 'jing-ran', unit: 3, title: '竟然 / 居然: unexpectedly, to my surprise', title_ja: '竟然／居然：なんと、意外にも',
    pattern: 'S + 竟然/居然 + V', summary: 'Marks something the speaker did not expect at all', summary_ja: '話し手の予想外の出来事を強調する',
    explanation: '竟然 and 居然 are adverbs placed before the verb to say that what happened was surprising or even hard to believe: 他竟然忘了 "he actually forgot!". They are interchangeable in most sentences; 居然 is slightly more colloquial and 竟然 a little more written, and 竟 alone appears in literary style. The surprise can be good or bad. They never go before the subject.',
    explanation_ja: '「竟然」「居然」は動詞の前に置く副詞で、起きたことが意外で信じがたいという気持ちを表します。「他竟然忘了」は「彼はなんと忘れてしまった」です。ほとんどの文で入れ替え可能で、「居然」はやや口語的、「竟然」はやや書き言葉的、「竟」だけなら文語的です。良い驚きにも悪い驚きにも使えます。主語の前には置けません。',
    ex: [
      ['他竟然忘了自己的生日。', 'tā jìng rán wàng le zì jǐ de shēng rì.', 'He actually forgot his own birthday.', '彼はなんと自分の誕生日を忘れました。'],
      ['这么简单的问题，他居然不会。', 'zhè me jiǎn dān de wèn tí, tā jū rán bù huì.', 'Such a simple question, and he surprisingly could not answer it.', 'こんな簡単な問題なのに、彼は意外にもできませんでした。'],
      ['她竟然一个人去了中国。', 'tā jìng rán yī ge rén qù le zhōng guó.', 'To my surprise, she went to China alone.', '彼女は意外にも一人で中国へ行きました。'],
      ['他居然赢了冠军。', 'tā jū rán yíng le guàn jūn.', 'He unexpectedly won the championship.', '彼はなんと優勝しました。'],
    ],
    mistakes: ['Placing 竟然 before the subject: 竟然他忘了 is wrong.', 'Using 竟然 for ordinary, expected events; it needs real surprise.'],
    mistakes_ja: ['「竟然」を主語の前に置かないこと。「竟然他忘了」は誤りです。', '予想どおりの出来事に「竟然」を使わないこと。本当に意外なときに使います。'],
    exercises: [
      { type: 'fill', prompt: '他＿没来上课，太奇怪了。', answer: '竟然', choices: ['竟然', '当然', '一定'], why: '太奇怪了 shows surprise, which 竟然 expresses.', why_ja: '「太奇怪了」が驚きを示しているので、「竟然」が合います。' },
      { type: 'choose', prompt: 'Which sentence expresses surprise?', prompt_ja: '驚きを表している文はどれですか', answer: '他居然赢了。', choices: ['他居然赢了。', '他当然赢了。', '他应该赢。'], why: '居然 marks the unexpected; 当然 and 应该 mark the expected.', why_ja: '「居然」は予想外を、「当然」「应该」は予想どおりを表します。' },
      { type: 'order', prompt: 'Make: "She surprisingly does not know me."', prompt_ja: '「彼女は意外にも私を知りません」を作る', answer: '她竟然不认识我', choices: ['她', '竟然', '不', '认识', '我'], why: '竟然 goes after the subject and before the negated verb.', why_ja: '「竟然」は主語の後、否定された動詞の前に置きます。' },
    ] },

  { id: 'bei-no-agent', unit: 3, title: '被 + V without an agent', title_ja: '動作主を言わない被構文',
    pattern: 'S + 被 + V + complement', summary: 'The passive 被 can go straight to the verb when the doer is unknown or unimportant', summary_ja: '誰がしたか不明・不要なら被の直後に動詞を置く',
    explanation: 'You learned 被 with an agent: 书被他拿走了. When the doer is unknown, obvious or irrelevant, 被 is followed directly by the verb: 书被拿走了 "the book was taken". The verb still needs a complement or 了 to show the result. This agentless form is very common in news and formal writing (问题已经被解决了), while in conversation people often prefer a plain sentence without 被 (书拿走了). With 叫 and 让, by contrast, the agent cannot be omitted.',
    explanation_ja: '動作主のある「被」構文（书被他拿走了）はすでに学びました。誰がしたか不明・自明・不要なときは、「被」の直後に動詞を置きます（书被拿走了「本は持ち去られた」）。動詞には結果を示す補語や「了」が必要です。この形は報道や硬い文章でよく使われ（问题已经被解决了）、会話では「被」を使わない文（书拿走了）が好まれることも多いです。一方、「叫」「让」の受け身では動作主を省略できません。',
    ex: [
      ['我的钱包被拿走了。', 'wǒ de qián bāo bèi ná zǒu le.', 'My wallet was taken.', '私の財布が持ち去られました。'],
      ['问题已经被解决了。', 'wèn tí yǐ jīng bèi jiě jué le.', 'The problem has already been solved.', '問題はすでに解決されました。'],
      ['他被选为班长。', 'tā bèi xuǎn wéi bān zhǎng.', 'He was chosen as class monitor.', '彼は学級委員に選ばれました。'],
      ['这些照片被放在了网上。', 'zhè xiē zhào piàn bèi fàng zài le wǎng shàng.', 'These photos were put online.', 'これらの写真はネットに載せられました。'],
    ],
    mistakes: ['Dropping the agent after 让 or 叫: 书让拿走了 is wrong; use 被.', 'Leaving the verb bare: 他被批评 needs 了 or a complement.'],
    mistakes_ja: ['「让」「叫」の後で動作主を省かないこと。「书让拿走了」は誤りで、「被」を使います。', '動詞をそのままにしないこと。「他被批评」には「了」か補語が必要です。'],
    exercises: [
      { type: 'fill', prompt: '门＿打开了。', answer: '被', choices: ['被', '把', '对'], why: 'The door is the thing acted on, so the passive 被 is needed; 把 would require a doer as subject.', why_ja: '「门」は動作を受ける側なので受け身の「被」です。「把」なら動作主が主語に必要です。' },
      { type: 'choose', prompt: 'Which sentence means "The computer was broken"?', prompt_ja: '「パソコンは壊されました」はどれですか', answer: '电脑被弄坏了。', choices: ['电脑被弄坏了。', '电脑把弄坏了。', '电脑弄坏被了。'], why: '被 goes directly before the verb phrase 弄坏了.', why_ja: '「被」は動詞句「弄坏了」の直前に置きます。' },
      { type: 'produce', prompt: 'Say: "He was criticized."', prompt_ja: '「彼は批判されました」と言う', answer: '他被批评了', answerPinyin: 'tā bèi pī píng le', why: 'Subject + 被 + verb + 了, with no agent needed.', why_ja: '「主語＋被＋動詞＋了」で、動作主は不要です。' },
    ] },

  // ───────────────────────── Unit 4 ─────────────────────────
  { id: 'yi-dan', unit: 4, title: '一旦…就: once … then', title_ja: '一旦…就：いったん…すれば',
    pattern: '一旦 + condition, (S) 就 + result', summary: 'A hypothetical "once this happens" with a certain result', summary_ja: '「いったん…したら必ず…」という仮定',
    explanation: '一旦 introduces a condition that may happen at some point, and the second clause, usually with 就, gives the result that follows at once: 一旦决定了，就不要改变. It is stronger and more formal than 如果, and often warns about something serious or irreversible. 一旦 can stand before or after the subject. It is common in written Chinese, speeches and rules.',
    explanation_ja: '「一旦」はいつか起こりうる条件を導き、後ろの節が「就」とともに、その後すぐに続く結果を示します（一旦决定了，就不要改变）。「如果」より強く改まった言い方で、重大な事や取り返しのつかない事への注意によく使います。「一旦」は主語の前にも後にも置けます。書き言葉やスピーチ、規則の文でよく見られます。',
    ex: [
      ['一旦决定了，就不要改变。', 'yī dàn jué dìng le, jiù bù yào gǎi biàn.', 'Once you have decided, do not change your mind.', 'いったん決めたら、変えてはいけません。'],
      ['一旦发现问题，就马上告诉我。', 'yī dàn fā xiàn wèn tí, jiù mǎ shàng gào su wǒ.', 'As soon as you find a problem, tell me right away.', '問題を見つけたら、すぐ私に知らせてください。'],
      ['机会一旦失去，就很难再找到。', 'jī huì yī dàn shī qù, jiù hěn nán zài zhǎo dào.', 'Once an opportunity is lost, it is hard to find again.', '機会はいったん失うと、再び見つけるのは難しいです。'],
      ['他一旦开始看书，就什么也听不见了。', 'tā yī dàn kāi shǐ kàn shū, jiù shén me yě tīng bù jiàn le.', 'Once he starts reading, he hears nothing at all.', '彼はいったん本を読み始めると、何も聞こえなくなります。'],
    ],
    mistakes: ['Using 一旦 for a past event that really happened; it is for conditions.', 'Forgetting 就 in the result clause, which makes the link weaker.'],
    mistakes_ja: ['実際に起きた過去の出来事に「一旦」を使わないこと。条件を表す語です。', '結果の節の「就」を忘れないこと。ないとつながりが弱くなります。'],
    exercises: [
      { type: 'fill', prompt: '＿开始，就不能停。', answer: '一旦', choices: ['一旦', '一直', '一共'], why: '一旦…就 links a condition to its immediate result.', why_ja: '「一旦…就」が条件と直後の結果をつなぎます。' },
      { type: 'order', prompt: 'Make: "Once it rains, we will not go."', prompt_ja: '「いったん雨が降れば、私たちは行きません」を作る', answer: '一旦下雨我们就不去了', choices: ['一旦', '下雨', '我们', '就', '不去了'], why: '一旦 + condition, then subject + 就 + result.', why_ja: '「一旦＋条件」の後に「主語＋就＋結果」です。' },
      { type: 'produce', prompt: 'Say: "Once decided, do not change it."', prompt_ja: '「いったん決めたら、変えないでください」と言う', answer: '一旦决定就不要改变', answerPinyin: 'yī dàn jué dìng jiù bù yào gǎi biàn', why: '一旦 opens the condition and 就 opens the result.', why_ja: '「一旦」が条件、「就」が結果を導きます。' },
    ] },

  { id: 'dao-di-jiu-jing', unit: 4, title: '到底 / 究竟: what on earth, after all', title_ja: '到底／究竟：いったい',
    pattern: '到底/究竟 + question', summary: 'Presses for a clear answer in a question', summary_ja: '疑問文で「結局どうなのか」と答えを迫る',
    explanation: 'You met 到底 in HSK 4; 究竟 is its more formal twin. Both go before the question part (a question word, or A-not-A) and press for a definite answer: 你到底去不去？ 他究竟是谁？ They cannot be used in a 吗 question, because 吗 asks neutrally while 到底 demands. 到底 also means "in the end, finally" in statements (他到底来了), a use 究竟 does not share; 究竟 can instead be a noun meaning "the truth of the matter".',
    explanation_ja: 'HSK 4で学んだ「到底」の改まった形が「究竟」です。どちらも疑問の部分（疑問詞や反復疑問）の前に置き、はっきりした答えを求めます（你到底去不去？／他究竟是谁？）。「吗」疑問文には使えません。「吗」は中立に尋ねるのに対し、「到底」は答えを迫るからです。「到底」には平叙文で「とうとう」の意味もあります（他到底来了）が、「究竟」にはなく、代わりに「真相」という名詞の用法があります。',
    ex: [
      ['你到底去不去？', 'nǐ dào dǐ qù bù qù?', 'Are you going or not?', 'あなたはいったい行くのですか、行かないのですか。'],
      ['他究竟是谁？', 'tā jiū jìng shì shéi?', 'Who on earth is he?', '彼はいったい誰なのですか。'],
      ['这件事到底是怎么回事？', 'zhè jiàn shì dào dǐ shì zěn me huí shì?', 'What exactly is going on with this?', 'このことはいったいどういうことですか。'],
      ['我们究竟应该怎么办？', 'wǒ men jiū jìng yīng gāi zěn me bàn?', 'What exactly should we do?', '私たちはいったいどうすべきですか。'],
    ],
    mistakes: ['Combining with 吗: 你到底去吗 is wrong; use 去不去.', 'Using 究竟 for "finally" in a statement; that is 到底 or 终于.'],
    mistakes_ja: ['「吗」と一緒に使わないこと。「你到底去吗」は誤りで、「去不去」にします。', '平叙文の「とうとう」に「究竟」を使わないこと。「到底」か「终于」です。'],
    exercises: [
      { type: 'fill', prompt: '他＿想做什么？', answer: '究竟', choices: ['究竟', '一定', '到处'], why: 'The question presses for an answer, so 究竟 fits before 想.', why_ja: '答えを迫る疑問文なので、「想」の前に「究竟」が入ります。' },
      { type: 'choose', prompt: 'Which question is correct?', prompt_ja: '正しい疑問文はどれですか', answer: '你到底去不去？', choices: ['你到底去不去？', '你到底去吗？', '到底你去吗？'], why: '到底 needs an A-not-A or question-word question, not 吗.', why_ja: '「到底」は反復疑問か疑問詞の文で使い、「吗」とは使えません。' },
      { type: 'produce', prompt: 'Say: "What on earth do you want?"', prompt_ja: '「あなたはいったい何が欲しいのですか」と言う', answer: '你到底想要什么', answerPinyin: 'nǐ dào dǐ xiǎng yào shén me', why: '到底 goes after the subject and before the verb phrase.', why_ja: '「到底」は主語の後、動詞句の前に置きます。' },
    ] },

  // ───────────────────────── Unit 5 ─────────────────────────
  { id: 'bu-shi-er-shi', unit: 5, title: '不是…而是: not A but B', title_ja: '不是…而是：AではなくBだ',
    pattern: '不是 + A, 而是 + B', summary: 'Corrects a wrong idea and replaces it with the right one', summary_ja: '誤った考えを否定し、正しいものに置き換える',
    explanation: '不是…而是 rejects A and asserts B instead: 他不是老师，而是学生. A and B can be nouns, verb phrases or whole clauses, and they should be the same type. The pattern is used in all registers; in conversation the 而 is sometimes dropped (不是…是). It is a favourite in explanations: 不是我不想去，而是没有时间 "it is not that I do not want to go, it is that I have no time".',
    explanation_ja: '「不是…而是」はAを否定してBを主張します（他不是老师，而是学生）。AとBは名詞でも動詞句でも節でもよく、同じ種類にそろえます。どの文体でも使え、会話では「而」を落として「不是…是」とすることもあります。説明によく使われ、「不是我不想去，而是没有时间」は「行きたくないのではなく、時間がないのだ」です。',
    ex: [
      ['他不是老师，而是学生。', 'tā bù shì lǎo shī, ér shì xué shēng.', 'He is not a teacher but a student.', '彼は先生ではなく、学生です。'],
      ['我不是不想去，而是没有时间。', 'wǒ bù shì bù xiǎng qù, ér shì méi yǒu shí jiān.', "It is not that I don't want to go; I just have no time.", '行きたくないのではなく、時間がないのです。'],
      ['问题不是钱，而是时间。', 'wèn tí bù shì qián, ér shì shí jiān.', 'The problem is not money but time.', '問題はお金ではなく、時間です。'],
      ['重要的不是胜利，而是参加。', 'zhòng yào de bù shì shèng lì, ér shì cān jiā.', 'What matters is not winning but taking part.', '大切なのは勝利ではなく、参加することです。'],
    ],
    mistakes: ['Confusing 而是 with 就是: 不是…就是 means "either … or".', 'Mixing types: 不是老师，而是在工作 pairs a noun with a verb phrase.'],
    mistakes_ja: ['「而是」と「就是」を混同しないこと。「不是…就是」は「…か…かのどちらか」です。', '種類を混ぜないこと。「不是老师，而是在工作」は名詞と動詞句を並べており不自然です。'],
    exercises: [
      { type: 'fill', prompt: '他不是中国人，＿是日本人。', answer: '而', choices: ['而', '就', '也'], why: 'The sentence corrects nationality, so 不是…而是 is required.', why_ja: '国籍を訂正する文なので、「不是…而是」です。' },
      { type: 'order', prompt: "Make: \"It is not that I won't go, it is that I can't.\"", prompt_ja: '「行かないのではなく、行けないのです」を作る', answer: '我不是不去而是不能去', choices: ['我', '不是', '不去', '而是', '不能去'], why: 'Both halves are verb phrases of the same shape.', why_ja: '前後とも同じ形の動詞句にそろえます。' },
      { type: 'choose', prompt: "Which sentence means \"It is not that I don't like it, it is that it is too expensive\"?", prompt_ja: '「気に入らないのではなく、高すぎるのです」はどれですか', answer: '不是我不喜欢，而是太贵了。', choices: ['不是我不喜欢，而是太贵了。', '不是我不喜欢，就是太贵了。', '我不喜欢，而是太贵了。'], why: 'Only 不是…而是 gives "not A but B"; 就是 would mean "either/or".', why_ja: '「AでなくB」は「不是…而是」だけです。「就是」だと「どちらか」の意味になります。' },
    ] },

  { id: 'bu-shi-jiu-shi', unit: 5, title: '不是…就是: either A or B', title_ja: '不是…就是：AでなければBだ',
    pattern: '不是 + A, 就是 + B', summary: 'Only two possibilities, and one of them is true', summary_ja: '可能性は二つだけで、どちらかが当てはまる',
    explanation: '不是…就是 says that if it is not A it must be B, so the choice is limited to two things: 他每天不是看书，就是写作业. The tone often suggests monotony or a narrow range. A and B must be parallel. It is colloquial but acceptable in writing; the formal equivalent is 要么…要么. Do not confuse it with 不是…而是, which denies A and affirms B.',
    explanation_ja: '「不是…就是」は「AでなければBだ」、つまり選択肢が二つしかないことを表します（他每天不是看书，就是写作业）。単調さや範囲の狭さをほのめかすことが多いです。AとBは並列の形にします。口語的ですが文章でも使え、改まった言い方は「要么…要么」です。Aを否定しBを肯定する「不是…而是」と混同しないでください。',
    ex: [
      ['他每天不是看书，就是写作业。', 'tā měi tiān bù shì kàn shū, jiù shì xiě zuò yè.', 'Every day he is either reading or doing homework.', '彼は毎日、本を読んでいるか宿題をしているかです。'],
      ['这个人不是老师，就是医生。', 'zhè ge rén bù shì lǎo shī, jiù shì yī shēng.', 'This person is either a teacher or a doctor.', 'この人は先生か医者のどちらかです。'],
      ['周末我不是在家，就是在图书馆。', 'zhōu mò wǒ bù shì zài jiā, jiù shì zài tú shū guǎn.', 'On weekends I am either at home or in the library.', '週末、私は家にいるか図書館にいるかです。'],
      ['他不是迟到，就是请假。', 'tā bù shì chí dào, jiù shì qǐng jià.', 'He is either late or absent.', '彼は遅刻するか休むかのどちらかです。'],
    ],
    mistakes: ['Using 就是 when you mean to correct A: that is 而是.', 'Listing three options with this pattern; it is strictly two.'],
    mistakes_ja: ['Aを訂正したいときに「就是」を使わないこと。それは「而是」です。', 'この形で三つの選択肢を並べないこと。必ず二つです。'],
    exercises: [
      { type: 'fill', prompt: '他不是在吃饭，＿是在睡觉。', answer: '就', choices: ['就', '而', '也'], why: 'Eating and sleeping are two alternatives, so 不是…就是.', why_ja: '食べているか寝ているかの二択なので、「不是…就是」です。' },
      { type: 'order', prompt: 'Make: "She is either watching TV or playing with her phone."', prompt_ja: '「彼女はテレビを見ているかスマホをいじっているかです」を作る', answer: '她不是看电视就是玩手机', choices: ['她', '不是', '看电视', '就是', '玩手机'], why: 'Two parallel verb phrases after 不是 and 就是.', why_ja: '「不是」と「就是」の後に並列の動詞句を置きます。' },
      { type: 'produce', prompt: 'Say: "Either you go or he goes."', prompt_ja: '「あなたが行くか、彼が行くかです」と言う', answer: '不是你去就是他去', answerPinyin: 'bù shì nǐ qù jiù shì tā qù', why: 'Two clauses of the same shape, joined by 不是…就是.', why_ja: '同じ形の二つの節を「不是…就是」でつなぎます。' },
    ] },
];
