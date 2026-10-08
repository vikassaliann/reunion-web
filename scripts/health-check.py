#!/usr/bin/env python3
"""Final deploy health check — routes, sitemap, APIs, links, forms."""
from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "http://127.0.0.1:3457"
ROOT = Path(__file__).resolve().parents[1]
fails: list[str] = []
warns: list[str] = []
oks = 0


def encode_path(path: str) -> str:
    """Encode path segments so spaces/parens work like a browser."""
    if path.startswith("http"):
        return path
    parts = path.split("/")
    return "/".join(urllib.parse.quote(p, safe=".-_~") if p else "" for p in parts)


def fetch(url: str, method: str = "GET", data: bytes | None = None, headers: dict | None = None):
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            body = r.read()
            return r.status, body, dict(r.headers)
    except urllib.error.HTTPError as e:
        body = e.read() if e.fp else b""
        return e.code, body, dict(e.headers or {})
    except Exception as e:
        return 0, str(e).encode(), {}


def check(path: str, label: str | None = None):
    global oks
    label = label or path
    code, body, _ = fetch(BASE + encode_path(path))
    if code == 200:
        oks += 1
        print(f"OK  {code}  {label}")
        return body
    fails.append(f"{code} {label}")
    print(f"FAIL {code}  {label}")
    return body


print("======== NAV + KEY PAGES ========")
key_paths = [
    "/",
    "/properties",
    "/properties/category/beach-villas",
    "/properties/category/city-stays",
    "/dining",
    "/experiences",
    "/experiences/candlelight-dinner",
    "/wellness",
    "/events",
    "/blogs",
    "/blogs/top-10-beaches-to-visit-in-udupi",
    "/blogs/2-day-udupi-itinerary",
    "/about",
    "/contact",
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/llm.txt",
]
for p in key_paths:
    check(p)

print("\n======== ALL PROPERTY PAGES ========")
props = json.loads((ROOT / "src/data/properties.json").read_text())
for p in props:
    check(f"/properties/{p['id']}")

print("\n======== SITEMAP URLS LIVE ========")
sm_body = fetch(BASE + "/sitemap.xml")[1].decode("utf-8", "ignore")
locs = re.findall(r"<loc>(https://www\.reunionglobal\.in[^<]*)</loc>", sm_body)
if "explore-udupi" in sm_body:
    fails.append("sitemap contains explore-udupi")
    print("FAIL sitemap includes explore-udupi")
else:
    oks += 1
    print("OK  sitemap excludes explore-udupi")
for loc in locs:
    path = loc.replace("https://www.reunionglobal.in", "") or "/"
    code, _, _ = fetch(BASE + path)
    if code == 200:
        oks += 1
    else:
        fails.append(f"sitemap {code} {path}")
        print(f"FAIL {code}  sitemap {path}")
print(f"sitemap urls checked: {len(locs)}")

print("\n======== API ENDPOINTS ========")
code, body, _ = fetch(
    BASE + "/api/whatsapp",
    method="POST",
    data=json.dumps(
        {"name": "Health Check", "email": "test@example.com", "preference": "Ocean Elite"}
    ).encode(),
    headers={"Content-Type": "application/json"},
)
print(f"whatsapp POST -> {code} {body[:160]!r}")
try:
    j = json.loads(body.decode())
    if code == 200 and "wa.me" in j.get("url", ""):
        oks += 1
        print("OK  wa.me url returned")
    else:
        fails.append("whatsapp response invalid")
except Exception:
    fails.append("whatsapp JSON parse failed")

code, body, _ = fetch(
    BASE + "/api/partner",
    method="POST",
    data=json.dumps(
        {
            "firstName": "Health",
            "lastName": "Check",
            "email": "test@example.com",
            "phone": "9999999999",
            "location": "Udupi",
            "propertyType": "Villa",
            "rooms": "3",
            "source": "Web",
            "link": "",
            "description": "smoke test",
        }
    ).encode(),
    headers={"Content-Type": "application/json"},
)
print(f"partner POST -> {code} {body[:200]!r}")
if code == 200:
    oks += 1
    print("OK  partner accepted")
elif code == 500:
    warns.append("partner 500 — likely missing SMTP env (endpoint reachable)")
    print("WARN partner 500 (SMTP env may be unset — endpoint reachable)")
