import HeroSection from "@/components/landing-page/hero-section";
import CoreServicesSection from "@/components/landing-page/core-services";
import CloneYourselfSection from "@/components/landing-page/clone-yourself";
import BuiltForIndustry from "@/components/landing-page/built-for-industry";
import TheMethodologySection from "@/components/landing-page/the-methodology";
import SeamlessIntegrationsSection from "@/components/landing-page/seamless-integrations"
// import WhatWeDoBestSection from "@/components/landing-page/what-we-do-best-section";
// import AboutTeaserSection from "@/components/landing-page/about-teaser-section";
import CTASection from "@/components/landing-page/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CloneYourselfSection />
      <BuiltForIndustry />
      <TheMethodologySection />
      <CoreServicesSection />
      <SeamlessIntegrationsSection />
      {/* <TrustBar /> */}
      {/* <AboutTeaserSection /> */}
      <CTASection />
    </>
  );
}
