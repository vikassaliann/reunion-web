import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

const PAGE_TITLE = "REUNION | Blogs — Udupi Travel Guides";
const PAGE_DESCRIPTION =
  "Read REUNION travel guides — top beaches in Udupi, 2-day coastal itineraries (peak season October–March), and inspiration for your next stay.";

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
    <div className="bg-[#0a0908] text-white antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <Navbar />

      <main className="relative pt-24 sm:pt-28 md:pt-36 pb-20 sm:pb-28 overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <MandalaRing className="absolute -top-28 right-[-10%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px]" opacity={0.08} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.06),_transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto page-pad">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} />

          <header className="mt-8 sm:mt-10 mb-10 sm:mb-14 md:mb-16 text-center">
            <MandalaLotus className="w-10 h-10 mx-auto mb-5 opacity-60" />
            <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-3">
              Journal
            </p>
            <h1 className="font-futura text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase">
              Blogs
            </h1>
            <p className="mt-5 font-futura text-sm text-white/45 max-w-md mx-auto font-light leading-relaxed">
              Guides and itineraries for Udupi — curated for Reunion travellers.
            </p>
          </header>

          {/* Featured + secondary */}
          <div className="space-y-6 md:space-y-8">
            {featured && (
              <Link
                href={`/blogs/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 overflow-hidden hover:border-[#C9A84C]/30 transition-colors"
              >
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                  <img
                    src={featured.coverImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0908]/40 hidden lg:block" />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-[#100e0c]">
                  <span className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                    Featured · {featured.category}
                  </span>
                  <h2 className="mt-4 font-futura text-2xl md:text-3xl font-light uppercase tracking-[0.1em] leading-snug group-hover:text-[#C9A84C] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-white/45 text-sm font-futura font-light leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 font-futura text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase">
                    Read article →
                  </span>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group border border-white/10 overflow-hidden hover:border-[#C9A84C]/30 transition-colors bg-[#100e0c]"
                >
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-transparent to-transparent" />
                  </div>
                  <div className="p-7 -mt-8 relative">
                    <span className="font-futura text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase">
                      {post.category}
                    </span>
                    <h2 className="mt-3 font-futura text-xl font-light uppercase tracking-[0.1em] group-hover:text-[#C9A84C] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-white/40 text-xs font-futura font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-block font-futura text-[10px] tracking-[0.25em] text-white/35 uppercase">
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
