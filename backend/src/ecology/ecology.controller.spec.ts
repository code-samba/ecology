import { Test, TestingModule } from '@nestjs/testing';
import { EcologyController } from './ecology.controller';

describe('EcologyController', () => {
  let controller: EcologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcologyController],
    }).compile();

    controller = module.get<EcologyController>(EcologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
