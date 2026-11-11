import type { KeywordPageSeo } from "@/data/keywordGuide";

export default function KeywordFaqJsonLd({
  seo,
  faqs,
}: {
  seo: KeywordPageSeo | undefined;
  faqs?: { q: string; a: string }[];
}) {
  const list = faqs?.length ? faqs : seo?.faqs;
  if (!list?.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
