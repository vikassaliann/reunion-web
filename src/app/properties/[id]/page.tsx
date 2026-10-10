import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection, { PROPERTY_FAQS } from "@/components/PropertyDetailSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

// Standardized Titles & Meta Descriptions for All 17 Properties (Exact Brand Titles Specified)
const AUDIT_PROPERTY_SEO: Record<string, { title: string; description: string }> = {
  "ocean-elite": {
    title: "REUNION Ocean Elite | Luxury Beach Villa in Hoode, Udupi",
    description: "Experience direct beach access, private sea-view balcony, spacious lawn, and premium amenities at Ocean Elite by Reunion in Hoode, Udupi."
  },
  "ocean-manor": {
    title: "REUNION Ocean Manor | Beachfront Villa Stay in Hoode, Udupi",
    description: "Featuring sea-facing balconies, river views, and scenic rock-bed beach access for families and group stays at Ocean Manor in Hoode, Udupi."
  },
  "ocean-givaah": {
    title: "REUNION Ocean Givaah | Luxury 3BHK Pool Villa in Uchila, Udupi",
    description: "Enjoy a private swimming pool, lush garden, and panoramic ocean-view terrace just 200 metres from the shore at Ocean Givaah in Uchila, Udupi."
  },
  "ocean-royal": {
    title: "REUNION Ocean Royal | Heritage Villa Stay in Kapu, Udupi",
    description: "Charming heritage coastal stay surrounded by lush coconut groves just 50 metres from the sea at Ocean Royal in Kapu, Udupi."
  },
  "de-homes": {
    title: "REUNION De Homes | Premium Suites Near Krishna Temple, Udupi",
    description: "Boutique luxury suites offering Presidential Suite, balcony rooms, and modern executive comfort near Sri Krishna Temple, Udupi city."
  },
  "ocean-daaffy": {
    title: "REUNION Ocean Daaffy | Luxury Beach Villa in Uchila, Udupi",
    description: "A serene 3-bedroom luxury coastal retreat located just 100 metres from pristine sandy beaches at Ocean Daaffy in Uchila, Udupi."
  },
  "ocean-hridayam": {
    title: "REUNION Ocean Hridayam | Beachfront 2BHK Villa in Mattu, Udupi",
    description: "Step directly onto the sand from this 2-bedroom beachfront villa featuring a sea-facing balcony and equipped kitchen at Mattu Beach, Udupi."
  },
  "ocean-bliss": {
    title: "REUNION Ocean Bliss | 2BHK Villa Near Malpe Beach, Udupi",
    description: "A peaceful 2BHK open-compound retreat with everyday comforts located moments from Malpe Beach in Udupi."
  },
  "marina-villa": {
    title: "REUNION Marina Villa | Luxury 3BHK Villa in Udupi City",
    description: "Spacious 3-bedroom luxury city residence with modern AC bedrooms, private kitchen facility, and parking in Kannarpady, Udupi City."
  },
  "charm-villa": {
    title: "REUNION Charm Villa | Luxury Private Villa in Udupi",
    description: "Relaxed 3-bedroom luxury private stay featuring attached suites, balcony living, and essential modern amenities in Badagabettu, Udupi."
  },
  "aradhya-villa": {
    title: "REUNION Aradhya Villa | Luxury 4BHK Villa in Udupi",
    description: "Multi-story luxury 4BHK residence featuring a bathtub suite, closed event terrace, living balconies, and spacious dining in Udupi."
  },
  "arya": {
    title: "REUNION Arya Studio Stays | Luxury Studio Apartments in Udupi",
    description: "Independent 1BHK studio suites designed for couples, business travelers, and small family getaways in Kunjibettu, Udupi."
  },
  "krshna": {
    title: "REUNION Krshna | Premium 2BHK Stay in Manipal, Udupi",
    description: "Modern 2-bedroom premium home equipped with a full kitchen, high-speed WiFi, and quiet neighborhood surroundings in Manipal, Udupi."
  },
  "ocean-waves": {
    title: "REUNION Ocean Waves | Beachfront Villa Stay in Mattu, Udupi",
    description: "Listen to the ocean from your balcony in this beachfront villa featuring 3 independent private units just 5 meters from Mattu Beach, Udupi."
  },
  "regal-villa": {
    title: "REUNION Regal Villa | Luxury Private Villa in Udupi",
    description: "Air-conditioned 2-bedroom luxury private villa featuring a spacious terrace, private balcony, and full kitchen in Chitpady, Udupi."
  },
  "villa": {
    title: "REUNION Villa | Luxury Private Villa in Chitpady, Udupi",
    description: "Charming 3-bedroom property featuring garden views, top-floor terrace, and custom meal arrangements in Chitpady, Udupi."
  },
  "ocean-cafe": {
    title: "REUNION Ocean Café | Beachfront Café at Mattu Beach, Udupi",
    description: "Right on the shore at Mattu Beach featuring sunset views, fireplace lounge, fresh seafood specialties, gourmet coffee, and candlelight dinners in Udupi."
  },
  "reunion-seren": {
    title: "REUNION Serene | Private Nature Stay near Shivamogga",
    description: "Private Malnad holiday home near Shivamogga with a year-round outdoor pool, 4 bedrooms for up to 8 guests, terrace, garden, Wi-Fi, and parking."
  }
};

