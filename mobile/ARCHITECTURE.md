# Belvia mobile architecture

Expo SDK 51 managed. New Architecture on. TypeScript strict + exactOptionalPropertyTypes.

Pulse tab is the analysis surface: Skia trend scrubber, KPI tiles, FlashList exams.

Motion is GPU-only (transform / opacity) with Reanimated springs from `lib/physics.ts`.
No linear 300ms ease-in-out.

Data: Zod schemas + TanStack Query. Fixture client until a live base URL exists.
