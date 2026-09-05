import type { Character, FamilyTree, Relationship, Series } from '../../types';

// Upgraded from an initial stub to a real second series — still lighter
// than the GoT data (2 "parts" so far, a smaller confirmed cast, and a few
// dynamics I'm less certain of than others are deliberately left out rather
// than guessed), but researched rather than a first-guess placeholder.

const characters: Character[] = [
  {
    id: 'maomao',
    name: 'Maomao',
    house: 'Apothecary',
    color: '#8fae7d',
    bio: "A trained apothecary sold into servitude in the rear palace — she'd rather be left alone with her poisons and herbs, but her knack for spotting what everyone else misses keeps pulling her into court intrigue.",
    aliveUntil: 2,
    prominence: [95, 95],
  },
  {
    id: 'jinshi',
    name: 'Jinshi',
    house: 'Outer Court',
    color: '#d4af7a',
    bio: 'A eunuch official of striking beauty and real influence in the outer court — not everything about his position is what it appears to be.',
    aliveUntil: 2,
    prominence: [70, 80],
  },
  {
    id: 'luomen',
    name: 'Luomen',
    house: 'Apothecary',
    color: '#7a8fae',
    bio: 'The apothecary who raised Maomao in the pleasure district — quietly brilliant, endlessly patient, and the source of everything she knows about medicine.',
    aliveUntil: 2,
    prominence: [40, 45],
  },
  {
    id: 'xiaolan',
    name: 'Xiaolan',
    house: 'Rear Palace',
    color: '#c98a9e',
    bio: 'A cheerful, none-too-bright serving girl in the rear palace — one of the few people Maomao treats as a genuine friend rather than a puzzle to solve.',
    aliveUntil: 2,
    prominence: [35, 35],
  },
  {
    id: 'lakan',
    name: 'Lakan',
    house: 'Military',
    color: '#5b6b8c',
    bio: 'An eccentric, chess-obsessed military strategist with famously poor eyesight — few take him seriously until they learn just how sharp his mind actually is.',
    aliveUntil: 2,
    prominence: [30, 45],
  },
  {
    id: 'gaoshun',
    name: 'Gaoshun',
    house: 'Outer Court',
    color: '#9b7653',
    bio: "Jinshi's steady, unglamorous attendant — the one who actually keeps the schemes and the household running while Jinshi gets the attention.",
    aliveUntil: 2,
    prominence: [25, 30],
  },
];

const relationships: Relationship[] = [
  {
    id: 'maomao-jinshi',
    source: 'maomao',
    target: 'jinshi',
    type: 'erotic',
    label: "A poison taster and a man who shouldn't matter to her",
    summary: 'What starts as him being a puzzle for her to solve becomes something neither of them planned for.',
    seasons: [
      { trust: 45, affection: 25, power: 65, tension: 40 },
      { trust: 65, affection: 55, power: 60, tension: 60 },
    ],
  },
  {
    id: 'maomao-luomen',
    source: 'maomao',
    target: 'luomen',
    type: 'family',
    label: 'The apothecary who raised her',
    summary: 'A steady, unconditional bond — everything Maomao knows about medicine (and restraint) traces back to him.',
    seasons: [
      { trust: 90, affection: 85, power: 40, tension: 10 },
      { trust: 92, affection: 88, power: 40, tension: 10 },
    ],
  },
  {
    id: 'maomao-xiaolan',
    source: 'maomao',
    target: 'xiaolan',
    type: 'loyalty',
    label: "Friends in the servants' quarters",
    summary: "An easy, low-stakes friendship among the rear palace's working staff.",
    seasons: [
      { trust: 70, affection: 70, power: 50, tension: 15 },
      { trust: 75, affection: 75, power: 50, tension: 15 },
    ],
  },
  {
    id: 'maomao-lakan',
    source: 'maomao',
    target: 'lakan',
    type: 'hidden-truth',
    label: 'The strategist who is actually her father',
    summary: "An odd, unsettling stranger who takes a strange interest in her — one she doesn't yet know is her own biological father.",
    seasons: [
      { trust: 20, affection: 15, power: 60, tension: 45 },
      { trust: 35, affection: 30, power: 55, tension: 55 },
    ],
  },
  {
    id: 'jinshi-gaoshun',
    source: 'jinshi',
    target: 'gaoshun',
    type: 'loyalty',
    label: 'The attendant who makes it all work',
    summary: "Unglamorous, unwavering service — Gaoshun manages the practical reality behind Jinshi's schemes and standing.",
    seasons: [
      { trust: 85, affection: 60, power: 40, tension: 15 },
      { trust: 88, affection: 65, power: 40, tension: 20 },
    ],
  },
  {
    id: 'jinshi-luomen',
    source: 'jinshi',
    target: 'luomen',
    type: 'dependence',
    label: 'A quiet, useful source of discretion',
    summary: "Luomen's medical expertise and history with the palace make him someone Jinshi can consult without drawing attention.",
    seasons: [
      { trust: 50, affection: 35, power: 30, tension: 20 },
      { trust: 60, affection: 40, power: 30, tension: 25 },
    ],
  },
];

// Mirrors Jon Snow's "raised by one, secretly born of another" pattern —
// Maomao's biological father isn't Luomen, revealed later in the story.
// The exact Luomen-Lakan relationship (I recall some family/clan tie) is
// left out rather than guessed at.
const familyTree: FamilyTree = {
  people: [
    { id: 'luomen', name: 'Luomen', generation: 0 },
    { id: 'lakan', name: 'Lakan', generation: 0 },
    { id: 'maomao', name: 'Maomao', generation: 1 },
  ],
  links: [
    { from: 'luomen', to: 'maomao', kind: 'adoptive', note: 'Raised her; not her biological father' },
    { from: 'lakan', to: 'maomao', kind: 'secret-parent', note: 'Not known to Maomao at first' },
  ],
  spouses: [],
};

const seasonSynopses = [
  'Sold into servitude in the imperial rear palace, apothecary-in-training Maomao uses her sharp medical knowledge to solve poisonings and court mysteries — catching the attention of the mysterious eunuch official Jinshi along the way.',
  "Maomao's reputation as a problem-solver grows beyond the rear palace, pulling her deeper into the intrigues of the outer court and closer to secrets about her own past.",
];

export const apothecaryDiaries: Series = {
  id: 'apothecary-diaries',
  title: 'The Apothecary Diaries',
  searchTitle: 'The Apothecary Diaries',
  characterArtSource: 'anilist',
  seasonCount: 2,
  seasonSynopses,
  characters,
  relationships,
  familyTree,
};
