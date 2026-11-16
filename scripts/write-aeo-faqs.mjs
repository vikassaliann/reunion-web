/**
 * Writes pageFaqs.ts + propertyFaqs.ts from Reunion AEO/GEO Answer-first FAQ table (PDF v2).
 * Run: node scripts/write-aeo-faqs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const phone = "+91 99802 08289";
const book = `Send your dates and group size through the enquiry form, call ${phone}, or message REUNION on WhatsApp. The Udupi team confirms availability and price.`;

const pageFaqsPath = path.join(root, "src/data/pageFaqs.ts");
const propertyFaqsPath = path.join(root, "src/data/propertyFaqs.ts");

/** @type {Record<string, { q: string, a: string }[]>} */
const PAGE = {
  "/": [
    {
      q: "Where can I stay in Udupi by the beach?",
      a: "REUNION has eight private beach villas in Udupi, on or near Mattu, Hoode, Kapu, Uchila and Malpe beaches. Ocean Waves and Ocean Hridayam sit right on Mattu Beach, and Ocean Elite has direct access to Hoode Beach. Every stay is private — no shared pools or corridors.",
    },
    {
      q: "What is REUNION in Udupi?",
      a: "REUNION is a hospitality management company in Udupi, Karnataka. It runs private beach villas, city homes near Sri Krishna Matha, boutique hotel suites, Reunion Ocean Café on Mattu Beach, and a beach venue for weddings and celebrations.",
    },
    {
      q: "Can I stay near Sri Krishna Matha?",
      a: "Yes. De Homes offers boutique suites near Sri Krishna Temple, and REUNION's city villas in Udupi — Marina, Charm, Regal, Reunion Villa, Aradhya and Arya — are a short drive from the temple.",
    },
    {
      q: "Does REUNION host beach weddings in Udupi?",
      a: "Yes. REUNION has a private beach venue in Udupi for weddings, engagements and birthday parties, planned with Gutthu Weddings Planner. Guests can also book REUNION villas nearby.",
    },
    { q: "How do I book a REUNION stay?", a: book },
  ],
  "/properties/category/beach-villas": [
    {
      q: "Which Reunion villas are right on the beach?",
      a: "Ocean Waves and Ocean Hridayam are beachfront on Mattu Beach, and Ocean Elite has direct beach access at Hoode. Ocean Royal is about 50 m from the sea at Kapu, Ocean Daaffy about 100 m from the sand, and Ocean Bliss about 800 m from Malpe Beach.",
    },
    {
      q: "Which beach villa is best for a large group?",
      a: "Ocean Manor and Ocean Waves are best for large groups because each has several separate units under one roof. Ocean Royal and Ocean Daaffy each have 3 bedrooms for big families.",
    },
    {
      q: "Is it safe to swim at Udupi beaches?",
      a: "Sea conditions on the Udupi coast change with the season, and the sea is rough in the monsoon, from June to September. Swim only where lifeguards and flags allow, and ask the REUNION team about conditions on the day.",
    },
    {
      q: "What is the best time for a beach stay in Udupi?",
      a: "October to March is the best time for a beach stay in Udupi, with calmer seas and pleasant weather. The monsoon, June to September, is greener and quieter but not for swimming.",
    },
    { q: "How do I book a beach villa in Udupi?", a: book },
  ],
  "/properties/category/city-stays": [
    {
      q: "Is there a homestay near Udupi Krishna Temple?",
      a: "Yes. REUNION's city villas are private homestays in Udupi city, close to Sri Krishna Matha, with kitchens, AC bedrooms and parking at most homes. Marina, Charm, Regal and Reunion Villa suit families on temple visits.",
    },
    {
      q: "Which city villa suits a big family?",
      a: "Aradhya Villa suits big families: it is a multi-storey 4BHK with a bathtub suite, event terrace and large dining area. Marina, Charm and Reunion Villa each have 3 bedrooms.",
    },
    {
      q: "Where can I stay in Manipal for a hospital or university visit?",
      a: "Krshna is a modern 2-bedroom home in a quiet part of Manipal, with a full kitchen and fast Wi-Fi, suited to families visiting Manipal University or the hospital.",
    },
    {
      q: "Is a villa better than a hotel in Udupi?",
      a: "A villa gives a family or group a private home with a kitchen, living space and several bedrooms in one place. A hotel suits short solo or couple stays.",
    },
  ],
  "/properties/category/hotel-stays": [
    {
      q: "Which REUNION hotel is near Sri Krishna Temple?",
      a: "De Homes is REUNION's boutique hotel near Sri Krishna Temple in Udupi, with a Presidential Suite, balcony rooms and executive rooms.",
    },
    {
      q: "Is there a REUNION hotel near Kundapura?",
      a: "Yes. D Square is a REUNION hotel and resort in Koteshwara, near Kundapura, for families and travellers on the Udupi–Kundapura coast.",
    },
    {
      q: "Should I book a hotel or a villa in Udupi?",
      a: "Book a hotel for a short stay or a couple; book a villa for a family or group that wants a kitchen and shared space. REUNION offers both.",
    },
  ],
  "/properties/category/shivamogga-stays": [
    {
      q: "Where is Reunion Serene?",
      a: "Reunion Serene is a private villa in the Malnad region near Shivamogga (Shimoga), Karnataka, about 7.7 km from the Shivamogga city centre.",
    },
    {
      q: "How many guests can stay at Reunion Serene?",
      a: "Reunion Serene has 4 separate bedrooms and accommodates up to 8 guests.",
    },
    {
      q: "Does Reunion Serene have a private pool?",
      a: "Yes. Reunion Serene has a private outdoor swimming pool, open year-round, along with a garden and terrace.",
    },
    {
      q: "How far is Jog Falls from Reunion Serene?",
      a: "Jog Falls is about 85 km from Reunion Serene, an easy day trip by car.",
    },
    { q: "How do I book Reunion Serene?", a: book },
  ],
  "/dining": [
    {
      q: "Where is Reunion Ocean Café?",
      a: "Reunion Ocean Café is a beachfront café on Mattu Beach, Udupi, with sunset views, a fireplace lounge, fresh seafood and coffee.",
    },
    {
      q: "What are Reunion Ocean Café timings?",
      a: "Reunion Ocean Café is open daily from 9:30 AM to 10 PM.",
    },
    {
      q: "Can I book a candlelight dinner at Reunion Ocean Café?",
      a: "Yes. REUNION sets up private candlelight dinners on Mattu Beach, the same beach as the café, for anniversaries, proposals and birthdays.",
    },
    {
      q: "Is there parking at Reunion Ocean Café?",
      a: "There is roadside and beach parking near Mattu Beach — staff can guide you to the nearest spot when you arrive.",
    },
  ],
  "/experiences/candlelight-dinner": [
    {
      q: "Where can I book a candle light dinner in Udupi?",
      a: "You can book a private candle light dinner on Mattu Beach, Udupi, with REUNION. The table is set on the sand with a candlelight canopy, ambient lighting and a coastal menu.",
    },
    {
      q: "Is the candle light dinner on the beach?",
      a: "Yes. The dinner is set up directly on Mattu Beach, so you eat with the sound of the sea and, in the early evening, the sunset.",
    },
    {
      q: "Can I plan a proposal or anniversary?",
      a: "Yes. REUNION offers proposal and anniversary setups with custom décor, a custom menu and personal service. Share your plan when you enquire.",
    },
    {
      q: "How much does a candle light dinner in Udupi cost?",
      a: "Packages vary by date, décor and menu — enquire for current pricing for two guests when you book.",
    },
  ],
  "/experiences/beach-birthday": [
    {
      q: "Where is the beach birthday setup?",
      a: "REUNION's beach birthday setups are on Mattu Beach, Udupi.",
    },
    {
      q: "What is included in a beach birthday setup?",
      a: "A REUNION beach birthday includes a decorated beachfront setup, dinner and cake, with music. Packages suit couples, families and groups.",
    },
    {
      q: "Can we bring our own cake?",
      a: "Yes — you may bring your own cake. REUNION can also help arrange cake and beach décor on request.",
    },
    {
      q: "How far ahead should we book?",
      a: "Book at least 3–5 days ahead so beach access, seating and décor can be confirmed.",
    },
  ],
  "/events": [
    {
      q: "Can I have a beach wedding in Udupi?",
      a: "Yes. REUNION hosts beach weddings and private celebrations in Udupi, planned end to end with Gutthu Weddings Planner, with REUNION villas nearby for guests.",
    },
    {
      q: "Who plans weddings at REUNION?",
      a: "Weddings at REUNION are planned with Gutthu Weddings Planner and Events Management.",
    },
    {
      q: "How many guests does the Udupi beach venue hold?",
      a: "Coastal weddings and events can range from intimate gatherings to 150+ guests depending on layout — share your guest count with Gutthu Weddings and REUNION for a site plan.",
    },
    {
      q: "What events can I host at the beach venue?",
      a: "REUNION's beach venue in Udupi hosts weddings, engagements, haldi, birthday parties and private celebrations.",
    },
    {
      q: "Can guests stay near the beach venue?",
      a: "Yes. REUNION's beach villas on Mattu Beach and nearby can house wedding guests close to the venue.",
    },
  ],
  "/wellness": [
    {
      q: "Is there Ayurveda or spa in Udupi for guests?",
      a: "Yes. REUNION guests can add Ayurveda, beach yoga, spa, meditation, naturopathy and salon services with Tapovana Life, Manipal.",
    },
    {
      q: "Is the spa open to people not staying with REUNION?",
      a: "Wellness add-ons are arranged primarily for REUNION guests; selected Tapovana Life treatments may be booked by day visitors with advance notice — enquire before your visit.",
    },
    {
      q: "How do I add wellness to my stay?",
      a: "Choose your stay, share what you want from the visit, and REUNION arranges the sessions with Tapovana Life.",
    },
  ],
  "/partner-with-us": [
    {
      q: "What does REUNION manage for property owners?",
      a: "REUNION manages villas, homestays and hotels in Udupi for owners — marketing, bookings, guest operations and revenue growth.",
    },
    {
      q: "How do I list my property with REUNION?",
      a: `Fill in the Partner With Us form or call ${phone}. The team explains how the partnership works and reviews your property.`,
    },
  ],
  "/blogs/tourist-places-in-udupi": [
    {
      q: "What are the top tourist places in Udupi?",
      a: "The top tourist places in Udupi are Sri Krishna Matha, Malpe Beach, St. Mary's Island, Kapu Beach and Lighthouse, Mattu Beach, and day trips to Kollur Mookambika Temple and Karkala.",
    },
  ],
  "/blogs/mattu-beach-udupi": [
    {
      q: "How far is Mattu Beach from Udupi?",
      a: "Mattu Beach is about 10–12 km from Udupi town — roughly 20–30 minutes by car depending on traffic.",
    },
    {
      q: "Where can I stay on Mattu Beach?",
      a: "Ocean Waves and Ocean Hridayam by REUNION are beachfront stays on Mattu Beach, and Reunion Ocean Café is on the same beach.",
    },
  ],
  "/blogs/top-10-beaches-to-visit-in-udupi": [],
  "/blogs/2-day-udupi-itinerary": [],
  "/blogs/things-to-do-in-udupi": [],
  "/blogs/best-restaurants-in-udupi": [],
  "/blogs/bangalore-to-udupi-weekend-trip": [],
  "/blogs/hoode-uchila-beaches-udupi": [],
  "/about": [],
  "/contact": [],
  "/properties": [],
  "/experiences": [],
  "/blogs": [],
  "/blogs/malpe-beach-udupi": [
    {
      q: "How do I reach St. Mary's Island from Malpe?",
      a: "Boats to St. Mary's Island leave from Malpe harbour when seas are calm — services are seasonal and often pause in the monsoon; check locally on the day for timings and fare.",
    },
    {
      q: "Where can I stay near Malpe Beach?",
      a: "Ocean Bliss by REUNION is a 2BHK villa about 800 m from Malpe Beach.",
    },
  ],
};

