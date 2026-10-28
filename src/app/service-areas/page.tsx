import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MessageCircle, Wind } from "lucide-react";
import { site, services, provinces } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { AreaPhotoCard } from "@/components/AreaPhotoCard";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";

export const metadata: Metadata = {
  title: "Service Areas — Air Duct Cleaning Across Canada",
  description:
    "Airlyf cleans air ducts, furnaces, dryer vents and HRVs in Ontario, Alberta, Quebec, British Columbia, Manitoba, Saskatchewan and the Maritimes — with one flat price list per province.",
  alternates: { canonical: "/service-areas/" },
  openGraph: {
    title: `Service Areas | ${site.name}`,
    description:
      "Professional duct cleaning across Ontario, Alberta, Quebec, British Columbia, Manitoba, Saskatchewan and the Maritimes.",
    url: "/service-areas/",
  },
};

export default function ServiceAreasPage() {
  const waUrl = `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(
    `Hi ${site.name}, I want a free duct cleaning quote.`
  )}`;

  return (
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-teal-400/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-mint-500/5 blur-[120px]" />
      </div>

      <Container className="py-12 text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-teal-700">
            🍁 Coast to coast, Canada
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Air Duct Cleaning Across Canada
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {site.name} provides professional air duct cleaning, dryer vent
            cleaning, and furnace cleaning for homes and businesses across Ontario,
            Alberta, Quebec, British Columbia, Manitoba, Saskatchewan and
            the Maritimes — with published province-based prices and trained, insured
            technicians.
          </p>
        </Reveal>
      </Container>

      {/* Interactive map: click a province to open its page */}
      <ServiceAreaMap id="map" />

      {/* Province landmark photo cards */}
      <Section className="!py-10">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {provinces.map((p, i) => (
            <Reveal key={p.code} delay={(i % 4) * 0.07} from="zoom">
              <AreaPhotoCard area={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services available everywhere */}
      <section className="border-y border-line bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Every service, every province"
            subtitle="Our full service list is available in every area we serve — for both residential and commercial duct systems."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group relative isolate flex h-full items-center gap-3 overflow-hidden rounded-md border border-line bg-white p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-300"
                >
                  <CardDecor />
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-md">
                    <Wind className="h-5 w-5" />
                  </div>
                  <span className="flex-1 font-display font-semibold text-ink">
                    {s.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-teal-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="group relative isolate flex h-full items-center gap-3 overflow-hidden rounded-md border border-line bg-white p-5 backdrop-blur">
                <CardDecor />
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-md">
                  <Wind className="h-5 w-5" />
                </div>
                <span className="flex-1 font-display font-semibold text-ink">
                  Residential &amp; Commercial
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Section>
        <Container className="text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Not sure if we cover your area?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Message us — if you&apos;re in one of our service areas, we can
            almost certainly help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#quote" size="lg">
              Get a Free Quote
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Message Us on WhatsApp
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
