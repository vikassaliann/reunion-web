export type BlogPlace = {
  name: string;
  description: string;
  mapUrl: string;
};

export type BlogStayLink = { label: string; href: string };

export type BlogSection = {
  heading: string;
  body: string;
  /** Anchor id for deep links from category pages */
  id?: string;
  image?: string;
  images?: string[];
  /** Optional captions aligned with `images` */
  imageCaptions?: string[];
  /** Place list with map links (no photos) */
  places?: BlogPlace[];
  /** On-Page Report: Stay nearby villa links */
  stayNearby?: BlogStayLink[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Full title tag when guide specifies pipe-form (overrides REUNION | prefix). */
  metaTitle?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author?: string;
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
    metaTitle: "Top 10 Beaches in Udupi: A Local's Guide | REUNION",
    excerpt:
      "Malpe, Kapu, Mattu, Hoode, Uchila and more — a local guide to Udupi's 10 best beaches, with how to reach each one and where to stay nearby.",
    category: "Travel Guide",
    readTime: "12 min read",
    author: "REUNION Team, Udupi",
    date: "October 2025",
    coverImage: beach("malpe"),
    content: {
      intro:
        "From Malpe to Mattu, these are the 10 best beaches in Udupi — with how to reach each one and where to stay nearby.",
      sections: [
        {
          id: "malpe-beach",
          heading: "Malpe Beach",
          image: beach("malpe"),
          body: "About 6 km west of Udupi town, Malpe is the region’s lively coastal hub and one of the best beaches in Udupi for families. Expect a working fishing harbour, the Malpe Sea Walk, water sports (jet ski, parasailing, banana boat), and boats to St. Mary’s Island when seas are calm. Best for families, couples, and sunset strolls. How to reach: 15–20 minutes by auto or cab from Sri Krishna Matha. Safety: swim only in designated zones and watch harbour traffic. Best time: October–March for clearer skies and more reliable island ferries; monsoon (June–September) is dramatic but rough. Pair Malpe with a Udupi temple morning and Kapu lighthouse at golden hour for a full coastal day.",
          stayNearby: [
            { label: "Ocean Bliss", href: "/properties/ocean-bliss" },
          ],
        },
        {
          heading: "Padubidri Blue Flag Beach",
          image: beach("padubidri"),
          body: "One of India’s Blue Flag beaches, Padubidri is prized for cleanliness, safety standards, and facilities. The Shambhavi River estuary nearby adds a scenic river-meets-sea viewpoint. Perfect for eco-conscious travellers and a calm swim in designated zones. Stay nearby: browse REUNION beach villas on the Udupi–Kundapura coast. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
        },
        {
          id: "kapu-beach-lighthouse",
          heading: "Kapu Beach & Lighthouse",
          image: beach("kapu"),
          body: "Famous for its historic lighthouse and wide shoreline, Kapu Beach is a photographer’s favourite among beaches in Udupi — especially at golden hour. Climb the lighthouse when open for panoramic Arabian Sea views, then linger on the quieter sands below. How to reach: about 15–20 minutes south of Udupi town by road. Safety: tides can be strong; stay aware of currents near rocky patches. Best time: October–March for sunset photography; monsoon evenings are lush but windy. Kapu pairs well with Padubidri Blue Flag Beach further south on the same coastal drive.",
          stayNearby: [
            { label: "Ocean Royal Beach House", href: "/properties/ocean-royal" },
          ],
        },
        {
          id: "mattu-beach",
          heading: "Mattu Beach",
          image: beach("mattu"),
          body: "Mattu Beach, Udupi is a softer, less crowded stretch known for golden sand and casuarina-lined shores — one of the quietest beaches in Udupi for slow mornings and sunset walks. Reunion Ocean Café sits right on this shoreline for coffee, seafood and candle light dinners. How to reach: roughly 15–20 minutes south of Udupi town. Safety: generally calmer than Malpe harbour zones, but always check local advice before swimming. Best time: October–March for clear evenings; monsoon brings dramatic skies. Mattu is also the hub for REUNION beachfront stays and celebrations.",
          stayNearby: [
            { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
            { label: "Ocean Waves", href: "/properties/ocean-waves" },
            { label: "Ocean Café", href: "/dining" },
          ],
        },
        {
          id: "hoode-padutonse-beach",
          heading: "Hoode Beach, Udupi",
          image: beach("hoode"),
          body: "Hoode Beach, Udupi (also called Padutonse locally) sits north of Malpe with open sea views and a more private feel — excellent among beaches in Udupi if you want the ocean without harbour crowds. How to reach: about 20–30 minutes from Udupi town toward the northern coast. Safety: rock beds and open sea mean swimming conditions vary; ask REUNION staff for the day’s advice. Best time: October–March. REUNION Ocean Elite and Ocean Manor offer direct beach access on this shoreline.",
          stayNearby: [
            { label: "Ocean Elite", href: "/properties/ocean-elite" },
            { label: "Ocean Manor", href: "/properties/ocean-manor" },
          ],
        },
        {
          heading: "St. Mary’s Island",
          image: beach("stmarys"),
          body: "Reached by boat from Malpe (when seas are calm), St. Mary’s is known for rare hexagonal basalt rock columns and clear waters. Ferries usually run in fair weather; monsoon crossings are often suspended. Allow half a day. Stay nearby: REUNION Ocean Bliss or city villas for easy Malpe harbour access. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
        },
        {
          heading: "Delta Beach (Kodi Bengre)",
          image: beach("delta"),
          body: "Where river and sea meet near the Kodi Bengre peninsula — a scenic, less commercial stretch with mangroves and open horizons. Best for photography and quiet evenings rather than water sports. Stay nearby: REUNION beach villas at Hoode or Malpe for day trips to Delta Beach. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
        },
        {
          heading: "Hejamady Beach",
          image: beach("hejamadi"),
          body: "A peaceful coastal stop known for its scenic bridge and soft shoreline. Ideal as a drive-by add-on between Udupi and Padubidri if you want empty stretches of sand. Stay nearby: REUNION villas between Udupi and Kapu for flexible coastal drives. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
        },
        {
          id: "uchila-beach",
          heading: "Uchila Beach",
          image: beach("ucchila"),
          body: "Uchila Beach, Udupi is a relaxed coastal village shore south of town — calm waters, local fishing life, and easy access if you are staying near Kapu or driving toward Mangaluru. How to reach: roughly 25–35 minutes from Udupi city depending on traffic. Safety: quieter stretches with fewer facilities than Malpe; go with a group after dark. Best time: October–March. REUNION Ocean Givaah (pool villa ~200 m from the shore) and Ocean Daaffy Beach House (~100 m) are the stays to book here.",
          stayNearby: [
            { label: "Ocean Givaah", href: "/properties/ocean-givaah" },
            { label: "Ocean Daaffy Beach House", href: "/properties/ocean-daaffy" },
          ],
        },
        {
          heading: "Maravanthe Beach",
          image: beach("maravante"),
          body: "A short scenic drive north towards Kundapura, Maravanthe is famous for the NH66 stretch where the Arabian Sea sits on one side and the Souparnika River on the other. Worth a half-day detour for one of the coast’s most dramatic road views. Stay nearby: REUNION beach or city villas as a base for the northern coastal day trip. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
        },
        {
          heading: "Best time to visit Udupi beaches & FAQs",
          body: "Best time to visit Udupi beaches is October through March — pleasant evenings, clearer sunsets, and more reliable Malpe boats to St. Mary’s Island. June–September is monsoon: lush and dramatic, but rough seas and limited island crossings. Is it safe to swim? Conditions vary by beach and season — Malpe has busier zones; Mattu and Kapu feel calmer but still need local advice. Which beach is best for families? Mattu and Kapu for quieter sand; Malpe for water sports. Where should I stay? Use the Stay nearby links under each beach for REUNION villas on that shore. For temple days, combine with city villas or De Homes near Sri Krishna Matha.",
          stayNearby: [
            { label: "villas in Udupi", href: "/properties" },
            { label: "Mattu Beach guide", href: "/blogs/mattu-beach-udupi" },
          ],
        },
        {
          heading: "How to plan a beach day from a REUNION villa",
          body: "Wake at a REUNION stay, finish breakfast, and drive to one primary beach rather than three. Morning temple + Malpe works; Kapu is best late afternoon; Mattu suits sunset dining at Ocean Café; Hoode and Uchila reward guests who want quiet sand close to their villa gate. Carry sunscreen, water, and modest clothes if you will stop at temples the same day. Photographers should reach Kapu 45 minutes before sunset. Groups of 8+ should pre-book multi-unit stays such as Ocean Manor or Ocean Waves. For celebrations, add beach birthday or candle light dinner packages through REUNION. This structure keeps beaches in Udupi enjoyable instead of a rushed checklist — and every Stay nearby link above routes you to a bookable page.",
          stayNearby: [
            { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
            { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
          ],
        },
],
      closing:
        "Base yourself at a Reunion villa near Malpe, Mattu, Hoode, or Kapu and you’ll have several of these shores within easy reach. Pair beach mornings with Udupi temple culture and coastal cuisine for a complete coastal Karnataka escape. Best time to visit Udupi’s beaches is October–March; always confirm St. Mary’s Island boats on the day. For Hoode and Uchila detail, see our Hoode & Uchila Beaches guide. Next: tourist places in Udupi, or enquire for a beach villa stay.",
    },
  },
  {
    slug: "2-day-udupi-itinerary",
    title: "2-Day Udupi Itinerary",
    metaTitle: "2-Day Udupi Itinerary: Beaches, Temples & Food | REUNION",
    excerpt:
      "A practical 2-day Udupi plan — Sri Krishna Matha, Malpe, Kapu sunset and coastal food, plus the best time to visit and where to stay.",
    category: "Itinerary",
    readTime: "6 min read",
    author: "REUNION Team, Udupi",
    date: "October 2025",
    coverImage: "/blogs/itinerary/sri-krishna-matha.jpg",
    content: {
      intro:
        "This 2-day Udupi itinerary covers temples, beaches and coastal food — plus the best time to visit Udupi and where to stay.",
      sections: [
        {
          heading: "Day 1 — Sri Krishna Matha & Malpe",
          images: [
            "/blogs/itinerary/sri-krishna-matha.jpg",
            beach("malpe"),
          ],
          imageCaptions: ["Sri Krishna Matha, Udupi", "Malpe Beach"],
          body: "Morning: Begin at Sri Krishna Matha (Kanaka Gopura) for darshan. Walk Car Street and visit nearby Anantheshwara and Chandramouleshwara temples. Enjoy a classic Udupi breakfast — dosa, filter coffee, or temple prasadam when available.\n\nAfternoon–evening: Drive about 10–15 minutes to Malpe Beach. Stroll the Sea Walk, watch the harbour, and linger for sunset. If seas are calm and boats are running, you can add St. Mary’s Island as a half-day option (confirm tickets locally — services often pause in rough monsoon weather).\n\nDinner by the coast or back in Udupi town. Overnight at a Reunion stay.",
          stayNearby: [
            { label: "De Homes", href: "/properties/de-homes" },
            { label: "Ocean Bliss", href: "/properties/ocean-bliss" },
            { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
          ],
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
          stayNearby: [
            { label: "Ocean Royal Beach House", href: "/properties/ocean-royal" },
            { label: "Ocean Café", href: "/dining" },
            { label: "Mattu Beach guide", href: "/blogs/mattu-beach-udupi" },
          ],
        },
        {
          heading: "Best time to visit Udupi",
          body: "Best time to visit Udupi is October–March for pleasant weather, clearer skies, and more reliable Malpe boat services to St. Mary’s Island. June–September is monsoon: lush and dramatic, but rough seas and limited island crossings. Shoulder weeks in late September and early April still work if you prefer fewer crowds and accept warmer afternoons. Book beach villas early for December–January weekends from Bangalore.",
          stayNearby: [
            { label: "Bangalore to Udupi weekend trip", href: "/blogs/bangalore-to-udupi-weekend-trip" },
            { label: "villas in Udupi", href: "/properties" },
          ],
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
    metaTitle: "Tourist Places in Udupi: Best Places to Visit | REUNION",
    excerpt:
      "Temples, beaches and day trips — the best tourist places in Udupi, Malpe, Kapu, Kundapura and Karkala, with map links and where to stay.",
    category: "Travel Guide",
    readTime: "14 min read",
    author: "REUNION Team, Udupi",
    date: "October 2025",
    coverImage: "/blogs/tourist-places-hero.jpg",
    content: {
      intro:
        "These are the best tourist places in Udupi — temples, beaches and day trips we share with every REUNION guest. Whether you are searching for places to visit in Udupi over a weekend from Bangalore or a slower temple-and-beach holiday, use the routes below with map links, typical timings, and where to stay nearby with REUNION. Peak season is October–March; allow extra time in monsoon for rough seas and ferry pauses to St. Mary’s Island.",
      sections: [
        {
          heading: "Places to visit in Udupi — how to use this guide",
          body: "Start with Sri Krishna Matha in the morning, then pick one coastal route per day so you are not driving both north and south. For beaches in Udupi detail — how to reach, safety and Stay nearby villas — read our Top 10 Beaches guide. For a timed plan, use the 2-Day Udupi Itinerary. Entry fees and lighthouse climb hours change seasonally; confirm locally. Temple dress codes apply at Sri Krishna Matha and nearby shrines. Families with elders should prefer shorter Malpe and Kapu loops; groups who want pool time should base at Ocean Givaah near Uchila while sightseeing Kapu and Padubidri.",
          stayNearby: [
            { label: "villas in Udupi", href: "/properties" },
            { label: "beaches in Udupi", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
          ],
        },

        {
          heading: "Udupi → Malpe Route",
          body: "Start in temple town, then drive west to the harbour and islands. Allow half a day for Sri Krishna Matha plus Malpe; add St. Mary’s Island only when boats are running. Where to stay nearby: REUNION city villas for temple focus, or Ocean Bliss near Malpe for harbour mornings.",
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
          body: "South of Udupi for quieter beaches, the Kapu lighthouse, and the Blue Flag shore. This is the best places to visit in Udupi loop for sunset photographers. Where to stay nearby: Ocean Royal at Kapu, Ocean Hridayam or Ocean Waves at Mattu, Ocean Givaah or Ocean Daaffy near Uchila.",
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
        {
          heading: "Where to stay for tourist places in Udupi",
          body: "Choose your base by the places to visit in Udupi you care about most. Temple-first trips: De Homes, Marina Villa, Charm Villa or Aradhya Villa in Udupi city. Beach-first trips: Ocean Waves or Ocean Hridayam at Mattu, Ocean Elite or Ocean Manor at Hoode, Ocean Royal at Kapu, Ocean Bliss near Malpe, Ocean Givaah or Ocean Daaffy near Uchila. Northern day trips toward Kundapura work from any REUNION stay with an early start. Book candle light dinner or Ocean Café when you want a celebration night without leaving the coast.",
          stayNearby: [
            { label: "villas in Udupi", href: "/properties" },
            { label: "Ocean Café", href: "/dining" },
            { label: "2-day Udupi itinerary", href: "/blogs/2-day-udupi-itinerary" },
          ],
        },
],
      closing:
        "Peak season is October–March for clearer drives and calmer seas. Base at a Reunion stay and pick one route per day. The same places appear under Nearby Tourist Places on every property page.",
    },
  },
  {
    slug: "mattu-beach-udupi",
    title: "Mattu Beach, Udupi",
    metaTitle: "Mattu Beach, Udupi: Complete Guide | REUNION",
    excerpt:
      "Everything about Mattu Beach, Udupi — how to reach, best time, what to do, where to eat and beachfront stays right on the sand.",
    category: "Travel Guide",
    readTime: "5 min read",
    author: "REUNION Team, Udupi",
    date: "October 2026",
    coverImage: beach("mattu"),
    content: {
      intro:
        "Mattu Beach, Udupi is a quieter coastal stretch south of town — soft sand, sunset light, and REUNION's Ocean Café right on the shore. This local guide covers how to reach Mattu Beach, the best time to visit, what to do, where to eat, and beachfront stays steps from the water. Many travellers searching for Mattu Beach want a calmer alternative to Malpe harbour; Mattu delivers that with room to walk, photograph, and dine without festival crowds most weekdays.",
      sections: [
        {
          id: "about-mattu",
          heading: "Why visit Mattu Beach",
          body: "Mattu Beach sits on the Arabian Sea south of Udupi city, away from the busiest harbour traffic. The shoreline is popular for evening walks, soft sunset colour, and a slower coastal pace. Families and couples often prefer Mattu when they want sand and sea without water-sports noise. Local fishing life continues nearby; mornings feel quiet, and evenings fill with café guests and walkers. From REUNION villas on this beach you can step onto the sand in minutes — that proximity is why Mattu Beach stays appear so often in guest plans after Sri Krishna Matha darshan.",
          stayNearby: [
            { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
            { label: "Ocean Waves", href: "/properties/ocean-waves" },
          ],
        },
        {
          heading: "How to reach Mattu Beach from Udupi",
          body: "By road, Mattu Beach is roughly 15–25 minutes from Sri Krishna Matha depending on traffic. Cabs and local autos are the easiest option for visitors without a car. Self-drive guests follow coastal roads south of Udupi toward Mattu village; ask your REUNION host for the pin to Ocean Café or your villa gate. From Mangalore airport, plan about 90 minutes to Mattu via NH66 and coastal links. Parking near the shore is informal — keep valuables in the villa when you walk to the beach. If you are based at a city villa, schedule Mattu for late afternoon so you arrive for golden hour and dinner.",
        },
        {
          heading: "Best time to visit Mattu Beach",
          body: "October to March is the most comfortable window for Mattu Beach — clearer skies, calmer evenings, and reliable café seating outdoors. April–May can be hot midday; plan sunrise or sunset beach time. Monsoon (June–September) brings dramatic clouds and rough surf; swimming advice changes daily, so check with REUNION staff. Weekends and holidays fill Ocean Café faster — reserve candlelight dinner slots ahead if you are celebrating. Photographers should arrive 45 minutes before sunset for Kapu-to-Mattu coastal light.",
        },
        {
          heading: "Things to do at Mattu Beach",
          body: "Walk the shoreline at low tide, watch fishing boats offshore, and settle in for sunset from the café deck. Pair Mattu with a morning at Sri Krishna Matha or Malpe, then return for dinner. Couples often book a private candle light dinner in Udupi on Mattu Beach through REUNION. Groups can combine Ocean Waves beachfront units with Ocean Café next door for birthdays and small celebrations. Do not treat Mattu as a water-sports hub — that energy sits at Malpe; Mattu’s job is quiet sand, food, and stay.",
          stayNearby: [
            { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
            { label: "things to do in Udupi", href: "/blogs/things-to-do-in-udupi" },
          ],
        },
        {
          heading: "Where to eat — Ocean Café on Mattu Beach",
          body: "Ocean Café by REUNION is the beachfront café on Mattu Beach — seafood, coffee, fireplace lounge seating, and sunset views. Open daily about 9:30 AM–10 PM. Ask for coastal specials and reserve for larger groups. Stay guests at Ocean Hridayam and Ocean Waves can walk over as “dine next door” without a long transfer. For classic vegetarian thalis, keep one meal in Udupi town; use Mattu for the coastal night.",
          stayNearby: [
            { label: "Ocean Café", href: "/dining" },
            { label: "best restaurants in Udupi", href: "/blogs/best-restaurants-in-udupi" },
          ],
        },
        {
          heading: "Where to stay nearby on Mattu Beach",
          body: "Book Ocean Hridayam for a 2-bedroom beachfront villa with a sea-facing balcony, or Ocean Waves for three private beachfront units about 5 m from Mattu Beach. Both put you next to Ocean Café and keep Malpe and Kapu within an easy day drive. Browse all beach villas in Udupi if your group needs more bedrooms across Hoode or Uchila as well.",
          stayNearby: [
            { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
            { label: "Ocean Waves", href: "/properties/ocean-waves" },
            { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
          ],
        },
      ],
      closing:
        "Mattu Beach works best as a base night: temple or Malpe by day, café sunset and villa sleep by evening. Use this guide with our Top 10 Beaches and Tourist Places posts to build a full Udupi coast plan — then enquire with REUNION for dates.",
    },
  },
  {
    slug: "bangalore-to-udupi-weekend-trip",
    title: "Bangalore to Udupi Weekend Trip",
    metaTitle: "Bangalore to Udupi Weekend Trip: Plan & Stays | REUNION",
    excerpt:
      "Plan a Bangalore to Udupi weekend trip — train, bus, car or flight, a 2-day plan, beaches, food and the best villas to stay in.",
    category: "Travel Guide",
    readTime: "6 min read",
    author: "REUNION Team, Udupi",
    date: "October 2026",
    coverImage: beach("malpe"),
    content: {
      intro:
        "Planning a Bangalore to Udupi trip? Here's how to get there, what to do over a weekend and where to stay by the beach.",
      sections: [
        {
          heading: "How to reach Udupi from Bangalore",
          body: "By road: NH75 and coastal highways, about 7–8 hours. Overnight trains to Udupi Railway Station are popular on weekends. Mangalore airport is the nearest flight option, then a 1-hour drive to Udupi.",
        },
        {
          heading: "Weekend plan",
          body: "Day 1: Sri Krishna Matha and Malpe Beach. Day 2: Kapu lighthouse and Mattu/Ocean Café. See our 2-day Udupi itinerary for a full hour-by-hour outline.",
        },
      ],
      closing: "Book a REUNION beach villa for an easy Bangalore weekend escape — check-in Friday night, back Sunday evening.",
    },
  },
  {
    slug: "things-to-do-in-udupi",
    title: "Things to Do in Udupi",
    metaTitle: "Things to Do in Udupi: A Local's List | REUNION",
    excerpt:
      "The best things to do in Udupi — beaches, temples, St. Mary's Island, food, candlelight dinners and wellness — from a local team.",
    category: "Travel Guide",
    readTime: "7 min read",
    author: "REUNION Team, Udupi",
    date: "October 2026",
    coverImage: beach("stmarys"),
    content: {
      intro:
        "Looking for things to do in Udupi beyond a quick temple stop? This local list covers beaches, St. Mary’s Island, food, candlelight dinners, wellness and day trips — with links to bookable REUNION stays and experiences. Use it with our tourist places guide when you need deeper stop-by-stop detail.",
      sections: [
        {
          heading: "Temple town morning",
          body: "Start with Sri Krishna Matha darshan, Car Street walks, and nearby Anantheshwara and Chandramouleshwara temples. Dress modestly and keep mornings for quieter queues. Stay near the temple at De Homes if early darshan matters, or drive in from a beach villa after breakfast.",
          stayNearby: [
            { label: "De Homes", href: "/properties/de-homes" },
            { label: "city villas in Udupi", href: "/properties/category/city-stays" },
          ],
        },
        {
          heading: "Beaches & St. Mary’s Island",
          body: "Malpe Beach for harbour energy and the St. Mary’s Island ferry when seas are calm; Kapu for lighthouse sunset; Mattu for café evenings; Hoode and Uchila for quieter sand. Confirm boat tickets locally — services often pause in rough monsoon weather. Ocean Bliss sits near Malpe for island-day logistics.",
          stayNearby: [
            { label: "Ocean Bliss", href: "/properties/ocean-bliss" },
            { label: "Top 10 beaches in Udupi", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
            { label: "Mattu Beach guide", href: "/blogs/mattu-beach-udupi" },
          ],
        },
        {
          heading: "Food & café evenings",
          body: "Classic Udupi thalis and dosas in town; coastal seafood near Malpe; sunset dining at Ocean Café on Mattu Beach. Pair one temple-town meal with one beach night so the trip tastes of both sides of Udupi.",
          stayNearby: [
            { label: "Ocean Café", href: "/dining" },
            { label: "best restaurants in Udupi", href: "/blogs/best-restaurants-in-udupi" },
          ],
        },
        {
          heading: "Celebrations & wellness",
          body: "Book a private candle light dinner on Mattu Beach, a beach birthday setup, or spa and Ayurveda time with Tapovana Life through REUNION. These are the high-intent “things to do in Udupi” for couples and small groups who already have a villa base.",
          stayNearby: [
            { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
            { label: "beach birthday in Udupi", href: "/experiences/beach-birthday" },
            { label: "spa in Udupi", href: "/wellness" },
            { label: "experiences in Udupi", href: "/experiences" },
          ],
        },
        {
          heading: "Day trips from Udupi",
          body: "Kapu lighthouse, Padubidri Blue Flag Beach, Karkala Gomateshwara, and Kundapura routes appear often in guest plans. For Malnad nature, Reunion Serene near Shivamogga and Jog Falls is a separate stay — not a same-day coastal hop. Keep coastal days coastal; save Jog Falls for a dedicated Malnad night.",
          stayNearby: [
            { label: "Reunion Serene", href: "/properties/reunion-serene" },
            { label: "tourist places in Udupi", href: "/blogs/tourist-places-in-udupi" },
          ],
        },
      ],
      closing:
        "Pick two beaches, one temple block, and one REUNION experience — that mix usually beats a rushed checklist. Enquire for villa dates, then add café or candlelight once your stay is confirmed.",
    },
  },
  {
    slug: "best-restaurants-in-udupi",
    title: "Best Restaurants & Cafés in Udupi",
    metaTitle: "Best Restaurants & Cafés in Udupi | REUNION",
    excerpt:
      "A local's list of the best restaurants and cafés in Udupi — Udupi classics, seafood, beach cafés and sunset dining spots.",
    category: "Food",
    readTime: "6 min read",
    author: "REUNION Team, Udupi",
    date: "October 2026",
    coverImage: beach("mattu"),
    content: {
      intro:
        "A practical local list of the best restaurants and cafés in Udupi — classic vegetarian Udupi meals, coastal seafood, and beachfront dining — with Ocean Café on Mattu Beach as REUNION’s sunset pick. Use this when guests ask where to eat after Sri Krishna Matha or a beach day.",
      sections: [
        {
          heading: "Udupi classics near the temple",
          body: "Vegetarian thali and dosa counters around Car Street and Udupi town define the district’s global reputation. Woodlands, Mitra Samaj and local lunch homes remain dependable for filter coffee, dosa and set meals. Go early for breakfast, or after darshan before queues peak. If you stay at De Homes or a city villa, these kitchens are a short ride — keep one temple-town meal in every itinerary.",
          stayNearby: [
            { label: "De Homes", href: "/properties/de-homes" },
            { label: "city villas in Udupi", href: "/properties/category/city-stays" },
          ],
        },
        {
          heading: "Seafood & harbour-side dinners",
          body: "Coastal Karnataka seafood shines near Malpe harbour and family restaurants between Udupi and Mangaluru. Ask for fresh catch and local fish curry. Pair a Malpe beach afternoon with a seafood dinner, then sleep near the shore at Ocean Bliss or drive south to Mattu for a calmer night.",
          stayNearby: [
            { label: "Ocean Bliss", href: "/properties/ocean-bliss" },
            { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
          ],
        },
        {
          heading: "Ocean Café — beachfront café on Mattu Beach",
          body: "For restaurants in Udupi with a true beachfront view, Ocean Café by REUNION sits on Mattu Beach — seafood, coffee, fireplace lounge, and sunset seating. Open daily about 9:30 AM–10 PM. Candlelight dinners can be arranged for proposals and anniversaries. Guests at Ocean Hridayam and Ocean Waves literally stay next door.",
          stayNearby: [
            { label: "Ocean Café", href: "/dining" },
            { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
            { label: "Ocean Waves", href: "/properties/ocean-waves" },
            { label: "Mattu Beach guide", href: "/blogs/mattu-beach-udupi" },
          ],
        },
        {
          heading: "How to choose where to eat",
          body: "Temple morning → vegetarian Udupi meal. Harbour afternoon → seafood. Sunset → Ocean Café. That rotation matches how locals and REUNION hosts usually advise weekend guests from Bangalore. Book café tables on holiday weekends; keep cash for smaller town counters.",
        },
      ],
      closing:
        "Staying with REUNION? Ask the host for tonight’s pick based on your villa location — town thali one night, Mattu sunset the next — and link your dinner plan to candle light dinner if you are celebrating.",
    },
  },
  {
    slug: "hoode-uchila-beaches-udupi",
    title: "Hoode Beach & Uchila Beach, Udupi",
    metaTitle: "Hoode Beach & Uchila Beach Udupi Guide | REUNION",
    excerpt:
      "A local guide to Hoode Beach and Uchila Beach in Udupi — how to reach, what to expect, and REUNION villas with beach access nearby.",
    category: "Travel Guide",
    readTime: "8 min read",
    author: "REUNION Team, Udupi",
    date: "October 2026",
    coverImage: beach("hoode"),
    content: {
      intro:
        "Hoode Beach and Uchila Beach are two quieter shores guests ask about after Malpe and Mattu — here is how to reach each beach in Udupi, when to go, and where to stay with REUNION. Together they capture what many travellers want from beaches in Udupi without harbour crowds: open sand at Hoode and a village shoreline at Uchila with pool-villa options nearby. This guide is written for weekend guests from Bangalore and longer coastal stays.",
      sections: [
        {
          id: "hoode-beach",
          heading: "Hoode Beach, Udupi",
          image: beach("hoode"),
          body: "Hoode Beach, Udupi sits north of Malpe with open Arabian Sea views and fewer crowds than the harbour. Locals also say Padutonse for the same stretch — for search and guest clarity we use Hoode Beach, Udupi. Direct lawn-to-sand access makes it ideal for families who want a private coastal feel. How to reach: 20–30 minutes from Udupi town by cab. Best time: October–March. Pair Hoode with Malpe or a temple morning in town. Driving times vary with NH66 traffic; leave a buffer if you have evening Ocean Café plans at Mattu. For photos and rock-bed access notes, ask the REUNION host at Ocean Elite or Ocean Manor on arrival. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
          stayNearby: [
            { label: "Ocean Elite", href: "/properties/ocean-elite" },
            { label: "Ocean Manor", href: "/properties/ocean-manor" },
          ],
        },
        {
          id: "uchila-beach",
          heading: "Uchila Beach, Udupi",
          image: beach("ucchila"),
          body: "Uchila Beach, Udupi is a village shoreline south of Kapu routes — calmer waters, fishing life, and easy day trips toward Padubidri Blue Flag Beach. How to reach: about 25–35 minutes from Udupi city. Best time: October–March. Guests who want a private pool should look at Ocean Givaah (~200 m from the sand); Ocean Daaffy Beach House sits about 100 m from a quiet beach. Uchila works well as a base for Kapu lighthouse sunsets and Padubidri Blue Flag Beach without returning to Udupi town each night. Local tip from the REUNION team: carry cash for parking and snacks, start beach time after 4 PM in peak heat, and book candle light dinner or Ocean Café tables on weekends in advance. Families with kids often prefer Mattu and Kapu; groups wanting a pool choose Uchila’s Ocean Givaah after a Kapu lighthouse sunset.",
          stayNearby: [
            { label: "Ocean Givaah", href: "/properties/ocean-givaah" },
            { label: "Ocean Daaffy Beach House", href: "/properties/ocean-daaffy" },
          ],
        },
        {
          heading: "Where to stay nearby",
          body: "Base at REUNION beach villas on Hoode or Uchila and day-trip to Kapu lighthouse, Malpe harbour, or Mattu Beach for Ocean Café sunsets. Browse all beach villas in Udupi if you need more bedrooms for a group.",
          stayNearby: [
            { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
            { label: "Top 10 beaches in Udupi", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
          ],
        },
        {
          heading: "Best time, safety & driving tips",
          body: "Best time for Hoode Beach and Uchila Beach is October–March. Monsoon brings dramatic skies but rough surf — ask REUNION before swimming. Parking is informal near village approaches; keep valuables in the villa. From Bangalore, plan an overnight train or a 7–8 hour drive, then use these quieter beaches on day two after Sri Krishna Matha. Combine Hoode with Malpe harbour, and Uchila with Kapu lighthouse, for two distinct coastal moods without overlapping the same sand twice.",
          stayNearby: [
            { label: "Bangalore to Udupi weekend trip", href: "/blogs/bangalore-to-udupi-weekend-trip" },
          ],
        },
],
      closing:
        "For a full coastline list including Padubidri, Delta and Maravanthe, read Top 10 Beaches to Visit in Udupi — then book the REUNION villa closest to the sand you want.",
    },
  },

];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
