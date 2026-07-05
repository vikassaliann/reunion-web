"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useContact } from "./ContactContext";

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
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="font-label-caps text-label-caps text-primary tracking-widest">NEWSLETTER</p>
      <p className="text-on-surface-variant text-sm">Subscribe for invitations to exclusive releases.</p>
      <div className="flex border-b border-white/10 focus-within:border-antique-gold transition-colors pb-1">
        <input
          className="bg-transparent border-none focus:ring-0 w-full text-sm py-3 px-0 text-on-surface placeholder:text-on-surface-variant/40 outline-none"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={animating || submitted}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={animating || submitted}
          className={`relative px-4 flex-shrink-0 transition-all duration-500 overflow-hidden ${
            submitted
              ? "text-[#C9A84C]"
              : animating
              ? "text-[#C9A84C]/60"
              : "text-primary hover:text-white"
          }`}
        >
          {/* Normal arrow */}
          <span
            className={`flex items-center transition-all duration-400 ${
              animating || submitted ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>

          {/* Spinning loader */}
          {animating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
            </span>
          )}

          {/* Checkmark on success */}
          {submitted && (
            <span className="absolute inset-0 flex items-center justify-center animate-[fadeIn_0.3s_ease]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          )}
        </button>
      </div>
      {submitted && (
        <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] font-cinzel uppercase animate-[fadeIn_0.4s_ease]">
          ✦ Thank you — we&apos;ll be in touch.
        </p>
      )}
    </form>
  );
}

export default function Footer({ variant = "default" }: FooterProps) {
  const { open: openContact } = useContact();

  if (variant === "estate") {
    return (
      <footer className="bg-obsidian-deep border-t border-border-gold px-margin-mobile md:px-margin-desktop py-16 w-full">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/" className="group flex-shrink-0">
            <Logo className="h-14 w-14 transition-opacity group-hover:opacity-80" />
          </Link>
          <div className="flex flex-wrap gap-8">
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-antique-gold transition-colors" href="#">Privacy Policy</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-antique-gold transition-colors" href="#">Terms of Service</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-antique-gold transition-colors" href="#">Cookie Policy</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-antique-gold transition-colors" href="#">Sustainability</Link>
          </div>
          <p className="font-body-md text-[11px] text-on-surface-variant/60 whitespace-nowrap">
            © 2024 Reunion. All Rights Reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-dim border-t border-antique-gold/20 pt-24 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Logo + Tagline */}
        <div className="flex flex-col gap-8 md:col-span-1">
          <Link href="/" className="group inline-block">
            <Logo className="h-16 w-16 transition-opacity group-hover:opacity-80" />
          </Link>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
            A world of absolute discretion and curated luxury, defining the new standard of global living.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          <p className="font-label-caps text-label-caps text-primary tracking-widest">NAVIGATION</p>
          <ul className="space-y-5">
            <li><Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="/properties">Properties</Link></li>
            <li><Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="/#dining">Cafe</Link></li>
            <li><Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="/#experiences">Experiences</Link></li>
            <li>
              <button
                onClick={() => openContact()}
                className="text-on-surface-variant text-sm hover:text-primary transition-colors text-left"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-8">
          <p className="font-label-caps text-label-caps text-primary tracking-widest">LEGAL</p>
          <ul className="space-y-4">
            <li>
              <Link className="text-[10px] text-on-surface-variant/40 hover:text-primary transition-colors font-medium tracking-wide" href="#">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-[10px] text-on-surface-variant/40 hover:text-primary transition-colors font-medium tracking-wide" href="#">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-antique-gold/10">
        <p className="text-on-surface-variant text-[10px] font-label-caps tracking-widest">© 2024 Reunion. All Rights Reserved.</p>
        <div className="flex gap-7 mt-6 md:mt-0 items-center">
          <a
            aria-label="Instagram"
            href="https://instagram.com/reunionteam19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* YouTube */}
          <a
            aria-label="YouTube"
            href="https://youtube.com/@reunionteam19?si=Q6RR_X9UCSPajGEN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            aria-label="Facebook"
            href="https://www.facebook.com/share/1HEff1Dir3/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          {/* Mail */}
          <a
            aria-label="Email"
            href="mailto:support@reunionglobal.in"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          {/* Phone */}
          <a
            aria-label="Phone"
            href="tel:+919980208289"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.5 9.5a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 2.48 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.86a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
