import { buildFaqPageSchema } from "@/lib/faqSchema";
import type { KeywordPageSeo } from "@/data/keywordGuide";
import JsonLdScript from "@/components/JsonLdScript";

export default function KeywordFaqJsonLd({ seo }: { seo: KeywordPageSeo | undefined }) {
  if (!seo?.faqs?.length) return null;
  return <JsonLdScript data={buildFaqPageSchema(seo.faqs)} />;
}
