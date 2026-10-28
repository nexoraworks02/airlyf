import type { NextConfig } from "next";

// Old URLs → new pages. permanent: true issues a 308 so users and Google
// carry over cleanly. Airlyf is a brand-new domain, so there is
// nothing to redirect yet — add entries here if an old site's URLs need
// to point at the new pages.
const legacyRedirects: { source: string; destination: string }[] = [];

// Province pages live at /<province>/ (canonical). /service-areas/<province>/
// is an alias that 308s there, so both URL styles work without duplicate pages.
const PROVINCE_SLUGS = [
  "ontario",
  "alberta",
  "saskatchewan",
  "british-columbia",
  "manitoba",
  "quebec",
  "maritime-provinces",
];
const provinceAliases = PROVINCE_SLUGS.map((slug) => ({
  source: `/service-areas/${slug}`,
  destination: `/${slug}/`,
}));

const nextConfig: NextConfig = {
  // Every URL ends in "/" — keep the same shape for SEO consistency.
  trailingSlash: true,
  images: {
    // AVIF first (sharpest per byte), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows listed qualities: 75 = default, 90 = large photos.
    qualities: [75, 90],
  },
  async redirects() {
    return [...legacyRedirects, ...provinceAliases].map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
