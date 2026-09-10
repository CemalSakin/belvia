import type { DashboardDto } from "@/services/api/schema";

export const DASHBOARD_FIXTURE: DashboardDto = {
  student: { id: "stu-1", name: "Elif Kaya", cohort: "YKS \u00b7 12-A", unreadAlerts: 2 },
  velocity: 8.4,
  accuracy: 81,
  streak: 14,
  series: [
    { id: "e1", label: "TYT-01", takenAt: "2026-03-02T09:00:00+03:00", net: 62.5 },
    { id: "e2", label: "TYT-02", takenAt: "2026-03-16T09:00:00+03:00", net: 68.25 },
    { id: "e3", label: "TYT-03", takenAt: "2026-04-06T09:00:00+03:00", net: 66.0 },
    { id: "e4", label: "TYT-04", takenAt: "2026-04-27T09:00:00+03:00", net: 74.5 },
    { id: "e5", label: "TYT-05", takenAt: "2026-05-18T09:00:00+03:00", net: 79.75 },
    { id: "e6", label: "TYT-06", takenAt: "2026-06-08T09:00:00+03:00", net: 83.25 },
    { id: "e7", label: "TYT-07", takenAt: "2026-08-24T09:00:00+03:00", net: 88.0 }
  ],
  exams: [
    { id: "e7", title: "TYT Deneme 07", takenAt: "2026-08-24T09:00:00+03:00", net: 88.0, accuracy: 86, durationMin: 135 },
    { id: "e6", title: "TYT Deneme 06", takenAt: "2026-06-08T09:00:00+03:00", net: 83.25, accuracy: 82, durationMin: 140 },
    { id: "e5", title: "TYT Deneme 05", takenAt: "2026-05-18T09:00:00+03:00", net: 79.75, accuracy: 80, durationMin: 138 },
    { id: "e4", title: "TYT Deneme 04", takenAt: "2026-04-27T09:00:00+03:00", net: 74.5, accuracy: 76, durationMin: 145 },
    { id: "e3", title: "TYT Deneme 03", takenAt: "2026-04-06T09:00:00+03:00", net: 66.0, accuracy: 71, durationMin: 150 }
  ]
};
