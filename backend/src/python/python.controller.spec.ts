import { Test, TestingModule } from '@nestjs/testing';
import { PythonController } from './python.controller';

describe('PythonController', () => {
  let controller: PythonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PythonController],
    }).compile();

    controller = module.get<PythonController>(PythonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
