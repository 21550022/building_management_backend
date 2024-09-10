import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
  ) {}
  async create(createBuildingDto: CreateBuildingDto) {
    return this.buildingsRepository.save(createBuildingDto);
  }

  findAll() {
    return this.buildingsRepository.find({ relations: ['locations'] });
  }

  async findOne(id: number) {
    const building = await this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return this.buildingsRepository.findOne({ where: { id } });
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const building = this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return this.buildingsRepository.update(id, updateBuildingDto);
  }

  remove(id: number) {
    const building = this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return this.buildingsRepository.delete(id);
  }
}
