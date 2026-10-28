"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { BookingForm, type QuotePreset } from "./BookingForm";
import { provinces } from "@/config/site";
import { Sparkle } from "./ui/Sparkle";

/**
 * Site-wide booking pop-up. Every link to "#quote" ("/#quote" or "#quote") —
 * hero, pricing, footer banner, mobile bottom bar, service pages… — opens
 * this instead of scrolling to an inline form. Visiting a URL ending in
 * #quote opens it too. On a province page it starts on that province.
 *
 * Phones: full-screen sheet. Desktop: centred window. Once opened the form
 * stays mounted, so closing by accident doesn't lose what was typed.
 */
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // form kept after first open
  // Area + add-ons from a link's data-quote (the hero price check).
  const [preset, setPreset] = useState<QuotePreset | null>(null);
  const pathname = usePathname();

  // Province of the current page (e.g. /quebec/ → QC), else Ontario.
  const slug = pathname.split("/").filter(Boolean)[0];
  const pageProvince = provinces.find((p) => p.slug === slug)?.code ?? "ON";

  const show = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#quote") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Intercept clicks on any #quote link (capture phase, so Next <Link> sees
  // defaultPrevented and doesn't navigate/scroll).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href === "#quote" || href === "/#quote") {
        e.preventDefault();
        const raw = a?.dataset.quote;
        if (raw) {
          try {
            setPreset(JSON.parse(raw) as QuotePreset);
          } catch {
            // Malformed preset — open the form with its defaults.
          }
        }
        show();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [show]);

  // Open when the page is visited with #quote (or the hash changes to it).
  useEffect(() => {
    const check = () => window.location.hash === "#quote" && show();
    const t = setTimeout(check, 0);
    window.addEventListener("hashchange", check);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", check);
    };
  }, [show]);

  // While open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-6"
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { opacity: 1, pointerEvents: "auto" as const },
        closed: { opacity: 0, pointerEvents: "none" as const, transition: { duration: 0.2 } },
      }}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0b2219]/70 backdrop-blur-sm" onClick={close} />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        variants={{
          open: { y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
          closed: { y: 40, scale: 0.97 },
        }}
        className="relative flex max-h-full w-full flex-col overflow-hidden bg-gradient-to-br from-band-700 via-band-700 to-band-500 shadow-2xl sm:max-h-[92vh] sm:max-w-3xl sm:rounded-md"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mint-400">
              <Sparkle className="h-3 w-3" />
              Book online
            </p>
            <h2 id="booking-title" className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
              Book your cleaning in minutes
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Choose your service, add any extras, pick a day and time — we&apos;ll confirm fast.
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Close booking form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7">
          <BookingForm key={pageProvince} defaultProvince={pageProvince} preset={preset} />
        </div>
      </motion.div>
    </motion.div>
  );
}
