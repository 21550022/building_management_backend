import { PartialType } from '@nestjs/swagger';
import { CreateAppLoggerDto } from './create-app-logger.dto';

export class UpdateAppLoggerDto extends PartialType(CreateAppLoggerDto) {}
