"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { usePartner } from "./PartnerContext";

interface FooterProps {
  variant?: "default" | "estate";
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setAnimating(true);
    setTimeout(() => {
      setSubmitted(true);
      setAnimating(false);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative mt-2">
      <div className={`flex border transition-colors ${submitted ? "border-[#C9A84C]" : "border-white/20 focus-within:border-white/50"}`}>
        <input
          className="bg-transparent border-none focus:ring-0 w-full text-xs font-futura text-white placeholder:text-white/30 outline-none px-4 py-3.5"
          placeholder="Enter email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={animating || submitted}
        />
        <button
          type="submit"
          disabled={animating || submitted}
          className="px-6 border-l border-white/20 font-futura text-[10px] tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/5 transition-all uppercase whitespace-nowrap"
        >
          {animating ? "Wait..." : submitted ? "Done" : "Sign Up"}
        </button>
      </div>
      {submitted && (
        <p className="absolute -bottom-6 left-0 text-[#C9A84C] text-[9px] tracking-[0.2em] font-futura uppercase animate-[fadeIn_0.4s_ease]">
          Thank you — we&apos;ll be in touch.
        </p>
      )}
    </form>
  );
}

export default function Footer({ variant = "default" }: FooterProps) {
  const { open: openPartner } = usePartner();

  if (variant === "estate") {
    return (
      <footer className="bg-[#080808] border-t border-[#C9A84C]/20 px-6 md:px-20 py-16 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/" className="group flex-shrink-0">
            <Logo className="h-14 w-14 transition-opacity group-hover:opacity-80" />
          </Link>
          <div className="flex flex-wrap gap-8">
            <Link className="font-futura text-sm text-white/50 hover:text-[#C9A84C] transition-colors" href="/about">About Us</Link>
            <button onClick={() => openPartner()} className="font-futura text-sm text-[#C9A84C] hover:text-white transition-colors">Partner With Us</button>
            <Link className="font-futura text-sm text-white/50 hover:text-[#C9A84C] transition-colors" href="#">Privacy Policy</Link>
            <Link className="font-futura text-sm text-white/50 hover:text-[#C9A84C] transition-colors" href="#">Terms of Service</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="font-futura text-[10px] text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
              © 2024 Reunion. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-16 sm:pt-24 pb-10 sm:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 page-pad max-w-7xl mx-auto">

        {/* Column 1: EXPLORE */}
        <div className="md:col-span-3 space-y-6">
          <p className="font-futura text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase">Explore</p>
          <ul className="space-y-4">
            <li><button onClick={() => openPartner()} className="font-futura text-xs text-white/50 hover:text-white transition-colors tracking-wider text-left">Partner With Us</button></li>
            <li><Link className="font-futura text-xs text-white/50 hover:text-white transition-colors tracking-wider" href="/about">Our Story</Link></li>
            <li><Link href="/contact" className="font-futura text-xs text-white/50 hover:text-white transition-colors tracking-wider text-left">Contact Us</Link></li>
            <li><Link className="font-futura text-xs text-white/50 hover:text-white transition-colors tracking-wider" href="#">Terms & Conditions</Link></li>
            <li><Link className="font-futura text-xs text-white/50 hover:text-white transition-colors tracking-wider" href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 2: CONTACT */}
        <div className="md:col-span-3 space-y-6">
          <p className="font-futura text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase">Contact</p>
          <div className="space-y-4">
            <p className="font-futura text-xs text-white/50 tracking-wider">
              Call Us: <a href="tel:+919980208289" className="hover:text-white transition-colors">+91 99802 08289</a>
            </p>
            <p className="font-futura text-xs text-white/50 tracking-wider">
              E-mail: <a href="mailto:support@reunionglobal.in" className="hover:text-white transition-colors">support@reunionglobal.in</a>
            </p>
          </div>
        </div>

        {/* Column 3: FOLLOW US */}
        <div className="md:col-span-2 space-y-6">
          <p className="font-futura text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase">Follow Us</p>
          <div className="flex gap-5 items-center">
            <a aria-label="Facebook" href="https://www.facebook.com/share/1HEff1Dir3/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C9A84C] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a aria-label="Instagram" href="https://instagram.com/reunionteam19" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C9A84C] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a aria-label="YouTube" href="https://youtube.com/@reunionteam19?si=Q6RR_X9UCSPajGEN" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C9A84C] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 4: LETTER FROM US */}
        <div className="md:col-span-4 space-y-6">
          <p className="font-futura text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase">Letter From Us</p>
          <p className="font-futura text-white/50 text-xs tracking-wide leading-relaxed max-w-sm">
            Join our mailing list for holiday inspiration and the best offers at Reunion.
          </p>
          <div className="pt-2">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-24 px-6 md:px-20 max-w-7xl mx-auto pt-8 border-t border-white/5">
        <p className="text-white/30 font-futura text-[9px] tracking-[0.25em] uppercase text-center md:text-left">
          © 2026 REUNION GLOBAL ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
