import type { CaseStudy } from "./case_study";
  
  export interface UseCase
  {
    id: number;
    descriptiveName: string; 
    slug: string;
    summary: string;
    caseStudyId: number;
    caseStudy: CaseStudy;
    createdAt: string;
    updatedAt: string | null;
  }                                                                                                          
   