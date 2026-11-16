#!/usr/bin/env node
/**
 * Beaches → webp, experiances → experiences, ocean cafe → ocean-cafe.
 * Run: node scripts/apply-url-polish.mjs
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  renameSync,
  readdirSync,
  statSync,
  unlinkSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const polish = JSON.parse(readFileSync(join(root, "scripts/url-polish.json"), "utf8"));
const redirectPath = join(root, "scripts/image-redirect-map.json");
const redirectDoc = JSON.parse(readFileSync(redirectPath, "utf8"));
const existingFrom = new Set(redirectDoc.renames.map((r) => r.from));

const added = [];

for (const [name, webp] of Object.entries(polish.beachWebp)) {
  const from = `/properties/beaches/${name}.png`;
  const to = `/properties/beaches/${webp}`;
  const src = join(root, "public", from);
  const dest = join(root, "public", to);
  if (!existsSync(src)) {
    console.warn("beach missing:", from);
    continue;
  }
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  if (!existingFrom.has(from)) {
    added.push({ from, to });
    existingFrom.add(from);
  }
}

for (const { from, to } of polish.folderMoves) {
  const fromAbs = join(root, from);
  const toAbs = join(root, to);
  if (existsSync(fromAbs) && !existsSync(toAbs)) {
    renameSync(fromAbs, toAbs);
    console.log("moved", from, "→", to);
  } else if (existsSync(toAbs)) {
    console.log("folder already:", to);
  }
}

function walkPublic(dirAbs, baseUrlPrefix) {
  const out = [];
  for (const name of readdirSync(dirAbs)) {
    const p = join(dirAbs, name);
    if (statSync(p).isDirectory()) walkPublic(p, `${baseUrlPrefix}${name}/`, out);
    else if (!name.startsWith(".")) out.push(`${baseUrlPrefix}${name}`);
  }
  return out;
}

const expOld = join(root, "public/properties/experiances");
const expNew = join(root, "public/properties/experiences");
if (existsSync(expNew)) {
  for (const oldUrl of walkPublic(expNew, "/properties/experiances/")) {
    const newUrl = oldUrl.replace("/properties/experiances/", "/properties/experiences/");
    if (oldUrl !== newUrl && !existingFrom.has(oldUrl)) {
      added.push({ from: oldUrl, to: newUrl });
      existingFrom.add(oldUrl);
    }
  }
}

const cafeNew = join(root, "public/properties/ocean-cafe");
if (existsSync(cafeNew)) {
  for (const fileUrl of walkPublic(cafeNew, "/properties/ocean-cafe/")) {
    for (const prefix of ["/properties/ocean cafe/", "/properties/ocean%20cafe/"]) {
      const oldUrl = fileUrl.replace("/properties/ocean-cafe/", prefix);
      if (!existingFrom.has(oldUrl)) {
        added.push({ from: oldUrl, to: fileUrl });
        existingFrom.add(oldUrl);
      }
    }
  }
}

redirectDoc.renames.push(...added);
writeFileSync(redirectPath, JSON.stringify(redirectDoc, null, 2));

const sorted = [...redirectDoc.renames].sort((a, b) => b.from.length - a.from.length);
function replaceAll(text) {
  let out = text;
  for (const { from, to } of sorted) {
    out = out.split(from).join(to);
  }
  for (const { fromPrefix, toPrefix } of polish.pathPrefixRedirects) {
    out = out.split(fromPrefix).join(toPrefix);
  }
  return out;
}

function walkSrc(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walkSrc(p, files);
    } else if (/\.(ts|tsx|json|mjs)$/.test(name)) {
      files.push(p);
    }
  }
  return files;
}

let touched = 0;
const skipSrc = new Set([
  join(root, "src/data/redirectMap.ts"),
]);
for (const file of walkSrc(join(root, "src"))) {
  if (skipSrc.has(file)) continue;
  const before = readFileSync(file, "utf8");
  const after = replaceAll(before);
  if (after !== before) {
    writeFileSync(file, after);
    touched++;
  }
}

const blogsPath = join(root, "src/data/blogs.ts");
let blogs = readFileSync(blogsPath, "utf8");
const beachEntries = Object.entries(polish.beachWebp)
  .map(([k, v]) => `  ${k}: "/properties/beaches/${v}",`)
  .join("\n");
blogs = blogs.replace(
  /const BEACH_WEBP: Record<string, string> = \{[\s\S]*?\};/,
  `const BEACH_WEBP: Record<string, string> = {
  malpe: "/properties/beaches/malpe-beach-udupi.webp",
  mattu: "/properties/beaches/mattu-beach-udupi.webp",
  hoode: "/properties/beaches/hoode-beach-udupi.webp",
  stmarys: "/properties/beaches/st-marys-island-off-malpe-udupi.webp",
${beachEntries}
};`
);
writeFileSync(blogsPath, blogs);

for (const name of Object.keys(polish.beachWebp)) {
  const png = join(root, "public/properties/beaches", `${name}.png`);
  if (existsSync(png)) unlinkSync(png);
}

console.log(`url-polish: +${added.length} redirects, updated ${touched} src files`);