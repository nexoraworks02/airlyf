import { hasVideoTestimonials } from "./feedback-videos";
import { reviews } from "./reviews";

// Single source of truth for the Airlyf brand.
// Change the name, phones, pricing, or service areas here and the whole site updates.

// TODO(launch): every value marked PLACEHOLDER must be replaced with the real
// business details before going live (see SITE_BLUEPRINT.md §9).
const PHONE = "(647) 947-9124"; // main line (from the previous airlyf.ca site)
const PHONE_DIGITS = "16479479124"; // same number, digits only, for wa.me (WhatsApp)

export const site = {
  name: "Airlyf",
  // Primary host (non-www). www.airlyf.ca should redirect here on Vercel.
  url: "https://airlyf.ca",
  tagline: "Duct & Furnace Cleaning Specialists",
  description:
    "Airlyf cleans air ducts, furnaces, dryer vents and HRVs for homes and businesses in Ontario, Alberta, Quebec, British Columbia, Manitoba, Saskatchewan and the Maritimes. Flat, published prices, trained technicians and a free furnace inspection with every visit — request your free quote.",
  // Search-result snippet (Google shows ~155 characters); `description` above
  // is the fuller version used in business info for search engines.
  metaDescription:
    "Air duct, furnace and dryer vent cleaning in Ontario, Alberta, Quebec, BC, Manitoba, Saskatchewan and the Maritimes. Flat prices, free furnace inspection.",
  email: "support@airlyf.ca",
  whatsapp: PHONE,
  // WhatsApp number in full international digits (no +, spaces or symbols) for wa.me links.
  whatsappDigits: PHONE_DIGITS,
  // Regional contact numbers — shown together in the footer (Call + WhatsApp per region).
  phones: [
    { region: "Canada-wide", code: "ON", phone: PHONE, whatsappDigits: PHONE_DIGITS },
  ],
  // Default/general number — used anywhere the visitor's province isn't known.
  defaultPhone: PHONE,

  // --- Social / marketing (leave "" to hide the icon until provided) ---
  facebookUrl: "https://www.facebook.com/share/1AYmaL5tRp/",
  instagramUrl: "https://www.instagram.com/airlyf_ductcleaning",

  // --- Meta Ads tracking ---
  // Set NEXT_PUBLIC_META_PIXEL_ID in your environment. While empty, the Pixel
  // simply doesn't load (no errors). Never use a fake id.
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",

  // --- Google Analytics 4 ---
  // While empty, GA simply doesn't load (no errors). Never use a fake id.
  gaMeasurementId: "",

  // --- Google Search Console ---
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",

  // --- Booking email delivery (Web3Forms — free, no backend) ---
  // SETUP (one time, ~30 seconds):
  //   1. Go to https://web3forms.com
  //   2. In "Create Access Key", enter the Airlyf inbox that should receive bookings.
  //   3. Put the key in .env.local as NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
  // Until a valid key is set, the booking form shows an error on submit
  // (it never silently "succeeds").
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",

  // --- Business location (Google Maps — key-free embed) ---
  // PLACEHOLDER — city only until the real office address is confirmed.
  address: "Toronto, ON",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Toronto,+ON&t=m&z=11&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Toronto,+ON",
} as const;

export type Service = {
  slug: string;
  name: string;
  short: string;
  benefit: string;
  icon: string; // lucide icon name
};

export const services: Service[] = [
  {
    slug: "air-duct-cleaning",
    name: "Air Duct Cleaning",
    short: "Supply lines, returns and registers cleaned under negative air pressure.",
    benefit: "Less dust in every room",
    icon: "Wind",
  },
  {
    slug: "furnace-cleaning",
    name: "Furnace Cleaning",
    short: "Blower and cabinet cleaned so your furnace heats quietly and evenly.",
    benefit: "Easier winters",
    icon: "Thermometer",
  },
  {
    slug: "dryer-vent-cleaning",
    name: "Dryer Vent Cleaning",
    short: "Packed lint cleared from the dryer to the outside hood.",
    benefit: "Faster, safer drying",
    icon: "Flame",
  },
  {
    slug: "ac-cleaning",
    name: "AC Coil Cleaning",
    short: "Coil and drain cleaned so your AC cools faster on hot days.",
    benefit: "Stronger summer cooling",
    icon: "Snowflake",
  },
  {
    slug: "filter-change",
    name: "Filter Change",
    short: "The right-size filter fitted while we're already at the furnace.",
    benefit: "Keeps clean ducts clean",
    icon: "Filter",
  },
  {
    slug: "brush-cleaning",
    name: "Brush Cleaning",
    short: "Spinning brushes scrub the stuck-on layer that suction leaves behind.",
    benefit: "The deepest clean",
    icon: "Brush",
  },
];

