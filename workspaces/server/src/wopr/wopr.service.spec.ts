import { Test, TestingModule } from '@nestjs/testing';
import { WoprService } from './wopr.service';

describe('WoprService', () => {
  let service: WoprService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoprService],
    }).compile();

    service = module.get<WoprService>(WoprService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
