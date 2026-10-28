import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { hasBeforeAfter } from "@/config/before-after";
import { Comparison } from "@/components/sections/Comparison";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { About } from "@/components/sections/About";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { BookingSection } from "@/components/sections/BookingSection";
import { FAQ } from "@/components/sections/FAQ";
import { faqs } from "@/config/faqs";
import { hasVideoTestimonials } from "@/config/feedback-videos";

// FAQ rich-result schema — mirrors the FAQ section visible on this page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// Homepage: forest hero (service panels) → booking section (#quote, the
// calculator-style form every Book / Get Quote button scrolls to) → service-area map →
// promise strip → services →
// benefits (sage) → before/after → how it works (forest) → pricing →
// comparison table → about → FAQ. Light and forest sections alternate.
// The booking band sits at the top of the footer (all pages).
// Written reviews (components/sections/Reviews.tsx) are hidden until real
// Google reviews exist — add <Reviews /> back here then. Video testimonials
// and before/after photos show automatically once real ones are listed in
// config/feedback-videos.ts and config/before-after.ts.
export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <BookingSection />
      <ServiceAreaMap />
      <TrustStrip />
      <Services />
      <Benefits />
      {hasBeforeAfter && <BeforeAfter />}
      <HowItWorks />
      <PricingPlans />
      <Comparison />
      <About />
      {hasVideoTestimonials && <VideoTestimonials />}
      <FAQ />
    </main>
  );
}
