#!/usr/bin/env node
/** Builds image-redirect-map.json from properties.json + sheet naming rules + pass1 Fix First. */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const properties = JSON.parse(
  readFileSync(join(root, "src/data/properties.json"), "utf8")
);
const pass1 = JSON.parse(
  readFileSync(join(root, "scripts/image-seo-pass1.json"), "utf8")
);

/** photo: numbered gallery; hero set via pass1 fixFirstRenames */
const PHOTO = {
  "aradhya-villa": (n) =>
    `/properties/aradhya-villa/reunion-aradhya-villa-photo-udupi-${n}.webp`,
  arya: (n) => `/properties/arya/reunion-arya-studio-photo-udupi-${n}.webp`,
  "charm-villa": (n) =>
    `/properties/charm-villa/reunion-charm-villa-photo-udupi-${n}.webp`,
  "de-homes": (n) =>
    `/properties/de-homes/reunion-de-homes-photo-udupi-${n}.webp`,
  "d-square": (n) =>
    `/properties/reunion-d-square/reunion-d-square-photo-koteshwara-udupi-${n}.webp`,
  krshna: (n) =>
    `/properties/krshna/reunion-krishna-photo-manipal-udupi-${n}.webp`,
  "marina-villa": (n) =>
    `/properties/marina-villa/reunion-marina-villa-photo-udupi-${n}.webp`,
  "ocean-bliss": (n) =>
    `/properties/ocean-bliss/reunion-ocean-bliss-photo-malpe-udupi-${n}.webp`,
  "ocean-daaffy": (n) =>
    `/properties/ocean-daaffy/reunion-ocean-daaffy-photo-uchila-udupi-${n}.webp`,
  "ocean-elite": (n) =>
    `/properties/ocean-elite/reunion-ocean-elite-photo-hoode-beach-udupi-${n}.webp`,
  "ocean-givaah": (n) =>
    `/properties/ocean-givaah/reunion-ocean-givaah-photo-uchila-udupi-${n}.webp`,
  "ocean-hridayam": (n) =>
    `/properties/ocean-hridayam/reunion-ocean-hridayam-photo-mattu-beach-udupi-${n}.webp`,
  "ocean-manor": (n) =>
    `/properties/ocean-manor/reunion-ocean-manor-photo-hoode-beach-udupi-${n}.webp`,
  "ocean-royal": (n) =>
    `/properties/ocean-royal/reunion-ocean-royal-photo-kapu-udupi-${n}.webp`,
  "ocean-waves": (n) =>
    `/properties/ocean-waves/reunion-ocean-waves-photo-mattu-beach-udupi-${n}.webp`,
  "regal-villa": (n) =>
    `/properties/regal-villa/reunion-regal-villa-photo-udupi-${n}.webp`,
  "reunion-serene": (n) =>
    `/properties/reunion-serene/reunion-serene-photo-shivamogga-${n}.webp`,
  villa: (n) => `/properties/villa/reunion-villa-photo-udupi-${n}.webp`,
};

const STATIC_EXTRA = [
  { from: "/properties/const/p1.png", to: "/properties/const/nemmadi-constructions-project-udupi-1.webp" },
  { from: "/properties/const/p2.png", to: "/properties/const/nemmadi-constructions-project-udupi-2.webp" },
  { from: "/properties/ocean cafe/herooc.png", to: "/properties/ocean cafe/reunion-ocean-cafe-hero-mattu-beach-udupi.webp" },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    from: `/properties/ocean cafe/oc${n}.png`,
    to: `/properties/ocean cafe/reunion-ocean-cafe-photo-mattu-beach-udupi-${n}.webp`,
  })),
  { from: "/properties/ocean cafe/ocean1.png", to: "/properties/ocean cafe/reunion-ocean-cafe-photo-mattu-beach-udupi-7.webp" },
  { from: "/properties/ocean cafe/ocean4.png", to: "/properties/ocean cafe/reunion-ocean-cafe-photo-mattu-beach-udupi-8.webp" },
  { from: "/properties/popular/elite.png", to: "/properties/popular/reunion-ocean-elite-category-udupi.webp" },
  { from: "/properties/popular/givaah.png", to: "/properties/popular/reunion-ocean-givaah-category-udupi.webp" },
  { from: "/properties/popular/royal.png", to: "/properties/popular/reunion-ocean-royal-category-udupi.webp" },
  { from: "/properties/popular/dehome.png", to: "/properties/popular/reunion-de-homes-category-udupi.webp" },
  { from: "/properties/popular/manoor.png", to: "/properties/popular/reunion-ocean-manor-category-udupi.webp" },
  { from: "/blogs/itinerary/hasta-shilpa.jpg", to: "/blogs/itinerary/hasta-shilpa-heritage-village-manipal.webp" },
  { from: "/blogs/itinerary/udupi-food.jpg", to: "/blogs/itinerary/udupi-vegetarian-cuisine.webp" },
];

function isSeoWebp(path) {
  if (!path.endsWith(".webp")) return false;
  const base = path.split("/").pop() || "";
  return (
    base.startsWith("reunion-") ||
    base.startsWith("malpe-") ||
    base.startsWith("mattu-") ||
    base.startsWith("hoode-") ||
    base.startsWith("st-marys") ||
    base.startsWith("sri-krishna") ||
    base.startsWith("tourist-places") ||
    base.startsWith("hasta-shilpa") ||
    base.startsWith("udupi-vegetarian") ||
    base.startsWith("nemmadi-")
  );
}

function needsRename(from) {
  if (isSeoWebp(from)) return false;
  return true;
}

const fixFirst = pass1.fixFirstRenames ?? [];
const fixFirstFrom = new Set(fixFirst.map((r) => r.from));
const fixFirstTo = new Set(fixFirst.map((r) => r.to));

const generated = [];

for (const p of properties) {
  const mk = PHOTO[p.id];
  if (!mk) continue;
  const gallery = (p.gallery || []).filter(Boolean);
  const hero = p.heroImage?.split("?")[0];
  const seen = new Set();
  let n = 1;
  for (const src of gallery) {
    const from = src.split("?")[0];
    if (seen.has(from)) continue;
    seen.add(from);
    if (from === hero && fixFirstTo.has(hero)) continue;
    if (!needsRename(from)) continue;
    const to = mk(n++);
    if (from === to) continue;
    generated.push({ from, to });
  }
}

const all = [...fixFirst];
const fromSeen = new Set(fixFirstFrom);
for (const row of [...generated, ...STATIC_EXTRA]) {
  if (fromSeen.has(row.from)) continue;
  if (row.from === row.to) continue;
  fromSeen.add(row.from);
  all.push(row);
}

writeFileSync(
  join(root, "scripts/image-redirect-map.json"),
  JSON.stringify({ renames: all, generatedAt: new Date().toISOString() }, null, 2)
);
console.log(`image-redirect-map.json: ${all.length} renames (${fixFirst.length} fix-first + ${all.length - fixFirst.length} new)`);