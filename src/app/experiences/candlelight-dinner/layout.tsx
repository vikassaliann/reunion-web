import type { Metadata } from "next";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";
const CANONICAL = BASE_URL + "/experiences/candlelight-dinner";

const seo = getKeywordSeo("/experiences/candlelight-dinner");
const PAGE_TITLE = seo?.title ?? "Candle Light Dinner in Udupi on Mattu Beach | REUNION";
const PAGE_DESCRIPTION =
  seo?.description ??
  "A private candlelight dinner on Mattu Beach, Udupi — romantic beachside setup and coastal cuisine for proposals and anniversaries.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "candle light dinner in udupi",
    "candle light dinner udupi",
    "candlelight dinner in udupi",
    "candlelight dinner udupi",
    "best candlelight dinner udupi",
    "reunion candlelight dinner",
    "romantic dinner udupi",
    "private candle light dinner udupi",
    "candlelight dinner mattu beach",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    siteName: "REUNION",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: BASE_URL + "/properties/experiances/exp12.png",
        width: 1200,
        height: 630,
        alt: "Candle light dinner in Udupi — REUNION beachside setup at Mattu Beach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [BASE_URL + "/properties/experiances/exp12.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Candle Light Dinner in Udupi — REUNION",
  alternateName: [
    "Candlelight Dinner in Udupi",
    "Candle Light Dinner Udupi",
    "Candlelight Dinner Udupi",
    "Best Candlelight Dinner Udupi",
    "REUNION Candlelight Dinner",
  ],
  description: PAGE_DESCRIPTION,
  url: CANONICAL,
  provider: {
    "@type": "Organization",
    name: "Reunion Global Private Ltd.",
    alternateName: "REUNION",
    url: BASE_URL,
    logo: BASE_URL + "/reunion-logo-black.png",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Udupi",
      containedInPlace: {
        "@type": "State",
        name: "Karnataka",
      },
    },
    {
      "@type": "Place",
      name: "Mattu Beach, Udupi",
    },
  ],
  serviceType: "Candle light dinner in Udupi",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: CANONICAL,
    priceCurrency: "INR",
    description: "Private candle light dinner in Udupi on Mattu Beach",
  },
  image: BASE_URL + "/properties/experiances/exp12.png",
};

export default function CandlelightDinnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
