import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import EventsGalleryCarousel from "@/components/events/EventsGalleryCarousel";

const CONST = (file: string) => `/properties/const/${file}`;

const GALLERY_SLIDES = [
  { image: CONST("p1.png"), title: "Residential Construction", caption: "" },
  { image: CONST("p2.png"), title: "Commercial Construction", caption: "" },
  { image: CONST("p3.png"), title: "Interior Design", caption: "" },
  { image: CONST("p4.png"), title: "Project Finishing", caption: "" },
] as const;

const WEBSITE = "https://nemmadiconstructions.com/";
const EMAIL = "arjunshetty@nemmadiconstructions.com";
const PHONE_DISPLAY = "+91 87921 66320";
const PHONE_TEL = "+918792166320";
const ADDRESS =
  "Karthik Estate, NH 66, Floor 2, Ambalpady, Udupi - 576103";

export default function CivilConstructionPage() {
  return (
    <div className="bg-[#060606] text-white antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <Navbar />

      <main>
        <section className="relative w-full h-[75vh] md:h-[min(88vh,820px)] flex items-end pb-14 md:pb-20">
          <div className="absolute inset-0">
            <img
              src={CONST("p1.png")}
              alt="Nemmadi Constructions"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-[#060606]/70" />
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10 text-center">
            <p className="font-futura text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-5">
              Civil & Construction
            </p>
            <h1 className="font-futura text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.14em] uppercase text-white leading-tight">
              Building Your<br />Dreams
            </h1>
            <div className="w-14 h-px bg-[#C9A84C]/50 mx-auto my-7" />
            <p className="font-futura text-sm md:text-base text-white/60 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Nemmadi Constructions — Ambalpady, Udupi
            </p>
          </div>
        </section>

        <section className="relative px-5 md:px-10 lg:px-12 pb-28 pt-10 max-w-[1200px] mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Civil & Construction" },
            ]}
          />

          <nav
            aria-label="Breadcrumb"
            className="mt-6 mb-14 flex flex-wrap items-center justify-center gap-2 font-futura text-[10px] tracking-[0.35em] text-white/40 uppercase"
          >
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C9A84C]">Civil & Construction</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-6">
            <img
              src={CONST("logo.png")}
              alt="Nemmadi Constructions"
              className="mx-auto h-16 md:h-20 w-auto object-contain"
            />
            <h2 className="font-futura text-2xl md:text-3xl text-white font-light uppercase tracking-[0.12em]">
              Nemmadi
              <br className="hidden sm:block" />
              <span className="sm:ml-2">Constructions</span>
            </h2>
            <p className="font-futura text-sm text-white/50 leading-[2] font-light tracking-wide">
              We are a passionate, skilled, and experienced team of civil engineers, architects, interior
              designers, contractors, and real estate experts in Ambalpady, Udupi. We take on turnkey
              projects — including materials and labour — so you can focus on what matters while we build
              your dream home. That approach shapes every project we deliver and every timeless space we
              help create, adding to Nemmadi&apos;s record of success.
            </p>
            <a
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-futura text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-all"
            >
              Visit nemmadiconstructions.com
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="mb-20 md:mb-28">
            <div className="text-center mb-10">
              <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase">
                Gallery
              </span>
            </div>
            <EventsGalleryCarousel
              slides={GALLERY_SLIDES}
              ariaLabel="Nemmadi Constructions project gallery"
            />
          </div>

          <div className="text-center pt-16 border-t border-white/10 space-y-8">
            <h2 className="font-futura text-xl md:text-2xl text-white font-light uppercase tracking-[0.2em]">
              Start Your Project
            </h2>
            <div className="space-y-6 font-futura max-w-md mx-auto">
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                  Website
                </p>
                <a
                  href={WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/70 text-sm tracking-wide hover:text-[#C9A84C] transition-colors"
                >
                  nemmadiconstructions.com
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                  Find Us Directly
                </p>
                <p className="text-white/70 text-sm tracking-wide leading-relaxed">{ADDRESS}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                  Email Us Directly
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="block text-white/70 text-sm tracking-wide hover:text-white transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                  Call Us Directly
                </p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="block text-[#C9A84C] text-lg tracking-wide hover:opacity-80 transition-opacity"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
