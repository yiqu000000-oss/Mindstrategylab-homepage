import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "script.js");
let s = fs.readFileSync(file, "utf8");

const start = s.indexOf("    const bi = (en, zh)");
const end = s.indexOf('    $("langEn").classList.toggle', start);
if (start < 0 || end < 0) {
  console.error("bi block not found");
  process.exit(1);
}

const replacement = `    const bi = (key) => {
      const en = i18n.en[key];
      const zh = i18n.zh[key];
      if (en == null || zh == null) return String(key);
      const enText = typeof en === "function" ? en() : en;
      const zhText = typeof zh === "function" ? zh() : zh;
      return state.language === "en" ? \`\${enText} / \${zhText}\` : \`\${zhText} / \${enText}\`;
    };
    set("btnWelcomeNext", bi("continueBtn"));
    set("btnConsentBack", bi("back"));
    set("btnConsentNext", bi("continueBtn"));
    set("btnBgBack", bi("back"));
    set("btnBgNext", bi("continueToDashboard"));
    set("btnPrev", bi("prev"));
    set("btnModuleBackDashboard", bi("dashboard"));
    set("btnModuleResultsDashboard", bi("dashboard"));
    set("btnPreviewDashboard", bi("dashboard"));
    set("btnPremiumDashboard", bi("dashboard"));
    set("btnRetakeModule", bi("retakeModule"));
    set("btnOpenPreview", bi("viewFreePreview"));
    set("btnOpenPremium", bi("viewPremiumReport"));
    set("btnViewPremiumReport", bi("viewFullPremiumReport"));
    set("btnDownloadProgress", bi("downloadProgress"));
    set("btnResetProgress", bi("resetProgress"));
    set("btnDownloadJson", tr.downloadJson);
    set("btnSubmitValidation", bi("submit"));
    set("btnValidationBack", bi("back"));
    set("btnPremiumToValidation", bi("validationBtnShort"));

`;

s = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync(file, s, { encoding: "utf8" });
console.log("Fixed bi() button labels in script.js");
