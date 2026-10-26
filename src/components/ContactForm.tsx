"use client";

import { useEffect, useState } from "react";
import properties from "@/data/properties.json";

interface ContactFormProps {
  defaultPreference?: string;
  whatsappNumber?: string; // override WhatsApp number per property
  instagramHandle?: string; // optional secondary Instagram handle (e.g. De Homes)
  propertyDropdown?: boolean;
}

export default function ContactForm({
  defaultPreference = "",
  whatsappNumber = "919980208289",
  instagramHandle,
  propertyDropdown = false,
}: ContactFormProps) {
  const [status, setStatus] = useState("Submit Inquiry");
  const [preference, setPreference] = useState(defaultPreference);

  useEffect(() => {
    setPreference(defaultPreference);
  }, [defaultPreference]);

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

    const prefLower = (data.preference || "").toLowerCase();
    const isOceanCafe =
      whatsappNumber === "919972231289" ||
      prefLower.includes("cafe") ||
      prefLower.includes("café");

    const oceanCafeLines = (intro: string) =>
      `Hello Reunion Ocean Café! ${intro}

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Date: ${data.checkin || "Not specified"}
Time/Details: ${data.description || "None provided"}`;

    let message: string;
    if (prefLower.includes("birthday")) {
      message = oceanCafeLines(
        "I would like to plan a beach birthday celebration at Reunion Ocean Café (Mattu Beach)."
      );
    } else if (prefLower.includes("candlelight")) {
      message = oceanCafeLines("I would like to book a candle light dinner.");
    } else if (isOceanCafe) {
      message = oceanCafeLines("I would like to reserve a table.");
    } else {
      message = `Hello Reunion! I would like to inquire about your villas.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Preference: ${data.preference || "Not specified"}
Check-In: ${data.checkin || "Not specified"}
Check-Out: ${data.checkout || "Not specified"}
Inquiry Details: ${data.description || "None provided"}`;
    }

    try {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
      setStatus("Sent ✓");
    } catch {
      setStatus("Error — Please try again");
    }
  };

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-white/10 py-2.5 sm:py-3.5 focus:ring-0 focus:border-[#C9A84C] transition-colors peer placeholder-transparent text-sm sm:text-base font-cormorant tracking-wide";
  const labelClass =
    "absolute left-0 top-2.5 sm:top-3.5 font-cinzel text-[8px] tracking-[0.3em] text-white/40 uppercase transition-all peer-focus:-top-5 peer-focus:text-[#C9A84C] peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[#C9A84C] pointer-events-none";

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <p className="font-cinzel text-[9px] tracking-[0.45em] text-[#C9A84C] uppercase mb-3">Inquiries</p>
      <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light leading-tight mb-6 sm:mb-8">
        Connect<br />With Us
      </h2>
      <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
        <div className="relative group">
          <input name="name" className={fieldClass} id="name" placeholder="Full Name" required type="text" />
          <label className={labelClass} htmlFor="name">Full Name</label>
        </div>

        <div className="relative group">
          <input name="phone" className={fieldClass} id="phone" placeholder="Phone Number" required type="tel" />
          <label className={labelClass} htmlFor="phone">Phone Number</label>
        </div>

        <div className="relative group">
          <input name="email" className={fieldClass} id="email" placeholder="Email Address" required type="email" />
          <label className={labelClass} htmlFor="email">Email Address</label>
        </div>

        <div className="relative group">
          {propertyDropdown ? (
            <>
              <label
                className="block font-cinzel text-[8px] tracking-[0.3em] text-[#C9A84C]/70 uppercase mb-1.5"
                htmlFor="preference"
              >
                Preferred Property
              </label>
              <select
                name="preference"
                id="preference"
                required
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/10 py-2.5 sm:py-3.5 focus:ring-0 focus:border-[#C9A84C] transition-colors text-sm sm:text-base text-white font-cormorant [color-scheme:dark]"
              >
                <option value="" className="bg-[#0f0e0e] text-white/50">
                  Select a property
                </option>
                {properties.map((prop) => (
                  <option key={prop.id} value={prop.name} className="bg-[#0f0e0e] text-white">
                    {prop.name} — {prop.location}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <textarea
                name="preference"
                defaultValue={defaultPreference}
                className={`${fieldClass} resize-none`}
                id="preference"
                placeholder="Preferred Property"
                rows={1}
              />
              <label className={labelClass} htmlFor="preference">Preferred Property or Region</label>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <label className="block font-cinzel text-[8px] tracking-[0.3em] text-[#C9A84C]/70 uppercase mb-1" htmlFor="checkin">
              Check-in
            </label>
            <input
              name="checkin"
              type="date"
              className="w-full bg-transparent border-0 border-b border-white/10 py-2.5 focus:ring-0 focus:border-[#C9A84C] transition-colors text-sm text-white/80 font-cormorant [color-scheme:dark]"
              id="checkin"
            />
          </div>
          <div className="relative group">
            <label className="block font-cinzel text-[8px] tracking-[0.3em] text-[#C9A84C]/70 uppercase mb-1" htmlFor="checkout">
              Check-out
            </label>
            <input
              name="checkout"
              type="date"
              className="w-full bg-transparent border-0 border-b border-white/10 py-2.5 focus:ring-0 focus:border-[#C9A84C] transition-colors text-sm text-white/80 font-cormorant [color-scheme:dark]"
              id="checkout"
            />
          </div>
        </div>

        <div className="relative group">
          <textarea name="description" className={`${fieldClass} resize-none`} id="description" placeholder="Inquiry Details" rows={2}></textarea>
          <label className={labelClass} htmlFor="description">Message / Description of Stay</label>
        </div>

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
          className="w-full py-4 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-all duration-300"
          type="submit"
        >
          {status}
        </button>
      </form>
    </div>
  );
}
