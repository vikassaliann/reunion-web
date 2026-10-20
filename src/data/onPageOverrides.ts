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
      "Luxury beach and city villas, a beachfront café, candlelight dinners and a wedding venue in Udupi, Karnataka. Book your stay with REUNION.",
  },
  "/properties": {
    title: "Villas & Stays in Udupi | Beach & City Villas | REUNION",
    h1: "Villas & Stays in Udupi",
    description:
      "Browse all REUNION villas and stays in Udupi — beachfront villas near Malpe, Kapu, Mattu and Hoode, plus city villas near Sri Krishna Matha.",
    lead:
      "Explore REUNION's villas and stays in Udupi — private beach villas and city villas for families, couples and groups, an easy weekend trip from Bangalore.",
  },
  "/properties/category/beach-villas": {
    title: "Beach Villas in Udupi | Beachfront Stays | REUNION",
    h1: "Beach Villas in Udupi",
    description:
      "Beachfront and near-shore villas in Udupi — steps from Malpe, Mattu, Kapu, Hoode and Uchila beaches. Compare REUNION beach villas and enquire.",
  },
  "/properties/category/city-stays": {
    title: "City Villas & Suites in Udupi near Krishna Temple | REUNION",
    h1: "City Villas & Suites in Udupi",
    description:
      "City villas and premium suites in Udupi — Chitpady, Kunjibettu and Manipal, close to Sri Krishna Matha. Ideal for families and temple visits.",
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
