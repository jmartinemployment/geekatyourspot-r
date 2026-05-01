import type { UseCase } from "@/lib/types/use_cases";
export interface Department {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string | null;
  sortOrder: number;
  createdAt: string;
  useCases: UseCase[];
}
