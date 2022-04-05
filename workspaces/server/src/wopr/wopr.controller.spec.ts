import { Test, TestingModule } from '@nestjs/testing';
import { WoprController } from './wopr.controller';
import { WoprService } from './wopr.service';

describe('WoprController', () => {
  let controller: WoprController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoprController],
      providers: [WoprService],
    }).compile();

    controller = module.get<WoprController>(WoprController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
