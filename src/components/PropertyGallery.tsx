"use client";

import { useState } from "react";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-12 md:py-24 bg-background w-full overflow-hidden relative">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12 flex justify-between items-end reveal active">
        <div>
           <p className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.3em] uppercase">Visual Journey</p>
           <h2 className="font-headline-lg text-headline-lg text-on-surface">The Gallery</h2>
        </div>
        <div className="flex gap-4">
           <button onClick={prev} className="p-3.5 border border-antique-gold/30 text-primary hover:bg-antique-gold hover:text-obsidian-deep transition-all flex items-center justify-center">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
               <line x1="19" y1="12" x2="5" y2="12"/>
               <polyline points="12 19 5 12 12 5"/>
             </svg>
           </button>
           <button onClick={next} className="p-3.5 border border-antique-gold/30 text-primary hover:bg-antique-gold hover:text-obsidian-deep transition-all flex items-center justify-center">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
               <line x1="5" y1="12" x2="19" y2="12"/>
               <polyline points="12 5 19 12 12 19"/>
             </svg>
           </button>
        </div>
      </div>
      
      <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center">
        {images.map((src, index) => {
          let offset = index - currentIndex;
          // Handle wrap around smoothly
          if (offset < -images.length / 2) offset += images.length;
          if (offset > images.length / 2) offset -= images.length;
          
          const isActive = offset === 0;
          const isPrev = offset === -1;
          const isNext = offset === 1;
          
          let translateX = '0%';
          let scale = 1;
          let zIndex = 0;
          let opacity = 0;
          
          if (isActive) {
            translateX = '0%';
            scale = 1;
            zIndex = 30;
            opacity = 1;
          } else if (isPrev) {
            translateX = '-60%';
            scale = 0.85;
            zIndex = 20;
            opacity = 0.4;
          } else if (isNext) {
            translateX = '60%';
            scale = 0.85;
            zIndex = 20;
            opacity = 0.4;
          } else if (Math.abs(offset) === 2) {
             translateX = offset > 0 ? '110%' : '-110%';
             scale = 0.7;
             zIndex = 10;
             opacity = 0.1;
          }

          return (
            <div 
              key={index} 
              className="absolute top-1/2 left-1/2 w-[85vw] md:w-[60vw] h-[50vh] md:h-[70vh] cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: isActive || isPrev || isNext ? 'auto' : 'none'
              }}
              onClick={() => {
                if (isNext) next();
                if (isPrev) prev();
              }}
            >
              <div className="w-full h-full border border-antique-gold/30 p-2 glow-card">
                <img 
                  src={src} 
                  alt={`Gallery Image ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0' : 'grayscale-[50%]'}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-12">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-[2px] transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-primary' : 'w-4 bg-on-surface-variant/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
