import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

for (const f of ["premium-report.js", "script.js"]) {
  const p = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", f);
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/<\/motion>/g, "</div>");
  s = s.replace(/<motion /g, "<motion ");
  s = s.replace(/<motion /g, "<div ");
  s = s.replace(/createElement\("motion"\)/g, 'createElement("div")');
  fs.writeFileSync(p, s);
  console.log("fixed", f);
}
