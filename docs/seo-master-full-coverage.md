# SEO Master Sheet v2 — full PDF coverage (website)

Source PDF: `docs/Reunion_SEO_Master_Sheet_1.pdf` (Instructions tab). Supporting exports: `Reunion-On-Page-SEO-Report.pdf`, `Reunion-SEO-Developer-Brief.pdf`.

The workbook has **five tabs**. Each is implemented in code as follows:

| Tab | Repository home | Status |
|-----|-----------------|--------|
| **1. Page Spec** (title, meta, H1, outline) | `src/data/onPageOverrides.ts`, `keywordGuide.ts`, `propertySeo.ts`, per-route `page.tsx` metadata | Done |
| **2. Site-wide fixes** | `robots.ts`, `sitemap.ts`, `public/llms.txt`, `layout.tsx`, GTM, 404, redirects, cache headers | Done |
| **3. Heading outline** | One H1 per route; property `PropertyDetailSection` H2s; `KeywordSeoSections` on hub pages | Done |
| **4. Keyword evidence** | `keywordGuide.ts` sections + links; trimmed bodies via `trimSeoSectionBody` | Done |
| **5. Fact Check** | `src/data/factCheck.ts`, `propertyFaqs.ts`, `pageFaqs.ts`; Sumith sign-off tracked in `aeo-geo-pending.md` | Code done; formal 114-row sign-off pending |

## Master Sheet rules (page 1)

- One H1 first; H1→H2→H3→H4 without skips — enforced on property template and hub sections.
- Title ≤60, meta 120–155 — `onPageOverrides` + `propertySeo`; run `node scripts/verify-seo-master.mjs`.
- Villa location lists = plain text, not extra H2s — `TOURIST_ROUTES` in `PropertyDetailSection`.
- Facts before publish — gated in `factCheck.ts`.

## Bundled deliverables (four reports)

| Report | File / feature |
|--------|----------------|
| 28 internal links | `src/data/internalLinksAudit.ts` + `scripts/verify-seo-master.mjs` |
| Alt text program | `src/data/imageAlt.ts`, `scripts/generate-image-alt-map.mjs`, compression script |
| Redirects | `next.config.ts` + `src/data/redirectMap.ts` |
| GSC reindex list | `public/gsc-reindex-urls.txt` |
| AEO overlap | `docs/aeo-geo-checklist.md` |

## Verify locally

```bash
node scripts/verify-seo-master.mjs
npx tsc --noEmit
```

## Still not “workbook Verified” (Sumith / post-launch)

Listed in `docs/seo-master-pending.md` and `docs/aeo-geo-pending.md`: Fact Register columns, GBP/OTA sync, Screaming Frog crawl, optional `ocean cafe/` asset rename, GTM→GA4 tag wiring in container UI.

**Website implementation of the Master Sheet PDF: 100%.** Program sign-off in the spreadsheet sense waits on Sumith **Verified** + third-party listings.