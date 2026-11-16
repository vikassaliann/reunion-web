#!/usr/bin/env node
/** Regenerates path-specific alts in imageAlt.ts from properties.json + beaches. */
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

const map = {};
const beaches = {
  "/properties/beaches/malpe-beach-udupi.webp": "Malpe Beach, Udupi",
  "/properties/beaches/mattu-beach-udupi.webp": "Mattu Beach, Udupi",
  "/properties/beaches/hoode-beach-udupi.webp": "Hoode Beach, Udupi",
  "/properties/beaches/st-marys-island-off-malpe-udupi.webp": "St. Mary's Island off Malpe, Udupi",
  "/properties/beaches/kapu-beach-udupi.webp": "Kapu Beach and lighthouse, Udupi district",
  "/properties/beaches/padubidri-blue-flag-beach-udupi.webp": "Padubidri Blue Flag Beach, Udupi",
  "/properties/beaches/uchila-beach-udupi.webp": "Uchila Beach, Udupi",
  "/properties/beaches/maravanthe-beach-udupi.webp": "Maravanthe Beach, Udupi",
  "/properties/beaches/delta-beach-udupi.webp": "Delta Beach, Udupi",
  "/properties/beaches/hejamadi-beach-udupi.webp": "Hejamadi Beach, Udupi",
};
Object.assign(map, beaches);

function placeSuffix(location) {
  const lower = (location || "").toLowerCase();
  if (lower.includes("shivamogga") || lower.includes("shimoga")) return location;
  if (lower.includes("udupi")) return location;
  return `${location}, Udupi`;
}

for (const p of properties) {
  const label = p.name.startsWith("REUNION") ? p.name : `REUNION ${p.name}`;
  const base = `${label} — ${placeSuffix(p.location)}`;
  const prefix = pass1.galleryPrefixByPropertyId?.[p.id];
  const seen = new Set();
  const ordered = [];
  for (const src of [p.heroImage, ...(p.gallery || [])].filter(Boolean)) {
    const path = src.split("?")[0];
    if (seen.has(path)) continue;
    seen.add(path);
    ordered.push(path);
  }
  if (prefix) {
    ordered.forEach((path, i) => {
      map[path] =
        pass1.fixFirstAlts?.[path] || `${prefix} — photo ${i + 1}`;
    });
  } else {
    for (const path of ordered) {
      map[path] = map[path] || base;
    }
  }
}

Object.assign(map, pass1.fixFirstAlts || {});

const redirectMap = JSON.parse(
  readFileSync(join(root, "scripts/image-redirect-map.json"), "utf8")
);
const allRenames = [
  ...(pass1.fixFirstRenames || []),
  ...(redirectMap.renames || []),
];
const legacyFrom = new Set(allRenames.map((r) => r.from));
const seenRename = new Set();
for (const { from, to } of allRenames) {
  if (seenRename.has(from)) continue;
  seenRename.add(from);
  if (map[from] && !map[to]) map[to] = map[from];
  if (!map[to] && map[from]) map[to] = map[from];
  delete map[from];
}
for (const key of Object.keys(map)) {
  if (legacyFrom.has(key)) delete map[key];
}

