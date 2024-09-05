import { Test, TestingModule } from '@nestjs/testing';
import { BuildingLocationsController } from './building-locations.controller';
import { BuildingLocationsService } from './building-locations.service';

describe('BuildingLocationsController', () => {
  let controller: BuildingLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingLocationsController],
      providers: [BuildingLocationsService],
    }).compile();

    controller = module.get<BuildingLocationsController>(BuildingLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
