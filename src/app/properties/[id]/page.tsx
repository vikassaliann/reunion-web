import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection, { PROPERTY_FAQS } from "@/components/PropertyDetailSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

// Exact Titles & Meta Descriptions from Live Audit Report PDF
const AUDIT_PROPERTY_SEO: Record<string, { title: string; description: string }> = {
  "ocean-elite": {
    title: "Ocean Elite | 2BHK Beach Villa in Padutonse, Udupi | REUNION",
    description: "Direct beach access, private balcony & sea views. Ocean Elite is a 2-bedroom villa in Padutonse, Udupi, for up to 6 guests. Fully equipped kitchen, AC, WiFi & generator backup."
  },
  "ocean-manor": {
    title: "Ocean Manor | Beach Villa in Padutonse, Udupi | REUNION",
    description: "Ocean Manor offers a 2BHK unit plus two independent one-bedroom units in Padutonse, Udupi — flexible space for families or groups travelling together near the beach."
  },
  "ocean-givaah": {
    title: "Ocean Givaah | 3BHK Beachside Villa in Bada, Udupi | REUNION",
    description: "Ocean Givaah is a luxurious 3-bedroom beachside villa in Bada, Udupi — a premium coastal stay for families and groups near Udupi's beaches."
  },
  "ocean-royal": {
    title: "Ocean Royal | Heritage Villa in Kapu, Udupi | REUNION",
    description: "Ocean Royal is a charming 3-bedroom heritage villa in Kapu, Udupi, blending traditional character with modern comfort — close to Kapu Beach and its lighthouse."
  },
  "de-homes": {
    title: "De Homes | Premium Suites in Chitpady, Udupi | REUNION",
    description: "Reunion De Homes offers premium suites in Chitpady, Udupi, combining comfort and convenience — perfectly placed for exploring Udupi city and nearby beaches."
  },
  "ocean-daaffy": {
    title: "Ocean Daaffy | 3BHK Villa 100m from the Beach, Udupi | REUNION",
    description: "Ocean Daaffy is a 3-bedroom villa in Bada, Udupi, just 100 metres from a pristine beach — an easy walk to the sand for your whole group."
  },
  "ocean-hridayam": {
    title: "Ocean Hridayam | Beachfront 2BHK Villa in Mattu, Udupi | REUNION",
    description: "Ocean Hridayam is a thoughtfully designed 2-bedroom beachfront villa in Mattu, Udupi — steps from Mattu Beach and Reunion's own Ocean Café."
  },
  "ocean-bliss": {
    title: "Ocean Bliss | 2BHK Villa in Malpe, Udupi | REUNION",
    description: "Ocean Bliss is a comfortable 2-bedroom villa in Malpe, Udupi, with the everyday essentials covered — a simple, relaxed base close to Malpe Beach."
  },
  "marina-villa": {
    title: "Marina Villa | 3BHK Stay in Udupi City, Kannarpady | REUNION",
    description: "Marina Villa is a 3-bedroom property in Kannarpady, in the heart of Udupi city — a convenient base for guests who want to stay close to town."
  },
  "charm-villa": {
    title: "Charm Villa | 3BHK Villa in Badagabettu, Udupi | REUNION",
    description: "Charm Villa is a 3-bedroom first-floor property in Badagabettu, Udupi, with all the everyday amenities for a comfortable stay."
  },
  "aradhya-villa": {
    title: "Aradhya Villa | 4BHK Villa in Kunjibettu, Udupi | REUNION",
    description: "Aradhya Villa is a spacious 4-bedroom property in Kunjibettu, Udupi, thoughtfully designed for comfort and tranquility — well suited to larger family groups."
  },
  "arya": {
    title: "Arya | Studio Rooms in Kunjibettu, Udupi | REUNION",
    description: "Reunion Arya offers first-floor studio rooms in Kunjibettu, Udupi, including two independent 1BHK units — a flexible option for smaller groups."
  },
  "krshna": {
    title: "Krshna | 2BHK Villa in Manipal, Udupi | REUNION",
    description: "Krshna is a 2-bedroom villa in Manipal, near Udupi, with the essential amenities covered — a handy base close to Manipal's colleges and hospitals."
  },
  "ocean-waves": {
    title: "Ocean Waves | Beachside Villa in Mattu, Udupi | REUNION",
    description: "Ocean Waves puts you close to the sound of the sea in Mattu, Udupi — a relaxed beachside property for a soothing, low-key stay."
  },
  "regal-villa": {
    title: "Regal Villa | Villa with Balcony in Chitpady, Udupi | REUNION",
    description: "Regal Villa is a comfortable property in Chitpady, Udupi, with balcony access — a relaxed stay close to Udupi's main attractions."
  },
  "villa": {
    title: "Reunion Villa | Villa with Terrace & Garden in Chitpady, Udupi",
    description: "Reunion Villa is a property in Chitpady, Udupi, Karnataka, featuring a terrace and garden — a comfortable base for exploring Udupi and its beaches."
  },
  "ocean-cafe": {
    title: "Reunion Ocean Café | Beachfront Café on Mattu Beach, Udupi",
    description: "Reunion Ocean Café sits right on Mattu Beach, Udupi, with sunset views, a fireplace lounge and a seafood-and-continental menu — perfect for candlelight dinners and beach celebrations."
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


