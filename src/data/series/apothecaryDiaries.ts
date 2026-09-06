import type { Character } from "@/components/Character/types";
import type { FamilyTree, Relationship, Series } from "../../types";

// Upgraded from an initial stub to a real second series — still lighter
// than the GoT data (2 "parts" so far, a smaller confirmed cast, and a few
// dynamics I'm less certain of than others are deliberately left out rather
// than guessed), but researched rather than a first-guess placeholder.

const characters: Character[] = [
  {
    id: "maomao",
    name: "Maomao",
    house: "Apothecary",
    color: "#8fae7d",
    bio: "A trained apothecary sold into servitude in the rear palace — she'd rather be left alone with her poisons and herbs, but her knack for spotting what everyone else misses keeps pulling her into court intrigue.",
    aliveUntil: 2,
    prominence: [95, 95],
  },
  {
    id: "jinshi",
    name: "Jinshi",
    house: "Outer Court",
    color: "#d4af7a",
    bio: "A eunuch official of striking beauty and real influence in the outer court — not everything about his position is what it appears to be.",
    aliveUntil: 2,
    prominence: [70, 80],
  },
  {
    id: "luomen",
    name: "Luomen",
    house: "Apothecary",
    color: "#7a8fae",
    bio: "The apothecary who raised Maomao in the pleasure district — quietly brilliant, endlessly patient, and the source of everything she knows about medicine.",
    aliveUntil: 2,
    prominence: [40, 45],
  },
  {
    id: "xiaolan",
    name: "Xiaolan",
    house: "Rear Palace",
    color: "#c98a9e",
    bio: "A cheerful, none-too-bright serving girl in the rear palace — one of the few people Maomao treats as a genuine friend rather than a puzzle to solve.",
    aliveUntil: 2,
    prominence: [35, 35],
  },
  {
    id: "gyokuyou",
    name: "Gyokuyou",
    house: "Rear Palace",
    color: "#c1594a",
    bio: "The Precious Consort, and one of the Emperor’s clear favorites — warm, sharp, and disarmingly good at rear palace politics. Maomao serves as her food taster for much of the story.",
    aliveUntil: 2,
    prominence: [35, 30],
  },
  {
    id: "lihua",
    name: "Lihua",
    house: "Rear Palace",
    color: "#7d7aae",
    bio: "The Wise Consort — stern and guarded after losing a child, and initially hostile to Maomao, but she softens once Maomao helps uncover the truth behind what happened.",
    aliveUntil: 2,
    prominence: [30, 20],
  },
  {
    id: "lishu",
    name: "Lishu",
    house: "Rear Palace",
    color: "#e0a8ab",
    bio: "The youngest and most junior of the high consorts — a former consort of the late Emperor inherited by his son, which makes her position at court awkward and leaves her own attendants openly contemptuous of her.",
    aliveUntil: 2,
    prominence: [15, 20],
  },
  {
    id: "loulan",
    name: "Loulan",
    house: "Rear Palace",
    color: "#8c3a4a",
    bio: "The Pure Consort who arrives to replace Ah-Duo, installed by her powerful clan for political advantage — guarded and hard to read, with more going on beneath the surface than her rank alone explains.",
    aliveUntil: 2,
    firstSeason: 2,
    prominence: [0, 20],
  },
  {
    id: "ah-duo",
    name: "Ah-Duo",
    house: "Rear Palace",
    color: "#7d8ba1",
    bio: "A former high consort pushed out of her position and now an instructor to the rear palace's women — a childhood friend of the Emperor who carries a secret even her own son doesn't know.",
    aliveUntil: 2,
    prominence: [15, 20],
  },
  {
    id: "lakan",
    name: "Lakan",
    house: "Military",
    color: "#5b6b8c",
    bio: "An eccentric, chess-obsessed military strategist with famously poor eyesight — few take him seriously until they learn just how sharp his mind actually is.",
    aliveUntil: 2,
    prominence: [30, 45],
  },
  {
    id: "gaoshun",
    name: "Gaoshun",
    house: "Outer Court",
    color: "#9b7653",
    bio: "Jinshi's steady, unglamorous attendant — the one who actually keeps the schemes and the household running while Jinshi gets the attention.",
    aliveUntil: 2,
    prominence: [25, 30],
  },
  {
    id: "emperor",
    name: "Emperor",
    house: "Imperial",
    color: "#b08d3f",
    bio: "The reigning emperor — distant and rarely seen up close, but the man whose bloodline and succession anxieties quietly shape everyone else's schemes. Deliberately the opposite of his own predatory father in how he treats the women around him.",
    aliveUntil: 2,
    prominence: [10, 15],
  },
  {
    id: "anshi",
    name: "Anshi",
    house: "Imperial",
    color: "#9b7fa0",
    bio: "The Empress Dowager and the Emperor's mother — married into the palace as a child bride to the previous Emperor, she now wields quiet influence from the background, and finds it easier to love the son she didn't bear than the one she did.",
    aliveUntil: 2,
    firstSeason: 2,
    prominence: [0, 20],
  },
  {
    id: "pairin",
    name: "Pairin",
    house: "Pleasure District",
    color: "#c77b96",
    bio: "The Verdigris House courtesan who nursed baby Maomao and helped raise her before Luomen adopted her — Maomao calls her an older sister, but the bond runs closer to mother and daughter.",
    aliveUntil: 2,
    prominence: [10, 10],
  },
  {
    id: "meimei",
    name: "Meimei",
    house: "Pleasure District",
    color: "#6fa8a0",
    bio: "One of the three top courtesans of the Verdigris House who helped raise Maomao in the pleasure district — and the one who taught her to dance.",
    aliveUntil: 2,
    prominence: [8, 8],
  },
  {
    id: "joka",
    name: "Joka",
    house: "Pleasure District",
    color: "#9a6b8c",
    bio: "The third of the Verdigris House's three renowned courtesans, and one of the women who helped raise Maomao before she left the pleasure district.",
    aliveUntil: 2,
    prominence: [8, 8],
  },
  {
    id: "lihaku",
    name: "Lihaku",
    house: "Military",
    color: "#8a9560",
    bio: "An earnest, dependable young military officer who helps Maomao with palace investigations — and who's working his way up the ranks to one day buy out Pairin's courtesan contract.",
    aliveUntil: 2,
    prominence: [10, 15],
  },
  {
    id: "suirei",
    name: "Suirei",
    house: "Outer Court",
    color: "#5c7a52",
    bio: "An Outer Court official who tends the palace's medicinal herbs, with a poison expertise to rival Maomao's own — every clue about who she really is leads somewhere she'd rather keep hidden.",
    aliveUntil: 2,
    prominence: [20, 30],
  },
  {
    id: "fengxian",
    name: "Fengxian",
    house: "Pleasure District",
    color: "#7a2942",
    bio: "Maomao's biological mother — once Verdigris House's most celebrated courtesan, prized for her beauty and her skill at strategy games. The years since have not been kind to her, and neither was she to the daughter she bore.",
    aliveUntil: 2,
    firstSeason: 1,
    prominence: [10, 15],
  },
];

