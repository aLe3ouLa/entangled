import { useEffect, useState } from 'react';
import type { Series } from '../types';
import { findProfilePath } from './castMatch';
import { getAggregateCast, isConfigured, profileUrl } from './tmdb';

/** character id -> real cast photo URL, or null if unmatched/unavailable */
export function useSeriesCast(series: Series) {
  const [photos, setPhotos] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConfigured()) {
      setPhotos({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    getAggregateCast(series.tmdbTitle)
      .then((cast) => {
        if (cancelled) return;
        const next: Record<string, string | null> = {};
        for (const c of series.characters) {
          const path = findProfilePath(cast, c.tmdbCharacterName ?? c.name);
          next[c.id] = profileUrl(path);
        }
        setPhotos(next);
      })
      .catch(() => {
        if (!cancelled) setPhotos({});
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [series]);

  return { photos, loading };
}
