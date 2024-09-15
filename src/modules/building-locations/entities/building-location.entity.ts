import { BadRequestException, ConflictException } from '@nestjs/common';
import { Building } from 'src/modules/buildings/entities/building.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BuildingLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  locationName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  locationNumber: string;

  @Column({ type: 'numeric', precision: 10, scale: 3, nullable: false })
  area: number;

  @ManyToOne(() => BuildingLocation, (location) => location.childrenLocations)
  @JoinColumn(({ name: 'parentLocationId' }))
  parentLocation: BuildingLocation;

  @Column({ nullable: true })
  parentLocationId: number;

  @OneToMany(() => BuildingLocation, (location) => location.parentLocation)
  childrenLocations: BuildingLocation[];

  @ManyToOne(() => Building, (building) => building.locations)
  @JoinColumn(({ name: 'buildingId' }))
  building: Building;

  @Column({ nullable: false })
  buildingId: number;


  async checkUniqueLocationName() {
    try {
      const { locationName } = this;
      const location = await BuildingLocation.findOneBy({ locationName });

      if (location) {
        throw new ConflictException(`Location Name ${locationName} already exists`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkUniqueLocationNumber() {
    try {
      const { locationNumber } = this;
      const location = await BuildingLocation.findOneBy({ locationNumber });

      if (location) {
        throw new ConflictException(`Location Number ${locationNumber} already exists`);
      }
    } catch (error) {
      throw error;
    }
  }

  async checkBuildingIdBeforeInsert() {
    try {
      const { buildingId } = this;

      if (!buildingId) {
        throw new BadRequestException('Building ID is required');
      }

      const building = await Building.findOneBy({ id: buildingId });

      if (!building) {
        throw new BadRequestException(`Building with ID ${buildingId} not exists`);
      }
      return building;
    } catch (error) {
      throw error;
    }
  }

  async checkBuildingIdBeforeUpdate() {
    try {
      const { buildingId } = this;

      if (!buildingId) return

      const building = await Building.findOneBy({ id: buildingId })

      if (!building) {
        throw new BadRequestException(`Building with ID ${buildingId} not exists`);
      }
      else if (building?.id === buildingId) {
        throw new ConflictException(`Building ID ${buildingId} cannot be the same as the location's building ID`);
      }

      return building;
    } catch (error) {
      throw error;
    }
  }

  async checkParentLocationIdBeforeInsert() {
    try {
      const { parentLocationId } = this;

      if (!parentLocationId) return
      const location = await BuildingLocation.findOneBy({ id: parentLocationId });

      if (!location) {
        throw new BadRequestException(`Parent location with ID ${parentLocationId} not exists`);
      }

      return location;
    } catch (error) {
      throw error;
    }
  }

  async checkParentLocationIdBeforeUpdate() {
    try {
      const { id, parentLocationId } = this;

      if (!parentLocationId) return

      const location = await BuildingLocation.findOneBy({ id: parentLocationId });

      if (!location) {
        throw new BadRequestException(`Parent location with ID ${parentLocationId} not exists`);
      }
      else if (id === parentLocationId) {
        throw new ConflictException('Parent location cannot be the same as the location');
      }
      return location;
    } catch (error) {
      throw error;
    }
  }

  async checkLocationId() {
    try {
      const { id } = this;
      if (!id) {
        throw new BadRequestException('Location ID is required');
      }
      const location = await BuildingLocation.findOneBy({ id });
      if(!location) {
        throw new BadRequestException(`Location with ID ${id} not exists`);
      }
    } catch (error) {
      throw error
    }
  }


  @BeforeInsert()
  async validateInsert() {
    try {
      await this.checkBuildingIdBeforeInsert();
      await this.checkParentLocationIdBeforeInsert();
      await this.checkUniqueLocationName();
      await this.checkUniqueLocationNumber();
    } catch (error) {
      throw error;
    }
  }

  @BeforeUpdate()
  async validateUpdate() {
    try {
      await this.checkLocationId();
      await this.checkUniqueLocationName();
      await this.checkUniqueLocationNumber();
      await this.checkBuildingIdBeforeUpdate();
      await this.checkParentLocationIdBeforeUpdate();
    } catch (error) {
      throw error;
    }
  }

  @BeforeRemove()
  async validateRemove() {
    try {
      await this.checkLocationId();
    } catch (error) {
      throw error;
    }
  }
}
