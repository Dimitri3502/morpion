import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { WoprService } from '../wopr/wopr.service';

@Module({
  controllers: [GameController],
  providers: [GameService, WoprService],
})
export class GameModule {}
