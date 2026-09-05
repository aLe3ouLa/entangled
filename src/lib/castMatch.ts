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
 * exact match first; then token-subset match as a fallback, since a source
 * (TMDb especially) often credits characters with an inline nickname
 * ("Petyr 'Littlefinger' Baelish") that breaks plain substring containment
 * but not a token check. Works against any cast-like list — TMDb credits or
 * AniList characters — as long as each entry has a `characterName`.
 */
export function findCastMatch<T extends { characterName: string }>(cast: T[], characterName: string): T | undefined {
  const target = normalize(characterName);
  const exact = cast.find((c) => normalize(c.characterName) === target);
  if (exact) return exact;

  const targetTokens = tokens(characterName);
  let best: { member: T; extra: number } | null = null;
  for (const member of cast) {
    const candidateTokens = tokens(member.characterName);
    const isSuperset = targetTokens.every((t) => candidateTokens.includes(t));
    if (!isSuperset) continue;
    const extra = candidateTokens.length - targetTokens.length;
    if (!best || extra < best.extra) best = { member, extra };
  }
  return best?.member;
}
