/** Guest / room labels for listing cards (On-Page Report). */
export const PROPERTY_GUESTS: Record<string, string> = {
  "ocean-elite": "Up to 6 guests",
  "ocean-manor": "Up to 12 guests (3 units)",
  "ocean-givaah": "Up to 9 guests",
  "ocean-royal": "Up to 15 guests",
  "ocean-daaffy": "Up to 9 guests",
  "ocean-hridayam": "Up to 6 guests",
  "ocean-bliss": "Up to 6 guests",
  "marina-villa": "Up to 10 guests",
  "charm-villa": "Up to 9 guests",
  "aradhya-villa": "Up to 12 guests",
  arya: "Up to 3 guests / suite",
  krshna: "Up to 6 guests",
  "ocean-waves": "Up to 12 guests (3 units)",
  "regal-villa": "Up to 6 guests",
  villa: "Up to 10 guests",
  "de-homes": "16 rooms",
  "de-square": "Hotel rooms",
  "reunion-serene": "Up to 8 guests",
};

/** Distance line for city / hotel listing cards (On-Page Report). */
export const CITY_DISTANCE: Record<string, string> = {
  "de-homes": "~5–10 min walk to Sri Krishna Matha",
  "de-square": "Koteshwara — coastal highway base",
  "marina-villa": "~10–15 min to Sri Krishna Matha",
  "charm-villa": "~10–15 min to Sri Krishna Matha",
  "aradhya-villa": "~10 min to Sri Krishna Matha · Kunjibettu",
  arya: "~10 min to Sri Krishna Matha · Kunjibettu",
  krshna: "~5–10 min to MAHE / KMC Manipal",
  "regal-villa": "~10–15 min to Sri Krishna Matha · Chitpady",
  villa: "~10–15 min to Sri Krishna Matha · Chitpady",
};

export const BEACH_GROUPS: {
  beach: string;
  blogHash: string;
  walkNote: string;
  propertyIds: string[];
}[] = [
  {
    beach: "Mattu Beach",
    blogHash: "mattu-beach",
    walkNote: "Beachfront to ~5 m from the sand",
    propertyIds: ["ocean-hridayam", "ocean-waves"],
  },
  {
    beach: "Hoode Beach",
    blogHash: "hoode-padutonse-beach",
    walkNote: "Direct beach access from the lawn",
    propertyIds: ["ocean-elite", "ocean-manor"],
  },
  {
    beach: "Uchila Beach",
    blogHash: "uchila-beach",
    walkNote: "~100–200 m from the shore",
    propertyIds: ["ocean-givaah", "ocean-daaffy"],
  },
  {
    beach: "Kapu Beach",
    blogHash: "kapu-beach-lighthouse",
    walkNote: "~50 m from the sea",
    propertyIds: ["ocean-royal"],
  },
  {
    beach: "Malpe Beach",
    blogHash: "malpe-beach",
    walkNote: "~800 m from Malpe Beach",
    propertyIds: ["ocean-bliss"],
  },
];
