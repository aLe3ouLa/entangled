import type { Character, Relationship, RelationshipFrame, Series } from '../../types';

function f(trust: number, affection: number, power: number, tension: number): RelationshipFrame {
  return { trust, affection, power, tension };
}

/** shorthand: 8 explicit frames, one per season, as [trust, affection, power, tension] */
function s8(frames: [number, number, number, number][]): RelationshipFrame[] {
  if (frames.length !== 8) throw new Error('expected 8 season frames');
  return frames.map(([t, a, p, x]) => f(t, a, p, x));
}

const characters: Character[] = [
  { id: 'ned', name: 'Ned Stark', house: 'Stark', color: '#7c93a8', aliveUntil: 1, prominence: [95, 35, 20, 15, 10, 8, 6, 5] },
  { id: 'catelyn', name: 'Catelyn Stark', house: 'Stark', color: '#7c93a8', aliveUntil: 3, prominence: [80, 75, 55, 10, 8, 6, 5, 4] },
  { id: 'robb', name: 'Robb Stark', house: 'Stark', color: '#7c93a8', aliveUntil: 3, prominence: [50, 85, 80, 10, 8, 6, 5, 4] },
  { id: 'sansa', name: 'Sansa Stark', house: 'Stark', color: '#7c93a8', aliveUntil: 8, prominence: [70, 65, 70, 75, 70, 80, 85, 80] },
  { id: 'arya', name: 'Arya Stark', house: 'Stark', color: '#7c93a8', aliveUntil: 8, prominence: [65, 70, 75, 80, 70, 75, 80, 75] },
  { id: 'jon', name: 'Jon Snow', house: 'Stark', color: '#7c93a8', aliveUntil: 8, prominence: [75, 80, 70, 75, 85, 90, 90, 95] },
  { id: 'theon', name: 'Theon Greyjoy', house: 'Greyjoy', color: '#16697a', aliveUntil: 8, prominence: [55, 80, 20, 60, 55, 50, 45, 55] },
  { id: 'tyrion', name: 'Tyrion Lannister', house: 'Lannister', color: '#c0392b', aliveUntil: 8, prominence: [85, 90, 85, 90, 80, 85, 80, 75] },
  { id: 'cersei', name: 'Cersei Lannister', house: 'Lannister', color: '#c0392b', aliveUntil: 8, prominence: [60, 70, 60, 80, 75, 85, 85, 90] },
  { id: 'jaime', name: 'Jaime Lannister', house: 'Lannister', color: '#c0392b', aliveUntil: 8, prominence: [55, 60, 55, 70, 75, 70, 70, 80] },
  { id: 'daenerys', name: 'Daenerys Targaryen', house: 'Targaryen', color: '#8e44ad', aliveUntil: 8, prominence: [70, 75, 80, 75, 85, 90, 90, 95] },
  { id: 'petyr', name: 'Petyr Baelish', house: 'none', color: '#a1662f', aliveUntil: 7, prominence: [50, 55, 60, 65, 60, 70, 75, 0] },
];

