const STORAGE_KEY = "msl_job_assistant_static_v2";
const DEFAULT_LANG = "zh";
const SLOT_KEYS = ["context", "role", "action", "scale", "friction", "resolution", "outcome", "artifact", "reflection"];
const DEFAULT_SLOT_PRIORITY = ["scale", "outcome", "friction", "artifact", "reflection"];

const COPY = {
  zh: {
    brandTitle: "求职助手",
    brandSubtitle: "以经历库为地基的求职准备工具",
    nav: {
      entry: "入口选择",
      jd: "JD 入手",
      explore: "探索入手",
      library: "经历库",
      dashboard: "数据看板",
      editor: "录入经历"
    },
    entryEyebrow: "Start Here",
    entryTitle: "你现在的情况更接近哪种?",
    choiceA: "A. 手上已经有想投的岗位,需要尽快准备材料",
    choiceADesc: "从 JD 开始，拆必要技能/经验，再生成材料和演练问题。",
    choiceB: "B. 还没锁定具体岗位,想先弄清楚自己适合什么",
    choiceBDesc: "从经历、技能、兴趣开始，先整理方向和能力缺口。",
    deadlineTitle: "最近的截止时间?",
    deadlines: ["一周内", "两周内", "一个月以上", "不确定"],
    continue: "继续",
    reset: "重新选择",
    helperNone: "先选择 A 或 B。",
    helperDeadline: "请选择最近的截止时间。",
    helperJdReady: "已记录截止时间，可以进入 JD 入手流程。",
    helperExploreReady: "可以进入探索入手流程。",
    situationJd: "A: JD 入手",
    situationExplore: "B: 探索入手",
    deadlinePending: "待选截止时间",
    deadlinePrefix: "截止",
    noVariables: "未记录变量",
    jdTitle: "以 JD 入手",
    jdNextTitle: "下一步会做什么",
    jdNextText: "贴入目标 JD 后，agent 会整理必要技能、经验要求和行为原语。用户可以附上简历、补充相关经历，或回答探针问题。",
    jdOutputsTitle: "预计产出",
    jdOutputs: ["定制 CV 文案", "投递邮件模板", "面试演练问题", "缺口追问和补强建议"],
    jdPasteTitle: "JD 粘贴区",
    jdPlaceholder: "这里先作为静态预览。下一期会接入 JD 解构和匹配运算。",
    exploreEyebrow: "Experience Crystal",
    exploreTitle: "经历结晶",
    crystalNew: "新开一段",
    crystalChatTitle: "讲述区 · 像聊天一样说就行",
    crystalChatSubtitle: "不用想措辞，也不用写没做过的事。想不起来就跳过，我们换个话题。",
    crystalInputPlaceholder: "接着说，不用想措辞",
    crystalSend: "发送",
    crystalSkip: "想不起来",
    crystalOutputTitle: "这段经历的结晶",
    crystalOutputSubtitle: "只使用你说过的事实，缺的信息会标成待补。",
    crystalSave: "存入经历库",
    variants: {
      data: "数据版",
      action: "行动版",
      collab: "协作版"
    },
    emptyBullet: "先讲一段经历，我会在这里生成三种可改写素材。",
    emptySource: "来自你的原话会显示在这里。",
    skillsLabel: "提取到的技能",
    noSkills: "等待行为证据",
    profileTitle: "你的画像在更新",
    directionLabel: "方向信号",
    directionEmpty: "等待第一段经历",
    completenessLabel: "简历完成度",
    slotPrefix: "槽位",
    logSummary: "本轮记录变量",
    logEmpty: "等待用户输入。",
    opener: "最近有没有一件你张罗过的事?大小都算。",
    jdResearchOpener: "做决定前问过一圈人吗?",
    genericRelevantOpener: "有没有一段相关经历?",
    confirmations: {
      default: "收到，这段经历先记下来了。",
      scale: "这个数量信息很有用。",
      outcome: "这个结果可以作为证据。",
      artifact: "这些留下来的材料很有价值。",
      skip: "没关系，我们换个角度。",
      sensitive: "听起来这段不容易。"
    },
    probes: {
      scale: "大概多少人参与?",
      outcome: "后来有什么变化或反馈?",
      friction: "中间有不顺利吗?",
      resolution: "后来怎么处理的?",
      artifact: "留下过什么材料吗?",
      reflection: "你哪里做得最顺手?",
      none: "这段已经很完整了,想再讲一段,还是先看看右边生成的内容?",
      sensitive: "这段要收进简历素材吗?"
    },
    savedCrystal: "已存入经历库。",
    addExperience: "新增经历",
    libraryTitle: "经历库",
    editorTitle: "录入经历",
    form: {
      title: "一句话标题",
      titlePlaceholder: "例如：组织职业分享会并提升报名转化",
      context: "情境 / 任务",
      actions: "具体行为",
      results: "结果",
      evidence: "证据",
      save: "保存",
      clear: "清空"
    },
    dashboardTitle: "数据看板",
    resetDemo: "重置示例",
    tagDistribution: "能力标签分布",
    assetStatus: "经历资产状态",
    metrics: {
      records: "经历记录",
      evidence: "证据覆盖",
      complete: "STAR 完整",
      topTag: "主能力标签",
      none: "暂无",
      withEvidence: "有证据",
      completeHint: "完整"
    },
    quality: {
      context: "有情境/任务",
      actions: "有具体行为",
      results: "有结果",
      evidence: "有证据",
      average: "平均完整度"
    },
    emptyData: "暂无数据",
    emptyLibrary: "暂无经历记录",
    noDescription: "未填写描述",
    edit: "编辑",
    delete: "删除"
  },
  en: {
    brandTitle: "Job Assistant",
    brandSubtitle: "Career prep powered by a reusable experience library",
    nav: {
      entry: "Entry",
      jd: "JD First",
      explore: "Self First",
      library: "Library",
      dashboard: "Dashboard",
      editor: "Add Experience"
    },
    entryEyebrow: "Start Here",
    entryTitle: "Which situation is closer to yours right now?",
    choiceA: "A. I already have target roles and need materials soon",
    choiceADesc: "Start from a JD, extract required skills/experience, then draft materials and practice questions.",
    choiceB: "B. I have not locked a role and want to clarify fit first",
    choiceBDesc: "Start from your experiences, skills, and interests to map direction and gaps.",
    deadlineTitle: "Nearest deadline?",
    deadlines: ["Within 1 week", "Within 2 weeks", "Over 1 month", "Not sure"],
    continue: "Continue",
    reset: "Reset",
    helperNone: "Choose A or B first.",
    helperDeadline: "Choose the nearest deadline.",
    helperJdReady: "Deadline recorded. You can continue to the JD-first flow.",
    helperExploreReady: "You can continue to the self-first flow.",
    situationJd: "A: JD First",
    situationExplore: "B: Self First",
    deadlinePending: "Deadline pending",
    deadlinePrefix: "Deadline",
    noVariables: "No variables recorded",
    jdTitle: "Start From A JD",
    jdNextTitle: "What happens next",
    jdNextText: "After you paste a target JD, the agent will organize required skills, experience requirements, and behavioral primitives. You can attach a resume, add relevant experience, or answer probe questions.",
    jdOutputsTitle: "Expected outputs",
    jdOutputs: ["Tailored CV copy", "Application email template", "Interview practice questions", "Gap probes and strengthening suggestions"],
    jdPasteTitle: "JD paste area",
    jdPlaceholder: "Static preview for now. JD parsing and matching will be added next.",
    exploreEyebrow: "Experience Crystal",
    exploreTitle: "Experience Crystal",
    crystalNew: "New Story",
    crystalChatTitle: "Tell it casually",
    crystalChatSubtitle: "No need to polish or claim what you did not do. If something is hard to remember, skip it.",
    crystalInputPlaceholder: "Keep talking casually",
    crystalSend: "Send",
    crystalSkip: "Skip",
    crystalOutputTitle: "Crystallized Resume Material",
    crystalOutputSubtitle: "Only stated facts are used. Missing facts stay marked as pending.",
    crystalSave: "Save to Library",
    variants: {
      data: "Data",
      action: "Action",
      collab: "Collab"
    },
    emptyBullet: "Tell one experience first. Three rewrite variants will appear here.",
    emptySource: "Original snippets from you will appear here.",
    skillsLabel: "Extracted skills",
    noSkills: "Waiting for behavioral evidence",
    profileTitle: "Your Profile Is Updating",
    directionLabel: "Direction Signal",
    directionEmpty: "Waiting for first story",
    completenessLabel: "Resume Completeness",
    slotPrefix: "Slots",
    logSummary: "Current Variables",
    logEmpty: "Waiting for user input.",
    opener: "Did you recently organize anything, big or small?",
    jdResearchOpener: "Have you asked around before deciding?",
    genericRelevantOpener: "Any relevant experience to start with?",
    confirmations: {
      default: "Got it. I noted this experience.",
      scale: "That quantity detail is useful.",
      outcome: "That outcome can become evidence.",
      artifact: "Those saved materials are valuable.",
      skip: "No problem. Let's try another angle.",
      sensitive: "That sounds like a difficult experience."
    },
    probes: {
      scale: "Roughly how many people?",
      outcome: "Any change or feedback later?",
      friction: "Any stuck point in the middle?",
      resolution: "How did you handle it?",
      artifact: "Any material left behind?",
      reflection: "What felt most natural?",
      none: "This story is already solid. Tell another one, or review the crystal on the right?",
      sensitive: "Should this become resume material?"
    },
    savedCrystal: "Saved to library.",
    addExperience: "Add Experience",
    libraryTitle: "Experience Library",
    editorTitle: "Add Experience",
    form: {
      title: "One-line title",
      titlePlaceholder: "Example: Organized a career event and improved signup conversion",
      context: "Situation / Task",
      actions: "Actions",
      results: "Results",
      evidence: "Evidence",
      save: "Save",
      clear: "Clear"
    },
    dashboardTitle: "Dashboard",
    resetDemo: "Reset Demo",
    tagDistribution: "Skill Tag Distribution",
    assetStatus: "Experience Asset Status",
    metrics: {
      records: "Experience Records",
      evidence: "Evidence Coverage",
      complete: "STAR Complete",
      topTag: "Top Skill Tag",
      none: "None",
      withEvidence: "with evidence",
      completeHint: "complete"
    },
    quality: {
      context: "Has situation/task",
      actions: "Has actions",
      results: "Has results",
      evidence: "Has evidence",
      average: "Average completeness"
    },
    emptyData: "No data yet",
    emptyLibrary: "No experience records yet",
    noDescription: "No description yet",
    edit: "Edit",
    delete: "Delete"
  }
};

