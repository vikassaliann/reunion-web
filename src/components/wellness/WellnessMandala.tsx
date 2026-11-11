/** Decorative mandala SVGs — wellness & blogs */

/** Round trig results so SSR + client SVG attrs always match */
function r(n: number) {
  return Math.round(n * 1000) / 1000;
}

export function MandalaRing({
  className = "",
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return {
      x1: r(200 + Math.cos(a) * 90),
      y1: r(200 + Math.sin(a) * 90),
      x2: r(200 + Math.cos(a) * 180),
      y2: r(200 + Math.sin(a) * 180),
    };
  });

  const dots = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    const rad = i % 2 === 0 ? 165 : 135;
    return {
      cx: r(200 + Math.cos(a) * rad),
      cy: r(200 + Math.sin(a) * rad),
    };
  });

  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    return {
      cx: r(200 + Math.cos(a) * 60),
      cy: r(200 + Math.sin(a) * 60),
    };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g stroke="#c9b57a" strokeWidth="0.6" opacity={opacity}>
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="90" />
        {rays.map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
        ))}
        {dots.map((dot, i) => (
          <circle key={`p-${i}`} cx={dot.cx} cy={dot.cy} r="2.5" fill="#c9b57a" stroke="none" />
        ))}
      </g>
      <g stroke="#c9b57a" strokeWidth="0.5" opacity={opacity * 1.2}>
        {petals.map((petal, i) => (
          <circle key={`petal-${i}`} cx={petal.cx} cy={petal.cy} r="28" />
        ))}
      </g>
    </svg>
  );
}

export function MandalaLotus({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g stroke="#c9b57a" strokeWidth="0.8" opacity="0.35">
        {[0, 45, 90, 135].map((deg) => (
          <ellipse
            key={deg}
            cx="60"
            cy="60"
            rx="18"
            ry="42"
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
        <circle cx="60" cy="60" r="8" fill="#c9b57a" fillOpacity="0.2" stroke="#c9b57a" />
      </g>
    </svg>
  );
}

export function MandalaCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M0 40 Q40 40 40 0 M0 20 Q20 20 20 0 M0 60 Q60 60 60 0"
        stroke="#c9b57a"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <circle cx="40" cy="40" r="3" fill="#c9b57a" opacity="0.5" />
    </svg>
  );
}
