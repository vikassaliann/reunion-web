"use client";

import { useRef } from "react";
import ContactForm from "@/components/ContactForm";

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
}

export default function PropertyDetailSection({ property, mapLink }: PropertyDetailSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.heroImage];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Highlights: bedrooms + amenities only (no guest count — not provided by user)
  const highlights: string[] = [
    `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`,
    ...property.amenities,
  ];

  // Helper to determine destination details based strictly on user-provided description facts
  const getDestinationDetails = () => {
    const id = property.id;
    
    // Default values
    let beach = "Direct Beach Access";
    let attraction = "Udupi Coastline";
    let power = "Power Backup Available";
    let highlightDetail = "Premium Coastal Living";
    
    if (id === "ocean-elite") {
      beach = "Direct Beach Access";
      attraction = "Padutonse Beachfront";
      power = "Heavy-Duty Generator Backup";
      highlightDetail = "Spacious Private Lawn";
    } else if (id === "ocean-manor") {
      beach = "Rock Bed Access to Shore";
      attraction = "Sea & River Facing Balcony";
      power = "Heavy-Duty Generator Backup";
      highlightDetail = "Independent Ground & First Floor Layouts";
    } else if (id === "ocean-givaah") {
      beach = "200m from Shoreline";
      attraction = "Ocean-View Terrace";
      power = "Heavy-Duty Generator Backup";
      highlightDetail = "Private Pool (4ft Depth)";
    } else if (id === "ocean-royal") {
      beach = "50m from Shoreline";
      attraction = "Kapu Beach & Lighthouse Area";
      power = "Heavy-Duty Generator Backup";
      highlightDetail = "Heritage Farmhouse Setting";
    } else if (id === "de-homes") {
      beach = "8 km to Malpe Beach";
      attraction = "Sacred Sri Krishna Temple (Walking Distance)";
      power = "Central City Power Grid";
      highlightDetail = "Premium Suites (Standard to Presidential)";
    } else if (id === "ocean-daaffy") {
      beach = "100m from Shoreline";
      attraction = "Pristine Bada Beachfront";
      power = "Reliable UPS Power Backup";
      highlightDetail = "Tranquil Natural Surroundings";
    } else if (id === "ocean-hridayam") {
      beach = "Beachfront Location";
      attraction = "Beach-Facing Balcony (1st Floor)";
      power = "Reliable UPS Power Backup";
      highlightDetail = "Split-Level Family Layout";
    } else if (id === "ocean-bliss") {
      beach = "800m from Shoreline";
      attraction = "Malpe Coastal Region";
      power = "Reliable UPS Power Backup";
      highlightDetail = "Open Compound Estate";
    } else if (id === "marina-villa") {
      beach = "8 km to Malpe Beach";
      attraction = "Udupi City Center";
      power = "Reliable UPS Power Backup";
      highlightDetail = "Fully Furnished Kitchen & AC";
    } else if (id === "charm-villa") {
      beach = "8 km to Malpe Beach";
      attraction = "Badagabettu Udupi Area";
      power = "Reliable UPS Power Backup";
      highlightDetail = "First Floor 3BHK Residence";
    } else if (id === "aradhya-villa") {
      beach = "8 km to Malpe Beach";
      attraction = "700m from Sri Krishna Temple";
      power = "Central City Power Grid";
      highlightDetail = "4BHK with Bathtub & Closed Terrace";
    } else if (id === "arya") {
      beach = "8 km to Malpe Beach";
      attraction = "Kunjibettu Udupi Area";
      power = "Reliable UPS Power Backup";
      highlightDetail = "2 Independent 1BHKs (1st Floor)";
    } else if (id === "krshna") {
      beach = "10 km to Malpe Beach";
      attraction = "Manipal University Area";
      power = "Reliable UPS Power Backup";
      highlightDetail = "Fully Furnished Kitchen & Parking";
    } else if (id === "ocean-waves") {
      beach = "5m from Shoreline (Cross the road)";
      attraction = "Mattu Coastal Beachfront";
      power = "AC, Geyser & Refrigerator Equipped";
      highlightDetail = "CCTV Secured / No Bachelor Students";
    } else if (id === "regal-villa") {
      beach = "8 km to Malpe Beach";
      attraction = "Chitpady Udupi Area";
      power = "Balcony & Terrace Access";
      highlightDetail = "Free Private Parking & WiFi";
    } else if (id === "villa") {
      beach = "8 km to Shoreline";
      attraction = "Chitpady Area (5km to Manipal)";
      power = "3 Bedrooms (2 AC + 1 Non-AC)";
      highlightDetail = "Meals Arranged on Request";
    }

    return { beach, attraction, power, highlightDetail };
  };

  const dest = getDestinationDetails();

  return (
    <section className="bg-[#060606] w-full border-t border-[#C9A84C]/10">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 py-16 space-y-12">
        {/* Property Title Block */}
        <div className="space-y-4">
          <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C]/70 uppercase block">
            {property.location}
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-[2.8rem] font-light text-white leading-tight">
            {property.name}
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A84C]/30 mt-2"></div>
        </div>

        {/* Scrollable Gallery Carousel */}
        <div className="relative group w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-[#C9A84C]/25 scrollbar-track-transparent"
            style={{ scrollbarWidth: "thin" }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="flex-none w-[85%] md:w-[65%] lg:w-[55%] aspect-[16/10] snap-center rounded-lg overflow-hidden border border-[#C9A84C]/15 relative bg-[#070707] shadow-lg group-hover:border-[#C9A84C]/30 transition-all duration-500"
              >
                <img
                  src={src}
                  alt={`${property.name} gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[9px] tracking-widest font-mono text-white/95 rounded">
                  {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/75 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/75 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Info & Enquiry Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#C9A84C]/10 items-start">
          {/* Left Column — Description, Highlights & Location Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* Description Block */}
            <div className="space-y-4">
              <h3 className="font-cormorant text-2xl font-light text-[#C9A84C] italic">The Sanctuary Overview</h3>
              <p className="text-[#9a9590] text-sm md:text-[15px] leading-[1.85]">
                {property.description}
              </p>
            </div>

            {/* Highlights (Bedrooms + Amenities) */}
            <div className="space-y-5">
              <h4 className="font-cinzel text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase">Property Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0 group-hover/item:scale-150 transition-transform" />
                    <span className="text-[13px] text-[#b0aba6] group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Button */}
            {mapLink && (
              <div className="pt-2">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 py-3.5 px-7 border border-[#C9A84C]/45 text-[#C9A84C] hover:text-black hover:bg-[#C9A84C] hover:border-transparent transition-all duration-500 font-cinzel text-[9px] tracking-[0.3em] uppercase rounded-sm bg-transparent"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  View Location on Map
                  <svg className="w-2.5 h-2.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            )}

            {/* Travel Guide & Rules Dashboard (Fills the Dead Space at the bottom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#C9A84C]/10">
              {/* Box 1: Location & Distances */}
              <div className="bg-[#080808] border border-[#C9A84C]/10 p-6 rounded-lg space-y-4">
                <h4 className="font-cinzel text-[9.5px] tracking-widest text-[#C9A84C] font-semibold uppercase">Destination & Travel</h4>
                <ul className="space-y-2.5 text-xs text-[#9a9590]">
                  <li className="flex justify-between border-b border-[#C9A84C]/5 pb-1.5">
                    <span>Nearest Beach:</span>
                    <span className="text-white text-right">{dest.beach}</span>
                  </li>
                  <li className="flex justify-between pb-0.5">
                    <span>Attraction:</span>
                    <span className="text-white text-right">{dest.attraction}</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Stay Guidelines & Concierge */}
              <div className="bg-[#080808] border border-[#C9A84C]/10 p-6 rounded-lg space-y-4">
                <h4 className="font-cinzel text-[9.5px] tracking-widest text-[#C9A84C] font-semibold uppercase">Stay Guidelines</h4>
                <ul className="space-y-2.5 text-xs text-[#9a9590]">
                  <li className="flex justify-between border-b border-[#C9A84C]/5 pb-1.5">
                    <span>Power Security:</span>
                    <span className="text-white text-right">{dest.power}</span>
                  </li>
                  <li className="flex justify-between pb-0.5">
                    <span>Highlights:</span>
                    <span className="text-white text-right">{dest.highlightDetail}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column — Enquiry Form (Compact on Mobile) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 bg-[#070707] border border-[#C9A84C]/15 rounded-lg p-4 sm:p-8 shadow-xl max-w-[440px] lg:max-w-none w-full mx-auto">
            <div className="space-y-6">
              <div>
                <span className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/60 block mb-2 uppercase">Inquire</span>
                <h3 className="font-cormorant text-2xl text-white font-light">Reserve Your Stay</h3>
                <div className="w-8 h-[1px] bg-[#C9A84C]/25 mt-4"></div>
              </div>
              <ContactForm defaultPreference={property.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
