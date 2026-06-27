const starCanvas = document.querySelector("#stars");
const ctx = starCanvas.getContext("2d");
const intro = document.querySelector("#intro");
const question = document.querySelector("#question");
const languageToggle = document.querySelector("#languageToggle");

let currentLang = "zh";
let qIndex = 0;
let stars = [];
let speed = 0.25;
let targetSpeed = 0.25;
let introPhase = 0;
let introDone = false;
let loveIndex = 0;
let activeNote = null;
let activeNoteMode = "light";
let noteSealDragging = false;
let noteSealStartX = 0;
let timelineGlideBound = false;
let timelineGlideFrame = 0;
let activePanelIndex = 0;

const panelIds = ["intro", "loveAstrolabe", "axis", "echo"];

const elementLabels = {
  need: { zh: "需要", en: "Need" },
  gift: { zh: "给予", en: "Gift" },
  appreciation: { zh: "欣赏", en: "Appreciation" }
};
let selectedEchoLove = "philia";
let selectedEchoElement = "appreciation";
let echoPage = 0;
let activePromptGroup = "need";
let selectedEchoPrompt = "";
let journeyNotes = {};
let activeEraIndex = 0;
let activeEraMaterialId = "";

const t = {
  zh: {
    langButton: "EN",
    introKicker: "一场关于爱的漫游",
    introTitle: "占有之前",
    introSubtitle: "爱、真理与现代主体",
    questions: ["是爱，还是需要？", "是真理，还是安全感？", "是追寻，还是占有？", "如果我不是中心，<br>我在哪里？"],
    loveModule: "四爱星盘",
    footnoteHint: "每一种爱都可被三种光照见。\n一道光落在一种爱上，便生成一则注脚。",
    need: "我需要",
    gift: "我给予",
    appreciation: "我欣赏",
    footnoteKicker: "爱之注脚",
    tabs: { shadow: "阴影", light: "其光", return: "回返" },
    currentCard: "当前卡牌",
    detailLabels: ["你的判断", "思想参照", "用户反思"],
    classical: "古典",
    modern: "现代",
    echoTitle: "星图回声",
    echoIntro: "若真理不能被拥有，人是否仍有尊严？\n若爱不是控制，人是否仍能感到安全？\n在离开星图之前，写下一点仍在发光，或正在投下阴影的东西。",
    echoPlaceholder: "在这里写下你的星图回声……",
    prompts: [
      "在我最近的爱里，更多的是需要被承托，还是愿意让对方自由？",
      "我是否曾把某个人、某段关系，放到它无法承受的位置？",
      "我是否曾用“我相信的真理”保护自己，而不是让它修正自己？",
      "我是否仍允许自己被真理修正？"
    ],
    placeBeside: "将这段手记暂时放在一枚印记旁：",
    notJudgment: "这不是判断，只是一处临时星位。",
    loveSelect: "四爱",
    elementSelect: "三光",
    save: "保存到此设备",
    copy: "复制手记",
    clear: "清空",
    saved: "已保存",
    copied: "已复制",
    cleared: "已清空",
    copyFallback: "请按 Ctrl+C 复制选中的手记",
    privacy: "你的手记默认只保存在此设备。清除浏览器数据后，它也会消失。"
  },
  en: {
    langButton: "中",
    introKicker: "An interactive reading on love, truth, subjectivity, and modernity",
    introTitle: "Before Possession",
    introSubtitle: "Love, Truth, and the Modern Subject",
    questions: ["Is it love,<br>or need?", "Is it truth,<br>or safety?", "Is it seeking,<br>or possession?", "If I am not the center,<br>where am I?"],
    loveModule: "Four Loves Astrolabe",
    footnoteHint: "Every love may be seen by three lights.\nWhen one light falls on one love, a marginal note appears.",
    need: "Need-love",
    gift: "Gift-love",
    appreciation: "Appreciative-love",
    footnoteKicker: "Love Footnote",
    tabs: { shadow: "Shadow", light: "Its Light", return: "Return" },
    currentCard: "Current Card",
    detailLabels: ["Your Judgment", "References", "Reflection"],
    classical: "Classical",
    modern: "Modern",
    echoTitle: "Star Map Echo",
    echoIntro: "If truth cannot be possessed, can a person still have dignity?\nIf love is not control, can a person still feel safe?\nBefore leaving the map, write down what still glows, or what still casts a shadow.",
    echoPlaceholder: "Write your star map echo here...",
    prompts: [
      "In my recent love, am I seeking to be held, or am I willing to let the other be free?",
      "Have I placed a person or a relationship in a position it could not bear?",
      "Have I used the truth I believe in to protect myself, rather than allowing it to correct me?",
      "Do I still allow myself to be corrected by truth?"
    ],
    placeBeside: "Place this note, for now, beside one seal:",
    notJudgment: "This is not a judgment, only a temporary position on the map.",
    loveSelect: "Love",
    elementSelect: "Light",
    save: "Save Locally",
    copy: "Copy Note",
    clear: "Clear",
    saved: "Saved",
    copied: "Copied",
    cleared: "Cleared",
    copyFallback: "Press Ctrl+C to copy the selected note",
    privacy: "Your note is saved only on this device by default. If browser data is cleared, it may disappear."
  }
};

const echoJourney = {
  zh: {
    title: "自爱星图",
    pages: ["入口", "书写", "需要", "自由", "回声"],
    prev: "上一页",
    next: "下一页",
    start: "翻开星图",
    generate: "生成自爱回声",
    copyDeclaration: "复制自爱宣言",
    entryKicker: "",
    entryTitle: "自爱手札",
    entryIntro: "在这里，成为让自己爱上的人。",
    placeholder: "写下一个人、一段关系、一种渴望，或一个你仍在反复想起的问题……",
    promptTitle: "可拾取的问题",
    promptHint: "你不必回答全部。只拾取此刻愿意靠近的那一问。",
    pickedPrefix: "此刻靠近的一问：",
    needKicker: "第三页",
    needTitle: "这段爱里，真正需要被看见的是什么？",
    freedomKicker: "第四页",
    freedomTitle: "爱不是控制，也不是消失自己",
    freedomIntro: "你可以慢慢看见边界、自由、责任和放手。它们不是拒绝爱，而是让爱不必以失去自己为代价。",
    feedbackKicker: "第五页",
    feedbackTitle: "自爱回声",
    feedbackSubtitle: "这不是判断，只是你此刻在星图中的位置。",
    emptyNote: "即使还没有写下很多，愿意停下来看看自己，也已经是一种回应。",
    save: "保存到此设备",
    copy: "复制手记",
    clear: "清空",
    saved: "已保存",
    copied: "已复制",
    cleared: "已清空",
    copyFallback: "请按 Ctrl+C 复制选中的手记",
    declarationCopied: "宣言已复制",
    privacy: "你的手记默认只保存在此设备。清除浏览器数据后，它也会消失。",
    feedbackLabels: ["我看见的需要", "我可以放下的负担", "我愿意尝试的回应", "一句自爱回声"],
    reflectionNeed: [
      "在这段爱里，我最希望被怎样对待？",
      "我真正想守护的，是关系本身，还是某种被理解的感觉？",
      "我有没有一个需要，一直被我说成“我不该需要”？",
      "如果我允许自己诚实一点，我现在最想要什么？"
    ],
    reflectionFreedom: [
      "这段关系里，有什么其实不该完全由我承担？",
      "如果我允许对方自由，也允许自己自由，我会怎么做？",
      "我可以保留哪一部分自己，而不必为了爱交出去？",
      "我能不能先暂停一次解释，把力气还给自己一点？"
    ],
    declaration: "自爱不是把自己放在世界中心，\n而是不再把自己从世界中删除。\n我可以爱他人，也可以保留自己。\n我可以承认需要，也可以选择边界。\n我可以不以荣耀证明自己，\n也不因批判否定自己。",
    promptGroups: [
      {
        key: "need",
        title: "看见需要",
        items: [
          "在这段爱里，我最希望被怎样对待？",
          "我真正想守护的，是关系本身，还是某种被理解的感觉？",
          "我有没有一个需要，一直被我说成“我不该需要”？",
          "我希望对方看见我的哪一部分？",
          "如果我允许自己诚实一点，我现在最想要什么？"
        ]
      },
      {
        key: "boundary",
        title: "看见边界",
        items: [
          "我有没有把某个人，放到自己无法承受的位置？",
          "我是在靠近对方，还是在努力证明自己值得留下？",
          "这段关系里，有什么其实不该完全由我承担？",
          "如果我允许对方自由，也允许自己自由，我会怎么做？",
          "我可以保留哪一部分自己，而不必为了爱交出去？"
        ]
      },
      {
        key: "mistake",
        title: "看见误认",
        items: [
          "我有没有把责任误认为爱？",
          "我有没有把擅长误认为热爱？",
          "我有没有把被需要误认为归属？",
          "我有没有把坚持误认为忠诚？",
          "我有没有把痛苦误认为深情？"
        ]
      },
      {
        key: "self",
        title: "看见自爱",
        items: [
          "如果不急着证明自己值得被爱，我会怎样回应自己？",
          "此刻我能给自己的一个温柔回应是什么？",
          "我可以怎样满足自己的需要，而不伤害自己？",
          "我是否愿意承认：我可以爱他人，也可以不离开自己？",
          "我想把哪一点仍在发光的自己，保存下来？"
        ]
      }
    ]
  },
  en: {
    title: "Self-Love Star Map",
    pages: ["Entry", "Writing", "Need", "Freedom", "Echo"],
    prev: "Previous",
    next: "Next",
    start: "Open the Map",
    generate: "Generate Self-Love Echo",
    copyDeclaration: "Copy Declaration",
    entryKicker: "",
    entryTitle: "Self-Love Notebook",
    entryIntro: "Here, become someone you can fall in love with.",
    placeholder: "Write about a person, a relationship, a longing, or a question that keeps returning...",
    promptTitle: "Questions to Pick Up",
    promptHint: "You do not need to answer everything. Pick only the question you can approach now.",
    pickedPrefix: "The question near you now:",
    needKicker: "Page Three",
    needTitle: "What is asking to be seen in this love?",
    freedomKicker: "Page Four",
    freedomTitle: "Love is neither control nor self-erasure",
    freedomIntro: "Boundaries, freedom, responsibility, and release are not refusals of love. They let love stop costing you your whole self.",
    feedbackKicker: "Page Five",
    feedbackTitle: "Self-Love Echo",
    feedbackSubtitle: "This is not a judgment, only your present position on the map.",
    emptyNote: "Even if little has been written, pausing to see yourself is already a response.",
    save: "Save Locally",
    copy: "Copy Note",
    clear: "Clear",
    saved: "Saved",
    copied: "Copied",
    cleared: "Cleared",
    copyFallback: "Press Ctrl+C to copy the selected note",
    declarationCopied: "Declaration copied",
    privacy: "Your note is saved only on this device by default. If browser data is cleared, it may disappear.",
    feedbackLabels: ["Need I can see", "Burden I may release", "Response I may try", "Self-love echo"],
    reflectionNeed: [
      "How do I most hope to be treated in this love?",
      "What part of me do I hope the other person can see?",
      "Is there a need I keep calling something I should not need?",
      "If I am a little more honest, what do I want right now?"
    ],
    reflectionFreedom: [
      "What in this relationship is not entirely mine to carry?",
      "What would I do if I allowed both of us to be free?",
      "What part of myself can I keep without handing it over for love?",
      "Can I pause one explanation and give a little strength back to myself?"
    ],
    declaration: "Self-love is not placing myself at the center of the world;\nit is refusing to delete myself from it.\nI can love others and still keep myself.\nI can admit need and choose boundaries.\nI do not have to prove myself by glory,\nor deny myself through criticism.",
    promptGroups: [
      { key: "need", title: "Seeing Need", items: ["How do I most hope to be treated here?", "What am I truly trying to protect?", "Is there a need I keep saying I should not need?", "What part of me do I hope can be seen?", "What do I honestly want right now?"] },
      { key: "boundary", title: "Seeing Boundary", items: ["Have I placed someone where I cannot bear them?", "Am I moving closer, or proving I deserve to stay?", "What is not entirely mine to carry?", "What would freedom for both of us look like?", "What part of myself may I keep?"] },
      { key: "mistake", title: "Seeing Misrecognition", items: ["Have I mistaken responsibility for love?", "Have I mistaken skill for desire?", "Have I mistaken being needed for belonging?", "Have I mistaken persistence for loyalty?", "Have I mistaken pain for depth?"] },
      { key: "self", title: "Seeing Self-Love", items: ["If I stop proving I am lovable, how would I respond to myself?", "What gentle response can I offer myself now?", "How can I meet a need without hurting myself?", "Can I love others without leaving myself?", "What still-glowing part of me do I want to keep?"] }
    ]
  }
};

