/**
 * Fact Register (AEO / Master Sheet) — confirmed copy only.
 * Update after Sumith verifies; do not publish disputed claims without FactsConfirmed.
 */

/** Office / org address shown on contact, footer, Organization JSON-LD */
export const REUNION_OFFICE_ADDRESS = {
  streetAddress: "REUNION Global, Coastal Karnataka operations",
  addressLocality: "Udupi",
  addressRegion: "Karnataka",
  postalCode: "576101",
  addressCountry: "IN",
  display: "REUNION Global — Udupi, Karnataka 576101 (stays, Ocean Café & events)",
} as const;

/** Fact Check: ocean-givaah private pool — confirmed in properties.json description */
export const OCEAN_GIVAAH_POOL_CONFIRMED = true;

/** Not on website until Fact Register + property pages exist */
export const LISTINGS_HOLD_PUBLISH = [
  "Reunion Abode Villa",
  "Solandis",
  "Amity",
] as const;
