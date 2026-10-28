import { cn } from "@/lib/utils";
import { Sparkle } from "./Sparkle";

/** Small uppercase label above section headings, led by the leaf accent. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-mint-400" : "text-teal-500",
        className
      )}
    >
      <Sparkle className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}
