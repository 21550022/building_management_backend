import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpStatus, InternalServerErrorException, Req} from '@nestjs/common';
import {CreateBuildingDto} from './dto/create-building.dto';
import {UpdateBuildingDto} from './dto/update-building.dto';
import {BuildingsService} from './buildings.service';
import {ApiResponseHandler} from 'src/common/response-handler';
import {CustomLoggerService} from 'src/common/services/custom-logger/custom-logger.service';



@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
    private readonly logger: CustomLoggerService,

  ) {}

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

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBuildingDto: UpdateBuildingDto, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.findOne(id);
      this.logger.log('Building retrieved successfully');
      return building;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        this.logger.error('Building not found', { traceId, buildingId: id });
        throw ApiResponseHandler.error(error);
      }
      this.logger.error('Failed to retrieve building', { traceId, buildingId: id });
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update building'));
    }
  }

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