import { Injectable } from '@nestjs/common';
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
  create(createBuildingDto: CreateBuildingDto) {
    return this.buildingsRepository.save(createBuildingDto);
  }

  findAll() {
    return this.buildingsRepository.find({ relations: ['locations'] });
  }

  findOne(id: number) {
    return this.buildingsRepository.findOne({ where: { id } });
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return this.buildingsRepository.update(id, updateBuildingDto);;
  }

  remove(id: number) {
    return this.buildingsRepository.delete(id);
  }
}
