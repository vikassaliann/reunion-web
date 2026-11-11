"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";
import ExpandablePageFaq, { type FaqItem } from "@/components/ExpandablePageFaq";
import { TOURIST_ROUTES } from "@/components/PropertyDetailSection";
import { MenuDivider } from "@/components/dining/CafeDecor";
import PropertyStyleGallery from "@/components/PropertyStyleGallery";
import {
  OCEAN_CAFE_GALLERY_IMAGES,
  OCEAN_CAFE_INTRO,
  OCEAN_CAFE_META,
  OCEAN_CAFE_OVERVIEW_LEAD,
  OCEAN_CAFE_VIDEO,
  OCEAN_CAFE_VIDEO_HEIGHT,
  OCEAN_CAFE_VIDEO_WIDTH,
} from "@/data/oceanCafePage";

interface OceanCafeDiningProps {
  name: string;
  description: string;
  amenities: string[];
  mapLink: string;
  phone: string;
  faqs: FaqItem[];
}

export default function OceanCafeDining({
  name,
  description,
  amenities,
  mapLink,
  phone,
  faqs,
}: OceanCafeDiningProps) {
  const [touristOpen, setTouristOpen] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = videoMuted;
    void el.play().catch(() => {});
  }, [videoMuted]);

  const allImages = OCEAN_CAFE_GALLERY_IMAGES;

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

      {/* Video reel — autoplay loop, no controls; mute toggle on the side */}
      <div className="mb-16 md:mb-24 flex justify-center items-center gap-3 sm:gap-4">
        <div className="relative w-full max-w-[min(100%,280px)] sm:max-w-[320px] aspect-[9/16] overflow-hidden bg-black/40 ring-1 ring-[#c9a84c]/25">
          <video
            ref={videoRef}
            src={OCEAN_CAFE_VIDEO}
            autoPlay
            muted={videoMuted}
            loop
            playsInline
            preload="auto"
            width={OCEAN_CAFE_VIDEO_WIDTH}
            height={OCEAN_CAFE_VIDEO_HEIGHT}
            className="w-full h-full object-cover"
            onPause={(e) => {
              void e.currentTarget.play().catch(() => {});
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setVideoMuted((m) => !m)}
          className="flex-shrink-0 w-11 h-11 border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors flex items-center justify-center"
          aria-label={videoMuted ? "Unmute video" : "Mute video"}
          title={videoMuted ? "Unmute" : "Mute"}
        >
          {videoMuted ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M9 9v6h3l4 4V5L12 9H9z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h3l4 4V5L12 9H9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
            </svg>
          )}
        </button>
      </div>

      <PropertyStyleGallery images={allImages} label="Ocean Café" className="mb-16 md:mb-20" />

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
                <div className="font-futura text-2xl md:text-3xl text-[#f4ebe1] font-light uppercase tracking-widest">
                  Reserve Your Table
                </div>
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
              <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#e8dfd0]/60 group-hover:text-[#f4ebe1] uppercase transition-colors">
                Nearby Tourist Places
              </h2>
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
                    <h3 className="font-futura text-[10px] tracking-widest text-[#c9a84c] uppercase">
                      {route.title}
                    </h3>
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
          </div>
        </div>
      </div>

      {faqs.length > 0 ? (
        <div className="max-w-3xl w-full mx-auto mt-16 md:mt-24 pt-2">
          <ExpandablePageFaq faqs={faqs} title="Frequently Asked Questions" showTopBorder />
        </div>
      ) : null}
    </div>
  );
}
