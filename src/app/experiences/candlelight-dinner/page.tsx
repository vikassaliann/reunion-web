"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";

const seo = getKeywordSeo("/experiences/candlelight-dinner");

const cd = (n: number) => `/properties/experiances/candlelight/cd${n}.jpeg`;

const MOMENTS = [
  {
    src: cd(1),
    label: "Setting 01",
    title: "Intimate Candlelight Canopy",
    body: "A handcrafted canopy draped in warm lights, surrounded by glowing candles and fresh florals on the beach.",
  },
  {
    src: cd(4),
    label: "Setting 02",
    title: "Private Shoreline Table",
    body: "Your table set where golden sand meets the tide — waves as the soundtrack to the evening.",
  },
  {
    src: cd(6),
    label: "Setting 03",
    title: "Sunset & Culinary Pairings",
    body: "Karavali coastal flavours, handcrafted mocktails, and desserts under evening stars.",
  },
  {
    src: cd(2),
    label: "Setting 04",
    title: "Proposal & Anniversary Setups",
    body: "Personalised décor for proposals, anniversaries, and quiet celebrations on Mattu Beach.",
  },
  {
    src: cd(5),
    label: "Setting 05",
    title: "Evening Ambience",
    body: "Fairy lights, lanterns, and candlelit glow along the shore.",
  },
  {
    src: cd(7),
    label: "Setting 06",
    title: "Coastal Dining",
    body: "Multi-course coastal menus served with attentive hosting.",
  },
  {
    src: cd(8),
    label: "Setting 07",
    title: "Starlit Evenings",
    body: "Dine under the stars with the Arabian Sea at your side.",
  },
];

const NOTES = [
  { n: "01", t: "Private Setup", d: "Secluded spot on Mattu Beach, Udupi" },
  { n: "02", t: "Custom Menu", d: "Multi-course meals & fresh coastal catches" },
  { n: "03", t: "Ambient Lighting", d: "Fairy lights, lanterns & candlelit glow" },
  { n: "04", t: "Personal Service", d: "Attentive hosting throughout dinner" },
];

const FAQS = [
  {
    q: "Where can I book a candle light dinner in Udupi?",
    a: "Book with REUNION — private beachside candlelight dinners on Mattu Beach with canopy setups, coastal cuisine, and personal hosting.",
  },
  {
    q: "What makes REUNION the candlelight dinner in Udupi to choose?",
    a: "A fully private shoreline experience: fairy lights, candles, custom menus, and sunset-to-starlight ambiance for proposals, anniversaries, and celebrations.",
  },
  {
    q: "Is this candle light dinner on the beach?",
    a: "Yes. Your candle light dinner in Udupi is hosted on Mattu Beach by the Arabian Sea.",
  },
  {
    q: "How do I reserve?",
    a: "Use the form below or WhatsApp us with your date, guest count, and occasion — we’ll confirm setup, menu, and timing.",
  },
];

export default function CandlelightDinnerPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToBook = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen overflow-x-hidden">
      <KeywordFaqJsonLd seo={seo} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[88svh] sm:min-h-screen flex items-end overflow-hidden">
        <img
          src="/properties/experiances/candlelight/cd3.jpeg"
          alt="Candle light dinner in Udupi — REUNION private beachside setup"
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
              { label: "Candle Light Dinner in Udupi" },
            ]}
          />
          <MandalaLotus className="w-9 h-9 mt-8 mb-5 opacity-55" />
          <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-4">
            Candle Light Dinner in Udupi · REUNION
          </p>
          <h1 className="font-cormorant italic text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.08] max-w-3xl">
            Private Candle Light Dinner on Mattu Beach, Udupi
          </h1>
          <p className="mt-5 max-w-lg font-futura text-sm text-white/55 font-light leading-relaxed tracking-wide">
            Plan a private candle light dinner in Udupi, right on the sand at Mattu Beach — a romantic setup for proposals, anniversaries and special nights.
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

      {/* INTRO + REEL */}
      <section className="relative page-pad section-y overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute -left-28 top-10 w-[300px] h-[300px]"
          opacity={0.06}
        />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase">
              Candle Light Dinner in Udupi
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light leading-snug">
              The candlelight dinner in Udupi on Mattu Beach
            </h2>
            <p className="font-futura text-sm text-white/50 font-light leading-[1.9] tracking-wide max-w-md mx-auto lg:mx-0">
              REUNION hosts private beachside candlelight dinners with canopy setups, coastal cuisine, and personal service by the Arabian Sea — ideal for proposals, anniversaries, and celebrations.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] overflow-hidden">
              <video
                src="/properties/experiances/exp16vid.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MOMENTS — no cards/boxes */}
      <section className="relative page-pad pb-16 sm:pb-24 overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute right-[-12%] bottom-0 w-[340px] h-[340px]"
          opacity={0.05}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              Beachside Ambience
            </p>
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light">
              The curated experience
            </h2>
          </div>

          <div className="space-y-14 sm:space-y-20">
            {MOMENTS.map((m, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={m.title}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                  <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={m.src} alt={m.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div
                    className={`md:col-span-5 space-y-3 text-center md:text-left ${
                      reverse ? "md:order-1" : ""
                    }`}
                  >
                    <p className="font-cinzel text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase">
                      {m.label}
                    </p>
                    <h3 className="font-cormorant italic text-2xl sm:text-3xl text-white font-light leading-snug">
                      {m.title}
                    </h3>
                    <p className="font-futura text-sm text-white/45 font-light leading-relaxed tracking-wide max-w-sm mx-auto md:mx-0">
                      {m.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOTES — open typography, no boxes */}
      <section className="page-pad pb-16 sm:pb-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pt-14 sm:pt-16">
          {NOTES.map((item) => (
            <div key={item.n} className="text-center md:text-left space-y-2">
              <span className="font-cormorant italic text-2xl text-[#C9A84C]">{item.n}</span>
              <h4 className="font-cinzel text-[10px] tracking-[0.25em] text-white uppercase">
                {item.t}
              </h4>
              <p className="font-futura text-[11px] text-white/40 font-light leading-relaxed">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — head-term coverage for SERP */}
      <section className="page-pad pb-16 sm:pb-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto pt-14 sm:pt-16">
          <p className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase text-center mb-3">
            FAQ
          </p>
          <h2 className="font-cormorant italic text-3xl sm:text-4xl text-white font-light text-center mb-10">
            Candle light dinner in Udupi — questions
          </h2>
          <div className="space-y-8">
            {FAQS.map((item) => (
              <div key={item.q} className="border-b border-white/10 pb-6">
                <h3 className="font-cinzel text-[11px] tracking-[0.15em] text-[#C9A84C] uppercase mb-2">
                  {item.q}
                </h3>
                <p className="font-futura text-sm text-white/50 font-light leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK — Ocean Café enquiry form */}
      <section
        ref={formRef}
        id="book-candlelight"
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
              Book your candle light dinner in Udupi
            </h2>
            <p className="font-futura text-xs text-white/40 font-light tracking-wide max-w-sm mx-auto">
              Tell us your date and occasion — we&apos;ll confirm your private candlelight dinner in Udupi.
            </p>
          </div>
          <ContactForm
            defaultPreference="Candlelight Dinner — Reunion Ocean Café"
            whatsappNumber="919972231289"
            instagramHandle="@reunionteam19"
          />
        </div>
      </section>

      {seo ? (
        <div className="max-w-3xl mx-auto px-5 md:px-10 pb-20">
          <KeywordSeoSections seo={seo} />
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
