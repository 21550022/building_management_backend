import { Test, TestingModule } from '@nestjs/testing';
import { AppLoggerController } from './app-logger.controller';
import { AppLoggerService } from './app-logger.service';

describe('AppLoggerController', () => {
  let controller: AppLoggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppLoggerController],
      providers: [AppLoggerService],
    }).compile();

    controller = module.get<AppLoggerController>(AppLoggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
