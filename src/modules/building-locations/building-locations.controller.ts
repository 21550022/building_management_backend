import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingLocationsService } from './building-locations.service';
import { CreateBuildingLocationDto } from './dto/create-building-location.dto';
import { UpdateBuildingLocationDto } from './dto/update-building-location.dto';

@Controller('building-locations')
export class BuildingLocationsController {
  constructor(private readonly buildingLocationsService: BuildingLocationsService) {}

  @Post()
  create(@Body() createBuildingLocationDto: CreateBuildingLocationDto) {
    return this.buildingLocationsService.create(createBuildingLocationDto);
  }

  @Get()
  findAll() {
    return this.buildingLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingLocationDto: UpdateBuildingLocationDto) {
    return this.buildingLocationsService.update(+id, updateBuildingLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingLocationsService.remove(+id);
  }
}
