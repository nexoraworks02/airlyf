"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShieldCheck } from "lucide-react";
import { provinces, quoteHref } from "@/config/site";
import { cn } from "@/lib/utils";

// Live price card (region → furnaces → extras → total). Not shown right now;
// to bring it back, render <PriceCheck /> in the hero (sections/Hero.tsx).
// "Book this cleaning" opens the homepage booking section on the chosen region.

const EXTRAS = ["dryer", "ac", "hrv", "brush-cleaning"];

export function PriceCheck() {
  const [code, setCode] = useState("ON");
  const [furnaces, setFurnaces] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);

  const province = provinces.find((p) => p.code === code)!;
  const { base, addons } = province.pricing;
  const furnace = addons.find((a) => a.id === "furnace")!;
  const extraItems = addons.filter((a) => EXTRAS.includes(a.id));
  const total =
    base.price +
    furnaces * furnace.price +
    extraItems.filter((a) => extras.includes(a.id)).reduce((s, a) => s + a.price, 0);

  const toggle = (id: string) =>
    setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

  // Compact, horizontal card: choices in two columns (region + furnaces |
  // extras), then the estimate and the Book button side by side — so the
  // whole card fits on the first screen.
  return (
    <div className="relative rounded-3xl bg-white/95 p-5 text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/20 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-xl font-extrabold text-teal-800">What will my cleaning cost?</h2>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-500">Instant price check</p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {/* Left: region + furnaces */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft" htmlFor="pc-region">
            Your region
          </label>
          <select
            id="pc-region"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm font-semibold text-teal-800 outline-none transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"
          >
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-teal-800">Furnace cleaning</p>
              <p className="text-[11px] leading-tight text-ink-soft">{`$${furnace.price} each · inspection free`}</p>
            </div>
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                aria-label="Fewer furnaces"
                onClick={() => setFurnaces((n) => Math.max(0, n - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-teal-800 transition-colors hover:border-teal-400 hover:bg-teal-50"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center font-display font-bold text-teal-800" aria-live="polite">
                {furnaces}
              </span>
              <button
                type="button"
                aria-label="More furnaces"
                onClick={() => setFurnaces((n) => Math.min(furnace.maxQty ?? 3, n + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-teal-800 transition-colors hover:border-teal-400 hover:bg-teal-50"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: popular extras */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">Popular extras</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {extraItems.map((a) => {
              const on = extras.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(a.id)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-2 text-left text-[13px] font-semibold leading-tight transition-colors",
                    on ? "border-teal-400 bg-teal-50 text-teal-700" : "border-line text-teal-800 hover:border-teal-300"
                  )}
                >
                  <span className="w-full truncate">{a.label}</span>
                  <span className="text-[11px] text-ink-soft">{`+$${a.price}`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estimate + Book, side by side */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl bg-teal-800 px-4 py-3 text-white">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-mint-400">Your estimate</p>
            <p className="truncate text-[11px] text-white/70">{`${base.label} $${base.price} + extras`}</p>
          </div>
          <span key={total} className="total-pop font-display text-3xl font-extrabold">{`$${total}`}</span>
        </div>
        <Link
          href={quoteHref(code)}
          className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap bg-teal-400 px-6 py-3.5 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
        >
          Book this cleaning
        </Link>
      </div>
      <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-ink-soft">
        <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
        Every vent included — your final total is confirmed before we start.
      </p>
    </div>
  );
}
