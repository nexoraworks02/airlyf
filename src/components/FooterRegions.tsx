"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { provinces } from "@/config/site";

/**
 * Footer "Find your region" tiles. Hidden on the homepage, where the
 * service-area map's province cards already list every region.
 */
export function FooterRegions() {
  if (usePathname() === "/") return null;
  return (
    <div className="border-b border-white/10">
      <Container className="py-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-mint-400">Find your region</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {provinces.map((p) => (
            <li key={p.code}>
              <Link
                href={`/${p.slug}/`}
                className="group flex h-full flex-col justify-between gap-2 rounded-xl border border-white/10 p-4 transition-colors hover:border-teal-400/70 hover:bg-white/5"
              >
                <span className="font-display font-bold leading-tight text-white">{p.name}</span>
                <span className="flex items-center justify-between text-xs font-semibold text-white/60 group-hover:text-teal-400">
                  {`from $${p.priceFrom}`}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
