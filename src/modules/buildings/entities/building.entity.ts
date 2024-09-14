import {
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

  async checkExist() {
    try {
      const { id } = this;
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
      await this.checkExist();
      await this.checkUniqueName();
    } catch (error) {
      throw error;
    }
  }

  @BeforeRemove()
  async validateRemove() {
    try {
      await this.checkExist();
    } catch (error) {
      throw error;
    }
  }
}