/** @type {Record<string, { q: string, a: string }[]>} */
const PROPERTY = {
  "ocean-waves": [
    {
      q: "How close is Ocean Waves to the beach?",
      a: "Ocean Waves is about 5 m from Mattu Beach — just cross the road to reach the sand.",
    },
    {
      q: "How many guests can stay at Ocean Waves?",
      a: "Ocean Waves has three separate units: a first-floor 1BHK that sleeps up to 6, and two ground-floor 1-bedroom units that sleep up to 3 each — up to 12 guests in total.",
    },
    {
      q: "Does Ocean Waves have a kitchen?",
      a: "Each unit has a mini fridge, microwave and kettle. Home-made food can be pre-ordered, and Swiggy and Zomato deliver here.",
    },
    { q: "How do I book Ocean Waves?", a: book },
  ],
  "ocean-elite": [
    {
      q: "How close is Ocean Elite to the beach?",
      a: "Ocean Elite has direct access to Hoode Beach, Udupi.",
    },
    {
      q: "How many guests can stay at Ocean Elite?",
      a: "Ocean Elite is a 2-bedroom villa for up to 6 guests.",
    },
    {
      q: "Does Ocean Elite have a kitchen?",
      a: "Yes. Ocean Elite has a fully equipped kitchen, plus AC, Wi-Fi and a geyser.",
    },
    { q: "How do I book Ocean Elite?", a: book },
  ],
  "ocean-manor": [
    {
      q: "How close is Ocean Manor to the beach?",
      a: "Ocean Manor is at Hoode Beach, Udupi, with beach access over a rocky shoreline.",
    },
    {
      q: "How many guests can stay at Ocean Manor?",
      a: "Ocean Manor has a 2BHK on the first floor and two 1-bedroom units on the ground floor, so large families and groups can stay together with privacy.",
    },
    {
      q: "Does Ocean Manor have a kitchen?",
      a: "The first-floor 2BHK includes a kitchenette; ground-floor units are set up for group stays with basic amenities — ask REUNION which unit fits your cooking needs.",
    },
    { q: "How do I book Ocean Manor?", a: book },
  ],
  "ocean-royal": [
    {
      q: "How close is Ocean Royal Beach House to the beach?",
      a: "Ocean Royal is about 50 m from the sea at Kapu, Udupi, among coconut groves.",
    },
    {
      q: "How many guests can stay at Ocean Royal Beach House?",
      a: "Ocean Royal has 3 bedrooms for up to 15 guests.",
    },
    {
      q: "Does Ocean Royal Beach House have a kitchen?",
      a: "Yes. It has a kitchen with a gas stove and a refrigerator, and a heavy-duty generator for power cuts.",
    },
    { q: "How do I book Ocean Royal Beach House?", a: book },
  ],
  "ocean-givaah": [
    {
      q: "How close is Ocean Givaah to the beach?",
      a: "Ocean Givaah is about 200 m from the beach in Bada, near Uchila, Udupi.",
    },
    {
      q: "How many guests can stay at Ocean Givaah?",
      a: "Ocean Givaah is a 3BHK villa for up to 9 guests.",
    },
    {
      q: "Does Ocean Givaah have a kitchen?",
      a: "Yes. Ocean Givaah has a fully equipped kitchen, a private 4 ft deep pool, garden and ocean-view terrace.",
    },
    { q: "How do I book Ocean Givaah?", a: book },
  ],
  "ocean-hridayam": [
    {
      q: "How close is Ocean Hridayam to the beach?",
      a: "Ocean Hridayam is beachfront on Mattu Beach, Udupi — you step out onto the sand.",
    },
    {
      q: "How many guests can stay at Ocean Hridayam?",
      a: "Ocean Hridayam is a 2-bedroom villa for up to 6 guests, with one bedroom on each floor.",
    },
    {
      q: "Does Ocean Hridayam have a kitchen?",
      a: "Yes. Ocean Hridayam has a kitchen and a sea-facing balcony.",
    },
    { q: "How do I book Ocean Hridayam?", a: book },
  ],
  "ocean-daaffy": [
    {
      q: "How close is Ocean Daaffy to the beach?",
      a: "Ocean Daaffy is about 100 m from the beach in Bada, near Uchila, Udupi.",
    },
    {
      q: "How many guests can stay at Ocean Daaffy?",
      a: "Ocean Daaffy is a 3-bedroom villa for up to 9 guests.",
    },
    {
      q: "Does Ocean Daaffy have a kitchen?",
      a: "Yes. Ocean Daaffy has a kitchen for guest use in this coastal beach house.",
    },
    { q: "How do I book Ocean Daaffy?", a: book },
  ],
  "ocean-bliss": [
    {
      q: "How close is Ocean Bliss to the beach?",
      a: "Ocean Bliss is about 800 m from Malpe Beach, Udupi, and a good base for St. Mary's Island.",
    },
    {
      q: "How many guests can stay at Ocean Bliss?",
      a: "Ocean Bliss is a 2BHK villa with one shared bathroom for up to 6 guests.",
    },
    {
      q: "Does Ocean Bliss have a kitchen?",
      a: "Yes. Ocean Bliss has kitchen facilities, UPS power backup and an open compound.",
    },
    { q: "How do I book Ocean Bliss?", a: book },
  ],
  "de-homes": [
    {
      q: "Where is De Homes?",
      a: "De Homes is in Chitpady, Udupi, near Sri Krishna Temple — about a 10-minute walk from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at De Homes?",
      a: "De Homes has a Presidential Suite, balcony rooms and executive rooms across 16 premium rooms — share your group size when you enquire.",
    },
    {
      q: "Does De Homes have a kitchen?",
      a: "De Homes is a hotel-style stay with dining on site — enquire for breakfast and meal options.",
    },
    { q: "How do I book De Homes?", a: book },
  ],
  "d-square": [
    {
      q: "Where is D Square?",
      a: "D Square is in Koteshwara, near Kundapura, on the Udupi coast.",
    },
    {
      q: "How many guests can stay at D Square?",
      a: "D Square offers hotel and resort rooms for families and travellers — share dates and guest count when you enquire.",
    },
    {
      q: "Does D Square have a kitchen?",
      a: "D Square has on-site dining at the hotel and resort — enquire for restaurant hours and meal options.",
    },
    { q: "How do I book D Square?", a: book },
  ],
  "aradhya-villa": [
    {
      q: "Where is Aradhya Villa?",
      a: "Aradhya Villa is in Kunjibettu, Udupi city — about 10 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Aradhya Villa?",
      a: "Aradhya Villa is a multi-storey 4BHK for big families, for up to 12 guests.",
    },
    {
      q: "Does Aradhya Villa have a kitchen?",
      a: "Yes. Aradhya Villa has a well-equipped kitchen, a large dining area and an event terrace.",
    },
    { q: "How do I book Aradhya Villa?", a: book },
  ],
  "marina-villa": [
    {
      q: "Where is Marina Villa?",
      a: "Marina Villa is in Kannarpady, central Udupi, close to town — about 10–15 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Marina Villa?",
      a: "Marina Villa has 3 AC bedrooms for up to 10 guests.",
    },
    {
      q: "Does Marina Villa have a kitchen?",
      a: "Yes. Marina Villa has a private kitchen and parking.",
    },
    { q: "How do I book Marina Villa?", a: book },
  ],
  "charm-villa": [
    {
      q: "Where is Charm Villa?",
      a: "Charm Villa is in Badagabettu, Udupi — about 10–15 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Charm Villa?",
      a: "Charm Villa has 3 bedrooms with attached suites for up to 9 guests.",
    },
    {
      q: "Does Charm Villa have a kitchen?",
      a: "Yes. Charm Villa has a kitchen and modern amenities for a private city stay.",
    },
    { q: "How do I book Charm Villa?", a: book },
  ],
  villa: [
    {
      q: "Where is Reunion Villa?",
      a: "Reunion Villa is in Chitpady, Udupi city — about 10–15 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Reunion Villa?",
      a: "Reunion Villa has 3 bedrooms, a garden and a top-floor terrace for up to 10 guests.",
    },
    {
      q: "Does Reunion Villa have a kitchen?",
      a: "Yes. Reunion Villa has an in-kitchen; home-style meals can be arranged on request.",
    },
    { q: "How do I book Reunion Villa?", a: book },
  ],
  "regal-villa": [
    {
      q: "Where is Regal Villa?",
      a: "Regal Villa is in Chitpady, Udupi city — about 10–15 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Regal Villa?",
      a: "Regal Villa is an air-conditioned 2-bedroom private villa for up to 6 guests.",
    },
    {
      q: "Does Regal Villa have a kitchen?",
      a: "Yes. Regal Villa has a full kitchen, a terrace and a balcony.",
    },
    { q: "How do I book Regal Villa?", a: book },
  ],
  arya: [
    {
      q: "Where is Arya Studio Stays?",
      a: "Arya Studio Stays is in Kunjibettu, Udupi city — about 10 minutes from Sri Krishna Matha.",
    },
    {
      q: "How many guests can stay at Arya Studio Stays?",
      a: "Arya has independent 1BHK studio suites for couples, business travellers and small families — up to 3 guests per studio.",
    },
    {
      q: "Does Arya Studio Stays have a kitchen?",
      a: "Yes. Each 1BHK studio has kitchen basics for light cooking.",
    },
    { q: "How do I book Arya Studio Stays?", a: book },
  ],
  krshna: [
    {
      q: "How far is Krshna from Manipal University and the hospital?",
      a: "Krshna is in a quiet part of Manipal, Udupi — about 2 km from MAHE and roughly 3 km from KMC Hospital.",
    },
    {
      q: "How many guests can stay at Krshna?",
      a: "Krshna is a 2-bedroom home for up to 6 guests.",
    },
    {
      q: "Does Krshna have a kitchen?",
      a: "Yes. Krshna has a full kitchen and fast Wi-Fi.",
    },
    { q: "How do I book Krshna?", a: book },
  ],
  "reunion-serene": [
    {
      q: "Where is Reunion Serene?",
      a: "Reunion Serene is about 7.7 km from the Shivamogga city centre, in the Malnad region.",
    },
    {
      q: "How many guests can stay at Reunion Serene?",
      a: "Reunion Serene has 4 bedrooms for up to 8 guests.",
    },
    {
      q: "Does Reunion Serene have a kitchen?",
      a: "Yes. Reunion Serene has a full kitchen for guests, plus a year-round private pool, garden, terrace, Wi-Fi, parking and a washing machine.",
    },
    { q: "How do I book Reunion Serene?", a: book },
  ],
};

