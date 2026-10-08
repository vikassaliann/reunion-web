import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REUNION — Explore Udupi | Discover Coastal Karnataka",
  description: "Explore Udupi's finest destinations — from pristine beaches and ancient temples to volcanic islands and scenic lighthouses. Your coastal Karnataka guide by Reunion.",
};

const DESTINATIONS = [
  {
    name: "Mattu Beach",
    tagline: "The Untouched Shore",
    desc: "A pristine, lesser-known beach where the Sita River meets the Arabian Sea. Home to the rare Mattu Gulla brinjal farming community, this peaceful shore offers golden sands, gentle waves, and spectacular sunsets without the crowds.",
    distance: "Adjacent to our properties",
    image: "/properties/ocean cafe/ocean4.png",
  },
  {
    name: "Malpe Beach",
    tagline: "Golden Sands & Islands",
    desc: "One of the most popular beaches on Karnataka's coast. Malpe is the gateway to St. Mary's Island, offering water sports, local seafood stalls, and long stretches of golden sand perfect for evening walks and family outings.",
    distance: "8 km from Udupi city",
    image: "/properties/ocean-elite/thumbelite.png",
  },
  {
    name: "St. Mary's Island",
    tagline: "Volcanic Rock Wonder",
    desc: "A protected geological monument featuring stunning hexagonal basalt rock columns formed by volcanic activity 88 million years ago. Accessible by ferry from Malpe, this pristine island offers crystal-clear waters and unique geological formations.",
    distance: "Ferry from Malpe Beach",
    image: "/properties/ocean-givaah/givaahthumb.png",
  },
  {
    name: "Sri Krishna Matha",
    tagline: "Sacred Heritage Temple",
    desc: "The spiritual heart of Udupi — an 800-year-old temple founded by Sri Madhvacharya. Famous for its unique Kanakana Kindi window through which devotees view the deity, and the legendary Udupi cuisine that originated here.",
    distance: "Udupi city centre",
    image: "/properties/de-homes/dehomesthumb.png",
  },
  {
    name: "Kapu Lighthouse",
    tagline: "Scenic Coastal Landmark",
    desc: "A 100-year-old lighthouse perched on rocky cliffs offering panoramic views of the Arabian Sea coastline. Climb to the top for breathtaking vistas, or explore the dramatic beach below with its natural rock formations.",
    distance: "12 km from Udupi",
    image: "/properties/ocean-royal/royalthumb.png",
  },
  {
    name: "Delta Beach",
    tagline: "Where River Meets Sea",
    desc: "A serene beach at the confluence of the Swarna River and the Arabian Sea. Known for its calm backwaters perfect for kayaking, bird watching, and experiencing the raw, untouched beauty of coastal Karnataka.",
    distance: "15 km from Udupi",
    image: "/properties/ocean-manor/herooo.png",
  },
  {
    name: "Manipal",
    tagline: "The University Town",
    desc: "A vibrant hillside town known for its world-class universities, diverse food scene, street art, and youthful energy. Home to Tapovana Life — our wellness partner — and a thriving café culture.",
    distance: "5 km from Udupi",
    image: "/properties/krshna/krthumb.png",
  },
  {
    name: "Padubidri End Point",
    tagline: "The Endless Shore",
    desc: "A beautiful stretch of coastline south of Udupi, known for its dramatic rock formations, tidal pools, and stunning views. A perfect spot for photography and peaceful contemplation.",
    distance: "20 km from Udupi",
    image: "/properties/ocean-waves/wavest.png",
  },
];

export default function ExploreUdupiPage() {
  return (
    <>
      <Navbar />

      <section className="relative pt-40 pb-32 bg-[#060606] min-h-screen px-4 md:px-10 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute top-0 left-0 right-0 h-[55vh] z-0 flex pointer-events-none">
          <img src="/properties/ocean cafe/ocean4.png" className="w-1/4 h-full object-cover grayscale brightness-50" alt="" />
          <img src="/properties/ocean-elite/thumbelite.png" className="w-1/4 h-full object-cover grayscale brightness-50" alt="" />
          <img src="/properties/ocean-royal/royalthumb.png" className="w-1/4 h-full object-cover grayscale brightness-50" alt="" />
          <img src="/properties/de-homes/dehomesthumb.png" className="w-1/4 h-full object-cover grayscale brightness-50" alt="" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[55vh] z-[1] pointer-events-none bg-gradient-to-b from-[#060606]/30 via-[#060606]/60 to-[#060606]" />

        <div className="relative z-10 mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Explore Udupi" }]} />

          {/* Header */}
          <div className="text-center mb-32 mt-16">
            <h1 className="font-futura text-4xl md:text-7xl text-white font-light tracking-[0.4em] uppercase">
              EXPLORE UDUPI
            </h1>
          </div>

          {/* Postcard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {DESTINATIONS.map((dest, i) => (
              <div key={i} className="group relative overflow-hidden border border-white/10 bg-white/[0.02] hover:border-[#C9A84C]/30 transition-all duration-500">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Content */}
                <div className="p-8">
                  <span className="font-futura text-[9px] tracking-[0.3em] text-[#C9A84C] uppercase block mb-2">{dest.tagline}</span>
                  <h3 className="font-futura text-xl text-white uppercase tracking-[0.2em] mb-3 group-hover:text-[#C9A84C] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed font-futura font-light tracking-wide mb-4">
                    {dest.desc}
                  </p>
                  <span className="font-futura text-[9px] tracking-[0.2em] text-white/30 uppercase">
                    📍 {dest.distance}
                  </span>
                </div>
                {/* Postcard stamp effect */}
                <div className="absolute top-4 right-4 w-14 h-14 border-2 border-dashed border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-futura text-[7px] tracking-widest text-white/20 uppercase text-center leading-tight">
                    UDUPI<br />KA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