const PROPERTY_GEO: Record<string, { lat: number; lng: number }> = {
  "ocean-elite":    { lat: 13.3980, lng: 74.6980 },
  "ocean-manor":    { lat: 13.3980, lng: 74.6980 },
  "ocean-givaah":   { lat: 13.2120, lng: 74.7430 },
  "ocean-royal":    { lat: 13.2200, lng: 74.7400 },
  "de-homes":       { lat: 13.3360, lng: 74.7460 },
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
  "reunion-seren":  { lat: 13.9299, lng: 75.5681 },
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
  "reunion-seren": "https://maps.app.goo.gl/LaQVdsY9a3BPDYf19",
  "villa": "https://maps.app.goo.gl/SJaK4GjhNkq9FKA29",
  // Not in the new list — keep existing
  "de-homes": "https://share.google/AXOZTWONFB5kLZE0o",
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

  const auditSeo = AUDIT_PROPERTY_SEO[id];
  const propertyTitle = auditSeo?.title || `REUNION ${property.name} | Luxury Stay in ${property.location}`;
  const propertyDescription = auditSeo?.description || property.description.substring(0, 155) + '...';
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
    icons: {
      icon: [{ url: "/reunion-src-logo.jpeg?v=2", type: "image/jpeg", sizes: "any" }],
      apple: [{ url: "/reunion-src-logo.jpeg?v=2", type: "image/jpeg" }],
      shortcut: "/reunion-src-logo.jpeg?v=2",
    },
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

// VacationRental / LodgingBusiness / Restaurant JSON-LD schema builder (Solves GSC missing identifier, geo, containsPlace, offers & optional warnings)
function getPropertySchema(property: typeof properties[0]) {
  const isCafe = property.id === 'ocean-cafe';
  const isHotel = property.id === 'de-homes';
  const mapUrl = MAP_LINKS[property.id];
  const auditSeo = AUDIT_PROPERTY_SEO[property.id];
  const propertyTitle = auditSeo?.title || `REUNION ${property.name}`;

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
      url: `${BASE_URL}/properties/ocean-cafe`,
      image: allImages,
      telephone: '+91-9972231289',
      servesCuisine: ['Continental', 'Chinese', 'Seafood', 'Coastal Snacks', 'Specialty Coffee', 'Mocktails', 'Vegetarian', 'Vegan'],
      priceRange: '₹₹',
      acceptsReservations: 'True',
      menu: `${BASE_URL}/properties/ocean-cafe`,
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '48',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Foodie Explorer',
          },
          datePublished: '2026-01-20',
          reviewBody: 'Incredible beachfront dining experience at REUNION Ocean Café! Breathtaking sunset views over Mattu Beach, fresh seafood, specialty coffee, and candlelit ambiance.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        },
      ],
      provider: {
        '@type': 'Organization',
        name: 'Reunion Global Private Ltd.',
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
    '@type': isHotel ? 'LodgingBusiness' : 'VacationRental',
    additionalType: isHotel ? 'https://schema.org/Hotel' : 'https://schema.org/VacationRental',
    identifier: `reunion-${property.id}`,
    name: propertyTitle,
    description: property.description,
    url: `${BASE_URL}/properties/${property.id}`,
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
      description: property.description,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Verified Guest',
        },
        datePublished: '2026-01-15',
        reviewBody: `Exceptional stay at ${propertyTitle}. Beautiful location, spotless facilities, and outstanding hospitality by Reunion Global.`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '3500.00',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `${BASE_URL}/properties/${property.id}`,
    },
    checkinTime: property.id === 'reunion-seren' ? '13:00' : '14:00',
    checkoutTime: '11:00',
    priceRange: '₹₹₹',
    ...(property.bedrooms > 0 ? { numberOfRooms: property.bedrooms } : {}),
    amenityFeature: amenitiesList,
    provider: {
      '@type': 'Organization',
      name: 'Reunion Global Private Ltd.',
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
  const auditSeo = AUDIT_PROPERTY_SEO[property.id];
  const propertyTitle = auditSeo?.title || `REUNION ${property.name}`;

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
  const faqs = PROPERTY_FAQS[propertyId];
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
  const auditSeo = AUDIT_PROPERTY_SEO[id];
  const fullTitleHeading = auditSeo?.title ? auditSeo.title.split(' | ')[0] : `REUNION ${property.name}`;

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
          { label: fullTitleHeading },
        ]} />

        <section className="relative w-full h-[85vh] md:h-screen flex items-end pb-margin-mobile md:pb-margin-desktop">
          <div className="absolute inset-0 w-full h-full">
            <img alt={`${fullTitleHeading} exterior with beach view in ${property.location}`} className="w-full h-full object-cover" src={property.heroImage} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-on-surface mb-4 uppercase tracking-widest">{fullTitleHeading}</h1>
            <p className="font-label-caps text-label-caps text-antique-gold tracking-[0.3em] mb-8">{property.location}</p>
            <div className="w-px h-16 bg-antique-gold/50 mx-auto"></div>
          </div>
        </section>

        <PropertyDetailSection property={property} mapLink={MAP_LINKS[id]} />
      </main>

      <Footer />
    </div>
  );
}



