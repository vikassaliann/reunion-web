#!/usr/bin/env node
/**
 * Live smoke crawl: sitemap URLs + favicon/assets (run: npm run crawl:smoke).
 * Optional: CRAWL_BASE_URL=https://www.reunionglobal.in
 */
const BASE = (process.env.CRAWL_BASE_URL ?? "https://www.reunionglobal.in").replace(
  /\/$/,
  ""
);
const UA = "Googlebot/2.1 (+http://www.google.com/bot.html)";
const ICON_UA = "Googlebot-Image/1.0";
const CONCURRENCY = 10;

/** @param {string} html */
function iconLinkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /\brel\s*=\s*["'](?:shortcut\s+icon|icon)["']/i.test(tag));
}

/** @param {string} url */
async function checkPage(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  const html = await res.text();
  const issues = [];
  if (res.status !== 200) issues.push(`HTTP ${res.status}`);
  const icons = iconLinkTags(html);
  if (icons.length !== 1) issues.push(`rel=icon count ${icons.length} (want 1)`);
  for (const tag of icons) {
    if (/reunion-src-logo\.jpeg/i.test(tag)) issues.push("JPEG used as rel=icon");
    if (!/\/favicon\.ico/i.test(tag)) issues.push(`unexpected icon href: ${tag}`);
  }
  if (/\brel\s*=\s*["']shortcut\s+icon["']/i.test(html)) {
    issues.push("shortcut icon present");
  }
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) issues.push("missing <title>");
  const canon = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  )?.[1];
  if (canon && !canon.startsWith(BASE)) {
    issues.push(`canonical off-host: ${canon}`);
  }
  return { url, issues, title: title?.slice(0, 72) ?? "" };
}

async function main() {
  const smRes = await fetch(`${BASE}/sitemap.xml`, { headers: { "User-Agent": UA } });
  if (!smRes.ok) {
    console.error(`Sitemap fetch failed: ${smRes.status}`);
    process.exit(1);
  }
  const xml = await smRes.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!locs.length) {
    console.error("No URLs in sitemap");
    process.exit(1);
  }

  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < locs.length) {
        const url = locs[i++];
        results.push(await checkPage(url));
      }
    })
  );

  const favRes = await fetch(`${BASE}/favicon.ico`, {
    headers: { "User-Agent": ICON_UA },
  });
  const manifestRes = await fetch(`${BASE}/site.webmanifest`, {
    headers: { "User-Agent": UA },
  });
  const assetIssues = [];
  if (!favRes.ok) assetIssues.push(`favicon.ico HTTP ${favRes.status}`);
  else {
    const ct = favRes.headers.get("content-type") ?? "";
    if (!/icon|octet-stream/i.test(ct)) {
      assetIssues.push(`favicon.ico content-type: ${ct}`);
    }
  }
  if (!manifestRes.ok) assetIssues.push(`site.webmanifest HTTP ${manifestRes.status}`);

  const bad = results.filter((r) => r.issues.length);
  console.log(`Crawl smoke — ${BASE}`);
  console.log(`  Sitemap URLs: ${locs.length}`);
  console.log(`  Pages OK: ${locs.length - bad.length}/${locs.length}`);
  console.log(
    `  favicon.ico: ${favRes.status} (${favRes.headers.get("content-type") ?? "?"})`
  );
  console.log(`  site.webmanifest: ${manifestRes.status}`);

  if (bad.length || assetIssues.length) {
    console.log("\nFailures:");
    for (const r of bad) {
      console.log(`  ${r.url}`);
      for (const issue of r.issues) console.log(`    - ${issue}`);
    }
    for (const a of assetIssues) console.log(`  - ${a}`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});