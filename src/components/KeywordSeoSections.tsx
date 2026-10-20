import type { KeywordPageSeo } from "@/data/keywordGuide";

type Props = {
  seo: KeywordPageSeo;
  skipHeadings?: string[];
  hideFaqs?: boolean;
  hideLinks?: boolean;
  className?: string;
  light?: boolean;
};

/** Disabled — keyword boilerplate / FAQs were cluttering every page. */
export default function KeywordSeoSections(_props: Props) {
  return null;
}
