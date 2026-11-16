#!/usr/bin/env node
/** Point CMS JSON + blogs at Fix First .webp paths (after apply-fix-first-webp). */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { fixFirstRenames } = JSON.parse(
  readFileSync(join(root, "scripts/image-seo-pass1.json"), "utf8")
);

function replaceAll(text, pairs) {
  let out = text;
  for (const { from, to } of pairs) {
    out = out.split(from).join(to);
  }
  return out;
}

const propsPath = join(root, "src/data/properties.json");
writeFileSync(
  propsPath,
  replaceAll(readFileSync(propsPath, "utf8"), fixFirstRenames)
);

const blogsPath = join(root, "src/data/blogs.ts");
let blogs = readFileSync(blogsPath, "utf8");
blogs = blogs.replace(
  /const beach = \(name: string\) => `\/properties\/beaches\/\$\{name\}\.png`;/,
  `const BEACH_WEBP: Record<string, string> = {
  malpe: "/properties/beaches/malpe-beach-udupi.webp",
  mattu: "/properties/beaches/mattu-beach-udupi.webp",
  hoode: "/properties/beaches/hoode-beach-udupi.webp",
  stmarys: "/properties/beaches/st-marys-island-off-malpe-udupi.webp",
};
const beach = (name: string) =>
  BEACH_WEBP[name] ?? \`/properties/beaches/\${name}.png\`;`
);
blogs = replaceAll(blogs, [
  {
    from: "/blogs/itinerary/sri-krishna-matha.jpg",
    to: "/blogs/itinerary/sri-krishna-matha-udupi.webp",
  },
  {
    from: "/blogs/tourist-places-hero.jpg",
    to: "/blogs/tourist-places-in-udupi-1.webp",
  },
]);
writeFileSync(blogsPath, blogs);

const extraTsx = [
  "src/app/page.tsx",
  "src/app/explore-udupi/page.tsx",
  "src/app/properties/page.tsx",
  "src/app/properties/category/[category]/page.tsx",
  "src/components/ReunionMapSection.tsx",
];
for (const rel of extraTsx) {
  const p = join(root, rel);
  writeFileSync(p, replaceAll(readFileSync(p, "utf8"), fixFirstRenames));
}

console.log(
  "sync-fix-first-urls: properties.json, blogs.ts, and",
  extraTsx.length,
  "pages updated"
);