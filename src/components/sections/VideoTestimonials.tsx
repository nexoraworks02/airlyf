"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { CardDecor } from "../ui/CardDecor";
import { VIDEO_PROTECT } from "@/lib/video";
import {
  customerVideos,
  featuredVideo,
  type FeedbackVideo,
} from "@/config/feedback-videos";

// Lightbox playlist: the featured video first, then every customer clip.
const PLAYLIST: FeedbackVideo[] = [featuredVideo, ...customerVideos];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function VideoTestimonials() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="videos" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FeaturedPlayer onOpen={() => setOpen(0)} />

          <div>
            <Reveal>
              <Eyebrow>Video testimonials</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
                Real customers. Real results.
              </h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-ink-soft">
                Don&apos;t just take our word for it — hear it from homeowners
                we&apos;ve worked for, filmed right after their duct cleaning.
              </p>
            </Reveal>
            <Stagger className="mt-8 space-y-4">
              {[
                `${customerVideos.length} customers share their experience on video`,
                "Filmed at their homes, right after the job",
                "Before & after results you can see",
              ].map((t) => (
                <StaggerItem key={t}>
                  <span className="flex items-center gap-3 font-medium text-teal-800">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-400" />
                    {t}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setOpen(1)}
                className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-teal-800 px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-teal-600"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch customer videos
              </button>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center whitespace-nowrap border-2 border-teal-800/20 px-6 py-4 text-[15px] font-bold btn-outline text-teal-800 transition-all hover:-translate-y-0.5 hover:border-teal-800"
              >
                Get a free quote
              </Link>
            </Reveal>
          </div>
        </div>

        <VideoWall onOpen={(i) => setOpen(i + 1)} />
      </Container>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onChange={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured video — phone frame, muted autoplay loop while on screen.  */
/* Captions are burned into this video, so it reads without sound.     */
/* ------------------------------------------------------------------ */
function FeaturedPlayer({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <Reveal from="left" className="relative mx-auto w-full max-w-[340px]">
      {/* Logo-style cloud bubbles + sparkles behind the phone */}
      <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-teal-50" />
      <div className="pointer-events-none absolute -bottom-10 -right-14 h-48 w-48 rounded-full bg-teal-50 motion-safe:animate-[float-y_6s_ease-in-out_infinite]" />

      <div className="relative rounded-md bg-teal-800 p-3 shadow-[0_40px_80px_-30px_rgba(16,45,36,0.75)]">
        <div className="absolute left-1/2 top-5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
        <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-black">
          <video
            {...VIDEO_PROTECT}
            ref={ref}
            src={featuredVideo.src}
            poster={featuredVideo.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Customer video review with before and after duct cleaning footage"
            className="h-full w-full object-cover"
          />
          <button
            onClick={toggleSound}
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-800 shadow-lg backdrop-blur transition hover:bg-white"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Tap for sound" : "Sound on"}
          </button>
          <button
            onClick={onOpen}
            aria-label="Open video full screen"
            className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur transition hover:bg-black/60"
          >
            Full screen
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Customer video wall — swipeable row of phone-style cards.           */
/* Hover plays a silent preview (desktop); click opens the lightbox.   */
/* ------------------------------------------------------------------ */
function VideoWall({ onOpen }: { onOpen: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="mt-20">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>Customer videos</Eyebrow>
          <h3 className="mt-2 font-display text-2xl font-bold text-teal-800 sm:text-3xl">
            Hear it from our customers
          </h3>
        </div>
        <div className="hidden gap-2 sm:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Scroll videos left" : "Scroll videos right"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-200 text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
            >
              {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </Reveal>

      <div
        ref={track}
        className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {customerVideos.map((v, i) => (
          <WallCard key={v.src} video={v} index={i} onOpen={() => onOpen(i)} />
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-ink-soft sm:hidden">Swipe to see more →</p>
    </div>
  );
}

function WallCard({
  video,
  index,
  onOpen,
}: {
  video: FeedbackVideo;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [previewing, setPreviewing] = useState(false);

  // Silent hover preview — only on devices with a real mouse.
  const start = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = ref.current;
    if (!v) return;
    if (!v.src) v.src = video.src; // load only when first hovered
    v.currentTime = 0;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };
  const stop = () => {
    ref.current?.pause();
    setPreviewing(false);
  };

  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      aria-label={`Play customer video review ${index + 1}`}
      className="group relative isolate aspect-[9/16] w-[200px] shrink-0 snap-start overflow-hidden rounded-md bg-teal-800 shadow-[0_24px_50px_-24px_rgba(16,45,36,0.6)] sm:w-[220px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <video
        {...VIDEO_PROTECT}
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewing ? "opacity-100" : "opacity-0"}`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-teal-800/85 via-transparent to-transparent" />
      <CardDecor tone="dark" className="z-0" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-teal-800 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
        <span className="text-xs font-bold uppercase tracking-wider">Customer review</span>
        <span className="rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold backdrop-blur">
          {fmt(video.seconds)}
        </span>
      </span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen player with sound, prev/next, Esc + arrow keys.         */
/* ------------------------------------------------------------------ */
function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const go = useCallback(
    (d: number) => onChange((index + d + PLAYLIST.length) % PLAYLIST.length),
    [index, onChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const v = PLAYLIST[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b2219]/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Customer video review"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous video"
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <motion.div
        key={v.src}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[min(85vh,760px)] aspect-[9/16] max-w-full overflow-hidden rounded-md bg-black shadow-2xl"
      >
        <video
          {...VIDEO_PROTECT}
          src={v.src}
          poster={v.poster}
          controls
          autoPlay
          playsInline
          onEnded={() => go(1)}
          className="h-full w-full object-contain"
        />
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next video"
        className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/70">
        {index + 1} / {PLAYLIST.length}
      </p>
    </motion.div>
  );
}
