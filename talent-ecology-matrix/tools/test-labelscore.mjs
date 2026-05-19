import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = {};
for (const f of ["interpretations.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, f), "utf8"), sandbox, { filename: f });
}
const s = sandbox.TEMInterpretations.labelScore(76, "en");
console.log("display", s.display);
console.log("narrative", s.narrative?.slice(0, 40));
