import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpStatus, InternalServerErrorException, Req} from '@nestjs/common';
import {CreateBuildingLocationDto} from './dto/create-building-location.dto';
import {UpdateBuildingLocationDto} from './dto/update-building-location.dto';
import {BuildingLocationsService} from './building-locations.service';
import {ApiResponseHandler} from 'src/common/response-handler';
import {CustomLoggerService} from 'src/common/services/custom-logger/custom-logger.service';

@Controller('building-locations')
export class BuildingLocationsController {
  constructor(
    private readonly buildingLocationsService: BuildingLocationsService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Post()
  async create(@Body() createBuildingLocationDto: CreateBuildingLocationDto, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocation = await this.buildingLocationsService.create(createBuildingLocationDto);
      this.logger.log('Building location created successfully');
      return ApiResponseHandler.created('Building location created successfully', buildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building not found', { traceId });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to create building location', { traceId });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create building location'));
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocations = await this.buildingLocationsService.findAll();
      this.logger.log('Building locations retrieved successfully');
      return ApiResponseHandler.ok('Building locations retrieved successfully', buildingLocations);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building locations'));
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocation = await this.buildingLocationsService.findOne(id);
      this.logger.log('Building location retrieved successfully');
      return ApiResponseHandler.ok('Building location retrieved successfully', buildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building location not found', { traceId, buildingLocationId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to retrieve building location', { traceId, buildingLocationId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building location'));
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBuildingLocationDto: UpdateBuildingLocationDto, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const updatedBuildingLocation = await this.buildingLocationsService.update(id, updateBuildingLocationDto);
      this.logger.log('Building location updated successfully');
      return ApiResponseHandler.ok('Building location updated successfully', updatedBuildingLocation);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building location not found', { traceId, buildingLocationId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to update building location', { traceId, buildingLocationId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update building location'));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const ok = await this.buildingLocationsService.remove(id);
      this.logger.log('Building location deleted successfully');
      return ApiResponseHandler.ok('Building location deleted successfully', ok);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building location not found', { traceId, buildingLocationId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to delete building location', { traceId, buildingLocationId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete building location'));
    }
  }
}