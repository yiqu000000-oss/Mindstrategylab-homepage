// Talent Ecology Matrix — localStorage progress (modular dashboard)

const TEMStorage = (() => {
  "use strict";

  const defaultResponses = () => {
    if (typeof ASSESSMENT_QUESTIONS === "undefined") return {};
    return Object.fromEntries(ASSESSMENT_QUESTIONS.map((q) => [q.id, 4]));
  };

  const defaultState = () => ({
    version: 4,
    appVersion: typeof APP_VERSION !== "undefined" ? APP_VERSION : "0.0.0",
    language: "en",
    consent: false,
    consent_given: false,
    background_completed: false,
    background: {},
    responses: defaultResponses(),
    modules: {},
    moduleProgress: {},
    completedModules: [],
    meta: null,
    premiumUnlocked: false,
    premium_unlocked: false,
    premium_unlocked_at: null,
    validation: null,
    updatedAt: null,
  });

  const isModuleCompleted = (mod) =>
    !!mod && (mod.completed === true || mod.completed === "true" || mod.status === "completed");

  /** Normalize stored module record (supports legacy shapes). */
  const normalizeModule = (domainKey, mod) => {
    if (!mod || typeof mod !== "object") return mod;
    const results = mod.results || {};
    const pct = results.percentages || mod.scores || mod.percentages || {};
    const toPct = (v) => {
      if (v == null || Number.isNaN(Number(v))) return 0;
      const n = Number(v);
      return n <= 1 ? Math.round(n * 100) : Math.round(n);
    };
    const percentages = {
      desired: toPct(pct.desired),
      perceived: toPct(pct.perceived),
      ease: toPct(pct.ease),
      constraint: toPct(pct.constraint),
      overall: toPct(pct.overall ?? pct.resource),
    };
    const scores = {
      desired: round3(percentages.desired / 100),
      perceived: round3(percentages.perceived / 100),
      ease: round3(percentages.ease / 100),
      constraint: round3(percentages.constraint / 100),
      resource: round3((percentages.overall ?? percentages.desired) / 100),
      alignment: round3(mod.scores?.alignment ?? results.alignment ?? 0),
      signature: round3(mod.scores?.signature ?? results.signature ?? 0),
    };
    return {
      ...mod,
      completed: isModuleCompleted(mod),
      completedAt: mod.completedAt || mod.completed_at || null,
      responses: mod.responses || {},
      results: {
        ...results,
        domainKey: results.domainKey || domainKey,
        percentages,
      },
      scores,
      subdomains: mod.subdomains || results.subdomains || {},
      microAbilities: mod.microAbilities || mod.micros || results.topMicros || {},
    };
  };

  const round3 = (n) => Math.round(Number(n) * 1000) / 1000;

  const normalizeState = (parsed) => {
    const base = defaultState();
    const modules = {};
    Object.entries(parsed.modules || {}).forEach(([key, mod]) => {
      modules[key] = normalizeModule(key, mod);
    });

    const consent = !!(parsed.consent ?? parsed.consent_given);

    const state = {
      ...base,
      ...parsed,
      consent,
      consent_given: consent,
      premiumUnlocked: false,
      premium_unlocked: false,
      responses: { ...base.responses, ...(parsed.responses || {}) },
      modules,
      moduleProgress: { ...base.moduleProgress, ...(parsed.moduleProgress || {}) },
      background: { ...base.background, ...(parsed.background || {}) },
    };

    if (state.background.neurodiversity != null && !Array.isArray(state.background.neurodiversity)) {
      const raw = state.background.neurodiversity;
      state.background.neurodiversity =
        typeof raw === "string" && raw
          ? raw.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
    }

    state.completedModules = syncCompletedModules(state);
    return state;
  };

  const readLegacyRaw = () => {
    if (typeof LEGACY_PROGRESS_KEYS === "undefined") return null;
    for (const key of LEGACY_PROGRESS_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) return { key, raw };
      } catch {
        /* ignore */
      }
    }
    return null;
  };

  const countCompletedInParsed = (parsed) => {
    if (!parsed) return 0;
    const mods = parsed.modules || {};
    return TAXONOMY.filter((d) => isModuleCompleted(mods[d.key])).length;
  };

  const load = () => {
    try {
      const legacy = readLegacyRaw();
      let raw = null;
      let migratedFrom = null;
      let parsed = null;

      try {
        raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (raw) parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }

      if (legacy) {
        try {
          const legParsed = JSON.parse(legacy.raw);
          if (!parsed || countCompletedInParsed(legParsed) > countCompletedInParsed(parsed)) {
            parsed = legParsed;
            migratedFrom = legacy.key;
          }
        } catch {
          /* ignore */
        }
      }

      if (!parsed) {
        const empty = defaultState();
        mergeStandalonePremiumUnlock(empty);
        return empty;
      }

      const state = normalizeState(parsed);
      mergeStandalonePremiumUnlock(state);

      if (migratedFrom || (parsed.version ?? 0) < 4) {
        save(state);
        if (migratedFrom) {
          try {
            localStorage.removeItem(migratedFrom);
          } catch {
            /* ignore */
          }
        }
      }

      return state;
    } catch {
      return defaultState();
    }
  };

  const save = (state) => {
    state.updatedAt = new Date().toISOString();
    state.completedModules = syncCompletedModules(state);
    state.consent_given = !!state.consent_given || !!state.consent;
    state.consent = state.consent_given;
    const lsPremium = readStandalonePremiumUnlocked();
    state.premium_unlocked = lsPremium;
    state.premiumUnlocked = lsPremium;
    if (!lsPremium) {
      state.premium_unlock_source = null;
      state.premium_promo_code = null;
    }

    Object.keys(state.modules || {}).forEach((key) => {
      state.modules[key] = normalizeModule(key, state.modules[key]);
    });

    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  };

  const syncCompletedModules = (state) => {
    const keys = new Set();
    TAXONOMY.forEach((d) => {
      if (isModuleCompleted(state.modules?.[d.key])) keys.add(d.key);
    });
    (state.completedModules || []).forEach((k) => {
      if (TAXONOMY.some((d) => d.key === k)) keys.add(k);
    });
    Object.entries(state.modules || {}).forEach(([k, mod]) => {
      if (isModuleCompleted(mod) && TAXONOMY.some((d) => d.key === k)) keys.add(k);
    });
    return [...keys];
  };

  const getCompletedModules = (state) => syncCompletedModules(state);

  const completedDomains = (state) => getCompletedModules(state);

  const completedCount = (state) => completedDomains(state).length;

  const isMetaUnlocked = (state) => completedCount(state) >= MIN_MODULES_FOR_META;

  const moduleStatus = (state, domainKey) => {
    if (isModuleCompleted(state.modules[domainKey])) return "completed";
    if (state.moduleProgress[domainKey]?.started) return "in_progress";
    return "not_started";
  };

  const moduleProgressPercent = (state, domainKey) => {
    const qs = ASSESSMENT_QUESTIONS.filter((q) => q.domain === domainKey);
    if (!qs.length) return 0;
    if (isModuleCompleted(state.modules[domainKey])) return 100;
    const idx = state.moduleProgress[domainKey]?.questionIndex ?? 0;
    if (!state.moduleProgress[domainKey]?.started) return 0;
    return Math.round((idx / qs.length) * 100);
  };

  const readStandalonePremiumUnlocked = () => {
    try {
      return localStorage.getItem(PREMIUM_UNLOCKED_LS_KEY) === "true";
    } catch {
      return false;
    }
  };

  const mergeStandalonePremiumUnlock = (state) => {
    if (!readStandalonePremiumUnlocked()) return state;
    state.premium_unlocked = true;
    state.premiumUnlocked = true;
    try {
      state.premium_unlock_source =
        localStorage.getItem(PREMIUM_UNLOCK_SOURCE_LS_KEY) || state.premium_unlock_source || "promo";
      state.premium_promo_code =
        localStorage.getItem(PREMIUM_PROMO_CODE_LS_KEY) || state.premium_promo_code || null;
    } catch {
      state.premium_unlock_source = state.premium_unlock_source || "promo";
    }
    return state;
  };

  /**
   * Apply demo access-code unlock to standalone localStorage keys.
   * @param {string} code
   * @returns {Promise<boolean>}
   */
  const applyPromoUnlock = async (code) => {
    const validate =
      window.MSLAccessControl?.validatePremiumAccessCode ||
      (async () => ({ valid: false, reason: "invalid" }));
    const result = await validate(code, "talent-ecology-matrix");
    if (!result?.valid) return false;
    try {
      localStorage.setItem(PREMIUM_UNLOCKED_LS_KEY, "true");
      localStorage.setItem(PREMIUM_UNLOCK_SOURCE_LS_KEY, "promo");
      localStorage.setItem(PREMIUM_PROMO_CODE_LS_KEY, "demo");
      return true;
    } catch {
      return false;
    }
  };

  /** Apply Stripe / payment return unlock to standalone localStorage keys. */
  const applyPaymentUnlock = () => {
    try {
      localStorage.setItem(PREMIUM_UNLOCKED_LS_KEY, "true");
      localStorage.setItem(PREMIUM_UNLOCK_SOURCE_LS_KEY, "stripe");
      localStorage.removeItem(PREMIUM_PROMO_CODE_LS_KEY);
      return true;
    } catch {
      return false;
    }
  };

  const clearPromoUnlockKeys = () => {
    try {
      localStorage.removeItem(PREMIUM_UNLOCKED_LS_KEY);
      localStorage.removeItem(PREMIUM_UNLOCK_SOURCE_LS_KEY);
      localStorage.removeItem(PREMIUM_PROMO_CODE_LS_KEY);
    } catch {
      /* ignore */
    }
  };

  const isPremiumUnlocked = () => readStandalonePremiumUnlocked();

  const onboardingComplete = (state) =>
    !!(state.consent_given || state.consent) && !!state.background_completed;

  const clear = () => {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      clearPromoUnlockKeys();
      if (typeof LEGACY_PROGRESS_KEYS !== "undefined") {
        LEGACY_PROGRESS_KEYS.forEach((k) => localStorage.removeItem(k));
      }
    } catch {
      /* ignore */
    }
  };

  const listLocalStorageKeys = () => {
    try {
      return Object.keys(localStorage).filter(
        (k) =>
          k === PROGRESS_STORAGE_KEY ||
          (typeof LEGACY_PROGRESS_KEYS !== "undefined" && LEGACY_PROGRESS_KEYS.includes(k)) ||
          k.startsWith("talent_ecology") ||
          k.startsWith("talentEcology") ||
          k === "tem_debug",
      );
    } catch {
      return [];
    }
  };

  const debugSnapshot = (state) => {
    const completed = getCompletedModules(state);
    const moduleDebug = completed.map((key) => {
      const mod = state.modules[key];
      const pct = mod?.results?.percentages || mod?.scores;
      return {
        key,
        hasResults: !!mod?.results,
        hasScores: !!mod?.scores,
        percentages: pct || null,
      };
    });
    return {
      storageKey: PROGRESS_STORAGE_KEY,
      legacyKeys: typeof LEGACY_PROGRESS_KEYS !== "undefined" ? LEGACY_PROGRESS_KEYS : [],
      localStorageKeys: listLocalStorageKeys(),
      completedCount: completed.length,
      completedModules: completed,
      premiumUnlocked: isPremiumUnlocked(),
      metaUnlocked: isMetaUnlocked(state),
      hasMeta: !!state.meta,
      metaRankingCount: state.meta?.domainRankings?.length ?? 0,
      responseCount: Object.keys(state.responses || {}).length,
      modules: moduleDebug,
    };
  };

  return {
    load,
    save,
    defaultState,
    normalizeModule,
    getCompletedModules,
    completedDomains,
    completedCount,
    isMetaUnlocked,
    isPremiumUnlocked,
    applyPromoUnlock,
    applyPaymentUnlock,
    mergeStandalonePremiumUnlock,
    clearPromoUnlockKeys,
    onboardingComplete,
    moduleStatus,
    moduleProgressPercent,
    clear,
    listLocalStorageKeys,
    debugSnapshot,
    isModuleCompleted,
  };
})();
