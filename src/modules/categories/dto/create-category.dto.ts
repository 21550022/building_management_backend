import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  parentCategoryId?: number;
}