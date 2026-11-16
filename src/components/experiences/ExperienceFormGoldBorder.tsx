import type { ReactNode } from "react";

/** Thin gold highlight that travels around the form (two opposite points on the ring). */
export default function ExperienceFormGoldBorder({ children }: { children: ReactNode }) {
  return (
    <div className="experience-form-gold-border relative overflow-hidden rounded-sm">
      <div className="experience-form-gold-border__ring" aria-hidden />
      <div className="experience-form-gold-border__inner relative z-10 rounded-sm bg-[#080808] px-5 py-6 sm:px-7 sm:py-8">
        {children}
      </div>
    </div>
  );
}