import Image from "next/image";
import Link from "next/link";
import { getDepartmentContent, getCaseStudy } from "@/services/department.service";

const departmentHeroImages: Record<string, string> = {
  accounting: "/images/case-studies/heroes/accounting.jpg",
  "customer-service": "/images/case-studies/heroes/customer-service.jpg",
  "human-resources": "/images/case-studies/heroes/human-resources.jpg",
  marketing: "/images/case-studies/heroes/marketing.jpg",
  operations: "/images/case-studies/heroes/operations.jpg",
  sales: "/images/case-studies/heroes/sales.jpg",
};

interface CaseStudyHeroSectionProps {
  readonly slug: string;
}

export async function CaseStudyHeroSection({ slug }: CaseStudyHeroSectionProps): Promise<React.JSX.Element> {
  const [caseStudy, departments] = await Promise.all([
    getCaseStudy(slug),
    getDepartmentContent(),
  ]);

  const title = caseStudy?.descriptiveName ?? "";
  const parentDepartment = departments.find((dept) =>
    dept.useCases.some((uc) => uc.caseStudy.slug === slug),
  );
  const heroImage = departmentHeroImages[parentDepartment?.slug ?? ""] ?? "/images/case-studies/heroes/accounting.jpg";
  return (
    <section className="home-hero w-full min-h-screen bg-[#023059]">
      <div className="grid grid-cols-2 content-center gap-4 items-center min-h-screen container">
        <div>
          <h1 className="text-white text-[5.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
            Artificial Intelligence
            <br />
            <span className="text-[#8C2703]">{title}</span>
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
