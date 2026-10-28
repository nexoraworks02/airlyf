import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/config/site";

type Crumb = { label: string; href: string };

// Visible breadcrumb trail + BreadcrumbList schema (shows the page path in
// Google results). The last crumb is the current page.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
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
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className="font-semibold text-ink">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-ink">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
