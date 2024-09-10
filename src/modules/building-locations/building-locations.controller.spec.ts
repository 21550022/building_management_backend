import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BuildingLocationsController } from './building-locations.controller';
import { BuildingLocationsService } from './building-locations.service';
import { BuildingLocation } from './entities/building-location.entity';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { CustomLoggerService } from 'src/common/services/custom-logger/custom-logger.service';

describe('BuildingLocationsController', () => {
  let controller: BuildingLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingLocationsController],
      providers: [
        BuildingLocationsService,
        CustomLoggerService,
        {
          provide: getRepositoryToken(BuildingLocation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Building),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BuildingLocationsController>(
      BuildingLocationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
