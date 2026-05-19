import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "..", "Mindstrategylab homepage", "talent-ecology-matrix");
const files = [
  "index.html",
  "style.css",
  "script.js",
  "premium-report.js",
  "translations.js",
  "interpretations.js",
  "config.js",
  "scoring.js",
  "storage.js",
  "recommendations.js",
  "taxonomy.js",
  "item-registry.js",
];

if (!fs.existsSync(dest)) {
  console.warn("Homepage folder not found:", dest);
  process.exit(0);
}

files.forEach((f) => {
  const src = path.join(root, f);
  if (!fs.existsSync(src)) return;
  fs.copyFileSync(src, path.join(dest, f));
  console.log("synced", f);
});
