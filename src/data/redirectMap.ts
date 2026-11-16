import imageRedirects from "../../scripts/image-redirect-map.json";

/**
 * SEO Master Sheet — URL redirects (keep in sync with next.config.ts redirects).
 * Used for audits and Screaming Frog expectations.
 */
export const IMAGE_ASSET_REDIRECTS = (imageRedirects.renames ?? []).map(
  ({ from, to }) => ({ from, to, permanent: true as const })
);

export const SEO_REDIRECTS = [
  { from: "/properties/de-square", to: "/properties/d-square", permanent: true },
  { from: "/properties/reunion-de-square/*", to: "/properties/reunion-d-square/*", permanent: true },
  { from: "/events/beach-venue", to: "/events#private-beach-venue", permanent: true },
  { from: "/properties/ocean-cafe", to: "/dining", permanent: true },
  { from: "/properties/reunion-seren", to: "/properties/reunion-serene", permanent: true },
  { from: "/properties/experiances/:path*", to: "/properties/experiences/:path*", permanent: true },
  { from: "/properties/ocean cafe/:path*", to: "/properties/ocean-cafe/:path*", permanent: true },
  { from: "/properties/ocean%20cafe/:path*", to: "/properties/ocean-cafe/:path*", permanent: true },
  { from: "/properties/ocean-cafe/cafevd.mp4", to: "/properties/ocean-cafe/oceancafe.mp4", permanent: true },
  { from: "/properties/ocean cafe/cafevd.mp4", to: "/properties/ocean-cafe/oceancafe.mp4", permanent: true },
  { from: "/properties/ocean%20cafe/cafevd.mp4", to: "/properties/ocean-cafe/oceancafe.mp4", permanent: true },
  ...IMAGE_ASSET_REDIRECTS,
] as const;