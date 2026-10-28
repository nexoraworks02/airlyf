"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { beforeAfterPairs, type BeforeAfterPair } from "@/config/before-after";

// Before-and-after gallery: one draggable comparison per real job photo pair
// (config/before-after.ts). Rendered only when pairs exist — see page.tsx.
export function BeforeAfter() {
  return (
    <section id="results" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Real results"
          title="See the difference"
          subtitle="Photos from our own jobs. Drag the handle to compare before and after."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {beforeAfterPairs.map((pair, i) => (
            <Reveal key={pair.before} delay={(i % 2) * 0.1}>
              <CompareSlider pair={pair} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CompareSlider({ pair }: { pair: BeforeAfterPair }) {
  const [pos, setPos] = useState(50); // % of the "after" image revealed from the left
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-2xl bg-teal-50 shadow-[0_24px_50px_-30px_rgba(16,45,36,0.45)]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image src={pair.before} alt={`Before cleaning — ${pair.caption}`} fill sizes="(min-width: 768px) 45vw, 92vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.after} alt={`After cleaning — ${pair.caption}`} fill sizes="(min-width: 768px) 45vw, 92vw" className="object-cover" />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-teal-800/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">After</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-teal-800 backdrop-blur">Before</span>

        {/* Divider + handle */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-400 text-teal-800 shadow-lg">
            <MoveHorizontal className="h-5 w-5" />
          </span>
        </div>

        {/* Keyboard / screen-reader control (invisible, covers the image) */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${pair.caption}`}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-teal-400 ring-offset-2 peer-focus-visible:ring-2" />
      </div>
      <figcaption className="mt-3 text-sm font-semibold text-ink-soft">{pair.caption}</figcaption>
    </figure>
  );
}
