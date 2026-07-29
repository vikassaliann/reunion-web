"use client";

import { useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";

interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  price: string;
  bedrooms: number;
  guests?: number;
  acreage?: string;
  sqft?: string;
  completion?: string;
  amenities: string[];
  heroImage: string;
  gallery: string[];
}

interface PropertyDetailSectionProps {
  property: Property;
  mapLink?: string;
}

// Phone numbers per property
const PROPERTY_PHONES: Record<string, string> = {
  "ocean-waves":    "+91 9980208289",
  "ocean-elite":    "+91 9980208289",
  "ocean-manor":    "+91 9980208289",
  "ocean-bliss":    "+91 9980208289",
  "ocean-daaffy":   "+91 9980208289",
  "arya":           "+91 9980208289",
  "marina-villa":   "+91 9980208289",
  "krshna":         "+91 9980208289",
  "charm-villa":    "+91 9980208289",
  "de-homes":       "+91 9380740060",
  "aradhya-villa":  "+91 9980208289",
  "ocean-hridayam": "+91 9980208289",
  "ocean-cafe":     "+91 9972231289",
  "ocean-givaah":   "+91 9980208289",
  "villa":          "+91 9980208289",
  "ocean-royal":    "+91 9980208289",
  "regal-villa":    "+91 9980208289",
};

// Guest/Room capacity info per property
const GUEST_INFO: Record<string, string[]> = {
  "ocean-elite":    ["Up to 6 Guests"],
  "ocean-manor":    ["3 Rooms", "1st Floor — Up to 6 Guests", "Ground Floor — 2 Rooms, Up to 3 Guests Each"],
  "ocean-givaah":   ["Up to 9 Guests"],
  "ocean-royal":    ["Up to 15 Guests"],
  "ocean-daaffy":   ["Up to 9 Guests"],
  "ocean-hridayam": ["Up to 6 Guests"],
  "ocean-bliss":    ["Up to 6 Guests"],
  "marina-villa":   ["Up to 10 Guests"],
  "charm-villa":    ["Up to 9 Guests"],
  "aradhya-villa":  ["Up to 12 Guests"],
  "arya":           ["2 Rooms", "Each Room — Up to 3 Guests"],
  "krshna":         ["Up to 6 Guests"],
  "ocean-waves":    ["3 Rooms", "1 Room — Up to 6 Guests", "2 Rooms — Up to 3 Guests Each"],
  "regal-villa":    ["Up to 6 Guests"],
  "villa":          ["Up to 10 Guests"],
  "de-homes":       ["16 Premium Rooms"],
};

