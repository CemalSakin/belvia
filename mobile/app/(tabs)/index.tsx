import { AsciiDecode } from "@/components/hud/ascii-decode";
import { GlitchPress } from "@/components/hud/glitch-press";
import { HudCard } from "@/components/hud/hud-card";
import { ScreenFrame } from "@/components/hud/screen-frame";
import { useTripStore } from "@/stores/trip-store";
import { Share, Upload } from "lucide-react-native";
import { useMemo } from "react";
import { Alert, Text, View } from "react-native";

function daysUntil(iso: string): number {
  if (!iso) return 0;
  const start = Date.parse(`${iso}T00:00:00`);
  if (Number.isNaN(start)) return 0;
  return Math.max(0, Math.ceil((start - Date.now()) / 86_400_000));
}

export default function TripCommandScreen() {
  const trip = useTripStore((s) => s.trip);
  const packed = useTripStore((s) => s.packed);
  const loadDemo = useTripStore((s) => s.loadDemo);
  const reset = useTripStore((s) => s.reset);

  const armed = trip.reminders.length > 0 || trip.meta.title !== "Belvia";
  const startIso = trip.reminders.find((r) => r.at)?.at?.slice(0, 10) ?? "2026-09-14";
  const tMinus = daysUntil(startIso);
  const next = useMemo(() => {
    const now = Date.now();
    return trip.reminders
      .filter((r) => r.at)
      .map((r) => ({ r, t: Date.parse(r.at!.length === 16 ? `${r.at}:00` : r.at!) }))
      .filter((x) => !Number.isNaN(x.t) && x.t >= now - 3_600_000)
      .sort((a, b) => a.t - b.t)[0]?.r;
  }, [trip.reminders]);

  const packedCount = Object.values(packed).filter(Boolean).length;

  return (
    <ScreenFrame
      header={
        <View className="flex-row items-center gap-3 px-4 py-3">
          <View className="h-9 w-9 items-center justify-center border border-cyan-400/40 bg-cyan-400/10">
            <Text className="font-mono text-[13px] font-bold text-cyan-300">B</Text>
          </View>
          <View className="flex-1">
            <Text className="font-mono text-[9px] tracking-[0.22em] text-cyan-400/70">
              SYS // BELVIA · SEC_LVL 0x4F
            </Text>
            <AsciiDecode
              className="mt-0.5 font-mono text-[16px] font-semibold uppercase tracking-wider text-zinc-100"
              value={armed ? trip.meta.title : "TRIP COMMAND"}
            />
          </View>
          <GlitchPress
            accessibilityLabel="Export trip"
            haptic="light"
            onPress={() => Alert.alert("Export", "ICS export stays on-device.")}
          >
            <View className="h-10 w-10 items-center justify-center border border-white/10">
              <Upload color="#67e8f9" size={16} strokeWidth={1.75} />
            </View>
          </GlitchPress>
        </View>
      }
      footer={
        <View className="flex-row gap-2 px-4 pt-3">
          <GlitchPress className="flex-1" onPress={() => (armed ? reset() : loadDemo())}>
            <View className="items-center border border-white/15 py-3">
              <Text className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
                {armed ? "Wipe device" : "Load sample"}
              </Text>
            </View>
          </GlitchPress>
          <GlitchPress
            className="flex-1"
            onPress={() => Alert.alert("Calendar", "Add timed reminders first, then export ICS.")}
          >
            <View className="flex-row items-center justify-center gap-2 border border-cyan-400/40 bg-cyan-400/10 py-3">
              <Share color="#67e8f9" size={14} />
              <Text className="font-mono text-[11px] font-semibold uppercase tracking-widest text-cyan-200">
                Push calendar
              </Text>
            </View>
          </GlitchPress>
        </View>
      }
    >
      <Text className="mb-3 font-mono text-[10px] tracking-[0.18em] text-amber-400/80">
        LOCAL_STORE // NO_TELEMETRY
      </Text>

      <View className="mb-3 flex-row gap-2">
        <HudCard tag="T-MINUS">
          <AsciiDecode
            className="font-mono text-[28px] tabular-nums text-amber-400"
            value={String(tMinus).padStart(2, "0")}
          />
          <Text className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Days</Text>
        </HudCard>
        <HudCard tag="BAG">
          <AsciiDecode
            className="font-mono text-[28px] tabular-nums text-emerald-400"
            value={String(packedCount).padStart(2, "0")}
          />
          <Text className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Packed</Text>
        </HudCard>
        <HudCard tag="QUEUE">
          <AsciiDecode
            className="font-mono text-[28px] tabular-nums text-cyan-300"
            value={String(trip.reminders.length).padStart(2, "0")}
          />
          <Text className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Nodes</Text>
        </HudCard>
      </View>

      <HudCard tag="UPLINK // NEXT">
        <Text className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Next waypoint
        </Text>
        {next ? (
          <>
            <AsciiDecode
              className="font-mono text-[18px] uppercase tracking-wide text-zinc-100"
              value={next.title}
            />
            <Text className="mt-1 font-mono text-[12px] text-cyan-300/80">{next.at}</Text>
            {next.notes ? (
              <Text className="mt-2 font-mono text-[12px] text-zinc-400">{next.notes}</Text>
            ) : null}
          </>
        ) : (
          <Text className="font-mono text-[13px] leading-5 text-zinc-400">
            No timed node. Load the sample itinerary or open Schedule.
          </Text>
        )}
      </HudCard>

      <View className="mt-3">
        <HudCard tag="LEG // AIR">
          <View className="flex-row items-end justify-between">
            <View>
              <Text className="font-mono text-[10px] text-zinc-500">ESB</Text>
              <Text className="font-mono text-[24px] text-zinc-100">ANK</Text>
            </View>
            <Text className="font-mono text-[10px] tracking-widest text-cyan-400">W6 2488</Text>
            <View className="items-end">
              <Text className="font-mono text-[10px] text-zinc-500">BUD</Text>
              <Text className="font-mono text-[24px] text-zinc-100">BUD</Text>
            </View>
          </View>
        </HudCard>
      </View>
    </ScreenFrame>
  );
}
