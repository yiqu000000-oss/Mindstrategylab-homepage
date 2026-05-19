// Talent Ecology Matrix — psychologically meaningful score interpretations
// Extensible template registry for domains, perspectives, patterns, and micro-abilities.

const TEMInterpretations = (() => {
  "use strict";

  const HIGH = 70;
  const LOW = 40;

  const TIERS = [
    { min: 90, key: "exceptional", en: "Exceptional", zh: "卓越" },
    { min: 80, key: "very_high", en: "Very High", zh: "很高" },
    { min: 70, key: "high", en: "High", zh: "较高" },
    { min: 60, key: "moderately_high", en: "Moderately High", zh: "中等偏高" },
    { min: 40, key: "moderate", en: "Moderate", zh: "中等" },
    { min: 30, key: "moderately_low", en: "Moderately Low", zh: "中等偏低" },
    { min: 20, key: "low", en: "Low", zh: "较低" },
    { min: 0, key: "very_low", en: "Very Low", zh: "很低" },
  ];

  const pick = (lang, en, zh) => (lang === "zh" ? zh : en);

  function tierFromPercent(pct) {
    const n = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
    return TIERS.find((t) => n >= t.min) || TIERS[TIERS.length - 1];
  }

  const GENERIC_NARRATIVE = {
    exceptional: {
      en: "This dimension appears to be one of your strongest developmental advantages and is likely to play a central role in your long-term identity and performance.",
      zh: "该维度似乎是你最有力的发展优势之一，并可能在长期自我认同与表现中占据核心位置。",
    },
    very_high: {
      en: "This area represents a highly developed or highly valued capacity that is likely to provide a consistent advantage.",
      zh: "该领域代表高度发展或高度重视的能力，很可能带来持续优势。",
    },
    high: {
      en: "This dimension is clearly above average and is likely to contribute positively across many real-life situations.",
      zh: "该维度明显高于平均水平，并可能在多种真实情境中带来积极贡献。",
    },
    moderately_high: {
      en: "This area appears to be a meaningful strength with considerable developmental potential.",
      zh: "该领域呈现出有意义的优势，并具有可观的发展潜力。",
    },
    moderate: {
      en: "This dimension is present but not strongly differentiated. It may become a strength with targeted development.",
      zh: "该维度存在但尚未明显分化；通过针对性发展可能转化为优势。",
    },
    moderately_low: {
      en: "This area may require additional practice, support, or favorable conditions to develop further.",
      zh: "该领域可能需要更多练习、支持或有利条件才能进一步发展。",
    },
    low: {
      en: "This dimension currently appears less prominent or less developed.",
      zh: "该维度目前在发展画像中不那么突出或尚不成熟。",
    },
    very_low: {
      en: "This area is not presently central to your developmental profile.",
      zh: "该领域目前并非你发展画像中的核心部分。",
    },
  };

  const PERSPECTIVE_BY_TIER = {
    desired: {
      exceptional: {
        en: "You strongly identify with this ability and may view it as central to your ideal self.",
        zh: "你强烈认同这一能力，并可能将其视为理想自我的核心部分。",
      },
      very_high: {
        en: "This capacity is highly valued in your self-concept and motivational landscape.",
        zh: "该能力在你的自我概念与动机结构中具有很高价值。",
      },
      high: {
        en: "You tend to see this as an important part of who you wish to become.",
        zh: "你倾向于将其视为希望成为的重要能力组成部分。",
      },
      moderately_high: {
        en: "You show meaningful aspiration toward developing this dimension.",
        zh: "你对发展该维度表现出有意义的追求。",
      },
      moderate: {
        en: "This ability is somewhat desirable but not a dominant personal theme.",
        zh: "该能力有一定吸引力，但并非主导性个人主题。",
      },
      moderately_low: {
        en: "You may appreciate this skill but do not strongly center your identity on it.",
        zh: "你可能欣赏该技能，但并未将其作为身份核心。",
      },
      low: {
        en: "This dimension is not a primary focus of your ideal self at present.",
        zh: "该维度目前并非你理想自我的主要焦点。",
      },
      very_low: {
        en: "You rarely frame this ability as essential to who you want to be.",
        zh: "你很少将这一能力视为理想自我的必要部分。",
      },
    },
    perceived: {
      exceptional: {
        en: "Others appear to recognize this as a defining strength in you with exceptional consistency.",
        zh: "他人似乎以高度一致的方式将此项视为你的标志性优势。",
      },
      very_high: {
        en: "Others appear to recognize this capacity in you with considerable consistency.",
        zh: "他人似乎相当一致地认可你具备这一能力。",
      },
      high: {
        en: "Others appear to recognize this capacity in you with considerable consistency.",
        zh: "他人似乎较为持续地注意到并认可你的这一能力。",
      },
      moderately_high: {
        en: "You are often seen as competent in this area, though recognition may vary by context.",
        zh: "在特定情境中，你常被视为具备该领域能力，但认可程度可能因场景而异。",
      },
      moderate: {
        en: "Social recognition of this ability appears mixed or situational.",
        zh: "社会对该能力的认可似乎较为混合或情境依赖。",
      },
      moderately_low: {
        en: "Others may not consistently notice this strength in you yet.",
        zh: "他人可能尚未稳定地注意到你的这一优势。",
      },
      low: {
        en: "This capacity may be under-recognized by others relative to your potential.",
        zh: "相对于你的潜力，该能力可能尚未被他人充分识别。",
      },
      very_low: {
        en: "This dimension is rarely highlighted in how others describe your strengths.",
        zh: "在他人对你优势的描述中，该维度很少被突出。",
      },
    },
    ease: {
      exceptional: {
        en: "This ability seems to grow with exceptional naturalness when you invest effort.",
        zh: "当你投入努力时，该能力似乎以卓越的天然顺畅度发展。",
      },
      very_high: {
        en: "This ability seems to grow relatively naturally when you invest effort.",
        zh: "当你投入努力时，该能力似乎相对自然地成长。",
      },
      high: {
        en: "Development in this area often feels smoother than in many comparable skills.",
        zh: "该领域的发展往往比许多同类技能更为顺畅。",
      },
      moderately_high: {
        en: "With structure and repetition, progress here can feel rewarding and sustainable.",
        zh: "在结构与重复支持下，该领域的进步可能令人满足且可持续。",
      },
      moderate: {
        en: "Progress is possible but may require deliberate practice and feedback.",
        zh: "进步是可能的，但可能需要刻意练习与反馈。",
      },
      moderately_low: {
        en: "Development may feel effortful even when motivation is present.",
        zh: "即使有动机，发展过程也可能感到费力。",
      },
      low: {
        en: "This area may demand sustained training relative to your other strengths.",
        zh: "相对于你的其他优势，该领域可能需要更持续的训练。",
      },
      very_low: {
        en: "Growth here may feel unusually slow or effort-intensive for you.",
        zh: "对你来说，该领域的成长可能异常缓慢或费力。",
      },
    },
    constraint: {
      exceptional: {
        en: "Significant environmental, emotional, or structural barriers may strongly limit expression of this potential.",
        zh: "显著的环境、情绪或结构性障碍可能强烈限制该潜力的表达。",
      },
      very_high: {
        en: "Although potential may be strong, notable barriers may interfere with consistent expression.",
        zh: "尽管潜力可能很强，但明显障碍可能干扰其稳定表达。",
      },
      high: {
        en: "Although the potential is strong, significant barriers may interfere with its expression.",
        zh: "尽管潜力较强，但显著障碍可能干扰其表达。",
      },
      moderately_high: {
        en: "Some recurring constraints may slow development or visibility in this area.",
        zh: "一些反复出现的限制可能减缓该领域的发展或可见度。",
      },
      moderate: {
        en: "Moderate friction exists; awareness and support can reduce its impact.",
        zh: "存在中等程度的摩擦；觉察与支持可降低其影响。",
      },
      moderately_low: {
        en: "Constraints appear manageable with appropriate conditions and planning.",
        zh: "在适当条件与规划下，限制似乎可控。",
      },
      low: {
        en: "Few major barriers appear to block development in this dimension.",
        zh: "该维度似乎少有重大障碍阻碍发展。",
      },
      very_low: {
        en: "Environmental friction in this area appears minimal at present.",
        zh: "该领域目前的环境摩擦似乎很小。",
      },
    },
  };

  const PATTERNS = {
    A: {
      title: { en: "Core Signature Strength", zh: "核心标志优势" },
      narrative: {
        en: "This is both deeply valued, naturally developable, and recognized by others—a hallmark of a core signature strength.",
        zh: "这既被深度重视、又较易自然发展，且被他人认可——是核心标志优势的典型特征。",
      },
    },
    B: {
      title: { en: "Aspirational but Effort-Intensive", zh: "理想强烈但发展困难" },
      narrative: {
        en: "You may strongly desire this ability, but its development may require sustained training and structured support.",
        zh: "你可能强烈渴望该能力，但其发展可能需要持续训练与结构化支持。",
      },
    },
    C: {
      title: { en: "Hidden Potential", zh: "隐藏潜力" },
      narrative: {
        en: "This ability may be stronger and more natural for you than others currently recognize.",
        zh: "该能力对你来说可能更强、更自然，但尚未被他人充分识别。",
      },
    },
    D: {
      title: { en: "Externally Recognized, Not Centrally Ideal", zh: "被认可但并非核心追求" },
      narrative: {
        en: "Others may see this as a strength, yet it may not sit at the center of who you wish to become.",
        zh: "他人可能视其为优势，但它未必位于你理想自我的中心。",
      },
    },
    E: {
      title: { en: "Blocked Aspiration", zh: "受限制的重要追求" },
      narrative: {
        en: "You value this domain highly, yet substantial barriers may block its full expression.",
        zh: "你高度重视该领域，但显著障碍可能阻碍其充分表达。",
      },
    },
    F: {
      title: { en: "Suppressed Natural Strength", zh: "被压制的自然优势" },
      narrative: {
        en: "Development may feel natural internally, yet environmental constraints may suppress outward expression.",
        zh: "内在发展可能较自然，但环境限制可能压制外在表达。",
      },
    },
    G: {
      title: { en: "Emerging Strength Not Yet Socially Recognized", zh: "尚未被社会充分识别的新兴优势" },
      narrative: {
        en: "You value and develop this capacity readily, but social recognition may still be catching up.",
        zh: "你重视且较易发展该能力，但社会认可可能仍在追赶。",
      },
    },
  };

  const DOMAIN_CAREERS = {
    linguistic: {
      en: "Writing, teaching, law, translation, public speaking, media, editing, communications",
      zh: "写作、教学、法律、翻译、演讲、媒体、编辑、传播",
    },
    auditory: {
      en: "Language acquisition, music performance, sound engineering, audio production, speech therapy",
      zh: "语言习得、音乐表演、音响工程、音频制作、言语治疗",
    },
    analytical: {
      en: "Research, mathematics, data science, engineering, strategy, finance, policy analysis",
      zh: "研究、数学、数据科学、工程、战略、金融、政策分析",
    },
    spatial: {
      en: "Architecture, design, engineering, surgery, navigation, industrial design, urban planning",
      zh: "建筑、设计、工程、外科、导航、工业设计、城市规划",
    },
    memory: {
      en: "Academics, performance arts, technical specialties, languages, medicine, competitive learning",
      zh: "学术、表演艺术、技术专业、语言、医学、竞技学习",
    },
    creative: {
      en: "Arts, advertising, innovation, entertainment, product design, fiction, brand strategy",
      zh: "艺术、广告、创新、娱乐、产品设计、虚构创作、品牌策略",
    },
    systems: {
      en: "Theory building, consulting, organizational design, systems engineering, knowledge architecture",
      zh: "理论构建、咨询、组织设计、系统工程、知识架构",
    },
    cross_domain: {
      en: "Interdisciplinary research, innovation, conceptual design, integrative leadership, science communication",
      zh: "跨学科研究、创新、概念设计、整合型领导、科学传播",
    },
    interpersonal: {
      en: "Counseling, leadership, negotiation, human resources, coaching, mediation, community work",
      zh: "咨询、领导、谈判、人力资源、教练、调解、社区工作",
    },
    leadership: {
      en: "Management, entrepreneurship, politics, organizational leadership, advocacy, team direction",
      zh: "管理、创业、政治、组织领导、倡导、团队引领",
    },
    moral: {
      en: "Ethics, law, governance, education, social impact, compliance, philosophy",
      zh: "伦理、法律、治理、教育、社会影响、合规、哲学",
    },
    operational: {
      en: "Craft trades, surgery, laboratory work, manufacturing, precision arts, technical operations",
      zh: "手工艺、外科、实验室工作、制造、精密艺术、技术操作",
    },
    physical: {
      en: "Athletics, dance, physical therapy, performing arts, outdoor professions, movement coaching",
      zh: "竞技运动、舞蹈、理疗、表演艺术、户外专业、动作教练",
    },
  };

  const DOMAIN_SECTIONS = {
    linguistic: {
      meaning: {
        en: "Your linguistic profile reflects how you encode, refine, and deploy meaning through language.",
        zh: "你的语言画像反映你如何通过语言编码、精炼与传递意义。",
      },
      manifestations: {
        en: "You may notice precision in word choice, enjoyment of reading or debate, and sensitivity to tone and implication.",
        zh: "你可能注意到选词精准、享受阅读或辩论，并对语气与隐含意义敏感。",
      },
      advantages: {
        en: "Contexts requiring explanation, persuasion, documentation, or cross-cultural communication.",
        zh: "需要解释、说服、文档化或跨文化沟通的情境。",
      },
      friction: {
        en: "Time pressure, ambiguous audiences, or environments that punish nuance may create friction.",
        zh: "时间压力、受众模糊或压抑细微差别的环境可能造成摩擦。",
      },
      development: {
        en: "Read widely, write or speak weekly, and seek feedback on clarity—not only volume.",
        zh: "广泛阅读并坚持每周口头或书面输出，收集关于清晰度的反馈。",
      },
    },
    auditory: {
      meaning: {
        en: "This domain captures sensitivity to pitch, rhythm, timbre, and auditory memory.",
        zh: "该领域涵盖对音高、节奏、音色与听觉记忆的敏感度。",
      },
      manifestations: {
        en: "You may pick up accents quickly, remember melodies, or notice subtle sound differences others miss.",
        zh: "你可能较快习得口音、记住旋律，或察觉他人忽略的声音差异。",
      },
      advantages: {
        en: "Music, language learning, listening-heavy collaboration, and sound-rich environments.",
        zh: "音乐、语言学习、以聆听为主的协作与声音丰富的环境。",
      },
      friction: {
        en: "Noisy environments, poor audio tools, or tasks requiring long silent focus may drain you.",
        zh: "嘈杂环境、劣质音频工具或需长时间静默专注的任务可能消耗你。",
      },
      development: {
        en: "Use active listening drills, short imitation sessions, and low-noise practice spaces.",
        zh: "进行主动聆听练习、短时模仿，并在低噪音环境中训练。",
      },
    },
    analytical: {
      meaning: {
        en: "Analytical reasoning reflects structured thinking, logic, and comfort with abstraction.",
        zh: "分析推理反映结构化思维、逻辑能力与抽象舒适度。",
      },
      manifestations: {
        en: "You may enjoy puzzles, systematic planning, and spotting inconsistencies in arguments or data.",
        zh: "你可能享受解谜、系统规划，并善于发现论证或数据中的不一致。",
      },
      advantages: {
        en: "Research, strategy, debugging, modeling, and any role requiring rigorous inference.",
        zh: "研究、战略、排错、建模及任何需要严谨推断的角色。",
      },
      friction: {
        en: "Ambiguity without data, purely political decisions, or chaotic workflows may frustrate progress.",
        zh: "缺乏数据的模糊性、纯政治决策或混乱流程可能阻碍进展。",
      },
      development: {
        en: "Pair abstract study with applied problems and peer review of your reasoning.",
        zh: "将抽象学习与实际问题配对，并请他人审视你的推理。",
      },
    },
    spatial: {
      meaning: {
        en: "Spatial thinking involves mental imagery, layout, and structural visualization.",
        zh: "空间思维涉及心理意象、布局与结构可视化。",
      },
      manifestations: {
        en: "You may think in diagrams, navigate intuitively, or redesign physical or digital layouts mentally.",
        zh: "你可能以图示思考、直觉导航，或在心中重构实体或数字布局。",
      },
      advantages: {
        en: "Design, engineering, navigation, surgery, and visual planning tasks.",
        zh: "设计、工程、导航、外科与视觉规划任务。",
      },
      friction: {
        en: "Poor spatial information, cluttered interfaces, or text-only workflows may slow you.",
        zh: "空间信息不足、界面杂乱或纯文本流程可能拖慢你。",
      },
      development: {
        en: "Sketch, model, or navigate real layouts—spatial talent grows through embodied practice.",
        zh: "通过素描、建模或实地导航训练——空间能力在具身实践中成长。",
      },
    },
    memory: {
      meaning: {
        en: "Memory and pattern retention shape how you store and retrieve structured information.",
        zh: "记忆与模式保持塑造你如何存储与提取结构化信息。",
      },
      manifestations: {
        en: "You may recall sequences, formulas, or narratives with unusual reliability.",
        zh: "你可能以不寻常的稳定度回忆序列、公式或叙事。",
      },
      advantages: {
        en: "Exams, performance, technical mastery, languages, and detail-heavy professions.",
        zh: "考试、表演、技术精通、语言与细节密集型职业。",
      },
      friction: {
        en: "Sleep deprivation, stress, or lack of rehearsal time may sharply reduce performance.",
        zh: "睡眠不足、压力或缺乏排练时间可能显著降低表现。",
      },
      development: {
        en: "Use spaced repetition, chunking, and retrieval practice rather than passive review.",
        zh: "使用间隔重复、组块化与提取练习，而非被动复习。",
      },
    },
    creative: {
      meaning: {
        en: "Creative imagination reflects generativity, symbolism, and divergent ideation.",
        zh: "创造想象反映生成力、象征性与发散性思维。",
      },
      manifestations: {
        en: "You may generate novel metaphors, reframe problems, or visualize unconventional solutions.",
        zh: "你可能产生新颖隐喻、重构问题，或想象非常规解决方案。",
      },
      advantages: {
        en: "Innovation, arts, branding, entrepreneurship, and early-stage design.",
        zh: "创新、艺术、品牌、创业与早期设计。",
      },
      friction: {
        en: "Rigid hierarchies, excessive criticism early in process, or burnout may block flow.",
        zh: "僵化层级、过程早期过度批评或倦怠可能阻断心流。",
      },
      development: {
        en: "Protect ideation time, combine constraints with play, and ship small creative prototypes.",
        zh: "保护构思时间，将约束与 playful 探索结合，并完成小型创意原型。",
      },
    },
    systems: {
      meaning: {
        en: "Systems translation is your capacity to extract mechanisms and build transferable models.",
        zh: "系统转译是你提取机制并构建可迁移模型的能力。",
      },
      manifestations: {
        en: "You may explain complex experiences with frameworks others find clarifying.",
        zh: "你可能用他人觉得清晰的框架解释复杂经验。",
      },
      advantages: {
        en: "Consulting, research, organizational design, and integrative problem solving.",
        zh: "咨询、研究、组织设计与整合性问题解决。",
      },
      friction: {
        en: "Over-abstraction without action, or teams that resist conceptual language.",
        zh: "缺乏行动的过度抽象，或抗拒概念语言的团队。",
      },
      development: {
        en: "Document models, test them in practice, and refine with real-world feedback loops.",
        zh: "记录模型、在实践中检验，并以真实反馈循环 refine。",
      },
    },
    cross_domain: {
      meaning: {
        en: "Cross-domain integration reflects linking concepts across disciplines—a flagship integrative capacity.",
        zh: "跨领域整合反映联结不同学科概念的能力——旗舰整合性维度。",
      },
      manifestations: {
        en: "You may see parallels between fields, translate ideas across domains, or innovate at intersections.",
        zh: "你可能看见领域间平行关系、跨域转译思想，或在交叉点创新。",
      },
      advantages: {
        en: "Interdisciplinary research, innovation labs, conceptual design, and integrative leadership.",
        zh: "跨学科研究、创新实验室、概念设计与整合型领导。",
      },
      friction: {
        en: "Siloed institutions or roles demanding narrow specialization only.",
        zh: "仅要求狭隘专业化的孤岛机构或角色。",
      },
      development: {
        en: "Maintain two depth areas and one bridging project that forces synthesis.",
        zh: "保持两个深度领域与一个迫使综合的桥接项目。",
      },
    },
    interpersonal: {
      meaning: {
        en: "Interpersonal insight reflects reading emotions, motives, and social patterns.",
        zh: "人际洞察反映解读情绪、动机与社会模式的能力。",
      },
      manifestations: {
        en: "You may sense tension before it surfaces, infer unstated needs, or mediate effectively.",
        zh: "你可能在冲突浮现前感知张力、推断未言明的需求，或有效调解。",
      },
      advantages: {
        en: "Counseling, leadership, negotiation, coaching, and collaborative cultures.",
        zh: "咨询、领导、谈判、教练与协作文化。",
      },
      friction: {
        en: "Emotional overload, dishonest environments, or lack of boundaries may exhaust you.",
        zh: "情绪过载、不诚实环境或缺乏边界可能使你耗竭。",
      },
      development: {
        en: "Practice reflective listening, name patterns without judgment, and protect recovery time.",
        zh: "练习反思性倾听、不带评判地命名模式，并保护恢复时间。",
      },
    },
    leadership: {
      meaning: {
        en: "Leadership and influence reflect mobilizing attention, trust, and collective direction.",
        zh: "领导与影响反映动员注意力、信任与集体方向的能力。",
      },
      manifestations: {
        en: "You may naturally frame vision, coordinate groups, or shift room energy.",
        zh: "你可能自然勾勒愿景、协调群体或改变场域能量。",
      },
      advantages: {
        en: "Management, entrepreneurship, politics, advocacy, and mission-driven teams.",
        zh: "管理、创业、政治、倡导与使命驱动团队。",
      },
      friction: {
        en: "Micromanagement cultures, unclear authority, or chronic conflict may block impact.",
        zh: "微观管理文化、权威不清或长期冲突可能阻碍影响。",
      },
      development: {
        en: "Clarify purpose, delegate, and build feedback channels with those you lead.",
        zh: "澄清目的、授权，并与你所引领者建立反馈渠道。",
      },
    },
    moral: {
      meaning: {
        en: "Moral and evaluative judgment reflects principled reasoning about fairness and trade-offs.",
        zh: "价值判断反映关于公平与权衡的原则性推理。",
      },
      manifestations: {
        en: "You may weigh ethics explicitly, notice injustice quickly, or hold consistent standards.",
        zh: "你可能明确权衡伦理、迅速察觉不公，或持有一致标准。",
      },
      advantages: {
        en: "Governance, education, law, social impact, and trust-sensitive roles.",
        zh: "治理、教育、法律、社会影响与高度信任敏感角色。",
      },
      friction: {
        en: "Moral injury, cynicism, or value misalignment with organizations may create strain.",
        zh: "道德创伤、犬儒主义或与组织价值观错位可能造成压力。",
      },
      development: {
        en: "Articulate principles, seek aligned communities, and practice ethical case analysis.",
        zh: "阐明原则、寻找价值一致社群，并练习伦理案例分析。",
      },
    },
    operational: {
      meaning: {
        en: "Operational precision reflects fine motor control and reliable procedural execution.",
        zh: "操作精度反映精细动作控制与可靠流程执行。",
      },
      manifestations: {
        en: "You may excel at hands-on tasks requiring accuracy, timing, and tool fluency.",
        zh: "你可能在需要准确度、时机与工具熟练度的动手任务中表现出色。",
      },
      advantages: {
        en: "Craft trades, surgery, lab work, manufacturing, and technical operations.",
        zh: "手工艺、外科、实验室、制造与技术操作。",
      },
      friction: {
        en: "Rushed deadlines, poor tools, or fatigue may increase error rates.",
        zh: "仓促截止、劣质工具或疲劳可能提高错误率。",
      },
      development: {
        en: "Deliberate practice with immediate feedback; standardize setups and safety checks.",
        zh: "进行有即时反馈的刻意练习；标准化设置与安全检查。",
      },
    },
    physical: {
      meaning: {
        en: "Physical coordination reflects balance, movement learning, and bodily awareness.",
        zh: "身体协调反映平衡、动作学习与身体觉察。",
      },
      manifestations: {
        en: "You may learn movement patterns quickly or sense posture and rhythm in your body.",
        zh: "你可能快速学习动作模式，或在身体中感知姿态与节奏。",
      },
      advantages: {
        en: "Athletics, dance, performing arts, physical therapy, and movement coaching.",
        zh: "竞技、舞蹈、表演艺术、理疗与动作教练。",
      },
      friction: {
        en: "Injury, sedentary routines, or environments ignoring embodied learning may limit growth.",
        zh: "受伤、久坐Routine或忽视具身学习的环境可能限制成长。",
      },
      development: {
        en: "Progressive skill drills, cross-training, and mindful body check-ins.",
        zh: "渐进技能训练、交叉训练与正念身体觉察。",
      },
    },
  };

  const MICRO_SNIPPETS = {
    accent_acquisition: {
      en: "You appear to learn pronunciation patterns more quickly than average.",
      zh: "你似乎比平均水平更快习得发音模式。",
    },
    numerical_visual_mapping: {
      en: "You naturally connect abstract quantitative structures with visual representations.",
      zh: "你自然地将抽象数量结构与视觉表征相联结。",
    },
    theory_phenomenon_translation: {
      en: "You readily move between real-world observations and abstract explanatory models.",
      zh: "你能在现实观察与抽象解释模型之间自如转换。",
    },
    theory_to_practice: {
      en: "You tend to convert theoretical insight into actionable practice with relative ease.",
      zh: "你倾向于相对轻松地将理论洞见转化为可行动实践。",
    },
    oral_fluency: {
      en: "Spoken expression may flow with notable ease in familiar contexts.",
      zh: "在熟悉情境中，口头表达可能相当流畅。",
    },
    deductive_logic: {
      en: "Structured logical deduction may be a reliable cognitive resource for you.",
      zh: "结构化演绎推理可能是你可靠的认知资源。",
    },
  };

  const SECTION_LABELS = {
    meaning: { en: "Current Meaning", zh: "当前含义" },
    manifestations: { en: "Everyday Manifestations", zh: "日常表现" },
    advantages: { en: "Advantage Contexts", zh: "优势场景" },
    careers: { en: "Career and Task Relevance", zh: "职业与任务意义" },
    development: { en: "Developmental Suggestions", zh: "发展建议" },
    friction: { en: "Potential Friction Points", zh: "潜在卡点" },
    pattern: { en: "Pattern Interpretation", zh: "模式解读" },
    perspectives: { en: "Four-Perspective Profile", zh: "四视角画像" },
    resourceEcology: { en: "Developmental Resource Ecology", zh: "发展资源生态" },
  };

  const PERSPECTIVE_LABELS = {
    desired: { en: "Desired Talent (Ideal)", zh: "理想天赋" },
    perceived: { en: "Socially Perceived Talent", zh: "他人感知天赋" },
    ease: { en: "Developmental Ease", zh: "发展顺畅度" },
    constraint: { en: "Constraint Profile", zh: "限制条件" },
  };

  /** @param {number} pct @param {string} lang */
  function formatScoreLine(pct, lang) {
    const tier = tierFromPercent(pct);
    const pctRounded = Math.round(Number(pct) || 0);
    return `${pctRounded}% · ${pick(lang, tier.en, tier.zh)}`;
  }

  function labelScore(pct, lang) {
    const tier = tierFromPercent(pct);
    const pctRounded = Math.round(Number(pct) || 0);
    return {
      pct: pctRounded,
      tierKey: tier.key,
      label: pick(lang, tier.en, tier.zh),
      bilingualLabel: pick(lang, tier.en, tier.zh),
      display: formatScoreLine(pct, lang),
      narrative: pick(lang, GENERIC_NARRATIVE[tier.key].en, GENERIC_NARRATIVE[tier.key].zh),
    };
  }

  function perspectiveNarrative(perspective, pct, lang) {
    const tier = tierFromPercent(pct);
    const bank = PERSPECTIVE_BY_TIER[perspective] || PERSPECTIVE_BY_TIER.desired;
    const entry = bank[tier.key] || bank.moderate;
    return pick(lang, entry.en, entry.zh);
  }

  function isHigh(pct) {
    return (Number(pct) || 0) >= HIGH;
  }
  function isLow(pct) {
    return (Number(pct) || 0) < LOW;
  }

  /** @param {{ desired, perceived, ease, constraint }} p */
  function detectPattern(p) {
    const d = p.desired ?? 0;
    const per = p.perceived ?? 0;
    const e = p.ease ?? 0;
    const c = p.constraint ?? 0;
    if (isHigh(d) && isHigh(e) && isHigh(per)) return "A";
    if (isHigh(d) && isHigh(e) && isLow(per)) return "G";
    if (isHigh(d) && isLow(e)) return "B";
    if (isHigh(e) && isLow(per) && !isHigh(d)) return "C";
    if (isHigh(per) && isLow(d)) return "D";
    if (isHigh(d) && isHigh(c)) return "E";
    if (isHigh(e) && isHigh(c)) return "F";
    return null;
  }

  function getPattern(patternKey, lang) {
    if (!patternKey || !PATTERNS[patternKey]) return null;
    const p = PATTERNS[patternKey];
    return {
      title: pick(lang, p.title.en, p.title.zh),
      narrative: pick(lang, p.narrative.en, p.narrative.zh),
    };
  }

  function microSentence(microKey, pct, lang, microLabelText) {
    const custom = MICRO_SNIPPETS[microKey];
    if (custom) {
      return pick(lang, custom.en, custom.zh);
    }
    const tier = tierFromPercent(pct);
    const name = microLabelText || microKey;
    if (lang === "zh") {
      return `在「${name}」上，你的表现处于${tier.zh}水平，${GENERIC_NARRATIVE[tier.key].zh}`;
    }
    return `On ${name}, your profile reads as ${tier.en.toLowerCase()}: ${GENERIC_NARRATIVE[tier.key].en}`;
  }

  /**
   * Build structured domain interpretation.
   * @param {string} domainKey
   * @param {object} percentages
   * @param {string} lang
   * @param {string[]} [resourceLines]
   */
  function buildDomainInterpretation(domainKey, percentages, lang, resourceLines = []) {
    const p = percentages || {};
    const overallPct =
      p.overall ??
      Math.round(
        ((p.desired ?? 0) + (p.perceived ?? 0) + (p.ease ?? 0) + (p.constraint ?? 0)) / 4,
      );
    const overall = labelScore(overallPct, lang);
    const sections = DOMAIN_SECTIONS[domainKey] || DOMAIN_SECTIONS.analytical;
    const careers = DOMAIN_CAREERS[domainKey] || DOMAIN_CAREERS.analytical;
    const patternKey = detectPattern(p);
    const pattern = getPattern(patternKey, lang);

    const perspectives = ["desired", "perceived", "ease", "constraint"].map((key) => {
      const pct = p[key] ?? 0;
      const scored = labelScore(pct, lang);
      return {
        key,
        title: pick(lang, PERSPECTIVE_LABELS[key].en, PERSPECTIVE_LABELS[key].zh),
        display: scored.display,
        narrative: perspectiveNarrative(key, pct, lang),
        scored,
      };
    });

    return {
      domainKey,
      overall,
      pattern,
      perspectives,
      resourceLines,
      sections: {
        meaning: pick(lang, sections.meaning.en, sections.meaning.zh),
        manifestations: pick(lang, sections.manifestations.en, sections.manifestations.zh),
        advantages: pick(lang, sections.advantages.en, sections.advantages.zh),
        careers: pick(lang, careers.en, careers.zh),
        development: pick(lang, sections.development.en, sections.development.zh),
        friction: pick(lang, sections.friction.en, sections.friction.zh),
      },
    };
  }

  const OVERALL_SECTION_TITLES = {
    themes: { en: "Core Development Themes", zh: "核心发展主题" },
    manifestations: { en: "Everyday Manifestations", zh: "日常表现" },
    alignment: { en: "Developmental Alignment", zh: "发展对齐情况" },
    constraint: { en: "Constraints & Developmental Costs", zh: "限制与代价" },
    hidden: { en: "Hidden Potential", zh: "隐藏潜力" },
    environment: { en: "Optimal Development Environment", zh: "最佳发展环境" },
    strategy: { en: "Strategic Recommendations", zh: "战略建议" },
  };

  const DOMAIN_ESSENCE = {
    linguistic: {
      en: "translating complex thought into language that others can receive, remember, and act upon",
      zh: "将复杂思想转化为他人能够理解、记住并据此行动的语言",
    },
    auditory: {
      en: "sensing subtle patterns in sound, rhythm, and tone that others may overlook",
      zh: "捕捉他人容易忽略的声音、节奏与音调上的细微差异",
    },
    analytical: {
      en: "structuring ambiguity into clear models, arguments, and decisions",
      zh: "将模糊情境结构化为清晰的模型、论证与判断",
    },
    spatial: {
      en: "thinking through layout, form, and structural relationships in space",
      zh: "通过布局、形态与空间结构关系来理解问题",
    },
    memory: {
      en: "holding patterns, sequences, and detail with unusual stability over time",
      zh: "在较长时间内稳定保持模式、序列与细节",
    },
    creative: {
      en: "generating reframes, symbols, and possibilities that open new paths",
      zh: "生成重构、象征与新可能性，从而打开新的路径",
    },
    systems: {
      en: "extracting mechanisms from experience and building transferable frameworks",
      zh: "从经验中提取机制并构建可迁移的框架",
    },
    cross_domain: {
      en: "seeking structural links across disciplines and translating between different representational worlds",
      zh: "在不同知识体系之间寻找结构性关联，并在不同表征世界之间转译",
    },
    interpersonal: {
      en: "reading emotional subtext, motives, and social dynamics with nuance",
      zh: "细腻地解读情绪潜台词、动机与社会动力",
    },
    leadership: {
      en: "mobilizing attention, trust, and collective direction toward a clearer horizon",
      zh: "动员注意力、信任与集体方向，使群体朝向更清晰的前景",
    },
    moral: {
      en: "weighing principles, fairness, and long-term consequences in judgment",
      zh: "在判断中权衡原则、公平与长期后果",
    },
    operational: {
      en: "executing precise procedures and refining skill through embodied repetition",
      zh: "通过具身重复执行精确流程并打磨技能",
    },
    physical: {
      en: "learning through movement, balance, and bodily coordination",
      zh: "通过动作、平衡与身体协调来学习",
    },
  };

  function escHtml(s) {
    return String(s ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]),
    );
  }

  function qualitativeLabel(pct, lang) {
    const t = tierFromPercent(pct);
    return pick(lang, t.en, t.zh);
  }

  function qualitativeLabelFromIndex(index0to1, lang) {
    return qualitativeLabel(Math.round((Number(index0to1) || 0) * 100), lang);
  }

  function formatBracketedDomains(keys, domainLabels, lang) {
    const names = keys.map((k) => domainLabels(k)).filter(Boolean);
    if (!names.length) return lang === "zh" ? "【多元整合能力】" : "integrative strengths across several domains";
    if (lang === "zh") {
      if (names.length === 1) return `【${names[0]}】`;
      if (names.length === 2) return `【${names[0]}】与【${names[1]}】`;
      return `【${names.slice(0, -1).join("】、【")}】与【${names[names.length - 1]}】`;
    }
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
  }

  function domainEssencePhrase(key, lang) {
    const e = DOMAIN_ESSENCE[key];
    if (e) return pick(lang, e.en, e.zh);
    const sec = DOMAIN_SECTIONS[key] || DOMAIN_SECTIONS.analytical;
    return pick(lang, sec.meaning.en, sec.meaning.zh);
  }

  function domainManifestationPhrase(key, lang) {
    const sec = DOMAIN_SECTIONS[key] || DOMAIN_SECTIONS.analytical;
    return pick(lang, sec.manifestations.en, sec.manifestations.zh);
  }

  function buildDomainInteraction(themes, lang) {
    const phrases = themes.slice(0, 3).map((k) => domainEssencePhrase(k, lang));
    if (lang === "zh") {
      if (phrases.length === 1) {
        return `这意味着，你更可能在围绕这一能力的任务与角色中，感受到意义感与能力感的自然汇聚。`;
      }
      return `这意味着，你不仅倾向于${phrases[0]}，也善于${phrases.slice(1).join("，并")}。相比单纯掌握某一项技能，你更可能在“连接”“解释”和“组织”不同元素的过程中展现出独特优势。`;
    }
    if (phrases.length === 1) {
      return `In practice, you are most alive when work repeatedly calls on ${phrases[0]}.`;
    }
    return `Together, these themes suggest a profile oriented toward ${phrases.join("; ")}—less a single narrow skill than a capacity to connect, explain, and organize complexity.`;
  }

  function buildAlignmentNarrative(alignIndex, lang) {
    const label = qualitativeLabelFromIndex(alignIndex, lang);
    if (lang === "zh") {
      if (alignIndex >= 0.72) {
        return `从整体来看，你的发展对齐程度为${label}。这通常意味着，你所真正重视的能力、他人能够识别到的优势，以及你在实践中相对容易成长的方向之间存在较强的一致性。换句话说，你当前的追求并非脱离现实的理想，而是在多个层面上具备持续深化的基础。`;
      }
      if (alignIndex >= 0.52) {
        return `从整体来看，你的发展对齐程度为${label}。理想追求、他人感知与发展顺畅度之间大体同向，但仍存在值得留意的落差：某些你高度重视的方向，可能尚未被充分看见，或在现实中需要更多刻意设计才能顺畅展开。`;
      }
      return `从整体来看，你的发展对齐程度为${label}。你所重视的能力、他人对你的识别方式，以及实际发展中的顺畅度之间可能存在明显张力。这并不否定你的潜力，反而提示你需要更有意识地进行对齐——选择更匹配的受众、节奏与支持结构。`;
    }
    if (alignIndex >= 0.72) {
      return `Taken as a whole, your developmental alignment reads as ${label.toLowerCase()}. What you value, what others tend to recognize in you, and what you can grow with relative fluency appear to pull in a similar direction—your aspirations are not merely wishful, but grounded in a coherent ecology of strengths.`;
    }
    if (alignIndex >= 0.52) {
      return `Your developmental alignment is ${label.toLowerCase()}: the major strands of desire, recognition, and ease generally converge, though meaningful gaps remain. Some capacities you care about deeply may still be under-recognized, or may require deliberate scaffolding before they feel natural in daily life.`;
    }
    return `Your alignment is ${label.toLowerCase()}, indicating real tension between ideal self, social recognition, and developmental ease. This is not a verdict against your potential—it is an invitation to redesign context: audience, pacing, and the kinds of support that make your strengths visible and sustainable.`;
  }

  function buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang) {
    const loadLabel = qualitativeLabelFromIndex(loadIndex, lang);
    const overlap = themes.filter((k) => constraintDomainKeys.includes(k));
    const overlapNames = overlap.map((k) => domainLabels(k));
    if (lang === "zh") {
      let text = `与此同时，你的限制负荷为${loadLabel}。`;
      if (loadIndex >= 0.62) {
        text +=
          "这提示你：虽然核心方向具有显著潜力，但其发展往往需要持续投入较多的心理能量、时间与环境协调成本。你可能在追求理想或回应外部期待的过程中承受较大压力，因此比一般人更需要适合自己的支持方式。";
      } else if (loadIndex >= 0.45) {
        text += "环境摩擦与内在张力会以中等强度出现；若忽视恢复与支持，优势领域也可能在高压下变得耗竭。";
      } else {
        text += "当前限制并非主导因素，但仍建议在扩张目标时保留缓冲，以免优势表达被隐性成本侵蚀。";
      }
      if (overlap.length) {
        text += `值得注意的是，部分限制恰恰与核心发展方向有所重叠（如${overlapNames.join("、")}）。这意味着“最重要的主题”往往也是“最需要精心设计的主题”。`;
      } else if (constraintDomainKeys.length) {
        text += `限制较突出的领域包括${constraintDomainKeys.map((k) => domainLabels(k)).join("、")}，宜为其配置结构化支持、时间缓冲与降低羞耻触发的环境。`;
      }
      return text;
    }
    let text = `At the same time, your constraint profile is ${loadLabel.toLowerCase()}. `;
    if (loadIndex >= 0.62) {
      text +=
        "High-potential directions may demand sustained psychological energy, time, and environmental negotiation; pressure to meet ideals or external expectations can be costly without the right scaffolding.";
    } else if (loadIndex >= 0.45) {
      text += "Friction is present at a moderate level—without recovery and support, even strong domains can become draining under chronic strain.";
    } else {
      text += "Constraints are not dominant, yet buffers remain wise as you expand ambition.";
    }
    if (overlap.length) {
      text += ` Notably, friction overlaps your core themes (${overlapNames.join(", ")}): what matters most may also cost most to develop well.`;
    } else if (constraintDomainKeys.length) {
      text += ` Elevated friction may concentrate in ${constraintDomainKeys.map((k) => domainLabels(k)).join(", ")}—consider mentorship, pacing, and environments that reduce shame around early attempts.`;
    }
    return text;
  }

  function buildHiddenPotentialNarrative(hasHidden, lang) {
    if (!hasHidden) {
      return lang === "zh"
        ? "从隐藏潜力角度看，你当前外化的优势与内在可发展资源大体一致；持续通过可见作品与实践巩固即可。"
        : "Regarding hidden potential, what you express outwardly appears largely consistent with what your profile can still grow; steady visible practice will consolidate gains.";
    }
    return lang === "zh"
      ? "值得注意的是，你的潜力并不一定会立即被完整识别。某些微能力可能尚未充分外化，或尚未在现实环境中形成稳定成果。随着这些能力通过可见项目、作品和长期实践逐步呈现，它们更有可能转化为他人可以明确感受到的影响力与专业价值。"
      : "It is important to recognize that some of your capacity may not yet be fully legible to others. Certain micro-strengths may remain partially internalized until they are anchored in visible projects, artifacts, and long-horizon practice—at which point they can convert into influence others can name and trust.";
  }

  function buildEnvironmentNarrative(optimalKeys, domainLabels, resourceLines, lang) {
    const optimalNames = optimalKeys.map((k) => domainLabels(k)).filter(Boolean);
    if (lang === "zh") {
      let text =
        "从发展生态的角度看，你最适合的环境通常具有以下特征：既提供足够的自主探索空间，又能在关键阶段给予清晰反馈；既尊重你的思考节奏，又在需要时提供具体支持。";
      if (optimalNames.length) {
        text += `在${optimalNames.join("、")}等情境中，你更可能获得顺畅反馈、较低限制负荷与可持续动机。`;
      }
      text +=
        "对你而言，真正重要的并不是单纯“更努力”，而是识别自己最需要的帮助类型——例如结构化指导、情绪支持、适度督促，或安静且不被打扰的发展空间。";
      if (resourceLines?.length) {
        text += `结合你的资源生态画像：${resourceLines.slice(0, 2).join("；")}。`;
      }
      return text;
    }
    let text =
      "Ecologically, you tend to flourish where autonomy and accountability are balanced: enough room to explore, paired with crisp feedback at meaningful milestones; respect for your thinking pace alongside practical support when stakes rise.";
    if (optimalNames.length) {
      text += ` In contexts such as ${optimalNames.join(", ")}, smoother feedback and more sustainable motivation are especially likely.`;
    }
    text +=
      " The lever is rarely “try harder alone,” but identifying which supports you actually need—structured guidance, emotional witnessing, gentle accountability, or protected deep-work space.";
    if (resourceLines?.length) text += ` Your resource ecology highlights: ${resourceLines.slice(0, 2).join("; ")}.`;
    return text;
  }

  function buildStrategyNarrative(themes, optimalKeys, loadIndex, alignIndex, domainLabels, lang) {
    const themeNames = themes.map((k) => domainLabels(k));
    const optimalNames = optimalKeys.map((k) => domainLabels(k));
    if (lang === "zh") {
      return [
        `总体而言，你的优势并不局限于某一单独技能，而更体现在将${themeNames.length ? themeNames.join("、") : "多元能力"}整合为一个连贯系统的潜力。`,
        alignIndex >= 0.6
          ? `鉴于对齐程度${qualitativeLabelFromIndex(alignIndex, lang)}，建议继续深化与核心追求高度一致、且发展顺畅的领域，使优势从“擅长”走向“可被他人稳定识别的专业特征”。`
          : `鉴于对齐仍待加强，建议优先选择能同时承载理想、认可与实践顺畅的“交汇任务”，以小步外化方式减少理想与现实的撕裂感。`,
        loadIndex >= 0.55
          ? `在限制负荷${qualitativeLabelFromIndex(loadIndex, lang)}的背景下，为高度重要但高限制的方向设计分阶段目标、外部反馈节点与情绪恢复机制；避免以羞耻驱动的方式强行推进。`
          : `在限制相对可控的前提下，可为次要方向设置探索性目标，而把主要精力投向最具结构优势的主题。`,
        optimalNames.length
          ? `环境上，优先靠近${optimalNames.join("、")}等能同时提供挑战、反馈与意义感的场域。`
          : "环境上，优先选择能同时提供挑战、反馈与意义感的场域，而非单纯高压或纯自由的极端。",
        "随着能力不断积累与外化，它们有望逐渐形成具有长期价值的个人优势体系——不仅让你“做得好”，也让他人理解你“为何重要”。",
      ].join("");
    }
    return [
      `Overall, your edge lies less in a single isolated skill than in integrating ${themeNames.length ? themeNames.join(", ") : "multiple capacities"} into a coherent system.`,
      alignIndex >= 0.6
        ? `With ${qualitativeLabelFromIndex(alignIndex, lang).toLowerCase()} alignment, deepen domains where aspiration, recognition, and ease already converge—moving from competence to a signature others can reliably name.`
        : `With alignment still developing, choose bridging projects that let ideal self, audience, and practice meet in the same room—reducing costly splits between who you wish to be and what daily life rewards.`,
      loadIndex >= 0.55
        ? `Given ${qualitativeLabelFromIndex(loadIndex, lang).toLowerCase()} constraint load, stage goals and support structures for high-meaning, high-friction directions; protect early attempts from shame-based acceleration.`
        : `With constraints comparatively manageable, keep exploratory goals secondary while investing primary energy where structure already favors you.`,
      optimalNames.length
        ? `Environmentally, gravitate toward ${optimalNames.join(", ")}—settings that combine challenge, feedback, and felt purpose.`
        : "Environmentally, seek settings that combine challenge, feedback, and purpose rather than extremes of chaos or control.",
      "As capacities accumulate and become visible, they can crystallize into a durable personal advantage—work that is not only well done, but clearly meaningful to others.",
    ].join(" ");
  }

  function buildResourceEcologyQualitative(meta, lang) {
    const rankings = meta?.domainRankings || [];
    if (!rankings.length) return [];
    const avg = (field) =>
      rankings.reduce((s, d) => s + (d.percentages?.[field] ?? 0), 0) / rankings.length;
    const desired = avg("desired");
    const perceived = avg("perceived");
    const ease = avg("ease");
    const constraint = avg("constraint");
    const gap = desired - Math.max(perceived, ease);
    if (lang === "zh") {
      return [
        `指导需求为${qualitativeLabel(desired, lang)}`,
        `自主需求为${ease >= 58 && constraint < 55 ? qualitativeLabel(Math.max(ease, 62), lang) : qualitativeLabel(50, lang)}`,
        `情感支持需求${gap >= 12 ? "值得关注" : "适中"}`,
        `问责支持需求为${qualitativeLabel(constraint, lang)}`,
      ];
    }
    return [
      `guidance needs read as ${qualitativeLabel(desired, lang).toLowerCase()}`,
      `autonomy needs are ${ease >= 58 && constraint < 55 ? "elevated" : "moderate"}`,
      `emotional support is ${gap >= 12 ? "especially important" : "moderately important"}`,
      `accountability needs are ${qualitativeLabel(constraint, lang).toLowerCase()}`,
    ];
  }

  function overallSectionHtml(title, paragraphs) {
    const body = paragraphs
      .filter(Boolean)
      .map((p) => `<p class="interp-narrative overall-narrative__p">${escHtml(p)}</p>`)
      .join("");
    return `<div class="overall-narrative__section"><h4 class="overall-narrative__heading">${escHtml(title)}</h4>${body}</div>`;
  }

  /**
   * Premium Overall Development Summary — qualitative narrative only (no raw numbers).
   * Returns safe HTML for secOverallBody.
   */
  function buildOverallNarrative(ctx) {
    const { lang, meta, completedDomainKeys, domainLabels } = ctx;
    const themes = (meta?.signatureTalentPath || completedDomainKeys || []).slice(0, 3);
    const optimal = (meta?.optimalDevelopmentEnvironment || []).slice(0, 3);
    const hidden = meta?.hiddenPotential || [];
    const alignIndex = meta?.talentAlignmentIndex ?? 0;
    const loadIndex = meta?.constraintLoad ?? 0;
    const rankings = meta?.domainRankings || [];
    const constraintDomainKeys = [...rankings]
      .sort((a, b) => (b.percentages?.constraint ?? 0) - (a.percentages?.constraint ?? 0))
      .slice(0, 2)
      .map((d) => d.key);
    const resourceLines = buildResourceEcologyQualitative(meta, lang);
    const titles = OVERALL_SECTION_TITLES;
    const themeBracketed = formatBracketedDomains(themes, domainLabels, lang);

    if (lang === "zh") {
      const sections = [
        overallSectionHtml(titles.themes.zh, [
          `你的天赋生态画像显示，你当前最突出的发展主题集中在${themeBracketed}等领域。${buildDomainInteraction(themes, lang)}`,
          themes.length >= 2
            ? "这些主题彼此呼应：你在不同能力之间建立关联的能力，可能正是你最具辨识度的“元优势”。"
            : "",
        ]),
        overallSectionHtml(titles.manifestations.zh, [
          themes.length
            ? themes
                .map((k) => domainManifestationPhrase(k, lang))
                .slice(0, 2)
                .join(" ")
            : "你的日常表现可能因具体情境而异；完成更多模块将细化这一画像。",
          themes.some((k) => k === "leadership" || k === "linguistic")
            ? "结合较高的表达或影响倾向，你可能不仅擅长提出新的框架，也能够帮助他人理解这些框架的意义，并推动群体朝着更清晰的方向发展。"
            : "在熟悉且反馈清晰的情境中，你更可能进入专注与成长并行的状态；当环境嘈杂或评价标准模糊时，优势表达可能受阻。",
        ]),
        overallSectionHtml(titles.alignment.zh, [buildAlignmentNarrative(alignIndex, lang)]),
        overallSectionHtml(titles.constraint.zh, [
          buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang),
        ]),
        overallSectionHtml(titles.hidden.zh, [buildHiddenPotentialNarrative(hidden.length > 0, lang)]),
        overallSectionHtml(titles.environment.zh, [
          buildEnvironmentNarrative(optimal, domainLabels, resourceLines, lang),
        ]),
        overallSectionHtml(titles.strategy.zh, [
          buildStrategyNarrative(themes, optimal, loadIndex, alignIndex, domainLabels, lang),
        ]),
      ];
      return `<div class="overall-narrative interp-prose">${sections.join("")}</div>`;
    }

    const sections = [
      overallSectionHtml(titles.themes.en, [
        `Your Talent Ecology profile highlights ${themeBracketed} as organizing developmental themes. ${buildDomainInteraction(themes, lang)}`,
        themes.length >= 2
          ? "These themes appear mutually reinforcing—your signature may be less a single skill than the ability to integrate capacities into a coherent whole."
          : "",
      ]),
      overallSectionHtml(titles.manifestations.en, [
        themes.length
          ? themes
              .map((k) => domainManifestationPhrase(k, lang))
              .slice(0, 2)
              .join(" ")
          : "Everyday expressions will sharpen as you complete additional modules.",
        themes.some((k) => k === "leadership" || k === "linguistic")
          ? "With notable expression or influence tendencies, you may not only frame ideas powerfully but help others grasp their meaning and move collectively toward clarity."
          : "In familiar contexts with clear feedback, you are more likely to enter sustainable focus; noisy or ambiguous evaluation climates may dampen expression.",
      ]),
      overallSectionHtml(titles.alignment.en, [buildAlignmentNarrative(alignIndex, lang)]),
      overallSectionHtml(titles.constraint.en, [
        buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang),
      ]),
      overallSectionHtml(titles.hidden.en, [buildHiddenPotentialNarrative(hidden.length > 0, lang)]),
      overallSectionHtml(titles.environment.en, [
        buildEnvironmentNarrative(optimal, domainLabels, resourceLines, lang),
      ]),
      overallSectionHtml(titles.strategy.en, [
        buildStrategyNarrative(themes, optimal, loadIndex, alignIndex, domainLabels, lang),
      ]),
    ];
    return `<div class="overall-narrative interp-prose">${sections.join("")}</div>`;
  }
  /** HTML helpers for report rendering (escape handled by caller). */
  function htmlScoreLine(pct, lang) {
    const s = labelScore(pct, lang);
    return `<span class="interp-score">${s.pct}% · <strong>${s.label}</strong></span>`;
  }

  function htmlPerspectiveBlock(persp, lang) {
    return `<div class="interp-perspective">
      <div class="interp-perspective__head"><strong>${persp.title}</strong>: ${htmlScoreLine(persp.scored.pct, lang)}</div>
      <p class="interp-narrative">${persp.narrative}</p>
    </div>`;
  }

  function htmlMicroItem(name, pct, lang, microKey) {
    const s = labelScore(pct, lang);
    const sentence = microSentence(microKey, pct, lang, name);
    return `<div class="interp-micro">
      <div class="interp-micro__head"><strong>${name}</strong> — ${s.pct}% · <strong>${s.label}</strong></div>
      <p class="interp-narrative">${sentence}</p>
    </div>`;
  }

  /** Registry hook for future template packs (attachment, learning styles, etc.) */
  const templateRegistry = {
    domains: DOMAIN_SECTIONS,
    careers: DOMAIN_CAREERS,
    patterns: PATTERNS,
    micro: MICRO_SNIPPETS,
    register(pack) {
      if (pack.domains) Object.assign(DOMAIN_SECTIONS, pack.domains);
      if (pack.careers) Object.assign(DOMAIN_CAREERS, pack.careers);
      if (pack.micro) Object.assign(MICRO_SNIPPETS, pack.micro);
    },
  };

  return {
    labelScore,
    formatScoreLine,
    tierFromPercent,
    genericNarrative: (pct, lang) => labelScore(pct, lang).narrative,
    perspectiveNarrative,
    detectPattern,
    getPattern,
    buildDomainInterpretation,
    buildOverallNarrative,
    microSentence,
    htmlScoreLine,
    htmlPerspectiveBlock,
    htmlMicroItem,
    SECTION_LABELS,
    PERSPECTIVE_LABELS,
    HIGH,
    LOW,
    templateRegistry,
  };
})();
