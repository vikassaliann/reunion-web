# Alt text + Redirect Map — code status

| Item | Status |
|------|--------|
| Pass 1 alts | `imageAlt.ts` + `altFor(src)` |
| 215 renames | `scripts/image-redirect-map.json`, 301 in `next.config.ts` |
| Live URLs in CMS/UI | `.webp` only in `src/` |
| Legacy files on disk | Removed after `.webp` exists (`npm run images:prune-legacy`) |

Regenerate pipeline: `images:redirect-map` → `images:apply` → `images:prune-legacy`.

URL polish: `experiences/`, `ocean-cafe/`, all beach hero images `.webp` — `npm run images:url-polish`.