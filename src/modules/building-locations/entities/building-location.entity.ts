import { Building } from 'src/modules/buildings/entities/building.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree } from 'typeorm';

@Entity()
export class BuildingLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  locationName: string;

  @Column({ type: 'varchar', nullable: false })
  locationNumber: string;

  @Column({ type: 'numeric', precision: 10, scale: 3, nullable: false })
  area: number;

  @ManyToOne(() => BuildingLocation, location => location.childrenLocations)
  parentLocation: BuildingLocation;

  @OneToMany(() => BuildingLocation, location => location.parentLocation)
  childrenLocations: BuildingLocation[];

  @ManyToOne(() => Building)
  building: Building;
}
