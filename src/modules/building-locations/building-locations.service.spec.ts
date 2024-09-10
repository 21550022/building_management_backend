import { Test, TestingModule } from '@nestjs/testing';
import { BuildingLocationsService } from './building-locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BuildingLocation } from './entities/building-location.entity';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';

describe('BuildingLocationsService', () => {
  let service: BuildingLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildingLocationsService,
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

    service = module.get<BuildingLocationsService>(BuildingLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
