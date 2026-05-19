// Talent Ecology Matrix — hierarchical taxonomy (extensible for factor analysis)

const PERSPECTIVES = [
  {
    key: "desired",
    label: { en: "Desired Talent", zh: "理想天赋" },
    framing: {
      en: "What kind of talent do you wish you had?",
      zh: "你希望自己拥有什么样的天赋？",
    },
  },
  {
    key: "perceived",
    label: { en: "Socially Perceived Talent", zh: "他人感知的天赋" },
    framing: {
      en: "What do others seem to notice or recognize in you?",
      zh: "他人似乎在你身上注意到或认可什么？",
    },
  },
  {
    key: "ease",
    label: { en: "Developmental Ease", zh: "发展顺畅度" },
    framing: {
      en: "What kind of ability feels easier for you to develop over time?",
      zh: "哪类能力对你来说更容易随时间发展？",
    },
  },
  {
    key: "constraint",
    label: { en: "Constraint Profile", zh: "限制条件" },
    framing: {
      en: "What may limit the development or expression of your talent?",
      zh: "什么可能限制你天赋的发展或表达？",
    },
  },
];

/** Major domains — metadata only; micro-abilities live in ITEM_REGISTRY */
const TAXONOMY = [
  {
    key: "linguistic",
    label: { en: "Linguistic Expression", zh: "语言表达" },
    description: {
      en: "Precision and fluency in written and spoken language.",
      zh: "书面与口头语言的精度与流畅度。",
    },
    flagship: false,
    subdomains: [
      { key: "vocabulary_precision", label: { en: "Vocabulary Precision", zh: "词汇精度" } },
      { key: "written_composition", label: { en: "Written Composition", zh: "书面构成" } },
      { key: "oral_fluency", label: { en: "Oral Fluency", zh: "口语流畅" } },
      { key: "storytelling", label: { en: "Storytelling", zh: "叙事" } },
      { key: "rhetorical_persuasion", label: { en: "Rhetorical Persuasion", zh: "修辞说服" } },
      { key: "semantic_comprehension", label: { en: "Semantic Comprehension", zh: "语义理解" } },
      { key: "pragmatic_sensitivity", label: { en: "Pragmatic Sensitivity", zh: "语用敏感" } },
      { key: "reading_comprehension", label: { en: "Reading Comprehension", zh: "阅读理解" } },
      { key: "translation_ability", label: { en: "Translation Ability", zh: "翻译能力" } },
      { key: "phonological_awareness", label: { en: "Phonological Awareness", zh: "语音意识" } },
      { key: "pronunciation_accuracy", label: { en: "Pronunciation Accuracy", zh: "发音准确" } },
      { key: "accent_acquisition", label: { en: "Accent Acquisition", zh: "口音习得" } },
    ],
  },
  {
    key: "auditory",
    label: { en: "Auditory & Musical Sensitivity", zh: "听觉与音乐敏感度" },
    description: {
      en: "Perception and memory of pitch, rhythm, timbre, and sound.",
      zh: "对音高、节奏、音色与声音的感知与记忆。",
    },
    flagship: false,
    subdomains: [
      { key: "pitch_discrimination", label: { en: "Pitch Discrimination", zh: "音高辨别" } },
      { key: "relative_pitch_memory", label: { en: "Relative Pitch Memory", zh: "相对音高记忆" } },
      { key: "rhythm_perception", label: { en: "Rhythm Perception", zh: "节奏感知" } },
      { key: "beat_synchronization", label: { en: "Beat Synchronization", zh: "节拍同步" } },
      { key: "melody_recognition", label: { en: "Melody Recognition", zh: "旋律识别" } },
      { key: "harmonic_sensitivity", label: { en: "Harmonic Sensitivity", zh: "和声敏感" } },
      { key: "timbre_discrimination", label: { en: "Timbre Discrimination", zh: "音色辨别" } },
      { key: "vocal_mimicry", label: { en: "Vocal Mimicry", zh: "声音模仿" } },
    ],
  },
  {
    key: "analytical",
    label: { en: "Analytical Reasoning", zh: "分析推理" },
    description: {
      en: "Logic, abstraction, and structured problem solving.",
      zh: "逻辑、抽象与结构化问题解决。",
    },
    flagship: false,
    subdomains: [
      { key: "abstract_reasoning", label: { en: "Abstract Reasoning", zh: "抽象推理" } },
      { key: "deductive_logic", label: { en: "Deductive Logic", zh: "演绎逻辑" } },
      { key: "inductive_pattern", label: { en: "Inductive Pattern Detection", zh: "归纳模式识别" } },
      { key: "causal_inference", label: { en: "Causal Inference", zh: "因果推断" } },
      { key: "probabilistic_thinking", label: { en: "Probabilistic Thinking", zh: "概率思维" } },
      { key: "mathematical_reasoning", label: { en: "Mathematical Reasoning", zh: "数学推理" } },
      { key: "symbolic_manipulation", label: { en: "Symbolic Manipulation", zh: "符号运算" } },
      { key: "algorithmic_thinking", label: { en: "Algorithmic Thinking", zh: "算法思维" } },
    ],
  },
  {
    key: "spatial",
    label: { en: "Spatial Thinking", zh: "空间思维" },
    description: {
      en: "Visualization, layout, and structural spatial reasoning.",
      zh: "可视化、布局与结构性空间推理。",
    },
    flagship: false,
    subdomains: [
      { key: "mental_rotation", label: { en: "Mental Rotation", zh: "心理旋转" } },
      { key: "geometric_visualization", label: { en: "Geometric Visualization", zh: "几何可视化" } },
      { key: "layout_planning", label: { en: "Layout Planning", zh: "布局规划" } },
      { key: "map_orientation", label: { en: "Map Orientation", zh: "地图定向" } },
      { key: "structural_visualization", label: { en: "Structural Visualization", zh: "结构可视化" } },
      { key: "engineering_intuition", label: { en: "Engineering Intuition", zh: "工程直觉" } },
    ],
  },
  {
    key: "memory",
    label: { en: "Memory & Pattern Retention", zh: "记忆与模式保持" },
    description: {
      en: "Encoding, retention, and retrieval of patterns and sequences.",
      zh: "对模式与序列的编码、保持与提取。",
    },
    flagship: false,
    subdomains: [
      { key: "rote_memorization", label: { en: "Rote Memorization", zh: "机械记忆" } },
      { key: "long_term_retention", label: { en: "Long-Term Retention", zh: "长期保持" } },
      { key: "pattern_recall", label: { en: "Pattern Recall", zh: "模式回忆" } },
      { key: "formula_retention", label: { en: "Formula Retention", zh: "公式保持" } },
      { key: "sequential_memory", label: { en: "Sequential Memory", zh: "序列记忆" } },
      { key: "retrieval_speed", label: { en: "Retrieval Speed", zh: "提取速度" } },
    ],
  },
  {
    key: "creative",
    label: { en: "Creative Imagination", zh: "创造想象" },
    description: {
      en: "Novel ideas, symbols, and divergent generation.",
      zh: "新颖想法、符号与发散生成。",
    },
    flagship: false,
    subdomains: [
      { key: "novel_idea_generation", label: { en: "Novel Idea Generation", zh: "新颖想法生成" } },
      { key: "symbolic_transformation", label: { en: "Symbolic Transformation", zh: "符号转化" } },
      { key: "artistic_visualization", label: { en: "Artistic Visualization", zh: "艺术想象" } },
      { key: "metaphorical_thinking", label: { en: "Metaphorical Thinking", zh: "隐喻思维" } },
      { key: "divergent_thinking", label: { en: "Divergent Thinking", zh: "发散思维" } },
    ],
  },
  {
    key: "systems",
    label: { en: "Systems Translation", zh: "系统转译" },
    description: {
      en: "Extracting mechanisms and building models from experience.",
      zh: "从经验中提取机制并构建模型。",
    },
    flagship: false,
    subdomains: [
      { key: "mechanism_extraction", label: { en: "Mechanism Extraction", zh: "机制提取" } },
      { key: "model_building", label: { en: "Model Building", zh: "模型构建" } },
      { key: "theory_construction", label: { en: "Theory Construction", zh: "理论建构" } },
      { key: "experience_to_framework", label: { en: "Experience-to-Framework Conversion", zh: "经验框架化" } },
      { key: "theory_to_practice", label: { en: "Theory-to-Practice Conversion", zh: "理论实践化" } },
      { key: "hidden_structure_identification", label: { en: "Hidden Structure Identification", zh: "隐藏结构识别" } },
    ],
  },
  {
    key: "cross_domain",
    label: { en: "Cross-Domain Integration", zh: "跨领域整合" },
    description: {
      en: "Linking concepts, structures, and representations across disciplines.",
      zh: "联结不同学科的概念、结构与表征。",
    },
    flagship: true,
    subdomains: [
      { key: "numerical_visual_mapping", label: { en: "Numerical–Visual Mapping", zh: "数形结合" } },
      { key: "theory_phenomenon_translation", label: { en: "Theory–Phenomenon Translation", zh: "理论–现象转译" } },
      { key: "analogical_mapping", label: { en: "Analogical Mapping", zh: "类比映射" } },
      { key: "interdisciplinary_synthesis", label: { en: "Interdisciplinary Synthesis", zh: "跨学科综合" } },
      { key: "structural_similarity_recognition", label: { en: "Structural Similarity Recognition", zh: "结构相似识别" } },
      { key: "concept_transfer", label: { en: "Concept Transfer Across Domains", zh: "跨域概念迁移" } },
      { key: "disciplinary_reframing", label: { en: "Disciplinary Reframing", zh: "学科重构视角" } },
    ],
  },
  {
    key: "interpersonal",
    label: { en: "Interpersonal Insight", zh: "人际洞察" },
    description: {
      en: "Reading emotions, motives, and social patterns.",
      zh: "解读情绪、动机与社会模式。",
    },
    flagship: false,
    subdomains: [
      { key: "emotion_recognition", label: { en: "Emotion Recognition", zh: "情绪识别" } },
      { key: "motive_inference", label: { en: "Motive Inference", zh: "动机推断" } },
      { key: "social_pattern_detection", label: { en: "Social Pattern Detection", zh: "社会模式识别" } },
      { key: "conflict_diagnosis", label: { en: "Conflict Diagnosis", zh: "冲突诊断" } },
      { key: "perspective_taking", label: { en: "Perspective Taking", zh: "视角采择" } },
    ],
  },
  {
    key: "leadership",
    label: { en: "Leadership & Influence", zh: "领导与影响" },
    description: {
      en: "Mobilizing groups, attention, and collective direction.",
      zh: "动员群体、注意力与集体方向。",
    },
    flagship: false,
    subdomains: [
      { key: "persuasion", label: { en: "Persuasion", zh: "说服" } },
      { key: "group_coordination", label: { en: "Group Coordination", zh: "群体协调" } },
      { key: "attention_direction", label: { en: "Attention Direction", zh: "注意力引导" } },
      { key: "strategic_communication", label: { en: "Strategic Communication", zh: "战略沟通" } },
      { key: "decision_leadership", label: { en: "Decision Leadership", zh: "决策领导" } },
    ],
  },
  {
    key: "moral",
    label: { en: "Moral & Evaluative Judgment", zh: "价值判断" },
    description: {
      en: "Ethical reasoning and principled evaluation.",
      zh: "伦理推理与原则性评价。",
    },
    flagship: false,
    subdomains: [
      { key: "ethical_reasoning", label: { en: "Ethical Reasoning", zh: "伦理推理" } },
      { key: "fairness_assessment", label: { en: "Fairness Assessment", zh: "公平评估" } },
      { key: "principle_evaluation", label: { en: "Principle-Based Evaluation", zh: "原则性评价" } },
      { key: "tradeoff_analysis", label: { en: "Trade-Off Analysis", zh: "权衡分析" } },
    ],
  },
  {
    key: "operational",
    label: { en: "Operational Precision", zh: "操作精度" },
    description: {
      en: "Fine motor control and procedural execution.",
      zh: "精细动作控制与流程执行。",
    },
    flagship: false,
    subdomains: [
      { key: "fine_motor_coordination", label: { en: "Fine Motor Coordination", zh: "精细动作协调" } },
      { key: "procedural_accuracy", label: { en: "Procedural Accuracy", zh: "流程准确度" } },
      { key: "tool_manipulation", label: { en: "Tool Manipulation", zh: "工具操作" } },
      { key: "hands_on_learning", label: { en: "Hands-On Learning", zh: "动手学习" } },
    ],
  },
  {
    key: "physical",
    label: { en: "Physical Coordination", zh: "身体协调" },
    description: {
      en: "Balance, movement learning, and bodily awareness.",
      zh: "平衡、动作学习与身体觉察。",
    },
    flagship: false,
    subdomains: [
      { key: "balance", label: { en: "Balance", zh: "平衡" } },
      { key: "movement_learning", label: { en: "Movement Learning", zh: "动作学习" } },
      { key: "body_awareness", label: { en: "Body Awareness", zh: "身体觉察" } },
      { key: "athletic_adaptation", label: { en: "Athletic Adaptation", zh: "运动适应" } },
    ],
  },
];

