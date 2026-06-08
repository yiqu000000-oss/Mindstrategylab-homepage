// Support System Dynamics — localStorage progress (modular layers)

const SSDStorage = (() => {
  "use strict";

  const LAYER_IDS = [1, 2, 3, 4];

  const defaultResponses = () =>
    Object.fromEntries(SSD_ITEMS.map((q) => [q.id, 4]));

  const FLOW_STAGES = [
    "home",
    "introduction",
    "consent",
    "context",
    "dashboard",
    "assessment",
    "freeResults",
    "paywall",
    "premium",
    "accuracy",
    "feedback",
    "completion",
  ];

  const defaultState = () => ({
    version: 5,
    appVersion: APP_VERSION,
    language: "en",
    flowStage: "home",
    consent: false,
    contextCompleted: false,
    context: {},
    responses: defaultResponses(),
    moduleProgress: {},
    layerModules: {},
    assessmentCompleted: false,
    freeResultsViewed: false,
    paywallSkipped: false,
    premiumViewed: false,
    accuracyCompleted: false,
    studyCompleted: false,
    results: null,
    feedback: { accuracy: null, text: "", submitted: false },
    premiumUnlocked: false,
    premiumUnlockSource: null,
    updatedAt: null,
  });

  const layerItems = (layerId) => SSD_ITEMS.filter((q) => q.layer === layerId);

  const isLayerCompleted = (state, layerId) =>
    !!state.layerModules?.[layerId]?.completed;

  const moduleStatus = (state, layerId) => {
    if (isLayerCompleted(state, layerId)) return "completed";
    if (state.moduleProgress?.[layerId]?.started) return "in_progress";
    return "not_started";
  };

  const getModuleIndex = (state, layerId) =>
    state.moduleProgress?.[layerId]?.questionIndex ?? 0;

  const moduleProgressPercent = (state, layerId) => {
    if (isLayerCompleted(state, layerId)) return 100;
    const qs = layerItems(layerId);
    if (!qs.length) return 0;
    const prog = state.moduleProgress?.[layerId];
    if (!prog?.started) return 0;
    return Math.round((prog.questionIndex / qs.length) * 100);
  };

  const completedLayerCount = (state) =>
    LAYER_IDS.filter((id) => isLayerCompleted(state, id)).length;

  const allLayersComplete = (state) => completedLayerCount(state) === LAYER_IDS.length;

  const answeredCount = (state) =>
    SSD_ITEMS.filter((q) => {
      const v = state.responses[q.id];
      return v != null && v >= 1 && v <= 7;
    }).length;

  const hasPaymentAccessTokenInUrl = () => {
    if (typeof window === "undefined") return false;
    return (
      new URLSearchParams(window.location.search).get(SSD_ACCESS_PARAM) === SSD_ACCESS_TOKEN
    );
  };

  const persistAllPremiumUnlockKeys = (source = "stripe") => {
    try {
      SSD_PREMIUM_UNLOCK_LS_KEYS.forEach((key) => localStorage.setItem(key, "true"));
      if (source === "stripe") {
        localStorage.setItem(PREMIUM_UNLOCK_SOURCE_LS_KEY, "stripe");
        localStorage.removeItem(PREMIUM_PROMO_CODE_LS_KEY);
      } else if (source === "promo") {
        localStorage.setItem(PREMIUM_UNLOCK_SOURCE_LS_KEY, "promo");
        localStorage.setItem(PREMIUM_PROMO_CODE_LS_KEY, "demo");
      }
      return true;
    } catch {
      return false;
    }
  };

  const readPremiumUnlocked = () => {
    try {
      return SSD_PREMIUM_UNLOCK_LS_KEYS.some((key) => localStorage.getItem(key) === "true");
    } catch {
      return false;
    }
  };

  const mergePremiumUnlock = (state) => {
    if (!readPremiumUnlocked()) return state;
    state.premiumUnlocked = true;
    try {
      state.premiumUnlockSource =
        localStorage.getItem(PREMIUM_UNLOCK_SOURCE_LS_KEY) || state.premiumUnlockSource;
    } catch {
      /* ignore */
    }
    return state;
  };

  const migrateLegacyProgress = (state) => {
    if (state.moduleProgress && Object.keys(state.moduleProgress).length) return state;
    if (state.questionIndex > 0 || state.assessmentStarted) {
      const q = SSD_ITEMS[state.questionIndex ?? 0];
      if (q) {
        state.moduleProgress[q.layer] = {
          started: true,
          questionIndex: getModuleIndex(state, q.layer) || state.questionIndex,
        };
      }
    }
    delete state.questionIndex;
    delete state.assessmentStarted;
    return state;
  };

  const normalizeState = (parsed) => {
    const base = defaultState();
    const state = {
      ...base,
      ...parsed,
      language: parsed.language === "zh" ? "zh" : "en",
      responses: { ...base.responses, ...(parsed.responses || {}) },
      context: { ...(parsed.context || {}) },
      feedback: { ...base.feedback, ...(parsed.feedback || {}) },
      moduleProgress: { ...(parsed.moduleProgress || {}) },
      layerModules: { ...(parsed.layerModules || {}) },
    };
    if (state.context.stressSources && !Array.isArray(state.context.stressSources)) {
      state.context.stressSources = [state.context.stressSources];
    }
    if (state.context.supportSources && !Array.isArray(state.context.supportSources)) {
      state.context.supportSources = [state.context.supportSources];
    }
    if (state.context.neurodiversity && !Array.isArray(state.context.neurodiversity)) {
      state.context.neurodiversity =
        typeof state.context.neurodiversity === "string"
          ? state.context.neurodiversity.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
    }
    migrateLegacyProgress(state);
    migrateLayer4Redesign(state);
    migrateFlowStage(state);
    return mergePremiumUnlock(state);
  };

  const migrateLayer4Redesign = (state) => {
    if (state.version >= 5) return state;
    const oldL4Pattern = /^L4_(RCV|SST|ACT|SRS|LTM)_/;
    Object.keys(state.responses || {}).forEach((k) => {
      if (oldL4Pattern.test(k)) delete state.responses[k];
    });
    SSD_ITEMS.filter((q) => q.layer === 4).forEach((q) => {
      if (state.responses[q.id] == null) state.responses[q.id] = 4;
    });
    delete state.layerModules?.[4];
    if (state.moduleProgress?.[4]) {
      state.moduleProgress[4] = { started: false, questionIndex: 0 };
    }
    if (state.assessmentCompleted && state.results) {
      state.assessmentCompleted = false;
      state.results = null;
      state.freeResultsViewed = false;
    }
    state.version = 5;
    return state;
  };

  const migrateFlowStage = (state) => {
    if (state.version >= 5 && state.flowStage) return state;
    if (state.studyCompleted || state.feedback?.submitted) {
      state.flowStage = "completion";
      state.studyCompleted = true;
    } else if (state.feedback?.accuracy != null) {
      state.flowStage = "feedback";
      state.accuracyCompleted = true;
    } else if (state.assessmentCompleted && state.results) {
      state.freeResultsViewed = state.freeResultsViewed || readPremiumUnlocked();
      state.flowStage = "freeResults";
    } else if (state.contextCompleted) {
      state.flowStage = "dashboard";
    } else if (state.consent) {
      state.flowStage = "context";
    } else {
      state.flowStage = state.flowStage || "home";
    }
    state.version = 4;
    return state;
  };

  const resolveResumeScreen = (state) => {
    if (readPremiumUnlocked() && state.assessmentCompleted && state.results) {
      return "freeResults";
    }
    if (state.studyCompleted) return "completion";
    if (state.feedback?.submitted) return "completion";
    if (state.accuracyCompleted) return "feedback";
    if (state.premiumViewed || state.paywallSkipped) return "accuracy";
    if (state.assessmentCompleted && state.results) return "freeResults";
    if (state.contextCompleted) return "dashboard";
    if (state.consent) return "context";
    if (state.flowStage === "introduction") return "introduction";
    if (state.flowStage === "paywall" || state.flowStage === "premium") return "freeResults";
    return "home";
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return defaultState();
      return normalizeState(JSON.parse(raw));
    } catch {
      return defaultState();
    }
  };

  const save = (state) => {
    state.updatedAt = new Date().toISOString();
    mergePremiumUnlock(state);
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  };

  const applyPromoUnlock = async (code) => {
    const validate =
      window.MSLAccessControl?.validatePremiumAccessCode ||
      (async () => ({ valid: false, reason: "invalid" }));
    const result = await validate(code, "support-system-dynamic");
    if (!result?.valid) return false;
    return persistAllPremiumUnlockKeys("promo");
  };

  const applyPaymentUnlock = () => persistAllPremiumUnlockKeys("stripe");

  const clear = () => {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      SSD_PREMIUM_UNLOCK_LS_KEYS.forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem(PREMIUM_UNLOCK_SOURCE_LS_KEY);
      localStorage.removeItem(PREMIUM_PROMO_CODE_LS_KEY);
    } catch {
      /* ignore */
    }
  };

  const progressPercent = (state) =>
    Math.round((answeredCount(state) / SSD_ITEMS.length) * 100);

  if (typeof window !== "undefined" && hasPaymentAccessTokenInUrl()) {
    localStorage.setItem("ssd_paid_unlocked", "true");
    localStorage.setItem("ssd_premium_unlocked", "true");
    localStorage.setItem("support_system_dynamic_premium_unlocked", "true");
    localStorage.setItem("supportSystemDynamicPremiumUnlocked", "true");
    localStorage.setItem("premiumUnlocked", "true");
    persistAllPremiumUnlockKeys("stripe");
  }

  return {
    load,
    save,
    clear,
    defaultState,
    applyPromoUnlock,
    applyPaymentUnlock,
    persistAllPremiumUnlockKeys,
    readPremiumUnlocked,
    answeredCount,
    progressPercent,
    layerItems,
    isLayerCompleted,
    moduleStatus,
    getModuleIndex,
    moduleProgressPercent,
    completedLayerCount,
    allLayersComplete,
    FLOW_STAGES,
    resolveResumeScreen,
  };
})();
