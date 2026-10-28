# Website Blueprint — Local Service Business (built from Fresh Air Quality)

A reusable recipe for a fast, SEO-ready, mobile-first website for a multi-area
home-service business (duct cleaning, HVAC, plumbing, cleaning, etc.).
Copy this project, change the **config files** and **brand assets**, and you get
a new site with the same structure. Change the theme tokens to make it look
different.

Live reference: https://freshairquality.ca

---

## 1. Tech stack

| Part | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) — read `node_modules/next/dist/docs/` before using Next APIs (see `AGENTS.md`) |
| UI | React 19, TypeScript, **Tailwind CSS v4** (`@theme` tokens in `globals.css`) |
| Animation | framer-motion (scroll reveals, tabs), CSS keyframes (sparkles, marquee, pops) |
| Icons | lucide-react |
| Hosting | **Vercel** (auto-deploys from GitHub `main`) |
| Domain + DNS | **Cloudflare Registrar** (domain in the owner's own account) |
| Business email | Titan (via Hostinger) — or free Cloudflare Email Routing → Gmail |
| Booking emails | **Web3Forms** (free, 250/month, no backend) |
| Chat | WhatsApp click-to-chat (`wa.me`) |
| Tracking (optional) | Meta Pixel, GA4 — load only when IDs are set |

Run: `npm install` → `npm run dev` · Production check: `npm run build && npm run start`.

---

## 2. Folder map

```
src/
  app/
    page.tsx                     Homepage (sections in order, see §4)
    layout.tsx                   <head>, fonts, Navbar/Footer, site-wide JSON-LD, booking modal, WhatsApp
    globals.css                  Design tokens (@theme), .theme-dark, keyframes
    [province]/page.tsx          Area pages  (/ontario/, /quebec/ …)
    [province]/[city]/page.tsx   City pages  (/ontario/toronto/ …)
    services/[slug]/page.tsx     Service pages (/services/air-duct-cleaning/ …)
    duct-cleaning-cost/          Price guide hub + one per city (/duct-cleaning-cost/toronto/)
    blog/                        Blog list + articles (not in menu — SEO only)
    service-areas/page.tsx       All-areas hub
    sitemap.ts · robots.ts · opengraph-image.tsx · icon.png · apple-icon.png · favicon.ico · not-found.tsx
  components/
    Navbar, Footer, Logo, MobileCTABar (Call / Get Quote bar on phones),
    WhatsAppButton (floating mini chat), BookingModal + BookingForm,
    ProvinceLanding, PriceTable, Breadcrumbs, RichText, ServiceFAQ, AreaPhotoCard, MetaPixel
    sections/  Hero, ServiceCards, About, Services, PricingPlans, Stats,
               VideoTestimonials, Areas, FAQ, BookingCTA (footer banner), Reviews (off until real reviews)
    ui/        Button, Container, Section/SectionHeading, Reveal/Stagger, CardDecor,
               Sparkle, Eyebrow, CountUp, ScrollProgress
  config/      ← EVERYTHING BUSINESS-SPECIFIC LIVES HERE (see §3)
  lib/         utils (cn), video (download protection props)
public/
  images/logo/   logo files (navy, white, square, google)
  images/areas/  one landmark photo per area
  images/fresh/  service/technician photos
  videos/hero/   hero video + poster   videos/feedback/  customer videos (watermarked) + thumbnails
```

---

## 3. Config-driven content (change these, the whole site updates)

| File | What it holds |
|---|---|
| `config/site.ts` | Brand name, domain, email, phones (per province + WhatsApp), social links, addresses, **pricing tiers**, provinces list, services list, nav menu, helpers (`phoneFor`, `whatsappFor`, `addressFor`, `contactLineFor`, `telHref`) |
| `config/service-areas.ts` | Area page copy (SEO title/description, sections, list of cities served) |
| `config/cities.ts` | City pages: unique intro, climate, housing, neighbourhoods, 3 cost factors, FAQs, nearby towns |
| `config/services.ts` | Service page copy: headline, price note, what's included, 4-step process, FAQs, SEO |
| `config/cost.ts` | Price-guide shared copy (what's included, how to compare quotes, auto price FAQs) |
| `config/blog.ts` | Blog articles; paragraphs support `[label](/link/)` inline links |
| `config/faqs.ts` | Homepage FAQ |
| `config/feedback-videos.ts` | Customer video list |
| `config/reviews.ts` | Real Google reviews only (section stays hidden until added) |

**Pricing model** (`site.ts`): each area points to a tier.
`tier = { base: Basic service (from price), addons: [ {id, label, price, unit?, maxQty?} ] }`
- `unit` + `maxQty` = priced per piece (e.g. furnace, fan) → booking form shows − / + stepper.
- Prices are **never typed in page copy** — pages read them from the tier, so one edit updates
  the pricing section, booking form, price guides, city cards, blog and FAQs.

---

## 4. Homepage — section order

1. **Navbar** — logo, menu (Home, Services ▾, Pricing, Reviews, Service Areas ▾ with landmark thumbnails, Contact), Call button
2. **Hero** — full-width map video (fades to poster), headline, "from $X", buttons (desktop only; phones use bottom bar)
3. **ServiceCards** — 3 quick service cards overlapping the hero + "Make appointment" card
4. **About** — photo, "$X starting price" badge, trust points
5. **Services** — full service grid → service pages
6. **PricingPlans** — tabs per price tier; Basic card + add-on list
7. **Stats** — animated count-up numbers
8. **VideoTestimonials** — featured edited video + customer clip grid (watermarked, download-protected)
9. **Areas** — landmark photo cards → area pages
10. **FAQ** — accordion + FAQPage schema
11. **Footer** — overlapping **BookingCTA** banner (Book now + Call/WhatsApp of the open province), links, map, contacts

Site-wide: **BookingModal** (any link to `#quote` opens it, full-screen on phones, keeps typed data),
**MobileCTABar** (Call Now / Get Quote, province-aware number), **WhatsAppButton** (mini chat window, ding sound after interaction).

---

## 5. Page map (SEO structure — 59 URLs)

| Type | URL pattern | Count |
|---|---|---|
| Home + Service Areas hub | `/`, `/service-areas/` | 2 |
| Area (province) | `/ontario/` … (kept identical to the old site's URLs) | 7 |
| Service | `/services/[slug]/` | 6 |
| City | `/[province]/[city]/` | 18 |
| Price guide hub + city guides | `/duct-cleaning-cost/`, `/duct-cleaning-cost/[city]/` | 19 |
| Blog list + articles (hidden from menu) | `/blog/`, `/blog/[slug]/` | 7 |

Every page has: unique `<title>` (absolute), meta description, one H1, self canonical (trailing
slash), Open Graph, breadcrumbs (+ BreadcrumbList schema) on deep pages.

**Structured data:** HVACBusiness/LocalBusiness (layout, with `logo`, `sameAs` socials, areas,
services) · Service + City (city pages) · Article + FAQPage (price guides) · BlogPosting
(blog) · FAQPage (service pages, homepage).

**Other SEO:** `sitemap.ts` (all pages), `robots.ts` (allow all + sitemap), 308 redirects for old
URLs in `next.config.ts`, `trailingSlash: true`, favicon.ico 16/32/48 + icon.png + apple-icon.

---

## 6. Design system

- **Colours** (`globals.css` `@theme`): one brand navy scale (`teal-*` names = logo navy),
  silver-blue accent (`mint-*`), band colours (`band-900/700/500`) for blue sections,
  `.theme-dark` for inner pages (services, cities, price guides, blog).
- **Font:** Heebo (all text).
- **Signature details:** cards with one extra-rounded corner (`rounded-br-[3–5rem]`),
  `CardDecor` corner bubble + twinkling sparkles (from the logo's stars), eyebrow labels,
  scroll reveals, button shine on hover, price "pop" when it changes.
- **Mobile rules:** no hero buttons on phones (bottom bar instead), landmark as a banner (not a
  stretched background), `overflow-x: clip` on body, test at 375px.

**To make a new brand look different:** change the `@theme` colour values, the font in
`layout.tsx`, the logo files, the card corner style in `CardDecor`/sections, and the hero media.

---

## 7. Booking system

- Steps: details → property (area, address, dwelling, size) → add-ons → day & time → live summary → submit.
- Area sets all prices; per-unit add-ons use steppers; total is always the exact number (no count-up).
- Submit → Web3Forms → email to the address the **access key was created with** (create the key
  with the business email!). Success only shows after Web3Forms confirms; on failure the
  customer gets a WhatsApp fallback. Honeypot anti-spam.
- Env var: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (Vercel → Settings → Environment Variables,
  **not** "Sensitive", then redeploy).

---

## 8. Media

- Hero: 6–8 s loop video + poster image (webp).
- Customer videos: compressed (≤720p), **logo watermark burned in** (ffmpeg overlay), webp
  thumbnails, `controlsList="nodownload"`, no right-click / PiP / casting.
- Photos: webp/avif via `next/image`, `images.qualities: [75, 90]` in `next.config.ts`.
- Rules: only real photos/reviews of the business; no other brands' logos in images.

---

## 9. Launch checklist (new site)

1. Buy the domain **in the owner's own account** (Cloudflare). Auto-renew ON.
2. Vercel: import GitHub repo → add domain + www (www → 308 to apex).
3. Cloudflare DNS (grey cloud / DNS only): `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`.
   **Never change nameservers** when an email/hosting provider suggests it.
4. Email: Titan/Workspace MX + SPF (one SPF record only) + DMARC `v=DMARC1; p=none;`.
5. Web3Forms key (created with the business email) → Vercel env → redeploy → send a TEST booking.
6. Update `site.url`, email, phones, addresses, socials in `config/site.ts`.
7. Google Search Console (Domain property, TXT in Cloudflare) → submit `sitemap.xml` → request indexing for top pages (~10/day).
8. Bing Webmaster Tools → import from Search Console.
9. Google Business Profile + Bing Places + Apple Business Connect, same name/phone/site everywhere.
10. Facebook/Instagram: add website link.

---

## 10. Rebrand checklist (to create the next site from this one)

- [ ] `config/site.ts` — name, tagline, description, url, email, phones/WhatsApp, socials, addresses, provinces, pricing, services, nav
- [ ] `config/service-areas.ts`, `cities.ts`, `services.ts`, `cost.ts`, `blog.ts`, `faqs.ts` — **rewrite copy** (unique text, no copy-paste between sites)
- [ ] Rename the price-guide route folder if the trade differs (e.g. `/plumbing-cost/`)
- [ ] Logo files, `icon.png`, `apple-icon.png`, `favicon.ico`, `logo-google.png`, `opengraph-image.tsx`
- [ ] `globals.css` theme colours + font → new look
- [ ] Hero video/poster, area photos, service photos, customer videos (re-watermark with new logo)
- [ ] `next.config.ts` redirects (old site's URLs → new pages)
- [ ] `layout.tsx` JSON-LD business type, address, areas
- [ ] Env vars: Web3Forms key, Meta Pixel ID, GA4 ID
- [ ] Build, check every page at 375px and desktop, send a test booking, then launch (§9)

---

## 11. Lessons learned (avoid these)

- Domain/hosting in someone else's name = you can lose the site. Always owner's account.
- Web3Forms emails go to the key's creation email, not your MX — create the key with the business inbox.
- Vercel won't allow `NEXT_PUBLIC_` vars marked Sensitive.
- Cloudflare proxy (orange cloud) breaks Vercel HTTPS — keep DNS only.
- Hostinger/other providers may push "point your nameservers to us" — ignore for email.
- In flex layouts, mixed JSX text like `Full {city} price guide` can lose spaces — use a template string.
- Animated price counters can show a wrong in-between number — show the exact total.
- Vercel's GitHub webhook can be delayed; check the deployment's commit SHA after each push.
