import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const PAGE_TITLE = "REUNION | Candlelight Dinner — Beachside Romance at Mattu";
const PAGE_DESCRIPTION =
  "Book a private candlelight dinner with REUNION on Mattu Beach — romantic beachside dining, sunset ambience, and curated coastal cuisine in Udupi.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/experiences/candlelight-dinner` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/experiences/candlelight-dinner`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Candlelight Dinner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function CandlelightDinnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
