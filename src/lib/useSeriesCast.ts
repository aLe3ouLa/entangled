import { useEffect, useState } from 'react';
import type { Series } from '../types';
import { isArtAvailable, resolvePhotos } from './resolveArt';

/** character id -> real photo/art URL, or null if unmatched/unavailable */
export function useSeriesCast(series: Series) {
  const [photos, setPhotos] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isArtAvailable(series)) {
      setPhotos({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    resolvePhotos(series, series.characters)
      .then((next) => {
        if (!cancelled) setPhotos(next);
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
