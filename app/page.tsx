import HeroSection from "@/components/landing-page/hero-section";
import CloneYourselfSection from "@/components/landing-page/clone-yourself";
import TheMethodologySection from "@/components/landing-page/the-methodology";
import SeamlessIntegrationsSection from "@/components/landing-page/seamless-integrations";
import { Suspense } from "react";
import type { Metadata } from "next";
import { SchedulerShell } from "@/components/landing-page/scheduler/scheduler-shell";

export const metadata: Metadata = {
  title: "Contact Us | Geek at Your Spot",
  description:
    "Get in touch with the Geek at Your Spot team. We help small businesses in South Florida implement AI.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CloneYourselfSection />
      <TheMethodologySection />
      <Suspense>
        <SchedulerShell />
      </Suspense>
    </>
  );
}
