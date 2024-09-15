import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe, Req
} from '@nestjs/common';
import { CreateBuildingLocationDto } from './dto/create-building-location.dto';
import { UpdateBuildingLocationDto } from './dto/update-building-location.dto';
import { BuildingLocationsService } from './building-locations.service';
import { ApiResponseHandler } from 'src/common/response-handler';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AppLoggerService } from '../app-logger/app-logger.service';

@ApiTags('buildings locations')
@Controller('building-locations')
export class BuildingLocationsController {
  constructor(
    private readonly buildingLocationsService: BuildingLocationsService,
    private readonly logger: AppLoggerService,
  ) {}

  @ApiOperation({ summary: 'create new building location' })
  @ApiBody({ required: true, type: CreateBuildingLocationDto })
  @Post()
  async create(
    @Body() createBuildingLocationDto: CreateBuildingLocationDto,
    @Req() req: Request,
  ) {
    const traceId = req.headers['x-trace-id'];
    try {
      await this.buildingLocationsService.create(createBuildingLocationDto);
      this.logger.log('Building location created successfully');
      return ApiResponseHandler.created('Building location created successfully');
    } catch (error) {
      this.logger.error(error, { traceId, context: BuildingLocationsController.name });
      throw error;
    }
  }
  @ApiOperation({ summary: 'get all building locations' })
  @Get()
  async findAll(@Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocations = await this.buildingLocationsService.findAll();
      this.logger.log('Building locations retrieved successfully');
      return ApiResponseHandler.ok('Building locations retrieved successfully', buildingLocations);
    } catch (error) {
      this.logger.error(error, { traceId, context: BuildingLocationsController.name });
      throw error;
    }
  }

  @ApiOperation({ summary: 'get building location by id' })
  @ApiParam({
    required: true,
    name: 'id',
    description: 'Building Location ID',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocation = await this.buildingLocationsService.findOne(id);
      this.logger.log('Building location retrieved successfully');
      return ApiResponseHandler.ok('Building location retrieved successfully', buildingLocation);
    } catch (error) {
      this.logger.error(error, { traceId, context: BuildingLocationsController.name });
      throw ApiResponseHandler.error(error);
    }
  }

  @ApiOperation({ summary: 'update building location' })
  @ApiParam({ name: 'id', description: 'Building Location ID', example: 1 })
  @ApiBody({ required: true, type: UpdateBuildingLocationDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingLocationDto: UpdateBuildingLocationDto,
    @Req() req: Request,
  ) {
    const traceId = req.headers['x-trace-id'];
    try {
      await this.buildingLocationsService.update( id, updateBuildingLocationDto );
      this.logger.log('Building location updated successfully');
      return ApiResponseHandler.ok('Building location updated successfully');
    } catch (error) {
      this.logger.error(error, { traceId, context: BuildingLocationsController.name });
      throw error;
    }
  }

  @ApiOperation({ summary: 'delete building location' })
  @ApiParam({ name: 'id', description: 'Building Location ID', example: 1 })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      await this.buildingLocationsService.remove(id);
      this.logger.log('Building location deleted successfully');
      return ApiResponseHandler.ok('Building location deleted successfully');
    } catch (error) {
      this.logger.error(error, { traceId, context: BuildingLocationsController.name });
      throw error;
    }
  }
}
