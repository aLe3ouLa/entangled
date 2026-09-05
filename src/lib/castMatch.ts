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

function tokens(s: string): string[] {
  return normalize(s).split(' ').filter(Boolean);
}

/**
 * exact match first; then token-subset match as a fallback, since TMDb often
 * credits characters with an inline nickname ("Petyr 'Littlefinger' Baelish")
 * that breaks plain substring containment but not a token check
 */
export function findProfilePath(cast: TmdbCastMember[], characterName: string): string | null {
  const target = normalize(characterName);
  const exact = cast.find((c) => normalize(c.characterName) === target);
  if (exact) return exact.profilePath;

  const targetTokens = tokens(characterName);
  let best: { member: TmdbCastMember; extra: number } | null = null;
  for (const member of cast) {
    const candidateTokens = tokens(member.characterName);
    const isSuperset = targetTokens.every((t) => candidateTokens.includes(t));
    if (!isSuperset) continue;
    const extra = candidateTokens.length - targetTokens.length;
    if (!best || extra < best.extra) best = { member, extra };
  }
  return best?.member.profilePath ?? null;
}
