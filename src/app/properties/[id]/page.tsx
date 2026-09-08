import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection, { PROPERTY_FAQS } from "@/components/PropertyDetailSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

// Standardized Titles & Meta Descriptions for All 17 Properties (Property Name | Tagline without address)
const AUDIT_PROPERTY_SEO: Record<string, { title: string; description: string }> = {
  "ocean-elite": {
    title: "REUNION - Ocean Elite | Luxury 2BHK Beachfront Villa with Direct Beach Access",
    description: "Experience direct beach access, private sea-view balcony, spacious lawn, and premium amenities at Ocean Elite by Reunion."
  },
  "ocean-manor": {
    title: "REUNION - Ocean Manor | Beachfront Villa & Independent Ocean Suites",
    description: "Featuring sea-facing balconies, river views, and scenic rock-bed beach access for families and group stays."
  },
  "ocean-givaah": {
    title: "REUNION - Ocean Givaah | Luxury 3BHK Villa with Private Pool & Ocean Terrace",
    description: "Enjoy a private swimming pool, lush garden, and panoramic ocean-view terrace just 200 metres from the shore."
  },
  "ocean-royal": {
    title: "REUNION - Ocean Royal | Charming 3BHK Heritage Farmhouse Villa",
    description: "Charming heritage coastal stay surrounded by lush coconut groves just 50 metres from the sea."
  },
  "de-homes": {
    title: "REUNION - De Homes | Premium Luxury Suites & Presidential Suite",
    description: "Boutique luxury suites offering Presidential Suite, balcony rooms, and modern executive comfort."
  },
  "ocean-daaffy": {
    title: "REUNION - Ocean Daaffy | Peaceful 3BHK Coastal Villa Steps from the Shore",
    description: "A serene 3-bedroom coastal retreat located just 100 metres from pristine sandy beaches."
  },
  "ocean-hridayam": {
    title: "REUNION - Ocean Hridayam | Beachfront 2BHK Sanctuary with Ocean View Balcony",
    description: "Step directly onto the sand from this 2-bedroom beachfront villa featuring a sea-facing balcony and equipped kitchen."
  },
  "ocean-bliss": {
    title: "REUNION - Ocean Bliss | Cozy 2BHK Coastal Villa & Open Compound Stay",
    description: "A peaceful, open-compound retreat with everyday comforts located moments from coastal beaches."
  },
  "marina-villa": {
    title: "REUNION - Marina Villa | Premium 3BHK City Residence & Private Kitchen",
    description: "Spacious 3-bedroom city property with modern AC bedrooms, private kitchen facility, and private parking."
  },
  "charm-villa": {
    title: "REUNION - Charm Villa | Private 3BHK Upper-Level Family Residence",
    description: "Relaxed 3-bedroom stay featuring attached suites, balcony living, and essential modern amenities."
  },
  "aradhya-villa": {
    title: "REUNION - Aradhya Villa | Grand 4BHK Villa with Bathtub Suite & Private Terrace",
    description: "Multi-story luxury residence featuring a bathtub suite, closed event terrace, living balconies, and spacious dining."
  },
  "arya": {
    title: "REUNION - Arya | Executive Studio Rooms & Independent Suites",
    description: "Independent 1BHK studio suites designed for couples, business travelers, and small family getaways."
  },
  "krshna": {
    title: "REUNION - Krshna | Fully Furnished 2BHK Residence & Private Kitchen",
    description: "Modern 2-bedroom home equipped with a full kitchen, high-speed WiFi, and quiet neighborhood surroundings."
  },
  "ocean-waves": {
    title: "REUNION - Ocean Waves | Beachside Sanctuary 5 Meters from the Waves",
    description: "Listen to the ocean from your balcony in this beachside villa featuring 3 independent private units."
  },
  "regal-villa": {
    title: "REUNION - Regal Villa | Elegant 2BHK Villa with Private Balcony & Terrace",
    description: "Air-conditioned 2-bedroom villa featuring a spacious terrace, private balcony, and full kitchen."
  },
  "villa": {
    title: "REUNION - Villa | Private 3BHK Villa with Lush Garden & Sun Terrace",
    description: "Charming 3-bedroom property featuring garden views, top-floor terrace, and custom meal arrangements."
  },
  "ocean-cafe": {
    title: "REUNION - Ocean Café | Premier Beachfront Dining & Sunset Lounge",
    description: "Right on the shore featuring sunset views, fireplace lounge, seafood specialties, gourmet coffee, and candlelight dinners."
  }
};

