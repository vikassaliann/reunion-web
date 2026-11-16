/** Flip to false when blog guides are ready to publish again. */
export const BLOGS_UNDER_MAINTENANCE = false;

/** Home page Diwali greeting overlay — set false after the festival. */
export const DIWALI_GREETING_ENABLED = false;

/**
 * Visible H2 “keyword guide” block at the bottom of hub pages (data still lives in keywordGuide.ts for title/meta/verify).
 * Off by default — crawlers read rendered HTML, not the TS file; main copy + FAQs stay on-page for SEO/AEO.
 */
export const SHOW_KEYWORD_GUIDE_SECTIONS = false;
