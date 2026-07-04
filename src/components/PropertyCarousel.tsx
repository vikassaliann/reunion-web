"use client";

import { useRef, useState } from "react";
import properties from "../data/properties.json";
import Link from "next/link";

const CAROUSEL_STYLES = [
  { width: "w-[290px] sm:w-[320px] md:w-[380px]", height: "h-[380px] md:h-[650px]", marginTop: "" }, // Portrait
  { width: "w-[300px] sm:w-[450px] md:w-[600px]", height: "h-[240px] md:h-[450px]", marginTop: "md:mt-12" }, // Landscape
  { width: "w-[280px] sm:w-[320px] md:w-[450px]", height: "aspect-square", marginTop: "" }, // Square
  { width: "w-[290px] sm:w-[320px] md:w-[380px]", height: "h-[420px] md:h-[750px]", marginTop: "md:-mt-12" }, // Tall Portrait
];

export default function PropertyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftVal, setScrollLeftVal] = useState(0);

  const next = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (trackRef.current) {
      trackRef.current.classList.add('cursor-grabbing');
      setStartX(e.pageX - trackRef.current.offsetLeft);
      setScrollLeftVal(trackRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.classList.remove('cursor-grabbing');
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.classList.remove('cursor-grabbing');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeftVal - walk;
  };  return (
    <section className="pt-10 pb-4 md:py-24 overflow-hidden" id="properties">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16 flex justify-between items-end reveal">
        <div>
          <p className="font-label-caps text-label-caps text-primary mb-4 tracking-widest">CURATED SELECTION</p>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Exclusive Properties</h2>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={prev} aria-label="Previous property" className="p-3.5 border border-antique-gold/30 text-primary hover:bg-antique-gold hover:text-obsidian-deep transition-all flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <button onClick={next} aria-label="Next property" className="p-3.5 border border-antique-gold/30 text-primary hover:bg-antique-gold hover:text-obsidian-deep transition-all flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
      <div 
        className="flex gap-8 px-margin-mobile md:px-margin-desktop overflow-x-auto no-scrollbar pb-12 reveal cursor-grab" 
        style={{ transitionDelay: '200ms' }}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {properties.map((prop, index) => {
          const style = CAROUSEL_STYLES[index % CAROUSEL_STYLES.length];
          return (
            <div className={`flex-none ${style.width} group cursor-pointer`} key={prop.id}>
              <Link href={`/properties/${prop.id}`} className="block">
                <div className={`relative ${style.height} ${style.marginTop} overflow-hidden border border-antique-gold/10 luxury-card-glow transition-all duration-700`}>
                  <img src={prop.heroImage} alt={prop.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                     <p className="font-label-caps text-[10px] text-primary mb-2 tracking-[0.3em] uppercase">{prop.location}</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{prop.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
