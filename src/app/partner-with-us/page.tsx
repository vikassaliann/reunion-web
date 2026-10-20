"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { usePartner } from "@/components/PartnerContext";

export default function PartnerWithUsPage() {
  const { open: openPartner } = usePartner();

  return (
    <div className="bg-[#080808] text-white min-h-screen font-futura">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <img
          src="/properties/charm-villa/charmthub.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-black/30" />
        <div className="relative z-10 w-full max-w-4xl mx-auto page-pad pb-14 pt-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partner With Us" }]} />
          <h1 className="mt-8 text-3xl sm:text-5xl font-light tracking-[0.12em] uppercase">
            Partner With REUNION
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/55 font-light leading-relaxed tracking-wide">
            List your villa, homestay, or hospitality property with REUNION — villa management, marketing, and guest operations across Udupi and Coastal Karnataka.
          </p>
        </div>
      </section>

      <section className="page-pad section-y max-w-3xl mx-auto space-y-8">
        <p className="text-sm text-white/50 leading-relaxed tracking-wide">
          Reunion Global partners with property owners who want professional hospitality management without losing the character of their home. We handle listings, guest experience, and revenue — you retain ownership and peace of mind.
        </p>
        <ul className="space-y-3 text-xs text-white/45 tracking-wide uppercase">
          <li>· Marketing & OTA management</li>
          <li>· Guest operations & housekeeping coordination</li>
          <li>· Revenue and occupancy optimisation</li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => openPartner()}
            className="px-8 py-3.5 border border-[#C9A84C] text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
          >
            Submit partnership enquiry
          </button>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-white/20 text-white/70 text-[10px] tracking-[0.3em] uppercase hover:border-[#C9A84C]/40 text-center"
          >
            About REUNION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
