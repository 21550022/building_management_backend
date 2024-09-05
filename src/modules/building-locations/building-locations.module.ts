import { Module } from '@nestjs/common';
import { BuildingLocationsService } from './building-locations.service';
import { BuildingLocationsController } from './building-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingLocation } from './entities/building-location.entity';
import { BuildingsModule } from '../buildings/buildings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuildingLocation]),
    BuildingsModule,
  ],
  controllers: [BuildingLocationsController],
  providers: [BuildingLocationsService],
})
export class BuildingLocationsModule {}
