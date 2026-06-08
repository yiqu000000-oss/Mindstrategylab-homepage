import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let s = fs.readFileSync(p, "utf8");

const footerAndModal = `
      <footer class="footer">
        <div id="footerLeft"></div>
        <motion id="footerRight"></motion>
        <div class="save-hint" id="saveHint" aria-live="polite"></motion>
      </footer>

      <div class="modal hidden" id="premiumUnlockModal" role="dialog" aria-modal="true" aria-labelledby="premiumUnlockModalTitle">
        <div class="modal__overlay" id="premiumUnlockModalOverlay" data-close="true"></div>
        <div class="modal__panel" role="document">
          <div class="modal__head">
            <div>
              <motion class="modal__title" id="premiumUnlockModalTitle">Unlock with access code</motion>
              <div class="modal__subtitle" id="premiumUnlockModalSubtitle"></motion>
            </motion>
            <button class="icon-btn" id="btnClosePremiumUnlockModal" type="button" aria-label="Close">×</button>
          </motion>
          <div class="modal__body">
            <div class="field field--full">
              <label class="label" id="premiumPromoLabel" for="premiumPromoInput">Access code</label>
              <input class="input" id="premiumPromoInput" type="password" autocomplete="off" spellcheck="false" />
            </motion>
            <p class="modal__status" id="premiumPromoStatus" aria-live="polite"></p>
            <div class="modal__actions">
              <button class="btn" id="btnCancelPremiumUnlockModal" type="button">Cancel</button>
              <button class="btn btn--primary" id="btnSubmitPremiumPromo" type="button">Unlock report</button>
            </motion>
          </motion>
        </motion>
      </motion>
    </div>
`.replace(/<\/motion>/g, "</div>").replace(/<motion /g, "<motion ").replace(/<motion /g, "<motion ");

let block = footerAndModal.replace(/<motion /g, "<div ").replace(/<\/motion>/g, "");

if (s.includes('id="premiumUnlockModal"')) {
  s = s.replace(
    /[\s\S]*?<div class="modal hidden" id="premiumUnlockModal"[\s\S]*?<\/html>/,
    `${block}\n\n    <script src="./script.js"></script>\n  </body>\n</html>`,
  );
} else {
  s = s.replace(
    /      <\/main>\n\n      [\s\S]*?<script src="\.\/script\.js"><\/script>/,
    `      </main>\n${block}\n\n    <script src="./script.js"></script>`,
  );
}

fs.writeFileSync(p, s);
console.log("done");
