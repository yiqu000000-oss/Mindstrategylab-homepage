// Support System Dynamics — continuity dynamics typology & personalized report engine

const SSSTypology = (() => {
  "use strict";

  const tier = (pct) => (pct >= 60 ? "high" : pct >= 45 ? "medium" : "low");
  const lp = (results, id) => results.layerScores[id]?.percent ?? 0;
  const sp = (results, layer, key) => results.subScores[`L${layer}_${key}`]?.percent ?? 0;

  const subsForLayer = (results, layerId) =>
    Object.values(results.subScores)
      .filter((s) => s.layer === layerId)
      .sort((a, b) => b.percent - a.percent);

  const topSubs = (results, layerId, n = 2) => subsForLayer(results, layerId).slice(0, n);
  const weakSubs = (results, layerId, n = 2) =>
    [...subsForLayer(results, layerId)].sort((a, b) => a.percent - b.percent).slice(0, n);

  const tag = (lang, name) => (lang === "zh" ? `【${name}】` : name);
  const joinTags = (lang, subs) =>
    subs.map((s) => tag(lang, SSDI18n.subvarLabel(lang, s.key))).join(lang === "zh" ? "与" : " and ");

  const reportLayerTitle = (lang, layerId) => {
    const titles = {
      1: { en: "Resource Existence", zh: "资源存在" },
      2: { en: "Perceived Support", zh: "感知支持" },
      3: { en: "Support Accessibility", zh: "支持可及性" },
      4: { en: "Recovery & Continuity", zh: "恢复与连续性" },
    };
    return titles[layerId]?.[lang === "zh" ? "zh" : "en"] || SSDI18n.layerLabel(lang, layerId);
  };

  const subvariableBars = (results, layerId, lang) =>
    subsForLayer(results, layerId).map((s) => ({
      key: s.key,
      label: SSDI18n.subvarLabel(lang, s.key),
      percent: Math.round(s.percent),
      tier: tier(s.percent),
    }));

  const pack = (category, key, lang) => {
    const block = SSD_TYPOLOGY[category]?.[key];
    if (!block) return null;
    return block[lang === "zh" ? "zh" : "en"] || block.en;
  };

  const resolve = (category, key, lang) => {
    const data = pack(category, key, lang);
    if (!data) return { key, label: key, human: "" };
    return { key, ...data };
  };

  const detectArchetypes = (results) => {
    const l1 = lp(results, 1);
    const l2 = lp(results, 2);
    const l3 = lp(results, 3);
    const l4 = lp(results, 4);
    const exist = sp(results, 1, "existential_stability");
    const belief = sp(results, 1, "belief_stability");
    const action = sp(results, 4, "action_reengagement");
    const emotional = sp(results, 2, "perceived_emotional_support");
    const avg = (l1 + l2 + l3 + l4) / 4;

    const rules = [];
    const add = (key, priority) => rules.push({ key, priority });

    if (l1 >= 58 && l2 < 45) add("hidden_isolation", 92);
    if (l4 >= 58 && l1 < 48) add("reconstruction_driven", 90);
    if (l3 >= 55 && l4 < 45) add("operational_dependency", 91);
    if (l1 < 45 && l4 >= 55) add("self_reorganization", 88);
    if (belief >= 58 && exist < 45) add("cognitive_continuity", 89);
    if (action >= 60 && emotional < 45) add("high_functioning_low_safety", 87);
    if (l2 >= 55 && l3 < 45) add("accessibility_bottleneck", 86);
    if (avg < 42) add("structural_fragility", 85);
    if (Math.abs(l1 - l4) < 12 && avg >= 52 && l2 >= 48 && l3 >= 48) add("integrated_continuity", 84);

    rules.sort((a, b) => b.priority - a.priority);
    const seen = new Set();
    return rules.filter((r) => {
      if (seen.has(r.key)) return false;
      seen.add(r.key);
      return true;
    });
  };

  const detectRecoveryStyle = (results) => {
    const reorgan = sp(results, 4, "structural_reorganization");
    const restab = sp(results, 4, "sustainable_restabilization");
    const action = sp(results, 4, "action_reengagement");
    const direction = sp(results, 4, "long_term_direction_recovery");
    const continuity = sp(results, 4, "continuity_restoration");
    const belief = sp(results, 1, "belief_stability");
    const health = sp(results, 1, "health_stability");
    const help = sp(results, 3, "help_seeking_capacity");
    const emotional = sp(results, 2, "perceived_emotional_support");

    const scores = [
      { key: "reconstruction", v: reorgan * 1.2 + sp(results, 4, "recovery_capacity") * 0.3 },
      { key: "inertial_return", v: restab * 1.1 + (100 - reorgan) * 0.2 },
      { key: "external_restoration", v: help * 0.8 + emotional * 0.7 + sp(results, 3, "recovery_conversion") * 0.5 },
      { key: "meaning_reconstruction", v: direction * 1.0 + belief * 0.9 },
      { key: "rhythm_restoration", v: restab * 0.9 + health * 0.7 },
      { key: "functional_compensation", v: action * 1.2 + (100 - continuity) * 0.4 },
    ];
    scores.sort((a, b) => b.v - a.v);
    return scores[0].key;
  };

  const detectConversionStyle = (results) => {
    const l3 = lp(results, 3);
    const l4 = lp(results, 4);
    const help = sp(results, 3, "help_seeking_capacity");
    const deficit = sp(results, 3, "deficit_recognition");
    const accept = sp(results, 3, "support_acceptance");
    const convert = sp(results, 3, "recovery_conversion");
    const express = sp(results, 3, "need_expression");
    const belong = sp(results, 2, "perceived_belonging");
    const material = sp(results, 1, "material_stability");

    const scores = [
      { key: "hyper_independent", v: (100 - help) * 1.1 + l4 * 0.5 },
      { key: "delayed_help_seeking", v: deficit * 0.9 + (100 - help) * 0.7 },
      { key: "over_integration", v: accept * 1.0 + (100 - convert) * 0.8 },
      { key: "relational_confirmation", v: express * 0.8 + belong * 0.7 },
      { key: "high_access_low_trust", v: l3 * 0.8 + (100 - accept) * 0.9 },
      { key: "resource_hoarding", v: material * 1.0 + (100 - help) * 0.5 },
      { key: "self_sustained_recovery", v: l4 * 1.0 + (100 - l3) * 0.7 },
    ];
    scores.sort((a, b) => b.v - a.v);
    return scores[0].key;
  };

  const detectCompensations = (results) => {
    const keys = [];
    const l2 = lp(results, 2);
    const l3 = lp(results, 3);
    const l4 = lp(results, 4);
    const action = sp(results, 4, "action_reengagement");
    const help = sp(results, 3, "help_seeking_capacity");
    const belief = sp(results, 1, "belief_stability");
    const exist = sp(results, 1, "existential_stability");
    const belong = sp(results, 2, "perceived_belonging");
    const emotional = sp(results, 2, "perceived_emotional_support");
    const accept = sp(results, 3, "support_acceptance");
    const convert = sp(results, 3, "recovery_conversion");

    if (action >= 58 && l2 < 48) keys.push("overwork");
    if (help < 45 && l4 >= 55) keys.push("excessive_independence");
    if (belief >= 58 && exist < 45) keys.push("meaning_construction");
    if (belong < 45 && emotional >= 55) keys.push("emotional_overinvestment");
    if (l4 >= 55 && l3 < 45) keys.push("self_reconstruction");
    if (accept < 45 && convert >= 55) keys.push("selective_conversion");
    if (l1HighLowL2(results)) keys.push("emotional_containment");

    return keys.slice(0, 4);
  };

  const l1HighLowL2 = (results) => lp(results, 1) >= 58 && lp(results, 2) < 45;

  const buildLayerNarrative = (results, layerId, lang) => {
    const t = tier(lp(results, layerId));
    const top = topSubs(results, layerId, 2);
    const weak = weakSubs(results, layerId, 2);
    const topT = joinTags(lang, top);
    const weakT = joinTags(lang, weak);
    const zh = lang === "zh";

    if (layerId === 1) {
      if (t === "high") {
        return zh
          ? [
              "你的整体资源基础相对稳定。",
              topT ? `尤其在${topT}方面，你拥有较稳定的现实支撑，这些部分可能是你长期连续性的主要锚点。` : "",
              "即使在压力时期，你通常仍保有一定的生活维持能力。",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "Your overall resource foundation appears relatively stable.",
              topT
                ? `Especially in ${topT}, you seem to have dependable real-world support — these may be your main continuity anchors over time.`
                : "",
              "Even under pressure, you often retain enough capacity to keep daily life going.",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      if (t === "low") {
        return zh
          ? [
              "你的资源基础可能相对薄弱。",
              weakT ? `尤其在${weakT}方面，你可能长期缺乏稳定承接，这会让压力更容易直接冲击你的日常状态。` : "",
              "当外部环境变化时，你可能更容易产生失控感或生存压力。",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "Your resource foundation may currently feel thin.",
              weakT
                ? `Especially around ${weakT}, you may lack stable holding — pressure can hit your daily life more directly.`
                : "",
              "When your environment shifts, you may be more prone to feeling out of control or under survival pressure.",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      return zh
        ? [
            "你的资源基础整体较均衡，没有特别突出的断裂。",
            topT ? `${topT}相对是你较稳定的支撑。` : "",
            weakT ? `但${weakT}仍可能在长期压力下成为你较脆弱的部分。` : "",
          ]
            .filter(Boolean)
            .join("\n\n")
        : [
            "Your resource foundation looks fairly balanced — no single area dominates the picture.",
            topT ? `${topT} appear to be your stronger anchors.` : "",
            weakT ? `But ${weakT} may still become vulnerable under prolonged stress.` : "",
          ]
            .filter(Boolean)
            .join("\n\n");
    }

    if (layerId === 2) {
      if (t === "high") {
        return zh
          ? [
              "你不仅拥有支持，也能够真实感知到这些支持的存在。",
              topT
                ? `尤其在${topT}方面，你对关系中的稳定感和可依赖性感知较强，这会降低你在压力中的孤立感。`
                : "",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "You don't just have support — you can actually feel that it's there.",
              topT
                ? `Especially in ${topT}, you seem to sense stability and dependability in your relationships, which can reduce isolation under stress.`
                : "",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      if (t === "low") {
        const bullets = zh
          ? ["过度独立", "孤注一掷", "情绪性投入", "成瘾性补偿", "过量整合资源", "对关系产生过高期待"]
          : [
              "over-independence",
              "all-in commitment",
              "intense emotional investment",
              "addictive regulation",
              "over-integrating resources",
              "expecting too much from relationships",
            ];
        return zh
          ? [
              "你可能并不容易真正感受到自己被承接。",
              "即使客观资源存在，你仍可能长期处于一种「需要自己撑住」的状态。",
              weakT ? `尤其在${weakT}方面，这种缺乏可能让你倾向于：` : "这种缺乏可能让你倾向于：",
              bullets.map((b) => `· ${b}`).join("\n"),
            ].join("\n\n")
          : [
              "You may not easily feel genuinely held.",
              "Even when resources exist on paper, you may live in a long-term state of needing to hold yourself up.",
              weakT ? `Especially around ${weakT}, this gap may push you toward:` : "This gap may push you toward:",
              bullets.map((b) => `· ${b}`).join("\n"),
            ].join("\n\n");
      }
      return zh
        ? [
            "你对支持的感知并不一致——有些方面你感到被承托，有些方面仍不确定。",
            topT ? `在${topT}方面，你较能感到支持在场。` : "",
            weakT ? `但在${weakT}方面，你可能仍需要独自承担更多。` : "",
          ]
            .filter(Boolean)
            .join("\n\n")
        : [
            "Your sense of support is mixed — some areas feel held, others less so.",
            topT ? `In ${topT}, support more often feels present.` : "",
            weakT ? `Around ${weakT}, you may still carry more on your own.` : "",
          ]
            .filter(Boolean)
            .join("\n\n");
    }

    if (layerId === 3) {
      if (t === "high") {
        return zh
          ? [
              "你较善于调用已有资源。",
              topT ? `尤其在${topT}方面，你能够较顺利地进入支持结构，并把支持转化为现实帮助。` : "",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "You seem fairly skilled at using what is available to you.",
              topT
                ? `Especially in ${topT}, you can enter support structures and turn help into something practical.`
                : "",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      if (t === "low") {
        const bullets = zh
          ? ["不愿求助", "难以依赖他人", "过度承担", "长期硬撑", "获得支持后仍无法恢复"]
          : [
              "reluctance to ask for help",
              "difficulty relying on others",
              "over-responsibility",
              "pushing through alone for too long",
              "getting support but still not recovering",
            ];
        return zh
          ? [
              "你可能经常知道自己需要什么，却难以真正获得支持。",
              weakT ? `尤其在${weakT}方面，你可能会出现：` : "你可能会出现：",
              bullets.map((b) => `· ${b}`).join("\n"),
            ].join("\n\n")
          : [
              "You may often know what you need, yet struggle to actually receive support.",
              weakT ? `Especially around ${weakT}, you may experience:` : "You may experience:",
              bullets.map((b) => `· ${b}`).join("\n"),
            ].join("\n\n");
      }
      return zh
        ? [
            "你对支持的调用能力并不均匀。",
            topT ? `${topT}相对是你较能进入的通道。` : "",
            weakT ? `但${weakT}可能仍是你难以真正依赖的部分。` : "",
          ]
            .filter(Boolean)
            .join("\n\n")
        : [
            "Your ability to use support is uneven.",
            topT ? `${topT} may be channels you can access more readily.` : "",
            weakT ? `But ${weakT} may remain hard to rely on when you need them most.` : "",
          ]
            .filter(Boolean)
            .join("\n\n");
    }

    if (layerId === 4) {
      if (t === "high") {
        return zh
          ? [
              "你似乎具有较强的连续性重建能力。",
              "即使生活出现中断、压力、关系变化或方向混乱，你仍能够逐渐重新组织自己的生活结构。",
              topT ? `尤其是${topT}方面，可能是你恢复方向与功能的重要方式。` : "",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "You seem capable of rebuilding continuity after disruption.",
              "Even when life is interrupted — by stress, relationship change, or loss of direction — you can gradually reorganize your structure again.",
              topT ? `Especially through ${topT}, you may restore direction and functioning.` : "",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      if (t === "low") {
        return zh
          ? [
              "环境或状态的变化，可能会明显破坏你的稳定感。",
              weakT ? `尤其在${weakT}方面，你可能很难重新进入稳定状态。` : "",
              "压力后的恢复，对你而言可能不是「休息一下就好」，而更像一次重新拼接生活结构的过程。",
            ]
              .filter(Boolean)
              .join("\n\n")
          : [
              "Changes in environment or inner state may noticeably disrupt your stability.",
              weakT ? `Especially around ${weakT}, re-entering stability may feel difficult.` : "",
              "Recovery for you may not be \"just rest\" — it may feel like piecing your life structure back together.",
            ]
              .filter(Boolean)
              .join("\n\n");
      }
      return zh
        ? [
            "你的恢复能力有好有弱，不同情境下表现可能不同。",
            topT ? `${topT}相对是你较能依靠的恢复方式。` : "",
            weakT ? `但${weakT}可能在压力后仍是你较难恢复的部分。` : "",
          ]
            .filter(Boolean)
            .join("\n\n")
        : [
            "Your recovery capacity is mixed — it may show up differently depending on the situation.",
            topT ? `${topT} may be recovery paths that work more reliably for you.` : "",
            weakT ? `But ${weakT} may remain harder to restore after pressure.` : "",
          ]
            .filter(Boolean)
            .join("\n\n");
    }

    return "";
  };

  const detectContinuityRisks = (results, context, lang) => {
    const risks = [];
    const add = (key, extraTriggers = []) => {
      if (risks.some((r) => r.key === key)) return;
      const data = resolve("continuityRisks", key, lang);
      const triggers = [...(data.triggers || []), ...extraTriggers].slice(0, 5);
      risks.push({ ...data, triggers });
    };

    const exist = sp(results, 1, "existential_stability");
    const belief = sp(results, 1, "belief_stability");
    const emotional = sp(results, 2, "perceived_emotional_support");
    const safety = sp(results, 2, "perceived_structural_safety");
    const belong = sp(results, 2, "perceived_belonging");
    const help = sp(results, 3, "help_seeking_capacity");
    const accept = sp(results, 3, "support_acceptance");
    const convert = sp(results, 3, "recovery_conversion");
    const relational = sp(results, 3, "relational_accessibility");
    const action = sp(results, 4, "action_reengagement");
    const resilience = sp(results, 4, "functional_resilience");
    const reorgan = sp(results, 4, "structural_reorganization");
    const restab = sp(results, 4, "sustainable_restabilization");
    const l1 = lp(results, 1);
    const l2 = lp(results, 2);
    const l3 = lp(results, 3);
    const l4 = lp(results, 4);
    const stress = context?.stressSources || [];

    if (action >= 58 && (restab < 48 || resilience < 48 || emotional < 45)) add("burnout_collapse");
    if (reorgan >= 58 && exist < 45) add("reconstruction_fatigue");
    if (l1 >= 58 && l2 < 45) add("relational_depletion");
    if (belief >= 58 && exist < 45) add("embodied_exhaustion");
    if (exist < 45 && (relational >= 55 || belong >= 55 || sp(results, 3, "need_expression") >= 55)) {
      add("identity_diffusion");
    }
    if (l3 < 42 && l4 < 42) add("prolonged_disruption");
    if (l3 >= 55 && l4 < 45) add("conversion_drain");
    if (l2 < 45 && l4 >= 55 && help < 45) add("self_reconstruction_fatigue");
    if (accept < 45 && convert >= 55) add("conversion_drain");
    if (exist < 45 && safety < 45) add("grounding_loss");
    if (stress.includes("burnout") && action >= 50) add("burnout_collapse", stress.includes("burnout") ? [] : []);

    if (!risks.length) {
      const weakest = Object.values(results.subScores).sort((a, b) => a.percent - b.percent)[0];
      if (weakest) {
        const name = SSDI18n.subvarLabel(lang, weakest.key);
        risks.push({
          key: "localized_pressure",
          label: lang === "zh" ? "长期压力下的局部脆弱" : "Localized vulnerability under prolonged stress",
          human:
            lang === "zh"
              ? `你的整体支持结构较均衡，目前没有特别突出的断裂层。但在长期压力下，${tag(lang, name)}仍可能是你较容易感到吃力的部分。`
              : `Your support profile looks fairly balanced — no major fracture stands out right now. Under prolonged stress, though, ${name} may still be where you feel strain first.`,
          triggers:
            lang === "zh"
              ? ["压力持续累积", "生活节奏被打乱", "支持来源暂时减少"]
              : ["sustained stress accumulation", "disrupted daily rhythm", "temporary reduction in support"],
        });
      }
    }

    return risks.slice(0, 5);
  };

  const buildCrossInsight = (results, lang) => {
    const l1 = lp(results, 1);
    const l2 = lp(results, 2);
    const l3 = lp(results, 3);
    const l4 = lp(results, 4);
    const zh = lang === "zh";
    const gap12 = l1 - l2;
    const gap23 = l2 - l3;
    const gap34 = l3 - l4;

    if (gap12 > 15) {
      return zh
        ? "你有资源，但不太容易真正感到被承接。支持可能在客观上存在，却在心里难以变成「可以依靠的东西」。"
        : "You have resources, but they may not always feel emotionally available. Support might exist in your life without fully registering as something you can lean on.";
    }
    if (gap23 > 12) {
      return zh
        ? "你有时能感到支持存在，却不太容易真正用上它。问题往往不在「有没有」，而在「能不能进入、接受、转化」。"
        : "You may sense that support exists, yet struggle to actually use it. The gap is often not absence — it's access, acceptance, and conversion.";
    }
    if (gap34 > 12) {
      return zh
        ? "你有时能拿到支持，但恢复仍比预期更慢。帮助进入生活后，未必能立刻变成稳定与方向。"
        : "You may receive support, but recovery still takes longer than expected. Help doesn't always turn into stability and direction right away.";
    }
    if (Math.abs(l1 - l4) < 12 && (l1 + l2 + l3 + l4) / 4 >= 52) {
      const weak = weakSubs(results, 1, 1)[0] || weakSubs(results, 2, 1)[0] || weakSubs(results, 3, 1)[0] || weakSubs(results, 4, 1)[0];
      const wName = weak ? tag(lang, SSDI18n.subvarLabel(lang, weak.key)) : "";
      return zh
        ? `你的支持结构整体较连贯，资源、感知、可及与恢复大致能连起来。${wName ? `但${wName}仍可能在长期压力下成为你较需要注意的部分。` : ""}`
        : `Your support profile looks relatively coherent — resources, felt support, access, and recovery mostly connect. ${wName ? `But ${wName} may still need attention under long-term pressure.` : ""}`;
    }
    const weakGlobal = Object.values(results.subScores).sort((a, b) => a.percent - b.percent)[0];
    const wn = weakGlobal ? tag(lang, SSDI18n.subvarLabel(lang, weakGlobal.key)) : "";
    return zh
      ? `你的支持结构没有单一极端断裂，但不同部分强弱不一。${wn ? `其中${wn}可能是你最值得留意的部分。` : ""}`
      : `Your profile doesn't show one extreme fracture, but strengths and gaps vary across areas. ${wn ? `${wn} may be especially worth watching.` : ""}`;
  };

  const build = (results, lang = "en", context = null) => {
    const archetypeKeys = detectArchetypes(results);
    const primaryKey = archetypeKeys[0]?.key || "integrated_continuity";
    const secondaryKeys = archetypeKeys.slice(1, 2).map((r) => r.key);

    const primaryArchetype = resolve("archetypes", primaryKey, lang);
    const secondaryArchetypes = secondaryKeys.map((k) => resolve("archetypes", k, lang));

    const recoveryKey = detectRecoveryStyle(results);
    const conversionKey = detectConversionStyle(results);
    const recoveryStyle = resolve("recoveryStyles", recoveryKey, lang);
    const conversionStyle = resolve("conversionStyles", conversionKey, lang);

    const compensationMechanisms = detectCompensations(results).map((k) => resolve("compensations", k, lang));

    const continuityRisks = detectContinuityRisks(results, context, lang);

    const layers = [1, 2, 3, 4].map((id) => ({
      layerId: id,
      title: reportLayerTitle(lang, id),
      tier: tier(lp(results, id)),
      percent: lp(results, id),
      subvariables: subvariableBars(results, id, lang),
      narrative: buildLayerNarrative(results, id, lang),
    }));

    return {
      primaryArchetype,
      secondaryArchetypes,
      recoveryStyle,
      conversionStyle,
      compensationMechanisms,
      continuityRisks,
      layers,
      crossInsight: buildCrossInsight(results, lang),
      tiers: {
        l1: tier(lp(results, 1)),
        l2: tier(lp(results, 2)),
        l3: tier(lp(results, 3)),
        l4: tier(lp(results, 4)),
      },
    };
  };

  const buildReport = (results, lang = "en", context = null) => build(results, lang, context);

  return { build, buildReport, tier, detectArchetypes, subvariableBars, reportLayerTitle };
})();
