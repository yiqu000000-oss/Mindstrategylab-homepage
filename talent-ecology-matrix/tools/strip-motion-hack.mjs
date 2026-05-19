import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "premium-report.js");
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const start = lines.findIndex((l) => l.includes('querySelectorAll(".index-card")'));
if (start === -1) {
  console.log("not found");
  process.exit(0);
}
let end = start;
while (end < lines.length && !lines[end].includes("});")) end++;
if (lines[end + 1] === "") end++;
const out = [...lines.slice(0, start), ...lines.slice(end + 1)];
fs.writeFileSync(p, out.join("\n"));
console.log("removed lines", start + 1, "-", end + 1);
