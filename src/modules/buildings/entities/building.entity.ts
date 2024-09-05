import { BuildingLocation } from 'src/modules/building-locations/entities/building-location.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BuildingLocation, location => location.building)
  locations: BuildingLocation[];
}