const relationships: Relationship[] = [
  {
    id: 'ned-catelyn',
    source: 'ned',
    target: 'catelyn',
    type: 'love',
    label: 'A marriage built on duty and love',
    summary: 'An arranged marriage that grew into deep loyalty; her steadiness anchors his sense of honor.',
    seasons: s8([
      [90, 85, 50, 20], [90, 85, 50, 20], [90, 85, 50, 20], [90, 85, 50, 20],
      [90, 85, 50, 20], [90, 85, 50, 20], [90, 85, 50, 20], [90, 85, 50, 20],
    ]),
  },
  {
    id: 'ned-robb',
    source: 'ned',
    target: 'robb',
    type: 'responsibility',
    label: 'Heir apprenticeship',
    summary: 'Ned raises Robb to be an honorable lord, trusting him with real responsibility early.',
    seasons: s8([
      [85, 80, 70, 25], [85, 80, 70, 25], [85, 80, 70, 25], [85, 80, 70, 25],
      [85, 80, 70, 25], [85, 80, 70, 25], [85, 80, 70, 25], [85, 80, 70, 25],
    ]),
  },
  {
    id: 'ned-sansa',
    source: 'ned',
    target: 'sansa',
    type: 'love',
    label: 'Doting father, dutiful daughter',
    summary: "Ned indulges Sansa's dreams of court even as he worries they blind her to danger.",
    seasons: s8([
      [70, 75, 60, 30], [70, 75, 60, 30], [70, 75, 60, 30], [70, 75, 60, 30],
      [70, 75, 60, 30], [70, 75, 60, 30], [70, 75, 60, 30], [70, 75, 60, 30],
    ]),
  },
  {
    id: 'ned-arya',
    source: 'ned',
    target: 'arya',
    type: 'love',
    label: 'Kindred rebels',
    summary: "Ned quietly encourages Arya's refusal to be a \"proper lady,\" seeing himself in her.",
    seasons: s8([
      [90, 90, 55, 25], [90, 90, 55, 25], [90, 90, 55, 25], [90, 90, 55, 25],
      [90, 90, 55, 25], [90, 90, 55, 25], [90, 90, 55, 25], [90, 90, 55, 25],
    ]),
  },
  {
    id: 'ned-jon',
    source: 'ned',
    target: 'jon',
    type: 'hidden-truth',
    label: 'Unspoken parentage',
    summary: "Ned's warmth toward Jon is real but shadowed by a secret about his true parentage he never reveals.",
    seasons: s8([
      [75, 70, 55, 45], [75, 70, 55, 45], [75, 70, 55, 45], [75, 70, 55, 45],
      [75, 70, 55, 45], [75, 70, 55, 45], [75, 70, 55, 45], [75, 70, 55, 45],
    ]),
  },
  {
    id: 'catelyn-robb',
    source: 'catelyn',
    target: 'robb',
    type: 'responsibility',
    label: 'Fierce protector and heir',
    summary: "Catelyn becomes Robb's closest advisor after Ned's death, though her choices to save her daughters cost him allies.",
    seasons: s8([
      [88, 85, 45, 40], [88, 85, 45, 40], [88, 85, 45, 40], [88, 85, 45, 40],
      [88, 85, 45, 40], [88, 85, 45, 40], [88, 85, 45, 40], [88, 85, 45, 40],
    ]),
  },
  {
    id: 'catelyn-sansa',
    source: 'catelyn',
    target: 'sansa',
    type: 'responsibility',
    label: 'Mother and favored daughter',
    summary: 'A close, conventional bond around courtly duty that the war tears apart before it can really be tested.',
    seasons: s8([
      [75, 70, 55, 25], [75, 70, 55, 25], [75, 70, 55, 25], [75, 70, 55, 25],
      [75, 70, 55, 25], [75, 70, 55, 25], [75, 70, 55, 25], [75, 70, 55, 25],
    ]),
  },
  {
    id: 'catelyn-arya',
    source: 'catelyn',
    target: 'arya',
    type: 'loyalty',
    label: 'Loving but uncomprehending',
    summary: "Catelyn loves Arya but never quite understands her refusal to fit the mold Sansa fits so easily.",
    seasons: s8([
      [60, 55, 55, 35], [60, 55, 55, 35], [60, 55, 55, 35], [60, 55, 55, 35],
      [60, 55, 55, 35], [60, 55, 55, 35], [60, 55, 55, 35], [60, 55, 55, 35],
    ]),
  },
  {
    id: 'catelyn-jon',
    source: 'catelyn',
    target: 'jon',
    type: 'conflict',
    label: 'The stepmother who never forgave',
    summary: "Catelyn's resentment of Ned's \"bastard\" never fully softens, even as Jon proves himself.",
    seasons: s8([
      [20, 15, 50, 65], [20, 15, 50, 65], [20, 15, 50, 65], [20, 15, 50, 65],
      [20, 15, 50, 65], [20, 15, 50, 65], [20, 15, 50, 65], [20, 15, 50, 65],
    ]),
  },
  {
    id: 'robb-theon',
    source: 'robb',
    target: 'theon',
    type: 'betrayal',
    label: 'Brothers turned enemies',
    summary: "Raised together as wards and friends, Theon's bid to prove himself to his own father costs Robb everything.",
    seasons: s8([
      [80, 75, 50, 30], [10, 20, 80, 95], [10, 15, 80, 80], [10, 15, 80, 80],
      [10, 15, 80, 80], [10, 15, 80, 80], [10, 15, 80, 80], [10, 15, 80, 80],
    ]),
  },
  {
    id: 'sansa-arya',
    source: 'sansa',
    target: 'arya',
    type: 'loyalty',
    label: 'From rivals to the last Starks standing',
    summary: 'Childhood friction gives way to a hard-won partnership once the war leaves them as the only family each other has left.',
    seasons: s8([
      [60, 55, 50, 20], [55, 50, 50, 30], [50, 45, 50, 40], [45, 40, 50, 45],
      [40, 35, 50, 50], [55, 50, 50, 40], [70, 65, 50, 70], [85, 85, 50, 15],
    ]),
  },
  {
    id: 'sansa-petyr',
    source: 'sansa',
    target: 'petyr',
    type: 'threat',
    label: 'Mentor, or predator?',
    summary: 'Petyr grooms Sansa as both protégé and pawn — until she turns his own lessons back on him.',
    seasons: s8([
      [50, 40, 70, 40], [55, 45, 75, 50], [60, 50, 80, 55], [65, 55, 85, 60],
      [55, 50, 85, 55], [40, 30, 60, 65], [10, 5, 20, 95], [10, 5, 20, 0],
    ]),
  },
  {
    id: 'sansa-tyrion',
    source: 'sansa',
    target: 'tyrion',
    type: 'dependence',
    label: 'An unwanted marriage, an unlikely respect',
    summary: 'Neither wanted the marriage; his restraint and her resilience earn something like mutual trust.',
    seasons: s8([
      [30, 20, 50, 10], [30, 20, 50, 10], [40, 35, 50, 50], [55, 45, 50, 70],
      [55, 45, 50, 40], [55, 45, 50, 35], [60, 50, 50, 35], [45, 35, 45, 60],
    ]),
  },
  {
    id: 'jon-daenerys',
    source: 'jon',
    target: 'daenerys',
    type: 'love',
    label: 'Ice and fire',
    summary: 'Allies who become lovers, undone the moment the throne and blood outweigh what they felt for each other.',
    seasons: s8([
      [30, 10, 40, 10], [30, 10, 40, 10], [30, 10, 45, 15], [35, 15, 45, 20],
      [45, 20, 50, 40], [55, 45, 55, 45], [80, 85, 55, 60], [20, 30, 30, 100],
    ]),
  },
  {
    id: 'tyrion-cersei',
    source: 'tyrion',
    target: 'cersei',
    type: 'conflict',
    label: 'Siblings who never stopped keeping score',
    summary: "A lifetime of mutual contempt, sharpened by each blaming the other for their family's ruin.",
    seasons: s8([
      [20, 15, 40, 55], [15, 10, 45, 60], [10, 10, 45, 65], [5, 5, 40, 90],
      [5, 5, 35, 70], [5, 5, 60, 50], [10, 10, 55, 65], [5, 5, 30, 85],
    ]),
  },
  {
    id: 'tyrion-jaime',
    source: 'tyrion',
    target: 'jaime',
    type: 'loyalty',
    label: 'The brother who never looked away',
    summary: 'The one Lannister who treats Tyrion as an equal, even when loyalty to him means defying the rest of the family.',
    seasons: s8([
      [85, 80, 50, 20], [88, 82, 50, 20], [85, 80, 50, 25], [70, 65, 50, 60],
      [60, 55, 50, 50], [70, 65, 50, 30], [65, 60, 50, 55], [75, 80, 50, 35],
    ]),
  },
  {
    id: 'cersei-jaime',
    source: 'cersei',
    target: 'jaime',
    type: 'love',
    label: 'Twins, lovers, mirrors',
    summary: "A bond so total it becomes its own undoing — his growing conscience is the one thing she can't control.",
    seasons: s8([
      [90, 95, 50, 15], [85, 90, 50, 25], [80, 85, 50, 30], [60, 60, 50, 55],
      [50, 50, 50, 60], [60, 65, 55, 45], [55, 60, 55, 50], [40, 70, 40, 75],
    ]),
  },
  {
    id: 'cersei-daenerys',
    source: 'cersei',
    target: 'daenerys',
    type: 'threat',
    label: 'Two queens, one throne',
    summary: 'They never meet as allies — only as the last two claimants willing to burn the city to keep it.',
    seasons: s8([
      [50, 50, 20, 10], [45, 45, 25, 15], [40, 40, 30, 20], [35, 35, 35, 30],
      [20, 20, 45, 45], [10, 10, 55, 65], [5, 5, 60, 80], [0, 0, 20, 100],
    ]),
  },
  {
    id: 'tyrion-daenerys',
    source: 'tyrion',
    target: 'daenerys',
    type: 'dependence',
    label: 'The hand who lost faith',
    summary: 'Tyrion becomes her most trusted counselor, then watches, horrified, as she stops listening to him.',
    seasons: s8([
      [20, 10, 20, 5], [20, 10, 20, 5], [20, 10, 20, 5], [20, 10, 20, 5],
      [55, 45, 60, 45], [65, 55, 55, 30], [65, 55, 50, 35], [30, 25, 35, 90],
    ]),
  },
  {
    id: 'theon-jon',
    source: 'theon',
    target: 'jon',
    type: 'loyalty',
    label: 'Foster brothers, reconciled',
    summary: 'Old Stark-household affection survives betrayal, exile, and shame, mending just before the end.',
    seasons: s8([
      [70, 65, 50, 15], [60, 55, 50, 40], [60, 55, 50, 45], [40, 35, 50, 70],
      [40, 35, 50, 65], [55, 50, 50, 35], [65, 60, 50, 20], [80, 80, 50, 15],
    ]),
  },
];

export const got: Series = {
  id: 'got',
  title: 'Game of Thrones',
  tmdbTitle: 'Game of Thrones',
  seasonCount: 8,
  characters,
  relationships,
};
