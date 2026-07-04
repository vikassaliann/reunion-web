"use client";

import { useState } from "react";

interface ContactFormProps {
  defaultPreference?: string;
}

export default function ContactForm({ defaultPreference = "" }: ContactFormProps) {
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
      description: formData.get("description") as string,
    };

    const message = `Hello Reunion Global! I would like to inquire about your estates.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Preference: ${data.preference || "Not specified"}
Inquiry Details: ${data.description || "None provided"}`;

    try {
      // Open WhatsApp — uses window.location.href so mobile opens the native app
      const whatsappUrl = `https://wa.me/919980208289?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;

      setStatus("Sent ✓");
    } catch {
      setStatus("Error — Please try again");
    }
  };

  return (
    <div className="w-full max-w-[480px]">
      <p className="font-label-caps text-[9px] sm:text-label-caps text-primary tracking-[0.3em] uppercase mb-2 sm:mb-4">INQUIRIES</p>
      <h2 className="font-display-xl text-[24px] sm:text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 sm:mb-8 leading-tight">Connect<br />With Us</h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
        <div className="relative group">
          <input name="name" className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base" id="name" placeholder="Full Name" required type="text" />
          <label className="absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none" htmlFor="name">FULL NAME</label>
        </div>
        <div className="relative group">
          <input name="phone" className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base" id="phone" placeholder="Phone Number" required type="tel" />
          <label className="absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none" htmlFor="phone">PHONE NUMBER</label>
        </div>
        <div className="relative group">
          <input name="email" className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base" id="email" placeholder="Email Address" required type="email" />
          <label className="absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none" htmlFor="email">EMAIL ADDRESS</label>
        </div>
        <div className="relative group">
          <textarea name="preference" defaultValue={defaultPreference} className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base resize-none" id="message" placeholder="Preferred Estate" rows={1}></textarea>
          <label className="absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none" htmlFor="message">PREFERRED ESTATE OR REGION</label>
        </div>
        <div className="relative group">
          <textarea name="description" className="w-full bg-transparent border-0 border-b border-white/10 py-2 sm:py-3.5 focus:ring-0 focus:border-antique-gold transition-colors peer placeholder-transparent text-sm sm:text-base resize-none" id="description" placeholder="Inquiry Details" rows={2}></textarea>
          <label className="absolute left-0 top-2 sm:top-3.5 font-label-caps text-[9px] sm:text-label-caps text-on-surface-variant/60 transition-all peer-focus:-top-5 peer-focus:text-[8px] peer-focus:text-antique-gold peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-antique-gold pointer-events-none" htmlFor="description">MESSAGE / DESCRIPTION OF STAY</label>
        </div>
        <button className="w-full py-4 sm:py-5 border border-antique-gold text-primary font-label-caps text-[10px] tracking-[0.3em] hover:bg-antique-gold hover:text-surface-dim transition-all duration-500 uppercase gold-shimmer bg-transparent font-bold" type="submit">
          {status}
        </button>
      </form>
    </div>
  );
}
