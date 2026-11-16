import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import imageRedirects from "./scripts/image-redirect-map.json";

const fixFirstImageRedirects = (imageRedirects.renames ?? []).map(
  ({ from, to }: { from: string; to: string }) => ({
    source: from,
    destination: to,
    permanent: true as const,
  })
);

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [100, 75],
  },
  async redirects() {
    return [
      {
        source: "/properties/de-square",
        destination: "/properties/d-square",
        permanent: true,
      },
      {
        source: "/properties/reunion-de-square/:path*",
        destination: "/properties/reunion-d-square/:path*",
        permanent: true,
      },
      {
        source: "/events/beach-venue",
        destination: "/events#private-beach-venue",
        permanent: true,
      },
      {
        source: "/properties/ocean-cafe",
        destination: "/dining",
        permanent: true,
      },
      {
        source: "/properties/reunion-seren",
        destination: "/properties/reunion-serene",
        permanent: true,
      },
      {
        source: "/properties/experiances/:path*",
        destination: "/properties/experiences/:path*",
        permanent: true,
      },
      {
        source: "/properties/ocean%20cafe/:path*",
        destination: "/properties/ocean-cafe/:path*",
        permanent: true,
      },
      {
        source: "/properties/ocean cafe/:path*",
        destination: "/properties/ocean-cafe/:path*",
        permanent: true,
      },
      {
        source: "/properties/ocean-cafe/cafevd.mp4",
        destination: "/properties/ocean-cafe/oceancafe.mp4",
        permanent: true,
      },
      {
        source: "/properties/ocean%20cafe/cafevd.mp4",
        destination: "/properties/ocean-cafe/oceancafe.mp4",
        permanent: true,
      },
      {
        source: "/properties/ocean cafe/cafevd.mp4",
        destination: "/properties/ocean-cafe/oceancafe.mp4",
        permanent: true,
      },
      ...fixFirstImageRedirects,
    ];
  },
  async headers() {
    const imageCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];
    return [
      {
        source: "/properties/:path*",
        headers: imageCache,
      },
      {
        source: "/blogs/:path*",
        headers: imageCache,
      },
      {
        source: "/wellness/:path*",
        headers: imageCache,
      },
      {
        source: "/team/:path*",
        headers: imageCache,
      },
      {
        source: "/logoo.png",
        headers: imageCache,
      },
      {
        source: "/reunion-src-logo.jpeg",
        headers: imageCache,
      },
      {
        source: "/assets/:path*",
        headers: imageCache,
      },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();