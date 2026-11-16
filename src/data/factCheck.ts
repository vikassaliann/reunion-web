/**
 * Fact Register (AEO / GEO Plan v2) — confirmed copy only.
 * Office line matches De Homes / Expedia listing (Fact Register #59) until GBP is re-confirmed.
 */

export const REUNION_CONTACT_EMAIL = "support@reunionglobal.in";
export const REUNION_PHONE_DISPLAY = "+91 99802 08289";
export const REUNION_PHONE_TEL = "+91-99802-08289";
/** Digits only — `tel:`, WhatsApp wa.me, API defaults */
export const REUNION_PHONE_TEL_HREF = "tel:+919980208289";
export const REUNION_WHATSAPP_DIGITS = "919980208289";

/** Entity consistency — canonical profile URLs (not share links) */
export const REUNION_FACEBOOK_URL =
  "https://www.facebook.com/people/Reunionteam19/61573352801402/";
export const REUNION_INSTAGRAM_URL = "https://www.instagram.com/reunionteam19";
export const REUNION_YOUTUBE_URL = "https://www.youtube.com/@reunionteam19";
export const REUNION_SOCIAL_SAME_AS = [
  REUNION_FACEBOOK_URL,
  REUNION_INSTAGRAM_URL,
  REUNION_YOUTUBE_URL,
] as const;

export const REUNION_CAFE_PHONE_DISPLAY = "+91 99722 31289";
export const REUNION_DE_HOMES_PHONE_DISPLAY = "+91 93807 40060";

/** Office / org address — contact, footer, Organization JSON-LD */
export const REUNION_OFFICE_ADDRESS = {
  streetAddress: "2nd Floor, UB Square, Court Road, Kadekoppala, Chitpady",
  addressLocality: "Udupi",
  addressRegion: "Karnataka",
  postalCode: "576101",
  addressCountry: "IN",
  display:
    "2nd Floor, UB Square, Court Road, Chitpady, Udupi, Karnataka 576101 — REUNION reservations & operations",
} as const;

/** Fact Check: ocean-givaah private pool — confirmed in properties.json description */
export const OCEAN_GIVAAH_POOL_CONFIRMED = true;

/** Not on website until Fact Register + property pages exist */
export const LISTINGS_HOLD_PUBLISH = [
  "Reunion Abode Villa",
  "Solandis",
  "Amity",
] as const;
