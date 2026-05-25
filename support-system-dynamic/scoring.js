// Support System Dynamics — scoring engine

const SSDScoring = (() => {
  "use strict";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const round2 = (n) => Math.round(n * 100) / 100;

  const mean = (values) => {
    const valid = values.filter((v) => v != null && !Number.isNaN(v));
    if (!valid.length) return 0;
    return valid.reduce((a, b) => a + b, 0) / valid.length;
  };

  const toPercent = (likertMean) => round2(((likertMean - 1) / 6) * 100);

  const getLayer = (layerId) => SSD_LAYERS.find((l) => l.id === layerId);

  const getSubvariableLabel = (layerId, subKey) => {
    const layer = getLayer(layerId);
    const sub = layer?.subvariables.find((s) => s.key === subKey);
    return sub?.label || subKey;
  };

  const computeSubvariableScores = (responses) => {
    const scores = {};
    SSD_LAYERS.forEach((layer) => {
      layer.subvariables.forEach((sub) => {
        const items = SSD_ITEMS.filter(
          (q) => q.layer === layer.id && q.subvariable === sub.key,
        );
        const values = items.map((q) => responses[q.id]).filter((v) => v != null);
        const m = mean(values);
        scores[`L${layer.id}_${sub.key}`] = {
          layer: layer.id,
          layerLabel: layer.label,
          key: sub.key,
          label: sub.label,
          mean: round2(m),
          percent: toPercent(m),
          count: values.length,
          total: items.length,
        };
      });
    });
    return scores;
  };

  const computeLayerScores = (subScores) => {
    const layers = {};
    SSD_LAYERS.forEach((layer) => {
      const subs = Object.values(subScores).filter((s) => s.layer === layer.id);
      const m = mean(subs.map((s) => s.mean));
      layers[layer.id] = {
        id: layer.id,
        key: layer.key,
        label: layer.label,
        mean: round2(m),
        percent: toPercent(m),
        subvariables: subs,
      };
    });
    return layers;
  };

  const rankSubvariables = (subScores, order = "desc") => {
    const arr = Object.values(subScores);
    return arr.sort((a, b) =>
      order === "desc" ? b.percent - a.percent : a.percent - b.percent,
    );
  };

  const detectPattern = (layerScores) => {
    const l1 = layerScores[1]?.percent ?? 0;
    const l2 = layerScores[2]?.percent ?? 0;
    const l3 = layerScores[3]?.percent ?? 0;
    const l4 = layerScores[4]?.percent ?? 0;
    const avg = (l1 + l2 + l3 + l4) / 4;

    if (l1 >= 65 && l2 >= 65 && l3 >= 55 && l4 >= 55) return { key: "integrated_continuity" };
    if (l1 >= 60 && l2 < 50) return { key: "perception_gap" };
    if (l2 >= 55 && l3 < 45) return { key: "accessibility_bottleneck" };
    if (l3 >= 50 && l4 < 45) return { key: "conversion_strain" };
    if (avg < 40) return { key: "structural_fragility" };
    if (l4 >= 60 && l1 < 50) return { key: "compensatory_resilience" };
    return { key: "mixed_dynamics" };
  };

  const computeResults = (responses) => {
    const subScores = computeSubvariableScores(responses);
    const layerScores = computeLayerScores(subScores);
    const ranked = rankSubvariables(subScores, "desc");
    const weakest = rankSubvariables(subScores, "asc");
    const pattern = detectPattern(layerScores);

    const accessibilitySubs = Object.values(subScores).filter((s) => s.layer === 3);
    const bottlenecks = [...accessibilitySubs]
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);

    const recoverySubs = Object.values(subScores).filter((s) => s.layer === 4);
    const vulnerabilities = [...recoverySubs]
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);

    const anchors = ranked.slice(0, 5);

    const overallMean = mean(Object.values(layerScores).map((l) => l.mean));

    return {
      subScores,
      layerScores,
      pattern,
      anchors,
      weakest: weakest.slice(0, 5),
      bottlenecks,
      vulnerabilities,
      overallMean: round2(overallMean),
      overallPercent: toPercent(overallMean),
      computedAt: new Date().toISOString(),
    };
  };

  const isComplete = (responses) =>
    SSD_ITEMS.every((q) => {
      const v = responses[q.id];
      return v != null && v >= 1 && v <= 7;
    });

  return {
    computeResults,
    isComplete,
    toPercent,
    getSubvariableLabel,
  };
})();