const SLOT_LABELS = {
  zh: {
    context: "场合",
    role: "我的位置",
    action: "动作",
    scale: "规模",
    friction: "卡点",
    resolution: "处理",
    outcome: "变化",
    artifact: "沉淀",
    reflection: "反思"
  },
  en: {
    context: "Context",
    role: "Role",
    action: "Action",
    scale: "Scale",
    friction: "Friction",
    resolution: "Resolution",
    outcome: "Outcome",
    artifact: "Artifact",
    reflection: "Reflection"
  }
};

const SKILL_TAGS = [
  "内容创作",
  "沟通表达",
  "数据分析",
  "用户调研",
  "项目推进",
  "组织协调",
  "教学辅导",
  "跨文化沟通",
  "设计",
  "技术实现",
  "运营增长",
  "危机处理",
  "迭代决策",
  "其他"
];

const SKILL_TRANSLATIONS = {
  内容创作: "Content",
  沟通表达: "Communication",
  数据分析: "Data Analysis",
  用户调研: "User Research",
  项目推进: "Project Delivery",
  组织协调: "Coordination",
  教学辅导: "Teaching",
  跨文化沟通: "Cross-cultural",
  设计: "Design",
  技术实现: "Technical",
  运营增长: "Growth Ops",
  危机处理: "Issue Handling",
  迭代决策: "Iterative Decisions",
  其他: "Other"
};

