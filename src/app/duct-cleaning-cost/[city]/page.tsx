import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { cities, citiesIn, cityArea, cityUrl, costUrl, getCity } from "@/config/cities";
import { site, addonPrice, quoteHref, ogImage } from "@/config/site";
import { COMPARE_TIPS, COST_YEAR, INCLUDED, costFaqs } from "@/config/cost";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceTable } from "@/components/PriceTable";

// City cost guides: /duct-cleaning-cost/toronto/, … (high-intent "cost" searches).
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const p = cityArea(city).province;
  const title = `Duct Cleaning Cost ${city.name} (${COST_YEAR}) | From $${p.priceFrom} | ${site.name}`;
  const description = `Air duct cleaning cost in ${city.name} (${COST_YEAR}): from $${p.priceFrom} with every duct & vent and a free furnace inspection. Furnace cleaning $${addonPrice(p.pricing, "furnace")}. See all prices.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: costUrl(city) },
    openGraph: { title, description, url: costUrl(city), images: [ogImage] },
  };
}

export default async function CityCostPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const area = cityArea(city);
  const p = area.province;
  const faqs = costFaqs(city.name, p);
  const others = citiesIn(city.areaSlug).filter((c) => c.slug !== city.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Air Duct Cleaning Cost in ${city.name} (${COST_YEAR})`,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}${costUrl(city)}`,
      about: { "@type": "City", name: city.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  return (
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="py-12">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Duct cleaning cost", href: "/duct-cleaning-cost/" },
              { label: city.name, href: costUrl(city) },
            ]}
          />
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Air Duct Cleaning Cost in {city.name} ({COST_YEAR})
          </h1>
          {/* Quick answer — the line Google is most likely to quote */}
          <div className="relative isolate mt-8 max-w-3xl overflow-hidden rounded-md border border-mint-400/30 bg-white p-6 backdrop-blur">
            <CardDecor />
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-500">Quick answer</p>
            <p className="mt-2 text-lg leading-relaxed text-ink">
              In {city.name}, our Basic Duct Cleaning — every duct and vent plus a free furnace inspection —
              starts at <b className="text-2xl">${p.priceFrom}</b>.{" "}
              {`Furnace cleaning is +$${addonPrice(p.pricing, "furnace")} per furnace. No hidden charges.`}
            </p>
          </div>
        </Reveal>
      </Container>

      <section className="border-y border-line bg-teal-50/50 py-16">
        <Container>
          <h2 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">{city.name} price list</h2>
          <PriceTable pricing={p.pricing} areaName={city.name} />
        </Container>
      </section>

      {/* Local cost factors — unique per city */}
      <Section>
        <SectionHeading eyebrow="Local factors" title={`What affects the cost in ${city.name}`} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {city.costFactors.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="relative isolate h-full overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur">
                <CardDecor />
                <Lightbulb className="h-6 w-6 text-mint-400" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-y border-line bg-teal-50/50 py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">What’s included in the price</h2>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Comparing {city.name} quotes</h2>
            <ul className="mt-6 space-y-3">
              {COMPARE_TIPS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mint-400" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="FAQs" title={`${city.name} duct cleaning cost questions`} />
          <Reveal delay={0.1}>
            <ServiceFAQ faqs={faqs} />
          </Reveal>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button href={quoteHref(p.code)} size="lg">Book in {city.name} — see your total</Button>
            <Link href={cityUrl(city)} className="group inline-flex items-center gap-2 font-semibold text-mint-400 hover:text-ink">
              {`Air duct cleaning in ${city.name}`}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12">
          <Container>
            <h2 className="font-display text-xl font-bold text-ink">
              {others.length ? `Other ${area.name} cost guides` : "More cost guides"}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={costUrl(c)}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-mint-400/60"
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href="/duct-cleaning-cost/"
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-mint-400/60"
              >
                All cities
              </Link>
            </div>
          </Container>
      </section>
    </div>
  );
}