const loveData = [
  {
    key: "storge",
    term: "storgē · στοργή",
    img: "assets/love-storge.png",
    zh: { name: "亲情之爱", desc: "熟悉、归属、庇护、家族、日常依赖。", need: "我需要熟悉、照顾、归属。", gift: "我照料你、保护你。", appreciation: "我珍惜你的存在与日常陪伴。" },
    en: { name: "Affection", desc: "Familiarity, belonging, shelter, family, and daily dependence.", need: "I need familiarity, care, and belonging.", gift: "I care for you and protect you.", appreciation: "I cherish your presence and daily companionship." }
  },
  {
    key: "philia",
    term: "philia · φιλία",
    img: "assets/love-philia.png",
    zh: { name: "朋友之爱", desc: "共同凝视、同道、师友、共同追求真理。", need: "我需要同伴、理解、同路人。", gift: "我支持你、与你并肩。", appreciation: "我欣赏你的思想、品格、眼光。" },
    en: { name: "Friendship", desc: "Shared vision, fellow travelers, teachers, friends, and the pursuit of truth.", need: "I need companions, understanding, and fellow travelers.", gift: "I support you and stand beside you.", appreciation: "I admire your thought, character, and way of seeing." }
  },
  {
    key: "eros",
    term: "erōs · ἔρως",
    img: "assets/love-eros.png",
    zh: { name: "恋人之爱", desc: "渴望、迷恋、献身、被具体的人点燃。", need: "我需要被爱、被选择、被点燃。", gift: "我愿意献身、靠近、付出。", appreciation: "我惊叹于“你这个人”。" },
    en: { name: "Eros", desc: "Desire, fascination, devotion, and being kindled by a particular person.", need: "I need to be loved, chosen, and awakened.", gift: "I am willing to devote myself, draw near, and give.", appreciation: "I am astonished by you as this irreplaceable person." }
  },
  {
    key: "agape",
    term: "agápē · ἀγάπη",
    img: "assets/love-agape.png",
    zh: { name: "仁爱", desc: "非占有、非互惠、爱不可爱者、让爱高于自我。", need: "我承认自身有限、需要被爱承托。", gift: "我无条件给予、爱不可爱者。", appreciation: "我看见对方作为生命本身的价值。" },
    en: { name: "Charity", desc: "Non-possession, non-reciprocity, loving the unlovely, and letting love stand above the self.", need: "I admit my finitude and need to be upheld by love.", gift: "I give without condition and love the unlovely.", appreciation: "I see the other as a life with value in itself." }
  }
];

const loveNotes = [
  makeNote("storge-need", "storge", "need", "栖身", "Shelter", "栖身之爱", "Affection as Shelter", "人最初不是靠独立活下来，而是靠有人在。", "A life first survives not by independence, but by someone being there.", "当栖身开始抓紧", "When Shelter Begins to Cling", "归属被恐惧占据时，亲近会误以为自己拥有对方。家仍然亮着灯，却不再允许人走向远处。", "When belonging is occupied by fear, closeness mistakes itself for possession. The home is still lit, but it no longer lets anyone walk toward the distance.", "栖身之爱", "Affection as Shelter", "我需要熟悉、照顾与归属。亲情之爱让世界先有一个可以停靠的地方。", "I need familiarity, care, and belonging. Affection gives the world a first place where the self can rest.", "当栖身学会放归", "When Shelter Learns to Release", "真正的亲情不是让人永远留下，而是使人知道：即使走向世界，也仍有可以回来的地方。", "True affection does not keep someone forever. It lets them know that even after entering the world, there is still a place to return."),
  makeNote("storge-gift", "storge", "gift", "庇护", "Care", "庇护之爱", "Affection as Care", "照料不是宣布权力，而是在脆弱之处替对方挡一会儿风。", "Care is not the declaration of power, but the act of standing briefly between another life and the wind.", "当庇护开始收紧", "When Care Begins to Tighten", "照料若被恐惧占据，便会把对方的自由误认为危险。它仍说自己是在保护，却已经开始替对方决定如何生活。", "When care is occupied by fear, another person's freedom begins to look like danger. It still calls itself protection, but it has begun to decide how the other should live.", "庇护之爱", "Affection as Care", "我以照料回应亲近。庇护不是宣布权力，而是在脆弱之处替对方挡一会儿风。", "I respond to nearness with care. Protection is not a claim of power, but a temporary shelter offered where another life is vulnerable.", "当庇护学会退后", "When Care Learns to Step Back", "真正的照料不把人留在自己的臂弯里。它守护一段路，然后承认对方终究要拥有自己的风雨。", "True care does not keep another life inside its arms. It shelters for a while, then allows the other to meet their own weather."),
  makeNote("storge-appreciation", "storge", "appreciation", "日常", "Daily", "日常之爱", "Affection as Cherishing", "平常之物并不低于炽热，它让爱有了可以居住的形状。", "Ordinary things are not beneath intensity; they give love a habitable form.", "当日常不再看见", "When the Daily Stops Seeing", "日常若被视为理所当然，珍惜会滑向占用。对方像家具一样被默认，却不再被看见。", "When the daily is taken for granted, cherishing slides into use. The other is assumed like furniture, but no longer seen.", "日常之爱", "Affection as Cherishing", "我珍惜你在生活里的存在。重复、琐碎、熟悉，也能让爱获得可居住的形状。", "I cherish your presence in ordinary life. Repetition, smallness, and familiarity can give love a habitable form.", "当日常重新发亮", "When the Daily Glows Again", "把一句问候、一顿饭、一次等待，从习惯里赎回为感激。", "A greeting, a meal, a waiting hour can be redeemed from habit back into gratitude."),
  makeNote("philia-need", "philia", "need", "同路", "Path", "同路之爱", "Friendship as Companionship", "友情让孤独的追问获得回声。", "Friendship gives an echo to solitary seeking.", "当同路变成结盟", "When Companionship Becomes Alliance", "同路若变成阵营，真理会被缩小成彼此正确的证明。", "When companionship becomes a camp, truth shrinks into proof that we are right together.", "同路之爱", "Friendship as Companionship", "我需要有人与我共同看见。友情使孤独的追问获得回声。", "I need someone to see with me. Friendship gives an echo to the solitary act of seeking.", "当同路重新远望", "When Companionship Looks Outward Again", "真正的朋友不是替我封住怀疑，而是陪我继续被真理修正。", "A true friend does not seal off doubt for me, but remains beside me as truth corrects us."),
  makeNote("philia-gift", "philia", "gift", "并肩", "Fidelity", "并肩之爱", "Friendship as Fidelity", "并肩不是俯身施舍，而是在同一方向上分担重量。", "Fidelity is shared weight in a shared direction.", "当并肩变成站队", "When Fidelity Becomes Taking Sides", "忠诚若被恐惧绑架，支持会变成无条件站队。朋友被要求先表态，再思考。", "When loyalty is captured by fear, support becomes automatic allegiance. A friend is asked to declare before thinking.", "并肩之爱", "Friendship as Fidelity", "我愿与你共同承担道路。并肩不是俯身施舍，而是在同一方向上分担重量。", "I am willing to bear the road with you. Fidelity is not condescension, but shared weight in a shared direction.", "当并肩仍向着光", "When Fidelity Still Faces Light", "并肩不是一起拒绝光，而是即使光刺眼，也不丢下彼此。", "To stand beside one another is not to refuse the light together; it is not to abandon each other even when the light hurts."),
  makeNote("philia-appreciation", "philia", "appreciation", "凝视", "Vision", "凝视之爱", "Friendship as Shared Vision", "我因你的眼光而看见更大的世界。", "Your sight enlarges my world.", "当凝视变成崇拜", "When Shared Vision Becomes Worship", "欣赏若变成崇拜，朋友会被塑成导师、偶像或镜子。真实的人被理想遮住。", "When admiration becomes worship, a friend is made into a teacher, idol, or mirror. The real person is covered by an ideal.", "凝视之爱", "Friendship as Shared Vision", "我欣赏你所看见的真理。友情中最美的部分，是我因你的眼光而看见更大的世界。", "I admire the truth you see. The beauty of friendship is that your sight enlarges my world.", "当凝视容许有限", "When Shared Vision Allows Finitude", "珍惜他的眼光，也允许他的有限，使共同追寻胜过相互神化。", "Cherish another's sight, while allowing their limits, so shared seeking can outlive mutual idol-making."),
  makeNote("eros-need", "eros", "need", "被选", "Chosen", "被选之爱", "Eros as Being Chosen", "爱欲使人从抽象的人群中被唤出。", "Eros calls the self out of the abstract crowd.", "当被选要求证明", "When Being Chosen Demands Proof", "被选择若成为唯一的安全来源，爱会逼迫对方不断证明。确认越多，恐惧越深。", "When being chosen becomes the only source of safety, love forces the other to prove it again and again. The more confirmation, the deeper the fear.", "被选之爱", "Eros as Being Chosen", "我渴望被一个具体的人确认。爱欲使人从抽象的人群中被唤出。", "I long to be confirmed by one particular person. Eros calls the self out of the abstract crowd.", "当被选不再占有", "When Being Chosen No Longer Possesses", "真正的亲密不是反复索取保证，而是在被看见之后仍给彼此呼吸。", "True intimacy does not keep asking for guarantees. After being seen, it still gives both people room to breathe."),
  makeNote("eros-gift", "eros", "gift", "献身", "Devotion", "献身之爱", "Eros as Devotion", "爱欲中的给予带着火焰，使人奔向另一个具体生命。", "Giving within eros carries fire and moves toward another particular life.", "当献身烧尽边界", "When Devotion Burns Its Borders", "献身若失去边界，自我消失会被误认为纯粹。牺牲开始要求回报，付出也变成债务。", "When devotion loses its boundary, self-erasure is mistaken for purity. Sacrifice begins to demand repayment, and giving becomes debt.", "献身之爱", "Eros as Devotion", "我愿为爱交出自己。爱欲中的给予带着火焰，使人奔向另一个具体生命。", "I am willing to give myself for love. Giving within eros carries fire and moves toward another particular life.", "当献身仍保有自由", "When Devotion Keeps Freedom", "真正的给予不是把自己烧尽来换取永恒，而是在爱中仍保持可回应的生命。", "True giving does not burn the self away in exchange for eternity; it remains alive and able to respond."),
  makeNote("eros-appreciation", "eros", "appreciation", "惊异", "Wonder", "惊异之爱", "Eros as Wonder", "爱欲的欣赏被“你这个人”的独一性击中。", "Eros is struck by the uniqueness of this person.", "当惊异制造神坛", "When Wonder Builds an Altar", "惊异若变成理想化，对方会被推上祭坛。真实的人被遮蔽，留下我制造的救赎图像。", "When wonder becomes idealization, the beloved is lifted onto an altar. The real person disappears behind an image of salvation I created.", "惊异之爱", "Eros as Wonder", "我惊叹于你的不可替代。爱欲的欣赏被“你这个人”的独一性击中。", "I am astonished by your irreplaceability. Eros is struck by the uniqueness of this person.", "当惊异落回真实", "When Wonder Returns to the Real", "惊异若要长久，必须允许对方不只作为梦，也作为有限的人存在。", "For wonder to last, the beloved must be allowed to exist not only as a dream, but as a finite person."),
  makeNote("agape-need", "agape", "need", "承托", "Grace", "承托之爱", "Charity as Grace Received", "人在最深处不是自我奠基，而是需要被更大的爱承托。", "At the deepest level, the self is upheld by a greater love.", "当承托成为逃避", "When Grace Becomes Escape", "承托若被误读为逃避，人会把责任交给绝对对象，借神圣之名停止成长。", "When grace is misread as escape, responsibility is handed to an absolute object, and growth stops under a sacred name.", "承托之爱", "Charity as Grace Received", "我承认自己有限，需要恩典。人在最深处不是自我奠基，而是需要被更大的爱承托。", "I admit that I am finite and need grace. At the deepest level, the self does not found itself; it is upheld by a greater love.", "当承托唤回回应", "When Grace Calls Forth Response", "被承托不是取消人的行动，而是让行动不再来自自我神化。", "To be upheld does not cancel action. It frees action from self-deification."),
  makeNote("agape-gift", "agape", "gift", "恩予", "Gift", "恩予之爱", "Charity as Grace Given", "爱不可爱者，是承认爱本身高于我。", "To love the unlovely is to admit that love itself is higher than me.", "当恩予爱上高尚", "When Grace Loves Its Own Nobility", "无条件若被自我陶醉污染，给予者会爱上自己的高尚。仁爱变成居高临下的审判。", "When unconditional giving is stained by self-admiration, the giver falls in love with their own nobility. Charity becomes judgment from above.", "恩予之爱", "Charity as Grace Given", "我愿爱不可爱者。这种给予不以对方值得为条件，也不以互惠作为爱的边界。", "I am willing to love the unlovely. This giving does not depend on worthiness or reciprocity.", "当恩予离开表演", "When Grace Leaves Performance", "爱不可爱者，不是把自己放得更高，而是承认爱本身高于我。", "To love the unlovely is not to place myself higher; it is to admit that love itself is higher than me."),
  makeNote("agape-appreciation", "agape", "appreciation", "敬畏", "Reverence", "敬畏之爱", "Charity as Reverence", "敬畏使爱不只是情绪，而成为重新排序我的力量。", "Reverence makes love a power that reorders me.", "当敬畏借名压迫", "When Reverence Borrows a Name to Oppress", "敬畏若被制度化为压迫，人会借最高之名要求他人服从。超越物被用来巩固人的权力。", "When reverence becomes institutional oppression, the highest name is borrowed to demand obedience. The transcendent is used to secure human power.", "敬畏之爱", "Charity as Reverence", "我承认爱高于自我。敬畏使爱不再只是情绪或选择，而成为重新排序我的力量。", "I acknowledge that love is higher than the self. Reverence makes love more than feeling or choice; it becomes a power that reorders me.", "当敬畏释放自我", "When Reverence Releases the Self", "真正的敬畏不把人压低成工具，而使人从自我中心处被释放。", "True reverence does not reduce persons to tools. It releases them from the center of the self.")
];

