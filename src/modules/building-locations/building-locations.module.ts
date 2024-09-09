import {Module} from '@nestjs/common';
import {BuildingLocationsService} from './building-locations.service';
import {BuildingLocationsController} from './building-locations.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BuildingLocation} from './entities/building-location.entity';
import {Building} from '../buildings/entities/building.entity';
import {CustomLoggerService} from 'src/common/services/custom-logger/custom-logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuildingLocation, Building]),
  ],
  controllers: [BuildingLocationsController],
  providers: [BuildingLocationsService, CustomLoggerService],
})
export class BuildingLocationsModule {}
