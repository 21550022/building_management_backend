import {Injectable} from '@nestjs/common';
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
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { parentCategoryId: parentId } = createCategoryDto
      const category = this.categoryRepository.create(createCategoryDto)

      if(parentId) {
        const parent = await this.categoryRepository.findOneBy({ id: parentId })
        if(!parent) {
          throw new Error('Parent category not found')
        }
        category.parent = parent
      }

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
      const category = this.categoryRepository.create(updateCategoryDto)

      if(parentId) {
        const parent = await this.categoryRepository.findOneBy({ id: parentId })
        if(!parent) {
          throw new Error('Parent category not found')
        }
        category.parent = parent
      }

      return await this.categoryRepository.update(id, category)
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
  }
}
