import type { Metadata } from "next";

/** Same site favicon as root — reunion-src-logo.jpeg only */
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/reunion-src-logo.jpeg", type: "image/jpeg", sizes: "any" }],
    apple: "/reunion-src-logo.jpeg",
    shortcut: "/reunion-src-logo.jpeg",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
