"use client";

import { useCallback, useState } from "react";
import { MandalaLotus } from "@/components/wellness/WellnessMandala";

export default function DiwaliGreetingModal() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 280);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/45 transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="diwali-greeting-title"
      onClick={dismiss}
    >
      <div
        className={`relative w-full max-w-sm bg-white px-8 py-10 sm:py-11 text-center border border-[#e8e4dc] shadow-xl ${
          leaving ? "opacity-0 translate-y-1 transition-all duration-300" : "nav-dropdown-open"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-4 text-[#6b5d4f]/50 hover:text-[#1a1410] text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <MandalaLotus className="w-8 h-8 mx-auto mb-5 opacity-40" />

        <h2
          id="diwali-greeting-title"
          className="font-futura font-light text-2xl sm:text-3xl text-[#1a1410] uppercase tracking-wide leading-tight mb-6"
        >
          Happy <span className="text-[#B8963E]">Diwali</span>
        </h2>

        <blockquote className="mb-8">
          <p className="font-cormorant italic text-lg sm:text-xl text-stone-warm font-light leading-relaxed">
            &ldquo;This Diwali, may your days be bright with family—and keep creating memories, one reunion at a
            time.&rdquo;
          </p>
          <cite className="mt-4 block font-cinzel text-[10px] tracking-[0.35em] text-[#B8963E] uppercase not-italic">
            — Reunion
          </cite>
        </blockquote>

        <button
          type="button"
          onClick={dismiss}
          className="w-full py-3.5 border border-[#C9A84C] bg-transparent text-[#B8963E] font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
