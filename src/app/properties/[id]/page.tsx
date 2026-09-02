import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection, { PROPERTY_FAQS } from "@/components/PropertyDetailSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

// Standardized Titles & Meta Descriptions for All 17 Properties
const AUDIT_PROPERTY_SEO: Record<string, { title: string; description: string }> = {
  "ocean-elite": {
    title: "REUNION - Ocean Elite | 2BHK Beach Villa in Padutonse, Udupi",
    description: "Reunion Ocean Elite is a 2-bedroom beach villa in Padutonse, Udupi, featuring direct beach access, private balcony, AC, WiFi & generator backup."
  },
  "ocean-manor": {
    title: "REUNION - Ocean Manor | Beach Villa in Padutonse, Udupi",
    description: "Reunion Ocean Manor is a beach villa in Padutonse, Udupi, offering a 2BHK unit plus two independent 1BHK units near the beach."
  },
  "ocean-givaah": {
    title: "REUNION - Ocean Givaah | 3BHK Beachside Villa in Bada, Udupi",
    description: "Reunion Ocean Givaah is a luxurious 3-bedroom beachside villa in Bada, Udupi, with private pool and ocean view terrace for families and groups."
  },
  "ocean-royal": {
    title: "REUNION - Ocean Royal | 3BHK Heritage Villa in Kapu, Udupi",
    description: "Reunion Ocean Royal is a charming 3-bedroom heritage villa in Kapu, Udupi, blending traditional character with modern comfort near Kapu Beach."
  },
  "de-homes": {
    title: "REUNION - De Homes | Premium Suites in Chitpady, Udupi",
    description: "Reunion De Homes offers premium suites in Chitpady, Udupi, combining comfort and convenience close to Udupi Sri Krishna Matha."
  },
  "ocean-daaffy": {
    title: "REUNION - Ocean Daaffy | 3BHK Villa 100m from Beach, Udupi",
    description: "Reunion Ocean Daaffy is a 3-bedroom villa in Bada, Udupi, located just 100 metres from a pristine beach for your whole group."
  },
  "ocean-hridayam": {
    title: "REUNION - Ocean Hridayam | 2BHK Beachfront Villa in Mattu, Udupi",
    description: "Reunion Ocean Hridayam is a 2-bedroom beachfront villa in Mattu, Udupi, steps from Mattu Beach and Reunion's own Ocean Café."
  },
  "ocean-bliss": {
    title: "REUNION - Ocean Bliss | 2BHK Beach Villa in Malpe, Udupi",
    description: "Reunion Ocean Bliss is a comfortable 2-bedroom villa in Malpe, Udupi, with everyday essentials covered close to Malpe Beach."
  },
  "marina-villa": {
    title: "REUNION - Marina Villa | 3BHK Stay in Kannarpady, Udupi",
    description: "Reunion Marina Villa is a 3-bedroom property in Kannarpady, in the heart of Udupi city — a convenient base close to town."
  },
  "charm-villa": {
    title: "REUNION - Charm Villa | 3BHK Villa in Badagabettu, Udupi",
    description: "Reunion Charm Villa is a 3-bedroom property in Badagabettu, Udupi, with everyday amenities for a comfortable family stay."
  },
  "aradhya-villa": {
    title: "REUNION - Aradhya Villa | 4BHK Villa in Kunjibettu, Udupi",
    description: "Reunion Aradhya Villa is a spacious 4-bedroom property in Kunjibettu, Udupi, thoughtfully designed for comfort and larger family groups."
  },
  "arya": {
    title: "REUNION - Arya | Studio Rooms in Kunjibettu, Udupi",
    description: "Reunion Arya offers studio rooms in Kunjibettu, Udupi, featuring two independent 1BHK units for smaller groups and travelers."
  },
  "krshna": {
    title: "REUNION - Krshna | 2BHK Villa in Manipal, Udupi",
    description: "Reunion Krshna is a 2-bedroom villa in Manipal, near Udupi, with essential amenities close to Manipal colleges and hospitals."
  },
  "ocean-waves": {
    title: "REUNION - Ocean Waves | Beachside Villa in Mattu, Udupi",
    description: "Reunion Ocean Waves is a beachside property in Mattu, Udupi, close to the sound of the sea for a soothing coastal stay."
  },
  "regal-villa": {
    title: "REUNION - Regal Villa | Villa in Chitpady, Udupi",
    description: "Reunion Regal Villa is a comfortable property in Chitpady, Udupi, featuring balcony access close to Udupi's main attractions."
  },
  "villa": {
    title: "REUNION - Villa | Villa with Terrace & Garden in Chitpady, Udupi",
    description: "Reunion Villa is a property in Chitpady, Udupi, Karnataka, featuring a terrace and garden for exploring Udupi and nearby beaches."
  },
  "ocean-cafe": {
    title: "REUNION - Ocean Café | Beachfront Café on Mattu Beach, Udupi",
    description: "Reunion Ocean Café is a beachfront café on Mattu Beach, Udupi, featuring sunset views, fireplace lounge, and seafood menu."
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

// VacationRental / LodgingBusiness JSON-LD schema builder
function getPropertySchema(property: typeof properties[0]) {
  const isCafe = property.id === 'ocean-cafe';
  const isHotel = property.id === 'de-homes';

  return {
    '@context': 'https://schema.org',
    '@type': isCafe ? 'Restaurant' : isHotel ? 'LodgingBusiness' : 'VacationRental',
    name: `Reunion ${property.name}`,
    description: property.description,
    url: `${BASE_URL}/properties/${property.id}`,
    image: `${BASE_URL}${property.heroImage}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location.split(',')[0]?.trim(),
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
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
    photo: property.gallery.slice(0, 5).map((img) => ({
      '@type': 'ImageObject',
      url: `${BASE_URL}${img}`,
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


