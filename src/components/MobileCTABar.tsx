"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, CalendarCheck } from "lucide-react";
import { phoneFor, provinceCodeFromPath, site, telHref } from "@/config/site";

export function MobileCTABar() {
  // On a province page (e.g. /quebec/…) call that province's line.
  const code = provinceCodeFromPath(usePathname());
  const tel = telHref(code ? phoneFor(code) : site.defaultPhone);
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t-2 border-teal-100 bg-white/95 backdrop-blur-md lg:hidden">
      <a
        href={tel}
        className="flex items-center justify-center gap-2 border-r border-slate-200 py-4 font-display font-bold uppercase tracking-wide text-teal-700"
      >
        <Phone className="h-5 w-5" />
        Call Now
      </a>
      <Link
        href="/#quote"
        className="flex items-center justify-center gap-2 bg-teal-600 py-4 font-display font-bold uppercase tracking-wide text-white"
      >
        <CalendarCheck className="h-5 w-5" />
        Get Quote
      </Link>
    </div>
  );
}
