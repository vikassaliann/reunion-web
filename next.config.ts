import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Google still indexes the old property URL — send everyone to /dining
      {
        source: "/properties/ocean-cafe",
        destination: "/dining",
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
        source: "/icon.png",
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
