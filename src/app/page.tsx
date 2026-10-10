"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import properties from "@/data/properties.json";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import ReunionMapSection from "@/components/ReunionMapSection";

/* ── Hero slideshow images ── */
const HERO_SLIDES = [
  { src: "/properties/ocean-manor/herooo.png", alt: "Ocean Manor — Sea & River Facing Beachfront Villa" },
  { src: "/properties/ocean-royal/royalthumb.png", alt: "Ocean Royal — Heritage Farmhouse by the Sea" },
  { src: "/properties/reunion-seren/hero.png", alt: "Reunion Serene — Private Nature Stay near Shivamogga" },
  { src: "/properties/krshna/krthumb.png", alt: "Krshna Residency — Premium Heritage Villa" },
  { src: "/properties/charm-villa/charmthub.png", alt: "Charm Villa — Classic Heritage Residency" },
];

const STAY_CATEGORIES = [
  {
    title: "Beach Villas",
    desc: "Wake up to the sound of the waves.",
    img: "/properties/popular/elite.png",
    href: "/properties?cat=beach",
  },
  {
    title: "Private Pool Villas",
    desc: "Your own space, your own time.",
    img: "/properties/popular/givaah.png",
    href: "/properties?cat=pool",
  },
  {
    title: "Premium Suites",
    desc: "Comfort, style and coastal charm.",
    img: "/properties/de-homes/dehomesthumb.png",
    href: "/properties?cat=city",
  },
  {
    title: "Heritage Farmhouses",
    desc: "Rustic beauty meets coastal living.",
    img: "/properties/popular/royal.png",
    href: "/properties?cat=heritage",
  },
  {
    title: "Ocean Café",
    desc: "Dining right on Mattu Beach.",
    img: "/properties/ocean cafe/ocean1.png",
    href: "/dining",
  },
];

const REVIEWS = [
  {
    quote: "An absolutely spectacular experience. The villa is meticulously maintained, pristine, and thoughtfully curated for the ultimate family retreat.",
    author: "Rohan & Family",
    stayedAt: "Ocean Elite",
  },
  {
    quote: "A gorgeous beachfront sanctuary offering unparalleled peace and secluded, breathtaking views. The hospitality was exceptional from start to finish.",
    author: "Priya Sharma",
    stayedAt: "Ocean Manor",
  },
  {
    quote: "Check-in and check-out were effortless, and the property itself is incredibly spacious, clean, and equipped with premium luxury amenities.",
    author: "Vikramaditya Hegde",
    stayedAt: "Ocean Givaah",
  },
  {
    quote: "A phenomenal stay in a peaceful and secure location. The villa is immaculately clean with stunning balcony views overlooking the shoreline.",
    author: "Ananya Rao",
    stayedAt: "Ocean Royal",
  },
  {
    quote: "Exemplary service and seamless communication. The property beautifully marries a rustic, heritage aesthetic with state-of-the-art modern amenities.",
    author: "Siddharth Verma",
    stayedAt: "De Homes",
  },
];

const CAROUSEL_ORDER = [
  "ocean-elite",
  "ocean-manor",
  "ocean-givaah",
  "ocean-royal",
  "reunion-seren",
  "krshna",
  "de-homes",
  "ocean-daaffy",
  "ocean-hridayam",
  "ocean-bliss",
  "marina-villa",
  "charm-villa",
  "aradhya-villa",
  "arya",
  "ocean-waves",
  "regal-villa",
  "villa",
  "ocean-cafe",
];

