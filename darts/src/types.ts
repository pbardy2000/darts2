export type Player = {
  readonly uuid: string;
  readonly name: string;
  readonly nickname?: string;
};

export type Option<T = string> = {
  readonly value: T;
  readonly label: string;
};

export type Orderable<T> = T & { readonly order: number };

export const GAME_TYPES = [
  { value: 'BOBS27', label: "Bobs' 27" },
  { value: 'CRICKET', label: 'Cricket' },
  { value: 'TARGET_PRACTICE', label: 'Target practice' },
  { value: 'X01', label: 'X01' },
] as const;

export type GameType = (typeof GAME_TYPES)[number];
export type GameTypeKey = GameType['value'];

export const DARTBOARDS = [
  { value: 'STANDARD', label: 'Standard' },
  { value: 'DOUBLES', label: 'Doubles' },
];

export type Dartboard = (typeof DARTBOARDS)[number];
export type DartboardKey = Dartboard['value'];

export const MATCH_TYPES = [
  { value: 'BEST_OF', label: 'Best of' },
  { value: 'RACE_TO', label: 'Race to' },
];

export type MatchType = (typeof MATCH_TYPES)[number];
export type MatchTypeKey = MatchType['value'];

export const LEGS: Option<number>[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
];

export const POINTS: Option<number>[] = [
  { value: 101, label: '101' },
  { value: 201, label: '201' },
  { value: 301, label: '301' },
  { value: 401, label: '401' },
  { value: 501, label: '501' },
  { value: 601, label: '601' },
  { value: 701, label: '701' },
  { value: 801, label: '801' },
  { value: 901, label: '901' },
  { value: 1001, label: '1001' },
  { value: 1101, label: '1101' },
  { value: 1201, label: '1201' },
  { value: 1301, label: '1301' },
  { value: 1401, label: '1401' },
  { value: 1501, label: '1501' },
];

export type MatchOptions = {
  game: GameTypeKey;
  dartboard: DartboardKey;
  matchType: MatchTypeKey;
  legs: number;
  points: number;
  doubleIn: boolean;
};

export type Match = {
  readonly uuid: string;
  readonly options: MatchOptions;
  readonly players: Orderable<Player>[];
  readonly completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
};

export type Round = {
  readonly uuid: string;
};
