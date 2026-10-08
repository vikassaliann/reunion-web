/** Dining page copy — do not paraphrase */

export const OCEAN_CAFE_OVERVIEW_LEAD =
  "REUNION Reunion Ocean Café is a luxury property and beach stay located in Mattu Beach, Udupi, Udupi district.";

export const OCEAN_CAFE_TAGLINE = "Where the Ocean Meets Every Sip & Bite";

export const OCEAN_CAFE_INTRO =
  "Located right by Mattu Beach in Udupi, Reunion Ocean Cafe is a highly-rated beachside sanctuary celebrated for its stunning sunset views, cozy fireplace setup, and budget-friendly menu. Enjoy continental and Chinese delicacies, fresh seafood, specialty coffee, and refreshing mocktails—perfect for romantic candlelight dinners and group gatherings.";

export const OCEAN_CAFE_META =
  "Mattu Beach, Kapu Road | Mon - Sun: 9:30 AM – 10:00 PM | Curated Music & Fireplace";

export const OCEAN_CAFE_VIDEO = "/properties/ocean cafe/cafevd.mp4";

const oc = (n: number) => `/properties/ocean cafe/oc${n}.png`;

/** Display order for gallery carousel */
export const OCEAN_CAFE_GALLERY_ORDER = [4, 2, 3, 5, 1, 6] as const;

/** Captions paired to each oc image (order: 4, 2, 3, 5, 1, 6) */
const CAPTIONS_BY_OC: Record<
  (typeof OCEAN_CAFE_GALLERY_ORDER)[number],
  { title: string; caption: string }
> = {
  1: {
    title: "Coastal Gastronomy",
    caption: "Fresh local delicacies & classic dishes",
  },
  2: {
    title: "Specialty Coffee & Signature Mocktails",
    caption: "Specialty coffee, and refreshing mocktails",
  },
  3: {
    title: "Sunset Solace",
    caption: "Stunning sunset views",
  },
  4: {
    title: "Seaside Solitude",
    caption: "Peaceful oceanfront tables facing the waves",
  },
  5: {
    title: "Morning Sanctuary",
    caption: "Breezy outdoor lounge under thatched roofs",
  },
  6: {
    title: "Romantic Candlelight Dinner",
    caption: "Perfect for romantic candlelight dinners and group gatherings",
  },
};

export type OceanCafeGallerySlide = {
  image: string;
  title: string;
  caption: string;
};

export const OCEAN_CAFE_GALLERY_SLIDES: OceanCafeGallerySlide[] =
  OCEAN_CAFE_GALLERY_ORDER.map((num) => ({
    image: oc(num),
    ...CAPTIONS_BY_OC[num],
  }));

export const OCEAN_CAFE_GALLERY_IMAGES = OCEAN_CAFE_GALLERY_SLIDES.map((s) => s.image);

export const OCEAN_CAFE_PHONE_DISPLAY = "+91 9972231289";

export const OCEAN_CAFE_HERO_IMAGE = "/properties/ocean cafe/herooc.png";
export const OCEAN_CAFE_VIDEO_POSTER = oc(4);
