import { useMemo, useState } from "react";
import { edgeDistance } from "../../../lib/encode";
import { useForceGraph } from "../../../lib/forceLayout";
import {
  frameAt,
  hasAppeared,
  isAlive,
  typeAt,
  valueAt,
} from "../../../lib/timeline";
import type {
  Relationship,
  RelationshipFrame,
  RelationshipType,
  Series,
} from "../../../types";
import type { Character } from "@/components/Character/types";

export interface RelationshipRow {
  rel: Relationship;
  other: Character;
  frame: RelationshipFrame;
  type: RelationshipType;
}

/**
 * Everything the map needs to render at the current scrubber position `t`:
 * node/edge positions, which characters/relationships are visible, current
 * selection, and the resolved data for whichever panel is open.
 *
 * Owns the selection state too, and clamps it to what's actually on screen:
 * a selection whose subject has scrubbed out of view reads as no selection,
 * so the side panel never describes a character or bond that has already
 * vanished from the canvas. Scrubbing back into range restores it.
 */
export function useRelationshipMapState(
  series: Series,
  t: number,
  size: { width: number; height: number },
) {
  const { characters, relationships } = series;

  const nodeIds = useMemo(() => characters.map((c) => c.id), [characters]);
  const linkDefs = useMemo(
    () =>
      relationships.map((r) => ({
        id: r.id,
        source: r.source,
        target: r.target,
      })),
    [relationships],
  );

  const frames = useMemo(() => {
    const map: Record<string, RelationshipFrame> = {};
    for (const r of relationships) map[r.id] = frameAt(r.seasons, t);
    return map;
  }, [relationships, t]);

  const distances = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of relationships) map[r.id] = edgeDistance(frames[r.id]);
    return map;
  }, [relationships, frames]);

  const positions = useForceGraph(nodeIds, linkDefs, distances, size);

  const presentIds = useMemo(() => {
    const ids = new Set<string>();
    for (const c of characters)
      if (hasAppeared(c.firstSeason, t)) ids.add(c.id);
    return ids;
  }, [characters, t]);

  const [rawSelected, setRawSelected] = useState<string | null>(null);
  const [rawSelectedRel, setRawSelectedRel] = useState<string | null>(null);

  const selected =
    rawSelected && presentIds.has(rawSelected) ? rawSelected : null;

  const rawRelDetail =
    relationships.find((r) => r.id === rawSelectedRel) ?? null;
  const selectedRel =
    rawRelDetail &&
    presentIds.has(rawRelDetail.source) &&
    presentIds.has(rawRelDetail.target)
      ? rawSelectedRel
      : null;

  const relatedIds = useMemo(() => {
    if (!selected) return null;
    const ids = new Set<string>([selected]);
    for (const r of relationships) {
      if (r.source === selected) ids.add(r.target);
      if (r.target === selected) ids.add(r.source);
    }
    return ids;
  }, [selected, relationships]);

  const selectedChar = useMemo(
    () => characters.find((c) => c.id === selected) ?? null,
    [characters, selected],
  );

  const selectedCharAlive = selectedChar
    ? isAlive(selectedChar.aliveUntil, t)
    : false;
  const selectedCharProminence = selectedChar
    ? Math.round(valueAt(selectedChar.prominence, t))
    : 0;

  const selectedRelRows: RelationshipRow[] = useMemo(() => {
    if (!selectedChar) return [];
    return relationships
      .filter(
        (r) => r.source === selectedChar.id || r.target === selectedChar.id,
      )
      .map((r) => {
        const otherId = r.source === selectedChar.id ? r.target : r.source;
        const other = characters.find((c) => c.id === otherId)!;
        return { rel: r, other, frame: frames[r.id], type: typeAt(r, t) };
      });
  }, [selectedChar, relationships, characters, frames, t]);

  const relDetail = selectedRel ? rawRelDetail : null;
  const relDetailFrame = relDetail ? frames[relDetail.id] : null;
  const relDetailType = relDetail ? typeAt(relDetail, t) : null;

  function openCharacter(id: string) {
    setRawSelected(id);
    setRawSelectedRel(null);
  }

  function openRelationship(id: string) {
    setRawSelectedRel(id);
  }

  function closeCharacterPanel() {
    setRawSelected(null);
  }

  function closeRelationshipPanel() {
    setRawSelectedRel(null);
  }

  function closeAllPanels() {
    setRawSelectedRel(null);
    setRawSelected(null);
  }

  return {
    positions,
    presentIds,
    relatedIds,
    frames,
    selected,
    selectedRel,
    selectedChar,
    selectedCharAlive,
    selectedCharProminence,
    selectedRelRows,
    relDetail,
    relDetailFrame,
    relDetailType,
    openCharacter,
    openRelationship,
    closeCharacterPanel,
    closeRelationshipPanel,
    closeAllPanels,
  };
}
