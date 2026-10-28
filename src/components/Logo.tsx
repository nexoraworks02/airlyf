import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/**
 * Brand wordmark (the logo's lettering + "Duct Cleaning Services" line),
 * recoloured to the forest-green theme. `tone="dark"` = green-on-light for
 * white backgrounds; `tone="light"` = white/fresh-green for forest backgrounds.
 * Source + full logo: public/images/logo/.
 */
export function Logo({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md"; // sm = compact navbar version
}) {
  const src = tone === "dark" ? "/images/logo/logo-wordmark.png" : "/images/logo/logo-wordmark-light.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny PNG, needs exact intrinsic sizing
    <img
      src={src}
      alt={site.name}
      width={700}
      height={160}
      className={cn("block w-auto", size === "sm" ? "h-9 sm:h-10" : "h-11 sm:h-12", className)}
    />
  );
}
