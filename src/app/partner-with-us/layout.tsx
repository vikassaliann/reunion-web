import type { Metadata } from "next";
import { PARTNER_FAQS } from "@/data/pageFaqs";
import { buildFaqPageSchema } from "@/lib/faqSchema";

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

const partnerFaqSchema = buildFaqPageSchema(PARTNER_FAQS);

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {partnerFaqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerFaqSchema) }} />
      ) : null}
      {children}
    </>
  );
}
