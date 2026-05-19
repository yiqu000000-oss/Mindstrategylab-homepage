import fs from "fs";
const p = new URL("../script.js", import.meta.url);
let s = fs.readFileSync(p, "utf8");
const fixes = [
  [/state\.language === "zh" \? "[^"]+" : "Desired"/g, 'state.language === "zh" ? "理想" : "Desired"'],
  [/state\.language === "zh" \? "[^"]+" : "Perceived"/g, 'state.language === "zh" ? "感知" : "Perceived"'],
  [/state\.language === "zh" \? "[^"]+" : "Ease"/g, 'state.language === "zh" ? "顺畅" : "Ease"'],
];
fixes.forEach(([re, rep]) => {
  s = s.replace(re, rep);
});
fs.writeFileSync(p, s, "utf8");
console.log("encoding fixed");
