import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponseHandler } from 'src/common/response-handler';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoriesService.create(createCategoryDto);
      return ApiResponseHandler.created('Category created successfully', category);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create category'));
    }
  }

  @Get()
  async findAll() {
    try {
      const categories = await this.categoriesService.findAll();
      return ApiResponseHandler.ok('Categories retrieved successfully', categories);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve categories'));
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.findOne(+id);
      return ApiResponseHandler.ok('Category retrieved successfully', category);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve category'));
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoriesService.update(+id, updateCategoryDto);
      return ApiResponseHandler.ok('Category updated successfully', updatedCategory);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to update category'));
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.categoriesService.remove(+id);
      return ApiResponseHandler.ok('Category deleted successfully', result);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete category'));
    }
  }
}