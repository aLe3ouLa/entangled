# Series Tension Map

A season scrubber that morphs a force-directed relationship graph, inspired
by [tension-map](https://github.com/yanliudesign/tension-map) and
generalized to "any TV series, season by season." Sample data is Game of
Thrones' core cast (12 characters, 20 relationships across 8 seasons).

Drag the slider at the bottom across all 8 seasons — the whole-cast force
graph morphs smoothly instead of jumping between states. Click a character
or a relationship line for details.

## Run it

```
npm install
npm run dev
```

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

See `src/types.ts` and `src/data/got.ts`:

- **Characters** have a house/color, a last-alive season, and a per-season
  `prominence` (0–100, how much that season is "about" them) — this drives
  node size.
- **Relationships** carry a `type` (love, conflict, dependence, betrayal,
  responsibility, loyalty, threat, hidden-truth — color-coded, see
  `src/lib/relationshipType.ts`), a `label` + `summary` explaining the bond
  in plain language, and per-season trust/affection/power/tension scores
  (0–100) — tension drives line width, trust drives opacity, trust+affection
  drive how close the force layout pulls two nodes.

`src/lib/timeline.ts` interpolates (continuous) or snaps (discrete) to a
given season. `src/lib/encode.ts` maps scores to the visual encodings above.
`src/lib/forceLayout.ts` is the d3-force physics engine — it reheats
smoothly instead of jumping when link distances change.

Character avatars are procedurally generated (DiceBear, seeded per
character) rather than real cast photos, which would be copyrighted press
stills — not something to bake into a prototype.

## Next step

The schema, cast size, and season count are all still hardcoded to one
show. The real next step toward the multi-series goal (Game of Thrones,
Apothecary Diaries, etc.) is generalizing `src/data/got.ts` into a
per-series data module behind a series picker, and making "8 seasons"
a property of the series rather than an assumption baked into the code.
