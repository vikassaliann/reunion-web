"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PropertyCarousel from "@/components/PropertyCarousel";
import Stats from "@/components/Stats";
import Link from "next/link";
import { TOURIST_ROUTES } from "@/components/PropertyDetailSection";

const FEATURED_PROPERTIES = [
  {
    id: "ocean-elite",
    name: "Ocean Elite",
    tagline: "Direct Beach Access Villa",
    location: "Padutonse, Udupi",
    description: "A charming 2-bedroom villa with direct beach access, a spacious lawn leading to the shore, and a private beach-view balcony. Fully equipped kitchen, AC, WiFi, and generator backup.",
    heroImage: "/properties/popular/elite.png",
    link: "/properties/ocean-elite"
  },
  {
    id: "ocean-manor",
    name: "Ocean Manor",
    tagline: "Sea & River Facing Estate",
    location: "Padutonse, Udupi",
    description: "A grand multi-level retreat with sea-facing and river-facing bedrooms, a huge beach-facing balcony, independent ground floor units, and lawn access to the beach through scenic rock beds.",
    heroImage: "/properties/popular/manoor.png",
    link: "/properties/ocean-manor"
  },
  {
    id: "ocean-givaah",
    name: "Ocean Givaah",
    tagline: "Private Pool Beachside Retreat",
    location: "Bada, Udupi",
    description: "A luxurious 3BHK beachside villa with a private pool, lush garden, and ocean-view terrace. Just 200 meters from the beach with modern amenities and generator backup.",
    heroImage: "/properties/popular/givaah.png",
    link: "/properties/ocean-givaah"
  },
  {
    id: "ocean-royal",
    name: "Ocean Royal",
    tagline: "Heritage Farmhouse by the Sea",
    location: "Kapu, Udupi",
    description: "A heritage 3-bedroom villa just 50 meters from the beach, surrounded by coconut trees and lush greenery. Farmhouse charm with modern essentials and generator backup.",
    heroImage: "/properties/popular/royal.png",
    link: "/properties/ocean-royal"
  },
  {
    id: "de-homes",
    name: "De Homes",
    tagline: "Premium City Center Suites",
    location: "Chitpady, Udupi",
    description: "Premium suites in the heart of Udupi city, steps from Sri Krishna Matha. Multiple room categories from Standard to Presidential Suite, blending comfort, privacy, and modern living.",
    heroImage: "/properties/popular/dehome.png",
    link: "/properties/de-homes"
  }
];

const REVIEWS = [
  {
    text: "An absolutely spectacular experience. The villa is meticulously maintained, pristine, and thoughtfully curated for the ultimate family retreat. Spaciously designed interiors combined with a tranquil, soothing ambience made us feel entirely at home. The host's seamless, warm, and responsive hospitality ensured a flawless stay.",
  },
  {
    text: "A gorgeous beachfront sanctuary offering unparalleled peace and secluded, breathtaking views. The hospitality was exceptional—the hosts went completely above and beyond, addressing every detail with absolute care and speed. The private beach next to the estate was a paradise for the children, while we relaxed in the sheer elegance of the property.",
  },
  {
    text: "A truly wonderful stay from beginning to end. Check-in and check-out were effortless, and the estate itself is incredibly spacious, clean, and equipped with premium amenities. Nestled in a secure, quiet coastal neighborhood close to key local landmarks, the host checked on us regularly to ensure perfect comfort.",
  },
  {
    text: "A phenomenal, memorable stay in a peaceful and secure location. The villa itself is immaculately clean with stunning balcony views overlooking the shoreline. The service team remained in constant touch to assist with local recommendations and dining options. With a pristine, crowd-free beach just steps away, it was an unforgettable getaway.",
  },
  {
    text: "Exemplary service and seamless communication. The estate beautifully marries a rustic, heritage aesthetic with state-of-the-art modern amenities. Every corner was pristine, matching the photos perfectly. The thoughtful touches, from premium toiletries to a custom welcome basket, made us feel deeply valued.",
  }
];

const PROPERTY_MARQUEE_NAMES = [
  "Reunion Ocean Elite",
  "Reunion Ocean Manor",
  "Reunion Ocean Givaah",
  "Reunion Ocean Royal",
  "Reunion De Homes",
  "Reunion Ocean Daaffy",
  "Reunion Ocean Hridayam",
  "Reunion Ocean Bliss",
  "Reunion Marina Villa",
  "Reunion Charm Villa",
  "Reunion Aradhya Villa",
  "Reunion Arya",
  "Reunion Krshna",
  "Reunion Ocean Waves",
  "Reunion Regal Villa",
  "Reunion Villa",
  "Reunion Ocean Cafe"
];

