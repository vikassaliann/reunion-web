export type BlogSection = {
  heading: string;
  body: string;
  image?: string;
  images?: string[];
  /** Optional captions aligned with `images` */
  imageCaptions?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  content: {
    intro: string;
    sections: BlogSection[];
    closing: string;
  };
};

const beach = (name: string) => `/properties/beaches/${name}.png`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-beaches-to-visit-in-udupi",
    title: "Top 10 Beaches to Visit in Udupi",
    excerpt:
      "From Blue Flag shores to quiet casuarina-lined stretches — a curated guide to Udupi’s most beautiful beaches along the Arabian Sea.",
    category: "Travel Guide",
    readTime: "6 min read",
    date: "October 2025",
    coverImage: beach("malpe"),
    content: {
      intro:
        "Udupi’s coastline is one of Karnataka’s greatest gifts — golden sands, fishing harbours, lighthouse sunsets, and quiet coves perfect for a Reunion stay. Whether you want water sports at Malpe or stillness at Mattu, these ten beaches are worth your time.",
      sections: [
        {
          heading: "Malpe Beach",
          image: beach("malpe"),
          body: "About 6 km west of Udupi town, Malpe is the region’s lively coastal hub. Expect a working fishing harbour, the Malpe Sea Walk, water sports (jet ski, parasailing, banana boat), and boats to St. Mary’s Island. Best for families, couples, and sunset strolls. Ideal season: October–March.",
        },
        {
          heading: "Padubidri Blue Flag Beach",
          image: beach("padubidri"),
          body: "One of India’s Blue Flag beaches, Padubidri is prized for cleanliness, safety standards, and facilities. The Shambhavi River estuary nearby adds a scenic river-meets-sea viewpoint. Perfect for eco-conscious travellers and a calm swim in designated zones.",
        },
        {
          heading: "Kapu Beach & Lighthouse",
          image: beach("kapu"),
          body: "Famous for its historic lighthouse and wide shoreline, Kapu is a photographer’s favourite — especially at golden hour. Climb the lighthouse for panoramic Arabian Sea views, then linger on the quieter sands below.",
        },
        {
          heading: "Mattu Beach",
          image: beach("mattu"),
          body: "A softer, less crowded stretch known for golden sand and casuarina-lined shores. Ideal for slow mornings, walks, and beachside dining. Reunion Ocean Café sits right on this shoreline for sunset coffee and coastal meals.",
        },
        {
          heading: "Hoode / Padutonse Beach",
          image: beach("hoode"),
          body: "North of Malpe, this quieter shoreline offers open sea views and a more private feel — close to several Reunion beach villas. Excellent for guests who want the ocean without the Malpe crowds.",
        },
        {
          heading: "St. Mary’s Island",
          image: beach("stmarys"),
          body: "Reached by boat from Malpe (when seas are calm), St. Mary’s is known for rare hexagonal basalt rock columns and clear waters. Ferries usually run in fair weather; monsoon crossings are often suspended. Allow half a day.",
        },
        {
          heading: "Delta Beach (Kodi Bengre)",
          image: beach("delta"),
          body: "Where river and sea meet near the Kodi Bengre peninsula — a scenic, less commercial stretch with mangroves and open horizons. Best for photography and quiet evenings rather than water sports.",
        },
        {
          heading: "Hejamady Beach",
          image: beach("hejamadi"),
          body: "A peaceful coastal stop known for its scenic bridge and soft shoreline. Ideal as a drive-by add-on between Udupi and Padubidri if you want empty stretches of sand.",
        },
        {
          heading: "Uchila Beach",
          image: beach("ucchila"),
          body: "A relaxed coastal village beach south of Udupi — calm waters, local fishing life, and easy access if you’re staying near Kapu or exploring temple routes towards Mangaluru.",
        },
        {
          heading: "Maravanthe Beach",
          image: beach("maravante"),
          body: "A short scenic drive north towards Kundapura, Maravanthe is famous for the NH66 stretch where the Arabian Sea sits on one side and the Souparnika River on the other. Worth a half-day detour for one of the coast’s most dramatic road views.",
        },
      ],
      closing:
        "Base yourself at a Reunion villa near Malpe, Mattu, Hoode, or Kapu and you’ll have several of these shores within easy reach. Pair beach mornings with Udupi temple culture and coastal cuisine for a complete coastal Karnataka escape.",
    },
  },
  {
    slug: "2-day-udupi-itinerary",
    title: "2-Day Udupi Itinerary",
    excerpt:
      "A practical two-day plan covering Sri Krishna Matha, Malpe, Udupi sights, Kapu sunset, coastal food — plus when to catch Pilivesha, Kambala, and Bhoota Kola.",
    category: "Itinerary",
    readTime: "6 min read",
    date: "October 2025",
    coverImage: "/blogs/itinerary/sri-krishna-matha.jpg",
    content: {
      intro:
        "Two days in Udupi is enough for temple culture, Malpe’s shoreline, local sightseeing, and a Kapu sunset — if you keep the pace light. This plan balances Sri Krishna Matha, Malpe Beach, Udupi explorations, Kapu, and classic coastal food, with room to breathe.",
      sections: [
        {
          heading: "Day 1 — Sri Krishna Matha & Malpe",
          images: [
            "/blogs/itinerary/sri-krishna-matha.jpg",
            beach("malpe"),
          ],
          imageCaptions: ["Sri Krishna Matha, Udupi", "Malpe Beach"],
          body: "Morning: Begin at Sri Krishna Matha (Kanaka Gopura) for darshan. Walk Car Street and visit nearby Anantheshwara and Chandramouleshwara temples. Enjoy a classic Udupi breakfast — dosa, filter coffee, or temple prasadam when available.\n\nAfternoon–evening: Drive about 10–15 minutes to Malpe Beach. Stroll the Sea Walk, watch the harbour, and linger for sunset. If seas are calm and boats are running, you can add St. Mary’s Island as a half-day option (confirm tickets locally — services often pause in rough monsoon weather).\n\nDinner by the coast or back in Udupi town. Overnight at a Reunion stay.",
        },
        {
          heading: "Day 2 — Udupi Sights, Kapu Sunset & Food",
          images: [
            "/blogs/itinerary/hasta-shilpa.jpg",
            beach("kapu"),
            "/blogs/itinerary/udupi-food.jpg",
          ],
          imageCaptions: [
            "Hasta Shilpa Heritage Village",
            "Kapu Beach & lighthouse",
            "Udupi food",
          ],
          body: "Morning: Explore Udupi beyond the temple — visit Hasta Shilpa Heritage Village for traditional architecture and craft, or take a quiet walk around town markets and Car Street shops.\n\nAfternoon–evening: Head to Kapu (Kaup) Beach and lighthouse. Climb for panoramic Arabian Sea views, then stay for golden-hour light on the shoreline.\n\nFood: Close the day with Udupi’s flavours — a vegetarian thali or dosa lunch in town, and coastal dinner (fish curry if you eat seafood, or a simple Udupi meal). Optional café stop at Mattu if you want a calmer beachside wind-down.",
        },
        {
          heading: "Tips — Best season & coastal festivals",
          images: [
            "/properties/experiances/exp2.png",
            "/properties/experiances/exp3.png",
            "/properties/experiances/exp4.png",
          ],
          imageCaptions: [
            "Pilivesha — Navaratri / Dasara (Sep–Oct)",
            "Kambala — typically Nov–Mar",
            "Bhoota Kola — typically Dec–May",
          ],
          body: "Best season to visit: October–March — pleasant weather, clearer skies, and more reliable Malpe boat services. June–September is monsoon: lush and dramatic, but rough seas and limited island crossings.\n\nWhen to see local culture:\n• Pilivesha (Huli Vesha / tiger dance) — most visible during Navaratri and Dasara (usually September–October) in coastal towns.\n• Kambala (buffalo race) — peak season is roughly November–March across coastal Karnataka; check local village calendars.\n• Bhoota Kola / Nema — traditionally held in the post-harvest months, often December–May; nights are magical but ask locals for dates and etiquette.\n\nCarry sunscreen, light cottons, and cash for local eats. Temple dress codes apply — modest clothing recommended. Staying near Malpe, Mattu, or Kapu with Reunion keeps temple town and shore within easy reach.",
        },
      ],
      closing:
        "With Reunion as your base, Day 1 and Day 2 stay compact — Sri Krishna Matha and Malpe by day one, Udupi sights and Kapu by day two, and a villa to return to when the coast cools down.",
    },
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
