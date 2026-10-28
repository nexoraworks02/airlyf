import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Building2, Clock, Flame, MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { CanadaMap } from "../map/CanadaMap";
import { MapInteractions, type MapRegionInfo } from "../map/MapInteractions";
import { MAIN_PROVINCE_KEYS, SERVICE_REGIONS } from "../map/regions";
import { canadaRegions } from "@/config/canada-map";
import { provincePages } from "@/config/service-areas";
import { provinces } from "@/config/site";

// Same facts the rest of the site states — nothing new is claimed here.
const BENEFITS = [
  { icon: BadgeDollarSign, text: "Published prices for every province" },
  { icon: Flame, text: "Free furnace inspection on every visit" },
  { icon: Clock, text: "Arrivals 8 am – 6 pm" },
  { icon: Building2, text: "Homes, condos & commercial units" },
];

/** First sentence of a province page's opening paragraph. */
function blurbFor(slug: string) {
  const first = provincePages.find((p) => p.slug === slug)?.sections[0]?.paragraphs[0] ?? "";
  return first.match(/^.+?[.!?](\s|$)/)?.[0].trim() ?? first;
}

// Everything the map and cards need, from the existing area + pricing data.
function regionInfo(): MapRegionInfo[] {
  const labels = new Map(canadaRegions.map((r) => [r.id, r.label]));
  return SERVICE_REGIONS.map((s) => {
    const page = provincePages.find((p) => p.slug === s.slug);
    const prov = provinces.find((p) => p.slug === s.slug);
    return {
      key: s.key,
      slug: s.slug,
      name: page?.name ?? prov?.name ?? s.slug,
      priceFrom: prov?.priceFrom ?? 0,
      blurb: blurbFor(s.slug),
      cities: page?.cities ?? [],
      photo: prov?.photo,
      landmark: prov?.landmark,
      label: labels.get(s.labelFrom) ?? [0, 0],
    };
  });
}

/**
 * "Professional Duct Cleaning Across Canada": heading + benefits on top, then
 * a full-width interactive SVG map of the service provinces only (real
 * boundaries) with its details panel, then one card per province. Every
 * region, card and panel button links to the existing
 * province page (/ontario/, /alberta/, …).
 */
export function ServiceAreaMap({ id = "areas", headingLevel = "h2" }: { id?: string; headingLevel?: "h1" | "h2" }) {
  const regions = regionInfo();
  const names = Object.fromEntries(regions.map((r) => [r.key, r.name]));
  const main = MAIN_PROVINCE_KEYS.map((k) => regions.find((r) => r.key === k)!);
  const maritime = regions.find((r) => r.key === "mt");
  const Heading = headingLevel;

  return (
    <section id={id} className="relative isolate scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Faint topographic contour texture behind the whole section */}
      <Image
        src="/images/textures/topo-contour.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
      />
      <Container>
        {/* Heading (left) + benefits & CTA (right) */}
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Eyebrow>Service areas</Eyebrow>
            <Heading className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
              Professional Duct Cleaning Across Canada
            </Heading>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              Explore our service areas and find professional duct cleaning services available in your province.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[15px] font-semibold text-teal-800">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <a
              href={`#${id}-list`}
              className="btn-primary mt-6 inline-flex items-center gap-2 bg-teal-400 px-7 py-3.5 text-[15px] font-bold text-teal-800 hover:bg-teal-300"
            >
              <MapPin className="h-4 w-4" />
              Find Your Service Area
            </a>
          </Reveal>
        </div>

        {/* Full-width map card: green service provinces + details panel */}
        <Reveal delay={0.1} className="mt-10">
            <div className="relative isolate -mx-2 overflow-hidden rounded-3xl bg-teal-50 p-4 sm:mx-0 sm:p-7">
              <MapInteractions regions={regions} defaultKey="on">
                <CanadaMap names={names} />
              </MapInteractions>
              {/* Legend + credit on a light backing so they stay readable over the photo */}
              <div className="mt-4 w-fit max-w-full rounded-xl bg-white/80 px-3 py-2 backdrop-blur-sm">
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-ink">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-teal-400" /> Service province — select to explore
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#9FCDB0]" /> Maritime provinces
                </span>
              </p>
              {/* Required by the map data's CC BY 4.0 licence (see config/canada-map.ts). */}
              <p className="mt-1 text-[11px] text-ink-soft">
                Map:{" "}
                <a href="https://mapsvg.com/maps/canada" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                  MapSVG
                </a>{" "}
                via svg-maps, licensed{" "}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                  CC BY 4.0
                </a>
                , simplified.
              </p>
              </div>
            </div>
        </Reveal>

        {/* Accessible list of the six provinces (same links as the map) */}
        <div id={`${id}-list`} className="mt-12 scroll-mt-28">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {main.map((r) => (
            <StaggerItem key={r.key}>
              <Link
                href={`/${r.slug}/`}
                className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/60 hover:shadow-[0_18px_40px_-26px_rgba(16,45,36,0.4)]"
              >
                <span className="font-display font-bold leading-tight text-teal-800">{r.name}</span>
                <span className="flex items-center justify-between text-xs font-semibold text-ink-soft">
                  {`from $${r.priceFrom} · ${r.cities.length} cities`}
                  <ArrowRight className="h-3.5 w-3.5 text-teal-500 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        </div>
        {maritime && (
          <p className="mt-5 text-center text-sm text-ink-soft">
            Also serving Nova Scotia, New Brunswick, PEI and Newfoundland &amp; Labrador —{" "}
            <Link href={`/${maritime.slug}/`} className="font-bold text-teal-500 underline-offset-4 hover:underline">
              see the Maritime provinces
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}
