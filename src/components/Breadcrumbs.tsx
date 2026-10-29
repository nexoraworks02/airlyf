import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/config/site";

type Crumb = { label: string; href: string };

// Visible breadcrumb trail + BreadcrumbList schema (shows the page path in
// Google results). The last crumb is the current page. `tone="dark"` for use
// on forest-green heroes.
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const all = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className={`h-3.5 w-3.5 ${dark ? "text-white/40" : "text-muted"}`} />}
            {i === all.length - 1 ? (
              <span aria-current="page" className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{c.label}</span>
            ) : (
              <Link href={c.href} className={dark ? "hover:text-white" : "hover:text-ink"}>{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
