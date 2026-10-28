import Link from "next/link";
import { ArrowRight, Fan, Flame, Gauge, Leaf, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

// Practical benefits of a professional duct cleaning. Plain, factual copy —
// no statistics or health claims we can't back up.
const BENEFITS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Sparkles,
    title: "Less dust around the home",
    text: "Dust and debris settled in the ducts is pulled out under negative pressure instead of being blown back into your rooms.",
  },
  {
    icon: Fan,
    title: "Better airflow to every room",
    text: "Clearing buildup from registers and branch runs helps warm and cool air reach the rooms at the far end of the house.",
  },
  {
    icon: Gauge,
    title: "Less strain on your system",
    text: "A clean blower and clear ducts let your furnace and AC move air without working as hard.",
  },
  {
    icon: Flame,
    title: "Safer dryer vents",
    text: "Packed lint is a common fire risk. Clearing the vent from dryer to outside hood also helps clothes dry faster.",
  },
  {
    icon: Leaf,
    title: "Fresher-smelling air",
    text: "Removing years of old dust and debris can cut the stale, musty smell when the heat or AC first kicks on.",
  },
  {
    icon: ShieldCheck,
    title: "A clean start for your filter",
    text: "With the ducts clean, a correctly sized filter keeps them that way for longer.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-teal-50 py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Why clean your ducts</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
            A cleaner system, a fresher home
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            Your ductwork carries every breath of heated and cooled air in the house. Over the years it
            collects dust, pet hair and construction debris — a professional cleaning clears it out.
          </p>
          <Link
            href="/#quote"
            className="btn-primary mt-8 inline-flex items-center gap-2 bg-teal-400 px-7 py-3.5 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-teal-100 bg-white/80 p-6 transition-shadow duration-300 hover:shadow-[0_20px_44px_-28px_rgba(16,45,36,0.35)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-teal-400">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-teal-800">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
