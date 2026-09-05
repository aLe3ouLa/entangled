import type { RelationshipFrame, RelationshipType } from '../types';
import { RELATIONSHIP_TYPE_COLOR } from './relationshipType';

/** color encodes the *kind* of bond, not a score — reserve score encodings for width/opacity/distance */
export function edgeColor(type: RelationshipType): string {
  return RELATIONSHIP_TYPE_COLOR[type];
}

/** line width = tension: how charged/high-stakes the bond is right now */
export function edgeWidth(frame: RelationshipFrame): number {
  return 1 + (frame.tension / 100) * 6;
}

export function edgeOpacity(frame: RelationshipFrame): number {
  return 0.3 + (frame.trust / 100) * 0.7;
}

/** high trust+affection pulls nodes close; low pushes them apart */
export function edgeDistance(frame: RelationshipFrame): number {
  const score = (frame.trust + frame.affection) / 2;
  return 260 - (score / 100) * 180;
}

/** node size = how much the season is "about" this character (screen time + being talked about) */
export function nodeRadius(prominence: number): number {
  return 10 + (prominence / 100) * 22;
}