const relationships: Relationship[] = [
  {
    id: "maomao-jinshi",
    source: "maomao",
    target: "jinshi",
    type: "erotic",
    types: ["neutral", "erotic"],
    label: "A poison taster and a man who shouldn't matter to her",
    summary:
      "Starts as a lopsided master-and-servant arrangement — he outranks her and orders her around — before becoming something neither of them planned for.",
    seasons: [
      { trust: 45, affection: 25, power: 65, tension: 40 },
      { trust: 65, affection: 55, power: 60, tension: 60 },
    ],
  },
  {
    id: "maomao-luomen",
    source: "maomao",
    target: "luomen",
    type: "family",
    label: "The apothecary who raised her",
    summary:
      "A steady, unconditional bond — everything Maomao knows about medicine (and restraint) traces back to him.",
    seasons: [
      { trust: 90, affection: 85, power: 40, tension: 10 },
      { trust: 92, affection: 88, power: 40, tension: 10 },
    ],
  },
  {
    id: "maomao-xiaolan",
    source: "maomao",
    target: "xiaolan",
    type: "loyalty",
    label: "Friends in the servants' quarters",
    summary:
      "An easy, low-stakes friendship among the rear palace's working staff.",
    seasons: [
      { trust: 70, affection: 70, power: 50, tension: 15 },
      { trust: 75, affection: 75, power: 50, tension: 15 },
    ],
  },
  {
    id: "maomao-lakan",
    source: "maomao",
    target: "lakan",
    type: "hidden-truth",
    label: "The strategist who is actually her father",
    summary:
      "An odd, unsettling stranger who takes a strange interest in her — one she doesn't yet know is her own biological father.",
    seasons: [
      { trust: 20, affection: 15, power: 60, tension: 45 },
      { trust: 35, affection: 30, power: 55, tension: 55 },
    ],
  },
  {
    id: "jinshi-gaoshun",
    source: "jinshi",
    target: "gaoshun",
    type: "loyalty",
    label: "The attendant who makes it all work",
    summary:
      "Unglamorous, unwavering service — Gaoshun manages the practical reality behind Jinshi's schemes and standing.",
    seasons: [
      { trust: 85, affection: 60, power: 40, tension: 15 },
      { trust: 88, affection: 65, power: 40, tension: 20 },
    ],
  },
  {
    id: "emperor-jinshi",
    source: "emperor",
    target: "jinshi",
    type: "hidden-truth",
    label: "The son posing as his own uncle",
    summary:
      "Jinshi is publicly the Emperor's younger brother, but he's secretly the Emperor's own biological son — swapped at birth to save his life after the real imperial brother died, and later chose to pose as a eunuch official rather than be named heir.",
    seasons: [
      { trust: 40, affection: 20, power: 85, tension: 55 },
      { trust: 40, affection: 20, power: 85, tension: 60 },
    ],
  },
  {
    id: "maomao-gyokuyou",
    source: "maomao",
    target: "gyokuyou",
    type: "loyalty",
    label: "The consort she tastes poison for",
    summary:
      "Maomao serves as Gyokuyou's food taster — a job built on suspicion that grows into real, mutual regard.",
    seasons: [
      { trust: 55, affection: 45, power: 55, tension: 30 },
      { trust: 75, affection: 65, power: 50, tension: 20 },
    ],
  },
  {
    id: "maomao-lihua",
    source: "maomao",
    target: "lihua",
    type: "dependence",
    label: "A frosty consort who comes to rely on her",
    summary:
      "What starts as suspicion and a guarded household eases once Maomao helps uncover the truth behind the death that hardened her.",
    seasons: [
      { trust: 20, affection: 15, power: 60, tension: 55 },
      { trust: 55, affection: 50, power: 50, tension: 25 },
    ],
  },
  {
    id: "maomao-lishu",
    source: "maomao",
    target: "lishu",
    type: "responsibility",
    label: "The consort nobody protects",
    summary:
      "Maomao steps in when Lishu's own attendants turn on her, becoming one of the few people at court actually looking out for her.",
    seasons: [
      { trust: 30, affection: 30, power: 40, tension: 45 },
      { trust: 50, affection: 45, power: 35, tension: 25 },
    ],
  },
  {
    id: "gyokuyou-lihua",
    source: "gyokuyou",
    target: "lihua",
    type: "conflict",
    label: "Rival consorts, uneasy peace",
    summary:
      "The two highest-ranking consorts compete for the Emperor's favor and their households' standing — real rivalry, but rarely open hostility.",
    seasons: [
      { trust: 30, affection: 25, power: 65, tension: 50 },
      { trust: 40, affection: 35, power: 60, tension: 35 },
    ],
  },
  {
    id: "maomao-ah-duo",
    source: "maomao",
    target: "ah-duo",
    type: "loyalty",
    label: "The instructor who takes a shine to her",
    summary:
      "Ah-Duo, who oversees training for the rear palace's women, comes to respect Maomao's sharp instincts and unusual competence.",
    seasons: [
      { trust: 40, affection: 35, power: 45, tension: 20 },
      { trust: 55, affection: 45, power: 40, tension: 20 },
    ],
  },
  {
    id: "ah-duo-emperor",
    source: "ah-duo",
    target: "emperor",
    type: "hidden-truth",
    label: "Childhood sweethearts with a buried secret",
    summary:
      "Once the Emperor's great love and the mother of his son, Ah-Duo was ultimately pushed out of her position at court — what the two of them actually share stays hidden from nearly everyone around them.",
    seasons: [
      { trust: 70, affection: 55, power: 70, tension: 50 },
      { trust: 72, affection: 55, power: 65, tension: 50 },
    ],
  },
  {
    id: "ah-duo-gaoshun",
    source: "ah-duo",
    target: "gaoshun",
    type: "loyalty",
    label: "A lifetime of quiet devotion",
    summary:
      "Childhood friends who grew up together in the palace — Gaoshun's steady loyalty to Ah-Duo hasn't wavered even as her circumstances changed around her.",
    seasons: [
      { trust: 85, affection: 60, power: 30, tension: 20 },
      { trust: 88, affection: 65, power: 30, tension: 20 },
    ],
  },
  {
    id: "ah-duo-jinshi",
    source: "ah-duo",
    target: "jinshi",
    type: "hidden-truth",
    label: "The mother he doesn't know he has",
    summary:
      "Ah-Duo is secretly Jinshi's birth mother, having arranged a swap at birth to save his life — a truth he has yet to learn.",
    seasons: [
      { trust: 40, affection: 50, power: 30, tension: 40 },
      { trust: 45, affection: 55, power: 30, tension: 45 },
    ],
  },
  {
    id: "emperor-gyokuyou",
    source: "emperor",
    target: "gyokuyou",
    type: "erotic",
    label: "The favored consort",
    summary:
      "One of the Emperor's clear favorites — an easy, genuinely warm match among his consorts.",
    seasons: [
      { trust: 70, affection: 65, power: 75, tension: 20 },
      { trust: 75, affection: 70, power: 70, tension: 20 },
    ],
  },
  {
    id: "emperor-lihua",
    source: "emperor",
    target: "lihua",
    type: "erotic",
    label: "A marriage marked by loss",
    summary:
      "Formal and correct on the surface, but the death of their son has left real distance between them.",
    seasons: [
      { trust: 40, affection: 25, power: 70, tension: 45 },
      { trust: 45, affection: 30, power: 65, tension: 35 },
    ],
  },
  {
    id: "emperor-lishu",
    source: "emperor",
    target: "lishu",
    type: "neutral",
    label: "A consort he never visits",
    summary:
      "Inherited from his own father's rear palace rather than chosen, Lishu is kept as a consort in name only — the Emperor doesn't visit her, which leaves her position at court quietly humiliating.",
    seasons: [
      { trust: 20, affection: 10, power: 70, tension: 35 },
      { trust: 25, affection: 15, power: 65, tension: 30 },
    ],
  },
  {
    id: "emperor-loulan",
    source: "emperor",
    target: "loulan",
    type: "erotic",
    label: "A consort placed by a rival clan",
    summary:
      "Installed in the rear palace by her own powerful family rather than chosen for love, Loulan is still one of his consorts — a romantic tie the Emperor approaches with real wariness.",
    seasons: [
      { trust: 10, affection: 20, power: 40, tension: 15 },
      { trust: 30, affection: 25, power: 70, tension: 45 },
    ],
  },
  {
    id: "emperor-anshi",
    source: "emperor",
    target: "anshi",
    type: "family",
    label: "A dutiful, distant mother and son",
    summary:
      "He rarely refuses her requests and she's proud of the ruler he's become, but the traumatic marriage that produced him has left real emotional distance between them.",
    seasons: [
      { trust: 60, affection: 35, power: 55, tension: 25 },
      { trust: 60, affection: 40, power: 55, tension: 30 },
    ],
  },
  {
    id: "anshi-jinshi",
    source: "anshi",
    target: "jinshi",
    type: "hidden-truth",
    label: "The son she didn't bear",
    summary:
      "Officially Anshi's son — he took the place of her real child, who died at birth — and, oddly, she finds him easier to love than the son she actually raised.",
    seasons: [
      { trust: 45, affection: 55, power: 40, tension: 30 },
      { trust: 50, affection: 60, power: 40, tension: 30 },
    ],
  },
  {
    id: "lakan-luomen",
    source: "luomen",
    target: "lakan",
    type: "family",
    label: "The uncle who raised him in all but name",
    summary:
      "Luomen was more a father to Lakan than his own father ever was, until a court scandal got Luomen branded a criminal and tore the two of them apart for years.",
    seasons: [
      { trust: 55, affection: 60, power: 30, tension: 30 },
      { trust: 65, affection: 65, power: 30, tension: 20 },
    ],
  },
  {
    id: "maomao-pairin",
    source: "maomao",
    target: "pairin",
    type: "family",
    label: "The sister who was almost her mother",
    summary:
      "Pairin nursed and raised Maomao before Luomen adopted her — Maomao calls her a sister, but the bond runs closer to mother and daughter.",
    seasons: [
      { trust: 85, affection: 85, power: 20, tension: 10 },
      { trust: 88, affection: 88, power: 20, tension: 10 },
    ],
  },
  {
    id: "maomao-meimei",
    source: "maomao",
    target: "meimei",
    type: "family",
    label: "The sister who taught her to dance",
    summary:
      "One of the three Verdigris House courtesans who helped raise Maomao in the pleasure district.",
    seasons: [
      { trust: 75, affection: 75, power: 15, tension: 10 },
      { trust: 78, affection: 78, power: 15, tension: 10 },
    ],
  },
  {
    id: "maomao-joka",
    source: "maomao",
    target: "joka",
    type: "family",
    label: "The third of her adopted sisters",
    summary:
      "The last of the three Verdigris House courtesans who raised Maomao — she once risked the anger of court officials to track down a lost heirloom for her.",
    seasons: [
      { trust: 70, affection: 70, power: 15, tension: 15 },
      { trust: 73, affection: 73, power: 15, tension: 15 },
    ],
  },
  {
    id: "maomao-lihaku",
    source: "maomao",
    target: "lihaku",
    type: "loyalty",
    label: "An acquaintance who calls himself her friend",
    summary:
      "An honest, dependable military officer who helps Maomao with investigations — he considers them friends; she's not sure she'd go that far.",
    seasons: [
      { trust: 55, affection: 50, power: 30, tension: 15 },
      { trust: 65, affection: 55, power: 30, tension: 15 },
    ],
  },
  {
    id: "lihaku-pairin",
    source: "lihaku",
    target: "pairin",
    type: "erotic",
    label: "Saving up to buy her freedom",
    summary:
      "Lihaku adores Pairin and works to rise through the ranks so he can one day buy out her courtesan's contract.",
    seasons: [
      { trust: 50, affection: 60, power: 30, tension: 25 },
      { trust: 55, affection: 65, power: 30, tension: 20 },
    ],
  },
  {
    id: "maomao-loulan",
    source: "maomao",
    target: "loulan",
    type: "hidden-truth",
    label: "The maid who's secretly a consort",
    summary:
      'Loulan slips out of her role as Pure Consort in disguise to chat and hunt bugs with Maomao as "someone like a friend" — a real bond Maomao can no longer be sure of once she learns who Loulan actually is and what she\'s done.',
    seasons: [
      { trust: 10, affection: 15, power: 20, tension: 10 },
      { trust: 35, affection: 55, power: 45, tension: 70 },
    ],
  },
  {
    id: "suirei-loulan",
    source: "suirei",
    target: "loulan",
    type: "family",
    label: "Half-sisters bound by a hidden bloodline",
    summary:
      "Suirei is Loulan's half-sister through their father — and secretly carries Imperial blood of her own, a bond that pulls Loulan into her half-sister's schemes.",
    seasons: [
      { trust: 20, affection: 20, power: 20, tension: 15 },
      { trust: 70, affection: 65, power: 30, tension: 50 },
    ],
  },
  {
    id: "suirei-emperor",
    source: "suirei",
    target: "emperor",
    type: "hidden-truth",
    label: "A hidden branch of his own bloodline",
    summary:
      "Suirei's mother was the Former Emperor's illegitimate daughter, secretly tying her to the Emperor's own bloodline — a connection nobody at court is meant to know.",
    seasons: [
      { trust: 20, affection: 10, power: 50, tension: 30 },
      { trust: 20, affection: 10, power: 55, tension: 50 },
    ],
  },
  {
    id: "maomao-suirei",
    source: "maomao",
    target: "suirei",
    type: "threat",
    label: "The herbalist tangled up in unsolved crimes",
    summary:
      "A skilled herb-and-poison official Maomao meets in the Outer Court — later revealed to be at the center of the season's darkest mysteries, and no friend of Maomao's once the truth comes out.",
    seasons: [
      { trust: 40, affection: 30, power: 35, tension: 40 },
      { trust: 15, affection: 15, power: 40, tension: 75 },
    ],
  },
  {
    id: "maomao-fengxian",
    source: "maomao",
    target: "fengxian",
    type: "family",
    label: "The mother who never wanted her",
    summary:
      "Fengxian's pregnancy destroyed her standing as Verdigris House's top courtesan — ruined and eventually driven to madness by illness and despair, she abused infant Maomao before losing her to Luomen's care. Their reunion, years later, is complicated at best.",
    seasons: [
      { trust: 10, affection: 10, power: 20, tension: 60 },
      { trust: 25, affection: 20, power: 20, tension: 40 },
    ],
  },
  {
    id: "lakan-fengxian",
    source: "lakan",
    target: "fengxian",
    type: "erotic",
    label: "A courtesan he loved and lost",
    summary:
      "Lakan fell for Fengxian over years of strategy games together; she gambled everything on a pregnancy to escape her life as a courtesan, and lost. Decades later, Maomao forces the reunion neither of them managed on their own.",
    seasons: [
      { trust: 20, affection: 55, power: 30, tension: 50 },
      { trust: 40, affection: 60, power: 30, tension: 25 },
    ],
  },
  {
    id: "fengxian-meimei",
    source: "fengxian",
    target: "meimei",
    type: "family",
    label: "A found sisterhood among the courtesans",
    summary:
      "Fengxian forged a close, loyal bond with the Verdigris House's younger courtesans, especially Meimei — who later helped care for her once illness left her bedridden.",
    seasons: [
      { trust: 75, affection: 75, power: 20, tension: 30 },
      { trust: 80, affection: 78, power: 15, tension: 20 },
    ],
  },
  {
    id: "lakan-meimei",
    source: "lakan",
    target: "meimei",
    type: "loyalty",
    label: "The courtesan who kept the games going",
    summary:
      "Meimei played Go and Shogi with Lakan since she was a girl — and became the one courtesan who still entertains him with games and conversation instead of anything more, keeping a thread back to Fengxian alive.",
    seasons: [
      { trust: 60, affection: 50, power: 25, tension: 15 },
      { trust: 65, affection: 55, power: 25, tension: 15 },
    ],
  },
];

