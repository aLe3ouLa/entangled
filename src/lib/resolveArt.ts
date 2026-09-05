import type { Series } from '../types';
import { getAnilistCharacters } from './anilist';
import { findCastMatch } from './castMatch';
import { getAggregateCast, isConfigured as tmdbConfigured, profileUrl } from './tmdb';

export interface ArtLookupEntry {
  id: string;
  name: string;
  tmdbCharacterName?: string;
}

export function isArtAvailable(series: Series): boolean {
  return series.characterArtSource === 'anilist' || tmdbConfigured();
}

/** id -> photo/art URL, or null if unmatched. Routes anime through AniList
 *  (real character art) and everything else through TMDb (real cast photos). */
export async function resolvePhotos(series: Series, entries: ArtLookupEntry[]): Promise<Record<string, string | null>> {
  if (series.characterArtSource === 'anilist') {
    const cast = await getAnilistCharacters(series.searchTitle);
    const next: Record<string, string | null> = {};
    for (const e of entries) next[e.id] = findCastMatch(cast, e.tmdbCharacterName ?? e.name)?.imageUrl ?? null;
    return next;
  }

  if (!tmdbConfigured()) {
    return Object.fromEntries(entries.map((e) => [e.id, null]));
  }
  const cast = await getAggregateCast(series.searchTitle);
  const next: Record<string, string | null> = {};
  for (const e of entries) next[e.id] = profileUrl(findCastMatch(cast, e.tmdbCharacterName ?? e.name)?.profilePath);
  return next;
}
