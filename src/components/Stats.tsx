"use client";

import { useEffect, useRef } from "react";

export default function Stats() {
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLSpanElement;
          const target = parseInt(el.dataset.target || "0");
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toString();
            if (current >= target) clearInterval(timer);
          }, 16);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    statRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const statsData = [
    { value: 17, label: "Total Properties" },
    { value: 8, label: "Beach Properties" },
    { value: 7, label: "City Properties" },
    { value: 1, label: "Hotel" },
    { value: 1, label: "Beach Cafe" }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 border-t border-antique-gold/25 mt-20 pt-16 reveal reveal-delay-1 justify-center">
      {statsData.map((stat, idx) => (
        <div key={idx} className="text-center">
          <span 
            className="block font-display-xl text-[44px] md:text-[52px] text-primary mb-2 font-normal" 
            data-target={stat.value.toString()} 
            ref={(el) => { statRefs.current[idx] = el; }}
          >
            0
          </span>
          <span className="text-on-surface-variant font-label-caps text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-semibold block px-2 leading-relaxed">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
