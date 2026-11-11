"use client";

import { useState } from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { PROPERTY_RELATED } from "@/data/propertyRelated";
import { PROPERTY_GUESTS } from "@/data/propertyGuests";
import { CATEGORY_MAP } from "@/utils/categories";
import { getPropertyKeywordSeo } from "@/data/keywordGuide";
import ExpandablePageFaq from "@/components/ExpandablePageFaq";

/** Upscale small source files in lightbox so they fill the viewport like full-size property photos. */
function LightboxPhoto({ src, alt }: { src: string; alt: string }) {
  const fitToViewport = (img: HTMLImageElement) => {
    const maxW = Math.min(window.innerWidth * 0.92, 1280);
    const maxH = window.innerHeight * 0.78;
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 5);
    if (scale > 1.05) {
      img.style.width = `${Math.round(img.naturalWidth * scale)}px`;
      img.style.height = `${Math.round(img.naturalHeight * scale)}px`;
      img.style.maxWidth = "none";
      img.style.maxHeight = "none";
    } else {
      img.style.width = "";
      img.style.height = "";
      img.style.maxWidth = "";
      img.style.maxHeight = "";
    }
  };

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      onLoad={(e) => fitToViewport(e.currentTarget)}
      className="max-h-[min(85vh,900px)] max-w-[min(95vw,1280px)] w-auto h-auto object-contain"
    />
  );
}

interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  price: string;
  bedrooms: number;
  guests?: number;
  acreage?: string;
  sqft?: string;
  completion?: string;
  amenities: string[];
  heroImage: string;
  gallery: string[];
}

interface PropertyDetailSectionProps {
  property: Property;
  mapLink?: string;
  seoLead?: string;
}

// Phone numbers per property
const PROPERTY_PHONES: Record<string, string> = {
  "ocean-waves":    "+91 9980208289",
  "ocean-elite":    "+91 9980208289",
  "ocean-manor":    "+91 9980208289",
  "ocean-bliss":    "+91 9980208289",
  "ocean-daaffy":   "+91 9980208289",
  "arya":           "+91 9980208289",
  "marina-villa":   "+91 9980208289",
  "krshna":         "+91 9980208289",
  "charm-villa":    "+91 9980208289",
  "de-homes":       "+91 9380740060",
  "aradhya-villa":  "+91 9980208289",
  "ocean-hridayam": "+91 9980208289",
  "ocean-cafe":     "+91 9972231289",
  "ocean-givaah":   "+91 9980208289",
  "villa":          "+91 9980208289",
  "ocean-royal":    "+91 9980208289",
  "regal-villa":    "+91 9980208289",
  "reunion-serene":  "+91 9980208289",
};

// Guest/Room capacity info per property
const GUEST_INFO: Record<string, string[]> = {
  "ocean-elite":    ["Up to 6 Guests"],
  "ocean-manor":    ["3 Rooms", "1st Floor — Up to 6 Guests", "Ground Floor — 2 Rooms, Up to 3 Guests Each"],
  "ocean-givaah":   ["Up to 9 Guests"],
  "ocean-royal":    ["Up to 15 Guests"],
  "ocean-daaffy":   ["Up to 9 Guests"],
  "ocean-hridayam": ["Up to 6 Guests"],
  "ocean-bliss":    ["Up to 6 Guests"],
  "marina-villa":   ["Up to 10 Guests"],
  "charm-villa":    ["Up to 9 Guests"],
  "aradhya-villa":  ["Up to 12 Guests"],
  "arya":           ["2 Rooms", "Each Room — Up to 3 Guests"],
  "krshna":         ["Up to 6 Guests"],
  "ocean-waves":    ["3 Rooms", "1 Room — Up to 6 Guests", "2 Rooms — Up to 3 Guests Each"],
  "regal-villa":    ["Up to 6 Guests"],
  "villa":          ["Up to 10 Guests"],
  "de-homes":       ["16 Premium Rooms"],
  "reunion-serene":  ["4 Bedrooms", "Up to 8 Guests"],
};