const carouselProperties = [...properties].sort((a, b) => {
  const ai = CAROUSEL_ORDER.indexOf(a.id);
  const bi = CAROUSEL_ORDER.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showMoreSignature, setShowMoreSignature] = useState(false);

  /* Hero auto-advance */
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);





  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("active"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#080808] text-white antialiased overflow-x-hidden selection:bg-[#C9A84C] selection:text-[#080808]">
      <Navbar />

      <main>
        {/* ══════════════════════════════════════════════════════════
            HERO — Full-page sliding background
        ══════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[100svh] flex items-end pb-0 overflow-hidden" id="hero">
          {/* Slideshow */}
          <div className="absolute inset-0 w-full h-full z-0">
            {HERO_SLIDES.map((slide, idx) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                style={{ opacity: currentSlide === idx ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Gradient overlays — lighter so slideshow stays brighter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/12 to-transparent z-[1] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent z-[1] pointer-events-none" />
          <MandalaRing
            className="pointer-events-none absolute -right-24 -bottom-16 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] z-[2] opacity-70"
            opacity={0.1}
          />

          {/* Hero text — mobile: no CTAs, sit lower; desktop keeps buttons */}
          <div className="relative z-10 w-full max-w-7xl mx-auto page-pad pb-28 sm:pb-32 md:pb-36">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase block drop-shadow">
                Reunion Global
              </span>
              <h1 className="font-futura font-light text-[2.5rem] sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-wide uppercase drop-shadow-md">
                REUNION
              </h1>
              <p className="font-cormorant italic text-lg sm:text-2xl text-white/90 font-light tracking-wide leading-snug drop-shadow">
                Creating Memories, One Reunion at a Time
              </p>
              <p className="font-futura text-[9px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.35em] text-white/65 uppercase leading-relaxed pt-1">
                STAY · RELAX · EXPLORE · CELEBRATE · RECONNECT
              </p>

              <div className="hidden md:flex pt-5 sm:pt-6 flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/properties"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#C9A84C] bg-transparent backdrop-blur-md text-[#C9A84C] font-futura text-[10px] sm:text-[11px] tracking-[0.25em] uppercase hover:bg-[#C9A84C]/10 transition-all duration-500"
                >
                  EXPLORE STAYS
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-futura text-[10px] sm:text-[11px] tracking-[0.25em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-500"
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>

          {/* Slide dots — above sticky bar on mobile */}
          <div className="absolute bottom-[4.75rem] sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 lg:bottom-10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-[2px] rounded-full transition-all duration-500 ${currentSlide === idx ? "w-8 bg-[#C9A84C]" : "w-3 bg-white/25"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            REUNION DESCRIPTION — Light cream
        ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#f5f0e8] section-y page-pad overflow-hidden" id="about-intro">
          <MandalaRing
            className="pointer-events-none absolute -left-28 top-10 w-[320px] h-[320px] opacity-80"
            opacity={0.09}
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="space-y-5 sm:space-y-6 reveal text-center lg:text-left">
                <MandalaLotus className="w-9 h-9 mx-auto lg:mx-0 opacity-50" />
                <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.4em] text-[#B8963E] uppercase block">
                  Welcome to Reunion
                </span>
                <h2 className="font-futura text-2xl sm:text-3xl md:text-4xl text-[#1a1410] font-light leading-[1.2] uppercase tracking-wide">
                  More than a stay.<br />
                  <span className="text-[#B8963E]">A place to reconnect.</span>
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md mx-auto lg:mx-0">
                  Discover private villas, premium stays, wellness, dining and coastal experiences designed for meaningful moments together.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#B8963E] uppercase border-b border-[#B8963E]/40 pb-1 hover:border-[#B8963E] transition-all"
                >
                  OUR STORY
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Right: Image with overlaid quote */}
              <div className="relative reveal">
                <div className="relative overflow-hidden aspect-[4/3] rounded-sm shadow-xl">
                  <img
                    src="/properties/popular/elite.png"
                    alt="Reunion coastal experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-5 sm:p-8">
                    <div>
                      <p className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-white/95 font-light tracking-wide leading-[1.15]">
                        Good People.<br />Brighter Places.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ══════════════════════════════════════════════════════════
            PROPERTY CAROUSEL — Elegant horizontal scroll
        ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080808] py-20 md:py-28 overflow-hidden" id="properties">
          <MandalaRing
            className="pointer-events-none absolute -right-20 top-8 w-[300px] h-[300px] opacity-60"
            opacity={0.07}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-12 reveal">
            <div className="flex items-end justify-between">
              <div className="space-y-3">
                <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Our Collection</span>
                <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-[0.25em]">
                  Stays & Residences
                </h2>
              </div>
              <Link
                href="/properties"
                className="hidden md:inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all whitespace-nowrap"
              >
                VIEW ALL
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="flex gap-6 overflow-x-auto no-scrollbar pl-6 md:pl-12 pr-6 pb-6 cursor-grab select-none scroll-smooth"
              id="propTrack"
              onMouseDown={(e) => {
                const el = e.currentTarget;
                el.dataset.dragging = "true";
                el.dataset.startX = String(e.pageX - el.offsetLeft);
                el.dataset.scrollLeft = String(el.scrollLeft);
                el.style.cursor = "grabbing";
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                if (el.dataset.dragging !== "true") return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - Number(el.dataset.startX)) * 1.5;
                el.scrollLeft = Number(el.dataset.scrollLeft) - walk;
              }}
              onMouseUp={(e) => { e.currentTarget.dataset.dragging = "false"; e.currentTarget.style.cursor = "grab"; }}
              onMouseLeave={(e) => { e.currentTarget.dataset.dragging = "false"; e.currentTarget.style.cursor = "grab"; }}
            >
              {carouselProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="flex-none w-[85vw] sm:w-[45vw] lg:w-[31vw] min-w-[300px] group"
                >
                  <Link href={`/properties/${prop.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                      <img
                        src={prop.heroImage}
                        alt={prop.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {/* Grain overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: "128px 128px",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                    <div className="pt-4 pb-2">
                      <h3 className="font-futura text-[13px] sm:text-[14px] text-white uppercase tracking-[0.2em] font-medium group-hover:text-[#C9A84C] transition-colors leading-tight">
                        {prop.name.toUpperCase().startsWith("REUNION ") ? prop.name.toUpperCase() : `REUNION ${prop.name.toUpperCase()}`}
                      </h3>
                      <p className="font-futura text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1.5">{prop.location}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Left arrow */}
            <button
              onClick={() => {
                const el = document.getElementById("propTrack");
                if (el) el.scrollBy({ left: -(el.offsetWidth * 0.33), behavior: "smooth" });
              }}
              className="absolute left-2 md:left-4 top-[38%] -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-[#C9A84C] transition-colors duration-300"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={() => {
                const el = document.getElementById("propTrack");
                if (el) el.scrollBy({ left: el.offsetWidth * 0.33, behavior: "smooth" });
              }}
              className="absolute right-2 md:right-4 top-[38%] -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-[#C9A84C] transition-colors duration-300"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            POPULAR SIGNATURE PROPERTIES — Alternating B&W
        ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080808] py-24 md:py-32 px-4 md:px-10 overflow-hidden" id="signature">
          <MandalaRing
            className="pointer-events-none absolute left-[-12%] bottom-20 w-[360px] h-[360px] opacity-50"
            opacity={0.06}
          />
          <div className="relative z-10 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 reveal">
              <MandalaLotus className="w-9 h-9 mx-auto mb-4 opacity-50" />
              <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block mb-3">Popular Stays</span>
              <h2 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider">
                Signature Properties
              </h2>
            </div>

            <div className="space-y-24 md:space-y-32">
              {/* Ocean Elite — Image Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center reveal">
                <div className="space-y-6 order-2 lg:order-1 lg:col-span-5">
                  <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Padutonse, Udupi</span>
                  <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                    Reunion<br />Ocean Elite
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                    A charming 2-bedroom beachfront villa with direct beach access, a spacious lawn opening onto golden sands, and a private sea-view balcony for unforgettable sunsets.
                  </p>
                  <Link
                    href="/properties/ocean-elite"
                    className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                  >
                    EXPLORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="order-1 lg:order-2 lg:col-span-7">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/properties/ocean-elite/thumbelite.png"
                      alt="Reunion Ocean Elite"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Ocean Manor — Image Left */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center reveal">
                <div className="lg:col-span-7">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/properties/ocean-manor/herooo.png"
                      alt="Reunion Ocean Manor"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-6 lg:col-span-5">
                  <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Padutonse, Udupi</span>
                  <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                    Reunion<br />Ocean Manor
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                    A sea-and-river facing villa with panoramic balconies, scenic rock-bed beach access, and spacious living across multiple floors for the perfect family reunion.
                  </p>
                  <Link
                    href="/properties/ocean-manor"
                    className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                  >
                    EXPLORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Ocean Givaah — Image Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center reveal">
                <div className="space-y-6 order-2 lg:order-1 lg:col-span-5">
                  <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Bada, Udupi</span>
                  <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                    Reunion<br />Ocean Givaah
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                    A luxurious 3BHK beachside retreat with a private pool, lush gardens, and a sun-drenched terrace overlooking the Arabian Sea — just 200 metres from the shore.
                  </p>
                  <Link
                    href="/properties/ocean-givaah"
                    className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                  >
                    EXPLORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="order-1 lg:order-2 lg:col-span-7">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/properties/ocean-givaah/givaahthumb.png"
                      alt="Reunion Ocean Givaah"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* View More toggle */}
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setShowMoreSignature(!showMoreSignature)}
                  className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-white/50 uppercase hover:text-[#C9A84C] transition-colors duration-300"
                >
                  {showMoreSignature ? "SHOW LESS" : "VIEW MORE"}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${showMoreSignature ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Expandable — Ocean Royal & De Homes */}
              {showMoreSignature && (
                <div className="space-y-24 md:space-y-32 pt-20" style={{ animation: "fadeInUp 0.6s ease-out" }}>
                  {/* Ocean Royal — Image Left */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src="/properties/ocean-royal/royalthumb.png"
                          alt="Reunion Ocean Royal"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-6 lg:col-span-5">
                      <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Kapu, Udupi</span>
                      <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                        Reunion<br />Ocean Royal
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                        A heritage farmhouse villa just 50 metres from the sea, surrounded by coconut groves — where rustic coastal charm meets modern comfort near Kapu Lighthouse.
                      </p>
                      <Link
                        href="/properties/ocean-royal"
                        className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                      >
                        EXPLORE
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* De Homes — Image Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="space-y-6 order-2 lg:order-1 lg:col-span-5">
                      <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Chitpady, Udupi</span>
                      <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                        Reunion<br />De Homes
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                        Premium suites in the heart of Udupi city, steps from the sacred Sri Krishna Matha — offering luxury, privacy, and modern living from standard rooms to a presidential suite.
                      </p>
                      <Link
                        href="/properties/de-homes"
                        className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                      >
                        EXPLORE
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                    <div className="order-1 lg:order-2 lg:col-span-7">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src="/properties/de-homes/dehomesthumb.png"
                          alt="Reunion De Homes"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reunion Serene — Image Left */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src="/properties/reunion-seren/hero.png"
                          alt="Reunion Serene"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-6 lg:col-span-5">
                      <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">Shivamogga, Karnataka</span>
                      <h3 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                        Reunion<br />Serene
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                        A private Malnad nature-stay near Shivamogga with a year-round outdoor pool, 4 bedrooms for up to 8 guests, terrace, garden, free Wi-Fi and parking.
                      </p>
                      <Link
                        href="/properties/reunion-seren"
                        className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
                      >
                        EXPLORE
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FEATURED EXPERIENCES & CANDLELIGHT DINNER — Scattered Gallery
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#f5f0e8] section-y-tight page-pad relative overflow-hidden">
          <MandalaRing
            className="pointer-events-none absolute right-[-15%] top-0 w-[340px] h-[340px]"
            opacity={0.08}
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-16 lg:gap-24">

              {/* ── Left Column: Experiences ── */}
              <div className="reveal">
                <div className="space-y-3 mb-8 sm:mb-10">
                  <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.4em] text-[#B8963E] uppercase block">CURATED MOMENTS</span>
                  <h2 className="font-futura text-xl sm:text-2xl md:text-4xl text-[#1a1410] font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
                    Experiences
                  </h2>
                  <p className="font-futura text-stone-600 text-xs sm:text-sm leading-relaxed font-light tracking-wide max-w-md">
                    Immerse in private beachside dining, backwater kayaking, coastal wellness, and handcrafted cultural moments across Udupi.
                  </p>
                </div>

                {/* Scattered Gallery — Experiences */}
                <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[350px] lg:h-[420px] max-w-lg mx-auto lg:max-w-none">
                  {/* Image 1 — large, top-left, slight tilt */}
                  <div
                    className="absolute shadow-2xl hover:z-30 transition-all duration-500 hover:scale-105"
                    style={{ top: "0%", left: "0%", width: "48%", transform: "rotate(-3deg)", zIndex: 5 }}
                  >
                    <img src="/properties/experiances/exp1.png" alt="Experience" className="w-full aspect-[4/3] object-cover rounded-sm" />
                  </div>

                  {/* Image 2 — medium, top-right, opposite tilt */}
                  <div
                    className="absolute shadow-2xl hover:z-30 transition-all duration-500 hover:scale-105"
                    style={{ top: "5%", right: "2%", width: "40%", transform: "rotate(4deg)", zIndex: 8 }}
                  >
                    <img src="/properties/experiances/exp2.png" alt="Experience" className="w-full aspect-[3/4] object-cover rounded-sm" />
                  </div>

                  {/* Image 3 — small, mid-center, overlapping */}
                  <div
                    className="absolute shadow-2xl hover:z-30 transition-all duration-500 hover:scale-105"
                    style={{ top: "38%", left: "28%", width: "32%", transform: "rotate(-1.5deg)", zIndex: 12 }}
                  >
                    <img src="/properties/experiances/exp4.png" alt="Experience" className="w-full aspect-[4/3] object-cover rounded-sm" />
                  </div>

                  {/* Image 4 — bottom-left, tilted */}
                  <div
                    className="absolute shadow-2xl hover:z-30 transition-all duration-500 hover:scale-105"
                    style={{ bottom: "0%", left: "3%", width: "36%", transform: "rotate(2.5deg)", zIndex: 6 }}
                  >
                    <img src="/properties/experiances/exp7.png" alt="Experience" className="w-full aspect-square object-cover rounded-sm" />
                  </div>

                  {/* Image 5 — bottom-right, slight tilt */}
                  <div
                    className="absolute shadow-2xl hover:z-30 transition-all duration-500 hover:scale-105"
                    style={{ bottom: "4%", right: "0%", width: "38%", transform: "rotate(-2deg)", zIndex: 10 }}
                  >
                    <img src="/properties/experiances/exp9.png" alt="Experience" className="w-full aspect-[4/3] object-cover rounded-sm" />
                  </div>
                </div>

                {/* Explore More */}
                <div className="pt-8">
                  <Link
                    href="/experiences"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#B8963E] bg-transparent text-[#B8963E] font-futura text-[9.5px] tracking-[0.2em] font-semibold uppercase hover:bg-[#B8963E]/10 transition-all duration-300"
                  >
                    EXPLORE MORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* ── Right Column: Candlelight Dinner ── */}
              <div className="reveal">
                <div className="space-y-3 mb-10">
                  <span className="font-futura text-[10px] tracking-[0.4em] text-[#B8963E] uppercase block">ROMANTIC SPECIAL</span>
                  <h2 className="font-futura text-2xl sm:text-4xl text-[#1a1410] font-light uppercase tracking-[0.2em] leading-tight">
                    Candlelight Dinner<br />at Reunion
                  </h2>
                  <p className="font-futura text-stone-600 text-xs sm:text-sm leading-relaxed font-light tracking-wide max-w-md">
                    Intimate beachside dining under starry coastal skies with private setups, handcrafted menus, and romantic seaside ambiance.
                  </p>
                </div>

                {/* Scattered Gallery — Candlelight Dinner */}
                <div className="relative w-full h-[240px] sm:h-[350px] lg:h-[420px] max-w-lg mx-auto lg:max-w-none">
                  {/* Image 1 — Top Left */}
                  <div
                    className="absolute shadow-2xl hover:z-40 transition-all duration-500 hover:scale-105"
                    style={{ top: "2%", left: "2%", width: "52%", transform: "rotate(-3deg)", zIndex: 10 }}
                  >
                    <img src="/properties/experiances/exp12.png" alt="Candlelight dinner" className="w-full h-auto rounded-sm" />
                  </div>

                  {/* Image 2 — Top Right */}
                  <div
                    className="absolute shadow-2xl hover:z-40 transition-all duration-500 hover:scale-105"
                    style={{ top: "15%", right: "0%", width: "48%", transform: "rotate(4deg)", zIndex: 20 }}
                  >
                    <img src="/properties/experiances/exp13.png" alt="Candlelight dinner" className="w-full h-auto rounded-sm" />
                  </div>

                  {/* Image 3 — Bottom Center Overlap */}
                  <div
                    className="absolute shadow-2xl hover:z-40 transition-all duration-500 hover:scale-105"
                    style={{ bottom: "2%", left: "15%", width: "60%", transform: "rotate(-1deg)", zIndex: 30 }}
                  >
                    <img src="/properties/experiances/exp14.png" alt="Candlelight dinner" className="w-full h-auto rounded-sm" />
                  </div>
                </div>

                {/* Explore More */}
                <div className="pt-8">
                  <Link
                    href="/experiences/candlelight-dinner"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#B8963E] bg-transparent text-[#B8963E] font-futura text-[9.5px] tracking-[0.2em] font-semibold uppercase hover:bg-[#B8963E]/10 transition-all duration-300"
                  >
                    EXPLORE MORE
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PROPERTY LOGOS CAROUSEL
        ══════════════════════════════════════════════════════════ */}
        <section className="bg-[#080808] mt-0 py-5 sm:py-6 border-y border-white/10 relative overflow-hidden" id="property-logos">
          <div className="relative max-w-[95vw] mx-auto flex items-center px-10 sm:px-12">
            {/* Left arrow */}
            <button
              onClick={() => {
                const el = document.getElementById("logoTrack");
                if (el) el.scrollBy({ left: -(el.offsetWidth * 0.5), behavior: "smooth" });
              }}
              className="absolute left-0 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors bg-[#080808]"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Logo Track */}
            <div
              id="logoTrack"
              className="flex gap-16 md:gap-24 overflow-x-auto no-scrollbar items-center select-none py-4 scroll-smooth"
            >
              {[
                { name: "Ocean Elite", id: "ocean-elite", style: { fontFamily: "Times New Roman, serif", fontStyle: "italic", fontSize: "1.3rem" } },
                { name: "Ocean Manor", id: "ocean-manor", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.9rem" } },
                { name: "Ocean Givaah", id: "ocean-givaah", style: { fontFamily: "Georgia, serif", fontVariant: "small-caps", fontSize: "1.4rem", letterSpacing: "0.05em" } },
                { name: "Ocean Royal", id: "ocean-royal", style: { fontFamily: "Courier New, monospace", letterSpacing: "0.1em", fontSize: "1.1rem" } },
                { name: "Reunion Serene", id: "reunion-seren", style: { fontFamily: "Hoefler Text, serif", fontStyle: "italic", fontSize: "1.4rem" } },
                { name: "Krshna", id: "krshna", style: { fontFamily: "Optima, sans-serif", textTransform: "uppercase", letterSpacing: "0.4em", fontSize: "0.9rem" } },
                { name: "De Homes", id: "de-homes", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", fontSize: "1.2rem" } },
                { name: "Ocean Daaffy", id: "ocean-daaffy", style: { fontFamily: "Palatino, serif", letterSpacing: "0.08em", fontSize: "1.3rem" } },
                { name: "Ocean Hridayam", id: "ocean-hridayam", style: { fontFamily: "Verdana, sans-serif", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.75rem" } },
                { name: "Ocean Bliss", id: "ocean-bliss", style: { fontFamily: "Garamond, serif", fontStyle: "italic", textTransform: "lowercase", fontSize: "1.5rem" } },
                { name: "Marina Villa", id: "marina-villa", style: { fontFamily: "Impact, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "1.2rem", fontWeight: 400 } },
                { name: "Charm Villa", id: "charm-villa", style: { fontFamily: "Baskerville, serif", fontSize: "1.3rem" } },
                { name: "Aradhya Villa", id: "aradhya-villa", style: { fontFamily: "Futura, sans-serif", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.85rem" } },
                { name: "Arya", id: "arya", style: { fontFamily: "Didot, serif", fontSize: "1.6rem", fontStyle: "italic" } },
                { name: "Ocean Waves", id: "ocean-waves", style: { fontFamily: "Century Gothic, sans-serif", fontWeight: 700, textTransform: "lowercase", letterSpacing: "-0.05em", fontSize: "1.2rem" } },
                { name: "Regal Villa", id: "regal-villa", style: { fontFamily: "Bodoni MT, serif", textTransform: "uppercase", fontSize: "1.1rem", letterSpacing: "0.1em" } },
                { name: "Villa", id: "villa", style: { fontFamily: "Rockwell, serif", fontWeight: "bold", fontSize: "1.2rem" } },
                { name: "Reunion Ocean Café", id: "ocean-cafe", style: { fontFamily: "Tahoma, sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.8rem" } },
              ].map((prop, idx) => (
                <Link
                  key={idx}
                  href={`/properties/${prop.id}`}
                  className="whitespace-nowrap text-white/70 hover:text-[#C9A84C] transition-colors duration-500"
                  style={prop.style as any}
                >
                  {prop.name}
                </Link>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => {
                const el = document.getElementById("logoTrack");
                if (el) el.scrollBy({ left: el.offsetWidth * 0.5, behavior: "smooth" });
              }}
              className="absolute right-0 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors bg-[#080808]"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>


        {/* Reunion Udupi Map + nearby places (restored) */}
        <ReunionMapSection />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
