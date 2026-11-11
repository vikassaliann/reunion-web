import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

const PAGE_TITLE = "Partner With REUNION | Villa Management, Udupi";
const PAGE_DESCRIPTION =
  "Partner with REUNION — hospitality and villa management in Udupi, Karnataka. List your property for professional marketing, guest operations, and revenue growth.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/partner-with-us` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/partner-with-us`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080 }],
  },
};

const partnerFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I list my villa with REUNION?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — REUNION partners with property owners across Udupi and Coastal Karnataka for hospitality management.",
      },
    },
    {
      "@type": "Question",
      name: "What does REUNION manage for partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marketing, guest operations, housekeeping coordination, and revenue optimisation.",
      },
    },
  ],
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerFaqSchema) }} />
      {children}
    </>
  );
}
