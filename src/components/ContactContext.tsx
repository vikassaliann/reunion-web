"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const ContactCtx = createContext<{ open: () => void }>({ open: () => {} });

export function useContact() {
  return useContext(ContactCtx);
}

interface NormalContactItem {
  type: "normal";
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

interface SocialsContactItem {
  type: "socials";
  label: string;
  links: SocialLink[];
}

type ContactItem = NormalContactItem | SocialsContactItem;

const CONTACT_INFO: ContactItem[] = [
  {
    type: "normal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 9.5a19.79 19.79 0 01-3-8.59A2 2 0 012.48 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.86a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 9980208289",
    href: "tel:+919980208289",
  },
  {
    type: "normal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Guest Support",
    value: "support@reunionglobal.in",
    href: "mailto:support@reunionglobal.in",
  },
  {
    type: "normal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Reservations & Enquiry",
    value: "reunionrevenue@gmail.com",
    href: "mailto:reunionrevenue@gmail.com",
  },
  {
    type: "socials",
    label: "Follow Us On",
    links: [
      {
        name: "Instagram",
        href: "https://instagram.com/reunionteam19",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        ),
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@reunionteam19?si=Q6RR_X9UCSPajGEN",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
          </svg>
        ),
      },
      {
        name: "Facebook",
        href: "https://www.facebook.com/share/1HEff1Dir3/",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        ),
      },
    ],
  },
];

function ContactOverlayUI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", background: "rgba(4,4,4,0.94)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)" }} />

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-[#C9A84C]/70 hover:text-[#C9A84C] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 rounded-sm transition-all duration-300"
        aria-label="Close contact info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-8 py-12 text-center space-y-10">
        <div className="space-y-3">
          <p className="font-cinzel text-[9px] tracking-[0.55em] text-[#C9A84C]/70 uppercase">Get In Touch</p>
          <h2 className="font-cormorant text-[clamp(2rem,5vw,3rem)] font-light text-white leading-tight">
            Contact <em className="text-[#C9A84C]">Us</em>
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/30 mx-auto" />
        </div>

        <div className="space-y-4">
          {CONTACT_INFO.map((item, i) => {
            if (item.type === "socials") {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2.5 px-5 py-4 border border-[#C9A84C]/12 rounded-sm bg-black/10 text-left"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
                  }}
                >
                  <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/50 uppercase">{item.label}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-1.5">
                    {item.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social flex items-center gap-2 text-white/90 hover:text-[#C9A84C] transition-colors duration-300"
                      >
                        <span className="text-[#C9A84C]/60 group-hover/social:text-[#C9A84C] transition-colors duration-300">
                          {link.icon}
                        </span>
                        <span className="font-cormorant text-sm tracking-wide">
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-5 px-5 py-4 border border-[#C9A84C]/12 rounded-sm hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-all duration-400 text-left"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
                }}
              >
                <span className="text-[#C9A84C]/60 group-hover:text-[#C9A84C] transition-colors duration-300 flex-shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/50 uppercase mb-1">{item.label}</p>
                  <p className="font-cormorant text-base text-white group-hover:text-[#C9A84C] transition-colors duration-300 truncate">
                    {item.value}
                  </p>
                </div>
                <svg className="w-3 h-3 text-[#C9A84C]/20 group-hover:text-[#C9A84C]/60 ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3 opacity-30">
          <div className="flex-1 h-px bg-[#C9A84C]/40" />
          <span className="text-[#C9A84C] text-[10px]">✦</span>
          <div className="flex-1 h-px bg-[#C9A84C]/40" />
        </div>
        <p className="font-cinzel text-[8px] tracking-[0.3em] text-[#a09c98]/40 uppercase -mt-4">Udupi, Karnataka — India</p>
      </div>
    </div>
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable inspecting keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return;
      }

      const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;

      if (modifierKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
        return;
      }

      if (isMac && modifierKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
        return;
      }

      if (modifierKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ContactCtx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ContactOverlayUI isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactCtx.Provider>
  );
}