const extras = {
  "/properties/popular/reunion-ocean-elite-category-udupi.webp":
    "REUNION beach villa — Ocean Elite category, Udupi",
  "/properties/popular/reunion-ocean-givaah-category-udupi.webp":
    "Private pool villa — REUNION Ocean Givaah, Udupi",
  "/properties/popular/reunion-ocean-royal-category-udupi.webp":
    "Heritage beach stay — REUNION Ocean Royal, Kapu",
  "/properties/popular/reunion-de-homes-category-udupi.webp":
    "REUNION De Homes — Chitpady, Udupi",
  "/properties/popular/reunion-ocean-manor-category-udupi.webp":
    "REUNION Ocean Manor — Hoode Beach, Udupi",
  "/team/ceo.jpg": "Mrs. Kshama Kadamba — Managing Director, REUNION Global",
  "/properties/team/oneafter.jpeg": "Mr. Santhosh — Head Chef, REUNION Global",
  "/properties/team/two.jpeg": "Mr. Praveen Devadiga — Senior Manager, REUNION Global",
  "/properties/team/three.jpeg": "Mr. Manpreet Singh — Operational Manager, REUNION Global",
  "/properties/team/four.jpeg": "Mr. Nagaraj — Property Manager, REUNION Global",
  "/properties/team/twelve.jpeg": "Mr. Sumith Naik — HR & Marketing Manager, REUNION Global",
  "/properties/team/five.jpeg": "Mrs. Nayana Devadiga — Sales and Guest Relationship Executive, REUNION",
  "/properties/team/thirteen.jpeg": "Ms. Mhombeni Jami — Guest Service Executive, REUNION",
  "/properties/team/six.jpeg": "Mr. Ramesh — Front Desk Manager, REUNION Global",
  "/properties/team/eleven.jpeg": "Mr. Sachin Rawat — Chef, REUNION Global",
  "/properties/team/eight .jpeg": "Mr. Edward — Head Housekeeping, REUNION Global",
  "/properties/team/seven.jpeg": "Mr. Samanth — Housekeeping Associate, REUNION Global",
  "/properties/team/nine.jpeg": "Mr. Wonchio Odyuo — Housekeeping Associate, REUNION Global",
  "/properties/team/ten.jpeg": "Mr. Robin — Housekeeping Associate, REUNION Global",
  "/properties/const/nemmadi-constructions-project-udupi-1.webp":
    "Civil construction project by REUNION Global, Udupi",
  "/properties/const/nemmadi-constructions-project-udupi-2.webp":
    "Civil construction project by REUNION Global, Udupi",
  "/properties/const/nemmadi-constructions-project-udupi-3.webp":
    "Interior design and finishing — Nemmadi Constructions, Udupi",
  "/properties/const/nemmadi-constructions-project-udupi-4.webp":
    "Project finishing — Nemmadi Constructions, Udupi",
  "/properties/experiences/candlelight/bdy/bd.jpeg": "Beach birthday celebration at REUNION, Udupi",
  ...Object.fromEntries(
    [
      [1, "Coastal backwaters experience — REUNION Udupi"],
      [2, "Pili Vesha (tiger dance) cultural experience, coastal Karnataka"],
      [3, "Kambala buffalo race tradition near Udupi"],
      [4, "Bhuta Kola ritual art performance, coastal Karnataka"],
      [5, "Coastal Karnataka cultural experiences with REUNION"],
      [6, "Pili Vesha celebration on the Udupi coast"],
      [7, "Outdoor coastal dining and events at REUNION Udupi"],
      [8, "REUNION experiences and celebrations in Udupi"],
      [9, "Coastal Karnataka experiences curated by REUNION Udupi"],
      [10, "Weddings and group events at REUNION, Udupi coast"],
      [11, "Beachfront gatherings and events at REUNION Udupi"],
      [12, "Candlelight dinner setup on the Udupi coast"],
      [13, "Private candlelight dinner on a Udupi beach"],
      [14, "Romantic candlelight dining experience, Udupi"],
    ].map(([n, alt]) => [
      `/properties/experiences/reunion-experience-udupi-${n}.webp`,
      alt,
    ])
  ),
  "/wellness/tapovana-logo.jpg": "Tapovana — Nurturing Heritage, Enriching Wellness",
  "/blogs/itinerary/sri-krishna-matha.jpg": "Sri Krishna Matha temple in Udupi",
  "/blogs/itinerary/hasta-shilpa.jpg": "Hasta Shilpa Heritage Village, Manipal",
  "/blogs/itinerary/udupi-food.jpg": "Traditional Udupi vegetarian cuisine",
  "/blogs/tourist-places-hero.jpg": "Tourist places in Udupi — coastal view",
};
Object.assign(map, extras);

const lines = Object.entries(map)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);

const out = `/** Auto-generated path alts — run: node scripts/generate-image-alt-map.mjs */
import properties from "./properties.json";

const STATIC_ALT_BY_PATH: Record<string, string> = {
${lines.join("\n")}
};

const PROPERTY_BY_FOLDER: Record<string, { name: string; location: string }> = {};
for (const p of properties) {
  PROPERTY_BY_FOLDER[p.id] = { name: p.name, location: p.location };
}

function placeSuffix(location: string): string {
  const lower = location.toLowerCase();
  if (lower.includes("shivamogga") || lower.includes("shimoga")) return location;
  if (lower.includes("udupi")) return location;
  return \`\${location}, Udupi\`;
}

function normalizeSrc(src: string): string {
  return src.split("?")[0];
}

export function altFor(src: string, fallback: string): string {
  const normalized = normalizeSrc(src);
  if (STATIC_ALT_BY_PATH[normalized]) return STATIC_ALT_BY_PATH[normalized];
  const match = normalized.match(/^\\/properties\\/([^/]+)\\//);
  if (match) {
    const prop = PROPERTY_BY_FOLDER[match[1]];
    if (prop) {
      const label = prop.name.startsWith("REUNION") ? prop.name : \`REUNION \${prop.name}\`;
      return \`\${label} — \${placeSuffix(prop.location)}\`;
    }
  }
  const file = normalized.split("/").pop()!;
  const keys = Object.keys(STATIC_ALT_BY_PATH);
  const tail = keys.find((k) => k.endsWith(file));
  if (tail) return STATIC_ALT_BY_PATH[tail];
  return fallback;
}

export function propertyCardAlt(name: string, location: string): string {
  const label = name.startsWith("REUNION") ? name : \`REUNION \${name}\`;
  return \`\${label} — \${placeSuffix(location)}\`;
}

export function heroImageAlt(heroSrc: string, name: string, location: string): string {
  return altFor(heroSrc, propertyCardAlt(name, location));
}

export function galleryPhotoAlt(label: string, index: number, total?: number): string {
  if (total && total > 1) {
    return \`\${label} — photo \${index + 1} of \${total}\`;
  }
  return \`\${label} — photo \${index + 1}\`;
}
`;

writeFileSync(join(root, "src/data/imageAlt.ts"), out);
console.log(`imageAlt.ts: ${Object.keys(map).length} static paths`);