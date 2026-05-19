/**
 * UTF-8 / mojibake verification for Talent Ecology Matrix.
 * Run: node tools/verify-encoding.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE_FILES = [
  "index.html",
  "script.js",
  "premium-report.js",
  "interpretations.js",
  "translations.js",
  "recommendations.js",
  "taxonomy.js",
  "config.js",
  "storage.js",
  "scoring.js",
  "README.md",
];

const REQUIRED_ZH = [
  "双语自评与研究原型",
  "模块选择",
  "开始测评",
  "解锁完整高级报告",
  "返回仪表盘",
  "完整高级报告",
  "整体发展摘要",
  "语言表达",
  "听觉与音乐敏感度",
  "未来可能提供专业解读与战略咨询（可选）。",
];

/** Common UTF-8-misread-as-Latin1 mojibake signatures */
const MOJIBAKE_RE =
  /æ¨|â€|Â·|è¿"|å›ž|ä»ª|ç›˜|ï¼|ã€|å®Œ|æ•´|é«˜|çº§|è§£|é"|å'|å±•|ç»"æžœ|ä¸‹è½½|é‡ç½®/;

let ok = true;

function fail(msg) {
  console.error("FAIL:", msg);
  ok = false;
}

for (const f of SOURCE_FILES) {
  const fp = path.join(root, f);
  if (!fs.existsSync(fp)) continue;
  const buf = fs.readFileSync(fp);
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    fail(`BOM in ${f}`);
  }
  const text = buf.toString("utf8");
  if (MOJIBAKE_RE.test(text)) {
    const line = text.split("\n").findIndex((l) => MOJIBAKE_RE.test(l)) + 1;
    fail(`Mojibake pattern in ${f} (near line ${line || "?"})`);
  }
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const charsetIdx = html.indexOf("<head>");
const metaIdx = html.indexOf('<meta charset="UTF-8"');
if (metaIdx < 0 || (charsetIdx >= 0 && metaIdx > charsetIdx + 800)) {
  fail("index.html missing early <meta charset=\"UTF-8\" />");
}

const transCode = fs.readFileSync(path.join(root, "translations.js"), "utf8");
const TEM_I18N = vm.runInNewContext(`${transCode}; TEM_I18N`, { APP_VERSION: "test" });

for (const s of REQUIRED_ZH) {
  const inTrans = JSON.stringify(TEM_I18N.zh).includes(s);
  const inTax = fs.existsSync(path.join(root, "taxonomy.js"))
    ? fs.readFileSync(path.join(root, "taxonomy.js"), "utf8").includes(s)
    : false;
  if (inTrans || inTax) {
    console.log("OK", s);
  } else {
    fail(`Missing required string: ${s}`);
  }
}

if (TEM_I18N.zh.dashboard !== "返回仪表盘") {
  fail(`zh.dashboard expected 返回仪表盘, got ${TEM_I18N.zh.dashboard}`);
}

console.log(ok ? "\nAll encoding checks passed." : "\nSome checks failed.");
process.exit(ok ? 0 : 1);
