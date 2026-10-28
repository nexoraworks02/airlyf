import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { blogPosts, getPost } from "@/config/blog";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardDecor } from "@/components/ui/CardDecor";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText, stripLinks } from "@/components/RichText";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: post.metaTitle, description: post.description, url, publishedTime: post.date },
  };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    },
  ];
  if (post.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: stripLinks(f.answer) },
      })),
    });
  }

  return (
    <div className="theme-inner relative min-h-screen pt-28 sm:pt-32 lg:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="max-w-3xl py-12">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog/" },
              { label: post.title, href: `/blog/${post.slug}/` },
            ]}
          />
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span>By the {site.name} team</span>
            <span>{fmtDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readMins} min read
            </span>
          </p>
          <p className="mt-8 text-xl leading-relaxed text-ink-soft">{post.intro}</p>
        </Reveal>

        <article className="mt-10 space-y-10">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((t) => (
                <p key={t.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-ink-soft">
                  <RichText text={t} />
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-lg text-ink-soft">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-mint-400" />
                      <span>
                        <RichText text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {post.faqs && (
          <section className="mt-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">Quick answers</h2>
            <ServiceFAQ faqs={post.faqs} />
          </section>
        )}

        {/* Booking prompt */}
        <div className="relative isolate mt-14 overflow-hidden rounded-md border border-line bg-white p-8 text-center backdrop-blur">
          <CardDecor size="lg" />
          <h2 className="font-display text-2xl font-bold text-ink">Ready for cleaner air?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            See your exact price and pick a slot between 8 am and 6 pm — it takes about two minutes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#quote" size="lg">Book online</Button>
            <Link href="/duct-cleaning-cost/" className="font-semibold text-mint-400 hover:text-ink">
              View prices
            </Link>
          </div>
        </div>
      </Container>

      <section className="border-t border-line bg-teal-50/50 py-14">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink">More guides</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group rounded-md border border-line bg-white p-5 transition-colors hover:border-teal-300"
              >
                <h3 className="font-display font-semibold text-ink">{p.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-mint-400">
                  Read
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
