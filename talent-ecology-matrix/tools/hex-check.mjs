import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const buf = fs.readFileSync(path.join(root, "script.js"));
function show(label, searchFrom) {
  const i = buf.indexOf(Buffer.from(label, "utf8"), searchFrom);
  const slice = buf.slice(i, i + 80);
  const str = slice.toString("utf8").match(/"([^"]+)"/)?.[1] || "";
  let s = str;
  for (let n = 0; n < 3; n++) {
    s = Buffer.from(s, "latin1").toString("utf8");
    console.log(label, `pass${n + 1}:`, s.slice(0, 60));
  }
}
const zh = buf.indexOf(Buffer.from("zh: {", "utf8"));
show("brandSubtitle", zh);
show("welcomeLead", zh);
