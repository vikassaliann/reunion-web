import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection, { PROPERTY_FAQS } from "@/components/PropertyDetailSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import { PROPERTY_SEO } from "@/data/propertySeo";
import { getPropertyKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";

const PROPERTY_GEO: Record<string, { lat: number; lng: number }> = {
  "ocean-elite":    { lat: 13.3980, lng: 74.6980 },
  "ocean-manor":    { lat: 13.3980, lng: 74.6980 },
  "ocean-givaah":   { lat: 13.2120, lng: 74.7430 },
  "ocean-royal":    { lat: 13.2200, lng: 74.7400 },
  "de-homes":       { lat: 13.3360, lng: 74.7460 },
  "de-square":      { lat: 13.5165, lng: 74.7485 },
  "ocean-daaffy":   { lat: 13.2120, lng: 74.7430 },
  "ocean-hridayam": { lat: 13.2850, lng: 74.7150 },
  "ocean-bliss":    { lat: 13.3580, lng: 74.7040 },
  "marina-villa":   { lat: 13.3250, lng: 74.7420 },
  "charm-villa":    { lat: 13.3410, lng: 74.7450 },
  "aradhya-villa":  { lat: 13.3490, lng: 74.7560 },
  "arya":           { lat: 13.3490, lng: 74.7560 },
  "krshna":         { lat: 13.3525, lng: 74.7874 },
  "ocean-waves":    { lat: 13.2850, lng: 74.7150 },
  "regal-villa":    { lat: 13.3360, lng: 74.7460 },
  "villa":          { lat: 13.3360, lng: 74.7460 },
  "ocean-cafe":     { lat: 13.2850, lng: 74.7150 },
  "reunion-serene":  { lat: 13.8619138, lng: 75.5884242 },
};

const MAP_LINKS: Record<string, string> = {
  "aradhya-villa": "https://maps.app.goo.gl/h5PDhRjDrsTdj5dR8",
  "arya": "https://maps.app.goo.gl/bgDyEDBV22TvRQeLA",
  "charm-villa": "https://maps.app.goo.gl/AuEK46JEGCC1ygA78",
  "krshna": "https://maps.app.goo.gl/hXcpqtsWGWkXSxHh7",
  "marina-villa": "https://maps.app.goo.gl/X5jrFW2phFrZDRgg8",
  "ocean-bliss": "https://maps.app.goo.gl/y27fBpfybGmGsvwH7",
  "ocean-cafe": "https://maps.app.goo.gl/r4RPLhfcNUP4ECd18",
  "ocean-daaffy": "https://maps.app.goo.gl/RN5CDoGUvA2sbm7j7",
  "ocean-elite": "https://maps.app.goo.gl/i4qS8YbVEtMqgRFF7",
  "ocean-givaah": "https://maps.app.goo.gl/4Zau2oTbTh95BmxL6",
  "ocean-hridayam": "https://maps.app.goo.gl/18cbsHn53VKXr5oa9",
  "ocean-manor": "https://maps.app.goo.gl/QDo2c3Fy8mufX5s77",
  "ocean-royal": "https://maps.app.goo.gl/R4LzcKq8bcPPS3ub6",
  "ocean-waves": "https://maps.app.goo.gl/DHikkppGEugCp3V19",
  "reunion-serene": "https://www.google.com/maps/place/Reunion+Serene+Villa/@13.8619138,75.5884242,17z",
  "villa": "https://maps.app.goo.gl/SJaK4GjhNkq9FKA29",
  // Not in the new list — keep existing
  "de-homes": "https://share.google/AXOZTWONFB5kLZE0o",
  "de-square": "https://www.google.com/maps/search/?api=1&query=D-Square+Hotels+and+Resort+Koteshwara+Udupi",
  "regal-villa": "https://maps.app.goo.gl/P3NuZSXE29bcFPT19",
};

export async function generateStaticParams() {
  return properties.map((prop) => ({
    id: prop.id,
  }));
}

// Dynamic SEO metadata per property (Exact Title Tags without layout template duplication)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const keyword = getPropertyKeywordSeo(id);
  const seo = PROPERTY_SEO[id];
  const propertyTitle = keyword?.title || seo?.title || `REUNION ${property.name} | Luxury Stay in ${property.location}`;
  const propertyDescription = keyword?.description || seo?.description || property.description.substring(0, 155) + '...';
  const heroImageUrl = `${BASE_URL}${property.heroImage}`;
  // Ocean Café public page is /dining — keep property URL but canonical to dining
  const canonicalUrl =
    property.id === "ocean-cafe"
      ? `${BASE_URL}/dining`
      : `${BASE_URL}/properties/${property.id}`;

  return {
    title: {
      absolute: propertyTitle,
    },
    description: propertyDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: propertyTitle,
      description: propertyDescription,
      url: canonicalUrl,
      siteName: 'REUNION',
      type: 'website',
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: `${propertyTitle} by Reunion Global`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: propertyTitle,
      description: propertyDescription,
      images: [heroImageUrl],
    },
  };
}

