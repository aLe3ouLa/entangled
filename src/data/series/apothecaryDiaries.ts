import type { Character, FamilyTree, Relationship, Series } from '../../types';

// STUB — a rough first pass proving the multi-series architecture holds for a
// very differently-shaped show (2 "parts" so far, not 8 Western-TV seasons,
// small named cast). Trust/affection/power/tension values are a first guess,
// not carefully researched the way the GoT data was — expand or correct freely.

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
];

// Minimal on purpose — mirrors Jon Snow's "raised by one, secretly born of another"
// pattern (Maomao's biological father isn't Luomen, revealed later in the story),
// same as the rest of this file's data: a first pass, not deeply researched.
const familyTree: FamilyTree = {
  people: [
    { id: 'luomen', name: 'Luomen', generation: 0 },
    { id: 'lakan', name: 'Lakan', generation: 0, color: '#5b6b8c' },
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
