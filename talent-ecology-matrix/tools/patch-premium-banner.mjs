import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let s = fs.readFileSync(p, "utf8");
const needle = '<motion class="indices-grid" id="premiumIndicesGrid"></motion>';
const actual = '<div class="indices-grid" id="premiumIndicesGrid"></div>';
const insert = `          <div id="premiumNoDataBanner" class="hidden" role="alert"></div>
          <div class="debug-panel hidden" id="premiumDebugPanel" aria-live="polite"></motion>
          <div class="indices-grid" id="premiumIndicesGrid"></motion>`;

if (s.includes(actual)) {
  s = s.replace(actual, insert.replace(/<\/motion>/g, "</div>").replace("<motion ", "<div "));
  fs.writeFileSync(p, s);
  console.log("patched");
} else {
  console.log("needle not found");
}
