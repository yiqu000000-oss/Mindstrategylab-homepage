// Support System Dynamics Assessment — modular research platform (bilingual)

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
    );

  const SCREEN_IDS = {
    home: "screenHome",
    introduction: "screenIntroduction",
    consent: "screenConsent",
    context: "screenContext",
    dashboard: "screenDashboard",
    assessment: "screenAssessment",
    freeResults: "screenFreeResults",
    paywall: "screenPaywall",
    premium: "screenPremium",
    accuracy: "screenAccuracy",
    feedback: "screenFeedback",
    completion: "screenCompletion",
  };

  let state = SSDStorage.load();
  let currentScreen = "home";
  let currentLayer = null;

  const lang = () => (state.language === "zh" ? "zh" : "en");
  const ui = (key, ...args) => SSDI18n.ui(lang(), key, ...args);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const setText = (id, text) => {
    const el = $(id);
    if (el && text != null) el.textContent = text;
  };

  const persist = () => {
    SSDStorage.save(state);
    const hint = $("saveHint");
    if (hint) {
      hint.textContent = ui("saveHint");
      setTimeout(() => {
        if (hint.textContent === ui("saveHint")) hint.textContent = "";
      }, 2000);
    }
    updatePremiumUI();
  };

  const showScreen = (name) => {
    if (!SCREEN_IDS[name]) return;
    currentScreen = name;
    state.flowStage = name;
    persist();
    Object.entries(SCREEN_IDS).forEach(([key, id]) => {
      const el = $(id);
      if (el) el.classList.toggle("hidden", key !== name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderLanguage();
  };

  const updatePremiumUI = () => {
    const unlocked = SSDStorage.readPremiumUnlocked();
    state.premiumUnlocked = unlocked;
    $("premiumBadge")?.classList.toggle("hidden", !unlocked);
    $("resultsPremiumBadge")?.classList.toggle("hidden", !unlocked);
    $("btnDownloadReport")?.classList.toggle("hidden", !unlocked);
    if ($("btnStripeCheckout")) $("btnStripeCheckout").href = SSD_STRIPE_PAYMENT_LINK;
    updateResultsContinueButton();
  };

  const isPremiumUnlocked = () => SSDStorage.readPremiumUnlocked();

  const unlockPremiumInline = (opts = {}) => {
    state.premiumUnlocked = true;
    state.paywallSkipped = false;
    state.freeResultsViewed = true;
    $("inlinePaywall")?.classList.add("hidden");
    $("promoModal")?.close?.();
    persist();
    if (currentScreen !== "freeResults" && state.assessmentCompleted) {
      showScreen("freeResults");
    } else {
      renderResultsPage();
    }
    if (opts.scroll !== false) {
      requestAnimationFrame(() => {
        $("premiumReportExpand")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const checkPaymentReturn = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(PAYMENT_SUCCESS_PARAM) !== "true") return;
    SSDStorage.applyPaymentUnlock();
    if (state.assessmentCompleted && state.results) {
      state.freeResultsViewed = true;
      showScreen("freeResults");
      unlockPremiumInline({ scroll: true });
    } else {
      state.premiumUnlocked = true;
      persist();
    }
    params.delete(PAYMENT_SUCCESS_PARAM);
    const qs = params.toString();
    window.history.replaceState({}, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  };

  /* ── Static UI ── */

  const renderHomeCallouts = () => {
    const container = $("homeCallouts");
    if (!container) return;
    container.innerHTML = `
      <div class="callout">
        <div class="callout__title">${escapeHtml(ui("exploresTitle"))}</div>
        <div class="callout__body"><ul>${ui("exploresItems").map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
      </div>
      <div class="callout">
        <div class="callout__title">${escapeHtml(ui("designedTitle"))}</div>
        <div class="callout__body"><ul>${ui("designedItems").map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
      </div>`;
  };

  const renderConsentList = () => {
    const list = $("consentList");
    if (!list) return;
    list.innerHTML = ui("consentItems").map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  };

  const renderPremiumLists = () => {
    const items = (id, key) => {
      const el = $(id);
      if (el) el.innerHTML = ui(key).map((i) => `<li>${escapeHtml(i)}</li>`).join("");
    };
    items("inlinePremiumFreeList", "premiumFreeItems");
    items("inlinePremiumPaidList", "premiumPaidItems");
    setText("inlinePremiumPaidTitle", ui("premiumPaidTitle", PREMIUM_PRICE_DISPLAY));
  };

  const renderIntroSections = () => {
    const container = $("introSections");
    if (!container) return;
    const sections = [
      { title: ui("introWhatTitle"), body: ui("introWhatBody") },
      { title: ui("introSupportTitle"), body: ui("introSupportBody") },
      { title: ui("introContinuityTitle"), body: ui("introContinuityBody") },
      { title: ui("introAccessibilityTitle"), body: ui("introAccessibilityBody") },
      { title: ui("introResearchTitle"), body: ui("introResearchBody") },
      { title: ui("introNotDiagnosticTitle"), body: ui("introNotDiagnosticBody") },
    ];
    container.innerHTML = sections
      .map(
        (s) => `
      <article class="intro-section">
        <h3 class="h3 intro-section__title">${escapeHtml(s.title)}</h3>
        <p class="intro-section__body">${escapeHtml(s.body)}</p>
      </article>`,
      )
      .join("");
  };

  const renderFrameworkFlow = (containerId) => {
    const container = $(containerId);
    if (!container) return;
    const steps = SSDI18n.frameworkSteps(lang());
    container.innerHTML = steps
      .map((step, i) => {
        const arrow = i < steps.length - 1 ? '<div class="framework-arrow">↓</div>' : "";
        return `<div class="framework-step"><div class="framework-step__label">${escapeHtml(step.label)}</div><div class="framework-step__desc">${escapeHtml(step.description)}</div></div>${arrow}`;
      })
      .join("");
  };

  const renderStaticUI = () => {
    document.documentElement.lang = lang();
    document.title = ui("appDocumentTitle");

    setText("skipLink", ui("skipToContent"));
    setText("brandTitle", ui("brandTitle"));
    setText("brandSubtitle", ui("brandSubtitle"));
    $("langSwitchAria")?.setAttribute("aria-label", ui("langSwitchAria"));
    setText("langEn", ui("langEnLabel"));
    setText("langZh", ui("langZhLabel"));
    $("langEn")?.classList.toggle("pill--active", lang() === "en");
    $("langZh")?.classList.toggle("pill--active", lang() === "zh");
    $("langEn")?.setAttribute("aria-pressed", lang() === "en" ? "true" : "false");
    $("langZh")?.setAttribute("aria-pressed", lang() === "zh" ? "true" : "false");

    setText("homeEyebrow", ui("homeEyebrow"));
    setText("homeTitle", ui("homeTitle"));
    setText("homeLead", ui("homeLead"));
    setText("timeTitle", ui("timeTitle"));
    setText("timeValue", ui("timeValue"));
    setText("noteTitle", ui("noteTitle"));
    setText("noteValue", ui("noteValue"));
    renderHomeCallouts();
    setText("homeNotice", ui("noticeImportant"));
    setText("frameworkPreviewTitle", ui("frameworkPreviewTitle"));
    renderFrameworkFlow("frameworkFlow");
    setText("btnStartAssessment", ui("startAssessment"));
    setText("btnLearnFramework", ui("learnFramework"));

    setText("introTitle", ui("introTitle"));
    setText("introSubtitle", ui("introSubtitle"));
    renderIntroSections();
    setText("frameworkPreviewTitleIntro", ui("frameworkPreviewTitle"));
    renderFrameworkFlow("frameworkFlowIntro");
    setText("introDisclaimer", ui("frameworkDisclaimer"));
    setText("btnIntroBack", ui("back"));
    setText("btnIntroContinue", ui("introContinue"));

    setText("consentTitle", ui("consentTitle"));
    setText("consentSubtitle", ui("consentSubtitle"));
    renderConsentList();
    setText("consentHighlight", ui("consentHighlight"));
    setText("consentCheckboxLabel", ui("consentCheckbox"));
    setText("btnConsentBack", ui("back"));
    setText("btnConsentNext", ui("continueBtn"));

    setText("contextTitle", ui("contextTitle"));
    setText("contextSubtitle", ui("contextSubtitle"));
    setText("requiredLegend", ui("requiredLegend"));
    setText("optionalLegend", ui("optionalLegend"));
    setText("optionalHint", ui("optionalHint"));
    setText("ethnicityNote", ui("ethnicityNote"));
    setText("labelAge", `${ui("labelAge")} *`);
    setText("labelEthnicity", `${ui("labelEthnicity")} *`);
    setText("labelLifeStructure", `${ui("labelLifeStructure")} *`);
    setText("labelSocialIdentity", `${ui("labelSocialIdentity")} *`);
    setText("labelStressSources", `${ui("labelStressSources")} *`);
    setText("labelSupportSources", `${ui("labelSupportSources")} *`);
    setText("labelGender", ui("labelGender"));
    setText("labelOrientation", ui("labelOrientation"));
    setText("labelNeurodiversity", ui("labelNeurodiversity"));
    $("ctxEthnicity").placeholder = ui("placeholderEthnicity");
    $("ctxGender").placeholder = ui("placeholderOptional");
    $("ctxOrientation").placeholder = ui("placeholderOptional");
    setText("btnContextBack", ui("back"));
    setText("btnSkipOptional", ui("skipOptionalFields"));
    setText("btnContextNext", ui("continueToDashboard"));

    setText("dashboardTitle", ui("dashboardTitle"));
    setText("dashboardSubtitle", ui("dashboardSubtitle"));
    setText("dashboardProgressLabel", ui("layersCompleted"));
    setText("btnDashboardHome", ui("returnHome"));
    setText("btnViewResults", ui("viewResults"));
    setText("progressLabel", ui("progressLabel"));
    setText("btnDashboard", ui("dashboardOverview"));
    setText("btnPrev", ui("previous"));

    setText("resultsTitle", ui("resultsTitle"));
    setText("resultsSubtitle", ui("resultsSubtitle"));
    setText("resultsPremiumBadge", ui("premiumUnlockedBadge"));

    setText("inlinePaywallTitle", ui("paywallTitle"));
    setText("inlinePaywallSubtitle", ui("paywallSubtitle"));
    setText("inlinePremiumFreeTitle", ui("premiumFreeTitle"));
    renderPremiumLists();
    setText("btnStripeCheckout", ui("unlockPremium"));
    setText("btnPromoModal", ui("haveInviteCode"));
    setText("inlinePaywallNote", ui("paywallNote"));
    setText("btnSkipPremium", ui("skipPremium"));
    setText("premiumBadge", ui("premiumUnlockedBadge"));
    setText("btnDownloadReport", ui("downloadReport"));
    updateResultsContinueButton();

    setText("accuracyTitle", ui("accuracyTitle"));
    setText("accuracySubtitle", ui("accuracySubtitle"));
    setText("accuracyQuestion", ui("accuracyQuestion"));
    setText("accuracyScaleLow", ui("accuracyScaleLow"));
    setText("accuracyScaleHigh", ui("accuracyScaleHigh"));
    setText("btnAccuracyContinue", ui("continueBtn"));

    setText("feedbackPageTitle", ui("feedbackPageTitle"));
    setText("feedbackPageSubtitle", ui("feedbackPageSubtitle"));
    setText("feedbackPrompt", ui("feedbackPrompt"));
    $("feedbackText").placeholder = ui("feedbackPlaceholder");
    setText("researchNote", ui("researchNote"));
    setText("btnSubmitFeedback", ui("submitFeedback"));

    setText("completionTitle", ui("completionTitle"));
    setText("completionSubtitle", ui("completionSubtitle"));
    setText("completionBody", ui("completionBody"));
    setText("completionResearchNote", ui("completionResearchNote"));
    setText("btnCompletionHome", ui("completionHome"));
    setText("btnResetAll", ui("resetAll"));

    setText("promoTitle", ui("promoTitle"));
    setText("promoSubtitle", ui("promoSubtitle"));
    $("promoInput").placeholder = ui("promoPlaceholder");
    setText("promoError", ui("promoInvalid"));
    setText("btnPromoCancel", ui("cancel"));
    setText("btnPromoSubmit", ui("promoUnlock"));

    setText("footerText", ui("footerText"));
  };

  const renderLanguage = () => {
    renderStaticUI();
    if (currentScreen === "context" || currentScreen === "consent") initContextForm(true);
    if (currentScreen === "consent" && state.consent) {
      if ($("consentCheckbox")) $("consentCheckbox").checked = true;
      if ($("btnConsentNext")) $("btnConsentNext").disabled = false;
    }
    if (currentScreen === "dashboard") renderDashboard();
    if (currentScreen === "assessment" && currentLayer) renderQuestion();
    if (currentScreen === "freeResults") renderResultsPage();
    if (currentScreen === "accuracy") renderAccuracy();
    if (currentScreen === "feedback" && state.feedback?.text) $("feedbackText").value = state.feedback.text;
    updatePremiumUI();
  };

  /* ── Context form ── */

  const fillSelect = (el, options, selectedValue) => {
    const ph = ui("placeholderSelect");
    el.innerHTML =
      `<option value="">${escapeHtml(ph)}</option>` +
      options
        .map((o) => {
          const label = SSDI18n.optionLabel(lang(), o);
          const sel = o === selectedValue ? " selected" : "";
          return `<option value="${escapeHtml(o)}"${sel}>${escapeHtml(label)}</option>`;
        })
        .join("");
  };

  const renderChipGroup = (container, options, selected = []) => {
    container.innerHTML = options
      .map((opt) => {
        const sel = selected.includes(opt) ? " chip--selected" : "";
        const label = SSDI18n.optionLabel(lang(), opt);
        return `<button type="button" class="chip${sel}" data-value="${escapeHtml(opt)}">${escapeHtml(label)}</button>`;
      })
      .join("");
    container.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => chip.classList.toggle("chip--selected"));
    });
  };

  const initContextForm = (preserveValues = false) => {
    const ctx = preserveValues ? state.context || {} : {};
    fillSelect($("ctxAge"), AGE_RANGES, ctx.ageRange);
    fillSelect($("ctxLifeStructure"), LIFE_STRUCTURE_OPTIONS, ctx.lifeStructure);
    fillSelect($("ctxSocialIdentity"), SOCIAL_IDENTITY_OPTIONS, ctx.socialIdentity);
    renderChipGroup($("ctxStressSources"), STRESS_SOURCE_OPTIONS, ctx.stressSources || []);
    renderChipGroup($("ctxSupportSources"), SUPPORT_SOURCE_OPTIONS, ctx.supportSources || []);
    renderChipGroup($("ctxNeurodiversity"), NEURODIVERSITY_OPTIONS, ctx.neurodiversity || []);
    if (preserveValues) {
      if (ctx.ethnicity) $("ctxEthnicity").value = ctx.ethnicity;
      if (ctx.gender) $("ctxGender").value = ctx.gender;
      if (ctx.orientation) $("ctxOrientation").value = ctx.orientation;
    }
  };

  const getSelectedChips = (container) =>
    [...container.querySelectorAll(".chip--selected")].map((c) => c.dataset.value);

  const collectContext = () => ({
    ageRange: $("ctxAge").value,
    ethnicity: $("ctxEthnicity").value.trim(),
    lifeStructure: $("ctxLifeStructure").value,
    socialIdentity: $("ctxSocialIdentity").value,
    stressSources: getSelectedChips($("ctxStressSources")),
    supportSources: getSelectedChips($("ctxSupportSources")),
    gender: $("ctxGender").value.trim(),
    orientation: $("ctxOrientation").value.trim(),
    neurodiversity: getSelectedChips($("ctxNeurodiversity")),
  });

  const validateContext = (ctx) => {
    if (!ctx.ageRange) return ui("validationAge");
    if (!ctx.ethnicity) return ui("validationEthnicity");
    if (!ctx.lifeStructure) return ui("validationLifeStructure");
    if (!ctx.socialIdentity) return ui("validationSocialIdentity");
    if (!ctx.stressSources.length) return ui("validationStress");
    if (!ctx.supportSources.length) return ui("validationSupport");
    return null;
  };

  /* ── Dashboard & layer modules ── */

  const renderDashboard = () => {
    const total = SSD_LAYERS.length;
    const done = SSDStorage.completedLayerCount(state);
    const allDone = SSDStorage.allLayersComplete(state);

    setText("dashboardProgressValue", ui("progressOf", done, total));
    $("dashboardProgressBar").style.width = `${(done / total) * 100}%`;
    setText("metaBannerTitle", allDone ? ui("metaBannerReady") : ui("dashboardTitle"));
    setText("metaBannerSubtitle", allDone ? ui("dashboardSubtitle") : ui("metaBannerProgress", done, total));
    $("btnViewResults")?.classList.toggle("hidden", !allDone);

    const grid = $("moduleDashboardGrid");
    if (!grid) return;
    grid.innerHTML = "";

    SSD_LAYERS.forEach((layer) => {
      const status = SSDStorage.moduleStatus(state, layer.id);
      const pct = SSDStorage.moduleProgressPercent(state, layer.id);
      const items = SSDStorage.layerItems(layer.id);
      const btnLabel = status === "not_started" ? ui("startLayer") : ui("continueLayer");

      const card = document.createElement("article");
      card.className = `module-dashboard-card module-dashboard-card--${status}`;
      card.innerHTML = `
        <span class="module-dashboard-card__num">${String(layer.id).padStart(2, "0")}</span>
        <h4 class="module-dashboard-card__name">${escapeHtml(ui("layerPrefix", layer.id, SSDI18n.layerLabel(lang(), layer.id)))}</h4>
        <span class="module-dashboard-card__meta">${escapeHtml(ui("questionsCount", items.length))}</span>
        <span class="module-dashboard-card__time">${escapeHtml(ui("estimatedTime", items.length))}</span>
        <p class="module-dashboard-card__desc">${escapeHtml(SSDI18n.layerDesc(lang(), layer.id))}</p>
        <span class="module-dashboard-card__status">${escapeHtml(
          status === "completed"
            ? ui("statusCompleted")
            : status === "in_progress"
              ? ui("statusInProgress")
              : ui("statusNotStarted"),
        )}</span>
        <div class="module-dashboard-card__progress">
          <div class="progress"><div class="progress__bar" style="width:${pct}%"></div></div>
          <span>${pct}%</span>
        </div>
        <button type="button" class="btn btn--sm module-dashboard-card__btn">${escapeHtml(btnLabel)}</button>`;

      card.querySelector(".module-dashboard-card__btn").addEventListener("click", () => openLayer(layer.id));
      grid.appendChild(card);
    });
  };

  const openLayer = (layerId) => {
    currentLayer = layerId;
    const qs = SSDStorage.layerItems(layerId);
    if (!state.moduleProgress[layerId]) {
      state.moduleProgress[layerId] = { started: true, questionIndex: 0 };
    } else {
      state.moduleProgress[layerId].started = true;
      let idx = state.moduleProgress[layerId].questionIndex ?? 0;
      if (idx >= qs.length) {
        idx = SSDStorage.isLayerCompleted(state, layerId) ? 0 : Math.max(0, qs.length - 1);
        state.moduleProgress[layerId].questionIndex = idx;
      }
    }
    showScreen("assessment");
  };

  const finishLayer = (layerId) => {
    state.layerModules[layerId] = { completed: true, completedAt: new Date().toISOString() };
    const qs = SSDStorage.layerItems(layerId);
    state.moduleProgress[layerId] = { started: true, questionIndex: qs.length };
    currentLayer = null;
    showScreen("dashboard");
  };

  const renderQuestion = () => {
    if (!currentLayer) return;

    const qs = SSDStorage.layerItems(currentLayer);
    const i = SSDStorage.getModuleIndex(state, currentLayer);
    const q = qs[i];
    if (!q) return;

    setText("assessmentBreadcrumb", ui("assessmentBreadcrumb"));
    setText("assessmentLayerTitle", ui("layerPrefix", currentLayer, SSDI18n.layerLabel(lang(), currentLayer)));
    setText("assessmentLayerSubtitle", ui("questionsCount", qs.length));
    setText("layerBanner", SSDI18n.layerDesc(lang(), currentLayer));
    $("progressValue").textContent = ui("progressOf", i + 1, qs.length);
    setText("progressLabel", ui("progressLabel"));
    $("progressBar").style.width = `${((i + 1) / qs.length) * 100}%`;

    const value = clamp(state.responses[q.id] ?? 4, 1, 7);
    if (state.responses[q.id] == null) state.responses[q.id] = value;

    $("questionCard").innerHTML = `
      <div class="q-meta">
        <span class="q-micro">${escapeHtml(SSDI18n.subvarLabel(lang(), q.subvariable))}</span>
        <span class="q-id">${escapeHtml(q.codeBase || q.code)}</span>
      </div>
      <div class="q-text">${escapeHtml(SSDI18n.itemText(lang(), q))}</div>
      <div class="slider__labels">
        <span>1 — ${escapeHtml(ui("likertLeft"))}</span>
        <span>4 — ${escapeHtml(ui("likertMid"))}</span>
        <span>7 — ${escapeHtml(ui("likertRight"))}</span>
      </div>
      <div class="slider__control">
        <input class="range" type="range" min="1" max="7" step="1" value="${value}" id="qRange" aria-valuemin="1" aria-valuemax="7" aria-valuenow="${value}" />
        <div class="range-badge" id="qValue">${value}</div>
      </div>`;

    $("qRange").addEventListener("input", (e) => {
      const v = clamp(Number(e.target.value), 1, 7);
      state.responses[q.id] = v;
      $("qValue").textContent = String(v);
      e.target.setAttribute("aria-valuenow", String(v));
      persist();
    });

    $("btnPrev").disabled = i === 0;
    setText("btnNext", i === qs.length - 1 ? ui("completeLayer") : ui("next"));
  };

  const finishAssessment = () => {
    if (!SSDStorage.allLayersComplete(state)) {
      alert(ui("answerAll"));
      return;
    }
    state.results = SSDScoring.computeResults(state.responses);
    state.assessmentCompleted = true;
    state.freeResultsViewed = false;
    persist();
    showScreen("freeResults");
  };

  /* ── Free results (summary only) ── */

  const renderSubvarBars = (subs) =>
    subs
      .map(
        (s) => `
      <div class="subvar-bar">
        <div class="subvar-bar__head">
          <span class="subvar-bar__label">${escapeHtml(s.label)}</span>
          <span class="subvar-bar__pct">${s.percent}%</span>
        </div>
        <div class="subvar-bar__track" aria-hidden="true">
          <div class="subvar-bar__fill subvar-bar__fill--${escapeHtml(s.tier)}" style="width:${s.percent}%"></div>
        </div>
      </div>`,
      )
      .join("");

  const renderProseBlocks = (text) =>
    String(text || "")
      .split(/\n\n+/)
      .filter(Boolean)
      .map((p) => `<p class="premium-prose">${escapeHtml(p)}</p>`)
      .join("");

  const renderPremiumExpand = (report) => {
    const renderRisk = (r) => `
      <li class="typology-risk">
        <strong class="typology-risk__title">${escapeHtml(r.label)}</strong>
        <p class="typology-risk__human">${escapeHtml(r.human || "")}</p>
        ${
          r.triggers?.length
            ? `<p class="typology-risk__meta"><span class="typology-risk__key">${escapeHtml(ui("riskWhen"))}</span></p><ul class="typology-risk__triggers">${r.triggers.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
            : ""
        }
      </li>`;

    const renderComp = (p) => `<li><strong>${escapeHtml(p.label)}</strong> — ${escapeHtml(p.human || "")}</li>`;

    return `
      <div class="premium-expand__header">
        <h3 class="h3">${escapeHtml(ui("premiumDeepensTitle"))}</h3>
        <p class="subtle">${escapeHtml(ui("premiumDeepensSubtitle"))}</p>
      </div>

      <section class="report-layer report-layer--highlight">
        <h3 class="h3 report-layer__title">${escapeHtml(ui("typologyRecoveryStyle"))}</h3>
        <div class="typology-style-label">${escapeHtml(report.recoveryStyle.label)}</div>
        <div class="report-layer__body">
          ${renderProseBlocks([report.recoveryStyle.human, report.recoveryStyle.detail].filter(Boolean).join("\n\n"))}
        </div>
      </section>

      <section class="report-layer report-layer--highlight">
        <h3 class="h3 report-layer__title">${escapeHtml(ui("typologyConversionStyle"))}</h3>
        <div class="typology-style-label">${escapeHtml(report.conversionStyle.label)}</div>
        <div class="report-layer__body">
          ${renderProseBlocks(report.conversionStyle.human)}
          ${
            report.conversionStyle.watchFor?.length
              ? `<p class="premium-prose premium-prose--lead">${escapeHtml(ui("conversionWatchFor"))}</p><ul class="premium-list--interpretive">${report.conversionStyle.watchFor.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>`
              : ""
          }
        </div>
      </section>

      ${
        report.crossInsight
          ? `<section class="report-layer"><h3 class="h3 report-layer__title">${escapeHtml(ui("crossInsight"))}</h3><div class="report-layer__body">${renderProseBlocks(report.crossInsight)}</div></section>`
          : ""
      }

      ${
        report.compensationMechanisms.length
          ? `<section class="report-layer"><h3 class="h3 report-layer__title">${escapeHtml(ui("compensatoryPatterns"))}</h3><ul class="premium-list--interpretive">${report.compensationMechanisms.map(renderComp).join("")}</ul></section>`
          : ""
      }

      <section class="report-layer">
        <h3 class="h3 report-layer__title">${escapeHtml(ui("continuityRisks"))}</h3>
        <ul class="premium-list--interpretive typology-risk-list">${report.continuityRisks.map(renderRisk).join("")}</ul>
      </section>`;
  };

  const updateResultsContinueButton = () => {
    const btn = $("btnFreeResultsContinue");
    if (!btn) return;
    if (isPremiumUnlocked()) {
      setText("btnFreeResultsContinue", ui("continueAfterPremium"));
    } else if (state.paywallSkipped) {
      setText("btnFreeResultsContinue", ui("continueAfterPremium"));
    } else if (state.freeResultsViewed) {
      setText("btnFreeResultsContinue", ui("unlockToDeepen"));
    } else {
      setText("btnFreeResultsContinue", ui("continueToPaywall"));
    }
  };

  const updateInlinePaywallVisibility = () => {
    const paywall = $("inlinePaywall");
    if (!paywall) return;
    const show =
      state.freeResultsViewed && !isPremiumUnlocked() && !state.paywallSkipped;
    paywall.classList.toggle("hidden", !show);
  };

  const renderResultsPage = () => {
    if (!state.results) state.results = SSDScoring.computeResults(state.responses);
    const premium = isPremiumUnlocked();
    const freeReport = SSDResults.buildFreeReport(state.results, lang());
    const typology = SSSTypology.build(state.results, lang(), state.context);
    const arch = typology.primaryArchetype;
    const fullReport = premium ? SSDPremium.buildPremiumReport(state.results, state.context, lang()) : null;

    $("patternBanner").innerHTML = `
      <div class="pattern-banner__label">${escapeHtml(arch.label)}</div>
      <p class="pattern-banner__summary">${escapeHtml(arch.summary || "")}</p>
      <p class="pattern-banner__text">${escapeHtml(arch.human || freeReport.overview)}</p>`;

    $("freeReportSections").innerHTML = typology.layers
      .map((layer) => {
        const narrative = premium ? layer.narrative : layer.narrative.split("\n\n")[0];
        return `
      <div class="report-block${premium ? " report-block--expanded" : ""}">
        <div class="report-block__title">${escapeHtml(layer.title)}</div>
        <div class="subvar-bars subvar-bars--compact">${renderSubvarBars(layer.subvariables)}</div>
        <div class="report-block__body">${renderProseBlocks(narrative)}</div>
      </div>`;
      })
      .join("");

    const expandEl = $("premiumReportExpand");
    if (expandEl) {
      if (premium && fullReport) {
        expandEl.innerHTML = renderPremiumExpand(fullReport);
        expandEl.classList.remove("hidden");
      } else {
        expandEl.innerHTML = "";
        expandEl.classList.add("hidden");
      }
    }

    setText("resultsDisclaimer", freeReport.disclaimer);
    updateInlinePaywallVisibility();
    updatePremiumUI();
  };

  const revealInlinePaywall = () => {
    state.freeResultsViewed = true;
    persist();
    renderResultsPage();
    $("inlinePaywall")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const continueFromResults = () => {
    if (isPremiumUnlocked() || state.paywallSkipped) {
      state.premiumViewed = true;
      persist();
      showScreen("accuracy");
      return;
    }
    if (!state.freeResultsViewed) {
      revealInlinePaywall();
      return;
    }
    $("inlinePaywall")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const skipPremium = () => {
    state.paywallSkipped = true;
    $("inlinePaywall")?.classList.add("hidden");
    persist();
    showScreen("accuracy");
  };

  const downloadReport = () => {
    const payload = {
      appVersion: APP_VERSION,
      language: lang(),
      exportedAt: new Date().toISOString(),
      context: state.context,
      results: state.results,
      premium: SSDStorage.readPremiumUnlocked()
        ? SSDPremium.buildPremiumReport(state.results, state.context, lang())
        : null,
      feedback: state.feedback,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ssd-assessment-report.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ── Accuracy & feedback ── */

  const renderAccuracy = () => {
    const val = clamp(state.feedback?.accuracy ?? 5, 1, 10);
    const range = $("accuracyRange");
    if (range) {
      range.value = String(val);
      $("accuracyValue").textContent = String(val);
    }
  };

  const continueFromAccuracy = () => {
    const val = clamp(Number($("accuracyRange")?.value ?? 0), 1, 10);
    if (!val) {
      alert(ui("accuracyRequired"));
      return;
    }
    state.feedback.accuracy = val;
    state.accuracyCompleted = true;
    persist();
    showScreen("feedback");
  };

  const submitFeedback = () => {
    state.feedback.text = $("feedbackText").value.trim();
    state.feedback.submitted = true;
    state.studyCompleted = true;
    persist();
    showScreen("completion");
  };

  /* ── Resume ── */

  const resumeScreen = () => {
    const screen = SSDStorage.resolveResumeScreen(state);
    currentScreen = screen;
    state.flowStage = screen;
    Object.entries(SCREEN_IDS).forEach(([key, id]) => {
      const el = $(id);
      if (el) el.classList.toggle("hidden", key !== screen);
    });
    if (screen === "freeResults") renderResultsPage();
  };

  /* ── Events ── */

  const bindEvents = () => {
    $("langEn")?.addEventListener("click", () => {
      state.language = "en";
      persist();
      renderLanguage();
    });
    $("langZh")?.addEventListener("click", () => {
      state.language = "zh";
      persist();
      renderLanguage();
    });

    $("btnStartAssessment")?.addEventListener("click", () => showScreen("introduction"));
    $("btnLearnFramework")?.addEventListener("click", () => showScreen("introduction"));
    $("btnIntroBack")?.addEventListener("click", () => showScreen("home"));
    $("btnIntroContinue")?.addEventListener("click", () => showScreen("consent"));

    $("consentCheckbox")?.addEventListener("change", (e) => {
      $("btnConsentNext").disabled = !e.target.checked;
    });
    $("btnConsentBack")?.addEventListener("click", () => showScreen("introduction"));
    $("btnConsentNext")?.addEventListener("click", () => {
      if (!$("consentCheckbox")?.checked) return;
      state.consent = true;
      persist();
      initContextForm(true);
      showScreen("context");
    });

    $("btnContextBack")?.addEventListener("click", () => showScreen("consent"));
    $("btnSkipOptional")?.addEventListener("click", () => {
      $("ctxGender").value = "";
      $("ctxOrientation").value = "";
      $("ctxNeurodiversity").querySelectorAll(".chip--selected").forEach((c) => c.classList.remove("chip--selected"));
    });
    $("btnContextNext")?.addEventListener("click", () => {
      const ctx = collectContext();
      const err = validateContext(ctx);
      if (err) {
        alert(err);
        return;
      }
      state.context = ctx;
      state.contextCompleted = true;
      showScreen("dashboard");
    });

    $("btnDashboardHome")?.addEventListener("click", () => showScreen("home"));
    $("btnViewResults")?.addEventListener("click", () => finishAssessment());

    $("btnDashboard")?.addEventListener("click", () => {
      currentLayer = null;
      showScreen("dashboard");
    });
    $("btnPrev")?.addEventListener("click", () => {
      if (!currentLayer) return;
      const i = SSDStorage.getModuleIndex(state, currentLayer);
      if (i > 0) {
        state.moduleProgress[currentLayer].questionIndex = i - 1;
        persist();
        renderQuestion();
      }
    });
    $("btnNext")?.addEventListener("click", () => {
      if (!currentLayer) return;
      const qs = SSDStorage.layerItems(currentLayer);
      const i = SSDStorage.getModuleIndex(state, currentLayer);
      if (i < qs.length - 1) {
        state.moduleProgress[currentLayer].questionIndex = i + 1;
        persist();
        renderQuestion();
      } else {
        finishLayer(currentLayer);
      }
    });

    $("btnFreeResultsContinue")?.addEventListener("click", () => continueFromResults());
    $("btnSkipPremium")?.addEventListener("click", () => skipPremium());

    $("accuracyRange")?.addEventListener("input", (e) => {
      const v = clamp(Number(e.target.value), 1, 10);
      $("accuracyValue").textContent = String(v);
      state.feedback.accuracy = v;
      persist();
    });
    $("btnAccuracyContinue")?.addEventListener("click", () => continueFromAccuracy());

    $("btnSubmitFeedback")?.addEventListener("click", () => submitFeedback());
    $("btnCompletionHome")?.addEventListener("click", () => showScreen("home"));

    $("btnPromoModal")?.addEventListener("click", () => {
      $("promoError").classList.add("hidden");
      $("promoInput").value = "";
      $("promoModal").showModal();
    });
    $("btnPromoSubmit")?.addEventListener("click", async () => {
      if (await SSDStorage.applyPromoUnlock($("promoInput").value)) {
        unlockPremiumInline({ scroll: true });
      } else {
        $("promoError").classList.remove("hidden");
      }
    });

    $("btnDownloadReport")?.addEventListener("click", downloadReport);

    $("btnResetAll")?.addEventListener("click", () => {
      if (!confirm(ui("resetConfirm"))) return;
      SSDStorage.clear();
      state = SSDStorage.load();
      currentLayer = null;
      showScreen("home");
    });
  };

  const init = () => {
    bindEvents();
    checkPaymentReturn();
    resumeScreen();
    renderLanguage();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
