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
    const building = this.buildingsRepository.create(createBuildingDto);
    return this.buildingsRepository.save(building);
  }

  findAll() {
    return this.buildingsRepository.find({
      relations: ['locations'],
      select: ['id', 'name', 'locations'],
    });
  }

  async findOne(id: number) {
    const building = await this.buildingsRepository.findOne({
      where: { id }, relations: ['locations'], select: ['id', 'name', 'locations'] });
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return building;
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const building = this.buildingsRepository.create({ id, ...updateBuildingDto });
    return await this.buildingsRepository.update(id, building);
  }

  async remove(id: number) {
    const building = await this.findOne(id);
    return await this.buildingsRepository.remove(building);
  }
}
