import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Google still indexes the old property URL — send everyone to /dining
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
        destination: "/events",
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
        source: "/properties/ocean%20cafe/cafevd.mp4",
        destination: "/properties/ocean%20cafe/oceancafe.mp4",
        permanent: true,
      },
      {
        source: "/properties/ocean cafe/cafevd.mp4",
        destination: "/properties/ocean%20cafe/oceancafe.mp4",
        permanent: true,
      },
    ];
  },
  async headers() {
    const imageCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];
    // /_next/static is cached by Next.js itself — do not override
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
