"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ContactForm from "./ContactForm";

interface EnquiryContextType {
  open: (defaultPreference?: string) => void;
  close: () => void;
}

const EnquiryCtx = createContext<EnquiryContextType>({
  open: () => {},
  close: () => {},
});

export function useEnquiry() {
  return useContext(EnquiryCtx);
}

function EnquiryOverlayUI({
  isOpen,
  onClose,
  defaultPreference,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultPreference: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "rgba(4,4,4,0.92)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)" }}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-12 h-12 flex items-center justify-center text-[#C9A84C] hover:text-white bg-black/60 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full transition-all"
        aria-label="Close enquiry"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto bg-[#0f0e0e] border border-[#C9A84C]/25 mx-auto p-6 sm:p-10 shadow-[0_16px_60px_rgba(0,0,0,0.8)]"
      >
        <ContactForm defaultPreference={defaultPreference} propertyDropdown />
      </div>
    </div>
  );
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultPreference, setDefaultPreference] = useState("");

  return (
    <EnquiryCtx.Provider
      value={{
        open: (pref = "") => {
          setDefaultPreference(pref);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
      <EnquiryOverlayUI
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultPreference={defaultPreference}
      />
    </EnquiryCtx.Provider>
  );
}
