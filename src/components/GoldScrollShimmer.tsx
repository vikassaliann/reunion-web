"use client";

import { useEffect, useState } from "react";

export default function GoldScrollShimmer() {
  const [scrollY, setScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY);
      
      setScrollY(currentY);
      setVelocity(Math.min(delta, 60)); // Cap velocity intensity
      setIsScrolling(true);

      lastY = currentY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setVelocity(0);
      }, 150);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Compute dynamic opacities and shifts based on scroll position & velocity
  const baseGlow = 0.14 + (velocity / 60) * 0.22; // Boost brightness when actively scrolling
  const scaleBoost = 1 + (velocity / 60) * 0.18;
  const shiftY1 = (scrollY * 0.15) % 300;
  const shiftY2 = (scrollY * -0.12) % 250;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden md:hidden" aria-hidden="true">
      {/* Dynamic Gold Orb 1 — Top Right floating shimmer */}
      <div
        className="absolute -top-20 -right-20 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full blur-[90px] transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, rgba(201,168,76, ${baseGlow * 1.2}) 0%, rgba(201,168,76, 0.03) 65%, transparent 100%)`,
          transform: `translate3d(0, ${shiftY1}px, 0) scale(${scaleBoost})`,
          willChange: "transform, opacity",
        }}
      />

      {/* Dynamic Gold Orb 2 — Mid/Bottom Left floating shimmer */}
      <div
        className="absolute top-1/3 -left-24 w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] rounded-full blur-[85px] transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, rgba(212,175,55, ${baseGlow}) 0%, rgba(201,168,76, 0.02) 70%, transparent 100%)`,
          transform: `translate3d(0, ${shiftY2}px, 0) scale(${scaleBoost * 0.95})`,
          willChange: "transform, opacity",
        }}
      />

      {/* Dynamic Gold Scroll Line Beam — Sweeps down as user scrolls */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] h-[1px] transition-opacity duration-300"
        style={{
          top: `${(scrollY * 0.4) % 100}%`,
          background: `linear-gradient(90deg, transparent 0%, rgba(201,168,76,${isScrolling ? 0.35 : 0.08}) 50%, transparent 100%)`,
          opacity: isScrolling ? 0.8 : 0.25,
          filter: "blur(1px)",
        }}
      />

      {/* Dynamic Ambient Gold Particle/Light Dust shimmer */}
      <div
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full blur-[70px] transition-transform duration-500"
        style={{
          background: `radial-gradient(circle, rgba(201,168,76, ${baseGlow * 0.8}) 0%, transparent 80%)`,
          transform: `translate3d(${(scrollY * 0.05) % 50}px, ${-(scrollY * 0.08) % 80}px, 0)`,
        }}
      />
    </div>
  );
}
