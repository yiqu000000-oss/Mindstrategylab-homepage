/**
 * Build translations.js from corrupted script.js zh strings (Latin-1 misread UTF-8).
 * Writes UTF-8 without BOM.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = path.join(root, "script.js");
const outPath = path.join(root, "translations.js");

/** Recover UTF-8 text that was saved/displayed as Latin-1 mojibake */
function fixMojibake(str) {
  if (!str || typeof str !== "string") return str;
  try {
    return Buffer.from(str, "latin1").toString("utf8");
  } catch {
    return str;
  }
}

function fixPunctuation(str) {
  if (!str || typeof str !== "string") return str;
  return str
    .replace(/\u00e2\u0080\u0094/g, "\u2014") // em dash
    .replace(/\u00e2\u0080\u0093/g, "\u2013") // en dash
    .replace(/\u00e2\u0080\u00a2/g, "\u00b7") // bullet
    .replace(/\u00c2\u00b7/g, "\u00b7"); // middle dot
}

const script = fs.readFileSync(scriptPath, "utf8");
const i18nStart = script.indexOf("const i18n = {");
const i18nEnd = script.indexOf("  let state = TEMStorage.load();");
if (i18nStart < 0 || i18nEnd < 0) {
  console.error("Could not locate i18n block in script.js");
  process.exit(1);
}

// Evaluate i18n in isolated vm with MIN_MODULES_FOR_META and APP_VERSION
const preamble = `
const MIN_MODULES_FOR_META = 6;
const APP_VERSION = "0.3.0-modular-premium";
`;
import vm from "vm";

let i18nBlock = script.slice(i18nStart, i18nEnd).trim();
i18nBlock = i18nBlock.replace(/^const i18n = /, "").replace(/;\s*$/, "");
const i18n = vm.runInNewContext(`const __i18n = ${i18nBlock}; __i18n`, {
  MIN_MODULES_FOR_META: 6,
  APP_VERSION: "0.3.0-modular-premium",
});

function walk(obj) {
  if (typeof obj === "string") return fixPunctuation(fixMojibake(obj));
  if (Array.isArray(obj)) return obj.map(walk);
  if (obj && typeof obj === "function") return obj;
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = walk(v);
    return out;
  }
  return obj;
}

const fixed = { en: walk(i18n.en), zh: walk(i18n.zh) };

// User-requested display strings
fixed.zh.brandSubtitle = "双语自评与研究原型";
fixed.zh.modulesHeading = "模块选择";
fixed.zh.startModule = "开始测评";
fixed.zh.premiumTitle = "解锁完整高级报告";
fixed.zh.premiumBtn = "解锁完整高级报告 – $4.99";

const header = `// Talent Ecology Matrix — bilingual UI strings (UTF-8)
// Loaded before script.js

const TEM_I18N = `;

const body = JSON.stringify(fixed, null, 2)
  .replace(/"([^"]+)":/g, "$1:")
  .replace(/"/g, '"');

// Use proper JS object literal (JSON is almost valid; fix functions)
function toJsLiteral(obj, indent = 0) {
  const sp = "  ".repeat(indent);
  const sp2 = "  ".repeat(indent + 1);
  if (typeof obj === "string") {
    return JSON.stringify(obj);
  }
  if (typeof obj === "function") {
    const fn = obj.toString();
    return fn;
  }
  if (Array.isArray(obj)) {
    if (!obj.length) return "[]";
    return `[\n${obj.map((v) => `${sp2}${toJsLiteral(v, indent + 1)}`).join(",\n")}\n${sp}]`;
  }
  if (obj && typeof obj === "object") {
    const entries = Object.entries(obj).map(([k, v]) => {
      const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      return `${sp2}${key}: ${toJsLiteral(v, indent + 1)}`;
    });
    return `{\n${entries.join(",\n")}\n${sp}}`;
  }
  return String(obj);
}

const out = `${header}${toJsLiteral(fixed)};\n`;
fs.writeFileSync(outPath, out, { encoding: "utf8" });
console.log("Wrote", outPath);

// Verify key strings
const checks = [
  fixed.zh.brandSubtitle,
  fixed.zh.modulesHeading,
  fixed.zh.startModule,
  fixed.zh.premiumTitle,
];
checks.forEach((s) => console.log("OK:", s));
