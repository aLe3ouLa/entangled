export interface Character {
  id: string;
  name: string;
  house: string;
  color: string;
  /** last season the character is alive/active; seasonCount if they survive throughout */
  aliveUntil: number;
  /** how much the story is "about" them that season (screen time + being talked about), one per season, 0-100 */
  prominence: number[];
  /** override if this character's in-show name differs from how TMDb credits them */
  tmdbCharacterName?: string;
}

export interface RelationshipFrame {
  trust: number; // 0-100
  affection: number; // 0-100 (below 50 reads as hostile)
  power: number; // 0-100, influence/control intensity
  tension: number; // 0-100, how charged/high-stakes the bond is right now
}

export type RelationshipType =
  | 'family'
  | 'erotic'
  | 'conflict'
  | 'dependence'
  | 'betrayal'
  | 'responsibility'
  | 'loyalty'
  | 'threat'
  | 'hidden-truth';

export interface Relationship {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  /** short name for the bond, e.g. "Brothers turned enemies" */
  label: string;
  /** one sentence on what the relationship is about, for a reader who doesn't know the show */
  summary: string;
  /** one frame per season, index 0 = season 1 */
  seasons: RelationshipFrame[];
}

export interface Series {
  id: string;
  title: string;
  /** search query to resolve this show on TMDb — not a hardcoded numeric id, so adding a series never requires looking one up */
  tmdbTitle: string;
  seasonCount: number;
  characters: Character[];
  relationships: Relationship[];
}
