"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";

const BDY = (file: string) => `/properties/experiances/candlelight/bdy/${file}`;

const SETUPS = [
  {
    src: BDY("bd1.jpeg"),
    label: "Setup 01",
    title: "Beach Birthday Bash",
    body: "A private beachside birthday party with fairy lights, floral décor, music, and curated coastal dining under the stars.",
  },
  {
    src: BDY("bd3.jpeg"),
    label: "Setup 02",
    title: "Villa Celebrations",
    body: "Celebrate in any of our private villas with themed décor, cake arrangements, and personalised party hosting.",
  },
  {
    src: BDY("bd4.jpeg"),
    label: "Setup 03",
    title: "Surprise Setups",
    body: "We design surprise birthday experiences — midnight setups, candle paths, and personalised touches to make it unforgettable.",
  },
];

const INCLUDES = [
  { n: "01", t: "Custom Décor", d: "Balloons, fairy lights, florals & theme setup" },
  { n: "02", t: "Cake & Treats", d: "Birthday cake arrangement & special desserts" },
  { n: "03", t: "Private Venue", d: "Beachfront, villa lawn, or poolside setup" },
  { n: "04", t: "Music & Vibes", d: "Speaker setup, ambient lighting & more" },
];

const FAQS = [
  {
    q: "Where can I celebrate a birthday in Udupi?",
    a: "REUNION offers private birthday celebrations on Mattu Beach, in our luxury villas, or at Reunion Ocean Café — fully customisable with décor, cake, and catering.",
  },
  {
    q: "Can you arrange surprise birthday setups?",
    a: "Absolutely! We specialise in surprise birthday setups — midnight reveals, candle paths, personalised notes, and themed décor. Share your idea and we'll bring it to life.",
  },
  {
    q: "What's included in the birthday package?",
    a: "Our birthday packages include venue setup, custom décor (balloons, flowers, fairy lights), cake arrangement, and optional catering. Everything is customisable.",
  },
  {
    q: "How do I book?",
    a: "Use the form below or WhatsApp us with your date, guest count, and occasion — we'll plan and confirm every detail.",
  },
];

export default function BirthdayPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToBook = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[88svh] sm:min-h-screen flex items-end overflow-hidden">
        <img
          src={BDY("bd.jpeg")}
          alt="Birthday celebrations in Udupi — REUNION private party setup"
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
          <p className="font-futura text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-4">
            Birthday Celebrations · REUNION
          </p>
          <h1 className="font-futura text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.08] max-w-3xl uppercase tracking-widest">
            Birthday Celebration in Udupi
            <span className="block text-[#C9A84C] text-[0.4em] tracking-[0.12em] mt-3 font-futura uppercase">
              Private beach & villa parties in Udupi
            </span>
          </h1>
          <p className="mt-5 max-w-lg font-futura text-sm text-white/55 font-light leading-relaxed tracking-wide">
            Celebrate your special day with REUNION — private beachside setups, villa parties, surprise midnight celebrations, and curated dining for unforgettable birthdays.
          </p>
          <button
            type="button"
            onClick={scrollToBook}
            className="mt-8 inline-flex px-8 py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="relative page-pad section-y overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute -left-28 top-10 w-[300px] h-[300px]"
          opacity={0.06}
        />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <p className="font-futura text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase">
              The Experience
            </p>
            <h2 className="font-futura text-2xl sm:text-3xl md:text-4xl text-white font-light uppercase tracking-widest leading-[1.2]">
              Your Birthday,<br />
              <span className="text-[#C9A84C]">Our Canvas</span>
            </h2>
            <p className="font-futura text-sm text-white/55 font-light leading-relaxed tracking-wide max-w-md mx-auto lg:mx-0">
              Whether it&apos;s an intimate beach dinner, a surprise midnight setup, or a grand villa celebration — REUNION crafts every detail to make your birthday extraordinary.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={BDY("bd5.jpeg")}
                alt="REUNION birthday party setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SETUPS */}
      <section className="relative page-pad section-y bg-[#0c0a08] overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute right-[-14%] top-4 w-[320px] h-[320px]"
          opacity={0.07}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <MandalaLotus className="w-8 h-8 mx-auto mb-4 opacity-45" />
            <p className="font-futura text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              Celebration Styles
            </p>
            <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-widest">
              Party Setups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SETUPS.map((m) => (
              <div key={m.label} className="group">
                <div className="aspect-[3/4] overflow-hidden mb-5">
                  <img
                    src={m.src}
                    alt={m.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="font-futura text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase mb-2">
                  {m.label}
                </p>
                <h3 className="font-futura text-lg text-white font-light uppercase tracking-widest mb-2">
                  {m.title}
                </h3>
                <p className="font-futura text-xs text-white/45 font-light leading-relaxed tracking-wide">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="relative page-pad section-y overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-futura text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              What&apos;s Included
            </p>
            <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-widest">
              The Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INCLUDES.map((n) => (
              <div
                key={n.n}
                className="border border-white/8 bg-white/[0.02] px-7 py-6 hover:border-[#C9A84C]/30 transition-colors"
              >
                <span className="font-futura text-[#C9A84C] text-[10px] tracking-[0.3em]">
                  {n.n}
                </span>
                <h3 className="font-futura text-base text-white font-light uppercase tracking-widest mt-3 mb-2">
                  {n.t}
                </h3>
                <p className="font-futura text-xs text-white/45 font-light tracking-wide leading-relaxed">
                  {n.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="page-pad section-y-tight bg-[#0c0a08]">
        <div className="max-w-3xl mx-auto">
          <p className="font-futura text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase text-center mb-8">
            Frequently Asked Questions
          </p>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-white/8 pb-5">
                <h3 className="font-futura text-sm text-white tracking-wide uppercase mb-2">
                  {faq.q}
                </h3>
                <p className="font-futura text-xs text-white/50 font-light leading-relaxed tracking-wide">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section ref={formRef} className="page-pad section-y">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <MandalaLotus className="w-8 h-8 mx-auto mb-4 opacity-45" />
            <p className="font-futura text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              Reserve
            </p>
            <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-widest">
              Plan Your Birthday
            </h2>
          </div>
          <div className="border border-[#C9A84C]/20 bg-[#100e0c] p-7 sm:p-10">
            <ContactForm
              defaultPreference="Birthday Celebration"
              whatsappNumber="919980208289"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
