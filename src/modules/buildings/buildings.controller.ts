import {Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpStatus, InternalServerErrorException} from '@nestjs/common';
import {CreateBuildingDto} from './dto/create-building.dto';
import {UpdateBuildingDto} from './dto/update-building.dto';
import {BuildingsService} from './buildings.service';
import {ApiResponseHandler} from 'src/common/response-handler';


@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  async create(@Body() createBuildingDto: CreateBuildingDto) {
    try {
      const building = await this.buildingsService.create(createBuildingDto);
      return ApiResponseHandler.created('Building created successfully', building);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create building'));
    }
  }

  @Get()
  async findAll() {
    try {
      const buildings = await this.buildingsService.findAll();
      return ApiResponseHandler.ok('Buildings retrieved successfully', buildings);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve buildings'));
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const building = await this.buildingsService.findOne(id);
      return ApiResponseHandler.ok('Building retrieved successfully', building);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve building'));
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBuildingDto: UpdateBuildingDto) {
    try {
      return await this.buildingsService.update(id, updateBuildingDto);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update building'));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.buildingsService.remove(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete building'));
    }
  }
}