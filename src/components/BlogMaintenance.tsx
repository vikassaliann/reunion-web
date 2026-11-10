import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MandalaLotus } from "@/components/wellness/WellnessMandala";

export default function BlogMaintenance() {
  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen selection:bg-[#C9A84C] selection:text-black">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-5 md:px-10 text-center">
        <MandalaLotus className="w-10 h-10 mb-6 opacity-50" />
        <p className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
          REUNION · Guides
        </p>
        <h1 className="font-futura text-2xl sm:text-3xl font-light tracking-[0.12em] uppercase text-white mb-4">
          Page under maintenance
        </h1>
        <p className="font-futura text-sm text-white/50 font-light leading-relaxed max-w-md tracking-wide mb-10">
          Our travel guides are being updated. Stays, Ocean Café and experiences are still available —
          explore the rest of the site.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex justify-center px-8 py-3.5 border border-[#C9A84C] text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="inline-flex justify-center px-8 py-3.5 border border-white/20 text-white/70 font-futura text-[10px] tracking-[0.3em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            Explore stays
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
