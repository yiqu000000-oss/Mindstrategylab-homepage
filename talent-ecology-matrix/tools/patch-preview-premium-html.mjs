import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const freeStart = html.indexOf('          <div class="grid two results-visual">');
const freeEnd = html.indexOf('          <section class="card card--nested premium"', freeStart);
if (freeStart < 0 || freeEnd < 0) {
  console.error("Could not find free preview block");
  process.exit(1);
}

const freeNew = `          <p class="preview-teaser-lead" id="previewTeaserLead"></p>

          <div class="venn-card venn-card--teaser">
            <h3 class="h3" id="previewVennTitle">Talent Ecology Map</h3>
            <p class="help" id="previewVennHelp"></p>
            <div class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></motion>
            <div class="venn-legend venn-legend--teaser" id="previewVennLegend"></div>
          </div>

          <div class="indices-grid indices-grid--teaser" id="previewTeaserMetrics"></div>

          <p class="preview-teaser-pitch rich" id="previewTeaserPitch"></p>

          <div class="divider"></div>

`.replace("</motion>", "</motion>".replace("</motion>", "")).replace(
  '<div class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></motion>',
  '<motion class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></div>'.replace("<motion", "<motion"),
);

// Final clean free block
const freeBlock = `          <p class="preview-teaser-lead" id="previewTeaserLead"></p>

          <div class="venn-card venn-card--teaser">
            <h3 class="h3" id="previewVennTitle">Talent Ecology Map</h3>
            <p class="help" id="previewVennHelp"></p>
            <div class="venn-wrap venn-wrap--teaser" id="previewVennDiagram"></div>
            <div class="venn-legend venn-legend--teaser" id="previewVennLegend"></div>
          </div>

          <div class="indices-grid indices-grid--teaser" id="previewTeaserMetrics"></div>

          <p class="preview-teaser-pitch rich" id="previewTeaserPitch"></p>

          <div class="divider"></div>

`;

html = html.slice(0, freeStart) + freeBlock + html.slice(freeEnd);

const premiumSections = `          <section class="report-section" id="sectionPremiumRankings">
            <h3 class="h3" id="secRankingsTitle">Rankings</h3>
            <div class="grid two">
              <div>
                <h4 class="h4" id="secRankDesiredTitle">Top Desired Talents</h4>
                <div class="rank-list" id="secRankDesired"></div>
                <h4 class="h4 h4--spaced" id="secRankPerceivedTitle">Top Socially Perceived Talents</h4>
                <div class="rank-list" id="secRankPerceived"></div>
              </div>
              <div>
                <h4 class="h4 h4--spaced" id="secRankEaseTitle">Top Developmental Ease Domains</h4>
                <div class="rank-list" id="secRankEase"></div>
                <h4 class="h4 h4--spaced" id="secRankConstraintTitle">Constraint Overview</h4>
                <motion class="rank-list" id="secRankConstraint"></motion>
              </div>
            </div>
            <h4 class="h4 h4--spaced" id="secRankEcologyTitle">Resource Ecology Overview</h4>
            <ul class="rec-list" id="secRankEcologyList"></ul>
          </section>

          <section class="report-section card card--nested" id="sectionSignaturePath">
            <h3 class="h3" id="secSignaturePathTitle">Signature Talent Path</h3>
            <p class="help" id="secSignaturePathNote"></p>
            <div class="rank-list" id="secSignaturePathList"></div>
          </section>

`;

const premiumClean = premiumSections
  .replace('<motion class="rank-list" id="secRankConstraint"></motion>', '<div class="rank-list" id="secRankConstraint"></motion>')
  .replace("</motion>", "</div>");

const hierarchyStart = html.indexOf('          <section class="report-section" id="sectionHierarchy">');
if (hierarchyStart < 0) {
  console.error("sectionHierarchy not found");
  process.exit(1);
}
html = html.slice(0, hierarchyStart) + premiumClean + html.slice(hierarchyStart);

if (!html.includes("secResourceProfile")) {
  html = html.replace(
    '            <div id="secResourceBody"></motion>'.replace("</motion>", ""),
    '            <div id="secResourceBody"></div>\n            <div class="rich interp-prose" id="secResourceProfile"></div>',
  );
  if (!html.includes("secResourceProfile")) {
    html = html.replace(
      '            <div id="secResourceBody"></motion>',
      '            <div id="secResourceBody"></div>\n            <div class="rich interp-prose" id="secResourceProfile"></div>',
    );
  }
  html = html.replace(
    '            <div id="secResourceBody"></div>',
    '            <div id="secResourceBody"></div>\n            <div class="rich interp-prose" id="secResourceProfile"></motion>',
  );
  html = html.replace(
    '            <div id="secResourceBody"></div>\n            <div class="rich interp-prose" id="secResourceProfile"></motion>',
    '            <div id="secResourceBody"></div>\n            <div class="rich interp-prose" id="secResourceProfile"></div>',
  );
}

fs.writeFileSync(htmlPath, html, "utf8");
console.log("Patched index.html");
