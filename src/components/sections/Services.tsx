import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { services } from "@/config/site";

type IconName = keyof typeof Icons;

// Services: clean white cards on the light canvas — sage icon tile, small
// lift + green border on hover — then a photo banner prompting a quote.
export function Services() {
  return (
    <section id="services" className="scroll-mt-24 overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
            Everything your HVAC system needs
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            From the trunk lines to the dryer vent, Airlyf cleans the
            whole system — priced by province and listed in plain sight.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = (Icons[s.icon as IconName] || Icons.Wind) as Icons.LucideIcon;
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-[0_24px_50px_-28px_rgba(16,45,36,0.35)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors duration-300 group-hover:bg-teal-800 group-hover:text-teal-400">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-teal-800">{s.name}</h3>
                  <p className="mt-2.5 flex-1 leading-relaxed text-ink-soft">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-500">
                    Learn more
                    <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
          {/* Full-width banner under the service cards */}
          <StaggerItem className="sm:col-span-2 lg:col-span-3">
            <Link
              href="/#quote"
              className="group relative flex h-full min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white sm:min-h-[220px] sm:p-10"
            >
              <Image
                src="/images/photos/ac-unit.webp"
                alt="Air conditioning unit outside a home"
                fill
                quality={90}
                sizes="(min-width: 1024px) 1100px, 95vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-teal-800/95 via-teal-800/55 to-teal-800/10" />
              <span className="relative font-display text-2xl font-bold">Not sure what you need?</span>
              <span className="relative mt-2 inline-flex items-center gap-2 text-sm font-bold text-teal-400">
                Get a free quote
                <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
