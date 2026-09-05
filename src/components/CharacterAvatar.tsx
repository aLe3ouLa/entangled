import { avatarUrl } from '../lib/avatar';
import type { Character } from '../types';

interface Props {
  character: Character;
  radius: number;
  highlight?: boolean;
}

/** An avatar circle meant to sit inside an already-translated <g>, centered on (0,0). */
export function CharacterAvatar({ character, radius, highlight }: Props) {
  const clipId = `avatar-clip-${character.id}`;
  return (
    <>
      <clipPath id={clipId}>
        <circle r={radius} />
      </clipPath>
      <circle r={radius} fill={character.color} />
      <image
        href={avatarUrl(character.id, character.color)}
        x={-radius}
        y={-radius}
        width={radius * 2}
        height={radius * 2}
        clipPath={`url(#${clipId})`}
      />
      <circle r={radius} fill="none" stroke={highlight ? '#f9fafb' : '#0b0f14'} strokeWidth={highlight ? 3 : 2} />
    </>
  );
}
