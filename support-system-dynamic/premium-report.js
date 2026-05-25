// Support System Dynamics — premium report builder (personalized continuity reading)

const SSDPremium = (() => {
  "use strict";

  const buildPremiumReport = (results, context, lang = "en") => {
    const report = SSSTypology.buildReport(results, lang, context);
    return {
      ...report,
      subvariableDetail: Object.values(results.subScores).map((s) => ({
        label: SSDI18n.subvarLabel(lang, s.key),
        layer: SSDI18n.layerLabel(lang, s.layer),
        percent: s.percent,
        tier: SSDI18n.tierLabel(lang, s.percent),
      })),
    };
  };

  return { buildPremiumReport };
})();
