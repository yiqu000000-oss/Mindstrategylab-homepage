/**
 * Development utility: scan project sources for likely mojibake.
 * Usage: node tools/detect-mojibake.mjs [directory]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const MOJIBAKE_RE =
  /é¢˜|æ¨|â€|Â·|è¿"|å›ž|ä»ª|ç›˜|ï¼|ã€|å®Œ|æ•´|é«˜|çº§|è§£|é"|ç»"æžœ|ä¸‹è½½|é‡ç½®/;

const EXT = new Set([".js", ".html", ".md", ".css", ".json"]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) walk(fp, out);
    else if (EXT.has(path.extname(name))) out.push(fp);
  }
  return out;
}

let hits = 0;
for (const fp of walk(root)) {
  const text = fs.readFileSync(fp, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (MOJIBAKE_RE.test(line)) {
      console.warn(`${path.relative(root, fp)}:${i + 1}: ${line.trim().slice(0, 120)}`);
      hits++;
    }
  });
}

if (hits === 0) {
  console.log("No mojibake patterns detected.");
} else {
  console.warn(`\n${hits} line(s) with possible mojibake.`);
  process.exit(1);
}
