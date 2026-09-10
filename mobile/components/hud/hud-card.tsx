import { memo, type ReactNode } from "react";
import { Text, View } from "react-native";

export interface HudCardProps {
  tag?: string;
  children: ReactNode;
}

function Corner({ className }: { className: string }) {
  return <View className={`absolute h-2 w-2 border-cyan-400/70 ${className}`} />;
}

function HudCardBase({ tag = "NET_CONFIRMED", children }: HudCardProps) {
  return (
    <View className="relative flex-1 border border-cyan-500/20 bg-slate-950/60 px-3 pb-3 pt-4">
      <Corner className="left-0 top-0 border-l border-t" />
      <Corner className="right-0 top-0 border-r border-t" />
      <Corner className="bottom-0 left-0 border-b border-l" />
      <Corner className="bottom-0 right-0 border-b border-r" />
      <Text className="absolute right-2 top-1 font-mono text-[9px] tracking-widest text-cyan-400/50">
        {tag}
      </Text>
      {children}
    </View>
  );
}

export const HudCard = memo(HudCardBase);