// Property Guidelines & Facilities per property
const PROPERTY_GUIDELINES: Record<string, { power: string; highlightDetail: string }> = {
  "ocean-elite":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Spacious Private Lawn" },
  "ocean-manor":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Independent Ground & First Floor Layouts" },
  "ocean-givaah":   { power: "Heavy-Duty Generator Backup", highlightDetail: "Private Pool (4ft Depth)" },
  "ocean-royal":    { power: "Heavy-Duty Generator Backup", highlightDetail: "Heritage Farmhouse Setting" },
  "de-homes":       { power: "Central City Power Grid", highlightDetail: "Premium Suites (Standard to Presidential)" },
  "ocean-daaffy":   { power: "Reliable UPS Power Backup", highlightDetail: "Tranquil Natural Surroundings" },
  "ocean-hridayam": { power: "Reliable UPS Power Backup", highlightDetail: "Split-Level Family Layout" },
  "ocean-bliss":    { power: "Reliable UPS Power Backup", highlightDetail: "Open Compound Estate" },
  "marina-villa":   { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & AC" },
  "charm-villa":    { power: "Reliable UPS Power Backup", highlightDetail: "First Floor 3BHK Residence" },
  "aradhya-villa":  { power: "Central City Power Grid", highlightDetail: "4BHK with Bathtub & Closed Terrace" },
  "arya":           { power: "Reliable UPS Power Backup", highlightDetail: "2 Independent 1BHKs (1st Floor)" },
  "krshna":         { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & Parking" },
  "ocean-waves":    { power: "AC, Geyser & Refrigerator Equipped", highlightDetail: "CCTV Secured / Quiet Living" },
  "regal-villa":    { power: "Balcony & Terrace Access", highlightDetail: "Free Private Parking & WiFi" },
  "villa":          { power: "3 Bedrooms (2 AC + 1 Non-AC)", highlightDetail: "Meals Arranged on Request" },
  "ocean-cafe":     { power: "Fireplace & Live Music (Select Days)", highlightDetail: "Open Daily: 9:30 AM – 10:00 PM" },
};

// Property FAQs — derived exclusively from each property's actual details
interface FAQ {
  q: string;
  a: string;
}

const PROPERTY_FAQS: Record<string, FAQ[]> = {
  "ocean-elite": [
    { q: "How many bedrooms does Ocean Elite have?", a: "Ocean Elite is a 2-bedroom villa. One of the bedrooms has a beautiful beach view with a private balcony." },
    { q: "How close is Ocean Elite to the beach?", a: "The villa offers direct beach access — the spacious lawn leads straight to the beach." },
    { q: "What amenities are available at Ocean Elite?", a: "The villa comes with a fully equipped kitchen, refrigerator, WiFi, geyser, air conditioning, and a spacious lawn." },
    { q: "Is there power backup at Ocean Elite?", a: "Yes, Ocean Elite has heavy-duty generator backup to ensure uninterrupted power." },
    { q: "How many guests can Ocean Elite accommodate?", a: "Ocean Elite can accommodate up to 6 guests." },
  ],
  "ocean-manor": [
    { q: "What is the layout of Ocean Manor?", a: "Ocean Manor has a 2BHK on the first floor (one sea-facing bedroom and one river-facing bedroom with a large beach-facing balcony) and 2 independent one-bedroom halls on the ground floor." },
    { q: "How many guests can stay at Ocean Manor?", a: "Ocean Manor has 3 bookable units — the first floor accommodates up to 6 guests, while each ground floor room accommodates up to 3 guests." },
    { q: "Does Ocean Manor have beach access?", a: "Yes, there is a lawn with beach access through scenic rock beds." },
    { q: "Is there power backup at Ocean Manor?", a: "Yes, Ocean Manor has heavy-duty generator backup." },
    { q: "What views are available at Ocean Manor?", a: "The property features sea-facing and river-facing bedrooms, along with a huge beach-facing balcony in the living area." },
  ],
  "ocean-givaah": [
    { q: "Does Ocean Givaah have a private pool?", a: "Yes, Ocean Givaah features a private pool with a depth of 4 feet." },
    { q: "How far is Ocean Givaah from the beach?", a: "The beach is just 200 meters from the property, providing direct access to the sand." },
    { q: "How many bedrooms and guests does Ocean Givaah accommodate?", a: "Ocean Givaah is a 3BHK villa that can accommodate up to 9 guests." },
    { q: "What amenities are available at Ocean Givaah?", a: "The villa features spacious bedrooms, a cozy living area, fully equipped kitchen, ocean-view terrace, lush garden, air conditioning, high-speed WiFi, and on-site parking." },
    { q: "Is there power backup at Ocean Givaah?", a: "Yes, the property is equipped with heavy-duty generator backup." },
    { q: "Is food delivery available at Ocean Givaah?", a: "Yes, a local app and local restaurants are available for food delivery to the property." },
  ],
  "ocean-royal": [
    { q: "What type of property is Ocean Royal?", a: "Ocean Royal is a charming heritage villa surrounded by coconut trees and greenery, giving it the appearance of a farmhouse with expansive space." },
    { q: "How close is Ocean Royal to the beach?", a: "The villa is situated just 50 meters from the beach, providing easy access to the shore." },
    { q: "How many guests can Ocean Royal accommodate?", a: "Ocean Royal can accommodate up to 15 guests across its 3 bedrooms." },
    { q: "What amenities are available at Ocean Royal?", a: "The villa offers a refrigerator, air conditioning, WiFi, gas stove kitchen, and generator backup." },
    { q: "Is there power backup at Ocean Royal?", a: "Yes, Ocean Royal has heavy-duty generator backup." },
  ],
  "de-homes": [
    { q: "What type of property is De Homes?", a: "Reunion De Homes is a premium suites property with 16 rooms, located in the absolute center of Udupi city, close to the sacred Udupi Sri Krishna Matha." },
    { q: "What room categories are available at De Homes?", a: "Room categories include Standard Double Room, Standard Twin Room, Deluxe Double Room, Deluxe Double Room with Balcony, and Presidential Suite." },
    { q: "Who is De Homes ideal for?", a: "De Homes is ideal for devotees on a spiritual journey, corporate professionals, and families on vacation." },
    { q: "What is the power backup situation at De Homes?", a: "De Homes is connected to the central city power grid, ensuring reliable power supply." },
    { q: "How many rooms does De Homes have?", a: "De Homes has 16 premium rooms across multiple categories." },
  ],
  "ocean-daaffy": [
    { q: "How many bedrooms does Ocean Daaffy have?", a: "Ocean Daaffy is a 3-bedroom villa." },
    { q: "How close is Ocean Daaffy to the beach?", a: "The villa is located just 100 meters from a pristine beach." },
    { q: "How many guests can Ocean Daaffy accommodate?", a: "Ocean Daaffy can accommodate up to 9 guests." },
    { q: "Is there power backup at Ocean Daaffy?", a: "Yes, the property is backed by a reliable UPS power system." },
    { q: "What is the setting like at Ocean Daaffy?", a: "The villa is set in a peaceful, tranquil natural surrounding — ideal for those seeking a coastal retreat amidst nature." },
  ],
  "ocean-hridayam": [
    { q: "What is the layout of Ocean Hridayam?", a: "Ocean Hridayam is a 2BHK villa with one bedroom on the ground floor and another on the first floor — a split-level family layout." },
    { q: "How many guests can Ocean Hridayam accommodate?", a: "Ocean Hridayam can accommodate up to 6 guests." },
    { q: "Does Ocean Hridayam have a kitchen?", a: "Yes, the villa is equipped with a kitchen with essential utensils, making your stay feel just like home." },
    { q: "Does Ocean Hridayam have a beach view?", a: "Yes, the first floor features a stunning beach-facing balcony where you can enjoy the sound of the waves and breathtaking views." },
    { q: "Is there power backup at Ocean Hridayam?", a: "Yes, the property has reliable UPS power backup." },
  ],
  "ocean-bliss": [
    { q: "How many bedrooms does Ocean Bliss have?", a: "Ocean Bliss is a 2BHK property with one common bathroom." },
    { q: "How far is Ocean Bliss from the beach?", a: "The beach is 800 meters away from the property." },
    { q: "How many guests can Ocean Bliss accommodate?", a: "Ocean Bliss can accommodate up to 6 guests." },
    { q: "What type of property is Ocean Bliss?", a: "It is an open compound property offering a simple, peaceful retreat with all the basic amenities." },
    { q: "Is there power backup at Ocean Bliss?", a: "Yes, the property has UPS power backup." },
  ],
  "marina-villa": [
    { q: "Where is Marina Villa located?", a: "Marina Villa is located in Kannarpady, in the heart of Udupi city." },
    { q: "How many bedrooms does Marina Villa have?", a: "Marina Villa is a 3BHK property." },
    { q: "How many guests can Marina Villa accommodate?", a: "Marina Villa can accommodate up to 10 guests." },
    { q: "What amenities are available at Marina Villa?", a: "The villa offers air conditioning, WiFi, parking space, kitchen facility, and UPS power backup." },
    { q: "Is there power backup at Marina Villa?", a: "Yes, UPS power backup is available for an uninterrupted stay." },
  ],
  "charm-villa": [
    { q: "What is the layout of Charm Villa?", a: "Charm Villa is a 3BHK property on the first floor. One bedroom has an attached bathroom, and one common bathroom is shared between the other two bedrooms." },
    { q: "How many guests can Charm Villa accommodate?", a: "Charm Villa can accommodate up to 9 guests." },
    { q: "Is there power backup at Charm Villa?", a: "Yes, UPS power backup is available." },
    { q: "Where is Charm Villa located?", a: "Charm Villa is located in Badagabettu, Udupi." },
  ],
  "aradhya-villa": [
    { q: "What is the layout of Aradhya Villa?", a: "Aradhya Villa is a 4BHK across three levels — ground floor has a living area, kitchen, and one bedroom; first floor has two bedrooms with a balcony; second floor has a luxurious bedroom with a bathtub, plus a closed terrace." },
    { q: "How close is Aradhya Villa to Sri Krishna Temple?", a: "Aradhya Villa is located just 700 meters from the famous Udupi Krishna Temple." },
    { q: "How many guests can Aradhya Villa accommodate?", a: "Aradhya Villa can accommodate up to 12 guests." },
    { q: "Does Aradhya Villa have a kitchen?", a: "Yes, the ground floor features a well-equipped kitchen with basic utensils." },
    { q: "Is the closed terrace suitable for gatherings?", a: "Yes, the closed terrace area on the second floor is excellent for small family gatherings or celebrations." },
    { q: "What makes Aradhya Villa unique?", a: "Each floor has attached bathrooms, the second floor bedroom features a bathtub for added indulgence, and the property is close to major tourist attractions and Udupi's best local cuisines." },
  ],
  "arya": [
    { q: "What is the layout of Arya?", a: "Arya has 2 independent 1BHK studio rooms on the first floor, each with all basic amenities." },
    { q: "How many guests can each Arya unit accommodate?", a: "Each room can accommodate up to 3 guests." },
    { q: "Is parking available at Arya?", a: "Yes, open parking is available right next to the compound." },
    { q: "Is there power backup at Arya?", a: "Yes, UPS power backup is available." },
    { q: "Is the property owner nearby?", a: "Yes, the owner of the property stays nearby for any assistance." },
  ],
  "krshna": [
    { q: "Where is Krshna located?", a: "Krshna is a 2BHK property located in Manipal, Udupi." },
    { q: "How many guests can Krshna accommodate?", a: "Krshna can accommodate up to 6 guests." },
    { q: "What amenities are available at Krshna?", a: "The villa offers a fully furnished kitchen, free WiFi, parking space, refrigerator, and UPS power backup." },
    { q: "Is there power backup at Krshna?", a: "Yes, UPS power backup is available." },
  ],
  "ocean-waves": [
    { q: "What is the layout of Ocean Waves?", a: "Ocean Waves has 3 independent units — a 1BHK on the first floor and 2 independent one-bedroom halls on the ground floor, each with a balcony, living area, bedroom, and attached bathroom." },
    { q: "How close is Ocean Waves to the beach?", a: "The beach is hardly 5 meters from the property — just cross the road and you're on the sand." },
    { q: "What amenities does each unit have?", a: "Each unit features AC, geyser, mini fridge, microwave, and kettle." },
    { q: "Is food delivery available at Ocean Waves?", a: "Yes, food delivery via Swiggy and Zomato is available. Home-made food can also be delivered if pre-ordered." },
    { q: "Is there security at Ocean Waves?", a: "Yes, CCTV surveillance is in place for added security." },
    { q: "How many guests can Ocean Waves accommodate?", a: "Ocean Waves has 3 bookable rooms — one room accommodates up to 6 guests, and the other two rooms accommodate up to 3 guests each." },
  ],
  "regal-villa": [
    { q: "How many bedrooms does Regal Villa have?", a: "Regal Villa has 2 separate bedrooms with air conditioning." },
    { q: "How many guests can Regal Villa accommodate?", a: "Regal Villa can accommodate up to 6 guests." },
    { q: "What amenities are available at Regal Villa?", a: "The villa offers a balcony, terrace, free private parking, free WiFi, fully equipped kitchen, and a flat-screen TV." },
    { q: "How far is the nearest airport from Regal Villa?", a: "The nearest airport is Mangalore International Airport, 54 km from the villa." },
    { q: "Where is Regal Villa located?", a: "Regal Villa is located in Chitpady, Udupi." },
  ],
  "villa": [
    { q: "How many bedrooms does Villa have?", a: "Villa has 3 bedrooms — 2 with AC and 1 non-AC." },
    { q: "How many guests can Villa accommodate?", a: "Villa can accommodate up to 10 guests." },
    { q: "Can meals be arranged at Villa?", a: "Yes, Breakfast, Lunch, and Dinner (including Continental) can be arranged if ordered prior." },
    { q: "How far is Villa from the beach?", a: "The nearest beach is 8 km from the villa." },
    { q: "What are the nearby landmarks?", a: "The nearest Temple/Church/Mosque is 2 km away, Manipal University is 5 km, and the nearest International Airport is 43 km." },
    { q: "What amenities are available at Villa?", a: "The villa features a terrace with garden views, balcony, free private parking, air conditioning, TV, and an in-kitchen." },
  ],
  "ocean-cafe": [
    { q: "What type of dining does Ocean Café offer?", a: "Ocean Café serves continental and Chinese cuisine, gourmet coastal snacks, artisanal burgers, fresh seafood, specialty coffees, refreshing mocktails, and a dedicated vegetarian and vegan selection." },
    { q: "Where is Ocean Café located?", a: "Ocean Café is situated directly on the pristine shoreline of Mattu Beach in Udupi, Karnataka." },
    { q: "Does Ocean Café host special events?", a: "Yes, the café is recommended for romantic candlelight dinners, beach birthday celebrations, and small private events." },
    { q: "Does Ocean Café have live music?", a: "Yes, the cozy lounge features a fireplace and live musical performances on select occasions." },
    { q: "What is the ambiance like at Ocean Café?", a: "Guests can relax in breezy outdoor seating areas facing the rolling waves or unwind in a cozy indoor lounge, with stunning sunset vistas over the Arabian Sea." },
  ],
};

// Nearby Tourist Places — 4 route groups with accurate Google Maps search URLs
export interface TouristPlace {
  name: string;
  mapUrl: string;
}

export interface RouteGroup {
  title: string;
  places: TouristPlace[];
}

export const TOURIST_ROUTES: RouteGroup[] = [
  {
    title: "Udupi → Malpe Route",
    places: [
      { name: "Sri Krishna Matha", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Krishna+Matha+Udupi+Karnataka" },
      { name: "Anantheshwara Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Anantheshwara+Temple+Udupi+Karnataka" },
      { name: "Chandramouleshwara Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Chandramouleshwara+Temple+Udupi+Karnataka" },
      { name: "Bhujanga Park", mapUrl: "https://www.google.com/maps/search/?api=1&query=Bhujanga+Park+Udupi+Karnataka" },
      { name: "Hasta Shilpa Heritage Village", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hasta+Shilpa+Heritage+Village+Manipal+Karnataka" },
      { name: "Malpe Sea Walk", mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Sea+Walk+Malpe+Karnataka" },
      { name: "Malpe Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Malpe+Beach+Udupi+Karnataka" },
      { name: "Daria Bahadurgad Fort (Sea Fort)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Daria+Bahadurgad+Fort+Malpe+Karnataka" },
      { name: "St. Mary's Island (Boat from Malpe)", mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Marys+Island+Malpe+Karnataka" },
      { name: "Delta Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Delta+Beach+Kodi+Bengre+Udupi" },
      { name: "Kodi Bengre Delta", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodi+Bengre+Delta+Point+Udupi" },
    ],
  },
  {
    title: "Udupi → Kapu → Mangaluru Route",
    places: [
      { name: "Mattu Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mattu+Beach+Udupi+Karnataka" },
      { name: "Kapu Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Beach+Udupi+Karnataka" },
      { name: "Kapu Lighthouse", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kapu+Lighthouse+Kaup+Karnataka" },
      { name: "Shree Hosa Marigudi Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Shree+Hosa+Marigudi+Temple+Kaup+Karnataka" },
      { name: "Padubidri Blue Flag Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Padubidri+Blue+Flag+Beach+Karnataka" },
      { name: "Uchila Mahalakshmi Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Uchila+Mahalakshmi+Temple+Udupi+Karnataka" },
      { name: "Hejamady Scenic Bridge", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hejamadi+Bridge+Karnataka" },
    ],
  },
  {
    title: "Udupi → Brahmavar → Kundapura Route",
    places: [
      { name: "Saligrama Kayaking (Swarna River)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Saligrama+Kayaking+Udupi+Karnataka" },
      { name: "Anegudde Sri Vinayaka Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Anegudde+Sri+Vinayaka+Temple+Kumbhashi" },
      { name: "Ottinene View Point", mapUrl: "https://www.google.com/maps/search/?api=1&query=Ottinene+View+Point+Byndoor+Karnataka" },
      { name: "Maravanthe Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Maravanthe+Beach+Kundapura+Karnataka" },
      { name: "Byndoor Beach", mapUrl: "https://www.google.com/maps/search/?api=1&query=Byndoor+Beach+Karnataka" },
      { name: "Kollur Mookambika Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kollur+Mookambika+Temple+Karnataka" },
      { name: "Kodachadri Hills", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kodachadri+Hills+Karnataka" },
    ],
  },
  {
    title: "Udupi → Karkala → Hebri Route",
    places: [
      { name: "Pajaka Kshetra", mapUrl: "https://www.google.com/maps/search/?api=1&query=Pajaka+Kshetra+Udupi+Karnataka" },
      { name: "Hiriyadka Veerabhadra Temple", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hiriyadka+Veerabhadra+Temple+Karnataka" },
      { name: "St. Lawrence Shrine, Attur", mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Lawrence+Shrine+Attur+Karkala" },
      { name: "Karkala Gomateshwara Statue", mapUrl: "https://www.google.com/maps/search/?api=1&query=Gomateshwara+Statue+Karkala+Karnataka" },
      { name: "Chaturmukha Basadi", mapUrl: "https://www.google.com/maps/search/?api=1&query=Chaturmukha+Basadi+Karkala+Karnataka" },
      { name: "Varanga Jain Temple & Lake", mapUrl: "https://www.google.com/maps/search/?api=1&query=Varanga+Jain+Temple+Karkala+Karnataka" },
    ],
  },
];

export default function PropertyDetailSection({ property, mapLink }: PropertyDetailSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touristOpen, setTouristOpen] = useState(false);
  const [expandedRoutes, setExpandedRoutes] = useState<Record<number, boolean>>({});
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});

  const scrollToForm = () => {
    const isMobile = window.innerWidth < 1024;
    const targetId = isMobile ? "reserve-form-container-mobile" : "reserve-form-container";
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.heroImage];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleRoute = (idx: number) => {
    setExpandedRoutes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Highlights: bedrooms + amenities only (no guest count — not provided by user)
  const highlights: string[] = property.bedrooms > 0
    ? [
        `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`,
        ...property.amenities,
      ]
    : property.amenities;

  const guestInfo = GUEST_INFO[property.id];

  return (
    <section className="bg-[#060606] w-full border-t border-[#C9A84C]/10">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 py-16 space-y-12">
        {/* Property Title Block */}
        <div className="space-y-4">
          <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C]/70 uppercase block">
            {property.location}
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-[2.8rem] font-light text-white leading-tight">
            {property.name}
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A84C]/30 mt-2"></div>
        </div>

        {/* Scrollable Gallery Carousel */}
        <div className="relative group w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-[#C9A84C]/25 scrollbar-track-transparent"
            style={{ scrollbarWidth: "thin" }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="flex-none w-[85%] md:w-[65%] lg:w-[55%] aspect-[16/10] snap-center rounded-lg overflow-hidden border border-[#C9A84C]/15 relative bg-[#070707] shadow-lg group-hover:border-[#C9A84C]/30 transition-all duration-500"
              >
                <img
                  src={src}
                  alt={`${property.name} gallery image ${index + 1}`}
                  className={`w-full h-full transition-transform duration-700 hover:scale-105 ${
                    src.includes("ocean cafe") && (src.includes("ocean6") || src.includes("ocean7") || src.includes("ocean8") || src.includes("ocean9"))
                      ? "object-contain bg-black/40"
                      : "object-cover"
                  }`}
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[9px] tracking-widest font-mono text-white/95 rounded">
                  {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/75 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/75 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Info & Enquiry Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#C9A84C]/10 items-start">
          {/* Left Column — Description, Highlights & Location Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* Description Block */}
            <div className="space-y-4">
              <h3 className="font-cormorant text-2xl font-light text-[#C9A84C] italic">The Property Overview</h3>
              <p className="text-[#9a9590] text-sm md:text-[15px] leading-[1.85]">
                {property.description}
              </p>
            </div>

            {/* Highlights (Bedrooms + Amenities) */}
            <div className="space-y-4">
              <h4 className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#C9A84C] uppercase font-semibold">
                Property Highlights
              </h4>
              
              {/* Guest / Room Info Rectangle (Placed directly under Property Highlights heading) */}
              {guestInfo && (
                <div className="inline-flex items-center gap-3 py-2.5 px-5 border border-[#C9A84C]/40 text-[#C9A84C] font-cinzel text-[9px] tracking-[0.25em] uppercase rounded-sm bg-[#080808] max-w-fit">
                  <svg className="w-4 h-4 shrink-0 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  <div className="flex flex-col gap-0.5">
                    {guestInfo.map((line, i) => (
                      <span key={i} className={i === 0 ? "text-white font-semibold text-[10px]" : "text-[#C9A84C]/80 text-[8.5px]"}>
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {highlights.map((item, i) => {
                  const isOliveHall = item.includes("Olive Mini Banquet Hall");
                  return (
                    <div key={i} className={`flex items-center gap-3 group/item ${isOliveHall ? "sm:col-span-2" : ""}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 group-hover/item:scale-150 transition-transform ${isOliveHall ? "bg-[#C9A84C] scale-125" : "bg-[#C9A84C]/60"}`} />
                      <span className={`text-[13px] transition-colors duration-300 ${isOliveHall ? "text-[#C9A84C] font-semibold" : "text-[#b0aba6] group-hover/item:text-white"}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phone & Location Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              {/* Reserve Stay CTA */}
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 py-3.5 px-7 bg-[#C9A84C] text-black hover:bg-[#f0d78c] hover:border-transparent transition-all duration-500 font-cinzel text-[10px] tracking-[0.3em] uppercase rounded-sm font-semibold shadow-lg"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                  <path d="M12 11h.01" />
                </svg>
                Reserve Your Stay
              </button>

              {/* Phone CTA */}
              {PROPERTY_PHONES[property.id] && (
                <a
                  href={`tel:${PROPERTY_PHONES[property.id].replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-3 py-3.5 px-7 border border-[#C9A84C]/45 text-[#C9A84C] hover:text-black hover:bg-[#C9A84C] hover:border-transparent transition-all duration-500 font-cinzel text-[10px] tracking-[0.3em] uppercase rounded-sm bg-transparent"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 9.5a19.79 19.79 0 01-3-8.59A2 2 0 012.48 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.86a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {PROPERTY_PHONES[property.id]}
                </a>
              )}
              {/* Map CTA */}
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 py-3.5 px-7 border border-[#C9A84C]/45 text-[#C9A84C] hover:text-black hover:bg-[#C9A84C] hover:border-transparent transition-all duration-500 font-cinzel text-[9px] tracking-[0.3em] uppercase rounded-sm bg-transparent"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  View Location on Map
                  <svg className="w-2.5 h-2.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </div>

            {/* ═══ MOBILE ONLY: Enquiry Form (shown first on mobile before guidelines, hidden on desktop) ═══ */}
            <div id="reserve-form-container-mobile" className="block lg:hidden">
              <div className="bg-[#070707] border border-[#C9A84C]/15 rounded-lg p-4 sm:p-8 shadow-xl max-w-[440px] w-full mx-auto">
                <div className="space-y-6">
                  <div>
                    <span className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/60 block mb-2 uppercase">Inquire</span>
                    <h3 className="font-cormorant text-2xl text-white font-light">Reserve Your Stay</h3>
                    <div className="w-8 h-[1px] bg-[#C9A84C]/25 mt-4"></div>
                  </div>
                  <ContactForm
                    defaultPreference={property.name}
                    whatsappNumber={PROPERTY_PHONES[property.id] ? PROPERTY_PHONES[property.id].replace(/[^\d]/g, "") : "919980208289"}
                    instagramHandle={
                      property.id === "de-homes" 
                        ? "@de_homes_reunion" 
                        : property.id === "ocean-cafe" 
                        ? "@reunionteam19" 
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>

            {/* Property Guidelines Box (Hidden for Ocean Cafe) */}
            {property.id !== "ocean-cafe" && (
              <div className="bg-[#080808] border border-[#C9A84C]/15 rounded-lg p-5 space-y-4">
                <h4 className="font-cinzel text-[9.5px] tracking-[0.3em] text-[#C9A84C] font-semibold uppercase flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Property Guidelines & Facilities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[#a09c98] shrink-0">Power Backup:</span>
                    <span className="text-white font-medium">
                      {PROPERTY_GUIDELINES[property.id]?.power || "Reliable Power Backup"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#a09c98] shrink-0">Property Detail:</span>
                    <span className="text-white font-medium">
                      {PROPERTY_GUIDELINES[property.id]?.highlightDetail || "Curated Comfort & Convenience"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Nearby Tourist Places — Expandable Section ═══ */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <button
                onClick={() => setTouristOpen(!touristOpen)}
                className="w-full flex items-center justify-between py-4 px-5 bg-[#080808] border border-[#C9A84C]/15 rounded-lg hover:border-[#C9A84C]/30 transition-all duration-300 group/tourist"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">
                    Nearby Tourist Places
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 ${touristOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  touristOpen ? "max-h-[3000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-2">
                  {TOURIST_ROUTES.map((route, rIdx) => (
                    <div key={rIdx} className="bg-[#080808] border border-[#C9A84C]/10 rounded-lg overflow-hidden">
                      {/* Route Header */}
                      <button
                        onClick={() => toggleRoute(rIdx)}
                        className="w-full flex items-center justify-between py-3.5 px-5 hover:bg-[#0d0d0d] transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#C9A84C]/60 shrink-0" />
                          <span className="font-cinzel text-[9px] tracking-[0.2em] text-white/90 uppercase">
                            {route.title}
                          </span>
                          <span className="text-[8px] text-[#C9A84C]/50 font-mono">
                            ({route.places.length} places)
                          </span>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 text-[#C9A84C]/60 transition-transform duration-300 ${
                            expandedRoutes[rIdx] ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {/* Route Places */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          expandedRoutes[rIdx] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-5 pb-4 space-y-1.5 border-t border-[#C9A84C]/5">
                          {route.places.map((place, pIdx) => (
                            <a
                              key={pIdx}
                              href={place.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#C9A84C]/5 transition-colors duration-200 group/place"
                            >
                              <span className="text-[10px] text-[#C9A84C]/40 font-mono w-5 shrink-0 text-right">
                                {pIdx + 1}.
                              </span>
                              <span className="text-[12px] text-[#b0aba6] group-hover/place:text-[#C9A84C] transition-colors duration-200 flex-1">
                                {place.name}
                              </span>
                              <svg
                                className="w-3 h-3 text-[#C9A84C]/0 group-hover/place:text-[#C9A84C]/70 transition-all duration-200 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ Frequently Asked Questions — Expandable Section ═══ */}
            {PROPERTY_FAQS[property.id] && PROPERTY_FAQS[property.id].length > 0 && (
              <div className="pt-6 border-t border-[#C9A84C]/10">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full flex items-center justify-between py-4 px-5 bg-[#080808] border border-[#C9A84C]/15 rounded-lg hover:border-[#C9A84C]/30 transition-all duration-300 group/faq"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="font-cinzel text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">
                      Frequently Asked Questions
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 ${faqOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    faqOpen ? "max-h-[5000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-2">
                    {PROPERTY_FAQS[property.id].map((faq, fIdx) => (
                      <div key={fIdx} className="bg-[#080808] border border-[#C9A84C]/10 rounded-lg overflow-hidden">
                        {/* Question */}
                        <button
                          onClick={() => toggleFaq(fIdx)}
                          className="w-full flex items-center justify-between py-3.5 px-5 hover:bg-[#0d0d0d] transition-colors duration-200 text-left"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-[10px] text-[#C9A84C]/50 font-mono w-5 shrink-0 text-right">
                              {fIdx + 1}.
                            </span>
                            <span className="font-cinzel text-[9px] tracking-[0.15em] text-white/90 uppercase">
                              {faq.q}
                            </span>
                          </div>
                          <svg
                            className={`w-3.5 h-3.5 text-[#C9A84C]/60 transition-transform duration-300 shrink-0 ml-3 ${
                              expandedFaqs[fIdx] ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {/* Answer */}
                        <div
                          className={`overflow-hidden transition-all duration-400 ease-in-out ${
                            expandedFaqs[fIdx] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-5 pb-4 border-t border-[#C9A84C]/5">
                            <p className="text-[13px] leading-relaxed text-[#b0aba6] pt-3 pl-3 sm:pl-8">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column — Enquiry Form (Desktop only — hidden on mobile since it's shown above) */}
          <div id="reserve-form-container" className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 bg-[#070707] border border-[#C9A84C]/15 rounded-lg p-4 sm:p-8 shadow-xl max-w-[440px] lg:max-w-none w-full mx-auto">
            <div className="space-y-6">
              <div>
                <span className="font-cinzel text-[8px] tracking-[0.4em] text-[#C9A84C]/60 block mb-2 uppercase">Inquire</span>
                <h3 className="font-cormorant text-2xl text-white font-light">Reserve Your Stay</h3>
                <div className="w-8 h-[1px] bg-[#C9A84C]/25 mt-4"></div>
              </div>
              <ContactForm
                defaultPreference={property.name}
                whatsappNumber={PROPERTY_PHONES[property.id] ? PROPERTY_PHONES[property.id].replace(/[^\d]/g, "") : "919980208289"}
                instagramHandle={
                  property.id === "de-homes" 
                    ? "@de_homes_reunion" 
                    : property.id === "ocean-cafe" 
                    ? "@reunionteam19" 
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
