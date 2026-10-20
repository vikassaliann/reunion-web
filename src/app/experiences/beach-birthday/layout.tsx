import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const CANONICAL = `${BASE_URL}/experiences/beach-birthday`;

const PAGE_TITLE = "Beach Birthday Celebration in Udupi | REUNION";
const PAGE_DESCRIPTION =
  "Celebrate a birthday on the beach in Udupi — decorated beachside setup at Mattu Beach with dinner and cake. Packages for couples, families and groups.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/properties/experiances/candlelight/bdy/bd.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/properties/experiances/candlelight/bdy/bd.jpeg"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a beach birthday in Udupi cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Packages vary by guest count, décor, and catering — enquire with your date and we will share options.",
      },
    },
    {
      "@type": "Question",
      name: "Can you arrange a surprise birthday setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. REUNION specialises in surprise beach and villa birthday setups on Mattu Beach and at our Udupi stays.",
      },
    },
  ],
};

export default function BeachBirthdayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
