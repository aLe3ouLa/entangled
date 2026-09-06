import type {
  Relationship,
  RelationshipFrame,
  RelationshipType,
} from "../types";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** t is a continuous season position in [1, seasons.length] */
export function frameAt(
  seasons: RelationshipFrame[],
  t: number,
): RelationshipFrame {
  const clamped = Math.min(Math.max(t, 1), seasons.length);
  const idx = clamped - 1;
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, seasons.length - 1);
  const frac = idx - lo;
  const a = seasons[lo];
  const b = seasons[hi];
  return {
    trust: lerp(a.trust, b.trust, frac),
    affection: lerp(a.affection, b.affection, frac),
    power: lerp(a.power, b.power, frac),
    tension: lerp(a.tension, b.tension, frac),
  };
}

/** snaps to the nearest whole season, no interpolation */
export function discreteFrame(
  seasons: RelationshipFrame[],
  season: number,
): RelationshipFrame {
  const idx = Math.min(Math.max(Math.round(season) - 1, 0), seasons.length - 1);
  return seasons[idx];
}

/** t is a continuous season position in [1, values.length] */
export function valueAt(values: number[], t: number): number {
  const clamped = Math.min(Math.max(t, 1), values.length);
  const idx = clamped - 1;
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, values.length - 1);
  return lerp(values[lo], values[hi], idx - lo);
}

/** snaps to the nearest whole season, no interpolation */
export function discreteValue(values: number[], season: number): number {
  const idx = Math.min(Math.max(Math.round(season) - 1, 0), values.length - 1);
  return values[idx];
}

export function isAlive(aliveUntil: number, season: number): boolean {
  return Math.round(season) <= aliveUntil;
}

/** whether a character has been introduced yet at this point in the timeline —
 *  firstSeason defaults to 1 (present from the start) when omitted */
export function hasAppeared(
  firstSeason: number | undefined,
  season: number,
): boolean {
  return Math.round(season) >= (firstSeason ?? 1);
}

/** a bond's category at a continuous season position — categorical, so it snaps
 *  to the nearest season rather than interpolating; falls back to `type` for
 *  relationships whose category doesn't change across seasons */
export function typeAt(rel: Relationship, t: number): RelationshipType {
  if (!rel.types) return rel.type;
  const idx = Math.min(Math.max(Math.round(t) - 1, 0), rel.types.length - 1);
  return rel.types[idx];
}
