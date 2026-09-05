import type { RelationshipFrame } from '../types';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** t is a continuous season position in [1, seasons.length] */
export function frameAt(seasons: RelationshipFrame[], t: number): RelationshipFrame {
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
export function discreteFrame(seasons: RelationshipFrame[], season: number): RelationshipFrame {
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
