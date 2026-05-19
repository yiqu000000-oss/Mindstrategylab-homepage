(function () {
  "use strict";

  /** @typedef {'en'|'zh'} Lang */

  /**
   * UI copy. Add keys here when you add new strings.
   * Card titles and descriptions use `card_*` keys referenced from CARDS below.
   */
  const STRINGS = {
    en: {
      metaTitle: "Mind Strategy Lab",
      metaDescription:
        "Mind Strategy Lab — bilingual assessments for relationships, influence, and personal development.",
      brandTitle: "Mind Strategy Lab",
      brandSubtitle: "Assessment catalog",
      langAria: "Language",
      welcomeHeading: "Welcome",
      welcomeBody:
        "Mind Strategy Lab is a bilingual assessment and insight platform that uses psychology, strategy, and systems thinking to help people understand relationships, influence, and personal development.",
      assessmentsHeading: "Assessments",
      contactEmail: "mindstrategylab@gmail.com",
      statusAvailable: "Available",
      statusSoon: "Coming soon",
      ctaOpen: "Open",
      card_influence_title: "Influence Analysis",
      card_influence_desc:
        "Understand how you create influence within groups, relationships, and organizations.",
      card_rps_title: "Relational Positioning System (RPS)",
      card_rps_desc:
        "Understand your position, needs, power dynamics, and emotional patterns across different types of relationships.",
      card_strategic_intimacy_title: "Strategic Intimacy Simulator",
      card_strategic_intimacy_desc:
        "A dynamic map of attraction, entry, compatibility, and transformation.",
      card_tem_title: "Talent Ecology Matrix",
      card_tem_desc:
        "Understand how desired talent, social perception, developmental ease, and constraints shape your long-term advantage structure.",
    },
    zh: {
      metaTitle: "Mind Strategy Lab 心智策略实验室",
      metaDescription:
        "Mind Strategy Lab 心智策略实验室 — 双语测评与洞察，理解关系、影响力与个人发展。",
      brandTitle: "Mind Strategy Lab",
      brandSubtitle: "测评目录",
      langAria: "语言",
      welcomeHeading: "欢迎",
      welcomeBody:
        "Mind Strategy Lab 心智策略实验室是一个双语测评与洞察平台，结合心理学、战略与系统思维，帮助人们理解关系、影响力与个人发展。",
      assessmentsHeading: "测评",
      contactEmail: "mindstrategylab@gmail.com",
      statusAvailable: "可用",
      statusSoon: "即将推出",
      ctaOpen: "进入",
      card_influence_title: "影响力分析",
      card_influence_desc: "理解你在群体、关系与组织中如何形成影响力。",
      card_rps_title: "关系定位系统（RPS）",
      card_rps_desc: "理解你在不同类型关系中的位置、需求、权力动态与情绪模式。",
      card_strategic_intimacy_title: "战略亲密关系模拟器",
      card_strategic_intimacy_desc:
        "解析一段关系为何发生、为何难以进入、是否适合长期发展，以及关系形式变化后价值能否保存。",
      card_tem_title: "天赋生态矩阵",
      card_tem_desc:
        "理解理想天赋、他人感知、发展顺畅度与现实限制如何共同塑造你的长期优势结构。",
    },
  };

  /**
   * Catalog entries. To add an assessment, append an object:
   * - titleKey / descKey: keys on STRINGS.en / STRINGS.zh
   * - href: path to the assessment folder (trailing slash recommended)
   * - status: "available" | "coming_soon" | "auto"
   * - probeUrl (optional, with status "auto"): URL to check; if reachable, shows Available
   */
  const CARDS = [
    {
      id: "talent-ecology-matrix",
      href: "/talent-ecology-matrix/",
      status: "auto",
      probeUrl: "/talent-ecology-matrix/index.html",
      titleKey: "card_tem_title",
      descKey: "card_tem_desc",
    },
    {
      id: "influence-analysis",
      href: "/influence-analysis/",
      status: "auto",
      probeUrl: "/influence-analysis/index.html",
      titleKey: "card_influence_title",
      descKey: "card_influence_desc",
    },
    {
      id: "rps",
      href: "/rps/",
      status: "auto",
      probeUrl: "/rps/index.html",
      titleKey: "card_rps_title",
      descKey: "card_rps_desc",
    },
    {
      id: "strategic-intimacy",
      href: "./strategic-intimacy/",
      status: "available",
      probeUrl: "./strategic-intimacy/index.html",
      titleKey: "card_strategic_intimacy_title",
      descKey: "card_strategic_intimacy_desc",
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
    const welcomeBody = document.getElementById("welcomeBody");
    if (welcomeHeading) welcomeHeading.textContent = s.welcomeHeading;
    if (welcomeBody) welcomeBody.textContent = s.welcomeBody;

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
      const available = resolved === "available";

      const title = s[card.titleKey];
      const desc = s[card.descKey];

      const wrapTag = available ? "a" : "div";
      const el = document.createElement(wrapTag);
      el.className = "assessment-card" + (available ? " assessment-card--interactive" : " assessment-card--soon");
      if (available) {
        el.href = card.href;
        el.setAttribute("aria-label", title + " — " + s.ctaOpen);
      }

      const head = document.createElement("div");
      head.className = "card__head";

      const h = document.createElement("h2");
      h.className = "card__title";
      h.textContent = title;

      const status = document.createElement("span");
      status.className =
        "status " + (available ? "status--available" : "status--soon");
      status.textContent = available ? s.statusAvailable : s.statusSoon;

      head.appendChild(h);
      head.appendChild(status);

      const p = document.createElement("p");
      p.className = "card__desc";
      p.textContent = desc;

      el.appendChild(head);
      el.appendChild(p);

      if (available) {
        const cta = document.createElement("div");
        cta.className = "card__cta";
        cta.append(document.createTextNode(s.ctaOpen + " "));
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
