# Series Tension Map (prototype)

Throwaway prototype answering one question: **does a season scrubber that
morphs a force-directed relationship graph feel good and legible?** Inspired
by [tension-map](https://github.com/yanliudesign/tension-map), generalized
to "any TV series, season by season," with Game of Thrones' core cast (12
characters, 20 relationships across 8 seasons) as the sample data.

Not the real multi-series app — just here to sanity-check the interaction
before building that.

## Run it

```
npm install
npm run dev
```

## Three variants, one question each

Switch with the pill at the bottom of the page, or `?variant=A|B|C` in the URL.

- **A — Continuous scrubber**: the whole cast as one force graph, drag a
  slider across all 8 seasons, edges morph smoothly. Click a character for
  a detail panel.
- **B — Season rail + diff feed**: click discrete season stops in a side
  rail instead of dragging; each jump surfaces a "what changed" list of the
  biggest trust/affection swings.
- **C — Character-first + filmstrip**: pick a character first, see only
  their direct relationships as a radial ego-network, scrub via season
  thumbnails instead of a slider or list.

## Data model

See `src/types.ts` and `src/data/got.ts` — characters have a house/color
and a last-alive season; relationships carry trust/affection/power scores
per season (0–100). `src/lib/timeline.ts` interpolates or snaps to a given
season; `src/lib/encode.ts` maps those scores to edge color/width/opacity;
`src/lib/forceLayout.ts` is the shared d3-force physics engine variant A/B
reheat when distances change.

Once a variant (or a mix) feels right, the real next step is generalizing
the schema so a series' season count and cast size aren't hardcoded, and
adding a series picker — this repo only proves the interaction, not that
architecture.
