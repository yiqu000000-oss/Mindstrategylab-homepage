/**
 * Verify EN/ZH UI keys exist and contain no " / " bilingual mixing (except progressOf).
 */
import { readFileSync } from "fs";
import { pathToFileURL } from "url";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

global.APP_VERSION = "test";
const translationsPath = join(root, "translations.js");
const code = readFileSync(translationsPath, "utf8");
const fn = new Function(`${code}\nreturn TEM_I18N;`);
const i18n = fn();

const UI_KEYS = [
  "brandTitle",
  "welcomeTitle",
  "startBtn",
  "back",
  "continueToDashboard",
  "viewFreePreview",
  "viewPremiumReport",
  "dashboard",
  "promoInvalid",
];

const forbiddenSlash = (s) => typeof s === "string" && /\s\/\s/.test(s);

let failed = 0;
for (const lang of ["en", "zh"]) {
  const tr = i18n[lang];
  for (const key of UI_KEYS) {
    const val = tr[key];
    if (val == null) {
      console.error(`Missing ${lang}.${key}`);
      failed++;
      continue;
    }
    if (forbiddenSlash(val)) {
      console.error(`Mixed bilingual ${lang}.${key}: ${val}`);
      failed++;
    }
  }
}

const neuroZh = "神经多样性特质（可选）";
// taxonomy check via read
const tax = readFileSync(join(root, "taxonomy.js"), "utf8");
if (!tax.includes(neuroZh)) {
  console.error("taxonomy neurodiversity zh label mismatch");
  failed++;
}

if (failed) process.exit(1);
console.log("i18n single-language checks passed");
