// AniList's API
// Used for anime series, where a "cast photo" should be the character's own official art.

const ENDPOINT = "https://graphql.anilist.co";

export interface AnilistCharacter {
  characterName: string;
  imageUrl: string | null;
  order: number;
}

const QUERY = `
  query ($search: String) {
    Media(search: $search, type: ANIME) {
      characters(sort: ROLE, perPage: 50) {
        nodes {
          name { full }
          image { large }
        }
      }
    }
  }
`;

interface AnilistResponse {
  data?: {
    Media?: {
      characters?: {
        nodes: { name?: { full?: string }; image?: { large?: string } }[];
      };
    };
  };
}

const cache = new Map<string, AnilistCharacter[]>();

export async function getAnilistCharacters(
  title: string,
): Promise<AnilistCharacter[]> {
  if (title && cache.has(title)) return cache.get(title) ?? [];

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { search: title } }),
  });

  if (!res.ok) {
    cache.set(title, []);
    return [];
  }

  const json = (await res.json()) as AnilistResponse;
  const nodes = json.data?.Media?.characters?.nodes ?? [];
  const characters: AnilistCharacter[] = nodes
    .filter((character) => character.name?.full)
    .map((character, index) => ({
      characterName: character.name!.full!,
      imageUrl: character.image?.large ?? null,
      order: index,
    }));

  cache.set(title, characters);
  return characters;
}
