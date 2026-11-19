// HSK 2 readings and listening drills. Texts use only HSK 1 characters plus the
// HSK 2 characters taught by the end of the item's unit (see units-src.mjs).

export const READINGS = [
  { id: 'read:hsk2:001', unit: 4, title: '我的公司', en: 'My company', ja: '私の会社',
    text: '我在一个公司工作。公司不大，但是很好。我天天八点到公司，下午五点回家。公司里有十二个人，都是好人。我的朋友小张也在这个公司，他比我大两岁，是第一个到公司的人。我们都很喜欢这个工作。',
    pinyin: 'wǒ zài yī ge gōng sī gōng zuò. gōng sī bù dà, dàn shì hěn hǎo. wǒ tiān tiān bā diǎn dào gōng sī, xià wǔ wǔ diǎn huí jiā. gōng sī lǐ yǒu shí èr ge rén, dōu shì hǎo rén. wǒ de péng you xiǎo zhāng yě zài zhè ge gōng sī, tā bǐ wǒ dà liǎng suì, shì dì yī ge dào gōng sī de rén. wǒ men dōu hěn xǐ huan zhè ge gōng zuò.',
    enText: 'I work at a company. The company is not big, but it is good. Every day I arrive at the company at eight and go home at five in the afternoon. There are twelve people in the company, and they are all good people. My friend Xiao Zhang is also at this company; he is two years older than me and is the first person to arrive at the company. We all like this job very much.',
    jaText: '私はある会社で働いています。会社は大きくありませんが、良い会社です。私は毎日8時に会社に着き、午後5時に家に帰ります。会社には12人いて、みんな良い人です。友人の小張もこの会社にいます。彼は私より2歳年上で、いちばん早く会社に着く人です。私たちはみんなこの仕事が好きです。',
    questions: [
      { q: '他几点到公司？', choices: ['八点', '五点', '十二点'], answer: 0, why: 'The text says 我天天八点到公司.', why_ja: '本文に「我天天八点到公司」とあります。' },
      { q: '公司里有多少人？', choices: ['两个', '十二个', '八个'], answer: 1, why: '公司里有十二个人.', why_ja: '「公司里有十二个人」とあります。' },
      { q: '小张比他大几岁？', choices: ['一岁', '两岁', '五岁'], answer: 1, why: '他比我大两岁.', why_ja: '「他比我大两岁」とあります。' },
    ] },

  { id: 'read:hsk2:002', unit: 6, title: '晚上出去玩', en: 'Going out in the evening', ja: '夜のお出かけ',
    text: '晚上七点，我吃完饭，就和朋友出去玩。外面有点儿冷，我穿了一件黑衣服。我们走路去商店，商店不远，走十分钟就到了。朋友想买一本新书，但是商店里没有他要的那本。我们没买东西，就回家了。今天晚上我们都很快乐。',
    pinyin: 'wǎn shang qī diǎn, wǒ chī wán fàn, jiù hé péng you chū qù wán. wài miàn yǒu diǎnr lěng, wǒ chuān le yī jiàn hēi yī fu. wǒ men zǒu lù qù shāng diàn, shāng diàn bù yuǎn, zǒu shí fēn zhōng jiù dào le. péng you xiǎng mǎi yī běn xīn shū, dàn shì shāng diàn lǐ méi yǒu tā yào de nà běn. wǒ men méi mǎi dōng xi, jiù huí jiā le. jīn tiān wǎn shang wǒ men dōu hěn kuài lè.',
    enText: 'At seven in the evening, after finishing dinner, I went out with a friend. It was a bit cold outside, so I put on a black coat. We walked to the shop; it is not far, ten minutes on foot. My friend wanted to buy a new book, but the shop did not have the one he wanted. We did not buy anything and went home. We were both very happy this evening.',
    jaText: '夜7時、ご飯を食べ終えると、私は友達と遊びに出かけました。外は少し寒かったので、黒い服を着ました。私たちは歩いて店に行きました。店は遠くなく、歩いて10分で着きました。友達は新しい本を買いたかったのですが、店には彼の欲しい本がありませんでした。私たちは何も買わずに家に帰りました。今晩はみんなとても楽しかったです。',
    questions: [
      { q: '他们怎么去商店？', choices: ['走路去', '坐出租车去', '坐飞机去'], answer: 0, why: '我们走路去商店.', why_ja: '「我们走路去商店」とあります。' },
      { q: '朋友想买什么？', choices: ['一件衣服', '一本书', '一个电脑'], answer: 1, why: '朋友想买一本新书.', why_ja: '「朋友想买一本新书」とあります。' },
      { q: '他们买东西了吗？', choices: ['买了一本书', '买了衣服', '没买东西'], answer: 2, why: '我们没买东西，就回家了.', why_ja: '「我们没买东西，就回家了」とあります。' },
    ] },

  { id: 'read:hsk2:003', unit: 8, title: '运动和休息', en: 'Exercise and rest', ja: '運動と休み',
    text: '我爸爸很喜欢运动。他每天早上六点就出去走路，走一个小时。他说，运动让身体好。我不喜欢运动，我喜欢休息。早上我喜欢坐着喝茶，看书。爸爸笑着对我说："你也要运动！"所以现在，我每个星期都和他走两次路。走完了，我们一起吃早饭，吃鱼和米饭。',
    pinyin: 'wǒ bà ba hěn xǐ huan yùn dòng. tā měi tiān zǎo shang liù diǎn jiù chū qù zǒu lù, zǒu yī ge xiǎo shí. tā shuō, yùn dòng ràng shēn tǐ hǎo. wǒ bù xǐ huan yùn dòng, wǒ xǐ huan xiū xi. zǎo shang wǒ xǐ huan zuò zhe hē chá, kàn shū. bà ba xiào zhe duì wǒ shuō: "nǐ yě yào yùn dòng!" suǒ yǐ xiàn zài, wǒ měi ge xīng qī dōu hé tā zǒu liǎng cì lù. zǒu wán le, wǒ men yī qǐ chī zǎo fàn, chī yú hé mǐ fàn.',
    enText: 'My dad loves exercise. Every morning at six he goes out for a walk and walks for an hour. He says exercise keeps the body healthy. I do not like exercise; I like resting. In the morning I like to sit and drink tea and read. Dad said to me with a smile: "You need to exercise too!" So now I walk with him twice every week. When we have finished walking, we eat breakfast together: fish and rice.',
    jaText: '父は運動が大好きです。毎朝6時にはもう散歩に出かけ、1時間歩きます。運動は体を丈夫にする、と父は言います。私は運動が好きではなく、休むのが好きです。朝は座ってお茶を飲んだり本を読んだりするのが好きです。父は笑いながら私に「お前も運動しなさい！」と言いました。それで今は、毎週2回父と歩いています。歩き終わると、いっしょに朝ご飯を食べます。魚とご飯です。',
    questions: [
      { q: '爸爸每天早上做什么？', choices: ['走路', '睡觉', '看书'], answer: 0, why: '他每天早上六点就出去走路.', why_ja: '「他每天早上六点就出去走路」とあります。' },
      { q: '现在他们一个星期走几次路？', choices: ['一次', '两次', '三次'], answer: 1, why: '我每个星期都和他走两次路.', why_ja: '「我每个星期都和他走两次路」とあります。' },
      { q: '"我"喜欢什么？', choices: ['运动', '休息', '吃鱼'], answer: 1, why: '我不喜欢运动，我喜欢休息.', why_ja: '「我不喜欢运动，我喜欢休息」とあります。' },
    ] },

  { id: 'read:hsk2:004', unit: 10, title: '下雪了', en: 'It is snowing', ja: '雪が降った',
    text: '今天下雪了，天气很冷。我和妹妹坐在房间里看报纸。报纸上说，明天比今天还冷，所以我们明天不出去。妹妹说："哥哥，我们去买一件新衣服吧。"我说："太贵了。"她说："旁边那家商店的衣服不贵，一件五十块。"我说："好吧，但是要快一点儿，外面太冷了。"',
    pinyin: 'jīn tiān xià xuě le, tiān qì hěn lěng. wǒ hé mèi mei zuò zài fáng jiān lǐ kàn bào zhǐ. bào zhǐ shàng shuō, míng tiān bǐ jīn tiān hái lěng, suǒ yǐ wǒ men míng tiān bù chū qù. mèi mei shuō: "gē ge, wǒ men qù mǎi yī jiàn xīn yī fu ba." wǒ shuō: "tài guì le." tā shuō: "páng biān nà jiā shāng diàn de yī fu bù guì, yī jiàn wǔ shí kuài." wǒ shuō: "hǎo ba, dàn shì yào kuài yī diǎnr, wài miàn tài lěng le."',
    enText: 'It snowed today and the weather is very cold. My younger sister and I sat in the room reading the newspaper. The paper said tomorrow will be even colder than today, so we are not going out tomorrow. My sister said: "Big brother, let\'s go and buy a new piece of clothing." I said: "Too expensive." She said: "The clothes in the shop next door are not expensive, fifty yuan each." I said: "All right, but let\'s be quick, it is too cold outside."',
    jaText: '今日は雪が降って、とても寒いです。私と妹は部屋で新聞を読んでいました。新聞には、明日は今日よりさらに寒いと書いてあったので、私たちは明日は出かけません。妹が「お兄ちゃん、新しい服を買いに行こうよ」と言いました。私は「高すぎるよ」と言いました。妹は「隣の店の服は高くないよ、1着50元」と言います。私は「分かった、でも早くしよう、外は寒すぎる」と言いました。',
    questions: [
      { q: '今天天气怎么样？', choices: ['下雪，很冷', '下雨，很热', '很热'], answer: 0, why: '今天下雪了，天气很冷.', why_ja: '「今天下雪了，天气很冷」とあります。' },
      { q: '妹妹想做什么？', choices: ['看电视', '买衣服', '出去玩'], answer: 1, why: '我们去买一件新衣服吧.', why_ja: '「我们去买一件新衣服吧」とあります。' },
      { q: '一件衣服多少钱？', choices: ['十五块', '五十块', '五百块'], answer: 1, why: '一件五十块.', why_ja: '「一件五十块」とあります。' },
    ] },

  { id: 'read:hsk2:005', unit: 12, title: '生病了', en: 'Being ill', ja: '病気になった',
    text: '昨天我生病了，不能去上课。妈妈让我在床上休息，还给我做了鸡蛋和米饭。医生说，我要吃药，多喝水，多睡觉。今天我已经好多了。下午我想出去游泳，但是妈妈说："你的病还没好，别去游泳，在家休息吧。"所以我在家看了一个电影。明天我就可以去学校了。',
    pinyin: 'zuó tiān wǒ shēng bìng le, bù néng qù shàng kè. mā ma ràng wǒ zài chuáng shàng xiū xi, hái gěi wǒ zuò le jī dàn hé mǐ fàn. yī shēng shuō, wǒ yào chī yào, duō hē shuǐ, duō shuì jiào. jīn tiān wǒ yǐ jīng hǎo duō le. xià wǔ wǒ xiǎng chū qù yóu yǒng, dàn shì mā ma shuō: "nǐ de bìng hái méi hǎo, bié qù yóu yǒng, zài jiā xiū xi ba." suǒ yǐ wǒ zài jiā kàn le yī ge diàn yǐng. míng tiān wǒ jiù kě yǐ qù xué xiào le.',
    enText: 'Yesterday I got ill and could not go to class. Mum had me rest in bed and also made me eggs and rice. The doctor said I must take medicine, drink a lot of water and sleep a lot. Today I am already much better. In the afternoon I wanted to go swimming, but Mum said: "You are not well yet. Don\'t go swimming; rest at home." So I watched a movie at home. Tomorrow I can go to school.',
    jaText: '昨日、私は病気になって授業に行けませんでした。母は私をベッドで休ませ、卵とご飯も作ってくれました。医者は、薬を飲んで、水をたくさん飲んで、よく寝なさいと言いました。今日はもうだいぶ良くなりました。午後、泳ぎに行きたかったのですが、母は「まだ治っていないから泳ぎに行かないで、家で休みなさい」と言いました。それで家で映画を1本見ました。明日は学校に行けます。',
    questions: [
      { q: '他昨天怎么了？', choices: ['生病了', '去游泳了', '去上课了'], answer: 0, why: '昨天我生病了.', why_ja: '「昨天我生病了」とあります。' },
      { q: '妈妈给他做了什么？', choices: ['鱼', '鸡蛋和米饭', '苹果'], answer: 1, why: '给我做了鸡蛋和米饭.', why_ja: '「给我做了鸡蛋和米饭」とあります。' },
      { q: '他今天下午做了什么？', choices: ['去游泳', '去学校', '看电影'], answer: 2, why: '我在家看了一个电影.', why_ja: '「我在家看了一个电影」とあります。' },
    ] },

  { id: 'read:hsk2:006', unit: 13, title: '打篮球', en: 'Playing basketball', ja: 'バスケットボール',
    text: '星期六下午天气很晴，我和弟弟坐公共汽车去打篮球。车上人很多，我们站着，二十分钟就到了。我们打了两个小时。打完了，我们都很累，也很热。旁边有一个小商店，服务员很好，我们买了两杯水和一个西瓜。回家的时候，妈妈做了羊肉和米饭，非常好吃。弟弟说："下个星期我们再来打篮球吧！"',
    pinyin: 'xīng qī liù xià wǔ tiān qì hěn qíng, wǒ hé dì di zuò gōng gòng qì chē qù dǎ lán qiú. chē shàng rén hěn duō, wǒ men zhàn zhe, èr shí fēn zhōng jiù dào le. wǒ men dǎ le liǎng ge xiǎo shí. dǎ wán le, wǒ men dōu hěn lèi, yě hěn rè. páng biān yǒu yī ge xiǎo shāng diàn, fú wù yuán hěn hǎo, wǒ men mǎi le liǎng bēi shuǐ hé yī ge xī guā. huí jiā de shí hou, mā ma zuò le yáng ròu hé mǐ fàn, fēi cháng hǎo chī. dì di shuō: "xià ge xīng qī wǒ men zài lái dǎ lán qiú ba!"',
    enText: 'On Saturday afternoon the weather was sunny, and my younger brother and I took the bus to play basketball. The bus was crowded, so we stood; we arrived in twenty minutes. We played for two hours. When we finished we were both very tired and very hot. There was a small shop next to the court; the staff were friendly, and we bought two cups of water and a watermelon. When we got home, Mum had made mutton and rice, which was delicious. My brother said: "Let\'s come and play basketball again next week!"',
    jaText: '土曜日の午後は良い天気で、私と弟はバスに乗ってバスケットボールをしに行きました。バスは人が多く、私たちは立っていましたが、20分で着きました。私たちは2時間プレーしました。終わると二人ともとても疲れて、暑かったです。そばに小さな店があり、店員さんは親切で、水を2杯とスイカを1つ買いました。家に帰ると、母が羊肉とご飯を作ってくれていて、とてもおいしかったです。弟は「来週もまたバスケをしに来ようよ！」と言いました。',
    questions: [
      { q: '他们怎么去打篮球？', choices: ['坐公共汽车', '坐出租车', '走路'], answer: 0, why: '我和弟弟坐公共汽车去打篮球.', why_ja: '「我和弟弟坐公共汽车去打篮球」とあります。' },
      { q: '他们打了多长时间？', choices: ['二十分钟', '两个小时', '一个小时'], answer: 1, why: '我们打了两个小时.', why_ja: '「我们打了两个小时」とあります。' },
      { q: '妈妈做了什么？', choices: ['鱼', '羊肉和米饭', '鸡蛋'], answer: 1, why: '妈妈做了羊肉和米饭.', why_ja: '「妈妈做了羊肉和米饭」とあります。' },
    ] },
];

