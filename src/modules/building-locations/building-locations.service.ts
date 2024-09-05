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
      const { buildingId, parentLocationId, ...locationData } = createBuildingLocationDto;
      const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
      if (!building) {
        throw new Error('Building not found');
      }
      const parentLocation = parentLocationId ? await this.buildingLocationRepository.findOne({ where: { id: parentLocationId } }) : null;

      const buildingLocation = this.buildingLocationRepository.create({
        ...locationData,
        building,
        parentLocation,
      });
      return this.buildingLocationRepository.save(buildingLocation);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return this.buildingLocationRepository.find({ relations: ['building', 'parentLocation', 'childrenLocations'] });
  }

  findOne(id: number) {
    return this.buildingLocationRepository.findOne({ where: { id }, relations: ['building', 'parentLocation', 'childrenLocations'] });
  }

  async update(id: number, updateBuildingLocationDto: UpdateBuildingLocationDto) {
    try {
      const { buildingId, parentLocationId, ...locationData } = updateBuildingLocationDto;
      const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
      if (!building) {
        throw new Error('Building not found');
      }
      const parentLocation = parentLocationId ? await this.buildingLocationRepository.findOne({ where: { id: parentLocationId } }) : null;

      const buildingLocation = this.buildingLocationRepository.create({
        ...locationData,
        building,
        parentLocation,
      });
      return this.buildingLocationRepository.update(id, buildingLocation);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return this.buildingLocationRepository.delete(id);
  }
}