/** @returns flat micro-ability metadata merged with registry */
function getMicroCatalog() {
  if (typeof ITEM_REGISTRY === "undefined") return [];
  return ITEM_REGISTRY.map((m) => ({ ...m }));
}

function buildAssessmentQuestions() {
  const questions = [];
  const order = ["desired", "perceived", "ease", "constraint"];
  if (typeof ITEM_REGISTRY === "undefined") return questions;

  ITEM_REGISTRY.forEach((micro) => {
    order.forEach((perspective) => {
      const prefix = { desired: "des", perceived: "per", ease: "ease", constraint: "con" }[perspective];
      const id = `${prefix}_${micro.key}`;
      questions.push({
        id,
        perspective,
        domain: micro.domain,
        subdomain: micro.subdomain,
        micro: micro.key,
        text: micro.items[perspective],
      });
    });
  });
  return questions;
}

const ASSESSMENT_QUESTIONS = buildAssessmentQuestions();
const TALENT_DOMAINS = TAXONOMY.map(({ key, label, description, flagship }) => ({
  key,
  label,
  description,
  flagship: !!flagship,
}));

// Background form (calibration / research) — grouped sections in UI
const BACKGROUND_SECTIONS = [
  {
    key: "demographics",
    title: { en: "Basic Demographics", zh: "基本人口信息" },
    fieldKeys: ["age", "gender", "orientation", "country", "culture", "education", "field"],
  },
  {
    key: "work",
    title: { en: "Education / Work Context", zh: "教育 / 工作情境" },
    fieldKeys: ["participation_context", "employment_status", "work_format", "occupation_type"],
  },
  {
    key: "neuro",
    title: { en: "Neurodiversity", zh: "神经多样性" },
    fieldKeys: ["neurodiversity"],
  },
];

