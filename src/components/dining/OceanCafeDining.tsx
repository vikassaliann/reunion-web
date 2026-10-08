"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import {
  PROPERTY_FAQS,
  TOURIST_ROUTES,
} from "@/components/PropertyDetailSection";
import { MenuDivider } from "@/components/dining/CafeDecor";
import OceanCafeGalleryCarousel from "@/components/dining/OceanCafeGalleryCarousel";
import {
  OCEAN_CAFE_GALLERY_IMAGES,
  OCEAN_CAFE_GALLERY_SLIDES,
  OCEAN_CAFE_INTRO,
  OCEAN_CAFE_META,
  OCEAN_CAFE_OVERVIEW_LEAD,
  OCEAN_CAFE_VIDEO,
  OCEAN_CAFE_VIDEO_POSTER,
} from "@/data/oceanCafePage";

interface OceanCafeDiningProps {
  name: string;
  description: string;
  amenities: string[];
  mapLink: string;
  phone: string;
}

export default function OceanCafeDining({
  name,
  description,
  amenities,
  mapLink,
  phone,
}: OceanCafeDiningProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [touristOpen, setTouristOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const faqs = PROPERTY_FAQS["ocean-cafe"] ?? [];
  const allImages = OCEAN_CAFE_GALLERY_IMAGES;

  const openLightbox = (idx: number) => {
    setSelectedImageIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = () =>
    setSelectedImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  const lightboxNext = () =>
    setSelectedImageIdx((prev) => (prev + 1) % allImages.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen]);

  return (
    <div className="relative">
      {/* Tagline block */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-6">
        <h2 className="font-futura text-2xl sm:text-3xl md:text-4xl text-[#f4ebe1] font-light leading-snug tracking-wide">
          Where the Ocean Meets
          <br />
          Every Sip &amp; Bite
        </h2>
        <p className="font-futura text-sm text-[#e8dfd0]/70 leading-[2] font-light tracking-wide">
          {OCEAN_CAFE_INTRO}
        </p>
        <p className="font-futura text-[10px] sm:text-[11px] tracking-[0.12em] text-[#c9a84c]/90 uppercase">
          {OCEAN_CAFE_META}
        </p>
      </div>

      {/* Video */}
      <div className="mb-16 md:mb-24 max-w-4xl mx-auto">
        <video
          className="w-full aspect-video object-cover ring-1 ring-[#c9a84c]/25"
          controls
          playsInline
          preload="metadata"
          poster={OCEAN_CAFE_VIDEO_POSTER}
        >
          <source src={OCEAN_CAFE_VIDEO} type="video/mp4" />
        </video>
        <p className="mt-3 flex items-center justify-center gap-2 font-futura text-[10px] tracking-[0.15em] text-[#e8dfd0]/50">
          <svg
            className="w-3.5 h-3.5 text-[#c9a84c]/80 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 1l4 4-4 4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 11V9a4 4 0 014-4h14"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 23l-4-4 4-4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 13v2a4 4 0 01-4 4H3"
            />
          </svg>
          <span className="text-[#c9a84c]/90">@doee_eye</span>
        </p>
      </div>

      <OceanCafeGalleryCarousel
        slides={OCEAN_CAFE_GALLERY_SLIDES}
        onOpenLightbox={openLightbox}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-[#1a110c]/97"
          role="dialog"
          aria-modal="true"
          aria-label="Ocean Café gallery"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[10001] flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#c9a84c] bg-[#1a110c]/90 text-2xl leading-none text-[#c9a84c] shadow-lg hover:bg-[#c9a84c] hover:text-[#1a110c] transition-colors"
            aria-label="Close gallery"
          >
            ×
          </button>
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-[#c9a84c]/15 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-futura text-[10px] tracking-[0.3em] text-[#e8dfd0]/50 uppercase">
              {selectedImageIdx + 1} / {allImages.length}
            </p>
            <button
              type="button"
              onClick={closeLightbox}
              className="font-futura text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] px-4 py-2 border border-[#c9a84c]/40 hover:bg-[#c9a84c]/10"
            >
              Close
            </button>
          </div>
          <div
            className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-6 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={lightboxPrev}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#c9a84c]/30 text-[#f4ebe1] hover:bg-[#c9a84c]/10 z-10"
              aria-label="Previous"
            >
              ‹
            </button>
            <img
              src={allImages[selectedImageIdx]}
              alt=""
              className="max-h-[min(70vh,880px)] max-w-full object-contain"
            />
            <button
              type="button"
              onClick={lightboxNext}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#c9a84c]/30 text-[#f4ebe1] hover:bg-[#c9a84c]/10 z-10"
              aria-label="Next"
            >
              ›
            </button>
          </div>
          <div
            className="px-5 pb-6 flex gap-2 overflow-x-auto justify-center shrink-0 [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {allImages.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setSelectedImageIdx(i)}
                className={`flex-none w-14 h-14 overflow-hidden ring-2 ${
                  selectedImageIdx === i ? "ring-[#c9a84c]" : "ring-transparent opacity-50"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile: overview → highlights → enquiry → call/map → nearby → FAQ (same as property) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-x-20 lg:gap-y-16 items-start">
        <div className="lg:col-span-7 space-y-14 md:space-y-16">
          <div className="space-y-6">
            <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#c9a84c] uppercase">
              Property Overview
            </h2>
            <MenuDivider />
            <p className="text-[#e8dfd0]/65 font-futura text-sm leading-[2] font-light tracking-wide">
              {OCEAN_CAFE_OVERVIEW_LEAD}
            </p>
            <p className="text-[#e8dfd0]/75 font-futura text-[15px] leading-[2] font-light tracking-wide">
              {description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#c9a84c] uppercase">
              Property Highlights
            </h2>
            <MenuDivider />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {amenities.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                  <span className="font-futura text-sm text-[#e8dfd0]/70 font-light tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:row-span-2 w-full">
          <div
            id="reserve-form-container"
            className="border border-[#c9a84c]/20 bg-[#2a1f18]/90 p-8 md:p-10 lg:sticky lg:top-24 backdrop-blur-sm"
          >
            <div className="space-y-8">
              <div>
                <span className="font-futura text-[9px] tracking-[0.4em] text-[#c9a84c] block mb-3 uppercase">
                  Inquire
                </span>
                <h3 className="font-futura text-2xl md:text-3xl text-[#f4ebe1] font-light uppercase tracking-widest">
                  Reserve Your Table
                </h3>
              </div>
              <ContactForm
                defaultPreference={name}
                whatsappNumber={phone.replace(/[^\d]/g, "")}
                instagramHandle="@reunionteam19"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12 sm:space-y-16">
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#c9a84c]/40 bg-transparent text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
            >
              Call Us
            </a>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#e8dfd0]/20 bg-transparent text-[#f4ebe1] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
            >
              Map
            </a>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#c9a84c]/15">
            <button
              type="button"
              onClick={() => setTouristOpen(!touristOpen)}
              className="w-full flex items-center justify-between py-5 border-b border-[#c9a84c]/10 group"
            >
              <span className="font-futura text-[11px] tracking-[0.3em] text-[#e8dfd0]/60 group-hover:text-[#f4ebe1] uppercase transition-colors">
                Nearby Tourist Places
              </span>
              <span className="text-[#c9a84c] text-xl leading-none">{touristOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                touristOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-6 space-y-8">
                {TOURIST_ROUTES.map((route) => (
                  <div key={route.title} className="space-y-4">
                    <h4 className="font-futura text-[10px] tracking-widest text-[#c9a84c] uppercase">
                      {route.title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {route.places.map((place) => (
                        <a
                          key={place.name}
                          href={place.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-futura text-[13px] font-light text-[#e8dfd0]/55 hover:text-[#f4ebe1] transition-colors flex items-center gap-3"
                        >
                          <span className="w-1 h-1 bg-[#c9a84c]/40 rounded-full" />
                          {place.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {faqs.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full flex items-center justify-between py-5 border-b border-[#c9a84c]/10 group"
                >
                  <span className="font-futura text-[11px] tracking-[0.3em] text-[#e8dfd0]/60 group-hover:text-[#f4ebe1] uppercase transition-colors">
                    Frequently Asked Questions
                  </span>
                  <span className="text-[#c9a84c] text-xl leading-none">{faqOpen ? "−" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    faqOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="py-6 space-y-6">
                    {faqs.map((faq) => (
                      <div key={faq.q} className="space-y-2">
                        <p className="font-futura text-[13px] text-[#f4ebe1] tracking-wide uppercase">
                          {faq.q}
                        </p>
                        <p className="font-futura text-[13px] font-light text-[#e8dfd0]/50 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
