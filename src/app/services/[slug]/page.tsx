import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Wind, 
  Thermometer, 
  Snowflake, 
  Flame, 
  Filter, 
  Brush,
  CheckCircle2, 
  Phone, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Clock
} from "lucide-react";
import { serviceDetails } from "@/config/services";
import { services, site, telHref, ogImage } from "@/config/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { ServiceFAQ } from "@/components/ServiceFAQ";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ElementType> = {
  "air-duct-cleaning": Wind,
  "furnace-cleaning": Thermometer,
  "ac-cleaning": Snowflake,
  "dryer-vent-cleaning": Flame,
  "filter-change": Filter,
  "brush-cleaning": Brush,
};

export async function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) return {};
  return {
    title: { absolute: detail.metaTitle },
    description: detail.metaDescription,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: {
      images: [ogImage],
      title: detail.metaTitle,
      description: detail.metaDescription,
      url: `/services/${slug}/`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const detail = serviceDetails[slug];

  if (!detail) {
    notFound();
  }

  const IconComponent = iconMap[slug] || Wind;
  const otherServices = services.filter((s) => s.slug !== slug);

  // FAQ rich-result schema — mirrors the FAQs visible on this page.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Background ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#48B47A]/5 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-teal-200/20 blur-[120px]" />
      </div>

      <Container className="py-12">
        {/* Back Link */}
        <Reveal>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-500 transition-colors group mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>
        </Reveal>

        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[#48B47A] to-[#1D503C] text-white shadow-[0_8px_20px_-6px_rgba(16,45,36,0.5)] mb-6">
                <IconComponent className="h-6 w-6" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-6">
                {detail.headline}
              </h1>
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed mb-8">
                {detail.intro}
              </p>
              
              {/* Trust markers */}
              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="flex items-center gap-3 text-ink-soft">
                  <ShieldCheck className="h-5 w-5 text-teal-400 shrink-0" />
                  <span>Licensed & Certified Technicians</span>
                </div>
                <div className="flex items-center gap-3 text-ink-soft">
                  <Clock className="h-5 w-5 text-teal-400 shrink-0" />
                  <span>Open 8 am – 6 pm, incl. evenings</span>
                </div>
              </div>

              {/* Call to Actions */}
              {/* Desktop only — phones have the bottom Call/Quote bar */}
              <div className="hidden flex-wrap gap-4 lg:flex">
                <Button href="/#quote" variant="primary" size="lg">
                  Book Service Now
                </Button>
                <Button href={telHref(site.defaultPhone)} variant="secondary" size="lg">
                  <Phone className="h-4 w-4" />
                  Call {site.defaultPhone}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Pricing Card & Quick Info */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative isolate overflow-hidden rounded-md border border-line bg-white p-8 shadow-soft backdrop-blur-md">
                <CardDecor size="lg" />
                <h3 className="font-display text-lg font-semibold text-teal-500 mb-2 uppercase tracking-wider">
                  Pricing Details
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-ink">
                    {detail.priceValue || "On request"}
                  </span>
                  <span className="text-muted text-sm">
                    {slug === "air-duct-cleaning" || slug === "furnace-cleaning"
                      ? "starting price"
                      : detail.priceValue
                        ? "add-on price"
                        : ""}
                  </span>
                </div>
                <p className="text-ink-soft text-sm md:text-base mb-6 pb-6 border-b border-line">
                  {detail.priceNote}. Can be combined with other cleaning services for maximum home efficiency.
                </p>

                <h4 className="font-semibold text-ink mb-4">Service Checklist:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckCircle2 className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                    <span>Trained, fully insured technicians</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckCircle2 className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                    <span>Floors protected, mess-free cleanup</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckCircle2 className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                    <span>Guaranteed satisfaction</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ink-soft">
                    <CheckCircle2 className="h-5 w-5 text-mint-400 shrink-0 mt-0.5" />
                    <span>No hidden charges</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* What's Included */}
      <section className="py-16 bg-white border-y border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-400">
                  Deep Dive
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-2 mb-6">
                  What&apos;s Included in the Service
                </h2>
                <p className="text-ink-soft leading-relaxed mb-6">
                  Our professional cleaning process covers all vital components. We utilize industry-leading techniques and state-of-the-art tools to ensure the highest standards of cleanliness.
                </p>
                <div className="group relative isolate overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur-sm">
                  <CardDecor />
                  <h4 className="font-display font-semibold text-ink mb-2">
                    Why it matters
                  </h4>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {detail.whyItMatters}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <Reveal delay={0.1}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {detail.whatIsIncluded.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative isolate flex gap-4 overflow-hidden rounded-md border border-line bg-white p-5 backdrop-blur-sm transition-colors hover:border-teal-300"
                    >
                      <CardDecor />
                      <CheckCircle2 className="h-6 w-6 text-teal-400 shrink-0" />
                      <span className="text-ink-soft font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Cleaning Process Step-by-Step */}
      <Section>
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works"
          subtitle="Our systematic, premium approach ensures a thorough clean every time."
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {detail.process.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="group relative isolate h-full overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-300">
                <CardDecor />
                {/* Number indicator */}
                <div className="absolute top-4 right-4 text-4xl font-extrabold text-ink/5 group-hover:text-teal-500/10 transition-colors duration-300 font-display">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#48B47A] to-[#1D503C] text-white font-bold font-display shadow-md mb-6">
                  {idx + 1}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-white border-t border-line">
        <Container>
          <SectionHeading
            eyebrow="FAQs"
            title="Service Questions"
            subtitle="Everything you need to know about our cleaning methods and packages."
          />
          <Reveal delay={0.1}>
            <ServiceFAQ faqs={detail.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* Other Services We Offer */}
      <Section>
        <SectionHeading
          eyebrow="Explore"
          title="Our Other Services"
          subtitle="Keep your entire home's air systems healthy and lint-free with our full suite of cleaning options."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((s, i) => {
            const OtherIcon = iconMap[s.slug] || Wind;
            return (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group relative isolate flex h-full flex-col overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft"
                >
                  <CardDecor />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#48B47A] to-[#1D503C] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <OtherIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {s.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-500 group-hover:text-teal-500 transition-colors">
                    Learn More
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
