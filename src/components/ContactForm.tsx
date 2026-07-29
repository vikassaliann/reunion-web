"use client";

import { useState } from "react";

interface ContactFormProps {
  defaultPreference?: string;
  whatsappNumber?: string; // override WhatsApp number per property
  instagramHandle?: string; // optional secondary Instagram handle (e.g. De Homes)
}

export default function ContactForm({
  defaultPreference = "",
  whatsappNumber = "919980208289",
  instagramHandle,
}: ContactFormProps) {
  const [status, setStatus] = useState("Submit Inquiry");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      preference: formData.get("preference") as string,
      checkin: formData.get("checkin") as string,
      checkout: formData.get("checkout") as string,
      description: formData.get("description") as string,
    };

    const isOceanCafe = whatsappNumber === "919972231289" || (data.preference && (data.preference.toLowerCase().includes("cafe") || data.preference.toLowerCase().includes("café")));

    const message = isOceanCafe
      ? `Hello Reunion Ocean Café! I would like to reserve my stay / table.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Date: ${data.checkin || "Not specified"}
Time/Details: ${data.description || "None provided"}`
      : `Hello Reunion! I would like to inquire about your villas.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Preference: ${data.preference || "Not specified"}
Check-In: ${data.checkin || "Not specified"}
Check-Out: ${data.checkout || "Not specified"}
Inquiry Details: ${data.description || "None provided"}`;

    try {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
      setStatus("Sent ✓");
    } catch {
      setStatus("Error — Please try again");
    }
  };

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base";
  const labelClass =
    "absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none";

  return (
    <div className="w-full max-w-[480px]">
      <p className="font-label-caps text-[9px] sm:text-label-caps text-primary tracking-[0.3em] uppercase mb-2 sm:mb-4">INQUIRIES</p>
      <h2 className="font-display-xl text-[24px] sm:text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 sm:mb-8 leading-tight">Connect<br />With Us</h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="relative group">
          <input name="name" className={fieldClass} id="name" placeholder="Full Name" required type="text" />
          <label className={labelClass} htmlFor="name">FULL NAME</label>
        </div>

        {/* Phone */}
        <div className="relative group">
          <input name="phone" className={fieldClass} id="phone" placeholder="Phone Number" required type="tel" />
          <label className={labelClass} htmlFor="phone">PHONE NUMBER</label>
        </div>

        {/* Email */}
        <div className="relative group">
          <input name="email" className={fieldClass} id="email" placeholder="Email Address" required type="email" />
          <label className={labelClass} htmlFor="email">EMAIL ADDRESS</label>
        </div>

        {/* Preferred Estate */}
        <div className="relative group">
          <textarea name="preference" defaultValue={defaultPreference} className={`${fieldClass} resize-none`} id="preference" placeholder="Preferred Estate" rows={1}></textarea>
          <label className={labelClass} htmlFor="preference">PREFERRED ESTATE OR REGION</label>
        </div>

        {/* Check-In & Check-Out */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <input
              name="checkin"
              type="date"
              className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors text-sm sm:text-base text-on-surface-variant/80 focus:text-white [color-scheme:dark]"
              id="checkin"
            />
            <label className="block font-label-caps text-[8px] tracking-[0.3em] text-on-surface-variant/50 uppercase mb-1" htmlFor="checkin">CHECK-IN</label>
          </div>
          <div className="relative group">
            <input
              name="checkout"
              type="date"
              className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors text-sm sm:text-base text-on-surface-variant/80 focus:text-white [color-scheme:dark]"
              id="checkout"
            />
            <label className="block font-label-caps text-[8px] tracking-[0.3em] text-on-surface-variant/50 uppercase mb-1" htmlFor="checkout">CHECK-OUT</label>
          </div>
        </div>

        {/* Message */}
        <div className="relative group">
          <textarea name="description" className={`${fieldClass} resize-none`} id="description" placeholder="Inquiry Details" rows={2}></textarea>
          <label className={labelClass} htmlFor="description">MESSAGE / DESCRIPTION OF STAY</label>
        </div>

        {/* Instagram handle (De Homes specific) */}
        {instagramHandle && (
          <p className="font-cinzel text-[9px] tracking-[0.3em] text-[#C9A84C]/60 uppercase">
            Also find us on Instagram:{" "}
            <a
              href={`https://instagram.com/${instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] hover:underline"
            >
              {instagramHandle}
            </a>
          </p>
        )}

        <button
          className="w-full py-4 sm:py-5 border border-antique-gold text-primary font-label-caps text-[10px] tracking-[0.3em] hover:bg-antique-gold hover:text-surface-dim transition-all duration-500 uppercase gold-shimmer bg-transparent font-bold"
          type="submit"
        >
          {status}
        </button>
      </form>
    </div>
  );
}
