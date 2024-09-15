import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { AppLoggerController } from './app-logger.controller';

@Global()
@Module({
  controllers: [AppLoggerController],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
