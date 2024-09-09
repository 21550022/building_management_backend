import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {AppLog} from 'src/helpers/app-log/app-log.entity';
import {loadYamlConfig} from 'src/utils/loadYamlConfig';


const config = loadYamlConfig();

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [AppLog],
  synchronize: true,
  autoLoadEntities: true,
}