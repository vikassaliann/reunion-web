import Link from "next/link";
import type { KeywordPageSeo } from "@/data/keywordGuide";

type Props = {
  seo: KeywordPageSeo;
  skipHeadings?: string[];
  hideFaqs?: boolean;
  hideLinks?: boolean;
  className?: string;
  light?: boolean;
  /** Section intro above the card grid */
  showIntro?: boolean;
  introEyebrow?: string;
  introTitle?: string;
};

/** Strip repetitive keyword-guide boilerplate from section bodies */
export function trimSeoSectionBody(body: string): string {
  let text = body.trim();
  if (text.toLowerCase().startsWith("this section covers ")) {
    const dot = text.indexOf(". ");
    if (dot > 10) text = text.slice(dot + 2).trim();
  }
  const marker = "REUNION is based in Udupi, Karnataka";
  const idx = text.indexOf(marker);
  if (idx > 60) text = text.slice(0, idx).trim();
  if (text.length > 320) return `${text.slice(0, 320).trim()}…`;
  return text;
}

export default function KeywordSeoSections({
  seo,
  skipHeadings = [],
  hideFaqs = true,
  hideLinks = false,
  className = "",
  light = false,
  showIntro = true,
  introEyebrow = "Good to know",
  introTitle = "Your guide to REUNION in Udupi",
}: Props) {
  const skip = new Set(skipHeadings.map((h) => h.toLowerCase()));
  const sections = seo.sections.filter((s) => !skip.has(s.heading.toLowerCase()));

  if (!sections.length && (hideFaqs || !seo.faqs.length) && (hideLinks || !seo.links.length)) {
    return null;
  }

  const gold = light ? "#B8963E" : "#C9A84C";
  const cardBg = light ? "bg-[#1a1410]/[0.03]" : "bg-white/[0.02]";
  const cardBorder = light ? "border-[#1a1410]/12" : "border-white/10";
  const textBody = light ? "text-[#1a1410]/70" : "text-white/60";
  const textHeading = light ? "text-[#1a1410]" : "text-white/90";
  const textMuted = light ? "text-[#1a1410]/50" : "text-white/45";

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {showIntro && sections.length > 0 ? (
        <header className="text-center max-w-2xl mx-auto mb-8 md:mb-12 px-1">
          <p
            className="font-futura text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
            style={{ color: gold }}
          >
            {introEyebrow}
          </p>
          <h2
            className={`font-cormorant text-[1.65rem] sm:text-3xl md:text-[2rem] font-light tracking-wide mt-3 leading-snug ${textHeading}`}
          >
            {introTitle}
          </h2>
          <div
            className="w-12 h-px mx-auto mt-5 opacity-40"
            style={{ backgroundColor: gold }}
          />
        </header>
      ) : null}

      {sections.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 list-none p-0 m-0">
          {sections.map((section, index) => (
            <li
              key={section.heading}
              className={`group relative rounded-sm border ${cardBorder} ${cardBg} p-5 sm:p-6 md:p-7 transition-colors duration-300 hover:border-[#C9A84C]/25 ${
                sections.length % 2 === 1 && index === sections.length - 1
                  ? "md:col-span-2 md:max-w-xl md:mx-auto md:w-full"
                  : ""
              }`}
            >
              <div
                className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: gold }}
                aria-hidden
              />
              <h2
                className="font-futura text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em] uppercase pl-3 sm:pl-4 mb-2.5 sm:mb-3 leading-relaxed"
                style={{ color: gold }}
              >
                {section.heading}
              </h2>
              <p
                className={`font-futura text-[13px] sm:text-sm font-light leading-relaxed sm:leading-[1.75] tracking-wide pl-3 sm:pl-4 ${textBody}`}
              >
                {trimSeoSectionBody(section.body)}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {!hideLinks && seo.links.length > 0 ? (
        <nav
          aria-label="Related links"
          className={`mt-8 md:mt-10 pt-6 md:pt-8 border-t ${cardBorder}`}
        >
          <p
            className={`font-futura text-[10px] tracking-[0.35em] uppercase text-center mb-4 ${textMuted}`}
          >
            Explore more
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {seo.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center min-h-[40px] px-3.5 sm:px-4 py-2 rounded-sm border font-futura text-[10px] sm:text-[11px] tracking-[0.12em] uppercase transition-all duration-200 hover:bg-[#C9A84C]/10"
                  style={{
                    borderColor: light ? "rgba(26,20,16,0.15)" : "rgba(201,168,76,0.35)",
                    color: gold,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {!hideFaqs && seo.faqs.length > 0 ? (
        <div className={`space-y-4 pt-8 mt-8 border-t ${cardBorder}`}>
          <h2
            className="font-futura text-[11px] tracking-[0.3em] uppercase text-center"
            style={{ color: gold }}
          >
            FAQs
          </h2>
          {seo.faqs.map((faq) => (
            <div key={faq.q} className={`rounded-sm border ${cardBorder} p-4 sm:p-5`}>
              <h3 className={`font-futura text-sm ${textHeading} font-light mb-2`}>{faq.q}</h3>
              <p className={`font-futura text-sm font-light leading-relaxed ${textBody}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}