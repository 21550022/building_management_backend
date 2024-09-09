import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {AppLog} from 'src/helpers/app-log/app-log.entity';

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
  entities: [AppLog],
  synchronize: true,
  autoLoadEntities: true,
}
