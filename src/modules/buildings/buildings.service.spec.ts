import { Test, TestingModule } from '@nestjs/testing';
import { BuildingsService } from './buildings.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Building} from './entities/building.entity';
import {Repository} from 'typeorm';

describe('BuildingsService', () => {
  let service: BuildingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildingsService,
        {
          provide: getRepositoryToken(Building),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BuildingsService>(BuildingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
