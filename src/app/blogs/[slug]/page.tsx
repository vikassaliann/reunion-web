import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogBySlug } from "@/data/blogs";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";
import KeywordSeoSections from "@/components/KeywordSeoSections";
import KeywordFaqJsonLd from "@/components/KeywordFaqJsonLd";
import { getKeywordSeo } from "@/data/keywordGuide";
import type { Metadata } from "next";

const BASE_URL = "https://www.reunionglobal.in";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog Not Found" };

  const keywordSeo = getKeywordSeo(`/blogs/${slug}`);
  const pageTitle = keywordSeo?.title ?? post.metaTitle ?? `REUNION | ${post.title}`;
  const pageDescription = keywordSeo?.description ?? post.excerpt;
  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: `${BASE_URL}/blogs/${post.slug}` },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${BASE_URL}/blogs/${post.slug}`,
      siteName: "REUNION",
      type: "article",
      images: [{ url: `${BASE_URL}${post.coverImage}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${BASE_URL}${post.coverImage}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const seo = getKeywordSeo(`/blogs/${slug}`);
  const others = BLOG_POSTS.filter((b) => b.slug !== post.slug);
  const isBeachesGuide = post.slug === "top-10-beaches-to-visit-in-udupi";

  return (
    <div className="bg-[#0a0908] text-white antialiased selection:bg-[#C9A84C] selection:text-black min-h-screen">
      <KeywordFaqJsonLd seo={seo} />
      <Navbar />

      <main>
        <section className="relative h-[42vh] md:h-[50vh] min-h-[280px] flex items-end">
          <img
            src={post.coverImage}
            alt={seo?.imageAlt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/50 to-black/30" />
          <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-10 pb-10">
            <p className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
              {post.category}
              {post.author ? ` · ${post.author}` : ""}
              {post.date ? ` · ${post.date}` : ""}
            </p>
            <h1 className="font-futura text-3xl sm:text-4xl md:text-[2.75rem] font-light tracking-[0.08em] uppercase leading-tight max-w-3xl">
              {seo?.h1 ?? post.title}
            </h1>
          </div>
        </section>

        <div className="relative px-5 md:px-10 pb-28 pt-8">
          <MandalaRing
            className="pointer-events-none absolute top-10 right-0 w-72 h-72 opacity-40"
            opacity={0.06}
          />

          <article className="relative z-10 max-w-5xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blogs", href: "/blogs" },
                { label: post.title },
              ]}
            />

            <nav
              aria-label="Breadcrumb"
              className="mt-4 mb-10 flex flex-wrap items-center gap-2 font-futura text-[10px] tracking-[0.3em] text-white/35 uppercase"
            >
              <Link href="/" className="hover:text-[#C9A84C]">Home</Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-[#C9A84C]">Blogs</Link>
              <span>/</span>
              <span className="text-[#C9A84C] truncate max-w-[160px] md:max-w-none">{post.title}</span>
            </nav>

            <p className="max-w-2xl font-futura text-[15px] text-white/60 font-light leading-[1.95] tracking-wide mb-14 md:mb-16">
              {post.content.intro}
            </p>

            {isBeachesGuide ? (
              <div className="space-y-16 md:space-y-20">
                {post.content.sections.map((section, i) => {
                  const reverse = i % 2 === 1;
                  const photo = (
                    <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[320px]">
                      {section.image && (
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                  const copy = (
                    <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14 bg-[#100e0c]">
                      <span className="font-futura text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
                        Beach {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-futura text-xl md:text-2xl text-white font-light uppercase tracking-[0.12em] leading-snug mb-5">
                        {section.heading}
                      </h2>
                      <p className="font-futura text-sm text-white/50 font-light leading-[1.95] tracking-wide">
                        {section.body}
                      </p>
                      {section.stayNearby?.length ? (
                        <p className="mt-5 font-futura text-[12px] text-white/45 font-light tracking-wide">
                          Stay nearby:{" "}
                          {section.stayNearby.map((link, li) => (
                            <span key={link.href}>
                              {li > 0 ? " · " : null}
                              <Link href={link.href} className="text-[#C9A84C] hover:underline">
                                {link.label}
                              </Link>
                            </span>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  );
                  return (
                    <section
                      id={section.id}
                      key={section.heading}
                      className="grid grid-cols-1 md:grid-cols-2 items-stretch border border-white/10 overflow-hidden scroll-mt-28"
                    >
                      {reverse ? (
                        <>
                          {copy}
                          {photo}
                        </>
                      ) : (
                        <>
                          {photo}
                          {copy}
                        </>
                      )}
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="relative space-y-0 border-l border-[#C9A84C]/25 ml-3 md:ml-4 pl-8 md:pl-12">
                {post.content.sections.map((section, i) => (
                  <section id={section.id} key={section.heading} className="relative pb-16 last:pb-0 scroll-mt-28">
                    <span className="absolute -left-[calc(2rem+5px)] md:-left-[calc(3rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-[#C9A84C] ring-4 ring-[#0a0908]" />
                    <span className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase">
                      {section.places?.length ? `Route ${i + 1}` : `Part ${i + 1}`}
                    </span>
                    <h2 className="mt-3 font-futura text-xl md:text-2xl text-white font-light uppercase tracking-[0.1em] leading-snug mb-6">
                      {section.heading}
                    </h2>

                    {section.images && section.images.length > 0 && (
                      <div
                        className={`mb-6 grid gap-3 ${
                          section.images.length === 2
                            ? "grid-cols-2 max-w-xl"
                            : "grid-cols-2 sm:grid-cols-3"
                        }`}
                      >
                        {section.images.map((src, imgIdx) => (
                          <figure key={src} className="space-y-2">
                            <div className="relative aspect-[3/4] overflow-hidden ring-1 ring-white/10">
                              <img
                                src={src}
                                alt={section.imageCaptions?.[imgIdx] || section.heading}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {section.imageCaptions?.[imgIdx] && (
                              <figcaption className="font-futura text-[9px] tracking-[0.18em] text-white/40 uppercase leading-relaxed">
                                {section.imageCaptions[imgIdx]}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    )}

                    {section.body && (
                      <p className="whitespace-pre-line font-futura text-sm text-white/50 font-light leading-[2] tracking-wide max-w-2xl mb-8">
                        {section.body}
                      </p>
                    )}

                    {section.stayNearby?.length ? (
                      <p className="mb-8 font-futura text-[12px] text-white/45 font-light tracking-wide max-w-2xl">
                        Stay nearby:{" "}
                        {section.stayNearby.map((link, li) => (
                          <span key={link.href}>
                            {li > 0 ? " · " : null}
                            <Link href={link.href} className="text-[#C9A84C] hover:underline">
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </p>
                    ) : null}

                    {section.places && section.places.length > 0 && (
                      <ul className="space-y-6 max-w-2xl">
                        {section.places.map((place) => (
                          <li
                            key={place.name}
                            className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
                          >
                            <h3 className="font-futura text-[13px] md:text-sm text-white tracking-[0.12em] uppercase mb-2">
                              {place.name}
                            </h3>
                            <p className="font-futura text-sm text-white/50 font-light leading-[1.9] tracking-wide mb-3">
                              {place.description}
                            </p>
                            <a
                              href={place.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.28em] uppercase text-[#C9A84C] hover:text-white transition-colors"
                            >
                              View on Map
                              <span aria-hidden>→</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            )}

            <div className="mt-16 pt-10 border-t border-white/10 max-w-2xl">
              <MandalaLotus className="w-8 h-8 mb-4 opacity-50" />
              <p className="font-futura text-sm text-white/55 font-light leading-[2] tracking-wide">
                {post.content.closing}
              </p>
            </div>

            {seo ? (
              <div className="max-w-3xl mx-auto mt-16">
                <KeywordSeoSections seo={seo} />
              </div>
            ) : null}

            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Link
                href="/properties"
                className="inline-flex justify-center px-8 py-3.5 border border-[#C9A84C] bg-transparent text-[#C9A84C] font-futura text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9A84C]/10 transition-colors"
              >
                Explore Stays
              </Link>
              <Link
                href="/blogs"
                className="inline-flex justify-center px-8 py-3.5 border border-white/15 font-futura text-[10px] tracking-[0.3em] uppercase text-white/70 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                All Blogs
              </Link>
            </div>

            {others.length > 0 && (
              <aside className="mt-20 pt-12 border-t border-white/10">
                <p className="font-futura text-[10px] tracking-[0.35em] text-[#C9A84C] uppercase mb-6">
                  Next read
                </p>
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/blogs/${o.slug}`}
                    className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 border border-white/10 p-3 sm:p-4 hover:border-[#C9A84C]/25 transition-colors"
                  >
                    <div className="sm:col-span-4 relative aspect-[16/10] overflow-hidden">
                      <img src={o.coverImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="sm:col-span-8 flex flex-col justify-center py-1">
                      <h3 className="font-futura text-base uppercase tracking-[0.1em] group-hover:text-[#C9A84C] transition-colors">
                        {o.title}
                      </h3>
                      <p className="mt-2 font-futura text-xs text-white/40 font-light leading-relaxed line-clamp-2">
                        {o.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </aside>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
