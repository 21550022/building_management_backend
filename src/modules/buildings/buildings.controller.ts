import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpStatus, InternalServerErrorException, Req, NotFoundException} from '@nestjs/common';
import {CreateBuildingDto} from './dto/create-building.dto';
import {UpdateBuildingDto} from './dto/update-building.dto';
import {BuildingsService} from './buildings.service';
import {ApiResponseHandler} from 'src/common/response-handler';
import {CustomLoggerService} from 'src/common/services/custom-logger/custom-logger.service';
import {ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';


@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
    private readonly logger: CustomLoggerService,

  ) {}


  @ApiOperation({ summary: 'create new building' })
  @ApiBody({ required: true, type: CreateBuildingDto })
  @Post()
  async create(@Body() createBuildingDto: CreateBuildingDto, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.create(createBuildingDto);
      this.logger.log('Building created successfully');
      return ApiResponseHandler.created('Building created successfully', building);
    } catch (error) {
      this.logger.error('Failed to create building', { traceId });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create building'));
    }
  }

  @ApiOperation({ summary: 'get all buildings' })
  @Get()
  async findAll(@Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildings = await this.buildingsService.findAll();
      this.logger.log('Buildings retrieved successfully');
      return ApiResponseHandler.ok('Buildings retrieved successfully', buildings);
    } catch (error) {
      this.logger.error('Failed to retrieve buildings', { traceId });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve buildings'));
    }
  }

  @ApiOperation({ summary: 'get building by id' })
  @ApiParam({required: true, name: 'id', description: 'Building ID', example: 1 })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.findOne(id);
      this.logger.log('Buildings retrieved successfully');
      return ApiResponseHandler.ok('Building retrieved successfully', building);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building not found', { traceId, buildingId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to retrieve building', { traceId, buildingId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building'));
    }
  }

  @ApiOperation({ summary: 'update building by id' })
  @ApiBody({ required: true, type: UpdateBuildingDto })
  @ApiParam({ name: 'id', description: 'Building ID', example: 1 })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBuildingDto: UpdateBuildingDto, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.findOne(id);
      if(!building) {
        throw ApiResponseHandler.error(new NotFoundException('Building not found'));
      }
      await this.buildingsService.update(id, updateBuildingDto);
      this.logger.log('Building retrieved successfully');
      return ApiResponseHandler.ok('Building updated successfully');
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building not found', { traceId, buildingId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to retrieve building', { traceId, buildingId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update building'));
    }
  }

  @ApiOperation({ summary: 'delete building by id' })
  @ApiParam({ required: true, name: 'id', description: 'Building ID', example: 1 })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const ok = await this.buildingsService.findOne(id);
      this.logger.log('Building retrieved successfully');
      return ok;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building not found', { traceId, buildingId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to retrieve building', { traceId, buildingId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete building'));
    }
  }
}