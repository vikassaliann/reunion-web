/** On-Page SEO Report title/H1/meta overrides (no imports — avoids circular deps). */
export const ON_PAGE_OVERRIDES: Record<
  string,
  Partial<{
    title: string;
    description: string;
    h1: string;
    lead: string;
    imageAlt: string;
  }>
> = {
  "/": {
    title: "REUNION | Luxury Villas & Beach Stays in Udupi, Karnataka",
    h1: "Luxury Villas & Beach Stays in Udupi",
    description:
      "Luxury beach and city villas, Ocean Café on Mattu Beach, candlelight dinners, and beach weddings & events in Udupi, Karnataka. Book with REUNION.",
  },
  "/properties": {
    title: "Places to Stay in Udupi | Villas, Suites & Hotels | REUNION",
    h1: "Places to Stay in Udupi",
    description:
      "Places to stay in Udupi, chosen by REUNION: beachfront villas, city homes, hotel suites, a pool villa near Shivamogga, and coastal events.",
    lead:
      "Explore REUNION's villas and stays in Udupi — private beach villas and city villas for families, couples and groups, an easy weekend trip from Bangalore.",
  },
  "/properties/category/beach-villas": {
    title: "Beach Stay in Udupi | Beachfront Villas | REUNION",
    h1: "Beach Villas in Udupi",
    description:
      "Beach stays in Udupi, steps from the sand: private beachfront villas with sea-facing balconies for couples, families and groups. Enquire with REUNION.",
  },
  "/properties/category/city-stays": {
    title: "Homestays in Udupi near Krishna Matha | REUNION",
    h1: "Homestays & City Villas in Udupi",
    description:
      "Homestays in Udupi with the privacy of a villa: furnished homes near Sri Krishna Matha with kitchens, AC bedrooms and parking. By REUNION.",
  },
  "/wellness": {
    title: "Spa & Ayurveda in Udupi | Wellness at REUNION",
    h1: "Spa & Ayurveda in Udupi",
    description:
      "Ayurveda, beach yoga, spa, meditation and naturopathy in Udupi with Tapovana Life, Manipal — wellness add-ons for REUNION guests.",
  },
  "/events": {
    title: "Beach Weddings & Event Venue in Udupi | REUNION",
    h1: "Beach Weddings & Events in Udupi",
    description:
      "Plan beach weddings, private celebrations and coastal events at REUNION in Udupi, with Gutthu Weddings Planner coordination.",
  },
  "/about": {
    title: "About REUNION | Villa & Hospitality Management, Udupi",
    h1: "About REUNION",
    description:
      "REUNION is a hospitality management company in Udupi, Karnataka, trusted by 30+ property owners. Meet the team behind our villas, café and stays.",
  },
  "/blogs": {
    title: "Udupi Travel Guides & Local Tips | REUNION Blog",
    h1: "Udupi Travel Guides",
    description:
      "Local guides to Udupi — the best beaches, tourist places, a 2-day itinerary and when to visit, written by the REUNION team in Udupi.",
    lead:
      "Local guides to Udupi — beaches, tourist places, itineraries and where to stay, written by the REUNION team in Udupi.",
  },
  "/properties/de-homes": {
    title: "REUNION De Homes | Suites near Krishna Temple, Udupi",
    h1: "De Homes — Premium Suites near Sri Krishna Temple",
    description:
      "Boutique suites near Sri Krishna Temple, Udupi — Presidential Suite, balcony rooms and executive rooms. De Homes by REUNION, Udupi city.",
  },
  "/properties/d-square": {
    title: "REUNION D Square | Hotel & Resort in Koteshwara, Udupi",
    h1: "REUNION D Square — Hotel & Resort in Koteshwara, Udupi",
    description:
      "REUNION D Square in Koteshwara, Udupi — hotel and resort rooms on the Udupi–Kundapura coast for families, pilgrims and coastal travellers.",
    lead:
      "REUNION D Square in Koteshwara, Udupi offers hotel and resort rooms on the coastal belt between Udupi and Kundapura.",
    imageAlt: "REUNION D Square hotel in Koteshwara, Udupi",
  },
  "/properties/arya": {
    title: "REUNION Arya | Studio Apartments in Udupi",
    h1: "Arya — Studio Apartments in Udupi",
  },
  "/properties/reunion-serene": {
    title: "REUNION Serene | Pool Villa near Shivamogga & Jog Falls",
    h1: "Reunion Serene — Pool Villa near Shivamogga",
    description:
      "A private 4-bedroom Malnad holiday home near Shivamogga with a year-round pool, garden and terrace — for up to 8 guests. REUNION Serene.",
  },
};
