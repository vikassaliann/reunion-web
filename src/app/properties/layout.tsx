import type { Metadata } from "next";

/** Browser tab favicon for /properties/* (file: ./icon.jpeg + cache-busted links) */
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/reunion-src-logo.jpeg?v=2", type: "image/jpeg", sizes: "any" },
    ],
    apple: [{ url: "/reunion-src-logo.jpeg?v=2", type: "image/jpeg" }],
    shortcut: "/reunion-src-logo.jpeg?v=2",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
