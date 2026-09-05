#!/usr/bin/env node
// Scaffolding generator for a new Series data file.
//
// Fetches what's actually fetchable — character roster, per-season
// prominence (from real TMDb billing order for that season), and season
// synopses (from TMDb's season overview) — and stubs out what can't be
// automated: house/faction, bio, death timing, and every relationship.
// No API tracks how much two characters trust each other; that's the part
// only a human can write.
//
// Usage:
//   node scripts/generate-series.mjs "Breaking Bad" 5
//   node scripts/generate-series.mjs "Breaking Bad" 5 --top 10 --slug breaking-bad
//
// Live-action only for now — uses TMDb's per-season credits + overview,
// neither of which exists in the same shape on AniList.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://api.themoviedb.org/3';

function loadToken() {
  const path = join(ROOT, '.env.local');
  if (!existsSync(path)) {
    console.error('Missing .env.local with VITE_TMDB_ACCESS_TOKEN — see .env.local.example');
    process.exit(1);
  }
  const match = readFileSync(path, 'utf-8').match(/VITE_TMDB_ACCESS_TOKEN=(.+)/);
  if (!match || !match[1].trim()) {
    console.error('VITE_TMDB_ACCESS_TOKEN not set in .env.local');
    process.exit(1);
  }
  return match[1].trim();
}

async function tmdb(token, path) {
  const res = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' } });
  if (!res.ok) throw new Error(`TMDb request failed: ${res.status} ${path}`);
  return res.json();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function toCamelCase(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/** strips inline quoted nicknames: "Tyrion 'The Halfman' Lannister" -> "Tyrion Lannister" */
function cleanName(name) {
  return name.replace(/\s*'[^']*'\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

const PALETTE = ['#7c93a8', '#c0392b', '#8e44ad', '#16697a', '#a1662f', '#4f7942', '#b45309', '#5b6b8c', '#9d5b8b', '#3d7a5c'];

function quote(s) {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

async function main() {
  const [, , titleArg, seasonCountArg, ...rest] = process.argv;
  if (!titleArg || !seasonCountArg) {
    console.error('Usage: node scripts/generate-series.mjs "<title>" <seasonCount> [--top N] [--slug custom-slug]');
    process.exit(1);
  }
  const seasonCount = Number(seasonCountArg);
  const topIdx = rest.indexOf('--top');
  const top = topIdx >= 0 ? Number(rest[topIdx + 1]) : 15;
  const slugIdx = rest.indexOf('--slug');
  const slug = slugIdx >= 0 ? rest[slugIdx + 1] : slugify(titleArg);

  const token = loadToken();

  console.log(`Resolving "${titleArg}" on TMDb...`);
  const search = await tmdb(token, `/search/tv?query=${encodeURIComponent(titleArg)}`);
  const show = search.results?.[0];
  if (!show) {
    console.error(`No TMDb match for "${titleArg}"`);
    process.exit(1);
  }
  console.log(`Found: ${show.name} (id ${show.id})`);

  const seasonSynopses = [];
  /** canonicalKey -> { displayName, bestOrder, perSeason: Map<seasonNumber, order> } */
  const roster = new Map();

  for (let s = 1; s <= seasonCount; s++) {
    console.log(`Fetching season ${s}...`);
    const [details, credits] = await Promise.all([
      tmdb(token, `/tv/${show.id}/season/${s}`),
      tmdb(token, `/tv/${show.id}/season/${s}/credits`),
    ]);
    seasonSynopses.push(details.overview?.trim() || `TODO: write a synopsis for season ${s}.`);

    for (const member of credits.cast ?? []) {
      const display = cleanName(member.character);
      const key = display.toLowerCase();
      const entry = roster.get(key) ?? { displayName: display, bestOrder: Infinity, perSeason: new Map() };
      entry.perSeason.set(s, member.order);
      if (member.order < entry.bestOrder) {
        entry.bestOrder = member.order;
        entry.displayName = display;
      }
      roster.set(key, entry);
    }
  }

  const ranked = [...roster.values()].sort((a, b) => a.bestOrder - b.bestOrder).slice(0, top);

  const characters = ranked.map((entry, i) => {
    const prominence = [];
    for (let s = 1; s <= seasonCount; s++) {
      const order = entry.perSeason.get(s);
      prominence.push(order === undefined ? 5 : Math.max(10, Math.round(100 - order * 4)));
    }
    return { id: slugify(entry.displayName), name: entry.displayName, color: PALETTE[i % PALETTE.length], prominence };
  });

  const charactersSrc = characters
    .map(
      (c) => `  {
    id: ${quote(c.id)},
    name: ${quote(c.name)},
    house: '', // TODO
    color: ${quote(c.color)},
    bio: '', // TODO
    aliveUntil: ${seasonCount}, // TODO: lower this if/when they die
    prominence: [${c.prominence.join(', ')}], // ESTIMATE from TMDb per-season billing order — billing reflects contract/marketing prominence, not screen time or narrative weight, so sanity-check these against the actual story before trusting them
  },`,
    )
    .join('\n');

  const synopsesSrc = seasonSynopses.map((s) => `  ${quote(s)},`).join('\n');
  const idComment = characters.map((c) => `//   ${c.id} — ${c.name}`).join('\n');
  const exportName = toCamelCase(slug);
  const firstId = characters[0]?.id ?? 'a';
  const secondId = characters[1]?.id ?? 'b';

  const fileContents = `import type { Character, Relationship, Series } from '../../types';

// GENERATED by scripts/generate-series.mjs — the character roster and
// season synopses (real TMDb season overviews) are actual data. Prominence
// is only an ESTIMATE derived from TMDb's per-season billing order (see the
// comment on each character) — verify it against the actual story before
// trusting it. Everything else is a placeholder: house, bio, aliveUntil
// (death timing), and every relationship need hand-authoring — no API
// tracks any of that.

const characters: Character[] = [
${charactersSrc}
];

// Available character ids for relationships:
${idComment}
const relationships: Relationship[] = [
  // TODO: add relationships, e.g.
  // {
  //   id: '${firstId}-${secondId}',
  //   source: ${quote(firstId)},
  //   target: ${quote(secondId)},
  //   type: 'family',
  //   label: '...',
  //   summary: '...',
  //   seasons: [ /* one { trust, affection, power, tension } per season */ ],
  // },
];

const seasonSynopses = [
${synopsesSrc}
];

export const ${exportName}: Series = {
  id: ${quote(slug)},
  title: ${quote(show.name)},
  searchTitle: ${quote(show.name)},
  seasonCount: ${seasonCount},
  seasonSynopses,
  characters,
  relationships,
};
`;

  const outPath = join(ROOT, 'src/data/series', `${slug}.ts`);
  writeFileSync(outPath, fileContents);
  console.log(`\nWrote ${outPath}`);
  console.log('Next steps:');
  console.log('  1. Fill in house/bio/aliveUntil for each character.');
  console.log('  2. Write relationships between the characters that matter.');
  console.log('  3. Wire it into src/data/series/index.ts:');
  console.log(`       import { ${exportName} } from './${slug}';`);
  console.log(`       export const SERIES: Series[] = [got, apothecaryDiaries, ${exportName}];`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
