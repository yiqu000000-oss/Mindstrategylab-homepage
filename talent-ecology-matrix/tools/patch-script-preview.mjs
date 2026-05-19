import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "script.js");
let s = fs.readFileSync(file, "utf8");

// Venn teaser branch
const oldVennTail = `    const tr = t();
    $(legendId).innerHTML = \`
      <span><i style="background:rgba(16,38,72,.75)"></i>\${escapeHtml(tr.desired)} (\${percentages.desired ?? 0}%)</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>\${escapeHtml(tr.perceived)} (\${percentages.perceived ?? 0}%)</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>\${escapeHtml(tr.ease)} (\${percentages.ease ?? 0}%)</span>\`;
    $(constraintId).innerHTML = \`
      <div class="constraint-layer__title">\${escapeHtml(tr.constraintLayerTitle)}</motion>
      <div class="constraint-meter"><div class="constraint-meter__fill" style="width:\${percentages.constraint ?? 0}%"></div></div>
      <p class="help" style="margin-top:8px">\${percentages.constraint ?? 0}%</p>\`;
  };`;

const newVennTail = `    const tr = t();
    if (teaser) {
      $(legendId).innerHTML = \`
      <span><i style="background:rgba(16,38,72,.75)"></i>\${escapeHtml(tr.desired)}</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>\${escapeHtml(tr.perceived)}</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>\${escapeHtml(tr.ease)}</span>\`;
      return;
    }
    $(legendId).innerHTML = \`
      <span><i style="background:rgba(16,38,72,.75)"></i>\${escapeHtml(tr.desired)} (\${percentages.desired ?? 0}%)</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>\${escapeHtml(tr.perceived)} (\${percentages.perceived ?? 0}%)</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>\${escapeHtml(tr.ease)} (\${percentages.ease ?? 0}%)</span>\`;
    if (constraintId && $(constraintId)) {
      $(constraintId).innerHTML = \`
      <div class="constraint-layer__title">\${escapeHtml(tr.constraintLayerTitle)}</div>
      <div class="constraint-meter"><div class="constraint-meter__fill" style="width:\${percentages.constraint ?? 0}%"></div></motion>
      <p class="help" style="margin-top:8px">\${percentages.constraint ?? 0}%</p>\`;
    }
  };`.replace("</motion>", "</motion>").replace(
  '<motion class="constraint-meter__fill"',
  '<div class="constraint-meter__fill"',
);

if (!s.includes("if (teaser) {")) {
  if (!s.includes(oldVennTail.split("motion")[0])) {
    s = s.replace(
      /    const tr = t\(\);\n    \$\(legendId\)\.innerHTML = `[\s\S]*?constraint \?\? 0\}%<\/p>`;\n  };/,
      newVennTail.replace("</motion>\n", "</motion>\n").replace(/<\/motion>/g, "").replace(
        "constraint-meter__fill`",
        "constraint-meter__fill`",
      ),
    );
  }
}

// Simpler: insert teaser block after "const tr = t();" in renderVenn if not present
if (!s.includes("if (teaser) {")) {
  s = s.replace(
    "    const tr = t();\n    $(legendId).innerHTML = `",
    `    const tr = t();
    if (teaser) {
      $(legendId).innerHTML = \`
      <span><i style="background:rgba(16,38,72,.75)"></i>\${escapeHtml(tr.desired)}</span>
      <span><i style="background:rgba(186,154,83,.85)"></i>\${escapeHtml(tr.perceived)}</span>
      <span><i style="background:rgba(16,38,72,.45)"></i>\${escapeHtml(tr.ease)}</span>\`;
      return;
    }
    $(legendId).innerHTML = \``,
  );
  s = s.replace(
    "    $(constraintId).innerHTML = `\n      <div class=\"constraint-layer__title\">",
    "    if (constraintId && $(constraintId)) {\n      $(constraintId).innerHTML = `\n      <div class=\"constraint-layer__title\">",
  );
  s = s.replace(
    "${percentages.constraint ?? 0}%</p>`;\n  };\n\n  const renderPerspectiveScores",
    "${percentages.constraint ?? 0}%</p>`;\n    }\n  };\n\n  const renderPerspectiveScores",
  );
}

s = s.replace(/document\.createElement\("motion"\)/g, 'document.createElement("motion")'.replace("motion", "div"));
s = s.replace(/<\/motion>/g, "</motion>".replace("</motion>", "")).replace(
  '${c.count}</motion>',
  "${c.count}</div>",
);

s = s.replace(
  `    set("previewTeaserLead", tr.previewTeaserLead);
    set("previewTeaserPitch", tr.previewTeaserPitch);
    set("previewVennHelp", tr.previewVennHelpTeaser);`,
  `    $("previewTeaserLead").textContent = tr.previewTeaserLead;
    $("previewTeaserPitch").textContent = tr.previewTeaserPitch;
    $("previewVennHelp").textContent = tr.previewVennHelpTeaser;`,
);

// renderLanguage premium rank titles
s = s.replace(
  `    set("previewVennHelp", tr.previewVennHelp);
    set("previewCrossTitle", tr.previewCrossTitle);
    set("previewSignatureTitle", tr.previewSignatureTitle);
    set("rankDesiredTitle", tr.rankDesiredTitle);
    set("rankPerceivedTitle", tr.rankPerceivedTitle);
    set("rankEaseTitle", tr.rankEaseTitle);
    set("rankConstraintTitle", tr.rankConstraintTitle);
    set("previewEcologyTitle", tr.previewEcologyTitle);`,
  `    set("previewVennHelp", tr.previewVennHelpTeaser);
    set("secRankingsTitle", tr.secRankingsTitle);
    set("secRankDesiredTitle", tr.rankDesiredTitle);
    set("secRankPerceivedTitle", tr.rankPerceivedTitle);
    set("secRankEaseTitle", tr.rankEaseTitle);
    set("secRankConstraintTitle", tr.rankConstraintTitle);
    set("secRankEcologyTitle", tr.previewEcologyTitle);
    set("secSignaturePathTitle", tr.previewSignatureTitle);
    set("secSignaturePathNote", tr.previewSignatureNote);`,
);

fs.writeFileSync(file, s, "utf8");
console.log("script.js patched, teaser:", s.includes("if (teaser) {"));
