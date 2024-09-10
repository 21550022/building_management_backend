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
    const { buildingId, parentLocationId, ...bodyRequest } =
      createBuildingLocationDto;
    const buildingLocation = this.buildingLocationRepository.create({
      ...bodyRequest,
    });

    if (buildingId) {
      const building = await this.buildingRepository.findOne({
        where: { id: buildingId },
      });

      if (!building) {
        throw new NotFoundException('Building not found');
      }
      buildingLocation.building = building;
    }

    if (parentLocationId) {
      const parentLocation = await this.buildingLocationRepository.findOne({
        where: { id: parentLocationId },
      });
      if (!parentLocation) {
        throw new NotFoundException('Parent location not found');
      }
      buildingLocation.parentLocation = parentLocation;
    }

    return this.buildingLocationRepository.save(buildingLocation);
  }

  async findAll() {
    return await this.buildingLocationRepository.find({
      relations: ['building', 'parentLocation', 'childrenLocations'],
    });
  }

  async findOne(id: number) {
    const buildingLocation = await this.buildingLocationRepository.findOne({
      where: { id },
      relations: ['building', 'parentLocation', 'childrenLocations'],
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
    const { buildingId, parentLocationId, ...bodyRequest } =
      updateBuildingLocationDto;
    const buildingLocation = await this.buildingLocationRepository.findOne({
      where: { id },
    });
    if (!buildingLocation) {
      throw new NotFoundException(`Building location with ID ${id} not found`);
    }

    if (buildingId) {
      const building = await this.buildingRepository.findOne({
        where: { id: buildingId },
      });
      if (!building) {
        throw new NotFoundException('Building not found');
      }
      buildingLocation.building = building;
    }

    if (parentLocationId) {
      const parentLocation = await this.buildingLocationRepository.findOne({
        where: { id: parentLocationId },
      });
      if (!parentLocation) {
        throw new NotFoundException('Parent location not found');
      }
      buildingLocation.parentLocation = parentLocation;
    }

    Object.assign(buildingLocation, bodyRequest);
    return this.buildingLocationRepository.save(buildingLocation);
  }

  async remove(id: number) {
    const buildingLocation = await this.buildingLocationRepository.findOne({
      where: { id },
    });
    if (!buildingLocation) {
      throw new NotFoundException(`Building location with ID ${id} not found`);
    }
    return this.buildingLocationRepository.delete(id);
  }
}
