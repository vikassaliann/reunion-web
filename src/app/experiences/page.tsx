"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MandalaRing, MandalaLotus } from "@/components/wellness/WellnessMandala";

/* ── Hero Slideshow Images (exp9 -> exp6 -> exp1 -> exp4) ── */
const HERO_SLIDES = [
  { src: "/properties/experiances/exp9.png", alt: "Coastal Karnataka Experience 9" },
  { src: "/properties/experiances/exp6.png", alt: "Coastal Karnataka Experience 6" },
  { src: "/properties/experiances/exp1.png", alt: "Coastal Karnataka Experience 1" },
  { src: "/properties/experiances/exp4.png", alt: "Coastal Karnataka Experience 4" },
];

/* ── Structured Experience Cards ── */
const CARDS_DATA = [
  {
    id: 1,
    title: "Coastal Backwaters",
    tagline: "Where the Coast Slows Down",
    desc: "Glide through Udupi’s tranquil backwaters, where coconut groves, quiet waters, and village life come together in the rhythm of the coast.",
    image: "/properties/experiances/exp1.png",
  },
  {
    id: 2,
    title: "Pili Vesha (Tiger Dance)",
    tagline: "When the Streets Come Alive",
    desc: "Experience Pili Vesha, where dancers transform into tigers through vibrant body art, powerful movement, and the unmistakable spirit of coastal celebrations.",
    images: ["/properties/experiances/exp2.png", "/properties/experiances/exp6.png"],
    isSlideshow: true,
  },
  {
    id: 3,
    title: "Kambala",
    tagline: "The Race That Runs Through Our Roots",
    desc: "Feel the raw energy of Kambala — a centuries-old buffalo race where muddy fields, roaring crowds, and tradition collide.",
    image: "/properties/experiances/exp3.png",
  },
  {
    id: 4,
    title: "Bhuta Kola / Ritual Art",
    tagline: "Where the Divine Walks Among Us",
    desc: "Witness an ancient ritual tradition where elaborate costumes, sacred performances, fire, and devotion create an experience unlike any other.",
    images: ["/properties/experiances/exp4.png", "/properties/experiances/exp7.png"],
    isSlideshow: true,
  },
  {
    id: 5,
    title: "Yakshagana",
    tagline: "Stories Written in Colour",
    desc: "Step into the dramatic world of Yakshagana, where elaborate costumes, expressive faces, music, and mythology unfold on stage.",
    images: ["/properties/experiances/exp8.png", "/properties/experiances/exp5.png"],
    isSlideshow: true,
  },
  {
    id: 6,
    title: "Coastal Shores & Beaches",
    tagline: "Where the Land Meets the Endless Blue",
    desc: "Discover the untouched beauty of Coastal Karnataka — golden sands, dramatic shores, swaying palms, and sunsets over the Arabian Sea. From quiet hidden beaches to lively coastal stretches, every shore carries its own story.",
    image: "/properties/experiances/exp10.png",
  },
  {
    id: 7,
    title: "Backwater Kayaking & Paddling",
    tagline: "Paddle Beyond the Shore",
    desc: "Glide through Udupi’s calm backwaters and coastal waters, surrounded by mangroves, coconut groves, and open skies. A peaceful way to experience the quieter side of Coastal Karnataka.",
    image: "/properties/experiances/exp11.png",
  },
];

/* ── Interactive Card Slideshow (No Zoom Effect) ── */
function CardSlideShow({ images, title }: { images: string[]; title: string }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`${title} slide ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: slide === i ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

export default function ExperiencesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#060606] text-white antialiased min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[78svh] sm:h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: currentSlide === idx ? 1 : 0 }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-black/30 z-[1] pointer-events-none" />
        <MandalaRing
          className="pointer-events-none absolute -left-24 top-16 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] z-[2]"
          opacity={0.1}
        />

        <div className="relative z-10 text-center page-pad max-w-4xl mx-auto pb-10">
          <MandalaLotus className="w-10 h-10 mx-auto mb-4 opacity-60" />
          <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.5em] text-[#C9A84C] uppercase block mb-3 font-medium">
            Reunion Global
          </span>
          <h1 className="font-futura font-bold text-2xl sm:text-4xl md:text-6xl text-white tracking-[0.28em] sm:tracking-[0.4em] uppercase leading-tight drop-shadow-2xl">
            EXPERIENCES
          </h1>
          <div className="w-12 h-px bg-[#C9A84C]/60 mx-auto my-4 sm:my-5" />
          <p className="font-cormorant italic text-base sm:text-lg text-white/80 max-w-md mx-auto font-light tracking-wide">
            Discover the culture, nature & heritage of coastal Udupi
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 mx-auto page-pad section-y bg-[#060606] overflow-hidden">
        <MandalaRing
          className="pointer-events-none absolute -right-28 top-40 w-[320px] h-[320px]"
          opacity={0.06}
        />
        <MandalaRing
          className="pointer-events-none absolute -left-32 bottom-40 w-[300px] h-[300px]"
          opacity={0.05}
        />

        <div className="relative z-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Experiences" }]} />

          <div className="max-w-3xl mx-auto text-center mt-8 sm:mt-10 mb-14 sm:mb-20 md:mb-28 space-y-4">
            <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase block">
              Authentic Coastal Journeys
            </span>
            <p className="font-futura text-white/70 text-sm sm:text-base leading-relaxed font-light tracking-wide px-1">
              Every stay with Reunion is a doorway to authentic coastal experiences — from sunrise sea walks and secluded backwater kayak trails to ancient temple rituals and freshly prepared Karavali cuisine.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24 md:space-y-36">
            {CARDS_DATA.map((card, index) => {
              const isImageLeft = index % 2 === 0;
              return (
                <div
                  key={card.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center"
                >
                  <div
                    className={`space-y-3 sm:space-y-4 text-center lg:text-left ${
                      isImageLeft ? "order-2 lg:col-span-5" : "order-2 lg:order-1 lg:col-span-5"
                    }`}
                  >
                    <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase block font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-futura text-xl sm:text-2xl md:text-3xl text-white font-bold uppercase tracking-wider leading-tight">
                      {card.title}
                    </h2>
                    <p className="font-cormorant italic text-base sm:text-lg tracking-wide text-[#C9A84C]/90">
                      {card.tagline}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed font-futura font-light tracking-wide max-w-md mx-auto lg:mx-0 pt-1">
                      {card.desc}
                    </p>
                  </div>
                  <div
                    className={`${
                      isImageLeft ? "order-1 lg:col-span-7" : "order-1 lg:order-2 lg:col-span-7"
                    }`}
                  >
                    {card.isSlideshow && card.images ? (
                      <CardSlideShow images={card.images} title={card.title} />
                    ) : (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
