"use client";

import { useRef, useState } from "react";
import { AlertCircle, Check, CheckCircle2, Loader2, MessageCircle, Minus, Phone, Plus, ShieldCheck } from "lucide-react";
import { site, provinces, phoneFor, telHref, whatsappFor } from "@/config/site";
import { trackMeta } from "./MetaPixel";
import { cn } from "@/lib/utils";

/* ---------------- Form options ---------------- */

const HOUSE_SIZES = ["Under 2,000 sq ft", "2,000 – 2,500 sq ft", "2,500 – 4,000 sq ft", "Over 4,000 sq ft"];

type Step = "form" | "done";

/* Live total: always the exact number (no count-up animation that could lag
   or show an in-between price) — it just pops briefly when it changes. */
function TotalAmount({ value, className }: { value: number; className?: string }) {
  return (
    <span key={value} className={cn("total-pop inline-block", className)}>
      ${value}
    </span>
  );
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

/**
 * The booking form itself — a light, calculator-style card (details | extras,
 * then estimate + Book now). Shown inline in the homepage booking section
 * (sections/BookingSection.tsx, id "quote"); every Book / Get Quote link
 * scrolls there. Kept short on purpose: name, phone, province, address,
 * house size and add-ons — the team calls back to confirm the time.
 */
/** Starting choices passed in by BookingSection (e.g. the province from ?area=). */
export type QuotePreset = { province: string; qty: Record<string, number> };

export function BookingForm({
  defaultProvince = "ON",
  preset = null,
}: {
  defaultProvince?: string;
  preset?: QuotePreset | null;
}) {
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  // Honeypot anti-spam: real users never see or fill this hidden field; bots do.
  const honeypot = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    province: preset?.province ?? defaultProvince,
    address: "",
    houseSize: "",
  });
  // Add-on quantities by id (0 = not chosen). Per-unit add-ons (furnaces,
  // dryer vents, exhaust fans) can be 1…maxQty; the rest are simply 0 or 1.
  const [qty, setQty] = useState<Record<string, number>>(preset?.qty ?? {});
  // A new preset (e.g. the ?area= province, read after mount) sets the area and
  // add-ons, keeping whatever the customer already typed.
  const [appliedPreset, setAppliedPreset] = useState(preset);
  if (preset !== appliedPreset) {
    setAppliedPreset(preset);
    if (preset) {
      setForm((f) => ({ ...f, province: preset.province }));
      setQty(preset.qty);
    }
  }
  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Prices (Basic Duct Cleaning + add-ons) are set by the customer's province.
  const selectedProvince =
    provinces.find((p) => p.code === form.province) ?? provinces[0];
  const { base, addons } = selectedProvince.pricing;
  const selectedAddons = addons
    .map((a) => ({ ...a, qty: qty[a.id] ?? 0 }))
    .filter((a) => a.qty > 0);
  const lineLabel = (a: (typeof selectedAddons)[number]) =>
    a.unit ? `${a.label} × ${a.qty}` : a.label;
  const total = base.price + selectedAddons.reduce((sum, a) => sum + a.price * a.qty, 0);
  const pkgLabel = `${base.label} ($${base.price}) — includes free furnace inspection`;

  const setAddonQty = (id: string, n: number) => setQty((q) => ({ ...q, [id]: n }));
  // Step a per-unit add-on by ±1 from the latest state (fast double-taps all count).
  const stepAddon = (id: string, delta: number, max: number) =>
    setQty((q) => ({ ...q, [id]: Math.min(max, Math.max(0, (q[id] ?? 0) + delta)) }));

  const fullName = form.fullName.trim();

  // Pre-filled WhatsApp booking message (used on the success/error screens).
  const waMessage = encodeURIComponent(
    [
      `New Booking — ${site.name}`,
      "",
      `Customer: ${fullName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      `Province: ${selectedProvince.name}`,
      `House size: ${form.houseSize || "—"}`,
      "",
      `Service: ${pkgLabel}`,
      selectedAddons.length ? "Additional services:" : "Additional services: None",
      ...selectedAddons.map((a) => `• ${lineLabel(a)} (+$${a.price * a.qty})`),
      "",
      `Estimated total: $${total}`,
    ].join("\n")
  );
  const waUrl = `https://wa.me/${whatsappFor(selectedProvince.code)}?text=${waMessage}`;
  const tel = telHref(phoneFor(selectedProvince.code));

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();

    if (submittingRef.current) return;

    // Honeypot tripped → it's a bot. Abort silently: no success, no error.
    if (honeypot.current?.value) return;

    if (!isValidPhone(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError(null);

    try {
      if (!site.web3formsAccessKey) {
        throw new Error("missing-web3forms-key");
      }

      // Email the booking to the business via Web3Forms.
      // Success is shown ONLY when Web3Forms confirms delivery.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          // Web3Forms built-in honeypot: must stay empty.
          botcheck: honeypot.current?.value ?? "",
          subject: `New Booking — ${fullName} (${selectedProvince.name}, $${total})`,
          from_name: `${site.name} Website`,
          name: fullName,
          phone: form.phone,
          province: selectedProvince.name,
          address: form.address,
          houseSize: form.houseSize,
          service: pkgLabel,
          additionalServices:
            selectedAddons.map((a) => `${lineLabel(a)} ($${a.price * a.qty})`).join(", ") || "None",
          estimatedTotal: `$${total}`,
          source: "booking-form",
        }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (!res.ok || !data.success) throw new Error(data.message || "submit-failed");

      // Only on confirmed delivery: track the lead + show success.
      trackMeta("Lead", { value: total, currency: "CAD" });
      setStep("done");
    } catch {
      setError(
        "Sorry — we couldn't send your booking just now. Please try again, or message us on WhatsApp below."
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  const input =
    "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[15px] font-medium text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30";
  const extrasText = selectedAddons.length ? selectedAddons.map(lineLabel).join(", ") : "No extras yet";

  if (step === "done") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-[0_40px_90px_-40px_rgba(16,45,36,0.45)] ring-1 ring-line sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-teal-400" />
        <h3 className="mt-4 font-display text-2xl font-bold text-teal-800">Booking request received</h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          Thank you for booking with {site.name}. We&apos;ll call you shortly to confirm a time.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={tel}
            className="btn-outline inline-flex items-center justify-center gap-2 border-2 border-teal-800 px-6 py-3 font-bold text-teal-800 transition-colors hover:bg-teal-800 hover:text-white"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Message on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitBooking}
      className="relative rounded-3xl bg-white p-5 text-ink shadow-[0_40px_90px_-40px_rgba(16,45,36,0.45)] ring-1 ring-line sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        {/* Left — details */}
        <div>
          <Label n={1} title="Your details" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name">
              <input required suppressHydrationWarning autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={set("fullName")} className={input} />
            </Field>
            <Field label="Contact number">
              <input
                required
                suppressHydrationWarning
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                pattern="(?:\+?1[\s.\-]?)?\(?[2-9]\d{2}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}"
                title="Enter a valid 10-digit phone number, for example (416) 555-0123"
                placeholder="(416) 555-0123"
                value={form.phone}
                onChange={set("phone")}
                className={input}
              />
            </Field>
            <Field label="Province (sets your prices)">
              <select required suppressHydrationWarning value={form.province} onChange={set("province")} className={input}>
                {provinces.map((p) => (
                  <option key={p.code} value={p.code}>
                    {`${p.name} — from $${p.priceFrom}`}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="House size">
              <select required suppressHydrationWarning value={form.houseSize} onChange={set("houseSize")} className={input}>
                <option value="" disabled>
                  Select house size
                </option>
                {HOUSE_SIZES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="House address">
                <input required suppressHydrationWarning autoComplete="street-address" placeholder="Street address, city" value={form.address} onChange={set("address")} className={input} />
              </Field>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-700">
            {`${base.label} from $${base.price} — every duct & vent, plus a free furnace inspection.`}
          </p>
        </div>

        {/* Right — extras */}
        <div>
          <Label n={2} title="Add extras" />
          <div className="grid grid-cols-2 gap-2">
            {addons.map((a) => {
              const n = qty[a.id] ?? 0;
              const on = n > 0;
              // Per-unit add-on (furnaces, dryer vents, exhaust fans): − count + stepper.
              if (a.unit) {
                return (
                  <div
                    key={a.id}
                    className={cn(
                      "flex flex-col justify-between gap-2 rounded-xl border px-3 py-2.5 transition-colors",
                      on ? "border-teal-400 bg-teal-50" : "border-line"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-semibold text-teal-800">{a.label}</span>
                      <span className="text-[11px] font-semibold text-ink-soft">{`+$${a.price} per ${a.unit}`}</span>
                    </span>
                    <span className="flex items-center justify-between">
                      <button
                        type="button"
                        aria-label={`Fewer: ${a.label}`}
                        disabled={n === 0}
                        onClick={() => stepAddon(a.id, -1, a.maxQty ?? 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-teal-800 transition-colors hover:border-teal-400 hover:bg-white disabled:opacity-30"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span aria-live="polite" data-qty={a.id} className="font-display font-bold text-teal-800">
                        {n}
                      </span>
                      <button
                        type="button"
                        aria-label={`More: ${a.label}`}
                        disabled={n >= (a.maxQty ?? 1)}
                        onClick={() => stepAddon(a.id, 1, a.maxQty ?? 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-teal-800 transition-colors hover:border-teal-400 hover:bg-white disabled:opacity-30"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </div>
                );
              }
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAddonQty(a.id, on ? 0 : 1)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors",
                    on ? "border-teal-400 bg-teal-50" : "border-line hover:border-teal-300"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      on ? "border-teal-400 bg-teal-400 text-teal-800" : "border-line text-transparent"
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-teal-800">{a.label}</span>
                    <span className="text-[11px] font-semibold text-ink-soft">{`+$${a.price}`}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom — live estimate + submit, side by side */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl bg-teal-800 px-5 py-3.5 text-white">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-mint-400">{`Your estimate · ${selectedProvince.name}`}</p>
            <p className="truncate text-xs text-white/70">{`${base.label} $${base.price} · ${extrasText}`}</p>
          </div>
          <TotalAmount value={total} className="font-display text-3xl font-extrabold" />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap bg-teal-400 px-8 py-4 text-[15px] font-bold text-teal-800 hover:bg-teal-300 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Sending…
            </>
          ) : (
            "Book now"
          )}
        </button>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-soft">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal-400" />
        Free furnace inspection included — we call to confirm your time before we come.
      </p>

      {error && (
        <div role="alert" className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="flex items-center gap-2 text-sm font-medium text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Message on WhatsApp
          </a>
        </div>
      )}

      {/* Honeypot anti-spam field — invisible to humans, off-screen and out of the tab order. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company-website">Company website</label>
        <input ref={honeypot} id="company-website" name="company-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}

function Label({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-xs font-extrabold text-white">{n}</span>
      <h3 className="font-display text-lg font-bold text-teal-800">{title}</h3>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
