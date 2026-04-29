export interface CaseStudy {
  id:               number;
  descriptiveName:  string;
  slug:             string;
  executiveSummary: string;
  subtitle:         string | null;
  primaryActor:     string;
  trigger:          string;
  problemChallenge: string;
  solution:         string;
  postConditions:   string | null;
  industryCitation: string | null;
  createdAt:        string;
  updatedAt:        string | null;
  publishedAt:      string | null;
}
