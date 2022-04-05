import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { WoprModule } from './wopr/wopr.module';

@Module({
  imports: [GameModule, WoprModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