// Mirrors Jon Snow's "raised by one, secretly born of another" pattern —
// Maomao's biological father isn't Luomen, revealed later in the story.
// Luomen is Lakan's uncle (Luomen stepped aside from leading their clan as
// strategist and the role passed to his nephew, Lakan), which puts Lakan one
// generation below Luomen despite being Maomao's own generation-0 parent.
// Jinshi mirrors that exact shape one branch over: the Former Emperor and
// Anshi are his official parents (he was swapped in at birth for their real
// son, who died — an "adoptive" link even though neither side knows it),
// while the current Emperor and Ah-Duo, one generation closer to him, are
// his real "secret-parent" biological parents. None of this is known to
// Jinshi himself.
// A third branch: the Former Emperor's illegitimate daughter (the Banished
// Princess) married into the rival Shi Clan and had Suirei — making Suirei
// a secret, once-removed line back to the Emperor's own bloodline, and
// Loulan (Suirei's half-sister through their father, Shishou) part of the
// same hidden thread.
const familyTree: FamilyTree = {
  people: [
    { id: "luomen", name: "Luomen", generation: 0 },
    { id: "lakan", name: "Lakan", generation: 1 },
    { id: "fengxian", name: "Fengxian", generation: 1 },
    { id: "maomao", name: "Maomao", generation: 2 },
    {
      id: "former-emperor",
      name: "Former Emperor",
      generation: 0,
      color: "#4a4238",
    },
    { id: "anshi", name: "Anshi", generation: 0 },
    { id: "emperor", name: "Emperor", generation: 1 },
    { id: "ah-duo", name: "Ah-Duo", generation: 1 },
    { id: "jinshi", name: "Jinshi", generation: 2 },
    {
      id: "banished-princess",
      name: "The Banished Princess",
      generation: 1,
      color: "#a0708e",
    },
    { id: "shishou", name: "Shishou", generation: 1, color: "#7a3b3b" },
    { id: "loulan", name: "Loulan", generation: 2 },
    { id: "suirei", name: "Suirei", generation: 2 },
  ],
  links: [
    {
      from: "luomen",
      to: "lakan",
      kind: "extended",
      note: "Luomen is Lakan's uncle; the clan strategist role passed from Luomen to his nephew",
    },
    {
      from: "luomen",
      to: "maomao",
      kind: "adoptive",
      note: "Raised her; not her biological father",
    },
    {
      from: "lakan",
      to: "maomao",
      kind: "secret-parent",
      note: "Not known to Maomao at first",
    },
    {
      from: "fengxian",
      to: "maomao",
      kind: "parent",
      note: "Her biological mother — estranged since infancy, reunited only once Maomao is grown",
    },
    {
      from: "lakan",
      to: "fengxian",
      kind: "extended",
      note: "Lakan and Fengxian's affair produced Maomao; never married",
    },
    {
      from: "former-emperor",
      to: "emperor",
      kind: "parent",
    },
    {
      from: "anshi",
      to: "emperor",
      kind: "parent",
    },
    {
      from: "former-emperor",
      to: "jinshi",
      kind: "adoptive",
      note: "Officially his father — Jinshi was swapped at birth for the son Anshi actually bore him, who died; not known to Jinshi",
    },
    {
      from: "anshi",
      to: "jinshi",
      kind: "adoptive",
      note: "Officially his mother, for the same reason; not known to Jinshi",
    },
    {
      from: "emperor",
      to: "jinshi",
      kind: "secret-parent",
      note: "His real father — swapped at birth for the real imperial brother, who died; not known to Jinshi",
    },
    {
      from: "ah-duo",
      to: "jinshi",
      kind: "secret-parent",
      note: "His real mother, who arranged the swap; not known to Jinshi",
    },
    {
      from: "former-emperor",
      to: "banished-princess",
      kind: "secret-parent",
      note: "His illegitimate daughter by a palace maid — a scandal the court isn't meant to know about",
    },
    {
      from: "shishou",
      to: "loulan",
      kind: "parent",
    },
    {
      from: "shishou",
      to: "suirei",
      kind: "parent",
    },
    {
      from: "banished-princess",
      to: "suirei",
      kind: "parent",
    },
    {
      from: "suirei",
      to: "loulan",
      kind: "extended",
      note: "Half-sisters through their father, Shishou",
    },
  ],
  spouses: [
    { a: "former-emperor", b: "anshi" },
    { a: "shishou", b: "banished-princess" },
  ],
};

const seasonSynopses = [
  "Sold into servitude in the imperial rear palace, apothecary-in-training Maomao uses her sharp medical knowledge to solve poisonings and court mysteries — catching the attention of the mysterious eunuch official Jinshi along the way.",
  "Maomao's reputation as a problem-solver grows beyond the rear palace, pulling her deeper into the intrigues of the outer court and closer to secrets about her own past.",
];

export const apothecaryDiaries: Series = {
  id: "apothecary-diaries",
  title: "The Apothecary Diaries",
  searchTitle: "The Apothecary Diaries",
  characterArtSource: "anilist",
  seasonCount: 2,
  seasonSynopses,
  characters,
  relationships,
  familyTree,
};
