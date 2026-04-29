
import type { Department } from '@/lib/types/departments';
import type { CaseStudy } from '@/lib/types/case_study';
import { cacheLife } from 'next/cache';

export async function getDepartmentContent() :Promise<Department[]> {
    'use cache';
    cacheLife('hours');
    const result = await fetch(`${ process.env.API_URL }/api/Departments/Content`, { next: { revalidate:10800 } }
    );
    if( !result.ok ) throw new Error ('Faied to fetch departments');
    return result.json() as Promise<Department[]>;
}

  export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
    'use cache';
    cacheLife('hours');

    const departments = await getDepartmentContent();
    return departments
      .flatMap((d) => d.useCases)
      .map((uc) => uc.caseStudy)
      .find((cs) => cs.slug === slug);
  }