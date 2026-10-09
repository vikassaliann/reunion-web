"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { usePartner } from "./PartnerContext";
import { useEnquiry } from "./EnquiryContext";

/* ─── Types ─── */
interface DropdownItem {
  label: string;
  desc: string;
  href: string;
  highlight?: boolean;
  isPartner?: boolean;
}

interface NavItemData {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

/* ─── Nav menu data ─── */
const NAV_ITEMS: NavItemData[] = [
  {
    label: "STAYS",
    href: "/properties",
    dropdown: [
      { label: "Beach Villas", desc: "", href: "/properties/category/beach-villas" },
      { label: "City Stays", desc: "", href: "/properties/category/city-stays" },
      { label: "View All Stays →", desc: "", href: "/properties", highlight: true },
    ],
  },
  {
    label: "EXPERIENCES",
    href: "/experiences",
    dropdown: [
      { label: "Coastal Experiences", desc: "", href: "/experiences" },
      { label: "Candlelight Dinner", desc: "", href: "/experiences/candlelight-dinner" },
    ],
  },
  {
    label: "WELLNESS & SPA",
    href: "/wellness",
  },
  {
    label: "DINING",
    href: "/dining",
  },
  {
    label: "EVENTS & WEDDINGS",
    href: "/events",
  },
  {
    label: "BLOGS",
    href: "/blogs",
  },
  {
    label: "OUR STORY",
    href: "/about",
  },
];

// DropdownItem interface defined above NAV_ITEMS

function NavDropdown({ items, onClose, openPartner }: { items: DropdownItem[]; onClose: () => void; openPartner: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 pt-1 z-50 min-w-[200px]"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="bg-black/80 backdrop-blur-lg overflow-hidden py-3 rounded-md border border-white/5">
        {items.map((item) => {
          if (item.isPartner) {
            return (
              <button
                key={item.label}
                onClick={() => { onClose(); openPartner(); }}
                className={`w-full text-left px-5 py-2 group/item flex items-center gap-3 hover:bg-white/10 transition-colors duration-150`}
              >
                <span className="font-futura text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-medium group-hover/item:text-white transition-colors">
                  {item.label}
                </span>
              </button>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`block px-5 py-2 group/item hover:bg-white/10 transition-colors duration-150`}
            >
              <span className={`font-futura text-[10px] tracking-[0.2em] uppercase font-medium transition-colors ${item.highlight ? "text-[#C9A84C]" : "text-white/70 group-hover/item:text-white"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function NavItem({
  item,
  openPartner,
}: {
  item: NavItemData;
  openPartner: () => void;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 80);
  };

  const hasDropdown = Boolean(item.dropdown?.length);

  return (
    <div
      className="relative"
      onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
      onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
    >
      <Link
        href={item.href}
        className={`font-futura text-[11.5px] tracking-[0.14em] font-medium uppercase whitespace-nowrap transition-colors duration-200 pb-1 ${
          hasDropdown && open ? "text-[#C9A84C]" : "text-[#e5e2e1] hover:text-[#C9A84C]"
        }`}
      >
        {item.label}
      </Link>

      {hasDropdown && (
        <div
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0px)" : "translateY(-6px)",
            pointerEvents: open ? "auto" : "none",
            transition: "opacity 0.18s cubic-bezier(0.4,0,0.2,1), transform 0.18s cubic-bezier(0.4,0,0.2,1)",
            willChange: "opacity, transform",
          }}
        >
          <NavDropdown
            items={item.dropdown!}
            onClose={() => setOpen(false)}
            openPartner={openPartner}
          />
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { open: openPartner } = usePartner();
  const { open: openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center justify-between w-full px-6 xl:px-12 h-[80px]">

          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <Logo className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
            <div>
              <span className="font-futura text-[16px] tracking-[0.35em] font-bold text-[#C9A84C] uppercase leading-none block">
                REUNION
              </span>
              <span className="font-futura text-[7px] tracking-[0.25em] text-white/60 uppercase block mt-1">
                Creating Memories, One Reunion at a Time
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="flex items-center gap-6 xl:gap-8 flex-shrink-0">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} openPartner={openPartner} />
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="font-futura text-[10.5px] tracking-[0.2em] text-white/80 hover:text-[#C9A84C] uppercase transition-colors"
            >
              CONTACT
            </Link>
            <button
              onClick={() => openPartner()}
              className="px-6 py-2.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[10.5px] tracking-[0.2em] font-bold uppercase hover:bg-[#C9A84C]/10 transition-all duration-200"
            >
              Partner With Us
            </button>
          </div>
        </div>

        {/* ── Mobile Bar ── */}
        <div className="flex lg:hidden items-center justify-between w-full px-5 h-[70px] bg-transparent">
          {/* Left — logo + REUNION */}
          <Link
            href="/"
            onClick={closeMobile}
            className="flex items-center gap-2.5 min-w-0"
          >
            <Logo className="h-11 w-11 sm:h-12 sm:w-12 shrink-0" />
            <span className="font-futura text-[1.35rem] sm:text-2xl tracking-[0.22em] font-bold text-[#C9A84C] uppercase leading-none">
              REUNION
            </span>
          </Link>

          {/* Right — Square 3-bar hamburger icon in gold */}
          <button
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-transparent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-[#C9A84C] rounded-none transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#C9A84C] rounded-none transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#C9A84C] rounded-none transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "#050505" }}
      >
        <div className="flex items-center justify-between px-5 h-[70px] border-b border-[#C9A84C]/20 bg-[#0a0a0a]">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex items-center gap-2.5 min-w-0"
          >
            <Logo className="h-11 w-11 sm:h-12 sm:w-12 shrink-0" />
            <span className="font-futura text-[1.35rem] sm:text-2xl tracking-[0.22em] font-bold text-[#C9A84C] uppercase leading-none">
              REUNION
            </span>
          </Link>
          <button
            onClick={closeMobile}
            className="w-10 h-10 text-[#C9A84C] text-2xl flex items-center justify-center bg-transparent"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-60px)] px-6 py-6">
          {NAV_ITEMS.map(({ label, href, dropdown }) => (
            <div key={label} className="border-b border-white/5">
              {dropdown?.length ? (
                <>
                  <button
                    className="w-full flex items-center justify-between py-4 text-left"
                    onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
                  >
                    <span className="font-futura text-sm tracking-[0.2em] text-[#e5e2e1] uppercase">{label}</span>
                    <span className={`text-[#C9A84C] transition-transform duration-200 ${mobileExpanded === label ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>
                  {mobileExpanded === label && (
                    <div className="pb-3 pl-3 space-y-1">
                      {dropdown.map((sub) =>
                        sub.isPartner ? (
                          <button
                            key={sub.label}
                            onClick={() => { closeMobile(); openPartner(); }}
                            className="block w-full text-left py-2 font-futura text-[11px] tracking-[0.15em] text-[#C9A84C] uppercase"
                          >
                            {sub.label}
                          </button>
                        ) : (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={closeMobile}
                            className={`block py-2 font-futura text-[11px] tracking-[0.15em] uppercase ${sub.highlight ? "text-[#C9A84C]" : "text-white/60"}`}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={href}
                  onClick={closeMobile}
                  className="block w-full py-4 font-futura text-sm tracking-[0.2em] text-[#e5e2e1] uppercase"
                >
                  {label}
                </Link>
              )}
            </div>
          ))}

          <div className="mt-8 space-y-3 pb-20">
            <button
              onClick={() => { closeMobile(); openEnquiry(); }}
              className="w-full py-4 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#C9A84C]/10"
            >
              Book Now
            </button>
            <button
              onClick={() => { closeMobile(); openPartner(); }}
              className="w-full py-4 border border-[#C9A84C]/40 bg-transparent text-[#C9A84C] font-futura text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A84C]/10"
            >
              Partner With Us
            </button>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="block w-full py-4 text-center border border-white/15 text-white/70 font-futura text-[11px] tracking-[0.2em] uppercase"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Mobile Fixed Bottom Sticky Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden grid grid-cols-3 h-14 shadow-2xl border-t border-[#C9A84C]/25 bg-[#080808]/95 backdrop-blur-md"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <Link
          href="/properties"
          className="flex flex-col items-center justify-center gap-0.5 bg-transparent text-[#C9A84C] font-futura text-[8px] sm:text-[9px] tracking-[0.12em] font-semibold uppercase hover:bg-[#C9A84C]/10 transition-colors border-r border-[#C9A84C]/20 px-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Explore Stays
        </Link>
        <button
          onClick={() => openEnquiry()}
          className="flex flex-col items-center justify-center gap-0.5 bg-transparent text-[#C9A84C] font-futura text-[8px] sm:text-[9px] tracking-[0.12em] font-bold uppercase hover:bg-[#C9A84C]/10 transition-colors border-r border-[#C9A84C]/20 px-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Now
        </button>
        <button
          onClick={() => openPartner()}
          className="flex flex-col items-center justify-center gap-0.5 bg-transparent text-[#C9A84C] font-futura text-[8px] sm:text-[9px] tracking-[0.12em] font-bold uppercase hover:bg-[#C9A84C]/10 transition-colors px-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Partner With Us
        </button>
      </div>
    </>
  );
}
