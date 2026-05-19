  const OVERALL_SECTION_TITLES = {
    themes: { en: "Core Development Themes", zh: "核心发展主题" },
    manifestations: { en: "Everyday Manifestations", zh: "日常表现" },
    alignment: { en: "Developmental Alignment", zh: "发展对齐情况" },
    constraint: { en: "Constraints & Developmental Costs", zh: "限制与代价" },
    hidden: { en: "Hidden Potential", zh: "隐藏潜力" },
    environment: { en: "Optimal Development Environment", zh: "最佳发展环境" },
    strategy: { en: "Strategic Recommendations", zh: "战略建议" },
  };

  const DOMAIN_ESSENCE = {
    linguistic: {
      en: "translating complex thought into language that others can receive, remember, and act upon",
      zh: "将复杂思想转化为他人能够理解、记住并据此行动的语言",
    },
    auditory: {
      en: "sensing subtle patterns in sound, rhythm, and tone that others may overlook",
      zh: "捕捉他人容易忽略的声音、节奏与音调上的细微差异",
    },
    analytical: {
      en: "structuring ambiguity into clear models, arguments, and decisions",
      zh: "将模糊情境结构化为清晰的模型、论证与判断",
    },
    spatial: {
      en: "thinking through layout, form, and structural relationships in space",
      zh: "通过布局、形态与空间结构关系来理解问题",
    },
    memory: {
      en: "holding patterns, sequences, and detail with unusual stability over time",
      zh: "在较长时间内稳定保持模式、序列与细节",
    },
    creative: {
      en: "generating reframes, symbols, and possibilities that open new paths",
      zh: "生成重构、象征与新可能性，从而打开新的路径",
    },
    systems: {
      en: "extracting mechanisms from experience and building transferable frameworks",
      zh: "从经验中提取机制并构建可迁移的框架",
    },
    cross_domain: {
      en: "seeking structural links across disciplines and translating between different representational worlds",
      zh: "在不同知识体系之间寻找结构性关联，并在不同表征世界之间转译",
    },
    interpersonal: {
      en: "reading emotional subtext, motives, and social dynamics with nuance",
      zh: "细腻地解读情绪潜台词、动机与社会动力",
    },
    leadership: {
      en: "mobilizing attention, trust, and collective direction toward a clearer horizon",
      zh: "动员注意力、信任与集体方向，使群体朝向更清晰的前景",
    },
    moral: {
      en: "weighing principles, fairness, and long-term consequences in judgment",
      zh: "在判断中权衡原则、公平与长期后果",
    },
    operational: {
      en: "executing precise procedures and refining skill through embodied repetition",
      zh: "通过具身重复执行精确流程并打磨技能",
    },
    physical: {
      en: "learning through movement, balance, and bodily coordination",
      zh: "通过动作、平衡与身体协调来学习",
    },
  };

  function escHtml(s) {
    return String(s ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]),
    );
  }

  function qualitativeLabel(pct, lang) {
    const t = tierFromPercent(pct);
    return pick(lang, t.en, t.zh);
  }

  function qualitativeLabelFromIndex(index0to1, lang) {
    return qualitativeLabel(Math.round((Number(index0to1) || 0) * 100), lang);
  }

  function formatBracketedDomains(keys, domainLabels, lang) {
    const names = keys.map((k) => domainLabels(k)).filter(Boolean);
    if (!names.length) return lang === "zh" ? "【多元整合能力】" : "integrative strengths across several domains";
    if (lang === "zh") {
      if (names.length === 1) return `【${names[0]}】`;
      if (names.length === 2) return `【${names[0]}】与【${names[1]}】`;
      return `【${names.slice(0, -1).join("】、【")}】与【${names[names.length - 1]}】`;
    }
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
  }

  function domainEssencePhrase(key, lang) {
    const e = DOMAIN_ESSENCE[key];
    if (e) return pick(lang, e.en, e.zh);
    const sec = DOMAIN_SECTIONS[key] || DOMAIN_SECTIONS.analytical;
    return pick(lang, sec.meaning.en, sec.meaning.zh);
  }

  function domainManifestationPhrase(key, lang) {
    const sec = DOMAIN_SECTIONS[key] || DOMAIN_SECTIONS.analytical;
    return pick(lang, sec.manifestations.en, sec.manifestations.zh);
  }

  function buildDomainInteraction(themes, lang) {
    const phrases = themes.slice(0, 3).map((k) => domainEssencePhrase(k, lang));
    if (lang === "zh") {
      if (phrases.length === 1) {
        return `这意味着，你更可能在围绕这一能力的任务与角色中，感受到意义感与能力感的自然汇聚。`;
      }
      return `这意味着，你不仅倾向于${phrases[0]}，也善于${phrases.slice(1).join("，并")}。相比单纯掌握某一项技能，你更可能在“连接”“解释”和“组织”不同元素的过程中展现出独特优势。`;
    }
    if (phrases.length === 1) {
      return `In practice, you are most alive when work repeatedly calls on ${phrases[0]}.`;
    }
    return `Together, these themes suggest a profile oriented toward ${phrases.join("; ")}—less a single narrow skill than a capacity to connect, explain, and organize complexity.`;
  }

  function buildAlignmentNarrative(alignIndex, lang) {
    const label = qualitativeLabelFromIndex(alignIndex, lang);
    if (lang === "zh") {
      if (alignIndex >= 0.72) {
        return `从整体来看，你的发展对齐程度为${label}。这通常意味着，你所真正重视的能力、他人能够识别到的优势，以及你在实践中相对容易成长的方向之间存在较强的一致性。换句话说，你当前的追求并非脱离现实的理想，而是在多个层面上具备持续深化的基础。`;
      }
      if (alignIndex >= 0.52) {
        return `从整体来看，你的发展对齐程度为${label}。理想追求、他人感知与发展顺畅度之间大体同向，但仍存在值得留意的落差：某些你高度重视的方向，可能尚未被充分看见，或在现实中需要更多刻意设计才能顺畅展开。`;
      }
      return `从整体来看，你的发展对齐程度为${label}。你所重视的能力、他人对你的识别方式，以及实际发展中的顺畅度之间可能存在明显张力。这并不否定你的潜力，反而提示你需要更有意识地进行对齐——选择更匹配的受众、节奏与支持结构。`;
    }
    if (alignIndex >= 0.72) {
      return `Taken as a whole, your developmental alignment reads as ${label.toLowerCase()}. What you value, what others tend to recognize in you, and what you can grow with relative fluency appear to pull in a similar direction—your aspirations are not merely wishful, but grounded in a coherent ecology of strengths.`;
    }
    if (alignIndex >= 0.52) {
      return `Your developmental alignment is ${label.toLowerCase()}: the major strands of desire, recognition, and ease generally converge, though meaningful gaps remain. Some capacities you care about deeply may still be under-recognized, or may require deliberate scaffolding before they feel natural in daily life.`;
    }
    return `Your alignment is ${label.toLowerCase()}, indicating real tension between ideal self, social recognition, and developmental ease. This is not a verdict against your potential—it is an invitation to redesign context: audience, pacing, and the kinds of support that make your strengths visible and sustainable.`;
  }

  function buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang) {
    const loadLabel = qualitativeLabelFromIndex(loadIndex, lang);
    const overlap = themes.filter((k) => constraintDomainKeys.includes(k));
    const overlapNames = overlap.map((k) => domainLabels(k));
    if (lang === "zh") {
      let text = `与此同时，你的限制负荷为${loadLabel}。`;
      if (loadIndex >= 0.62) {
        text +=
          "这提示你：虽然核心方向具有显著潜力，但其发展往往需要持续投入较多的心理能量、时间与环境协调成本。你可能在追求理想或回应外部期待的过程中承受较大压力，因此比一般人更需要适合自己的支持方式。";
      } else if (loadIndex >= 0.45) {
        text += "环境摩擦与内在张力会以中等强度出现；若忽视恢复与支持，优势领域也可能在高压下变得耗竭。";
      } else {
        text += "当前限制并非主导因素，但仍建议在扩张目标时保留缓冲，以免优势表达被隐性成本侵蚀。";
      }
      if (overlap.length) {
        text += `值得注意的是，部分限制恰恰与核心发展方向有所重叠（如${overlapNames.join("、")}）。这意味着“最重要的主题”往往也是“最需要精心设计的主题”。`;
      } else if (constraintDomainKeys.length) {
        text += `限制较突出的领域包括${constraintDomainKeys.map((k) => domainLabels(k)).join("、")}，宜为其配置结构化支持、时间缓冲与降低羞耻触发的环境。`;
      }
      return text;
    }
    let text = `At the same time, your constraint profile is ${loadLabel.toLowerCase()}. `;
    if (loadIndex >= 0.62) {
      text +=
        "High-potential directions may demand sustained psychological energy, time, and environmental negotiation; pressure to meet ideals or external expectations can be costly without the right scaffolding.";
    } else if (loadIndex >= 0.45) {
      text += "Friction is present at a moderate level—without recovery and support, even strong domains can become draining under chronic strain.";
    } else {
      text += "Constraints are not dominant, yet buffers remain wise as you expand ambition.";
    }
    if (overlap.length) {
      text += ` Notably, friction overlaps your core themes (${overlapNames.join(", ")}): what matters most may also cost most to develop well.`;
    } else if (constraintDomainKeys.length) {
      text += ` Elevated friction may concentrate in ${constraintDomainKeys.map((k) => domainLabels(k)).join(", ")}—consider mentorship, pacing, and environments that reduce shame around early attempts.`;
    }
    return text;
  }

  function buildHiddenPotentialNarrative(hasHidden, lang) {
    if (!hasHidden) {
      return lang === "zh"
        ? "从隐藏潜力角度看，你当前外化的优势与内在可发展资源大体一致；持续通过可见作品与实践巩固即可。"
        : "Regarding hidden potential, what you express outwardly appears largely consistent with what your profile can still grow; steady visible practice will consolidate gains.";
    }
    return lang === "zh"
      ? "值得注意的是，你的潜力并不一定会立即被完整识别。某些微能力可能尚未充分外化，或尚未在现实环境中形成稳定成果。随着这些能力通过可见项目、作品和长期实践逐步呈现，它们更有可能转化为他人可以明确感受到的影响力与专业价值。"
      : "It is important to recognize that some of your capacity may not yet be fully legible to others. Certain micro-strengths may remain partially internalized until they are anchored in visible projects, artifacts, and long-horizon practice—at which point they can convert into influence others can name and trust.";
  }

  function buildEnvironmentNarrative(optimalKeys, domainLabels, resourceLines, lang) {
    const optimalNames = optimalKeys.map((k) => domainLabels(k)).filter(Boolean);
    if (lang === "zh") {
      let text =
        "从发展生态的角度看，你最适合的环境通常具有以下特征：既提供足够的自主探索空间，又能在关键阶段给予清晰反馈；既尊重你的思考节奏，又在需要时提供具体支持。";
      if (optimalNames.length) {
        text += `在${optimalNames.join("、")}等情境中，你更可能获得顺畅反馈、较低限制负荷与可持续动机。`;
      }
      text +=
        "对你而言，真正重要的并不是单纯“更努力”，而是识别自己最需要的帮助类型——例如结构化指导、情绪支持、适度督促，或安静且不被打扰的发展空间。";
      if (resourceLines?.length) {
        text += `结合你的资源生态画像：${resourceLines.slice(0, 2).join("；")}。`;
      }
      return text;
    }
    let text =
      "Ecologically, you tend to flourish where autonomy and accountability are balanced: enough room to explore, paired with crisp feedback at meaningful milestones; respect for your thinking pace alongside practical support when stakes rise.";
    if (optimalNames.length) {
      text += ` In contexts such as ${optimalNames.join(", ")}, smoother feedback and more sustainable motivation are especially likely.`;
    }
    text +=
      " The lever is rarely “try harder alone,” but identifying which supports you actually need—structured guidance, emotional witnessing, gentle accountability, or protected deep-work space.";
    if (resourceLines?.length) text += ` Your resource ecology highlights: ${resourceLines.slice(0, 2).join("; ")}.`;
    return text;
  }

  function buildStrategyNarrative(themes, optimalKeys, loadIndex, alignIndex, domainLabels, lang) {
    const themeNames = themes.map((k) => domainLabels(k));
    const optimalNames = optimalKeys.map((k) => domainLabels(k));
    if (lang === "zh") {
      return [
        `总体而言，你的优势并不局限于某一单独技能，而更体现在将${themeNames.length ? themeNames.join("、") : "多元能力"}整合为一个连贯系统的潜力。`,
        alignIndex >= 0.6
          ? `鉴于对齐程度${qualitativeLabelFromIndex(alignIndex, lang)}，建议继续深化与核心追求高度一致、且发展顺畅的领域，使优势从“擅长”走向“可被他人稳定识别的专业特征”。`
          : `鉴于对齐仍待加强，建议优先选择能同时承载理想、认可与实践顺畅的“交汇任务”，以小步外化方式减少理想与现实的撕裂感。`,
        loadIndex >= 0.55
          ? `在限制负荷${qualitativeLabelFromIndex(loadIndex, lang)}的背景下，为高度重要但高限制的方向设计分阶段目标、外部反馈节点与情绪恢复机制；避免以羞耻驱动的方式强行推进。`
          : `在限制相对可控的前提下，可为次要方向设置探索性目标，而把主要精力投向最具结构优势的主题。`,
        optimalNames.length
          ? `环境上，优先靠近${optimalNames.join("、")}等能同时提供挑战、反馈与意义感的场域。`
          : "环境上，优先选择能同时提供挑战、反馈与意义感的场域，而非单纯高压或纯自由的极端。",
        "随着能力不断积累与外化，它们有望逐渐形成具有长期价值的个人优势体系——不仅让你“做得好”，也让他人理解你“为何重要”。",
      ].join("");
    }
    return [
      `Overall, your edge lies less in a single isolated skill than in integrating ${themeNames.length ? themeNames.join(", ") : "multiple capacities"} into a coherent system.`,
      alignIndex >= 0.6
        ? `With ${qualitativeLabelFromIndex(alignIndex, lang).toLowerCase()} alignment, deepen domains where aspiration, recognition, and ease already converge—moving from competence to a signature others can reliably name.`
        : `With alignment still developing, choose bridging projects that let ideal self, audience, and practice meet in the same room—reducing costly splits between who you wish to be and what daily life rewards.`,
      loadIndex >= 0.55
        ? `Given ${qualitativeLabelFromIndex(loadIndex, lang).toLowerCase()} constraint load, stage goals and support structures for high-meaning, high-friction directions; protect early attempts from shame-based acceleration.`
        : `With constraints comparatively manageable, keep exploratory goals secondary while investing primary energy where structure already favors you.`,
      optimalNames.length
        ? `Environmentally, gravitate toward ${optimalNames.join(", ")}—settings that combine challenge, feedback, and felt purpose.`
        : "Environmentally, seek settings that combine challenge, feedback, and purpose rather than extremes of chaos or control.",
      "As capacities accumulate and become visible, they can crystallize into a durable personal advantage—work that is not only well done, but clearly meaningful to others.",
    ].join(" ");
  }

  function buildResourceEcologyQualitative(meta, lang) {
    const rankings = meta?.domainRankings || [];
    if (!rankings.length) return [];
    const avg = (field) =>
      rankings.reduce((s, d) => s + (d.percentages?.[field] ?? 0), 0) / rankings.length;
    const desired = avg("desired");
    const perceived = avg("perceived");
    const ease = avg("ease");
    const constraint = avg("constraint");
    const gap = desired - Math.max(perceived, ease);
    if (lang === "zh") {
      return [
        `指导需求为${qualitativeLabel(desired, lang)}`,
        `自主需求为${ease >= 58 && constraint < 55 ? qualitativeLabel(Math.max(ease, 62), lang) : qualitativeLabel(50, lang)}`,
        `情感支持需求${gap >= 12 ? "值得关注" : "适中"}`,
        `问责支持需求为${qualitativeLabel(constraint, lang)}`,
      ];
    }
    return [
      `guidance needs read as ${qualitativeLabel(desired, lang).toLowerCase()}`,
      `autonomy needs are ${ease >= 58 && constraint < 55 ? "elevated" : "moderate"}`,
      `emotional support is ${gap >= 12 ? "especially important" : "moderately important"}`,
      `accountability needs are ${qualitativeLabel(constraint, lang).toLowerCase()}`,
    ];
  }

  function overallSectionHtml(title, paragraphs) {
    const body = paragraphs
      .filter(Boolean)
      .map((p) => `<p class="interp-narrative overall-narrative__p">${escHtml(p)}</p>`)
      .join("");
    return `<div class="overall-narrative__section"><h4 class="overall-narrative__heading">${escHtml(title)}</h4>${body}</div>`;
  }

  /**
   * Premium Overall Development Summary — qualitative narrative only (no raw numbers).
   * Returns safe HTML for secOverallBody.
   */
  function buildOverallNarrative(ctx) {
    const { lang, meta, completedDomainKeys, domainLabels } = ctx;
    const themes = (meta?.signatureTalentPath || completedDomainKeys || []).slice(0, 3);
    const optimal = (meta?.optimalDevelopmentEnvironment || []).slice(0, 3);
    const hidden = meta?.hiddenPotential || [];
    const alignIndex = meta?.talentAlignmentIndex ?? 0;
    const loadIndex = meta?.constraintLoad ?? 0;
    const rankings = meta?.domainRankings || [];
    const constraintDomainKeys = [...rankings]
      .sort((a, b) => (b.percentages?.constraint ?? 0) - (a.percentages?.constraint ?? 0))
      .slice(0, 2)
      .map((d) => d.key);
    const resourceLines = buildResourceEcologyQualitative(meta, lang);
    const titles = OVERALL_SECTION_TITLES;
    const themeBracketed = formatBracketedDomains(themes, domainLabels, lang);

    if (lang === "zh") {
      const sections = [
        overallSectionHtml(titles.themes.zh, [
          `你的天赋生态画像显示，你当前最突出的发展主题集中在${themeBracketed}等领域。${buildDomainInteraction(themes, lang)}`,
          themes.length >= 2
            ? "这些主题彼此呼应：你在不同能力之间建立关联的能力，可能正是你最具辨识度的“元优势”。"
            : "",
        ]),
        overallSectionHtml(titles.manifestations.zh, [
          themes.length
            ? themes
                .map((k) => domainManifestationPhrase(k, lang))
                .slice(0, 2)
                .join(" ")
            : "你的日常表现可能因具体情境而异；完成更多模块将细化这一画像。",
          themes.some((k) => k === "leadership" || k === "linguistic")
            ? "结合较高的表达或影响倾向，你可能不仅擅长提出新的框架，也能够帮助他人理解这些框架的意义，并推动群体朝着更清晰的方向发展。"
            : "在熟悉且反馈清晰的情境中，你更可能进入专注与成长并行的状态；当环境嘈杂或评价标准模糊时，优势表达可能受阻。",
        ]),
        overallSectionHtml(titles.alignment.zh, [buildAlignmentNarrative(alignIndex, lang)]),
        overallSectionHtml(titles.constraint.zh, [
          buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang),
        ]),
        overallSectionHtml(titles.hidden.zh, [buildHiddenPotentialNarrative(hidden.length > 0, lang)]),
        overallSectionHtml(titles.environment.zh, [
          buildEnvironmentNarrative(optimal, domainLabels, resourceLines, lang),
        ]),
        overallSectionHtml(titles.strategy.zh, [
          buildStrategyNarrative(themes, optimal, loadIndex, alignIndex, domainLabels, lang),
        ]),
      ];
      return `<div class="overall-narrative interp-prose">${sections.join("")}</div>`;
    }

    const sections = [
      overallSectionHtml(titles.themes.en, [
        `Your Talent Ecology profile highlights ${themeBracketed} as organizing developmental themes. ${buildDomainInteraction(themes, lang)}`,
        themes.length >= 2
          ? "These themes appear mutually reinforcing—your signature may be less a single skill than the ability to integrate capacities into a coherent whole."
          : "",
      ]),
      overallSectionHtml(titles.manifestations.en, [
        themes.length
          ? themes
              .map((k) => domainManifestationPhrase(k, lang))
              .slice(0, 2)
              .join(" ")
          : "Everyday expressions will sharpen as you complete additional modules.",
        themes.some((k) => k === "leadership" || k === "linguistic")
          ? "With notable expression or influence tendencies, you may not only frame ideas powerfully but help others grasp their meaning and move collectively toward clarity."
          : "In familiar contexts with clear feedback, you are more likely to enter sustainable focus; noisy or ambiguous evaluation climates may dampen expression.",
      ]),
      overallSectionHtml(titles.alignment.en, [buildAlignmentNarrative(alignIndex, lang)]),
      overallSectionHtml(titles.constraint.en, [
        buildConstraintNarrative(loadIndex, themes, constraintDomainKeys, domainLabels, lang),
      ]),
      overallSectionHtml(titles.hidden.en, [buildHiddenPotentialNarrative(hidden.length > 0, lang)]),
      overallSectionHtml(titles.environment.en, [
        buildEnvironmentNarrative(optimal, domainLabels, resourceLines, lang),
      ]),
      overallSectionHtml(titles.strategy.en, [
        buildStrategyNarrative(themes, optimal, loadIndex, alignIndex, domainLabels, lang),
      ]),
    ];
    return `<div class="overall-narrative interp-prose">${sections.join("")}</div>`;
  }
