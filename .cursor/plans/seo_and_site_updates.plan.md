# REUNION site batch — full SEO + your feature list

## 0. Git workflow (first step)

```bash
cd reunion-global
git stash push -u -m "pre-seo-batch local wip"
git pull origin main
```

Re-implement on clean `main` (avoid blind `stash pop`). Reference stashed WIP only if useful.

---

## 1. Your UI / product requests (unchanged)

- Candlelight: hero **`cd3.jpeg`**, gallery **`cd1`–`cd8`** from `public/properties/experiances/candlelight/` (rename folder — no trailing space)
- Mobile bottom bar: **Explore Stays** icon ≠ search (bed/map/building)
- Remove **horizontal slideshow indicator lines** (home hero dots; dining/events carousel dots if replaced)
- Home: drop **Popular Stays** label; drop gold **Reunion Global** line above hero **REUNION**
- Contact: **font-futura** (nav); **Book a Reunion stay**; SEO **Contact REUNION** H1
- **`/experiences/beach-birthday`** + nav link; images from `experiances/exp5–9` (+ any new assets)
- Stays nav: Beach Villas | City Stays (no De Homes) | **Hotel Stays** (De Homes + **De Square**) | **Shivamogga Stays** (Serene)
- **`de-square`** property from JustDial + `public/properties/reunion-de-square/` images
- **`/civil-construction`**: Reunion Civil & Construction (events-style; Nemmadi-inspired structure, REUNION branding)
- Dining gallery: **same UX as property gallery** (bento + mobile thumbs + lightbox — [`PropertyDetailSection`](reunion-global/src/components/PropertyDetailSection.tsx))
- **`/partner-with-us`**: stub page + nav/footer links (your choice)

---

## 2. Developer Brief — all 9 tasks (nothing skipped)

| # | Task | Implementation |
|---|------|----------------|
| 1 | **JSON-LD** | **Organization** on home: add `sameAs` (Instagram, YouTube, Facebook when URL confirmed), `telephone`, `legalName` per brief. **LodgingBusiness** on every stay property (+ `de-square`); align `@type`/fields with brief sample. **FAQPage** on every page with visible FAQ (property, dining, candlelight, birthday, partner if FAQ, etc.). **BreadcrumbList**: verify [`Breadcrumbs.tsx`](reunion-global/src/components/Breadcrumbs.tsx) on all routed pages. Rich Results Test on sample URLs after deploy. |
| 2 | **Partner page** | [`/partner-with-us`](reunion-global/src/app/partner-with-us/page.tsx): stub copy + partner form; link Navbar + Footer; **sitemap + llms.txt**. |
| 3 | **Old café link** | Grep site: zero internal links to `/properties/ocean-cafe`; keep 301 in [`next.config.ts`](reunion-global/next.config.ts). |
| 4 | **Meta length** | Home + candlelight meta ≤160 chars (brief suggested copy). |
| 5 | **Experiences title** | `Experiences in Udupi \| Coastal Celebrations \| REUNION` (53 chars). |
| 6 | **Heading order** | No H1→H3 skips on touched pages. Property template: **Connect / Reserve** blocks = styled text, not H2/H3. Fix home, dining, all property pages when editing. |
| 7 | **Sitemap lastmod** | [`sitemap.ts`](reunion-global/src/app/sitemap.ts): per-URL `lastModified` (route file mtime or grouped dates) — not one identical timestamp for all. |
| 8 | **Head tags** | `<html lang="en-IN">` in [`layout.tsx`](reunion-global/src/app/layout.tsx); favicon; GSC env; confirm GA/GTM if present in layout. |
| 9 | **404** | [`not-found.tsx`](reunion-global/src/app/not-found.tsx): links to **Stays** (`/properties`) + **Contact**; returns real **404** (Next default). |

**Post-launch (client, not code):** GSC re-index 17 properties + home; Rich Results + PageSpeed checks from brief checklist.

---

## 3. On-Page SEO Report — dev + content checklist

### Top priorities (report p.2–3)