const loveNotesByKey = Object.fromEntries(loveNotes.map((note) => [`${note.love}-${note.element}`, note]));

function makeNote(id, love, element, sealZh, sealEn, nameZh, nameEn, mottoZh, mottoEn, shadowTitleZh, shadowTitleEn, shadowBodyZh, shadowBodyEn, lightTitleZh, lightTitleEn, lightBodyZh, lightBodyEn, returnTitleZh, returnTitleEn, returnBodyZh, returnBodyEn) {
  return {
    id,
    love,
    element,
    seal: { zh: sealZh, en: sealEn },
    name: { zh: nameZh, en: nameEn },
    motto: { zh: mottoZh, en: mottoEn },
    tabs: {
      shadow: { zh: "阴影", en: "Shadow" },
      light: { zh: "其光", en: "Its Light" },
      return: { zh: "回返", en: "Return" }
    },
    texts: {
      shadow: { title: { zh: shadowTitleZh, en: shadowTitleEn }, body: { zh: shadowBodyZh, en: shadowBodyEn } },
      light: { title: { zh: lightTitleZh, en: lightTitleEn }, body: { zh: lightBodyZh, en: lightBodyEn } },
      return: { title: { zh: returnTitleZh, en: returnTitleEn }, body: { zh: returnBodyZh, en: returnBodyEn } }
    }
  };
}

const timeline = [
  {
    era: "Myth", lane: "west", material: "parchment", img: "assets/greek-myth.png",
    zh: { title: "希腊神话", theme: "神话首先把人放在限度之中：人可以追火、飞翔、提问，但不能取消神圣与命运。", judgment: "爱与真理不是从“我拥有答案”开始，而是从人面对不可控之物的震动开始。", refs: "普罗米修斯、伊卡洛斯、俄狄浦斯等神话都在提醒：人有勇气，也有边界。", reflection: "当我越过限度时，我是在追寻，还是在证明自己可以不受任何东西约束？" },
    en: { title: "Greek Myth", theme: "Myth first places the human being within limits: one may steal fire, fly, and question, but not abolish the sacred or fate.", judgment: "Love and truth begin not with possession of answers, but with the tremor of facing what cannot be controlled.", refs: "Prometheus, Icarus, and Oedipus remind us that courage still has borders.", reflection: "When I cross a limit, am I seeking, or proving that nothing can bind me?" }
  },
  {
    era: "Greek", lane: "west", material: "parchment", img: "assets/greek-sculpture.png",
    zh: { title: "古希腊", theme: "柏拉图与亚里士多德把爱、真理、德性放进一种可追问的秩序。", judgment: "这里容纳柏拉图的上升之爱、亚里士多德的德性目的论，以及古典哲学对真善美的朝向。", refs: "柏拉图《会饮》、洞穴隐喻；亚里士多德的德性与目的。", reflection: "真理是我制造的，还是我必须训练自己去接近的？" },
    en: { title: "Ancient Greece", theme: "Plato and Aristotle place love, truth, and virtue within an order that can be questioned.", judgment: "This card gathers Plato's ascending love, Aristotle's teleology of virtue, and the classical orientation toward the true, good, and beautiful.", refs: "Plato's Symposium and cave image; Aristotle on virtue and telos.", reflection: "Is truth made by me, or must I train myself to approach it?" }
  },
  {
    era: "China", lane: "east", material: "parchment", img: "assets/confucian-ink.png",
    zh: { title: "中国古典", theme: "儒家、道家与诗歌共同构成另一种秩序感：人在关系、天地与山水之间安顿自己。", judgment: "儒家强调爱在亲亲、仁、礼中被训练；道家提醒人不必以占有万物为自由。", refs: "儒家的仁与礼，道家的道法自然，山水诗与田园诗中的天地感。", reflection: "如果我不把世界握在手里，我是否反而更能在世界中安顿？" },
    en: { title: "Classical China", theme: "Confucianism, Daoism, and poetry form another sense of order: the self is placed among relations, heaven-earth, and landscape.", judgment: "Confucianism trains love through kinship, ren, and ritual; Daoism warns that freedom need not mean possessing all things.", refs: "Ren and li, Daoist naturalness, and the cosmic feeling of landscape poetry.", reflection: "If I do not hold the world in my hand, might I dwell in it more fully?" }
  },
  {
    era: "Medieval", lane: "west", material: "paper", img: "assets/medieval-window.png",
    zh: { title: "中世纪", theme: "宗教传统把爱理解为回应：人站在光中，但并不制造光。", judgment: "这里承接路易斯：最高的爱不是吞并，而是给予；人先被爱，然后学习爱。", refs: "奥古斯丁的爱的秩序，中世纪神学，路易斯关于圣爱的讨论。", reflection: "如果光不是我制造的，我是否仍愿意站到光里？" },
    en: { title: "Medieval Order", theme: "Religious tradition understands love as response: the person stands in light, but does not manufacture it.", judgment: "This connects to Lewis: the highest love does not consume, but gives; one is loved first, then learns to love.", refs: "Augustine's order of love, medieval theology, and Lewis on charity.", reflection: "If the light is not made by me, am I still willing to stand within it?" }
  },
  {
    era: "Early Modern", lane: "west", material: "paper", img: "assets/renaissance-study.png",
    zh: { title: "文艺复兴与近代主体", theme: "人被更强烈地置于画面中心，主体开始寻找自身的确定根基。", judgment: "文艺复兴与笛卡尔在这里合并：人的尊严上升，理性主体也承担自我奠基的压力。", refs: "人文主义、笛卡尔的怀疑方法与“我思”。", reflection: "当我把确定性建在自己身上，我获得了自由，还是背上了更大的焦虑？" },
    en: { title: "Renaissance and Subject", theme: "The human being moves more forcefully into the center of the frame, and the subject searches for its own ground.", judgment: "Renaissance humanism and Descartes meet here: dignity rises, while the rational subject bears the burden of self-foundation.", refs: "Humanism, Cartesian doubt, and the cogito.", reflection: "When I ground certainty in myself, do I gain freedom, or inherit greater anxiety?" }
  },
  {
    era: "Modernity", lane: "west", material: "paper", img: "assets/renaissance-study.png",
    zh: { title: "启蒙与现代性", theme: "理性、自由、进步成为现代人的尊严来源，也带来改造世界的信心。", judgment: "理性照亮世界，也让人更渴望解释、建构、控制。尼采可作为旧尺度退场后的反转。", refs: "启蒙理性、自由、进步、科学；尼采的“上帝死了”。", reflection: "理性照亮世界时，我是否也越来越不能忍受不可测之物？" },
    en: { title: "Enlightenment and Modernity", theme: "Reason, freedom, and progress become sources of modern dignity, along with confidence in remaking the world.", judgment: "Reason illuminates the world, but also intensifies the desire to explain, construct, and control. Nietzsche marks the reversal after old measures retreat.", refs: "Enlightenment reason, freedom, progress, science; Nietzsche's 'God is dead.'", reflection: "As reason lights the world, do I become less able to bear what cannot be measured?" }
  },
  {
    era: "Revolution", lane: "center", material: "copper", img: "assets/revolution-copper.png",
    zh: { title: "革命", theme: "现代人不只是寻找秩序，也开始尝试重造秩序。", judgment: "革命牌呈现旧秩序断裂、新主体登场、真理被动员为行动纲领。", refs: "宣言、人民、阶级、民族、进步、牺牲、未来社会。", reflection: "当我说要重造世界时，我是否也在制造一个不能被质疑的新神圣？" },
    en: { title: "Revolution", theme: "The modern person not only searches for order, but attempts to remake it.", judgment: "This card shows the break of old order, the arrival of new subjects, and truth mobilized as a program of action.", refs: "Declarations, people, class, nation, progress, sacrifice, future society.", reflection: "When I say I will remake the world, am I also making a new sacred that cannot be questioned?" }
  },
  {
    era: "Contemporary", lane: "center", material: "silver", img: "assets/technology-silver.png",
    zh: { title: "现代", theme: "现代生活把世界转化为可见、可测、可预测的对象。", judgment: "“现代”比“技术”更宽：它包含消费、数据、效率、管理、心理标签和自我优化。", refs: "技术理性、数据化关系、消费社会、算法推荐、情绪与身份标签。", reflection: "当世界越来越清晰，它是否也越来越失去不可占有的深度？" },
    en: { title: "Contemporary Life", theme: "Modern life turns the world into something visible, measurable, and predictable.", judgment: "Contemporary life is broader than technology: it includes consumption, data, efficiency, management, labels, and self-optimization.", refs: "Technological reason, datafied relations, consumer society, algorithms, emotional and identity labels.", reflection: "As the world becomes clearer, does it lose the depth that cannot be possessed?" }
  },
  {
    era: "Isms", lane: "center", material: "glass ism-group", img: "assets/isms-deck.png",
    zh: { title: "主义之牌", theme: "主义不只是理论名称，也可能是现代主体抵御不确定性的装置。点击牌面，让它们铺开。", judgment: "主义之牌位于现代中线末端：它把爱真理转成有真理，把追寻转成身份与阵营。", refs: "自由主义、革命、技术主义、浪漫主义、民族主义、消费主义。", reflection: "我选择一种真理，是因为它照亮世界，还是因为它让我不再害怕？" },
    en: { title: "Cards of Isms", theme: "Isms are not only theories; they can be devices by which the modern subject resists uncertainty. Click to spread them.", judgment: "At the end of the modern axis, loving truth becomes having truth, and seeking becomes identity and camp.", refs: "Liberalism, revolution, technicism, romanticism, nationalism, consumerism.", reflection: "Do I choose a truth because it lights the world, or because it makes me less afraid?" }
  }
];

const spreadCards = {
  zh: [
    ["自由主义", "尊严来自选择，也可能被选择困住。", "choice"],
    ["革命", "重造秩序，也可能制造新的绝对。", "fire"],
    ["技术主义", "世界越清晰，也可能越失温。", "machine"],
    ["浪漫主义", "内心成为火焰，也可能成为神坛。", "heart"],
    ["民族主义", "归属给予位置，也可能吞没个体。", "flag"],
    ["消费主义", "欲望被满足，也被持续制造。", "coin"]
  ],
  en: [
    ["Liberalism", "Dignity comes from choice, and may also be trapped by choice.", "choice"],
    ["Revolution", "Remaking order may create a new absolute.", "fire"],
    ["Technicism", "The clearer the world becomes, the colder it may feel.", "machine"],
    ["Romanticism", "The inner life becomes flame, and perhaps an altar.", "heart"],
    ["Nationalism", "Belonging gives position, and may swallow the person.", "flag"],
    ["Consumerism", "Desire is satisfied, and continually manufactured.", "coin"]
  ]
};

