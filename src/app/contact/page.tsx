"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEnquiry } from "@/components/EnquiryContext";
import { usePartner } from "@/components/PartnerContext";

const CONTACT_ROWS = [
  {
    label: "Phone",
    value: "+91 9980208289",
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

export default function ContactPage() {
  const { open: openEnquiry } = useEnquiry();
  const { open: openPartner } = usePartner();

  return (
    <div className="bg-[#080808] text-white min-h-screen">
      <Navbar />

      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <img
          src="/properties/popular/elite.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-black/25" />
        <div className="relative z-10 w-full max-w-5xl mx-auto page-pad pb-12 sm:pb-14 pt-28 sm:pt-32">
          <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-3 sm:mb-4">
            Get in touch
          </p>
          <h1 className="font-cormorant italic text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1]">
            Good people.
            <br />
            <span className="text-[#C9A84C]">Brighter places.</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-md font-futura text-sm text-white/55 font-light tracking-wide leading-relaxed">
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
                className="group block border border-white/10 hover:border-[#C9A84C]/40 bg-white/[0.02] hover:bg-[#C9A84C]/5 transition-all px-6 py-5"
              >
                <p className="font-cinzel text-[9px] tracking-[0.35em] text-[#C9A84C]/70 uppercase mb-2">
                  {row.label}
                </p>
                <p className="font-cormorant italic text-2xl sm:text-3xl text-white group-hover:text-[#C9A84C] transition-colors font-light">
                  {row.value}
                </p>
              </a>
            ))}

            <div className="border border-white/10 px-6 py-5 space-y-4">
              <p className="font-cinzel text-[9px] tracking-[0.35em] text-[#C9A84C]/70 uppercase">
                Follow us
              </p>
              <div className="flex flex-wrap gap-5">
                {[
                  { name: "Instagram", href: "https://instagram.com/reunionteam19" },
                  { name: "YouTube", href: "https://youtube.com/@reunionteam19?si=Q6RR_X9UCSPajGEN" },
                  { name: "Facebook", href: "https://www.facebook.com/share/1HEff1Dir3/" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-cormorant italic text-lg text-white/70 hover:text-[#C9A84C] transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#C9A84C]/25 bg-[#100e0c] p-7 md:p-8 space-y-5">
              <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase">
                Plan your stay
              </p>
              <h2 className="font-cormorant italic text-3xl text-white font-light leading-snug">
                Book a Reunion villa
              </h2>
              <p className="font-futura text-sm text-white/45 font-light leading-relaxed">
                Tell us your dates and preferred property — we&apos;ll help you plan the stay.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="w-full py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={() => openPartner()}
                className="w-full py-3.5 border border-[#C9A84C]/40 text-[#C9A84C] font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
              >
                Partner With Us
              </button>
              <Link
                href="/properties"
                className="block text-center font-futura text-[10px] tracking-[0.25em] text-white/40 uppercase hover:text-[#C9A84C] transition-colors pt-1"
              >
                Explore stays →
              </Link>
            </div>
            <p className="font-cormorant italic text-white/35 text-sm tracking-wide">
              Udupi, Karnataka — India
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