/* ---------------- Pricing ---------------- */

// One price line. `unit` marks items priced per piece (e.g. "furnace", "fan");
// the booking form then asks "how many" (0 … maxQty).
export type PriceItem = { id: string; label: string; price: number; unit?: string; maxQty?: number };

export type PriceTier = {
  base: PriceItem; // Basic Duct Cleaning — the starting ("from") price
  addons: PriceItem[];
};

// What the Basic Duct Cleaning includes. A furnace INSPECTION is free;
// furnace CLEANING is always an add-on (per furnace), never part of a package.
export const BASIC_INCLUDES = [
  "Every supply & return vent in the home",
  "Main trunk lines and branch runs",
  "Negative-air vacuum & rotary tools",
  "Free furnace inspection",
  "Price confirmed before we start",
];

const tier = (p: {
  duct: number;
  furnace: number;
  ac: number;
  dryer: number;
  hrv: number;
  heatPump: number;
  centralVacuum: number;
  exhaustFan: number;
  brush: number;
}): PriceTier => ({
  base: { id: "basic", label: "Basic Duct Cleaning", price: p.duct },
  addons: [
    { id: "furnace", label: "Furnace Cleaning", price: p.furnace, unit: "furnace", maxQty: 3 },
    { id: "ac", label: "AC Cleaning", price: p.ac },
    { id: "dryer", label: "Dryer Vent", price: p.dryer, unit: "vent", maxQty: 3 },
    { id: "hrv", label: "HRV", price: p.hrv },
    { id: "heat-pump", label: "Heat Pump Cleaning", price: p.heatPump },
    { id: "central-vacuum", label: "Central Vacuum", price: p.centralVacuum },
    { id: "exhaust-fan", label: "Exhaust Fan", price: p.exhaustFan, unit: "fan", maxQty: 6 },
    { id: "brush-cleaning", label: "Brush Cleaning", price: p.brush },
  ],
});

// Ontario (includes Toronto and the GTA)
const TIER_ONTARIO = tier({ duct: 129, furnace: 69, ac: 69, dryer: 19, hrv: 69, heatPump: 69, centralVacuum: 49, exhaustFan: 19, brush: 100 });
// Every other area
const TIER_REST = tier({ duct: 179, furnace: 79, ac: 79, dryer: 49, hrv: 99, heatPump: 79, centralVacuum: 79, exhaustFan: 29, brush: 150 });

