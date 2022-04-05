import { Injectable } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';
import { IGame, IResponse, playerEnum } from '@monorepo/common';
import { WoprService } from '../wopr/wopr.service';
import { checkIfThereIsAWinner, getNewGame } from './utils';

@Injectable()
export class GameService {
  constructor(private readonly woprService: WoprService) {}

  protected repository: Record<string, IGame> = {};
  get(id: string) {
    const game = this.repository[id];
    if (!game) {
      this.repository[id] = getNewGame();
    }

    return this.repository[id];
  }

  playerTurn(id: string, updateGameDto: UpdateGameDto) {
    const res: IResponse = this.turn(id, playerEnum.YOU, updateGameDto);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (res?.winner) {
      return res;
    }
    const woprTurn = this.woprService.get(this.repository[id]);
    return this.turn(id, playerEnum.WOPR, woprTurn);
  }

  turn(
    id: string,
    player: playerEnum,
    updateGameDto: UpdateGameDto,
  ): IResponse {
    const game = this.repository[id];
    if (!game) {
      throw Error('game does not exist : ' + id);
    }

    game[updateGameDto.x][updateGameDto.y] = updateGameDto.case;

    if (checkIfThereIsAWinner(game)) {
      return { game, winner: player };
    }
    return { game };
  }
}
