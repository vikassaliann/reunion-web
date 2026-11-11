import type { FaqPair } from "@/lib/faqSchema";

const PLACEHOLDER_PATTERNS = [
  /Contact REUNION about/i,
  /our Udupi team will confirm for your dates/i,
  /Beach distance is in the overview/i,
  /REUNION can confirm walking time for your dates/i,
  /Capacity depends on layout — contact REUNION/i,
  /Confirm season and depth with REUNION/i,
  /Conditions vary by beach and season — ask REUNION/i,
  /contact REUNION for exact guest counts/i,
  /contact REUNION for a quote/i,
];

export function isPlaceholderFaqAnswer(answer: string): boolean {
  return PLACEHOLDER_PATTERNS.some((re) => re.test(answer));
}

/** Prefer property-specific FAQs when keyword-guide entries are placeholders. */
export function resolvePropertyFaqs(
  keywordFaqs: FaqPair[] | undefined,
  propertyFaqs: FaqPair[] | undefined,
): FaqPair[] {
  const keywordHasPlaceholder =
    keywordFaqs?.some((f) => isPlaceholderFaqAnswer(f.a)) ?? false;

  if (propertyFaqs?.length && (keywordHasPlaceholder || !keywordFaqs?.length)) {
    return propertyFaqs;
  }

  if (keywordFaqs?.length) {
    const filtered = keywordFaqs.filter((f) => !isPlaceholderFaqAnswer(f.a));
    if (filtered.length) return filtered;
  }

  return propertyFaqs ?? keywordFaqs ?? [];
}
