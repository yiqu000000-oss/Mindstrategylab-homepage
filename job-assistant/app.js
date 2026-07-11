const STORAGE_KEY = "msl_job_assistant_static_v2";
const DEFAULT_LANG = "zh";

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
    exploreTitle: "以专长 / 技能 / 兴趣入手",
    exploreAgentTitle: "agent 会整理什么",
    exploreAgentText: "先把经历、兴趣和技能聚类，推测适配岗位方向，再分析和理想岗位之间欠缺的能力与证据。",
    exploreFillTitle: "补全方式",
    exploreFillText: "通过追问挖出被忽略的经历，并提示可补的项目、作品集证据或官方证明/证书。",
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
      withEvidence: "with evidence",
      completeHint: "complete"
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
    exploreTitle: "Start From Strengths / Skills / Interests",
    exploreAgentTitle: "What the agent organizes",
    exploreAgentText: "It clusters your experiences, interests, and skills, suggests fitting role directions, then compares them with your ideal role gaps.",
    exploreFillTitle: "How gaps get filled",
    exploreFillText: "Follow-up questions recover overlooked experience, and suggest projects, portfolio evidence, or official certifications/proofs.",
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

const SKILL_TAGS = [
  "内容创作",
  "沟通表达",
  "数据分析",
  "用户研究",
  "项目推进",
  "组织协调",
  "教学辅导",
  "跨文化沟通",
  "设计",
  "技术实现",
  "运营增长",
  "危机处理",
  "其他"
];

const KEYWORDS = {
  内容创作: ["写", "文案", "内容", "文章", "视频", "脚本", "公众号", "海报"],
  沟通表达: ["沟通", "表达", "汇报", "演讲", "展示", "说明", "协调"],
  数据分析: ["数据", "分析", "指标", "表格", "sql", "excel", "统计", "转化率"],
  用户研究: ["用户", "访谈", "调研", "问卷", "体验", "反馈", "需求"],
  项目推进: ["项目", "推进", "排期", "交付", "里程碑", "落地", "执行"],
  组织协调: ["组织", "协调", "资源", "跨部门", "合作", "会议", "对齐"],
  教学辅导: ["教学", "辅导", "培训", "讲解", "课程", "学生", "助教"],
  跨文化沟通: ["跨文化", "海外", "留学", "英文", "多文化", "国际"],
  设计: ["设计", "原型", "视觉", "排版", "figma", "界面", "海报"],
  技术实现: ["代码", "开发", "技术", "系统", "前端", "后端", "脚本", "自动化"],
  运营增长: ["运营", "增长", "拉新", "留存", "活动", "社群", "转化"],
  危机处理: ["危机", "故障", "投诉", "紧急", "风险", "救火", "冲突"]
};

