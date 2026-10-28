import { Check, Plus } from "lucide-react";
import { BASIC_INCLUDES, type PriceTier } from "@/config/site";
import { CardDecor } from "./ui/CardDecor";

// Basic Duct Cleaning + add-ons for one area, on the dark subpage theme.
// Prices come straight from config/site.ts.
export function PriceTable({ pricing, areaName }: { pricing: PriceTier; areaName: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="relative isolate overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur sm:p-8">
        <CardDecor size="lg" />
        <h3 className="font-display text-xl font-bold text-ink">{`${pricing.base.label} · ${areaName}`}</h3>
        <p className="mt-3 font-display text-4xl font-bold text-ink">
          ${pricing.base.price}
          <span className="ml-2 align-middle text-sm font-medium text-ink-soft">starting</span>
        </p>
        <ul className="mt-6 space-y-3">
          {BASIC_INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative isolate overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur sm:p-8">
        <CardDecor size="lg" />
        <h3 className="font-display text-xl font-bold text-ink">Add-ons</h3>
        <p className="mt-1 text-sm text-ink-soft">Starting prices — only pay for what your home has.</p>
        <ul className="mt-6 divide-y divide-line">
          {pricing.addons.map((a) => (
            <li key={a.id} className="flex items-center gap-3 py-3">
              <Plus className="h-4 w-4 shrink-0 text-mint-400" />
              <span className="flex-1 text-ink-soft">{a.label}</span>
              <span className="font-bold text-ink">{a.unit ? `$${a.price} / ${a.unit}` : `$${a.price}`}</span>
            </li>
          ))}
          <li className="flex items-center gap-3 py-3">
            <Plus className="h-4 w-4 shrink-0 text-mint-400" />
            <span className="flex-1 text-ink-soft">Filter Change</span>
            <span className="text-sm font-semibold text-ink-soft">Quoted on request</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
