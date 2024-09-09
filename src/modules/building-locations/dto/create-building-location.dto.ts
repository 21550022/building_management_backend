import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateBuildingLocationDto {
  @ApiProperty({ description: 'Name of the location' })
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @ApiProperty({ description: 'Location number' })
  @IsString()
  @IsNotEmpty()
  locationNumber: string;

  @ApiProperty({ description: 'Location area' })
  @IsNumber()
  area: number;

  @ApiPropertyOptional({ description: 'ID of the parent location' })
  @IsNumber()
  @IsOptional()
  parentLocationId: number;

  @ApiPropertyOptional({ description: 'ID of the building' })
  @IsNumber()
  @IsOptional()
  buildingId: number;
}
