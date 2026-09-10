export interface StudentProfile {
  readonly id: string;
  readonly name: string;
  readonly cohort: string;
  readonly unreadAlerts: number;
}
export interface ExamPoint {
  readonly id: string;
  readonly label: string;
  readonly takenAt: string;
  readonly net: number;
}
export interface ExamRecord {
  readonly id: string;
  readonly title: string;
  readonly takenAt: string;
  readonly net: number;
  readonly accuracy: number;
  readonly durationMin: number;
}
export interface DashboardPayload {
  readonly student: StudentProfile;
  readonly series: readonly ExamPoint[];
  readonly exams: readonly ExamRecord[];
  readonly velocity: number;
  readonly accuracy: number;
  readonly streak: number;
}
