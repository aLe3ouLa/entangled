# Series Tension Map

A season scrubber that morphs a force-directed relationship graph, inspired
by [tension-map](https://github.com/yanliudesign/tension-map) and
generalized to "any TV series, season by season." A picker (bottom-left)
switches between shows — currently Game of Thrones (12 characters, 20
relationships, 8 seasons) and a small The Apothecary Diaries stub.

Drag the slider at the bottom across the series' seasons — the whole-cast
force graph morphs smoothly instead of jumping between states. Click a
character or a relationship line for details.

## Run it

```
npm install
npm run dev
```

Cast photos are optional. Without an API key, characters get an
illustrated placeholder avatar (DiceBear, seeded per character) instead of
a real photo — the app works either way. To get real cast photos:

1. Get a free token at https://www.themoviedb.org/settings/api (sign up,
   then Settings > API > request access, choose "Developer"). Use the
   **API Read Access Token** (a long JWT) — not the shorter v3 API Key.
2. `cp .env.local.example .env.local` and paste the token in.
3. Restart `npm run dev`.

## How it started

This began as three structurally different UI prototypes (continuous
scrubber vs. a season rail with a diff feed vs. a character-first
ego-network + filmstrip) to sanity-check the core interaction before
committing to one. The continuous scrubber (this one) won. The other two,
plus the full history of how the encodings evolved, live on the
`prototype/three-variants` branch if there's ever a reason to revisit them
or steal a piece (the diff feed from variant B in particular could be worth
re-adding later).

## Data model

See `src/types.ts` and `src/data/series/`:

- **Series** (`src/data/series/got.ts`, `apothecaryDiaries.ts`, registered
  in `index.ts`) bundles a show's `seasonCount` with its own characters and
  relationships — nothing about cast size or season count is hardcoded
  outside the series' own file. `tmdbTitle` is a search query, not a
  hardcoded numeric id, so adding a series never requires looking one up.
- **Characters** have a house/color, a last-alive season, and a per-season
  `prominence` (0–100, how much that season is "about" them) — this drives
  node size.
- **Relationships** carry a `type` (love, conflict, dependence, betrayal,
  responsibility, loyalty, threat, hidden-truth — color-coded, see
  `src/lib/relationshipType.ts`), a `label` + `summary` explaining the bond
  in plain language, and per-season trust/affection/power/tension scores
  (0–100) — tension drives line width, trust drives opacity, trust+affection
  drive how close the force layout pulls two nodes.

None of that — relationship type, scores, labels — comes from an API; it's
inherently a curatorial judgment call, hand-authored per series the same
way the original GoT data was.

`src/lib/timeline.ts` interpolates (continuous) or snaps (discrete) to a
given season. `src/lib/encode.ts` maps scores to the visual encodings above.
`src/lib/forceLayout.ts` is the d3-force physics engine — it reheats
smoothly instead of jumping when link distances change.

## TMDb integration

`src/lib/tmdb.ts` resolves a series by title search (`/search/tv`), then
fetches `/tv/{id}/aggregate_credits` once — every season's cast in a
single call, since an actor doesn't change season to season.
`src/lib/castMatch.ts` matches each of our characters to a TMDb cast
member by normalized character name (set `tmdbCharacterName` on a
`Character` if ours doesn't match how TMDb credits them). Both the series
id lookup and the cast list are cached in memory per series.

This is a client-side prototype, so the API key ships in the browser
bundle (`VITE_` env vars always do) — fine for local/personal use, but a
real deployment would need a small backend proxy so the key isn't public.

## Next step

The Apothecary Diaries data is a rough first pass (2 seasons/"parts", 4
characters) — not researched as carefully as the GoT data, since accuracy
there matters and this was mostly to prove the architecture holds for a
very differently-shaped show. Worth expanding once you decide how to
split cours/seasons for it.
