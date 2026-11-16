"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
  light?: boolean;
  showTopBorder?: boolean;
  noDividers?: boolean;
  className?: string;
  /** Open the first question on load (default: all collapsed). */
  openFirst?: boolean;
  /** Page accent (e.g. wellness gold). */
  accentColor?: string;
};

export default function ExpandablePageFaq({
  faqs,
  title = "Frequently asked questions",
  subtitle = "Quick answers before you book or enquire.",
  light = false,
  showTopBorder = false,
  noDividers = false,
  className = "",
  openFirst = false,
  accentColor,
}: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() =>
    openFirst && faqs.length > 0 ? { 0: true } : ({} as Record<number, boolean>),
  );

  if (!faqs.length) return null;

  const border = light ? "border-[#1a1410]/12" : "border-white/10";
  const panelBg = light ? "bg-[#1a1410]/[0.03]" : "bg-white/[0.02]";
  const text = light ? "text-[#1a1410]" : "text-white";
  const muted = light ? "text-[#1a1410]/60" : "text-white/55";
  const gold = accentColor ?? (light ? "#B8963E" : "#C9A84C");

  const toggle = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section
      className={`w-full max-w-3xl mx-auto ${showTopBorder ? `border-t ${border} pt-10 md:pt-14` : "pt-0"} ${className}`}
      aria-labelledby="page-faq-heading"
    >
      <header className="text-center max-w-xl mx-auto mb-6 md:mb-8 px-1">
        <h2
          id="page-faq-heading"
          className="font-cormorant text-[1.5rem] sm:text-2xl md:text-[1.75rem] font-light tracking-wide"
          style={{ color: light ? "#1a1410" : undefined }}
        >
          <span className={light ? "text-[#1a1410]" : "text-white"}>{title}</span>
        </h2>
        {subtitle ? (
          <p className={`font-futura text-xs sm:text-sm font-light tracking-wide mt-2 leading-relaxed ${muted}`}>
            {subtitle}
          </p>
        ) : null}
        <div className="w-10 h-px mx-auto mt-4 opacity-40" style={{ backgroundColor: gold }} />
      </header>

      <div className={`rounded-sm border ${border} ${panelBg} overflow-hidden`}>
        <ul className="list-none p-0 m-0">
          {faqs.map((faq, i) => {
            const isOpen = !!expanded[i];
            return (
              <li
                key={faq.q}
                className={
                  noDividers && i === faqs.length - 1
                    ? ""
                    : i < faqs.length - 1
                      ? `border-b ${border}`
                      : ""
                }
              >
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => toggle(i)}
                  className={`w-full flex items-start justify-between gap-3 sm:gap-4 text-left px-4 sm:px-6 py-4 sm:py-5 min-h-[52px] transition-colors hover:bg-white/[0.03] ${
                    light ? "hover:bg-[#1a1410]/[0.04]" : ""
                  }`}
                >
                  <span className={`font-futura text-[13px] sm:text-sm ${text} font-light tracking-wide pr-2 leading-snug`}>
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border text-base leading-none transition-transform duration-200"
                    style={{
                      borderColor: `${gold}55`,
                      color: gold,
                      transform: isOpen ? "rotate(180deg)" : "none",
                    }}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                {isOpen ? (
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                    <p
                      className={`px-4 sm:px-6 pb-4 sm:pb-5 pt-0 font-futura text-[13px] sm:text-sm font-light leading-relaxed tracking-wide ${muted}`}
                    >
                      {faq.a}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}