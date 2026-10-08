"use client";

import { useRef, useState } from "react";
import properties from "../data/properties.json";
import Link from "next/link";

export default function PropertyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftVal, setScrollLeftVal] = useState(0);

  const next = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (trackRef.current) {
      trackRef.current.classList.add("cursor-grabbing");
      setStartX(e.pageX - trackRef.current.offsetLeft);
      setScrollLeftVal(trackRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.classList.remove("cursor-grabbing");
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.classList.remove("cursor-grabbing");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeftVal - walk;
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-[#080808]" id="properties">
      {/* Postcard Style Centered Header */}
      <div className="text-center mb-10 md:mb-14 reveal">
        <h2 className="font-futura text-xl sm:text-2xl md:text-3xl text-white font-light uppercase tracking-[0.3em]">
          THE RESIDENCES & VILLAS
        </h2>
      </div>

      {/* Horizontal Scroll Track — 4 visible cards on large screens */}
      <div className="relative group/carousel">
        <div
          className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-12 overflow-x-auto no-scrollbar pb-8 cursor-grab"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {properties.map((prop) => (
            <div
              className="flex-none w-[80vw] sm:w-[calc(50vw-24px)] lg:w-[calc(25vw-32px)] min-w-[280px] max-w-[420px] group/card cursor-pointer"
              key={prop.id}
            >
              <Link href={`/properties/${prop.id}`} className="block">
                {/* 3:4 Aspect Portrait Box — NO zoom on hover */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5 mb-4">
                  <img
                    src={prop.heroImage}
                    alt={prop.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Postcard Typography beneath card */}
                <div className="space-y-1">
                  <h3 className="font-futura text-[11px] sm:text-[12px] md:text-[13px] text-white uppercase tracking-[0.2em] font-medium group-hover/card:text-[#C9A84C] transition-colors leading-tight truncate">
                    {prop.name.toUpperCase().startsWith("REUNION ")
                      ? prop.name.toUpperCase()
                      : `REUNION ${prop.name.toUpperCase()}`}
                  </h3>
                  <p className="font-futura text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.25em] font-light">
                    {prop.location}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous property"
          className="absolute left-2 md:left-6 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/90 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 border border-white/20 shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="Next property"
          className="absolute right-2 md:right-6 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/90 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 border border-white/20 shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
