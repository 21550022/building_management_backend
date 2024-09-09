import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UsersModule} from './modules/users/users.module';
import {BuildingsModule} from './modules/buildings/buildings.module';
import {BuildingLocationsModule} from './modules/building-locations/building-locations.module';
import {CategoriesModule} from './modules/categories/categories.module';
import {TraceIdMiddleware} from './middlewares/trace-id/trace-id.middleware';
import {WinstonModule} from 'nest-winston';
import {loggerOption} from './configs/logger.config';


const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
  synchronize: true,
  autoLoadEntities: true,
}

@Module({
  imports: [
    WinstonModule.forRoot(loggerOption),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    BuildingsModule,
    BuildingLocationsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TraceIdMiddleware)
      .forRoutes('*');
  }
}
