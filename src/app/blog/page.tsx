import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/config/blog";
import { site, ogImage } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = `Duct Cleaning Tips & Guides | ${site.name} Blog`;
const description =
  "Practical guides on air duct cleaning — costs, how often to clean, warning signs, dryer vent fire safety and what to expect from a professional cleaning.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/blog/" },
  openGraph: { title, description, url: "/blog/", images: [ogImage] },
};

export default function BlogIndexPage() {
  return (
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      <Container className="py-12">
        <Reveal>
          <Breadcrumbs items={[{ label: "Blog", href: "/blog/" }]} />
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Duct cleaning tips &amp; guides
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group relative isolate flex h-full flex-col overflow-hidden rounded-md border border-line bg-white p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-teal-300"
              >
                <CardDecor />
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-500">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readMins} min read
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mint-400 group-hover:text-ink">
                  Read guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