const ismCards = [
  { id: "humanism", icon: "choice", name: { zh: "人文主义", en: "Humanism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "人的尊严被重新抬高，也可能被误认为万物尺度。", en: "Human dignity rises, and may be mistaken for the measure of all things." }, material: { zh: "人文主义帮助现代人重新看见身体、创造力与个体价值；但若它切断一切高于人的尺度，爱真理便容易转成以人为中心地拥有真理。", en: "Humanism restores attention to embodiment, creativity, and personal worth; severed from anything higher than the human, loving truth can become possessing truth by human measure." } },
  { id: "rationalism", icon: "machine", name: { zh: "理性主义", en: "Rationalism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "理性照亮世界，也可能把不可计算者排除在外。", en: "Reason illuminates the world, yet may exclude what cannot be calculated." }, material: { zh: "理性主义把真理交给清晰、证明与秩序；它保护人免于盲信，也可能让人以为只有能被理性控制的才配称为真实。", en: "Rationalism entrusts truth to clarity, proof, and order. It protects against credulity, but can imply that only what reason controls is real." } },
  { id: "romanticism", icon: "heart", name: { zh: "浪漫主义", en: "Romanticism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "内心成为火焰，也可能成为神坛。", en: "The inner life becomes flame, and perhaps an altar." }, material: { zh: "浪漫主义让情感、自然与独特自我获得尊严；但若内心被绝对化，爱会从通向他者的道路变成自我神化的仪式。", en: "Romanticism dignifies feeling, nature, and the singular self. When interiority becomes absolute, love can become self-deification rather than a path to the other." } },
  { id: "existentialism", icon: "choice", name: { zh: "存在主义", en: "Existentialism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "人在无预设意义中选择自己，也承受选择的重量。", en: "The person chooses the self without preset meaning, and bears the weight of choice." }, material: { zh: "存在主义使人直面自由、焦虑与责任；它提醒人不可躲在现成真理背后，却也可能让真理退成个人姿态。", en: "Existentialism confronts freedom, anxiety, and responsibility. It refuses ready-made truth, yet truth may shrink into personal posture." } },
  { id: "scientism", icon: "machine", name: { zh: "科学主义", en: "Scientism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "科学方法被扩大为唯一合法的真理语言。", en: "Scientific method expands into the only legitimate language of truth." }, material: { zh: "科学主义把可验证性推到最高位置，帮助人摆脱迷信；但当它把爱、意义与价值都化约为对象，真理便更像可占有的模型。", en: "Scientism elevates verification and frees people from superstition; when love, meaning, and value are reduced to objects, truth becomes a possessable model." } },
  { id: "nationalism", icon: "flag", name: { zh: "民族主义", en: "Nationalism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "归属给予位置，也可能吞没个体。", en: "Belonging gives position, and may swallow the person." }, material: { zh: "民族主义把共同记忆、土地与牺牲组织成爱的对象；当共同体被绝对化，爱便可能要求个体交出判断。", en: "Nationalism organizes memory, land, and sacrifice as objects of love. Absolutized community can demand that persons surrender judgment." } },
  { id: "consumerism", icon: "coin", name: { zh: "消费主义", en: "Consumerism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "欲望被满足，也被持续制造。", en: "Desire is satisfied, and continually manufactured." }, material: { zh: "消费主义把爱与自我表达放入选择、购买和展示之中；它给人掌控感，也把需要转化为永不停止的缺口。", en: "Consumerism places love and self-expression inside choosing, buying, and displaying. It grants control while turning need into an endless gap." } },
  { id: "psychologism", icon: "heart", name: { zh: "心理主义", en: "Psychologism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "心灵语言带来理解，也可能把一切关系诊断化。", en: "Psychological language brings understanding, and may diagnose every relation." }, material: { zh: "心理主义让创伤、依恋与边界被看见；但若心理解释成为唯一真理，爱会被标签接管，关系不再容纳神秘与责任。", en: "Psychologism makes trauma, attachment, and boundaries visible. If psychological explanation becomes the only truth, labels govern love and relation loses mystery and responsibility." } },
  { id: "identity-politics", icon: "flag", name: { zh: "身份政治", en: "Identity Politics" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "被看见的要求伸张尊严，也可能固化阵营。", en: "The demand to be seen restores dignity, and may harden camps." }, material: { zh: "身份政治回应被压抑的经验，使不可见者发声；但当身份成为不可触碰的真理，占有真理便会披上受伤的外衣。", en: "Identity politics answers suppressed experience and gives voice to the unseen. When identity becomes untouchable truth, possession of truth can wear the garment of injury." } },
  { id: "technicism", icon: "machine", name: { zh: "技术主义", en: "Technicism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "世界越清晰，也可能越失温。", en: "The clearer the world becomes, the colder it may feel." }, material: { zh: "技术主义相信问题都能被优化、预测和管理；它提升能力，也让爱与真理越来越像可调参的系统。", en: "Technicism believes problems can be optimized, predicted, and managed. It increases power while making love and truth resemble tunable systems." } },
  { id: "nihilism", icon: "fire", name: { zh: "虚无主义", en: "Nihilism" }, type: { zh: "主义", en: "Ism" }, summary: { zh: "旧价值退场后，人可能以空无保护自己。", en: "After old values retreat, one may use emptiness as protection." }, material: { zh: "虚无主义暴露价值的崩塌，也让人不再轻易崇拜；但若空无本身成为姿态，爱真理会退成拒绝被任何真理触碰。", en: "Nihilism exposes collapsed values and resists false worship. If emptiness becomes a posture, loving truth retreats into refusing to be touched by truth." } }
];

const timelineEras = [
  { id: "greek-myth", lane: "west", material: "parchment", img: "assets/greek-myth.png", title: { zh: "希腊神话", en: "Greek Myth" }, cardSubtitle: { zh: "神、人、欲望与命运", en: "Gods, desire, and fate" }, thesis: { zh: "在神话中，爱常常不是私人情绪，而是神、人、命运与自然力量交缠时产生的牵引。", en: "In myth, love is rarely a private emotion; it is a force entangling gods, humans, fate, and nature." }, figures: [
    { id: "eros-god", name: { zh: "厄洛斯", en: "Eros" }, type: { zh: "神话概念", en: "Mythic concept" }, summary: { zh: "爱欲作为神性力量，不属于人的控制，而像一种突然降临的牵引。", en: "Eros appears as a divine force, less controlled by the human subject than descending upon it." }, material: { zh: "厄洛斯提醒我们：爱最初不是现代主体的选择或项目，而是一种使人被带离自我中心的力量。它也预示了爱欲的危险：当人试图占有这股力量，爱便可能转向支配、迷狂或毁灭。", en: "Eros reminds us that love was not first imagined as a modern subject's choice or project, but as a force that pulls the self beyond itself. Its danger also appears here: when a person tries to possess this force, love can turn into domination, frenzy, or ruin." } },
    { id: "aphrodite", name: { zh: "阿佛洛狄忒", en: "Aphrodite" }, type: { zh: "神话", en: "Myth" }, summary: { zh: "美与欲望的神性形象，使爱带有恩赐与危险。", en: "A divine figure of beauty and desire, making love both gift and danger." }, material: { zh: "阿佛洛狄忒让爱显现为一种不由人完全决定的魅惑。美召唤人离开自足，却也可能使人把被吸引误认为占有的权利。", en: "Aphrodite presents love as a charm not fully chosen by the person. Beauty summons the self beyond itself, yet attraction may be mistaken for a right to possess." } },
    { id: "psyche", name: { zh: "普绪克与爱神", en: "Psyche and Cupid" }, type: { zh: "神话", en: "Myth" }, summary: { zh: "爱需要信任，也需要穿越试炼才可能成熟。", en: "Love requires trust and matures through trial." }, material: { zh: "普绪克的故事把爱从好奇、怀疑与失去中带回关系。它提醒我们：爱不是把对方完全照亮，而是在不可完全掌控中学习信任。", en: "Psyche's story moves love through curiosity, suspicion, and loss back toward relation. Love is not total illumination of the other, but trust within what cannot be fully controlled." } },
    { id: "orpheus", name: { zh: "奥菲斯与欧律狄刻", en: "Orpheus and Eurydice" }, type: { zh: "神话", en: "Myth" }, summary: { zh: "回望所爱之人，也可能在占有的瞬间再次失去。", en: "Looking back toward the beloved may lose her again at the moment of possession." }, material: { zh: "奥菲斯的回望像是爱中最痛的控制冲动：我必须确认你还在。可有些爱只能被信任地引领，不能被反复检查。", en: "Orpheus's backward glance is love's painful impulse to control: I must confirm you are still there. Some love can only be led by trust, not inspected into safety." } }
  ], disorder: { zh: "当神性的牵引被人误认为私有欲望，爱便从降临之力变成占有之术。", en: "When a divine pull is mistaken for private desire, love turns from a visitation into a technique of possession." } },
  { id: "ancient-greece", lane: "west", material: "parchment", img: "assets/greek-sculpture.png", title: { zh: "古希腊", en: "Ancient Greece" }, cardSubtitle: { zh: "爱智慧与上升之爱", en: "Love of wisdom and ascent" }, thesis: { zh: "爱不是单纯情感，而是灵魂被美、善与真理牵引的上升运动。", en: "Love is not mere emotion, but the soul's ascent under the pull of beauty, goodness, and truth." }, figures: [
    { id: "socrates", name: { zh: "苏格拉底", en: "Socrates" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "以无知之知维护哲学的谦卑。", en: "Protects philosophical humility through knowing one's ignorance." }, material: { zh: "苏格拉底让真理不是可炫耀的所有物，而是不断追问中显露的方向。爱智慧意味着愿意被修正，而不是急于拥有立场。", en: "Socrates makes truth not an object to display, but a direction disclosed through questioning. Loving wisdom means being correctable rather than owning a stance." } },
    { id: "symposium", name: { zh: "柏拉图《会饮篇》", en: "Plato's Symposium" }, type: { zh: "文本", en: "Text" }, summary: { zh: "爱从具体美上升到美本身。", en: "Love ascends from particular beauty toward beauty itself." }, material: { zh: "《会饮篇》让爱欲不止停在身体和占有，而被训练为向美、善、真理的上升。它直接构成从占有对象到爱真理的转向。", en: "The Symposium trains eros beyond body and possession toward beauty, goodness, and truth. It marks a turn from possessing an object to loving truth." } },
    { id: "aristotle-friendship", name: { zh: "亚里士多德的友爱", en: "Aristotle's Friendship" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "友爱与德性、共同生活和善相关。", en: "Friendship concerns virtue, shared life, and the good." }, material: { zh: "亚里士多德把友爱放进德性的生活：朋友不是自我满足的工具，而是共同趋向善的人。真理在这里需要关系、实践与品格。", en: "Aristotle places friendship inside virtuous life: the friend is not an instrument of satisfaction, but one who shares orientation toward the good." } },
    { id: "philia-eros-sophia", name: { zh: "Philia / Eros / Sophia", en: "Philia / Eros / Sophia" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "友情、爱欲与智慧构成古典爱的不同方向。", en: "Friendship, eros, and wisdom mark different directions of classical love." }, material: { zh: "这些词汇把爱拆成不同的朝向：欲望被提升，友情被共同目标稳定，智慧则提醒人爱的是高于自我的真理。", en: "These terms divide love into orientations: desire can be elevated, friendship stabilized by shared ends, and wisdom points toward truth beyond the self." } }
  ], disorder: { zh: "若爱智慧变成拥有智慧，哲学便不再使人谦卑，而开始制造优越者。", en: "If loving wisdom becomes owning wisdom, philosophy no longer humbles the soul; it manufactures superiority." } },
  { id: "classical-china", lane: "east", material: "parchment", img: "assets/confucian-ink.png", title: { zh: "中国古典", en: "Classical China" }, cardSubtitle: { zh: "仁、礼、道与修身", en: "Ren, ritual, Dao, and self-cultivation" }, thesis: { zh: "爱从亲亲与修身出发，经过礼、仁、道，进入人与天地秩序的关系。", en: "Love begins from kinship and self-cultivation, then moves through ritual, ren, and Dao into the order of Heaven and earth." }, figures: [
    { id: "confucius", name: { zh: "孔子：仁与亲亲", en: "Confucius: Ren and Kinship" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "爱从具体关系被训练，而不是从抽象口号开始。", en: "Love is trained in concrete relations, not abstract slogans." }, material: { zh: "孔子让爱进入礼与修身：亲亲不是狭隘私情，而是人学习仁的起点。它使爱有秩序，也防止爱变成任性。", en: "Confucius places love within ritual and cultivation. Kinship is not mere partiality, but the starting point for learning ren." } },
    { id: "mencius", name: { zh: "孟子：恻隐之心", en: "Mencius: Compassion" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "恻隐显示人心本有向善的开端。", en: "Compassion reveals the heart's beginning toward goodness." }, material: { zh: "孟子使爱不只是责任，也是一种会被他者痛苦触动的心。它让真理与善不只是外在命令，也在心中萌发。", en: "Mencius makes love not only duty but a heart moved by another's suffering. Truth and goodness begin inwardly as well as normatively." } },
    { id: "laozi", name: { zh: "老子：道与无为", en: "Laozi: Dao and Non-action" }, type: { zh: "文本", en: "Text" }, summary: { zh: "真正的秩序不总由强行掌控产生。", en: "True order does not always arise from forceful control." }, material: { zh: "老子提醒：越想据有秩序，越可能破坏秩序。爱若能少一点占有，便可能更接近让万物自成其所。", en: "Laozi warns that the more one possesses order, the more one may damage it. Love without possession lets things become themselves." } },
    { id: "zhuangzi", name: { zh: "庄子：自由与去中心", en: "Zhuangzi: Freedom and Decentering" }, type: { zh: "文本", en: "Text" }, summary: { zh: "从自我中心松开，万物才显出不同尺度。", en: "When self-center loosens, things reveal different measures." }, material: { zh: "庄子让人从固定身份、功利判断与中心幻觉中退出。它帮助解释：不占有真理，并不是虚无，而是允许真理不只围着我转。", en: "Zhuangzi releases the person from fixed identity, utility, and centrality. Not possessing truth is not nihilism; it lets truth stop orbiting the self." } },
    { id: "mozi-buddhism", name: { zh: "墨子与佛教慈悲", en: "Mozi and Buddhist Compassion" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "兼爱与慈悲把爱推向更广阔的众生。", en: "Impartial care and compassion widen love toward all beings." }, material: { zh: "墨子的兼爱与佛教慈悲都让爱越过私域，但前者偏向公共伦理，后者偏向离苦与众生。它们共同提醒：爱不必只服务我的归属。", en: "Mozi's impartial care and Buddhist compassion move love beyond private attachment: one through public ethics, the other through release from suffering." } }
  ], disorder: { zh: "当秩序只剩规训，仁会变成名分；当自由只剩逃离，道也会被误作冷漠。", en: "When order becomes mere discipline, ren becomes status; when freedom becomes mere escape, Dao is mistaken for indifference." } },
  { id: "renaissance-early-modern", lane: "west", material: "paper", img: "assets/renaissance-study.png", title: { zh: "文艺复兴与近代主义", en: "Renaissance and Early Modernity" }, cardSubtitle: { zh: "尊严、身体与主体", en: "Dignity, body, and subject" }, thesis: { zh: "人重新凝视自身、身体、艺术与世界，但主体也开始被抬高。", en: "The human being looks again at the self, body, art, and world, while the subject begins to rise." }, figures: [
    { id: "petrarch", name: { zh: "彼特拉克", en: "Petrarch" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "内在自我与人文感受被重新书写。", en: "The inward self and humanist sensibility are rewritten." }, material: { zh: "彼特拉克使人的内心、记忆与情感获得文学重量。爱开始更明显地与自我叙述相连，这既丰盛了主体，也埋下自我中心的可能。", en: "Petrarch gives literary weight to inwardness, memory, and feeling. Love becomes tied to self-narration, enriching the subject while risking self-centrality." } },
    { id: "pico", name: { zh: "皮科《论人的尊严》", en: "Pico's Oration on Dignity" }, type: { zh: "文本", en: "Text" }, summary: { zh: "人的尊严来自可塑性与自我提升。", en: "Human dignity lies in plasticity and self-elevation." }, material: { zh: "皮科把人理解为能够向上或向下塑造自己的存在。尊严被抬高，爱真理也更容易被理解为人的自我完成工程。", en: "Pico sees the human as able to shape itself upward or downward. Dignity rises, and loving truth can become a project of self-completion." } },
    { id: "da-vinci", name: { zh: "达芬奇", en: "Leonardo da Vinci" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "观察、艺术与技术在同一只眼睛里相遇。", en: "Observation, art, and technique meet in one eye." }, material: { zh: "达芬奇象征一种新凝视：世界可被观看、描绘、拆解，也可被创造性地重组。这让美与真理靠近，也让观看带上掌控欲。", en: "Leonardo symbolizes a new gaze: the world can be observed, drawn, dissected, and recomposed. Beauty nears truth, but seeing also gains a desire to master." } },
    { id: "reformation-descartes", name: { zh: "宗教改革与笛卡尔", en: "Reformation and Descartes" }, type: { zh: "事件 / 人物", en: "Event / Figure" }, summary: { zh: "信仰、良知与理性主体被重新定位。", en: "Faith, conscience, and rational subject are relocated." }, material: { zh: "宗教改革强调个体良知，笛卡尔则以怀疑寻找确定性。二者共同推动主体上升：真理不再只是被承受，也越来越需要由我确认。", en: "The Reformation stresses conscience, while Descartes seeks certainty through doubt. Together they raise the subject: truth is not only received, but increasingly confirmed by me." } }
  ], disorder: { zh: "当人的尊严不再承认限度，主体会把世界变成证明自身的镜子。", en: "When human dignity no longer admits limits, the subject turns the world into a mirror for proving itself." } },
  { id: "enlightenment-modernity", lane: "west", material: "paper", img: "assets/renaissance-study.png", title: { zh: "启蒙与现代性", en: "Enlightenment and Modernity" }, cardSubtitle: { zh: "理性、自由与进步", en: "Reason, freedom, and progress" }, thesis: { zh: "人开始相信理性可以照亮世界，也开始把真理理解为可被人类主体掌握的秩序。", en: "Human beings begin to trust reason to illuminate the world, and truth becomes an order graspable by the human subject." }, figures: [
    { id: "kant", name: { zh: "康德", en: "Kant" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "理性自律使现代主体获得尊严。", en: "Rational autonomy gives the modern subject dignity." }, material: { zh: "康德让人不只是服从外在权威，而以理性自律承担道德。真理与善进入主体结构，也使现代人更相信自身能立法。", en: "Kant frees the person from mere external authority and grounds morality in rational autonomy. Truth and goodness enter the structure of subjectivity." } },
    { id: "rousseau", name: { zh: "卢梭", en: "Rousseau" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "自然、情感与公共意志重塑现代人。", en: "Nature, feeling, and the general will reshape the modern person." }, material: { zh: "卢梭让自然感情和共同体政治同时升温。爱可以是同情，也可以被转化为对公共意志的忠诚。", en: "Rousseau intensifies both natural feeling and political community. Love may be compassion, but also loyalty to the general will." } },
    { id: "encyclopedists", name: { zh: "休谟、伏尔泰与百科全书派", en: "Hume, Voltaire, and the Encyclopedists" }, type: { zh: "人物 / 文本", en: "Figures / Texts" }, summary: { zh: "经验、批判与知识分类成为启蒙工具。", en: "Experience, critique, and classification become tools of Enlightenment." }, material: { zh: "启蒙把知识从神学垄断中释放出来，也把世界整理为可批判、可分类、可传播的对象。真理更公共，也更像可管理的体系。", en: "Enlightenment frees knowledge from theological monopoly and organizes the world as criticizable, classifiable, and communicable. Truth becomes more public, but more manageable." } },
    { id: "modern-subject", name: { zh: "现代主体", en: "Modern Subject" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "人越来越以自身理性和自由作为秩序中心。", en: "The person increasingly centers order in reason and freedom." }, material: { zh: "现代主体带来尊严与责任，也带来焦虑：如果真理必须由我掌握，我便很难再以敬畏面对不可掌控之物。", en: "The modern subject brings dignity and responsibility, but also anxiety: if truth must be grasped by me, reverence toward what exceeds control becomes difficult." } }
  ], disorder: { zh: "当理性不再承认自身有限，光也可能变成审判他人的火。", en: "When reason no longer admits its limits, light can become a fire for judging others." } },
  { id: "revolution", lane: "center", material: "copper", img: "assets/revolution-copper.png", title: { zh: "革命", en: "Revolution" }, cardSubtitle: { zh: "真理成为历史行动", en: "Truth becomes historical action" }, thesis: { zh: "爱、真理与正义被转化为历史行动，拯救世界的愿望也可能生成新的暴力。", en: "Love, truth, and justice turn into historical action; the desire to save the world may generate new violence." }, figures: [
    { id: "french-revolution", name: { zh: "法国大革命", en: "French Revolution" }, type: { zh: "事件", en: "Event" }, summary: { zh: "自由、平等与人民成为现代政治神圣词。", en: "Liberty, equality, and the people become sacred words of modern politics." }, material: { zh: "法国大革命把抽象权利变成历史行动。它让真理不只被思考，而被动员；但行动中的真理也会要求牺牲。", en: "The French Revolution turns abstract rights into historical action. Truth is mobilized, not only contemplated, and may demand sacrifice." } },
    { id: "marx", name: { zh: "马克思", en: "Marx" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "真理进入历史、劳动与阶级关系。", en: "Truth enters history, labor, and class relation." }, material: { zh: "马克思把人的异化与解放放进现实结构，而非内心安慰。真理不再只是被爱，也要被实践；危险在于实践可能自称拥有历史必然。", en: "Marx places alienation and liberation in real structures rather than private consolation. Truth must be practiced, but practice may claim to possess historical necessity." } },
    { id: "national-revolution", name: { zh: "民族革命", en: "National Revolution" }, type: { zh: "事件", en: "Event" }, summary: { zh: "共同体之爱被组织成解放叙事。", en: "Love of community is organized into narratives of liberation." }, material: { zh: "民族革命把被压迫者的尊严重新召回，也把爱转化为边界、旗帜和牺牲。当共同体被神圣化，个体容易被历史吞没。", en: "National revolutions recall oppressed dignity and translate love into borders, flags, and sacrifice. Sacred community can swallow the individual." } },
    { id: "utopia-masses", name: { zh: "乌托邦、群众与历史", en: "Utopia, Masses, and History" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "未来社会成为判断现在的尺度。", en: "The future society becomes the measure of the present." }, material: { zh: "乌托邦能使人不向现实妥协，也可能让现实中的人被未来之名消耗。爱若只爱未来的人类，眼前的人会变得可牺牲。", en: "Utopia resists compromise with the present, but may consume present persons in the name of the future. Love for future humanity can sacrifice the person before us." } }
  ], disorder: { zh: "当拯救世界的爱不能被质疑，正义也可能学会使用献祭的语言。", en: "When love that saves the world cannot be questioned, justice may learn the language of sacrifice." } },
  { id: "contemporary", lane: "center", material: "silver", img: "assets/technology-silver.png", title: { zh: "现代", en: "Contemporary Life" }, cardSubtitle: { zh: "心理化、身份化与被看见", en: "Psychologized, identified, and seen" }, thesis: { zh: "爱越来越被心理化、身份化、安全感化，真理也越来越成为自我定位的资源。", en: "Love becomes increasingly psychologized, identity-bound, and safety-oriented; truth becomes a resource for locating the self." }, figures: [
    { id: "nietzsche", name: { zh: "尼采", en: "Nietzsche" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "旧神圣退场后，人必须面对价值创造的重量。", en: "After old sacred measures recede, the person faces the weight of value-creation." }, material: { zh: "尼采不是简单叫人任性，而是揭开旧价值崩解后的危险：谋杀上帝的人也可能急着自己成为上帝。", en: "Nietzsche is not a simple license for whim; he exposes the danger after old values collapse: the one who kills God may rush to become God." } },
    { id: "freud", name: { zh: "弗洛伊德", en: "Freud" }, type: { zh: "人物", en: "Figure" }, summary: { zh: "欲望、无意识与亲密关系进入现代解释。", en: "Desire, the unconscious, and intimacy enter modern explanation." }, material: { zh: "弗洛伊德让爱不再只是高贵叙事，也包含欲望、缺失与重复。它帮助人诚实，却也可能让一切爱都被解释为症状。", en: "Freud makes love include desire, lack, and repetition rather than noble story alone. It grants honesty, but may turn all love into symptom." } },
    { id: "existentialism-modern", name: { zh: "存在主义", en: "Existentialism" }, type: { zh: "概念", en: "Concept" }, summary: { zh: "自由、荒诞与责任成为现代爱的背景。", en: "Freedom, absurdity, and responsibility become the background of modern love." }, material: { zh: "存在主义使人承认没有现成剧本。爱不再只服从秩序，也成为选择；但选择若没有更高善的修正，会变成孤独的自我证明。", en: "Existentialism admits there is no ready script. Love becomes choice, but choice without a higher good may become lonely self-proof." } },
    { id: "social-media", name: { zh: "社交媒体与被看见", en: "Social Media and Visibility" }, type: { zh: "事件 / 概念", en: "Event / Concept" }, summary: { zh: "被看见成为亲密、身份与价值的共同货币。", en: "Being seen becomes common currency for intimacy, identity, and value." }, material: { zh: "社交媒体让表达更容易，也让爱和真理不断被展示、计量和比较。被看见的需要若失去安放，会变成持续索取确认。", en: "Social media eases expression while displaying, measuring, and comparing love and truth. The need to be seen can become endless demand for confirmation." } }
  ], disorder: { zh: "当自我定位比真理更紧急，爱也会被改造成安全感的供应系统。", en: "When self-location becomes more urgent than truth, love is redesigned as a supply system for safety." } },
  { id: "isms", lane: "center", material: "glass ism-group", img: "assets/isms-deck.png", title: { zh: "主义之牌", en: "Cards of Isms" }, cardSubtitle: { zh: "可持有的立场之沓", en: "A stack of possessable positions" }, thesis: { zh: "当真理被分割成可持有的立场，现代人似乎不再爱真理，而是急于拥有真理。", en: "When truth is divided into possessable positions, modern people seem less eager to love truth than to own it." }, figures: ismCards, disorder: { zh: "当主义替人解除不安，真理便不再召唤人，而开始替人站队。", en: "When an ism relieves anxiety, truth no longer summons the person; it begins to assign a camp." } }
];

timeline.length = 0;
timeline.push(...timelineEras);
spreadCards.zh = ismCards.map((card) => [card.name.zh, card.summary.zh, card.icon]);
spreadCards.en = ismCards.map((card) => [card.name.en, card.summary.en, card.icon]);

const DOM = {};

function resizeStars() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  starCanvas.width = innerWidth * dpr;
  starCanvas.height = innerHeight * dpr;
  starCanvas.style.width = `${innerWidth}px`;
  starCanvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(680, Math.floor(innerWidth * innerHeight / 1800)) }, () => ({
    x: (Math.random() - .5) * innerWidth,
    y: (Math.random() - .5) * innerHeight,
    z: Math.random() * innerWidth,
    twinkle: Math.random() * Math.PI * 2
  }));
}

function drawStars() {
  ctx.fillStyle = "rgba(2,3,7,.34)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  speed += (targetSpeed - speed) * .04;
  const restingSpeed = introPhase > 0 ? 0.42 : 0.25;
  targetSpeed += (restingSpeed - targetSpeed) * .018;
  const cx = innerWidth / 2;
  const cy = innerHeight / 2;
  for (const s of stars) {
    s.z -= speed;
    s.twinkle += .02;
    if (s.z < 1) {
      s.x = (Math.random() - .5) * innerWidth;
      s.y = (Math.random() - .5) * innerHeight;
      s.z = innerWidth;
    }
    const k = 260 / s.z;
    const x = s.x * k + cx;
    const y = s.y * k + cy;
    const glow = (Math.sin(s.twinkle) + 1) * .22;
    const size = Math.max(.45, (1 - s.z / innerWidth) * 3.1);
    const alpha = Math.min(1, .18 + glow + (1 - s.z / innerWidth) * .78);
    ctx.beginPath();
    ctx.fillStyle = `rgba(244,230,200,${alpha})`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

function bindIntro() {
  intro.addEventListener("click", () => {
    if (introDone) return;
    if (introPhase === 0) {
      introPhase = 1;
      document.body.classList.remove("intro-dark");
      document.body.classList.add("intro-awake");
      targetSpeed = 10;
      intro.classList.add("title-on");
      return;
    }
    targetSpeed = 18;
    introPhase = 2;
    document.body.classList.add("intro-questions");
    intro.classList.add("questions-on");
    qIndex = intro.classList.contains("question-started") ? qIndex + 1 : 0;
    intro.classList.add("question-started");
    question.classList.remove("show");
    setTimeout(() => {
      const questions = t[currentLang].questions;
      const lastIndex = questions.length - 1;
      question.innerHTML = questions[Math.min(qIndex, lastIndex)];
      question.classList.add("show");
      if (qIndex >= lastIndex) {
        introDone = true;
        setTimeout(() => goToPanel(1), 1450);
      }
    }, 260);
  });
}

function cacheDOM() {
  DOM.main = document.querySelector("main");
  DOM.panels = panelIds.map((id) => document.querySelector(`#${id}`));
  DOM.lovePanel = document.querySelector("#loveAstrolabe");
  DOM.axisPanel = document.querySelector("#axis");
  DOM.echoPanel = document.querySelector("#echo");
  DOM.introKicker = document.querySelector(".intro-copy .kicker");
  DOM.introTitle = document.querySelector(".intro-copy h1");
  DOM.introSubtitle = document.querySelector(".intro-copy .subtitle");
  DOM.loveMicro = document.querySelector(".love-copy .micro");
  DOM.loveTitle = document.querySelector("#loveTitle");
  DOM.loveDesc = document.querySelector("#loveDesc");
  DOM.reliefMain = document.querySelector("#reliefMain");
  DOM.reliefImage = document.querySelector("#reliefImage");
  DOM.loveDots = Array.from(document.querySelectorAll(".love-dot"));
  DOM.footnoteHint = document.querySelector(".footnote-hint");
  DOM.loveElements = Array.from(document.querySelectorAll(".love-element"));
  DOM.needText = document.querySelector("#needText");
  DOM.giftText = document.querySelector("#giftText");
  DOM.appText = document.querySelector("#appText");
  DOM.noteCard = document.querySelector("#loveFootnote");
  DOM.noteKicker = document.querySelector("#noteKicker");
  DOM.noteSealMark = document.querySelector(".note-seal");
  DOM.noteSeal = document.querySelector("#noteSealText");
  DOM.noteName = document.querySelector("#noteName");
  DOM.noteMotto = document.querySelector("#noteMotto");
  DOM.noteTabs = Array.from(document.querySelectorAll("[data-note-state]"));
  DOM.noteBody = document.querySelector("#noteBody");
  DOM.noteTitle = document.querySelector("#noteTitle");
  DOM.track = document.querySelector("#cardTrack");
  DOM.shell = document.querySelector("#trackShell");
  DOM.range = document.querySelector("#axisRange");
  DOM.sideNote = document.querySelector("#sideNote");
  DOM.spreadStage = document.querySelector("#spreadStage");
  DOM.detail = document.querySelector("#detail");
  DOM.detailClose = document.querySelector("#detailClose");
  DOM.detailArt = document.querySelector("#detailArt");
  DOM.detailEra = document.querySelector("#detailEra");
  DOM.detailTitle = document.querySelector("#detailTitle");
  DOM.detailJudgment = document.querySelector("#detailJudgment");
  DOM.detailRefs = document.querySelector("#detailRefs");
  DOM.detailReflection = document.querySelector("#detailReflection");
  DOM.axisLabels = document.querySelectorAll(".axis-control span");
  DOM.echoTitle = document.querySelector("#echoTitle");
  DOM.echoJourney = document.querySelector("#echoJourney");
  DOM.echoPageShell = document.querySelector("#echoPages");
  DOM.echoPages = Array.from(document.querySelectorAll("[data-echo-page]"));
  DOM.echoPageMark = document.querySelector("#echoPageMark");
  DOM.echoEntryKicker = document.querySelector("#echoEntryKicker");
  DOM.echoEntryTitle = document.querySelector("#echoEntryTitle");
  DOM.echoStart = document.querySelector("#echoStart");
  DOM.echoIntro = document.querySelector("#echoIntro");
  DOM.echoTextarea = document.querySelector("#echoText");
  DOM.pickedQuestion = document.querySelector("#pickedQuestion");
  DOM.pickedQuestionText = document.querySelector("#pickedQuestionText");
  DOM.removePrompt = document.querySelector("#removePrompt");
  DOM.promptShelfTitle = document.querySelector("#promptShelfTitle");
  DOM.promptShelfHint = document.querySelector("#promptShelfHint");
  DOM.promptTabs = document.querySelector("#promptTabs");
  DOM.echoPrompts = document.querySelector("#echoPrompts");
  DOM.needKicker = document.querySelector("#needKicker");
  DOM.needTitle = document.querySelector("#needTitle");
  DOM.needPool = document.querySelector("#needPool");
  DOM.freedomKicker = document.querySelector("#freedomKicker");
  DOM.freedomTitle = document.querySelector("#freedomTitle");
  DOM.freedomIntro = document.querySelector("#freedomIntro");
  DOM.freedomPool = document.querySelector("#freedomPool");
  DOM.echoGenerate = document.querySelector("#echoGenerate");
  DOM.feedbackKicker = document.querySelector("#feedbackKicker");
  DOM.feedbackTitle = document.querySelector("#feedbackTitle");
  DOM.feedbackSubtitle = document.querySelector("#feedbackSubtitle");
  DOM.echoFeedback = document.querySelector("#echoFeedback");
  DOM.selfLoveDeclaration = document.querySelector("#selfLoveDeclaration");
  DOM.copyDeclaration = document.querySelector("#copyDeclaration");
  DOM.journeyNotes = Array.from(document.querySelectorAll("[data-journey-note]"));
  DOM.echoPrev = document.querySelector("#echoPrev");
  DOM.echoNext = document.querySelector("#echoNext");
  DOM.echoDots = document.querySelector("#echoDots");
  DOM.echoPlaceBeside = document.querySelector("#echoPlaceBeside");
  DOM.echoLove = document.querySelector("#echoLove");
  DOM.echoElement = document.querySelector("#echoElement");
  DOM.echoSealName = document.querySelector("#echoSealName");
  DOM.echoNote = document.querySelector("#echoNote");
  DOM.echoSave = document.querySelector("#echoSave");
  DOM.echoCopy = document.querySelector("#echoCopy");
  DOM.echoClear = document.querySelector("#echoClear");
  DOM.echoStatus = document.querySelector("#echoStatus");
  DOM.echoPrivacy = document.querySelector("#echoPrivacy");
}

function goToPanel(index, options = {}) {
  const previousIndex = activePanelIndex;
  const nextIndex = ((Math.round(index) % panelIds.length) + panelIds.length) % panelIds.length;
  activePanelIndex = nextIndex;
  document.documentElement.style.setProperty("--stage-panel", String(nextIndex));
  document.body.dataset.stage = panelIds[nextIndex];
  if (nextIndex > 0) {
    document.body.classList.remove("intro-dark");
    document.body.classList.add("intro-awake");
  }
  if (nextIndex === 0 && options.resetIntro) resetIntroHome();
  if (nextIndex === 3 && previousIndex !== 3) resetEchoToCover();
}

function resetIntroHome() {
  introDone = false;
  introPhase = 1;
  qIndex = 0;
  targetSpeed = 10;
  question.classList.remove("show");
  question.innerHTML = "";
  document.body.classList.remove("intro-dark", "intro-questions");
  document.body.classList.add("intro-awake");
  intro.classList.remove("questions-on", "question-started");
  intro.classList.add("title-on");
}

function isInteractiveTarget(target) {
  return Boolean(target.closest("button, input, textarea, select, a, [contenteditable='true'], .love-element, .love-dot, .relief-main, .tarot, .era-dossier, .detail, .love-footnote, .picked-question, .spread-stage, .spread-card"));
}

function turnStageFromBlankClick(event) {
  if (isInteractiveTarget(event.target)) return false;
  if (DOM.eraDossier?.classList.contains("open")) return false;
  if (DOM.shell?.classList.contains("spread")) {
    DOM.shell.classList.remove("spread");
    return true;
  }
  const isLeft = event.clientX < innerWidth / 2;
  goToPanel(activePanelIndex + (isLeft ? -1 : 1), { resetIntro: isLeft ? false : activePanelIndex === panelIds.length - 1 });
  return true;
}

function bindStageTransitions() {
  DOM.panels.forEach((panel, index) => {
    if (!panel) return;
    panel.addEventListener("click", (event) => {
      if (activePanelIndex !== index) return;
      if (index === 0 && !introDone) return;
      turnStageFromBlankClick(event);
    });
  });
}

function resetEchoToCover() {
  if (!DOM.echoPages?.length) return;
  echoPage = 0;
  renderEchoPage();
}

function renderAll() {
  const copy = t[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  languageToggle.textContent = copy.langButton;
  DOM.introKicker.textContent = copy.introKicker;
  DOM.introTitle.textContent = copy.introTitle;
  DOM.introSubtitle.textContent = copy.introSubtitle;
  if (intro.classList.contains("question-started")) question.innerHTML = copy.questions[Math.min(qIndex, copy.questions.length - 1)];
  DOM.loveMicro.textContent = copy.loveModule;
  DOM.footnoteHint.textContent = copy.footnoteHint;
  DOM.loveElements.forEach((button) => {
    const label = elementLabels[button.dataset.element]?.[currentLang] || "";
    button.querySelector("span").textContent = label;
  });
  renderLove();
  renderNote();
  renderTimelineText();
  renderSpread();
  renderEcho();
}

function renderLove() {
  const love = loveData[loveIndex];
  const copy = love[currentLang];
  const greek = love.term.split("·").pop().trim();
  DOM.loveTitle.innerHTML = `<span class="love-greek">${greek}</span><span class="love-cn">${copy.name}</span>`;
  DOM.loveDesc.textContent = copy.desc;
  DOM.needText.textContent = copy.need;
  DOM.giftText.textContent = copy.gift;
  DOM.appText.textContent = copy.appreciation;
  DOM.loveDots.forEach((dot, index) => dot.classList.toggle("active", index === loveIndex));
}

function showLove(index) {
  loveIndex = (index + loveData.length) % loveData.length;
  const love = loveData[loveIndex];
  DOM.reliefMain.classList.add("spin");
  setTimeout(() => {
    DOM.reliefImage.src = love.img;
    DOM.reliefImage.alt = love[currentLang].name;
    renderLove();
    DOM.reliefMain.classList.remove("spin");
  }, 300);
}

function openLoveNote(element) {
  closeDetail();
  const love = loveData[loveIndex].key;
  activeNote = loveNotesByKey[`${love}-${element}`];
  activeNoteMode = "light";
  setNoteSealTilt(0);
  renderNote();
  DOM.noteCard.classList.add("open");
  document.body.classList.add("note-open");
  DOM.noteCard.setAttribute("aria-hidden", "false");
}

function closeLoveNote() {
  if (!DOM.noteCard) return;
  DOM.noteCard.classList.remove("open");
  DOM.noteCard.setAttribute("aria-hidden", "true");
  document.body.classList.remove("note-open");
}

function renderNote() {
  if (!activeNote || !DOM.noteCard) return;
  if (DOM.noteKicker) DOM.noteKicker.textContent = "";
  if (DOM.noteSeal) DOM.noteSeal.textContent = "";
  if (DOM.noteName) DOM.noteName.textContent = "";
  if (DOM.noteMotto) DOM.noteMotto.textContent = "";
  DOM.noteCard.dataset.mode = activeNoteMode;
  DOM.noteCard.dataset.element = activeNote.element;
  DOM.noteTabs.forEach((button) => {
    const state = button.dataset.noteState;
    button.textContent = "";
    button.classList.toggle("active", state === activeNoteMode);
  });
  const body = activeNote.texts[activeNoteMode];
  const stateLabel = activeNote.tabs[activeNoteMode][currentLang];
  DOM.noteTitle.textContent = `${activeNote.name[currentLang]} · ${stateLabel}`;
  DOM.noteBody.querySelector("p").textContent = body.body[currentLang];
}

function buildTimeline() {
  DOM.range.max = String(timeline.length - 1);
  DOM.track.innerHTML = "";
  if (!DOM.eraDossier) {
    DOM.eraDossier = document.createElement("section");
    DOM.eraDossier.className = "era-dossier";
    DOM.eraDossier.setAttribute("aria-hidden", "true");
    DOM.shell.appendChild(DOM.eraDossier);
  }
  timeline.forEach((card, index) => {
    const node = document.createElement("article");
    node.className = `tarot ${card.material}`;
    node.dataset.index = index;
    node.style.setProperty("--x", `${430 + index * 285}px`);
    node.style.setProperty("--y", card.lane === "west" ? "33%" : card.lane === "east" ? "68%" : "50%");
    node.style.setProperty("--img", `url("${card.img}")`);
    node.innerHTML = `<div class="card-face"><div class="card-art"></div><div class="card-era">${card.cardSubtitle[currentLang]}</div><div class="card-title"></div></div>`;
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      setTimelineIndex(index);
      if (card.id === "isms") {
        closeEraDossier();
        openSpread();
        return;
      }
      openEraDossier(index);
    });
    DOM.track.appendChild(node);
  });
  DOM.range.addEventListener("input", () => setTimelineIndex(Number(DOM.range.value)));
  DOM.shell.addEventListener("wheel", (event) => {
    event.preventDefault();
    setTimelineIndex(Number(DOM.range.value) + Math.sign(event.deltaY));
  }, { passive: false });
  bindTimelineGlide();
}

function renderTimelineText() {
  DOM.axisLabels[0].textContent = t[currentLang].classical;
  DOM.axisLabels[1].textContent = t[currentLang].modern;
  document.querySelectorAll(".tarot").forEach((node) => {
    const index = Number(node.dataset.index);
    node.querySelector(".card-title").textContent = timeline[index].title[currentLang];
    node.querySelector(".card-era").textContent = timeline[index].cardSubtitle[currentLang];
  });
  focusCard(Number(DOM.range.value || 0));
  if (DOM.eraDossier?.classList.contains("open")) renderEraDossier(activeEraIndex, activeEraMaterialId);
}

function focusCard(index) {
  activeEraIndex = index;
  document.querySelectorAll(".tarot").forEach((item) => {
    const isFocus = Number(item.dataset.index) === index;
    item.classList.toggle("focus", isFocus);
    item.classList.toggle("dossier-active", isFocus && DOM.eraDossier?.classList.contains("open"));
  });
  const center = DOM.shell.clientWidth * .45;
  DOM.track.style.setProperty("--track-x", `${center - (430 + index * 285)}px`);
  const card = timeline[index];
  DOM.sideNote.innerHTML = `<p class="micro">${t[currentLang].currentCard}</p><h2>${card.title[currentLang]}</h2><p>${card.thesis[currentLang]}</p>`;
  DOM.shell.classList.remove("spread");
}

function setTimelineIndex(index) {
  const next = Math.max(0, Math.min(timeline.length - 1, Math.round(index)));
  DOM.range.value = String(next);
  focusCard(next);
}

function bindTimelineGlide() {
  if (timelineGlideBound || !DOM.shell) return;
  timelineGlideBound = true;

    DOM.shell.addEventListener("pointermove", (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (event.target.closest(".era-dossier, button, input, textarea, a")) return;
      if (DOM.eraDossier?.classList.contains("open")) return;
      if (DOM.shell.classList.contains("spread")) return;

      cancelAnimationFrame(timelineGlideFrame);
    timelineGlideFrame = requestAnimationFrame(() => {
      const rect = DOM.shell.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      setTimelineIndex(ratio * (timeline.length - 1));
    });
  });
}

function renderSpread() {
  DOM.spreadStage.innerHTML = "";
  spreadCards[currentLang].forEach(([title, text, icon], index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const node = document.createElement("article");
    node.className = "spread-card";
    node.style.setProperty("--r", `${8 + (2 - col) * 18}%`);
    node.style.setProperty("--t", `${15 + row * 38}%`);
    node.style.setProperty("--rot", `${[-9, 2, 10, -4, 6, -11][index]}deg`);
    node.style.setProperty("--delay", `${index * 90}ms`);
    node.innerHTML = `<div class="rim"><b>${title}</b><i class="sigil ${icon}" aria-hidden="true"></i><span>${text}</span></div>`;
    DOM.spreadStage.appendChild(node);
  });
}

function openEraDossier(index) {
  activeEraIndex = index;
  activeEraMaterialId = timeline[index].figures[0]?.id || "";
  renderEraDossier(index, activeEraMaterialId);
  DOM.eraDossier.classList.add("open");
  DOM.eraDossier.setAttribute("aria-hidden", "false");
  DOM.shell.classList.add("dossier-open");
  document.querySelectorAll(".tarot").forEach((item) => item.classList.toggle("dossier-active", Number(item.dataset.index) === index));
}

function closeEraDossier() {
  if (!DOM.eraDossier) return;
  DOM.eraDossier.classList.remove("open");
  DOM.eraDossier.setAttribute("aria-hidden", "true");
  DOM.shell.classList.remove("dossier-open");
  document.querySelectorAll(".tarot").forEach((item) => item.classList.remove("dossier-active"));
}

function renderEraDossier(index, materialId) {
  const era = timeline[index];
  const lang = currentLang;
  const labels = lang === "zh"
    ? { dossier: "时代档案", thesis: "核心命题", materials: "代表人物 / 文本 / 材料", open: "进入材料", material: "核心材料", close: "收起档案" }
    : { dossier: "Era Dossier", thesis: "Thesis", materials: "Figures / Texts / Materials", open: "Open", material: "Core Material", close: "Close" };
  const selected = era.figures.find((item) => item.id === materialId) || era.figures[0];
  activeEraMaterialId = selected?.id || "";
  DOM.eraDossier.innerHTML = `
    <button class="era-dossier-close" type="button" aria-label="${labels.close}">×</button>
    <div class="era-dossier-left">
      <p class="era-dossier-kicker">${labels.dossier}</p>
      <h2>${era.title[lang]}</h2>
      <div class="era-thesis">
        <span>${labels.thesis}</span>
        <p>${era.thesis[lang]}</p>
      </div>
      <blockquote>${era.disorder[lang]}</blockquote>
    </div>
    <div class="era-dossier-right">
      <p class="era-dossier-kicker">${labels.materials}</p>
      <div class="era-material-list">
        ${era.figures.map((item) => `
          <article class="era-material-item ${item.id === selected.id ? "active" : ""}" data-material-id="${item.id}">
            <div>
              <b>${item.name[lang]}</b>
              <i>${item.type[lang]}</i>
              <p>${item.summary[lang]}</p>
            </div>
            <button type="button">${labels.open}</button>
          </article>
        `).join("")}
      </div>
      <section class="era-material-core">
        <p class="era-dossier-kicker">${labels.material}</p>
        <h3>${selected.name[lang]}</h3>
        <p>${selected.material[lang]}</p>
      </section>
    </div>
  `;
  DOM.eraDossier.querySelector(".era-dossier-close").addEventListener("click", closeEraDossier);
  DOM.eraDossier.querySelectorAll(".era-material-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      renderEraDossier(index, item.dataset.materialId);
    });
  });
}

function openSpread() {
  DOM.shell.classList.add("spread");
}

function openDetail(index) {
  openEraDossier(index);
}

function closeDetail() {
  if (!DOM.detail) return;
  DOM.detail.classList.remove("open");
  DOM.detail.setAttribute("aria-hidden", "true");
}

function buildEcho() {
  loadEcho();
  DOM.echoTextarea.addEventListener("input", () => {
    persistEchoQuietly();
    renderEchoFeedback();
  });
  DOM.echoStart.addEventListener("click", () => setEchoPage(1));
  DOM.echoPrev.addEventListener("click", () => setEchoPage(echoPage - 1));
  DOM.echoNext.addEventListener("click", () => setEchoPage(echoPage + 1));
  DOM.journeyNotes.forEach((note) => {
    note.addEventListener("input", () => {
      journeyNotes[note.dataset.journeyNote] = note.textContent;
      persistEchoQuietly();
    });
  });
  DOM.echoPages.forEach((page) => {
    page.addEventListener("click", (event) => {
      if (!page.classList.contains("active")) return;
      if (event.target.closest("button, textarea, input, select, a, .picked-question, [contenteditable='true']")) return;
      event.stopPropagation();
      if (echoPage === 0) {
        const isLeft = event.clientX < innerWidth / 2;
        if (isLeft) {
          goToPanel(activePanelIndex - 1);
        } else {
          setEchoPage(1);
        }
        return;
      }
      const rect = page.getBoundingClientRect();
      const isLeftPage = event.clientX < rect.left + rect.width / 2;
      if (echoPage === DOM.echoPages.length - 1 && !isLeftPage) {
        goToPanel(0, { resetIntro: true });
        return;
      }
      setEchoPage(echoPage + (isLeftPage ? -1 : 1));
    });
  });
  DOM.removePrompt.addEventListener("click", () => {
    selectedEchoPrompt = "";
    renderPickedPrompt();
    persistEchoQuietly();
  });
  DOM.echoGenerate.addEventListener("click", () => {
    renderEchoFeedback();
    setEchoPage(4);
  });
  DOM.echoSave.addEventListener("click", () => {
    saveEcho();
    flashEchoStatus(echoJourney[currentLang].saved);
  });
  DOM.echoCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(DOM.echoTextarea.value);
      flashEchoStatus(echoJourney[currentLang].copied);
    } catch {
      DOM.echoTextarea.focus();
      DOM.echoTextarea.select();
      flashEchoStatus(echoJourney[currentLang].copyFallback);
    }
  });
  DOM.echoClear.addEventListener("click", () => {
    DOM.echoTextarea.value = "";
    selectedEchoPrompt = "";
    renderPickedPrompt();
    renderEchoFeedback();
    saveEcho();
    flashEchoStatus(echoJourney[currentLang].cleared);
  });
  DOM.copyDeclaration.addEventListener("click", async () => {
    const content = echoJourney[currentLang].declaration;
    try {
      await navigator.clipboard.writeText(content);
      flashEchoStatus(echoJourney[currentLang].declarationCopied);
    } catch {
      flashEchoStatus(echoJourney[currentLang].copyFallback);
    }
  });
}

function renderEcho() {
  const copy = echoJourney[currentLang];
  DOM.echoTitle.textContent = copy.title;
  DOM.echoEntryKicker.textContent = copy.entryKicker;
  DOM.echoEntryTitle.textContent = copy.entryTitle;
  DOM.echoIntro.textContent = copy.entryIntro;
  DOM.echoStart.textContent = copy.start;
  DOM.echoTextarea.placeholder = copy.placeholder;
  DOM.promptShelfTitle.textContent = copy.promptTitle;
  DOM.promptShelfHint.textContent = copy.promptHint;
  DOM.needKicker.textContent = copy.needKicker;
  DOM.needTitle.textContent = copy.needTitle;
  DOM.freedomKicker.textContent = copy.freedomKicker;
  DOM.freedomTitle.textContent = copy.freedomTitle;
  DOM.freedomIntro.textContent = copy.freedomIntro;
  DOM.echoGenerate.textContent = copy.generate;
  DOM.feedbackKicker.textContent = copy.feedbackKicker;
  DOM.feedbackTitle.textContent = copy.feedbackTitle;
  DOM.feedbackSubtitle.textContent = copy.feedbackSubtitle;
  DOM.echoSave.textContent = copy.save;
  DOM.echoCopy.textContent = copy.copy;
  DOM.echoClear.textContent = copy.clear;
  DOM.echoPrivacy.textContent = copy.privacy;
  DOM.echoPrev.textContent = copy.prev;
  DOM.echoNext.textContent = copy.next;
  DOM.copyDeclaration.textContent = copy.copyDeclaration;
  renderPromptTabs();
  renderPromptShelf();
  renderReflectionPool(DOM.needPool, copy.reflectionNeed, "need");
  renderReflectionPool(DOM.freedomPool, copy.reflectionFreedom, "freedom");
  renderPickedPrompt();
  renderJourneyNotes();
  renderEchoFeedback();
  renderEchoPage();
}

function renderPromptTabs() {
  const copy = echoJourney[currentLang];
  DOM.promptTabs.innerHTML = "";
  copy.promptGroups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = group.title;
    button.classList.toggle("active", group.key === activePromptGroup);
    button.addEventListener("click", () => {
      activePromptGroup = group.key;
      renderPromptTabs();
      renderPromptShelf();
      persistEchoQuietly();
    });
    DOM.promptTabs.appendChild(button);
  });
}

function renderPromptShelf() {
  const copy = echoJourney[currentLang];
  const group = copy.promptGroups.find((item) => item.key === activePromptGroup) || copy.promptGroups[0];
  DOM.echoPrompts.innerHTML = "";
  group.items.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = prompt;
    button.classList.toggle("active", prompt === selectedEchoPrompt);
    button.addEventListener("click", () => pickEchoPrompt(prompt));
    DOM.echoPrompts.appendChild(button);
  });
}

function pickEchoPrompt(prompt) {
  selectedEchoPrompt = prompt;
  renderPickedPrompt();
  insertAtCursor(DOM.echoTextarea, `${prompt}\n`);
  persistEchoQuietly();
}

function renderPickedPrompt() {
  if (!selectedEchoPrompt) {
    DOM.pickedQuestion.hidden = true;
    DOM.pickedQuestionText.textContent = "";
    return;
  }
  DOM.pickedQuestion.hidden = false;
  DOM.pickedQuestionText.textContent = `${echoJourney[currentLang].pickedPrefix} ${selectedEchoPrompt}`;
}

function renderReflectionPool(container, prompts, noteKey) {
  container.innerHTML = "";
  prompts.forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = prompt;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedEchoPrompt = prompt;
      renderPickedPrompt();
      insertIntoJourneyNote(noteKey, prompt);
    });
    container.appendChild(button);
  });
}

function insertIntoJourneyNote(noteKey, text) {
  const note = DOM.journeyNotes.find((item) => item.dataset.journeyNote === noteKey);
  if (!note) return;
  const current = note.textContent.trim();
  note.textContent = current ? `${current}\n${text}` : text;
  journeyNotes[noteKey] = note.textContent;
  note.focus();
  const range = document.createRange();
  range.selectNodeContents(note);
  range.collapse(false);
  const selection = getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  persistEchoQuietly();
}

function setEchoPage(page) {
  const nextPage = Math.max(0, Math.min(DOM.echoPages.length - 1, page));
  if (nextPage === echoPage) return;
  const direction = nextPage > echoPage ? "next" : "prev";
  playEchoPageTurn(direction, echoPage, nextPage);
  DOM.echoJourney.classList.remove("turn-next", "turn-prev");
  void DOM.echoJourney.offsetWidth;
  DOM.echoJourney.classList.add(direction === "next" ? "turn-next" : "turn-prev");
  echoPage = nextPage;
  renderEchoPage();
  persistEchoQuietly();
}

function playEchoPageTurn(direction, fromPage, toPage) {
  if (!DOM.echoPageShell) return;
  DOM.echoPageShell.querySelectorAll(".book-turn-sheet").forEach((sheet) => sheet.remove());
  const sheet = document.createElement("div");
  const isCoverOpening = fromPage === 0 && toPage === 1;
  const isCoverClosing = fromPage === 1 && toPage === 0;
  sheet.className = [
    "book-turn-sheet",
    isCoverOpening ? "cover-open" : "",
    isCoverClosing ? "cover-close" : "",
    !isCoverOpening && !isCoverClosing && direction === "next" ? "page-forward" : "",
    !isCoverOpening && !isCoverClosing && direction === "prev" ? "page-back" : ""
  ].filter(Boolean).join(" ");
  sheet.setAttribute("aria-hidden", "true");
  DOM.echoPageShell.appendChild(sheet);
  setTimeout(() => sheet.remove(), isCoverOpening || isCoverClosing ? 760 : 620);
}

function renderEchoPage() {
  const copy = echoJourney[currentLang];
  DOM.echoPages.forEach((page, index) => page.classList.toggle("active", index === echoPage));
  DOM.echoPrev.disabled = echoPage === 0;
  DOM.echoNext.disabled = echoPage === DOM.echoPages.length - 1;
  DOM.echoPageMark.textContent = `${copy.pages[echoPage]} · ${echoPage + 1}/${DOM.echoPages.length}`;
  DOM.echoDots.innerHTML = "";
  DOM.echoPages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.ariaLabel = `${copy.pages[index]} ${index + 1}`;
    dot.classList.toggle("active", index === echoPage);
    dot.addEventListener("click", () => setEchoPage(index));
    DOM.echoDots.appendChild(dot);
  });
}

