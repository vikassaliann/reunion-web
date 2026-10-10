"use client";

import { useEffect, useState } from "react";

type MapLoc = {
  name: string;
  x: number;
  y: number;
  link: string;
  desc: string;
  image: string;
};

/* Pins projected from PROPERTY_GEO + place labels; x always east of coastline (land). */
const MAP_LOCATIONS: MapLoc[] = [
  // North coast — Padutonse / Bengre
  { name: "Ocean Elite", x: 102, y: 68, link: "https://maps.app.goo.gl/i4qS8YbVEtMqgRFF7", desc: "Private Beachfront Villa, Padutonse", image: "/properties/popular/elite.png" },
  { name: "Ocean Manor", x: 106, y: 78, link: "https://maps.app.goo.gl/QDo2c3Fy8mufX5s77", desc: "Sea & River View Villa, Padutonse", image: "/properties/ocean-manor/herooo.png" },
  // Malpe
  { name: "Ocean Bliss", x: 108, y: 118, link: "https://maps.app.goo.gl/y27fBpfybGmGsvwH7", desc: "Cozy Malpe Beach Villa", image: "/properties/ocean-bliss/blissthumb.png" },
  // Udupi city belt (inland)
  { name: "Arya", x: 168, y: 120, link: "https://maps.app.goo.gl/bgDyEDBV22TvRQeLA", desc: "Modern Studio Rooms, Kunjibettu", image: "/properties/arya/aryathumb.png" },
  { name: "Aradhya Villa", x: 172, y: 130, link: "https://maps.app.goo.gl/h5PDhRjDrsTdj5dR8", desc: "Elegant Villa, Kunjibettu", image: "/properties/aradhya-villa/arathumb.png" },
  { name: "Charm Villa", x: 155, y: 128, link: "https://maps.app.goo.gl/AuEK46JEGCC1ygA78", desc: "Classic Heritage Villa, Badagabettu", image: "/properties/charm-villa/charmthub.png" },
  { name: "Marina Villa", x: 145, y: 138, link: "https://maps.app.goo.gl/X5jrFW2phFrZDRgg8", desc: "Luxury Residency, Kannarpady", image: "/properties/marina-villa/marinathumb.png" },
  { name: "Krshna", x: 205, y: 115, link: "https://maps.app.goo.gl/hXcpqtsWGWkXSxHh7", desc: "Premium Heritage Residency, Manipal", image: "/properties/krshna/krthumb.png" },
  { name: "De Homes", x: 158, y: 145, link: "https://share.google/AXOZTWONFB5kLZE0o", desc: "Bespoke Townhouse, Chitpady", image: "/properties/popular/dehome.png" },
  { name: "Regal Villa", x: 164, y: 152, link: "https://maps.app.goo.gl/P3NuZSXE29bcFPT19", desc: "Majestic Residency, Chitpady", image: "/properties/regal-villa/regalhero.png" },
  { name: "Reunion Villa", x: 152, y: 155, link: "https://maps.app.goo.gl/SJaK4GjhNkq9FKA29", desc: "Classic Private Villa, Chitpady", image: "/properties/villa/villahero.png" },
  // Mattu Beach
  { name: "Ocean Waves", x: 98, y: 175, link: "https://maps.app.goo.gl/DHikkppGEugCp3V19", desc: "Beachside Sanctuary, Mattu", image: "/properties/ocean-waves/wavest.png" },
  { name: "Ocean Hridayam", x: 104, y: 185, link: "https://maps.app.goo.gl/18cbsHn53VKXr5oa9", desc: "Tranquil Garden Villa, Mattu", image: "/properties/ocean-hridayam/hridthumb.png" },
  { name: "Reunion Ocean Café", x: 96, y: 192, link: "https://maps.app.goo.gl/r4RPLhfcNUP4ECd18", desc: "Beachside Cafe, Mattu Beach", image: "/properties/ocean cafe/ocean1.png" },
  // South coast — Kapu / Bada
  { name: "Ocean Daaffy", x: 100, y: 225, link: "https://maps.app.goo.gl/RN5CDoGUvA2sbm7j7", desc: "Charming Coastal Villa, Bada", image: "/properties/ocean-daaffy/daaffyhero.png" },
  { name: "Ocean Givaah", x: 98, y: 235, link: "https://maps.app.goo.gl/4Zau2oTbTh95BmxL6", desc: "Secluded Beachfront Villa, Bada", image: "/properties/popular/givaah.png" },
  { name: "Ocean Royal", x: 96, y: 245, link: "https://maps.app.goo.gl/R4LzcKq8bcPPS3ub6", desc: "Majestic Beachfront Villa, Kapu", image: "/properties/popular/royal.png" },
  // Outside coastal frame — Shivamogga
  { name: "Reunion Serene", x: 272, y: 48, link: "https://maps.app.goo.gl/LaQVdsY9a3BPDYf19", desc: "Malnad Nature Stay, Shivamogga", image: "/properties/reunion-seren/hero.png" },
];

