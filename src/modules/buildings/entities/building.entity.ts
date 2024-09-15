import {
  BadRequestException,
  ConflictException,
  NotFoundException
} from '@nestjs/common';
import { BuildingLocation } from 'src/modules/building-locations/entities/building-location.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Building extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => BuildingLocation, (location) => location.building)
  locations: BuildingLocation[];

  async checkBuildingId() {
    try {
      const { id } = this;
      if (!id) {
        throw new BadRequestException('Building ID is required');
      }

      const building = await Building.findOneBy({ id });
      if (!building) {
        throw new NotFoundException(`Building with ID ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkUniqueName() {
    try {
      const { name } = this;
      const building = await Building.findOneBy({ name });
      if (building) {
        throw new ConflictException('Building name is already existed');
      }
    } catch (error) {
      throw error;
    }
  }

  @BeforeInsert()
  async validateInsert() {
    try {
      await this.checkUniqueName();
    } catch (error) {
      throw error;
    }
  }

  @BeforeUpdate()
  async validateUpdate() {
    try {
      await this.checkBuildingId();
      await this.checkUniqueName();
    } catch (error) {
      throw error;
    }
  }

  @BeforeRemove()
  async validateRemove() {
    try {
      await this.checkBuildingId();
    } catch (error) {
      throw error;
    }
  }
}
