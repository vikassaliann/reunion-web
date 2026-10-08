import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  MandalaRing,
  MandalaLotus,
  MandalaCorner,
} from "@/components/wellness/WellnessMandala";

const BASE_URL = "https://www.reunionglobal.in";

const PAGE_TITLE = "REUNION | Wellness — Rest & Reset by the Coast";
const PAGE_DESCRIPTION =
  "Holistic wellness at every REUNION stay — Ayurveda, beach yoga, spa, meditation, naturopathy, and salon services in partnership with Tapovana Life, Manipal.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/wellness` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/wellness`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Wellness — Tapovana x Reunion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

const WELLNESS_SERVICES = [
  {
    title: "Ayurvedic Treatments",
    desc: "Panchakarma detox, Abhyanga massage, Shirodhara, and authentic Ayurveda rituals delivered at your villa by Tapovana practitioners.",
  },
  {
    title: "Beach Yoga",
    desc: "Sunrise sessions on the shore — Hatha, Vinyasa, and Ashtanga with certified guides, waves and open sky as your studio.",
  },
  {
    title: "Holistic Spa",
    desc: "Aromatherapy, hot stone, deep tissue, herbal scrubs, and facials — each session tailored to restore body, mind, and spirit.",
  },
  {
    title: "Meditation & Breathwork",
    desc: "Guided meditation and Pranayama in stillness — breath as anchor, silence as sanctuary.",
  },
  {
    title: "Naturopathy",
    desc: "Hydrotherapy, diet counselling, herbal therapy, and lifestyle guidance rooted in natural healing traditions.",
  },
  {
    title: "Salon & Beauty",
    desc: "Hair treatments, keratin, bridal makeup, manicure, pedicure, and skincare — arranged on request during your stay.",
  },
];

const BOOKING_STEPS = [
  {
    step: "01",
    title: "Choose Your Stay",
    desc: "Pick any Reunion villa or city residence — wellness travels with you across our portfolio.",
  },
  {
    step: "02",
    title: "Share Your Intent",
    desc: "Tell us your preferred therapies, timing, and group size when you enquire or after you arrive.",
  },
  {
    step: "03",
    title: "Tapovana Delivers",
    desc: "Expert practitioners from Tapovana Life arrive at your property for private, in-villa sessions.",
  },
];

const TEAL = "#2a4a52";
const TEAL_DEEP = "#1e383e";