const DEMO_EXPERIENCES = [
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

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    lang: DEFAULT_LANG,
    currentView: "entry",
    situation: null,
    deadline: null,
    experiences: DEMO_EXPERIENCES
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function t(key) {
  return key.split(".").reduce((value, part) => value?.[part], COPY[state.lang || DEFAULT_LANG]);
}

function classifySkillTags(fields) {
  const text = fields.join(" ").toLowerCase();
  const tags = SKILL_TAGS.filter((tag) => tag !== "其他").filter((tag) =>
    KEYWORDS[tag].some((keyword) => text.includes(keyword.toLowerCase()))
  );
  return tags.length ? tags.slice(0, 4) : ["其他"];
}

function setView(viewName) {
  state.currentView = viewName;
  saveState();
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  renderStatus();
}

function setLanguage(lang) {
  state.lang = lang;
  saveState();
  applyLanguage();
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
  document.querySelector("#brand-title").textContent = t("brandTitle");
  document.querySelector("#brand-subtitle").textContent = t("brandSubtitle");

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.textContent = t(`nav.${button.dataset.view}`);
  });

  document.querySelector("#entry .eyebrow").textContent = t("entryEyebrow");
  document.querySelector("#entry-title").textContent = t("entryTitle");
  document.querySelector('[data-situation="jd"] strong').textContent = t("choiceA");
  document.querySelector('[data-situation="jd"] span').textContent = t("choiceADesc");
  document.querySelector('[data-situation="explore"] strong').textContent = t("choiceB");
  document.querySelector('[data-situation="explore"] span').textContent = t("choiceBDesc");
  document.querySelector("#deadline-panel h3").textContent = t("deadlineTitle");
  document.querySelectorAll(".deadline-option").forEach((button, index) => {
    button.textContent = t("deadlines")[index];
  });
  document.querySelector("#entry-next").textContent = t("continue");
  document.querySelector("#entry-reset").textContent = t("reset");

  document.querySelector("#jd-title").textContent = t("jdTitle");
  document.querySelector("#jd .panel:nth-of-type(1) h3").textContent = t("jdNextTitle");
  document.querySelector("#jd .panel:nth-of-type(1) p").textContent = t("jdNextText");
  document.querySelector("#jd .panel:nth-of-type(2) h3").textContent = t("jdOutputsTitle");
  document.querySelector("#jd .plain-list").innerHTML = t("jdOutputs").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector(".prompt-panel h3").textContent = t("jdPasteTitle");
  document.querySelector("#jd-text").placeholder = t("jdPlaceholder");

  document.querySelector("#explore-title").textContent = t("exploreTitle");
  document.querySelector("#explore [data-open-editor]").textContent = t("addExperience");
  document.querySelector("#explore .panel:nth-of-type(1) h3").textContent = t("exploreAgentTitle");
  document.querySelector("#explore .panel:nth-of-type(1) p").textContent = t("exploreAgentText");
  document.querySelector("#explore .panel:nth-of-type(2) h3").textContent = t("exploreFillTitle");
  document.querySelector("#explore .panel:nth-of-type(2) p").textContent = t("exploreFillText");

  document.querySelector("#library-title").textContent = t("libraryTitle");
  document.querySelector("#library [data-open-editor]").textContent = t("addExperience");
  document.querySelector("#editor-title").textContent = t("editorTitle");
  const labels = document.querySelectorAll("#experience-form label span");
  labels[0].textContent = t("form.title");
  labels[1].textContent = t("form.context");
  labels[2].textContent = t("form.actions");
  labels[3].textContent = t("form.results");
  labels[4].textContent = t("form.evidence");
  document.querySelector("#title").placeholder = t("form.titlePlaceholder");
  document.querySelector("#experience-form .primary-button").textContent = t("form.save");
  document.querySelector("#clear-form").textContent = t("form.clear");

  document.querySelector("#dashboard-title").textContent = t("dashboardTitle");
  document.querySelector("#seed-data").textContent = t("resetDemo");
  document.querySelector("#tag-bars").closest(".panel").querySelector("h3").textContent = t("tagDistribution");
  document.querySelector("#quality-bars").closest(".panel").querySelector("h3").textContent = t("assetStatus");
}

function renderStatus() {
  const currentView = state.currentView || "entry";
  const variables = [];
  if (state.situation === "jd") {
    variables.push(t("situationJd"));
    variables.push(state.deadline ? `${t("deadlinePrefix")}: ${translateDeadline(state.deadline)}` : t("deadlinePending"));
  } else if (state.situation === "explore") {
    variables.push(t("situationExplore"));
  } else {
    variables.push(t("noVariables"));
  }

  variables.push(`${t("libraryTitle")}: ${state.experiences.length}`);
  document.querySelector("#status-pill").textContent = `${t(`nav.${currentView}`)} · ${variables.join(" · ")}`;
}

function translateDeadline(deadline) {
  const zhDeadlines = COPY.zh.deadlines;
  const index = zhDeadlines.indexOf(deadline);
  if (index === -1) {
    return deadline;
  }
  return t("deadlines")[index];
}

function renderEntry() {
  document.querySelectorAll(".choice-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.situation === state.situation);
  });
  document.querySelector("#deadline-panel").classList.toggle("hidden", state.situation !== "jd");
  document.querySelectorAll(".deadline-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.deadline === state.deadline);
  });

  const helper = document.querySelector("#entry-helper");
  if (state.situation === "jd") {
    helper.textContent = state.deadline ? t("helperJdReady") : t("helperDeadline");
  } else if (state.situation === "explore") {
    helper.textContent = t("helperExploreReady");
  } else {
    helper.textContent = t("helperNone");
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
  const evidenceCount = experiences.filter((item) => item.evidence.trim()).length;
  const completeCount = experiences.filter((item) => completeness(item) === 100).length;
  const avgCompleteness = total
    ? Math.round(experiences.reduce((sum, item) => sum + completeness(item), 0) / total)
    : 0;
  const tagCounts = countTags(experiences);
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || t("metrics.none");

  document.querySelector("#metrics").innerHTML = [
    metric(t("metrics.records"), total, "Experience records"),
    metric(t("metrics.evidence"), `${percent(evidenceCount, total)}%`, `${evidenceCount}/${total} ${t("metrics.withEvidence")}`),
    metric(t("metrics.complete"), `${percent(completeCount, total)}%`, `${completeCount}/${total} ${t("metrics.completeHint")}`),
    metric(t("metrics.topTag"), topTag, "Most frequent tag")
  ].join("");

  renderBars("#tag-bars", tagCounts);
  const qualityCounts = {};
  qualityCounts[t("quality.context")] = experiences.filter((item) => item.context.trim()).length;
  qualityCounts[t("quality.actions")] = experiences.filter((item) => item.actions.trim()).length;
  qualityCounts[t("quality.results")] = experiences.filter((item) => item.results.trim()).length;
  qualityCounts[t("quality.evidence")] = evidenceCount;
  qualityCounts[t("quality.average")] = Math.round((avgCompleteness / 100) * total);
  renderBars("#quality-bars", qualityCounts);
}

