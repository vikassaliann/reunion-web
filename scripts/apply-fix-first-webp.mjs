#!/usr/bin/env node
/** Creates Fix First .webp assets next to sources (Master Sheet — Fix First tab). */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { fixFirstRenames } = JSON.parse(
  readFileSync(join(root, "scripts/image-seo-pass1.json"), "utf8")
);

let ok = 0;
let skip = 0;
for (const { from, to } of fixFirstRenames) {
  const src = join(root, "public", from);
  const dest = join(root, "public", to);
  if (!existsSync(src)) {
    console.warn("missing source:", from);
    skip++;
    continue;
  }
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  ok++;
}
console.log(`fix-first webp: wrote ${ok}, skipped ${skip}`);