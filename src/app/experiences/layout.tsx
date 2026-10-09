import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const PAGE_TITLE = "REUNION | Experiences at Reunion — Coastal Celebrations in Udupi";
const PAGE_DESCRIPTION =
  "Discover experiences at REUNION in Udupi — coastal celebrations, cultural moments, candlelight dinners and curated gatherings by the Arabian Sea.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/experiences` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/experiences`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Experiences" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
