import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";
const PHONE_TEL = "+919980208289";

const seo = getKeywordSeo("/events/beach-venue");
const PAGE_TITLE = seo?.title ?? "Beach Venue in Udupi for Weddings & Events | REUNION";
const PAGE_DESCRIPTION =
  seo?.description ??
  "Book a private beach venue in Udupi for weddings, birthdays and celebrations — capacity, setups and photos. Enquire with REUNION.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/events/beach-venue` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/events/beach-venue`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/properties/wedneve/wd4.png", width: 1200, height: 630 }],
  },
};

export default function BeachVenuePage() {
  return (
    <div className="bg-[#060606] text-white min-h-screen">
      <KeywordFaqJsonLd seo={seo} />
      <Navbar />
      <main>
        <section className="relative w-full min-h-[70vh] flex items-end pb-14">
          <div className="absolute inset-0">
            <img
              src="/properties/wedneve/wd2.png"
              alt={seo?.imageAlt ?? "Private beach venue setup in Udupi"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/55 to-[#060606]/80" />
          </div>
          <div className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-10 text-center">
            <h1 className="font-futura text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.12em] uppercase">
              Beach Venue in Udupi
            </h1>
            <p className="mt-6 font-futura text-sm md:text-base text-white/65 leading-relaxed font-light tracking-wide">
              REUNION&apos;s beach venue in Udupi is a private space by the sea for weddings, birthdays, receptions and
              corporate events — with Ocean Café, guest villas and Gutthu Weddings coordination nearby.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-5 md:px-10 py-16 space-y-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: "Beach Venue" }]} />

          <div className="space-y-4">
            <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase">Venue setups</h2>
            <p className="font-futura text-sm text-white/60 leading-relaxed font-light">
              Mandap and aisle setups on the sand, haldi and mehendi lawns, reception dining by the shore, and intimate
              birthday or proposal layouts — styled with Gutthu Weddings Planner and REUNION&apos;s coastal team. Typical
              layouts range from about 50 guests for intimate ceremonies to roughly 200 for larger receptions, depending on season and setup.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase">Events we host</h2>
            <p className="font-futura text-sm text-white/60 leading-relaxed font-light">
              Beach weddings and receptions, private parties, corporate offsites, and{" "}
              <Link href="/experiences/beach-birthday" className="text-[#C9A84C] hover:underline">
                beach birthday celebrations
              </Link>
              . Non-staying guests are welcome when booked in advance.
            </p>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-10">
            <h2 className="font-futura text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase">Enquire</h2>
            <p className="font-futura text-sm text-white/60 leading-relaxed font-light">
              Share your date, guest count and event type — we will confirm capacity, catering options and nearby{" "}
              <Link href="/properties/category/beach-villas" className="text-[#C9A84C] hover:underline">
                beach villas for wedding guests
              </Link>
              .{" "}
              <Link href="/dining" className="text-[#C9A84C] hover:underline">
                Ocean Café
              </Link>{" "}
              on Mattu Beach handles many celebration dinners.
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block mt-4 font-futura text-[#C9A84C] text-sm tracking-wide hover:opacity-80"
            >
              Call +91 99802 08289
            </a>
            <div className="pt-4">
              <Link
                href="/events"
                className="font-futura text-[11px] tracking-[0.25em] text-white/50 uppercase hover:text-[#C9A84C]"
              >
                ← Beach weddings & events
              </Link>
            </div>
          </div>

          {seo ? (
            <div className="max-w-3xl mx-auto pt-12 border-t border-white/10">
              <KeywordSeoSections
                seo={seo}
                skipHeadings={["Venue setups", "Events we host", "Enquire"]}
              />
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
