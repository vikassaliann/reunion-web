/** Keyword guide — title, meta, H1, lead paragraph per property. */
export type PropertySeoEntry = {
  title: string;
  description: string;
  h1: string;
  lead: string;
};

export const PROPERTY_SEO: Record<string, PropertySeoEntry> = {
  "ocean-elite": {
    title: "REUNION Ocean Elite | Beach Villa at Hoode Beach, Udupi",
    description:
      "2BHK beach villa with direct access to Hoode Beach, a private sea-view balcony and lawn. Ocean Elite by REUNION, Udupi — for up to 6 guests.",
    h1: "Ocean Elite — Beach Villa at Hoode Beach, Udupi",
    lead:
      "REUNION Ocean Elite is a 2BHK beach villa at Hoode Beach, Udupi, with direct beach access, a sea-view balcony and lawn — for up to 6 guests.",
  },
  "ocean-manor": {
    title: "REUNION Ocean Manor | Beachfront Villa, Hoode Beach Udupi",
    description:
      "Sea-facing balconies, river views and rock-bed beach access for families and groups. Ocean Manor by REUNION at Hoode Beach, Udupi.",
    h1: "Ocean Manor — Beachfront Group Villa at Hoode, Udupi",
    lead:
      "REUNION Ocean Manor is a beachfront group villa at Hoode Beach, Udupi — a 2BHK plus two 1BHK units with sea-facing balconies and river views.",
  },
  "ocean-givaah": {
    title: "REUNION Ocean Givaah | Pool Villa near Uchila Beach",
    description:
      "Private pool, garden and ocean-view terrace, 200 m from Uchila Beach. Ocean Givaah is a 3BHK luxury pool villa by REUNION in Udupi.",
    h1: "Ocean Givaah — 3BHK Pool Villa near Uchila Beach",
    lead:
      "REUNION Ocean Givaah is a 3BHK private pool villa near Uchila Beach, Udupi, with a garden and ocean-view terrace just 200 m from the shore.",
  },
  "ocean-royal": {
    title: "REUNION Ocean Royal Beach House | Heritage Villa, Kapu",
    description:
      "A heritage beach house in coconut groves, 50 m from the sea at Kapu, Udupi. Ocean Royal by REUNION — a 3-bedroom coastal villa stay.",
    h1: "Ocean Royal Beach House — Heritage Villa in Kapu",
    lead:
      "REUNION Ocean Royal Beach House is a 3-bedroom heritage villa in Kapu, Udupi, set in coconut groves just 50 m from the sea.",
  },
  "de-homes": {
    title: "De Homes | Hotel near Udupi Krishna Temple | REUNION",
    description:
      "Premium suites and rooms near Sri Krishna Temple, Udupi — Presidential Suite, balcony rooms and executive rooms by REUNION. Book direct.",
    h1: "De Homes — Hotel Rooms near Udupi Krishna Temple",
    lead:
      "De Homes is a premium stay among hotels near Udupi Krishna Temple, about a 10-minute walk from Sri Krishna Matha in Chitpady, Udupi.",
  },
  "de-square": {
    title: "REUNION De Square | Hotel & Resort in Koteshwara, Udupi",
    description:
      "D-Square Hotels & Resort by REUNION in Koteshwara, Udupi — comfortable hotel stays for families and travellers on the Udupi–Kundapura coast.",
    h1: "De Square — Hotel & Resort in Koteshwara, Udupi",
    lead:
      "Reunion De Square in Koteshwara, Udupi offers hotel and resort rooms on the coastal belt between Udupi and Kundapura — ideal for families and pilgrims.",
  },
  "ocean-daaffy": {
    title: "REUNION Ocean Daaffy Beach House | 3BHK Villa, Uchila",
    description:
      "A 3-bedroom beach house 100 m from the sand at Uchila, Udupi. Ocean Daaffy by REUNION — a quiet coastal villa for families and groups.",
    h1: "Ocean Daaffy Beach House — 3BHK Villa in Uchila",
    lead:
      "REUNION Ocean Daaffy Beach House is a 3-bedroom villa in Uchila, Udupi, just 100 m from a quiet sandy beach.",
  },
  "ocean-hridayam": {
    title: "REUNION Ocean Hridayam | Beachfront Villa, Mattu Beach",
    description:
      "Step straight onto Mattu Beach from this 2-bedroom beachfront villa with a sea-facing balcony and kitchen. Ocean Hridayam by REUNION, Udupi.",
    h1: "Ocean Hridayam — Beachfront Villa on Mattu Beach",
    lead:
      "REUNION Ocean Hridayam is a 2-bedroom beachfront villa on Mattu Beach, Udupi — step straight from the sea-facing balcony onto the sand.",
  },
  "ocean-bliss": {
    title: "REUNION Ocean Bliss | 2BHK Villa near Malpe Beach",
    description:
      "A peaceful 2BHK villa with an open compound, moments from Malpe Beach in Udupi. Ocean Bliss by REUNION — easy base for Malpe and St. Mary's.",
    h1: "Ocean Bliss — 2BHK Villa near Malpe Beach",
    lead:
      "REUNION Ocean Bliss is a 2BHK villa near Malpe Beach, Udupi — a peaceful stay near Malpe, with St. Mary's Island a short ferry away.",
  },
  "marina-villa": {
    title: "REUNION Marina Villa | 3BHK Villa in Udupi City",
    description:
      "A spacious 3-bedroom villa in Kannarpady, central Udupi, with AC bedrooms, kitchen and parking. Marina Villa by REUNION — close to town.",
    h1: "Marina Villa — 3BHK City Villa in Udupi",
    lead:
      "REUNION Marina Villa is a 3BHK city villa in Kannarpady, Udupi, with AC bedrooms, a private kitchen and parking — close to Udupi town.",
  },
  "charm-villa": {
    title: "REUNION Charm Villa | 3BHK Private Villa in Udupi",
    description:
      "A relaxed 3-bedroom private villa in Badagabettu, Udupi, with attached suites, balcony living and modern amenities. Charm Villa by REUNION.",
    h1: "Charm Villa — 3BHK Private Villa in Udupi",
    lead:
      "REUNION Charm Villa is a 3BHK private villa in Badagabettu, Udupi, with attached suites and balcony living.",
  },
  "aradhya-villa": {
    title: "REUNION Aradhya Villa | 4BHK Luxury Villa in Udupi",
    description:
      "A multi-storey 4BHK luxury villa in Kunjibettu, Udupi, with a bathtub suite, event terrace and large dining area — ideal for big families.",
    h1: "Aradhya Villa — 4BHK Luxury Villa in Udupi",
    lead:
      "REUNION Aradhya Villa is a 4BHK luxury villa in Kunjibettu, Udupi, with a bathtub suite, closed event terrace and large dining area for big families.",
  },
  arya: {
    title: "REUNION Arya | Studio & Service Apartments in Udupi",
    description:
      "Independent 1BHK studio suites in Kunjibettu, Udupi, for couples, business travellers and small families. Arya Studio Stays by REUNION.",
    h1: "Arya — Studio & Service Apartments in Udupi",
    lead:
      "Arya offers studio and service apartment stays in Udupi — independent 1BHK suites in Kunjibettu for couples, business travellers and longer stays.",
  },
  krshna: {
    title: "REUNION Krshna | 2BHK Stay in Manipal, Udupi",
    description:
      "A modern 2-bedroom home in a quiet part of Manipal with a full kitchen and fast WiFi — ideal for visiting families. Krshna by REUNION.",
    h1: "Krshna — 2BHK Stay in Manipal",
    lead:
      "Krshna is a 2BHK stay in Manipal with a full kitchen and fast WiFi — ideal for families visiting MAHE or KMC Hospital.",
  },
  "ocean-waves": {
    title: "REUNION Ocean Waves | Beachfront Stay at Mattu Beach",
    description:
      "Three private beachfront units just 5 m from Mattu Beach, Udupi, each with a balcony and living area. Ocean Waves by REUNION.",
    h1: "Ocean Waves — Beachfront Stay at Mattu Beach",
    lead:
      "REUNION Ocean Waves has three private beachfront units just 5 m from Mattu Beach, Udupi, each with a balcony and living area.",
  },
  "regal-villa": {
    title: "REUNION Regal Villa | 2BHK Private Villa, Chitpady",
    description:
      "An air-conditioned 2-bedroom private villa in Chitpady, Udupi, with a terrace, balcony and full kitchen. Regal Villa by REUNION.",
    h1: "Regal Villa — 2BHK Private Villa in Chitpady",
    lead:
      "REUNION Regal Villa is a 2BHK private villa in Chitpady, Udupi, with a terrace, balcony and full kitchen — ideal for couples and small families.",
  },
  villa: {
    title: "REUNION Villa | 3BHK Garden Villa, Chitpady Udupi",
    description:
      "A 3-bedroom villa in Chitpady, Udupi, with garden views, a top-floor terrace and custom meals on request. A REUNION private stay.",
    h1: "Garden Villa — 3BHK Stay in Chitpady, Udupi",
    lead:
      "REUNION Villa is a 3BHK garden villa in Chitpady, Udupi, with garden views, a top-floor terrace and custom meals on request.",
  },
  "reunion-serene": {
    title: "REUNION Serene | Pool Villa Stay near Jog Falls, Shivamogga",
    description:
      "A private 4-bedroom pool villa near Shivamogga for up to 8 guests — year-round pool, garden and terrace. A peaceful stay near Jog Falls.",
    h1: "Reunion Serene — Private Pool Villa near Shivamogga & Jog Falls",
    lead:
      "Looking for a private stay near Jog Falls? Reunion Serene is a 4-bedroom Malnad pool villa near Shivamogga for up to 8 guests.",
  },
  "ocean-cafe": {
    title: "Ocean Café, Mattu Beach | Beach Café in Udupi | REUNION",
    description:
      "Beachfront café on Mattu Beach, Udupi — sunset views, fireplace lounge, seafood, coffee and candlelight dinners. Open daily 9:30 AM–10 PM.",
    h1: "Ocean Café — Beach Café on Mattu Beach, Udupi",
    lead:
      "Ocean Café is REUNION's beachfront cafe in Udupi, right on Mattu Beach — sunset views, a fireplace lounge, fresh seafood and specialty coffee.",
  },
};
