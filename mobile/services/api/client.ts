import { DASHBOARD_FIXTURE } from "@/services/api/fixtures";
import { dashboardPayloadSchema, type DashboardDto } from "@/services/api/schema";
import type { ApiResponse } from "@/types/api";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

export async function fetchDashboard(): Promise<ApiResponse<DashboardDto>> {
  await wait(420);
  const parsed = dashboardPayloadSchema.safeParse(DASHBOARD_FIXTURE);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" };
  }
  return { ok: true, data: parsed.data };
}

export async function pinExam(examId: string): Promise<ApiResponse<{ examId: string }>> {
  await wait(180);
  if (examId.length === 0) return { ok: false, error: "Missing exam" };
  return { ok: true, data: { examId } };
}
