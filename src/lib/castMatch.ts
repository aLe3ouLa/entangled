import type { TmdbCastMember } from './tmdb';

const DIACRITICS = new RegExp('[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']', 'g');

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** exact match first, then whichever-contains-the-other as a fallback for nicknames/aliases */
export function findProfilePath(cast: TmdbCastMember[], characterName: string): string | null {
  const target = normalize(characterName);
  const exact = cast.find((c) => normalize(c.characterName) === target);
  if (exact) return exact.profilePath;

  const partial = cast.find((c) => {
    const n = normalize(c.characterName);
    return n.includes(target) || target.includes(n);
  });
  return partial?.profilePath ?? null;
}