function metric(label, value, hint) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><span>${hint}</span></article>`;
}

function countTags(experiences) {
  return experiences.reduce((acc, item) => {
    item.skill_tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

function renderBars(selector, counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  const html = entries.length
    ? entries
        .map(([label, value], index) => {
          const colors = ["var(--moss)", "var(--blue)", "var(--clay)", "var(--gold)"];
          return `
            <div class="bar-row">
              <span>${escapeHtml(label)}</span>
              <div class="bar-track"><div class="bar-fill" style="width:${percent(value, max)}%; background:${colors[index % colors.length]}"></div></div>
              <strong>${value}</strong>
            </div>
          `;
        })
        .join("")
    : `<p class="empty">${t("emptyData")}</p>`;
  document.querySelector(selector).innerHTML = html;
}

function renderLibrary() {
  const list = document.querySelector("#experience-list");
  if (!state.experiences.length) {
    list.innerHTML = `<div class="empty">${t("emptyLibrary")}</div>`;
    return;
  }

  list.innerHTML = state.experiences
    .map(
      (item) => `
      <article class="experience-card">
        <div class="card-head">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="summary">${escapeHtml(item.actions || item.context || t("noDescription"))}</p>
          </div>
          <div class="card-actions">
            <button class="secondary-button" type="button" data-edit="${item.id}">${t("edit")}</button>
            <button class="danger-button" type="button" data-delete="${item.id}">${t("delete")}</button>
          </div>
        </div>
        <div class="tags">
          ${item.skill_tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          <span class="tag">${escapeHtml(item.source)}</span>
          <span class="tag">${completeness(item)}%</span>
        </div>
      </article>
    `
    )
    .join("");
}

function fillForm(item) {
  document.querySelector("#experience-id").value = item?.id || "";
  document.querySelector("#title").value = item?.title || "";
  document.querySelector("#context").value = item?.context || "";
  document.querySelector("#actions").value = item?.actions || "";
  document.querySelector("#results").value = item?.results || "";
  document.querySelector("#evidence").value = item?.evidence || "";
}

function saveExperience(event) {
  event.preventDefault();
  const id = document.querySelector("#experience-id").value || crypto.randomUUID();
  const now = new Date().toISOString();
  const payload = {
    id,
    title: document.querySelector("#title").value.trim(),
    context: document.querySelector("#context").value.trim(),
    actions: document.querySelector("#actions").value.trim(),
    results: document.querySelector("#results").value.trim(),
    evidence: document.querySelector("#evidence").value.trim(),
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render() {
  state.lang = state.lang || DEFAULT_LANG;
  state.currentView = state.currentView || "entry";
  applyLanguage();
  renderEntry();
  renderDashboard();
  renderLibrary();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.querySelectorAll(".choice-card").forEach((button) => {
  button.addEventListener("click", () => setSituation(button.dataset.situation));
});

document.querySelectorAll(".deadline-option").forEach((button) => {
  button.addEventListener("click", () => setDeadline(button.dataset.deadline));
});

document.querySelector("#entry-next").addEventListener("click", continueFromEntry);
document.querySelector("#entry-reset").addEventListener("click", resetEntry);

document.querySelectorAll("[data-open-editor]").forEach((button) => {
  button.addEventListener("click", () => {
    fillForm();
    setView("editor");
  });
});

document.querySelector("#experience-list").addEventListener("click", (event) => {
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

document.querySelector("#experience-form").addEventListener("submit", saveExperience);
document.querySelector("#clear-form").addEventListener("click", () => fillForm());
document.querySelector("#seed-data").addEventListener("click", () => {
  state.experiences = DEMO_EXPERIENCES.map((item) => ({ ...item, id: crypto.randomUUID() }));
  saveState();
  render();
});

render();
