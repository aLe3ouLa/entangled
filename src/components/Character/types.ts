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
