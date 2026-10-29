"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Fan, Flame, Snowflake, Wind, type LucideIcon } from "lucide-react";
import { heroPanels, type HeroPanel } from "@/config/hero-panels";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { vents: Fan, furnace: Flame, ducts: Wind, ac: Snowflake };
const CYCLE_MS = 4500;

/**
 * Hero "piano key" panels — one per service — filling their parent (the
 * hero background). The active panel is wide; the rest are narrow keys with
 * a vertical label at the bottom. Hover / focus (or a first tap on touch)
 * makes a panel active; clicking the active panel opens its service page.
 * The active panel auto-advances until the visitor interacts.
 * Reduced motion: no auto-advance, no zoom, no particles.
 */
export function HeroPanels({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  // Only animate while the hero is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % heroPanels.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [reduce, paused, inView]);

  return (
    <div
      ref={box}
      className={cn("flex gap-[3px] bg-teal-800", className)}
      onMouseLeave={() => setPaused(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      {heroPanels.map((p, i) => (
        <Panel
          key={p.key}
          panel={p}
          active={i === active}
          animate={!reduce && inView}
          onActivate={() => {
            setActive(i);
            setPaused(true);
          }}
        />
      ))}
    </div>
  );
}

function Panel({
  panel,
  active,
  animate,
  onActivate,
}: {
  panel: HeroPanel;
  active: boolean;
  animate: boolean;
  onActivate: () => void;
}) {
  const Icon = ICONS[panel.key] ?? Wind;
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  // Touch taps also fire mouseenter (which activates the panel) before the
  // click, so remember whether it was already active when the finger went down.
  const tap = useRef({ touch: false, wasActive: false });

  // Fade the clip in once it has a frame. It may have loaded before hydration,
  // so check readyState as well as listening.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const show = () => setReady(true);
    if (v.readyState >= 2) show();
    v.addEventListener("loadeddata", show);
    v.addEventListener("playing", show);
    return () => {
      v.removeEventListener("loadeddata", show);
      v.removeEventListener("playing", show);
    };
  }, []);

  // Only the active panel's video plays.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && animate) v.play().catch(() => {});
    else v.pause();
  }, [active, animate]);

  return (
    <Link
      href={panel.href}
      aria-label={`${panel.label} — view service`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onPointerDown={(e) => {
        tap.current = { touch: e.pointerType !== "mouse", wasActive: active };
      }}
      onClick={(e) => {
        // Touch: the first tap on a narrow key opens it instead of navigating.
        // (Mouse: hover already opened it, so the click navigates.)
        if (tap.current.touch && !tap.current.wasActive) {
          e.preventDefault();
          onActivate();
        }
        tap.current.touch = false;
      }}
      style={{ flexGrow: active ? 3.2 : 1 }}
      className="group relative isolate min-w-0 basis-0 overflow-hidden bg-teal-700 outline-offset-[-3px] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
    >
      {/* Media: the photo (slow zoom when there's no video), with the video
          fading in on top once it has frames to show */}
      <div
        key={active && animate && !panel.video ? "zoom" : "still"}
        className={cn("absolute inset-0 -z-20", active && animate && !panel.video && "hero-zoom")}
      >
        <Image
          src={panel.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 32vw, 60vw"
          className="object-cover"
          style={{ objectPosition: panel.imagePosition }}
        />
      </div>
      {panel.video && (
        <video
          ref={video}
          src={panel.video}
          poster={panel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700",
            ready || panel.poster ? "opacity-100" : "opacity-0"
          )}
          style={{ objectPosition: panel.videoPosition ?? panel.imagePosition }}
        />
      )}

      {/* Dust being pulled toward the hose / vent (photo mode only) */}
      {!panel.video && <SuctionCanvas target={panel.suction} run={active && animate} />}

      {/* Readability shade */}
      <span
        className={cn(
          "absolute inset-0 -z-10 transition-colors duration-500",
          active
            ? "bg-gradient-to-t from-teal-800/90 via-teal-800/10 to-transparent"
            : "bg-teal-800/40 group-hover:bg-teal-800/20"
        )}
      />

      {/* Narrow key: icon + vertical label (below lg, lifted clear of the
          floating bottom bar) */}
      <span
        className={cn(
          "absolute inset-x-0 bottom-24 flex lg:bottom-4 flex-col items-center gap-3 transition-opacity duration-300",
          active ? "opacity-0" : "opacity-100"
        )}
        aria-hidden={active}
      >
        <span className="text-xs font-bold tracking-wide text-white/90 [writing-mode:vertical-rl] rotate-180">
          {panel.label}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-teal-400 backdrop-blur">
          <Icon className="h-4 w-4" />
        </span>
      </span>

      {/* Wide key: label + link prompt */}
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 pb-24 transition-all duration-500 sm:p-5 sm:pb-24 lg:pb-5",
          active ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-3 opacity-0"
        )}
        aria-hidden={!active}
      >
        <span className="min-w-0">
          <span className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-400 sm:flex">
            <Icon className="h-3.5 w-3.5" />
            Airflow cleaning
          </span>
          <span className="block font-display text-base font-bold leading-tight text-white sm:mt-1 sm:text-xl">
            {panel.label}
          </span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400 text-teal-800 transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  );
}

/**
 * Light dust specks drifting toward a suction point with a slight swirl,
 * accelerating as they get close, then respawning — reads as strong airflow
 * into a vacuum hose. Canvas only runs while `run` is true.
 */
function SuctionCanvas({ target, run }: { target: { x: number; y: number }; run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !run) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type P = { x: number; y: number; px: number; py: number; v: number; r: number; a: number };
    const spawn = (p?: P): P => {
      // Start somewhere around the edges of a ring around the target.
      const tx = (target.x / 100) * w, ty = (target.y / 100) * h;
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.max(w, h) * (0.35 + Math.random() * 0.45);
      const x = tx + Math.cos(ang) * dist, y = ty + Math.sin(ang) * dist;
      return Object.assign(p ?? ({} as P), { x, y, px: x, py: y, v: 0.4 + Math.random() * 0.6, r: 0.9 + Math.random() * 1.8, a: 0 });
    };
    const parts = Array.from({ length: 90 }, () => spawn());
    // Stagger so they don't all arrive together.
    parts.forEach((p) => { const tx = (target.x / 100) * w, ty = (target.y / 100) * h; const t = Math.random(); p.x = p.px = p.x + (tx - p.x) * t; p.y = p.py = p.y + (ty - p.y) * t; });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const tx = (target.x / 100) * w, ty = (target.y / 100) * h;
      for (const p of parts) {
        const dx = tx - p.x, dy = ty - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 6) { spawn(p); continue; }
        const pull = p.v * (1 + 90 / (d + 20)); // faster near the hose
        p.px = p.x; p.py = p.y;
        p.x += (dx / d) * pull + (-dy / d) * pull * 0.35; // inward + slight swirl
        p.y += (dy / d) * pull + (dx / d) * pull * 0.35;
        p.a = Math.min(1, p.a + 0.03) * Math.min(1, d / 40);
        ctx.strokeStyle = `rgba(236, 244, 238, ${0.75 * p.a})`;
        ctx.lineWidth = p.r;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.px - (p.x - p.px) * 2, p.py - (p.y - p.py) * 2);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ctx.clearRect(0, 0, w, h);
    };
  }, [run, target.x, target.y]);

  // Painted above the readability shade, below the labels.
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
