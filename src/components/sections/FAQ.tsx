"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { CardDecor } from "../ui/CardDecor";
import { faqs } from "@/config/faqs";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    // Follows the forest testimonials band, so it keeps its normal padding.
    <Section id="faq" className="bg-canvas">
      <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
      <Reveal from="zoom" className="mx-auto mt-12 max-w-3xl">
      <div className="relative isolate divide-y divide-slate-200 overflow-hidden rounded-md border border-slate-200 bg-white pb-6 shadow-[0_30px_70px_-40px_rgba(16,45,36,0.45)]">
        <CardDecor size="lg" />
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={isOpen ? "bg-teal-50/50" : ""}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display font-bold text-ink">
                  {f.q}
                </span>
                <span className="shrink-0 text-teal-600">
                  {isOpen ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </Reveal>
    </Section>
  );
}
