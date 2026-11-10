import Link from "next/link";
import type { KeywordPageSeo } from "@/data/keywordGuide";

type Props = {
  seo: KeywordPageSeo;
  skipHeadings?: string[];
  hideFaqs?: boolean;
  hideLinks?: boolean;
  className?: string;
  light?: boolean;
};

/** Strip repetitive keyword-guide boilerplate from section bodies */
export function trimSeoSectionBody(body: string): string {
  const marker = "REUNION is based in Udupi, Karnataka";
  const idx = body.indexOf(marker);
  if (idx > 60) return body.slice(0, idx).trim();
  if (body.length > 380) return `${body.slice(0, 380).trim()}…`;
  return body;
}

export default function KeywordSeoSections({
  seo,
  skipHeadings = [],
  hideFaqs = true,
  hideLinks = false,
  className = "",
  light = false,
}: Props) {
  const skip = new Set(skipHeadings.map((h) => h.toLowerCase()));
  const sections = seo.sections.filter((s) => !skip.has(s.heading.toLowerCase()));

  if (!sections.length && (hideFaqs || !seo.faqs.length) && (hideLinks || !seo.links.length)) {
    return null;
  }

  const textMuted = light ? "text-white/55" : "text-white/55";
  const textBody = light ? "text-white/60" : "text-white/60";
  const border = light ? "border-white/10" : "border-white/10";
  const gold = "#C9A84C";

  return (
    <div className={`space-y-10 ${className}`}>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2
            className={`font-futura text-[11px] tracking-[0.3em] uppercase mb-3`}
            style={{ color: gold }}
          >
            {section.heading}
          </h2>
          <p className={`font-futura text-sm font-light leading-relaxed tracking-wide ${textBody}`}>
            {trimSeoSectionBody(section.body)}
          </p>
        </section>
      ))}

      {!hideLinks && seo.links.length > 0 ? (
        <nav aria-label="Related links" className={`pt-4 border-t ${border}`}>
          <p className={`font-futura text-[12px] font-light tracking-wide ${textMuted}`}>
            {seo.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 ? " · " : null}
                <Link href={link.href} className="text-[#C9A84C] hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </nav>
      ) : null}

      {!hideFaqs && seo.faqs.length > 0 ? (
        <div className={`space-y-4 pt-4 border-t ${border}`}>
          <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase">
            FAQs
          </h2>
          {seo.faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-futura text-sm text-white/85 font-light mb-1">{faq.q}</h3>
              <p className={`font-futura text-sm font-light leading-relaxed ${textMuted}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
