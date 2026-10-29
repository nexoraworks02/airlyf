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

// Content-Security-Policy: the browser only loads scripts, styles, media and
// connections from the sources listed here, which blocks injected third-party
// scripts and stops other sites framing ours (clickjacking). Allowed outside
// hosts: Web3Forms (booking form), Google Analytics + Meta Pixel (load only
// once their ids are set) and Google Maps embeds. Add a host here before
// embedding anything new, or the browser will block it.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "font-src 'self' data:",
  "media-src 'self'",
  `connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Older browsers' version of frame-ancestors 'none'.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // HTTPS only for 2 years (browsers ignore this on plain-http localhost).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  // Every URL ends in "/" — keep the same shape for SEO consistency.
  trailingSlash: true,
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