function renderJourneyNotes() {
  const copy = echoJourney[currentLang];
  DOM.journeyNotes.forEach((note) => {
    const key = note.dataset.journeyNote;
    if (note.textContent !== (journeyNotes[key] || "")) note.textContent = journeyNotes[key] || "";
    note.dataset.placeholder = currentLang === "zh"
      ? "在左页自由写下几句。不必完整，也不必正确。"
      : "Write freely on this left page. It does not need to be complete or correct.";
  });
}

function renderEchoFeedback() {
  const copy = echoJourney[currentLang];
  const feedback = makeSelfLoveEcho();
  DOM.echoFeedback.innerHTML = copy.feedbackLabels.map((label, index) => `
    <article>
      <b>${label}</b>
      <p>${feedback[index]}</p>
    </article>
  `).join("");
  DOM.selfLoveDeclaration.textContent = copy.declaration;
}

function makeSelfLoveEcho() {
  const note = DOM.echoTextarea.value.trim();
  const prompt = selectedEchoPrompt;
  const isEn = currentLang === "en";
  if (!note && !prompt) {
    return isEn
      ? [
        echoJourney.en.emptyNote,
        "You do not need to produce a perfect explanation before you are allowed to rest.",
        "Choose one small sentence and write it only for yourself.",
        "I can approach love gently, without abandoning myself."
      ]
      : [
        echoJourney.zh.emptyNote,
        "你不必先把一切解释清楚，才允许自己休息。",
        "先写下一句只说给自己的话，不急着证明它是否正确。",
        "我可以温柔地靠近爱，也不离开自己。"
      ];
  }
  const text = `${prompt} ${note}`;
  const needHint = /(需要|想要|希望|渴望|理解|看见|归属|陪|Need|want|hope|seen|belong|understand)/i.test(text);
  const burdenHint = /(承担|证明|责任|应该|必须|坚持|痛苦|消失|carry|prove|must|should|pain|responsibility)/i.test(text);
  const boundaryHint = /(边界|自由|离开|放手|拒绝|暂停|boundary|free|leave|release|pause|no)/i.test(text);
  if (isEn) {
    return [
      needHint ? "A need for being seen, held, or understood seems to be glowing in this note." : "There may be a quieter need here: to let your own experience count.",
      burdenHint ? "You may not need to prove everything, carry everything, or disappear in order for love to be real." : "You may lay down the demand to know the perfect answer immediately.",
      boundaryHint ? "Try one small boundary: pause before explaining, and name one thing that is yours to keep." : "Try one small response: give yourself ten quiet minutes before choosing what to say next.",
      "I can come close to another person without leaving myself behind."
    ];
  }
  return [
    needHint ? "这段手记里，也许有一个想被看见、被承托或被理解的需要正在发光。" : "这里也许有一个更安静的需要：允许自己的感受被认真对待。",
    burdenHint ? "你可以放下“必须证明全部、承担全部、解释全部”的负担。爱不必以消失自己为代价。" : "你可以暂时放下立刻找到正确答案的压力，让心先有一点空间。",
    boundaryHint ? "试着做一个很小的边界：暂停一次解释，写下此刻哪一部分自己需要被保留。" : "试着做一个很小的回应：给自己十分钟，不急着判断，只让感受落下来。",
    "我可以靠近他人，也可以不离开自己。"
  ];
}

