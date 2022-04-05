import { Module } from '@nestjs/common';
import { WoprService } from './wopr.service';
import { WoprController } from './wopr.controller';

@Module({
  controllers: [WoprController],
  providers: [WoprService],
})
export class WoprModule {}
