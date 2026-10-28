"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button, onDarkSecondary } from "./ui/Button";
import { CardDecor } from "./ui/CardDecor";
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
 * The booking form itself (no page section around it). Shown inside the
 * booking pop-up — see components/BookingModal.tsx — which opens from any
 * link to "#quote". Kept short on purpose: name, phone, province, address,
 * house size and add-ons — the team calls back to confirm the time.
 */
/** Choices carried over from the hero price check ("Book this cleaning"). */
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
  // A new price-check preset (each click is a new object) sets the area and
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

  return (
    <>
      <div className="relative isolate overflow-hidden rounded-md border border-white/10 bg-white/5 p-5 sm:p-8 sm:pb-14">
        <CardDecor tone="dark" size="lg" />
        {step === "form" && (
          <form onSubmit={submitBooking} className="space-y-10">
            {/* Step 1 — Contact details */}
            <div>
              <StepLabel n={1} title="Your details" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name *">
                  <input
                    required
                    suppressHydrationWarning
                    autoComplete="name"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={set("fullName")}
                    className="input"
                  />
                </Field>
                <Field label="Contact number *">
                  <input
                    required
                    suppressHydrationWarning
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}"
                    title="Enter a valid 10-digit phone number, for example (416) 555-0123"
                    placeholder="(416) 555-0123"
                    value={form.phone}
                    onChange={set("phone")}
                    className="input"
                  />
                </Field>
              </div>
            </div>

            {/* Step 2 — Property */}
            <div>
              <StepLabel n={2} title="Your property" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Province / area * (sets your prices)">
                    <select required suppressHydrationWarning value={form.province} onChange={set("province")} className="input">
                      {provinces.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name} — from ${p.priceFrom}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="House address *">
                    <input
                      required
                      suppressHydrationWarning
                      autoComplete="street-address"
                      placeholder="Street address, city"
                      value={form.address}
                      onChange={set("address")}
                      className="input"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="House size *">
                    <select required suppressHydrationWarning value={form.houseSize} onChange={set("houseSize")} className="input">
                      <option value="" disabled>
                        Select house size
                      </option>
                      {HOUSE_SIZES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            </div>

            {/* Step 3 — Additional services */}
            <div>
              <StepLabel n={3} title="Additional services" />
              <p className="-mt-2 mb-4 text-sm text-slate-300">
                {`${base.label} from $${base.price} — every duct & vent, plus a free furnace inspection. Add anything else below.`}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {addons.map((a) => {
                  const n = qty[a.id] ?? 0;
                  const on = n > 0;
                  // Per-unit add-on (furnaces, dryer vents, exhaust fans): − count + stepper.
                  if (a.unit) {
                    return (
                      <div
                        key={a.id}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                          on ? "border-mint-400 bg-white/12" : "border-white/12 bg-white/5"
                        )}
                      >
                        <span className="flex-1">
                          <span className="block font-semibold text-white">{a.label}</span>
                          <span className="text-sm font-bold text-mint-400">{`+$${a.price} per ${a.unit}`}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Fewer: ${a.label}`}
                            disabled={n === 0}
                            onClick={() => stepAddon(a.id, -1, a.maxQty ?? 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-lg font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                          >
                            −
                          </button>
                          <span aria-live="polite" data-qty={a.id} className="w-6 text-center font-display text-lg font-bold text-white">
                            {n}
                          </span>
                          <button
                            type="button"
                            aria-label={`More: ${a.label}`}
                            disabled={n >= (a.maxQty ?? 1)}
                            onClick={() => stepAddon(a.id, 1, a.maxQty ?? 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-lg font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                          >
                            +
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
                        "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all hover:-translate-y-0.5",
                        on ? "border-mint-400 bg-white/12" : "border-white/12 bg-white/5 hover:border-white/30"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                          on ? "border-teal-400 bg-teal-400 text-teal-800" : "border-white/25 bg-white/5 text-transparent"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="flex-1 font-semibold text-white">{a.label}</span>
                      <span className="font-display font-extrabold text-mint-400">+${a.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live booking summary */}
            <div className="rounded-md border border-white/10 bg-navy/60 p-6 text-white backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-200">
                  {`${base.label} · ${selectedProvince.name}`}
                </span>
                <span className="font-semibold">${base.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="pt-2 text-slate-300">Furnace inspection</span>
                <span className="pt-2 text-mint-500">Free</span>
              </div>
              <AnimatePresence initial={false}>
                {selectedAddons.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between overflow-hidden text-sm"
                  >
                    <span className="pt-2 text-slate-300">{lineLabel(a)}</span>
                    <span className="pt-2 text-mint-500">+${a.price * a.qty}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-display text-lg font-semibold">Estimated total</span>
                <TotalAmount value={total} className="font-display text-2xl font-bold text-mint-400" />
              </div>
            </div>

            <Button size="lg" className="w-full" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                "Submit Booking"
              )}
            </Button>

            {error && (
              <div
                role="alert"
                className="flex flex-col items-center gap-3 rounded-md border border-red-500/30 bg-red-500/10 p-5 text-center"
              >
                <p className="flex items-center gap-2 text-sm font-medium text-red-300">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  Message on WhatsApp
                </a>
              </div>
            )}

            {/* Honeypot anti-spam field — invisible to humans, off-screen and
                out of the tab order. */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="company-website">Company website</label>
              <input ref={honeypot} id="company-website" name="company-website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-teal-300" />
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
              Booking Request Received
            </h3>
            <p className="mx-auto mt-2 max-w-md text-slate-300">
              Thank you for booking with {site.name}. Our team will contact you
              shortly to confirm your appointment.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={tel} size="lg" variant="secondary" className={onDarkSecondary}>
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-display font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.06);
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #ffffff;
          outline: none;
          color-scheme: dark;
        }
        .input::placeholder {
          color: rgba(255, 255, 255, 0.55);
        }
        .input:focus {
          border-color: var(--color-cyan);
          box-shadow: 0 0 0 3px rgba(72, 180, 122, 0.3);
        }
        /* Force readable option list (fixes white-on-white dropdown on Windows) */
        .input option {
          background-color: #102D24;
          color: #ffffff;
        }
      `}</style>
    </>
  );
}

function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-400 text-sm font-extrabold text-teal-800">
        {n}
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight text-white">{title}</h3>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-200">{label}</span>
      {children}
    </label>
  );
}
