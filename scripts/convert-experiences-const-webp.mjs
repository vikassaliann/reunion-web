#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const redirectPath = join(root, "scripts/image-redirect-map.json");
const doc = JSON.parse(readFileSync(redirectPath, "utf8"));
const fromSet = new Set(doc.renames.map((r) => r.from));

const added = [];

for (let n = 1; n <= 14; n++) {
  const from = `/properties/experiences/exp${n}.png`;
  const to = `/properties/experiences/reunion-experience-udupi-${n}.webp`;
  const src = join(root, "public", from);
  const dest = join(root, "public", to);
  if (!existsSync(src)) continue;
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  if (!fromSet.has(from)) {
    added.push({ from, to });
    fromSet.add(from);
  }
  unlinkSync(src);
}

const constMap = [
  ["p1.png", "nemmadi-constructions-project-udupi-1.webp"],
  ["p2.png", "nemmadi-constructions-project-udupi-2.webp"],
  ["p3.png", "nemmadi-constructions-project-udupi-3.webp"],
  ["p4.png", "nemmadi-constructions-project-udupi-4.webp"],
];
for (const [oldName, newName] of constMap) {
  const from = `/properties/const/${oldName}`;
  const to = `/properties/const/${newName}`;
  const src = join(root, "public", from);
  const dest = join(root, "public", to);
  if (!existsSync(src) && existsSync(dest)) continue;
  if (existsSync(src)) {
    await sharp(src).webp({ quality: 82 }).toFile(dest);
    unlinkSync(src);
  }
  if (!fromSet.has(from)) {
    added.push({ from, to });
    fromSet.add(from);
  }
}

doc.renames.push(...added);
writeFileSync(redirectPath, JSON.stringify(doc, null, 2));
console.log(`converted experiences + const: +${added.length} redirects`);