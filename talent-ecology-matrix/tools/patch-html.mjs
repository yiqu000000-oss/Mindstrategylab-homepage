import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
const lines = fs.readFileSync(htmlPath, "utf8").split(/\r?\n/);

const freeStart = lines.findIndex((l) => l.includes('class="grid two results-visual"') && l.includes("previewVenn") === false && lines[lines.indexOf(l) - 1]?.includes("btnPreviewDashboard") === false);
// find line after btnPreviewDashboard block - line 205 is index 204
const idx205 = lines.findIndex((l, i) => i > 195 && l.trim() === '<div class="grid two results-visual">');
const idxPremium = lines.findIndex((l) => l.includes('card card--nested premium'));

if (idx205 < 0 || idxPremium < 0) {
  console.error("markers", idx205, idxPremium);
  process.exit(1);
}

const freeBlock = [
  '          <p class="preview-teaser-lead" id="previewTeaserLead"></p>',
  "",
  '          <div class="venn-card venn-card--teaser">',
  '            <h3 class="h3" id="previewVennTitle">Talent Ecology Map</h3>',
  '            <p class="help" id="previewVennHelp"></p>',
  '            <div class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></div>',
  '            <div class="venn-legend venn-legend--teaser" id="previewVennLegend"></div>',
  "          </div>",
  "",
  '          <motion class="indices-grid indices-grid--teaser" id="previewTeaserMetrics"></div>'.replace(
    "<motion",
    "<div",
  ),
  "",
  '          <p class="preview-teaser-pitch rich" id="previewTeaserPitch"></p>',
  "",
  '          <div class="divider"></motion>'.replace("<motion", "<motion").replace("</motion>", "</motion>"),
  "",
].map((l) => l.replace("</motion>", "</motion>").replace('<div class="divider"></motion>', '<div class="divider"></motion>'));

const freeBlockClean = [
  '          <p class="preview-teaser-lead" id="previewTeaserLead"></p>',
  "",
  '          <div class="venn-card venn-card--teaser">',
  '            <h3 class="h3" id="previewVennTitle">Talent Ecology Map</h3>',
  '            <p class="help" id="previewVennHelp"></p>',
  '            <div class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></div>',
  '            <div class="venn-legend venn-legend--teaser" id="previewVennLegend"></div>',
  "          </div>",
  "",
  '          <div class="indices-grid indices-grid--teaser" id="previewTeaserMetrics"></div>',
  "",
  '          <p class="preview-teaser-pitch rich" id="previewTeaserPitch"></p>',
  "",
  '          <div class="divider"></div>',
  "",
];

const newLines = [...lines.slice(0, idx205), ...freeBlockClean, ...lines.slice(idxPremium)];

const hierarchyIdx = newLines.findIndex((l) => l.includes('id="sectionHierarchy"'));
const premiumInsert = [
  '          <section class="report-section" id="sectionPremiumRankings">',
  '            <h3 class="h3" id="secRankingsTitle">Rankings</h3>',
  '            <div class="grid two">',
  "              <div>",
  '                <h4 class="h4" id="secRankDesiredTitle">Top Desired Talents</h4>',
  '                <div class="rank-list" id="secRankDesired"></div>',
  '                <h4 class="h4 h4--spaced" id="secRankPerceivedTitle">Top Socially Perceived Talents</h4>',
  '                <div class="rank-list" id="secRankPerceived"></div>',
  "              </div>",
  "              <div>",
  '                <h4 class="h4 h4--spaced" id="secRankEaseTitle">Top Developmental Ease Domains</h4>',
  '                <div class="rank-list" id="secRankEase"></div>',
  '                <h4 class="h4 h4--spaced" id="secRankConstraintTitle">Constraint Overview</h4>',
  '                <div class="rank-list" id="secRankConstraint"></div>',
  "              </div>",
  "            </motion>",
  '            <h4 class="h4 h4--spaced" id="secRankEcologyTitle">Resource Ecology Overview</h4>',
  '            <ul class="rec-list" id="secRankEcologyList"></ul>',
  "          </section>",
  "",
  '          <section class="report-section card card--nested" id="sectionSignaturePath">',
  '            <h3 class="h3" id="secSignaturePathTitle">Signature Talent Path</h3>',
  '            <p class="help" id="secSignaturePathNote"></p>',
  '            <div class="rank-list" id="secSignaturePathList"></div>',
  "          </section>",
  "",
].map((l) => l.replace("            </motion>", "            </div>"));

const finalLines = [
  ...newLines.slice(0, hierarchyIdx),
  ...premiumInsert,
  ...newLines.slice(hierarchyIdx),
];

const resBodyIdx = finalLines.findIndex((l) => l.includes('id="secResourceBody"'));
if (resBodyIdx >= 0 && !finalLines.some((l) => l.includes("secResourceProfile"))) {
  finalLines.splice(resBodyIdx + 1, 0, '            <div class="rich interp-prose" id="secResourceProfile"></motion>'.replace(
    "</motion>",
    "</div>",
  ));
}

fs.writeFileSync(htmlPath, finalLines.join("\n"), "utf8");
console.log("Done. Free:", idx205, "->", idxPremium, "Premium insert at", hierarchyIdx);
