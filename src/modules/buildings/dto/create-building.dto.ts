import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty({ description: 'Name of the building' })
  @IsString()
  @IsNotEmpty()
  name: string;
}