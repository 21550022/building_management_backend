import { Injectable } from '@nestjs/common';
import { CreateBuildingLocationDto } from './dto/create-building-location.dto';
import { UpdateBuildingLocationDto } from './dto/update-building-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingLocation } from './entities/building-location.entity';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';

@Injectable()
export class BuildingLocationsService {
  constructor(
    @InjectRepository(BuildingLocation)
    private buildingLocationRepository: Repository<BuildingLocation>,

    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) { }
  async create(createBuildingLocationDto: CreateBuildingLocationDto) {
    try {
      const { buildingId, parentLocationId, ...bodyRequest } = createBuildingLocationDto;
      const buildingLocation = this.buildingLocationRepository.create({ ...bodyRequest });

      if(buildingId) {
        const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
        if (!building) {
          throw new Error('Building not found');
        }
        buildingLocation.building = building
      }

      if(parentLocationId) {
        const parentLocation = await this.buildingLocationRepository.findOne({ where: { id: parentLocationId } });
        if (!parentLocation) {
          throw new Error('Parent location not found');
        }
        buildingLocation.parentLocation = parentLocation
      }

      return this.buildingLocationRepository.save(buildingLocation);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    return await this.buildingLocationRepository.find({ relations: ['building', 'parentLocation', 'childrenLocations'] });
  }

  findOne(id: number) {
    return this.buildingLocationRepository.findOne({ where: { id }, relations: ['building', 'parentLocation', 'childrenLocations'] });
  }

  async update(id: number, updateBuildingLocationDto: UpdateBuildingLocationDto) {
    try {
      const { buildingId, parentLocationId, ...bodyRequest } = updateBuildingLocationDto;
      const buildingLocation = this.buildingLocationRepository.create({ ...bodyRequest });

      if(buildingId) {
        const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
        if (!building) {
          throw new Error('Building not found');
        }
        buildingLocation.building = building
      }

      if(parentLocationId) {
        const parentLocation = await this.buildingLocationRepository.findOne({ where: { id: parentLocationId } });
        if (!parentLocation) {
          throw new Error('Parent location not found');
        }
        buildingLocation.parentLocation = parentLocation
      }

      return this.buildingLocationRepository.update(id, buildingLocation);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return this.buildingLocationRepository.delete(id);
  }
}
