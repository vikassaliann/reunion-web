"use client";

import { useState } from "react";
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
  "reunion-seren":  "+91 9980208289",
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
  "reunion-seren":  ["4 Bedrooms", "Up to 8 Guests"],
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
  "ocean-bliss":    { power: "Reliable UPS Power Backup", highlightDetail: "Open Compound Villa" },
  "marina-villa":   { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & AC" },
  "charm-villa":    { power: "Reliable UPS Power Backup", highlightDetail: "First Floor 3BHK Residence" },
  "aradhya-villa":  { power: "Central City Power Grid", highlightDetail: "4BHK with Bathtub & Closed Terrace" },
  "arya":           { power: "Reliable UPS Power Backup", highlightDetail: "2 Independent 1BHKs (1st Floor)" },
  "krshna":         { power: "Reliable UPS Power Backup", highlightDetail: "Fully Furnished Kitchen & Parking" },
  "ocean-waves":    { power: "AC, Geyser & Refrigerator Equipped", highlightDetail: "CCTV Secured / Quiet Living" },
  "regal-villa":    { power: "Balcony & Terrace Access", highlightDetail: "Free Private Parking & WiFi" },
  "villa":          { power: "3 Bedrooms (2 AC + 1 Non-AC)", highlightDetail: "Meals Arranged on Request" },
  "ocean-cafe":     { power: "Fireplace & Live Music (Select Days)", highlightDetail: "Open Daily: 9:30 AM – 10:00 PM" },
  "reunion-seren":  { power: "Standard Grid Power", highlightDetail: "Private Outdoor Pool · Terrace & Garden" },
};

// Property FAQs — derived exclusively from each property's actual details
export interface FAQ {
  q: string;
  a: string;
}

