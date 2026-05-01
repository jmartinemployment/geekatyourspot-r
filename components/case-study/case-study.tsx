import type { Department } from "@/lib/types/departments";
import type { CaseStudy } from "@/lib/types/case_study";
import Link from "next/link";
import {
  getDepartmentContent,
  getCaseStudy,
} from "@/services/department.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faFunnelDollar,
  faBellConcierge,
  faFileInvoiceDollar,
  faUsersBetweenLines,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

interface CaseStudySectionProps {
  readonly slug: string;
}
export async function CaseStudySection({
  slug,
}: CaseStudySectionProps): Promise<React.JSX.Element> {
  const caseStudy = await getCaseStudy(slug);
  const departments = await getDepartmentContent();
  const subTitle = caseStudy?.subtitle ?? "";
  const departmentColors: Record<string, string> = {
    accounting: "text-brand-blue",
    "customer-service": "text-brand-teal-blue",
    "human-resources": "text-brand-ocean-blue",
    marketing: "text-brand-teak",
    operations: "text-brand-salsa-red",
    sales: "text-brand-deep-ocean-blue",
  };

  const departmentIcons: Record<string, IconDefinition> = {
    accounting: faFileInvoiceDollar,
    "customer-service": faBellConcierge,
    "human-resources": faUsersBetweenLines,
    marketing: faFunnelDollar,
    operations: faRobot,
    sales: faShieldHalved,
  };
  return (  
    <section className="w-full min-h-screen py-5">
      <div className="grid grid-cols-12 gap-4 container">
        <div key={caseStudy!.id} className="col-span-9 bg-brand-frost-aqua px-5 py-5">
          <h2 className="text-5xl font-bold shadow-text">
            {caseStudy!.subtitle}
          </h2>
          <p className="text-2xl shadow-text">{caseStudy!.trigger}</p>
          <h3 className="text-xl font-bold">Problem</h3>
          <p className="text-lg shadow-text">{caseStudy!.problemChallenge}</p>
          <h3 className="font-bold">Solution</h3>
          <p className="text-lg shadow-text">{caseStudy!.solution}</p>
          <p className="font-bold">Post Conditions</p>
          <p className="text-lg shadow-text">{caseStudy!.postConditions}</p>


          <p className="font-bold text-xs">Industry Citation</p>
          <p className="text-xs shadow-text">{caseStudy!.industryCitation}</p>


        </div>{" "}
      </div>
    </section>
  );
}
