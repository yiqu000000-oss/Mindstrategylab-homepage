import fs from "fs";
import vm from "vm";

import path from "path";
import { fileURLToPath } from "url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const start = script.indexOf("const i18n = {");
const end = script.indexOf("  let state = TEMStorage.load();");
let block = script.slice(start, end).trim().replace(/^const i18n = /, "").replace(/;\s*$/, "");
const i18n = vm.runInNewContext(`const __i18n = ${block}; __i18n`, {
  MIN_MODULES_FOR_META: 6,
  APP_VERSION: "0.3.0",
});

function fix(s) {
  return Buffer.from(s, "latin1").toString("utf8");
}
function fix2(s) {
  return fix(fix(s));
}

const samples = [
  ["zh brandSubtitle", i18n.zh.brandSubtitle],
  ["zh welcomeLead", i18n.zh.welcomeLead?.slice(0, 40)],
  ["zh metaBannerLocked", i18n.zh.metaBannerLocked(2, 6)],
];

for (const [label, t] of samples) {
  const hasCjk = /[\u4e00-\u9fff]/.test(t);
  const fixed = fix(t);
  const fixedHasCjk = /[\u4e00-\u9fff]/.test(fixed);
  console.log(label);
  console.log("  raw:", t.slice(0, 50));
  console.log("  hasCjk:", hasCjk, "fixedHasCjk:", fixedHasCjk);
  console.log("  fixed:", fixed.slice(0, 50));
  console.log("  fix2:", fix2(t).slice(0, 50));
  console.log();
}
