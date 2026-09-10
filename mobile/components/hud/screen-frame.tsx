import { BlurView } from "expo-blur";
import { memo, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ScreenFrameProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  keyboard?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

function ScreenFrameBase({
  header,
  footer,
  children,
  keyboard = false,
  contentStyle,
}: ScreenFrameProps) {
  const insets = useSafeAreaInsets();

  const body = (
    <View className="flex-1 bg-slate-950">
      <View className="z-20 border-b border-white/[0.08]" style={{ paddingTop: insets.top }}>
        <BlurView intensity={42} tint="dark" className="bg-slate-950/80">
          {header}
        </BlurView>
      </View>

      <ScrollView
        className="z-10 flex-1"
        contentContainerStyle={[
          { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
          contentStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <View
        className="z-20 border-t border-white/[0.08]"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <BlurView intensity={48} tint="dark" className="bg-slate-950/90">
          {footer}
        </BlurView>
      </View>
    </View>
  );

  if (!keyboard) {
    return body;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      {body}
    </KeyboardAvoidingView>
  );
}

export const ScreenFrame = memo(ScreenFrameBase);
