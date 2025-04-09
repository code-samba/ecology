import { Test, TestingModule } from '@nestjs/testing';
import { EcologyService } from './ecology.service';

describe('EcologyService', () => {
  let service: EcologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcologyService],
    }).compile();

    service = module.get<EcologyService>(EcologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
