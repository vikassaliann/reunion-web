import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import Link from "next/link";

export const metadata = {
  title: 'Our Residences | REUNION',
};

export default function PropertiesPage() {
  return (
    <>
      <Navbar />

      <section className="pt-40 pb-24 bg-[#060606] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-cinzel text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase block mb-4">The Collection</span>
            <h1 className="font-cormorant text-[clamp(2.2rem,5vw,3.8rem)] font-light text-white leading-tight">
              Exclusive <em className="text-[#C9A84C] italic">Estates</em>
            </h1>
            <div className="w-16 h-[1px] bg-[#C9A84C]/40 mx-auto mt-8"></div>
            <p className="text-[#8a8682] text-sm max-w-md mx-auto mt-6 leading-relaxed">
              Discover our curated portfolio of premium coastal villas and beachfront sanctuaries across Udupi, Karnataka.
            </p>
          </div>

          {/* Pinterest Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {properties.map((prop, index) => {
              // Alternate aspect ratios for masonry effect
              const isTall = index % 3 === 1;
              return (
                <Link
                  key={prop.id}
                  href={`/properties/${prop.id}`}
                  className="block break-inside-avoid group relative overflow-hidden rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-all duration-500 bg-[#070707] shadow-lg hover:shadow-2xl"
                >
                  {/* Image wrapper */}
                  <div className={`relative overflow-hidden aspect-[4/5] ${isTall ? 'sm:aspect-[3/5]' : 'sm:aspect-[4/5]'}`}>
                    <img
                      src={prop.heroImage}
                      alt={prop.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                    {/* Gold top highlight line on hover */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      {/* Location tag */}
                      <span className="inline-block font-cinzel text-[8px] tracking-[0.3em] text-[#C9A84C] uppercase mb-2 bg-[#C9A84C]/10 px-2.5 py-1 rounded-sm backdrop-blur-sm border border-[#C9A84C]/15">
                        {prop.location}
                      </span>

                      {/* Property name */}
                      <h2 className="font-cormorant text-xl md:text-2xl text-white font-light leading-snug group-hover:text-[#C9A84C] transition-colors duration-300 mb-2">
                        {prop.name}
                      </h2>

                      {/* Short description */}
                      <p className="text-[11px] text-[#a09c98] leading-relaxed line-clamp-2 group-hover:text-[#c5c0bb] transition-colors duration-300">
                        {prop.description.substring(0, 80)}...
                      </p>

                      {/* View indicator */}
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <span className="font-cinzel text-[8px] tracking-[0.25em] text-[#C9A84C] uppercase">Explore Property</span>
                        <svg className="w-3 h-3 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
