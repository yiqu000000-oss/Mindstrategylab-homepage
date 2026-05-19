import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(root, "..", "interpretations.js");
const s = fs.readFileSync(p, "utf8");
const fnStart = s.indexOf("  function buildOverallNarrative(ctx)");
const end = s.indexOf("  /** HTML helpers for report rendering", fnStart);
if (fnStart < 0 || end < 0) {
  console.error("markers not found", fnStart, end);
  process.exit(1);
}
const commentStart = s.lastIndexOf("  /**", fnStart);
const start = commentStart > fnStart - 120 ? commentStart : fnStart;
const replacement = fs.readFileSync(path.join(root, "overall-narrative-snippet.js"), "utf8");
const out = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync(p, out);
console.log("patched", start, "->", end);
