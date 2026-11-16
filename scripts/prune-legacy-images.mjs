#!/usr/bin/env node
/** Delete legacy image files superseded by image-redirect-map.json (301s keep old URLs working). */
import { readFileSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { renames } = JSON.parse(
  readFileSync(join(root, "scripts/image-redirect-map.json"), "utf8")
);

let removed = 0;
let skipped = 0;
for (const { from, to } of renames) {
  const oldPath = join(root, "public", from);
  const newPath = join(root, "public", to);
  if (!existsSync(newPath)) {
    console.warn("skip (no new file):", to);
    skipped++;
    continue;
  }
  if (existsSync(oldPath)) {
    unlinkSync(oldPath);
    removed++;
  }
}
console.log(`prune-legacy-images: removed ${removed}, skipped ${skipped}`);