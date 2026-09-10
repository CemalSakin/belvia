export const queryKeys = {
  dashboard: ["dashboard"] as const,
  exam: (id: string) => ["exam", id] as const,
};
