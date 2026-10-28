import Link from "next/link";

// Renders text with inline links written as [label](/path/), so config
// content (blog articles, guides) can link into service and area pages.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <Link
        key={i}
        href={m[2]}
        className="font-semibold text-mint-400 underline decoration-mint-400/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-teal-500"
      >
        {m[1]}
      </Link>
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

// Plain-text version (for meta tags and JSON-LD).
export const stripLinks = (text: string) => text.replace(LINK, "$1");
