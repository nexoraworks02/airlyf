import { cn } from "@/lib/utils";

/** A small, static leaf (brand accent — fresh air, healthy homes).
 *  Inherits colour from `currentColor`. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M20 3C10.5 3 4 8.6 4 15.4c0 1.6.4 3 1 4.2L3.3 21.3l1.4 1.4 1.8-1.8c1.2.7 2.6 1.1 4.1 1.1C17.3 22 21 15.6 21 4V3h-1Zm-9.4 17c-1 0-2-.2-2.8-.7l6.9-6.9-1.4-1.4-6.9 6.9a6.6 6.6 0 0 1-.4-2.5C6 10 11 5.4 18.9 5c-.3 9.3-3.3 15-8.3 15Z" />
    </svg>
  );
}
