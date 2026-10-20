"use client";

import { useCallback, useEffect, useState } from "react";

export type EventsGallerySlide = {
  image: string;
  title: string;
  caption: string;
};

interface EventsGalleryCarouselProps {
  slides: readonly EventsGallerySlide[];
  ariaLabel?: string;
}

export default function EventsGalleryCarousel({
  slides,
  ariaLabel = "Events & Weddings gallery",
}: EventsGalleryCarouselProps) {
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

  useEffect(() => {
    const id = window.setInterval(goNext, 5000);
    return () => window.clearInterval(id);
  }, [goNext]);

  const prevIdx = (active - 1 + n) % n;
  const nextIdx = (active + 1) % n;
  const current = slides[active];

  return (
    <section className="w-full" aria-label={ariaLabel}>
      <div className="relative flex items-center justify-center min-h-[440px] md:min-h-[560px] lg:min-h-[620px] px-2 md:px-8">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 md:left-2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-white/35 hover:text-[#C9A84C] transition-colors text-2xl md:text-3xl font-light"
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="flex items-center justify-center w-full max-w-6xl mx-auto gap-3 md:gap-6 lg:gap-10">
          <button
            type="button"
            onClick={goPrev}
            className="hidden sm:block relative w-[20%] max-w-[150px] aspect-[3/4] shrink-0 overflow-hidden opacity-40 scale-[0.86] translate-y-3 transition-all duration-700 hover:opacity-55 ring-1 ring-white/10"
          >
            <img
              src={slides[prevIdx].image}
              alt=""
              className="w-full h-full object-cover grayscale-[25%]"
            />
          </button>

          <div className="relative w-[78%] sm:w-[50%] md:w-[46%] max-w-lg aspect-[3/4] shrink-0 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] ring-1 ring-[#C9A84C]/30">
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover transition-opacity duration-700"
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            className="hidden sm:block relative w-[20%] max-w-[150px] aspect-[3/4] shrink-0 overflow-hidden opacity-40 scale-[0.86] translate-y-3 transition-all duration-700 hover:opacity-55 ring-1 ring-white/10"
          >
            <img
              src={slides[nextIdx].image}
              alt=""
              className="w-full h-full object-cover grayscale-[25%]"
            />
          </button>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 md:right-2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-white/35 hover:text-[#C9A84C] transition-colors text-2xl md:text-3xl font-light"
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
              i === active ? "w-10 bg-[#C9A84C]" : "w-3 bg-white/20 hover:bg-[#C9A84C]/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