| Priority | Action |
|----------|--------|
| 1 | Document GSC URL Inspection list for client (properties + home). |
| 2 | **All H1s** to recommended versions (see §4 keyword map). |
| 3 | **All 32+ page titles & metas** to report/guide strings (≤60 title / ≤160 meta). |
| 4 | **Blog → property links** on existing posts (`tourist-places`, `top-10-beaches`, `2-day-itinerary`): “Stay nearby” under each place/beach/day. |
| 5 | Expand tourist + beaches posts toward 1,500+ words (content pass — use report structure). |
| 6 | **Events**: H1 **Beach Weddings & Events in Udupi** (not Gutthu-only); expand toward 600+ words. |
| 7 | **Property template** (all 17 + de-square): breadcrumbs, H1 pattern, opening paragraph, H2 sections, similar stays (3 links), descriptive **alt** text, FAQ + schema, internal links to blogs/dining/experiences. |
| 8 | **New content** (report p.10): Mattu Beach blog, Things to do, Best restaurants, Hoode/Uchila guide — create as blog entries or stubs with full SEO shell from keyword guide. |

### Main pages (report p.3–5) — title / H1 / meta / content notes

Apply to [`page.tsx`](reunion-global/src/app/page.tsx), [`properties/page.tsx`](reunion-global/src/app/properties/page.tsx), category pages, [`dining`](reunion-global/src/app/dining/page.tsx), [`experiences`](reunion-global/src/app/experiences/page.tsx), [`wellness`](reunion-global/src/app/wellness/page.tsx), [`events`](reunion-global/src/app/events/page.tsx), [`about`](reunion-global/src/app/about/page.tsx), [`contact`](reunion-global/src/app/contact/page.tsx), [`blogs`](reunion-global/src/app/blogs/page.tsx):

- **Home**: H1 **Luxury Villas in Udupi** (text, not logo-only); intro naming Malpe, Kapu, Mattu, Hoode, Uchila; FAQ block + FAQPage schema; reviews block if copy available.
- **Properties**: H1 **Villas in Udupi**; intro 100–150 words; card CTAs **View [Property Name]** not generic EXPLORE MORE; property FAQ section.
- **Beach / City categories**: H1s + beach grouping copy (Mattu, Hoode, Uchila, Kapu, Malpe); link beach names to blog sections.
- **Dining**: H1 **Ocean Café — Beach Café on Mattu Beach, Udupi**; one phone number; link **stay next door** (Hridayam/Waves); meta/title from guide.
- **Experiences**: list experiences with links (candlelight, birthday, wellness, events).
- **Wellness / About / Blogs**: titles, H1s, metas per report + guide.

### All 17 property pages (report p.7–9 + table)

Update [`AUDIT_PROPERTY_SEO`](reunion-global/src/app/properties/[id]/page.tsx) + on-page **H1** in [`PropertyDetailSection`](reunion-global/src/components/PropertyDetailSection.tsx) to match **exact** report/guide strings, including:

- **Hoode** wording for Elite/Manor (not Padutonse in body + enquiry labels)
- **Ocean Royal Beach House** phrase
- **Ocean Daaffy Beach House** phrase
- **Garden Villa** H1 for `villa` id (slug rename still **on hold** — H1 only until client confirms)
- **De Homes**: Krishna Temple distance + front-desk phone in copy
- **Serene**: Jog Falls / Shivamogga / Agumbe driving times in copy
- **Ocean Waves / Hridayam**: link **Ocean Café** “dine next door”
- **Ocean Bliss**: St. Mary’s Island / Malpe context
- **Krshna**: MAHE / KMC distances
- **Givaah**: pool villa prominence
- Per-property **meta ≤160 chars** from guide pages 12–18

**LodgingBusiness** schema uses same meta/description/geo as visible page.

### On hold (report) — do not break URLs without approval

- Rename `/properties/villa` slug
- `/properties/reunion-seren` → `reunion-serene` 301
- Full street addresses in schema until confirmed
- Phone number unification until confirmed

---

## 4. Keyword Implementation Guide — full page map (37 pages)

For **every row** in the guide, implement in code:

