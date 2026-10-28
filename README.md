# Airlyf — website

Next.js 16 (App Router) site for Airlyf, built from the template
described in [`SITE_BLUEPRINT.md`](SITE_BLUEPRINT.md). Business details, prices,
areas and page copy all live in `src/config/`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check: `npm run build && npm run start`.

## Before launch

Every value marked `PLACEHOLDER` / `TODO(launch)` in `src/config/site.ts` and
`src/app/layout.tsx` (domain, email, phone/WhatsApp, office address, socials)
must be replaced with the real details. Then follow the launch checklist in
`SITE_BLUEPRINT.md` §9.

## Environment variables

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — booking form email delivery. Create the
  key at web3forms.com **with the Airlyf business inbox**.
- `NEXT_PUBLIC_META_PIXEL_ID` — optional Meta Pixel; it doesn't load while empty.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Search Console HTML-tag value.

## SEO

After deploying, submit `https://airlyf.ca/sitemap.xml` (or the final
domain) in Google Search Console and Bing Webmaster Tools.