const KEYWORDS = {
  内容创作: ["写", "文案", "内容", "文章", "视频", "脚本", "公众号", "海报"],
  沟通表达: ["沟通", "表达", "汇报", "演讲", "展示", "说明", "协调"],
  数据分析: ["数据", "分析", "指标", "表格", "sql", "excel", "统计", "转化率"],
  用户调研: ["用户", "访谈", "调研", "问卷", "体验", "反馈", "需求", "接龙", "问大家"],
  项目推进: ["项目", "推进", "排期", "交付", "里程碑", "落地", "执行"],
  组织协调: ["组织", "协调", "资源", "跨部门", "合作", "会议", "对齐", "张罗", "活动"],
  教学辅导: ["教学", "辅导", "培训", "讲解", "课程", "学生", "助教"],
  跨文化沟通: ["跨文化", "海外", "留学", "英文", "多文化", "国际"],
  设计: ["设计", "原型", "视觉", "排版", "figma", "界面", "海报"],
  技术实现: ["代码", "开发", "技术", "系统", "前端", "后端", "脚本", "自动化"],
  运营增长: ["运营", "增长", "拉新", "留存", "活动", "社群", "转化"],
  危机处理: ["危机", "故障", "投诉", "紧急", "风险", "冲突"],
  迭代决策: ["迭代", "调整", "改版", "换", "复盘", "优化"]
};

