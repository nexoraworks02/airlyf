import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { FooterRegions } from "./FooterRegions";
import { BookingCTA } from "./sections/BookingCTA";
import { services, site, telHref } from "@/config/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const COMPANY_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/duct-cleaning-cost/", label: "Prices" },
  { href: "/#compare", label: "Compare quotes" },
  { href: "/service-areas/", label: "Service areas" },
  { href: "/blog/", label: "Duct care guides" },
];

// Footer: deep-green booking band → province picker (inner pages) → link columns → legal bar.
export function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-24 bg-teal-800 text-white/70">
      <BookingCTA />

      {/* Province picker (not on the homepage — the map lists regions there) */}
      <FooterRegions />

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          {/* Full illustrated logo (truck + technician) on a light card */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="inline-block rounded-2xl bg-canvas p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Image
              src="/images/logo/logo-full.png"
              alt={`${site.name} — Duct Cleaning Services`}
              width={989}
              height={827}
              sizes="220px"
              className="h-auto w-[180px] sm:w-[200px]"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Air duct, furnace, dryer vent and HRV cleaning with published prices and every vent included.
          </p>
          <div className="mt-6 flex gap-3">
            {site.facebookUrl && (
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal-400 hover:text-teal-800"
              >
                <FacebookIcon />
              </a>
            )}
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-teal-400 hover:text-teal-800"
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>

        <FooterColumn title="Services" className="lg:col-span-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}/`} className="transition-colors hover:text-white">
                {s.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Company" className="lg:col-span-2">
          {COMPANY_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          {site.phones.map((p) => (
            <li key={p.region} className="space-y-2">
              <a href={telHref(p.phone)} className="flex items-center gap-2 font-bold text-white hover:text-mint-400">
                <Phone className="h-4 w-4 text-mint-400" />
                {p.phone}
              </a>
              <a
                href={`https://wa.me/${p.whatsappDigits}?text=${encodeURIComponent(
                  `Hi ${site.name}, I want a free duct cleaning quote.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-mint-400" />
                WhatsApp us
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-mint-400" />
              {site.email}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" />
            <span>{site.address}</span>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Every vent included · Free furnace inspection · Price confirmed first</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
