import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import FilterDropdown from "@/components/FilterDropdown";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";
const BASE_URL = "https://www.reunionglobal.in";
const keywordSeo = getKeywordSeo("/properties");

const PAGE_TITLE = keywordSeo?.title ?? 'Udupi Villas | Beach & City Villas in Udupi | REUNION';
const PAGE_DESCRIPTION =
  keywordSeo?.description ??
  "Browse REUNION's Udupi villas — private beach villas near Malpe, Mattu, Kapu, Hoode and Uchila, plus city villas near Sri Krishna Matha.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/properties`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/properties`,
    siteName: 'REUNION',
    type: 'website',
    images: [{ url: '/logoo.png', width: 1080, height: 1080, alt: 'Reunion Global — Luxury Properties Collection in Udupi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/logoo.png'],
  },
};

// ItemList JSON-LD schema for property collection
function getItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Reunion Global — Exclusive Properties',
    description: 'Curated portfolio of luxury beach villas, coastal cafés, boutique hotels, and city villas across Udupi, Coastal Karnataka.',
    numberOfItems: properties.filter(p => p.id !== "ocean-cafe").length,
    itemListElement: properties.filter(p => p.id !== "ocean-cafe").map((prop, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prop.name,
      url: `${BASE_URL}/properties/${prop.id}`,
      image: `${BASE_URL}${prop.heroImage}`,
    })),
  };
}

export default function PropertiesPage() {
  const itemListSchema = getItemListSchema();

  return (
    <>
      <KeywordFaqJsonLd seo={keywordSeo} />
      <Navbar />

      {/* ItemList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="relative pt-32 pb-24 bg-[#060606] min-h-screen px-4 md:px-10 overflow-hidden">
        {/* Ocean Royal Hero Background */}
        <div className="absolute top-0 left-0 right-0 h-[80vh] z-0 pointer-events-none">
          <img 
            src="/properties/ocean-royal/royalthumb.png" 
            className="w-full h-full object-cover brightness-[0.62] grayscale-[10%]" 
            alt="Ocean Royal" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/15 via-transparent to-[#060606]/75" />
        </div>

        <div className="relative z-10 mx-auto">
          {/* Breadcrumbs */}
          <div className="pt-4">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Properties' },
            ]} />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center justify-center min-h-[42vh] sm:min-h-[50vh] md:h-[calc(80vh-180px)] mb-12 md:mb-16 text-center px-4 w-full">
            <h1 className="font-futura w-full max-w-full text-[clamp(1.35rem,6.5vw,5.5rem)] text-white font-medium tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.28em] uppercase drop-shadow-xl text-center leading-[1.2] break-words">
              PROPERTIES
            </h1>
            <p className="mt-5 md:mt-6 max-w-2xl text-white/55 font-futura text-xs sm:text-sm leading-relaxed font-light tracking-wide px-1">
              {keywordSeo?.lead ??
                "Explore REUNION's villas in Udupi — private beach villas and city villas for families, couples and groups, an easy weekend trip from Bangalore."}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-between items-end gap-3 border-b border-white/10 pb-4 mb-12 md:mb-16">
             <h2 className="text-[#C9A84C] font-futura tracking-[0.14em] sm:tracking-[0.2em] uppercase text-[10px]">All Properties</h2>
             <FilterDropdown currentCategory="all" />
          </div>

          {/* Properties List - Alternating Layout */}
          <div className="space-y-24 md:space-y-32">
            {properties.filter(p => p.id !== "ocean-cafe").map((prop, index) => {
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
                    <Link href={`/properties/${prop.id}`} className="block aspect-[4/3] w-full overflow-hidden group">
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

          {keywordSeo ? (
            <div className="max-w-3xl mx-auto mt-24 pb-8">
              <KeywordSeoSections seo={keywordSeo} skipHeadings={["Overview"]} />
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </>
  );
}
