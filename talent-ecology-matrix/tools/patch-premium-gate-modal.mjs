import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");

const gate = `      <motion class="modal hidden" id="premiumGateModal" role="dialog" aria-modal="true" aria-labelledby="premiumGateModalTitle">
        <div class="modal__overlay" id="premiumGateModalOverlay" data-close="true"></div>
        <div class="modal__panel" role="document">
          <div class="modal__head">
            <div>
              <div class="modal__title" id="premiumGateModalTitle">Unlock Full Premium Report</div>
              <p class="modal__subtitle" id="premiumGateModalText"></p>
            </div>
            <button class="icon-btn" id="btnClosePremiumGateModal" type="button" aria-label="Close">×</button>
          </div>
          <div class="modal__body">
            <p class="modal__status" id="premiumGateStatus" aria-live="polite"></p>
            <div class="modal__actions modal__actions--stack">
              <button class="btn btn--gold btn--block" id="btnGateStripePay" type="button">Pay with Stripe</button>
              <button class="btn btn--ghost btn--block" id="btnGateEnterPromo" type="button">Enter Promo Code</button>
            </div>
          </div>
        </div>
      </div>

`;

let s = fs.readFileSync(htmlPath, "utf8");
if (s.includes('id="premiumGateModal"')) {
  console.log("premiumGateModal already present");
  process.exit(0);
}
const needle = '      <div class="modal hidden" id="premiumUnlockModal"';
if (!s.includes(needle)) {
  console.error("anchor not found");
  process.exit(1);
}
const clean = gate.replace(/^      <motion /, "      <div ");
s = s.replace(needle, clean + needle);
fs.writeFileSync(htmlPath, s);
console.log("inserted premiumGateModal");
