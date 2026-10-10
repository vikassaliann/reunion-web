import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import properties from "@/data/properties.json";
import OceanCafeDining from "@/components/dining/OceanCafeDining";
import { CoffeeSteam, WaveSteamPattern } from "@/components/dining/CafeDecor";
import { OCEAN_CAFE_HERO_IMAGE } from "@/data/oceanCafePage";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";
const MAP_LINK = "https://maps.app.goo.gl/r4RPLhfcNUP4ECd18";
const CAFE_PHONE = "+91 9972231289";

function getOceanCafe() {
  const property = properties.find((p) => p.id === "ocean-cafe");
  if (!property) {
    throw new Error("ocean-cafe property missing from properties.json");
  }
  return property;
}

const cafe = getOceanCafe();

// Match the ranked SERP title so Google can consolidate /properties/ocean-cafe → /dining
const PAGE_TITLE = "REUNION Ocean Café | Beachfront Café at Mattu Beach, Udupi";
const PAGE_DESCRIPTION =
  "Right on the shore at Mattu Beach featuring sunset views, fireplace lounge, fresh seafood specialties, gourmet coffee, and candlelight dinners in Udupi.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/dining` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/dining`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: `${BASE_URL}${cafe.heroImage}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${BASE_URL}${cafe.heroImage}`],
  },
};

function getRestaurantSchema() {
  const images = cafe.gallery.map((img) => `${BASE_URL}${img}`);
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "REUNION Ocean Café",
    description: cafe.description,
    url: `${BASE_URL}/dining`,
    image: images,
    telephone: CAFE_PHONE.replace(/\s/g, ""),
    servesCuisine: [
      "Continental",
      "Chinese",
      "Seafood",
      "Coastal Snacks",
      "Specialty Coffee",
      "Mocktails",
      "Vegetarian",
      "Vegan",
    ],
    priceRange: "₹₹",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mattu Beach Shoreline, Mattu",
      addressLocality: "Mattu, Udupi",
      addressRegion: "Karnataka",
      postalCode: "576101",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:30",
        closes: "22:00",
      },
    ],
    sameAs: [MAP_LINK],
  };
}

export default function DiningPage() {
  const heroImage = OCEAN_CAFE_HERO_IMAGE;

  return (
    <div
      className="min-h-screen antialiased selection:bg-[#c9a84c] selection:text-[#1a110c]"
      style={{ backgroundColor: "#1a110c", color: "#f4ebe1" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantSchema()) }}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative w-full h-[85vh] md:h-[min(92vh,880px)] flex items-end pb-12 md:pb-16">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Reunion Ocean Café on Mattu Beach, Udupi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a110c] via-[#1a110c]/55 to-[#1a110c]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(201,168,76,0.12),transparent_55%)]" />
          </div>

          <WaveSteamPattern className="absolute bottom-0 left-0 right-0 w-full h-12 text-[#c9a84c] pointer-events-none" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-12">
            <div className="flex flex-col items-center text-center">
              <CoffeeSteam className="w-10 h-14 text-[#c9a84c]/80 mb-6" />
              <p className="font-futura text-[10px] tracking-[0.45em] text-[#c9a84c] uppercase mb-4">
                {cafe.location}
              </p>
              <h1 className="font-futura text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#f4ebe1] uppercase tracking-[0.22em] md:tracking-[0.28em] leading-tight max-w-5xl">
                Reunion Ocean Café
              </h1>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="relative px-5 md:px-10 lg:px-12 pb-28 pt-4 max-w-[1400px] mx-auto overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dining" }]} />

          <nav
            aria-label="Breadcrumb"
            className="relative mt-6 mb-4 flex flex-wrap items-center justify-center gap-2 font-futura text-[10px] tracking-[0.35em] text-[#e8dfd0]/40 uppercase"
          >
            <Link href="/" className="hover:text-[#c9a84c] transition-colors">
              Home
            </Link>
            <span className="text-[#e8dfd0]/20">/</span>
            <span className="text-[#c9a84c]">Ocean Café</span>
          </nav>

          <OceanCafeDining
            name={cafe.name}
            description={cafe.description}
            amenities={cafe.amenities}
            mapLink={MAP_LINK}
            phone={CAFE_PHONE}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
