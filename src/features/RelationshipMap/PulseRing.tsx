import { theme } from "../../lib/theme";

interface PulseRingProps {
  radius: number;
  amplitude: number;
  duration: string;
  peakOpacity: number;
}

export function PulseRing({
  radius,
  amplitude,
  duration,
  peakOpacity,
}: PulseRingProps) {
  return (
    <circle r={radius} fill="none" stroke={theme.accent} strokeWidth={2}>
      <animate
        attributeName="r"
        values={`${radius};${radius + amplitude};${radius}`}
        dur={duration}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values={`${peakOpacity};0;${peakOpacity}`}
        dur={duration}
        repeatCount="indefinite"
      />
    </circle>
  );
}
