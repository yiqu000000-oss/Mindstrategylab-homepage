(function () {
  "use strict";

  /** @typedef {'en'|'zh'} Lang */
  /** @typedef {'free'|'limited_free'|'early_access'} BadgeTier */

  const STRINGS = {
    en: {
      metaTitle: "MindStrategyLab",
      metaDescription:
        "MindStrategyLab — psychological strategy tools for self-understanding and growth.",
      brandTitle: "MindStrategyLab",
      brandSubtitle: "Psychological strategy tools for self-understanding and growth",
      langAria: "Language",
      heroTitle: "Map your mind. Understand your patterns.",
      heroLead:
        "Want to understand your talents, cognitive style, relationship patterns, influence style, and inner support system more clearly?",
      heroBody:
        "MindStrategyLab offers structured psychological strategy tools that help you turn vague feelings and complex life patterns into clearer self-understanding maps.",
      heroDisclaimer:
        "These tools are designed for reflection, growth, and personal insight — not for clinical diagnosis.",
      heroCta: "Explore tools",
      heroNote:
        "Some tools are currently free or temporarily free. Deeper reports may be offered at a low early-access price.",
      accordionStageTitle: "Current stage",
      accordionStageBody:
        "MindStrategyLab is currently in an early access stage. Some tools are free or temporarily free, while deeper reports may be offered at a low early-access price as the platform continues to improve. Future features, report depth, and pricing may change.",
      accordionPrivacyTitle: "Data and privacy",
      accordionPrivacyBody:
        "We may collect anonymous usage data, such as page visits, completion progress, and button clicks, to improve the tool experience. Unless a separate research consent process is provided in the future, these data will not be used for academic research. These tools are not medical diagnoses or clinical assessments.",
      assessmentsHeading: "Explore the tools",
      assessmentsIntro: "Choose the map that matches what you want to understand today.",
      contactEmail: "mindstrategylab@gmail.com",
      badge_free: "Free",
      badge_limited_free: "Limited Free",
      badge_early_access: "Early Access",
      ctaOpen: "Open",
      cta_tem_open: "Open",
      card_influence_title: "Influence Analysis",
      card_influence_desc:
        "Understand how you create influence within groups, relationships, and organizations.",
      card_rps_title: "Relational Positioning System (RPS)",
      card_rps_desc:
        "Understand your position, needs, power dynamics, and emotional patterns across different types of relationships.",
      card_strategic_intimacy_title: "Connection Dynamics Analysis",
      card_strategic_intimacy_desc:
        "Explore how connection signals move, stall, and evolve across four dynamic dimensions.",
      card_tem_title: "Talent Ecology Matrix",
      card_tem_desc:
        "Map your desired talents, socially perceived strengths, developmental ease, constraints, and long-term talent ecology.",
      card_ssd_title: "Support System Dynamics",
      card_ssd_desc:
        "Map support continuity, perceived support, accessibility, and recovery structures across changing life conditions.",
      card_anxiety_signal_title: "Anxiety as Signal",
      card_anxiety_signal_desc:
        "An interactive educational tool for understanding anxiety, the amygdala, and cortical regulation.",
    },
    zh: {
      metaTitle: "MindStrategyLab | 心智图谱",
      metaDescription:
        "MindStrategyLab | 心智图谱 — 用于自我理解与成长的心理策略工具。",
      brandTitle: "MindStrategyLab | 心智图谱",
      brandSubtitle: "用于自我理解与成长的心理策略工具",
      langAria: "语言",
      heroTitle: "看见你的心智结构，理解你的成长模式",
      heroLead:
        "你是否想更清楚地了解自己的才能、认知方式、关系状态、影响力风格，以及内在支持系统？",
      heroBody:
        "MindStrategyLab | 心智图谱 提供一组结构化的心理策略工具，帮助你把模糊的感受、复杂的关系经验和成长困惑，转化为更清晰的自我理解图谱。",
      heroDisclaimer:
        "这些工具用于自我反思、成长探索和个人洞察，不提供临床诊断。",
      heroCta: "探索工具",
      heroNote:
        "部分工具目前免费或限时免费，深层报告将以较低的早期体验价格开放。",
      accordionStageTitle: "当前阶段",
      accordionStageBody:
        "MindStrategyLab | 心智图谱 目前处于早期体验阶段。部分工具将保持免费或限时免费，部分深层报告会以较低的早期体验价格开放。随着平台逐步完善，未来的功能、报告深度和定价都可能调整。",
      accordionPrivacyTitle: "数据与隐私",
      accordionPrivacyBody:
        "我们可能会收集匿名使用数据，例如页面访问、完成进度与按钮点击，用于改进产品体验。除非未来另行提供正式研究知情同意流程，否则这些数据不会被用于学术研究。这些工具不提供医学诊断，也不替代心理咨询或临床评估。",
      assessmentsHeading: "探索工具",
      assessmentsIntro: "选择一个与你当下最想理解的问题相对应的图谱。",
      contactEmail: "mindstrategylab@gmail.com",
      badge_free: "免费",
      badge_limited_free: "限时免费",
      badge_early_access: "早期体验",
      ctaOpen: "进入",
      cta_tem_open: "打开",
      card_influence_title: "影响力分析",
      card_influence_desc: "理解你在群体、关系与组织中如何形成影响力。",
      card_rps_title: "关系定位系统（RPS）",
      card_rps_desc: "理解你在不同类型关系中的位置、需求、权力动态与情绪模式。",
      card_strategic_intimacy_title: "连接动力分析",
      card_strategic_intimacy_desc:
        "探索连接信号如何在启动、进入、兼容与转化四层动力中流动、停滞与演变。",
      card_tem_title: "天赋生态矩阵",
      card_tem_desc:
        "理解你的理想天赋、他人感知优势、发展顺畅度、限制条件与长期天赋生态。",
      card_ssd_title: "支持系统动力学",
      card_ssd_desc:
        "映射资源存在、支持感知、支持可达性与结构恢复能力。",
      card_anxiety_signal_title: "焦虑是信号，不是敌人",
      card_anxiety_signal_desc:
        "一套用于理解焦虑、杏仁核与皮层通路的互动式教育工具。",
    },
  };

  const CARDS = [
    {
      id: "talent-ecology-matrix",
      href: "./talent-ecology-matrix/",
      badgeTier: "early_access",
      titleKey: "card_tem_title",
      descKey: "card_tem_desc",
      ctaKey: "cta_tem_open",
    },
    {
      id: "influence-analysis",
      href: "/influence-analysis/",
      badgeTier: "limited_free",
      titleKey: "card_influence_title",
      descKey: "card_influence_desc",
    },
    {
      id: "rps",
      href: "/rps/",
      badgeTier: "early_access",
      titleKey: "card_rps_title",
      descKey: "card_rps_desc",
    },
    {
      id: "strategic-intimacy",
      href: "./strategic-intimacy/",
      badgeTier: "early_access",
      titleKey: "card_strategic_intimacy_title",
      descKey: "card_strategic_intimacy_desc",
    },
    {
      id: "ssd",
      href: "./support-system-dynamic/",
      badgeTier: "early_access",
      titleKey: "card_ssd_title",
      descKey: "card_ssd_desc",
    },
    {
      id: "anxiety-signal",
      href: "/anxiety-signal/index.html",
      badgeTier: "free",
      titleKey: "card_anxiety_signal_title",
      descKey: "card_anxiety_signal_desc",
    },
  ];

  const LANG_KEY = "msl-home-lang";

  function getStoredLang() {
    try {
      const v = localStorage.getItem(LANG_KEY);
      if (v === "en" || v === "zh") return v;
    } catch {
      /* ignore */
    }
    return null;
  }

  /** @param {Lang} lang */
  function setStoredLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }

  /** @param {Lang | null | undefined} [override] */
  function pickLang(override) {
    if (override) return override;
    const stored = getStoredLang();
    if (stored) return stored;
    return "en";
  }

  /** @param {Lang} lang */
  function t(lang) {
    return STRINGS[lang];
  }

  /** @param {BadgeTier} tier */
  function badgeClass(tier) {
    return `status status--${tier.replace(/_/g, "-")}`;
  }

  /** @param {Lang} lang */
  /** @param {BadgeTier} tier */
  function badgeLabel(lang, tier) {
    return t(lang)[`badge_${tier}`];
  }

  /** @param {Lang} lang */
  function applyStrings(lang) {
    const s = t(lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.title = s.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", s.metaDescription);

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText("brandTitle", s.brandTitle);
    setText("brandSubtitle", s.brandSubtitle);
    setText("heroTitle", s.heroTitle);
    setText("heroLead", s.heroLead);
    setText("heroBody", s.heroBody);
    setText("heroDisclaimer", s.heroDisclaimer);
    setText("heroCta", s.heroCta);
    setText("heroNote", s.heroNote);
    setText("accordionStageTitle", s.accordionStageTitle);
    setText("accordionStageBody", s.accordionStageBody);
    setText("accordionPrivacyTitle", s.accordionPrivacyTitle);
    setText("accordionPrivacyBody", s.accordionPrivacyBody);
    setText("assessmentsHeading", s.assessmentsHeading);
    setText("assessmentsIntro", s.assessmentsIntro);

    const contactLine = document.getElementById("contactLine");
    if (contactLine) {
      contactLine.innerHTML = "";
      const a = document.createElement("a");
      a.href = "mailto:" + s.contactEmail;
      a.textContent = s.contactEmail;
      contactLine.appendChild(a);
    }

    const langSwitch = document.getElementById("langSwitch");
    if (langSwitch) langSwitch.setAttribute("aria-label", s.langAria);

    const btnEn = document.getElementById("langEn");
    const btnZh = document.getElementById("langZh");
    if (btnEn && btnZh) {
      const enActive = lang === "en";
      btnEn.classList.toggle("pill--active", enActive);
      btnZh.classList.toggle("pill--active", !enActive);
      btnEn.setAttribute("aria-pressed", enActive ? "true" : "false");
      btnZh.setAttribute("aria-pressed", enActive ? "false" : "true");
    }

    renderCards(lang);
  }

  /** @param {Lang} lang */
  function renderCards(lang) {
    const root = document.getElementById("catalogCards");
    if (!root) return;
    root.innerHTML = "";
    const s = t(lang);

    CARDS.forEach((card) => {
      const badgeTier = card.badgeTier || "early_access";
      const title = s[card.titleKey];
      const desc = s[card.descKey];
      const ctaLabel = card.ctaKey ? s[card.ctaKey] : s.ctaOpen;

      const el = document.createElement("a");
      el.className = "assessment-card assessment-card--interactive";
      el.href = card.href;
      el.setAttribute("aria-label", title + " — " + ctaLabel);

      const head = document.createElement("div");
      head.className = "card__head";

      const h = document.createElement("h3");
      h.className = "card__title";
      h.textContent = title;

      const status = document.createElement("span");
      status.className = badgeClass(badgeTier);
      status.textContent = badgeLabel(lang, badgeTier);

      head.appendChild(h);
      head.appendChild(status);

      const p = document.createElement("p");
      p.className = "card__desc";
      p.textContent = desc;

      const cta = document.createElement("div");
      cta.className = "card__cta";
      cta.append(document.createTextNode(ctaLabel + " "));
      const arrow = document.createElement("span");
      arrow.className = "card__cta-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      cta.appendChild(arrow);

      el.appendChild(head);
      el.appendChild(p);
      el.appendChild(cta);
      root.appendChild(el);
    });
  }

  function init() {
    /** @type {Lang} */
    let lang = pickLang();

    const params = new URLSearchParams(window.location.search);
    const qLang = params.get("lang");
    if (qLang === "en" || qLang === "zh") lang = qLang;

    applyStrings(lang);

    document.getElementById("langEn")?.addEventListener("click", () => {
      lang = "en";
      setStoredLang(lang);
      applyStrings(lang);
    });
    document.getElementById("langZh")?.addEventListener("click", () => {
      lang = "zh";
      setStoredLang(lang);
      applyStrings(lang);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
