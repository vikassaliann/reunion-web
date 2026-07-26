"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PartnerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export function usePartner() {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartner must be used within a PartnerProvider");
  }
  return context;
}

function PartnerOverlayUI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    const payload = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      location: (formData.get("location") as string) || "",
      propertyType: (formData.get("propertyType") as string) || "",
      rooms: (formData.get("rooms") as string) || "",
      source: (formData.get("source") as string) || "",
      link: (formData.get("link") as string) || "",
      description: (formData.get("description") as string) || "",
    };

    const fullMessage = `*PARTNER WITH US REQUEST - REUNION*

*Name*: ${payload.firstName} ${payload.lastName}
*Email*: ${payload.email}
*Phone*: +91 ${payload.phone}
*Location*: ${payload.location}
*Property Type*: ${payload.propertyType}
*Rooms*: ${payload.rooms}
*Referral Source*: ${payload.source}
*Photos/Website Link*: ${payload.link || "N/A"}
*Description*: ${payload.description || "N/A"}`;

    // 1. Always open WhatsApp tab immediately on submit click
    const targetWhatsApp = process.env.NEXT_PUBLIC_PARTNER_WHATSAPP || "919980208289";
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank");

    // 2. Dispatch Email in the background via Next.js API Route (No mail app opens)
    try {
      await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Backend partner submission failed:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{
        background: "rgba(6, 6, 6, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
      />

      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-12 h-12 flex items-center justify-center rounded-full border border-[#C9A84C]/40 text-[#C9A84C] hover:text-white bg-black/70 hover:bg-[#C9A84C]/20 transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation shadow-xl"
        aria-label="Close dialog"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl bg-[#0f0e0e] border border-[#C9A84C]/25 rounded-sm p-6 sm:p-8 md:p-10 my-auto shadow-[0_16px_60px_rgba(0,0,0,0.8)] text-left"
      >

        {/* Header Badges & Heading */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-[#C9A84C]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-cinzel text-[9px] tracking-[0.45em] uppercase font-semibold">Partner With Us</span>
          </div>

          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-light text-white leading-snug">
            Maximize Your Property&apos;s Earning Potential with <em className="text-[#C9A84C]">Reunion</em>
          </h2>
          <p className="font-cinzel text-[10px] tracking-[0.25em] text-[#C9A84C]/70 uppercase">
            Coastal Karnataka&apos;s Most Trusted Brand
          </p>
          <div className="w-16 h-px bg-[#C9A84C]/30" />
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h3 className="font-cormorant text-2xl text-white">Thank You for Reaching Out</h3>
            <p className="text-sm text-[#a09c98] max-w-md mx-auto">
              Your inquiry has been sent to our partner acquisition team (via WhatsApp &amp; Email). We will review your property details and contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-[#C9A84C] text-black font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#f0d78c] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  First Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    name="firstName"
                    required
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="lastName"
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            </div>

            {/* Email & Mobile Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  Email ID <span className="text-red-400">*</span>
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="your.name@example.com"
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>

              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  Mobile Phone <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="bg-[#161515] border border-white/10 rounded-sm px-3 py-2.5 text-sm text-[#C9A84C] font-mono flex items-center">
                    +91
                  </div>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Property Location & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  Select Property Location <span className="text-red-400">*</span>
                </label>
                <select
                  name="location"
                  required
                  defaultValue=""
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="" disabled>Select Location</option>
                  <option value="Udupi">Udupi</option>
                  <option value="Manipal">Manipal</option>
                  <option value="Malpe">Malpe</option>
                  <option value="Kapu / Mattu Beach">Kapu / Mattu Beach</option>
                  <option value="Mangalore">Mangalore</option>
                  <option value="Kundapura">Kundapura</option>
                  <option value="Other Coastal Karnataka">Other Coastal Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  What Type of Property Is It? <span className="text-red-400">*</span>
                </label>
                <select
                  name="propertyType"
                  required
                  defaultValue=""
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="" disabled>Select Property Type</option>
                  <option value="Beach Villa">Beach Villa</option>
                  <option value="City Villa">City Villa</option>
                  <option value="Boutique Hotel / Resort">Boutique Hotel / Resort</option>
                  <option value="Beachside Café / Restaurant">Beachside Café / Restaurant</option>
                  <option value="Apartments / Flats">Apartments / Flats</option>
                  <option value="Homestay">Homestay</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Room Count & Referral Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  How Many Rooms?
                </label>
                <select
                  name="rooms"
                  defaultValue=""
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="" disabled>Select Room Count</option>
                  <option value="1 - 2 Rooms">1 - 2 Rooms</option>
                  <option value="3 - 5 Rooms">3 - 5 Rooms</option>
                  <option value="6 - 10 Rooms">6 - 10 Rooms</option>
                  <option value="11 - 20 Rooms">11 - 20 Rooms</option>
                  <option value="20+ Rooms">20+ Rooms</option>
                </select>
              </div>

              <div>
                <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                  Where Did You Hear About Us? <span className="text-red-400">*</span>
                </label>
                <select
                  name="source"
                  required
                  defaultValue=""
                  className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="" disabled>Select Source</option>
                  <option value="Social Media (Instagram/Facebook)">Social Media (Instagram / Facebook)</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Existing Property Owner Referral">Existing Property Owner Referral</option>
                  <option value="Friend / Word of Mouth">Friend / Word of Mouth</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Photos / Website Link */}
            <div>
              <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                Photos / Website Link (If Any)
              </label>
              <input
                name="link"
                type="text"
                placeholder="Google Drive link, Airbnb listing, or website URL"
                className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            {/* Describe Property */}
            <div>
              <label className="block font-cinzel text-[9px] tracking-[0.2em] text-[#C9A84C]/80 uppercase mb-1.5">
                Describe Your Property
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Tell us about your property location, key amenities, and current setup..."
                className="w-full bg-[#161515] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#C9A84C] text-black font-cinzel text-[11px] tracking-[0.3em] font-semibold uppercase hover:bg-[#f0d78c] transition-all duration-300 gold-shimmer rounded-sm disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send a Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <PartnerContext.Provider value={{ isOpen, open, close }}>
      {children}
      <PartnerOverlayUI isOpen={isOpen} onClose={close} />
    </PartnerContext.Provider>
  );
}
