export type PlanType = "FREE" | "BASIC" | "PREMIUM";

export interface Business {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  plan: PlanType;
  popularity: number;
  createdAt: string;
}
