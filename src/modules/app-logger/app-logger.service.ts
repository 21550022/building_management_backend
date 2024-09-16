import { ConsoleLogger, Injectable, Optional } from '@nestjs/common';
import { CreateAppLoggerDto } from './dto/create-app-logger.dto';
import { UpdateAppLoggerDto } from './dto/update-app-logger.dto';
import { WinstonModule } from 'nest-winston';
import { loggerOption } from 'src/config/logger.config';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from './entities/app-logger.entity';
import { Repository } from 'typeorm';
import { DatabaseTransport } from 'src/helpers/app-logger/database-transport';


@Injectable()
export class AppLoggerService extends ConsoleLogger {
  logger: any;
  constructor(
    @InjectRepository(AppLogger) private readonly applogRepository: Repository<AppLogger>,
    @Optional() protected context?: string,
    @Optional() protected options: { timestamp?: boolean } = {}
  ) {
    super(context, options);
    this.logger = WinstonModule.createLogger({
      ...loggerOption,
      transports: [
        ...(Array.isArray(loggerOption.transports) ? loggerOption.transports : [loggerOption.transports]),
        new DatabaseTransport(this.applogRepository),
      ],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, ...optionalParams: any[]): void {
    super.log(message, ...optionalParams);
    this.logger.log(message, this.context, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    super.error(message, ...optionalParams);
    this.logger.error(message, ...optionalParams);
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
