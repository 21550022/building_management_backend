import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { BuildingLocationsModule } from './modules/building-locations/building-locations.module';
import { TraceIdMiddleware } from './middlewares/trace-id/trace-id.middleware';
import { WinstonModule } from 'nest-winston';
import { loggerOption } from './config/logger.config';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { dataSourceOptions } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    WinstonModule.forRoot(loggerOption),
    BuildingsModule,
    BuildingLocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
