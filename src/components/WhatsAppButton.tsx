"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/config/site";

// Official WhatsApp glyph (instantly recognisable — builds trust vs a generic chat bubble)
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const BADGE_DELAY_MS = 1500; // red "1" badge pops in
const POPUP_DELAY_MS = 4000; // chat window appears this long after page load…
const POPUP_DELAY_PHONE_MS = 8000; // …longer on phones, where it covers the hero
const TYPING_MS = 1600; // "typing…" shown before the message
const DISMISS_KEY = "fa-wa-chat-dismissed"; // once closed, stay closed this visit

/**
 * Soft two-note "ding", synthesised with Web Audio (no sound file).
 * Browsers only allow audio after the visitor has tapped/clicked the page,
 * so this plays only when that has already happened — never on page open.
 */
function playDing() {
  try {
    const nav = navigator as Navigator & { userActivation?: { hasBeenActive: boolean } };
    if (nav.userActivation && !nav.userActivation.hasBeenActive) return;
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + i * 0.12;
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
    setTimeout(() => ctx.close(), 1000);
  } catch {
    /* audio unavailable — silently skip */
  }
}

function readDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function WhatsAppButton() {
  const message = `Hi ${site.name}, I would like a free quote for duct cleaning.`;
  const whatsappUrl = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;

  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const [unread, setUnread] = useState(false);
  const [time, setTime] = useState("");
  const shownOnce = useRef(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Open the window: show "typing…", then the message.
  const openChat = () => {
    shownOnce.current = true;
    setTime(new Date().toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }));
    setTyping(true);
    setOpen(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), TYPING_MS);
  };

  // Once per visit: the red "1" badge pops in, then the mini chat opens
  // (with a soft ding if the visitor has already tapped the page).
  useEffect(() => {
    if (readDismissed()) return;
    const badge = setTimeout(() => setUnread(true), BADGE_DELAY_MS);
    const popup = setTimeout(() => {
      if (shownOnce.current) return;
      openChat();
      playDing();
    }, window.innerWidth < 768 ? POPUP_DELAY_PHONE_MS : POPUP_DELAY_MS);
    return () => {
      clearTimeout(badge);
      clearTimeout(popup);
      clearTimeout(typingTimer.current);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setUnread(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  const toggle = () => {
    setUnread(false);
    if (open) close();
    else openChat();
  };

  return (
    // Mobile: sits above the mobile CTA bar (bottom-24). Desktop: bottom-6 right-6.
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Airlyf on WhatsApp"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-[330px] overflow-hidden rounded-3xl rounded-br-md bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
          >
            {/* Header — WhatsApp-style bar */}
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.png" alt="" className="h-8 w-8 object-contain" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[15px] font-bold">{site.name}</span>
                <span className="block text-xs text-white/80">
                  {typing ? "typing…" : "Air duct cleaning · Free quotes"}
                </span>
              </span>
              <button
                onClick={close}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat body — WhatsApp wallpaper tone */}
            <div className="min-h-[132px] bg-[#ECE5DD] px-4 py-5">
              <AnimatePresence mode="wait">
                {typing ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm"
                    aria-label="typing"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-slate-400 motion-safe:animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="msg"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[14px] leading-relaxed text-slate-800 shadow-sm"
                  >
                    <p className="font-semibold text-[#075E54]">{site.name}</p>
                    <p className="mt-1">
                      Hi there 👋 Looking for air duct cleaning? Send us a
                      message for a <strong>free quote</strong> — we&apos;re happy to help!
                    </p>
                    <p className="mt-1 text-right text-[11px] text-slate-400">{time}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="bg-white p-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setUnread(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-display text-[15px] font-bold text-white shadow-md transition hover:bg-[#1ebe5b]"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Start chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button — toggles the mini chat */}
      <div className="relative motion-safe:animate-[wa-bounce_2.4s_ease-in-out_infinite]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-0 motion-safe:animate-[wa-ripple_2.4s_ease-out_infinite]"
        />
        <button
          onClick={toggle}
          aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl ring-1 ring-white/20 transition-transform duration-200 hover:scale-[1.08] active:scale-[0.96]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-7 w-7" />
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <WhatsAppGlyph className="h-8 w-8" />
              </motion.span>
            )}
          </AnimatePresence>
          {unread && !open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white ring-2 ring-white">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