const MAP_LINKS: Record<string, string> = {
  "ocean-waves": "https://share.google/eqFYB1d1AuDbMxZsK",
  "ocean-elite": "https://share.google/IctlTljnCt3FgqQfL",
  "ocean-manor": "https://share.google/wrhEhrLlGy34G40By",
  "ocean-bliss": "https://share.google/ufUNLhBYyZ6jyZR2p",
  "ocean-daaffy": "https://share.google/l04jcrY103m0p0K3S",
  "arya": "https://share.google/AHUQar1rgE6Zfcohh",
  "marina-villa": "https://share.google/8LjWWnPGEZtwhXprX",
  "krshna": "https://share.google/xRpFTqWqRX5ShFqFk",
  "charm-villa": "https://share.google/ceuamChqV0frGoZVf",
  "de-homes": "https://share.google/AXOZTWONFB5kLZE0o",
  "aradhya-villa": "https://share.google/f9lK85EZJh7fCNNTB",
  "ocean-hridayam": "https://share.google/yf0w6TtYw4QYGkq2u",
  "ocean-cafe": "https://share.google/vsXAVG9Y8vshzClQG",
  "ocean-givaah": "https://share.google/hP2F3unQNtIxL1KTh",
  "villa": "https://share.google/8jFAzdHybtmkeZQwv",
  "ocean-royal": "https://share.google/vqIEhqFKsJt9EitKO",
  "regal-villa": "https://maps.app.goo.gl/P3NuZSXE29bcFPT19"
};

export async function generateStaticParams() {
  return properties.map((prop) => ({
    id: prop.id,
  }));
}

// Dynamic SEO metadata per property (Audit Exact Titles & Descriptions)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const auditSeo = AUDIT_PROPERTY_SEO[id];
  const propertyTitle = auditSeo?.title || `${property.name} — ${property.bedrooms > 0 ? property.bedrooms + 'BHK ' : ''}Luxury Stay in ${property.location}`;
  const propertyDescription = auditSeo?.description || property.description.substring(0, 155) + '...';

  return {
    title: propertyTitle,
    description: propertyDescription,
    alternates: {
      canonical: `${BASE_URL}/properties/${property.id}`,
    },
    openGraph: {
      title: propertyTitle,
      description: propertyDescription,
      url: `${BASE_URL}/properties/${property.id}`,
      siteName: 'REUNION',
      type: 'website',
      images: [
        {
          url: property.heroImage,
          width: 1200,
          height: 630,
          alt: `${property.name} — Luxury Property in ${property.location} by Reunion Global`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: propertyTitle,
      description: propertyDescription,
      images: [property.heroImage],
    },
  };
}

// VacationRental / LodgingBusiness / Restaurant JSON-LD schema builder
function getPropertySchema(property: typeof properties[0]) {
  const isCafe = property.id === 'ocean-cafe';
  const isHotel = property.id === 'de-homes';
  const mapUrl = MAP_LINKS[property.id];

  const galleryImages = (property.gallery && property.gallery.length > 0)
    ? property.gallery.map((img) => `${BASE_URL}${img}`)
    : [`${BASE_URL}${property.heroImage}`];

  // Ensure unique list of absolute image URLs
  const allImages = Array.from(new Set([`${BASE_URL}${property.heroImage}`, ...galleryImages]));

  return {
    '@context': 'https://schema.org',
    '@type': isCafe ? 'Restaurant' : isHotel ? 'LodgingBusiness' : 'VacationRental',
    identifier: `reunion-${property.id}`,
    name: `Reunion ${property.name}`,
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
      latitude: 13.3409,
      longitude: 74.7421,
    },
    ...(!isCafe && !isHotel ? {
      containsPlace: {
        '@type': 'Accommodation',
        name: `Reunion ${property.name}`,
        numberOfBedrooms: property.bedrooms || 1,
      },
    } : {}),
    priceRange: '₹₹₹',
    ...(property.bedrooms > 0 && !isCafe ? { numberOfRooms: property.bedrooms } : {}),
    amenityFeature: property.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
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

// FAQPage JSON-LD schema builder (Audit Fix 6)
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
  const faqSchema = getFaqSchema(id);

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-antique-gold selection:text-obsidian-deep">
      <div className="noise-overlay"></div>
      <Navbar />

      {/* VacationRental / LodgingBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      {/* FAQPage JSON-LD Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <main className="pt-20">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Properties', href: '/properties' },
          { label: property.name },
        ]} />

        {/* Hero Section */}
        <section className="relative w-full h-[85vh] md:h-screen flex items-end pb-margin-mobile md:pb-margin-desktop">
          <div className="absolute inset-0 w-full h-full">
            <img alt={`${property.name} exterior with beach view in ${property.location}`} className="w-full h-full object-cover" src={property.heroImage} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-on-surface mb-4">{property.name}</h1>
            <p className="font-label-caps text-label-caps text-antique-gold tracking-[0.3em] mb-8">{property.location}</p>
            <div className="w-px h-16 bg-antique-gold/50 mx-auto"></div>
          </div>
        </section>

        {/* Unified Details, Carousel, Map Button & Sidebar Contact Form */}
        <PropertyDetailSection property={property} mapLink={MAP_LINKS[id]} />
      </main>

      <Footer />
    </div>
  );
}