// Price of one add-on in a tier (throws on a typo'd id so pages never show "$undefined").
export function addonPrice(t: PriceTier, id: string): number {
  const a = t.addons.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown add-on: ${id}`);
  return a.price;
}

export type Province = {
  code: string;
  name: string;
  slug: string; // URL, e.g. /ontario/
  city: string;
  priceFrom: number;
  pricing: PriceTier;
  photo: string; // landmark photo (cards, dropdown, province page hero)
  landmark: string; // what the photo shows (alt text)
  // Province-specific contact number. Falls back to site.defaultPhone when unset.
  phone?: string;
  // WhatsApp digits for that number (wa.me links). Falls back to site.whatsappDigits.
  whatsappDigits?: string;
  // Local office address shown on that province's pages. Falls back to site.address.
  address?: string;
};

// Areas served. Pricing per area drives the "Where We Serve" cards AND the
// booking calculator. Addresses are city-only PLACEHOLDERS; add phone /
// whatsappDigits to a province if it gets its own line.
export const provinces: Province[] = [
  { code: "ON", address: "Toronto, ON", name: "Ontario", slug: "ontario", city: "Toronto", priceFrom: TIER_ONTARIO.base.price, pricing: TIER_ONTARIO, photo: "/images/areas/area-ontario.webp", landmark: "the Toronto skyline and CN Tower across Lake Ontario" },
  { code: "AB", address: "Calgary, AB", name: "Alberta", slug: "alberta", city: "Calgary", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-alberta.webp", landmark: "Moraine Lake in Banff National Park" },
  { code: "QC", address: "Montréal, QC", name: "Quebec", slug: "quebec", city: "Montreal", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-quebec.webp", landmark: "Château Frontenac in Quebec City" },
  { code: "BC", address: "Vancouver, BC", name: "British Columbia", slug: "british-columbia", city: "Vancouver", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-british-columbia.webp", landmark: "Canada Place and the North Shore mountains in Vancouver" },
  { code: "MB", address: "Winnipeg, MB", name: "Manitoba", slug: "manitoba", city: "Winnipeg", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-manitoba.webp", landmark: "the Canadian Museum for Human Rights in Winnipeg" },
  { code: "SK", address: "Saskatoon, SK", name: "Saskatchewan", slug: "saskatchewan", city: "Saskatoon", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-saskatchewan.webp", landmark: "a grain elevator in Saskatchewan wheat fields" },
  { code: "MT", name: "Maritime Provinces", slug: "maritime-provinces", city: "Halifax", priceFrom: TIER_REST.base.price, pricing: TIER_REST, photo: "/images/areas/area-maritime.webp", landmark: "the Peggy’s Cove lighthouse in Nova Scotia" },
];

// Lowest "from" price anywhere — used for site-wide "from $X" copy.
export const lowestPrice = Math.min(...provinces.map((p) => p.priceFrom));

// Resolves the right contact number for a province, falling back to the
// general default when a province has no dedicated line.
export function phoneFor(provinceCode: string): string {
  return provinces.find((p) => p.code === provinceCode)?.phone ?? site.defaultPhone;
}

// Office address for a province, else the main address.
export function addressFor(provinceCode: string): string {
  return provinces.find((p) => p.code === provinceCode)?.address ?? site.address;
}

// The one contact line to show for a province: its own number if it has one,
// otherwise the main Canada-wide line.
export function contactLineFor(provinceCode?: string) {
  const p = provinces.find((x) => x.code === provinceCode);
  if (p?.phone) return { region: p.name, phone: p.phone, whatsappDigits: p.whatsappDigits ?? site.whatsappDigits };
  return { region: "Canada-wide", phone: site.defaultPhone, whatsappDigits: site.whatsappDigits };
}

// WhatsApp digits for a province's line (if it has its own), else the main line.
export function whatsappFor(provinceCode: string): string {
  return provinces.find((p) => p.code === provinceCode)?.whatsappDigits ?? site.whatsappDigits;
}

// Province code from a URL path ("/quebec/montreal/" → "QC"), or undefined.
export function provinceCodeFromPath(pathname: string): string | undefined {
  const slug = pathname.split("/").filter(Boolean)[0];
  return provinces.find((p) => p.slug === slug)?.code;
}

// Preview image for links shared on Facebook, WhatsApp, X, etc. Every page's
// `openGraph` must include `images: [ogImage]` — a page that sets its own
// openGraph otherwise drops the image. A blog post can pass its own instead.
export const ogImage = {
  url: "/images/og/airlyf-share.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

// Link to the homepage booking section (sections/BookingSection.tsx, #quote).
// With a province code the form starts on that province: "/?area=AB#quote".
export function quoteHref(provinceCode?: string): string {
  return provinceCode ? `/?area=${provinceCode}#quote` : "/#quote";
}

// tel: link in international format, e.g. "(416) 555-0123" → "tel:+14165550123".
export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "").slice(-10)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/duct-cleaning-cost/" },
  // "Reviews" points at the testimonials (or the video section), so it only
  // shows once real reviews or videos exist.
  ...(reviews.length > 0
    ? [{ label: "Reviews", href: "/#reviews" }]
    : hasVideoTestimonials
      ? [{ label: "Reviews", href: "/#videos" }]
      : []),
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Contact", href: "/#contact" },
];
