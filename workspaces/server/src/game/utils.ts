import { caseEnum, IGame } from '@monorepo/common';

export const getNewGame = (): IGame => [
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
  [caseEnum.EMPTY, caseEnum.EMPTY, caseEnum.EMPTY],
];
const isRowFinished = (game: IGame) =>
  game.some((row) =>
    row.every((val) => val !== caseEnum.EMPTY && val === row[0]),
  );

const isDiagFinished = (game: IGame) => {
  const diag1 = [game[0][0], game[1][1], game[2][2]];
  const diag2 = [game[0][2], game[1][1], game[2][0]];
  return [diag1, diag2].some((diag) =>
    diag.every((val) => val !== caseEnum.EMPTY && val === diag[0]),
  );
};

function transposeArray(array, arrayLength) {
  let i;
  const newArray = [];
  for (i = 0; i < array.length; i++) {
    newArray.push([]);
  }

  for (i = 0; i < array.length; i++) {
    for (let j = 0; j < arrayLength; j++) {
      newArray[j].push(array[i][j]);
    }
  }

  return newArray;
}

export const checkIfThereIsAWinner = (game: IGame) => {
  const tgame = transposeArray(game, 3);

  return isRowFinished(game) || isRowFinished(tgame) || isDiagFinished(tgame);
};

export const checkIfGameDraw = (game: IGame): boolean => {
  let i = 0;
  game.forEach((row) => {
    row.forEach((el) => {
      if (el !== caseEnum.EMPTY) {
        i++;
      }
    });
  });
  return i === 9;
};
