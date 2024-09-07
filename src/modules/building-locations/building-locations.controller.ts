import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpStatus, InternalServerErrorException} from '@nestjs/common';
import {CreateBuildingLocationDto} from './dto/create-building-location.dto';
import {UpdateBuildingLocationDto} from './dto/update-building-location.dto';
import {BuildingLocationsService} from './building-locations.service';
import {ApiResponseHandler} from 'src/common/response-handler';

@Controller('building-locations')
export class BuildingLocationsController {
  constructor(private readonly buildingLocationsService: BuildingLocationsService) {}

  @Post()
  async create(@Body() createBuildingLocationDto: CreateBuildingLocationDto) {
    try {
      const buildingLocation = await this.buildingLocationsService.create(createBuildingLocationDto);
      return ApiResponseHandler.created('Building location created successfully', buildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create building location'));
    }
  }

  @Get()
  async findAll() {
    try {
      const buildingLocations = await this.buildingLocationsService.findAll();
      return ApiResponseHandler.ok('Building locations retrieved successfully', buildingLocations);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building locations'));
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const buildingLocation = await this.buildingLocationsService.findOne(id);
      return ApiResponseHandler.ok('Building location retrieved successfully', buildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building location'));
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBuildingLocationDto: UpdateBuildingLocationDto) {
    try {
      const updatedBuildingLocation = await this.buildingLocationsService.update(id, updateBuildingLocationDto);
      return ApiResponseHandler.ok('Building location updated successfully', updatedBuildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update building location'));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.buildingLocationsService.remove(id);
      return ApiResponseHandler.ok('Building location deleted successfully', result);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete building location'));
    }
  }
}