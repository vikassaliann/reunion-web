#!/usr/bin/env node
/** Encode sources as .webp alongside originals (Master Sheet redirect map). */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { renames } = JSON.parse(
  readFileSync(join(root, "scripts/image-redirect-map.json"), "utf8")
);

let ok = 0;
let skip = 0;
for (const { from, to } of renames) {
  const src = join(root, "public", from);
  const dest = join(root, "public", to);
  if (!existsSync(src)) {
    console.warn("missing:", from);
    skip++;
    continue;
  }
  await sharp(src).webp({ quality: 82, effort: 4 }).toFile(dest);
  ok++;
}
console.log(`apply-image-redirects: wrote ${ok}, skipped ${skip}`);