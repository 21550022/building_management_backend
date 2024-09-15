import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async create(createBuildingLocationDto: CreateBuildingLocationDto) {
    const buildingLocation = this.buildingLocationRepository.create(createBuildingLocationDto);
    return await this.buildingLocationRepository.save(buildingLocation);
  }

  async findAll() {
    return await this.buildingLocationRepository.find({
      relations: ['building', 'parentLocation', 'childrenLocations'],
      select: ['id', 'locationName', 'locationNumber', 'area', 'parentLocation', 'childrenLocations', 'building'],
    });
  }

  async findOne(id: number) {
    const buildingLocation = await this.buildingLocationRepository.findOne({
      where: { id },
      relations: ['building', 'parentLocation', 'childrenLocations'],
      select: ['id', 'locationName', 'locationNumber', 'area', 'parentLocation', 'childrenLocations', 'building'],
    });
    if (!buildingLocation) {
      throw new NotFoundException(`Building location with ID ${id} not found`);
    }
    return buildingLocation;
  }

  async update(
    id: number,
    updateBuildingLocationDto: UpdateBuildingLocationDto,
  ) {
    const location = this.buildingLocationRepository.create({ id, ...updateBuildingLocationDto });
    return this.buildingLocationRepository.update(id, location);
  }

  async remove(id: number) {
      const location = await this.findOne(id);
      return this.buildingLocationRepository.remove(location);
    }
}
