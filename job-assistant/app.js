const STORAGE_KEY = "msl_job_assistant_static_v2";

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
    situation: null,
    deadline: null,
    experiences: DEMO_EXPERIENCES
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function classifySkillTags(fields) {
  const text = fields.join(" ").toLowerCase();
  const tags = SKILL_TAGS.filter((tag) => tag !== "其他").filter((tag) =>
    KEYWORDS[tag].some((keyword) => text.includes(keyword.toLowerCase()))
  );
  return tags.length ? tags.slice(0, 4) : ["其他"];
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
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

function renderEntry() {
  document.querySelectorAll(".choice-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.situation === state.situation);
  });
  document.querySelector("#deadline-panel").classList.toggle("hidden", state.situation !== "jd");
  document.querySelectorAll(".deadline-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.deadline === state.deadline);
  });

  const helper = document.querySelector("#entry-helper");
  const pill = document.querySelector("#status-pill");
  if (state.situation === "jd") {
    helper.textContent = state.deadline ? "已记录截止时间，可以进入 JD 入手流程。" : "请选择最近的截止时间。";
    pill.textContent = state.deadline ? `JD 入手 · ${state.deadline}` : "JD 入手 · 待选截止时间";
  } else if (state.situation === "explore") {
    helper.textContent = "可以进入探索入手流程。";
    pill.textContent = "探索入手";
  } else {
    helper.textContent = "先选择 A 或 B。";
    pill.textContent = "未选择入口";
  }
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
  const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "暂无";

  document.querySelector("#metrics").innerHTML = [
    metric("经历记录", total, "Experience records"),
    metric("证据覆盖", `${percent(evidenceCount, total)}%`, `${evidenceCount}/${total} with evidence`),
    metric("STAR 完整", `${percent(completeCount, total)}%`, `${completeCount}/${total} complete`),
    metric("主能力标签", topTag, "Most frequent tag")
  ].join("");

  renderBars("#tag-bars", tagCounts);
  renderBars("#quality-bars", {
    "有情境/任务": experiences.filter((item) => item.context.trim()).length,
    有具体行为: experiences.filter((item) => item.actions.trim()).length,
    有结果: experiences.filter((item) => item.results.trim()).length,
    有证据: evidenceCount,
    平均完整度: Math.round((avgCompleteness / 100) * total)
  });
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
    : `<p class="empty">暂无数据</p>`;
  document.querySelector(selector).innerHTML = html;
}

function renderLibrary() {
  const list = document.querySelector("#experience-list");
  if (!state.experiences.length) {
    list.innerHTML = `<div class="empty">暂无经历记录</div>`;
    return;
  }

  list.innerHTML = state.experiences
    .map(
      (item) => `
      <article class="experience-card">
        <div class="card-head">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p class="summary">${escapeHtml(item.actions || item.context || "未填写描述")}</p>
          </div>
          <div class="card-actions">
            <button class="secondary-button" type="button" data-edit="${item.id}">编辑</button>
            <button class="danger-button" type="button" data-delete="${item.id}">删除</button>
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
  renderEntry();
  renderDashboard();
  renderLibrary();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
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
