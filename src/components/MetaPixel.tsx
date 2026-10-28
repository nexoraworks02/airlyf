"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { site } from "@/config/site";

// Meta (Facebook) Pixel — browser-side only (no Conversions API, no token).
// Events fired:
//   • PageView — on first load AND every client-side route change
//   • Contact  — click on any WhatsApp button/link (delegated)
//   • Schedule — click on any booking CTA that opens the booking form (#quote)
//   • Lead     — successful booking submit (fired from BookingForm via trackMeta)
export function MetaPixel() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // PageView on route changes. The init <Script> fires the very first PageView,
  // so we skip the initial mount here to avoid double-counting.
  useEffect(() => {
    if (!site.metaPixelId) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  // One delegated click listener handles Contact + Schedule for every button
  // and link on the site (current and future), no per-component wiring needed.
  useEffect(() => {
    if (!site.metaPixelId) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("a, button") as HTMLElement | null;
      if (!el) return;
      const href = (el.getAttribute("href") || "").toLowerCase();
      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        trackMeta("Contact", { method: "WhatsApp" });
      } else if (href.includes("#quote")) {
        // Booking CTAs (Book Now / Book Online / Get a Free Quote) all open the
        // booking form — an appointment-scheduling intent.
        trackMeta("Schedule");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!site.metaPixelId) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${site.metaPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta Pixel's
            <noscript> fallback must be a raw 1x1 <img>; next/image cannot render
            inside <noscript> and would break the tracking beacon. */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${site.metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

// Fire a Meta conversion event (safe no-op if the Pixel isn't loaded).
export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, params);
  }
}
