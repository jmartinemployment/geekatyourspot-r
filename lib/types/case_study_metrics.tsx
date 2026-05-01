export interface CaseStudyMetric {
  id:            number;
  case_study_id: number;
  metric_label:  string;
  metric_value:  string;
  metric_unit:   string | null;
  sort_order:    number;
}
