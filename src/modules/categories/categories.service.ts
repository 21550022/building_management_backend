import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { parentCategoryId: parentId } = createCategoryDto
      const category = this.categoryRepository.create(createCategoryDto)

      const trees = await this.categoryRepository.findTrees()
      if (trees.length === 0) {
        return await this.categoryRepository.save(category)
      }
      if(!parentId) {
        const trees = await this.categoryRepository.findTrees()
        trees.push(category)
        return await this.categoryRepository.save(trees)
      }

      const parent = parentId ? await this.categoryRepository.findOneBy({ id: parentId }) : null
      if (!parent) {
        throw new Error('Parent category not found')
      }
      category.parent = parent
      return await this.categoryRepository.save(category)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    return await this.categoryRepository.find({ relations: ['children', 'parent'] });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id }, relations: ['children', 'parent'] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const { parentCategoryId: parentId } = updateCategoryDto
    const parent = parentId ? await this.categoryRepository.findOneBy({id: parentId}) : null
    if(!parent) {
      throw new Error('Parent category not found')
    }
    const category = this.categoryRepository.create(updateCategoryDto)
    category.parent = parent
    return await this.categoryRepository.update(id, category)
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
  }
}
