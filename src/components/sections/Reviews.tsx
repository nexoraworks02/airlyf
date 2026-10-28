import { MapPin, Quote, Star } from "lucide-react";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { googleReviewsUrl, reviews, type Review } from "@/config/reviews";

/**
 * Testimonials: a forest-green band with two rows of glass review cards
 * gliding in opposite directions (pause on hover). Each row's list is
 * rendered twice so the loop is seamless; the copy is aria-hidden.
 * Reduced motion: no glide — the rows become swipeable instead.
 * Only real reviews (config/reviews.ts); stars only when a review has one.
 */
export function Reviews() {
  if (reviews.length === 0) return null;
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)].filter((r) => r.length > 0);
  const provinces = [...new Set(reviews.map((r) => r.location?.split(", ")[1]).filter(Boolean))];

  return (
    <section id="reviews" className="relative isolate scroll-mt-24 overflow-hidden bg-teal-800 py-20 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute -left-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-teal-400/10 blur-[110px]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-teal-600/40 blur-[110px]" />

      <Container>
        <Reveal className="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow tone="dark">Testimonials</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              What our customers say
            </h2>
          </div>
          <p className="text-white/70 md:text-right">
            {`Real words from homeowners we've worked with${
              provinces.length ? ` in ${provinces.join(", ").replace(/, ([^,]*)$/, " and $1")}` : ""
            }.`}
          </p>
        </Reveal>
      </Container>

      {/* Gliding rows (full width, edges fade out) */}
      <div className="mt-12 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {rows.map((row, i) => (
          <div key={i} className="group overflow-x-auto motion-safe:overflow-hidden">
            <div
              className={`flex w-max gap-5 px-4 motion-safe:animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] ${
                i % 2 ? "motion-safe:[animation-direction:reverse]" : ""
              }`}
            >
              {[...row, ...row].map((r, j) => (
                <ReviewCard key={`${r.name}-${j}`} review={r} copy={j >= row.length} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {googleReviewsUrl && (
        <Container className="mt-10 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[15px] font-bold transition-colors hover:border-white hover:bg-white/10"
          >
            See all reviews on Google
          </a>
        </Container>
      )}
    </section>
  );
}

function ReviewCard({ review, copy }: { review: Review; copy: boolean }) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <figure
      aria-hidden={copy || undefined}
      className="relative flex w-[300px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.1] sm:w-[380px] sm:p-7"
    >
      <Quote className="h-8 w-8 text-teal-400" />
      {review.rating && (
        <div className="mt-3 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, k) => (
            <Star key={k} className={`h-4 w-4 ${k < review.rating! ? "fill-teal-400 text-teal-400" : "text-white/25"}`} />
          ))}
        </div>
      )}
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/85">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-400 font-display font-extrabold text-teal-800">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block font-display font-bold">{review.name}</span>
          {review.location && (
            <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-teal-400">
              <MapPin className="h-3.5 w-3.5" />
              {review.location}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