// Property Guidelines & Facilities per property
const PROPERTY_GUIDELINES: Record<string, { power: string; highlightDetail: string }> = {
  "ocean-elite":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Spacious Private Lawn" },
  "ocean-manor":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Independent Ground & First Floor Layouts" },
  "ocean-givaah":   { power: "Heavy-Duty Generator Backup", highlightDetail: "Private Pool (4ft Depth)" },
  "ocean-royal":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Heritage Farmhouse Setting" },
  "de-homes":       { power: "Central City Power Grid", highlightDetail: "Premium Suites (Standard to Presidential)" },
  "ocean-daaffy":   { power: "Reliable UPS Power Backup", highlightDetail: "Tranquil Natural Surroundings" },
  "ocean-hridayam": { power: "Reliable UPS Power Backup", highlightDetail: "Split-Level Family Layout" },
  "ocean-bliss":    { power: "Reliable UPS Power Backup", highlightDetail: "Open Compound Villa" },
  "marina-villa":   { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & AC" },
  "charm-villa":    { power: "Reliable UPS Power Backup", highlightDetail: "First Floor 3BHK Residence" },
  "aradhya-villa":  { power: "Central City Power Grid", highlightDetail: "4BHK with Bathtub & Closed Terrace" },
  "arya":           { power: "Reliable UPS Power Backup", highlightDetail: "2 Independent 1BHKs (1st Floor)" },
  "krshna":         { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & Parking" },
  "ocean-waves":    { power: "AC, Geyser & Refrigerator Equipped", highlightDetail: "CCTV Secured / Quiet Living" },
  "regal-villa":    { power: "Balcony & Terrace Access", highlightDetail: "Free Private Parking & WiFi" },
  "villa":          { power: "3 Bedrooms (2 AC + 1 Non-AC)", highlightDetail: "Meals Arranged on Request" },
  "ocean-cafe":     { power: "Fireplace & Live Music (Select Days)", highlightDetail: "Open Daily: 9:30 AM – 10:00 PM" },
  "reunion-serene":  { power: "Standard Grid Power", highlightDetail: "Private Outdoor Pool · Terrace & Garden" },
};

export type { FAQ } from "@/data/propertyFaqs";
export { PROPERTY_FAQS } from "@/data/propertyFaqs";

// Nearby Tourist Places — 4 route groups with accurate Google Maps search URLs
export interface TouristPlace {
  name: string;
  mapUrl: string;
}

export interface RouteGroup {
  title: string;
  places: TouristPlace[];
}

export const SERENE_TOURIST_ROUTES: RouteGroup[] = [
  {
    title: "Shivamogga & Malnad Highlights",
    places: [
      { name: "Jog Falls", mapUrl: "https://www.google.com/maps/search/?api=1&query=Jog+Falls+Karnataka" },
      { name: "Sakrebailu Elephant Camp", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sakrebailu+Elephant+Camp+Shivamogga" },
      { name: "Tyavarekoppa Lion & Tiger Safari", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tyavarekoppa+Lion+Safari+Shivamogga" },
      { name: "Gajanur Dam", mapUrl: "https://www.google.com/maps/search/?api=1&query=Gajanur+Dam+Shivamogga" },
      { name: "Mandagadde Bird Sanctuary", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mandagadde+Bird+Sanctuary+Shivamogga" },
      { name: "Agumbe Rainforest", mapUrl: "https://www.google.com/maps/search/?api=1&query=Agumbe+Karnataka" },
      { name: "Koodli Sangama", mapUrl: "https://www.google.com/maps/search/?api=1&query=Koodli+Sangama+Shivamogga" },
      { name: "Sacred Heart Cathedral", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sacred+Heart+Cathedral+Shivamogga" },
    ],
  },
];

export const TOURIST_ROUTES: RouteGroup[] = [
  {
    title: "Udupi → Malpe Route",
    places: [
      { name: "Sri Krishna Matha", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Matha+Udupi+Karnataka" },
      { name: "Anantheshwara Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Anantheshwara+Temple+Udupi+Karnataka" },
      { name: "Chandramouleshwara Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Chandramouleshwara+Temple+Udupi+Karnataka" },
      { name: "Bhujanga Park", mapUrl: "https://www.google.com/maps/search/?api=1&query=Bhujanga+Park+Udupi+Karnataka" },
      { name: "Hasta Shilpa Heritage Village", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hasta+Shilpa+Heritage+Village+Manipal+Karnataka" },
      { name: "Malpe Sea Walk", mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Sea+Walk+Malpe+Karnataka" },
      { name: "Malpe Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Beach+Udupi+Karnataka" },
      { name: "Daria Bahadurgad Fort (Sea Fort)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Daria+Bahadurgad+Fort+Malpe+Karnataka" },
      { name: "St. Mary's Island (Boat from Malpe)", mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Marys+Island+Malpe+Karnataka" },
      { name: "Delta Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Delta+Beach+Kodi+Bengre+Udupi" },
      { name: "Kodi Bengre Delta", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodi+Bengre+Delta+Point+Udupi" },
    ],
  },
  {
    title: "Udupi → Kapu → Mangaluru Route",
    places: [
      { name: "Mattu Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mattu+Beach+Udupi+Karnataka" },
      { name: "Kapu Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Beach+Udupi+Karnataka" },
      { name: "Kapu Lighthouse", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Lighthouse+Kaup+Karnataka" },
      { name: "Shree Hosa Marigudi Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Shree+Hosa+Marigudi+Temple+Kaup+Karnataka" },
      { name: "Padubidri Blue Flag Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Padubidri+Blue+Flag+Beach+Karnataka" },
      { name: "Uchila Mahalakshmi Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Uchila+Mahalakshmi+Temple+Udupi+Karnataka" },
      { name: "Hejamady Scenic Bridge", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hejamadi+Bridge+Karnataka" },
    ],
  },
  {
    title: "Udupi → Brahmavar → Kundapura Route",
    places: [
      { name: "Saligrama Kayaking (Swarna River)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Saligrama+Kayaking+Udupi+Karnataka" },
      { name: "Anegudde Sri Vinayaka Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Anegudde+Sri+Vinayaka+Temple+Kumbhashi" },
      { name: "Ottinene View Point", mapUrl: "https://www.google.com/maps/search/?api=1&query=Ottinene+View+Point+Byndoor+Karnataka" },
      { name: "Maravanthe Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Maravanthe+Beach+Kundapura+Karnataka" },
      { name: "Byndoor Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Byndoor+Beach+Karnataka" },
      { name: "Kollur Mookambika Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kollur+Mookambika+Temple+Karnataka" },
      { name: "Kodachadri Hills", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodachadri+Hills+Karnataka" },
    ],
  },
  {
    title: "Udupi → Karkala → Hebri Route",
    places: [
      { name: "Pajaka Kshetra", mapUrl: "https://www.google.com/maps/search/?api=1&query=Pajaka+Kshetra+Udupi+Karnataka" },
      { name: "Hiriyadka Veerabhadra Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hiriyadka+Veerabhadra+Temple+Karnataka" },
      { name: "St. Lawrence Shrine, Attur", mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Lawrence+Shrine+Attur+Karkala" },
      { name: "Karkala Gomateshwara Statue", mapUrl: "https://www.google.com/maps/search/?api=1&query=Gomateshwara+Statue+Karkala+Karnataka" },
      { name: "Chaturmukha Basadi", mapUrl: "https://www.google.com/maps/search/?api=1&query=Chaturmukha+Basadi+Karkala+Karnataka" },
      { name: "Varanga Jain Temple & Lake", mapUrl: "https://www.google.com/maps/search/?api=1&query=Varanga+Jain+Temple+Karkala+Karnataka" },
    ],
  },
];

export default function PropertyDetailSection({ property, mapLink, seoLead }: PropertyDetailSectionProps) {
  const keywordSeo = getPropertyKeywordSeo(property.id);
  const faqs = keywordSeo?.faqs ?? [];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touristOpen, setTouristOpen] = useState(false);
  const [expandedRoutes, setExpandedRoutes] = useState<Record<number, boolean>>({});

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.heroImage];
  const gridSlots = images.slice(0, 5);
  const extraPhotoCount = Math.max(0, images.length - 5);

  const openLightbox = (idx: number) => {
    setSelectedImageIdx(idx);
    setLightboxOpen(true);
  };

  const lightboxPrev = () =>
    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
  const lightboxNext = () =>
    setSelectedImageIdx((prev) => (prev + 1) % images.length);

  const toggleRoute = (idx: number) => {
    setExpandedRoutes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Highlights: bedrooms + amenities only (no guest count — not provided by user)
  const highlights: string[] = property.bedrooms > 0
    ? [
        `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`,
        ...property.amenities,
      ]
    : property.amenities;

  const guestInfo = GUEST_INFO[property.id];
  const hasCapacityTags = property.bedrooms > 0 || Boolean(guestInfo?.length);

  return (
    <section className="bg-[#060606] w-full">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12 pt-8 md:pt-10 pb-24">

        {hasCapacityTags && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-end mb-8 md:mb-10 pt-8 md:pt-10">
            {property.bedrooms > 0 && (
              <span className="font-futura text-[10px] tracking-[0.2em] uppercase text-white/90 border border-white/15 bg-white/[0.03] px-4 py-2">
                {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}
              </span>
            )}
            {guestInfo?.map((line, i) => (
              <span
                key={i}
                className="font-futura text-[10px] tracking-[0.2em] uppercase text-white/90 border border-white/15 bg-white/[0.03] px-4 py-2"
              >
                {line}
              </span>
            ))}
          </div>
        )}

        {/* Bento gallery */}
        <div
          className={
            hasCapacityTags ? "mb-14 md:mb-16" : "mb-14 md:mb-16 pt-8 md:pt-10"
          }
        >
          {images.length === 1 ? (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
            >
              <img
                src={images[0]}
                alt={`${property.name} — photo 1`}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </button>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2.5 h-[min(68vh,640px)] rounded-xl overflow-hidden">
                {gridSlots.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => openLightbox(i)}
                    className={`relative overflow-hidden bg-[#0a0a0a] group ring-1 ring-white/5 ${
                      i === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${property.name} — photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {i === 4 && extraPhotoCount > 0 && (
                      <span className="absolute inset-0 bg-black/55 flex items-center justify-center font-futura text-sm tracking-[0.25em] uppercase text-white">
                        +{extraPhotoCount} photos
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="md:hidden space-y-3">
                <button
                  type="button"
                  onClick={() => openLightbox(selectedImageIdx)}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
                >
                  <img
                    src={images[selectedImageIdx]}
                    alt={`${property.name} — photo ${selectedImageIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setSelectedImageIdx(i)}
                      className={`flex-none w-20 h-20 rounded-md overflow-hidden ring-2 transition-all ${
                        selectedImageIdx === i ? "ring-[#C9A84C]" : "ring-transparent opacity-60"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="mt-4 hidden md:inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              View all {images.length} photos
            </button>
          )}
        </div>

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${property.name} photo gallery`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="font-futura text-[10px] tracking-[0.3em] text-white/60 uppercase">
                {selectedImageIdx + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="font-futura text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white px-3 py-2"
              >
                Close
              </button>
            </div>
            <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-6">
              <button
                type="button"
                onClick={lightboxPrev}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <LightboxPhoto
                src={images[selectedImageIdx]}
                alt={`${property.name} — photo ${selectedImageIdx + 1}`}
              />
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="px-5 pb-6 flex gap-2 overflow-x-auto justify-center [&::-webkit-scrollbar]:hidden">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setSelectedImageIdx(i)}
                  className={`flex-none w-14 h-14 rounded overflow-hidden ring-2 ${
                    selectedImageIdx === i ? "ring-[#C9A84C]" : "ring-transparent opacity-50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info & enquiry — mobile: guidelines → form → call/map; desktop: form sticky right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-24 lg:gap-y-16 items-start">

          {/* Block 1 — Overview through Guidelines */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            <div className="space-y-6">
              <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Overview</h2>
              {seoLead ? (
                <p className="text-white/80 font-futura text-[15px] md:text-base leading-[2] font-light tracking-wide">
                  {seoLead}
                </p>
              ) : null}
              <p className="text-white/80 font-futura text-[15px] md:text-base leading-[2] font-light tracking-wide">
                {property.description}
              </p>
              {(property.bedrooms > 0 || PROPERTY_GUESTS[property.id]) && (
                <p className="text-white/55 font-futura text-sm font-light leading-relaxed tracking-wide border-l border-[#C9A84C]/40 pl-4">
                  <span className="text-[#C9A84C]/80 uppercase text-[10px] tracking-[0.25em] block mb-1">
                    At a glance
                  </span>
                  {property.name} · {property.location}
                  {property.bedrooms > 0 ? ` · ${property.bedrooms} bedroom${property.bedrooms > 1 ? "s" : ""}` : ""}
                  {PROPERTY_GUESTS[property.id] ? ` · ${PROPERTY_GUESTS[property.id]}` : ""}
                </p>
              )}
            </div>

            {PROPERTY_RELATED[property.id]?.length ? (
              <div className="space-y-4">
                <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Similar stays</h2>
                <p className="text-white/50 font-futura text-[13px] leading-relaxed font-light tracking-wide">
                  {PROPERTY_RELATED[property.id].map((link, i) => (
                    <span key={link.href}>
                      {i > 0 ? " · " : null}
                      <Link href={link.href} className="text-[#C9A84C]/90 hover:text-[#C9A84C] transition-colors">
                        {link.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ) : null}

            {CATEGORY_MAP[property.id]?.[0] === "beach-villas" ? (
              <div className="space-y-3">
                <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">
                  More Beach Stays in Udupi
                </h2>
                <p className="font-futura text-sm text-white/50 font-light tracking-wide">
                  <Link href="/properties/category/beach-villas" className="text-[#C9A84C] hover:underline">
                    More Beach Stays in Udupi
                  </Link>
                </p>
              </div>
            ) : null}
            {CATEGORY_MAP[property.id]?.[0] === "city-stays" ? (
              <div className="space-y-3">
                <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">
                  More City Stays in Udupi
                </h2>
                <p className="font-futura text-sm text-white/50 font-light tracking-wide">
                  <Link href="/properties/category/city-stays" className="text-[#C9A84C] hover:underline">
                    More City Stays in Udupi
                  </Link>
                </p>
              </div>
            ) : null}

            <div className="space-y-6">
              <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Amenities & Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shrink-0"></span>
                    <span className="font-futura text-sm text-white/70 group-hover/item:text-white transition-colors duration-300 font-light tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {property.id !== "ocean-cafe" && (
              <div className="space-y-6">
                <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Guidelines</h2>
                <div className="space-y-4 font-futura text-sm tracking-wide font-light text-white/60">
                  <div className="flex items-start gap-4">
                    <span className="uppercase text-[#C9A84C] w-32 shrink-0 text-[11px] tracking-[0.2em] mt-0.5">Power</span>
                    <span className="text-white/90">{PROPERTY_GUIDELINES[property.id]?.power || "Reliable Power Backup"}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="uppercase text-[#C9A84C] w-32 shrink-0 text-[11px] tracking-[0.2em] mt-0.5">Detail</span>
                    <span className="text-white/90">{PROPERTY_GUIDELINES[property.id]?.highlightDetail || "Curated Comfort & Convenience"}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Enquiry form — after guidelines on mobile; sticky right on desktop */}
          <div className="lg:col-span-5 lg:row-span-2 w-full">
            <div id="reserve-form-container" className="lg:sticky lg:top-24 py-2 lg:py-0">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] block mb-3 uppercase">Inquire</span>
                  <div className="font-cormorant italic text-3xl md:text-4xl text-white font-light leading-snug">
                    {property.id === "ocean-cafe" ? "Reserve Table" : "Reserve Stay"}
                  </div>
                </div>
                <ContactForm
                  defaultPreference={property.name}
                  whatsappNumber={PROPERTY_PHONES[property.id] ? PROPERTY_PHONES[property.id].replace(/[^\d]/g, "") : "919980208289"}
                  instagramHandle={
                    property.id === "de-homes"
                      ? "@de_homes_reunion"
                      : property.id === "ocean-cafe"
                      ? "@reunionteam19"
                      : undefined
                  }
                />
              </div>
            </div>
          </div>

          {/* Block 2 — Call / Map, then tourist & FAQ */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row gap-4">
              {PROPERTY_PHONES[property.id] && (
                <a
                  href={`tel:${PROPERTY_PHONES[property.id].replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/40 bg-transparent text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
                >
                  Call Us
                </a>
              )}
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-transparent text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
                >
                  Map
                </a>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={() => setTouristOpen(!touristOpen)}
                className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
              >
                <h2 className="font-futura text-[11px] tracking-[0.3em] text-white/70 group-hover:text-white uppercase transition-colors">
                  Nearby Tourist Places
                </h2>
                <span className="text-[#C9A84C] text-xl leading-none">{touristOpen ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${touristOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="py-6 space-y-8">
                  {property.id !== "reunion-serene" && (
                    <p className="font-futura text-[13px] text-white/55 font-light tracking-wide">
                      <Link href="/blogs/tourist-places-in-udupi" className="text-[#C9A84C] hover:underline">
                        See all tourist places in Udupi
                      </Link>
                    </p>
                  )}
                  {(property.id === "reunion-serene" ? SERENE_TOURIST_ROUTES : TOURIST_ROUTES).map((route, rIdx) => (
                    <div key={rIdx} className="space-y-4">
                      <h3 className="font-futura text-[10px] tracking-widest text-[#C9A84C] uppercase">{route.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {route.places.map((place, pIdx) => (
                          <a key={pIdx} href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="font-futura text-[13px] font-light tracking-wide text-white/70 hover:text-white transition-colors flex items-center gap-3">
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            {place.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {faqs.length > 0 ? (
                <ExpandablePageFaq
                  faqs={faqs}
                  title="Frequently Asked Questions"
                  showTopBorder
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
