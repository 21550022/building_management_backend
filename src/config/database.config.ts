import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from './configuration';
import { DataSource } from 'typeorm';

const config = configuration();

export const datasource = new DataSource({
  type: config.database.type as any,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

export const dataSourceOptions: TypeOrmModuleOptions = {
  ...datasource.options,
  autoLoadEntities: true,
};
