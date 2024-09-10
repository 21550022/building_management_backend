import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { CustomLoggerService } from 'src/common/services/custom-logger/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  controllers: [BuildingsController],
  providers: [BuildingsService, CustomLoggerService],
})
export class BuildingsModule {}
