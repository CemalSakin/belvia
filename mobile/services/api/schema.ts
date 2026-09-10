import { z } from "zod";

export const studentProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  cohort: z.string().min(1),
  unreadAlerts: z.number().int().nonnegative(),
});

export const examPointSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  takenAt: z.string().min(10),
  net: z.number().min(0).max(120),
});

export const examRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  takenAt: z.string().min(10),
  net: z.number().min(0).max(120),
  accuracy: z.number().min(0).max(100),
  durationMin: z.number().int().positive(),
});

export const dashboardPayloadSchema = z.object({
  student: studentProfileSchema,
  series: z.array(examPointSchema).min(1),
  exams: z.array(examRecordSchema),
  velocity: z.number(),
  accuracy: z.number().min(0).max(100),
  streak: z.number().int().nonnegative(),
});

export type DashboardDto = z.infer<typeof dashboardPayloadSchema>;
