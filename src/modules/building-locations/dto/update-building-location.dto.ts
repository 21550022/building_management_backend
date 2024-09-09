import { PartialType } from '@nestjs/swagger';
import { CreateBuildingLocationDto } from './create-building-location.dto';

export class UpdateBuildingLocationDto extends PartialType(CreateBuildingLocationDto) {}