// LodgingBusiness / Restaurant JSON-LD (Developer Brief task 1)
function getPropertySchema(property: typeof properties[0]) {
  const isCafe = property.id === 'ocean-cafe';
  const isHotel = property.id === 'de-homes' || property.id === 'de-square';
  const mapUrl = MAP_LINKS[property.id];
  const seo = PROPERTY_SEO[property.id];
  const keywordSeo = getPropertyKeywordSeo(property.id);
  const propertyTitle = seo?.title || `REUNION ${property.name}`;
  const propertyDescription =
    keywordSeo?.description || seo?.description || property.description;

  const galleryImages = (property.gallery && property.gallery.length > 0)
    ? property.gallery.map((img) => `${BASE_URL}${img}`)
    : [`${BASE_URL}${property.heroImage}`];

  const allImages = Array.from(new Set([`${BASE_URL}${property.heroImage}`, ...galleryImages]));
  const coords = PROPERTY_GEO[property.id] || { lat: 13.3409, lng: 74.7421 };

  // Dedicated Google Restaurant Rich Snippet Schema for Ocean Café
  if (isCafe) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      additionalType: 'https://schema.org/Restaurant',
      identifier: 'reunion-ocean-cafe',
      name: propertyTitle,
      description: property.description,
      url: `${BASE_URL}/dining`,
      image: allImages,
      telephone: '+91-9972231289',
      servesCuisine: ['Continental', 'Chinese', 'Seafood', 'Coastal Snacks', 'Specialty Coffee', 'Mocktails', 'Vegetarian', 'Vegan'],
      priceRange: '₹₹',
      acceptsReservations: 'True',
      menu: `${BASE_URL}/dining`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mattu Beach Shoreline, Mattu',
        addressLocality: 'Mattu, Udupi',
        addressRegion: 'Karnataka',
        postalCode: '576101',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:30',
          closes: '22:00',
        },
      ],
      parentOrganization: {
        '@type': 'Organization',
        name: 'REUNION',
        url: BASE_URL,
      },
    };
  }

  const bedroomsCount = property.bedrooms || 1;
  const bathroomsCount = property.bedrooms || 1;

  const amenitiesList = property.amenities.map((amenity) => ({
    '@type': 'LocationFeatureSpecification',
    name: amenity,
    value: true,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    ...(isHotel ? { additionalType: 'https://schema.org/Hotel' } : {}),
    identifier: `reunion-${property.id}`,
    name: propertyTitle,
    description: propertyDescription,
    url: `${BASE_URL}/properties/${property.id}`,
    telephone: '+91-99802-08289',
    ...(mapUrl ? { sameAs: [mapUrl], hasMap: mapUrl } : {}),
    image: allImages,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${property.name}, ${property.location}`,
      addressLocality: property.location.split(',')[0]?.trim() || 'Udupi',
      addressRegion: 'Karnataka',
      postalCode: '576101',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
    containsPlace: {
      '@type': 'Accommodation',
      additionalType: 'https://schema.org/Accommodation',
      name: propertyTitle,
      description: propertyDescription,
      numberOfBedrooms: bedroomsCount,
      numberOfBathroomsTotal: bathroomsCount,
      bed: {
        '@type': 'BedDetails',
        numberOfBeds: bedroomsCount,
        typeOfBed: 'King Bed',
      },
      occupancy: {
        '@type': 'QuantitativeValue',
        value: bedroomsCount * 2,
      },
      amenityFeature: amenitiesList,
    },
    checkinTime: property.id === 'reunion-serene' ? '13:00' : '14:00',
    checkoutTime: '11:00',
    priceRange: '₹₹₹',
    ...(property.bedrooms > 0 ? { numberOfRooms: property.bedrooms } : {}),
    amenityFeature: amenitiesList,
    parentOrganization: {
      '@type': 'Organization',
      name: 'REUNION',
      url: BASE_URL,
    },
    photo: allImages.slice(0, 10).map((img) => ({
      '@type': 'ImageObject',
      url: img,
    })),
  };
}

// VideoObject JSON-LD schema builder (Solves GSC "Video isn't on a watch page" warning)
function getVideoSchema(property: typeof properties[0]) {
  if (!property.videoUrl) return null;
  const seo = PROPERTY_SEO[property.id];
  const propertyTitle = seo?.title || `REUNION ${property.name}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${propertyTitle} — Video Tour`,
    description: `Walkthrough video tour of ${propertyTitle} located in ${property.location}.`,
    thumbnailUrl: [`${BASE_URL}${property.heroImage}`],
    uploadDate: '2026-01-01T08:00:00+05:30',
    contentUrl: property.videoUrl,
    embedUrl: property.videoUrl,
  };
}

// FAQPage JSON-LD schema builder
function getFaqSchema(propertyId: string) {
  const faqs = getPropertyKeywordSeo(propertyId)?.faqs ?? PROPERTY_FAQS[propertyId];
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    notFound();
  }

  const propertySchema = getPropertySchema(property);
  const videoSchema = getVideoSchema(property);
  const faqSchema = getFaqSchema(id);
  const keyword = getPropertyKeywordSeo(id);
  const seo = PROPERTY_SEO[id];
  // Visible hero uses short property name (old UI); page title/meta still use keyword SEO.
  const heroHeading = property.name;
  const heroAlt = keyword?.imageAlt || `${property.name} — ${property.location}`;

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-antique-gold selection:text-obsidian-deep">
      <div className="noise-overlay"></div>
      <Navbar />

      {/* VacationRental / LodgingBusiness / Restaurant JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      {/* VideoObject JSON-LD Schema */}
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* FAQPage JSON-LD Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <main className="pt-20">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Properties', href: '/properties' },
          { label: heroHeading },
        ]} />

        <section className="relative w-full h-[85vh] md:h-screen flex items-end pb-margin-mobile md:pb-margin-desktop">
          <div className="absolute inset-0 w-full h-full">
            <img alt={heroAlt} className="w-full h-full object-cover" src={property.heroImage} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-on-surface mb-4 uppercase tracking-widest">{heroHeading}</h1>
            <p className="font-label-caps text-label-caps text-antique-gold tracking-[0.3em] mb-8">{property.location}</p>
            <div className="w-px h-16 bg-antique-gold/50 mx-auto"></div>
          </div>
        </section>

        <PropertyDetailSection property={property} mapLink={MAP_LINKS[id]} seoLead={keyword?.lead || seo?.lead} />
      </main>

      <Footer />
    </div>
  );
}



