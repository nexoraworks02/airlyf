import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Sparkle } from "./Sparkle";

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28 scroll-mt-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn("max-w-2xl", center && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4",
            dark ? "text-mint-400" : "text-teal-500"
          )}
        >
          <Sparkle className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/75" : "text-ink-soft"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
