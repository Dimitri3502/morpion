export enum caseEnum {
  EMPTY = 'Empty',
  CROSS = 'Cross',
  ROUND = 'Round',
}

export enum playerEnum {
  YOU = 'you',
  WOPR = 'Wopr',
}

export type IGame = caseEnum[][];

export interface IResponse {
  winner?: playerEnum;
  game: IGame;
}
