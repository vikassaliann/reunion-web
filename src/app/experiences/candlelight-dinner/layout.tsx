import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const CANONICAL = `${BASE_URL}/experiences/candlelight-dinner`;

/** Target queries: reunion candlelight dinner, candlelight dinner udupi, candle light dinner udupi */
const PAGE_TITLE =
  "Candlelight Dinner in Udupi | REUNION Beachside Candle Light Dinner";
const PAGE_DESCRIPTION =
  "Book a Reunion candlelight dinner in Udupi — private beachside candle light dinner on Mattu Beach with romantic setup, coastal cuisine, and sunset views. Ideal for proposals, anniversaries and celebrations.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "candlelight dinner udupi",
    "candle light dinner udupi",
    "reunion candlelight dinner",
    "candlelight dinner mattu beach",
    "beachside candlelight dinner udupi",
    "romantic dinner udupi",
    "private candle light dinner udupi",
    "proposal dinner udupi beach",
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
        url: `${BASE_URL}/properties/experiances/exp12.png`,
        width: 1200,
        height: 630,
        alt: "Reunion candlelight dinner on Mattu Beach, Udupi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}/properties/experiances/exp12.png`],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Reunion Candlelight Dinner in Udupi",
  alternateName: [
    "Candlelight Dinner Udupi",
    "Candle Light Dinner Udupi",
    "Beachside Candlelight Dinner Mattu",
  ],
  description: PAGE_DESCRIPTION,
  url: CANONICAL,
  provider: {
    "@type": "Organization",
    name: "Reunion Global Private Ltd.",
    alternateName: "REUNION",
    url: BASE_URL,
  },
  areaServed: {
    "@type": "Place",
    name: "Udupi, Karnataka, India",
  },
  serviceType: "Private beachside candlelight dinner",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: CANONICAL,
    priceCurrency: "INR",
    description: "Private candle light dinner setup on Mattu Beach, Udupi",
  },
  image: `${BASE_URL}/properties/experiances/exp12.png`,
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
