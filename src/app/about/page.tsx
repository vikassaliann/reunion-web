"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";

const HERO_IMAGES = properties.map((p) => p.heroImage);

const CATEGORIES = [
  "Executive Leadership",
  "Operations & Management",
  "HR & Marketing",
  "Guest Relations & Sales",
  "Front Office Management",
  "Culinary Team",
  "Housekeeping & Facility Management",
];

const TEAM_MEMBERS = [
  {
    name: "Mrs. Kshama Kadamba",
    role: "Managing Director & CEO",
    image: "/properties/team/one .jpeg",
    category: "Executive Leadership",
  },
  {
    name: "Mr. Praveen Devadiga",
    role: "Senior Manager",
    image: "/properties/team/two.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Manpreet Singh",
    role: "Operational Manager",
    image: "/properties/team/three.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Nagaraj",
    role: "Property Manager",
    image: "/properties/team/four.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Sumith Naik",
    role: "HR & Marketing Manager",
    image: "/properties/team/twelve.jpeg",
    category: "HR & Marketing",
  },
  {
    name: "Mrs. Nayana Devadiga",
    role: "Sales and Guest Relationship Executive",
    image: "/properties/team/five.jpeg",
    category: "Guest Relations & Sales",
  },
  {
    name: "Ms. Mhombeni Jami",
    role: "Guest Service Executive",
    image: "/properties/team/thirteen.jpeg",
    category: "Guest Relations & Sales",
  },
  {
    name: "Mr. Ramesh",
    role: "Front Desk Manager",
    image: "/properties/team/six.jpeg",
    category: "Front Office Management",
  },
  {
    name: "Mr. Sachin Rawat",
    role: "Chef",
    image: "/properties/team/eleven.jpeg",
    objectPosition: "object-top",
    category: "Culinary Team",
  },
  {
    name: "Mr. Edward",
    role: "Head Housekeeping",
    image: "/properties/team/eight .jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Samanth",
    role: "Housekeeping Associate",
    image: "/properties/team/seven.jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Wonchio Odyuo",
    role: "Housekeeping Associate",
    image: "/properties/team/nine.jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Robin",
    role: "Housekeeping Associate",
    image: "/properties/team/ten.jpeg",
    category: "Housekeeping & Facility Management",
  },
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080808] text-on-surface antialiased overflow-x-hidden selection:bg-antique-gold selection:text-obsidian-deep min-h-screen">
      <div className="noise-overlay" />
      <Navbar />

      <main className="pt-20">
        {/* ── About Reunion — Hero with Slideshow ── */}
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden" id="about-reunion">
          {/* Background Slideshow */}
          {HERO_IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Reunion property ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Black fade overlay */}
          <div className="absolute inset-0 bg-black/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40 z-10" />

          {/* Foreground Content */}
          <div className="relative z-20 max-w-4xl mx-auto text-center px-6 md:px-20 py-20 space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <p className="font-cinzel text-[11px] tracking-[0.55em] text-[#C9A84C] uppercase">About Reunion</p>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>

            {/* Cinematic REUNION branding */}
            <h1
              className="font-cinzel text-[clamp(3rem,10vw,7rem)] font-bold tracking-[0.15em] leading-none"
              style={{
                background: "linear-gradient(180deg, #C9A84C 0%, #f0d78c 40%, #C9A84C 80%, #a08530 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 4px 30px rgba(201,168,76,0.3))",
              }}
            >
              REUNION
            </h1>

            <h2 className="font-cormorant text-[clamp(1.5rem,4vw,2.8rem)] font-light text-white leading-tight">
              Coastal Karnataka&apos;s<br />
              <em className="text-[#C9A84C] italic">Most Trusted Brand</em>
            </h2>

            <p className="text-[#c8c4c0]/85 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Every stay deserves to be memorable. At Reunion, we redefine hospitality through thoughtful management, strategic marketing, and operational excellence—creating exceptional guest experiences and helping hospitality businesses reach their full potential.
            </p>

            <div className="w-16 h-px bg-[#C9A84C]/40 mx-auto" />
          </div>
        </section>

        {/* ── About Reunion — Content Section ── */}
        <section className="relative py-20 px-6 md:px-20 bg-[#060606]">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Trust & Portfolio */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="font-cinzel text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase">Why Reunion</p>
              <h2 className="font-cormorant text-3xl md:text-4xl text-white font-light leading-snug">
                Trusted by <em className="text-[#C9A84C]">30+ Property Owners</em>
              </h2>
              <p className="text-[#a09c98] text-sm md:text-base leading-relaxed">
                More than 30+ property owners place their trust in Reunion. From premium beach villas and oceanfront cafés to luxury city hotels and boutique homestays — we deliver the best customer hospitality, ensuring every guest experience is truly unforgettable.
              </p>
              <p className="text-[#a09c98] text-sm md:text-base leading-relaxed">
                Our curated portfolio spans the entire Coastal Karnataka landscape — secluded beach retreats, vibrant seaside cafés, premium suites, and elegant city villas — all managed with unmatched dedication and operational excellence.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 opacity-30">
              <div className="flex-1 h-px bg-[#C9A84C]/40" />
              <span className="text-[#C9A84C] text-[10px]">✦</span>
              <div className="flex-1 h-px bg-[#C9A84C]/40" />
            </div>

            {/* ── Our Team Section ── */}
            <div className="text-center space-y-12" id="our-team">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A84C]/30 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] font-cinzel text-[9px] tracking-[0.3em] uppercase">
                  ✦ Reunion Team
                </div>
                <h2 className="font-cormorant text-3xl md:text-4xl font-light text-white">Our Team</h2>
                <p className="text-[#a09c98] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  Meet the passionate visionaries, operational leaders, and hospitality experts powering Reunion across Coastal Karnataka.
                </p>
              </div>

              {/* Desktop Layout: Static Category-wise Grids */}
              <div className="hidden lg:block space-y-24 max-w-7xl mx-auto px-6">
                {CATEGORIES.map((cat) => {
                  const members = TEAM_MEMBERS.filter((m) => m.category === cat);
                  
                  // Dynamically set grid columns and max-width based on members count
                  let gridCols = "grid-cols-1 max-w-[320px]";
                  if (members.length === 2) gridCols = "grid-cols-2 max-w-[680px]";
                  if (members.length === 3) gridCols = "grid-cols-3 max-w-[1040px]";
                  if (members.length >= 4) gridCols = "grid-cols-4 max-w-[1400px]";

                  return (
                    <div
                      key={cat}
                      id={`desktop-section-${cat.replace(/\s+/g, "-")}`}
                      className="space-y-10 flex flex-col items-center scroll-mt-28"
                    >
                      {/* Highlighted Background Category Name */}
                      <div className="inline-block bg-[#C9A84C] text-[#080808] px-8 py-3 rounded-sm font-cinzel text-xs tracking-[0.25em] font-bold uppercase shadow-[0_4px_25px_rgba(201,168,76,0.18)]">
                        {cat}
                      </div>

                      {/* Members Grid */}
                      <div className={`grid ${gridCols} gap-8 w-full mx-auto justify-center`}>
                        {members.map((member, i) => (
                          <div
                            key={i}
                            className="group relative overflow-hidden bg-[#0c0c0c] border border-[#C9A84C]/15 hover:border-[#C9A84C]/45 transition-all duration-500 rounded-sm flex flex-col w-full"
                          >
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900">
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className={`w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 ease-out ${member.objectPosition || "object-center"}`}
                                sizes="320px"
                              />
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
                            </div>

                            {/* Member Details: bottom of image name and role */}
                            <div className="p-5 flex-1 flex flex-col justify-end text-left space-y-1.5 bg-[#0c0c0c] border-t border-[#C9A84C]/10 z-10">
                              <h3 className="font-cormorant text-xl text-white font-light group-hover:text-[#C9A84C] transition-colors duration-300">
                                {member.name}
                              </h3>
                              <p className="font-cinzel text-[9px] tracking-[0.1em] text-[#a09c98] uppercase leading-normal">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Gold divider after category */}
                      <div className="flex items-center gap-3 w-full max-w-md mx-auto pt-6 opacity-40">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                        <span className="text-[#C9A84C] text-[10px]">✦</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Mobile/Tablet Layout: Full-width cards in normal page flow */}
              <div className="lg:hidden flex flex-col items-center px-4 w-full space-y-8">
                {TEAM_MEMBERS.map((member, i) => {
                  const isLastInCategory = i === TEAM_MEMBERS.length - 1 || TEAM_MEMBERS[i + 1]?.category !== member.category;
                  return (
                    <div key={i} className="contents">
                  <div
                    className="w-full max-w-sm group relative overflow-hidden bg-[#0c0c0c] border border-[#C9A84C]/15 rounded-sm flex flex-col"
                  >
                    {/* Floating Category Tag (Highlighted bg) */}
                    <div className="absolute top-4 left-4 z-20 bg-[#C9A84C] text-[#080808] px-3.5 py-1.5 rounded-sm font-cinzel text-[8.5px] tracking-[0.15em] font-bold uppercase shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
                      {member.category}
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className={`w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 ease-out ${member.objectPosition || "object-center"}`}
                        sizes="(max-width: 640px) 100vw, 360px"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90" />
                    </div>

                    {/* Member Details */}
                    <div className="p-5 flex-shrink-0 text-left space-y-1.5 bg-[#0c0c0c] border-t border-[#C9A84C]/10">
                      <h3 className="font-cormorant text-xl text-white font-light">
                        {member.name}
                      </h3>
                      <p className="font-cinzel text-[9.5px] tracking-[0.1em] text-[#a09c98] uppercase leading-normal">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Gold divider after category */}
                  {isLastInCategory && i !== TEAM_MEMBERS.length - 1 && (
                    <div className="flex items-center gap-3 w-full max-w-sm mx-auto opacity-40">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                      <span className="text-[#C9A84C] text-[10px]">✦</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                    </div>
                  )}
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
