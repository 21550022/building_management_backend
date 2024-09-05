import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from "typeorm";
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { Building } from './modules/buildings/entities/building.entity';


const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
  entities: [User, Building],
  synchronize: true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
