export type BlogPlace = {
  name: string;
  description: string;
  mapUrl: string;
};

export type BlogSection = {
  heading: string;
  body: string;
  image?: string;
  images?: string[];
  /** Optional captions aligned with `images` */
  imageCaptions?: string[];
  /** Place list with map links (no photos) */
  places?: BlogPlace[];
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
  {
    slug: "tourist-places-in-udupi",
    title: "Tourist Places in Udupi",
    excerpt:
      "Temple town, Malpe, Kapu, Kundapura and Karkala — the same nearby routes we share on every Reunion stay, with short notes and map links for each place.",
    category: "Travel Guide",
    readTime: "8 min read",
    date: "October 2025",
    coverImage: "/blogs/tourist-places-hero.jpg",
    content: {
      intro:
        "Udupi’s best day trips sit on four clear routes from temple town to the coast and inland. Below is the same nearby list from Reunion property pages — each place with a short note and a Google Maps link. No photo gallery; open the map when you are ready to go.",
      sections: [
        {
          heading: "Udupi → Malpe Route",
          body: "Start in temple town, then drive west to the harbour and islands.",
          places: [
            {
              name: "Sri Krishna Matha",
              description: "Udupi’s spiritual centre — begin here for darshan and a walk along Car Street.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Matha+Udupi+Karnataka",
            },
            {
              name: "Anantheshwara Temple",
              description: "Ancient shrine beside the Matha complex, often visited in the same temple circuit.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Anantheshwara+Temple+Udupi+Karnataka",
            },
            {
              name: "Chandramouleshwara Temple",
              description: "Quiet stone courtyard temple next to Anantheshwara — a calm stop before leaving town.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Chandramouleshwara+Temple+Udupi+Karnataka",
            },
            {
              name: "Bhujanga Park",
              description: "Small green park in Udupi for a short break between temples and the coast drive.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Bhujanga+Park+Udupi+Karnataka",
            },
            {
              name: "Hasta Shilpa Heritage Village",
              description: "Open-air museum of traditional coastal Karnataka homes and crafts near Manipal.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Hasta+Shilpa+Heritage+Village+Manipal+Karnataka",
            },
            {
              name: "Malpe Sea Walk",
              description: "Harbour promenade with fishing boats and evening light — easy stroll before sunset.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Sea+Walk+Malpe+Karnataka",
            },
            {
              name: "Malpe Beach",
              description: "Main coastal hub for water sports, the fishing harbour, and boats to St. Mary’s Island.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Beach+Udupi+Karnataka",
            },
            {
              name: "Daria Bahadurgad Fort (Sea Fort)",
              description: "Rocky sea fort near Malpe — short coastal history stop with open sea views.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Daria+Bahadurgad+Fort+Malpe+Karnataka",
            },
            {
              name: "St. Mary's Island",
              description: "Boat from Malpe when seas are calm; known for rare hexagonal basalt rock columns.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Marys+Island+Malpe+Karnataka",
            },
            {
              name: "Delta Beach",
              description: "Quieter stretch near Kodi Bengre where river and sea meet — good for photos, not crowds.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Delta+Beach+Kodi+Bengre+Udupi",
            },
            {
              name: "Kodi Bengre Delta",
              description: "Peninsula viewpoint of the Swarna estuary meeting the Arabian Sea.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodi+Bengre+Delta+Point+Udupi",
            },
          ],
        },
        {
          heading: "Udupi → Kapu → Mangaluru Route",
          body: "South of Udupi for quieter beaches, the Kapu lighthouse, and the Blue Flag shore.",
          places: [
            {
              name: "Mattu Beach",
              description: "Softer, less crowded sands with casuarina shade — also home to Reunion Ocean Café.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Mattu+Beach+Udupi+Karnataka",
            },
            {
              name: "Kapu Beach",
              description: "Wide shoreline popular for sunset walks and evening light on the Arabian Sea.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Beach+Udupi+Karnataka",
            },
            {
              name: "Kapu Lighthouse",
              description: "Historic lighthouse with panoramic sea views — climb when open for the best photo stop.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Lighthouse+Kaup+Karnataka",
            },
            {
              name: "Shree Hosa Marigudi Temple",
              description: "Local coastal shrine near Kaup, a short detour from the beach road.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Shree+Hosa+Marigudi+Temple+Kaup+Karnataka",
            },
            {
              name: "Padubidri Blue Flag Beach",
              description: "Clean, well-managed Blue Flag beach with facilities — good for a calm swim and stroll.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Padubidri+Blue+Flag+Beach+Karnataka",
            },
            {
              name: "Uchila Mahalakshmi Temple",
              description: "Coastal temple stop near Uchila on the drive toward Mangaluru.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Uchila+Mahalakshmi+Temple+Udupi+Karnataka",
            },
            {
              name: "Hejamady Scenic Bridge",
              description: "Photogenic bridge and soft shoreline — easy add-on between Udupi and Padubidri.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Hejamadi+Bridge+Karnataka",
            },
          ],
        },
        {
          heading: "Udupi → Brahmavar → Kundapura Route",
          body: "North for river kayaking, hill temples, and the sea-and-river stretch at Maravanthe.",
          places: [
            {
              name: "Saligrama Kayaking (Swarna River)",
              description: "Calm-water kayaking on the Swarna when conditions allow — book locally on the day.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Saligrama+Kayaking+Udupi+Karnataka",
            },
            {
              name: "Anegudde Sri Vinayaka Temple",
              description: "Hilltop Ganesha temple at Kumbhashi — popular pilgrimage stop on the northern route.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Anegudde+Sri+Vinayaka+Temple+Kumbhashi",
            },
            {
              name: "Ottinene View Point",
              description: "Cliff viewpoint near Byndoor with open Arabian Sea and coastal cliff views.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Ottinene+View+Point+Byndoor+Karnataka",
            },
            {
              name: "Maravanthe Beach",
              description: "Famous NH66 stretch with the sea on one side and the Souparnika River on the other.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Maravanthe+Beach+Kundapura+Karnataka",
            },
            {
              name: "Byndoor Beach",
              description: "Quieter northern sand stretch beyond Maravanthe — good for a slower coastal stop.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Byndoor+Beach+Karnataka",
            },
            {
              name: "Kollur Mookambika Temple",
              description: "Major inland pilgrimage temple — plan as a half-day or full-day trip from Udupi.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Kollur+Mookambika+Temple+Karnataka",
            },
            {
              name: "Kodachadri Hills",
              description: "Western Ghats trek and viewpoint — full-day plan; start early and check weather.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodachadri+Hills+Karnataka",
            },
          ],
        },
        {
          heading: "Udupi → Karkala → Hebri Route",
          body: "Inland for Jain heritage, sacred lakes, and quieter spiritual stops.",
          places: [
            {
              name: "Pajaka Kshetra",
              description: "Birthplace of Sri Madhvacharya — peaceful pilgrimage site east of Udupi.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Pajaka+Kshetra+Udupi+Karnataka",
            },
            {
              name: "Hiriyadka Veerabhadra Temple",
              description: "Local temple stop on the road toward Karkala — brief cultural pause on the drive.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Hiriyadka+Veerabhadra+Temple+Karnataka",
            },
            {
              name: "St. Lawrence Shrine, Attur",
              description: "Hill shrine near Karkala, visited by pilgrims and travellers on the inland circuit.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Lawrence+Shrine+Attur+Karkala",
            },
            {
              name: "Karkala Gomateshwara Statue",
              description: "Towering monolithic Bahubali statue — one of coastal Karnataka’s great Jain landmarks.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Gomateshwara+Statue+Karkala+Karnataka",
            },
            {
              name: "Chaturmukha Basadi",
              description: "Four-faced Jain basadi in Karkala with distinctive stone architecture.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Chaturmukha+Basadi+Karkala+Karnataka",
            },
            {
              name: "Varanga Jain Temple & Lake",
              description: "Serene temple-on-lake setting near Karkala — quiet end to the inland route.",
              mapUrl: "https://www.google.com/maps/search/?api=1&query=Varanga+Jain+Temple+Karkala+Karnataka",
            },
          ],
        },
      ],
      closing:
        "Peak season is October–March for clearer drives and calmer seas. Base at a Reunion stay and pick one route per day. The same places appear under Nearby Tourist Places on every property page.",
    },
  },
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
