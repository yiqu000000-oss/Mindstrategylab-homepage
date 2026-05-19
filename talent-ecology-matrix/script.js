/* Talent Ecology Matrix — modular dashboard + free preview + premium */

(() => {
  "use strict";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const nowIso = () => new Date().toISOString();
  const $ = (id) => document.getElementById(id);

  const i18n =
    typeof TEM_I18N !== "undefined"
      ? TEM_I18N
      : { en: {}, zh: {} };

  let state = TEMStorage.load();
  let screen = "welcome";
  let currentModule = null;

  const reloadState = () => {
    state = TEMStorage.load();
    return state;
  };

  const isDebugMode = () => {
    try {
      if (localStorage.getItem(TEM_DEBUG_STORAGE_FLAG) === "1") return true;
    } catch {
      /* ignore */
    }
    return new URLSearchParams(window.location.search).get("debug") === "1";
  };

  const logStorageDebug = (label) => {
    if (!isDebugMode()) return;
    console.log("TEM localStorage keys", Object.keys(localStorage));
    console.log(`TEM [${label}]`, TEMStorage.debugSnapshot(state));
  };

  const t = () => i18n[state.language];
  const tl = (obj) => (state.language === "zh" ? obj.zh : obj.en);

  /** Bilingual question/item count (UTF-8 题 — never hardcode corrupted literals). */
  const formatQuestionCount = (count, lang = state.language, enUnit = "items") => {
    const n = Number(count) || 0;
    return lang === "zh" ? `${n} 题` : `${n} ${enUnit}`;
  };
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  const domainLabel = (key) => {
    const d = TAXONOMY.find((x) => x.key === key);
    return d ? tl(d.label) : key;
  };

  const microLabel = (key) => {
    const m = ITEM_REGISTRY.find((x) => x.key === key);
    return m ? tl(m.label) : key;
  };

  const subdomainLabel = (sk) => {
    const [, sub] = sk.split("::");
    for (const d of TAXONOMY) {
      const sd = d.subdomains.find((s) => s.key === sub);
      if (sd) return tl(sd.label);
    }
    return sub;
  };

  const persist = () => {
    TEMStorage.save(state);
    const hint = $("saveHint");
    if (hint) {
      hint.textContent = t().saveHint;
      setTimeout(() => {
        if (hint.textContent === t().saveHint) hint.textContent = "";
      }, 2000);
    }
    updatePremiumUI();
  };

  const moduleQuestions = (domainKey) =>
    ASSESSMENT_QUESTIONS.filter((q) => q.domain === domainKey);

  const refreshMeta = () => {
    const completed = TEMStorage.getCompletedModules(state);
    state.meta = completed.length
      ? SCORING.computeMetaResults(state.responses, completed, { moduleSnapshots: state.modules })
      : null;
    state.completedModules = completed;
  };

  const domainFromModuleSnapshot = (domainKey) => {
    const mod = state.modules[domainKey];
    const pct = mod?.results?.percentages;
    if (!pct) return null;
    return {
      percentages: { ...pct },
      means: mod.results?.means || {},
      subdomains: mod.results?.subdomains || {},
      micros: mod.results?.micros || {},
    };
  };

  const isPremiumUnlockedLocal = () => {
    try {
      return localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
    } catch {
      return false;
    }
  };

  const syncPremiumStateFromLocal = () => {
    if (!isPremiumUnlockedLocal()) return;
    TEMStorage.mergeStandalonePremiumUnlock(state);
    state.premium_unlocked = true;
    state.premiumUnlocked = true;
    if (!state.premium_unlocked_at) state.premium_unlocked_at = nowIso();
  };

  const unlockPremiumFromPayment = () => {
    if (!TEMStorage.applyPaymentUnlock()) return false;
    syncPremiumStateFromLocal();
    state.premium_unlock_source = "stripe";
    state.premium_promo_code = null;
    state.premium_unlocked_at = nowIso();
    persist();
    return true;
  };

  const checkPaymentReturn = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(PAYMENT_SUCCESS_PARAM) !== "true") return;
    if (unlockPremiumFromPayment()) {
      openPremiumReport();
    }
    params.delete(PAYMENT_SUCCESS_PARAM);
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState({}, "", url);
  };

  /** Navigate to premium report — only when localStorage unlock flag is set. */
  const openPremiumReport = () => {
    const unlocked = localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
    if (!unlocked) {
      showPremiumGateModal();
      return;
    }
    reloadState();
    syncPremiumStateFromLocal();
    refreshMeta();
    setScreen("premiumReport");
  };

  const requirePremiumAccess = () => {
    const unlocked = localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
    if (unlocked) {
      openPremiumReport();
    } else {
      showPremiumGateModal();
    }
  };

  const getStripePaymentLink = () => {
    if (
      typeof TEM_STRIPE_PAYMENT_LINK !== "string" ||
      !TEM_STRIPE_PAYMENT_LINK.trim() ||
      TEM_STRIPE_PAYMENT_LINK.includes("PASTE_YOUR") ||
      TEM_STRIPE_PAYMENT_LINK.includes("[INSERT")
    ) {
      return "";
    }
    return TEM_STRIPE_PAYMENT_LINK.trim();
  };

  const clearGateStatus = () => {
    const el = $("premiumGateStatus");
    if (!el) return;
    el.textContent = "";
    el.classList.remove("modal__status--error");
  };

  const showPremiumGateModal = () => {
    const modal = $("premiumGateModal");
    if (!modal) return;
    clearGateStatus();
    modal.classList.remove("hidden");
  };

  const closePremiumGateModal = () => {
    $("premiumGateModal")?.classList.add("hidden");
    clearGateStatus();
  };

  const handleGateStripePay = () => {
    const link = getStripePaymentLink();
    if (!link) {
      const el = $("premiumGateStatus");
      if (el) {
        el.textContent = t().stripeNotConfigured;
        el.classList.add("modal__status--error");
      }
      return;
    }
    window.location.href = TEM_STRIPE_PAYMENT_LINK;
  };

  const openPromoFromGate = () => {
    closePremiumGateModal();
    openPremiumUnlockModal();
  };

  const denyPremiumReportAccess = () => {
    showPremiumGateModal();
    $("screenPremiumReport")?.classList.add("hidden");
    if (screen === "premiumReport") {
      screen = "dashboard";
      $("screenDashboard")?.classList.remove("hidden");
    }
  };

  const updatePremiumUI = () => {
    const unlocked = isPremiumUnlockedLocal();
    const badgeText = t().premiumUnlockedBadge;
    $("premiumBadge")?.classList.toggle("hidden", !unlocked);
    if ($("premiumBadge")) $("premiumBadge").textContent = badgeText;
    if ($("premiumReportBadge")) $("premiumReportBadge").textContent = badgeText;
    $("btnViewPremiumReport")?.classList.toggle("hidden", !unlocked);
    $("btnOpenPremiumUnlockModal")?.classList.toggle("hidden", unlocked);
    const stripeBtn = $("btnStripeCheckout");
    if (stripeBtn) stripeBtn.classList.toggle("hidden", unlocked);
  };

  const clearPromoStatus = () => {
    const el = $("premiumPromoStatus");
    if (!el) return;
    el.textContent = "";
    el.classList.remove("modal__status--error");
  };

  const showPromoInvalid = () => {
    const el = $("premiumPromoStatus");
    if (!el) return;
    const tr = t();
    el.textContent = `${tr.promoInvalidEn}\n${tr.promoInvalidZh}`;
    el.classList.add("modal__status--error");
  };

  const openPremiumUnlockModal = () => {
    const modal = $("premiumUnlockModal");
    if (!modal) return;
    clearPromoStatus();
    const input = $("premiumPromoInput");
    if (input) {
      input.value = "";
    }
    modal.classList.remove("hidden");
    input?.focus();
  };

  const closePremiumUnlockModal = () => {
    $("premiumUnlockModal")?.classList.add("hidden");
    clearPromoStatus();
  };

  const submitPremiumPromo = () => {
    const code = ($("premiumPromoInput")?.value ?? "").trim();
    if (!TEMStorage.applyPromoUnlock(code)) {
      showPromoInvalid();
      return;
    }
    TEMStorage.mergeStandalonePremiumUnlock(state);
    state.premium_unlocked = true;
    state.premiumUnlocked = true;
    state.premium_unlock_source = "promo";
    state.premium_promo_code = TEM_FOUNDER_PROMO_CODE;
    state.premium_unlocked_at = nowIso();
    persist();
    closePremiumUnlockModal();
    closePremiumGateModal();
    openPremiumReport();
  };

  const getFilteredResults = () => {
    const completed = TEMStorage.getCompletedModules(state);
    const full = SCORING.computeResults(state.responses);
    const domains = {};
    completed.forEach((key) => {
      if (full.domains[key]?.percentages) {
        domains[key] = full.domains[key];
      } else {
        const snap = domainFromModuleSnapshot(key);
        if (snap) domains[key] = snap;
      }
    });
    const micros = {};
    Object.entries(full.micros || {}).forEach(([k, m]) => {
      if (completed.includes(m.domain)) micros[k] = m;
    });
    completed.forEach((key) => {
      const top = state.modules[key]?.results?.topMicros;
      if (!Array.isArray(top)) return;
      top.forEach((m) => {
        if (m?.key && !micros[m.key]) micros[m.key] = { ...m, domain: key };
      });
    });
    return { ...full, domains, micros, completed };
  };

  const previewRankings = () => {
    refreshMeta();
    const meta = state.meta;
    if (!meta?.unlocked) return null;
    const rankings = meta.domainRankings || [];
    const sortKeys = (field) =>
      [...rankings]
        .sort((a, b) => (b.percentages?.[field] ?? 0) - (a.percentages?.[field] ?? 0))
        .slice(0, 3)
        .map((d) => d.key);
    const venn = meta.crossDomainIntegration?.percentages || {};
    return {
      meta,
      topDesired: sortKeys("desired"),
      topPerceived: sortKeys("perceived"),
      topEase: sortKeys("ease"),
      topConstraint: sortKeys("constraint"),
      venn,
    };
  };

  const setScreen = (name) => {
    if (name === "premiumReport") {
      const unlocked = localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
      if (!unlocked) {
        showPremiumGateModal();
        return;
      }
    }

    screen = name;
    const screens = [
      "welcome",
      "consent",
      "background",
      "dashboard",
      "moduleAssessment",
      "moduleResults",
      "freePreview",
      "premiumReport",
      "validation",
    ];
    const map = {
      welcome: "screenWelcome",
      consent: "screenConsent",
      background: "screenBackground",
      dashboard: "screenDashboard",
      moduleAssessment: "screenModuleAssessment",
      moduleResults: "screenModuleResults",
      freePreview: "screenFreePreview",
      premiumReport: "screenPremiumReport",
      validation: "screenValidation",
    };
    screens.forEach((s) => {
      const el = $(map[s]);
      if (el) el.classList.toggle("hidden", name !== s);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (name === "dashboard") renderDashboard();
    if (name === "moduleAssessment") renderModuleQuestion();
    if (name === "moduleResults" && currentModule) renderModuleResults(currentModule);
    if (name === "freePreview") renderFreePreview();
    if (name === "premiumReport") renderPremiumReport();
    if (name === "validation") renderValidation();
  };

  const getModuleIndex = (domainKey) => {
    const prog = state.moduleProgress[domainKey];
    if (prog && typeof prog.questionIndex === "number") {
      return clamp(prog.questionIndex, 0, moduleQuestions(domainKey).length - 1);
    }
    return 0;
  };

  const setModuleIndex = (domainKey, index) => {
    if (!state.moduleProgress[domainKey]) {
      state.moduleProgress[domainKey] = { started: true, questionIndex: 0 };
    }
    state.moduleProgress[domainKey].started = true;
    state.moduleProgress[domainKey].questionIndex = index;
    persist();
  };

  const completeModule = (domainKey) => {
    const results = SCORING.computeDomainModule(state.responses, domainKey);
    state.modules[domainKey] = TEMStorage.normalizeModule(domainKey, {
      completed: true,
      completedAt: nowIso(),
      results,
    });
    state.completedModules = TEMStorage.getCompletedModules(state);
    refreshMeta();
    persist();
    currentModule = domainKey;
    setScreen("moduleResults");
  };

  const renderVennForPercentages = (percentages, diagramId, legendId, constraintId, options = {}) => {
    const { teaser = false } = options;
    const I = (percentages.desired ?? 0) / 100;
    const P = (percentages.perceived ?? 0) / 100;
    const E = (percentages.ease ?? 0) / 100;
    const r = teaser ? 58 : 72;
    const cx = 180;
    const cy = 180;
    const offset = teaser ? 30 : 38;
    $(diagramId).innerHTML = `
      <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram">
        <circle cx="${cx - offset}" cy="${cy}" r="${r}" fill="rgba(16,38,72,${0.08 + I * 0.22})" stroke="rgba(16,38,72,0.45)" stroke-width="1.5"/>
        <circle cx="${cx + offset}" cy="${cy - offset * 0.6}" r="${r}" fill="rgba(186,154,83,${0.08 + P * 0.22})" stroke="rgba(186,154,83,0.55)" stroke-width="1.5"/>
        <circle cx="${cx + offset}" cy="${cy + offset * 0.6}" r="${r}" fill="rgba(16,38,72,${0.06 + E * 0.2})" stroke="rgba(16,38,72,0.35)" stroke-width="1.5"/>
        <text x="${cx - offset}" y="${cy + 4}" text-anchor="middle" font-size="11" fill="#102648" font-weight="700">${state.language === "zh" ? "理想" : "Desired"}</text>
        <text x="${cx + offset}" y="${cy - offset * 0.6 + 4}" text-anchor="middle" font-size="11" fill="#102648" font-weight="700">${state.language === "zh" ? "感知" : "Perceived"}</text>
        <text x="${cx + offset}" y="${cy + offset * 0.6 + 4}" text-anchor="middle" font-size="11" fill="#102648" font-weight="700">${state.language === "zh" ? "顺畅" : "Ease"}</text>
      </svg>`;
    const tr = t();
    if (teaser) {
      $(legendId).innerHTML = `
      <span><i style="background:rgba(16,38,72,.75)"></i>${escapeHtml(tr.desired)}</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>${escapeHtml(tr.perceived)}</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>${escapeHtml(tr.ease)}</span>`;
      return;
    }
    $(legendId).innerHTML = `
      <span><i style="background:rgba(16,38,72,.75)"></i>${escapeHtml(tr.desired)} (${percentages.desired ?? 0}%)</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>${escapeHtml(tr.perceived)} (${percentages.perceived ?? 0}%)</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>${escapeHtml(tr.ease)} (${percentages.ease ?? 0}%)</span>`;
    if (constraintId && $(constraintId)) {
      $(constraintId).innerHTML = `
      <div class="constraint-layer__title">${escapeHtml(tr.constraintLayerTitle)}</div>
      <div class="constraint-meter"><div class="constraint-meter__fill" style="width:${percentages.constraint ?? 0}%"></div></div>
      <p class="help" style="margin-top:8px">${percentages.constraint ?? 0}%</p>`;
    }
  };

  const renderPerspectiveScores = (root, percentages) => {
    const tr = t();
    root.innerHTML = "";
    ["desired", "perceived", "ease", "constraint"].forEach((key) => {
      const pct = percentages[key] ?? 0;
      const label = tr[key];
      const el = document.createElement("div");
      el.className = "score-perspective";
      el.innerHTML = `<div class="score-perspective__head"><span class="score-perspective__label">${escapeHtml(label)}</span><span class="score-perspective__value">${pct}%</span></div>
        <div class="score-perspective__bar"><div class="score-perspective__fill" style="width:${pct}%"></div></div>`;
      root.appendChild(el);
    });
  };

  const renderRankKeys = (el, keys, getPct, labelFn = domainLabel) => {
    if (!el) return;
    el.innerHTML = "";
    keys.forEach((key, idx) => {
      const pct = getPct(key);
      const row = document.createElement("div");
      row.className = "rank-item";
      row.innerHTML = `<span class="rank-item__n">${idx + 1}</span>
        <span class="rank-item__name">${escapeHtml(labelFn(key))}</span>
        <span>${typeof pct === "number" ? `${pct}%` : pct}</span>
        <div class="rank-item__bar"><div class="rank-item__fill" style="width:${typeof pct === "number" ? pct : 0}%"></div></div>`;
      el.appendChild(row);
    });
  };

  const IX = () => TEMInterpretations;
  const sl = (key) => {
    const L = IX().SECTION_LABELS[key];
    return state.language === "zh" ? L.zh : L.en;
  };

  const renderInterpretedRankList = (el, keys, getPct, labelFn = domainLabel) => {
    if (!el) return;
    el.innerHTML = "";
    keys.forEach((key, idx) => {
      const pct = typeof getPct(key) === "number" ? getPct(key) : 0;
      const scored = IX().labelScore(pct, state.language);
      const row = document.createElement("div");
      row.className = "rank-item rank-item--interp";
      row.innerHTML = `<span class="rank-item__n">${idx + 1}</span>
        <span class="rank-item__name">${escapeHtml(labelFn(key))}</span>
        <span class="rank-item__score">${scored.pct}% · <strong>${escapeHtml(scored.label)}</strong></span>
        <p class="interp-narrative rank-item__narrative">${escapeHtml(scored.narrative)}</p>
        <div class="rank-item__bar"><div class="rank-item__fill" style="width:${scored.pct}%"></div></div>`;
      el.appendChild(row);
    });
  };

  const renderInterpretedMicroList = (el, keys, getPct) => {
    if (!el) return;
    el.innerHTML = "";
    keys.forEach((key) => {
      const pct = getPct(key);
      const name = microLabel(key);
      const block = document.createElement("div");
      block.innerHTML = IX().htmlMicroItem(escapeHtml(name), pct, state.language, key);
      el.appendChild(block.firstElementChild || block);
    });
  };

  const renderDomainInterpretationHtml = (interp) => {
    const lang = state.language;
    let html = `<div class="interp-domain-head">
      <p class="interp-overall">${IX().htmlScoreLine(interp.overall.pct, lang)}</p>
      <p class="interp-narrative">${escapeHtml(interp.overall.narrative)}</p>
    </div>`;
    if (interp.pattern) {
      html += `<div class="interp-block interp-block--pattern">
        <h5>${escapeHtml(sl("pattern"))}: ${escapeHtml(interp.pattern.title)}</h5>
        <p class="interp-narrative">${escapeHtml(interp.pattern.narrative)}</p>
      </div>`;
    }
    html += `<div class="interp-block"><h5>${escapeHtml(sl("perspectives"))}</h5>`;
    interp.perspectives.forEach((p) => {
      html += IX().htmlPerspectiveBlock(p, lang);
    });
    html += `</div>`;
    const sec = interp.sections;
    [
      ["meaning", sec.meaning],
      ["manifestations", sec.manifestations],
      ["advantages", sec.advantages],
      ["careers", sec.careers],
      ["development", sec.development],
      ["friction", sec.friction],
    ].forEach(([key, text]) => {
      const titleKey = key === "careers" ? "careers" : key;
      html += `<div class="interp-block"><h5>${escapeHtml(sl(titleKey))}</h5><p class="interp-narrative">${escapeHtml(text)}</p></div>`;
    });
    if (interp.resourceLines?.length) {
      html += `<div class="interp-block"><h5>${escapeHtml(sl("resourceEcology"))}</h5><ul class="interp-list">`;
      interp.resourceLines.forEach((line) => {
        html += `<li>${escapeHtml(line)}</li>`;
      });
      html += `</ul></div>`;
    }
    return html;
  };

  const renderDashboard = () => {
    const tr = t();
    const total = TAXONOMY.length;
    const done = TEMStorage.completedCount(state);
    const unlocked = TEMStorage.isMetaUnlocked(state);

    $("dashboardProgressValue").textContent = `${done} / ${total}`;
    $("dashboardProgressBar").style.width = `${(done / total) * 100}%`;
    $("metaBannerSubtitle").textContent = unlocked
      ? tr.metaBannerUnlocked
      : tr.metaBannerLocked(done, MIN_MODULES_FOR_META);
    $("btnOpenPreview").disabled = !unlocked;
    $("btnOpenPremium")?.classList.toggle("hidden", !unlocked);

    const grid = $("moduleDashboardGrid");
    grid.innerHTML = "";
    TAXONOMY.forEach((d, i) => {
      const status = TEMStorage.moduleStatus(state, d.key);
      const pct = TEMStorage.moduleProgressPercent(state, d.key);
      const qs = moduleQuestions(d.key);
      const card = document.createElement("article");
      card.className =
        `module-dashboard-card module-dashboard-card--${status}` +
        (d.flagship ? " module-dashboard-card--flagship" : "");

      const btnLabel =
        status === "completed"
          ? tr.viewResults
          : status === "in_progress"
            ? tr.continueModule
            : tr.startModule;

      card.innerHTML = `
        ${d.flagship ? `<span class="module-dashboard-card__flag">${escapeHtml(tr.flagshipBadge)}</span>` : ""}
        <span class="module-dashboard-card__num">${String(i + 1).padStart(2, "0")}</span>
        <h4 class="module-dashboard-card__name">${escapeHtml(tl(d.label))}</h4>
        <p class="module-dashboard-card__desc">${escapeHtml(tl(d.description))}</p>
        <span class="module-dashboard-card__meta">${escapeHtml(formatQuestionCount(qs.length))}</span>
        <span class="module-dashboard-card__status">${escapeHtml(
          status === "completed" ? tr.statusCompleted : status === "in_progress" ? tr.statusInProgress : tr.statusNotStarted,
        )}</span>
        <div class="module-dashboard-card__progress"><div class="progress"><div class="progress__bar" style="width:${pct}%"></div></div><span>${pct}%</span></div>
        <button type="button" class="btn btn--sm module-dashboard-card__btn" data-action="${status === "completed" ? "results" : "assess"}">${escapeHtml(btnLabel)}</button>`;

      card.querySelector(".module-dashboard-card__btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openModule(d.key, status === "completed" ? "results" : "assess");
      });
      grid.appendChild(card);
    });
    updatePremiumUI();
  };

  const openModule = (domainKey, mode) => {
    currentModule = domainKey;
    const status = TEMStorage.moduleStatus(state, domainKey);
    if (mode === "results" || status === "completed") {
      setScreen("moduleResults");
      return;
    }
    if (!state.moduleProgress[domainKey]) {
      state.moduleProgress[domainKey] = { started: true, questionIndex: 0 };
      persist();
    }
    setScreen("moduleAssessment");
  };

  const renderModuleQuestion = () => {
    if (!currentModule) return;
    const tr = t();
    const qs = moduleQuestions(currentModule);
    const i = getModuleIndex(currentModule);
    const q = qs[i];
    if (!q) return;
    const persp = PERSPECTIVES.find((p) => p.key === q.perspective);
    const domain = TAXONOMY.find((d) => d.key === currentModule);
    const micro = ITEM_REGISTRY.find((m) => m.key === q.micro);
    const value = clamp(state.responses[q.id], 1, 7);

    $("moduleBreadcrumb").textContent = domainLabel(currentModule);
    $("moduleAssessmentTitle").textContent = tl(domain.label);
    $("moduleAssessmentSubtitle").textContent = formatQuestionCount(qs.length, state.language, "questions");
    $("progressValue").textContent = `${i + 1} / ${qs.length}`;
    $("progressBar").style.width = `${((i + 1) / qs.length) * 100}%`;
    $("perspectiveBanner").innerHTML = `<strong>${escapeHtml(tl(persp.label))}</strong> — ${escapeHtml(tl(persp.framing))}`;

    $("questionCard").innerHTML = `
      <div class="q-meta"><span class="q-micro">${escapeHtml(micro ? tl(micro.label) : q.micro)}</span><span class="q-id">${escapeHtml(q.id)}</span></div>
      <div class="q-text">${escapeHtml(tl(q.text))}</div>
      <div class="slider__labels"><span>1 — ${escapeHtml(tr.likertLeft)}</span><span>4 — ${escapeHtml(tr.likertMid)}</span><span>7 — ${escapeHtml(tr.likertRight)}</span></div>
      <div class="slider__control"><input class="range" type="range" min="1" max="7" step="1" value="${value}" id="qRange" /><div class="range-badge" id="qValue">${value}</div></div>`;

    $("qRange").addEventListener("input", (e) => {
      const v = clamp(Number(e.target.value), 1, 7);
      state.responses[q.id] = v;
      $("qValue").textContent = String(v);
      persist();
    });
    $("btnPrev").disabled = i === 0;
    $("btnNext").textContent = i === qs.length - 1 ? tr.finish : tr.next;
  };

  const renderModuleResults = (domainKey) => {
    const mod = state.modules[domainKey];
    const results = mod?.results || SCORING.computeDomainModule(state.responses, domainKey);
    const p = results.percentages || {};
    $("moduleResultsBreadcrumb").textContent = domainLabel(domainKey);
    $("moduleResultsTitle").textContent = domainLabel(domainKey);
    $("moduleResultsSubtitle").textContent =
      state.language === "zh" ? "本模块结果已保存" : "Module results saved locally";
    renderVennForPercentages(p, "moduleVennDiagram", "moduleVennLegend", "moduleConstraintLayer");
    renderPerspectiveScores($("moduleScoreGrid"), p);
    const list = $("moduleRecList");
    list.innerHTML = "";
    RESOURCE_ECOLOGY.getRecommendations(domainKey, results, state.language).forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
  };

  const renderTeaserMetricCards = (container, meta) => {
    const tr = t();
    if (!container) return;
    const alignPct = Math.round((meta?.talentAlignmentIndex ?? 0) * 100);
    const constraintPct = Math.round((meta?.constraintLoad ?? 0) * 100);
    const crossPct = meta?.crossDomainIntegration?.percentages?.overall ?? 0;
    container.innerHTML = "";
    const cards = [
      { label: tr.indexAlignment, pct: alignPct },
      { label: tr.indexConstraint, pct: constraintPct },
      { label: tr.completedModulesMetric, count: meta.completedCount },
      { label: tr.crossDomainPotential, pct: crossPct },
    ];
    cards.forEach((c) => {
      const el = document.createElement("div");
      el.className = "index-card index-card--teaser";
      if (c.count != null) {
        el.innerHTML = `<div class="index-card__label">${escapeHtml(c.label)}</div>
          <div class="index-card__value">${c.count}</div>
          <div class="index-card__detail">${escapeHtml(tr.modulesCompleted)}</div>`;
      } else {
        const scored = IX().labelScore(c.pct, state.language);
        el.innerHTML = `<div class="index-card__label">${escapeHtml(c.label)}</div>
          <div class="index-card__value">${scored.display}</div>
          <div class="index-card__detail">${escapeHtml(scored.narrative)}</div>`;
      }
      container.appendChild(el);
    });
  };

  const renderFreePreview = () => {
    const tr = t();
    const preview = previewRankings();
    if (!preview) {
      setScreen("dashboard");
      return;
    }
    const { meta, venn } = preview;

    $("freePreviewSubtitle").textContent = tr.freePreviewSubtitle(meta.completedCount);
    $("previewTeaserLead").textContent = tr.previewTeaserLead;
    $("previewTeaserPitch").textContent = tr.previewTeaserPitch;
    $("previewVennHelp").textContent = tr.previewVennHelpTeaser;
    renderVennForPercentages(venn, "previewVennDiagram", "previewVennLegend", null, { teaser: true });
    renderTeaserMetricCards($("previewTeaserMetrics"), meta);

    $("premiumList").innerHTML = "";
    tr.premiumItems.forEach((txt) => {
      const li = document.createElement("li");
      li.textContent = txt;
      $("premiumList").appendChild(li);
    });
    $("premiumFinePrint").textContent = tr.premiumFinePrint;
    setupStripeButton();
    updatePremiumUI();
  };

  const setupStripeButton = () => {
    const btn = $("btnStripeCheckout");
    if (!btn) return;
    const tr = t();
    btn.textContent = tr.premiumBtn;
    btn.href = "#";
    btn.onclick = (e) => {
      e.preventDefault();
      if (isPremiumUnlockedLocal()) {
        openPremiumReport();
        return;
      }
      showPremiumGateModal();
    };
  };

  const renderPremiumDebugPanel = () => {
    const panel = $("premiumDebugPanel");
    if (!panel) return;
    const show = isDebugMode();
    panel.classList.toggle("hidden", !show);
    if (!show) return;
    const snap = TEMStorage.debugSnapshot(state);
    panel.innerHTML = `<h4 class="h4">Debug: data pipeline</h4>
      <pre class="debug-pre">${escapeHtml(JSON.stringify(snap, null, 2))}</pre>`;
  };

  const renderPremiumReport = () => {
    const unlocked = localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
    if (!unlocked) {
      denyPremiumReportAccess();
      return;
    }

    reloadState();
    logStorageDebug("renderPremiumReport");

    refreshMeta();
    const filtered = getFilteredResults();
    const completed = filtered.completed;

    const banner = $("premiumNoDataBanner");
    if (banner) {
      const tr = t();
      if (!completed.length) {
        banner.classList.remove("hidden");
        banner.innerHTML = `<p class="help report-empty">${escapeHtml(tr.premiumNoModuleData)}</p>`;
      } else {
        banner.classList.add("hidden");
        banner.innerHTML = "";
      }
    }

    renderPremiumDebugPanel();

    TEMPremiumReport.render({
      state,
      meta: state.meta,
      filtered,
      completed,
      tr: t(),
      $,
      escapeHtml,
      domainLabel,
      microLabel,
      subdomainLabel,
      RESOURCE_ECOLOGY,
      renderPerspectiveScores,
      debug: isDebugMode(),
    });
  };

  const renderValidation = () => {
    const tr = t();
    const items = [
      { key: "accuracy", label: tr.vAccuracy },
      { key: "usefulness", label: tr.vUseful },
      { key: "describe", label: tr.vDescribe },
      { key: "interest", label: tr.vInterest },
    ];
    if (!state.validation) {
      state.validation = { accuracy: 4, usefulness: 4, describe: 4, interest: 4, open_feedback: "" };
    }
    const block = $("validationBlock");
    block.innerHTML = "";
    items.forEach((item) => {
      const v = state.validation[item.key] ?? 4;
      const row = document.createElement("div");
      row.className = "v-row";
      row.innerHTML = `<div class="v-label">${escapeHtml(item.label)}</div>
        <div class="slider__control"><input class="range" type="range" min="1" max="7" step="1" value="${v}" data-vkey="${item.key}" /><div class="range-badge">${v}</div></div>`;
      row.querySelector("input").addEventListener("input", (e) => {
        state.validation[item.key] = Number(e.target.value);
        row.querySelector(".range-badge").textContent = e.target.value;
        persist();
      });
      block.appendChild(row);
    });
    $("openFeedback").value = state.validation.open_feedback || "";
  };

  const renderBackgroundForm = () => {
    const form = $("backgroundForm");
    if (!form.dataset.built) {
      Object.entries(BACKGROUND_FIELDS).forEach(([key, field]) => {
        const wrap = document.createElement("div");
        wrap.className = "field";
        if (key === "field" || key === "country") wrap.classList.add("field--full");
        const label = document.createElement("label");
        label.className = "label";
        label.htmlFor = `bg_${key}`;
        label.id = `bg_label_${key}`;
        let input;
        if (field.type === "select") {
          input = document.createElement("select");
          input.className = "select";
          const empty = document.createElement("option");
          empty.value = "";
          input.appendChild(empty);
          field.options.forEach((opt) => {
            const o = document.createElement("option");
            o.value = opt.value;
            o.dataset.labelEn = opt.label.en;
            o.dataset.labelZh = opt.label.zh;
            input.appendChild(o);
          });
        } else if (field.type === "number") {
          input = document.createElement("input");
          input.type = "number";
          input.className = "input";
          input.min = String(field.min);
          input.max = String(field.max);
        } else {
          input = document.createElement("input");
          input.type = "text";
          input.className = "input";
        }
        input.id = `bg_${key}`;
        input.addEventListener("change", () => {
          state.background[key] = input.value;
          persist();
        });
        wrap.append(label, input);
        form.appendChild(wrap);
      });
      form.dataset.built = "1";
    }
    Object.entries(BACKGROUND_FIELDS).forEach(([key, field]) => {
      const label = $(`bg_label_${key}`);
      if (label) label.textContent = tl(field.label);
      const input = $(`bg_${key}`);
      if (input) {
        if (state.background[key]) input.value = state.background[key];
        if (field.type === "select") {
          [...input.options].forEach((o) => {
            if (o.dataset.labelEn) o.textContent = state.language === "zh" ? o.dataset.labelZh : o.dataset.labelEn;
          });
        }
      }
    });
  };

  const renderWelcomeCallouts = () => {
    $("welcomeCallouts").innerHTML = "";
    t().callouts.forEach((c) => {
      const el = document.createElement("div");
      el.className = "callout";
      el.innerHTML = `<div class="callout__title">${escapeHtml(c.title)}</div><div class="callout__body">${escapeHtml(c.body)}</div>`;
      $("welcomeCallouts").appendChild(el);
    });
  };

  const renderLanguage = () => {
    const tr = t();
    document.documentElement.lang = state.language === "zh" ? "zh-Hans" : "en";
    const set = (id, text) => {
      const el = $(id);
      if (el && text != null) el.textContent = text;
    };
    set("brandSubtitle", tr.brandSubtitle);
    set("welcomeLead", tr.welcomeLead);
    set("timeTitle", tr.timeTitle);
    set("timeValue", tr.timeValue);
    set("noteTitle", tr.noteTitle);
    set("noteValue", tr.noteValue);
    set("welcomeDisclaimer", tr.disclaimer);
    set("consentTitle", tr.consentTitle);
    set("consentSubtitle", tr.consentSubtitle);
    set("consentBody", tr.consentBody);
    set("consentCheckboxLabel", tr.consentCheckboxLabel);
    set("bgTitle", tr.bgTitle);
    set("bgSubtitle", tr.bgSubtitle);
    set("dashboardTitle", tr.dashboardTitle);
    set("dashboardSubtitle", tr.dashboardSubtitle);
    set("modulesHeading", tr.modulesHeading);
    set("modulesHint", tr.modulesHint);
    set("metaBannerTitle", tr.metaBannerTitle);
    set("dashboardProgressLabel", tr.modulesCompleted);
    set("previewDisclaimer", tr.disclaimer);
    set("premiumDisclaimer", tr.disclaimer);
    set("footerLeft", tr.footerLeft());
    set("footerRight", tr.footerRight);
    set("homeBackLink", tr.homeBack);
    set("validationTitle", tr.validationTitle);
    set("validationSubtitle", tr.validationSubtitle);
    set("feedbackLabel", tr.feedbackLabel);
    set("previewVennTitle", tr.previewVennTitle);
    set("previewVennHelp", tr.previewVennHelpTeaser);
    set("previewTeaserLead", tr.previewTeaserLead);
    set("previewTeaserPitch", tr.previewTeaserPitch);
    set("secRankingsTitle", tr.secRankingsTitle);
    set("secRankDesiredTitle", tr.rankDesiredTitle);
    set("secRankPerceivedTitle", tr.rankPerceivedTitle);
    set("secRankEaseTitle", tr.rankEaseTitle);
    set("secRankConstraintTitle", tr.rankConstraintTitle);
    set("secRankEcologyTitle", tr.previewEcologyTitle);
    set("secSignaturePathTitle", tr.previewSignatureTitle);
    set("secSignaturePathNote", tr.previewSignatureNote);
    set("premiumTitle", tr.premiumTitle);
    set("premiumSubtitle", tr.premiumSubtitle);
    set("premiumReportTitle", tr.premiumReportTitle);
    set("moduleVennTitle", tr.moduleVennTitle);
    set("moduleVennHelp", tr.moduleVennHelp);
    set("moduleScoresTitle", tr.moduleScoresTitle);
    set("moduleRecTitle", tr.moduleRecTitle);
    set("progressLabel", tr.progressLabel);

    const bi = (key) => {
      const en = i18n.en[key];
      const zh = i18n.zh[key];
      if (en == null || zh == null) return String(key);
      const enText = typeof en === "function" ? en() : en;
      const zhText = typeof zh === "function" ? zh() : zh;
      return state.language === "en" ? `${enText} / ${zhText}` : `${zhText} / ${enText}`;
    };
    set("btnWelcomeNext", bi("continueBtn"));
    set("btnConsentBack", bi("back"));
    set("btnConsentNext", bi("continueBtn"));
    set("btnBgBack", bi("back"));
    set("btnBgNext", bi("continueToDashboard"));
    set("btnPrev", bi("prev"));
    set("btnModuleBackDashboard", bi("dashboard"));
    set("btnModuleResultsDashboard", bi("dashboard"));
    set("btnPreviewDashboard", bi("dashboard"));
    set("btnPremiumDashboard", bi("dashboard"));
    set("btnRetakeModule", bi("retakeModule"));
    set("btnOpenPreview", bi("viewFreePreview"));
    set("btnOpenPremium", bi("viewPremiumReport"));
    set("btnViewPremiumReport", bi("viewFullPremiumReport"));
    set("premiumGateModalTitle", bi("premiumGateTitle"));
    set("premiumGateModalText", bi("premiumGateText"));
    set("btnGateStripePay", bi("premiumGateStripeBtn"));
    set("btnGateEnterPromo", bi("premiumGatePromoBtn"));
    set("premiumUnlockModalTitle", bi("promoModalTitle"));
    set("premiumUnlockModalSubtitle", bi("promoModalSubtitle"));
    set("premiumPromoLabel", bi("promoAccessCodeLabel"));
    set("btnOpenPremiumUnlockModal", bi("promoHaveCode"));
    set("btnSubmitPremiumPromo", bi("promoUnlockBtn"));
    set("btnCancelPremiumUnlockModal", bi("promoCancel"));
    set("btnDownloadProgress", bi("downloadProgress"));
    set("btnResetProgress", bi("resetProgress"));
    set("btnDownloadJson", tr.downloadJson);
    set("btnSubmitValidation", bi("submit"));
    set("btnValidationBack", bi("back"));
    set("btnPremiumToValidation", bi("validationBtnShort"));

    $("langEn").classList.toggle("pill--active", state.language === "en");
    $("langZh").classList.toggle("pill--active", state.language === "zh");

    renderWelcomeCallouts();
    renderBackgroundForm();
    if (screen === "dashboard") renderDashboard();
    if (screen === "moduleAssessment") renderModuleQuestion();
    if (screen === "moduleResults" && currentModule) renderModuleResults(currentModule);
    if (screen === "freePreview") renderFreePreview();
    if (screen === "premiumReport") {
      if (localStorage.getItem("talentEcologyMatrixPremiumUnlocked") !== "true") {
        denyPremiumReportAccess();
        return;
      }
      renderPremiumReport();
    }
    if (screen === "validation") renderValidation();
    updatePremiumUI();
  };

  const setConsentNextEnabled = () => {
    $("btnConsentNext").disabled = !state.consent_given;
  };

  const resolveEntryScreen = () => {
    if (!state.consent_given) return "welcome";
    if (!state.background_completed) return "background";
    return "dashboard";
  };

  const buildExportPayload = () => ({
    app: "talent_ecology_matrix",
    version: APP_VERSION,
    storageVersion: state.version,
    language: state.language,
    timestamp: nowIso(),
    consent_given: state.consent_given,
    background_completed: state.background_completed,
    background: { ...state.background },
    responses: { ...state.responses },
    modules: { ...state.modules },
    meta: state.meta,
    premium_unlocked: state.premium_unlocked,
    completedDomains: TEMStorage.completedDomains(state),
    validation: state.validation,
  });

  const downloadProgress = () => {
    const blob = new Blob([JSON.stringify(buildExportPayload(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tem-progress-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const init = () => {
    checkPaymentReturn();
    logStorageDebug("init");

    if ((navigator.language || "").toLowerCase().startsWith("zh") && !localStorage.getItem(PROGRESS_STORAGE_KEY)) {
      state.language = "zh";
    }

    $("langEn").addEventListener("click", () => {
      state.language = "en";
      persist();
      renderLanguage();
    });
    $("langZh").addEventListener("click", () => {
      state.language = "zh";
      persist();
      renderLanguage();
    });

    $("btnWelcomeNext").addEventListener("click", () => {
      setScreen(state.consent_given ? (state.background_completed ? "dashboard" : "background") : "consent");
    });

    $("btnConsentBack").addEventListener("click", () => setScreen("welcome"));
    $("btnConsentNext").addEventListener("click", () => setScreen("background"));

    $("consentCheckbox").addEventListener("change", (e) => {
      state.consent_given = e.target.checked;
      setConsentNextEnabled();
      persist();
    });

    $("btnBgBack").addEventListener("click", () => setScreen("consent"));
    $("btnBgNext").addEventListener("click", () => {
      state.background_completed = true;
      persist();
      setScreen("dashboard");
    });

    $("btnOpenPreview").addEventListener("click", () => {
      refreshMeta();
      persist();
      setScreen("freePreview");
    });
    $("btnOpenPremium").addEventListener("click", requirePremiumAccess);
    $("btnViewPremiumReport").addEventListener("click", requirePremiumAccess);

    $("btnClosePremiumGateModal")?.addEventListener("click", closePremiumGateModal);
    $("premiumGateModalOverlay")?.addEventListener("click", closePremiumGateModal);
    $("btnGateStripePay")?.addEventListener("click", handleGateStripePay);
    $("btnGateEnterPromo")?.addEventListener("click", openPromoFromGate);

    $("btnOpenPremiumUnlockModal")?.addEventListener("click", () => {
      if (isPremiumUnlockedLocal()) {
        openPremiumReport();
        return;
      }
      openPremiumUnlockModal();
    });
    $("btnClosePremiumUnlockModal")?.addEventListener("click", closePremiumUnlockModal);
    $("btnCancelPremiumUnlockModal")?.addEventListener("click", closePremiumUnlockModal);
    $("premiumUnlockModalOverlay")?.addEventListener("click", closePremiumUnlockModal);
    $("btnSubmitPremiumPromo")?.addEventListener("click", submitPremiumPromo);
    $("premiumPromoInput")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitPremiumPromo();
      }
    });

    $("btnModuleBackDashboard").addEventListener("click", () => setScreen("dashboard"));
    $("btnModuleResultsDashboard").addEventListener("click", () => setScreen("dashboard"));
    $("btnPreviewDashboard").addEventListener("click", () => setScreen("dashboard"));
    $("btnPremiumDashboard").addEventListener("click", () => setScreen("dashboard"));

    $("btnPrev").addEventListener("click", () => {
      if (!currentModule) return;
      const i = getModuleIndex(currentModule);
      if (i > 0) {
        setModuleIndex(currentModule, i - 1);
        renderModuleQuestion();
      }
    });
    $("btnNext").addEventListener("click", () => {
      if (!currentModule) return;
      const qs = moduleQuestions(currentModule);
      const i = getModuleIndex(currentModule);
      if (i < qs.length - 1) {
        setModuleIndex(currentModule, i + 1);
        renderModuleQuestion();
      } else completeModule(currentModule);
    });

    $("btnRetakeModule").addEventListener("click", () => {
      if (!currentModule) return;
      delete state.modules[currentModule];
      state.moduleProgress[currentModule] = { started: true, questionIndex: 0 };
      refreshMeta();
      persist();
      setScreen("moduleAssessment");
    });

    $("btnDownloadProgress").addEventListener("click", downloadProgress);
    $("btnDownloadJson").addEventListener("click", downloadProgress);

    $("btnResetProgress").addEventListener("click", () => {
      if (!window.confirm(t().resetConfirm)) return;
      TEMStorage.clear();
      state = TEMStorage.load();
      currentModule = null;
      screen = "welcome";
      $("consentCheckbox").checked = false;
      setConsentNextEnabled();
      setScreen("welcome");
      renderLanguage();
    });

    $("btnPremiumToValidation").addEventListener("click", () => setScreen("validation"));
    $("btnValidationBack").addEventListener("click", () => {
      if (isPremiumUnlockedLocal()) openPremiumReport();
      else setScreen("freePreview");
    });
    $("openFeedback")?.addEventListener("input", (e) => {
      if (!state.validation) state.validation = {};
      state.validation.open_feedback = e.target.value;
      persist();
    });
    $("btnSubmitValidation").addEventListener("click", () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const all = raw ? JSON.parse(raw) : [];
        all.push(buildExportPayload());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch {
        /* ignore */
      }
      $("submitStatus").textContent = t().submitOk;
    });

    if (window.location.protocol === "file:") {
      $("homeBackLink").href = "../Mindstrategylab homepage/index.html";
    }

    $("consentCheckbox").checked = state.consent_given;
    setConsentNextEnabled();
    renderLanguage();
    setScreen(resolveEntryScreen());
  };

  window.showPremiumGateModal = showPremiumGateModal;
  window.requirePremiumAccess = requirePremiumAccess;
  window.openPremiumReport = openPremiumReport;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

