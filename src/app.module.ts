import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule,TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UsersModule} from './modules/users/users.module';
import {BuildingsModule} from './modules/buildings/buildings.module';
import {BuildingLocationsModule} from './modules/building-locations/building-locations.module';
import {CategoriesModule} from './modules/categories/categories.module';


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
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    BuildingsModule,
    BuildingLocationsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
