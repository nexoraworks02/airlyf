"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { CardDecor } from "../ui/CardDecor";
import { reviews, googleReviewsUrl, type Review } from "@/config/reviews";
import { cn } from "@/lib/utils";

type Card = Review & { sample?: boolean };

// Shown only while config/reviews.ts is empty. Clearly labelled as samples —
// never presented as real customers.
const SAMPLES: Card[] = Array.from({ length: 3 }, () => ({
  sample: true,
  name: "Customer name",
  rating: 5,
  text: "A real Google review from a Airlyf customer will appear here. Add reviews in src/config/reviews.ts.",
  location: "City, Province",
}));

const INTERVAL = 5500;

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);
  return perView;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Reference-style testimonials: dark photo band, quote cards that slide
// automatically (pause on hover), dots + arrows. Initials avatars only —
// never stock faces.
export function Reviews() {
  const cards: Card[] = reviews.length ? reviews : SAMPLES;
  const isSample = reviews.length === 0;
  const perView = usePerView();
  const reduce = useReducedMotion();
  const maxIndex = Math.max(0, cards.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused || reduce || maxIndex === 0) return;
    const t = setTimeout(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), INTERVAL);
    return () => clearTimeout(t);
  }, [current, paused, reduce, maxIndex]);

  const go = (dir: number) => setIndex((i) => Math.min(maxIndex, Math.max(0, Math.min(i, maxIndex) + dir)));

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <Image src="/images/photos/tech-duct-system.webp" alt="" fill quality={90} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-band-900/92 via-band-700/90 to-band-500/88" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="dark">Testimonials</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            What clients say about us
          </h2>
          <p className="mt-4 text-lg font-light text-slate-300">
            Homeowners across Canada trust Airlyf with their ductwork
            across Canada.
          </p>
          {isSample && (
            <p className="mx-auto mt-5 inline-flex rounded-full border border-dashed border-mint-400/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-mint-400">
              Sample layout — real Google reviews coming soon
            </p>
          )}
        </Reveal>

        <div
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${(current * 100) / perView}%` }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.21, 0.5, 0.27, 1] }}
          >
            {cards.map((r, i) => {
              const active = i === current + Math.floor((perView - 1) / 2);
              return (
                <div
                  key={i}
                  className="shrink-0 px-3"
                  style={{ flexBasis: `${100 / perView}%` }}
                >
                  <figure
                    className={cn(
                      "relative isolate flex h-full flex-col overflow-hidden rounded-md bg-white p-8 pt-10 text-center shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] transition-all duration-500",
                      active ? "scale-100 opacity-100" : "scale-[0.96] opacity-80",
                      r.sample && "border-2 border-dashed border-teal-200"
                    )}
                  >
                    <CardDecor />
                    {r.sample && (
                      <span className="absolute left-5 top-4 rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-500">
                        Sample
                      </span>
                    )}
                    <Quote className="mx-auto h-10 w-10 text-teal-400" />
                    <div className="mt-4 flex justify-center gap-1" aria-label={r.sample ? "Rating placeholder" : `${r.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-4 w-4",
                            r.sample
                              ? "text-teal-200"
                              : s < r.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                          )}
                        />
                      ))}
                    </div>
                    <blockquote
                      className={cn(
                        "mt-5 flex-1 italic leading-relaxed",
                        r.sample ? "text-slate-400" : "text-ink-soft"
                      )}
                    >
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-7 flex flex-col items-center">
                      <span
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-full border-4 border-white font-display text-lg font-black shadow-lg",
                          r.sample ? "bg-teal-100 text-teal-500" : "bg-teal-800 text-white"
                        )}
                      >
                        {r.sample ? "?" : initials(r.name)}
                      </span>
                      <span className="mt-3 font-display font-bold text-teal-800">{r.name}</span>
                      {r.location && <span className="text-sm text-ink-soft">{r.location}</span>}
                      {r.date && <span className="text-xs text-slate-400">{r.date}</span>}
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {maxIndex > 0 && (
            <button
              onClick={() => go(-1)}
              aria-label="Previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-teal-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show reviews ${i + 1}`}
                aria-current={i === current}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          {maxIndex > 0 && (
            <button
              onClick={() => go(1)}
              aria-label="Next reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-teal-800"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {googleReviewsUrl && (
          <div className="mt-8 text-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 bg-white px-7 py-3.5 text-[15px] font-bold text-teal-800 transition-all hover:-translate-y-0.5"
            >
              See all reviews on Google
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
