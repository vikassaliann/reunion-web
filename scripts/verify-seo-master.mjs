#!/usr/bin/env node
/**
 * Verifies SEO Master Sheet rules against repo data (run: node scripts/verify-seo-master.mjs).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(p) {
  return readFileSync(join(root, p), "utf8");
}

/** @type {{path:string, title:string, description:string}[]} */
const pages = [];

const onPage = read("src/data/onPageOverrides.ts");
const keyword = read("src/data/onPageOverrides.ts");

// crude parse ON_PAGE_OVERRIDES paths
const pathRe = /"(\/[^"]+)":\s*\{/g;
let m;
while ((m = pathRe.exec(onPage))) {
  const path = m[1];
  const block = onPage.slice(m.index, m.index + 800);
  const title = block.match(/title:\s*"([^"]+)"/)?.[1];
  const description = block.match(/description:\s*\n?\s*"([^"]+)"/)?.[1];
  if (title) pages.push({ path, title, description: description ?? "" });
}

const propertySeo = read("src/data/propertySeo.ts");
const propRe = /"([a-z0-9-]+)":\s*\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*\n?\s*"([^"]+)"/g;
while ((m = propRe.exec(propertySeo))) {
  pages.push({
    path: `/properties/${m[1]}`,
    title: m[2],
    description: m[3],
  });
}

const issues = [];
for (const p of pages) {
  if (p.title.length > 60) {
    issues.push(`title >60 (${p.title.length}): ${p.path}`);
  }
  const dLen = p.description.length;
  if (dLen && (dLen < 120 || dLen > 155)) {
    issues.push(`meta length ${dLen} (want 120–155): ${p.path}`);
  }
}

// internal links audit — anchor must appear in src
const audit = read("src/data/internalLinksAudit.ts");
const linkRe = /anchor:\s*"([^"]+)"/g;
const anchors = [];
while ((m = linkRe.exec(audit))) anchors.push(m[1]);

function collectSrcFiles(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (f !== "node_modules" && !f.startsWith(".")) collectSrcFiles(p, acc);
    } else if (/\.(tsx?|jsx?)$/.test(f)) acc.push(p);
  }
  return acc;
}

const srcBlob = collectSrcFiles(join(root, "src"))
  .map((p) => readFileSync(p, "utf8"))
  .join("\n");
for (const anchor of anchors) {
  if (!srcBlob.includes(anchor)) {
    issues.push(`missing internal-link anchor in src: "${anchor}"`);
  }
}

console.log(`Checked ${pages.length} page specs, ${anchors.length} internal-link anchors.`);
if (issues.length) {
  console.log("\nIssues:\n" + issues.map((i) => `  - ${i}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("OK — titles/metas/internal anchors within Master Sheet checks.");
}