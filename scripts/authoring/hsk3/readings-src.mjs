// HSK 3 readings and listening drills. Texts use only HSK 1–2 characters plus the
// HSK 3 characters taught by the end of the item's unit (see cache/hsk3-plan.txt).

export const READINGS = [
  { id: 'read:hsk3:001', unit: 3, title: '周六的比赛', en: 'Saturday\'s match', ja: '土曜日の試合',
    text: '星期六，我们学校有篮球比赛。我和小张都参加了。比赛以前，我有点儿担心，因为我们的对手很高，也很快。老师说：别担心，只要大家一起用心打，就一定能打好。比赛开始以后，我们先打得不太好，然后打得更好了。最后，我们是第一！大家都非常高兴，老师也笑了。',
    pinyin: 'xīng qī liù, wǒ men xué xiào yǒu lán qiú bǐ sài. wǒ hé xiǎo zhāng dōu cān jiā le. bǐ sài yǐ qián, wǒ yǒu diǎnr dān xīn, yīn wèi wǒ men de duì shǒu hěn gāo, yě hěn kuài. lǎo shī shuō: bié dān xīn, zhǐ yào dà jiā yī qǐ yòng xīn dǎ, jiù yī dìng néng dǎ hǎo. bǐ sài kāi shǐ yǐ hòu, wǒ men xiān dǎ de bù tài hǎo, rán hòu dǎ de gèng hǎo le. zuì hòu, wǒ men shì dì yī! dà jiā dōu fēi cháng gāo xìng, lǎo shī yě xiào le.',
    enText: 'On Saturday our school had a basketball match. Xiao Zhang and I both took part. Before the match I was a little worried, because our opponents were tall and fast. The teacher said: do not worry, as long as everyone plays with their whole heart, we can surely play well. After the match began, we did not play very well at first, then we played better. In the end we came first! Everyone was very happy, and the teacher smiled too.',
    jaText: '土曜日、私たちの学校でバスケットボールの試合がありました。私と小張は二人とも参加しました。試合の前、私は少し心配でした。相手は背が高くて、速かったからです。先生は「心配しないで。みんなで一緒に一生懸命やれば、きっとうまくやれる」と言いました。試合が始まると、最初はあまりうまくいきませんでしたが、その後はもっと良くなりました。最後に私たちが一位でした！みんなとても喜び、先生も笑いました。',
    questions: [
      { q: '比赛以前，他怎么样？', choices: ['很高兴', '有点儿担心', '很累'], answer: 1, why: '比赛以前，我有点儿担心.', why_ja: '「比赛以前，我有点儿担心」とあります。' },
      { q: '老师说应该怎么做？', choices: ['大家一起用心打', '一个人打', '不参加比赛'], answer: 0, why: '只要大家一起用心打，就一定能打好.', why_ja: '「只要大家一起用心打，就一定能打好」とあります。' },
      { q: '最后谁是第一？', choices: ['对手', '他们学校', '没有人'], answer: 1, why: '最后，我们是第一.', why_ja: '「最后，我们是第一」とあります。' },
    ] },

  { id: 'read:hsk3:002', unit: 7, title: '努力学汉语', en: 'Working hard at Chinese', ja: '中国語を頑張る',
    text: '我是去年来中国的。来的时候，我一点儿汉语也不会说，觉得特别难。后来我想了一个办法：每天早上听半个小时汉语，晚上跟中国朋友讲话。朋友说，我说错了没关系，只要努力就会越来越好。现在我已经能讲很多话了，也认识了很多字。虽然还有很多不懂的地方，但是我相信，一年以后我的汉语一定会更好。',
    pinyin: 'wǒ shì qù nián lái zhōng guó de. lái de shí hou, wǒ yī diǎnr hàn yǔ yě bù huì shuō, jué de tè bié nán. hòu lái wǒ xiǎng le yī ge bàn fǎ: měi tiān zǎo shang tīng yī ge xiǎo shí hàn yǔ, wǎn shang gēn zhōng guó péng you jiǎng huà. péng you shuō, wǒ shuō cuò le méi guān xi, zhǐ yào nǔ lì jiù huì yuè lái yuè hǎo. xiàn zài wǒ yǐ jīng néng jiǎng hěn duō huà le, yě rèn shi le hěn duō zì. suī rán hái yǒu hěn duō bù dǒng de dì fang, dàn shì wǒ xiāng xìn, yī nián yǐ hòu wǒ de hàn yǔ yī dìng huì gèng hǎo.',
    enText: 'I came to China last year. When I had just arrived, I could not say a word of Chinese and found it especially hard. Later I thought of a method: every morning I listen to Chinese for an hour, and in the evening I talk with Chinese friends. My friends say it does not matter if I make mistakes; as long as I work hard it will get better and better. Now I can already say a lot and have learned many characters. Although there is still much I do not understand, I believe that a year from now my Chinese will surely be even better.',
    jaText: '私は去年中国に来ました。来たばかりのころは中国語が少しも話せず、とても難しいと感じました。その後、一つの方法を思いつきました。毎朝1時間中国語を聞き、夜は中国人の友達と話すことです。友達は、間違えても構わない、努力すればどんどん良くなると言ってくれます。今ではもうたくさん話せるようになり、漢字もたくさん覚えました。まだわからないところは多いですが、1年後には中国語がきっともっと上手になると信じています。',
    questions: [
      { q: '他是什么时候来中国的？', choices: ['去年', '今年', '三年以前'], answer: 0, why: '我是去年来中国的.', why_ja: '「我是去年来中国的」とあります。' },
      { q: '他每天早上做什么？', choices: ['写汉字', '听汉语', '跟朋友讲话'], answer: 1, why: '每天早上听半个小时汉语.', why_ja: '「每天早上听半个小时汉语」とあります。' },
      { q: '朋友觉得说错了怎么样？', choices: ['没关系', '很不好', '应该不说'], answer: 0, why: '朋友说，我说错了没关系.', why_ja: '「朋友说，我说错了没关系」とあります。' },
    ] },

  { id: 'read:hsk3:003', unit: 7, title: '去银行', en: 'Going to the bank', ja: '銀行へ行く',
    text: '今天上午我去银行换钱。银行离我家很近，走路只要十分钟。银行里人很多，半个小时以后才到我。工作人员是一位女孩子，她说话说得很清楚，也很客气。我说我听不太懂，她就讲得更慢了。换完钱以后，我去旁边的面包店买了两个面包，然后回家。回家的路上我还照了几张照片，因为今天的天气特别好。',
    pinyin: 'jīn tiān shàng wǔ wǒ qù yín háng huàn qián. yín háng lí wǒ jiā hěn jìn, zǒu lù zhǐ yào shí fēn zhōng. yín háng lǐ rén hěn duō, bàn ge xiǎo shí yǐ hòu cái dào wǒ. gōng zuò rén yuán shì yī wèi nǚ hái zi, tā shuō huà shuō de hěn qīng chu, yě hěn kè qi. wǒ shuō wǒ tīng bù tài dǒng, tā jiù jiǎng de gèng màn le. huàn wán qián yǐ hòu, wǒ qù páng biān de miàn bāo diàn mǎi le liǎng ge miàn bāo, rán hòu huí jiā. huí jiā de lù shang wǒ hái zhào le jǐ zhāng zhào piàn, yīn wèi jīn tiān de tiān qì tè bié hǎo.',
    enText: 'This morning I went to the bank to change money. The bank is close to my home, only ten minutes on foot. There were many people in the bank, and only after half an hour was it my turn. The clerk was a young woman; she spoke very clearly and politely. I said I could not quite understand, and she spoke even more slowly. After changing the money, I bought two pieces of bread at the bakery next door, then went home. On the way home I also took a few photos, because the weather was especially nice today.',
    jaText: '今日の午前、私は銀行にお金を両替しに行きました。銀行は家からとても近く、歩いて10分です。銀行は人が多く、30分たってやっと順番が来ました。係の人は女性で、話し方がはっきりしていて、とても丁寧でした。私があまり聞き取れないと言うと、もっとゆっくり話してくれました。両替が終わった後、隣のパン屋でパンを二つ買って家に帰りました。帰り道では写真も何枚か撮りました。今日は天気が特に良かったからです。',
    questions: [
      { q: '他去银行做什么？', choices: ['换钱', '买面包', '照相'], answer: 0, why: '我去银行换钱.', why_ja: '「我去银行换钱」とあります。' },
      { q: '过了多长时间才到他？', choices: ['十分钟', '半个小时', '一个小时'], answer: 1, why: '半个小时以后才到我.', why_ja: '「半个小时以后才到我」とあります。' },
      { q: '他买了几个面包？', choices: ['一个', '两个', '三个'], answer: 1, why: '买了两个面包.', why_ja: '「买了两个面包」とあります。' },
    ] },

  { id: 'read:hsk3:004', unit: 9, title: '刚结婚的朋友', en: 'A newly married friend', ja: '結婚したばかりの友達',
    text: '我的朋友小张上个月刚结婚。他的妻子是他的同学，两个人认识差不多十年了。结婚那天，我们都去参加了。小张穿着新衣服，又高兴又不好意思，说话的时候脸都红了。他的妻子很年轻，也很漂亮。朋友们一边吃饭，一边讲他们以前的故事，大家都笑了。晚上我回家的时候已经很晚了，但是我一点儿也不累，因为这一天过得特别开心。',
    pinyin: 'wǒ de péng you xiǎo zhāng shàng ge yuè gāng jié hūn. tā de qī zi shì tā de tóng xué, liǎng ge rén rèn shi chà bù duō shí nián le. jié hūn nà tiān, wǒ men dōu qù cān jiā le. xiǎo zhāng chuān zhe xīn yī fu, yòu gāo xìng yòu bù hǎo yì si, shuō huà de shí hou liǎn dōu hóng le. tā de qī zi hěn nián qīng, yě hěn piào liang. péng you men yī biān chī fàn, yī biān jiǎng tā men yǐ qián de gù shi, dà jiā dōu xiào le. wǎn shang wǒ huí jiā de shí hou yǐ jīng hěn wǎn le, dàn shì wǒ yī diǎnr yě bù lèi, yīn wèi zhè yī tiān guò de tè bié kāi xīn.',
    enText: 'My friend Xiao Zhang just got married last month. His wife is his classmate; the two have known each other for about ten years. On the wedding day we all went. Xiao Zhang wore new clothes and was both happy and shy; his face went red when he spoke. His wife is young and pretty. While eating, friends told stories about their past, and everyone laughed. When I got home in the evening it was already late, but I was not tired at all, because the day had been especially happy.',
    jaText: '友達の小張は先月結婚したばかりです。奥さんは同級生で、二人は知り合ってほぼ10年になります。結婚式の日、私たちはみんな参加しました。小張は新しい服を着て、うれしそうで照れてもいて、話すときは顔まで赤くなっていました。奥さんは若くてきれいです。友達は食事をしながら二人の昔の話をして、みんな笑いました。夜、家に帰ったときはもう遅かったのですが、少しも疲れていませんでした。この一日が特に楽しかったからです。',
    questions: [
      { q: '小张是什么时候结婚的？', choices: ['上个星期', '上个月', '去年'], answer: 1, why: '上个月刚结婚.', why_ja: '「上个月刚结婚」とあります。' },
      { q: '小张和妻子认识多长时间了？', choices: ['差不多一年', '差不多十年', '两个月'], answer: 1, why: '两个人认识差不多十年了.', why_ja: '「两个人认识差不多十年了」とあります。' },
      { q: '晚上回家的时候，他觉得怎么样？', choices: ['很累', '一点儿也不累', '有点儿难过'], answer: 1, why: '我一点儿也不累.', why_ja: '「我一点儿也不累」とあります。' },
    ] },

  { id: 'read:hsk3:005', unit: 11, title: '奇怪的礼物', en: 'A strange gift', ja: '不思議な贈り物',
    text: '上个星期是我的生日。妈妈送了我一个礼物，是一只蓝色的小鸟。我觉得很奇怪，因为我以前没有过鸟。妈妈说：你一个人住，总是害怕，有了小鸟就不害怕了。小鸟很可爱，每天早上都唱歌。我把它放在树旁边，它一边唱，一边看外面。现在我回家的时候，它一看见我就叫。虽然它只是一只小鸟，但是我觉得家里更有意思了，也更像一个家了。',
    pinyin: 'shàng ge xīng qī shì wǒ de shēng rì. mā ma sòng le wǒ yī ge lǐ wù, shì yī zhī lán sè de xiǎo niǎo. wǒ jué de hěn qí guài, yīn wèi wǒ yǐ qián méi yǒu guo niǎo. mā ma shuō: nǐ yī ge rén zhù, zǒng shì hài pà, yǒu le xiǎo niǎo jiù bù hài pà le. xiǎo niǎo hěn kě ài, měi tiān zǎo shang dōu chàng gē. wǒ bǎ tā fàng zài shù páng biān, tā yī biān chàng, yī biān kàn wài miàn. xiàn zài wǒ huí jiā de shí hou, tā yī kàn jiàn wǒ jiù jiào. suī rán tā zhǐ shì yī zhī xiǎo niǎo, dàn shì wǒ jué de jiā lǐ gèng yǒu yì si le, yě gèng xiàng yī ge jiā le.',
    enText: 'Last week was my birthday. Mum gave me a gift: a little blue bird. I thought it was strange, because I had never kept a bird. Mum said: you live alone and are always afraid; with a little bird you will not be afraid. The bird is cute and sings every morning. I put it next to the tree; it sings while looking outside. Now when I come home, it calls as soon as it sees me. Although it is only a little bird, I feel the house is more fun and more like a home.',
    jaText: '先週は私の誕生日でした。母は青い小鳥をプレゼントしてくれました。鳥を飼ったことがなかったので、不思議に思いました。母は「一人暮らしでいつも怖がっているけれど、小鳥がいれば怖くなくなるよ」と言いました。小鳥はかわいくて、毎朝歌います。木のそばに置くと、歌いながら外を見ています。今では帰宅すると、私を見るとすぐに鳴きます。ただの小鳥ですが、家がもっと楽しくなって、もっと家らしくなったと感じます。',
    questions: [
      { q: '妈妈送了他什么礼物？', choices: ['一只小鸟', '一只猫', '一本书'], answer: 0, why: '是一只蓝色的小鸟.', why_ja: '「是一只蓝色的小鸟」とあります。' },
      { q: '妈妈为什么送小鸟？', choices: ['因为他喜欢鸟', '因为他一个人住，总是害怕', '因为小鸟很便宜'], answer: 1, why: '你一个人住，总是害怕，有了小鸟就不害怕了.', why_ja: '「你一个人住，总是害怕」とあります。' },
      { q: '小鸟什么时候唱歌？', choices: ['每天早上', '晚上', '他回家的时候'], answer: 0, why: '每天早上都唱歌.', why_ja: '「每天早上都唱歌」とあります。' },
    ] },

  { id: 'read:hsk3:006', unit: 13, title: '搬到新家', en: 'Moving to a new home', ja: '新しい家に引っ越す',
    text: '上个月我们搬家了。新家在城市的南边，离公园很近，环境又安静又干净。以前的房子又小又旧，也特别热，现在的房子有三个房间，房子也很大，住着非常舒服。我最喜欢的是那个小花园，里面有绿绿的草和很多树，早上能听见鸟叫。周末的时候，我们一家人一边喝茶，一边看太阳慢慢下去。虽然搬家很累，但是我们都对新家很满意。',
    pinyin: 'shàng ge yuè wǒ men bān jiā le. xīn jiā zài chéng shì de nán biān, lí gōng yuán hěn jìn, huán jìng yòu ān jìng yòu gān jìng. yǐ qián de fáng zi yòu xiǎo yòu jiù, yě tè bié rè, xiàn zài de fáng zi yǒu sān ge fáng jiān, fáng zi yě hěn dà, zhù zhe fēi cháng shū fu. wǒ zuì xǐ huan de shì nà ge xiǎo huā yuán, lǐ miàn yǒu lǜ lǜ de cǎo hé hěn duō shù, zǎo shang néng tīng jiàn niǎo jiào. zhōu mò de shí hou, wǒ men yī jiā rén yī biān hē chá, yī biān kàn tài yáng màn màn xià qù. suī rán bān jiā hěn lèi, dàn shì wǒ men dōu duì xīn jiā hěn mǎn yì.',
    enText: 'Last month we moved house. The new home is in the south of the city, close to the park, and the surroundings are quiet and clean. The old house was small and old, and especially hot; the new house has three rooms and is big, and is very comfortable to live in. What I like most is the little garden, with green grass and many trees; in the morning you can hear birds. At weekends our family drinks tea while watching the sun slowly go down. Although moving was tiring, we are all very satisfied with the new home.',
    jaText: '先月、私たちは引っ越しました。新しい家は街の南側で、公園に近く、環境は静かで清潔です。前の家は狭くて古く、とても暑かったのですが、今の家は部屋が三つあり、家も広くて、とても快適に暮らせます。一番気に入っているのは小さな庭で、緑の草とたくさんの木があり、朝には鳥の声が聞こえます。週末には家族でお茶を飲みながら、太陽がゆっくり沈むのを眺めます。引っ越しは大変でしたが、みんな新しい家にとても満足しています。',
    questions: [
      { q: '新家在哪儿？', choices: ['城市的南边', '城市的北边', '公园里'], answer: 0, why: '新家在城市的南边.', why_ja: '「新家在城市的南边」とあります。' },
      { q: '以前的房子怎么样？', choices: ['又大又新', '又小又旧', '很安静'], answer: 1, why: '以前的房子又小又旧.', why_ja: '「以前的房子又小又旧」とあります。' },
      { q: '他最喜欢新家的什么？', choices: ['房子里的灯', '小花园', '房间'], answer: 1, why: '我最喜欢的是那个小花园.', why_ja: '「我最喜欢的是那个小花园」とあります。' },
    ] },

  { id: 'read:hsk3:007', unit: 15, title: '感冒了', en: 'Catching a cold', ja: '風邪をひいた',
    text: '昨天下午突然下起了大雨，我没带雨衣，衣服从上到下都是水。晚上回到家，我觉得头疼，鼻子也不舒服。今天早上我发现自己感冒了，所以没去上班。我给经理打了电话，他让我好好儿休息。中午叔叔来看我，带了一些水果和药。他说：你以前总是不锻炼，身体当然不好。以后每天早上跑半个小时步，就不容易感冒了。我觉得他说得对，决定从下个星期一开始锻炼。',
    pinyin: 'zuó tiān xià wǔ tū rán xià qǐ le dà yǔ, wǒ méi dài yǔ yī, yī fu cóng shàng dào xià dōu shì shuǐ. wǎn shang huí dào jiā, wǒ jué de tóu téng, bí zi yě bù shū fu. jīn tiān zǎo shang wǒ fā xiàn zì jǐ gǎn mào le, suǒ yǐ méi qù shàng bān. wǒ gěi jīng lǐ dǎ le diàn huà, tā ràng wǒ hǎo hāor xiū xi. zhōng wǔ shū shu lái kàn wǒ, dài le yī xiē shuǐ guǒ hé yào. tā shuō: nǐ yǐ qián zǒng shì bù duàn liàn, shēn tǐ dāng rán bù hǎo. yǐ hòu měi tiān zǎo shang pǎo bàn ge xiǎo shí bù, jiù bù róng yì gǎn mào le. wǒ jué de tā shuō de duì, jué dìng cóng xià ge xīng qī yī kāi shǐ duàn liàn.',
    enText: 'Yesterday afternoon it suddenly started raining heavily; I had no raincoat, and my clothes were soaked from top to bottom. In the evening at home my head hurt and my nose felt uncomfortable. This morning I found I had caught a cold, so I did not go to work. I phoned the manager and he told me to rest well. At noon my uncle came to see me, bringing fruit and medicine. He said: you never used to exercise, so of course your health is poor. From now on, run for half an hour every morning and you will not catch colds so easily. I think he is right, and decided to start exercising next Monday.',
    jaText: '昨日の午後、突然大雨が降り出しました。雨具を持っていなかったので、服が上から下までびしょ濡れになりました。夜家に帰ると頭が痛く、鼻の調子も悪くなりました。今朝、風邪をひいたことに気づいたので、仕事を休みました。部長に電話すると、ゆっくり休むように言われました。昼に叔父が見舞いに来て、果物と薬を持ってきてくれました。叔父は「前からずっと運動しないから、体が弱いのは当然だ。これから毎朝30分走れば、風邪をひきにくくなる」と言いました。その通りだと思い、来週の月曜日から運動を始めることにしました。',
    questions: [
      { q: '他为什么感冒了？', choices: ['因为下雨没带雨衣', '因为吃了坏东西', '因为天气太冷'], answer: 0, why: '突然下起了大雨，我没带雨衣，衣服从上到下都是水.', why_ja: '「突然下起了大雨，我没带雨衣」とあります。' },
      { q: '谁来看他了？', choices: ['经理', '叔叔', '妈妈'], answer: 1, why: '中午叔叔来看我.', why_ja: '「中午叔叔来看我」とあります。' },
      { q: '他决定做什么？', choices: ['换工作', '每天早上跑步', '去医院'], answer: 1, why: '决定从下个星期一开始锻炼.', why_ja: '「决定从下个星期一开始锻炼」とあります。' },
    ] },

  { id: 'read:hsk3:008', unit: 18, title: '我的爱好', en: 'My hobby', ja: '私の趣味',
    text: '我的爱好是爬山。我们城市附近有一个有名的山，不太高，爬到山上只要两个小时。每个周末，只要天气好，我就跟几个朋友一起去。我们带着水和面包，一边爬，一边说话。山上的空气特别新鲜，还能看见下面的城市。山上有一个小饭馆，我们常常在那儿吃一碗面条，然后再下山。爬山不但对身体好，而且让我认识了很多新朋友。我觉得，这是最好的锻炼方法。',
    pinyin: 'wǒ de ài hào shì pá shān. wǒ men chéng shì fù jìn yǒu yī ge yǒu míng de shān, bù tài gāo, pá dào shān shàng zhǐ yào liǎng ge xiǎo shí. měi ge zhōu mò, zhǐ yào tiān qì hǎo, wǒ jiù gēn jǐ ge péng you yī qǐ qù. wǒ men dài zhe shuǐ hé miàn bāo, yī biān pá, yī biān shuō huà. shān shàng de kōng qì tè bié xīn xiān, hái néng kàn jiàn xià miàn de chéng shì. shān shàng yǒu yī ge xiǎo fàn guǎn, wǒ men cháng cháng zài nàr chī yī wǎn miàn tiáo, rán hòu zài xià shān. pá shān bù dàn duì shēn tǐ hǎo, ér qiě ràng wǒ rèn shi le hěn duō xīn péng you. wǒ jué de, zhè shì zuì hǎo de duàn liàn fāng fǎ.',
    enText: 'My hobby is hiking. Near our city there is a famous mountain, not very high; it takes only two hours to reach the top. Every weekend, as long as the weather is good, I go with a few friends. We bring water and bread and talk while climbing. The air on the mountain is especially fresh, and you can see the city below. On the mountain there is a small restaurant where we often eat a bowl of noodles before going back down. Hiking is not only good for the body but has also let me meet many new friends. I think it is the best way to exercise.',
    jaText: '私の趣味は山登りです。私たちの街の近くに有名な山があり、あまり高くなく、頂上まで2時間しかかかりません。毎週末、天気が良ければ、友達数人と一緒に出かけます。水とパンを持って、登りながら話をします。山の上の空気は特に新鮮で、下の街が見えます。山の上には小さな食堂があり、よくそこで麺を一杯食べてから下山します。山登りは体に良いだけでなく、たくさんの新しい友達と知り合うきっかけにもなりました。これが一番良い運動の方法だと思います。',
    questions: [
      { q: '爬到山上要多长时间？', choices: ['一个小时', '两个小时', '半天'], answer: 1, why: '爬到山上只要两个小时.', why_ja: '「爬到山上只要两个小时」とあります。' },
      { q: '他们在山上吃什么？', choices: ['面包', '面条', '米饭'], answer: 1, why: '在那儿吃一碗面条.', why_ja: '「在那儿吃一碗面条」とあります。' },
      { q: '什么时候他们去爬山？', choices: ['每天早上', '天气好的周末', '下雨的时候'], answer: 1, why: '每个周末，只要天气好，我就跟几个朋友一起去.', why_ja: '「每个周末，只要天气好」とあります。' },
    ] },
];

