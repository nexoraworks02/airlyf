import { BadgeCheck, ClipboardCheck, Flame, LayoutGrid } from "lucide-react";
import { Container } from "../ui/Container";

// Light band right under the forest hero: the four service promises.
const POINTS = [
  { icon: LayoutGrid, title: "Every vent included", text: "No vent counts, no per-register fees." },
  { icon: Flame, title: "Free furnace inspection", text: "A look at your furnace on every visit." },
  { icon: ClipboardCheck, title: "Price confirmed first", text: "Your total is agreed before we start." },
  { icon: BadgeCheck, title: "Trained, insured crews", text: "Floors protected, cleaned up after." },
];

export function TrustStrip() {
  return (
    <section aria-label="Our promises" className="border-b border-line bg-white">
      <Container className="grid gap-x-8 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-display font-bold text-ink">{title}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
