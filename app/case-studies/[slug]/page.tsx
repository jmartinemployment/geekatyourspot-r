import type { Metadata } from "next";
import type { Department } from "@/lib/types/departments";
import { getDepartmentContent } from "@/services/department.service";
import CaseStudyHeroSection from "@/components/case-study/hero-section";
import { CaseStudySection } from "@/components/case-study/case-study";
import { Suspense } from "react";
import { SchedulerShell } from "@/components/landing-page/scheduler/scheduler-shell";
import { JsonLd } from "@/components/seo/json-ld";

async function getAllCaseStudySlugs(): Promise<{ slug: string }[]> {
  const result = await fetch(`${process.env.API_URL}/api/Departments/content`, {
    next: { revalidate: 10800 },
  });
  if (!result.ok) return [];
  const departments = (await result.json()) as Department[];
  return departments
    .flatMap((d) => d.useCases)
    .map((uc) => ({ slug: uc.caseStudy.slug }));
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllCaseStudySlugs();
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const departments = await getDepartmentContent();
  const caseStudy = departments.find((d) =>
    d.useCases.some((uc) => uc.caseStudy.slug === slug),
  );

  return (
    <>
      <CaseStudyHeroSection caseStudy={caseStudy?.slug ?? ""} />
      <CaseStudySection slug={slug} />
      <Suspense>
        <SchedulerShell />
      </Suspense>
    </>
  );
}