function insertAtCursor(textarea, text) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = `${textarea.value.slice(0, start)}${text}${textarea.value.slice(end)}`;
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();
  persistEchoQuietly();
}

function saveEcho() {
  localStorage.setItem("beforePossessionEcho", JSON.stringify({
    content: DOM.echoTextarea.value,
    selectedLove: selectedEchoLove,
    selectedElement: selectedEchoElement,
    echoPage,
    activePromptGroup,
    selectedEchoPrompt,
    journeyNotes,
    createdAt: getEcho()?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
}

function persistEchoQuietly() {
  saveEcho();
}

function getEcho() {
  try {
    return JSON.parse(localStorage.getItem("beforePossessionEcho") || "null");
  } catch {
    return null;
  }
}

function loadEcho() {
  const saved = getEcho();
  if (!saved) return;
  DOM.echoTextarea.value = saved.content || "";
  selectedEchoLove = saved.selectedLove || selectedEchoLove;
  selectedEchoElement = saved.selectedElement || selectedEchoElement;
  echoPage = Math.max(0, Math.min(DOM.echoPages.length - 1, Number(saved.echoPage) || 0));
  activePromptGroup = saved.activePromptGroup || activePromptGroup;
  selectedEchoPrompt = saved.selectedEchoPrompt || "";
  journeyNotes = saved.journeyNotes || {};
}

function flashEchoStatus(text) {
  DOM.echoStatus.textContent = text;
  DOM.echoStatus.classList.add("show");
  setTimeout(() => DOM.echoStatus.classList.remove("show"), 1400);
}

function bindEvents() {
  languageToggle.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    renderAll();
  });
  DOM.reliefMain.addEventListener("click", () => showLove(loveIndex + 1));
  DOM.loveDots.forEach((dot, index) => dot.addEventListener("click", () => showLove(index)));
  DOM.loveElements.forEach((button) => {
    bindElementSealMotion(button);
    button.addEventListener("click", () => {
      button.classList.remove("burst");
      void button.offsetWidth;
      button.classList.add("burst");
      setTimeout(() => openLoveNote(button.dataset.element), 420);
      setTimeout(() => button.classList.remove("burst"), 900);
    });
  });
  DOM.noteTabs.forEach((button) => button.addEventListener("click", () => {
    activeNoteMode = button.dataset.noteState;
    setNoteSealTilt(activeNoteMode === "shadow" ? -30 : activeNoteMode === "return" ? 30 : 0);
    renderNote();
  }));
  bindNoteSealRotation();
  DOM.noteCard.addEventListener("click", (event) => {
    if (event.target === DOM.noteCard) closeLoveNote();
  });
  if (DOM.detailClose) DOM.detailClose.addEventListener("click", closeDetail);
  if (DOM.detail) {
    DOM.detail.addEventListener("click", (event) => {
      if (event.target === DOM.detail) closeDetail();
    });
  }
  addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLoveNote();
    if (event.key === "Escape") closeDetail();
    if (event.key === "Escape") closeEraDossier();
  });
}