export const PROPERTY_FAQS: Record<string, FAQ[]> = {
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
  "reunion-seren": [
    { q: "Where is Reunion Serene located?", a: "Reunion Serene Villa is a private nature-stay in the Malnad region of Karnataka, near Shivamogga (Shimoga), approximately 7.7 km from the Shivamogga city center." },
    { q: "How many guests can Reunion Serene accommodate?", a: "The villa accommodates up to 8 guests across 4 separate bedrooms." },
    { q: "Does Reunion Serene have a swimming pool?", a: "Yes, the property features a private outdoor swimming pool available year-round." },
    { q: "What amenities are available at Reunion Serene?", a: "Guests enjoy free Wi-Fi and parking, a terrace, garden, family rooms, and washing machine access, along with the private outdoor pool." },
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

export const SERENE_TOURIST_ROUTES: RouteGroup[] = [
  {
    title: "Shivamogga & Malnad Highlights",
    places: [
      { name: "Jog Falls", mapUrl: "https://www.google.com/maps/search/?api=1&query=Jog+Falls+Karnataka" },
      { name: "Sakrebailu Elephant Camp", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sakrebailu+Elephant+Camp+Shivamogga" },
      { name: "Tyavarekoppa Lion & Tiger Safari", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tyavarekoppa+Lion+Safari+Shivamogga" },
      { name: "Gajanur Dam", mapUrl: "https://www.google.com/maps/search/?api=1&query=Gajanur+Dam+Shivamogga" },
      { name: "Mandagadde Bird Sanctuary", mapUrl: "https://www.google.com/maps/search/?api=1&query=Mandagadde+Bird+Sanctuary+Shivamogga" },
      { name: "Agumbe Rainforest", mapUrl: "https://www.google.com/maps/search/?api=1&query=Agumbe+Karnataka" },
      { name: "Koodli Sangama", mapUrl: "https://www.google.com/maps/search/?api=1&query=Koodli+Sangama+Shivamogga" },
      { name: "Sacred Heart Cathedral", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sacred+Heart+Cathedral+Shivamogga" },
    ],
  },
];

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
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touristOpen, setTouristOpen] = useState(false);
  const [expandedRoutes, setExpandedRoutes] = useState<Record<number, boolean>>({});
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.heroImage];
  const gridSlots = images.slice(0, 5);
  const extraPhotoCount = Math.max(0, images.length - 5);

  const openLightbox = (idx: number) => {
    setSelectedImageIdx(idx);
    setLightboxOpen(true);
  };

  const lightboxPrev = () =>
    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
  const lightboxNext = () =>
    setSelectedImageIdx((prev) => (prev + 1) % images.length);

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
  const hasCapacityTags = property.bedrooms > 0 || Boolean(guestInfo?.length);

  return (
    <section className="bg-[#060606] w-full">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-12 pt-8 md:pt-10 pb-24">

        {hasCapacityTags && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-end mb-8 md:mb-10 pt-8 md:pt-10">
            {property.bedrooms > 0 && (
              <span className="font-futura text-[10px] tracking-[0.2em] uppercase text-white/90 border border-white/15 bg-white/[0.03] px-4 py-2">
                {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}
              </span>
            )}
            {guestInfo?.map((line, i) => (
              <span
                key={i}
                className="font-futura text-[10px] tracking-[0.2em] uppercase text-white/90 border border-white/15 bg-white/[0.03] px-4 py-2"
              >
                {line}
              </span>
            ))}
          </div>
        )}

        {/* Bento gallery */}
        <div
          className={
            hasCapacityTags ? "mb-14 md:mb-16" : "mb-14 md:mb-16 pt-8 md:pt-10"
          }
        >
          {images.length === 1 ? (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
            >
              <img
                src={images[0]}
                alt={`${property.name} — photo 1`}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </button>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2.5 h-[min(68vh,640px)] rounded-xl overflow-hidden">
                {gridSlots.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => openLightbox(i)}
                    className={`relative overflow-hidden bg-[#0a0a0a] group ring-1 ring-white/5 ${
                      i === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${property.name} — photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {i === 4 && extraPhotoCount > 0 && (
                      <span className="absolute inset-0 bg-black/55 flex items-center justify-center font-futura text-sm tracking-[0.25em] uppercase text-white">
                        +{extraPhotoCount} photos
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="md:hidden space-y-3">
                <button
                  type="button"
                  onClick={() => openLightbox(selectedImageIdx)}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
                >
                  <img
                    src={images[selectedImageIdx]}
                    alt={`${property.name} — photo ${selectedImageIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setSelectedImageIdx(i)}
                      className={`flex-none w-20 h-20 rounded-md overflow-hidden ring-2 transition-all ${
                        selectedImageIdx === i ? "ring-[#C9A84C]" : "ring-transparent opacity-60"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="mt-4 hidden md:inline-flex items-center gap-2 font-futura text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-[#C9A84C] transition-colors"
            >
              View all {images.length} photos
            </button>
          )}
        </div>

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${property.name} photo gallery`}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="font-futura text-[10px] tracking-[0.3em] text-white/60 uppercase">
                {selectedImageIdx + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="font-futura text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white px-3 py-2"
              >
                Close
              </button>
            </div>
            <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-6">
              <button
                type="button"
                onClick={lightboxPrev}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <img
                src={images[selectedImageIdx]}
                alt={`${property.name} — photo ${selectedImageIdx + 1}`}
                className="max-h-[min(75vh,900px)] max-w-full object-contain"
              />
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="px-5 pb-6 flex gap-2 overflow-x-auto justify-center [&::-webkit-scrollbar]:hidden">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setSelectedImageIdx(i)}
                  className={`flex-none w-14 h-14 rounded overflow-hidden ring-2 ${
                    selectedImageIdx === i ? "ring-[#C9A84C]" : "ring-transparent opacity-50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info & enquiry — mobile: guidelines → form → call/map; desktop: form sticky right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-24 lg:gap-y-16 items-start">

          {/* Block 1 — Overview through Guidelines */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            <div className="space-y-6">
              <h3 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Overview</h3>
              <p className="text-white/80 font-futura text-[15px] md:text-base leading-[2] font-light tracking-wide">
                {property.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Amenities & Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shrink-0"></span>
                    <span className="font-futura text-sm text-white/70 group-hover/item:text-white transition-colors duration-300 font-light tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {property.id !== "ocean-cafe" && (
              <div className="space-y-6">
                <h3 className="font-futura text-[11px] tracking-[0.3em] text-white/40 uppercase">Guidelines</h3>
                <div className="space-y-4 font-futura text-sm tracking-wide font-light text-white/60">
                  <div className="flex items-start gap-4">
                    <span className="uppercase text-[#C9A84C] w-32 shrink-0 text-[11px] tracking-[0.2em] mt-0.5">Power</span>
                    <span className="text-white/90">{PROPERTY_GUIDELINES[property.id]?.power || "Reliable Power Backup"}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="uppercase text-[#C9A84C] w-32 shrink-0 text-[11px] tracking-[0.2em] mt-0.5">Detail</span>
                    <span className="text-white/90">{PROPERTY_GUIDELINES[property.id]?.highlightDetail || "Curated Comfort & Convenience"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enquiry form — after guidelines on mobile; sticky right on desktop */}
          <div className="lg:col-span-5 lg:row-span-2 w-full">
            <div id="reserve-form-container" className="lg:sticky lg:top-24 py-2 lg:py-0">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <span className="font-cinzel text-[9px] tracking-[0.4em] text-[#C9A84C] block mb-3 uppercase">Inquire</span>
                  <h3 className="font-cormorant italic text-3xl md:text-4xl text-white font-light leading-snug">
                    {property.id === "ocean-cafe" ? "Reserve Table" : "Reserve Stay"}
                  </h3>
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

          {/* Block 2 — Call / Map, then tourist & FAQ */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row gap-4">
              {PROPERTY_PHONES[property.id] && (
                <a
                  href={`tel:${PROPERTY_PHONES[property.id].replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/40 bg-transparent text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
                >
                  Call Us
                </a>
              )}
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 bg-transparent text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 font-futura text-[10px] tracking-[0.3em] uppercase"
                >
                  Map
                </a>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                onClick={() => setTouristOpen(!touristOpen)}
                className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
              >
                <span className="font-futura text-[11px] tracking-[0.3em] text-white/70 group-hover:text-white uppercase transition-colors">
                  Nearby Tourist Places
                </span>
                <span className="text-[#C9A84C] text-xl leading-none">{touristOpen ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${touristOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="py-6 space-y-8">
                  {(property.id === "reunion-seren" ? SERENE_TOURIST_ROUTES : TOURIST_ROUTES).map((route, rIdx) => (
                    <div key={rIdx} className="space-y-4">
                      <h4 className="font-futura text-[10px] tracking-widest text-[#C9A84C] uppercase">{route.title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {route.places.map((place, pIdx) => (
                          <a key={pIdx} href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="font-futura text-[13px] font-light tracking-wide text-white/70 hover:text-white transition-colors flex items-center gap-3">
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            {place.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {PROPERTY_FAQS[property.id] && PROPERTY_FAQS[property.id].length > 0 && (
                <>
                  <button
                    onClick={() => setFaqOpen(!faqOpen)}
                    className="w-full flex items-center justify-between py-5 border-b border-white/10 group"
                  >
                    <span className="font-futura text-[11px] tracking-[0.3em] text-white/70 group-hover:text-white uppercase transition-colors">
                      Frequently Asked Questions
                    </span>
                    <span className="text-[#C9A84C] text-xl leading-none">{faqOpen ? "−" : "+"}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${faqOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="py-6 space-y-6">
                      {PROPERTY_FAQS[property.id].map((faq, fIdx) => (
                        <div key={fIdx} className="space-y-2">
                          <p className="font-futura text-[13px] text-white tracking-wide uppercase">{faq.q}</p>
                          <p className="font-futura text-[13px] font-light text-white/60 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
