"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  title?: string;
  light?: boolean;
  /** Top rule above the FAQ block — off by default (parent sections often already separate). */
  showTopBorder?: boolean;
  /** No rules between questions (e.g. home). */
  noDividers?: boolean;
  className?: string;
};

export default function ExpandablePageFaq({
  faqs,
  title = "FAQs",
  light = false,
  showTopBorder = false,
  noDividers = false,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (!faqs.length) return null;

  const border = light ? "border-[#1a1410]/15" : "border-white/10";
  const text = light ? "text-[#1a1410]" : "text-white";
  const muted = light ? "text-[#1a1410]/55" : "text-white/55";
  const gold = light ? "#B8963E" : "#C9A84C";

  const toggle = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section
      className={`w-full pb-2 ${
        showTopBorder ? `border-t ${border} pt-10 md:pt-12` : "pt-0"
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-2 group text-left"
      >
        <h2
          className="font-futura text-[11px] tracking-[0.3em] uppercase"
          style={{ color: gold }}
        >
          {title}
        </h2>
        <span className="text-xl leading-none" style={{ color: gold }}>
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className={`mt-4 md:mt-6 space-y-1 ${muted}`}>
          {faqs.map((faq, i) => (
            <li
              key={faq.q}
              className={
                noDividers
                  ? "pb-5 last:pb-0"
                  : `border-b ${border} pb-4 ${i === faqs.length - 1 ? "border-b-0 pb-0" : ""}`
              }
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-4 text-left"
              >
                <span className={`font-futura text-sm ${text} font-light tracking-wide`}>
                  {faq.q}
                </span>
                <span className="shrink-0 text-lg" style={{ color: gold }}>
                  {expanded[i] ? "−" : "+"}
                </span>
              </button>
              {expanded[i] ? (
                <p className={`mt-3 font-futura text-sm font-light leading-relaxed tracking-wide ${muted}`}>
                  {faq.a}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
