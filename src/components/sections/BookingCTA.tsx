"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Container } from "../ui/Container";
import { contactLineFor, provinces, site, telHref, quoteHref } from "@/config/site";

/**
 * Full-width deep-green booking band at the top of the footer on every page. "Book
 * Your Cleaning" links to the homepage booking section (quoteHref). On a
 * province page it names that area, shows its starting price, starts the
 * booking form on that province, and the
 * Call / WhatsApp buttons use that province's line when it has its own.
 */
export function BookingCTA() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean)[0];
  const area = provinces.find((p) => p.slug === slug);
  const priceFrom = area?.priceFrom ?? Math.min(...provinces.map((p) => p.priceFrom));
  const line = contactLineFor(area?.code);
  const waText = encodeURIComponent(
    `Hi ${site.name}, I want a free duct cleaning quote${area ? ` in ${area.name}` : ""}.`
  );

  return (
    <div className="relative isolate overflow-hidden bg-teal-600 text-white">
      {/* Soft fresh-green glow, top right */}
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-teal-400/20 blur-[100px]"
      />
      <Container className="relative flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-400">Ready when you are</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {`Book your ${area ? `${area.name} ` : ""}duct cleaning — from $${priceFrom}`}
          </h2>
          <p className="mt-3 text-white/75">
            Takes about two minutes. Every vent included, and your total is confirmed before we start.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={quoteHref(area?.code)}
            className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap bg-teal-400 px-7 py-4 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
          >
            <CalendarCheck className="h-5 w-5" />
            Book Your Cleaning
          </Link>
          <a
            href={telHref(line.phone)}
            aria-label={`Call ${line.region} ${line.phone}`}
            className="btn-outline inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/40 px-6 py-4 text-[15px] font-bold transition-colors hover:border-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {line.phone}
          </a>
          <a
            href={`https://wa.me/${line.whatsappDigits}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${line.region} ${line.phone}`}
            className="btn-outline inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#25D366] px-6 py-4 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </Container>
    </div>
  );
}
