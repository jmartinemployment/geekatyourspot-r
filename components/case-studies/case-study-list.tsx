import type { Department } from "@/lib/types/departments";
import Link from "next/link";
import { getDepartmentContent } from "@/services/department.service";
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

export async function CaseStudyList(): Promise<React.JSX.Element> {
  const departments = await getDepartmentContent();
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
    <section className="w-full min-h-screen bg-#FFFFFF py-5">
      <div className="grid grid-cols-3 gap-4 container">
        {departments.map((department: Department) =>
          department.useCases.map((useCase) => (
            
            <div key={useCase.caseStudy.id}>
                <Link
                    href={`/case-studies/${useCase.caseStudy.slug}`}
                    className="hover:text-blue-800">
              <FontAwesomeIcon
                icon={departmentIcons[department.slug] ?? faRobot}
                width={96}
                height={96}
                className={`mx-auto ${departmentColors[department.slug] ?? "text-gray-900"}`}
              />
              <h2 className="text-xl font-bold shadow-text">
                {" "}
                {useCase.caseStudy.descriptiveName}
              </h2>
              <p className="text-lg shadow-text">
                {useCase.caseStudy.executiveSummary}
              </p>
              </Link>
            </div>
            
          )),
        )}
      </div>
    </section>
  );
}
