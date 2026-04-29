import type { Department } from "@/lib/types/departments";
import type { CaseStudy } from "@/lib/types/case_study";
import Link from "next/link";
import { getDepartmentContent, getCaseStudy } from "@/services/department.service";
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
export async function CaseStudySection ({ slug,}: CaseStudySectionProps): Promise<React.JSX.Element> {
  
  const caseStudy = await getCaseStudy(slug);
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
      <div className="grid grid-cols-12 gap-4 container">

            <div key={caseStudy!.id} className="col-span-9">

              <p className="font-bold">DescriptiveName</p>
              <h2 className="text-xl font-bold shadow-text">
                {caseStudy!.descriptiveName}
              </h2>
              <p className="font-bold">Executive Summary</p>
              <p className="text-lg shadow-text">
                {caseStudy!.executiveSummary  }
              </p>
              <p className="font-bold">Industry Citation</p>
              <p className="text-lg shadow-text">
                {caseStudy!.industryCitation  }
              </p>
              <p className="font-bold">Post Conditions</p>
              <p className="text-lg shadow-text">
                {caseStudy!.postConditions  }
              </p>
              <p className="font-bold">Primary Actor</p>
              <p className="text-lg shadow-text">
                {caseStudy!.primaryActor  }
              </p>
              <p className="font-bold">Problem/Challenge</p>
              <p className="text-lg shadow-text">
                {caseStudy!.problemChallenge  }
              </p>
              <p className="font-bold">Slug</p>
              <p className="text-lg shadow-text">
                {caseStudy!.slug  }
              </p>
              <p className="font-bold">Solution</p>
              <p className="text-lg shadow-text">
                {caseStudy!.solution  }
              </p>
              <p className="font-bold">Trigger</p>
              <p className="text-lg shadow-text">
                {caseStudy!.trigger  }
              </p>
      </div>              </div>

    </section>
  );
}
