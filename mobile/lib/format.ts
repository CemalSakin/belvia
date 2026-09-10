export function formatWhen(iso: string | null): { day: string; time: string } {
  if (!iso) {
    return { day: "Prep", time: "\u2014" };
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return { day: "Prep", time: "\u2014" };
  }
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return { day, time };
}
