import { avatarUrl } from "../lib/avatar";
import { theme } from "../lib/theme";
import type { Character } from "../types";

interface Props {
  character: Character;
  radius: number;
  highlight?: boolean;
  photoUrl?: string | null;
}

export function CharacterAvatar({
  character,
  radius,
  highlight,
  photoUrl,
}: Props) {
  const clipId = `avatar-clip-${character.id}`;
  return (
    <g style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55))" }}>
      <clipPath id={clipId}>
        <circle r={radius} />
      </clipPath>
      <circle r={radius} fill={character.color} />
      <image
        href={photoUrl ?? avatarUrl(character.id, character.color)}
        x={-radius}
        y={-radius}
        width={radius * 2}
        height={radius * 2}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
      <circle
        r={radius}
        fill="none"
        stroke={highlight ? theme.accent : "rgba(11,9,8,0.9)"}
        strokeWidth={highlight ? 3 : 2}
        style={
          highlight
            ? { filter: `drop-shadow(0 0 5px ${theme.accentSoft})` }
            : undefined
        }
      />
    </g>
  );
}
