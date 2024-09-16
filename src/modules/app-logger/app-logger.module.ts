import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { AppLoggerController } from './app-logger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from './entities/app-logger.entity';

@Global()
@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([AppLogger]),
  ],
  providers: [
    AppLoggerService
  ],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