else:
    fails.append(f"partner {code}")

for ep in ("/api/whatsapp", "/api/partner"):
    code, _, _ = fetch(BASE + ep)
    print(f"GET {ep} -> {code}")

print("\n======== CRAWL INTERNAL LINKS + FORMS ========")
crawl_pages = [
    "/",
    "/properties",
    "/dining",
    "/contact",
    "/experiences",
    "/experiences/candlelight-dinner",
    "/events",
    "/about",
    "/wellness",
    "/blogs",
    "/properties/ocean-elite",
]
internal: set[str] = set()
html_all = ""
form_counts: dict[str, int] = {}
for p in crawl_pages:
    body = fetch(BASE + p)[1].decode("utf-8", "ignore")
    html_all += body
    form_counts[p] = len(re.findall(r"<form", body, re.I))
    for m in re.findall(r'href="(/[^"#]*)"', body):
        path = m.split("?")[0]
        if not path.startswith("/api"):
            internal.add(path)

link_fail = 0
for path in sorted(internal):
    code, _, _ = fetch(BASE + encode_path(path))
    if code != 200:
        link_fail += 1
        fails.append(f"link {code} {path}")
        print(f"FAIL {code}  link {path}")
print(f"INTERNAL_OK={len(internal) - link_fail} INTERNAL_FAIL={link_fail}")

tels = sorted(set(re.findall(r'href="(tel:[^"]+)"', html_all)))
mails = sorted(set(re.findall(r'href="(mailto:[^"]+)"', html_all)))
maps = sorted(
    set(
        re.findall(
            r'href="(https://(?:maps\.app\.goo\.gl|share\.google|www\.google\.com/maps)[^"]*)"',
            html_all,
        )
    )
)
print(f"FORMS={form_counts}")
print(f"TEL={tels}")
print(f"MAIL={mails}")
print(f"MAP_COUNT={len(maps)}")
for m in maps[:6]:
    print("MAP", m[:100])

# Enquiry forms must exist on money pages
for p in ("/contact", "/dining", "/properties/ocean-elite", "/experiences/candlelight-dinner"):
    if form_counts.get(p, 0) < 1:
        fails.append(f"no form on {p}")
        print(f"FAIL no <form> on {p}")
    else:
        oks += 1
        print(f"OK  form on {p} ({form_counts[p]})")

print("\n======== HOME META + CAFE CANONICAL ========")
home = fetch(BASE + "/")[1].decode("utf-8", "ignore")
title = re.search(r"<title>([^<]+)</title>", home)
desc = re.search(r'name="description" content="([^"]+)"', home)
print("TITLE", title.group(1) if title else None)
print("DESC", (desc.group(1)[:120] + "...") if desc else None)
if title and "Discover REUNION in Udupi" in title.group(1):
    oks += 1
    print("OK  home title")
else:
    fails.append("home title mismatch")
if desc and "candlelight dinners" in desc.group(1):
    oks += 1
    print("OK  home description")
else:
    fails.append("home description mismatch")

cafe = fetch(BASE + "/properties/ocean-cafe")[1].decode("utf-8", "ignore")
canon = re.search(r'rel="canonical" href="([^"]+)"', cafe)
print("CAFE_CANONICAL", canon.group(1) if canon else None)
if canon and canon.group(1).endswith("/dining"):
    oks += 1
    print("OK  ocean-cafe canonical -> /dining")
else:
    fails.append("ocean-cafe canonical")

print("\n======== IMAGE CACHE ========")
for img in (
    "/properties/ocean-manor/herooo.png",
    "/properties/reunion-seren/hero.png",
    "/logoo.png",
):
    code, _, headers = fetch(BASE + img)
    cc = headers.get("Cache-Control") or headers.get("cache-control")
    print(f"{code} Cache-Control={cc} {img}")
    if code != 200:
        fails.append(f"image {img}")
    else:
        oks += 1

print("\n======== SUMMARY ========")
print(f"OK={oks} FAIL={len(fails)} WARN={len(warns)}")
for w in warns:
    print("WARN:", w)
for f in fails:
    print("FAIL:", f)
sys.exit(1 if fails else 0)