export const LISTENING = [
  { id: 'listen:hsk3:001', unit: 2, type: 'dictation', title: 'Dictation: should and must', title_ja: '書き取り：すべきこと',
    items: [
      { text: '你应该早点儿睡觉。', pinyin: 'nǐ yīng gāi zǎo diǎnr shuì jiào.', en: 'You should go to bed earlier.', ja: 'もっと早く寝るべきです。' },
      { text: '我把书给老师了。', pinyin: 'wǒ bǎ shū gěi lǎo shī le.', en: 'I gave the book to the teacher.', ja: '本を先生に渡しました。' },
      { text: '他一直在北京工作。', pinyin: 'tā yī zhí zài běi jīng gōng zuò.', en: 'He has been working in Beijing all along.', ja: '彼はずっと北京で働いています。' },
      { text: '这件事非常重要。', pinyin: 'zhè jiàn shì fēi cháng zhòng yào.', en: 'This matter is very important.', ja: 'この件はとても重要です。' },
      { text: '如果明天下雨，我就不去了。', pinyin: 'rú guǒ míng tiān xià yǔ, wǒ jiù bù qù le.', en: 'If it rains tomorrow, I will not go.', ja: '明日雨が降ったら、行きません。' },
    ] },

  { id: 'listen:hsk3:002', unit: 6, type: 'comprehension', title: 'Listening: at last and always', title_ja: '聞き取り：やっと・いつも',
    items: [
      { text: '我找了一个小时，终于找到我的手机了。', pinyin: 'wǒ zhǎo le yī ge xiǎo shí, zhōng yú zhǎo dào wǒ de shǒu jī le.', en: 'I searched for an hour and finally found my phone.', ja: '1時間探して、やっと携帯を見つけました。',
        questions: [ { q: '他找了多长时间？', choices: ['十分钟', '一个小时', '一天'], answer: 1, why: '我找了一个小时.', why_ja: '「我找了一个小时」と言っています。' } ] },
      { text: '除了小张以外，大家都参加了比赛。', pinyin: 'chú le xiǎo zhāng yǐ wài, dà jiā dōu cān jiā le bǐ sài.', en: 'Except for Xiao Zhang, everyone took part in the match.', ja: '小張以外は、みんな試合に参加しました。',
        questions: [ { q: '谁没参加比赛？', choices: ['小张', '大家', '老师'], answer: 0, why: '除了小张以外 — Xiao Zhang is the exception.', why_ja: '「除了小张以外」なので小張だけが参加していません。' } ] },
      { text: '他总是不带钱，所以我经常帮他买票。', pinyin: 'tā zǒng shì bù dài qián, suǒ yǐ wǒ jīng cháng bāng tā mǎi piào.', en: 'He never brings money, so I often buy his ticket for him.', ja: '彼はいつもお金を持ってこないので、私がよく代わりに切符を買います。',
        questions: [ { q: '他总是怎么样？', choices: ['不带钱', '不买票', '不吃饭'], answer: 0, why: '他总是不带钱.', why_ja: '「他总是不带钱」と言っています。' } ] },
      { text: '医生检查以后说，我的身体没有问题，只是太累了。', pinyin: 'yī shēng jiǎn chá yǐ hòu shuō, wǒ de shēn tǐ méi yǒu wèn tí, zhǐ shì tài lèi le.', en: 'After the check-up, the doctor said my health is fine; I am just too tired.', ja: '検査の後、医者は体に問題はなく、ただ疲れすぎているだけだと言いました。',
        questions: [ { q: '医生说他怎么样？', choices: ['病得很重', '没有问题，只是太累了', '应该吃药'], answer: 1, why: '我的身体没有问题，只是太累了.', why_ja: '「我的身体没有问题，只是太累了」と言っています。' } ] },
    ] },

  { id: 'listen:hsk3:003', unit: 10, type: 'comprehension', title: 'Listening: weekend plans', title_ja: '聞き取り：週末の予定',
    items: [
      { text: '这个周末我打算跟朋友一起去看动物。', pinyin: 'zhè ge zhōu mò wǒ dǎ suàn gēn péng you yī qǐ qù kàn dòng wù.', en: 'This weekend I plan to go and see animals with a friend.', ja: '今週末は友達と動物を見に行くつもりです。',
        questions: [ { q: '他周末打算做什么？', choices: ['看动物', '看电影', '在家休息'], answer: 0, why: '去看动物.', why_ja: '「去看动物」と言っています。' } ] },
      { text: '我一边听音乐，一边写汉字，妈妈很生气。', pinyin: 'wǒ yī biān tīng yīn yuè, yī biān xiě hàn zì, mā ma hěn shēng qì.', en: 'I wrote characters while listening to music, and Mum got angry.', ja: '音楽を聞きながら漢字を書いていたら、母が怒りました。',
        questions: [ { q: '妈妈为什么生气？', choices: ['因为他没写汉字', '因为他一边听音乐一边写汉字', '因为他睡觉了'], answer: 1, why: '一边听音乐，一边写汉字，妈妈很生气.', why_ja: '音楽を聞きながら漢字を書いたので母が怒りました。' } ] },
      { text: '天气越来越冷了，你应该多穿一件衣服。', pinyin: 'tiān qì yuè lái yuè lěng le, nǐ yīng gāi duō chuān yī jiàn yī fu.', en: 'The weather is getting colder; you should put on another layer.', ja: 'だんだん寒くなってきたので、もう一枚着たほうがいいですよ。',
        questions: [ { q: '天气怎么样？', choices: ['越来越热', '越来越冷', '一直很好'], answer: 1, why: '天气越来越冷了.', why_ja: '「天气越来越冷了」と言っています。' } ] },
      { text: '这个节目有意思极了，我每个星期都看。', pinyin: 'zhè ge jié mù yǒu yì si jí le, wǒ měi ge xīng qī dōu kàn.', en: 'This programme is extremely interesting; I watch it every week.', ja: 'この番組はものすごく面白くて、毎週見ています。',
        questions: [ { q: '他多长时间看一次这个节目？', choices: ['每天', '每个星期', '每个月'], answer: 1, why: '我每个星期都看.', why_ja: '「我每个星期都看」と言っています。' } ] },
      { text: '我忘记带鞋了，只好穿着以前的去跑步。', pinyin: 'wǒ wàng jì dài xié le, zhǐ hǎo chuān zhe yǐ qián de qù pǎo bù.', en: 'I forgot to bring my shoes, so I had to run in the old ones.', ja: '靴を持ってくるのを忘れたので、古いのを履いて走るしかありませんでした。',
        questions: [ { q: '他忘记带什么了？', choices: ['鞋', '衣服', '水'], answer: 0, why: '我忘记带鞋了.', why_ja: '「我忘记带鞋了」と言っています。' } ] },
    ] },

  { id: 'listen:hsk3:004', unit: 12, type: 'dictation', title: 'Dictation: conditions and purposes', title_ja: '書き取り：条件と目的',
    items: [
      { text: '只要努力，就一定能提高。', pinyin: 'zhǐ yào nǔ lì, jiù yī dìng néng tí gāo.', en: 'As long as you work hard, you will surely improve.', ja: '努力すれば必ず上達します。' },
      { text: '只有他才知道这件事。', pinyin: 'zhǐ yǒu tā cái zhī dào zhè jiàn shì.', en: 'Only he knows about this.', ja: '彼だけがこのことを知っています。' },
      { text: '为了身体健康，我每天骑车上班。', pinyin: 'wèi le shēn tǐ jiàn kāng, wǒ měi tiān qí chē shàng bān.', en: 'For my health, I cycle to work every day.', ja: '健康のために、毎日自転車で通勤しています。' },
      { text: '太阳出来了，公园里的花都开了。', pinyin: 'tài yáng chū lái le, gōng yuán lǐ de huā dōu kāi le.', en: 'The sun has come out, and the flowers in the park have all bloomed.', ja: '太陽が出て、公園の花がみんな咲きました。' },
      { text: '经理对我们的成绩很满意。', pinyin: 'jīng lǐ duì wǒ men de chéng jì hěn mǎn yì.', en: 'The manager is very satisfied with our results.', ja: '部長は私たちの成果にとても満足しています。' },
    ] },

  { id: 'listen:hsk3:005', unit: 16, type: 'comprehension', title: 'Listening: seasons and home', title_ja: '聞き取り：季節と家',
    items: [
      { text: '春天到了，天气不冷了，我们去公园看花吧。', pinyin: 'chūn tiān dào le, tiān qì bù lěng le, wǒ men qù gōng yuán kàn huā ba.', en: 'Spring is here and it is no longer cold; let us go to the park to see the flowers.', ja: '春が来て寒くなくなったので、公園に花を見に行きましょう。',
        questions: [ { q: '现在是什么季节？', choices: ['春天', '夏天', '雨天'], answer: 0, why: '春天到了.', why_ja: '「春天到了」と言っています。' } ] },
      { text: '冰箱里什么都没有了，我们去超市买点儿东西吧。', pinyin: 'bīng xiāng lǐ shén me dōu méi yǒu le, wǒ men qù chāo shì mǎi diǎnr dōng xi ba.', en: 'There is nothing left in the fridge; let us go to the supermarket to buy something.', ja: '冷蔵庫に何もなくなったので、スーパーに買い物に行きましょう。',
        questions: [ { q: '他们要去哪儿？', choices: ['超市', '公园', '饭馆'], answer: 0, why: '我们去超市买点儿东西吧.', why_ja: '「我们去超市买点儿东西吧」と言っています。' } ] },
      { text: '阿姨其实不矮，她只是比我妈妈矮一点儿。', pinyin: 'ā yí qí shí bù ǎi, tā zhǐ shì bǐ wǒ mā ma ǎi yī diǎnr.', en: 'My aunt is actually not short; she is just a little shorter than my mother.', ja: '叔母は実は背が低くなく、母より少し低いだけです。',
        questions: [ { q: '谁更高？', choices: ['阿姨', '妈妈', '一样高'], answer: 1, why: '她比我妈妈矮一点儿 — Mum is taller.', why_ja: '「她比我妈妈矮一点儿」なので母のほうが高いです。' } ] },
      { text: '别着急，离考试还有一个星期呢。', pinyin: 'bié zháo jí, lí kǎo shì hái yǒu yī ge xīng qī ne.', en: 'Do not worry; there is still a week until the exam.', ja: '焦らないで。試験まであと1週間ありますよ。',
        questions: [ { q: '离考试还有多长时间？', choices: ['一天', '一个星期', '一个月'], answer: 1, why: '离考试还有一个星期.', why_ja: '「离考试还有一个星期」と言っています。' } ] },
    ] },

  { id: 'listen:hsk3:006', unit: 19, type: 'shadow', title: 'Shadowing: everyday HSK 3 lines', title_ja: 'シャドーイング：HSK 3 の日常表現',
    items: [
      { text: '请把黑板上的字写在本子上。', pinyin: 'qǐng bǎ hēi bǎn shàng de zì xiě zài běn zi shàng.', en: 'Please copy the characters on the blackboard into your notebook.', ja: '黒板の字をノートに書いてください。' },
      { text: '我的行李箱被拿错了。', pinyin: 'wǒ de xíng li xiāng bèi ná cuò le.', en: 'My suitcase was taken by mistake.', ja: '私のスーツケースが間違えて持って行かれました。' },
      { text: '洗手间在电梯旁边，一直向前走就看见了。', pinyin: 'xǐ shǒu jiān zài diàn tī páng biān, yī zhí xiàng qián zǒu jiù kàn jiàn le.', en: 'The toilet is next to the lift; go straight ahead and you will see it.', ja: 'トイレはエレベーターの横です。まっすぐ行けば見えます。' },
      { text: '虽然我学了一年汉语，但是说得还不太好。', pinyin: 'suī rán wǒ xué le yī nián hàn yǔ, dàn shì shuō de hái bù tài hǎo.', en: 'Although I have studied Chinese for a year, I still do not speak very well.', ja: '中国語を1年勉強しましたが、まだあまり上手に話せません。' },
      { text: '一共多少钱？我可以用手机吗？', pinyin: 'yī gòng duō shao qián? wǒ kě yǐ yòng shǒu jī ma?', en: 'How much altogether? Can I use my phone (to pay)?', ja: '全部でいくらですか。携帯で払ってもいいですか。' },
      { text: '只要天气好，我们周末就一起去爬山。', pinyin: 'zhǐ yào tiān qì hǎo, wǒ men zhōu mò jiù yī qǐ qù pá shān.', en: 'As long as the weather is good, we will go hiking together at the weekend.', ja: '天気が良ければ、週末に一緒に山登りに行きましょう。' },
    ] },
];
