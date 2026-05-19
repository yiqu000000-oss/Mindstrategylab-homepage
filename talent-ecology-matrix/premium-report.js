// Premium report rendering with narrative interpretations

const TEMPremiumReport = (() => {
  "use strict";

  function sl(lang, key) {
    const L = TEMInterpretations.SECTION_LABELS[key];
    return lang === "zh" ? L.zh : L.en;
  }

  function sortRankingKeys(rankings, field, limit = 5) {
    return [...(rankings || [])]
      .sort((a, b) => (b.percentages?.[field] ?? 0) - (a.percentages?.[field] ?? 0))
      .slice(0, limit)
      .map((d) => d.key);
  }

  function pctForRanking(rankings, key, field) {
    return rankings?.find((x) => x.key === key)?.percentages?.[field] ?? 0;
  }

  function sectionFallbackHtml(message, escapeHtml) {
    return `<p class="muted">${escapeHtml(message)}</p>`;
  }

  function setSectionHtml(el, html) {
    if (!el) return;
    el.innerHTML = html && String(html).trim() ? html : "";
  }

  function buildRankingItems(keys, getPct, labelFn, lang) {
    const IX = TEMInterpretations;
    return (keys || []).map((key) => {
      const score = typeof getPct(key) === "number" ? Math.round(getPct(key)) : 0;
      const scored = IX.labelScore(score, lang);
      return {
        key,
        name: labelFn(key),
        score: scored.pct,
        label: scored.label,
        narrative: scored.narrative,
        display: scored.display,
      };
    });
  }

  function renderRankListHtml(items, fallbackHtml, escapeHtml) {
    if (!items?.length) return fallbackHtml;
    return items
      .map(
        (item, idx) =>
          `<div class="rank-item rank-item--interp">
        <span class="rank-item__n">${idx + 1}</span>
        <span class="rank-item__name">${escapeHtml(item.name)}</span>
        <span class="rank-item__score">${escapeHtml(item.display)}</span>
        <p class="interp-narrative rank-item__narrative">${escapeHtml(item.narrative)}</p>
        <div class="rank-item__bar"><div class="rank-item__fill" style="width:${item.score}%"></div></div>
      </div>`,
      )
      .join("");
  }

  function renderInterpretedRankList(el, keys, getPct, labelFn, lang, escapeHtml, fallback) {
    const fallbackHtml = sectionFallbackHtml(fallback, escapeHtml);
    const items = buildRankingItems(keys, getPct, labelFn, lang);
    setSectionHtml(el, renderRankListHtml(items, fallbackHtml, escapeHtml));
  }

  function renderInterpretedMicroList(el, keys, getPct, microLabel, lang, escapeHtml, fallback) {
    const fallbackHtml = sectionFallbackHtml(fallback, escapeHtml);
    if (!el) return;
    if (!keys?.length) {
      setSectionHtml(el, fallbackHtml);
      return;
    }
    const html = keys
      .map((key) => {
        const pct = getPct(key);
        const name = microLabel(key);
        return TEMInterpretations.htmlMicroItem(escapeHtml(name), pct, lang, key);
      })
      .join("");
    setSectionHtml(el, html || fallbackHtml);
  }

  function buildResourceEcologyProfile(meta, lang) {
    const rankings = meta?.domainRankings || [];
    if (!rankings.length) return "";
    const avg = (field) =>
      rankings.reduce((s, d) => s + (d.percentages?.[field] ?? 0), 0) / rankings.length;
    const desired = avg("desired");
    const perceived = avg("perceived");
    const ease = avg("ease");
    const constraint = avg("constraint");
    const gap = desired - Math.max(perceived, ease);

    if (lang === "zh") {
      const lines = [
        `指导需求：${desired >= 62 ? "较高" : desired >= 45 ? "中等" : "相对较低"}——你可能受益于清晰的目标、反馈与阶段性里程碑。`,
        `自主需求：${ease >= 58 && constraint < 55 ? "较高" : "中等"}——在拥有选择权与节奏掌控时，学习动机往往更强。`,
        `情感支持需求：${gap >= 12 || perceived < desired - 10 ? "值得关注" : "适中"}——当理想领先于认可时，温和的见证与鼓励尤为重要。`,
        `问责支持需求：${constraint >= 58 ? "较高" : "中等"}——结构化承诺、同伴监督或外部节点有助于突破环境摩擦。`,
        `支持接纳难度：${constraint >= 65 ? "可能偏高" : "总体可控"}——若限制负荷持续偏高，建议缩小任务颗粒度并降低羞耻触发。`,
        `鼓励羞耻敏感：${gap >= 15 ? "需留意" : "一般"}——在公开比较或评价情境中，可为脆弱尝试设置安全边界。`,
      ];
      return lines.join("\n\n");
    }

    return [
      `Guidance need: ${desired >= 62 ? "elevated" : desired >= 45 ? "moderate" : "lower"}—clear goals, feedback, and staged milestones may help.`,
      `Autonomy need: ${ease >= 58 && constraint < 55 ? "elevated" : "moderate"}—motivation often rises when you control pace and choices.`,
      `Emotional support need: ${gap >= 12 ? "notable" : "moderate"}—when ideals outpace recognition, witness and encouragement matter.`,
      `Accountability need: ${constraint >= 58 ? "elevated" : "moderate"}—structured commitments and external checkpoints reduce friction.`,
      `Difficulty accepting support: ${constraint >= 65 ? "may be elevated" : "generally manageable"}—shrink task size when constraint load stays high.`,
      `Encouragement shame sensitivity: ${gap >= 15 ? "worth monitoring" : "typical"}—protect early attempts from harsh comparison contexts.`,
    ].join("\n\n");
  }

  function buildPersonalizedStrategy(meta, completed, lang, domainLabel, escapeHtml) {
    const optimal = (meta?.optimalDevelopmentEnvironment || []).slice(0, 3);
    const path = (meta?.signatureTalentPath || []).slice(0, 3);
    const hidden = (meta?.hiddenPotential || []).slice(0, 3);
    const optimalNames = optimal.map((k) => domainLabel(k)).join(lang === "zh" ? "、" : ", ");
    const pathNames = path.map((k) => domainLabel(k)).join(lang === "zh" ? " → " : " → ");

    if (lang === "zh") {
      return [
        pathNames
          ? `<p><strong>建议发展路径：</strong>${escapeHtml(pathNames)}</p>`
          : "",
        optimalNames
          ? `<p><strong>较优学习环境：</strong>在涉及 ${escapeHtml(optimalNames)} 的情境中，你更可能获得顺畅反馈、较低限制负荷与可持续动机。</p>`
          : "",
        `<p><strong>有前景的职业/项目情境：</strong>选择能调用你的核心主题、并允许阶段性可见成果的角色；避免长期高羞耻、低反馈的公开比较环境。</p>`,
        `<p><strong>协作建议：</strong>与能补足你「理想—感知」落差的伙伴配对；请对方提供具体见证而非空泛表扬；在高限制领域引入外部问责节点。</p>`,
        hidden.length
          ? `<p><strong>发展优先级：</strong>先在外化顺畅的微能力上建立可信度，再逐步推进高理想、高限制领域的分阶段目标。</p>`
          : `<p><strong>发展优先级：</strong>在顺畅度最高的领域深化刻意练习，同时为高限制领域配置结构化支持与时间缓冲。</p>`,
      ]
        .filter(Boolean)
        .join("");
    }

    return [
      pathNames ? `<p><strong>Suggested path:</strong> ${escapeHtml(pathNames)}</p>` : "",
      optimalNames
        ? `<p><strong>Favorable learning environments:</strong> Contexts involving ${escapeHtml(optimalNames)} tend to support smoother feedback, lower constraint load, and sustainable motivation.</p>`
        : "",
      `<p><strong>Promising career contexts:</strong> Roles that activate your core themes and allow staged, visible wins; avoid prolonged high-shame, low-feedback comparison cultures.</p>`,
      `<p><strong>Collaboration:</strong> Pair with partners who close your ideal–perception gap; ask for specific witnessing rather than vague praise; use external accountability in high-constraint domains.</p>`,
      hidden.length
        ? `<p><strong>Development priorities:</strong> Externalize high-ease micro-strengths first, then stage goals in high-ideal, high-constraint areas.</p>`
        : `<p><strong>Development priorities:</strong> Deepen deliberate practice where ease is highest; add structured support and time buffers where constraints dominate.</p>`,
    ]
      .filter(Boolean)
      .join("");
  }

  function renderDomainHtml(interp, lang, escapeHtml) {
    const IX = TEMInterpretations;
    let html = `<div class="interp-domain-head">
      <p class="interp-overall">${IX.htmlScoreLine(interp.overall.pct, lang)}</p>
      <p class="interp-narrative">${escapeHtml(interp.overall.narrative)}</p>
    </div>`;
    if (interp.pattern) {
      html += `<div class="interp-block interp-block--pattern">
        <h5>${escapeHtml(sl(lang, "pattern"))}: ${escapeHtml(interp.pattern.title)}</h5>
        <p class="interp-narrative">${escapeHtml(interp.pattern.narrative)}</p>
      </div>`;
    }
    html += `<div class="interp-block"><h5>${escapeHtml(sl(lang, "perspectives"))}</h5>`;
    interp.perspectives.forEach((p) => {
      html += IX.htmlPerspectiveBlock(p, lang);
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
      html += `<div class="interp-block"><h5>${escapeHtml(sl(lang, titleKey))}</h5><p class="interp-narrative">${escapeHtml(text || "")}</p></div>`;
    });
    if (interp.resourceLines?.length) {
      html += `<div class="interp-block"><h5>${escapeHtml(sl(lang, "resourceEcology"))}</h5><ul class="interp-list">`;
      interp.resourceLines.forEach((line) => {
        html += `<li>${escapeHtml(line)}</li>`;
      });
      html += `</ul></div>`;
    }
    return html;
  }

  function domainDataForKey(filtered, state, key) {
    if (filtered.domains[key]?.percentages) return filtered.domains[key];
    const mod = state.modules[key];
    const pct = mod?.results?.percentages;
    if (!pct) return null;
    return {
      percentages: { ...pct },
      means: mod.results?.means || {},
      subdomains: mod.results?.subdomains || {},
      micros: mod.results?.micros || {},
    };
  }

  function render(ctx) {
    const unlocked = localStorage.getItem("talentEcologyMatrixPremiumUnlocked") === "true";
    if (!unlocked) {
      if (typeof window.showPremiumGateModal === "function") {
        window.showPremiumGateModal();
      }
      return;
    }

    const {
      state,
      meta,
      filtered,
      completed,
      tr,
      $,
      escapeHtml,
      domainLabel,
      microLabel,
      subdomainLabel,
      RESOURCE_ECOLOGY,
      renderPerspectiveScores,
      debug = false,
    } = ctx;
    try {
    const lang = state.language;
    const IX = TEMInterpretations;
    const fallback = tr.sectionInsufficientData || tr.reportEmptyFallback;
    const noDataMsg = tr.premiumNoModuleData;

    if (!completed?.length) {
      $("premiumIndicesGrid").innerHTML = `<p class="help report-empty">${escapeHtml(noDataMsg)}</p>`;
      if ($("secOverallBody")) $("secOverallBody").innerHTML = `<p class="help report-empty">${escapeHtml(noDataMsg)}</p>`;
      if ($("secDomainsBody")) $("secDomainsBody").innerHTML = `<p class="help report-empty">${escapeHtml(noDataMsg)}</p>`;
      return;
    }

    const sectionFallback = tr.sectionInsufficientData || tr.reportEmptyFallback;

    const rankings = meta?.domainRankings?.length
      ? meta.domainRankings
      : completed.map((key) => ({
          key,
          percentages: domainDataForKey(filtered, state, key)?.percentages || {},
        }));

    $("premiumReportSubtitle").textContent = tr.premiumReportSubtitle;
    $("futureServicesNote").textContent = tr.futureServicesNote;
    if ($("secOverallTitle")) $("secOverallTitle").textContent = tr.secOverallTitle;

    const overallPct = meta?.overallEcology?.percentages?.overall ?? 0;
    const alignPct = Math.round((meta?.talentAlignmentIndex ?? 0) * 100);
    const constraintPct = Math.round((meta?.constraintLoad ?? 0) * 100);
    const crossPct = meta?.crossDomainIntegration?.percentages?.overall ?? 0;

    $("premiumIndicesGrid").innerHTML = "";
    [
      { label: tr.indexAlignment, pct: alignPct },
      { label: tr.indexConstraint, pct: constraintPct },
      { label: tr.completedModulesMetric, count: meta?.completedCount ?? completed.length },
      { label: tr.crossDomainPotential, pct: crossPct },
      { label: tr.overallEcology, pct: overallPct },
    ].forEach((c) => {
      const el = document.createElement("div");
      el.className = "index-card";
      if (c.count != null) {
        el.innerHTML = `<div class="index-card__label">${escapeHtml(c.label)}</div>
          <div class="index-card__value">${c.count}</div>
          <div class="index-card__detail">${escapeHtml(tr.modulesCompleted)}</div>`;
      } else {
        const scored = IX.labelScore(c.pct, lang);
        el.innerHTML = `<div class="index-card__label">${escapeHtml(c.label)}</div>
          <div class="index-card__value">${scored.display}</div>
          <div class="index-card__detail">${escapeHtml(scored.narrative)}</div>`;
      }
      $("premiumIndicesGrid").appendChild(el);
    });
    if ($("secOverallBody")) {
      const narrativeHtml = IX.buildOverallNarrative({
        lang,
        meta,
        completedDomainKeys: completed,
        domainLabels: domainLabel,
      });
      $("secOverallBody").innerHTML =
        narrativeHtml?.trim() ? narrativeHtml : sectionFallbackHtml(fallback, escapeHtml);
    }

    if ($("secRankingsTitle")) $("secRankingsTitle").textContent = tr.secRankingsTitle;
    if ($("secRankDesiredTitle")) $("secRankDesiredTitle").textContent = tr.rankDesiredTitle;
    if ($("secRankPerceivedTitle")) $("secRankPerceivedTitle").textContent = tr.rankPerceivedTitle;
    if ($("secRankEaseTitle")) $("secRankEaseTitle").textContent = tr.rankEaseTitle;
    if ($("secRankConstraintTitle")) $("secRankConstraintTitle").textContent = tr.rankConstraintTitle;
    if ($("secRankEcologyTitle")) $("secRankEcologyTitle").textContent = tr.previewEcologyTitle;

    const pctFor = (key, field) => pctForRanking(rankings, key, field);
    const topDesired = buildRankingItems(
      sortRankingKeys(rankings, "desired"),
      (k) => pctFor(k, "desired"),
      domainLabel,
      lang,
    );
    const topPerceived = buildRankingItems(
      sortRankingKeys(rankings, "perceived"),
      (k) => pctFor(k, "perceived"),
      domainLabel,
      lang,
    );
    const topEase = buildRankingItems(
      sortRankingKeys(rankings, "ease"),
      (k) => pctFor(k, "ease"),
      domainLabel,
      lang,
    );
    const constraintOverview = buildRankingItems(
      sortRankingKeys(rankings, "constraint"),
      (k) => pctFor(k, "constraint"),
      domainLabel,
      lang,
    );
    if (ctx.debug) {
      console.log("topDesired", topDesired);
      console.log("topPerceived", topPerceived);
      console.log("topEase", topEase);
      console.log("constraintOverview", constraintOverview);
      console.log("rankings", rankings);
    }
    renderInterpretedRankList(
      $("secRankDesired"),
      sortRankingKeys(rankings, "desired"),
      (k) => pctFor(k, "desired"),
      domainLabel,
      lang,
      escapeHtml,
      sectionFallback,
    );
    renderInterpretedRankList(
      $("secRankPerceived"),
      sortRankingKeys(rankings, "perceived"),
      (k) => pctFor(k, "perceived"),
      domainLabel,
      lang,
      escapeHtml,
      sectionFallback,
    );
    renderInterpretedRankList(
      $("secRankEase"),
      sortRankingKeys(rankings, "ease"),
      (k) => pctFor(k, "ease"),
      domainLabel,
      lang,
      escapeHtml,
      sectionFallback,
    );
    renderInterpretedRankList(
      $("secRankConstraint"),
      sortRankingKeys(rankings, "constraint"),
      (k) => pctFor(k, "constraint"),
      domainLabel,
      lang,
      escapeHtml,
      sectionFallback,
    );

    const ecologyList = $("secRankEcologyList");
    if (ecologyList) {
      ecologyList.innerHTML = "";
      const keys = completed.length ? completed : rankings.map((d) => d.key);
      if (!keys.length) {
        ecologyList.innerHTML = `<li class="help">${escapeHtml(fallback)}</li>`;
      } else {
        keys.forEach((key) => {
          const res = state.modules[key]?.results;
          const recs = res ? RESOURCE_ECOLOGY.getRecommendations(key, res, lang) : [];
          const li = document.createElement("li");
          li.innerHTML = `<strong>${escapeHtml(domainLabel(key))}</strong> — ${escapeHtml(recs[0] || fallback)}`;
          ecologyList.appendChild(li);
        });
      }
    }

    if ($("secSignaturePathTitle")) $("secSignaturePathTitle").textContent = tr.previewSignatureTitle;
    if ($("secSignaturePathNote")) $("secSignaturePathNote").textContent = tr.previewSignatureNote;
    renderInterpretedRankList(
      $("secSignaturePathList"),
      meta?.signatureTalentPath || [],
      (key) => rankings.find((x) => x.key === key)?.percentages?.overall ?? 0,
      domainLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secHierarchyTitle").textContent = tr.secHierarchy;
    $("secHierarchyBody").innerHTML = `<p>${escapeHtml(tr.completedModulesCount(completed.length))}</p>
      <p class="help">${escapeHtml(tr.hierarchyInterpHelp)}</p>`;

    $("secDomainsTitle").textContent = tr.secDomains;
    const domainsBody = $("secDomainsBody");
    domainsBody.innerHTML = "";
    if (!completed.length) {
      domainsBody.innerHTML = sectionFallbackHtml(fallback, escapeHtml);
    }
    let domainsRendered = 0;
    completed.forEach((key) => {
      const d = domainDataForKey(filtered, state, key);
      if (!d?.percentages) return;
      domainsRendered += 1;
      const modRes = state.modules[key]?.results;
      const resourceLines = modRes ? RESOURCE_ECOLOGY.getRecommendations(key, modRes, lang) : [];
      const interp = IX.buildDomainInterpretation(key, d.percentages, lang, resourceLines);

      let scoresHtml = "";
      if (renderPerspectiveScores) {
        const scoresDiv = document.createElement("div");
        scoresDiv.className = "score-perspective-grid interp-block";
        renderPerspectiveScores(scoresDiv, d.percentages);
        scoresHtml = `<div class="interp-block"><h5>${escapeHtml(tr.moduleScoresTitle)}</h5>${scoresDiv.innerHTML}</div>`;
      }

      let microHtml = `<div class="interp-block"><h5>${escapeHtml(tr.microAbilityInterp)}</h5>`;
      const microEntries = Object.entries(filtered.micros || {})
        .filter(([, m]) => m.domain === key)
        .map(([k, m]) => ({ key: k, pct: m.percentages?.overall ?? 0 }))
        .sort((a, b) => b.pct - a.pct)
        .slice(0, 8);
      if (!microEntries.length) {
        microHtml += `<p class="help">${escapeHtml(fallback)}</p>`;
      } else {
        microEntries.forEach(({ key: mk, pct }) => {
          microHtml += IX.htmlMicroItem(escapeHtml(microLabel(mk)), pct, lang, mk);
        });
      }
      Object.entries(d.subdomains || {})
        .sort((a, b) => (b[1].percentages?.overall ?? 0) - (a[1].percentages?.overall ?? 0))
        .slice(0, 4)
        .forEach(([sk, s]) => {
          const ss = IX.labelScore(s.percentages?.overall ?? 0, lang);
          microHtml += `<p class="interp-sub"><strong>${escapeHtml(subdomainLabel(sk))}</strong> — ${ss.display}. ${escapeHtml(ss.narrative)}</p>`;
        });
      microHtml += `</div>`;

      const block = document.createElement("article");
      block.className = "domain-report-block domain-report-block--rich";
      block.innerHTML = `<h4 class="h4">${escapeHtml(domainLabel(key))}</h4>${scoresHtml}${renderDomainHtml(interp, lang, escapeHtml)}${microHtml}`;
      domainsBody.appendChild(block);
    });
    if (!domainsRendered && domainsBody) {
      domainsBody.innerHTML = sectionFallbackHtml(fallback, escapeHtml);
    }

    const cross = meta?.crossDomainIntegration;
    const cp = cross?.percentages || {};
    $("secCrossTitle").textContent = tr.secCross;
    const crossInterp = IX.buildDomainInterpretation(
      "cross_domain",
      cp,
      lang,
      cross?.synthesized ? [] : RESOURCE_ECOLOGY.getRecommendations("cross_domain", { percentages: cp }, lang),
    );
    $("secCrossBody").innerHTML =
      (cross?.synthesized ? `<p class="help">${escapeHtml(tr.synthesizedNote)}</p>` : "") +
      renderDomainHtml(crossInterp, lang, escapeHtml);

    $("secResourceTitle").textContent = tr.secResource;
    const profileEl = $("secResourceProfile");
    if (profileEl) {
      const profile = buildResourceEcologyProfile(meta, lang);
      profileEl.innerHTML = profile
        ? profile
            .split("\n\n")
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join("")
        : `<p class="help">${escapeHtml(fallback)}</p>`;
    }
    const resBody = $("secResourceBody");
    resBody.innerHTML = "";
    if (!completed.length) {
      resBody.innerHTML = `<p class="help">${escapeHtml(fallback)}</p>`;
    }
    completed.forEach((key) => {
      const res = state.modules[key]?.results;
      if (!res) return;
      const wrap = document.createElement("div");
      wrap.className = "interp-block";
      const recs = RESOURCE_ECOLOGY.getRecommendations(key, res, lang);
      wrap.innerHTML = `<h5>${escapeHtml(domainLabel(key))}</h5><ul class="interp-list">${recs
        .map((line) => `<li>${escapeHtml(line)}</li>`)
        .join("")}</ul>`;
      resBody.appendChild(wrap);
    });

    const microList = Object.entries(filtered.micros || {}).map(([key, m]) => ({ key, ...m }));
    const topMicro = (field, n) =>
      [...microList].sort((a, b) => (b[field] ?? 0) - (a[field] ?? 0)).slice(0, n);

    $("secSignatureMicroTitle").textContent = tr.secSignatureMicro;
    renderInterpretedMicroList(
      $("secSignatureMicroList"),
      topMicro("talentSignatureScore", 5).map((m) => m.key),
      (k) => Math.round(filtered.micros[k]?.percentages?.overall ?? 0),
      microLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secHiddenTitle").textContent = tr.secHidden;
    renderInterpretedMicroList(
      $("secHiddenList"),
      (meta?.hiddenPotential || []).slice(0, 5),
      (k) => Math.round((filtered.micros[k]?.hiddenPotentialScore ?? 0) * 100),
      microLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secDreamGapTitle").textContent = tr.secDreamGap;
    renderInterpretedMicroList(
      $("secDreamGapList"),
      topMicro("dreamRealityGap", 5).map((m) => m.key),
      (k) => Math.round((filtered.micros[k]?.dreamRealityGap ?? 0) * 100),
      microLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secBlockedTitle").textContent = tr.secBlocked;
    renderInterpretedMicroList(
      $("secBlockedList"),
      topMicro("constraintBlockedScore", 5).map((m) => m.key),
      (k) => Math.round((filtered.micros[k]?.constraintBlockedScore ?? 0) * 100),
      microLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secOptimalTitle").textContent = tr.secOptimal;
    renderInterpretedRankList(
      $("secOptimalList"),
      meta?.optimalDevelopmentEnvironment || [],
      (key) => rankings.find((x) => x.key === key)?.percentages?.overall ?? 0,
      domainLabel,
      lang,
      escapeHtml,
      fallback,
    );

    $("secStrategyTitle").textContent = tr.secStrategy;
    const strategyHtml = buildPersonalizedStrategy(meta, completed, lang, domainLabel, escapeHtml);
    $("secStrategyBody").innerHTML =
      strategyHtml ||
      `<p class="help report-empty">${escapeHtml(fallback)}</p><p class="interp-narrative">${escapeHtml(tr.developmentStrategyNarrative)}</p>`;
    if (strategyHtml) {
      $("secStrategyBody").innerHTML += `<p class="interp-narrative">${escapeHtml(tr.developmentStrategyNarrative)}</p>`;
    }
    } catch (err) {
      console.error("TEMPremiumReport.render failed", err);
      const msg = ctx.tr?.sectionInsufficientData || "Report rendering failed.";
      const fb = sectionFallbackHtml(msg, ctx.escapeHtml);
      ["secOverallBody", "secRankDesired", "secRankPerceived", "secRankEase", "secRankConstraint", "secDomainsBody"].forEach((id) => {
        const el = ctx.$(id);
        if (el) el.innerHTML = fb + `<p class="help">${ctx.escapeHtml(String(err.message || err))}</p>`;
      });
    }
  }

  return { render };
})();
