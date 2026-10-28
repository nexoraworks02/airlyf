"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { Container } from "../ui/Container";
import { HeroPanels } from "../HeroPanels";
import { lowestPrice, site, telHref } from "@/config/site";

// Forest-green hero. Background: four full-height "piano key" service panels
// (vents, furnace, ducts, AC) — hover one to widen it, labels along the
// bottom. On top (left): headline + CTAs. The live price card is parked in
// components/PriceCheck.tsx — render it beside the text to bring it back.
export function Hero() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.5, 0.27, 1] as const } },
  };

  return (
    <section className="relative isolate overflow-hidden bg-teal-800 pb-36 pt-[104px] text-white sm:pt-[116px] lg:pb-40 lg:pt-[140px]">
      {/* Background: the service panels */}
      <HeroPanels className="absolute inset-0 -z-20" />
      {/* Readability shade over the panels (doesn't block hovering them) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-teal-800/90 via-teal-800/50 to-teal-800/30 [mask-image:linear-gradient(to_bottom,black_62%,transparent_90%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-teal-800/70 to-transparent"
      />

      {/* Content sits above the panels; empty space lets hover reach them */}
      <Container className="pointer-events-none relative lg:py-6">
        <motion.div
          className="pointer-events-auto max-w-2xl"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-teal-50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            Residential &amp; commercial duct cleaning across Canada
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 max-w-[17ch] font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.15rem]"
          >
            Cleaner air for a <span className="text-teal-400">healthier home.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {`Vents, furnaces, ducts and AC cleaned with powerful negative-air vacuums by trained crews in seven regions — from $${lowestPrice}, with your total confirmed before we start.`}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#quote"
              className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap bg-teal-400 px-6 py-4 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Your Cleaning
            </Link>
            <Link
              href="/#quote"
              className="btn-outline inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/30 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Get a Free Quote
            </Link>
          </motion.div>
          <motion.a
            variants={item}
            href={telHref(site.defaultPhone)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-teal-400" />
            Prefer to talk? Call {site.defaultPhone}
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
