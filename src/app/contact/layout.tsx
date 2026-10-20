import type { Metadata } from "next";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";
const seo = getKeywordSeo("/contact");
const PAGE_TITLE = seo?.title ?? "Contact REUNION | Book Villas & Ocean Café in Udupi";
const PAGE_DESCRIPTION =
  seo?.description ??
  "Contact REUNION to book luxury beach and city villas, Ocean Café tables, candlelight dinners and event venues in Udupi, Karnataka.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/contact`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "Contact REUNION" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
