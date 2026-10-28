import Link from "next/link";
import { Check, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";

// "What to check in any quote" table: Airlyf vs. the catches that
// often come with low advertised prices. Generic on purpose — no named
// competitors.
const ROWS: { label: string; us: string; them: string }[] = [
  { label: "Vents covered", us: "Every supply & return vent", them: "Often capped, extra vents billed" },
  { label: "Price", us: "Published online, confirmed before work", them: "\"From\" price, total given on site" },
  { label: "Furnace", us: "Free inspection every visit", them: "Inspection charged or skipped" },
  { label: "Equipment", us: "Negative-air vacuum + rotary tools", them: "Sometimes a portable shop-vac" },
  { label: "Booking", us: "Online in 2 minutes, arrival window", them: "Call back for a quote" },
];

export function Comparison() {
  return (
    <section id="compare" className="scroll-mt-24 bg-canvas py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Compare before you book</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl lg:text-[2.75rem]">
            What&apos;s really in the price?
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Low advertised prices often leave things out. Here&apos;s what you get with us, and what to ask any company you&apos;re comparing.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse bg-white text-left shadow-[0_30px_70px_-45px_rgba(16,45,36,0.5)]">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-line p-5 text-xs font-bold uppercase tracking-wider text-ink-soft" />
                <th className="w-[37.5%] border-b-4 border-teal-400 bg-teal-800 p-5 font-display text-lg font-bold text-white">
                  Airlyf
                </th>
                <th className="w-[37.5%] border-b border-line p-5 font-display text-lg font-bold text-ink-soft">
                  Typical low-price offer
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-5 text-sm font-bold uppercase tracking-wide text-teal-800">
                    {r.label}
                  </th>
                  <td className="bg-teal-50/60 p-5">
                    <span className="flex items-start gap-2.5 font-semibold text-teal-800">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" strokeWidth={3} />
                      {r.us}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="flex items-start gap-2.5 text-ink-soft">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
                      {r.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/duct-cleaning-cost/"
            className="btn-outline inline-flex items-center justify-center border-2 border-teal-800 px-6 py-3.5 text-[15px] font-bold text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
          >
            See full price list
          </Link>
          <Link
            href="/#quote"
            className="btn-primary inline-flex items-center justify-center bg-teal-400 px-6 py-3.5 text-[15px] font-bold text-teal-800 transition-colors hover:bg-teal-300"
          >
            Book online
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