function makeDemoExperiences() {
  return [
    {
      id: crypto.randomUUID(),
      title: "组织 80 人职业分享会并提升报名转化",
      context: "社团需要为留学生提供校招信息，但以往活动报名多、到场少。",
      actions: "拆分用户画像，重写活动文案，协调嘉宾和海报排期，并用表格追踪报名来源。",
      results: "到场率从 42% 提升到 68%，活动后收到 23 条有效反馈。",
      evidence: "报名表、复盘文档、反馈问卷",
      source: "direct_entry",
      skill_tags: ["项目推进", "运营增长", "沟通表达"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "为课程小组建立数据看板",
      context: "小组需要追踪问卷回收、访谈进度和分析结论。",
      actions: "整理 Excel 字段，定义指标口径，制作每周更新模板，并向成员说明填写规范。",
      results: "减少重复沟通，项目提前两天完成初稿。",
      evidence: "Excel 模板、分析摘要",
      source: "direct_entry",
      skill_tags: ["数据分析", "组织协调", "沟通表达"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "处理跨文化团队误解并重建分工",
      context: "海外项目组成员对交付标准理解不一致，会议效率下降。",
      actions: "把任务拆成可验证交付物，分别确认阻碍点，并用双语文档同步决策。",
      results: "后续两周没有再出现遗漏任务，最终按期展示。",
      evidence: "双语会议纪要、任务看板截图",
      source: "direct_entry",
      skill_tags: ["跨文化沟通", "危机处理", "项目推进"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  let parsed = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return normalizeState(
    parsed || {
      lang: DEFAULT_LANG,
      currentView: "entry",
      situation: null,
      deadline: null,
      experiences: makeDemoExperiences()
    }
  );
}

function normalizeState(nextState) {
  const upstream = readUpstreamFromUrl(nextState.upstream || {});
  const normalized = {
    lang: nextState.lang || DEFAULT_LANG,
    currentView: nextState.currentView || "entry",
    situation: nextState.situation || null,
    deadline: nextState.deadline || null,
    experiences: Array.isArray(nextState.experiences) ? nextState.experiences : makeDemoExperiences(),
    upstream,
    crystal: nextState.crystal || null
  };
  normalized.crystal = normalizeCrystal(normalized.crystal, normalized);
  return normalized;
}

function normalizeCrystal(crystal, appState) {
  if (!crystal || !Array.isArray(crystal.messages)) {
    return makeInitialCrystal(appState);
  }
  return {
    session_id: crystal.session_id || crypto.randomUUID(),
    experience_id: crystal.experience_id || crypto.randomUUID(),
    turn: Number.isFinite(crystal.turn) ? crystal.turn : 0,
    probeCount: Number.isFinite(crystal.probeCount) ? crystal.probeCount : 0,
    variant: crystal.variant || "data",
    messages: crystal.messages,
    slots: { ...emptySlots(), ...(crystal.slots || {}) },
    skipped: Array.isArray(crystal.skipped) ? crystal.skipped : [],
    crystal: crystal.crystal || emptyCrystalOutput(),
    lastProbe: crystal.lastProbe || { type: "none", slot_targeted: null },
    log: crystal.log || null,
    sensitivePending: Boolean(crystal.sensitivePending)
  };
}

function makeInitialCrystal(appState = state) {
  return {
    session_id: crypto.randomUUID(),
    experience_id: crypto.randomUUID(),
    turn: 0,
    probeCount: 0,
    variant: "data",
    messages: [{ role: "agent", text: chooseInitialPrompt(appState) }],
    slots: emptySlots(),
    skipped: [],
    crystal: emptyCrystalOutput(),
    lastProbe: { type: "none", slot_targeted: null },
    log: null,
    sensitivePending: false
  };
}

function emptySlots() {
  return SLOT_KEYS.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});
}

function emptyCrystalOutput() {
  return {
    experience_bullet: {
      data: "先讲一段经历，我会在这里生成三种可改写素材。",
      action: "先讲一段经历，我会在这里生成三种可改写素材。",
      collab: "先讲一段经历，我会在这里生成三种可改写素材。"
    },
    provenance: [],
    pending_slots: [...DEFAULT_SLOT_PRIORITY],
    skills: []
  };
}

function readUpstreamFromUrl(existing = {}) {
  const params = new URLSearchParams(window.location.search);
  return {
    direction: params.get("direction") || existing.direction || "",
    target_jd: params.get("target_jd") || existing.target_jd || "",
    profile: params.get("profile") || existing.profile || ""
  };
}

function chooseInitialPrompt(appState = state) {
  const upstreamText = `${appState?.upstream?.direction || ""} ${appState?.upstream?.target_jd || ""}`;
  if (/调研|研究|用户|访谈|问卷|research|survey|interview/i.test(upstreamText)) {
    return copy("jdResearchOpener", appState?.lang);
  }
  if (upstreamText.trim()) {
    return copy("genericRelevantOpener", appState?.lang);
  }
  return copy("opener", appState?.lang);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function q(selector) {
  return document.querySelector(selector);
}

function qa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function copy(key, lang = state.lang || DEFAULT_LANG) {
  const root = COPY[lang] || COPY[DEFAULT_LANG];
  return key.split(".").reduce((value, part) => value?.[part], root);
}

function setText(selector, value) {
  const element = q(selector);
  if (element) element.textContent = value;
}

function setView(viewName) {
  state.currentView = viewName;
  saveState();
  qa(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });
  qa(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  renderStatus();
}

function setLanguage(lang) {
  state.lang = lang;
  saveState();
  render();
}

function setSituation(situation) {
  state.situation = situation;
  if (situation !== "jd") {
    state.deadline = null;
  }
  saveState();
  renderEntry();
}

function setDeadline(deadline) {
  state.deadline = deadline;
  saveState();
  renderEntry();
}

function applyLanguage() {
  const lang = state.lang || DEFAULT_LANG;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  setText("#brand-title", copy("brandTitle"));
  setText("#brand-subtitle", copy("brandSubtitle"));

  qa(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  qa(".nav-button").forEach((button) => {
    button.textContent = copy(`nav.${button.dataset.view}`);
  });

  setText("#entry .eyebrow", copy("entryEyebrow"));
  setText("#entry-title", copy("entryTitle"));
  setText('[data-situation="jd"] strong', copy("choiceA"));
  setText('[data-situation="jd"] span', copy("choiceADesc"));
  setText('[data-situation="explore"] strong', copy("choiceB"));
  setText('[data-situation="explore"] span', copy("choiceBDesc"));
  setText("#deadline-panel h3", copy("deadlineTitle"));
  qa(".deadline-option").forEach((button, index) => {
    button.textContent = copy("deadlines")[index];
  });
  setText("#entry-next", copy("continue"));
  setText("#entry-reset", copy("reset"));

  setText("#jd-title", copy("jdTitle"));
  setText("#jd-next-title", copy("jdNextTitle"));
  setText("#jd-next-text", copy("jdNextText"));
  setText("#jd-outputs-title", copy("jdOutputsTitle"));
  q("#jd-outputs-list").innerHTML = copy("jdOutputs").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  setText("#jd-paste-title", copy("jdPasteTitle"));
  q("#jd-text").placeholder = copy("jdPlaceholder");

  setText("#explore-eyebrow", copy("exploreEyebrow"));
  setText("#explore-title", copy("exploreTitle"));
  setText("#crystal-new", copy("crystalNew"));
  setText("#crystal-chat-title", copy("crystalChatTitle"));
  setText("#crystal-chat-subtitle", copy("crystalChatSubtitle"));
  q("#crystal-input").placeholder = copy("crystalInputPlaceholder");
  setText("#crystal-send", copy("crystalSend"));
  setText("#crystal-skip", copy("crystalSkip"));
  setText("#crystal-output-title", copy("crystalOutputTitle"));
  setText("#crystal-output-subtitle", copy("crystalOutputSubtitle"));
  setText("#crystal-save", copy("crystalSave"));
  qa(".variant-tab").forEach((button) => {
    button.textContent = copy(`variants.${button.dataset.variant}`);
  });
  setText("#crystal-skills-label", copy("skillsLabel"));
  setText("#crystal-profile-title", copy("profileTitle"));
  setText("#direction-label", copy("directionLabel"));
  setText("#completeness-label", copy("completenessLabel"));
  setText("#log-summary", copy("logSummary"));

  setText("#library-title", copy("libraryTitle"));
  setText("#library [data-open-editor]", copy("addExperience"));
  setText("#editor-title", copy("editorTitle"));
  const labels = qa("#experience-form label span");
  if (labels.length >= 5) {
    labels[0].textContent = copy("form.title");
    labels[1].textContent = copy("form.context");
    labels[2].textContent = copy("form.actions");
    labels[3].textContent = copy("form.results");
    labels[4].textContent = copy("form.evidence");
  }
  q("#title").placeholder = copy("form.titlePlaceholder");
  setText("#experience-form .primary-button", copy("form.save"));
  setText("#clear-form", copy("form.clear"));

  setText("#dashboard-title", copy("dashboardTitle"));
  setText("#seed-data", copy("resetDemo"));
  setText("#tag-bars-title", copy("tagDistribution"));
  setText("#quality-bars-title", copy("assetStatus"));
}

function renderStatus() {
  const currentView = state.currentView || "entry";
  const variables = [];
  const filled = countFilledSlots();
  if (currentView === "explore") {
    variables.push(state.situation === "jd" ? copy("situationJd") : copy("situationExplore"));
    variables.push(`${copy("slotPrefix")} ${filled}/9`);
    const topSkill = state.crystal?.crystal?.skills?.[0];
    if (topSkill) variables.push(`${copy("directionLabel")}: ${translateTag(topSkill)}`);
  } else if (state.situation === "jd") {
    variables.push(copy("situationJd"));
    variables.push(state.deadline ? `${copy("deadlinePrefix")}: ${translateDeadline(state.deadline)}` : copy("deadlinePending"));
  } else if (state.situation === "explore") {
    variables.push(copy("situationExplore"));
    variables.push(`${copy("slotPrefix")} ${filled}/9`);
    const topSkill = state.crystal?.crystal?.skills?.[0];
    if (topSkill) variables.push(`${copy("directionLabel")}: ${translateTag(topSkill)}`);
  } else {
    variables.push(copy("noVariables"));
  }

  variables.push(`${copy("libraryTitle")}: ${state.experiences.length}`);
  q("#status-pill").textContent = `${copy(`nav.${currentView}`)} · ${variables.join(" · ")}`;
}

function translateDeadline(deadline) {
  const index = COPY.zh.deadlines.indexOf(deadline);
  return index === -1 ? deadline : copy("deadlines")[index];
}

function translateTag(tag) {
  return state.lang === "en" ? SKILL_TRANSLATIONS[tag] || tag : tag;
}

function renderEntry() {
  qa(".choice-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.situation === state.situation);
  });
  q("#deadline-panel").classList.toggle("hidden", state.situation !== "jd");
  qa(".deadline-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.deadline === state.deadline);
  });

  const helper = q("#entry-helper");
  if (state.situation === "jd") {
    helper.textContent = state.deadline ? copy("helperJdReady") : copy("helperDeadline");
  } else if (state.situation === "explore") {
    helper.textContent = copy("helperExploreReady");
  } else {
    helper.textContent = copy("helperNone");
  }
  renderStatus();
}

function continueFromEntry() {
  if (state.situation === "jd" && state.deadline) {
    setView("jd");
    return;
  }
  if (state.situation === "explore") {
    setView("explore");
    return;
  }
  renderEntry();
}

function resetEntry() {
  state.situation = null;
  state.deadline = null;
  saveState();
  renderEntry();
}

function countFilledSlots() {
  return SLOT_KEYS.filter((slot) => state.crystal?.slots?.[slot]).length;
}

function handleCrystalInput(text, forcedSkip = false) {
  const value = forcedSkip ? copy("crystalSkip", "zh") : text.trim();
  if (!value) return;

  const crystal = state.crystal;
  crystal.messages.push({ role: "user", text: value });
  q("#crystal-input").value = "";

  const previousProbe = crystal.lastProbe || { type: "none", slot_targeted: null };
  const sensitive = isSensitive(value);
  if (sensitive && !crystal.sensitivePending) {
    crystal.sensitivePending = true;
    const reply = `${copy("confirmations.sensitive")} ${copy("probes.sensitive")}`;
    crystal.messages.push({ role: "agent", text: reply });
    crystal.turn += 1;
    crystal.lastProbe = { type: "none", slot_targeted: null };
    crystal.log = makeLog({ type: "none", slot: null }, [], false, null);
    saveState();
    renderCrystal();
    renderStatus();
    return;
  }

  const analysis = analyzeUserText(value, forcedSkip, previousProbe);
  if (analysis.wasSkipped) {
    const skippedSlot = previousProbe.slot_targeted || previousProbe.type;
    if (skippedSlot && skippedSlot !== "none" && !crystal.skipped.includes(skippedSlot)) {
      crystal.skipped.push(skippedSlot);
    }
  } else {
    mergeSlotUpdates(analysis.slotUpdates);
  }

  crystal.crystal = buildCrystalOutput();
  const nextProbe = chooseNextProbe();
  const confirmation = chooseConfirmation(analysis);
  const reply = nextProbe.type === "none" ? copy("probes.none") : `${confirmation} ${copy(`probes.${nextProbe.type}`)}`;
  crystal.messages.push({ role: "agent", text: reply });
  crystal.turn += 1;
  if (nextProbe.type !== "none") crystal.probeCount += 1;
  crystal.lastProbe = {
    type: nextProbe.type,
    slot_targeted: nextProbe.slot
  };
  crystal.log = makeLog(nextProbe, analysis.slotsFilled, analysis.wasSkipped, analysis.signals);
  crystal.sensitivePending = false;

  saveState();
  renderCrystal();
  renderDashboard();
  renderStatus();
}

function chooseConfirmation(analysis) {
  if (analysis.wasSkipped) return copy("confirmations.skip");
  if (analysis.slotsFilled.includes("scale")) return copy("confirmations.scale");
  if (analysis.slotsFilled.includes("outcome")) return copy("confirmations.outcome");
  if (analysis.slotsFilled.includes("artifact")) return copy("confirmations.artifact");
  return copy("confirmations.default");
}

function isSensitive(text) {
  return /健康|生病|抑郁|焦虑症|家庭变故|去世|歧视|骚扰|霸凌|创伤|diagnosis|illness|discrimination|harassment/i.test(text);
}

function analyzeUserText(text, forcedSkip, previousProbe) {
  const wasSkipped = forcedSkip || /想不起来|跳过|不知道|先不说|不用|算了|没印象/.test(text);
  const slotUpdates = {};
  const slotsFilled = [];

  if (!wasSkipped) {
    const firstSnippet = firstUsefulSnippet(text);
    if (!state.crystal.slots.context) addSlot(slotUpdates, slotsFilled, "context", firstSnippet);
    const role = detectRole(text);
    if (role) addSlot(slotUpdates, slotsFilled, "role", role);
    if (hasAction(text)) addSlot(slotUpdates, slotsFilled, "action", firstSnippet);
    const scale = extractScale(text);
    if (scale) addSlot(slotUpdates, slotsFilled, "scale", scale);
    if (hasFriction(text)) addSlot(slotUpdates, slotsFilled, "friction", firstSnippet);
    if (hasResolution(text)) addSlot(slotUpdates, slotsFilled, "resolution", extractResolution(text) || firstSnippet);
    if (hasOutcome(text)) addSlot(slotUpdates, slotsFilled, "outcome", extractOutcome(text) || firstSnippet);
    if (hasArtifact(text)) addSlot(slotUpdates, slotsFilled, "artifact", extractArtifact(text) || firstSnippet);
    if (hasReflection(text)) addSlot(slotUpdates, slotsFilled, "reflection", firstSnippet);
  }

  return {
    wasSkipped,
    slotUpdates,
    slotsFilled,
    signals: wasSkipped ? null : buildSignals(text, previousProbe)
  };
}

function addSlot(slotUpdates, slotsFilled, slot, value) {
  if (!value) return;
  slotUpdates[slot] = slotUpdates[slot] ? `${slotUpdates[slot]}；${value}` : value;
  if (!slotsFilled.includes(slot)) slotsFilled.push(slot);
}

function mergeSlotUpdates(updates) {
  Object.entries(updates).forEach(([slot, value]) => {
    const existing = state.crystal.slots[slot];
    if (!existing) {
      state.crystal.slots[slot] = value;
    } else if (!existing.includes(value)) {
      state.crystal.slots[slot] = `${existing}；${value}`;
    }
  });
}

function firstUsefulSnippet(text) {
  return shorten(
    text
      .split(/[。！？!?；;\n]/)
      .map((part) => part.trim())
      .find((part) => part.length > 0) || text,
    72
  );
}

function detectRole(text) {
  if (/老师让我|导师让我|经理让我|被安排|要求我|被要求/.test(text)) return "external";
  if (/我|自己|本人|主动|负责|发起|组织|提议|张罗/.test(text)) return "self";
  if (/我们|大家|小组|团队|一起|同学们|成员/.test(text)) return "collective";
  return "";
}

function hasAction(text) {
  return /发起|组织|提议|张罗|负责|做|写|整理|协调|问|调研|推进|制作|搭建|设计|分析|联系|沟通|复盘|调整|换|记录|收集|办/.test(text);
}

function extractScale(text) {
  const matches = text.match(/(?:\d+|[一二三四五六七八九十百千万两几]+)\s*(?:个人|人|位|名|次|天|周|月|年|小时|分钟|元|块|份|条|场|轮|组|个|%|％)/g);
  return matches ? unique(matches).slice(0, 3).join("、") : "";
}

function hasFriction(text) {
  return /不顺利|卡住|卡壳|反对|不同意见|冲突|问题|意外|困难|争议|拖延|没按时|临时|但是|不过/.test(text);
}

function hasResolution(text) {
  return /解决|处理|协调|最后|定下来|调整|改|换|沟通|解释|重新|补救|复盘|达成/.test(text);
}

function extractResolution(text) {
  const match = text.match(/(?:最后|后来|按|根据|通过|于是|然后).{0,42}(?:解决|处理|协调|定下来|调整|改|换|沟通|解释|重新|补救|达成|反馈).{0,18}/);
  return match ? shorten(match[0], 64) : "";
}

function hasOutcome(text) {
  return /后来|结果|反馈|变化|提升|降低|完成|通过|收到|增加|减少|改善|按期|转化|满意|采纳|上线/.test(text);
}

function extractOutcome(text) {
  const match = text.match(/(?:后来|结果|最后|后续|最终).{0,58}/);
  return match ? shorten(match[0], 64) : "";
}

function hasArtifact(text) {
  return /文档|表格|流程|作品|群规|海报|链接|截图|模板|书单|问卷|接龙|记录|报告|笔记|看板|简报/.test(text);
}

function extractArtifact(text) {
  const artifacts = text.match(/(?:文档|表格|流程|作品|群规|海报|链接|截图|模板|书单|问卷|接龙|记录|报告|笔记|看板|简报)/g);
  return artifacts ? unique(artifacts).join("、") : "";
}

function hasReflection(text) {
  return /收获|学到|意识到|发现自己|最顺手|擅长|能力|成长|适合|喜欢/.test(text);
}

function buildSignals(text, previousProbe) {
  const scale = extractScale(text);
  const actionEvidence = hasAction(text);
  const outcomeEvidence = hasOutcome(text);
  const skills = extractSkillsFromText(text).slice(0, 3);
  return {
    spont_quant: Boolean(scale && previousProbe?.type !== "scale"),
    agency: detectRole(text) || null,
    hedging: collectMatches(text, ["只是", "就", "其实没什么", "随便", "凑合", "没什么"]),
    inflation: collectMatches(text, ["所有人都", "非常成功", "完美", "巨大", "特别成功"]),
    affect: detectAffect(text),
    orientation: actionEvidence && outcomeEvidence ? "mixed" : outcomeEvidence ? "outcome" : actionEvidence ? "process" : null,
    initiative: /发起|组织|提议|张罗|主动|创建|搭建|负责/.test(text),
    domain_tags: detectDomains(text),
    skill_signals: skills
  };
}

function collectMatches(text, words) {
  return words.filter((word) => text.includes(word));
}

function detectAffect(text) {
  if (/开心|顺利|满意|有成就|放心|喜欢|兴奋/.test(text)) return "positive";
  if (/焦虑|崩溃|难受|压力|失败|挫败|生气|害怕/.test(text)) return "negative";
  return "neutral";
}

function detectDomains(text) {
  const domains = [];
  if (/读书会|阅读|书单/.test(text)) domains.push("阅读", "社群");
  if (/社群|群|活动|运营/.test(text)) domains.push("社群");
  if (/课程|学生|助教|教学/.test(text)) domains.push("教育");
  if (/数据|表格|指标|问卷/.test(text)) domains.push("数据");
  if (/留学|海外|英文|国际/.test(text)) domains.push("跨文化");
  if (/设计|海报|界面|原型/.test(text)) domains.push("设计");
  return unique(domains);
}

function chooseNextProbe() {
  if (state.crystal.probeCount >= 3) {
    return { type: "none", slot: null };
  }

  const slots = state.crystal.slots;
  const skipped = state.crystal.skipped;
  if (slots.friction && !slots.resolution && !skipped.includes("resolution")) {
    return { type: "resolution", slot: "resolution" };
  }

  const order = getSlotPriority();
  const target = order.find((slot) => !slots[slot] && !skipped.includes(slot));
  if (!target) return { type: "none", slot: null };
  return { type: target, slot: target };
}

function getSlotPriority() {
  const upstreamText = `${state.upstream.direction || ""} ${state.upstream.target_jd || ""}`;
  if (/协作|沟通|团队|跨部门|stakeholder|collaboration|communication/i.test(upstreamText)) {
    return ["friction", "resolution", "scale", "outcome", "artifact", "reflection"];
  }
  if (/数据|指标|量化|增长|分析|metric|data|analytics/i.test(upstreamText)) {
    return ["scale", "outcome", "artifact", "friction", "reflection"];
  }
  return [...DEFAULT_SLOT_PRIORITY];
}

function buildCrystalOutput() {
  const slots = state.crystal.slots;
  const userTexts = getUserTexts();
  const provenance = extractProvenance(userTexts);
  const skills = extractSkillsFromText(userTexts.join(" ")).slice(0, 3);
  const pending = SLOT_KEYS.filter((slot) => !slots[slot]);

  const actionFact = slots.action || slots.context || "〔待补:具体经历〕";
  const data = [
    actionFact,
    `规模/频次: ${slots.scale || "〔待补:人数/时长/频次〕"}`,
    `结果/反馈: ${slots.outcome || "〔待补:变化或反馈〕"}`
  ].join("；");

  const action = [
    `动作: ${slots.action || "〔待补:具体做了什么〕"}`,
    `处理: ${slots.resolution || "〔待补:阻力处理方式〕"}`,
    `沉淀: ${slots.artifact || "〔待补:文档/表格/作品〕"}`
  ].join("；");

  const collab = [
    `我的位置: ${roleLabel(slots.role) || "〔待补:我在其中的位置〕"}`,
    `协作/卡点: ${slots.friction || "〔待补:不同意见或卡点〕"}`,
    `结果: ${slots.outcome || "〔待补:反馈或变化〕"}`
  ].join("；");

  return {
    experience_bullet: { data, action, collab },
    provenance,
    pending_slots: pending,
    skills
  };
}

function roleLabel(role) {
  const zh = {
    self: "我主动负责/发起",
    collective: "团队共同完成",
    external: "被安排或外部要求"
  };
  const en = {
    self: "Self-initiated or owned",
    collective: "Collective work",
    external: "Assigned externally"
  };
  return (state.lang === "en" ? en : zh)[role] || role;
}

function getUserTexts() {
  return state.crystal.messages.filter((message) => message.role === "user").map((message) => message.text);
}

function extractProvenance(texts) {
  return unique(
    texts
      .flatMap((text) => text.split(/[。！？!?；;\n]/))
      .map((part) => part.trim())
      .filter((part) => part && !/想不起来|跳过|不知道/.test(part))
      .map((part) => shorten(part, 34))
  ).slice(-3);
}

function extractSkillsFromText(text) {
  const found = [];
  Object.entries(KEYWORDS).forEach(([tag, keywords]) => {
    if (keywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()))) {
      found.push(tag);
    }
  });
  return found.length ? unique(found) : [];
}

function makeLog(nextProbe, slotsFilled, wasSkipped, signals) {
  return {
    session_id: state.crystal.session_id,
    experience_id: state.crystal.experience_id,
    turn: state.crystal.turn,
    probe: {
      type: nextProbe.type,
      slot_targeted: nextProbe.slot,
      was_skipped: wasSkipped
    },
    slots_filled_this_turn: slotsFilled,
    signals,
    crystal_events: {
      variants_shown: ["data", "action", "collab"],
      variant_selected: null,
      edit_direction: null,
      chips_accepted: null,
      chips_rejected: null
    }
  };
}

function renderCrystal() {
  const crystal = state.crystal;
  const chat = q("#crystal-chat");
  chat.innerHTML = crystal.messages
    .map((message) => `<div class="chat-message ${message.role}">${escapeHtml(message.text)}</div>`)
    .join("");
  chat.scrollTop = chat.scrollHeight;

  qa(".variant-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.variant === crystal.variant);
  });

  const output = crystal.crystal || emptyCrystalOutput();
  const bullet = output.experience_bullet?.[crystal.variant] || copy("emptyBullet");
  q("#crystal-bullet").textContent = bullet || copy("emptyBullet");

  q("#crystal-provenance").innerHTML = output.provenance?.length
    ? output.provenance.map((item) => `<span>${escapeHtml(item)}</span>`).join("")
    : escapeHtml(copy("emptySource"));

  q("#crystal-skills").innerHTML = output.skills?.length
    ? output.skills.map((skill) => `<span class="tag selected">✓ ${escapeHtml(translateTag(skill))}</span>`).join("")
    : `<span class="tag">${escapeHtml(copy("noSkills"))}</span>`;

  const filled = countFilledSlots();
  setText("#direction-signal", output.skills?.[0] ? translateTag(output.skills[0]) : copy("directionEmpty"));
  setText("#slot-completeness", `${copy("slotPrefix")} ${filled}/9`);
  q("#slot-progress").style.width = `${Math.round((filled / SLOT_KEYS.length) * 100)}%`;
  q("#crystal-slots").innerHTML = SLOT_KEYS.map((slot) => {
    const status = crystal.slots[slot] ? "filled" : crystal.skipped.includes(slot) ? "skipped" : "pending";
    return `<span class="slot-chip ${status}">${escapeHtml(SLOT_LABELS[state.lang][slot])}</span>`;
  }).join("");
  q("#crystal-log").textContent = crystal.log ? JSON.stringify(crystal.log, null, 2) : copy("logEmpty");
}

