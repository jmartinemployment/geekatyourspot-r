import Image from "next/image";
import Link from "next/link";

const departmentHeroImages: Record<string, string> = {
  accounting: "/images/case-studies/heroes/accounting.jpg",
  "customer-service": "/images/case-studies/heroes/customer-service.jpg",
  "human-resources": "/images/case-studies/heroes/human-resources.jpg",
  marketing: "/images/case-studies/heroes/marketing.jpg",
  operations: "/images/case-studies/heroes/operations.jpg",
  sales: "/images/case-studies/heroes/sales.jpg",
};
const departmentHeadline: Record<string, string> = {
  accounting: "Accounting",
  "customer-service": "/images/case-studies/heroes/customer-service.jpg",
  "human-resources": "/images/case-studies/heroes/human-resources.jpg",
  marketing: "/images/case-studies/heroes/marketing.jpg",
  operations: "/images/case-studies/heroes/operations.jpg",
  sales: "/images/case-studies/heroes/sales.jpg",
};
const defaultHero = "/images/case-studies/heroes/default.jpg";
const defaultHeadline = "";
interface CaseStudyHeroSectionProps {
  readonly departmentSlug: string;
}

export default function CaseStudyHeroSection({
  departmentSlug,
}: CaseStudyHeroSectionProps): React.JSX.Element {
  const heroImage = departmentHeroImages[departmentSlug] ?? defaultHero;
  const headline = departmentHeadline[departmentSlug] ?? defaultHeadline;

  return (
    <section className="home-hero w-full min-h-screen bg-[#023059]">
      <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
        <div>
          <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            Artificial Intelligence&nbps;{headline}
            <br />
            <span className="text-[#8C2703]">Case Study</span>
          </h1>
          <p className="text-white shadow-text text-xl pt-5">
            How Organizations Turn AI into Measurable ROI
          </p>
          <Link
            href="#consultationAppointmentlg"
            className="btn btn-primary w-fit lg-block 2xl:hidden"
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="#consultationAppointment2xl"
            className="btn btn-primary w-fit hidden 2xl:block"
          >
            Book a Free Strategy Call
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <Image
            src={heroImage}
            priority
            width={450}
            height={562}
            quality={100}
            alt="Geek At Your Spot - an AI-created robot cartoon to introduce Artificial Intelligence accounting Case Studies."
            className="h-auto w-auto"
          />
        </div>
      </div>
    </section>
  );
}
