/* Influence Analysis - main application logic (static SPA)
   - Stores submissions in localStorage
   - Optionally POSTs anonymous data when API_ENDPOINT is set (see config.js)
*/

(() => {
  "use strict";

  const STORAGE_KEY = "influence_analysis_submissions_v1";
  const LEADS_STORAGE_KEY = "influence_analysis_consult_leads_v1";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const round1 = (n) => Math.round(n * 10) / 10;
  const nowIso = () => new Date().toISOString();

  const i18n = {
    en: {
      brandSubtitle: "Professional Self-Assessment Prototype",
      welcomeLead:
        "A serious, bilingual self-assessment and research prototype designed to help you understand how your influence emerges within collective systems.",
      callouts: [
        {
          title: "What it measures",
          body: "Influence is defined as your ability to shape others’ perceptions, decisions, emotions, behaviors, and allocation of attention or resources within a collective system.",
        },
        {
          title: "Applicable contexts",
          body: "Workplace teams, student organizations, friend groups, online communities, social media groups, livestream audiences, volunteer organizations, and other collective settings.",
        },
        {
          title: "Purpose",
          body: "Designed for self-reflection, leadership development, and exploratory research—not entertainment and not a clinically validated psychological assessment.",
        },
        {
          title: "Privacy & future",
          body: "Anonymous responses may be collected to improve the assessment. Advanced paid reports may be offered in the future (optional).",
        },
      ],
      timeTitle: "Estimated time",
      timeValue: "5–7 minutes",
      noteTitle: "Not a diagnosis",
      noteValue: "Exploratory & developmental",
      dimensionsTitle: "Five dimensions",
      startTitle: "Before you begin",
      contextLabel: "Select your main context",
      contextHelp: "Choose the setting you are evaluating. Your answers should reflect this context.",
      consentText:
        "Your anonymous responses may be used to improve this assessment and support future research and product development.",
      consentCheckboxLabel: "I agree",
      startBtn: "Start Assessment",
      assessmentTitle: "Assessment",
      assessmentSubtitle: (ctxLabel) => `Context: ${ctxLabel} • 30 questions • Scale 1–7`,
      progressLabel: "Progress",
      prev: "Previous",
      next: "Next",
      finish: "View Results",
      likertLeft: "Strongly Disagree",
      likertMid: "Neutral",
      likertRight: "Strongly Agree",
      resultsTitle: "Results",
      resultsSubtitle:
        "This is an exploratory prototype. Use the results for reflection and development, not as a definitive evaluation.",
      overallTitle: "Overall Influence Score",
      radarTitle: "Influence Profile",
      radarHelp:
        "Radar chart shows your five dimension scores on a 1–7 scale (equal-weight prototype).",
      interpretTitle: "Interpretation",
      recommendTitle: "Development Recommendations",
      contextTipsTitle: "Context-specific suggestions",
      copy: "Copy Results",
      downloadJson: "Download My Data (JSON)",
      downloadPdf: "Download Report (PDF)",
      pdfPlaceholder:
        "PDF export is a placeholder in this prototype. A formatted report will be available in a future premium version.",
      validationTitle: "Post-result validation (research)",
      validationSubtitle:
        "Optional. These questions help improve the assessment model in future versions.",
      v1: "How influential do you consider yourself in this context?",
      v2: "How accurate do you think these results are?",
      v3: "How useful are these results?",
      feedbackLabel: "Optional open feedback",
      submit: "Submit",
      submitOk: "Saved locally. Thank you—your anonymous response supports improvement efforts.",
      submitFail: "Submission failed. Your data is still saved locally.",
      premiumTitle: "Professional Interpretation",
      premiumItems: [
        "Request professional interpretation based on your assessment results",
        "Optional: personalized strategic recommendations",
        "Optional: one-on-one consultation",
      ],
      upgrade: "Get Professional Interpretation",
      consultTag: "Manual service",
      consultSubtitle:
        "Provide your contact information to generate a pre-filled email draft. Your email client will open with a draft addressed to our consultation inbox.",
      consultNameLabel: "Name (optional)",
      consultEmailLabel: "Email (required)",
      consultEmailHelp: "We will use this email only to respond to your request.",
      consultConcernLabel: "Main concern (optional)",
      consultContactLabel: "Preferred contact method",
      consultContactOptions: ["Email", "WeChat", "Other"],
      consultCancel: "Cancel",
      consultSubmit: "Create Email Draft",
      consultInvalidEmail: "Please enter a valid email address.",
      consultConfirm:
        "Thank you for your interest. A draft email has been prepared. Please send it to request a professional interpretation.",
      pricingTitle: "Pricing",
      pricingItems: [
        "Introductory Professional Interpretation",
        "Personalized Strategic Recommendations",
        "One-on-One Consultation",
        "Pricing available upon request",
      ],
      pricingNote: "Professional interpretations are provided manually based on your assessment results and personal context.",
      restart: "Restart",
      footerLeft: () => `Influence Analysis • v${APP_VERSION}`,
      footerRight: "Prototype for self-reflection & research",
      homeBack: "Back to Home",
      levels: [
        { key: "emerging", label: "Emerging Influence" },
        { key: "developing", label: "Developing Influence" },
        { key: "established", label: "Established Influence" },
        { key: "strategic", label: "Strategic Influence" },
        { key: "system", label: "System-Level Influence" },
      ],
    },
    zh: {
      brandSubtitle: "专业自评原型（双语）",
      welcomeLead:
        "这是一个严肃的双语自我测评与研究原型，旨在帮助你理解：你的影响力如何在集体系统中通过多维互动而形成。",
      callouts: [
        {
          title: "测量内容",
          body: "影响力定义为：你在一个集体系统中，能够影响他人的认知、决策、情绪、行为，以及注意力或资源分配的程度。",
        },
        {
          title: "适用场景",
          body: "职场团队、学生组织、朋友圈、网络社群、社交媒体群体、直播社群、志愿组织，以及其他集体系统。",
        },
        {
          title: "使用目的",
          body: "用于自我反思、领导力发展与探索性研究——不是娱乐测验，也不是临床验证的心理诊断工具。",
        },
        {
          title: "匿名与未来",
          body: "你的匿名回答可能被用于改进测评，并支持未来的研究与产品开发。未来可能提供可选的付费深度报告。",
        },
      ],
      timeTitle: "预计用时",
      timeValue: "5–7 分钟",
      noteTitle: "非诊断工具",
      noteValue: "探索性 & 发展导向",
      dimensionsTitle: "五个维度",
      startTitle: "开始前",
      contextLabel: "选择主要情境",
      contextHelp: "请选择你要评估的场景。后续回答请以该情境为准。",
      consentText: "你的匿名回答可能被用于改进本测评，并支持未来的研究与产品开发。",
      consentCheckboxLabel: "我同意",
      startBtn: "开始测评",
      assessmentTitle: "测评",
      assessmentSubtitle: (ctxLabel) => `情境：${ctxLabel} • 共 30 题 • 量表 1–7`,
      progressLabel: "进度",
      prev: "上一题",
      next: "下一题",
      finish: "查看结果",
      likertLeft: "非常不同意",
      likertMid: "中立",
      likertRight: "非常同意",
      resultsTitle: "结果",
      resultsSubtitle: "本工具为探索性原型。请将结果用于反思与发展，而非定性结论。",
      overallTitle: "总体影响力得分",
      radarTitle: "影响力画像",
      radarHelp: "雷达图展示五个维度得分（1–7），当前原型使用等权重。",
      interpretTitle: "解读",
      recommendTitle: "发展建议",
      contextTipsTitle: "情境化建议",
      copy: "复制结果",
      downloadJson: "下载我的数据（JSON）",
      downloadPdf: "下载报告（PDF）",
      pdfPlaceholder: "PDF 导出为占位功能。未来的专业版本将提供排版完善的报告。",
      validationTitle: "结果后验证（研究）",
      validationSubtitle: "可选。这些问题将帮助未来版本改进模型。",
      v1: "在此情境中，你认为自己有多大影响力？",
      v2: "你认为这些结果有多准确？",
      v3: "你认为这些结果有多有用？",
      feedbackLabel: "开放反馈（可选）",
      submit: "提交",
      submitOk: "已本地保存。感谢你的匿名回答，它将支持我们改进测评。",
      submitFail: "提交失败。你的数据仍已本地保存。",
      premiumTitle: "专业解读",
      premiumItems: ["基于你的测评结果，申请专业解读", "可选：个性化战略建议", "可选：一对一咨询"],
      upgrade: "获取专业解读",
      consultTag: "人工服务",
      consultSubtitle: "填写信息后，系统将生成并打开一封预填的邮件草稿，收件人为我们的咨询邮箱。",
      consultNameLabel: "姓名（可选）",
      consultEmailLabel: "邮箱（必填）",
      consultEmailHelp: "该邮箱仅用于回复你的申请。",
      consultConcernLabel: "主要困扰（可选）",
      consultContactLabel: "偏好的联系方式",
      consultContactOptions: ["邮箱", "微信", "其他"],
      consultCancel: "取消",
      consultSubmit: "生成邮件草稿",
      consultInvalidEmail: "请输入有效的邮箱地址。",
      consultConfirm: "感谢你的信任。系统已为你生成邮件草稿，请发送邮件以申请专业解读。",
      pricingTitle: "价格",
      pricingItems: ["入门级专业解读", "个性化战略建议", "一对一咨询", "价格请邮件咨询"],
      pricingNote: "专业解读将结合你的测评结果与个人背景，由人工进行深入分析。",
      restart: "重新开始",
      footerLeft: () => `Influence Analysis • v${APP_VERSION}`,
      footerRight: "用于自我反思与研究的原型",
      homeBack: "返回首页",
      levels: [
        { key: "emerging", label: "影响力萌芽期" },
        { key: "developing", label: "影响力发展期" },
        { key: "established", label: "影响力稳定期" },
        { key: "strategic", label: "战略影响力阶段" },
        { key: "system", label: "系统级影响力阶段" },
      ],
    },
  };

  const levelFromScore = (score) => {
    // Prototype thresholds on a 1–7 scale.
    if (score < 2.6) return "emerging";
    if (score < 3.6) return "developing";
    if (score < 4.6) return "established";
    if (score < 5.6) return "strategic";
    return "system";
  };

  const $ = (id) => document.getElementById(id);

  const els = {
    brandSubtitle: $("brandSubtitle"),
    welcomeTitle: $("welcomeTitle"),
    welcomeLead: $("welcomeLead"),
    welcomeCallouts: $("welcomeCallouts"),
    timeTitle: $("timeTitle"),
    timeValue: $("timeValue"),
    noteTitle: $("noteTitle"),
    noteValue: $("noteValue"),
    dimensionsTitle: $("dimensionsTitle"),
    startTitle: $("startTitle"),
    dimensionList: $("dimensionList"),

    contextLabel: $("contextLabel"),
    contextHelp: $("contextHelp"),
    contextSelect: $("contextSelect"),
    consentText: $("consentText"),
    consentCheckbox: $("consentCheckbox"),
    consentCheckboxLabel: $("consentCheckboxLabel"),
    btnStart: $("btnStart"),

    screenWelcome: $("screenWelcome"),
    screenAssessment: $("screenAssessment"),
    screenResults: $("screenResults"),

    assessmentTitle: $("assessmentTitle"),
    assessmentSubtitle: $("assessmentSubtitle"),
    progressLabel: $("progressLabel"),
    progressValue: $("progressValue"),
    progressBar: $("progressBar"),
    questionCard: $("questionCard"),
    btnPrev: $("btnPrev"),
    btnNext: $("btnNext"),

    resultsTitle: $("resultsTitle"),
    resultsSubtitle: $("resultsSubtitle"),
    overallTitle: $("overallTitle"),
    overallScore: $("overallScore"),
    levelLine: $("levelLine"),
    dimensionScores: $("dimensionScores"),
    radarTitle: $("radarTitle"),
    radarHelp: $("radarHelp"),
    interpretation: $("interpretation"),
    recommendations: $("recommendations"),
    contextTipsTitle: $("contextTipsTitle"),
    contextTips: $("contextTips"),
    btnCopy: $("btnCopy"),
    btnDownloadJson: $("btnDownloadJson"),
    btnDownloadPdf: $("btnDownloadPdf"),
    btnRestart: $("btnRestart"),

    validationTitle: $("validationTitle"),
    validationSubtitle: $("validationSubtitle"),
    validationBlock: $("validationBlock"),
    feedbackLabel: $("feedbackLabel"),
    openFeedback: $("openFeedback"),
    btnSubmit: $("btnSubmit"),
    submitStatus: $("submitStatus"),

    premiumTitle: $("premiumTitle"),
    premiumList: $("premiumList"),
    btnUpgrade: $("btnUpgrade"),
    pricingTitle: $("pricingTitle"),
    pricingList: $("pricingList"),
    pricingNote: $("pricingNote"),

    consultModal: $("consultModal"),
    consultOverlay: $("consultOverlay"),
    consultClose: $("consultClose"),
    consultForm: $("consultForm"),
    consultTitle: $("consultTitle"),
    consultSubtitle: $("consultSubtitle"),
    consultNameLabel: $("consultNameLabel"),
    consultEmailLabel: $("consultEmailLabel"),
    consultConcernLabel: $("consultConcernLabel"),
    consultContactLabel: $("consultContactLabel"),
    consultEmailHelp: $("consultEmailHelp"),
    consultCancel: $("consultCancel"),
    consultSubmit: $("consultSubmit"),
    consultStatus: $("consultStatus"),
    consultName: $("consultName"),
    consultEmail: $("consultEmail"),
    consultConcern: $("consultConcern"),
    consultContact: $("consultContact"),

    footerLeft: $("footerLeft"),
    footerRight: $("footerRight"),

    langEn: $("langEn"),
    langZh: $("langZh"),
    homeBackLink: $("homeBackLink"),
  };

  const state = {
    language: "en",
    context_type: "workplace",
    consent_given: false,
    index: 0,
    responses: new Array(QUESTIONS.length).fill(4),
    // Post-result validation (research)
    self_rated_influence: 4,
    perceived_accuracy: 4,
    perceived_usefulness: 4,
    open_feedback: "",
    submitted: false,
    lastPayload: null,
  };

  let radarChart = null;

  const t = () => i18n[state.language];
  const tl = (obj) => (state.language === "zh" ? obj.zh : obj.en);

  const setScreen = (screen) => {
    const isWelcome = screen === "welcome";
    const isAssessment = screen === "assessment";
    const isResults = screen === "results";
    els.screenWelcome.classList.toggle("hidden", !isWelcome);
    els.screenAssessment.classList.toggle("hidden", !isAssessment);
    els.screenResults.classList.toggle("hidden", !isResults);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLanguage = () => {
    const tr = t();
    document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";

    els.brandSubtitle.textContent = tr.brandSubtitle;
    els.welcomeLead.textContent = tr.welcomeLead;
    els.timeTitle.textContent = tr.timeTitle;
    els.timeValue.textContent = tr.timeValue;
    els.noteTitle.textContent = tr.noteTitle;
    els.noteValue.textContent = tr.noteValue;

    els.dimensionsTitle.textContent = tr.dimensionsTitle;
    els.startTitle.textContent = tr.startTitle;
    els.contextLabel.textContent = tr.contextLabel;
    els.contextHelp.textContent = tr.contextHelp;
    els.consentText.textContent = tr.consentText;
    els.consentCheckboxLabel.textContent = tr.consentCheckboxLabel;
    els.btnStart.textContent = `${tr.startBtn} / ${state.language === "en" ? "开始测评" : "Start Assessment"}`;

    els.assessmentTitle.textContent = tr.assessmentTitle;
    els.progressLabel.textContent = tr.progressLabel;
    els.btnPrev.textContent = `${tr.prev} / ${state.language === "en" ? "上一题" : "Previous"}`;
    // next label updates dynamically

    els.resultsTitle.textContent = tr.resultsTitle;
    els.resultsSubtitle.textContent = tr.resultsSubtitle;
    els.overallTitle.textContent = tr.overallTitle;
    els.radarTitle.textContent = tr.radarTitle;
    els.radarHelp.textContent = tr.radarHelp;
    $("interpretTitle").textContent = tr.interpretTitle;
    $("recommendTitle").textContent = tr.recommendTitle;
    els.contextTipsTitle.textContent = tr.contextTipsTitle;

    els.btnCopy.textContent = `${tr.copy} / ${state.language === "en" ? "复制结果" : "Copy Results"}`;
    els.btnDownloadJson.textContent = tr.downloadJson;
    els.btnDownloadPdf.textContent = tr.downloadPdf;
    els.btnRestart.textContent = `${tr.restart} / ${state.language === "en" ? "重新开始" : "Restart"}`;

    els.validationTitle.textContent = tr.validationTitle;
    els.validationSubtitle.textContent = tr.validationSubtitle;
    els.feedbackLabel.textContent = tr.feedbackLabel;
    els.btnSubmit.textContent = `${tr.submit} / ${state.language === "en" ? "提交" : "Submit"}`;

    els.premiumTitle.textContent = tr.premiumTitle;
    els.premiumList.innerHTML = "";
    tr.premiumItems.forEach((txt) => {
      const li = document.createElement("li");
      li.textContent = txt;
      els.premiumList.appendChild(li);
    });
    els.btnUpgrade.textContent = `${tr.upgrade} / ${state.language === "en" ? "获取专业解读" : "Get Professional Interpretation"}`;

    // Replace placeholder "Coming soon" tag with bilingual service tag
    const premiumTag = document.querySelector(".premium .tag");
    if (premiumTag) {
      premiumTag.textContent = `${tr.consultTag} / ${state.language === "en" ? "人工服务" : "Manual service"}`;
    }

    // Pricing + note
    if (els.pricingTitle) els.pricingTitle.textContent = tr.pricingTitle;
    if (els.pricingList) {
      els.pricingList.innerHTML = "";
      tr.pricingItems.forEach((txt) => {
        const li = document.createElement("li");
        li.textContent = txt;
        els.pricingList.appendChild(li);
      });
    }
    if (els.pricingNote) els.pricingNote.textContent = `${tr.pricingNote} / ${state.language === "en" ? "专业解读将结合你的测评结果与个人背景，由人工进行深入分析。" : "Professional interpretations are provided manually based on your assessment results and personal context."}`;

    // Modal strings
    if (els.consultTitle) {
      els.consultTitle.textContent = `${tr.upgrade} / ${state.language === "en" ? "获取专业解读" : "Get Professional Interpretation"}`;
    }
    if (els.consultSubtitle) els.consultSubtitle.textContent = `${tr.consultSubtitle} / ${state.language === "en" ? "填写信息后，系统将生成并打开一封预填的邮件草稿，收件人为我们的咨询邮箱。" : "Provide your contact information to generate a pre-filled email draft. Your email client will open with a draft addressed to our consultation inbox."}`;
    if (els.consultNameLabel) els.consultNameLabel.textContent = tr.consultNameLabel;
    if (els.consultEmailLabel) els.consultEmailLabel.textContent = tr.consultEmailLabel;
    if (els.consultConcernLabel) els.consultConcernLabel.textContent = tr.consultConcernLabel;
    if (els.consultContactLabel) els.consultContactLabel.textContent = tr.consultContactLabel;
    if (els.consultEmailHelp) els.consultEmailHelp.textContent = tr.consultEmailHelp;
    if (els.consultCancel) els.consultCancel.textContent = `${tr.consultCancel} / ${state.language === "en" ? "取消" : "Cancel"}`;
    if (els.consultSubmit) els.consultSubmit.textContent = `${tr.consultSubmit} / ${state.language === "en" ? "生成邮件草稿" : "Create Email Draft"}`;

    // Modal contact options
    if (els.consultContact) {
      const opts = tr.consultContactOptions || [];
      els.consultContact.innerHTML = "";
      opts.forEach((label) => {
        const o = document.createElement("option");
        o.value = label;
        o.textContent = label;
        els.consultContact.appendChild(o);
      });
      // preserve selection if possible
      if (!els.consultContact.value) els.consultContact.value = opts[0] || "";
    }

    els.footerLeft.textContent = tr.footerLeft();
    els.footerRight.textContent = tr.footerRight;

    els.langEn.classList.toggle("pill--active", state.language === "en");
    els.langZh.classList.toggle("pill--active", state.language === "zh");
    els.langEn.setAttribute("aria-pressed", state.language === "en" ? "true" : "false");
    els.langZh.setAttribute("aria-pressed", state.language === "zh" ? "true" : "false");

    if (els.homeBackLink) els.homeBackLink.textContent = tr.homeBack;

    renderWelcomeCards();
    renderDimensions();
    renderContextOptions();
    renderAssessment();
    if (!els.screenResults.classList.contains("hidden")) renderResults();
  };

  const renderWelcomeCards = () => {
    const tr = t();
    els.welcomeCallouts.innerHTML = "";
    tr.callouts.forEach((c) => {
      const d = document.createElement("div");
      d.className = "callout";
      d.innerHTML = `<div class="callout__title">${escapeHtml(c.title)}</div>
        <div class="callout__body">${escapeHtml(c.body)}</div>`;
      els.welcomeCallouts.appendChild(d);
    });
  };

  const renderDimensions = () => {
    els.dimensionList.innerHTML = "";
    DIMENSIONS.forEach((dim) => {
      const item = document.createElement("div");
      item.className = "dim";
      item.innerHTML = `<div class="dim__name">${escapeHtml(tl(dim.label))}</div>
        <div class="dim__desc">${escapeHtml(tl(dim.description))}</div>`;
      els.dimensionList.appendChild(item);
    });
  };

  const renderContextOptions = () => {
    els.contextSelect.innerHTML = "";
    CONTEXT_OPTIONS.forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt.key;
      o.textContent = tl(opt.label);
      els.contextSelect.appendChild(o);
    });
    els.contextSelect.value = state.context_type;
  };

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

  const loadLeads = () => {
    try {
      const raw = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveLead = (lead) => {
    const all = loadLeads();
    all.push(lead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(all));
  };

  const openConsultModal = () => {
    if (!els.consultModal) return;
    els.consultStatus.textContent = "";
    els.consultModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    // defaults
    if (!els.consultContact.value) {
      const opts = t().consultContactOptions || [];
      els.consultContact.value = opts[0] || "";
    }
    setTimeout(() => els.consultEmail?.focus(), 0);
  };

  const closeConsultModal = () => {
    if (!els.consultModal) return;
    els.consultModal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  const buildConsultMailto = (lead, payload) => {
    const { overall, dimensionScores } = computeScores();
    const ctx = CONTEXT_OPTIONS.find((x) => x.key === state.context_type);
    const ctxLabelEn = ctx?.label.en || state.context_type;
    const ctxLabelZh = ctx?.label.zh || state.context_type;
    const ctxLine = `Context type / 情境: ${ctxLabelEn} / ${ctxLabelZh} (${state.context_type})`;

    const dimLines = DIMENSIONS.map((d) => {
      const v = (dimensionScores[d.key] ?? 0).toFixed(1);
      return `${d.label.en} / ${d.label.zh}: ${v} / 7`;
    });

    const ts = lead.timestamp || nowIso();
    const subject = `Professional Interpretation Request | Influence Analysis | ${lead.email}`;
    const bodyLines = [
      "Professional Interpretation Request / 专业解读申请",
      "",
      `Name / 姓名: ${lead.name || ""}`,
      `Email / 邮箱: ${lead.email}`,
      `Preferred contact / 偏好联系方式: ${lead.preferred_contact || ""}`,
      ctxLine,
      `Overall Influence Score / 总体影响力得分: ${Number(overall).toFixed(1)} / 7`,
      "",
      "Five dimension scores / 五维得分：",
      ...dimLines,
      "",
      `Main concern / 主要困扰: ${lead.main_concern || ""}`,
      "",
      `Timestamp / 时间: ${ts}`,
    ];

    const to = typeof CONSULT_EMAIL === "string" && CONSULT_EMAIL.trim() ? CONSULT_EMAIL.trim() : "";
    const qs = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    return `mailto:${encodeURIComponent(to)}?${qs}`;
  };

  const setStartEnabled = () => {
    const hasContext = !!els.contextSelect.value;
    els.btnStart.disabled = !(hasContext && state.consent_given);
  };

  const renderAssessment = () => {
    const tr = t();
    const ctx = CONTEXT_OPTIONS.find((x) => x.key === state.context_type);
    const ctxLabel = ctx ? tl(ctx.label) : "";
    els.assessmentSubtitle.textContent = tr.assessmentSubtitle(ctxLabel);

    const i = clamp(state.index, 0, QUESTIONS.length - 1);
    state.index = i;

    const q = QUESTIONS[i];
    const dim = DIMENSIONS.find((d) => d.key === q.dimension);
    const dimName = dim ? tl(dim.label) : q.dimension;

    const value = clamp(state.responses[i], 1, 7);
    state.responses[i] = value;

    const progress = (i + 1) / QUESTIONS.length;
    els.progressValue.textContent = `${i + 1} / ${QUESTIONS.length}`;
    els.progressBar.style.width = `${Math.round(progress * 100)}%`;

    const leftLabel = state.language === "en" ? `${tr.likertLeft} / 非常不同意` : `${tr.likertLeft} / Strongly Disagree`;
    const midLabel = state.language === "en" ? `${tr.likertMid} / 中立` : `${tr.likertMid} / Neutral`;
    const rightLabel = state.language === "en" ? `${tr.likertRight} / 非常同意` : `${tr.likertRight} / Strongly Agree`;

    const qText = tl(q.text);
    els.questionCard.innerHTML = `
      <div class="q-meta">
        <div class="q-dim">${escapeHtml(dimName)}</div>
        <div class="q-id">Q${i + 1}</div>
      </div>
      <div class="q-text">${escapeHtml(qText)}</div>
      <div class="slider">
        <div class="slider__labels">
          <span>${escapeHtml(leftLabel)}</span>
          <span>${escapeHtml(midLabel)}</span>
          <span>${escapeHtml(rightLabel)}</span>
        </div>
        <div class="slider__control">
          <input
            type="range"
            min="1"
            max="7"
            step="1"
            value="${value}"
            class="range"
            id="rangeAnswer"
            aria-label="Response 1 to 7"
          />
          <div class="range-badge" id="rangeBadge">${value}</div>
        </div>
      </div>
    `;

    const range = $("rangeAnswer");
    const badge = $("rangeBadge");
    range.addEventListener("input", (e) => {
      const v = clamp(Number(e.target.value), 1, 7);
      state.responses[i] = v;
      badge.textContent = String(v);
    });

    els.btnPrev.disabled = i === 0;
    const isLast = i === QUESTIONS.length - 1;
    els.btnNext.textContent = isLast
      ? `${tr.finish} / ${state.language === "en" ? "查看结果" : "View Results"}`
      : `${tr.next} / ${state.language === "en" ? "下一题" : "Next"}`;
  };

  const computeScores = () => {
    const sums = Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]));
    const counts = Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]));

    QUESTIONS.forEach((q, idx) => {
      const v = clamp(Number(state.responses[idx]), 1, 7);
      sums[q.dimension] += v;
      counts[q.dimension] += 1;
    });

    const dimensionScores = {};
    DIMENSIONS.forEach((d) => {
      const avg = counts[d.key] ? sums[d.key] / counts[d.key] : 0;
      dimensionScores[d.key] = round1(avg);
    });

    const overall = round1(
      DIMENSIONS.reduce((acc, d) => acc + (dimensionScores[d.key] || 0), 0) / DIMENSIONS.length,
    );

    return { overall, dimensionScores };
  };

  const renderResults = () => {
    const tr = t();
    const { overall, dimensionScores } = computeScores();
    const levelKey = levelFromScore(overall);
    const levelLabel = tr.levels.find((x) => x.key === levelKey)?.label || levelKey;

    els.overallScore.textContent = overall.toFixed(1);
    els.levelLine.textContent =
      state.language === "en"
        ? `Influence level: ${levelLabel} / ${levelKeyToZh(levelKey)}`
        : `影响力阶段：${levelLabel} / ${levelKeyToEn(levelKey)}`;

    els.dimensionScores.innerHTML = "";
    DIMENSIONS.forEach((d) => {
      const row = document.createElement("div");
      row.className = "score-row";
      const val = (dimensionScores[d.key] ?? 0).toFixed(1);
      row.innerHTML = `
        <div class="score-row__name">${escapeHtml(tl(d.label))}</div>
        <div class="score-row__bar"><div class="score-row__fill" style="width:${Math.round((val / 7) * 100)}%"></div></div>
        <div class="score-row__val">${val}</div>
      `;
      els.dimensionScores.appendChild(row);
    });

    renderRadar(dimensionScores);
    renderInterpretation(overall, dimensionScores, levelKey);
    renderRecommendations(overall, dimensionScores, levelKey);
    renderContextTips();
    renderValidationBlock();
  };

  const levelKeyToZh = (key) =>
    ({
      emerging: "影响力萌芽期",
      developing: "影响力发展期",
      established: "影响力稳定期",
      strategic: "战略影响力阶段",
      system: "系统级影响力阶段",
    }[key] || key);

  const levelKeyToEn = (key) =>
    ({
      emerging: "Emerging Influence",
      developing: "Developing Influence",
      established: "Established Influence",
      strategic: "Strategic Influence",
      system: "System-Level Influence",
    }[key] || key);

  const renderRadar = (dimensionScores) => {
    const ctx = $("radarChart").getContext("2d");
    const labels = DIMENSIONS.map((d) => tl(d.label));
    const data = DIMENSIONS.map((d) => dimensionScores[d.key] ?? 0);

    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: state.language === "zh" ? "得分" : "Score",
            data,
            borderColor: "rgba(16, 38, 72, 0.9)",
            backgroundColor: "rgba(16, 38, 72, 0.12)",
            pointBackgroundColor: "rgba(186, 154, 83, 1)",
            pointBorderColor: "rgba(16, 38, 72, 0.9)",
            pointRadius: 3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 1,
            max: 7,
            ticks: { stepSize: 1, showLabelBackdrop: false },
            grid: { color: "rgba(10, 16, 24, 0.10)" },
            angleLines: { color: "rgba(10, 16, 24, 0.10)" },
            pointLabels: { color: "rgba(10, 16, 24, 0.85)", font: { size: 12 } },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx2) => `${ctx2.label}: ${Number(ctx2.raw).toFixed(1)} / 7`,
            },
          },
        },
      },
    });
  };

  const renderInterpretation = (overall, dimensionScores, levelKey) => {
    // Bilingual, prototype-friendly interpretation. Avoid clinical language.
    const dimSorted = [...DIMENSIONS].sort((a, b) => (dimensionScores[b.key] ?? 0) - (dimensionScores[a.key] ?? 0));
    const top = dimSorted[0];
    const bottom = dimSorted[dimSorted.length - 1];

    const en = `
      <p><strong>Overall:</strong> Your overall influence score is <strong>${overall.toFixed(1)} / 7</strong>, which corresponds to <strong>${levelKeyToEn(levelKey)}</strong>.</p>
      <p><strong>Strength signal:</strong> Your strongest dimension is <strong>${escapeHtml(top.label.en)}</strong>. This suggests your influence may currently emerge most through this channel.</p>
      <p><strong>Growth signal:</strong> Your lowest dimension is <strong>${escapeHtml(bottom.label.en)}</strong>. Improving it can increase the reliability and reach of your influence in this context.</p>
      <p><strong>How to use this:</strong> Treat the results as a map for reflection and experimentation. Consider collecting feedback from trusted peers to validate and refine your self-perception.</p>
    `;

    const zh = `
      <p><strong>总体：</strong> 你的总体影响力得分为 <strong>${overall.toFixed(1)} / 7</strong>，对应阶段为 <strong>${levelKeyToZh(levelKey)}</strong>。</p>
      <p><strong>优势信号：</strong> 你的最高维度是 <strong>${escapeHtml(top.label.zh)}</strong>。这意味着你的影响力可能主要通过这一通道显现。</p>
      <p><strong>成长信号：</strong> 你的最低维度是 <strong>${escapeHtml(bottom.label.zh)}</strong>。提升该维度通常能增强影响力的稳定性与覆盖范围。</p>
      <p><strong>使用方式：</strong> 将结果视为反思与实验的地图。你也可以向少数可信的伙伴收集反馈，用于校准与完善自我认知。</p>
    `;

    els.interpretation.innerHTML = state.language === "zh" ? zh : en;
  };

  const renderRecommendations = (overall, dimensionScores, levelKey) => {
    const lowDims = [...DIMENSIONS]
      .map((d) => ({ key: d.key, name: tl(d.label), score: dimensionScores[d.key] ?? 0 }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 2);

    const enItems = [
      {
        title: "Make influence observable",
        body: "Translate contributions into visible artifacts: short updates, demos, summaries, or shareable outcomes aligned with group goals.",
      },
      {
        title: "Build trust through reliability",
        body: "Use clear commitments, predictable follow-through, and proactive communication. Reliability compounds influence.",
      },
      {
        title: "Strengthen your network position",
        body: "Create bridges: connect people, share high-signal information, and coordinate across sub-groups in a helpful way.",
      },
      {
        title: "Develop capacity intentionally",
        body: "Pick one skill area that matters in this context and build depth: practice, feedback loops, and high-quality execution.",
      },
      {
        title: "Sustain persistence",
        body: "Design a sustainable rhythm: small consistent contributions, review cycles, and energy management to avoid burnout.",
      },
    ];

    const zhItems = [
      { title: "让影响力可被看见", body: "把贡献转化为可见成果：简短更新、演示、总结、可分享的产出，并与群体目标对齐。" },
      { title: "以可靠性累积信任", body: "明确承诺、按时交付、主动沟通。可靠性会复利式增强影响力。" },
      { title: "提升你的网络位置", body: "做“桥梁”：连接人、传播高信噪信息、跨子群体协调资源与协作。" },
      { title: "有策略地提升能力", body: "选择此情境中关键的一项能力做深：刻意练习、反馈闭环与高质量执行。" },
      { title: "建立可持续的持续性", body: "设计稳定节奏：小而持续的贡献、复盘周期与能量管理，避免过度消耗。" },
    ];

    const items = state.language === "zh" ? zhItems : enItems;
    const lowLine =
      state.language === "zh"
        ? `<p><strong>优先提升：</strong> 当前得分相对较低的维度是 <strong>${escapeHtml(lowDims[0].name)}</strong> 与 <strong>${escapeHtml(lowDims[1].name)}</strong>。从这里开始往往性价比最高。</p>`
        : `<p><strong>Priority focus:</strong> Your lowest dimensions are <strong>${escapeHtml(lowDims[0].name)}</strong> and <strong>${escapeHtml(lowDims[1].name)}</strong>. Improving these typically yields the highest leverage.</p>`;

    let stageLine = "";
    if (state.language === "en") {
      stageLine =
        levelKey === "system"
          ? "<p><strong>Stage note:</strong> At the system level, influence tends to be about shaping norms, incentives, and information flows—not just individual performance.</p>"
          : levelKey === "strategic"
            ? "<p><strong>Stage note:</strong> Strategic influence grows by aligning stakeholders, framing priorities, and enabling others to succeed.</p>"
            : "<p><strong>Stage note:</strong> Early-stage influence often improves quickly with clarity, reliability, and visible contributions.</p>";
    } else {
      stageLine =
        levelKey === "system"
          ? "<p><strong>阶段提示：</strong> 在系统级阶段，影响力更像是在塑造规范、激励与信息流，而不仅仅是个人表现。</p>"
          : levelKey === "strategic"
            ? "<p><strong>阶段提示：</strong> 战略影响力通常来自：对齐关键相关方、重塑问题框架、让他人成功。</p>"
            : "<p><strong>阶段提示：</strong> 在较早阶段，清晰表达、可靠交付与可见贡献往往能带来快速提升。</p>";
    }

    const html =
      lowLine +
      stageLine +
      `<div class="rec-list">${items
        .map(
          (it) => `<div class="rec">
            <div class="rec__title">${escapeHtml(it.title)}</div>
            <div class="rec__body">${escapeHtml(it.body)}</div>
          </div>`,
        )
        .join("")}</div>`;

    els.recommendations.innerHTML = html;
  };

  const renderContextTips = () => {
    const ctxKey = state.context_type;
    const tips = {
      workplace: {
        en: ["Align your work to business outcomes and decision cycles.", "Proactively reduce risk and unblock others."],
        zh: ["将工作与业务结果和决策节奏对齐。", "主动降低风险、为他人清障。"],
      },
      school: {
        en: ["Focus on credibility: preparation, clarity, and consistent follow-through.", "Build supportive peer relationships across classes or groups."],
        zh: ["以可信度为核心：准备充分、表达清晰、持续兑现。", "跨班级或社群建立互助关系。"],
      },
      student_org: {
        en: ["Clarify roles, goals, and timelines—execution creates influence.", "Recognize and amplify others to build trust."],
        zh: ["明确角色、目标与时间线——执行会带来影响力。", "认可并放大他人贡献以建立信任。"],
      },
      friends: {
        en: ["Influence is often emotional: listen deeply and be dependable.", "Avoid over-advising—ask before offering guidance."],
        zh: ["朋友圈中的影响力常带情绪维度：深度倾听并保持可靠。", "避免过度建议——先征求对方是否需要意见。"],
      },
      online_community: {
        en: ["Create high-signal contributions: guides, moderation, summaries.", "Be consistent and fair—norms matter."],
        zh: ["产出高信噪贡献：指南、治理、总结。", "保持一致与公平——社群规范很关键。"],
      },
      social_media: {
        en: ["Consistency and clarity outperform occasional viral spikes.", "Build trust with transparent sourcing and respectful tone."],
        zh: ["稳定输出与清晰表达通常胜过偶尔爆红。", "以透明信息来源与尊重语气建立信任。"],
      },
      livestream: {
        en: ["Support the creator/community with constructive participation.", "Build rapport through consistent presence and helpfulness."],
        zh: ["以建设性互动支持创作者与社群。", "通过稳定出现与助人行为建立熟悉感。"],
      },
      volunteer: {
        en: ["Reliability and coordination are high-impact in volunteer systems.", "Document processes so others can scale the work."],
        zh: ["在志愿系统中，可靠性与协调能力影响很大。", "将流程文档化，帮助他人规模化复制。"],
      },
      other: {
        en: ["Clarify what “influence” means in your system (outcomes, norms, decisions).", "Identify who allocates attention/resources and how to add value."],
        zh: ["先明确你系统中的“影响力”意味着什么（结果、规范、决策）。", "识别注意力/资源分配者，并找到可提供的价值。"],
      },
    };

    const tset = tips[ctxKey] || tips.other;
    const arr = state.language === "zh" ? tset.zh : tset.en;
    els.contextTips.innerHTML = `<ul class="bullets">${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
  };

  const renderValidationBlock = () => {
    const tr = t();
    const makeSlider = (id, label, value) => `
      <div class="v-row">
        <div class="v-label">${escapeHtml(label)}</div>
        <div class="v-slider">
          <div class="slider__labels">
            <span>1</span><span>4</span><span>7</span>
          </div>
          <div class="slider__control">
            <input type="range" min="1" max="7" step="1" value="${value}" class="range" id="${id}" />
            <div class="range-badge" id="${id}_badge">${value}</div>
          </div>
        </div>
      </div>
    `;

    els.validationBlock.innerHTML =
      makeSlider("v_self", tr.v1, state.self_rated_influence) +
      makeSlider("v_acc", tr.v2, state.perceived_accuracy) +
      makeSlider("v_use", tr.v3, state.perceived_usefulness);

    const bind = (id, key) => {
      const r = $(id);
      const b = $(`${id}_badge`);
      r.addEventListener("input", (e) => {
        const v = clamp(Number(e.target.value), 1, 7);
        state[key] = v;
        b.textContent = String(v);
      });
    };
    bind("v_self", "self_rated_influence");
    bind("v_acc", "perceived_accuracy");
    bind("v_use", "perceived_usefulness");
  };

  const buildPayload = () => {
    const { overall, dimensionScores } = computeScores();
    const payload = {
      timestamp: nowIso(),
      language: state.language,
      context_type: state.context_type,
      responses: QUESTIONS.map((q, idx) => ({ id: q.id, dimension: q.dimension, value: clamp(Number(state.responses[idx]), 1, 7) })),
      dimension_scores: dimensionScores,
      overall_score: overall,
      self_rated_influence: clamp(Number(state.self_rated_influence), 1, 7),
      perceived_accuracy: clamp(Number(state.perceived_accuracy), 1, 7),
      perceived_usefulness: clamp(Number(state.perceived_usefulness), 1, 7),
      open_feedback: String(state.open_feedback || "").trim(),
      consent_given: !!state.consent_given,
      app_version: APP_VERSION,
    };
    return payload;
  };

  const loadSubmissions = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveSubmission = (payload) => {
    const all = loadSubmissions();
    all.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  };

  const postIfConfigured = async (payload) => {
    if (!API_ENDPOINT || typeof API_ENDPOINT !== "string" || !API_ENDPOINT.trim()) return { ok: true, skipped: true };
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status };
  };

  const downloadJson = (payload) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `influence-analysis-data-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const copyResultsText = async () => {
    const { overall, dimensionScores } = computeScores();
    const levelKey = levelFromScore(overall);

    const ctx = CONTEXT_OPTIONS.find((x) => x.key === state.context_type);
    const ctxLabelEn = ctx?.label.en || state.context_type;
    const ctxLabelZh = ctx?.label.zh || state.context_type;

    const lines = [
      "Influence Analysis / 影响力分析",
      `Version / 版本: ${APP_VERSION}`,
      `Timestamp / 时间: ${new Date().toLocaleString()}`,
      `Context / 情境: ${ctxLabelEn} / ${ctxLabelZh}`,
      "",
      `Overall / 总体: ${overall.toFixed(1)} / 7`,
      `Level / 阶段: ${levelKeyToEn(levelKey)} / ${levelKeyToZh(levelKey)}`,
      "",
      ...DIMENSIONS.map((d) => `${d.label.en} / ${d.label.zh}: ${(dimensionScores[d.key] ?? 0).toFixed(1)} / 7`),
    ];

    const text = lines.join("\n");
    await navigator.clipboard.writeText(text);
    return text;
  };

  const bindEvents = () => {
    els.langEn.addEventListener("click", () => {
      state.language = "en";
      renderLanguage();
    });
    els.langZh.addEventListener("click", () => {
      state.language = "zh";
      renderLanguage();
    });

    els.contextSelect.addEventListener("change", () => {
      state.context_type = els.contextSelect.value;
      setStartEnabled();
      renderLanguage(); // refresh subtitles that embed context
    });

    els.consentCheckbox.addEventListener("change", () => {
      state.consent_given = !!els.consentCheckbox.checked;
      setStartEnabled();
    });

    els.btnStart.addEventListener("click", () => {
      state.index = 0;
      setScreen("assessment");
      renderAssessment();
    });

    els.btnPrev.addEventListener("click", () => {
      state.index = clamp(state.index - 1, 0, QUESTIONS.length - 1);
      renderAssessment();
    });

    els.btnNext.addEventListener("click", () => {
      const isLast = state.index === QUESTIONS.length - 1;
      if (isLast) {
        setScreen("results");
        renderResults();
        return;
      }
      state.index = clamp(state.index + 1, 0, QUESTIONS.length - 1);
      renderAssessment();
    });

    els.btnRestart.addEventListener("click", () => {
      hardReset();
    });

    els.btnCopy.addEventListener("click", async () => {
      try {
        await copyResultsText();
        els.btnCopy.classList.add("btn--ok");
        setTimeout(() => els.btnCopy.classList.remove("btn--ok"), 900);
      } catch {
        // fall back to prompt
        const text = await copyResultsText().catch(() => "");
        if (text) window.prompt("Copy results:", text);
      }
    });

    els.btnDownloadJson.addEventListener("click", () => {
      const payload = state.lastPayload || buildPayload();
      downloadJson(payload);
    });

    els.btnDownloadPdf.addEventListener("click", () => {
      alert(t().pdfPlaceholder);
    });

    els.btnUpgrade.addEventListener("click", () => {
      openConsultModal();
    });

    // Modal close handlers
    if (els.consultModal) {
      const closeEls = [els.consultOverlay, els.consultClose, els.consultCancel].filter(Boolean);
      closeEls.forEach((node) =>
        node.addEventListener("click", (e) => {
          if (e.target?.dataset?.close) closeConsultModal();
        }),
      );

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !els.consultModal.classList.contains("hidden")) closeConsultModal();
      });

      els.consultForm.addEventListener("submit", (e) => {
        e.preventDefault();
        els.consultStatus.textContent = "";

        const tr = t();
        const name = String(els.consultName.value || "").trim();
        const email = String(els.consultEmail.value || "").trim();
        const mainConcern = String(els.consultConcern.value || "").trim();
        const preferred = String(els.consultContact.value || "").trim();

        if (!isValidEmail(email)) {
          els.consultStatus.textContent = `${tr.consultInvalidEmail} / ${state.language === "en" ? "请输入有效的邮箱地址。" : "Please enter a valid email address."}`;
          els.consultEmail.focus();
          return;
        }

        // ensure we have a stable snapshot of scores at time of request
        const payload = state.lastPayload || buildPayload();
        state.lastPayload = payload;

        const lead = {
          timestamp: nowIso(),
          language: state.language,
          name,
          email,
          main_concern: mainConcern,
          preferred_contact: preferred,
          context_type: state.context_type,
          overall_score: payload.overall_score,
          dimension_scores: payload.dimension_scores,
        };

        saveLead(lead);

        const mailto = buildConsultMailto(lead, payload);
        window.location.href = mailto;

        els.consultStatus.textContent = `${tr.consultConfirm} / ${
          state.language === "en"
            ? "感谢你的信任。系统已为你生成邮件草稿，请发送邮件以申请专业解读。"
            : "Thank you for your interest. A draft email has been prepared. Please send it to request a professional interpretation."
        }`;
      });
    }

    els.btnSubmit.addEventListener("click", async () => {
      els.submitStatus.textContent = "";
      state.open_feedback = els.openFeedback.value;

      const payload = buildPayload();
      state.lastPayload = payload;
      saveSubmission(payload);

      try {
        const posted = await postIfConfigured(payload);
        els.submitStatus.textContent = posted.ok ? t().submitOk : t().submitFail;
      } catch {
        els.submitStatus.textContent = t().submitFail;
      }

      state.submitted = true;
    });
  };

  const hardReset = () => {
    state.index = 0;
    state.responses = new Array(QUESTIONS.length).fill(4);
    state.self_rated_influence = 4;
    state.perceived_accuracy = 4;
    state.perceived_usefulness = 4;
    state.open_feedback = "";
    state.submitted = false;
    state.lastPayload = null;
    els.openFeedback.value = "";
    els.submitStatus.textContent = "";
    setScreen("welcome");
    renderLanguage();
    setStartEnabled();
  };

  const init = () => {
    // defaults
    els.contextSelect.value = state.context_type;
    els.consentCheckbox.checked = false;
    state.consent_given = false;
    setStartEnabled();

    renderLanguage();
    bindEvents();
    setScreen("welcome");
  };

  init();
})();

