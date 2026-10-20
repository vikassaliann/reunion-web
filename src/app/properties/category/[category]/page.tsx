import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import propertiesData from "@/data/properties.json";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import FilterDropdown from "@/components/FilterDropdown";
import { CATEGORIES, CATEGORY_MAP } from "@/utils/categories";

const BASE_URL = "https://www.reunionglobal.in";

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  "beach-villas": {
    title: "REUNION | Beach Villas — Luxury Beach Stays in Udupi",
    description:
      "Explore beach villas at REUNION along the Udupi coast — private beachfront and near-shore stays near Malpe, Mattu, Kapu, Hoode and Uchila.",
  },
  "city-stays": {
    title: "REUNION | City Villas — Premium City Stays in Udupi",
    description:
      "Explore city villas and premium suites at REUNION in Udupi — Chitpady, Kunjibettu, Manipal and central stays near Sri Krishna Matha.",
  },
  "hotel-stays": {
    title: "REUNION | Hotel Stays — De Homes & De Square in Udupi",
    description:
      "Hotel and boutique stays at REUNION — De Homes suites near Sri Krishna Temple, Udupi, and De Square hotel & resort in Koteshwara.",
  },
  "shivamogga-stays": {
    title: "REUNION | Shivamogga Stays — Serene Villa near Jog Falls",
    description:
      "Reunion Serene — private pool villa stay near Shivamogga and Jog Falls, Karnataka. Malnad nature retreat for families and groups.",
  },
  all: {
    title: "REUNION | All Stays — Beach Villas & City Villas in Udupi",
    description:
      "Browse all stays at REUNION in Udupi — luxury beach villas, city villas and premium suites for families, couples and groups.",
  },
};

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryLabel = CATEGORIES.find(c => c.id === category)?.label || 'Stays';
  const seo = CATEGORY_SEO[category] || {
    title: `REUNION | ${categoryLabel} — Udupi`,
    description: `Browse REUNION's exclusive ${categoryLabel.toLowerCase()} across Udupi, Karnataka.`,
  };
  return {
    title: { absolute: seo.title },
    description: seo.description,
    icons: {
      icon: [{ url: "/reunion-src-logo.jpeg", type: "image/jpeg", sizes: "any" }],
      apple: "/reunion-src-logo.jpeg",
      shortcut: "/reunion-src-logo.jpeg",
    },
    alternates: { canonical: `${BASE_URL}/properties/category/${category}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}/properties/category/${category}`,
      siteName: 'REUNION',
      type: 'website',
      images: [{ url: '/logoo.png', width: 1080, height: 1080, alt: `REUNION ${categoryLabel}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/logoo.png'],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const categoryInfo = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  
  // Filter properties based on the category
  const properties = propertiesData.filter(prop => {
    const propertyCategories = CATEGORY_MAP[prop.id] || [];
    return propertyCategories.includes(categoryId);
  });

  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-24 bg-[#060606] min-h-screen px-4 md:px-10 overflow-hidden">
        {/* Category Hero Background */}
        <div className="absolute top-0 left-0 right-0 h-[80vh] z-0 pointer-events-none">
          <img 
            src={
              categoryId === "city-stays"
                ? "/properties/krshna/krthumb.png"
                : categoryId === "hotel-stays"
                  ? "/properties/de-homes/dehomesthumb.png"
                  : categoryId === "shivamogga-stays"
                    ? "/properties/reunion-seren/hero.png"
                    : "/properties/ocean-manor/herooo.png"
            }
            className="w-full h-full object-cover brightness-[0.62] grayscale-[5%]" 
            alt={categoryInfo.label}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/15 via-transparent to-[#060606]/75" />
        </div>

        <div className="relative z-10 mx-auto">
          {/* Breadcrumbs */}
          <div className="pt-4">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Properties', href: '/properties' },
              { label: categoryInfo.label },
            ]} />
          </div>

          {/* Header */}
          <div className="flex items-center justify-center h-[calc(80vh-180px)] mb-16">
            <h1 className="font-futura text-5xl md:text-[5.5rem] text-white font-medium tracking-[0.3em] uppercase drop-shadow-xl text-center">
              {categoryInfo.label}
            </h1>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-16">
             <h2 className="text-[#C9A84C] font-futura tracking-[0.2em] uppercase text-[10px]">{categoryInfo.label} ({properties.length})</h2>
             <FilterDropdown currentCategory={categoryId} />
          </div>

          {/* Properties List - Alternating Layout */}
          {properties.length > 0 ? (
            <div className="space-y-24 md:space-y-32">
              {properties.map((prop, index) => {
                const isImageLeft = index % 2 === 0;

                return (
                  <div key={prop.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className={`space-y-6 ${isImageLeft ? 'order-2 lg:col-span-5' : 'order-2 lg:order-1 lg:col-span-5'}`}>
                      <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block">
                        {prop.location}
                      </span>
                      <h2 className="font-futura text-3xl sm:text-4xl text-white font-light uppercase tracking-wider leading-tight">
                        {prop.name.toUpperCase().startsWith("REUNION ") ? (
                          <>Reunion<br />{prop.name.substring(8)}</>
                        ) : (
                          <>Reunion<br />{prop.name}</>
                        )}
                      </h2>
                      <p className="text-white/40 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md">
                        {prop.description.length > 180 ? `${prop.description.substring(0, 180)}...` : prop.description}
                      </p>
                      <Link
                        href={`/properties/${prop.id}`}
                        className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all mt-4"
                      >
                        EXPLORE MORE
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Image */}
                    <div className={`${isImageLeft ? 'order-1 lg:col-span-7' : 'order-1 lg:order-2 lg:col-span-7'}`}>
                      <Link href={`/properties/${prop.id}`} className="block aspect-[4/3] overflow-hidden group">
                        <img
                          src={prop.heroImage}
                          alt={prop.name}
                          loading={index < 2 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-700"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/5 bg-white/[0.02]">
              <p className="font-futura text-white/50 tracking-widest text-xs uppercase">No properties found in this category.</p>
              <Link href="/properties" className="inline-block mt-6 font-futura text-[#C9A84C] tracking-[0.2em] text-[10px] border-b border-[#C9A84C]/40 pb-1 uppercase">
                View All Stays
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
