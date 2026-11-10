/** Report 4 — descriptive alt text for high-frequency images */

const ALT_BY_PATH: Record<string, string> = {
  "/properties/beaches/mattu.png": "Mattu Beach, Udupi — golden sand and Arabian Sea",
  "/properties/beaches/malpe.png": "Malpe Beach, Udupi — harbour and Sea Walk",
  "/properties/beaches/hoode.png": "Hoode Beach, Udupi — open shoreline",
  "/properties/beaches/kapu.png": "Kapu Beach and lighthouse, Udupi district",
  "/properties/ocean-waves/wavest.png": "REUNION Ocean Waves — beachfront stay at Mattu Beach, Udupi",
  "/properties/ocean-hridayam/hridthumb.png": "REUNION Ocean Hridayam — 2BHK villa on Mattu Beach, Udupi",
  "/properties/ocean-bliss/blissthumb.png": "REUNION Ocean Bliss — villa near Malpe Beach, Udupi",
  "/properties/ocean-elite/thumbelite.png": "REUNION Ocean Elite — beach villa at Hoode Beach, Udupi",
  "/properties/ocean-manor/manorthumb.png": "REUNION Ocean Manor — beachfront villa at Hoode Beach, Udupi",
  "/properties/ocean-givaah/givaahthumb.png": "REUNION Ocean Givaah — pool villa near Uchila Beach, Udupi",
  "/properties/ocean-royal/royalthumb.png": "REUNION Ocean Royal — heritage beach house at Kapu, Udupi",
  "/properties/de-homes/dehomesthumb.png": "REUNION De Homes — suites near Sri Krishna Temple, Udupi",
  "/properties/krshna/krthumb.png": "REUNION Krshna — heritage stay in Manipal, Udupi",
  "/properties/ocean cafe/herooc.png": "REUNION Ocean Café on Mattu Beach, Udupi at sunset",
};

export function altFor(src: string, fallback: string): string {
  const normalized = src.split("?")[0];
  if (ALT_BY_PATH[normalized]) return ALT_BY_PATH[normalized];
  const keys = Object.keys(ALT_BY_PATH);
  const match = keys.find((k) => normalized.endsWith(k.split("/").pop()!));
  if (match) return ALT_BY_PATH[match];
  return fallback;
}

export function propertyCardAlt(name: string, location: string): string {
  return `REUNION ${name} — ${location}, Udupi`;
}
