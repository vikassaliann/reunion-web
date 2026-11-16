# AEO & GEO Plan v2 — website implementation checklist

Source: `docs/Reunion_AEO_GEO_1.pdf` (Nov 2026). **Code** items below are implemented in this repo; **Ops** items need Sumith / Gutthu / GBP.

## Done in code (this batch)

| Plan item | Implementation |
|-----------|----------------|
| Organization + email + full office address | `factCheck.ts`, `layout.tsx`, contact, footer |
| WebSite JSON-LD | `layout.tsx` |
| LodgingBusiness / VacationRental + guest occupancy | `properties/[id]/page.tsx`, `propertyOccupancy.ts` |
| De Homes street in schema | `properties/[id]/page.tsx` |
| Cafe / dining schema (existing) | `dining/page.tsx` |
| EventVenue + capacity | `events/page.tsx` |
| ItemList on category pages | `category/[category]/page.tsx` |
| Article on blogs | `blogs/[slug]/page.tsx` |
| Direct guest-capacity FAQs | `propertyFaqs.ts`, `pageFaqs.ts` (not “contact REUNION”) |
| AEO gap FAQs (parking, price, cake, booking notice, venue size, spa, Mattu/Malpe) | `pageFaqs.ts` |
| GTM dataLayer hooks | `gtmEvents.ts`, footer clicks, contact `generate_lead` |
| “How did you find us?” (+ AI option) | `ContactForm.tsx` |
| Entity hold list (Abode, Solandis, Amity) | `factCheck.ts`, `entity-consistency.md` |
| AI crawlers allowed | `robots.ts` (unchanged) |

## Ops — not in code (Plan v2)

1. **Fact Register** — confirm all 114 rows (0/114 confirmed in PDF); update `factCheck.ts` / copy when Sumith signs off.
2. **GBP / Tier 1 OTAs** — align names, phone, address with website (Entity Consistency table in PDF p.15).
3. **AI visibility baseline** — run 20 questions across ChatGPT, Gemini, Perplexity, Google AI **before** go-live; log in tracker sheet.
4. **GTM container** — map `generate_lead`, `whatsapp_click`, `phone_click`, `email_click` to GA4 key events (`GTM-WMZL2TTL`).
5. **Enquiry log** — offline spreadsheet per PDF; tie bookings to channel.
6. **Tier 2/3 listings** — WeddingWire, Holidify fixes, etc.
7. **Rich Results Test** — re-validate `/`, one villa, `/dining`, `/events`, one blog after release.

## Address note

Office line uses **UB Square, Chitpady** from Fact Register #59 (Expedia De Homes). Reconcile with GBP when confirmed.