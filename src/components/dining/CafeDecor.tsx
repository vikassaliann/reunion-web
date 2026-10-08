/** Café-themed SVG accents for the dining page */

export function CoffeeSteam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" className={className} aria-hidden>
      <path
        d="M18 48c0-8 4-14 4-22M24 48c0-10 5-16 5-24M30 48c0-7 3-12 3-20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <ellipse cx="24" cy="52" rx="14" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

export function MenuDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="flex-1 h-px bg-[#c9a84c]/25" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#c9a84c]/50" />
      <span className="flex-1 h-px bg-[#c9a84c]/25" />
    </div>
  );
}

export function WaveSteamPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 28 Q25 18 50 28 T100 28 T150 28 T200 28 V40 H0 Z"
        fill="currentColor"
        opacity="0.06"
      />
    </svg>
  );
}