export const LISTENING = [
  { id: 'listen:hsk2:001', unit: 2, type: 'dictation', title: 'Dictation: already, still, because', title_ja: '書き取り：もう・まだ・なぜなら',
    items: [
      { text: '我已经吃饭了。', pinyin: 'wǒ yǐ jīng chī fàn le.', en: 'I have already eaten.', ja: '私はもうご飯を食べました。' },
      { text: '他还没来。', pinyin: 'tā hái méi lái.', en: 'He has not come yet.', ja: '彼はまだ来ていません。' },
      { text: '你为什么不去？', pinyin: 'nǐ wèi shén me bù qù?', en: 'Why aren\'t you going?', ja: 'なぜ行かないのですか。' },
      { text: '因为我没有钱。', pinyin: 'yīn wèi wǒ méi yǒu qián.', en: 'Because I have no money.', ja: 'お金がないからです。' },
      { text: '从我家到学校要二十分钟。', pinyin: 'cóng wǒ jiā dào xué xiào yào èr shí fēn zhōng.', en: 'From my home to school takes twenty minutes.', ja: '私の家から学校まで20分かかります。' },
    ] },

  { id: 'listen:hsk2:002', unit: 5, type: 'dictation', title: 'Dictation: every day, right now', title_ja: '書き取り：毎日・今まさに',
    items: [
      { text: '请进来，坐吧。', pinyin: 'qǐng jìn lái, zuò ba.', en: 'Please come in and sit down.', ja: 'どうぞ入って、お座りください。' },
      { text: '我每天都学习汉语。', pinyin: 'wǒ měi tiān dōu xué xí hàn yǔ.', en: 'I study Chinese every day.', ja: '私は毎日中国語を勉強します。' },
      { text: '他正在打电话。', pinyin: 'tā zhèng zài dǎ diàn huà.', en: 'He is on the phone right now.', ja: '彼は今電話をかけているところです。' },
      { text: '你吃完了吗？', pinyin: 'nǐ chī wán le ma?', en: 'Have you finished eating?', ja: '食べ終わりましたか。' },
      { text: '别说话，老师来了。', pinyin: 'bié shuō huà, lǎo shī lái le.', en: 'Don\'t talk, the teacher is here.', ja: 'しゃべらないで、先生が来ました。' },
    ] },

  { id: 'listen:hsk2:003', unit: 7, type: 'comprehension', title: 'Listening: near and far', title_ja: '聞き取り：近い・遠い',
    items: [
      { text: '我家离公司很近，走十分钟就到了。', pinyin: 'wǒ jiā lí gōng sī hěn jìn, zǒu shí fēn zhōng jiù dào le.', en: 'My home is close to the company; it is ten minutes on foot.', ja: '私の家は会社に近くて、歩いて10分で着きます。',
        questions: [ { q: '他怎么去公司？', choices: ['走路', '坐出租车', '坐飞机'], answer: 0, why: '走十分钟就到了 — he walks.', why_ja: '「走十分钟就到了」なので歩いて行きます。' } ] },
      { text: '我的手机不见了，可能在家里。', pinyin: 'wǒ de shǒu jī bù jiàn le, kě néng zài jiā lǐ.', en: 'My phone is gone; it may be at home.', ja: '携帯が見当たりません。家にあるのかもしれません。',
        questions: [ { q: '他的手机可能在哪儿？', choices: ['公司', '家里', '学校'], answer: 1, why: '可能在家里.', why_ja: '「可能在家里」と言っています。' } ] },
      { text: '今天天气很好，我们出去走走吧。', pinyin: 'jīn tiān tiān qì hěn hǎo, wǒ men chū qù zǒu zou ba.', en: 'The weather is nice today; let\'s go out for a walk.', ja: '今日は天気がいいから、散歩に出かけましょう。',
        questions: [ { q: '他想做什么？', choices: ['在家睡觉', '看电视', '出去走走'], answer: 2, why: '我们出去走走吧 is a suggestion to go out.', why_ja: '「我们出去走走吧」と外出を提案しています。' } ] },
      { text: '我介绍一下，这是我朋友小张，他是医生。', pinyin: 'wǒ jiè shào yī xià, zhè shì wǒ péng you xiǎo zhāng, tā shì yī shēng.', en: 'Let me introduce: this is my friend Xiao Zhang, he is a doctor.', ja: 'ご紹介します。こちらは友人の小張で、医者です。',
        questions: [ { q: '小张是做什么的？', choices: ['老师', '医生', '学生'], answer: 1, why: '他是医生.', why_ja: '「他是医生」と言っています。' } ] },
    ] },

  { id: 'listen:hsk2:004', unit: 9, type: 'shadow', title: 'Shadowing: everyday lines', title_ja: 'シャドーイング：日常のひとこと',
    items: [
      { text: '我们走吧。', pinyin: 'wǒ men zǒu ba.', en: 'Let\'s go.', ja: '行きましょう。' },
      { text: '你休息一下吧。', pinyin: 'nǐ xiū xi yī xià ba.', en: 'Why don\'t you take a rest.', ja: '少し休んだらどうですか。' },
      { text: '对不起，我没听懂。', pinyin: 'duì bu qǐ, wǒ méi tīng dǒng.', en: 'Sorry, I didn\'t understand.', ja: 'すみません、聞き取れませんでした。' },
      { text: '这是我丈夫，他在公司上班。', pinyin: 'zhè shì wǒ zhàng fu, tā zài gōng sī shàng bān.', en: 'This is my husband; he works at a company.', ja: 'こちらは夫で、会社で働いています。' },
      { text: '咖啡太热了，一会儿再喝吧。', pinyin: 'kā fēi tài rè le, yī huìr zài hē ba.', en: 'The coffee is too hot; drink it in a little while.', ja: 'コーヒーが熱すぎるので、少ししてから飲みましょう。' },
    ] },

  { id: 'listen:hsk2:005', unit: 11, type: 'comprehension', title: 'Listening: prices and plans', title_ja: '聞き取り：値段と予定',
    items: [
      { text: '这件衣服二百五十块，太贵了。', pinyin: 'zhè jiàn yī fu èr bǎi wǔ shí kuài, tài guì le.', en: 'This piece of clothing is 250 yuan; too expensive.', ja: 'この服は250元で、高すぎます。',
        questions: [ { q: '衣服多少钱？', choices: ['二百五十块', '一百五十块', '二百块'], answer: 0, why: '二百五十块.', why_ja: '「二百五十块」と言っています。' } ] },
      { text: '我想去北京旅游，但是我没有时间。', pinyin: 'wǒ xiǎng qù běi jīng lǚ yóu, dàn shì wǒ méi yǒu shí jiān.', en: 'I would like to travel to Beijing, but I have no time.', ja: '北京に旅行に行きたいのですが、時間がありません。',
        questions: [ { q: '他为什么不去北京？', choices: ['没有钱', '没有时间', '不喜欢北京'], answer: 1, why: '但是我没有时间.', why_ja: '「但是我没有时间」と言っています。' } ] },
      { text: '早上我喝一杯牛奶，吃一个苹果。', pinyin: 'zǎo shang wǒ hē yī bēi niú nǎi, chī yī ge píng guǒ.', en: 'In the morning I drink a glass of milk and eat an apple.', ja: '朝は牛乳を一杯飲んで、りんごを一つ食べます。',
        questions: [ { q: '他早上喝什么？', choices: ['咖啡', '牛奶', '茶'], answer: 1, why: '喝一杯牛奶.', why_ja: '「喝一杯牛奶」と言っています。' } ] },
      { text: '我妹妹唱歌唱得很好，她每天都唱。', pinyin: 'wǒ mèi mei chàng gē chàng de hěn hǎo, tā měi tiān dōu chàng.', en: 'My younger sister sings very well; she sings every day.', ja: '妹は歌がとても上手で、毎日歌っています。',
        questions: [ { q: '谁唱歌唱得好？', choices: ['妹妹', '弟弟', '妈妈'], answer: 0, why: '我妹妹唱歌唱得很好.', why_ja: '「我妹妹唱歌唱得很好」と言っています。' } ] },
    ] },
];
