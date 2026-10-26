"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import EventsGalleryCarousel from "@/components/events/EventsGalleryCarousel";
import { getKeywordSeo } from "@/data/keywordGuide";

const seo = getKeywordSeo("/experiences/beach-birthday");

const BDY = (file: string) => `/properties/experiances/candlelight/bdy/${file}`;

const SLIDES = [
  {
    image: BDY("bd1.jpeg"),
    title: "Beach Birthday Bash",
    caption: "Private beachfront party with lights, florals and cake by the sea.",
  },
  {
    image: BDY("bd3.jpeg"),
    title: "Shoreline Setup",
    caption: "Decorated beachfront seating on Mattu Beach for your celebration.",
  },
  {
    image: BDY("bd4.jpeg"),
    title: "Surprise on the Sand",
    caption: "Midnight reveals and candle paths right on the beachfront.",
  },
  {
    image: BDY("bd5.jpeg"),
    title: "Beachfront Dining",
    caption: "Intimate tables with cake and ambient light by the Arabian Sea.",
  },
  {
    image: BDY("bd.jpeg"),
    title: "Under the Stars",
    caption: "Evening beachfront birthdays styled for photos and memories.",
  },
] as const;

const NOTES = [
  { n: "01", t: "Custom Décor", d: "Balloons, fairy lights, florals on the beachfront" },
  { n: "02", t: "Cake & Treats", d: "Birthday cake arrangement & special desserts" },
  { n: "03", t: "Beachfront Venue", d: "Private setup on Mattu Beach, Udupi" },
  { n: "04", t: "Music & Vibes", d: "Speaker setup & ambient shoreline lighting" },
];

export default function BirthdayPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToBook = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-[88svh] sm:min-h-screen flex items-end overflow-hidden">
        <img
          src={BDY("bd.jpeg")}
          alt={seo?.imageAlt ?? "Beach birthday celebration on Mattu Beach, Udupi"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-black/40" />
        <MandalaRing
          className="pointer-events-none absolute -right-24 top-20 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] z-[1]"
          opacity={0.1}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto page-pad pb-16 sm:pb-24 pt-32">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Experiences", href: "/experiences" },
              { label: "Birthday Celebrations" },
            ]}
          />
          <MandalaLotus className="w-9 h-9 mt-8 mb-5 opacity-55" />
          <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-4">
            Beach Birthday · Mattu Beach · REUNION
          </p>
          <h1 className="font-cormorant italic text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.08] max-w-3xl">
            {seo?.h1 ?? "Beach Birthday Celebrations in Udupi"}
          </h1>
          <p className="mt-5 max-w-lg font-futura text-sm text-white/55 font-light leading-relaxed tracking-wide">
            Celebrate on the beachfront at Mattu Beach — decorated setups, dinner and cake by the sand for couples, families and groups.
          </p>
          <button
            type="button"
            onClick={scrollToBook}
            className="mt-8 inline-flex px-8 py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-cinzel text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
          >
            Book Now
          </button>
        </div>
      </section>

      <section className="relative page-pad section-y overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute -left-28 top-10 w-[300px] h-[300px]"
          opacity={0.06}
        />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light leading-snug">
              Birthdays on Mattu Beach
            </h2>
            <p className="font-futura text-sm text-white/50 font-light leading-[1.9] tracking-wide max-w-md mx-auto lg:mx-0">
              REUNION hosts private beachfront birthday celebrations on Mattu Beach — décor, cake and hosting
              right by the Arabian Sea. Intimate nights or larger beachfront parties, always on the sand.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] overflow-hidden">
              <img
                src={BDY("bd1.jpeg")}
                alt="Beachfront birthday setup on Mattu Beach"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative page-pad pb-16 sm:pb-24 overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute right-[-12%] bottom-0 w-[340px] h-[340px]"
          opacity={0.05}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              Beachfront Ambience
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light">
              Party setups
            </h2>
          </div>
          <EventsGalleryCarousel
            slides={SLIDES}
            ariaLabel="Beach birthday gallery"
          />
        </div>
      </section>

      <section className="page-pad pb-16 sm:pb-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pt-14 sm:pt-16">
          {NOTES.map((item) => (
            <div key={item.n} className="text-center md:text-left space-y-2">
              <span className="font-cormorant italic text-2xl text-[#C9A84C]">{item.n}</span>
              <h3 className="font-cinzel text-[10px] tracking-[0.25em] text-white uppercase">
                {item.t}
              </h3>
              <p className="font-futura text-[11px] text-white/40 font-light leading-relaxed">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={formRef}
        id="book-birthday"
        className="relative page-pad section-y border-t border-white/10 overflow-hidden"
      >
        <MandalaRing
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[400px]"
          opacity={0.05}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <MandalaLotus className="w-8 h-8 mx-auto opacity-50" />
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase">
              Reserve with Reunion
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light">
              Plan your beach birthday
            </h2>
            <p className="font-futura text-xs text-white/40 font-light tracking-wide max-w-sm mx-auto">
              Tell us your date, guest count and occasion — we&apos;ll confirm your Mattu Beach setup.
            </p>
          </div>
          <ContactForm
            defaultPreference="Beach Birthday — Reunion Ocean Café"
            whatsappNumber="919972231289"
            instagramHandle="@reunionteam19"
            dateOnly
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
