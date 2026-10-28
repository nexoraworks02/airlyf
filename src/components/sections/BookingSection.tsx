"use client";

import { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { BookingForm, type QuotePreset } from "../BookingForm";
import { provinces } from "@/config/site";

/**
 * Inline booking section on the homepage (id "quote"). Every Book / Get Quote
 * button links here (see quoteHref in config/site.ts). A link from a province
 * page carries ?area=XX, so the form starts on that province's prices.
 */
export function BookingSection() {
  const [preset, setPreset] = useState<QuotePreset | null>(null);

  // Read ?area= after mount (the page is static, so not during render).
  useEffect(() => {
    const t = setTimeout(() => {
      const area = new URLSearchParams(window.location.search).get("area");
      if (area && provinces.some((p) => p.code === area)) setPreset({ province: area, qty: {} });
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="quote" className="scroll-mt-20 bg-canvas py-16 sm:py-20 lg:py-24">
      <Container className="max-w-6xl">
        <Reveal className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <Eyebrow>Book online</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
            Book your duct cleaning
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            Takes about a minute. See your exact total as you go — we call to confirm a time.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <BookingForm preset={preset} />
        </Reveal>
      </Container>
    </section>
  );
}
