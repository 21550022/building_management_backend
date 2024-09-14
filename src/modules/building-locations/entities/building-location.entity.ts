import { ConflictException } from '@nestjs/common';
import { Building } from 'src/modules/buildings/entities/building.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
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
  parentLocation: BuildingLocation;

  @OneToMany(() => BuildingLocation, (location) => location.parentLocation)
  childrenLocations: BuildingLocation[];

  @ManyToOne(() => Building)
  building: Building;

  @BeforeInsert()
  async checkUniqueLocationNumber() {
    try {
      const location = await BuildingLocation.findOneBy({
        locationName: this.locationName,
      });

      if (location) {
        throw new ConflictException('Location number must be unique');
      }
    } catch (error) {
      throw error;
    }
  }
}