export default function ReunionMapSection() {
  const [hoveredLoc, setHoveredLoc] = useState<number | null>(null);
  const [mobileActivePin, setMobileActivePin] = useState<number>(0);

  // Mobile only: cycle popup card through every property every 3s
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    let interval: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (interval) return;
      interval = setInterval(() => {
        setMobileActivePin((prev) => (prev + 1) % MAP_LOCATIONS.length);
      }, 3000);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    const sync = () => {
      if (mq.matches) start();
      else stop();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      stop();
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="reveal border-t border-[#C9A84C]/10 bg-[#080808] py-16 md:py-24" id="reunion-map">
      <div className="max-w-7xl mx-auto page-pad">
        <div className="text-center mb-10 md:mb-14">
          <span className="font-cinzel text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase block mb-3">Interactive Directory</span>
          <h2 className="font-cormorant text-[clamp(2rem,4vw,3.2rem)] font-light text-white leading-tight">
            Reunion <em className="text-[#C9A84C] italic">Udupi Map</em>
          </h2>
        </div>
{/* Interactive Black & Gold Coastal Udupi Map (Centered Square Layout) */}
            {/* Interactive Black & Gold Coastal Udupi Map (Centered Square Layout) */}
            <div className="w-full max-w-[640px] mx-auto flex items-center justify-center p-2 relative">
              <div className="w-full max-w-[580px] aspect-square relative bg-[#070707] border border-[#C9A84C]/15 rounded-lg select-none shadow-2xl">
                {/* Background Map Grid & Vector Art — clipped to container */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                <svg 
                  viewBox="0 0 300 300" 
                  className="absolute inset-0 w-full h-full object-cover opacity-75 z-0 pointer-events-none"
                >
                  {/* Lat/Long Grid Lines */}
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.08" />
                  <line x1="0" y1="150" x2="300" y2="150" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.08" />
                  <line x1="0" y1="225" x2="300" y2="225" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.08" />
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.08" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.08" />

                  {/* Coastline Path */}
                  <path 
                    d="M 85,0 Q 98,75 78,150 T 82,225 T 72,300" 
                    fill="none" 
                    stroke="#C9A84C" 
                    strokeWidth="1.8" 
                    strokeOpacity="0.45" 
                  />

                  {/* National Highway 66 (Inland) */}
                  <path 
                    d="M 230,0 C 242,75 212,150 238,225 C 248,260 228,300 232,300" 
                    fill="none" 
                    stroke="#C9A84C" 
                    strokeWidth="0.8" 
                    strokeDasharray="4 4" 
                    strokeOpacity="0.25" 
                  />

                  {/* Local Connection Roads */}
                  <path d="M 232,72 Q 160,75 90,77" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.15" />
                  <path d="M 226,130 Q 155,134 94,136" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.15" />
                  <path d="M 234,195 Q 165,192 80,192" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.15" />
                  <path d="M 236,245 Q 160,245 77,245" fill="none" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.15" />

                  {/* Geographical Labels */}
                  <text x="25" y="125" fill="#C9A84C" fillOpacity="0.15" fontSize="7" letterSpacing="0.4em" transform="rotate(-90 25 125)" className="font-cinzel select-none font-bold">ARABIAN SEA</text>
                  <text x="245" y="70" fill="#C9A84C" fillOpacity="0.15" fontSize="6" letterSpacing="0.2em" transform="rotate(90 245 70)" className="font-cinzel select-none">NH 66</text>
                  <text x="96" y="83" fill="#C9A84C" fillOpacity="0.2" fontSize="5.5" letterSpacing="0.15em" className="font-cinzel select-none font-semibold">BENGRE</text>
                  <text x="110" y="130" fill="#C9A84C" fillOpacity="0.2" fontSize="5.5" letterSpacing="0.15em" className="font-cinzel select-none font-semibold">MALPE</text>
                  <text x="94" y="187" fill="#C9A84C" fillOpacity="0.2" fontSize="5.5" letterSpacing="0.15em" className="font-cinzel select-none font-semibold">MATTU BEACH</text>
                  <text x="92" y="238" fill="#C9A84C" fillOpacity="0.2" fontSize="5.5" letterSpacing="0.15em" className="font-cinzel select-none font-semibold">KAPU BEACH</text>

                </svg>
                </div>{/* end overflow-hidden wrapper */}

                {/* Property Map Pins Overlay */}
                {MAP_LOCATIONS.map((loc, i) => {
                  const isHovered = hoveredLoc === i;
                  const isMobileActive = mobileActivePin === i;
                  const leftPercent = (loc.x / 300) * 100;
                  const topPercent = (loc.y / 300) * 100;

                  return (
                    <div
                      key={i}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                      onMouseEnter={() => setHoveredLoc(i)}
                      onMouseLeave={() => setHoveredLoc(null)}
                      onClick={() => {
                        if (typeof window !== "undefined" && window.innerWidth < 768) {
                          setMobileActivePin(i);
                          return;
                        }
                        window.open(loc.link, "_blank");
                      }}
                    >
                      {/* ── DESKTOP PIN (Image Badge with Gold Border) ── */}
                      <div className="hidden md:block relative">
                        {/* Pulsing Gold Glow Ring */}
                        <div 
                          className={`absolute -inset-1 rounded-full bg-[#C9A84C]/35 animate-ping pointer-events-none ${isHovered ? 'scale-150' : 'scale-100'}`}
                          style={{ animationDuration: isHovered ? "1.5s" : "2.8s" }}
                        />

                        {/* Property Hero Image Pin Badge */}
                        <div className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 overflow-hidden shadow-[0_0_10px_rgba(201,168,76,0.5)] ${
                          isHovered ? 'border-[#C9A84C] scale-125 z-30 shadow-[0_0_18px_rgba(201,168,76,0.9)]' : 'border-[#C9A84C]/80 group-hover/pin:scale-125 group-hover/pin:border-[#C9A84C]'
                        }`}>
                          <img
                            src={loc.image}
                            alt={loc.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover/pin:bg-transparent transition-colors" />
                        </div>

                        {/* Pin Pointer Dot */}
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mx-auto -mt-0.5 border border-black shadow-sm" />
                      </div>

                      {/* ── MOBILE PIN (Clean Pulsing Pin Dot without Image) ── */}
                      <div className="block md:hidden relative flex items-center justify-center">
                        {/* Pulsing Gold Aura Ring when active/pulsed */}
                        <div 
                          className={`absolute -inset-2.5 rounded-full bg-[#C9A84C]/50 animate-ping pointer-events-none ${isMobileActive ? 'opacity-100' : 'opacity-0'}`}
                          style={{ animationDuration: "1.5s" }}
                        />
                        {/* Pulsing Pin Dot */}
                        <div 
                          className={`rounded-full border border-black transition-all duration-300 ${
                            isMobileActive 
                              ? 'w-4 h-4 bg-[#C9A84C] scale-125 shadow-[0_0_12px_#C9A84C]' 
                              : 'w-2.5 h-2.5 bg-[#C9A84C]/80'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Top Title/Brand watermark */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
                  <span className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/60 uppercase block mb-1">Interactive Directory</span>
                  <span className="font-cinzel text-xs tracking-[0.2em] text-white uppercase">Reunion Udupi Map</span>
                </div>

                {/* Desktop: Floating Preview Card on Hover */}
                {hoveredLoc !== null && (() => {
                  const loc = MAP_LOCATIONS[hoveredLoc];
                  const xPct = (loc.x / 300) * 100;
                  const yPct = (loc.y / 300) * 100;
                  const veryBottom = loc.y > 220;
                  const nearBottom = loc.y > 160;
                  const nearLeft = loc.x < 100;
                  let transform = 'translate(-50%, -108%)';
                  let left = `${xPct}%`;
                  let top = `${yPct}%`;
                  if (veryBottom) {
                    top = `${((loc.y - 160) / 300) * 100}%`;
                    transform = nearLeft ? 'translate(0%, 0%)' : 'translate(-100%, 0%)';
                  } else if (nearBottom && nearLeft) {
                    transform = 'translate(15%, -105%)';
                  } else if (nearBottom) {
                    transform = 'translate(-105%, -105%)';
                  }
                  return (
                    <div 
                      className="absolute pointer-events-none z-30 transition-all duration-300 w-48 bg-[#090909]/95 border border-[#C9A84C]/35 rounded overflow-hidden shadow-2xl animate-fade-in-up hidden md:block"
                      style={{ left, top, transform }}
                    >
                      <div className="relative w-full h-24 bg-zinc-900 overflow-hidden">
                        <img 
                          src={loc.image} 
                          alt={loc.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-cinzel text-[10px] tracking-wider text-[#C9A84C] font-semibold uppercase mb-0.5 truncate">
                          {loc.name}
                        </h4>
                        <p className="text-[9px] text-[#a09c98] font-light truncate mb-2">
                          {loc.desc}
                        </p>
                        <div className="flex items-center justify-between border-t border-white/5 pt-1.5">
                          <span className="text-[8px] text-white/30 uppercase tracking-widest">Udupi</span>
                          <span className="text-[8px] text-[#C9A84C] uppercase tracking-wider font-semibold">Click to View ↗</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}



                {/* Mobile only: popup overlaid on map — cycles every 3s */}
                {(() => {
                  const loc = MAP_LOCATIONS[mobileActivePin];
                  if (!loc) return null;
                  const leftPct = (loc.x / 300) * 100;
                  const topPct = (loc.y / 300) * 100;
                  const isTopHalf = loc.y < 130;
                  const isNearLeft = loc.x < 100;
                  const isNearRight = (loc.x / 300) * 100 > 70;

                  let xShift = "-50%";
                  if (isNearLeft) xShift = "4%";
                  else if (isNearRight) xShift = "-104%";
                  const yShift = isTopHalf ? "15%" : "-115%";

                  return (
                    <a
                      key={`mobile-cycle-${mobileActivePin}`}
                      href={loc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute z-50 w-40 bg-[#090909]/95 border border-[#C9A84C]/45 rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] block md:hidden animate-fade-in-up"
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        transform: `translate(${xShift}, ${yShift})`,
                      }}
                    >
                      <div className="relative w-full h-20 bg-zinc-900 overflow-hidden">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                      </div>
                      <div className="p-2.5">
                        <h4 className="font-cinzel text-[9px] tracking-wider text-[#C9A84C] font-semibold uppercase truncate">
                          {loc.name}
                        </h4>
                        <p className="text-[8px] text-[#a09c98] truncate mb-1">{loc.desc}</p>
                        <div className="flex items-center justify-between border-t border-white/10 pt-1 mt-1">
                          <span className="text-[7px] text-[#C9A84C] uppercase tracking-wider font-bold">Open Map ↗</span>
                        </div>
                      </div>
                    </a>
                  );
                })()}

                {/* Stationary hint label in bottom-right */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 bg-black/60 backdrop-blur-sm border border-[#C9A84C]/10 py-1.5 px-3 rounded">
                  <span className="font-cinzel text-[7.5px] tracking-[0.2em] text-[#a09c98] uppercase hidden md:inline">Hover pin to preview</span>
                  <span className="font-cinzel text-[7.5px] tracking-[0.2em] text-[#a09c98] uppercase md:hidden">Auto-rotates every 3s</span>
                </div>
              </div>{/* end aspect-square map container */}
            </div>{/* end map half wrapper */}
      </div>
    </section>
  );
}
