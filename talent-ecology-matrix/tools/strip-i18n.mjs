import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "script.js");
let s = fs.readFileSync(file, "utf8");

const start = s.indexOf("  const _delete_from_here = {");
const end = s.indexOf("  let state = TEMStorage.load();", start + 1);
if (start < 0) {
  const start2 = s.indexOf("  const _removed_i18n_placeholder = {");
  if (start2 >= 0) {
    const end2 = s.indexOf("\n\n  let state = TEMStorage.load();", start2);
    s = s.slice(0, start2) + s.slice(end2 + 2);
  }
} else {
  const end2 = s.indexOf("\n\n  let state = TEMStorage.load();", start);
  s = s.slice(0, start) + s.slice(end2 + 2);
}

// Remove duplicate let state if any
s = s.replace(
  /  let state = TEMStorage\.load\(\);\n  let state = TEMStorage\.load\(\);/,
  "  let state = TEMStorage.load();"
);

const fixes = [
  [/â€"/g, "—"],
  [/â€"/g, "–"],
  [/â€¢/g, "·"],
  [/Â·/g, "·"],
  [/â€"/g, "—"],
  [/\$\{scored\.pct\}% Â·/g, "${scored.pct}% ·"],
  [/\?\? "â€""/g, '?? "—"'],
  [/<strong>\$\{escapeHtml\(tl\(persp\.label\)\)\}<\/strong> â€”/g, "<strong>${escapeHtml(tl(persp.label))}</strong> —"],
  [/<span>1 â€”/g, "<span>1 —"],
  [/<span>4 â€”/g, "<span>4 —"],
  [/<span>7 â€”/g, "<span>7 —"],
  [/<\/strong> â€” \$\{RESOURCE_ECOLOGY/g, "</strong> — ${RESOURCE_ECOLOGY"],
  [
    /state\.language === "zh" \? "æœ¬æ¨¡å—ç»"æžœå·²ä¿å­˜"/,
    'state.language === "zh" ? "本模块结果已保存"',
  ],
  [
    /\$\{state\.language === "zh" \? "æ——èˆ°"/,
    '${state.language === "zh" ? "旗舰"',
  ],
  [
    /`\$\{tr\.stripePlaceholder\}\\n\\nåŽŸåž‹ï¼šæ˜¯å¦æ¨¡æ‹Ÿä»˜æ¬¾æˆåŠŸå¹¶è§£é"ï¼Ÿ`/,
    "`${tr.stripePlaceholder}\\n\\n原型：是否模拟付款成功并解锁？`",
  ],
  [/bi\(tr\.retakeModule, "é‡æ–°æµ‹è¯„"\)/g, "bi(tr.retakeModule, '重新测评')"],
  [/bi\(tr\.viewFreePreview, "æŸ¥çœ‹å…è´¹é¢„è§ˆ"\)/g, "bi(tr.viewFreePreview, '查看免费预览')"],
  [/bi\(tr\.viewPremiumReport, "å®Œæ•´é«˜çº§æŠ¥å‘Š"\)/g, "bi(tr.viewPremiumReport, '完整高级报告')"],
  [
    /bi\(tr\.viewPremiumReport, "æŸ¥çœ‹å®Œæ•´é«˜çº§æŠ¥å‘Š"\)/g,
    "bi(tr.viewPremiumReport, '查看完整高级报告')",
  ],
  [/bi\(tr\.submit, "æäº¤"\)/g, "bi(tr.submit, '提交')"],
];

for (const [re, rep] of fixes) s = s.replace(re, rep);

fs.writeFileSync(file, s, { encoding: "utf8" });
console.log("script.js cleaned");
