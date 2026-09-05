const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined;
const BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export interface TmdbCastMember {
  characterName: string;
  actorName: string;
  profilePath: string | null;
}

export function isConfigured(): boolean {
  return Boolean(API_KEY);
}

export function profileUrl(path: string | null | undefined, size: 'w185' | 'w342' = 'w185'): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', API_KEY ?? '');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDb request failed: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

const seriesIdCache = new Map<string, number | null>();

async function resolveSeriesId(title: string): Promise<number | null> {
  if (seriesIdCache.has(title)) return seriesIdCache.get(title)!;
  const data = await tmdbFetch<{ results: { id: number; name: string }[] }>('/search/tv', { query: title });
  const id = data.results[0]?.id ?? null;
  seriesIdCache.set(title, id);
  return id;
}

const castCache = new Map<string, TmdbCastMember[]>();

/**
 * Cast across the whole show (all seasons) in one call, each entry tagged
 * with which character they played — no per-season fetching needed since a
 * character's actor doesn't change season to season.
 */
export async function getAggregateCast(tmdbTitle: string): Promise<TmdbCastMember[]> {
  if (!isConfigured()) return [];
  if (castCache.has(tmdbTitle)) return castCache.get(tmdbTitle)!;

  const seriesId = await resolveSeriesId(tmdbTitle);
  if (seriesId == null) {
    castCache.set(tmdbTitle, []);
    return [];
  }

  const data = await tmdbFetch<{
    cast: { name: string; profile_path: string | null; roles?: { character: string }[]; character?: string }[];
  }>(`/tv/${seriesId}/aggregate_credits`);

  const cast: TmdbCastMember[] = data.cast.flatMap((member) => {
    const characterNames = member.roles?.map((r) => r.character) ?? (member.character ? [member.character] : []);
    return characterNames.map((characterName) => ({
      characterName,
      actorName: member.name,
      profilePath: member.profile_path,
    }));
  });

  castCache.set(tmdbTitle, cast);
  return cast;
}
