import { Injectable } from '@nestjs/common';
import { caseEnum, IGame, playerEnum } from '@monorepo/common';
import { UpdateGameDto } from '../game/dto/update-game.dto';
import { checkIfGameDraw, checkIfThereIsAWinner } from '../game/utils';

@Injectable()
export class WoprService {
  get(game: IGame): UpdateGameDto {
    return this.main(game, playerEnum.WOPR);
  }

  main(
    game: IGame,
    player: playerEnum,
    firstMove?: UpdateGameDto,
  ): UpdateGameDto | null {
    const allAvailableMoves = this.getAllAvailableMoves(game, player);

    if (allAvailableMoves.length === 0) {
      return null;
    }

    allAvailableMoves.forEach((move: UpdateGameDto) => {
      const newGame = this.playOneTurn(game, move);
      const ended = checkIfThereIsAWinner(newGame);
      if (ended && player === playerEnum.WOPR) {
        return firstMove;
      } else if (checkIfGameDraw(game)) {
        return firstMove;
      } else {
        const nextPlayer =
          player === playerEnum.WOPR ? playerEnum.YOU : playerEnum.WOPR;
        return this.main(newGame, nextPlayer, firstMove || move);
      }
    });
  }

  playOneTurn(game: IGame, { x, y, case: newItem }: UpdateGameDto): IGame {
    const newGame = JSON.parse(JSON.stringify(game));
    newGame[x][y] = newItem;
    return newGame;
  }

  getAllAvailableMoves(game: IGame, player: playerEnum): UpdateGameDto[] {
    const res: UpdateGameDto[] = [];
    game.forEach((row, x) => {
      row.forEach((el, y) => {
        if (el === caseEnum.EMPTY) {
          const item =
            player === playerEnum.WOPR ? caseEnum.ROUND : caseEnum.CROSS;
          res.push({ x, y, case: item });
        }
      });
    });
    return res;
  }

  basicMove(game: IGame): UpdateGameDto {
    let res;
    game.forEach((row, x) => {
      row.forEach((el, y) => {
        if (el === caseEnum.EMPTY) {
          res = { x, y, case: caseEnum.ROUND };
        }
      });
    });
    return res;
  }
}
