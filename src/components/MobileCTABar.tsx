"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { phoneFor, provinceCodeFromPath, site, telHref, whatsappFor, quoteHref } from "@/config/site";

/**
 * Phones & tablets: a floating forest-green dock — Call (left), a raised
 * fresh-green "Get Quote" button (centre) and WhatsApp (right). It replaces
 * the floating WhatsApp bubble below lg, so nothing else covers the page.
 * On a province page (e.g. /quebec/…) Call and WhatsApp use that province's
 * line when it has its own.
 */
export function MobileCTABar() {
  const code = provinceCodeFromPath(usePathname());
  const tel = telHref(code ? phoneFor(code) : site.defaultPhone);
  const waDigits = code ? whatsappFor(code) : site.whatsappDigits;
  const waUrl = `https://wa.me/${waDigits}?text=${encodeURIComponent(
    `Hi ${site.name}, I would like a free quote for duct cleaning.`
  )}`;

  const side =
    "flex h-full flex-col items-center justify-center gap-1 rounded-full text-[11px] font-semibold text-white/80 transition-colors active:bg-white/10";

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-3 bottom-3 z-50 lg:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-3 items-center rounded-full bg-teal-800/95 px-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-md">
        <a href={tel} className={side} aria-label={`Call ${site.name}`}>
          <Phone className="h-5 w-5 text-teal-400" />
          Call
        </a>

        {/* Raised centre button */}
        <Link
          href={quoteHref(code)}
          className="group flex flex-col items-center justify-end gap-0.5 self-stretch pb-1.5"
          aria-label="Get a free quote"
        >
          <span className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-teal-400 text-teal-800 shadow-[0_10px_24px_-8px_rgba(72,180,122,0.8)] ring-4 ring-teal-800 transition-transform group-active:scale-95">
            <CalendarCheck className="h-6 w-6" />
          </span>
          <span className="text-[11px] font-bold text-white">Get Quote</span>
        </Link>

        <a href={waUrl} target="_blank" rel="noopener noreferrer" className={side} aria-label="Chat on WhatsApp">
          <MessageCircle className="h-5 w-5 text-teal-400" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