function saveCrystalToLibrary() {
  const output = state.crystal.crystal;
  const selected = output?.experience_bullet?.[state.crystal.variant] || "";
  if (!selected || selected === copy("emptyBullet", "zh") || selected === copy("emptyBullet", "en")) return;

  const now = new Date().toISOString();
  const firstUserText = getUserTexts()[0] || "";
  const item = {
    id: crypto.randomUUID(),
    title: shorten(firstUserText || selected, 42),
    context: state.crystal.slots.context || firstUserText,
    actions: selected,
    results: state.crystal.slots.outcome || "",
    evidence: [state.crystal.slots.artifact, ...(output.provenance || [])].filter(Boolean).join(" / "),
    source: "experience_crystal",
    skill_tags: output.skills?.length ? output.skills : classifySkillTags([selected, firstUserText]),
    created_at: now,
    updated_at: now
  };
  state.experiences.unshift(item);
  saveState();
  render();
  setView("library");
}

function resetCrystal() {
  state.crystal = makeInitialCrystal(state);
  saveState();
  renderCrystal();
  renderStatus();
}

function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function completeness(item) {
  const fields = [item.context, item.actions, item.results, item.evidence];
  return percent(fields.filter((field) => field && field.trim()).length, fields.length);
}

function renderDashboard() {
  const experiences = state.experiences;
  const total = experiences.length;
  const evidenceCount = experiences.filter((item) => item.evidence?.trim()).length;
  const completeCount = experiences.filter((item) => completeness(item) === 100).length;
  const avgCompleteness = total
    ? Math.round(experiences.reduce((sum, item) => sum + completeness(item), 0) / total)
    : 0;
  const tagCounts = countTags(experiences);
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || copy("metrics.none");

  q("#metrics").innerHTML = [
    metric(copy("metrics.records"), total, "Experience records"),
    metric(copy("metrics.evidence"), `${percent(evidenceCount, total)}%`, `${evidenceCount}/${total} ${copy("metrics.withEvidence")}`),
    metric(copy("metrics.complete"), `${percent(completeCount, total)}%`, `${completeCount}/${total} ${copy("metrics.completeHint")}`),
    metric(copy("metrics.topTag"), translateTag(topTag), "Most frequent tag")
  ].join("");

  renderBars("#tag-bars", tagCounts, true);
  const qualityCounts = {};
  qualityCounts[copy("quality.context")] = experiences.filter((item) => item.context?.trim()).length;
  qualityCounts[copy("quality.actions")] = experiences.filter((item) => item.actions?.trim()).length;
  qualityCounts[copy("quality.results")] = experiences.filter((item) => item.results?.trim()).length;
  qualityCounts[copy("quality.evidence")] = evidenceCount;
  qualityCounts[copy("quality.average")] = Math.round((avgCompleteness / 100) * total);
  renderBars("#quality-bars", qualityCounts, false);
}

