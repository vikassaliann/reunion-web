# Entity consistency (AEO / GEO Plan v2)

| Fact | Website (canonical) | Third-party | Action |
|------|---------------------|-------------|--------|
| Brand | **REUNION** (legal: Reunion Global Private Ltd.) | Mix of “Reunion …” on OTAs | Use “REUNION {Property}” on site + schema |
| Phone | +91 99802 08289 | Same everywhere | Done on site (`factCheck.ts`, footer, contact, forms) |
| Email | support@reunionglobal.in (+ reunionrevenue@gmail.com on Contact) | Prefer domain for schema | Both shown on Contact; Organization schema uses domain email |
| Social | Canonical Facebook profile URL | Not `/share/…` links | Done in footer, contact, `sameAs` |
| Office | UB Square, Court Road, Chitpady, Udupi 576101 | Match GBP when confirmed | On contact, footer, Organization JSON-LD |
| Ocean Café | `/dining` | Mattu Beach GBP | Café phone +91 9972231289 |
| Reunion Abode Villa, Solandis, Amity | **Not published** | Travelocity / Holidify | **Hold** until Fact Register (`factCheck.ts`) |

### Property naming (align OTAs to site)

Official pattern: **REUNION Ocean Elite**, **REUNION De Homes**, **REUNION D Square**, etc. See PDF Entity Consistency tab for Expedia/Travelocity variants.

Update this table when Sumith confirms GBP and OTA renames.
