"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/utils/categories";

export default function FilterDropdown({ currentCategory }: { currentCategory: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeCategory = CATEGORIES.find(c => c.id === currentCategory) || CATEGORIES[0];

  return (
    <div className="relative z-20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 border border-white/20 px-5 py-2.5 text-xs font-futura uppercase tracking-widest text-white/80 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors"
      >
        {activeCategory.label}
        <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-[#C9A84C]/20 shadow-xl z-20">
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                href={category.id === "all" ? "/properties" : `/properties/category/${category.id}`}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 text-[10px] font-futura tracking-widest uppercase transition-colors hover:bg-[#C9A84C]/10 ${
                  currentCategory === category.id ? "text-[#C9A84C] bg-[#C9A84C]/5" : "text-white/60 hover:text-white"
                }`}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
