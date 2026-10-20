"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEnquiry } from "@/components/EnquiryContext";
const CONTACT_VALUE =
  "font-futura text-sm text-white/80 group-hover:text-[#C9A84C] font-light tracking-wide leading-relaxed transition-colors duration-300 break-all";

const CONTACT_ROWS = [
  {
    label: "Phone",
    value: "+91 99802 08289",
    href: "tel:+919980208289",
  },
  {
    label: "Guest Support",
    value: "support@reunionglobal.in",
    href: "mailto:support@reunionglobal.in",
  },
  {
    label: "Reservations & Enquiry",
    value: "reunionrevenue@gmail.com",
    href: "mailto:reunionrevenue@gmail.com",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1HEff1Dir3/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/reunionteam19",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@reunionteam19",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const { open: openEnquiry } = useEnquiry();

  return (
    <div className="bg-[#080808] text-white min-h-screen font-futura">
      <Navbar />

      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <img
          src="/properties/popular/elite.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-black/25" />
        <div className="relative z-10 w-full max-w-5xl mx-auto page-pad pb-12 sm:pb-14 pt-28 sm:pt-32">
          <p className="font-futura text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-3 sm:mb-4">
            Get in touch
          </p>
          <h1 className="font-futura text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] tracking-[0.12em] uppercase">
            Contact REUNION
          </h1>
          <p className="font-futura mt-4 sm:mt-5 max-w-md text-sm text-white/55 font-light tracking-wide leading-relaxed">
            Reach the Reunion team for stays, dining, events, or property partnerships across coastal Karnataka.
          </p>
        </div>
      </section>

      <section className="relative page-pad pb-24 sm:pb-28 pt-12 sm:pt-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20">
          <div className="lg:col-span-7 space-y-5">
            {CONTACT_ROWS.map((row) => (
              <a
                key={row.label}
                href={row.href}
                className="group block border border-white/10 hover:border-[#C9A84C]/40 bg-white/[0.02] hover:bg-[#C9A84C]/5 transition-all duration-300 px-6 sm:px-7 py-5 sm:py-6"
              >
                <p className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase mb-3">
                  {row.label}
                </p>
                <p className={CONTACT_VALUE}>{row.value}</p>
              </a>
            ))}

            <div className="group border border-white/10 hover:border-[#C9A84C]/40 bg-white/[0.02] hover:bg-[#C9A84C]/5 transition-all duration-300 px-6 sm:px-7 py-5 sm:py-6">
              <p className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase mb-3">
                Follow Us
              </p>
              <div className="flex flex-wrap items-center gap-5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-white/70 hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#C9A84C]/25 bg-[#100e0c] p-7 md:p-8 space-y-5">
              <p className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase">
                Plan your stay
              </p>
              <h2 className="font-futura text-2xl sm:text-3xl text-white font-light leading-snug tracking-[0.1em] uppercase">
                Book a Reunion stay
              </h2>
              <p className="font-futura text-sm text-white/45 font-light leading-relaxed tracking-wide">
                Tell us your dates and preferred property — we&apos;ll help you plan the stay.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="w-full py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
              >
                Book Now
              </button>
              <Link
                href="/partner-with-us"
                className="block w-full py-3.5 border border-[#C9A84C]/40 text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors text-center"
              >
                Partner With Us
              </Link>
              <Link
                href="/properties"
                className="block text-center font-futura text-[10px] tracking-[0.25em] text-white/40 uppercase hover:text-[#C9A84C] transition-colors pt-1"
              >
                Explore stays →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
