"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, MessageCircle, Phone, Search } from "lucide-react";
import { quoteHref, site, telHref } from "@/config/site";

type Place = { name: string; kind: "neighbourhood" | "nearby" | "province" };

// Lower-case, strip accents and punctuation: "Saint-Jérôme" → "saint jerome".
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * "Is my neighbourhood covered?" — instant check against this city's
 * neighbourhoods, its nearby towns and every city listed for the province.
 * No match never says "no": it offers Call / WhatsApp instead, since the
 * crew may well still cover it.
 */
export function CoverageSearch({
  city,
  provinceName,
  provinceCode,
  neighbourhoods,
  nearby,
  provinceCities,
  phone,
  whatsappDigits,
}: {
  city: string;
  provinceName: string;
  provinceCode: string;
  neighbourhoods: string[];
  nearby: string[];
  provinceCities: string[];
  phone: string;
  whatsappDigits: string;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Place | null>(null);

  const places = useMemo(() => {
    const seen = new Set<string>();
    const out: Place[] = [];
    const add = (name: string, kind: Place["kind"]) => {
      const k = norm(name);
      if (!seen.has(k)) {
        seen.add(k);
        out.push({ name, kind });
      }
    };
    add(city, "neighbourhood");
    neighbourhoods.forEach((n) => add(n, "neighbourhood"));
    nearby.forEach((n) => add(n, "nearby"));
    provinceCities.forEach((n) => add(n, "province"));
    return out;
  }, [city, neighbourhoods, nearby, provinceCities]);

  const q = norm(query);
  const matches = q.length >= 2 ? places.filter((p) => norm(p.name).includes(q)).slice(0, 6) : [];
  const exact = places.find((p) => norm(p.name) === q);
  const result: Place | null = picked ?? exact ?? (matches.length === 1 ? matches[0] : null);
  const showNoMatch = q.length >= 3 && matches.length === 0;

  const waUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    `Hi ${site.name}, do you cover ${query.trim() || "my area"} near ${city}? I'd like a duct cleaning quote.`
  )}`;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_70px_-45px_rgba(16,45,36,0.45)] sm:p-8">
      <label htmlFor={inputId} className="font-display text-xl font-bold text-teal-800 sm:text-2xl">
        Is my neighbourhood covered?
      </label>
      <p className="mt-1 text-sm text-ink-soft">{`Type your neighbourhood or town near ${city}.`}</p>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPicked(null);
          }}
          placeholder={`e.g. ${neighbourhoods[0] ?? city}`}
          className="w-full rounded-full border border-line bg-canvas py-3.5 pl-12 pr-4 text-[15px] font-medium text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"
        />
      </div>

      {/* Suggestions while typing (hidden once one is confirmed) */}
      {!result && matches.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Matching places">
          {matches.map((m) => (
            <li key={m.name}>
              <button
                type="button"
                onClick={() => {
                  setPicked(m);
                  setQuery(m.name);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-teal-800 transition-colors hover:border-teal-400 hover:bg-teal-50"
              >
                <MapPin className="h-3.5 w-3.5 text-teal-500" />
                {m.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite">
        {result && (
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-teal-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2.5 font-semibold text-teal-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
              <span>
                {`Yes — we clean ducts in ${result.name}`}
                {result.kind === "province" && result.name !== city ? `, ${provinceName}` : ""}.
              </span>
            </p>
            <Link
              href={quoteHref(provinceCode)}
              className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 bg-teal-400 px-6 py-3 text-sm font-bold text-teal-800 hover:bg-teal-300"
            >
              {`Book in ${result.kind === "province" ? result.name : city}`}
            </Link>
          </div>
        )}

        {!result && showNoMatch && (
          <div className="mt-4 rounded-2xl border border-line bg-canvas p-4">
            <p className="font-semibold text-teal-800">{`We may still cover “${query.trim()}”.`}</p>
            <p className="mt-1 text-sm text-ink-soft">Ask us — if it’s near one of our service areas, we can usually help.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a
                href={telHref(phone)}
                className="btn-outline inline-flex items-center justify-center gap-2 border-2 border-teal-800 px-5 py-2.5 text-sm font-bold text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {`Call ${phone}`}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