function bindNoteSealRotation() {
  if (!DOM.noteSealMark) return;

  const update = (clientX) => {
    const delta = Math.max(-90, Math.min(90, clientX - noteSealStartX));
    const deg = Math.round((delta / 90) * 30);
    setNoteSealTilt(deg);
    const nextMode = deg < -12 ? "shadow" : deg > 12 ? "return" : "light";
    if (nextMode !== activeNoteMode) {
      activeNoteMode = nextMode;
      renderNote();
    }
  };

  DOM.noteSealMark.addEventListener("pointerdown", (event) => {
    noteSealDragging = true;
    noteSealStartX = event.clientX;
    DOM.noteSealMark.setPointerCapture?.(event.pointerId);
    DOM.noteSealMark.classList.add("dragging");
  });

  DOM.noteSealMark.addEventListener("pointermove", (event) => {
    if (noteSealDragging) update(event.clientX);
  });

  const finish = (event) => {
    if (!noteSealDragging) return;
    noteSealDragging = false;
    DOM.noteSealMark.releasePointerCapture?.(event.pointerId);
    DOM.noteSealMark.classList.remove("dragging");
    setNoteSealTilt(activeNoteMode === "shadow" ? -30 : activeNoteMode === "return" ? 30 : 0);
  };

  DOM.noteSealMark.addEventListener("pointerup", finish);
  DOM.noteSealMark.addEventListener("pointercancel", finish);
}

