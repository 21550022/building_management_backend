import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { CreateAppLoggerDto } from './dto/create-app-logger.dto';
import { UpdateAppLoggerDto } from './dto/update-app-logger.dto';

@Controller('app-logger')
export class AppLoggerController {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  @Post()
  create(@Body() createAppLoggerDto: CreateAppLoggerDto) {
    return this.appLoggerService.create(createAppLoggerDto);
  }

  @Get()
  findAll() {
    return this.appLoggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appLoggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppLoggerDto: UpdateAppLoggerDto) {
    return this.appLoggerService.update(+id, updateAppLoggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appLoggerService.remove(+id);
  }
}