const MAP_LOCATIONS = [
  { name: "Ocean Waves", x: 82, y: 66, link: "https://share.google/eqFYB1d1AuDbMxZsK", desc: "Seaside Gateway Villa", image: "/properties/ocean-waves/wavest.png" },
  { name: "Ocean Elite", x: 78, y: 78, link: "https://share.google/IctlTljnCt3FgqQfL", desc: "Padutonse Beachfront Sanctuary", image: "/properties/popular/elite.png" },
  { name: "Ocean Manor", x: 80, y: 90, link: "https://share.google/wrhEhrLlGy34G40By", desc: "Grand Coastal Manor", image: "/properties/popular/manoor.png" },
  { name: "Ocean Bliss", x: 79, y: 102, link: "https://share.google/ufUNLhBYyZ6jyZR2p", desc: "Cozy Beachfront Villa", image: "/properties/ocean-bliss/blissthumb.png" },
  { name: "Ocean Daaffy", x: 76, y: 114, link: "https://share.google/l04jcrY103m0p0K3S", desc: "Private Seaside Sanctuary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg9v6vtXoIyayflvhPajyJtTh-NkPxkLm9VAgpWsg2saL2L1Sc_oxRiKVVtArW-X0tHnak0vp8H_GOWktnlA0SKoO3MqNZcd8bQZBw3Rq4BPAOnF0a_80qK_7ADVCUeaa_l9oodjKu1wYTCTWenGTrLgFJr1e_Uz1MTxvvI4Yv8Ke7HG5pAgYjNDCQlK5PZVzIA5a7lhaGmvif1nWg2XXZ1RDXqWlkmonUYPDr8pdAwqRucNDGHVvziD2fAtpbuzGdYxgQo7jKfRI" },
  { name: "Arya", x: 168, y: 120, link: "https://share.google/AHUQar1rgE6Zfcohh", desc: "Traditional Luxury Villa", image: "/properties/arya/aryathumb.png" },
  { name: "Marina Villa", x: 92, y: 126, link: "https://share.google/8LjWWnPGEZtwhXprX", desc: "Luxury Harbor Residency", image: "/properties/marina-villa/marinathumb.png" },
  { name: "Krshna", x: 176, y: 129, link: "https://share.google/xRpFTqWqRX5ShFqFk", desc: "Premium Heritage Residency", image: "/properties/krshna/krthumb.png" },
  { name: "Charm Villa", x: 100, y: 135, link: "https://share.google/ceuamChqV0frGoZVf", desc: "Classic Heritage Villa", image: "/properties/charm-villa/charmthub.png" },
  { name: "De Homes", x: 190, y: 138, link: "https://share.google/AXOZTWONFB5kLZE0o", desc: "Bespoke Townhouse, Chitpady", image: "/properties/popular/dehome.png" },
  { name: "Aradhya Villa", x: 104, y: 144, link: "https://share.google/f9lK85EZJh7fCNNTB", desc: "Elegant Coastal Estate", image: "/properties/aradhya-villa/arathumb.png" },
  { name: "Ocean Hridayam", x: 160, y: 156, link: "https://share.google/yf0w6TtYw4QYGkq2u", desc: "Tranquil Garden Villa", image: "/properties/ocean-hridayam/hridthumb.png" },
  { name: "Reunion Ocean Café", x: 78, y: 192, link: "https://share.google/vsXAVG9Y8vshzClQG", desc: "Beachside Cafe, Mattu Beach", image: "/properties/ocean cafe/ocean1.png" },
  { name: "Ocean Givaah", x: 74, y: 210, link: "https://share.google/hP2F3unQNtIxL1KTh", desc: "Secluded Beachfront Villa", image: "/properties/popular/givaah.png" },
  { name: "Villa", x: 76, y: 219, link: "https://share.google/8jFAzdHybtmkeZQwv", desc: "Classic Beachfront Villa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe_x1Na3zexjB9CXIgWbN-OZPgwoP8sD7CkYQFSCcZYL4O_NNuGFQREi6-Le5g_-EZT72T8nPwXEF_g6AXBxM0u4-WdG-GpuP6JikCorvxIgN7YupOe4OLatcmzdpKepjxAKXZcRDOVCkcFs4ihUb-6u_LrK4h1Uuw5OBQcgaswCneViT41Cj2s5br48qBSWBLd0-ywbbC9lwk9quxUY-wvk6TlUiInVxdpT35JZK-9pAUkfmii4sKze0G72lJFGeEPtNKAQ4hv1A" },
  { name: "Ocean Royal", x: 78, y: 240, link: "https://share.google/vqIEhqFKsJt9EitKO", desc: "Majestic Beachfront Estate", image: "/properties/popular/royal.png" },
  { name: "Regal Villa", x: 75, y: 252, link: "https://maps.app.goo.gl/P3NuZSXE29bcFPT19", desc: "Majestic Kapu Residency", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8MYs5y7mUKBjWo3QMCQgQf7OCs5Yup4OLJrgpvK2ZB8NNEG_cSb0RIFOVByrksmny1f8VXUY7uAYLoZkgA5NE_IzsNB_WmFChDmNW6_BpkfoNFmrIg8IIROdCmuLtWYcMtDWU-4VxMKmhrXIW1KMuZUJ_1D3_998F0lUdhDnZoOtQ1MlFE8xzZBTzm_DeeNdSsnKZKI8DMKv1Hev4xwp81a7zHVPR9d_UFpIqJMmwzpRpWW4wauTO6flqvymik6HW0bh6-Dc0es" }
];



export default function Home() {
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [hoveredLoc, setHoveredLoc] = useState<number | null>(null);
  const [cafeFormOpen, setCafeFormOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080808] text-[#e5e2e1] antialiased overflow-x-hidden selection:bg-[#C9A84C] selection:text-[#080808]">
      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" id="hero">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/properties/homeslide/slidevid.mp4"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.72) 100%)', zIndex: 4 }} />
            {/* Top fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" style={{ zIndex: 5 }} />
          </div>

          <div className="relative text-center px-6 md:px-20 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
            {/* Eyebrow line */}
            <div className="flex items-center justify-center gap-4 mb-8 reveal">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <p className="font-cinzel text-[11px] tracking-[0.55em] text-[#C9A84C] uppercase">Reunion</p>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h1
              className="font-cinzel font-normal text-[clamp(2.4rem,7vw,6rem)] text-white leading-[1.08] tracking-[0.02em] mb-8 reveal"
              style={{ transitionDelay: '150ms', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
            >
              Creating Memories<br />
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#f0d78c] to-[#C9A84C] bg-clip-text text-transparent">
                One Reunion at a time
              </span>
            </h1>
            <p
              className="text-[#c8c4c0]/80 text-base md:text-lg tracking-wide mb-12 max-w-xl mx-auto reveal"
              style={{ transitionDelay: '280ms' }}
            >
              Premium beach stays, coastal cafés, boutique hotels &amp; city villas — curated for those who gather in style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal" style={{ transitionDelay: '400ms' }}>
              <Link
                href="/properties"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C9A84C] text-[#080808] font-cinzel text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#f0d78c] transition-all duration-300 gold-shimmer"
              >
                Explore Properties
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A84C]/50 text-[#C9A84C] font-cinzel text-[11px] tracking-[0.3em] uppercase hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300"
              >
                Our Story
              </Link>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <div className="h-12 w-px bg-gradient-to-b from-[#C9A84C]/60 to-transparent scroll-indicator" />
              <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C]/60 uppercase">Scroll</p>
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
        <section className="relative py-40 px-6 md:px-20 overflow-hidden" id="about">
          {/* Floating orbs */}
          <div className="gold-orb gold-orb-1" />
          <div className="gold-orb gold-orb-2" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="gold-divider mb-10 reveal" />
            <p className="font-cinzel text-[10px] tracking-[0.6em] text-[#C9A84C] uppercase mb-6 reveal" style={{ transitionDelay: '100ms' }}>
              The Art of Reunion
            </p>
            <h2
              className="font-cormorant text-[clamp(2.2rem,5vw,4rem)] font-light text-white leading-tight mb-10 reveal"
              style={{ transitionDelay: '200ms' }}
            >
              Where Every Gathering Becomes<br />
              <em className="text-[#C9A84C]">an Unforgettable Story</em>
            </h2>
            <p
              className="text-[#a09c98] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16 reveal"
              style={{ transitionDelay: '300ms' }}
            >
              From premium beach stays, vibrant coastal cafés, and boutique hotels to sophisticated city villas, our curated spaces are designed to bring people together in absolute comfort and elegance.
            </p>
            <div className="gold-divider reveal" style={{ transitionDelay: '400ms' }} />

            {/* Stats row */}
            <div className="mt-20 reveal" style={{ transitionDelay: '300ms' }}>
              <Stats />
            </div>
          </div>
        </section>

        {/* ── Properties Carousel ── */}
        <PropertyCarousel />

        {/* ── Featured Property ── */}
        <section className="reveal my-2">
          <div className="flex flex-col-reverse md:flex-row w-full min-h-[600px] relative">
            {/* Image Container with smooth cross-fade */}
            <div className="w-full md:w-1/2 relative overflow-hidden h-[380px] md:h-auto group bg-obsidian-deep">
              {FEATURED_PROPERTIES.map((p, idx) => (
                <img
                  key={p.id}
                  alt={p.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === activeFeatured ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                    }`}
                  src={p.heroImage}
                />
              ))}
              {/* Thin black aesthetic overlay layer */}
              <div className="absolute inset-0 bg-black/35 z-15 pointer-events-none" />
              {/* Gradient fade overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent z-20 pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2 bg-[#0e0e0e] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-10 md:py-16 relative border-t md:border-t-0 md:border-l border-[#C9A84C]/10 min-h-[500px]">
              {/* Vertical gold accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent hidden md:block" />

               <div className="max-w-xl space-y-6">
                <p className="font-cinzel text-[10px] tracking-[0.55em] text-[#C9A84C] uppercase">Popular Signature Estates</p>

                {/* Switcher Tabs - Horizontally Scrollable on Mobile, no wrapping */}
                <div 
                  className="flex flex-row overflow-x-auto whitespace-nowrap gap-x-6 border-b border-white/10 pb-4 w-full scroll-smooth snap-x px-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Webkit scrollbar hiding script inline helper */}
                  <style dangerouslySetInnerHTML={{__html: `
                    div::-webkit-scrollbar { display: none; }
                  `}} />
                  {FEATURED_PROPERTIES.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveFeatured(idx)}
                      className={`font-cinzel text-[11px] tracking-[0.2em] uppercase transition-all duration-300 relative py-1 flex-none snap-start origin-left ${idx === activeFeatured
                        ? "text-[#C9A84C] font-semibold scale-[1.03]"
                        : "text-[#a09c98]/60 hover:text-[#a09c98]"
                        }`}
                    >
                      {p.name}
                      {idx === activeFeatured && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A84C] transition-all duration-300" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Info and text with fade transition based on active state */}
                <div className="space-y-4 min-h-[160px] flex flex-col justify-center">
                  <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#C9A84C] italic">
                    {FEATURED_PROPERTIES[activeFeatured].location}
                  </p>
                  <h2 className="font-cormorant text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-white leading-tight">
                    {FEATURED_PROPERTIES[activeFeatured].tagline}
                  </h2>
                  <p className="text-[#a09c98] text-sm md:text-base leading-relaxed">
                    {FEATURED_PROPERTIES[activeFeatured].description}
                  </p>
                </div>

                <Link
                  href={FEATURED_PROPERTIES[activeFeatured].link}
                  className="hidden md:inline-flex items-center gap-3 font-cinzel text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors group/link pt-4"
                >
                  Explore Villa Details
                  <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet explore button below the image */}
          <div className="flex md:hidden justify-center py-8 bg-[#090909] border-b border-[#C9A84C]/15">
            <Link
              href={FEATURED_PROPERTIES[activeFeatured].link}
              className="inline-flex items-center gap-3 font-cinzel text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors group/link"
            >
              Explore Villa Details
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── Experiences Section ── */}
        <section className="relative py-40 px-6 md:px-20 bg-[#0a0a0a] overflow-hidden" id="experiences">
          <div className="gold-orb gold-orb-1" style={{ opacity: 0.5 }} />
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-24 reveal">
              <div className="gold-divider mb-10" />
              <p className="font-cinzel text-[10px] tracking-[0.55em] text-[#C9A84C] uppercase mb-5">The Lifestyle</p>
              <h2 className="font-cormorant text-[clamp(2rem,4.5vw,3.5rem)] font-light text-white">
                Curation Beyond Compare
              </h2>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 reveal" style={{ transitionDelay: '200ms' }}>
              {[
                { icon: 'beach_access', label: 'Coastal Retreats', desc: 'Premium beach stays situated directly on quiet shorelines.' },
                { icon: 'local_cafe', label: 'Beachside Cafés', desc: 'Artisanal brews and local seafood menus by the ocean.' },
                { icon: 'domain', label: 'City Villas', desc: 'Sophisticated sanctuaries in prime urban neighborhoods.' },
                { icon: 'shield', label: 'Absolute Discretion', desc: 'Secluded spaces designed for complete peace and privacy.' },
                { icon: 'groups', label: 'Group Reunions', desc: 'Tailored layouts and hospitality services for gatherings.' },
                { icon: 'room_service', label: 'Bespoke Service', desc: 'Personalized butler services and dedicated hosts tailored to your stay.' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="text-center group cursor-default">
                  <div className="w-20 h-20 mx-auto border border-[#C9A84C]/25 flex items-center justify-center mb-5 experience-icon">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                  </div>
                  <h3 className="font-cinzel text-[11px] tracking-[0.25em] text-white uppercase mb-2">{label}</h3>
                  <p className="text-[#7a7672] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reunion Ocean Café Section ── */}
        <section className="relative bg-[#060606] overflow-hidden" id="dining">
          {/* Ambient orb */}
          <div className="gold-orb gold-orb-2" style={{ opacity: 0.4 }} />

          {/* ── Header ── */}
          <div className="max-w-4xl mx-auto text-center px-6 md:px-20 pt-24 pb-12 relative z-10 reveal">
            <div className="gold-divider mb-8" />
            <p className="font-cinzel text-[10px] tracking-[0.6em] text-[#C9A84C] uppercase mb-4">
              Reunion Ocean Café
            </p>
            <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,3.5rem)] font-light text-white leading-tight mb-6">
              Where the Ocean Meets<br />
              <em className="text-[#C9A84C]">Every Sip & Bite</em>
            </h2>
            <p className="text-[#a09c98] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Located right by Mattu Beach in Udupi, Reunion Ocean Cafe is a highly-rated beachside sanctuary celebrated for its stunning sunset views, cozy fireplace setup, and budget-friendly menu. Enjoy continental and Chinese delicacies, fresh seafood, specialty coffee, and refreshing mocktails—perfect for romantic candlelight dinners and group gatherings.
            </p>

            {/* Compact, aesthetic info line */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[#C9A84C] font-cinzel text-[9px] tracking-[0.25em] uppercase border-t border-[#C9A84C]/15 pt-6">
              <span>Mattu Beach, Kapu Road</span>
              <span className="text-white/25 hidden sm:inline">|</span>
              <span>Mon - Sun: 9:30 AM – 10:00 PM</span>
              <span className="text-white/25 hidden sm:inline">|</span>
              <span className="text-white">Live Music &amp; Fireplace</span>
            </div>
          </div>

          {/* ── Photo Mosaic Grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-12 grid-rows-auto md:grid-rows-2 h-auto md:h-[820px] w-full gap-1 reveal" style={{ transitionDelay: '200ms' }}>

            {/* Large hero café shot */}
            <div className="col-span-2 md:col-span-5 md:row-span-2 relative group overflow-hidden h-[300px] md:h-auto">
              <img
                alt="Reunion Ocean Café — Seaside Solitude"
                className="w-full h-full object-cover"
                src="/properties/ocean cafe/ocean1.png"
              />
              {/* Thin black overlay that disappears on hover */}
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/10 transition-all duration-500 z-15" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <p className="font-cinzel text-[9px] tracking-[0.45em] text-[#C9A84C] uppercase mb-2">Seaside Solitude</p>
                <p className="font-cormorant text-xl font-light text-white italic">Peaceful oceanfront tables facing the waves</p>
              </div>
            </div>

            {/* Top-right: Signature brew */}
            <div className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden h-[200px] md:h-auto">
              <img
                alt="Reunion Ocean Café — Morning Sanctuary"
                className="w-full h-full object-cover"
                src="/properties/ocean cafe/ocean4.png"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/10 transition-all duration-500 z-15" />
              <div className="absolute bottom-0 left-0 p-5 z-20">
                <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C] uppercase mb-1">Morning Sanctuary</p>
                <p className="font-cormorant text-base font-light text-white/80 italic">Breezy outdoor lounge under thatched roofs</p>
              </div>
            </div>

            {/* Top-right corner: Coastal dish */}
            <div className="col-span-1 md:col-span-3 md:row-span-1 relative group overflow-hidden h-[200px] md:h-auto">
              <img
                alt="Reunion Ocean Café — Coastal Gastronomy"
                className="w-full h-full object-cover"
                src="/properties/ocean cafe/ocean3.png"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/10 transition-all duration-500 z-15" />
              <div className="absolute bottom-0 left-0 p-5 z-20">
                <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C] uppercase mb-1">Coastal Gastronomy</p>
                <p className="font-cormorant text-base font-light text-white/80 italic">Fresh local delicacies & classic dishes</p>
              </div>
            </div>

            {/* Bottom-right: Café interior */}
            <div className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden h-[200px] md:h-auto">
              <img
                alt="Reunion Ocean Café — Rustic Heritage"
                className="w-full h-full object-cover"
                src="/properties/ocean cafe/ocean5.jpeg"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/10 transition-all duration-500 z-15" />
              <div className="absolute bottom-0 left-0 p-5 z-20">
                <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C] uppercase mb-1">Rustic Heritage</p>
                <p className="font-cormorant text-base font-light text-white/80 italic">Warm, welcoming architecture & lighting</p>
              </div>
            </div>

            {/* Bottom-right corner: Sunset drinks */}
            <div className="col-span-1 md:col-span-3 md:row-span-1 relative group overflow-hidden h-[200px] md:h-auto">
              <img
                alt="Reunion Ocean Café — Sunset Solace"
                className="w-full h-full object-cover"
                src="/properties/ocean cafe/ocean2.png"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/10 transition-all duration-500 z-15" />
              <div className="absolute bottom-0 left-0 p-5 z-20">
                <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C] uppercase mb-1">Sunset Solace</p>
                <p className="font-cormorant text-base font-light text-white/80 italic">Signature drinks by the evening shoreline</p>
              </div>
            </div>
          </div>

          {/* ── Café CTA Row ── */}
          <div className="max-w-5xl mx-auto px-6 md:px-20 py-16 reveal" style={{ transitionDelay: '300ms' }}>
            <div className="flex flex-col gap-10 border-t border-[#C9A84C]/15 pt-10">
              {/* Menu highlights — horizontal on desktop, grid on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
                {['Fresh Seafood & Continental Cuisine', 'Specialty Coffee & Signature Mocktails', 'Romantic Candlelight Dinner', 'Beach Birthday Celebrations & Private Events'].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />
                    <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] text-[#a09c98] uppercase leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setCafeFormOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 bg-[#C9A84C] border border-[#C9A84C] font-cinzel text-[10px] tracking-[0.3em] text-[#080808] uppercase hover:bg-transparent hover:text-[#C9A84C] transition-all duration-300 whitespace-nowrap font-bold shadow-lg"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Reserve Your Stay
                </button>
                <a
                  href="tel:+919972231289"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border border-[#C9A84C]/50 font-cinzel text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase hover:bg-[#C9A84C] hover:text-[#080808] hover:border-[#C9A84C] transition-all duration-300 whitespace-nowrap"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 9.5a19.79 19.79 0 01-3-8.59A2 2 0 012.48 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.86a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  +91 9972231289
                </a>
                <a
                  href="https://share.google/vsXAVG9Y8vshzClQG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 border border-[#C9A84C]/50 font-cinzel text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase hover:bg-[#C9A84C] hover:text-[#080808] hover:border-[#C9A84C] transition-all duration-300 whitespace-nowrap"
                >
                  Get Directions
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Ocean Café Reservation Form Modal ── */}
          {cafeFormOpen && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              style={{ background: 'rgba(6,6,6,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
              onClick={() => setCafeFormOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-[#0f0e0e] border border-[#C9A84C]/25 rounded-sm p-6 sm:p-8 shadow-[0_16px_60px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh]"
              >
                {/* Close */}
                <button
                  onClick={() => setCafeFormOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Header */}
                <div className="space-y-2 mb-8">
                  <span className="font-cinzel text-[9px] tracking-[0.45em] text-[#C9A84C] uppercase font-semibold">Reunion Ocean Café</span>
                  <h2 className="font-cormorant text-2xl sm:text-3xl font-light text-white leading-snug">
                    Reserve Your <em className="text-[#C9A84C]">Stay</em>
                  </h2>
                  <div className="w-12 h-px bg-[#C9A84C]/30" />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const msg = `Hello Reunion Ocean Café! I would like to reserve.

Name: ${fd.get('cafe_name') || 'N/A'}
Phone: ${fd.get('cafe_phone') || 'N/A'}
Date: ${fd.get('cafe_date') || 'Not specified'}
Time: ${fd.get('cafe_time') || 'Not specified'}
Guests: ${fd.get('cafe_guests') || 'Not specified'}
Details: ${fd.get('cafe_desc') || 'None'}`;
                    window.open(`https://wa.me/919972231289?text=${encodeURIComponent(msg)}`, '_blank');
                    setCafeFormOpen(false);
                  }}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="cafe_name"
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="cafe_phone"
                      required
                      type="tel"
                      placeholder="98765 43210"
                      className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">Date</label>
                      <input
                        name="cafe_date"
                        type="date"
                        className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">Time</label>
                      <input
                        name="cafe_time"
                        type="time"
                        className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">Number of Guests</label>
                    <select
                      name="cafe_guests"
                      defaultValue=""
                      className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                    >
                      <option value="" disabled>Select</option>
                      <option value="1-2">1 – 2</option>
                      <option value="3-5">3 – 5</option>
                      <option value="6-10">6 – 10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">Special Requests / Description</label>
                    <textarea
                      name="cafe_desc"
                      rows={3}
                      placeholder="E.g. candlelight dinner, birthday setup, dietary needs..."
                      className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C9A84C] text-black font-cinzel text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#f0d78c] transition-colors"
                  >
                    Send to WhatsApp
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* ── Guest Testimonials Slideshow ── */}
        <section className="relative py-36 px-6 md:px-20 bg-[#0b0b0b] overflow-hidden reveal" id="reviews">
          {/* Floating background orb */}
          <div className="gold-orb gold-orb-2 opacity-50" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Premium Header */}
            <div className="mb-14">
              <p className="font-cinzel text-[10px] tracking-[0.55em] text-[#C9A84C] uppercase mb-4">Guest Chronicles</p>
              <h2 className="font-cormorant text-[clamp(2rem,4.5vw,3rem)] font-light text-white italic">
                Whispers of Satisfaction
              </h2>
              <div className="gold-divider mt-6" />
            </div>

            {/* Quote container with decorative borders and fade-in animation */}
            <div className="relative px-6 md:px-16 py-8 min-h-[220px] flex flex-col justify-center items-center">
              {/* Vertical Gold Accents flanking the quote */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent hidden md:block" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent hidden md:block" />

              <span className="quote-mark text-[#C9A84C]/10 select-none">"</span>

              {/* Active review content with fadeInUp animation keyed by active index */}
              <div key={activeReview} className="animate-fade-in-up space-y-6">
                {/* 5 Gold Stars Rating */}
                <div className="flex justify-center gap-1.5 text-[#C9A84C] text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="select-none">✦</span>
                  ))}
                </div>

                <p className="font-cormorant text-[clamp(1.2rem,2.4vw,1.85rem)] font-light text-white/90 leading-relaxed italic max-w-3xl mx-auto">
                  {REVIEWS[activeReview].text}
                </p>
              </div>
            </div>

            {/* Navigation Dots & Page indicator */}
            <div className="flex justify-center items-center gap-3.5 mt-10">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeReview ? "w-8 bg-[#C9A84C]" : "w-1.5 bg-[#C9A84C]/25 hover:bg-[#C9A84C]/50"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Properties Scrolling Marquee ── */}
        <section className="py-5 md:py-10 bg-black border-y border-[#C9A84C]/20 overflow-hidden relative z-10">
          <div className="flex">
            {/* First Track */}
            <div className="marquee-track shrink-0">
              {PROPERTY_MARQUEE_NAMES.map((name, i) => (
                <span key={`t1-${i}`} className="font-cinzel text-[11px] tracking-[0.38em] text-white font-medium uppercase whitespace-nowrap flex items-center gap-6">
                  {name}
                  <span className="text-[#C9A84C] text-[13px] drop-shadow-[0_0_4px_rgba(201,168,76,0.4)]">✦</span>
                </span>
              ))}
            </div>
            {/* Duplicated Track for Seamless Loop */}
            <div className="marquee-track shrink-0">
              {PROPERTY_MARQUEE_NAMES.map((name, i) => (
                <span key={`t2-${i}`} className="font-cinzel text-[11px] tracking-[0.38em] text-white font-medium uppercase whitespace-nowrap flex items-center gap-6">
                  {name}
                  <span className="text-[#C9A84C] text-[13px] drop-shadow-[0_0_4px_rgba(201,168,76,0.4)]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section className="reveal" id="reserve">
          <div className="flex flex-col md:flex-row min-h-[560px]">
            {/* Form */}
            <div className="w-full md:w-1/2 p-8 md:p-14 flex items-center bg-[#090909] justify-center relative overflow-hidden">
              <div className="gold-orb gold-orb-1" style={{ opacity: 0.4 }} />
              <div className="relative z-10 w-full max-w-md">
                <p className="font-cinzel text-[10px] tracking-[0.55em] text-[#C9A84C] uppercase mb-3">Get in Touch</p>
                <h2 className="font-cormorant text-[clamp(1.8rem,3vw,2.6rem)] font-light text-white mb-6">Begin Your<br /><em className="text-[#C9A84C]">Reunion</em></h2>
                <ContactForm />
              </div>
            </div>
            {/* Interactive Black & Gold Coastal Udupi Map (Centered Square Layout) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-2 bg-[#080808]">
              <div className="w-full max-w-[580px] aspect-square relative bg-[#070707] border border-[#C9A84C]/15 rounded-lg overflow-hidden select-none shadow-2xl">
                {/* Background Map Grid & Vector Art */}
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

                  {/* Pulsing Location Markers */}
                  {MAP_LOCATIONS.map((loc, i) => {
                    const isActive = hoveredLoc === i;
                    return (
                      <g key={i} className="pointer-events-auto cursor-pointer">
                        {/* Interactive hover target (invisible but large for easy hover) */}
                        <circle 
                          cx={loc.x} 
                          cy={loc.y} 
                          r="10" 
                          fill="transparent"
                          onMouseEnter={() => setHoveredLoc(i)}
                          onMouseLeave={() => setHoveredLoc(null)}
                          onClick={() => window.open(loc.link, "_blank")}
                        />
                        {/* Pulsing gold outer ring */}
                        <circle 
                          cx={loc.x} 
                          cy={loc.y} 
                          r={isActive ? "9" : "6"} 
                          className="fill-[#C9A84C]/25 animate-ping" 
                          style={{ transformOrigin: `${loc.x}px ${loc.y}px`, animationDuration: isActive ? "1.5s" : "3s" }}
                        />
                        {/* Solid Center Dot */}
                        <circle 
                          cx={loc.x} 
                          cy={loc.y} 
                          r={isActive ? "4" : "2.5"} 
                          className="fill-[#C9A84C] stroke-black stroke-[1px] transition-all duration-300"
                          onMouseEnter={() => setHoveredLoc(i)}
                          onMouseLeave={() => setHoveredLoc(null)}
                          onClick={() => window.open(loc.link, "_blank")}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Top Title/Brand watermark */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/60 uppercase block mb-1">Interactive Directory</span>
                  <span className="font-cinzel text-xs tracking-[0.2em] text-white uppercase">Reunion Udupi Map</span>
                </div>

                {/* Floating Preview Card Popup on Hover */}
                {hoveredLoc !== null && (
                  <div 
                    className="absolute pointer-events-none z-30 transition-all duration-300 w-48 bg-[#090909]/95 border border-[#C9A84C]/35 rounded overflow-hidden shadow-2xl animate-fade-in-up"
                    style={{
                      left: `${(MAP_LOCATIONS[hoveredLoc].x / 300) * 100}%`,
                      top: `${(MAP_LOCATIONS[hoveredLoc].y / 300) * 100}%`,
                      transform: 'translate(-50%, -108%)'
                    }}
                  >
                    {/* Hero Image Preview */}
                    <div className="relative w-full h-24 bg-zinc-900 overflow-hidden">
                      <img 
                        src={MAP_LOCATIONS[hoveredLoc].image} 
                        alt={MAP_LOCATIONS[hoveredLoc].name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
                    </div>
                    {/* Property info */}
                    <div className="p-3">
                      <h4 className="font-cinzel text-[10px] tracking-wider text-[#C9A84C] font-semibold uppercase mb-0.5 truncate">
                        {MAP_LOCATIONS[hoveredLoc].name}
                      </h4>
                      <p className="text-[9px] text-[#a09c98] font-light truncate mb-2">
                        {MAP_LOCATIONS[hoveredLoc].desc}
                      </p>
                      <div className="flex items-center justify-between border-t border-white/5 pt-1.5">
                        <span className="text-[8px] text-white/30 uppercase tracking-widest">Udupi</span>
                        <span className="text-[8px] text-[#C9A84C] uppercase tracking-wider font-semibold">Click to View ↗</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stationary hint label in bottom-right */}
                <div className="absolute bottom-6 right-6 z-10 bg-black/60 backdrop-blur-sm border border-[#C9A84C]/10 py-1.5 px-3 rounded">
                  <span className="font-cinzel text-[7.5px] tracking-[0.2em] text-[#a09c98] uppercase">Hover marker to preview</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Nearby Tourist Places Section (Aesthetic General Section) ═══ */}
        <section className="py-24 bg-[#060606] border-t border-[#C9A84C]/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)' }} />
          
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="font-cinzel text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase block mb-4">Explore Udupi</span>
              <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,3.5rem)] font-light text-white leading-tight">
                Nearby <em className="text-[#C9A84C] italic">Tourist Places</em>
              </h2>
              <div className="w-16 h-[1px] bg-[#C9A84C]/40 mx-auto mt-6"></div>
              <p className="text-[#8a8682] text-sm max-w-xl mx-auto mt-6 leading-relaxed">
                Discover the best local attractions, historic temples, golden beaches, and scenic view points around Udupi.
              </p>
            </div>

            {/* Grid of Route Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOURIST_ROUTES.map((route, rIdx) => (
                <div 
                  key={rIdx} 
                  className="bg-[#080808] border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 rounded-lg p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/card"
                >
                  <div className="space-y-6">
                    {/* Card Header */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-[#C9A84C]/60 tracking-wider">ROUTE 0{rIdx + 1}</span>
                      <h3 className="font-cinzel text-xs tracking-[0.15em] text-white group-hover/card:text-[#C9A84C] transition-colors duration-300 uppercase font-semibold">
                        {route.title}
                      </h3>
                      <div className="w-8 h-[1px] bg-[#C9A84C]/20 group-hover/card:w-16 transition-all duration-500"></div>
                    </div>

                    {/* Places List */}
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#C9A84C]/10 scrollbar-track-transparent">
                      {route.places.map((place, pIdx) => (
                        <a
                          key={pIdx}
                          href={place.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2.5 py-1.5 px-2 rounded hover:bg-[#C9A84C]/5 transition-colors duration-200 group/item text-left"
                        >
                          <span className="text-[10px] text-[#C9A84C]/40 font-mono mt-0.5 w-4 shrink-0 text-right">{pIdx + 1}.</span>
                          <span className="text-[12px] text-[#b0aba6] group-hover/item:text-white transition-colors duration-200 flex-1 leading-snug">
                            {place.name}
                          </span>
                          <svg className="w-3 h-3 text-[#C9A84C] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <span className="text-[9px] font-cinzel tracking-widest text-[#a09c98]/60 uppercase">
                      {route.places.length} Attractions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
