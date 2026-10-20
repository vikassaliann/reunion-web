"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import properties from "@/data/properties.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";

const seo = getKeywordSeo("/about");

const BASE_URL = "https://www.reunionglobal.in";

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Reunion Global",
  description:
    "Reunion Global — managing 17+ premium beach villas, coastal cafés, boutique hotels, and city villas across Udupi district.",
  url: `${BASE_URL}/about`,
  publisher: {
    "@type": "Organization",
    name: "Reunion Global Private Ltd.",
    url: BASE_URL,
    logo: `${BASE_URL}/logoo.png`,
  },
};

const HERO_IMAGES = properties.map((p) => p.heroImage);

const CATEGORIES = [
  "Executive Leadership",
  "Operations & Management",
  "HR & Marketing",
  "Guest Relations & Sales",
  "Front Office Management",
  "Culinary Team",
  "Housekeeping & Facility Management",
];

const TEAM_MEMBERS = [
  {
    name: "Mrs. Kshama Kadamba",
    role: "Managing Director & CEO",
    image: "/team/ceo.jpg",
    category: "Executive Leadership",
    description: `Visionary and tech-driven Managing Director with a strong foundation in Computer Science Engineering from MITE and seven years of high-impact experience in the software industry. Combines deep technical expertise with strategic executive leadership to drive innovation, solve complex challenges, and deliver sustainable business growth. Adept at navigating difficult situations, leading high-performing teams, and translating technology into meaningful business outcomes.

Reunion Global Private Ltd. was founded in 2020, during the challenging period of the COVID-19 pandemic, with a clear vision to redefine tourism by prioritizing guest safety, trust, and exceptional travel experiences. The company was established with the intention of creating a safer and more reliable way for guests to explore destinations while ensuring that every journey is comfortable, memorable, and enriching.

Reunion supports owners of beautiful homes, heritage properties, and hotels in managing, maintaining, and effectively utilizing their assets. Reunion steps in to restore, manage, and transform these properties into distinctive tourism destinations, enabling owners to generate sustainable income while preserving the character, heritage, and unique charm of their properties.
At the same time, guests get the opportunity to experience authentic, comfortable, and memorable stays in distinctive properties that offer more than just accommodation—they offer a sense of place, culture, and connection.
Through this approach, Reunion creates a win-win ecosystem that empowers property owners, delivers exceptional guest experiences, unlocks the potential of properties, and promotes sustainable and responsible tourism.`,
  },
  {
    name: "Mr. Santhosh",
    role: "Head Chef",
    image: "/properties/team/oneafter.jpeg",
    description:
      "30+ years of culinary experience, shaped by a distinguished career in reputed hotels, bringing expertise, precision, and a commitment to exceptional dining to Reunion.",
    category: "Culinary Team",
  },
  {
    name: "Mr. Praveen Devadiga",
    role: "Senior Manager",
    image: "/properties/team/two.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Manpreet Singh",
    role: "Operational Manager",
    image: "/properties/team/three.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Nagaraj",
    role: "Property Manager",
    image: "/properties/team/four.jpeg",
    category: "Operations & Management",
  },
  {
    name: "Mr. Sumith Naik",
    role: "HR & Marketing Manager",
    image: "/properties/team/twelve.jpeg",
    category: "HR & Marketing",
  },
  {
    name: "Mrs. Nayana Devadiga",
    role: "Sales and Guest Relationship Executive",
    image: "/properties/team/five.jpeg",
    category: "Guest Relations & Sales",
  },
  {
    name: "Ms. Mhombeni Jami",
    role: "Guest Service Executive",
    image: "/properties/team/thirteen.jpeg",
    category: "Guest Relations & Sales",
  },
  {
    name: "Mr. Ramesh",
    role: "Front Desk Manager",
    image: "/properties/team/six.jpeg",
    category: "Front Office Management",
  },
  {
    name: "Mr. Sachin Rawat",
    role: "Chef",
    image: "/properties/team/eleven.jpeg",
    objectPosition: "object-top",
    category: "Culinary Team",
  },
  {
    name: "Mr. Edward",
    role: "Head Housekeeping",
    image: "/properties/team/eight .jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Samanth",
    role: "Housekeeping Associate",
    image: "/properties/team/seven.jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Wonchio Odyuo",
    role: "Housekeeping Associate",
    image: "/properties/team/nine.jpeg",
    category: "Housekeeping & Facility Management",
  },
  {
    name: "Mr. Robin",
    role: "Housekeeping Associate",
    image: "/properties/team/ten.jpeg",
    category: "Housekeeping & Facility Management",
  },
];

