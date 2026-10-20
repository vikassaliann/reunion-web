import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const CANONICAL = `${BASE_URL}/experiences/candlelight-dinner`;

/** Primary: candle light dinner in udupi / candlelight dinner udupi */
const PAGE_TITLE =
  "Candle Light Dinner in Udupi | REUNION Candlelight Dinner";
const PAGE_DESCRIPTION =
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
        url: `${BASE_URL}/properties/experiances/exp12.png`,
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
    images: [`${BASE_URL}/properties/experiances/exp12.png`],
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
    logo: `${BASE_URL}/reunion-src-logo.jpeg`,
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
  image: `${BASE_URL}/properties/experiances/exp12.png`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I book a candle light dinner in Udupi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a candle light dinner in Udupi with REUNION — private beachside candlelight dinners on Mattu Beach with romantic canopy setups, coastal cuisine, and personal hosting.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best candlelight dinner in Udupi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "REUNION offers a private candlelight dinner in Udupi on Mattu Beach — fairy lights, candles, custom menus, and sunset-to-starlight ambiance for proposals, anniversaries, and celebrations.",
      },
    },
    {
      "@type": "Question",
      name: "Is the REUNION candle light dinner on the beach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. REUNION’s candle light dinner in Udupi is hosted on Mattu Beach (and select Padutonse beach setups) with a private shoreline table by the Arabian Sea.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reserve a candlelight dinner in Udupi with REUNION?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the booking form on this page or enquire via WhatsApp. Share your preferred date, guest count, and occasion — we’ll confirm setup, menu, and timing for your candle light dinner in Udupi.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
