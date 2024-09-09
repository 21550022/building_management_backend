import {Injectable, LoggerService, Logger} from '@nestjs/common';
import {WinstonModule} from 'nest-winston';
import {loggerOption} from 'src/config/logger.config';



@Injectable()
export class CustomLoggerService extends WinstonModule implements LoggerService {
  private readonly logger: LoggerService;

  constructor() {
    super();
    this.logger = WinstonModule.createLogger(loggerOption);
  }

  log(message: string, meta?: any) {
    this.logger.log(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  verbose(message: string, meta?: any) {
    this.logger.verbose(message, meta);
  }
}