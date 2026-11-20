// HSK 4 readings and listening drills. Texts use only HSK 1–3 characters plus the
// HSK 4 characters taught by the end of the item's unit (see cache/hsk4-plan.txt).

export const READINGS = [
  { id: 'read:hsk4:001', unit: 4, title: '留学的第一个月', en: 'The first month abroad', ja: '留学の最初の1か月',
    text: '我来北京留学已经一个月了。刚来的时候，我什么都不习惯：饭菜不好吃，地铁上人太多，老师说话太快。有几天我甚至想回国。不过情况慢慢变好了。我认识了几个中国朋友，他们每天和我一起练习说话，周末还带我去看了长城。现在我的汉语进步了很多，上课能听懂百分之八十的内容，也敢在课上回答问题了。我知道，只要继续努力，一切都会越来越好。留学不只是学习汉语，也是学习怎么生活。',
    pinyin: 'wǒ lái běi jīng liú xué yǐ jīng yī ge yuè le. gāng lái de shí hou, wǒ shén me dōu bù xí guàn: fàn cài bù hǎo chī, dì tiě shàng rén tài duō, lǎo shī shuō huà tài kuài. yǒu jǐ tiān wǒ shèn zhì xiǎng huí guó. bù guò qíng kuàng màn màn biàn hǎo le. wǒ rèn shi le jǐ ge zhōng guó péng you, tā men měi tiān hé wǒ yī qǐ liàn xí shuō huà, zhōu mò hái dài wǒ qù kàn le cháng chéng. xiàn zài wǒ de hàn yǔ jìn bù le hěn duō, shàng kè néng tīng dǒng bǎi fēn zhī bā shí de nèi róng, yě gǎn zài kè shàng huí dá wèn tí le. wǒ zhī dào, zhǐ yào jì xù nǔ lì, yī qiè dōu huì yuè lái yuè hǎo. liú xué bù zhǐ shì xué xí hàn yǔ, yě shì xué xí zěn me shēng huó.',
    enText: 'I have been studying in Beijing for a month now. When I first arrived, I was not used to anything: the food was not tasty, the subway was too crowded, the teachers spoke too fast. For a few days I even wanted to go home. But things slowly got better. I got to know a few Chinese friends who practise speaking with me every day and at the weekend took me to see the Great Wall. Now my Chinese has improved a lot; in class I can understand eighty percent of the content and I dare to answer questions. I know that as long as I keep working hard, everything will get better and better. Studying abroad is not just learning Chinese; it is also learning how to live.',
    jaText: '私が北京に留学に来てもう1か月になります。来たばかりのころは何にも慣れませんでした。料理はおいしくなく、地下鉄は人が多すぎ、先生の話は速すぎました。帰国したいと思った日さえありました。でも状況は少しずつよくなりました。中国人の友達が何人かでき、毎日一緒に話す練習をしてくれ、週末には万里の長城にも連れて行ってくれました。今では中国語がかなり上達し、授業の内容の8割は聞き取れ、授業で質問に答える勇気も出てきました。努力を続けさえすれば、すべてがますますよくなると分かっています。留学は中国語を学ぶだけでなく、どう生きるかを学ぶことでもあります。',
    questions: [
      { q: '他来北京多长时间了？', choices: ['一个星期', '一个月', '一年'], answer: 1, why: 'The text opens with 已经一个月了.', why_ja: '冒頭に「已经一个月了」とあります。' },
      { q: '刚来的时候，他觉得什么太快？', choices: ['地铁', '老师说话', '饭菜'], answer: 1, why: '老师说话太快.', why_ja: '「老师说话太快」とあります。' },
      { q: '现在他上课能听懂多少？', choices: ['百分之八十', '百分之十八', '一切'], answer: 0, why: '能听懂百分之八十的内容.', why_ja: '「能听懂百分之八十的内容」とあります。' },
    ] },

  { id: 'read:hsk4:002', unit: 8, title: '一个警察的故事', en: 'A police officer\'s story', ja: 'ある警察官の話',
    text: '小张是一名警察。昨天晚上十一点，他接到一个电话：一位老人在公园里找不到回家的路了。小张马上开车过去。公园很大，又很黑，找人很困难。他一边走一边叫老人的名字。半个小时以后，他终于在公园最里面的一张椅子上找到了老人。老人很冷，也很害怕。小张把自己的衣服给他穿上，然后送他回家。老人的女儿一直在门口等着，看见父亲回来，她哭了。小张说："这是我的工作，不用谢。"他觉得，能帮助别人，就是最大的幸福。',
    pinyin: 'xiǎo zhāng shì yī míng jǐng chá. zuó tiān wǎn shang shí yī diǎn, tā jiē dào yī ge diàn huà: yī wèi lǎo rén zài gōng yuán lǐ zhǎo bù dào huí jiā de lù le. xiǎo zhāng mǎ shàng kāi chē guò qù. gōng yuán hěn dà, yòu hěn hēi, zhǎo rén hěn kùn nan. tā yī biān zǒu yī biān jiào lǎo rén de míng zi. bàn ge xiǎo shí yǐ hòu, tā zhōng yú zài gōng yuán zuì lǐ miàn de yī zhāng yǐ zi shàng zhǎo dào le lǎo rén. lǎo rén hěn lěng, yě hěn hài pà. xiǎo zhāng bǎ zì jǐ de yī fu gěi tā chuān shàng, rán hòu sòng tā huí jiā. lǎo rén de nǚ ér yī zhí zài mén kǒu děng zhe, kàn jiàn fù qīn huí lái, tā kū le. xiǎo zhāng shuō: "zhè shì wǒ de gōng zuò, bù yòng xiè." tā jué de, néng bāng zhù bié rén, jiù shì zuì dà de xìng fú.',
    enText: 'Xiao Zhang is a police officer. At eleven last night he got a call: an elderly man could not find his way home in the park. Xiao Zhang drove over at once. The park was big and dark, and finding someone was hard. He walked and called the old man\'s name. Half an hour later he finally found him on a bench at the far end of the park. The old man was cold and frightened. Xiao Zhang put his own jacket on him and then took him home. The old man\'s daughter had been waiting at the door the whole time; when she saw her father return, she cried. Xiao Zhang said, "This is my job, no need to thank me." He feels that being able to help others is the greatest happiness.',
    jaText: '張さんは警察官です。昨夜11時、彼は電話を受けました。公園で一人のお年寄りが帰り道が分からなくなったというのです。張さんはすぐ車で向かいました。公園は広くて暗く、人を探すのは大変でした。彼は歩きながらお年寄りの名前を呼びました。30分後、ようやく公園のいちばん奥のベンチでお年寄りを見つけました。お年寄りは寒がって、おびえていました。張さんは自分の上着を着せて、家まで送りました。お年寄りの娘さんはずっと玄関で待っていて、父親が戻ったのを見て泣きました。張さんは「これが私の仕事です。お礼はいりません」と言いました。人を助けられることが最大の幸せだと彼は思っています。',
    questions: [
      { q: '小张是做什么的？', choices: ['医生', '警察', '司机'], answer: 1, why: '小张是一名警察.', why_ja: '「小张是一名警察」とあります。' },
      { q: '他在哪儿找到了老人？', choices: ['公园门口', '公园里的一张椅子上', '老人家里'], answer: 1, why: '在公园最里面的一张椅子上找到了老人.', why_ja: '「在公园最里面的一张椅子上找到了老人」とあります。' },
      { q: '看见父亲回来，老人的女儿怎么了？', choices: ['她笑了', '她哭了', '她走了'], answer: 1, why: '看见父亲回来，她哭了.', why_ja: '「看见父亲回来，她哭了」とあります。' },
    ] },

  { id: 'read:hsk4:003', unit: 12, title: '我的第一次申请', en: 'My first application', ja: '初めての応募',
    text: '大学快结束的时候，我申请了一家著名公司的工作。那是我第一次申请工作，我紧张得几天都睡不好。我按照网站上的要求，写了一份计划，还准备了很多问题怎么回答。面谈那天，一共有三十多个人竞争这个工作，其中很多人比我更有经验。结果我失败了。那天晚上我非常失望，甚至想放弃找工作。可是妈妈对我说："失败一次并不可怕，关键是你从中学到了什么。"我想了想，觉得她说得对。于是我重新开始准备。两个月以后，我终于得到了一份合适的工作。',
    pinyin: 'dà xué kuài jié shù de shí hou, wǒ shēn qǐng le yī jiā zhù míng gōng sī de gōng zuò. nà shì wǒ dì yī cì shēn qǐng gōng zuò, wǒ jǐn zhāng de jǐ tiān dōu shuì bù hǎo. wǒ àn zhào wǎng zhàn shàng de yāo qiú, xiě le yī fèn jì huà, hái zhǔn bèi le hěn duō wèn tí zěn me huí dá. miàn tán nà tiān, yī gòng yǒu sān shí duō ge rén jìng zhēng zhè ge gōng zuò, qí zhōng hěn duō rén bǐ wǒ gèng yǒu jīng yàn. jié guǒ wǒ shī bài le. nà tiān wǎn shang wǒ fēi cháng shī wàng, shèn zhì xiǎng fàng qì zhǎo gōng zuò. kě shì mā ma duì wǒ shuō: "shī bài yī cì bìng bù kě pà, guān jiàn shì nǐ cóng zhōng xué dào le shén me." wǒ xiǎng le xiǎng, jué de tā shuō de duì. yú shì wǒ chóng xīn kāi shǐ zhǔn bèi. liǎng ge yuè yǐ hòu, wǒ zhōng yú dé dào le yī fèn hé shì de gōng zuò.',
    enText: 'Near the end of university, I applied for a job at a famous company. It was my first job application, and I was so nervous that I slept badly for days. Following the requirements on the website, I wrote a plan and prepared answers to many questions. On the interview day, more than thirty people were competing for the job, many of them with more experience than me. In the end I failed. That evening I was very disappointed and even thought of giving up the job search. But my mother said to me, "Failing once is nothing to fear; the key is what you learned from it." I thought about it and felt she was right. So I started preparing again. Two months later, I finally got a suitable job.',
    jaText: '大学が終わりに近づいたころ、私は有名な会社の仕事に応募しました。初めての応募で、緊張して何日もよく眠れませんでした。ウェブサイトの要件に従って計画書を1通書き、たくさんの質問の答えも準備しました。面談の日、30人以上がこの仕事を争い、その多くは私より経験がありました。結果は不採用でした。その夜はとてもがっかりして、仕事探しをあきらめようとさえ思いました。でも母は「一度の失敗は怖くない。大事なのはそこから何を学んだかだ」と言いました。少し考えて、母の言うとおりだと思いました。そこで私は準備をやり直しました。2か月後、ようやくふさわしい仕事を得ました。',
    questions: [
      { q: '他申请的是什么样的公司？', choices: ['一家著名公司', '一家小公司', '一家新公司'], answer: 0, why: '一家著名公司的工作.', why_ja: '「一家著名公司的工作」とあります。' },
      { q: '面谈那天有多少人竞争？', choices: ['十多个', '二十多个', '三十多个'], answer: 2, why: '一共有三十多个人竞争这个工作.', why_ja: '「一共有三十多个人竞争这个工作」とあります。' },
      { q: '妈妈觉得什么最关键？', choices: ['不要失败', '从失败中学到了什么', '放弃找工作'], answer: 1, why: '关键是你从中学到了什么.', why_ja: '「关键是你从中学到了什么」とあります。' },
    ] },

  { id: 'read:hsk4:004', unit: 16, title: '老照片', en: 'An old photo', ja: '古い写真',
    text: '上个周末，我帮奶奶打扫房间，在一个旧箱子里发现了一张老照片。照片上是一座桥，桥上站着一个年轻的女孩，笑得很好看。奶奶说，那就是她，照片是五十年前照的。那时候，这座桥是城市里最有名的地方，很多年轻人都喜欢在桥上聊天。随着城市的发展，旧桥已经没有了，现在那里是一条很大的路。奶奶看着照片，回忆起很多以前的事。她说："时间过得真快，不过这些回忆永远不会变。"我把照片挂在了奶奶房间的墙上。',
    pinyin: 'shàng ge zhōu mò, wǒ bāng nǎi nai dǎ sǎo fáng jiān, zài yī ge jiù xiāng zi lǐ fā xiàn le yī zhāng lǎo zhào piàn. zhào piàn shàng shì yī zuò qiáo, qiáo shàng zhàn zhe yī ge nián qīng de nǚ hái, xiào de hěn hǎo kàn. nǎi nai shuō, nà jiù shì tā, zhào piàn shì wǔ shí nián qián zhào de. nà shí hou, zhè zuò qiáo shì chéng shì lǐ zuì yǒu míng de dì fang, hěn duō nián qīng rén dōu xǐ huan zài qiáo shàng liáo tiān. suí zhe chéng shì de fā zhǎn, jiù qiáo yǐ jīng méi yǒu le, xiàn zài nà lǐ shì yī tiáo hěn dà de lù. nǎi nai kàn zhe zhào piàn, huí yì qǐ hěn duō yǐ qián de shì. tā shuō: "shí jiān guò de zhēn kuài, bù guò zhè xiē huí yì yǒng yuǎn bù huì biàn." wǒ bǎ zhào piàn guà zài le nǎi nai fáng jiān de qiáng shàng.',
    enText: 'Last weekend I helped my grandmother clean her room and found an old photo in an old box. The photo showed a bridge, and on the bridge stood a young girl with a lovely smile. Grandma said that was her; the photo was taken fifty years ago. Back then, the bridge was the most famous spot in the city, and many young people liked to chat on it. As the city developed, the old bridge disappeared; today there is a big road there. Looking at the photo, Grandma recalled many things from the past. She said, "Time flies, but these memories will never change." I hung the photo on the wall of her room.',
    jaText: '先週末、祖母の部屋の掃除を手伝っていて、古い箱の中に古い写真を見つけました。写真には橋が写っていて、橋の上に若い女の子が立ち、とてもきれいに笑っていました。祖母はそれが自分で、50年前に撮った写真だと言いました。当時この橋は町でいちばん有名な場所で、多くの若者が橋の上でおしゃべりするのが好きでした。町の発展とともに古い橋はなくなり、今そこは大きな道路です。祖母は写真を見ながら、昔のことをたくさん思い出しました。「時間が経つのは本当に早い。でもこの思い出は永遠に変わらない」と言いました。私は写真を祖母の部屋の壁に掛けました。',
    questions: [
      { q: '照片上有什么？', choices: ['一座山', '一座桥', '一条河'], answer: 1, why: '照片上是一座桥.', why_ja: '「照片上是一座桥」とあります。' },
      { q: '照片是什么时候照的？', choices: ['五年前', '十五年前', '五十年前'], answer: 2, why: '照片是五十年前照的.', why_ja: '「照片是五十年前照的」とあります。' },
      { q: '现在旧桥那里是什么？', choices: ['一条大路', '一个公园', '一座新桥'], answer: 0, why: '现在那里是一条很大的路.', why_ja: '「现在那里是一条很大的路」とあります。' },
    ] },

  { id: 'read:hsk4:005', unit: 20, title: '网上购物', en: 'Shopping online', ja: 'ネットショッピング',
    text: '现在越来越多的人喜欢在网上购物。我妈妈以前从来不在网上买东西，她总是说："看不见的东西，质量怎么保证？"可是去年冬天，她想买一件大衣，商店里的价格太贵了。我帮她在网上找到了一件一样的，便宜了一半。大衣寄到家以后，妈妈仔细检查了一遍，质量确实不错。从那以后，她也成了网上商店的顾客。不过我提醒她：网上购物要注意，首先要看别的顾客的意见，其次不要买太便宜的东西，否则很容易被骗。妈妈笑着说："放心吧，我比你还小心。"',
    pinyin: 'xiàn zài yuè lái yuè duō de rén xǐ huan zài wǎng shàng gòu wù. wǒ mā ma yǐ qián cóng lái bù zài wǎng shàng mǎi dōng xi, tā zǒng shì shuō: "kàn bù jiàn de dōng xi, zhì liàng zěn me bǎo zhèng?" kě shì qù nián dōng tiān, tā xiǎng mǎi yī jiàn dà yī, shāng diàn lǐ de jià gé tài guì le. wǒ bāng tā zài wǎng shàng zhǎo dào le yī jiàn yī yàng de, pián yi le yī bàn. dà yī jì dào jiā yǐ hòu, mā ma zǐ xì jiǎn chá le yī biàn, zhì liàng què shí bù cuò. cóng nà yǐ hòu, tā yě chéng le wǎng shàng shāng diàn de gù kè. bù guò wǒ tí xǐng tā: wǎng shàng gòu wù yào zhù yì, shǒu xiān yào kàn bié de gù kè de yì jiàn, qí cì bù yào mǎi tài pián yi de dōng xi, fǒu zé hěn róng yì bèi piàn. mā ma xiào zhe shuō: "fàng xīn ba, wǒ bǐ nǐ hái xiǎo xīn."',
    enText: 'More and more people like shopping online these days. My mother never used to buy things online; she always said, "How can you guarantee the quality of something you cannot see?" But last winter she wanted to buy a coat, and the price in the shop was too high. I helped her find the same coat online for half the price. After it was delivered, Mum checked it carefully, and the quality really was good. Since then she has become a customer of online shops too. But I reminded her: be careful shopping online; first read other customers\' reviews, and second do not buy things that are too cheap, otherwise you can easily be cheated. Mum laughed and said, "Don\'t worry, I am even more careful than you."',
    jaText: '今ではますます多くの人がネットショッピングを好みます。母は以前はネットで物を買うことがなく、「見えない物の品質をどう保証するの」といつも言っていました。でも去年の冬、母はコートを買いたくなり、店の値段は高すぎました。私がネットで同じものを見つけてあげると、半額でした。コートが家に届くと、母は丁寧に一通り調べ、品質は確かによいものでした。それ以来、母もネットショップの客になりました。ただ私は注意しました。ネットショッピングでは、まずほかの客の意見を見ること、次に安すぎるものを買わないこと、さもないとだまされやすいと。母は笑って「安心して。私はあなたより慎重よ」と言いました。',
    questions: [
      { q: '妈妈以前为什么不在网上买东西？', choices: ['太贵', '不会用电脑', '担心质量'], answer: 2, why: '她说 质量怎么保证, so she worried about quality.', why_ja: '「质量怎么保证」と言っているので、品質を心配していました。' },
      { q: '网上的大衣比商店里的便宜多少？', choices: ['一半', '一点儿', '一倍'], answer: 0, why: '便宜了一半.', why_ja: '「便宜了一半」とあります。' },
      { q: '网上购物首先要做什么？', choices: ['买最便宜的', '看别的顾客的意见', '仔细检查'], answer: 1, why: '首先要看别的顾客的意见.', why_ja: '「首先要看别的顾客的意见」とあります。' },
    ] },

  { id: 'read:hsk4:006', unit: 24, title: '海边的一天', en: 'A day by the sea', ja: '海辺の一日',
    text: '上个星期，我们全家去海边旅游。那天天气特别好，阳光很好，风也不大。爸爸一到海边就开始照相，他说这里的风景比任何地方都美丽。妈妈坐在树下看书，一边看一边笑。我和弟弟在海里游泳，水有点儿冷，但是很干净。中午我们在海边的一家小饭馆吃饭，老板是一位很热情的阿姨，她做的鱼好吃极了。下午，弟弟突然说想爬附近的小山，从山上往下看，海洋又蓝又大，简直像一张画。回家的路上，大家都累了，可是每个人的脸上都带着笑。',
    pinyin: 'shàng ge xīng qī, wǒ men quán jiā qù hǎi biān lǚ yóu. nà tiān tiān qì tè bié hǎo, yáng guāng hěn hǎo, fēng yě bù dà. bà ba yī dào hǎi biān jiù kāi shǐ zhào xiàng, tā shuō zhè lǐ de fēng jǐng bǐ rèn hé dì fang dōu měi lì. mā ma zuò zài shù xià kàn shū, yī biān kàn yī biān xiào. wǒ hé dì di zài hǎi lǐ yóu yǒng, shuǐ yǒu diǎnr lěng, dàn shì hěn gān jìng. zhōng wǔ wǒ men zài hǎi biān de yī jiā xiǎo fàn guǎn chī fàn, lǎo bǎn shì yī wèi hěn rè qíng de ā yí, tā zuò de yú hǎo chī jí le. xià wǔ, dì di tū rán shuō xiǎng pá fù jìn de xiǎo shān, cóng shān shàng wǎng xià kàn, hǎi yáng yòu lán yòu dà, jiǎn zhí xiàng yī zhāng huà. huí jiā de lù shàng, dà jiā dōu lèi le, kě shì měi ge rén de liǎn shàng dōu dài zhe xiào.',
    enText: 'Last week our whole family went on a trip to the seaside. The weather that day was especially good: warm sunshine and little wind. As soon as Dad reached the beach he started taking photos, saying the scenery here was more beautiful than anywhere else. Mum sat under a tree reading and laughing. My younger brother and I swam in the sea; the water was a little cool but very clean. At noon we ate at a small restaurant by the beach; the owner was a warm-hearted lady, and her fish was delicious. In the afternoon my brother suddenly wanted to climb the nearby hill; looking down from the top, the ocean was blue and vast, just like a painting. On the way home everyone was tired, but every face wore a smile.',
    jaText: '先週、家族みんなで海辺へ旅行に行きました。その日は天気がとてもよく、日差しは暖かく、風もあまりありませんでした。父は海辺に着くとすぐ写真を撮り始め、ここの景色はどこよりも美しいと言いました。母は木の下で本を読みながら笑っていました。私と弟は海で泳ぎました。水は少し冷たかったですが、とてもきれいでした。お昼は海辺の小さな食堂で食べました。店主は親切なおばさんで、彼女の作る魚料理は最高においしかったです。午後、弟が急に近くの小さな山に登りたいと言い出しました。山の上から見下ろすと、海は青くて広く、まるで一枚の絵のようでした。帰り道、みんな疲れていましたが、誰の顔にも笑顔がありました。',
    questions: [
      { q: '那天的天气怎么样？', choices: ['风很大', '特别好', '下雨'], answer: 1, why: '那天天气特别好.', why_ja: '「那天天气特别好」とあります。' },
      { q: '谁一到海边就开始照相？', choices: ['爸爸', '妈妈', '弟弟'], answer: 0, why: '爸爸一到海边就开始照相.', why_ja: '「爸爸一到海边就开始照相」とあります。' },
      { q: '从山上往下看，海洋像什么？', choices: ['一张画', '一本书', '一条路'], answer: 0, why: '简直像一张画.', why_ja: '「简直像一张画」とあります。' },
    ] },

  { id: 'read:hsk4:007', unit: 28, title: '去农村的一天', en: 'A day in the countryside', ja: '農村での一日',
    text: '我在城市长大，从来没去过农村。这个夏天，同学小李邀请我去他的老家住几天。他家在一个安静的小村子里，周围是绿绿的树和一条小河。那里的气候比城市好，空气也新鲜。早上五点，我被鸟的叫声弄醒了。小李的爷爷已经在地里干活了。他七十多岁了，身体却非常好。我问他累不累，他笑着说："习惯了，不干活反而不舒服。"晚上，全家人坐在院子里一边吃西瓜一边聊天，小李的奶奶还给我讲了很多以前的事。这几天让我明白，幸福的生活不一定在大城市里。',
    pinyin: 'wǒ zài chéng shì zhǎng dà, cóng lái méi qù guo nóng cūn. zhè ge xià tiān, tóng xué xiǎo lǐ yāo qǐng wǒ qù tā de lǎo jiā zhù jǐ tiān. tā jiā zài yī ge ān jìng de xiǎo cūn zi lǐ, zhōu wéi shì lǜ lǜ de shù hé yī tiáo xiǎo hé. nà lǐ de qì hòu bǐ chéng shì hǎo, kōng qì yě xīn xiān. zǎo shang wǔ diǎn, wǒ bèi niǎo de jiào shēng nòng xǐng le. xiǎo lǐ de yé ye yǐ jīng zài dì lǐ gàn huó le. tā qī shí duō suì le, shēn tǐ què fēi cháng hǎo. wǒ wèn tā lèi bù lèi, tā xiào zhe shuō: "xí guàn le, bù gàn huó fǎn ér bù shū fu." wǎn shang, quán jiā rén zuò zài yuàn zi lǐ yī biān chī xī guā yī biān liáo tiān, xiǎo lǐ de nǎi nai hái gěi wǒ jiǎng le hěn duō yǐ qián de shì. zhè jǐ tiān ràng wǒ míng bai, xìng fú de shēng huó bù yī dìng zài dà chéng shì lǐ.',
    enText: 'I grew up in the city and had never been to the countryside. This summer my classmate Xiao Li invited me to stay a few days at his family home. His house is in a quiet little village surrounded by green trees and a small river. The climate there is better than in the city and the air is fresh. At five in the morning I was woken by birdsong. Xiao Li\'s grandfather was already working in the fields. He is over seventy, yet very fit. I asked whether he was tired; he smiled and said, "I am used to it; not working actually feels uncomfortable." In the evening the whole family sat in the yard eating watermelon and chatting, and Xiao Li\'s grandmother told me many stories from the past. These few days taught me that a happy life is not necessarily found in a big city.',
    jaText: '私は都会で育ち、農村に行ったことがありませんでした。この夏、クラスメートの李くんが実家に何日か泊まりに来ないかと誘ってくれました。彼の家は静かな小さな村にあり、周りは緑の木々と小さな川です。気候は都会よりよく、空気も新鮮です。朝5時、私は鳥の鳴き声で起こされました。李くんのおじいさんはもう畑で働いていました。70歳を過ぎているのに体はとても元気です。疲れないかと聞くと、笑って「慣れたよ。働かないほうがかえって落ち着かない」と言いました。夜は家族みんなで庭に座ってスイカを食べながらおしゃべりし、おばあさんは昔の話をたくさん聞かせてくれました。この数日で、幸せな暮らしは大都市にあるとは限らないと分かりました。',
    questions: [
      { q: '他以前去过农村吗？', choices: ['去过很多次', '从来没去过', '去过一次'], answer: 1, why: '从来没去过农村.', why_ja: '「从来没去过农村」とあります。' },
      { q: '早上五点，他是被什么弄醒的？', choices: ['鸟的叫声', '小李', '爷爷'], answer: 0, why: '我被鸟的叫声弄醒了.', why_ja: '「我被鸟的叫声弄醒了」とあります。' },
      { q: '小李的爷爷多大了？', choices: ['五十多岁', '六十多岁', '七十多岁'], answer: 2, why: '他七十多岁了.', why_ja: '「他七十多岁了」とあります。' },
    ] },

  { id: 'read:hsk4:008', unit: 31, title: '暑假的计划', en: 'Summer holiday plans', ja: '夏休みの計画',
    text: '再过两个星期就放暑假了，我和几个同学正在商量暑假的计划。小张想去上海看京剧，她说京剧是中国最有名的艺术之一，一定要去看一次。小李对历史很感兴趣，打算去西安参观。我呢，既想旅游，又想提高汉语，所以决定先在北京上一个月的语法课，然后再去南方旅游。我们讨论了很久，最后决定：七月各做各的事，八月一起去南方。无论去哪儿，我们都要用汉语交流，不许说别的语言。暑假还没开始，我已经等不及了。希望这个暑假我们都能过得既愉快又有意思。',
    pinyin: 'zài guò liǎng ge xīng qī jiù fàng shǔ jià le, wǒ hé jǐ ge tóng xué zhèng zài shāng liang shǔ jià de jì huà. xiǎo zhāng xiǎng qù shàng hǎi kàn jīng jù, tā shuō jīng jù shì zhōng guó zuì yǒu míng de yì shù zhī yī, yī dìng yào qù kàn yī cì. xiǎo lǐ duì lì shǐ hěn gǎn xìng qù, dǎ suàn qù xī ān cān guān. wǒ ne, jì xiǎng lǚ yóu, yòu xiǎng tí gāo hàn yǔ, suǒ yǐ jué dìng xiān zài běi jīng shàng yī ge yuè de yǔ fǎ kè, rán hòu zài qù nán fāng lǚ yóu. wǒ men tǎo lùn le hěn jiǔ, zuì hòu jué dìng: qī yuè gè zuò gè de shì, bā yuè yī qǐ qù nán fāng. wú lùn qù nǎr, wǒ men dōu yào yòng hàn yǔ jiāo liú, bù xǔ shuō bié de yǔ yán. shǔ jià hái méi kāi shǐ, wǒ yǐ jīng děng bù jí le. xī wàng zhè ge shǔ jià wǒ men dōu néng guò de jì yú kuài yòu yǒu yì si.',
    enText: 'In two weeks the summer holiday begins, and a few classmates and I are discussing our plans. Xiao Zhang wants to go to Shanghai to see Beijing opera; she says it is one of China\'s most famous arts and must be seen at least once. Xiao Li is very interested in history and plans to visit Xi\'an. As for me, I want both to travel and to improve my Chinese, so I decided to take a month of grammar classes in Beijing first and then travel to the south. We discussed for a long time and finally decided: in July everyone does their own thing, and in August we go south together. Wherever we go, we will communicate in Chinese; no other language allowed. The holiday has not even started, and I can hardly wait. I hope we can all have a summer that is both enjoyable and interesting.',
    jaText: 'あと2週間で夏休みです。私は何人かのクラスメートと夏休みの計画を相談しています。張さんは上海で京劇を見たいそうです。京劇は中国でもっとも有名な芸術の一つだから、必ず一度は見るべきだと言います。李くんは歴史に興味があり、西安を見学するつもりです。私はというと、旅行もしたいし中国語も上達させたいので、まず北京で1か月文法の授業を受け、それから南方へ旅行することにしました。長く話し合って、最後に決めました。7月はそれぞれ自分のことをして、8月は一緒に南方へ行く。どこへ行っても中国語でやりとりし、ほかの言語は禁止です。夏休みはまだ始まっていないのに、もう待ちきれません。この夏休みがみんなにとって楽しく、面白いものになりますように。',
    questions: [
      { q: '小张暑假想做什么？', choices: ['去上海看京剧', '去西安参观', '上语法课'], answer: 0, why: '小张想去上海看京剧.', why_ja: '「小张想去上海看京剧」とあります。' },
      { q: '他们决定八月做什么？', choices: ['各做各的事', '一起去南方', '在北京上课'], answer: 1, why: '八月一起去南方.', why_ja: '「八月一起去南方」とあります。' },
      { q: '暑假他们要用什么语言交流？', choices: ['汉语', '日语', '别的语言'], answer: 0, why: '我们都要用汉语交流.', why_ja: '「我们都要用汉语交流」とあります。' },
    ] },
];

