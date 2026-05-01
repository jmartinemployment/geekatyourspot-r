export const ActorRole = {
  Primary:   'primary',
  Secondary: 'secondary',
} as const;

export type ActorRole = typeof ActorRole[keyof typeof ActorRole];

export interface CaseStudyActor {
  id:            number;
  case_study_id: number;
  actor_name:    string;
  actor_role:    ActorRole;
  sort_order:    number;
}