const BACKGROUND_FIELDS = {
  age: { section: "demographics", type: "number", label: { en: "Age", zh: "年龄" }, min: 10, max: 100 },
  gender: {
    section: "demographics",
    type: "select",
    optional: true,
    label: { en: "Gender Identity", zh: "性别认同" },
    options: [
      { value: "female", label: { en: "Female", zh: "女性" } },
      { value: "male", label: { en: "Male", zh: "男性" } },
      { value: "nonbinary", label: { en: "Non-binary", zh: "非二元" } },
      { value: "prefer_not", label: { en: "Prefer not to say", zh: "不愿透露" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  orientation: {
    section: "demographics",
    type: "select",
    optional: true,
    label: { en: "Sexual Orientation", zh: "性取向" },
    options: [
      { value: "heterosexual", label: { en: "Heterosexual", zh: "异性恋" } },
      { value: "homosexual", label: { en: "Homosexual", zh: "同性恋" } },
      { value: "bisexual", label: { en: "Bisexual", zh: "双性恋" } },
      { value: "asexual", label: { en: "Asexual", zh: "无性恋" } },
      { value: "queer", label: { en: "Queer", zh: "酷儿" } },
      { value: "questioning", label: { en: "Questioning", zh: "探索中" } },
      { value: "prefer_not", label: { en: "Prefer not to say", zh: "不愿透露" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  country: { section: "demographics", type: "text", label: { en: "Country / Region", zh: "国家或地区" } },
  culture: {
    section: "demographics",
    type: "select",
    optional: true,
    label: { en: "Cultural Background", zh: "文化背景" },
    options: [
      { value: "east_asian", label: { en: "East Asian", zh: "东亚" } },
      { value: "southeast_asian", label: { en: "Southeast Asian", zh: "东南亚" } },
      { value: "south_asian", label: { en: "South Asian", zh: "南亚" } },
      { value: "middle_eastern", label: { en: "Middle Eastern", zh: "中东" } },
      { value: "european", label: { en: "European", zh: "欧洲" } },
      { value: "african", label: { en: "African", zh: "非洲" } },
      { value: "latin_american", label: { en: "Latin American", zh: "拉丁美洲" } },
      { value: "north_american", label: { en: "North American", zh: "北美" } },
      { value: "oceanian", label: { en: "Oceanian", zh: "大洋洲" } },
      { value: "mixed", label: { en: "Mixed", zh: "混合" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  education: {
    section: "demographics",
    type: "select",
    label: { en: "Highest Education Level", zh: "最高学历" },
    options: [
      { value: "primary", label: { en: "Primary School", zh: "小学" } },
      { value: "middle", label: { en: "Middle School", zh: "初中" } },
      { value: "high", label: { en: "High School", zh: "高中" } },
      { value: "college_diploma", label: { en: "College Diploma", zh: "大专" } },
      { value: "bachelor", label: { en: "Bachelor's Degree", zh: "学士" } },
      { value: "master", label: { en: "Master's Degree", zh: "硕士" } },
      { value: "doctoral", label: { en: "Doctoral Degree", zh: "博士" } },
      { value: "professional", label: { en: "Professional Degree", zh: "专业学位" } },
      { value: "self_taught", label: { en: "Self-Taught / Alternative Learning", zh: "自学 / 非传统学习" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  field: {
    section: "demographics",
    type: "text",
    label: { en: "Field of Study / Profession", zh: "专业或职业领域" },
  },
  participation_context: {
    section: "work",
    type: "select",
    label: { en: "Participation Context", zh: "参与情境" },
    options: [
      { value: "student", label: { en: "Student", zh: "学生" } },
      { value: "working_professional", label: { en: "Working Professional", zh: "在职专业人士" } },
      { value: "freelancer", label: { en: "Freelancer / Self-employed", zh: "自由职业 / 自雇" } },
      { value: "founder", label: { en: "Entrepreneur / Founder", zh: "创业者 / 创始人" } },
      { value: "unemployed", label: { en: "Unemployed / Between roles", zh: "待业 / 过渡期" } },
      { value: "caregiver", label: { en: "Caregiver / Family work", zh: "照护者 / 家庭工作" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  employment_status: {
    section: "work",
    type: "select",
    label: { en: "Employment Status", zh: "就业状态" },
    options: [
      { value: "full_time", label: { en: "Full-time", zh: "全职" } },
      { value: "part_time", label: { en: "Part-time", zh: "兼职" } },
      { value: "contract", label: { en: "Contract", zh: "合同制" } },
      { value: "freelance", label: { en: "Freelance", zh: "自由职业" } },
      { value: "self_employed", label: { en: "Self-employed", zh: "自雇" } },
      { value: "student", label: { en: "Student", zh: "学生" } },
      { value: "not_employed", label: { en: "Not currently employed", zh: "目前未就业" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  work_format: {
    section: "work",
    type: "select",
    label: { en: "Work Format", zh: "工作形式" },
    options: [
      { value: "remote", label: { en: "Remote", zh: "远程" } },
      { value: "hybrid", label: { en: "Hybrid", zh: "混合" } },
      { value: "onsite", label: { en: "On-site", zh: "现场" } },
      { value: "not_applicable", label: { en: "Not applicable", zh: "不适用" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  occupation_type: {
    section: "work",
    type: "select",
    label: { en: "Occupation Type", zh: "职业类型" },
    options: [
      { value: "student_academic", label: { en: "Student / Academic", zh: "学生 / 学术" } },
      { value: "education", label: { en: "Education / Teaching", zh: "教育 / 教学" } },
      { value: "psychology", label: { en: "Psychology / Mental Health", zh: "心理学 / 心理健康" } },
      { value: "business", label: { en: "Business / Management", zh: "商业 / 管理" } },
      { value: "technology", label: { en: "Technology / Engineering", zh: "科技 / 工程" } },
      { value: "creative", label: { en: "Creative / Media / Design", zh: "创意 / 媒体 / 设计" } },
      { value: "healthcare", label: { en: "Healthcare", zh: "医疗健康" } },
      { value: "public_service", label: { en: "Public Service / Nonprofit", zh: "公共服务 / 非营利" } },
      { value: "finance", label: { en: "Finance / Consulting", zh: "金融 / 咨询" } },
      { value: "service", label: { en: "Service / Hospitality", zh: "服务 / 酒店餐饮" } },
      { value: "manual_technical", label: { en: "Manual / Technical Work", zh: "体力 / 技术工作" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
  neurodiversity: {
    section: "neuro",
    type: "multiselect",
    optional: true,
    label: { en: "Neurodiversity Traits (Optional)", zh: "神经多样性特质（可选）" },
    options: [
      { value: "none", label: { en: "None / Not sure", zh: "无 / 不确定" } },
      { value: "autism", label: { en: "Autism Spectrum", zh: "自闭症谱系" } },
      { value: "adhd", label: { en: "ADHD", zh: "ADHD" } },
      { value: "dyslexia", label: { en: "Dyslexia", zh: "阅读障碍" } },
      { value: "dyspraxia", label: { en: "Dyspraxia", zh: "发育性协调障碍" } },
      { value: "hsp", label: { en: "Highly Sensitive Person (HSP)", zh: "高敏感人群 (HSP)" } },
      { value: "giftedness", label: { en: "Giftedness", zh: "天赋优异" } },
      { value: "ocd_traits", label: { en: "OCD Traits", zh: "强迫特质" } },
      { value: "alexithymia", label: { en: "Alexithymia", zh: "述情障碍" } },
      { value: "other", label: { en: "Other", zh: "其他" } },
    ],
  },
};

/** Sensitive optional fields cleared by “Skip optional fields”. */
const BACKGROUND_OPTIONAL_KEYS = Object.entries(BACKGROUND_FIELDS)
  .filter(([, f]) => f.optional)
  .map(([k]) => k);
