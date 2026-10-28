import Link from "next/link";
import { ArrowRight, CalendarCheck, Wind, Wrench } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

const STEPS = [
  {
    icon: CalendarCheck,
    time: "About 2 minutes",
    title: "Book online",
    text: "Pick your region, add any extras and choose a morning, afternoon or evening arrival. You see the total before you send it.",
  },
  {
    icon: Wrench,
    time: "Usually 2–4 hours",
    title: "We clean the whole system",
    text: "The crew confirms the price, puts your ducts under negative pressure and works room by room — every supply, return and register.",
  },
  {
    icon: Wind,
    time: "From day one",
    title: "Enjoy cleaner air",
    text: "Less dust on your furniture, better airflow to the far rooms, and a furnace that doesn't strain. Not happy with a vent? We come back.",
  },
];

// Forest-green process band: three numbered steps joined by a thin line.
export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-teal-800 py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-2">
          <Reveal>
            <Eyebrow tone="dark">How it works</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Three simple steps to clean ducts
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/70 md:text-right">
              No sales visit, no on-site upsell. Book it, we clean it, you breathe easier.
            </p>
          </Reveal>
        </div>

        <Stagger className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Connecting line behind the step numbers */}
          <span
            aria-hidden="true"
            className="absolute left-[3.25rem] right-[3.25rem] top-[3.25rem] hidden h-px bg-gradient-to-r from-teal-400/60 via-teal-400/30 to-teal-400/60 md:block"
          />
          {STEPS.map(({ icon: Icon, time, title, text }, i) => (
            <StaggerItem key={title} className="relative">
              <div className="h-full relative rounded-2xl border border-white/10 bg-band-700 p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-400 font-display text-lg font-extrabold text-teal-800">
                    {i + 1}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    <Icon className="h-3.5 w-3.5 text-teal-400" />
                    {time}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12">
          <Link
            href="/#quote"
            className="btn-primary inline-flex items-center gap-2 bg-teal-400 px-7 py-3.5 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
          >
            Book Your Cleaning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
