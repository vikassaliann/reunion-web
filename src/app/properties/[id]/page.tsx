import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import { notFound } from "next/navigation";
import PropertyDetailSection from "@/components/PropertyDetailSection";

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

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background text-on-surface antialiased overflow-x-hidden selection:bg-antique-gold selection:text-obsidian-deep">
      <div className="noise-overlay"></div>
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] md:h-screen flex items-end pb-margin-mobile md:pb-margin-desktop">
          <div className="absolute inset-0 w-full h-full">
            <img alt={property.name} className="w-full h-full object-cover" src={property.heroImage} />
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

      <Footer variant="estate" />
    </div>
  );
}
