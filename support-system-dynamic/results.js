// Support System Dynamics — free results interpretation

const SSDResults = (() => {
  "use strict";

  const localizeSub = (lang, sub) => ({
    ...sub,
    label: SSDI18n.subvarLabel(lang, sub.key),
    layerLabel: SSDI18n.layerLabel(lang, sub.layer),
  });

  const buildFreeReport = (results, lang = "en") => {
    const p = SSDI18n.pack(lang);
    const pattern = SSDI18n.patternInfo(lang, results.pattern.key);
    const arch = SSSTypology.build(results, lang).primaryArchetype;
    const layers = Object.values(results.layerScores).map((l) => ({
      ...l,
      label: SSDI18n.layerLabel(lang, l.id),
      narrative: p.layerNarrative(l.id, SSDI18n.tierLabel(lang, l.percent)),
    }));

    const nameList = (items) =>
      items
        .slice(0, 3)
        .map((a) => SSDI18n.subvarLabel(lang, a.key))
        .join(lang === "zh" ? "、" : ", ");

    return {
      overview: arch?.human || pattern.desc,
      patternLabel: arch?.label || pattern.label,
      archetype: arch,
      layerSummaries: layers,
      anchors: results.anchors.length ? p.anchorNarrative(nameList(results.anchors)) : "",
      weaknesses: results.weakest.length ? p.weaknessNarrative(nameList(results.weakest)) : "",
      bottlenecks: results.bottlenecks.length
        ? p.bottleneckNarrative(results.bottlenecks.map((b) => SSDI18n.subvarLabel(lang, b.key)).join(lang === "zh" ? "、" : ", "))
        : "",
      vulnerabilities: results.vulnerabilities.length
        ? p.vulnerabilityNarrative(
            results.vulnerabilities.map((v) => SSDI18n.subvarLabel(lang, v.key)).join(lang === "zh" ? "、" : ", "),
          )
        : "",
      disclaimer: p.disclaimer,
    };
  };

  return { buildFreeReport, localizeSub };
})();
