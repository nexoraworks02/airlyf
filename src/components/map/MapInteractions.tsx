"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { MAP_VIEWBOX } from "./regions";

export type MapRegionInfo = {
  key: string;
  slug: string;
  name: string;
  priceFrom: number;
  blurb: string;
  cities: string[];
  photo?: string; // landmark photo (config/site.ts provinces)
  landmark?: string; // what the photo shows (alt text)
  label: [number, number]; // tooltip anchor in map units
};

/**
 * Interactivity for the server-rendered <CanadaMap> passed as children.
 * Uses event delegation on the region links (a[data-region]):
 *  - hover / keyboard focus → highlight, name tooltip, details panel
 *  - click / tap / Enter → client-side navigation to the province page
 */
export function MapInteractions({
  regions,
  defaultKey,
  children,
}: {
  regions: MapRegionInfo[];
  defaultKey: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(defaultKey);
  const [hovered, setHovered] = useState<string | null>(null);
  const info = regions.find((r) => r.key === selected) ?? regions[0];
  // The tooltip stays mounted on the last hovered region and glides between
  // regions (no remount flicker); it only fades out when nothing is hovered.
  const tip = regions.find((r) => r.key === (hovered ?? selected)) ?? info;
  const photos = regions.filter((r) => r.photo);

  // Mark the selected region (the SVG is server-rendered, so toggle the attribute).
  useEffect(() => {
    root.current?.querySelectorAll<SVGAElement>("a[data-region]").forEach((a) => {
      a.toggleAttribute("data-active", a.dataset.region === selected);
    });
  }, [selected]);

  const regionOf = (t: EventTarget | null) =>
    (t as Element | null)?.closest?.<SVGAElement>("a[data-region]") ?? null;

  const enter = (t: EventTarget | null) => {
    const key = regionOf(t)?.dataset.region;
    if (!key) return;
    setHovered(key);
    setSelected(key);
  };
  const leave = (from: EventTarget | null, to: EventTarget | null) => {
    if (regionOf(from) !== regionOf(to)) setHovered(null);
  };

  const pct = (v: number, start: number, size: number) => `${((v - start) / size) * 100}%`;

  // Map (left, large) + details panel (right); stacked on smaller screens.
  // The panel has a constant height so switching regions never moves the map.
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
      {/* Selected province's photo behind the whole map card, crossfaded.
          The card in ServiceAreaMap is the positioned, clipped parent. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {photos.map((r) => (
          <Image
            key={r.key}
            src={r.photo!}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className={`object-cover transition-opacity duration-700 ${r.key === info.key ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <span className="absolute inset-0 bg-gradient-to-r from-teal-50/80 via-teal-50/70 to-teal-50/55" />
      </div>

      <div
        ref={root}
        className="relative"
        onPointerOver={(e) => enter(e.target)}
        onPointerOut={(e) => leave(e.target, e.relatedTarget)}
        onFocus={(e) => enter(e.target)}
        onBlur={(e) => leave(e.target, e.relatedTarget)}
        onClick={(e) => {
          const a = regionOf(e.target);
          if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          router.push(a.getAttribute("href") ?? "/service-areas/");
        }}
      >
        {children}

        {/* Name tooltip — one element that glides to the hovered region */}
        <span
          role="tooltip"
          aria-hidden={!hovered}
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-full bg-teal-800 px-3 py-1.5 text-xs font-bold text-white shadow-lg transition-[left,top,opacity] duration-200 ease-out ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{
            left: pct(tip.label[0], MAP_VIEWBOX.x, MAP_VIEWBOX.w),
            top: pct(tip.label[1], MAP_VIEWBOX.y, MAP_VIEWBOX.h),
          }}
        >
          {tip.name}
        </span>
      </div>

      {/* Details panel for the selected region */}
      <div aria-live="polite" className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_44px_-30px_rgba(16,45,36,0.4)]">
        {/* Landmark photo — all stacked and crossfaded so switching never flickers */}
        <div className="relative aspect-[16/7] bg-teal-50">
          {regions
            .filter((r) => r.photo)
            .map((r) => (
              <Image
                key={r.key}
                src={r.photo!}
                alt={r.key === info.key ? `${r.landmark ?? r.name}, ${r.name}` : ""}
                aria-hidden={r.key !== info.key}
                fill
                sizes="(min-width: 1024px) 560px, 92vw"
                className={`object-cover transition-opacity duration-500 ${r.key === info.key ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          <span className="absolute inset-0 bg-gradient-to-t from-teal-800/45 to-transparent" />
        </div>
        {/* Fixed-size content: 1-line name, 3-line blurb, 2-row city chips */}
        <div className="p-5 sm:p-6">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal-500">
            <MapPin className="h-3.5 w-3.5" />
            {`Service area · from $${info.priceFrom}`}
          </p>
          <h3 className="mt-1.5 truncate font-display text-2xl font-bold text-teal-800">{info.name}</h3>
          <p className="mt-2 line-clamp-3 min-h-[4.9em] text-[15px] leading-relaxed text-ink-soft">{info.blurb}</p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            {`${info.cities.length} cities served`}
          </p>
          <ul
            className="mt-1.5 flex h-[3.4rem] flex-wrap content-start gap-1.5 overflow-hidden"
            aria-label={`Cities served in ${info.name}`}
          >
            {info.cities.map((c) => (
              <li key={c} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {c}
              </li>
            ))}
          </ul>
          <Link
            href={`/${info.slug}/`}
            className="btn-primary mt-4 flex items-center justify-center gap-2 bg-teal-400 px-5 py-3 text-sm font-bold text-teal-800 hover:bg-teal-300"
          >
            Explore Service Areas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
