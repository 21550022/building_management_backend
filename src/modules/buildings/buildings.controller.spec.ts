import { Test, TestingModule } from '@nestjs/testing';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
// import { CustomLoggerService } from 'src/common/services/custom-logger/custom-logger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';

describe('BuildingsController', () => {
  let controller: BuildingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingsController],
      providers: [
        BuildingsService,
        // CustomLoggerService,
        {
          provide: getRepositoryToken(Building),
          useClass: Repository, // Sử dụng token cho BuildingRepository
        },
      ],
    }).compile();

    controller = module.get<BuildingsController>(BuildingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