function metric(label, value, hint) {
  return `<article class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><span>${escapeHtml(hint)}</span></article>`;
}

function countTags(experiences) {
  return experiences.reduce((acc, item) => {
    (item.skill_tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

function renderBars(selector, counts, translateLabels) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  const html = entries.length
    ? entries
        .map(([label, value], index) => {
          const colors = ["var(--moss)", "var(--blue)", "var(--clay)", "var(--gold)"];
          const displayLabel = translateLabels ? translateTag(label) : label;
          return `
            <div class="bar-row">
              <span>${escapeHtml(displayLabel)}</span>
              <div class="bar-track"><div class="bar-fill" style="width:${percent(value, max)}%; background:${colors[index % colors.length]}"></div></div>
              <strong>${value}</strong>
            </div>
          `;
        })
        .join("")
    : `<p class="empty">${copy("emptyData")}</p>`;
  q(selector).innerHTML = html;
}

function renderLibrary() {
  const list = q("#experience-list");
  if (!state.experiences.length) {
    list.innerHTML = `<div class="empty">${copy("emptyLibrary")}</div>`;
    return;
  }

  list.innerHTML = state.experiences
    .map(
      (item) => `
      <article class="experience-card">
        <div class="card-head">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="summary">${escapeHtml(item.actions || item.context || copy("noDescription"))}</p>
          </div>
          <div class="card-actions">
            <button class="secondary-button" type="button" data-edit="${item.id}">${copy("edit")}</button>
            <button class="danger-button" type="button" data-delete="${item.id}">${copy("delete")}</button>
          </div>
        </div>
        <div class="tags">
          ${(item.skill_tags || []).map((tag) => `<span class="tag">${escapeHtml(translateTag(tag))}</span>`).join("")}
          <span class="tag">${escapeHtml(item.source || "direct_entry")}</span>
          <span class="tag">${completeness(item)}%</span>
        </div>
      </article>
    `
    )
    .join("");
}

function fillForm(item) {
  q("#experience-id").value = item?.id || "";
  q("#title").value = item?.title || "";
  q("#context").value = item?.context || "";
  q("#actions").value = item?.actions || "";
  q("#results").value = item?.results || "";
  q("#evidence").value = item?.evidence || "";
}

function saveExperience(event) {
  event.preventDefault();
  const id = q("#experience-id").value || crypto.randomUUID();
  const now = new Date().toISOString();
  const payload = {
    id,
    title: q("#title").value.trim(),
    context: q("#context").value.trim(),
    actions: q("#actions").value.trim(),
    results: q("#results").value.trim(),
    evidence: q("#evidence").value.trim(),
    source: "direct_entry",
    created_at: now,
    updated_at: now
  };
  payload.skill_tags = classifySkillTags([
    payload.title,
    payload.context,
    payload.actions,
    payload.results,
    payload.evidence
  ]);

  if (!payload.title) return;

  const existing = state.experiences.find((item) => item.id === id);
  if (existing) {
    Object.assign(existing, payload, { created_at: existing.created_at });
  } else {
    state.experiences.unshift(payload);
  }

  saveState();
  fillForm();
  render();
  setView("library");
}

function classifySkillTags(fields) {
  const text = fields.join(" ").toLowerCase();
  const tags = SKILL_TAGS.filter((tag) => tag !== "其他").filter((tag) =>
    KEYWORDS[tag]?.some((keyword) => text.includes(keyword.toLowerCase()))
  );
  return tags.length ? tags.slice(0, 4) : ["其他"];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function shorten(value, max = 64) {
  const text = String(value || "").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render() {
  state = normalizeState(state);
  applyLanguage();
  renderEntry();
  renderCrystal();
  renderDashboard();
  renderLibrary();
  setView(state.currentView || "entry");
}

qa(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

qa(".lang-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

qa(".choice-card").forEach((button) => {
  button.addEventListener("click", () => setSituation(button.dataset.situation));
});

qa(".deadline-option").forEach((button) => {
  button.addEventListener("click", () => setDeadline(button.dataset.deadline));
});

q("#entry-next").addEventListener("click", continueFromEntry);
q("#entry-reset").addEventListener("click", resetEntry);

qa("[data-open-editor]").forEach((button) => {
  button.addEventListener("click", () => {
    fillForm();
    setView("editor");
  });
});

q("#crystal-send").addEventListener("click", () => handleCrystalInput(q("#crystal-input").value));
q("#crystal-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleCrystalInput(q("#crystal-input").value);
  }
});
q("#crystal-skip").addEventListener("click", () => handleCrystalInput("", true));
q("#crystal-new").addEventListener("click", resetCrystal);
q("#crystal-save").addEventListener("click", saveCrystalToLibrary);
qa(".variant-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.crystal.variant = button.dataset.variant;
    saveState();
    renderCrystal();
  });
});

q("#experience-list").addEventListener("click", (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;

  if (editId) {
    const item = state.experiences.find((entry) => entry.id === editId);
    fillForm(item);
    setView("editor");
  }

  if (deleteId) {
    state.experiences = state.experiences.filter((entry) => entry.id !== deleteId);
    saveState();
    render();
  }
});

q("#experience-form").addEventListener("submit", saveExperience);
q("#clear-form").addEventListener("click", () => fillForm());
q("#seed-data").addEventListener("click", () => {
  state.experiences = makeDemoExperiences();
  saveState();
  render();
});

render();
