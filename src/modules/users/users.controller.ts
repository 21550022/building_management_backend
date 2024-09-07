import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpStatus, InternalServerErrorException} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiResponseHandler} from 'src/common/response-handler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return ApiResponseHandler.ok('Users retrieved successfully', users);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve users'));
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(+id);
      return ApiResponseHandler.ok('User retrieved successfully', user);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to retrieve user'));
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return ApiResponseHandler.created('User created successfully', user);
    } catch (error) {
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to create user'));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.usersService.remove(id);
      return ApiResponseHandler.ok('User deleted successfully', result);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw ApiResponseHandler.error(error);
      }
      throw ApiResponseHandler.error(new InternalServerErrorException('Failed to delete user'));
    }
  }
}