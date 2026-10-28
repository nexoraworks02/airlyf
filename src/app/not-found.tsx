import Link from "next/link";
import { Wind } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="theme-inner flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-[#48B47A] to-[#1D503C] text-white shadow-lg">
        <Wind className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-5xl font-bold text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        This page seems to have vanished into thin air. Let&apos;s get you back
        to cleaner air instead.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Back to Home
        </Button>
        <Button href="/#quote" size="lg" variant="secondary">
          Get a Free Quote
        </Button>
      </div>
      <p className="mt-8 text-sm text-muted">
        Popular:{" "}
        <Link href="/services/air-duct-cleaning" className="text-teal-600 hover:text-mint-400">
          Air Duct Cleaning
        </Link>{" "}
        ·{" "}
        <Link href="/services/dryer-vent-cleaning" className="text-teal-600 hover:text-mint-400">
          Dryer Vent Cleaning
        </Link>{" "}
        ·{" "}
        <Link href="/#pricing" className="text-teal-600 hover:text-mint-400">
          Pricing
        </Link>
      </p>
    </main>
  );
}
