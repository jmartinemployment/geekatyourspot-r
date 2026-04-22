import ServiceHero from "@/components/services/service-hero";
import ServiceContent from "@/components/services/service-content";
import ServiceCta from "@/components/services/service-cta";
import FaqSection from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import services from "@/data/services.json";

const service = services.find((s) => s.slug === "ai-integration")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: "/services/ai-integration" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.geekatyourspot.com/services/ai-integration#service",
  name: service.name,
  description: service.metaDescription,
  serviceType: service.serviceType,
  provider: { "@id": "https://www.geekatyourspot.com/#business" },
  areaServed: "South Florida",
  url: "https://www.geekatyourspot.com/services/ai-integration",
};

export default function AiIntegrationPage(): React.JSX.Element {
  return (
    <>
      <JsonLd schema={schema} />
      <ServiceHero
        headline={service.heroHeadline}
        tagline={service.heroTagline}
        image={service.image}
        imageBg={service.imageBg}
        imageAlt={`${service.name} — Geek at Your Spot South Florida`}
      />
      <ServiceContent name={service.name} intro={service.intro} bullets={service.bullets} />
      <FaqSection
        title={`${service.name} — Questions Answered`}
        subtitle="What South Florida business owners ask before getting started."
        faqs={service.faqs}
      />
      <ServiceCta serviceName={service.name} />
    </>
  );
}
