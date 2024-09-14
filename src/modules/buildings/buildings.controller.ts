import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingsService } from './buildings.service';
import { ApiResponseHandler } from 'src/common/response-handler';
// import { CustomLoggerService } from 'src/common/services/custom-logger/custom-logger.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
    // private readonly logger: CustomLoggerService,
  ) {}

  @ApiOperation({ summary: 'create new building' })
  @ApiBody({ required: true, type: CreateBuildingDto })
  @Post()
  async create(
    @Body() createBuildingDto: CreateBuildingDto,
    @Req() req: Request,
  ) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.create(createBuildingDto);
      // this.logger.log('Building created successfully');
      return ApiResponseHandler.created(
        'Building created successfully',
        building,
      );
    } catch (error) {
      // this.logger.error(error, { traceId });
      throw error;
    }
  }

  @ApiOperation({ summary: 'get all buildings' })
  @Get()
  async findAll(@Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const buildings = await this.buildingsService.findAll();
      // this.logger.log('Buildings retrieved successfully');
      return ApiResponseHandler.ok(
        'Buildings retrieved successfully',
        buildings,
      );
    } catch (error) {
      // this.logger.error(error, { traceId });
      throw error;
    }
  }

  @ApiOperation({ summary: 'get building by id' })
  @ApiParam({
    required: true,
    name: 'id',
    description: 'Building ID',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      const building = await this.buildingsService.findOne(id);
      // this.logger.log('Buildings retrieved successfully');
      return ApiResponseHandler.ok('Building retrieved successfully', building);
    } catch (error) {
      // this.logger.error(error, {
      //   traceId,
      //   buildingId: id,
      // });
      throw error;
    }
  }

  @ApiOperation({ summary: 'update building by id' })
  @ApiBody({ required: true, type: UpdateBuildingDto })
  @ApiParam({ name: 'id', description: 'Building ID', example: 1 })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingDto: UpdateBuildingDto,
    @Req() req: Request,
  ) {
    const traceId = req.headers['x-trace-id'];
    try {
      // const building = await this.buildingsService.findOne(id);
      // if (!building) {
      //   throw ApiResponseHandler.error(
      //     new NotFoundException('Building not found'),
      //   );
      // }
      const ok = await this.buildingsService.update(id, updateBuildingDto);

      // this.logger.log('Building retrieved successfully');
      // return ApiResponseHandler.ok('Building updated successfully');
    } catch (error) {
      // this.logger.error(error, {
      //   traceId,
      //   buildingId: id,
      // });

      throw error;
    }
  }

  @ApiOperation({ summary: 'delete building by id' })
  @ApiParam({
    required: true,
    name: 'id',
    description: 'Building ID',
    example: 1,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const traceId = req.headers['x-trace-id'];
    try {
      await this.buildingsService.remove(id);

      // this.logger.log('Building retrieved successfully');
    } catch (error) {
      // this.logger.error(error, {
      //   traceId,
      //   buildingId: id,
      // });
      throw error;
    }
  }
}
