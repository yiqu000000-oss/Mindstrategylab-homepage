import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "script.js");
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

const screenIdx = lines.findIndex((l) => l.trim() === 'let screen = "welcome";');
if (screenIdx < 0) {
  console.error("Could not find let screen");
  process.exit(1);
}

const header = `/* Talent Ecology Matrix — modular dashboard + free preview + premium */

(() => {
  "use strict";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const nowIso = () => new Date().toISOString();
  const $ = (id) => document.getElementById(id);

  const i18n =
    typeof TEM_I18N !== "undefined"
      ? TEM_I18N
      : { en: {}, zh: {} };

  let state = TEMStorage.load();`;

let body = lines.slice(screenIdx).join("\n");

const fixes = [
  [/â€"/g, "—"],
  [/â€"/g, "–"],
  [/â€¢/g, "·"],
  [/Â·/g, "·"],
  [/\?\? "â€""/g, '?? "—"'],
  [
    'state.language === "zh" ? "æœ¬æ¨¡å—ç»"æžœå·²ä¿å­˜"',
    'state.language === "zh" ? "本模块结果已保存"',
  ],
  ['${state.language === "zh" ? "æ——èˆ°"', '${state.language === "zh" ? "旗舰"'],
  [
    "`${tr.stripePlaceholder}\\n\\nåŽŸåž‹ï¼šæ˜¯å¦æ¨¡æ‹Ÿä»˜æ¬¾æˆåŠŸå¹¶è§£é”ï¼Ÿ`",
    "`${tr.stripePlaceholder}\\n\\n原型：是否模拟付款成功并解锁？`",
  ],
  ['bi(tr.retakeModule, "é‡æ–°æµ‹è¯„")', "bi(tr.retakeModule, '重新测评')"],
  ['bi(tr.viewFreePreview, "æŸ¥çœ‹å…è´¹é¢„è§ˆ")', "bi(tr.viewFreePreview, '查看免费预览')"],
  ['bi(tr.viewPremiumReport, "å®Œæ•´é«˜çº§æŠ¥å‘Š")', "bi(tr.viewPremiumReport, '完整高级报告')"],
  [
    'set("btnViewPremiumReport", bi(tr.viewPremiumReport, \'完整高级报告\'))',
    'set("btnViewPremiumReport", bi(tr.viewPremiumReport, \'查看完整高级报告\'))',
  ],
  ['bi(tr.submit, "æäº¤")', "bi(tr.submit, '提交')"],
];

for (const [a, b] of fixes) body = body.split(a).join(b);

const out = `${header}\n${body}\n`;
fs.writeFileSync(file, out, { encoding: "utf8" });
console.log("Rebuilt script.js:", out.split("\n").length, "lines");
