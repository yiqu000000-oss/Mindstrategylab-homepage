import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "script.js");
let s = fs.readFileSync(file, "utf8");

// Remove accidental duplicate header (first 18 lines before second IIFE)
const secondIife = s.indexOf("\n(() => {", 10);
if (secondIife > 0) {
  s = s.slice(secondIife + 1);
}

// Remove orphaned i18n blob
const delStart = s.indexOf("  const _delete_from_here = {");
const delEnd = s.indexOf("\n\n  let state = TEMStorage.load();", delStart);
if (delStart >= 0 && delEnd >= 0) {
  s = s.slice(0, delStart) + s.slice(delEnd);
}

// Remove duplicate consecutive state load
s = s.replace(
  /  let state = TEMStorage\.load\(\);\n  let state = TEMStorage\.load\(\);/,
  "  let state = TEMStorage.load();"
);

const replacements = [
  [/â€"/g, "—"],
  [/â€"/g, "–"],
  [/â€¢/g, "·"],
  [/Â·/g, "·"],
  [/\?\? "â€""/g, '?? "—"'],
  [
    /state\.language === "zh" \? "[^"]+"/,
    (m) => {
      if (m.includes("æœ¬")) return 'state.language === "zh" ? "本模块结果已保存"';
      return m;
    },
  ],
  [
    /\$\{state\.language === "zh" \? "[^"]+"/,
    (m) => {
      if (m.includes("æ——")) return '${state.language === "zh" ? "旗舰"';
      return m;
    },
  ],
  [
    /`\$\{tr\.stripePlaceholder\}\\n\\n[^`]+`/,
    "`${tr.stripePlaceholder}\\n\\n原型：是否模拟付款成功并解锁？`",
  ],
  [/bi\(tr\.retakeModule, "[^"]+"\)/g, "bi(tr.retakeModule, '重新测评')"],
  [/bi\(tr\.viewFreePreview, "[^"]+"\)/g, "bi(tr.viewFreePreview, '查看免费预览')"],
  [/bi\(tr\.viewPremiumReport, "[^"]+"\)/g, "bi(tr.viewPremiumReport, '完整高级报告')"],
  [
    /set\("btnViewPremiumReport", bi\(tr\.viewPremiumReport, '完整高级报告'\)\)/,
    `set("btnViewPremiumReport", bi(tr.viewPremiumReport, '查看完整高级报告'))`,
  ],
  [/bi\(tr\.submit, "[^"]+"\)/g, "bi(tr.submit, '提交')"],
];

for (const [re, rep] of replacements) {
  s = typeof rep === "function" ? s.replace(re, rep) : s.replace(re, rep);
}

fs.writeFileSync(file, s, { encoding: "utf8" });
console.log("Fixed script.js, lines:", s.split("\n").length);
