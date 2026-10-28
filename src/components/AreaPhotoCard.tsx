import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Province } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Service-area card: the area's landmark photo with its name and starting
 * price on a dark fade at the bottom. Photo zooms + arrow slides on hover.
 */
export function AreaPhotoCard({ area, className }: { area: Province; className?: string }) {
  return (
    <Link
      href={`/${area.slug}/`}
      aria-label={`Air duct cleaning in ${area.name} — from $${area.priceFrom}`}
      className={cn(
        "group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-md shadow-[0_24px_50px_-28px_rgba(16,45,36,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-26px_rgba(16,45,36,0.75)]",
        className
      )}
    >
      <Image
        src={area.photo}
        alt={`${area.landmark} — ${area.name}`}
        fill
        quality={90}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Dark fade so the white text is always readable */}
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b2219]/90 via-[#0b2219]/25 to-transparent" />

      <div className="flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
            <MapPin className="h-3.5 w-3.5" />
            Air duct cleaning
          </p>
          <p className="mt-1 font-display text-xl font-extrabold leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
            {area.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-mint-600">from ${area.priceFrom}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-teal-800 shadow-lg transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
