import type { Character, Relationship, Series } from '../../types';

// STUB — a rough first pass proving the multi-series architecture holds for a
// very differently-shaped show (2 "parts" so far, not 8 Western-TV seasons,
// small named cast). Trust/affection/power/tension values are a first guess,
// not carefully researched the way the GoT data was — expand or correct freely.

const characters: Character[] = [
  { id: 'maomao', name: 'Maomao', house: 'Apothecary', color: '#8fae7d', aliveUntil: 2, prominence: [95, 95] },
  { id: 'jinshi', name: 'Jinshi', house: 'Outer Court', color: '#d4af7a', aliveUntil: 2, prominence: [70, 80] },
  { id: 'luomen', name: 'Luomen', house: 'Apothecary', color: '#7a8fae', aliveUntil: 2, prominence: [40, 45] },
  { id: 'xiaolan', name: 'Xiaolan', house: 'Rear Palace', color: '#c98a9e', aliveUntil: 2, prominence: [35, 35] },
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

export const apothecaryDiaries: Series = {
  id: 'apothecary-diaries',
  title: 'The Apothecary Diaries',
  tmdbTitle: 'The Apothecary Diaries',
  seasonCount: 2,
  characters,
  relationships,
};
