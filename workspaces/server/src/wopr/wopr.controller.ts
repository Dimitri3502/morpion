import { Controller } from '@nestjs/common';
import { WoprService } from './wopr.service';

@Controller('wopr')
export class WoprController {
  constructor(private readonly woprService: WoprService) {}
}
