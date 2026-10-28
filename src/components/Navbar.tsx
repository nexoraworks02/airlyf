"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Brush,
  CalendarCheck,
  ChevronDown,
  Clock,
  Filter,
  Flame,
  Mail,
  MapPin,
  Menu,
  Phone,
  Snowflake,
  Thermometer,
  Wind,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import { nav, provinces, services, site, telHref } from "@/config/site";
import { cn } from "@/lib/utils";

// Icons for the Services dropdown (explicit imports keep the bundle small).
const SERVICE_ICONS: Record<string, LucideIcon> = { Wind, Thermometer, Flame, Snowflake, Filter, Brush };

type MenuKey = "services" | "areas";
// Which top-level nav items open a dropdown (matched by label).
const DROPDOWN_FOR: Record<string, MenuKey> = { Services: "services", "Service Areas": "areas" };

// Two-tier header. Desktop: a forest info bar (regions · hours · phone ·
// email) that folds away on scroll, above a white bar with logo, menu links
// with a fresh-green underline and a pill "Get a Quote" button. Once the page
// scrolls the bar turns translucent with a soft blur and shadow.
// Phones: logo + menu button only (the bottom bar has Call / Get Quote).
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [menu, setMenu] = useState<MenuKey | null>(null); // desktop dropdown
  const [mobileSub, setMobileSub] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    const t = setTimeout(() => {
      setMenu(null);
      setOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Small delay before closing so moving the mouse into the panel doesn't flicker.
  const openMenu = (k: MenuKey) => {
    clearTimeout(closeTimer.current);
    setMenu(k);
  };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  const tel = telHref(site.defaultPhone);
  // Only real page links get an "active" state; /#anchors never do.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.5, 0.27, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-line/70 bg-white/90 shadow-[0_12px_40px_-20px_rgba(16,45,36,0.3)] backdrop-blur-md"
          : "border-line bg-white"
      )}
      onKeyDown={(e) => e.key === "Escape" && setMenu(null)}
    >
      {/* Info bar — desktop only, folds away once the page scrolls */}
      <div
        className={cn(
          "hidden overflow-hidden bg-teal-800 text-[12px] text-white/80 transition-[height] duration-300 lg:block",
          scrolled ? "h-0" : "h-9"
        )}
      >
        <Container className="flex h-9 max-w-7xl items-center justify-between gap-6">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-mint-400" />
            Serving {provinces.map((p) => (p.code === "MT" ? "the Maritimes" : p.code)).join(" · ")}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-mint-400" />
              Arrivals 8 am – 6 pm
            </span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-mint-400" />
              {site.email}
            </a>
            <a href={tel} className="flex items-center gap-2 font-bold text-white">
              <Phone className="h-3.5 w-3.5 text-mint-400" />
              {site.defaultPhone}
            </a>
          </div>
        </Container>
      </div>

      <Container
        className={cn(
          "flex max-w-7xl items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-[64px]" : "h-[68px] sm:h-[76px]"
        )}
      >
        <Link href="/" aria-label={site.name} className="min-w-0">
          <Logo tone="dark" size="sm" />
        </Link>

        <nav className="hidden h-full items-stretch xl:flex">
          {nav.map((item) => {
            const dd = DROPDOWN_FOR[item.label];
            const on = isActive(item.href) || (dd && menu === dd);
            const linkCls = cn(
              "group relative inline-flex h-full items-center gap-1 whitespace-nowrap px-4 text-[15px] font-semibold transition-colors",
              on ? "text-teal-500" : "text-ink hover:text-teal-500"
            );
            const underline = (
              <span
                className={cn(
                  "absolute inset-x-4 bottom-0 h-[2px] origin-left rounded-full bg-teal-400 transition-transform duration-300 group-hover:scale-x-100",
                  on ? "scale-x-100" : "scale-x-0"
                )}
              />
            );
            if (!dd) {
              return (
                <Link key={item.href} href={item.href} className={linkCls}>
                  {item.label}
                  {underline}
                </Link>
              );
            }
            return (
              <div
                key={item.href}
                className="relative h-full"
                onMouseEnter={() => openMenu(dd)}
                onMouseLeave={closeMenuSoon}
                onFocus={() => openMenu(dd)}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && closeMenuSoon()}
              >
                <Link href={item.href} className={linkCls} aria-haspopup="true" aria-expanded={menu === dd}>
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", menu === dd && "rotate-180")} />
                  {underline}
                </Link>
                {/* Outer div centres the panel; inner motion.div animates
                    (framer's transform would otherwise override translate-x). */}
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-px">
                  <AnimatePresence>
                    {menu === dd && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                      >
                        {dd === "services" ? <ServicesPanel /> : <AreasPanel />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </nav>

        <Link
          href="/#quote"
          className="btn-primary hidden items-center gap-2 whitespace-nowrap bg-teal-400 px-6 py-3 text-sm font-bold text-teal-800 hover:bg-teal-300 xl:inline-flex"
        >
          <CalendarCheck className="h-4 w-4" />
          Get a Quote
        </Link>

        <button
          className="rounded-lg p-2 text-teal-800 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {/* Mobile menu — Services / Service Areas expand in place */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item, i) => {
                const dd = DROPDOWN_FOR[item.label];
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {dd ? (
                      <>
                        <button
                          onClick={() => setMobileSub((s) => (s === dd ? null : dd))}
                          aria-expanded={mobileSub === dd}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-teal-50"
                        >
                          {item.label}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileSub === dd && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileSub === dd && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-3 overflow-hidden border-l-2 border-teal-100 pl-3"
                            >
                              {(dd === "services"
                                ? services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name }))
                                : [
                                    ...provinces.map((p) => ({ href: `/${p.slug}/`, label: p.name })),
                                    { href: "/service-areas/", label: "All service areas" },
                                  ]
                              ).map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-teal-50 hover:text-teal-800"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-teal-50"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <a
                href={tel}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-3.5 font-bold text-white"
              >
                <Phone className="h-5 w-5" />
                Call Now: {site.defaultPhone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- Desktop dropdown panels ---------------- */

function PanelShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-[0_30px_70px_-25px_rgba(16,45,36,0.4)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function ServicesPanel() {
  return (
    <PanelShell className="w-[380px]">
      <ul>
        {services.map((s) => {
          const Icon = SERVICE_ICONS[s.icon] ?? Wind;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}/`}
                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-teal-50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-500 transition-colors group-hover:bg-teal-800 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-bold text-teal-800">{s.name}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{s.short}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/#pricing"
        className="mt-1 flex items-center justify-between rounded-xl bg-teal-800 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-teal-700"
      >
        See pricing
        <ArrowRight className="h-4 w-4" />
      </Link>
    </PanelShell>
  );
}

function AreasPanel() {
  return (
    <PanelShell className="w-[460px]">
      <ul className="grid grid-cols-2 gap-1">
        {provinces.map((p) => (
          <li key={p.code}>
            <Link
              href={`/${p.slug}/`}
              className="group flex items-center gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-teal-50"
            >
              {/* Landmark thumbnail (only loads when the dropdown opens) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.photo}
                alt=""
                className="h-10 w-12 shrink-0 rounded-lg object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold text-teal-800">{p.name}</span>
                <span className="block text-[11px] font-semibold text-ink-soft">from ${p.priceFrom}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/service-areas/"
        className="mt-2 flex items-center justify-between rounded-xl bg-teal-800 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-teal-700"
      >
        All service areas
        <ArrowRight className="h-4 w-4" />
      </Link>
    </PanelShell>
  );
}
