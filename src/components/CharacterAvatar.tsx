import { avatarUrl } from '../lib/avatar';
import type { Character } from '../types';

interface Props {
  character: Character;
  radius: number;
  highlight?: boolean;
  /** real cast photo, when TMDb is configured and matched a photo; falls back to the illustrated avatar otherwise */
  photoUrl?: string | null;
}

/** An avatar circle meant to sit inside an already-translated <g>, centered on (0,0). */
export function CharacterAvatar({ character, radius, highlight, photoUrl }: Props) {
  const clipId = `avatar-clip-${character.id}`;
  return (
    <>
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
      <circle r={radius} fill="none" stroke={highlight ? '#f9fafb' : '#0b0f14'} strokeWidth={highlight ? 3 : 2} />
    </>
  );
}