1. URL (correct slug)
2. **Title tag** (paste from guide)
3. **Meta description** (paste from guide)
4. **H1** (paste from guide)
5. **First sentence** on page body (paste from guide)
6. **H2 headings** listed for that page (add sections or rename existing headings — semantic H2, same visual style)
7. **FAQ** questions on page + **FAQPage** JSON-LD
8. **Internal links** with exact anchor text → target URLs from guide
9. **Image alt** text pattern (descriptive; rename files only when practical)

### New / expanded routes from guide (in addition to your list)

| URL | Notes |
|-----|--------|
| `/experiences/beach-birthday` | Full guide block (title, meta, H1, FAQs, internal links) |
| `/events/beach-venue` | **NEW** page — beach venue keyword; link from `/events` |
| `/partner-with-us` | Villa management company keyword |
| `/properties/category/hotel-stays` | **NEW** — De Homes + De Square; guide “rooms near Krishna Temple” links update to hotel category where appropriate |
| `/properties/category/shivamogga-stays` | **NEW** — Serene only |
| `/properties/de-square` | **NEW** — full property template + guide SEO when published |
| `/blogs/mattu-beach-udupi` | **NEW** blog (49.5k/mo target) |
| `/blogs/things-to-do-in-udupi` | **NEW** |
| `/blogs/best-restaurants-in-udupi` | **NEW** → links `/dining` |
| `/blogs/bangalore-to-udupi-weekend-trip` | **NEW** (stub OK if minimal body) |

### Existing blogs — metadata + links

Update [`blogs.ts`](reunion-global/src/data/blogs.ts) + blog layouts:

- `tourist-places-in-udupi`, `top-10-beaches-to-visit-in-udupi`, `2-day-udupi-itinerary`: guide titles/metas/H1s; **Stay nearby** property links per beach/place; author/date on cards ([`/blogs`](reunion-global/src/app/blogs/page.tsx)).

### Internal linking matrix (sitewide pass)

After pages exist, add guide-specified links from: home, properties, categories, dining, experiences, events, wellness, about, contact, blogs, each property.

### Google Business Profile (not code)

Document in handoff: Ocean Café services (candlelight, birthday), property profile website URLs, category fixes — from guide sidebars.

---

## 5. Civil & Construction (your request; not in SEO PDFs)

- Finish [`/civil-construction`](reunion-global/src/app/civil-construction/page.tsx): hero, services, process, project gallery (incl. De Square), contact CTA; nav after Events; sitemap + llms; metadata `REUNION | Civil & Construction…`; no emoji in UI.

---

## 6. Asset + taxonomy work

- Rename asset folders (no trailing spaces); update all path references.
- [`categories.ts`](reunion-global/src/utils/categories.ts): hotel-stays, shivamogga-stays; move de-homes; add de-square.
- [`properties.json`](reunion-global/src/data/properties.json) + static params for `de-square`.
- [`sitemap.ts`](reunion-global/src/app/sitemap.ts), [`llms.txt`](reunion-global/public/llms.txt), [`llm.txt`](reunion-global/public/llm.txt): all new routes; 18 stays + categories.

---

## 7. Verification

- `npm run build`
- Grep: no `/properties/ocean-cafe` internal links
- Sample Rich Results URLs: home, ocean-waves, de-square, dining, candlelight, beach-birthday, partner-with-us
- Manual: nav dropdowns, mobile bar icon, contact copy/fonts, dining gallery UX, 404 links

---

## 8. Suggested implementation order

1. Git stash + pull + rename assets  
2. Taxonomy + De Square property + category pages  
3. Your UI polish (home, contact, navbar, candlelight images)  
4. New experience/event/partner/civil pages  
5. Dining gallery refactor  
6. **SEO pass 1**: dev brief tasks 1–9  
7. **SEO pass 2**: keyword guide titles/metas/H1s/first lines on all mapped pages  
8. **SEO pass 3**: property template (17 + de-square) + blog links + new blog shells  
9. llms/sitemap sync + build verify  

**Note:** Full 1,500-word blog rewrites and GBP updates are content/ops tasks but **structure, metadata, FAQs, and internal links must ship in this batch** so nothing from the reports is left unaddressed in the codebase.