function fmtPairs(pairs) {
  return pairs
    .map(
      (p) =>
        `  { q: ${JSON.stringify(p.q)}, a: ${JSON.stringify(p.a)} },`,
    )
    .join("\n");
}

const pageTs = `/** Answer-first FAQs from Reunion AEO/GEO Plan v2 (auto-generated — run scripts/write-aeo-faqs.mjs). */
import type { FaqPair } from "@/lib/faqSchema";
import { REUNION_PHONE_DISPLAY } from "@/data/factCheck";

export const AEO_BOOKING_ANSWER = \`Send your dates and group size through the enquiry form, call \${REUNION_PHONE_DISPLAY}, or message REUNION on WhatsApp. The Udupi team confirms availability and price.\`;

${Object.entries(PAGE)
  .map(([path, faqs]) => {
    if (faqs.length === 0) return "";
    const key = path
      .replace(/^\//, "")
      .replace(/\//g, "_")
      .replace(/-/g, "_")
      .replace(/^$/, "home");
    const constName = `AEO_${key.toUpperCase()}_FAQS`;
    return `export const ${constName}: FaqPair[] = [\n${fmtPairs(faqs)}\n];`;
  })
  .filter(Boolean)
  .join("\n\n")}

/** Only URLs listed in the AEO Answer-first FAQ table. */
export const PAGE_FAQS_BY_PATH: Record<string, FaqPair[]> = {
${Object.entries(PAGE)
  .map(([path, faqs]) => {
    if (faqs.length === 0) return `  ${JSON.stringify(path)}: [],`;
    const key = path
      .replace(/^\//, "")
      .replace(/\//g, "_")
      .replace(/-/g, "_")
      .replace(/^$/, "home");
    return `  ${JSON.stringify(path)}: AEO_${key.toUpperCase()}_FAQS,`;
  })
  .join("\n")}
};

export const PARTNER_FAQS = AEO_PARTNER_WITH_US_FAQS;
`;

const propertyTs = `/** Property FAQs from Reunion AEO/GEO Plan v2 (auto-generated — run scripts/write-aeo-faqs.mjs). */
import type { FaqPair } from "@/lib/faqSchema";

export type FAQ = FaqPair;

export const PROPERTY_FAQS: Record<string, FAQ[]> = {
${Object.entries(PROPERTY)
  .map(([id, faqs]) => `  ${JSON.stringify(id)}: [\n${fmtPairs(faqs)}\n  ],`)
  .join("\n")}
};
`;

fs.writeFileSync(pageFaqsPath, pageTs);
fs.writeFileSync(propertyFaqsPath, propertyTs);
console.log("Wrote", pageFaqsPath);
console.log("Wrote", propertyFaqsPath);
console.log("Page paths:", Object.keys(PAGE).length, "Property ids:", Object.keys(PROPERTY).length);