export const LISTENING = [
  { id: 'listen:hsk4:001', unit: 2, type: 'dictation', title: 'Dictation: plans and news', title_ja: '書き取り：計画とニュース',
    items: [
      { text: '我们的计划已经全部完成了。', pinyin: 'wǒ men de jì huà yǐ jīng quán bù wán chéng le.', en: 'Our plan has been completely carried out.', ja: '私たちの計画はすべて完了しました。' },
      { text: '你听到这个消息了吗？', pinyin: 'nǐ tīng dào zhè ge xiāo xi le ma?', en: 'Have you heard this news?', ja: 'この知らせを聞きましたか。' },
      { text: '由于下雨，活动不能继续进行。', pinyin: 'yóu yú xià yǔ, huó dòng bù néng jì xù jìn xíng.', en: 'Because of the rain, the event cannot go on.', ja: '雨のため、イベントは続けられません。' },
      { text: '他甚至连饭都没吃就走了。', pinyin: 'tā shèn zhì lián fàn dōu méi chī jiù zǒu le.', en: 'He left without even eating.', ja: '彼はご飯さえ食べずに行ってしまいました。' },
      { text: '这里很安全，你不用担心。', pinyin: 'zhè lǐ hěn ān quán, nǐ bù yòng dān xīn.', en: 'It is safe here; no need to worry.', ja: 'ここは安全ですから、心配いりません。' },
    ] },

  { id: 'listen:hsk4:002', unit: 6, type: 'comprehension', title: 'Listening: a busy father', title_ja: '聞き取り：忙しい父',
    items: [
      { text: '我父亲是一名记者，工作压力很大，经常晚上十点才回家。即使这么忙，他也从来不忘记我的生日。今年我生日那天，他安排好工作，早早地回家，给我做了一个蛋糕。我觉得自己很幸福。', pinyin: 'wǒ fù qīn shì yī míng jì zhě, gōng zuò yā lì hěn dà, jīng cháng wǎn shang shí diǎn cái huí jiā. jí shǐ zhè me máng, tā yě cóng lái bù wàng jì wǒ de shēng rì. jīn nián wǒ shēng rì nà tiān, tā ān pái hǎo gōng zuò, zǎo zǎo de huí jiā, gěi wǒ zuò le yī ge dàn gāo. wǒ jué de zì jǐ hěn xìng fú.', en: 'My father is a journalist. His work is stressful and he often does not get home until ten at night. Even so busy, he never forgets my birthday. On my birthday this year he arranged his work, came home early and made me a cake. I feel very lucky.', ja: '父は記者で、仕事のプレッシャーが大きく、よく夜10時にやっと帰宅します。そんなに忙しくても、私の誕生日を忘れたことはありません。今年の誕生日には仕事を調整して早めに帰り、ケーキを作ってくれました。私はとても幸せだと思います。',
        questions: [
          { q: '父亲是做什么工作的？', choices: ['老师', '记者', '医生'], answer: 1, why: '我父亲是一名记者.', why_ja: '「我父亲是一名记者」とあります。' },
          { q: '父亲经常几点回家？', choices: ['晚上八点', '晚上十点', '下午五点'], answer: 1, why: '经常晚上十点才回家.', why_ja: '「经常晚上十点才回家」とあります。' },
        ] },
      { text: '小李，明天的会议安排好了吗？首先请你把房间准备好，其次要通知所有人，最后别忘了准备好要用的东西。有问题就给我打电话。', pinyin: 'xiǎo lǐ, míng tiān de huì yì ān pái hǎo le ma? shǒu xiān qǐng nǐ bǎ fáng jiān zhǔn bèi hǎo, qí cì yào tōng zhī suǒ yǒu rén, zuì hòu bié wàng le zhǔn bèi hǎo yào yòng de dōng xi. yǒu wèn tí jiù gěi wǒ dǎ diàn huà.', en: 'Xiao Li, is tomorrow\'s meeting arranged? First please get the room ready, second notify everyone, and finally do not forget to prepare the things we will need. Call me if there is a problem.', ja: '李さん、明日の会議の手配はできましたか。まず部屋を準備して、次に全員に知らせて、最後に使うものの準備を忘れないでください。問題があれば電話してください。',
        questions: [
          { q: '小李首先要做什么？', choices: ['通知所有人', '准备房间', '准备东西'], answer: 1, why: '首先请你把房间准备好.', why_ja: '「首先请你把房间准备好」とあります。' },
          { q: '最后要做什么？', choices: ['打电话', '通知所有人', '准备要用的东西'], answer: 2, why: '最后别忘了准备好要用的东西.', why_ja: '「最后别忘了准备好要用的东西」とあります。' },
        ] },
      { text: '我的梦想是成为一名医生。虽然学习很累，但是我从来没想过放弃。我相信，只要坚持下去，梦想一定会实现。', pinyin: 'wǒ de mèng xiǎng shì chéng wéi yī míng yī shēng. suī rán xué xí hěn lèi, dàn shì wǒ cóng lái méi xiǎng guo fàng qì. wǒ xiāng xìn, zhǐ yào jiān chí xià qu, mèng xiǎng yī dìng huì shí xiàn.', en: 'My dream is to become a doctor. Although studying is tiring, I have never thought of giving up. I believe that as long as I keep going, the dream will surely come true.', ja: '私の夢は医者になることです。勉強は大変ですが、あきらめようと思ったことは一度もありません。続けさえすれば、夢はきっとかなうと信じています。',
        questions: [
          { q: '他的梦想是什么？', choices: ['当医生', '当老师', '当记者'], answer: 0, why: '我的梦想是成为一名医生.', why_ja: '「我的梦想是成为一名医生」とあります。' },
          { q: '他想过放弃吗？', choices: ['想过很多次', '从来没想过', '想过一次'], answer: 1, why: '我从来没想过放弃.', why_ja: '「我从来没想过放弃」とあります。' },
        ] },
      { text: '妈妈，我今天比赛赢了！老师说我负责的部分做得最好。我太高兴了，今天晚上我们去饭馆吃饭吧，我请客！', pinyin: 'mā ma, wǒ jīn tiān bǐ sài yíng le! lǎo shī shuō wǒ fù zé de bù fen zuò de zuì hǎo. wǒ tài gāo xìng le, jīn tiān wǎn shang wǒ men qù fàn guǎn chī fàn ba, wǒ qǐng kè!', en: 'Mum, I won the competition today! The teacher said the part I was in charge of was done best. I am so happy; let\'s eat at a restaurant tonight, my treat!', ja: 'お母さん、今日の試合に勝ったよ！ 先生が、僕の担当した部分がいちばんよくできていたって。すごくうれしい。今夜はレストランで食事しよう。僕がおごるよ！',
        questions: [
          { q: '今天谁赢了比赛？', choices: ['妈妈', '孩子', '老师'], answer: 1, why: 'The child says 我今天比赛赢了.', why_ja: '子どもが「我今天比赛赢了」と言っています。' },
          { q: '孩子想晚上做什么？', choices: ['去饭馆吃饭', '回家睡觉', '继续比赛'], answer: 0, why: '今天晚上我们去饭馆吃饭吧.', why_ja: '「今天晚上我们去饭馆吃饭吧」とあります。' },
        ] },
    ] },

  { id: 'listen:hsk4:003', unit: 14, type: 'comprehension', title: 'Listening: after graduation', title_ja: '聞き取り：卒業のあと',
    items: [
      { text: '女：你毕业以后打算做什么？男：我想先工作两年，然后再去国外留学。女：为什么不直接去留学？男：因为我想先有一些经验，另外也想自己先准备一些钱。', pinyin: 'nǚ: nǐ bì yè yǐ hòu dǎ suàn zuò shén me? nán: wǒ xiǎng xiān gōng zuò liǎng nián, rán hòu zài qù guó wài liú xué. nǚ: wèi shén me bù zhí jiē qù liú xué? nán: yīn wèi wǒ xiǎng xiān yǒu yī xiē jīng yàn, lìng wài yě xiǎng zì jǐ xiān zhǔn bèi yī xiē qián.', en: 'W: What do you plan to do after graduation? M: I want to work for two years first and then study abroad. W: Why not go abroad directly? M: Because I want to have some experience first, and also put aside some money myself.', ja: '女：卒業後は何をするつもり？ 男：まず2年働いて、それから海外に留学したい。女：どうして直接留学しないの？ 男：まず経験を持ちたいし、それにお金を自分で先に用意したいから。',
        questions: [
          { q: '男的毕业以后打算先做什么？', choices: ['去留学', '工作两年', '回老家'], answer: 1, why: '我想先工作两年.', why_ja: '「我想先工作两年」とあります。' },
          { q: '男的为什么不直接去留学？', choices: ['想先有一些经验', '不喜欢国外', '没有时间'], answer: 0, why: '因为我想先有一些经验.', why_ja: '「因为我想先有一些经验」とあります。' },
        ] },
      { text: '男：这件衣服的价格怎么这么贵？女：因为它做得特别好，而且是著名的公司做的。男：既然这样，我就买一件吧。女：好的，您等一下，我给您拿一件新的。', pinyin: 'nán: zhè jiàn yī fu de jià gé zěn me zhè me guì? nǚ: yīn wèi tā zuò de tè bié hǎo, ér qiě shì zhù míng de gōng sī zuò de. nán: jì rán zhè yàng, wǒ jiù mǎi yī jiàn ba. nǚ: hǎo de, nín děng yī xià, wǒ gěi nín ná yī jiàn xīn de.', en: 'M: Why is this piece of clothing so expensive? W: Because it is especially well made, and it is made by a famous company. M: In that case I will buy one. W: Certainly, please wait a moment, I will get you a new one.', ja: '男：この服はどうしてこんなに高いのですか。女：作りが特によく、それに有名な会社の製品ですから。男：それなら1着買います。女：はい、少々お待ちください。新しいものをお持ちします。',
        questions: [
          { q: '这件衣服为什么贵？', choices: ['做得好', '很新', '很大'], answer: 0, why: '因为它做得特别好.', why_ja: '「因为它做得特别好」とあります。' },
          { q: '男的最后决定怎么样？', choices: ['不买了', '买一件', '再看看'], answer: 1, why: '我就买一件吧.', why_ja: '「我就买一件吧」とあります。' },
        ] },
      { text: '明天的考试很重要，大家一定要认真准备。考试八点开始，请早十分钟到教室。千万别迟到，否则不能进去。', pinyin: 'míng tiān de kǎo shì hěn zhòng yào, dà jiā yī dìng yào rèn zhēn zhǔn bèi. kǎo shì bā diǎn kāi shǐ, qǐng zǎo shí fēn zhōng dào jiào shì. qiān wàn bié chí dào, fǒu zé bù néng jìn qù.', en: 'Tomorrow\'s exam is important, so everyone must prepare seriously. The exam starts at eight; please be in the classroom ten minutes early. Whatever you do, do not be late, otherwise you cannot go in.', ja: '明日の試験は大切なので、みなさん必ず真剣に準備してください。試験は8時に始まります。10分早く教室に来てください。くれぐれも遅刻しないように。さもないと入れません。',
        questions: [
          { q: '考试几点开始？', choices: ['七点', '八点', '十点'], answer: 1, why: '考试八点开始.', why_ja: '「考试八点开始」とあります。' },
          { q: '迟到了会怎么样？', choices: ['不能进去', '可以进去', '考试推迟'], answer: 0, why: '否则不能进去.', why_ja: '「否则不能进去」とあります。' },
        ] },
      { text: '女：你怎么了？看起来很紧张。男：我明天要和经理谈话，我怀疑他对我的工作不满意。女：别担心，你一直很努力，他肯定看得出来。', pinyin: 'nǚ: nǐ zěn me le? kàn qǐ lai hěn jǐn zhāng. nán: wǒ míng tiān yào hé jīng lǐ tán huà, wǒ huái yí tā duì wǒ de gōng zuò bù mǎn yì. nǚ: bié dān xīn, nǐ yī zhí hěn nǔ lì, tā kěn dìng kàn de chū lai.', en: 'W: What is wrong? You look nervous. M: I have to talk with the manager tomorrow; I suspect he is not satisfied with my work. W: Don\'t worry, you have always worked hard, he can surely see that.', ja: '女：どうしたの？ 緊張しているみたいだけど。男：明日マネージャーと話すんだ。僕の仕事に満足していないんじゃないかと思って。女：心配しないで。あなたはずっと頑張ってきたんだから、きっと分かってくれるわ。',
        questions: [
          { q: '男的明天要做什么？', choices: ['和经理谈话', '考试', '旅游'], answer: 0, why: '我明天要和经理谈话.', why_ja: '「我明天要和经理谈话」とあります。' },
          { q: '女的觉得怎么样？', choices: ['男的不努力', '经理会看出来男的很努力', '男的应该换工作'], answer: 1, why: '你一直很努力，他肯定看得出来.', why_ja: '「你一直很努力，他肯定看得出来」とあります。' },
        ] },
    ] },

  { id: 'listen:hsk4:004', unit: 18, type: 'dictation', title: 'Dictation: feelings and opinions', title_ja: '書き取り：気持ちと意見',
    items: [
      { text: '这里人太多了，我实在受不了。', pinyin: 'zhè lǐ rén tài duō le, wǒ shí zài shòu bu liǎo.', en: 'There are too many people here; I really cannot stand it.', ja: 'ここは人が多すぎて、本当に耐えられません。' },
      { text: '现在出发还来得及。', pinyin: 'xiàn zài chū fā hái lái de jí.', en: 'If we leave now there is still time.', ja: '今出発すればまだ間に合います。' },
      { text: '我对这件事的看法和你不一样。', pinyin: 'wǒ duì zhè jiàn shì de kàn fǎ hé nǐ bù yī yàng.', en: 'My view of this matter is different from yours.', ja: 'このことについての私の見方はあなたと違います。' },
      { text: '恐怕他今天不会来了。', pinyin: 'kǒng pà tā jīn tiān bù huì lái le.', en: 'I am afraid he will not come today.', ja: '彼は今日はおそらく来ないでしょう。' },
      { text: '与其在这里等，不如出去找他。', pinyin: 'yǔ qí zài zhè lǐ děng, bù rú chū qù zhǎo tā.', en: 'Rather than waiting here, better go and look for him.', ja: 'ここで待つより、出かけて彼を探したほうがいいです。' },
      { text: '尽管很辛苦，他仍然坚持每天锻炼。', pinyin: 'jǐn guǎn hěn xīn kǔ, tā réng rán jiān chí měi tiān duàn liàn.', en: 'Although it is hard, he still keeps exercising every day.', ja: 'つらくても、彼は今も毎日運動を続けています。' },
    ] },

  { id: 'listen:hsk4:005', unit: 22, type: 'comprehension', title: 'Listening: the lost key', title_ja: '聞き取り：なくした鍵',
    items: [
      { text: '女：你怎么站在门口？男：我的钥匙不见了，到处都找不到。女：你再仔细想想，最后一次用钥匙是什么时候？男：早上出门的时候……啊，我想起来了，钥匙还在办公室的桌子上！', pinyin: 'nǚ: nǐ zěn me zhàn zài mén kǒu? nán: wǒ de yào shi bù jiàn le, dào chù dōu zhǎo bù dào. nǚ: nǐ zài zǐ xì xiǎng xiang, zuì hòu yī cì yòng yào shi shì shén me shí hou? nán: zǎo shang chū mén de shí hou...... a, wǒ xiǎng qǐ lai le, yào shi hái zài bàn gōng shì de zhuō zi shàng!', en: 'W: Why are you standing at the door? M: My key is gone; I cannot find it anywhere. W: Think carefully, when did you last use it? M: When I left this morning... ah, I remember, the key is still on my desk at the office!', ja: '女：どうして玄関に立っているの？ 男：鍵がなくなって、どこにも見つからないんだ。女：よく考えて、最後に鍵を使ったのはいつ？ 男：朝出かけるとき……あ、思い出した。鍵はまだ会社の机の上だ！',
        questions: [
          { q: '男的为什么站在门口？', choices: ['在等人', '钥匙不见了', '门坏了'], answer: 1, why: '我的钥匙不见了.', why_ja: '「我的钥匙不见了」とあります。' },
          { q: '钥匙在哪儿？', choices: ['在家里', '在车上', '在办公室的桌子上'], answer: 2, why: '钥匙还在办公室的桌子上.', why_ja: '「钥匙还在办公室的桌子上」とあります。' },
        ] },
      { text: '各位顾客请注意：为了保护环境，减少污染，从下个月开始，本商店不再免费提供纸杯。请大家自己带杯子，谢谢合作。', pinyin: 'gè wèi gù kè qǐng zhù yì: wèi le bǎo hù huán jìng, jiǎn shǎo wū rǎn, cóng xià ge yuè kāi shǐ, běn shāng diàn bù zài miǎn fèi tí gōng zhǐ bēi. qǐng dà jiā zì jǐ dài bēi zi, xiè xie hé zuò.', en: 'Attention customers: to protect the environment and reduce pollution, from next month this shop will no longer provide free paper cups. Please bring your own cup. Thank you for your cooperation.', ja: 'お客様にお知らせします。環境を守り汚染を減らすため、来月から当店では無料の紙コップの提供をやめます。ご自身でコップをお持ちください。ご協力ありがとうございます。',
        questions: [
          { q: '从下个月开始，商店不再免费提供什么？', choices: ['纸杯', '饮料', '包'], answer: 0, why: '不再免费提供纸杯.', why_ja: '「不再免费提供纸杯」とあります。' },
          { q: '商店为什么这么做？', choices: ['为了赚钱', '为了保护环境', '因为没有杯子了'], answer: 1, why: '为了保护环境，减少污染.', why_ja: '「为了保护环境，减少污染」とあります。' },
        ] },
      { text: '男：你看，这条河的水这么黑，以前可不是这样的。女：是啊，污染越来越严重了。男：要是大家都注意保护环境就好了。', pinyin: 'nán: nǐ kàn, zhè tiáo hé de shuǐ zhè me hēi, yǐ qián kě bù shì zhè yàng de. nǚ: shì a, wū rǎn yuè lái yuè yán zhòng le. nán: yào shì dà jiā dōu zhù yì bǎo hù huán jìng jiù hǎo le.', en: 'M: Look, the water in this river is so black; it was not like this before. W: Yes, the pollution is getting worse and worse. M: If only everyone paid attention to protecting the environment.', ja: '男：見て、この川の水がこんなに黒い。前はこうじゃなかったのに。女：そうね、汚染がますますひどくなっている。男：みんなが環境を守ることに気をつければいいのに。',
        questions: [
          { q: '这条河以前怎么样？', choices: ['和现在一样', '不是这样的', '更黑'], answer: 1, why: '以前可不是这样的.', why_ja: '「以前可不是这样的」とあります。' },
          { q: '他们在谈什么？', choices: ['河水的污染', '买东西', '天气'], answer: 0, why: 'They talk about the black river water and 污染.', why_ja: '黒い川の水と「污染」について話しています。' },
        ] },
      { text: '女：祝贺你！听说你通过了考试。男：谢谢，其实我差点儿没通过。女：那你一定很紧张吧？男：是啊，看到结果的时候，我高兴得跳了起来。', pinyin: 'nǚ: zhù hè nǐ! tīng shuō nǐ tōng guò le kǎo shì. nán: xiè xie, qí shí wǒ chà diǎnr méi tōng guò. nǚ: nà nǐ yī dìng hěn jǐn zhāng ba? nán: shì a, kàn dào jié guǒ de shí hou, wǒ gāo xìng de tiào le qǐ lai.', en: 'W: Congratulations! I heard you passed the exam. M: Thanks; actually I very nearly failed. W: You must have been nervous, then? M: Yes, when I saw the result I jumped for joy.', ja: '女：おめでとう！ 試験に合格したそうね。男：ありがとう。実はもう少しで落ちるところだった。女：じゃあ、きっと緊張したでしょう。男：うん、結果を見たときはうれしくて飛び上がったよ。',
        questions: [
          { q: '男的通过考试了吗？', choices: ['通过了', '没通过', '还不知道'], answer: 0, why: '差点儿没通过 means he nearly failed but passed.', why_ja: '「差点儿没通过」は危うく落ちそうだったが合格した、という意味です。' },
          { q: '看到结果，男的怎么样？', choices: ['很紧张', '高兴得跳了起来', '哭了'], answer: 1, why: '我高兴得跳了起来.', why_ja: '「我高兴得跳了起来」とあります。' },
        ] },
    ] },

  { id: 'listen:hsk4:006', unit: 26, type: 'shadow', title: 'Shadowing: a relative\'s visit', title_ja: 'シャドーイング：親戚の訪問',
    items: [
      { text: '上个周末，亲戚们都来我家做客，家里热闹极了。', pinyin: 'shàng ge zhōu mò, qīn qi men dōu lái wǒ jiā zuò kè, jiā lǐ rè nao jí le.', en: 'Last weekend all the relatives came to visit, and the house was wonderfully lively.', ja: '先週末、親戚がみんなうちに遊びに来て、家はとてもにぎやかでした。' },
      { text: '叔叔很幽默，他一讲笑话，大家就笑个不停。', pinyin: 'shū shu hěn yōu mò, tā yī jiǎng xiào hua, dà jiā jiù xiào ge bù tíng.', en: 'My uncle is very humorous; as soon as he tells a joke, everyone laughs non-stop.', ja: '叔父はユーモアがあって、冗談を言うとみんな笑いが止まりません。' },
      { text: '我的小孙子才三岁，却已经会唱好几首歌了。', pinyin: 'wǒ de xiǎo sūn zi cái sān suì, què yǐ jīng huì chàng hǎo jǐ shǒu gē le.', en: 'My little grandson is only three, yet he can already sing several songs.', ja: '孫はまだ3歳なのに、もう何曲も歌えます。' },
      { text: '吃完饭，我们一起去附近的公园散步。', pinyin: 'chī wán fàn, wǒ men yī qǐ qù fù jìn de gōng yuán sàn bù.', en: 'After dinner we went for a walk in the nearby park together.', ja: '食事の後、みんなで近くの公園へ散歩に行きました。' },
      { text: '爷爷说，家人能常常集合在一起，是最幸福的事。', pinyin: 'yé ye shuō, jiā rén néng cháng cháng jí hé zài yī qǐ, shì zuì xìng fú de shì.', en: 'Grandpa says that being able to gather the family often is the happiest thing.', ja: '祖父は、家族がしょっちゅう集まれるのがいちばん幸せなことだと言います。' },
    ] },
];
