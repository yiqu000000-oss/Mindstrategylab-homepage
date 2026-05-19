import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadScripts() {
  const files = [
    "config.js",
    "item-registry.js",
    "taxonomy.js",
    "recommendations.js",
    "interpretations.js",
    "scoring.js",
    "storage.js",
  ];
  const sandbox = { console, Math, Date, Object, Array, JSON, parseInt, parseFloat, isNaN, Number };
  for (const f of files) {
    const code = fs.readFileSync(path.join(root, f), "utf8");
    vm.runInNewContext(code, sandbox, { filename: f });
  }
  return sandbox;
}

const ctx = loadScripts();
const { SCORING, TEMStorage } = ctx;

const completed = ctx.TAXONOMY.slice(0, 6).map((d) => d.key);
const responses = {};
ctx.ITEM_REGISTRY.forEach((m) => {
  ["des", "per", "ease", "con"].forEach((p) => {
    responses[`${p}_${m.key}`] = 5 + (m.key.length % 3);
  });
});

const modules = {};
completed.forEach((key) => {
  const results = SCORING.computeDomainModule(responses, key);
  modules[key] = TEMStorage.normalizeModule(key, { completed: true, results });
});

const state = {
  version: 4,
  consent_given: true,
  background_completed: true,
  responses,
  modules,
  premium_unlocked: true,
};

const meta = SCORING.computeMetaResults(responses, TEMStorage.getCompletedModules(state), {
  moduleSnapshots: modules,
});

console.log("completed", TEMStorage.getCompletedModules(state).length);
console.log("meta.unlocked", meta.unlocked);
console.log("meta.reportReady", meta.reportReady);
console.log("rankings", meta.domainRankings?.length);
console.log("first ranking", meta.domainRankings?.[0]);
