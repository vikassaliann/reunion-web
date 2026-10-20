"use client";

import { useState } from "react";
import Link from "next/link";
import type { KeywordPageSeo } from "@/data/keywordGuide";

type Props = {
  seo: KeywordPageSeo;
  /** Skip headings already shown elsewhere (e.g. Overview on property pages). */
  skipHeadings?: string[];
  hideFaqs?: boolean;
  hideLinks?: boolean;
  className?: string;
  light?: boolean;
};

export default function KeywordSeoSections({
  seo,
  skipHeadings = [],
  hideFaqs = false,
  hideLinks = false,
  className = "",
  light = false,
}: Props) {
  const [faqOpen, setFaqOpen] = useState(false);
  const skip = new Set(skipHeadings.map((h) => h.toLowerCase()));
  const sections = seo.sections.filter((s) => !skip.has(s.heading.toLowerCase()));
  const text = light ? "text-[#1a1410]/80" : "text-white/70";
  const muted = light ? "text-[#1a1410]/45" : "text-white/40";
  const faqQ = light ? "text-[#1a1410]/90" : "text-white";
  const faqA = light ? "text-[#1a1410]/60" : "text-white/60";
  const border = light ? "border-black/10" : "border-white/10";

  return (
    <div className={`space-y-12 ${className}`}>
      {sections.map((section) => (
        <div key={section.heading} className="space-y-4">
          <h2 className={`font-futura text-[11px] tracking-[0.3em] uppercase ${muted}`}>
            {section.heading}
          </h2>
          <p className={`font-futura text-sm md:text-[15px] leading-[2] font-light tracking-wide ${text}`}>
            {section.body}
          </p>
        </div>
      ))}

      {!hideLinks && seo.links.length > 0 && (
        <div className="space-y-3">
          <h2 className={`font-futura text-[11px] tracking-[0.3em] uppercase ${muted}`}>
            Explore next
          </h2>
          <p className={`font-futura text-[13px] font-light tracking-wide ${muted}`}>
            {seo.links.map((link, i) => (
              <span key={link.href + link.label}>
                {i > 0 ? " · " : null}
                <Link href={link.href} className="text-[#C9A84C] hover:opacity-80 transition-opacity">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      )}

      {!hideFaqs && seo.faqs.length > 0 && (
        <div className={`space-y-4 pt-2 border-t ${border}`}>
          <button
            type="button"
            onClick={() => setFaqOpen(!faqOpen)}
            className="w-full flex items-center justify-between py-4 group"
          >
            <h2 className={`font-futura text-[11px] tracking-[0.3em] uppercase ${text} group-hover:opacity-100`}>
              FAQs
            </h2>
            <span className="text-[#C9A84C] text-xl leading-none">{faqOpen ? "−" : "+"}</span>
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${faqOpen ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="space-y-6 pb-2">
              {seo.faqs.map((faq) => (
                <div key={faq.q} className="space-y-2">
                  <p className={`font-futura text-[13px] tracking-wide uppercase ${faqQ}`}>{faq.q}</p>
                  <p className={`font-futura text-[13px] font-light leading-relaxed ${faqA}`}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
