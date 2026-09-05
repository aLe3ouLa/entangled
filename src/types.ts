export interface Character {
  id: string;
  name: string;
  house: string;
  color: string;
  /** one or two sentences on who they are, for a reader who doesn't know the show */
  bio: string;
  /** last season the character is alive/active; seasonCount if they survive throughout */
  aliveUntil: number;
  /** first season the character appears; defaults to 1 if omitted */
  firstSeason?: number;
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
  | 'hidden-truth'
  /** no personal charge yet either way — professional, hierarchical, or purely circumstantial */
  | 'neutral';

export interface Relationship {
  id: string;
  source: string;
  target: string;
  /** the bond's type when it doesn't change category across seasons; ignored if `types` is set */
  type: RelationshipType;
  /** short name for the bond, e.g. "Brothers turned enemies" */
  label: string;
  /** one sentence on what the relationship is about, for a reader who doesn't know the show */
  summary: string;
  /** one frame per season, index 0 = season 1 */
  seasons: RelationshipFrame[];
  /** only needed when the bond's category itself changes across seasons (e.g. master/servant
   *  becoming lovers) — one per season, same length as `seasons`, overrides `type` when present */
  types?: RelationshipType[];
}

/** genealogy is static — no seasons, no scores, just who's related to whom */
export interface FamilyPerson {
  id: string;
  name: string;
  /** 0 = oldest tracked generation, increasing = younger. Hand-assigned rather than
   *  derived, because two unrelated houses (e.g. Stark/Lannister) can't be aligned
   *  by graph distance alone — nothing connects their trees to a common ancestor. */
  generation: number;
  /** only needed for people who aren't already a tracked Character (e.g. an
   *  ancestor who never appears in the relationship graph) */
  color?: string;
}

export type FamilyLinkKind =
  | 'parent'
  | 'adoptive'
  /** true parentage the story treats as a secret/reveal — rendered dashed */
  | 'secret-parent'
  /** known extended-family tie that isn't direct parentage (uncle, sibling, etc.) */
  | 'extended';

export interface FamilyLink {
  from: string;
  to: string;
  kind: FamilyLinkKind;
  note?: string;
}

export interface FamilySpouse {
  a: string;
  b: string;
}

export interface FamilyTree {
  people: FamilyPerson[];
  links: FamilyLink[];
  spouses: FamilySpouse[];
}

export interface Series {
  id: string;
  title: string;
  /** search query to resolve this show with whichever art source is active — not a hardcoded numeric id, so adding a series never requires looking one up */
  searchTitle: string;
  /** 'anilist' for animation (real character art, not the voice actor's face); defaults to TMDb cast photos otherwise */
  characterArtSource?: 'tmdb' | 'anilist';
  seasonCount: number;
  /** one short recap per season, index 0 = season 1 — shown in a box that updates as the scrubber moves */
  seasonSynopses: string[];
  characters: Character[];
  relationships: Relationship[];
  familyTree?: FamilyTree;
}
