"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { BookingForm, type QuotePreset } from "../BookingForm";
import { provinces } from "@/config/site";

/**
 * Homepage booking section (id "quote"), hidden until someone asks for it.
 * Every Book / Get Quote button links to "#quote" (see quoteHref in
 * config/site.ts): on the homepage the click opens this section in place and
 * scrolls to it; arriving from another page with #quote opens it on load. A
 * link from a province page carries ?area=XX, so the form starts on that
 * province's prices. "Close" hides it again.
 */
export function BookingSection() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<QuotePreset | null>(null);
  const section = useRef<HTMLElement>(null);

  const reveal = useCallback((area: string | null) => {
    if (area && provinces.some((p) => p.code === area)) setPreset({ province: area, qty: {} });
    setOpen(true);
    // Scroll once the section is in the DOM (it animates open from there).
    setTimeout(() => section.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, []);

  useEffect(() => {
    // Arrived with #quote (e.g. from a province page) → open on load.
    const t = setTimeout(() => {
      if (window.location.hash === "#quote") reveal(new URLSearchParams(window.location.search).get("area"));
    }, 0);

    // Any link to "#quote" on this page opens the section instead of jumping.
    // Capture phase, so Next's <Link> sees defaultPrevented and stays put.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.hash !== "#quote" || url.pathname !== window.location.pathname) return;
      e.preventDefault();
      history.replaceState(null, "", `${url.pathname}${url.search}#quote`);
      reveal(url.searchParams.get("area"));
    };
    const onHash = () => {
      if (window.location.hash === "#quote") reveal(new URLSearchParams(window.location.search).get("area"));
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
    };
  }, [reveal]);

  const close = () => {
    setOpen(false);
    history.replaceState(null, "", window.location.pathname);
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.section
          ref={section}
          id="quote"
          key="quote"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="scroll-mt-20 overflow-hidden bg-canvas"
          aria-labelledby="booking-heading"
        >
          <Container className="relative max-w-6xl py-14 sm:py-16 lg:py-20">
            {/* Own row on phones; top-right corner from sm up */}
            <div className="mb-4 flex justify-end sm:absolute sm:right-6 sm:top-8 sm:mb-0">
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-teal-800 shadow-sm transition-colors hover:border-teal-400"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
              <Eyebrow>Book online</Eyebrow>
              <h2
                id="booking-heading"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]"
              >
                Book your duct cleaning
              </h2>
              <p className="mt-4 text-base text-ink-soft sm:text-lg">
                Takes about a minute. See your exact total as you go — we call to confirm a time.
              </p>
            </div>
            <BookingForm preset={preset} />
          </Container>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
