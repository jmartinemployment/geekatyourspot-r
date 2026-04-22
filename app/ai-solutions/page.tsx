import HeroSection from "../../components/ai-solutions/hero-section";
import ServicesNav from "../../components/ai-solutions/services-nav";
import CoreServicesSection from "../../components/ai-solutions/core-services";
import AdditionalServicesSection from "../../components/ai-solutions/additional-services";
import CTASection from "../../components/ai-solutions/cta";
import AiSolutionsFaqSection from "../../components/ai-solutions/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solutions for Small Business | Process Automation & Chatbots — South Florida",
  description:
    "AI integration, process automation, chatbots, data analytics, strategy consulting, and security & compliance for small businesses in Broward, Palm Beach, and Miami-Dade.",
};

const aiSolutionsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.geekatyourspot.com/ai-solutions#services",
  name: "AI Solutions for Small Business",
  provider: { "@id": "https://www.geekatyourspot.com/#business" },
  areaServed: "South Florida",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Solutions",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration", serviceType: "Artificial Intelligence" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Process Automation", serviceType: "Business Process Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbots", serviceType: "Conversational AI" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Analytics", serviceType: "Business Intelligence" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Strategy Consulting", serviceType: "Management Consulting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security & Compliance", serviceType: "IT Security" } },
    ],
  },
};

export default function Services() {
  return (
    <>
      <JsonLd schema={aiSolutionsSchema} />
      <HeroSection />
      <ServicesNav />
      <CoreServicesSection />
      <AdditionalServicesSection />
      <AiSolutionsFaqSection />
      <CTASection />

      {/* <TrustBar /> */}
      {/* <AboutTeaserSection /> */}
    </>
  );
}
