const planPriority: Record<string, number> = {
  PREMIUM: 3,
  BASIC: 2,
  FREE: 1,
};

export const sortByPlanPriority = <T extends { plan: keyof typeof planPriority }>(
  businesses: T[]
): T[] => {
  return [...businesses].sort(
    (a, b) => planPriority[b.plan] - planPriority[a.plan]
  );
};
