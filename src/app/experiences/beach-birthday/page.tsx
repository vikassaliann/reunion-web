"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import { getKeywordSeo } from "@/data/keywordGuide";
import ExpandablePageFaq from "@/components/ExpandablePageFaq";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import ExperienceFormGoldBorder from "@/components/experiences/ExperienceFormGoldBorder";

const seo = getKeywordSeo("/experiences/beach-birthday");

const BDY = (file: string) => `/properties/experiences/candlelight/bdy/${file}`;

const HERO_IMAGE = BDY("beach-birthday-hero-mattu-sunset.jpg");
const BIRTHDAY_INTRO_VIDEO = BDY("bdvidd.mp4");

const MOMENTS = [
  {
    src: BDY("bd1.jpeg"),
    label: "01",
    title: "Beach Birthday Bash",
    body: "Private beachfront party with lights, florals and cake by the sea.",
  },
  {
    src: BDY("bd3.jpeg"),
    label: "02",
    title: "Shoreline Setup",
    body: "Decorated beachfront seating on Mattu Beach for your celebration.",
  },
  {
    src: BDY("bd4.jpeg"),
    label: "03",
    title: "Surprise on the Sand",
    body: "Midnight reveals and candle paths right on the beachfront.",
  },
  {
    src: BDY("bd5.jpeg"),
    label: "04",
    title: "Beachfront Dining",
    body: "Intimate tables with cake and ambient light by the Arabian Sea.",
  },
  {
    src: BDY("bd.jpeg"),
    label: "05",
    title: "Under the Stars",
    body: "Evening beachfront birthdays styled for photos and memories.",
  },
  {
    src: BDY("bd2.jpeg"),
    label: "06",
    title: "Balloon Arch & Cake Table",
    body: "Gold frame arch with mint and gold balloons, Happy Birthday banner, florals and your cake on the sand at night.",
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
  const galleryPhotoRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [galleryHover, setGalleryHover] = useState<number | null>(null);
  const [galleryPinned, setGalleryPinned] = useState<number | null>(null);
  const galleryActive = galleryPinned ?? galleryHover;

  useEffect(() => {
    if (galleryPinned === null) return;

    const onPointerDown = (e: PointerEvent) => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      const focused = galleryPhotoRefs.current.get(galleryPinned);
      if (!focused?.contains(e.target as Node)) {
        setGalleryPinned(null);
        setGalleryHover(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [galleryPinned]);

  const scrollToBook = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen overflow-x-hidden">
      <KeywordFaqJsonLd seo={seo} />
      <Navbar />

      <section className="relative min-h-[88svh] sm:min-h-screen flex items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt={
            seo?.imageAlt ??
            "Sunset beach birthday celebration with arch, lanterns and dinner on Mattu Beach, Udupi"
          }
          className="absolute inset-0 w-full h-full object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/45 to-black/25" />
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
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase">
              Beach Birthday Celebrations
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light leading-snug">
              Birthdays on Mattu Beach
            </h2>
            <p className="font-futura text-sm text-white/50 font-light leading-[1.9] tracking-wide max-w-md mx-auto lg:mx-0">
              REUNION hosts private beachfront birthday celebrations on Mattu Beach — décor, cake and hosting right by the Arabian Sea. Intimate nights or larger beachfront parties, always on the sand.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] overflow-hidden ring-1 ring-white/10">
              <video
                src={BIRTHDAY_INTRO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                aria-label="Beach birthday celebration reel on Mattu Beach, Udupi"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative page-pad pb-20 sm:pb-28 overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute right-[-12%] bottom-0 w-[340px] h-[340px]"
          opacity={0.05}
        />
        <div
          className="pointer-events-none absolute inset-0 max-w-6xl mx-auto"
          aria-hidden
        >
          <div className="absolute top-[5%] left-[5%] w-[55%] h-48 bg-[#C9A84C]/10 blur-[90px] rotate-[18deg] rounded-full" />
          <div className="absolute top-[35%] right-[-5%] w-[50%] h-56 bg-[#C9A84C]/8 blur-[100px] -rotate-12 rounded-full" />
          <div className="absolute bottom-[8%] left-[20%] w-[60%] h-52 bg-white/[0.04] blur-[80px] rotate-6 rounded-full" />
          <div className="absolute top-[22%] left-[40%] w-px h-[58%] bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent -rotate-[28deg] origin-top" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              Beachfront Ambience
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light">
              Party setups
            </h2>
          </div>

          <div
            className="space-y-14 sm:space-y-20"
            onMouseLeave={() => setGalleryHover(null)}
          >
            {MOMENTS.map((m, i) => {
              const reverse = i % 2 === 1;
              const tilt = i % 2 === 0 ? "-rotate-[2deg] md:-rotate-[3deg]" : "rotate-[2deg] md:rotate-[3deg]";
              const isFocus = galleryActive === i;
              const dimOthers = galleryActive !== null && !isFocus;
              return (
                <article
                  key={m.title}
                  onMouseEnter={() => setGalleryHover(i)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center transition-opacity duration-500 ${
                    dimOthers ? "opacity-55" : "opacity-100"
                  }`}
                >
                  <div
                    className={`md:col-span-7 flex justify-center ${reverse ? "md:order-2" : ""} ${
                      isFocus ? "relative z-20" : ""
                    }`}
                  >
                    <div
                      ref={(node) => {
                        if (node) galleryPhotoRefs.current.set(i, node);
                        else galleryPhotoRefs.current.delete(i);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={galleryPinned === i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryPinned((p) => (p === i ? null : i));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setGalleryPinned((p) => (p === i ? null : i));
                        }
                      }}
                      className={`relative max-w-md w-full cursor-pointer transition-transform duration-500 ease-out origin-center ${tilt} ${
                        isFocus ? "scale-[1.04]" : "scale-100"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-500 ${
                          isFocus ? "ring-2 ring-[#C9A84C]/55" : "ring-1 ring-white/10"
                        }`}
                      >
                        <img
                          src={m.src}
                          alt={m.title}
                          className={`w-full h-auto max-h-[min(85vh,720px)] object-contain transition-[filter] duration-500 ${
                            dimOthers ? "grayscale" : "grayscale-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`md:col-span-5 space-y-3 text-center md:text-left transition-opacity duration-500 ${
                      reverse ? "md:order-1" : ""
                    } ${dimOthers && !isFocus ? "opacity-50" : ""}`}
                  >
                    <p className="font-cinzel text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase">
                      {m.label} / 06
                    </p>
                    <h3 className="font-cormorant italic text-2xl sm:text-3xl text-white font-light leading-snug">
                      {m.title}
                    </h3>
                    <p className="font-futura text-sm text-white/45 font-light leading-relaxed tracking-wide max-w-sm mx-auto md:mx-0">
                      {m.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-pad pb-16 sm:pb-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase text-center md:text-left mb-8 pt-14 sm:pt-16">
            What we include
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {NOTES.map((item) => (
              <div key={item.n} className="text-center md:text-left space-y-2 border-t border-white/10 pt-6 md:border-0 md:pt-0">
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
          <ExperienceFormGoldBorder>
            <ContactForm
              defaultPreference="Beach Birthday — Reunion Ocean Café"
              whatsappNumber="919972231289"
              instagramHandle="@reunionteam19"
              dateOnly
            />
          </ExperienceFormGoldBorder>
        </div>
      </section>

      {seo?.faqs?.length ? (
        <div className="max-w-3xl mx-auto w-full px-5 md:px-10 pb-20">
          <ExpandablePageFaq faqs={seo.faqs} showTopBorder />
        </div>
      ) : null}

      <Footer />
    </div>
  );
}