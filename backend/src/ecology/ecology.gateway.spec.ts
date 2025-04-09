import { Test, TestingModule } from '@nestjs/testing';
import { EcologyGateway } from './ecology.gateway';

describe('EcologyGateway', () => {
  let gateway: EcologyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcologyGateway],
    }).compile();

    gateway = module.get<EcologyGateway>(EcologyGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
