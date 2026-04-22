import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import AboutHeroSection from "@/components/about/hero-section";
import MissionSection from "@/components/about/mission-section";
import FounderSection from "@/components/about/founder-section";
import GeekPong from "@/components/about/geek-pong";

export const metadata: Metadata = {
  title: "About | 30+ Years of Enterprise Technology Experience",
  description:
    "Meet Jeff Martin — the founder of Geek at Your Spot. 30+ years building enterprise systems for Fortune 500 companies, now bringing that expertise to small businesses in South Florida.",
  alternates: { canonical: "/about" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.geekatyourspot.com/about#jeff-martin",
  name: "Jeff Martin",
  jobTitle: "CEO & AI Consultant",
  description:
    "Full-stack developer and AI consultant with 30+ years of enterprise technology experience. Founder of Geek at Your Spot in Delray Beach, Florida.",
  worksFor: { "@id": "https://www.geekatyourspot.com/#business" },
  knowsAbout: [
    "Artificial Intelligence",
    "Process Automation",
    "AI Chatbots",
    "Cloud Architecture",
    "Cybersecurity",
    "Full Stack Development",
    "AI Strategy Consulting",
  ],
  url: "https://www.geekatyourspot.com/about",
  sameAs: [
    "https://www.linkedin.com/company/geekatyourspot",
    "https://www.facebook.com/GeekAtYourSpot/",
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.geekatyourspot.com/about#page",
  name: "About Geek at Your Spot",
  description:
    "The story behind Geek at Your Spot — from a Timex Sinclair in 1982 to AI consulting for South Florida small businesses today.",
  url: "https://www.geekatyourspot.com/about",
  about: { "@id": "https://www.geekatyourspot.com/#business" },
  author: { "@id": "https://www.geekatyourspot.com/about#jeff-martin" },
};

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <JsonLd schema={[personSchema, aboutPageSchema]} />
      <AboutHeroSection />
      <FounderSection />
      <MissionSection />
      <GeekPong />
    </>
  );
}
