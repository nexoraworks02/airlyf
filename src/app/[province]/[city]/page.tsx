import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock, Home, MapPin, Phone, ShieldCheck, Sun } from "lucide-react";
import { cities, citiesIn, cityArea, cityUrl, costUrl, getCity } from "@/config/cities";
import { services, site, phoneFor, telHref, quoteHref } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
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
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-teal-200/20 blur-[120px]" />
      </div>

      <Container className="py-12">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: area.name, href: `/${area.slug}/` },
              { label: city.name, href: cityUrl(city) },
            ]}
          />
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink">
                <MapPin className="h-4 w-4 text-mint-400" />
                {city.name}, {area.name} · from ${prov.priceFrom}
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Air Duct Cleaning Services in {city.name}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{city.intro}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-ink-soft">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-mint-400" />
                  <span>Trained &amp; Insured Technicians</span>
                </div>
                <div className="flex items-center gap-3 text-ink-soft">
                  <Clock className="h-5 w-5 shrink-0 text-mint-400" />
                  <span>Open 8 am – 6 pm, incl. evenings</span>
                </div>
              </div>
              {/* Desktop only — phones have the bottom Call/Quote bar */}
              <div className="mt-8 hidden flex-wrap gap-4 lg:flex">
                <Button href={quoteHref(prov.code)} size="lg">Book Online</Button>
                <Button href={telHref(phone)} variant="secondary" size="lg">
                  <Phone className="h-4 w-4" />
                  Call {phone}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative isolate overflow-hidden rounded-md border border-line bg-white p-8 shadow-soft backdrop-blur-md">
                <CardDecor size="lg" />
                <h2 className="font-display text-lg font-semibold uppercase tracking-wider text-teal-500">
                  {city.name} prices
                </h2>
                <ul className="mt-5 divide-y divide-line">
                  {[prov.pricing.base, ...prov.pricing.addons.filter((a) => ["furnace", "ac", "dryer"].includes(a.id))].map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                      <span className="text-ink-soft">{p.label}</span>
                      <span className="font-display text-xl font-bold text-ink">
                        {p.id === "basic" ? `$${p.price}` : p.unit ? `+$${p.price}/${p.unit}` : `+$${p.price}`}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-soft">Every duct &amp; vent + free furnace inspection · no hidden charges.</p>
                <Link
                  href={costUrl(city)}
                  className="group mt-6 inline-flex items-center gap-2 font-semibold text-mint-400 hover:text-ink"
                >
                  {`Full ${city.name} price guide & add-ons`}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

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
