import { useEffect, useState } from 'react';
import type { Series } from '../types';
import { isArtAvailable, resolvePhotos } from './resolveArt';

/** photo lookup for family-tree people — includes tree-only ancestors who
 *  aren't part of the scored relationship graph, matched the same way */
export function useFamilyPhotos(series: Series) {
  const [photos, setPhotos] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const tree = series.familyTree;
    if (!tree || !isArtAvailable(series)) {
      setPhotos({});
      return;
    }
    let cancelled = false;
    const entries = tree.people.map((p) => {
      const character = series.characters.find((c) => c.id === p.id);
      return { id: p.id, name: p.name, tmdbCharacterName: character?.tmdbCharacterName };
    });
    resolvePhotos(series, entries)
      .then((next) => {
        if (!cancelled) setPhotos(next);
      })
      .catch(() => {
        if (!cancelled) setPhotos({});
      });
    return () => {
      cancelled = true;
    };
  }, [series]);

  return photos;
}
