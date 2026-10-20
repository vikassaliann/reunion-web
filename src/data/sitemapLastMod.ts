/** Staggered lastmod dates for sitemap (dev brief — not identical timestamps). */
const D = (iso: string) => new Date(iso);

export const SITEMAP_LAST_MOD: Record<string, Date> = {
  "/": D("2026-10-16T00:00:00.000Z"),
  "/properties": D("2026-10-16T00:00:00.000Z"),
  "/properties/category/beach-villas": D("2026-10-10T00:00:00.000Z"),
  "/properties/category/city-stays": D("2026-10-10T00:00:00.000Z"),
  "/properties/category/hotel-stays": D("2026-10-14T00:00:00.000Z"),
  "/properties/category/shivamogga-stays": D("2026-10-14T00:00:00.000Z"),
  "/dining": D("2026-10-12T00:00:00.000Z"),
  "/experiences": D("2026-10-11T00:00:00.000Z"),
  "/experiences/candlelight-dinner": D("2026-10-15T00:00:00.000Z"),
  "/experiences/beach-birthday": D("2026-10-15T00:00:00.000Z"),
  "/wellness": D("2026-10-08T00:00:00.000Z"),
  "/events": D("2026-10-16T00:00:00.000Z"),
  "/events/beach-venue": D("2026-10-16T00:00:00.000Z"),
  "/civil-construction": D("2026-10-01T00:00:00.000Z"),
  "/partner-with-us": D("2026-10-05T00:00:00.000Z"),
  "/blogs": D("2026-10-16T00:00:00.000Z"),
  "/about": D("2026-09-20T00:00:00.000Z"),
  "/contact": D("2026-09-20T00:00:00.000Z"),
};

export const BLOG_LAST_MOD: Record<string, Date> = {
  "tourist-places-in-udupi": D("2025-10-01T00:00:00.000Z"),
  "top-10-beaches-to-visit-in-udupi": D("2025-10-01T00:00:00.000Z"),
  "2-day-udupi-itinerary": D("2025-10-01T00:00:00.000Z"),
  "mattu-beach-udupi": D("2026-10-16T00:00:00.000Z"),
  "bangalore-to-udupi-weekend-trip": D("2026-10-16T00:00:00.000Z"),
  "things-to-do-in-udupi": D("2026-10-16T00:00:00.000Z"),
  "best-restaurants-in-udupi": D("2026-10-16T00:00:00.000Z"),
};

export const PROPERTY_LAST_MOD: Record<string, Date> = {
  "ocean-waves": D("2026-10-16T00:00:00.000Z"),
  "ocean-elite": D("2026-10-14T00:00:00.000Z"),
  "ocean-manor": D("2026-10-14T00:00:00.000Z"),
  "de-homes": D("2026-10-12T00:00:00.000Z"),
  "de-square": D("2026-10-14T00:00:00.000Z"),
  "reunion-serene": D("2026-10-20T00:00:00.000Z"),
};

export function lastModForPath(path: string, fallback = new Date()): Date {
  return SITEMAP_LAST_MOD[path] ?? fallback;
}

export function lastModForProperty(id: string, fallback = new Date()): Date {
  return PROPERTY_LAST_MOD[id] ?? D("2026-10-01T00:00:00.000Z");
}

export function lastModForBlog(slug: string, fallback = new Date()): Date {
  return BLOG_LAST_MOD[slug] ?? D("2025-10-01T00:00:00.000Z");
}
