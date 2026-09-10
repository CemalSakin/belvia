import { fetchDashboard, pinExam } from "@/services/api/client";
import { queryKeys } from "@/services/api/query-keys";
import type { DashboardDto } from "@/services/api/schema";
import type { AsyncState } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useBelViaDashboard(): AsyncState<DashboardDto> {
  const query = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: async () => {
      const result = await fetchDashboard();
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
    staleTime: 60_000,
  });
  return useMemo<AsyncState<DashboardDto>>(() => {
    if (query.isPending) return { status: "loading" };
    if (query.isError) {
      const message = query.error instanceof Error ? query.error.message : "Request failed";
      return { status: "error", error: message };
    }
    if (query.data) return { status: "success", data: query.data };
    return { status: "idle" };
  }, [query.data, query.error, query.isError, query.isPending]);
}

export function usePinExam() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (examId: string) => {
      const result = await pinExam(examId);
      if (!result.ok) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (examId) => {
      await client.cancelQueries({ queryKey: queryKeys.dashboard });
      const previous = client.getQueryData<DashboardDto>(queryKeys.dashboard);
      if (previous) {
        client.setQueryData<DashboardDto>(queryKeys.dashboard, {
          ...previous,
          exams: [...previous.exams].sort((a, b) => (a.id === examId ? -1 : b.id === examId ? 1 : 0)),
        });
      }
      return { previous };
    },
    onError: (_error, _examId, context) => {
      if (context?.previous) client.setQueryData(queryKeys.dashboard, context.previous);
    },
    onSettled: () => {
      void client.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });
}
