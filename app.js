(function () {
  "use strict";

  /** @typedef {'en'|'zh'} Lang */
  /** @typedef {'free'|'limited_free'|'early_access'|'coming_soon'} BadgeTier */

  const BRAND_NAME = "MindStrategyLab｜心智图谱";

  const BADGE_LABELS = {
    free: "Free｜免费",
    limited_free: "Limited Free｜限时免费",
    early_access: "Early Access｜早期体验",
    coming_soon: "Coming Soon｜即将上线",
  };

  const WELCOME = {
    heading: "Welcome to MindStrategyLab｜心智图谱",
    footerNote:
      "Currently in early access. Some tools are free or temporarily free while the platform continues to improve.\n当前处于早期体验阶段。部分工具将在平台持续完善期间保持免费或限时免费。",
    full: [
      {
        en: "MindStrategyLab｜心智图谱 is an early-stage platform for psychological strategy and self-reflection tools.",
        zh: "这里不是简单的心理测试网站，而是一组正在持续发展的心智图谱工具。我们希望帮助你把模糊的情绪信号、关系困惑、影响力模式、天赋生态和成长压力，转化为更清晰、更可理解的自我地图。",
      },
      {
        title: "Current Stage｜当前阶段",
        en: "Some tools are currently free or temporarily free, while deeper reports may be offered at a low early-access price as the platform continues to improve.",
        zh: "目前，部分工具将保持免费或限时免费，部分深层报告会以较低的早期体验价格开放。随着系统逐步完善，未来的功能、报告深度和定价都可能调整。",
      },
      {
        title: "What You Can Get｜你可以获得什么",
        en: "Through these tools, you may receive structured reflections on your emotional signals, relationship patterns, influence style, talent ecology, support system, and decision-making tendencies.",
        zh: "通过这些测试，你可以获得关于情绪信号、关系模式、影响力风格、天赋生态、支持系统和决策倾向的结构化反馈。",
      },
      {
        en: "These tools are not medical diagnoses or clinical assessments. They are designed for self-reflection, personal insight, and growth-oriented exploration.",
        zh: "这些工具不提供医学诊断，也不替代心理咨询或临床评估。它们更适合作为自我理解、结构化洞察和成长探索的辅助工具。",
      },
      {
        title: "Data and Privacy｜数据与隐私",
        en: "We may collect anonymous usage data, such as page visits, completion progress, and button clicks, to improve the tool experience. Unless a separate research consent process is provided in the future, these data will not be used for academic research.",
        zh: "我们可能会收集匿名使用数据，例如页面访问、完成进度与按钮点击，用于改进产品体验。除非未来另行提供正式研究知情同意流程，否则这些数据不会被用于学术研究。",
      },
    ],
    compact: [
      {
        en: "MindStrategyLab｜心智图谱 is an early-stage platform for psychological strategy and self-reflection tools.",
        zh: "在这里，你可以探索免费、限时免费和早期体验版本的测试，用来理解自己的情绪信号、关系模式、影响力风格、天赋生态和成长倾向。",
      },
      {
        en: "These tools are not clinical diagnoses. They are designed for self-reflection, structured insight, and growth-oriented exploration.",
        zh: "这些工具不提供临床诊断，也不替代心理咨询。它们更适合作为自我理解、结构化洞察和成长探索的辅助工具。",
      },
    ],
  };

  /**
   * UI copy. Add keys here when you add new strings.
   * Card titles and descriptions use `card_*` keys referenced from CARDS below.
   */
  const STRINGS = {
    en: {
      metaTitle: BRAND_NAME,
      metaDescription:
        "MindStrategyLab｜心智图谱 — early-stage psychological strategy and self-reflection tools.",
      brandTitle: BRAND_NAME,
      brandSubtitle: "Psychological strategy tools",
      langAria: "Language",
      welcomeHeading: WELCOME.heading,
      assessmentsHeading: "Tools",
      contactEmail: "mindstrategylab@gmail.com",
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
      metaTitle: BRAND_NAME,
      metaDescription:
        "MindStrategyLab｜心智图谱 — 心理策略与自我探索工具的早期平台。",
      brandTitle: BRAND_NAME,
      brandSubtitle: "心理策略与自我探索工具",
      langAria: "语言",
      welcomeHeading: WELCOME.heading,
      assessmentsHeading: "工具",
      contactEmail: "mindstrategylab@gmail.com",
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

  /**
   * Catalog entries. To add an assessment, append an object:
   * - titleKey / descKey: keys on STRINGS.en / STRINGS.zh
   * - href: path to the assessment folder (trailing slash recommended)
   * - status: "available" | "coming_soon" | "auto"
   * - badgeTier: free | limited_free | early_access (when launchable)
   * - probeUrl (optional, with status "auto"): URL to check; if reachable, shows launchable
   */
  const CARDS = [
    {
      id: "talent-ecology-matrix",
      href: "./talent-ecology-matrix/",
      status: "available",
      badgeTier: "early_access",
      titleKey: "card_tem_title",
      descKey: "card_tem_desc",
      ctaKey: "cta_tem_open",
    },
    {
      id: "influence-analysis",
      href: "/influence-analysis/",
      status: "auto",
      badgeTier: "limited_free",
      probeUrl: "/influence-analysis/index.html",
      titleKey: "card_influence_title",
      descKey: "card_influence_desc",
    },
    {
      id: "rps",
      href: "/rps/",
      status: "auto",
      badgeTier: "early_access",
      probeUrl: "/rps/index.html",
      titleKey: "card_rps_title",
      descKey: "card_rps_desc",
    },
    {
      id: "strategic-intimacy",
      href: "./strategic-intimacy/",
      status: "available",
      badgeTier: "early_access",
      probeUrl: "./strategic-intimacy/index.html",
      titleKey: "card_strategic_intimacy_title",
      descKey: "card_strategic_intimacy_desc",
    },
    {
      id: "ssd",
      href: "./support-system-dynamic/",
      status: "available",
      badgeTier: "early_access",
      probeUrl: "./support-system-dynamic/index.html",
      titleKey: "card_ssd_title",
      descKey: "card_ssd_desc",
    },
    {
      id: "anxiety-signal",
      href: "/anxiety-signal/index.html",
      status: "available",
      badgeTier: "free",
      probeUrl: "/anxiety-signal/index.html",
      titleKey: "card_anxiety_signal_title",
      descKey: "card_anxiety_signal_desc",
    },
  ];

  const LANG_KEY = "msl-home-lang";

  const statusCache = new Map();

  /** @param {string} path */
  async function probeExists(path) {
    if (window.location.protocol === "file:" && path.startsWith("./")) return true;

    const tryHead = async () => {
      const res = await fetch(path, { method: "HEAD", cache: "no-store" });
      return res.ok;
    };
    const tryGet = async () => {
      const res = await fetch(path, { method: "GET", cache: "no-store" });
      return res.ok;
    };
    try {
      if (await tryHead()) return true;
    } catch {
      /* continue */
    }
    try {
      return await tryGet();
    } catch {
      return false;
    }
  }

  /** @param {typeof CARDS[number]} card */
  async function resolveStatus(card) {
    if (card.status === "auto") {
      const url = card.probeUrl || card.href;
      return (await probeExists(url)) ? "available" : "coming_soon";
    }
    return card.status;
  }

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
    const nav = navigator.language || "";
    if (override) return override;
    const stored = getStoredLang();
    if (stored) return stored;
    if (nav.toLowerCase().startsWith("zh")) return "zh";
    return "en";
  }

  /** @param {Lang} lang */
  function t(lang) {
    return STRINGS[lang];
  }

  function renderWelcomeBlock(blocks) {
    return blocks
      .map((block) => {
        const title = block.title
          ? `<h2 class="welcome-section-title">${block.title}</h2>`
          : "";
        const en = block.en ? `<p class="welcome-p welcome-p--en">${block.en}</p>` : "";
        const zh = block.zh ? `<p class="welcome-p welcome-p--zh">${block.zh}</p>` : "";
        return `<div class="welcome-block">${title}${en}${zh}</div>`;
      })
      .join("");
  }

  function renderWelcome() {
    const full = document.getElementById("welcomeBodyFull");
    const compact = document.getElementById("welcomeBodyCompact");
    const footerNote = document.getElementById("footerNote");

    if (full) full.innerHTML = renderWelcomeBlock(WELCOME.full);
    if (compact) compact.innerHTML = renderWelcomeBlock(WELCOME.compact);
    if (footerNote) {
      footerNote.innerHTML = WELCOME.footerNote
        .split("\n")
        .map((line) => `<span class="footer-note-line">${line}</span>`)
        .join("");
    }
  }

  /** @param {BadgeTier} tier */
  function badgeClass(tier) {
    return `status status--${tier.replace("_", "-")}`;
  }

  /** @param {Lang} lang */
  function applyStrings(lang) {
    const s = t(lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.title = s.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", s.metaDescription);

    const brandTitle = document.getElementById("brandTitle");
    const brandSubtitle = document.getElementById("brandSubtitle");
    if (brandTitle) brandTitle.textContent = s.brandTitle;
    if (brandSubtitle) brandSubtitle.textContent = s.brandSubtitle;

    const welcomeHeading = document.getElementById("welcomeHeading");
    if (welcomeHeading) welcomeHeading.textContent = s.welcomeHeading;

    renderWelcome();

    const assessmentsHeading = document.getElementById("assessmentsHeading");
    if (assessmentsHeading) assessmentsHeading.textContent = s.assessmentsHeading;

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
      const resolved = statusCache.get(card.id) || "coming_soon";
      const launchable = resolved === "available";
      /** @type {BadgeTier} */
      const badgeTier = launchable ? card.badgeTier || "early_access" : "coming_soon";

      const title = s[card.titleKey];
      const desc = s[card.descKey];
      const ctaLabel = card.ctaKey ? s[card.ctaKey] : s.ctaOpen;

      const wrapTag = launchable ? "a" : "div";
      const el = document.createElement(wrapTag);
      el.className =
        "assessment-card" +
        (launchable ? " assessment-card--interactive" : " assessment-card--soon");
      if (launchable) {
        el.href = card.href;
        el.setAttribute("aria-label", title + " — " + ctaLabel);
      }

      const head = document.createElement("div");
      head.className = "card__head";

      const h = document.createElement("h2");
      h.className = "card__title";
      h.textContent = title;

      const status = document.createElement("span");
      status.className = badgeClass(badgeTier);
      status.textContent = BADGE_LABELS[badgeTier];

      head.appendChild(h);
      head.appendChild(status);

      const p = document.createElement("p");
      p.className = "card__desc";
      p.textContent = desc;

      el.appendChild(head);
      el.appendChild(p);

      if (launchable) {
        const cta = document.createElement("div");
        cta.className = "card__cta";
        cta.append(document.createTextNode(ctaLabel + " "));
        const arrow = document.createElement("span");
        arrow.className = "card__cta-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        cta.appendChild(arrow);
        el.appendChild(cta);
      }

      root.appendChild(el);
    });
  }

  async function hydrateStatuses() {
    await Promise.all(
      CARDS.map(async (card) => {
        const st = await resolveStatus(card);
        statusCache.set(card.id, st);
      }),
    );
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

    hydrateStatuses().then(() => applyStrings(lang));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
