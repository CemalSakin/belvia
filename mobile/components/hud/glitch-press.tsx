import * as Haptics from "expo-haptics";
import { memo, type ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface GlitchPressProps extends Omit<PressableProps, "children"> {
  children: ReactNode;
  haptic?: "rigid" | "light" | "none";
}

function GlitchPressBase({
  children,
  haptic = "rigid",
  onPressIn,
  onPressOut,
  style,
  ...rest
}: GlitchPressProps) {
  const skew = useSharedValue(0);
  const shift = useSharedValue(0);
  const glow = useSharedValue(1);

  const motion = useAnimatedStyle(() => ({
    transform: [{ translateX: shift.value }, { skewX: `${skew.value}deg` }, { scale: glow.value }],
  }));

  return (
    <AnimatedPressable
      {...rest}
      style={[motion, style]}
      onPressIn={(e) => {
        if (haptic === "rigid") {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        } else if (haptic === "light") {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        skew.value = withSequence(withTiming(4, { duration: 40 }), withTiming(0, { duration: 90 }));
        shift.value = withSequence(withTiming(2, { duration: 40 }), withTiming(0, { duration: 90 }));
        glow.value = withSequence(withTiming(0.97, { duration: 40 }), withTiming(1, { duration: 120 }));
        onPressIn?.(e);
      }}
      onPressOut={onPressOut}
    >
      {children}
    </AnimatedPressable>
  );
}

export const GlitchPress = memo(GlitchPressBase);
