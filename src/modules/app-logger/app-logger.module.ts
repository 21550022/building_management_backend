import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { AppLoggerController } from './app-logger.controller';

@Global()
@Module({
  controllers: [],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
