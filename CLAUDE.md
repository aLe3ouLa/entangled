# Entangled — Claude Code Instructions

## Project overview

Entangled is a client-side React application for exploring how relationships between characters in a TV series evolve across seasons.

The core interaction is a continuous season scrubber:

* Character prominence changes over time.
* Relationship trust, affection, power, and tension change over time.
* Relationship categories can change between seasons.
* The D3 force-directed graph responds continuously to the selected season.
* A separate static family-tree view shows genealogy.
* Series are selected through URL state so views are shareable.

The project is intentionally a **data-driven frontend prototype**. Keep it simple.

## Stack

* React 19
* TypeScript 6
* Vite 8
* D3 7
* CSS Modules + plain CSS
* oxlint
* No CSS framework
* No backend
* No database
* No state-management library
* No UI component library

Use the existing stack unless there is a strong reason to change it.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
npm run generate-series -- "Show Title" <seasonCount>
```

Before considering a change complete, run:

```bash
npm run lint
npm run build
```

Do not add new dependencies for problems that can reasonably be solved with the existing stack.

---

## Architecture

### Application layer

* `src/main.tsx` — React entry point
* `src/App.tsx` — application shell, series selection, view selection, URL state
* `src/FamilyTree.tsx` — static genealogy visualization
* `src/types.ts` — domain model

### Relationship graph

The main visualization lives under:

```text
src/features/RelationshipMap/
```

Keep graph-specific behavior inside this feature rather than leaking D3 concerns into unrelated application components.

Important areas:

```text
RelationshipMap/
├── index.tsx
├── hooks/
└── components/
```

Prefer React for application state and component rendering.

Use D3 for visualization concerns such as:

* force simulation
* graph positioning
* zoom/pan
* SVG visualization

Do not introduce D3 for ordinary React UI.

### Domain/data layer

Series data lives under:

```text
src/data/series/
```

Each series should remain self-contained.

The registry is:

```text
src/data/series/index.ts
```

Do not move series data into a database, API, JSON service, or global state system unless explicitly requested.

The relationship data is deliberately curated. APIs cannot determine things such as:

* who trusts whom
* affection
* power
* tension
* relationship category
* the meaning of a relationship

Do not replace these values with fabricated API-derived data.

### Timeline

`src/lib/timeline.ts` is responsible for translating the scrubber position into the appropriate state.

There are two different concepts:

#### Continuous values

Interpolate numeric values such as:

* prominence
* trust
* affection
* power
* tension

#### Discrete values

Snap categorical values such as:

* relationship type
* relationship `types`
* character presence / first season

Never interpolate categorical values.

A relationship must not become something like `63% erotic`.

### Visual encoding

`src/lib/encode.ts` converts relationship scores into visual properties.

Keep the domain model separate from its visual representation.

For example:

```text
trust → opacity
tension → line width
affection → dashed/solid treatment
trust + affection → graph distance
```

If the visual encoding changes, do not change the underlying meaning of the domain data unless that is intentional.

### Force layout

`src/lib/forceLayout.ts` owns the D3 force simulation.

The graph should transition smoothly when the season changes.

Avoid implementations that completely recreate the simulation on every scrubber movement unless there is a demonstrated performance reason.

Prefer updating the existing simulation and reheating it when necessary.

---

## Data model rules

The core types are defined in `src/types.ts`.

### Character

A character contains:

* stable `id`
* display `name`
* `house`
* `color`
* `bio`
* `aliveUntil`
* optional `firstSeason`
* per-season `prominence`
* optional `tmdbCharacterName`

`prominence` must have one value per season.

### Relationship

A relationship contains:

* stable `id`
* `source`
* `target`
* default `type`
* human-readable `label`
* human-readable `summary`
* one `RelationshipFrame` per season
* optional `types` array for category changes

Every `seasons` array must contain exactly `seasonCount` frames.

If `types` exists, it must also align with the season timeline.

Do not silently pad, truncate, or invent missing relationship frames.

### Family tree

Family genealogy is intentionally separate from the seasonal relationship graph.

It is static.

Do not introduce season-based interpolation into `FamilyTree` unless explicitly requested.

`generation` is hand-assigned. Do not attempt to derive it automatically from graph distance.

---

## Adding or editing series

When adding a series:

1. Add its data file under `src/data/series/`.
2. Register it in `src/data/series/index.ts`.
3. Keep all series-specific data in that file.
4. Make sure every seasonal array matches `seasonCount`.
5. Do not hardcode the series into generic components.
6. Do not add series-specific conditionals to `App.tsx` or visualization components.

Use:

```bash
npm run generate-series -- "Show Title" <seasonCount>
```

The generator can scaffold externally available information such as:

* cast
* season count
* season synopses
* billing/prominence

It cannot determine relationship dynamics.

Relationship data remains curated by hand.

---

## External APIs

There are two character-art providers:

### TMDb

Used primarily for live-action series.

`src/lib/tmdb.ts`

TMDb provides cast information and photos.

Do not use TMDb data as a source of relationship information.

### AniList

Used for animated series.

`src/lib/anilist.ts`

AniList is preferred for anime character artwork because the character artwork represents the character rather than the voice actor.

### Art resolution

`src/lib/castMatch.ts` handles matching our character names to provider names.

`src/lib/resolveArt.ts` chooses the appropriate provider and caches results.

Keep provider-specific logic isolated from the visualization components.

Do not make components know whether artwork came from TMDb, AniList, or DiceBear.

---

## Environment variables

TMDb uses a Vite environment variable.

Remember:

> Any `VITE_*` environment variable is exposed to the browser.

Do not treat a Vite client-side environment variable as a secret.

For this prototype, a client-side TMDb token is acceptable.

Do not introduce a backend solely to hide the token unless explicitly requested.

Never commit actual credentials or tokens.

---

## Styling

The project uses:

* CSS Modules
* global CSS
* CSS custom properties
* inline styles where appropriate for dynamic visualization values

Do not introduce:

* Tailwind
* styled-components
* Material UI
* Chakra
* another CSS framework

unless explicitly requested.

Prefer existing theme tokens in:

```text
src/lib/theme.ts
```

and global variables in:

```text
src/index.css
```

Do not duplicate existing colors, typography, spacing, or visual tokens.

---

## React conventions

Prefer functional components and hooks.

Keep components focused.

Before creating a new abstraction:

1. Check whether an existing component already solves the problem.
2. Check whether the behavior belongs in an existing hook.
3. Check whether the logic is actually shared.
4. Avoid creating abstractions for one-off behavior.

Do not create generic components such as:

```text
UniversalComponent
BaseComponent
GenericPanel
DataRenderer
```

without a concrete reuse case.

Prefer domain-specific names.

---

## State management

Do not introduce a state-management library.

Use:

* React state
* existing hooks
* URL state where the state should be shareable

The URL is the source of truth for:

* selected series
* selected view

Do not duplicate URL state unnecessarily in another global store.

---

## Accessibility

Accessibility is a first-class requirement.

When changing UI:

* use semantic HTML where possible
* provide accessible names for interactive controls
* ensure buttons are actual `<button>` elements
* do not make clickable `<div>` elements
* preserve keyboard interaction
* preserve visible focus states
* provide meaningful labels for icon-only controls
* do not rely on color alone to communicate meaning
* preserve readable contrast

For SVG/D3 interactions, consider keyboard access and accessible descriptions when elements are interactive.

Do not regress accessibility for visual polish.

---

## Responsive behavior

The graph and panels must work across viewport sizes.

Do not assume:

* desktop width
* fixed viewport dimensions
* mouse-only interaction

Use the existing window-size and pan/zoom utilities where appropriate.

Avoid arbitrary breakpoint proliferation.

---

## Performance

The relationship graph uses D3 force simulation, so avoid unnecessary simulation work.

When changing React code around the graph:

* avoid recreating simulations unnecessarily
* avoid unnecessary event listener registration
* clean up D3 simulations and listeners
* avoid expensive calculations on every React render
* use memoization only where it solves an actual performance issue

Do not optimize prematurely.

Prefer measuring the problem before introducing complexity.

---

## Code style

Prefer readable code over clever code.

Use explicit names.

Avoid:

* unnecessary one-line abstractions
* deeply nested ternaries
* giant components
* premature generic utilities
* comments that merely restate the code

Comments should explain **why**, especially around:

* D3 lifecycle decisions
* interpolation/snap behavior
* unusual layout calculations
* provider matching
* intentionally curated data

---

## Changes to existing behavior

Before changing behavior:

1. Understand the existing implementation.
2. Trace the data flow.
3. Identify the smallest appropriate layer for the change.
4. Avoid unrelated refactors.

Do not rewrite working code simply because another implementation is stylistically preferable.

Keep changes focused.

If a bug can be fixed in one function, do not redesign the feature.

---

## Spoilers and series data

Entangled contains narrative information about TV series.

Relationship data, family trees, deaths, reveals, and season summaries can contain spoilers.

When adding or modifying series data:

* verify narrative facts against reliable sources when possible
* do not invent plot details
* keep season-specific information in the appropriate season
* distinguish known relationships from revealed/secret relationships
* avoid em-dash, or hard to follow sentences

The family tree supports `secret-parent` specifically because some relationships are intentionally unknown to characters at certain points in a story.

---

## Git

Keep commits focused.

Prefer conventional, descriptive commit messages such as:

```text
feat: add Friends series data
fix: preserve force layout across season changes
refactor: extract relationship panel state
fix: improve character photo matching
```

Do not modify unrelated files.

Do not commit:

* `.env.local`
* API tokens
* build output
* generated artifacts unless already tracked by the project

---

## When using AI

Do not generate large amounts of code before understanding the existing architecture.

Before implementing a feature:

1. Inspect the relevant files.
2. Identify existing patterns.
3. Reuse existing utilities/components.
4. Make the smallest change that solves the problem.
5. Run lint and build.

If requirements are ambiguous, preserve existing behavior rather than inventing a new product direction.

The goal is to make Entangled feel like one coherent application, not a collection of AI-generated features.

---

## Product principles

Keep these principles in mind:

### 1. The timeline is the product

The season scrubber should remain the central interaction.
Do not add UI that competes with it without a clear reason.

### 2. Relationships are multidimensional

A relationship is not represented by a single score.
Trust, affection, power, and tension have different meanings.

### 3. Category and intensity are different

A relationship can become more intense without changing category.
A category change should be represented explicitly through `types`.

### 4. Data should remain explainable

A user should be able to understand why a visual representation looks the way it does.

Avoid opaque calculations.

### 5. The visualization serves the story

Do not sacrifice readability or interaction quality just to make the graph technically more sophisticated.

### 6. Keep the architecture boring

This is a client-side visualization project.

Do not turn it into:

* a backend application
* a database-driven CMS
* a state-management showcase
* a component-library project
* an abstraction framework

unless the product requirements demand it.

---

## Definition of done

For a normal code change:

```text
[ ] Existing architecture understood
[ ] Existing components/utilities reused where appropriate
[ ] No unnecessary dependencies added
[ ] Accessibility preserved
[ ] Responsive behavior considered
[ ] TypeScript passes
[ ] oxlint passes
[ ] Production build passes
[ ] No secrets committed
[ ] No unrelated refactors
```

For a new series:

```text
[ ] Series registered
[ ] seasonCount is correct
[ ] seasonSynopses length matches seasonCount
[ ] character prominence arrays match seasonCount
[ ] relationship season arrays match seasonCount
[ ] relationship types align with seasons
[ ] character IDs are stable
[ ] relationship source/target IDs are valid
[ ] family-tree IDs are valid
[ ] Narrative data has been checked
```
