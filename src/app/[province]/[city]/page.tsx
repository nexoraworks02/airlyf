import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock, Home, MapPin, Phone, ShieldCheck, Sun } from "lucide-react";
import { cities, citiesIn, cityArea, cityUrl, costUrl, getCity } from "@/config/cities";
import { services, site, phoneFor, telHref, quoteHref, whatsappFor } from "@/config/site";
import { provincePages } from "@/config/service-areas";
import { CoverageSearch } from "@/components/CoverageSearch";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button, onDarkSecondary } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// City pages: /ontario/toronto/, /alberta/calgary/, …
// Only the cities in config/cities.ts are built; anything else is a 404.
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ province: string; city: string }>;
}

export function generateStaticParams() {
  return cities.map((c) => ({ province: c.areaSlug, city: c.slug }));
}

function load(province: string, slug: string) {
  const city = getCity(slug);
  return city && city.areaSlug === province ? city : undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { province, city: slug } = await params;
  const city = load(province, slug);
  if (!city) return {};
  const { province: prov } = cityArea(city);
  const title = `Air Duct Cleaning ${city.name} | From $${prov.priceFrom} | ${site.name}`;
  const description = `Professional air duct, furnace and dryer vent cleaning in ${city.name} — ${city.neighbourhoods
    .slice(0, 3)
    .join(", ")} and more. Every duct & vent included, from $${prov.priceFrom}. Book online.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: cityUrl(city) },
    openGraph: { title, description, url: cityUrl(city) },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { province, city: slug } = await params;
  const city = load(province, slug);
  if (!city) notFound();

  const area = cityArea(city);
  const prov = area.province;
  const phone = phoneFor(prov.code);
  const nearby = citiesIn(city.areaSlug).filter((c) => c.slug !== city.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Air Duct Cleaning",
      name: `Air Duct Cleaning in ${city.name}`,
      provider: { "@type": "HVACBusiness", name: site.name, telephone: phone, email: site.email, url: site.url },
      areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: area.name } },
      offers: { "@type": "Offer", price: prov.priceFrom, priceCurrency: "CAD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <div className="theme-inner relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Forest hero over the province's landmark photo */}
      <section className="relative isolate overflow-hidden bg-teal-800 pb-16 pt-28 text-white sm:pt-32 lg:pb-20 lg:pt-40">
        <Image
          src={prov.photo}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-800 via-teal-800/85 to-teal-800/45"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-teal-800/80 to-transparent" />

        <Container>
          <Reveal>
            <Breadcrumbs
              tone="dark"
              items={[
                { label: area.name, href: `/${area.slug}/` },
                { label: city.name, href: cityUrl(city) },
              ]}
            />
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  {`${city.name}, ${area.name} · from $${prov.priceFrom}`}
                </p>
                <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                  Air Duct Cleaning Services in <span className="text-teal-400">{city.name}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{city.intro}</p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/90">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-teal-400" />
                    Trained &amp; insured technicians
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5 shrink-0 text-teal-400" />
                    Arrivals 8 am – 6 pm
                  </span>
                </div>
                {/* Desktop only — phones have the bottom dock (Call / Get Quote) */}
                <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
                  <Button href={quoteHref(prov.code)} size="lg">{`Book in ${city.name}`}</Button>
                  <Button href={telHref(phone)} variant="secondary" size="lg" className={onDarkSecondary}>
                    <Phone className="h-4 w-4" />
                    {`Call ${phone}`}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Glass price card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">{`${city.name} prices`}</h2>
                  <ul className="mt-4 divide-y divide-white/10">
                    {[prov.pricing.base, ...prov.pricing.addons.filter((a) => ["furnace", "ac", "dryer"].includes(a.id))].map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                        <span className="text-white/80">{p.label}</span>
                        <span className="font-display text-xl font-bold">
                          {p.id === "basic" ? `$${p.price}` : p.unit ? `+$${p.price}/${p.unit}` : `+$${p.price}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-white/70">Every duct &amp; vent + free furnace inspection · no hidden charges.</p>
                  <Link
                    href={costUrl(city)}
                    className="group mt-5 inline-flex items-center gap-2 font-semibold text-teal-400 hover:text-white"
                  >
                    {`Full ${city.name} price guide & add-ons`}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* "Is my neighbourhood covered?" — instant coverage check */}
      <section className="bg-canvas py-10 sm:py-12">
        <Container className="max-w-3xl">
          <Reveal>
            <CoverageSearch
              city={city.name}
              provinceName={area.name}
              provinceCode={prov.code}
              neighbourhoods={city.neighbourhoods}
              nearby={city.nearby ?? []}
              provinceCities={provincePages.find((p) => p.slug === area.slug)?.cities ?? []}
              phone={phone}
              whatsappDigits={whatsappFor(prov.code)}
            />
          </Reveal>
        </Container>
      </section>

      {/* Local angle — climate + housing */}
      <section className="border-y border-line bg-teal-50/50 py-16">
        <Container>
          <SectionHeading eyebrow="Local know-how" title={`Why ${city.name} homes need duct cleaning`} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              { icon: Sun, title: `${city.name}’s climate`, text: city.climate },
              { icon: Home, title: `${city.name} homes`, text: city.homes },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="relative isolate h-full overflow-hidden rounded-md border border-line bg-white p-7 backdrop-blur">
                  <CardDecor />
                  <b.icon className="h-7 w-7 text-mint-400" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{b.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Neighbourhoods + services */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ink">Neighbourhoods we serve in {city.name}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {city.neighbourhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-ink"
                >
                  <MapPin className="h-3.5 w-3.5 text-mint-400" />
                  {n}
                </span>
              ))}
            </div>
            <p className="mt-5 text-ink-soft">…and every other part of {city.name}. Not sure? Message us.</p>
            {city.nearby && (
              <>
                <h3 className="mt-8 font-display text-xl font-semibold text-ink">
                  {`Also serving around ${city.name}`}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{city.nearby.join(" · ")}</p>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-ink">Our services in {city.name}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 font-medium text-ink transition-colors hover:border-mint-400/50"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-mint-400" />
                    <span className="flex-1">{s.name}</span>
                    <ArrowRight className="h-4 w-4 text-mint-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQs */}
      <section className="border-t border-line bg-teal-50/50 py-16">
        <Container>
          <SectionHeading eyebrow="FAQs" title={`${city.name} duct cleaning questions`} />
          <Reveal delay={0.1}>
            <ServiceFAQ faqs={city.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* Nearby / related */}
      <Section>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-ink">More in {area.name}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {nearby.map((c) => (
              <Link
                key={c.slug}
                href={cityUrl(c)}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-mint-400/60"
              >
                Duct cleaning {c.name}
              </Link>
            ))}
            <Link
              href={`/${area.slug}/`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-mint-400/60"
            >
              All of {area.name}
            </Link>
            <Link
              href={costUrl(city)}
              className="rounded-full border border-mint-400/40 bg-mint-400/10 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-mint-400"
            >
              {city.name} cost guide
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
