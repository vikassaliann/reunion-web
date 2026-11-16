import { PROPERTY_GUESTS } from "@/data/propertyGuests";

/** Max guest count for JSON-LD occupancy (aligns with At a glance + property FAQs). */
export function maxGuestsForProperty(propertyId: string, bedrooms: number): number {
  const label = PROPERTY_GUESTS[propertyId];
  if (label) {
    const match = label.match(/up to (\d+)/i);
    if (match) return Number.parseInt(match[1], 10);
  }
  return bedrooms > 0 ? bedrooms * 2 : 2;
}