import HeroSection from "@/components/landing-page/hero-section";
import CloneYourselfSection from "@/components/landing-page/clone-yourself";
import TheMethodologySection from "@/components/landing-page/the-methodology";
import SeamlessIntegrationsSection from "@/components/landing-page/seamless-integrations";
import { Suspense } from "react";
import type { Metadata } from "next";
import { SchedulerShell } from "@/components/landing-page/scheduler/scheduler-shell";
import { JsonLd } from "@/components/seo/json-ld";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.geekatyourspot.com/#website",
  name: "Geek at Your Spot",
  url: "https://www.geekatyourspot.com",
  publisher: { "@id": "https://www.geekatyourspot.com/#business" },
};

const aiConsultingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.geekatyourspot.com/#ai-consulting",
  name: "AI Strategy & Implementation Consulting",
  description:
    "Four-phase AI consulting service for small businesses: define business objectives, data assessment, AI technology selection, and implementation strategy.",
  provider: { "@id": "https://www.geekatyourspot.com/#business" },
  areaServed: "South Florida",
  serviceType: "AI Consulting",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Consulting Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Objectives Analysis" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Quality Assessment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Technology Selection" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Implementation Strategy" } },
    ],
  },
};

export const metadata: Metadata = {
  title: "AI Consulting for Small Business | Delray Beach, South Florida",
  description:
    "AI implementation, process automation, and chatbots for small businesses in Broward, Palm Beach, and Miami-Dade Counties. Book a free strategy call.",
};

export default function Home() {
  return (
    <>
      <JsonLd schema={[websiteSchema, aiConsultingServiceSchema]} />
      <HeroSection />
      <CloneYourselfSection />
      <TheMethodologySection />
      <Suspense>
        <SchedulerShell />
      </Suspense>
    </>
  );
}
