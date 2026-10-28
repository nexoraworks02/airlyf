import { cn } from "@/lib/utils";

/**
 * Brand card accent: a solid red bar along the card's top edge that grows to
 * full width on hover (when the card has the `group` class).
 *
 * Usage: give the card `relative isolate overflow-hidden` and drop
 * <CardDecor /> inside. It sits at -z-10, so it paints above the card's
 * background but below its content — no wrapper needed around the content.
 */
export function CardDecor({
  tone = "light",
  size = "sm",
  className,
}: {
  tone?: "light" | "dark";
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <span
        className={cn(
          "absolute left-0 top-0 w-full origin-left transition-transform duration-500",
          size === "lg" ? "h-1.5" : "h-1",
          tone === "dark" ? "bg-mint-400" : "bg-teal-400",
          size === "sm" && "scale-x-[0.35] group-hover:scale-x-100"
        )}
      />
    </div>
  );
}