function setNoteSealTilt(deg) {
  if (!DOM.noteSealMark) return;
  DOM.noteSealMark.style.setProperty("--note-tilt", `${deg}deg`);
}

function bindElementSealMotion(button) {
  const setTilt = (clientX) => {
    const rect = button.getBoundingClientRect();
    const ratio = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width - .5) * 2));
    button.style.setProperty("--seal-tilt", `${ratio * 18}deg`);
    button.style.setProperty("--seal-glow", `${.76 + Math.max(0, ratio) * .34}`);
    button.style.setProperty("--seal-dim", `${1 - Math.max(0, -ratio) * .34}`);
  };

  const resetTilt = () => {
    button.style.setProperty("--seal-tilt", "0deg");
    button.style.setProperty("--seal-glow", ".9");
    button.style.setProperty("--seal-dim", "1");
  };

  button.addEventListener("pointermove", (event) => setTilt(event.clientX));
  button.addEventListener("pointerleave", resetTilt);
  button.addEventListener("pointercancel", resetTilt);
  button.addEventListener("pointerup", resetTilt);
  resetTilt();
}

resizeStars();
drawStars();
addEventListener("resize", resizeStars);
document.body.classList.add("intro-dark");
cacheDOM();
goToPanel(0);
buildTimeline();
buildEcho();
bindIntro();
bindEvents();
bindStageTransitions();
renderAll();
