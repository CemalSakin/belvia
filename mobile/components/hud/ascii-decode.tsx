import { memo, useEffect, useRef, useState } from "react";
import { Text, type TextProps } from "react-native";

const GLYPHS = "!<>_\\/[]?$#*01";

export interface AsciiDecodeProps extends Omit<TextProps, "children"> {
  value: string;
  durationMs?: number;
}

function scramble(target: string, progress: number, seed: number): string {
  const lock = Math.floor(target.length * progress);
  let out = "";
  for (let i = 0; i < target.length; i += 1) {
    const ch = target[i];
    if (ch === " " || i < lock) {
      out += ch;
      continue;
    }
    out += GLYPHS[(i + seed) % GLYPHS.length];
  }
  return out;
}

function AsciiDecodeBase({ value, durationMs = 180, style, ...rest }: AsciiDecodeProps) {
  const [shown, setShown] = useState(value);
  const frame = useRef(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / durationMs);
      if (t >= 1) {
        setShown(value);
        return;
      }
      setShown(scramble(value, t, (Date.now() >> 4) & 255));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [durationMs, value]);

  return (
    <Text {...rest} style={style}>
      {shown}
    </Text>
  );
}

export const AsciiDecode = memo(AsciiDecodeBase);
