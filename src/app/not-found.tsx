import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Explore our curated collection of luxury properties across Coastal Karnataka.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="bg-[#060606] text-on-surface antialiased overflow-x-hidden selection:bg-antique-gold selection:text-obsidian-deep min-h-screen flex flex-col">
      <div className="noise-overlay" />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center space-y-8">
          {/* Decorative gold line */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <p className="font-cinzel text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase">Lost at Sea</p>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>

          {/* 404 Number */}
          <h1
            className="font-cinzel text-[clamp(5rem,15vw,10rem)] font-bold tracking-[0.1em] leading-none"
            style={{
              background: "linear-gradient(180deg, #C9A84C 0%, #f0d78c 40%, #C9A84C 80%, #a08530 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 30px rgba(201,168,76,0.2))",
            }}
          >
            404
          </h1>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="font-cormorant text-2xl md:text-3xl font-light text-white">
              This page has <em className="text-[#C9A84C] italic">drifted away</em>
            </h2>
            <p className="text-[#a09c98] text-sm md:text-base leading-relaxed max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back to our curated collection of luxury coastal stays.
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-[#C9A84C]/30 mx-auto" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#C9A84C] text-[#080808] font-cinzel text-[11px] tracking-[0.2em] uppercase hover:bg-[#d4b85a] transition-all duration-300"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Return Home
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C9A84C]/30 text-[#C9A84C] font-cinzel text-[11px] tracking-[0.2em] uppercase hover:bg-[#C9A84C]/10 transition-all duration-300"
            >
              View Properties
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
