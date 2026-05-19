import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const start = script.indexOf("const i18n = {");
const end = script.indexOf("  let state = TEMStorage.load();");
let block = script.slice(start, end).trim().replace(/^const i18n = /, "").replace(/;\s*$/, "");
const i18n = vm.runInNewContext(`const __i18n = ${block}; __i18n`, {
  MIN_MODULES_FOR_META: 6,
  APP_VERSION: "0.3.0",
});

function recoverLatin1(s) {
  return Buffer.from(s, "latin1").toString("utf8");
}
function recoverEscape(s) {
  try {
    return decodeURIComponent(escape(s));
  } catch {
    return s;
  }
}

function scoreZh(s) {
  const cjk = (s.match(/[\u4e00-\u9fff]/g) || []).length;
  const bad = (s.match(/[æäåèï¼â€Â]/g) || []).length;
  return cjk * 2 - bad * 3;
}

function bestRecover(s) {
  let best = s;
  let bestScore = scoreZh(s);
  let cur = s;
  for (let i = 0; i < 4; i++) {
    cur = Buffer.from(cur, "latin1").toString("utf8");
    const sc = scoreZh(cur);
    if (sc > bestScore) {
      bestScore = sc;
      best = cur;
    }
  }
  return best;
}

const tests = [
  i18n.zh.brandSubtitle,
  i18n.zh.welcomeLead,
  i18n.zh.metaBannerLocked(2, 6),
  i18n.zh.consentTitle,
];

for (const t of tests) {
  console.log("IN :", t.slice(0, 55));
  console.log("latin1:", recoverLatin1(t).slice(0, 55));
  console.log("escape:", recoverEscape(t).slice(0, 55));
  console.log("best:", bestRecover(t).slice(0, 55));
  console.log();
}
