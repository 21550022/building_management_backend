import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingLocationDto } from './create-building-location.dto';

export class UpdateBuildingLocationDto extends PartialType(CreateBuildingLocationDto) {}