export default function WellnessPage() {
  return (
    <div
      className="text-white antialiased selection:bg-[#c9b57a] selection:text-[#1e383e]"
      style={{ backgroundColor: TEAL_DEEP }}
    >
      <Navbar />

      <main className="relative min-h-screen overflow-hidden">
        {/* Ambient mandala field — no photography */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <MandalaRing
            className="absolute -top-32 -right-32 w-[min(90vw,520px)] h-[min(90vw,520px)] animate-[spin_120s_linear_infinite]"
            opacity={0.14}
          />
          <MandalaRing
            className="absolute top-[40%] -left-48 w-[420px] h-[420px] animate-[spin_180s_linear_infinite_reverse]"
            opacity={0.08}
          />
          <MandalaRing
            className="absolute bottom-0 right-[10%] w-[360px] h-[360px]"
            opacity={0.06}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${TEAL} 0%, ${TEAL_DEEP} 55%, #152a2f 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,181,122,0.06),transparent_45%)]" />
        </div>

        <section className="relative z-10 pt-32 md:pt-36 pb-28 md:pb-36 px-5 md:px-10 lg:px-12 max-w-[1200px] mx-auto">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Wellness & Spa" }]}
          />

          <nav
            aria-label="Breadcrumb"
            className="mt-6 mb-12 flex flex-wrap items-center justify-center gap-2 font-futura text-[10px] tracking-[0.35em] text-white/40 uppercase"
          >
            <Link href="/" className="hover:text-[#c9b57a] transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#c9b57a]">Wellness & Spa</span>
          </nav>

          {/* Hero — Tapovana logo + mandala */}
          <header className="relative text-center mb-24 md:mb-32">
            <MandalaRing
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-[min(100vw,480px)] h-[min(100vw,480px)] -z-10"
              opacity={0.22}
            />
            <div className="relative mx-auto w-full max-w-md md:max-w-lg mb-10">
              <Image
                src="/wellness/tapovana-logo.jpg"
                alt="Tapovana — Nurturing Heritage, Enriching Wellness"
                width={1024}
                height={1024}
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 768px) 88vw, 520px"
                className="w-full h-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
              />
            </div>
            <p className="font-futura text-[10px] tracking-[0.5em] text-[#c9b57a] uppercase mb-4">
              In collaboration with Reunion
            </p>
            <h1 className="font-futura text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.28em] uppercase text-white/95 mb-6">
              Wellness & Spa
            </h1>
            <MandalaLotus className="w-14 h-14 mx-auto mb-8 opacity-80" />
            <p className="font-futura text-sm md:text-[15px] text-white/50 leading-[2.1] tracking-wide font-light max-w-xl mx-auto">
              A calm continuum of Ayurveda, yoga, spa, and holistic care — brought to your
              Reunion stay through Tapovana Life, Manipal.
            </p>
          </header>

          {/* Partnership narrative */}
          <div
            className="relative mb-24 md:mb-32 p-10 md:p-14 border border-[#c9b57a]/20 rounded-sm overflow-hidden"
            style={{ backgroundColor: "rgba(42, 74, 82, 0.45)" }}
          >
            <MandalaCorner className="absolute top-0 left-0 w-16 h-16" />
            <MandalaCorner className="absolute top-0 right-0 w-16 h-16 scale-x-[-1]" />
            <MandalaCorner className="absolute bottom-0 left-0 w-16 h-16 scale-y-[-1]" />
            <MandalaCorner className="absolute bottom-0 right-0 w-16 h-16 scale-[-1]" />

            <div className="relative max-w-2xl mx-auto text-center space-y-6">
              <span className="font-futura text-[10px] tracking-[0.4em] text-[#c9b57a] uppercase block">
                Heritage & Healing
              </span>
              <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-[0.18em]">
                Tapovana × Reunion
              </h2>
              <p className="text-white/45 text-sm leading-[2] font-futura font-light tracking-wide">
                Tapovana nurtures heritage and enriches wellness through authentic Ayurveda,
                yoga, spa, salon, and naturopathy. Reunion extends that sanctuary to every
                property — private sessions in-villa or by the sea, on your schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="https://tapovanalife.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-futura text-[10px] tracking-[0.3em] text-[#1e383e] bg-[#c9b57a] px-9 py-3.5 uppercase hover:bg-[#dcc990] transition-colors"
                >
                  Visit Tapovana
                </Link>
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center font-futura text-[10px] tracking-[0.3em] text-[#c9b57a] border border-[#c9b57a]/40 px-9 py-3.5 uppercase hover:bg-[#c9b57a]/10 transition-colors"
                >
                  Explore Stays
                </Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-24 md:mb-32">
            <div className="text-center mb-14">
              <MandalaLotus className="w-10 h-10 mx-auto mb-5 opacity-70" />
              <span className="font-futura text-[10px] tracking-[0.4em] text-[#c9b57a] uppercase block mb-3">
                Offerings
              </span>
              <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-[0.14em]">
                Pathways to Balance
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {WELLNESS_SERVICES.map((service, i) => (
                <article
                  key={service.title}
                  className="relative group p-8 md:p-9 border border-white/[0.08] hover:border-[#c9b57a]/30 transition-all duration-500 overflow-hidden"
                  style={{ backgroundColor: "rgba(30, 56, 62, 0.5)" }}
                >
                  <MandalaRing
                    className="absolute -right-8 -bottom-8 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    opacity={0.15}
                  />
                  <span className="relative font-futura text-[11px] tracking-[0.35em] text-[#c9b57a]/90 block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative font-futura text-sm text-white uppercase tracking-[0.16em] mb-3 group-hover:text-[#c9b57a] transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-white/40 text-xs leading-[1.95] font-futura font-light tracking-wide">
                    {service.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Flow */}
          <div
            className="relative mb-24 md:mb-32 py-16 md:py-20 px-6 border-y border-[#c9b57a]/15"
            style={{ backgroundColor: "rgba(42, 74, 82, 0.25)" }}
          >
            <MandalaRing
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
              opacity={0.1}
            />
            <div className="relative text-center mb-14">
              <span className="font-futura text-[10px] tracking-[0.4em] text-[#c9b57a] uppercase block mb-3">
                How It Works
              </span>
              <h2 className="font-futura text-2xl sm:text-3xl text-white font-light uppercase tracking-[0.12em]">
                Wellness On Request
              </h2>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
              {BOOKING_STEPS.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                    <MandalaRing className="absolute inset-0 w-full h-full" opacity={0.35} />
                    <span className="relative font-futura text-xs text-[#c9b57a] tracking-widest">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-futura text-xs text-white uppercase tracking-[0.2em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed font-futura font-light max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
