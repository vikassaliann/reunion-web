# REUNION — remaining work (not in code)

**Last recheck:** Nov 2026.  
**Dev status:** SEO Master Sheet + AEO/GEO + alt/compression + **28 internal links** + blogs **unlocked** (`BLOGS_UNDER_MAINTENANCE = false`) — all local. Verify: `npm run verify:seo` and `npx tsc --noEmit`. Coverage map: `seo-master-full-coverage.md`, `aeo-geo-checklist.md`. **Alt fix list:** Pass 1 + **215** image 301s / `.webp` — `alt-text-fix-list-status.md`, `scripts/image-redirect-map.json`.

Nothing below is blocked on more website code unless Sumith sends corrections.

---

## 1. Sumith — Fact Register (114 rows)

- [ ] Confirm each property fact (guests, kitchen, parking, check-in/out, distances).
- [ ] Confirm **office address** matches GBP (site uses UB Square, Chitpady until you say otherwise — edit `src/data/factCheck.ts` once).
- [ ] Mark workbook **Facts confirmed? = Yes** before treating copy as final.
- [ ] **Reunion Abode Villa, Solandis, Amity** — no new site pages; fix or remove on OTAs/Holidify.

---

## 2. Listings & entity (Tier 1)

- [ ] Google Business Profile (every stay + Ocean Café): name, address, phone, URL, hours, photos; reply to reviews.
- [ ] Booking.com, Airbnb, Expedia/Travelocity, MMT/Agoda — align with site naming (`REUNION …`).
- [ ] See `entity-consistency.md`.

---

## 3. GTM / GA4 (container UI)

Site pushes `dataLayer` events; tags are not in the repo.

- [ ] `GTM-WMZL2TTL`: map `generate_lead`, `whatsapp_click`, `phone_click`, `email_click` to GA4 key events.
- [ ] Optional: AI referral segments per AEO Measurement tab.

---

## 4. After you release (QA)

- [ ] GSC → Request indexing: `public/gsc-reindex-urls.txt`
- [ ] Rich Results Test: home, one villa, `/dining`, `/events`, one blog, one category.
- [ ] Screaming Frog (or similar): titles, metas, alts, internal links.
- [ ] Master Sheet **Verified** column — Sumith checks live URLs.

---

## 5. Optional (not required for go-live)

- [ ] Rename `public/properties/ocean cafe/` → `ocean-cafe/` + extra 301s for all legacy image paths (large asset move).
- [ ] Full **Excel** workbook compare if it has rows beyond the PDF export.
- [ ] AI visibility baseline + monthly tracker (AEO tab).
- [ ] Offline enquiry/booking log spreadsheet (AEO tab).

---

## 6. When you are ready to ship

- [ ] Git commit + push entire local batch (SEO, AEO, images, FAQs, GTM hooks).
- [ ] Cloudflare build on Node 20 (`npm run build:cf`) — you control when.

**To change office address everywhere:** one edit in `src/data/factCheck.ts` → footer, contact, Organization JSON-LD update automatically.