import { Test, TestingModule } from '@nestjs/testing';
import { BuildingLocationsService } from './building-locations.service';

describe('BuildingLocationsService', () => {
  let service: BuildingLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingLocationsService],
    }).compile();

    service = module.get<BuildingLocationsService>(BuildingLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
