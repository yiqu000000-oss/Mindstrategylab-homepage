// Talent Ecology Matrix — hierarchical psychometric scoring
// Item → Micro-ability → Subdomain → Major Domain → Overall Ecology

const SCORING = (() => {
  "use strict";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const round3 = (n) => Math.round(n * 1000) / 1000;

  const normalizeLikert = (score) => (clamp(Number(score), 1, 7) - 1) / 6;

  const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const PERSPECTIVE_PREFIX = {
    desired: "des",
    perceived: "per",
    ease: "ease",
    constraint: "con",
  };

  /** Collect normalized 0–1 values from raw item responses for a domain. */
  const collectDomainNormalized = (responses, domainKey, perspective = null) => {
    const vals = [];
    ITEM_REGISTRY.filter((m) => m.domain === domainKey).forEach((m) => {
      const prefixes = perspective
        ? [PERSPECTIVE_PREFIX[perspective]]
        : Object.values(PERSPECTIVE_PREFIX);
      prefixes.forEach((prefix) => {
        const id = `${prefix}_${m.key}`;
        const raw = responses[id];
        if (raw !== undefined && raw !== null && raw !== "") {
          vals.push(normalizeLikert(raw));
        }
      });
    });
    return vals;
  };

  const collectMicroNormalized = (responses, microKey, perspective = null) => {
    const vals = [];
    const prefixes = perspective
      ? [PERSPECTIVE_PREFIX[perspective]]
      : Object.values(PERSPECTIVE_PREFIX);
    prefixes.forEach((prefix) => {
      const id = `${prefix}_${microKey}`;
      const raw = responses[id];
      if (raw !== undefined && raw !== null && raw !== "") {
        vals.push(normalizeLikert(raw));
      }
    });
    return vals;
  };

  const meanToPercentage = (vals) => {
    if (!vals.length) return { mean: 0, percentage: 0 };
    const m = mean(vals);
    return { mean: round3(m), percentage: Math.round(m * 100) };
  };

  const computeDomainPercentages = (responses, domainKey) => {
    const percentages = {};
    const means = {};
    ["desired", "perceived", "ease", "constraint"].forEach((p) => {
      const vals = collectDomainNormalized(responses, domainKey, p);
      const { mean: m, percentage } = meanToPercentage(vals);
      percentages[p] = percentage;
      means[p] = m;
    });
    const allVals = collectDomainNormalized(responses, domainKey, null);
    const { mean: m, percentage } = meanToPercentage(allVals);
    percentages.overall = percentage;
    means.overall = m;
    return { percentages, means };
  };

  const computeMicroPercentages = (responses, microKey) => {
    const percentages = {};
    const means = {};
    ["desired", "perceived", "ease", "constraint"].forEach((p) => {
      const vals = collectMicroNormalized(responses, microKey, p);
      const { mean: m, percentage } = meanToPercentage(vals);
      percentages[p] = percentage;
      means[p] = m;
    });
    const allVals = collectMicroNormalized(responses, microKey, null);
    const { mean: m, percentage } = meanToPercentage(allVals);
    percentages.overall = percentage;
    means.overall = m;
    return { percentages, means };
  };

  const stdev = (arr) => {
    if (arr.length < 2) return 0;
    const m = mean(arr);
    return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / arr.length);
  };

  const MAX_STDEV_3 = Math.sqrt(2 / 9);

  const scoreMicro = (responses, microKey) => {
    const I = normalizeLikert(responses[`des_${microKey}`] ?? 4);
    const P = normalizeLikert(responses[`per_${microKey}`] ?? 4);
    const E = normalizeLikert(responses[`ease_${microKey}`] ?? 4);
    const C = normalizeLikert(responses[`con_${microKey}`] ?? 4);
    const EP = mean([I, P, E]) * (1 - C);
    const alignDev = clamp(stdev([I, P, E]) / MAX_STDEV_3, 0, 1);
    const A = 1 - alignDev;
    const TSS = EP * A;
    return {
      desired: round3(I),
      perceived: round3(P),
      ease: round3(E),
      constraint: round3(C),
      effectivePotential: round3(EP),
      alignment: round3(A),
      talentSignatureScore: round3(TSS),
      dreamRealityGap: round3(I - mean([P, E])),
      hiddenPotentialScore: round3(E * (1 - P)),
      constraintBlockedScore: round3(mean([I, E]) * C),
    };
  };

  const aggregate = (nodes, pick) => {
    const keys = Object.keys(nodes);
    if (!keys.length) return null;
    const fields = [
      "desired",
      "perceived",
      "ease",
      "constraint",
      "effectivePotential",
      "alignment",
      "talentSignatureScore",
      "dreamRealityGap",
      "hiddenPotentialScore",
      "constraintBlockedScore",
    ];
    const out = { microCount: keys.length };
    fields.forEach((f) => {
      const nums = keys
        .map((k) => nodes[k][f])
        .filter((v) => typeof v === "number" && !Number.isNaN(v));
      out[f] = nums.length ? round3(mean(nums)) : 0;
    });
    if (pick) out._children = nodes;
    return out;
  };

  /**
   * @param {Record<string, number>} responses questionId → 1–7
   */
  function computeResults(responses) {
    const microScores = {};
    ITEM_REGISTRY.forEach((m) => {
      const { percentages, means } = computeMicroPercentages(responses, m.key);
      microScores[m.key] = {
        ...scoreMicro(responses, m.key),
        domain: m.domain,
        subdomain: m.subdomain,
        label: m.label,
        percentages,
        means,
      };
    });

    const domainScores = {};
    TAXONOMY.forEach((d) => {
      const microsInDomain = {};
      ITEM_REGISTRY.filter((m) => m.domain === d.key).forEach((m) => {
        microsInDomain[m.key] = microScores[m.key];
      });
      const subs = {};
      ITEM_REGISTRY.filter((m) => m.domain === d.key).forEach((m) => {
        const sk = `${m.domain}::${m.subdomain}`;
        if (!subs[sk]) subs[sk] = {};
        subs[sk][m.key] = microScores[m.key];
      });
      const subdomainAgg = {};
      Object.entries(subs).forEach(([sk, nodes]) => {
        const [domainKey, subdomain] = sk.split("::");
        const subVals = [];
        ITEM_REGISTRY.filter(
          (m) => m.domain === domainKey && m.subdomain === subdomain,
        ).forEach((m) => {
          Object.values(PERSPECTIVE_PREFIX).forEach((prefix) => {
            const id = `${prefix}_${m.key}`;
            const raw = responses[id];
            if (raw !== undefined && raw !== null && raw !== "") {
              subVals.push(normalizeLikert(raw));
            }
          });
        });
        const subPct = meanToPercentage(subVals);
        subdomainAgg[sk] = {
          subdomain,
          ...aggregate(nodes),
          percentages: { overall: subPct.percentage },
          means: { overall: subPct.mean },
          micros: nodes,
        };
      });
      const { percentages, means } = computeDomainPercentages(responses, d.key);
      const agg = aggregate(microsInDomain) || {};
      domainScores[d.key] = {
        ...agg,
        percentages,
        means,
        subdomains: subdomainAgg,
        micros: microsInDomain,
        flagship: !!d.flagship,
        label: d.label,
      };
    });

    let overall = aggregate(
      Object.fromEntries(TAXONOMY.map((d) => [d.key, domainScores[d.key]])),
    );
    const ecologyVals = [];
    ITEM_REGISTRY.forEach((m) => {
      Object.values(PERSPECTIVE_PREFIX).forEach((prefix) => {
        const id = `${prefix}_${m.key}`;
        const raw = responses[id];
        if (raw !== undefined && raw !== null && raw !== "") {
          ecologyVals.push(normalizeLikert(raw));
        }
      });
    });
    const ecologyPct = meanToPercentage(ecologyVals);
    overall = {
      ...(overall || {}),
      percentages: { overall: ecologyPct.percentage },
      means: { overall: ecologyPct.mean },
    };

    const microList = Object.entries(microScores).map(([key, s]) => ({ key, ...s }));
    const topMicro = (field, n = 5) =>
      [...microList].sort((a, b) => b[field] - a[field]).slice(0, n);

    const domainList = TAXONOMY.map((d) => ({
      key: d.key,
      ...domainScores[d.key],
    }));

    const topDomains = (perspective, n = 3) =>
      [...domainList]
        .sort(
          (a, b) =>
            (domainScores[b.key]?.percentages?.[perspective] ?? 0) -
            (domainScores[a.key]?.percentages?.[perspective] ?? 0),
        )
        .slice(0, n)
        .map((d) => d.key);

    const topDomainsByOverall = (n = 6) =>
      [...domainList]
        .sort(
          (a, b) =>
            (domainScores[b.key]?.percentages?.overall ?? 0) -
            (domainScores[a.key]?.percentages?.overall ?? 0),
        )
        .slice(0, n)
        .map((d) => d.key);

    const crossDomain = domainScores.cross_domain || {};
    const crossMicros = Object.entries(microScores)
      .filter(([, s]) => s.domain === "cross_domain")
      .map(([key, s]) => ({ key, ...s }));

    const talentAlignmentIndex = round3(mean(microList.map((m) => m.alignment)));
    const constraintLoad = round3(mean(microList.map((m) => m.constraint)));

    return {
      version: 2,
      overall,
      domains: domainScores,
      micros: microScores,
      indices: {
        talentAlignmentIndex,
        constraintLoad,
        signatureTalentPath: topDomains("talentSignatureScore", 3),
        hiddenPotential: topMicro("hiddenPotentialScore", 5).map((m) => m.key),
        dreamRealityGap: topMicro("dreamRealityGap", 5).map((m) => m.key),
        sociallyRecognized: topMicro("perceived", 5).map((m) => m.key),
        constraintBlocked: topMicro("constraintBlockedScore", 5).map((m) => m.key),
        signatureMicroAbilities: topMicro("talentSignatureScore", 5).map((m) => m.key),
      },
      rankings: {
        topDesired: topDomains("desired", 3),
        topPerceived: topDomains("perceived", 3),
        topEase: topDomains("ease", 3),
        mainConstraints: topDomains("constraint", 3),
        topDomainsOverall: topDomainsByOverall(6),
        topSubdomains: (() => {
          const all = [];
          TAXONOMY.forEach((d) => {
            Object.entries(domainScores[d.key]?.subdomains || {}).forEach(([sk, s]) => {
              all.push({ sk, ...s });
            });
          });
          return all
            .sort((a, b) => b.talentSignatureScore - a.talentSignatureScore)
            .slice(0, 5)
            .map((s) => s.sk);
        })(),
      },
      report: {
        signatureMicroAbilities: topMicro("talentSignatureScore", 5),
        hiddenInterdisciplinary: crossMicros
          .filter((m) => m.hiddenPotentialScore > 0.35)
          .sort((a, b) => b.hiddenPotentialScore - a.hiddenPotentialScore)
          .slice(0, 3),
        theoryToPractice: microScores.theory_to_practice || null,
        numericalVisual: microScores.numerical_visual_mapping || null,
        crossDomainInnovation: crossDomain.talentSignatureScore ?? 0,
        crossDomainProfile: crossMicros.sort((a, b) => b.talentSignatureScore - a.talentSignatureScore),
      },
    };
  }

  /**
   * Single domain module result (after completing one card).
   * @param {Record<string, number>} responses
   * @param {string} domainKey
   */
  function computeDomainModule(responses, domainKey) {
    const { percentages, means } = computeDomainPercentages(responses, domainKey);
    const micros = ITEM_REGISTRY.filter((m) => m.domain === domainKey)
      .map((m) => {
        const scored = scoreMicro(responses, m.key);
        const { percentages: mp, means: mm } = computeMicroPercentages(responses, m.key);
        return {
          key: m.key,
          label: m.label,
          percentages: mp,
          means: mm,
          ...scored,
        };
      })
      .sort((a, b) => b.talentSignatureScore - a.talentSignatureScore);

    return {
      domainKey,
      percentages,
      means,
      topMicros: micros.slice(0, 5),
      questionCount: ITEM_REGISTRY.filter((m) => m.domain === domainKey).length * 4,
      computedAt: new Date().toISOString(),
    };
  }

  /**
   * Meta-level matrix from completed modules only.
   * @param {Record<string, number>} responses
   * @param {string[]} completedDomainKeys
   */
  /**
   * @param {Record<string, number>} responses
   * @param {string[]} completedDomainKeys
   * @param {{ moduleSnapshots?: Record<string, object> }} [options] — per-module stored results fallback
   */
  function computeMetaResults(responses, completedDomainKeys, options = {}) {
    const moduleSnapshots = options.moduleSnapshots || {};
    const completed = completedDomainKeys.filter((k) =>
      TAXONOMY.some((d) => d.key === k),
    );
    if (!completed.length) {
      return {
        unlocked: false,
        reportReady: false,
        required: MIN_MODULES_FOR_META,
        completedCount: 0,
        domainRankings: [],
      };
    }

    const full = computeResults(responses);

    const domainFromSnapshot = (key) => {
      const snap = moduleSnapshots[key];
      const pct = snap?.results?.percentages || snap?.scores;
      if (!pct) return null;
      const toPct = (v) => {
        if (v == null) return 0;
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
      return { key, percentages, means: {} };
    };

    const completedDomains = completed
      .map((key) => {
        const fromFull = full.domains[key];
        if (fromFull?.percentages) return { key, ...fromFull };
        return domainFromSnapshot(key);
      })
      .filter((d) => d && d.percentages);

    const byOverall = [...completedDomains].sort(
      (a, b) => (b.percentages.overall ?? 0) - (a.percentages.overall ?? 0),
    );

    const signatureTalentPath = byOverall.slice(0, 3).map((d) => d.key);

    const hiddenPotential = Object.entries(full.micros || {})
      .filter(([, m]) => completed.includes(m.domain))
      .map(([key, m]) => ({ key, ...m }))
      .sort((a, b) => b.hiddenPotentialScore - a.hiddenPotentialScore)
      .slice(0, 5)
      .map((m) => m.key);

    const optimalDevelopmentEnvironment = [...completedDomains]
      .sort(
        (a, b) =>
          (b.percentages.ease - b.percentages.constraint) -
          (a.percentages.ease - a.percentages.constraint),
      )
      .slice(0, 3)
      .map((d) => d.key);

    const crossDomainIntegration = (() => {
      if (completed.includes("cross_domain")) {
        return { ...full.domains.cross_domain, source: "module" };
      }
      const perspectives = ["desired", "perceived", "ease", "constraint"];
      const percentages = {};
      const means = {};
      perspectives.forEach((p) => {
        const vals = completed.map((key) => full.domains[key]?.means?.[p] ?? 0);
        means[p] = round3(mean(vals));
        percentages[p] = Math.round(means[p] * 100);
      });
      const allMeans = perspectives.map((p) => means[p]);
      means.overall = round3(mean(allMeans));
      percentages.overall = Math.round(means.overall * 100);
      return {
        synthesized: true,
        percentages,
        means,
        label: { en: "Cross-Domain Integration (synthesized)", zh: "跨领域整合（综合）" },
      };
    })();

    const completedMicros = Object.values(full.micros || {}).filter((m) =>
      completed.includes(m.domain),
    );
    const talentAlignmentIndex = completedMicros.length
      ? round3(mean(completedMicros.map((m) => m.alignment)))
      : 0;
    const constraintLoad = completedMicros.length
      ? round3(mean(completedMicros.map((m) => m.constraint)))
      : 0;

    return {
      unlocked: completed.length >= MIN_MODULES_FOR_META,
      reportReady: completedDomains.length > 0,
      required: MIN_MODULES_FOR_META,
      completedCount: completed.length,
      signatureTalentPath,
      hiddenPotential,
      optimalDevelopmentEnvironment,
      crossDomainIntegration,
      talentAlignmentIndex,
      constraintLoad,
      domainRankings: byOverall.map((d) => ({
        key: d.key,
        percentages: d.percentages,
      })),
      overallEcology: full.overall,
      computedAt: new Date().toISOString(),
    };
  }

  return {
    computeResults,
    computeDomainModule,
    computeMetaResults,
    normalizeLikert,
    round3,
    computeDomainPercentages,
    meanToPercentage,
  };
})();