const CEO_BIO_BREAK =
  "Reunion supports owners of beautiful homes, heritage properties, and hotels in managing, maintaining, and effectively utilizing their assets.";

function CeoDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const breakAt = text.indexOf(CEO_BIO_BREAK);
  const canCollapse =
    breakAt !== -1 && breakAt + CEO_BIO_BREAK.length < text.length;
  const preview = canCollapse
    ? text.slice(0, breakAt + CEO_BIO_BREAK.length).trimEnd()
    : text;
  const rest = canCollapse
    ? text.slice(breakAt + CEO_BIO_BREAK.length).trimStart()
    : "";

  return (
    <div>
      <div className="whitespace-pre-line text-white/60 font-futura text-sm font-light leading-[1.9] tracking-wide">
        {expanded || !canCollapse ? text : preview}
        {!expanded && canCollapse && rest ? "…" : null}
      </div>
      {canCollapse && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 font-futura text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080808] text-white antialiased overflow-x-hidden selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <KeywordFaqJsonLd seo={seo} />
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <main className="pt-20">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
        />

        {/* Hero */}
        <section className="relative min-h-[70vh] md:min-h-[78vh] flex items-end pb-16 md:pb-24 overflow-hidden">
          {HERO_IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/50" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-6">
            <p className="font-futura text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase">
              Our Story
            </p>
            <h1 className="font-futura text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.16em] uppercase">
              About REUNION
            </h1>
            <p className="text-white/55 text-sm md:text-base font-futura font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              REUNION (Reunion Global Private Ltd.) is a hospitality company in Udupi, Karnataka, founded in 2020,
              managing beach villas, city stays and Ocean Café.
            </p>
          </div>
        </section>

        {/* Our Team */}
        <section className="relative py-20 md:py-28 px-5 md:px-10 lg:px-16" id="our-team">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-20 space-y-4">
              <h2 className="font-futura text-3xl md:text-4xl font-light uppercase tracking-[0.2em]">
                Our Team
              </h2>
              <p className="text-white/45 font-futura text-sm max-w-lg mx-auto font-light leading-relaxed tracking-wide">
                Meet the people powering Reunion.
              </p>
            </div>

            <div className="space-y-20 md:space-y-24">
              {CATEGORIES.map((cat) => {
                const members = TEAM_MEMBERS.filter((m) => m.category === cat);
                if (members.length === 0) return null;

                if (cat === "Executive Leadership" && members.length === 1) {
                  const ceo = members[0];
                  return (
                    <div key={cat} className="space-y-8">
                      <p className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase text-center">
                        {cat}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        <div className="md:col-span-5 relative aspect-[4/5] w-full max-w-md mx-auto md:mx-0 overflow-hidden">
                          <Image
                            src={ceo.image}
                            alt={ceo.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority
                          />
                        </div>
                        <div className="md:col-span-7 space-y-5 md:pt-4">
                          <div>
                            <h3 className="font-futura text-2xl md:text-3xl font-light tracking-widest uppercase">
                              {ceo.name}
                            </h3>
                            <p className="font-futura text-[10px] tracking-[0.3em] text-white/45 uppercase mt-2">
                              {ceo.role}
                            </p>
                          </div>
                          {ceo.description && (
                            <CeoDescription text={ceo.description} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={cat} className="space-y-8">
                    <p className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase text-center">
                      {cat}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-12">
                      {members.map((member) => (
                        <div key={member.name} className="flex flex-col">
                          <div className="relative w-full aspect-[4/5] overflow-hidden mb-4">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className={`object-cover ${member.objectPosition || "object-center"}`}
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <h3 className="font-futura text-sm md:text-base text-white font-light tracking-widest uppercase">
                            {member.name}
                          </h3>
                          <p className="font-futura text-[9px] tracking-[0.18em] text-white/40 uppercase mt-1.5">
                            {member.role}
                          </p>
                          {member.description && (
                            <p className="text-white/50 text-xs font-futura font-light leading-relaxed mt-3">
                              {member.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {seo ? (
          <div className="max-w-3xl mx-auto px-5 md:px-10 pb-20">
            <KeywordSeoSections seo={seo} skipHeadings={["Our team"]} />
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
