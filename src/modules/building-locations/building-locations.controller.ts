import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { CreateBuildingLocationDto } from './dto/create-building-location.dto';
import { UpdateBuildingLocationDto } from './dto/update-building-location.dto';
import { BuildingLocationsService } from './building-locations.service';
import { ApiResponseHandler } from 'src/common/response-handler';
// import { CustomLoggerService } from 'src/common/services/custom-logger/custom-logger.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('buildings locations')
@Controller('building-locations')
export class BuildingLocationsController {
  constructor(
    private readonly buildingLocationsService: BuildingLocationsService,
    // private readonly logger: CustomLoggerService,
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
      const buildingLocation = await this.buildingLocationsService.create(createBuildingLocationDto);
      // this.logger.log('Building location created successfully');
      return ApiResponseHandler.created('Building location created successfully');
    } catch (error) {

      // this.logger.error(error?.response, { traceId });
      throw error;
    }
  }
  @ApiOperation({ summary: 'get all building locations' })
  @Get()
  async findAll(@Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildingLocations = await this.buildingLocationsService.findAll();
      // this.logger.log('Building locations retrieved successfully');
      return ApiResponseHandler.ok('Building locations retrieved successfully', buildingLocations);
    } catch (error) {
      // this.logger.error('Failed to retrieve building locations', { traceId });
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
      // this.logger.log('Building location retrieved successfully');
      return ApiResponseHandler.ok('Building location retrieved successfully', buildingLocation);
    } catch (error) {
      console.log({ error });

      // if (error.status === HttpStatus.NOT_FOUND) {
      //   this.logger.error('Building location not found', {
      //     traceId,
      //     buildingLocationId: id,
      //   });
      //   throw ApiResponseHandler.error(error);
      // }
      // this.logger.error('Failed to retrieve building location', {
      //   traceId,
      //   buildingLocationId: id,
      // });
      // throw ApiResponseHandler.error(
      //   new InternalServerErrorException(
      //     'Failed to retrieve building location',
      //   ),
      // );
      // this.logger.error(error, { traceId });
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
      // this.logger.log('Building location updated successfully');
      return ApiResponseHandler.ok('Building location updated successfully');
    } catch (error) {
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
      // this.logger.log('Building location deleted successfully');
      return ApiResponseHandler.ok('Building location deleted successfully');
    } catch (error) {
      throw error;
    }
  }
}
