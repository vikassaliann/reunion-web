"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useContact } from "./ContactContext";
import { usePartner } from "./PartnerContext";

const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/#dining", label: "Café" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openContact } = useContact();
  const { open: openPartner } = usePartner();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-[#080808]/98 border-b border-[#C9A84C]/15 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
            : "bg-[#080808]/80 border-b border-[#C9A84C]/10"
        }`}
        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        {/* ── Desktop ── */}
        <div className="hidden lg:flex items-center justify-between w-full px-10 xl:px-14 h-[72px]">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <Logo className="h-14 w-14 transition-opacity duration-300 group-hover:opacity-75" />
            <div className="flex flex-col leading-none">
              <span
                className="font-cinzel text-[13px] tracking-[0.45em] font-medium"
                style={{
                  background: "linear-gradient(90deg, #C9A84C 0%, #f0d78c 50%, #C9A84C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                REUNION
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-8 xl:gap-12">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="relative font-cinzel text-[10px] tracking-[0.35em] text-[#a09c98] uppercase hover:text-[#C9A84C] transition-colors duration-300 group/link"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-400 group-hover/link:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions: Partner with us & Contact Us */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            <button
              onClick={() => openPartner()}
              className="inline-flex items-center gap-2 px-5 py-2 border border-[#C9A84C] font-cinzel text-[9.5px] tracking-[0.3em] text-[#080808] bg-[#C9A84C] uppercase font-semibold hover:bg-[#f0d78c] hover:border-[#f0d78c] transition-all duration-300 gold-shimmer rounded-sm"
            >
              Partner With Us
            </button>
            <button
              onClick={() => openContact()}
              className="inline-flex items-center gap-2 px-5 py-2 border border-[#C9A84C]/60 font-cinzel text-[9.5px] tracking-[0.3em] text-[#C9A84C] uppercase hover:bg-[#C9A84C] hover:text-[#080808] hover:border-[#C9A84C] transition-all duration-300 rounded-sm"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* ── Mobile/Tablet Bar ── */}
        <div className="flex lg:hidden items-center justify-between w-full px-5 h-[60px]">
          <Link href="/" className="flex items-center gap-2.5 group" onClick={closeMobile}>
            <Logo className="h-10 w-10" />
            <span
              className="font-cinzel text-[11px] tracking-[0.4em] font-medium"
              style={{
                background: "linear-gradient(90deg, #C9A84C, #f0d78c, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              REUNION
            </span>
          </Link>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openPartner()}
              className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] bg-[#C9A84C] text-[#080808] font-cinzel text-[8.5px] tracking-[0.25em] font-semibold uppercase rounded-sm"
            >
              Partner
            </button>

            <button
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-px bg-[#C9A84C] transition-all duration-400 ease-in-out origin-center ${mobileOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-5"}`} />
              <span className={`block h-px bg-[#C9A84C] transition-all duration-300 ease-in-out ${mobileOpen ? "w-0 opacity-0" : "w-4 opacity-80"}`} />
              <span className={`block h-px bg-[#C9A84C] transition-all duration-400 ease-in-out origin-center ${mobileOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", background: "rgba(6,6,6,0.97)" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[60px] border-b border-[#C9A84C]/10">
          <Link href="/" onClick={closeMobile} className="flex items-center gap-2.5">
            <Logo className="h-10 w-10" />
            <span className="font-cinzel text-[11px] tracking-[0.4em] font-medium"
              style={{ background: "linear-gradient(90deg, #C9A84C, #f0d78c, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              REUNION
            </span>
          </Link>
          <button onClick={closeMobile} className="w-9 h-9 flex items-center justify-center text-[#C9A84C] hover:opacity-70 transition-opacity" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col justify-center h-[calc(100%-60px)] px-8 pb-12">
          <div className="space-y-0 mb-8">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Link key={label} href={href} onClick={closeMobile}
                className="group flex items-center justify-between border-b border-[#C9A84C]/8 py-5"
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <span className="font-cinzel text-[11px] tracking-[0.5em] text-[#a09c98] uppercase group-hover:text-[#C9A84C] transition-colors duration-300">{label}</span>
                <svg className="w-3.5 h-3.5 text-[#C9A84C]/30 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => { closeMobile(); openPartner(); }}
              className="w-full inline-flex items-center justify-center gap-3 py-3.5 border border-[#C9A84C] bg-[#C9A84C] font-cinzel text-[10px] tracking-[0.35em] text-[#080808] font-bold uppercase transition-all duration-400 gold-shimmer rounded-sm"
              style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.4s ease 0.22s, transform 0.4s ease 0.22s" }}
            >
              Partner With Us
            </button>

            <button
              onClick={() => { closeMobile(); openContact(); }}
              className="w-full inline-flex items-center justify-center gap-3 py-3.5 border border-[#C9A84C]/60 font-cinzel text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase hover:bg-[#C9A84C] hover:text-[#080808] transition-all duration-400 rounded-sm"
              style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.4s ease 0.28s, transform 0.4s ease 0.28s" }}
            >
              Contact Us
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3 opacity-30">
            <div className="flex-1 h-px bg-[#C9A84C]/40" />
            <span className="text-[#C9A84C] text-[10px]">✦</span>
            <div className="flex-1 h-px bg-[#C9A84C]/40" />
          </div>
        </nav>
      </div>
    </>
  );
}
