import { ConsoleLogger, Injectable, Optional } from '@nestjs/common';
import { CreateAppLoggerDto } from './dto/create-app-logger.dto';
import { UpdateAppLoggerDto } from './dto/update-app-logger.dto';
import { WinstonModule } from 'nest-winston';
import { loggerOption } from 'src/config/logger.config';


@Injectable()
export class AppLoggerService extends ConsoleLogger {
  logger: any;
  constructor(
    @Optional() protected context?: string,
    @Optional() protected options: { timestamp?: boolean } = {}
  ) {
    super(context, options);
    this.logger = WinstonModule.createLogger(loggerOption);
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]): void {
    super.log(message, ...optionalParams);
    this.logger.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    super.error(message, ...optionalParams);
    this.logger.error(JSON.stringify(message), ...optionalParams);
  }

  create(createAppLoggerDto: CreateAppLoggerDto) {
    return 'This action adds a new appLogger';
  }

  findAll() {
    return `This action returns all appLogger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appLogger`;
  }

  update(id: number, updateAppLoggerDto: UpdateAppLoggerDto) {
    return `This action updates a #${id} appLogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} appLogger`;
  }
}
