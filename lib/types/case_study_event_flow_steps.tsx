export interface CaseStudyEventFlowStep {
  id:               number;
  case_study_id:    number;
  step_number:      number;
  step_description: string;
  step_actor_id:    number | null;
}
