import type { KeywordPageSeo } from "@/data/keywordGuide";

/** Disabled — FAQPage JSON-LD only when FAQs are shown on-page (property pages use their own schema). */
export default function KeywordFaqJsonLd(_props: { seo: KeywordPageSeo | undefined }) {
  return null;
}
