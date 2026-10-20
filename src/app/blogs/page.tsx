import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";
import type { Metadata } from "next";
import { getKeywordSeo } from "@/data/keywordGuide";

const BASE_URL = "https://www.reunionglobal.in";
const blogsSeo = getKeywordSeo("/blogs");

const PAGE_TITLE = blogsSeo?.title ?? "Udupi Travel Guides & Local Tips | REUNION Blog";
const PAGE_DESCRIPTION =
  blogsSeo?.description ??
  "Local guides to Udupi — the best beaches, tourist places, a 2-day itinerary and when to visit, written by the REUNION team in Udupi.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/blogs` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/blogs`,
    siteName: "REUNION",
    type: "website",
    images: [{ url: "/logoo.png", width: 1080, height: 1080, alt: "REUNION Blogs — Udupi Travel Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/logoo.png"],
  },
};

export default function BlogsPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="bg-[#080808] text-white antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <Navbar />

      <main>
        {/* Hero — brand + one story */}
        <section className="relative min-h-[70vh] md:min-h-[78vh] flex flex-col justify-end overflow-hidden">
          {featured && (
            <>
              <img
                src={featured.coverImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
            </>
          )}

          <div className="relative z-10 w-full max-w-7xl mx-auto page-pad pt-28 pb-12 md:pb-16">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} />

            <p className="mt-8 font-cinzel text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase">
              Reunion Journal
            </p>
            <h1 className="mt-4 font-futura text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.18em] uppercase leading-[1.05]">
              {blogsSeo?.h1 ?? "Udupi Travel Guides"}
            </h1>
            <p className="mt-5 max-w-md font-futura text-sm sm:text-base text-white/70 font-light leading-relaxed">
              {blogsSeo?.lead ??
                "Coastal guides for Udupi — beaches, routes, and days worth staying for."}
            </p>

            {featured && (
              <Link
                href={`/blogs/${featured.slug}`}
                className="group mt-10 md:mt-14 block max-w-xl border-t border-[#C9A84C]/35 pt-6"
              >
                <span className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                  Latest · {featured.category}
                </span>
                <h2 className="mt-3 font-futura text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-[0.08em] leading-snug group-hover:text-[#C9A84C] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 font-futura text-sm text-white/50 font-light leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase">
                  Read guide
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            )}
          </div>
        </section>

        {/* Index — numbered editorial list */}
        <section className="relative border-t border-white/10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto page-pad py-16 md:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
              <div>
                <p className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase">
                  All guides
                </p>
                <h2 className="mt-2 font-futura text-2xl md:text-3xl font-light uppercase tracking-[0.14em]">
                  From the journal
                </h2>
              </div>
              <p className="font-futura text-xs text-white/35 tracking-wide max-w-xs sm:text-right">
                {BLOG_POSTS.length} guides for travellers staying with Reunion.
              </p>
            </div>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {BLOG_POSTS.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_auto] gap-x-5 md:gap-x-10 gap-y-3 items-start md:items-center py-8 md:py-10 hover:bg-white/[0.02] transition-colors -mx-2 px-2 md:mx-0 md:px-0"
                  >
                    <span className="font-futura text-2xl md:text-3xl text-[#C9A84C]/50 font-light tracking-wider group-hover:text-[#C9A84C] transition-colors leading-none pt-1 md:pt-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <span className="font-futura text-[10px] tracking-[0.3em] text-white/35 uppercase">
                        {post.category}
                        {post.author ? ` · ${post.author}` : ""}
                        {post.date ? ` · ${post.date}` : ""}
                      </span>
                      <h3 className="mt-2 font-futura text-lg sm:text-xl md:text-2xl font-light uppercase tracking-[0.08em] leading-snug group-hover:text-[#C9A84C] transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 font-futura text-sm text-white/40 font-light leading-relaxed max-w-xl line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <span className="col-span-2 md:col-span-1 md:justify-self-end font-futura text-[10px] tracking-[0.28em] uppercase text-white/40 group-hover:text-[#C9A84C] transition-colors flex items-center gap-2 pt-1 md:pt-0">
                      Open
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 md:mt-20 flex flex-col sm:flex-row gap-3">
              <Link
                href="/properties"
                className="inline-flex justify-center px-8 py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
              >
                Explore Stays
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center px-8 py-3.5 border border-white/20 text-white/70 font-futura text-[10px] tracking-[0.3em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Plan a Stay
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
