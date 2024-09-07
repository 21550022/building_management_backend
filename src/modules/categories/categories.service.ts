import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {TreeRepository} from 'typeorm';
import {Category} from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const {parentCategoryId, ...bodyRequest} = createCategoryDto;
    const category = this.categoryRepository.create({...bodyRequest});

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({where: {id: parentCategoryId}});
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async findAll() {
    return this.categoryRepository.findTrees();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({where: {id}, relations: ['parentCategory', 'childrenCategories']});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const {parentCategoryId, ...bodyRequest} = updateCategoryDto;
    const category = await this.categoryRepository.findOne({where: {id}});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({where: {id: parentCategoryId}});
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
      category.parent = parentCategory;
    }

    Object.assign(category, bodyRequest);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({where: {id}});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryRepository.delete(id);
  }
}