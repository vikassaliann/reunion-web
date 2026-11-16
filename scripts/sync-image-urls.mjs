#!/usr/bin/env node
/** Replace old image paths across src/ (CMS, components, data). */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { renames } = JSON.parse(
  readFileSync(join(root, "scripts/image-redirect-map.json"), "utf8")
);

const sorted = [...renames].sort((a, b) => b.from.length - a.from.length);

function replaceAll(text) {
  let out = text;
  for (const { from, to } of sorted) {
    out = out.split(from).join(to);
  }
  return out;
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(p, files);
    } else if ([".ts", ".tsx", ".json", ".mjs"].includes(extname(name))) {
      files.push(p);
    }
  }
  return files;
}

let files = 0;
for (const file of walk(join(root, "src"))) {
  const before = readFileSync(file, "utf8");
  const after = replaceAll(before);
  if (after !== before) {
    writeFileSync(file, after);
    files++;
  }
}

console.log(`sync-image-urls: updated ${files} files under src/`);