"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { BASIC_INCLUDES, provinces, type PriceTier } from "@/config/site";
import { cn } from "@/lib/utils";

// Group provinces by their shared price tier → one tab per tier
// (Ontario has its own prices; every other area shares one tier).
const TIERS = provinces
  .reduce<{ codes: string[]; pricing: PriceTier }[]>((acc, p) => {
    const found = acc.find((t) => t.pricing === p.pricing);
    if (found) found.codes.push(p.code);
    else acc.push({ codes: [p.code], pricing: p.pricing });
    return acc;
  }, [])
  .map((t) => ({
    label: t.codes.includes("ON") ? "Ontario" : "All other provinces",
    pricing: t.pricing,
  }));

export function PricingPlans() {
  const [tier, setTier] = useState(0);
  const { base, addons } = TIERS[tier].pricing;

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Pricing plan</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
              Simple, upfront pricing
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-light text-ink-soft md:text-right">
              Prices depend on your area. Start with Basic Duct Cleaning, then add only
              what your home needs — your exact total shows in the booking form.
            </p>
          </Reveal>
        </div>

        {/* Region tabs */}
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
          {TIERS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setTier(i)}
              aria-pressed={tier === i}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                tier === i ? "text-teal-800" : "bg-teal-50 text-teal-800 hover:bg-teal-100"
              )}
            >
              {tier === i && (
                <motion.span
                  layoutId="tier-pill"
                  className="absolute inset-0 rounded-full bg-teal-400"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </Reveal>

        <Stagger className="relative isolate mt-10 grid overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_70px_-40px_rgba(16,45,36,0.45)] lg:grid-cols-5">
          

          {/* Basic Duct Cleaning */}
          <StaggerItem className="relative flex flex-col bg-teal-800 p-8 text-white lg:col-span-2">
            <h3 className="font-display text-2xl font-bold">{base.label}</h3>
            <div className="mt-4 flex items-end gap-2">
              {/* Plain text (no fade-in) so the price is always visible and exact. */}
              <span key={base.price} className="total-pop inline-block font-display text-5xl font-extrabold text-teal-400">
                ${base.price}
              </span>
              <span className="mb-2 rounded-full border border-white/30 px-2 py-0.5 text-xs font-medium text-white/80">
                Starting
              </span>
            </div>
            <span className="mt-5 block h-px w-full bg-white/15" />
            <ul className="mt-6 flex-1 space-y-3.5">
              {BASIC_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/#quote"
              className="btn-primary mt-8 bg-teal-400 py-3.5 text-center text-[15px] font-bold text-teal-800 hover:bg-teal-300"
            >
              Book Your Cleaning
            </Link>
          </StaggerItem>

          {/* Add-ons */}
          <StaggerItem className="flex flex-col p-8 lg:col-span-3">
            <h3 className="font-display text-2xl font-bold text-teal-800">Add-on services</h3>
            <p className="mt-1 text-sm text-ink-soft">Starting prices — add any of these to your booking.</p>
            <span className="mt-4 block h-px w-full bg-line" />
            <ul className="mt-6 grid flex-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {addons.map((a) => (
                <li key={a.id} className="flex items-center gap-3 text-sm font-medium text-ink-soft">
                  <Plus className="h-4 w-4 shrink-0 text-teal-400" />
                  <span className="flex-1">{a.label}</span>
                  <span className="whitespace-nowrap font-bold text-teal-800">
                    {a.unit ? `$${a.price}/${a.unit}` : `$${a.price}`}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/#quote"
              className="btn-outline mt-8 border-2 border-teal-800 py-3 text-center text-[15px] font-bold text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
            >
              See your total — book online
            </Link>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
