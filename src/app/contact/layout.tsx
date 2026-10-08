import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const PAGE_TITLE = "REUNION | Contact — Book Stays & Dining";
const PAGE_DESCRIPTION =
  "Contact REUNION to enquire about luxury beach and city villas, premium suites, Ocean Café dining, candlelight dinners, and event venues in Udupi.";

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
