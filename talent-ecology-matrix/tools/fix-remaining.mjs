import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "script.js");
let s = fs.readFileSync(file, "utf8");
const lines = s.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Module results saved locally") && lines[i].includes("zh")) {
    lines[i] =
      '      state.language === "zh" ? "本模块结果已保存" : "Module results saved locally";';
  }
  if (lines[i].includes("cp.desired ??")) {
    lines[i] = lines[i].replace(/\?\? "[^"]+"/g, '?? "—"');
  }
}
fs.writeFileSync(file, lines.join("\n"), { encoding: "utf8" });
console.log("fixed remaining");
