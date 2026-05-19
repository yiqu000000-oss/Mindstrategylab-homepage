import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "premium-report.js");
let s = fs.readFileSync(p, "utf8");

const oldBlock = `  function setListFallback(el, message, escapeHtml) {
    if (!el) return;
    el.innerHTML = \`<p class="help report-empty">\${escapeHtml(message)}</p>\`;
  }

  function renderInterpretedRankList(el, keys, getPct, labelFn, lang, escapeHtml, fallback) {
    if (!el) return;
    el.innerHTML = "";
    if (!keys?.length) {
      setListFallback(el, fallback, escapeHtml);
      return;
    }
    keys.forEach((key, idx) => {
      const pct = typeof getPct(key) === "number" ? getPct(key) : 0;
      const scored = TEMInterpretations.labelScore(pct, lang);
      const row = document.createElement("motion");
      row.className = "rank-item rank-item--interp";
      row.innerHTML = \`<span class="rank-item__n">\${idx + 1}</span>
        <span class="rank-item__name">\${escapeHtml(labelFn(key))}</span>
        <span class="rank-item__score">\${scored.display}</span>
        <p class="interp-narrative rank-item__narrative">\${escapeHtml(scored.narrative)}</p>
        <div class="rank-item__bar"><div class="rank-item__fill" style="width:\${scored.pct}%"></div></div>\`;
      el.appendChild(row);
    });
  }

  function renderInterpretedMicroList(el, keys, getPct, microLabel, lang, escapeHtml, fallback) {
    if (!el) return;
    el.innerHTML = "";
    if (!keys?.length) {
      setListFallback(el, fallback, escapeHtml);
      return;
    }
    keys.forEach((key) => {
      const pct = getPct(key);
      const name = microLabel(key);
      const wrap = document.createElement("div");
      wrap.innerHTML = TEMInterpretations.htmlMicroItem(escapeHtml(name), pct, lang, key);
      const node = wrap.firstElementChild;
      if (node) el.appendChild(node);
    });
  }`;

const oldBlock2 = oldBlock.replace('createElement("motion")', 'createElement("motion")');

// actual file uses div
const oldBlockReal = oldBlock.replace('createElement("motion")', 'createElement("div")');

const newBlock = `  function sectionFallbackHtml(message, escapeHtml) {
    return \`<p class="muted">\${escapeHtml(message)}</p>\`;
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
          \`<div class="rank-item rank-item--interp">
        <span class="rank-item__n">\${idx + 1}</span>
        <span class="rank-item__name">\${escapeHtml(item.name)}</span>
        <span class="rank-item__score">\${escapeHtml(item.display)}</span>
        <p class="interp-narrative rank-item__narrative">\${escapeHtml(item.narrative)}</p>
        <div class="rank-item__bar"><motion class="rank-item__fill" style="width:\${item.score}%"></div></div>
      </div>\`,
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
  }`;

if (!s.includes("function setListFallback")) {
  console.error("setListFallback not found");
  process.exit(1);
}

s = s.replace(oldBlockReal, newBlock.replace(/<motion class="rank-item__bar"><motion/g, '<div class="rank-item__bar"><div').replace(/<\/motion><\/motion>/g, "</div></div>"));

// Add debug logging after rankings built
const marker = "    const rankings = meta?.domainRankings?.length";
if (s.includes(marker) && !s.includes("logPremiumRankings")) {
  s = s.replace(
    marker,
    `    const sectionFallback = tr.sectionInsufficientData || tr.reportEmptyFallback;

    const rankings = meta?.domainRankings?.length`,
  );

  s = s.replace(
    `    const pctFor = (key, field) => pctForRanking(rankings, key, field);
    renderInterpretedRankList(
      $("secRankDesired"),
      sortRankingKeys(rankings, "desired"),
`,
    `    const pctFor = (key, field) => pctForRanking(rankings, key, field);
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
    const fallbackRank = sectionFallbackHtml(sectionFallback, escapeHtml);
    renderInterpretedRankList(
      $("secRankDesired"),
      sortRankingKeys(rankings, "desired"),
`,
  );

  s = s.replace(
    `    const fallback = tr.reportEmptyFallback;`,
    `    const fallback = tr.sectionInsufficientData || tr.reportEmptyFallback;`,
  );

  s = s.replace(
    `        : \`<p class="help">\${escapeHtml(fallback)}</p>\`;`,
    `        : sectionFallbackHtml(fallback, escapeHtml);`,
  );

  s = s.replace(
    `      domainsBody.innerHTML = \`<p class="help">\${escapeHtml(fallback)}</p>\`;`,
    `      domainsBody.innerHTML = sectionFallbackHtml(fallback, escapeHtml);`,
  );

  s = s.replace(
    `      domainsBody.innerHTML = \`<p class="help report-empty">\${escapeHtml(fallback)}</p>\`;`,
    `      domainsBody.innerHTML = sectionFallbackHtml(fallback, escapeHtml);`,
  );
}

// wrap render in try/catch
if (!s.includes("try {") && s.includes("function render(ctx)")) {
  s = s.replace(
    "    const lang = state.language;",
    `    try {
    const lang = state.language;`,
  );
  s = s.replace(
    "  return { render };",
    `    } catch (err) {
      console.error("TEMPremiumReport.render failed", err);
      const msg = ctx.tr?.sectionInsufficientData || "Report rendering failed.";
      const fb = sectionFallbackHtml(msg, ctx.escapeHtml);
      ["secOverallBody", "secRankDesired", "secRankPerceived", "secRankEase", "secRankConstraint", "secDomainsBody"].forEach((id) => {
        const el = ctx.$(id);
        if (el) el.innerHTML = fb + \`<p class="help">\${ctx.escapeHtml(String(err.message || err))}</p>\`;
      });
    }
  }

  return { render };`,
  );
}

// add debug to ctx destructuring
if (!s.includes("debug,")) {
  s = s.replace(
    "      renderPerspectiveScores,\n    } = ctx;",
    "      renderPerspectiveScores,\n      debug = false,\n    } = ctx;",
  );
}

fs.writeFileSync(p, s);
console.log("patched premium-report.js");
