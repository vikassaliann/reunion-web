"use client";

import { useCallback, useEffect, useState } from "react";
import type { OceanCafeGallerySlide } from "@/data/oceanCafePage";

interface OceanCafeGalleryCarouselProps {
  slides: readonly OceanCafeGallerySlide[];
  onOpenLightbox: (index: number) => void;
}

export default function OceanCafeGalleryCarousel({
  slides,
  onOpenLightbox,
}: OceanCafeGalleryCarouselProps) {
  const [active, setActive] = useState(0);
  const n = slides.length;

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const prevIdx = (active - 1 + n) % n;
  const nextIdx = (active + 1) % n;
  const current = slides[active];

  return (
    <section className="mb-16 md:mb-24 w-full" aria-label="Ocean Café gallery">
      <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[520px] lg:min-h-[580px] px-2 md:px-8">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 md:left-2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-[#e8dfd0]/40 hover:text-[#c9a84c] transition-colors text-2xl md:text-3xl font-light"
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="flex items-center justify-center w-full max-w-6xl mx-auto gap-3 md:gap-6 lg:gap-10">
          {/* Previous peek */}
          <button
            type="button"
            onClick={goPrev}
            className="hidden sm:block relative w-[22%] max-w-[160px] aspect-[3/4] shrink-0 overflow-hidden opacity-45 scale-[0.88] translate-y-2 transition-all duration-500 hover:opacity-60 ring-1 ring-[#c9a84c]/10"
          >
            <img
              src={slides[prevIdx].image}
              alt=""
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </button>

          {/* Active slide */}
          <button
            type="button"
            onClick={() => onOpenLightbox(active)}
            className="relative w-[72%] sm:w-[48%] md:w-[44%] max-w-md aspect-[3/4] shrink-0 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.45)] ring-1 ring-[#c9a84c]/25 group transition-transform duration-500"
          >
            <img
              src={current.image}
              alt={`Reunion Ocean Café — ${current.title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a110c]/95 via-[#1a110c]/35 to-transparent" />
            <div
              key={active}
              className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-center transition-opacity duration-300"
            >
              <h3 className="font-futura text-base md:text-xl text-[#f4ebe1] uppercase tracking-[0.16em] font-light mb-3 leading-snug">
                Reunion Ocean Café — {current.title}
              </h3>
              <p className="font-futura text-[11px] md:text-xs text-[#e8dfd0]/80 font-light leading-relaxed max-w-xs mx-auto">
                {current.caption}
              </p>
            </div>
          </button>

          {/* Next peek */}
          <button
            type="button"
            onClick={goNext}
            className="hidden sm:block relative w-[22%] max-w-[160px] aspect-[3/4] shrink-0 overflow-hidden opacity-45 scale-[0.88] translate-y-2 transition-all duration-500 hover:opacity-60 ring-1 ring-[#c9a84c]/10"
          >
            <img
              src={slides[nextIdx].image}
              alt=""
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </button>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 md:right-2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-[#e8dfd0]/40 hover:text-[#c9a84c] transition-colors text-2xl md:text-3xl font-light"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-[2px] transition-all duration-300 ${
              i === active ? "w-10 bg-[#c9a84c]" : "w-3 bg-[#e8dfd0]/20 hover:bg-[#c9a84c]/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
