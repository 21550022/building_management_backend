import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateBuildingLocationDto {
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsNotEmpty()
  locationNumber: string;

  @IsNumber()
  area: number;

  @IsNumber()
  @IsOptional()
  parentLocationId: number;

  @IsNumber()
  @IsOptional()
  buildingId: number;
}
