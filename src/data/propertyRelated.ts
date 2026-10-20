/** Guide internal links + similar stays (SEO); rendered as inline text links on property pages. */
export type RelatedLink = { label: string; href: string };

export const PROPERTY_RELATED: Record<string, RelatedLink[]> = {
  "ocean-elite": [
    { label: "Ocean Manor", href: "/properties/ocean-manor" },
    { label: "Hoode Beach", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
    { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
  ],
  "ocean-manor": [
    { label: "Ocean Elite", href: "/properties/ocean-elite" },
    { label: "villas for groups in Udupi", href: "/properties" },
    { label: "beach birthday", href: "/experiences/beach-birthday" },
  ],
  "ocean-givaah": [
    { label: "Ocean Daaffy", href: "/properties/ocean-daaffy" },
    { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
    { label: "spa in Udupi", href: "/wellness" },
  ],
  "ocean-royal": [
    { label: "Kapu Beach", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
    { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
    { label: "Ocean Givaah", href: "/properties/ocean-givaah" },
  ],
  "de-homes": [
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "Arya studio apartments", href: "/properties/arya" },
    { label: "Ocean Café", href: "/dining" },
  ],
  "de-square": [
    { label: "hotel stays in Udupi", href: "/properties/category/hotel-stays" },
    { label: "De Homes", href: "/properties/de-homes" },
    { label: "villas in Udupi", href: "/properties" },
  ],
  "ocean-daaffy": [
    { label: "Ocean Givaah", href: "/properties/ocean-givaah" },
    { label: "Uchila Beach", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
    { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
  ],
  "ocean-hridayam": [
    { label: "Ocean Café", href: "/dining" },
    { label: "Ocean Waves", href: "/properties/ocean-waves" },
    { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
  ],
  "ocean-bliss": [
    { label: "Malpe Beach", href: "/blogs/top-10-beaches-to-visit-in-udupi" },
    { label: "beach villas in Udupi", href: "/properties/category/beach-villas" },
    { label: "2-day Udupi itinerary", href: "/blogs/2-day-udupi-itinerary" },
  ],
  "marina-villa": [
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "Charm Villa", href: "/properties/charm-villa" },
    { label: "De Homes", href: "/properties/de-homes" },
  ],
  "charm-villa": [
    { label: "Marina Villa", href: "/properties/marina-villa" },
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "villas in Udupi", href: "/properties" },
  ],
  "aradhya-villa": [
    { label: "villas for groups in Udupi", href: "/properties" },
    { label: "beach birthday", href: "/experiences/beach-birthday" },
    { label: "Arya", href: "/properties/arya" },
  ],
  arya: [
    { label: "De Homes", href: "/properties/de-homes" },
    { label: "Krshna, Manipal", href: "/properties/krshna" },
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
  ],
  krshna: [
    { label: "Arya", href: "/properties/arya" },
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "2-day Udupi itinerary", href: "/blogs/2-day-udupi-itinerary" },
  ],
  "ocean-waves": [
    { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
    { label: "Ocean Café", href: "/dining" },
    { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
  ],
  "regal-villa": [
    { label: "Garden Villa (Chitpady)", href: "/properties/villa" },
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "De Homes", href: "/properties/de-homes" },
  ],
  villa: [
    { label: "Regal Villa", href: "/properties/regal-villa" },
    { label: "city villas in Udupi", href: "/properties/category/city-stays" },
    { label: "villas in Udupi", href: "/properties" },
  ],
  "reunion-serene": [
    { label: "villas in Udupi", href: "/properties" },
    { label: "spa & wellness", href: "/wellness" },
    { label: "Shivamogga stays", href: "/properties/category/shivamogga-stays" },
  ],
  "ocean-cafe": [
    { label: "candle light dinner in Udupi", href: "/experiences/candlelight-dinner" },
    { label: "beach birthday celebration", href: "/experiences/beach-birthday" },
    { label: "Ocean Hridayam", href: "/properties/ocean-hridayam" },
  ],
};
