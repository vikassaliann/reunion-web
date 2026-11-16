import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import EventsGalleryCarousel from "@/components/events/EventsGalleryCarousel";
import type { Metadata } from "next";
import ExpandablePageFaq from "@/components/ExpandablePageFaq";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import { SHOW_KEYWORD_GUIDE_SECTIONS } from "@/data/siteFlags";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";
import {
  REUNION_CONTACT_EMAIL,
  REUNION_PHONE_DISPLAY,
  REUNION_PHONE_TEL,
} from "@/data/factCheck";

const BASE_URL = "https://www.reunionglobal.in";
const PHONE_DISPLAY = REUNION_PHONE_DISPLAY;
const PHONE_TEL = REUNION_PHONE_TEL.replace(/-/g, "");
const EMAIL = REUNION_CONTACT_EMAIL;

const eventVenueSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "REUNION Coastal Events — Udupi",
  description:
    "Beach weddings, receptions and private celebrations on the Udupi coast with Gutthu Weddings Planner and REUNION guest stays.",
  url: `${BASE_URL}/events`,
  telephone: REUNION_PHONE_TEL,
  email: REUNION_CONTACT_EMAIL,
  maximumAttendeeCapacity: 150,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Udupi",
    addressRegion: "Karnataka",
    postalCode: "576101",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.34,
    longitude: 74.74,
  },
};

const wd = (n: number) => `/properties/wedneve/wd${n}.png`;

/** Gallery order: 4, 2, 3, 1, 5 */
const GALLERY_SLIDES = [
  {
    image: wd(4),
    title: "Weddings",
    caption: "Gutthu Weddings Planner — ceremonies styled for lasting memories",
  },
  {
    image: wd(2),
    title: "Celebrations",
    caption: "Private celebrations curated with care and coastal elegance",
  },
  {
    image: wd(3),
    title: "Events",
    caption: "Events management for gatherings that feel seamless and personal",
  },
  {
    image: wd(1),
    title: "Planning",
    caption: "From concept to day-of coordination with Gutthu",
  },
  {
    image: wd(5),
    title: "Moments",
    caption: "Every detail arranged so your moments stay unforgettable",
  },
] as const;

const seo = getKeywordSeo("/events");
const PAGE_TITLE = seo?.title ?? "Beach Weddings & Wedding Venues in Udupi | REUNION";
const PAGE_DESCRIPTION =
  seo?.description ??
  "Plan a beach wedding, reception or private event in Udupi with REUNION — beach venue, guest stays and Gutthu Weddings coordination.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/events` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/events`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Events & Weddings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function EventsPage() {
  return (
    <div className="bg-[#060606] text-white antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <KeywordFaqJsonLd seo={seo} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventVenueSchema) }}
      />
      <Navbar />

      <main>
        <section className="relative w-full h-[75vh] md:h-[min(88vh,820px)] flex items-end pb-14 md:pb-20">
          <div className="absolute inset-0">
            <img
              src={wd(4)}
              alt={seo?.imageAlt ?? "Gutthu Weddings Planner and Events Management"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-[#060606]/70" />
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10 text-center">
            <p className="font-futura text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-5">
              Events & Weddings
            </p>
            <h1 className="font-futura text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.12em] uppercase text-white leading-tight max-w-4xl mx-auto">
              {seo?.h1 ?? "Beach Weddings & Events in Udupi"}
            </h1>
            <div className="w-14 h-px bg-[#C9A84C]/50 mx-auto my-7" />
            <p className="font-futura text-sm md:text-base text-white/60 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              {seo?.lead ??
                "Looking for wedding venues in Udupi? REUNION hosts beach weddings, receptions and private events on the coast, with stays nearby for your guests — planned with Gutthu Weddings Planner and Events Management."}
            </p>
          </div>
        </section>

        <section className="relative px-5 md:px-10 lg:px-12 pb-28 pt-10 max-w-[1200px] mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Events & Weddings" },
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
            <span className="text-[#C9A84C]">Events & Weddings</span>
          </nav>

          <div
            id="private-beach-venue"
            className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-5 scroll-mt-28"
          >
            <h2 className="font-futura text-[11px] tracking-[0.35em] text-[#C9A84C] uppercase">
              Plan Your Event
            </h2>
            <p className="font-futura text-sm text-white/50 font-light tracking-wide">
              Beach weddings and private celebrations on the coast — book a{" "}
              <Link href="/events#private-beach-venue" className="text-[#C9A84C] hover:underline">
                private beach venue in Udupi
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-[#C9A84C] hover:underline">
                enquire with REUNION
              </Link>
              .
            </p>
            <h2 className="font-futura text-2xl md:text-3xl text-white font-light uppercase tracking-[0.12em]">
              Gutthu Weddings Planner
              <br className="hidden sm:block" />
              <span className="sm:ml-2">and Events Management</span>
            </h2>
            <p className="font-futura text-sm text-white/50 leading-[2] font-light tracking-wide">
              Gutthu Weddings Planner and Events Management — partnered with Reunion for
              beach weddings, haldi and mehendi on the sand, reception dinners, and private corporate
              gatherings along Coastal Karnataka. Guest rooms and villas nearby keep families together
              from rehearsal to farewell.
            </p>
          </div>

          <div className="mb-20 md:mb-28">
            <div className="text-center mb-10">
              <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase">
                Gallery
              </span>
            </div>
            <EventsGalleryCarousel slides={GALLERY_SLIDES} />
          </div>

          <div className="text-center pt-16 border-t border-white/10 space-y-6">
            <h2 className="font-futura text-xl md:text-2xl text-white font-light uppercase tracking-[0.2em]">
              Plan With Us
            </h2>
            <div className="space-y-3 font-futura">
              <a
                href={`tel:${PHONE_TEL}`}
                className="block text-[#C9A84C] text-lg tracking-wide hover:opacity-80 transition-opacity"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="block text-white/55 text-sm tracking-wide hover:text-white transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {seo && (SHOW_KEYWORD_GUIDE_SECTIONS || seo.faqs?.length) ? (
            <div className="max-w-3xl mx-auto w-full mt-14 md:mt-16 space-y-12 md:space-y-14">
              {SHOW_KEYWORD_GUIDE_SECTIONS ? (
                <KeywordSeoSections
                  seo={seo}
                  hideFaqs
                  hideLinks
                  introTitle="Beach weddings & events on the Udupi coast"
                />
              ) : null}
              {seo.faqs?.length ? <ExpandablePageFaq faqs={seo.faqs} /> : null}
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
