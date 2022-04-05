import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Request } from 'express';
import { IResponse } from '@monorepo/common';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getAGame(@Req() request: Request): IResponse {
    const id = request?.headers?.clientid as string;

    if (!id) {
      throw Error('cliendId undefined');
    }
    return { game: this.gameService.get(id) };
  }

  @Post()
  playerTurn(@Req() request: Request, @Body() updateGameDto: UpdateGameDto) {
    const id = request?.headers?.clientid as string;
    return this.gameService.playerTurn(id, updateGameDto);
  }
}
