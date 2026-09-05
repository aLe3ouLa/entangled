import { CharacterAvatar } from "./CharacterAvatar";
import type { Character } from "../types";

interface Props {
  character: Character;
  size: number;
  padding?: number;
  highlight?: boolean;
  photoUrl?: string | null;
}

export function AvatarIcon({
  character,
  size,
  padding = 0,
  highlight,
  photoUrl,
}: Props) {
  return (
    <svg width={size} height={size}>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <CharacterAvatar
          character={character}
          radius={size / 2 - padding}
          highlight={highlight}
          photoUrl={photoUrl}
        />
      </g>
    </svg>
  );
}
