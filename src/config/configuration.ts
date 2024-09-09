import {registerAs} from '@nestjs/config';
import {loadYamlConfig} from 'src/utils/loadYamlConfig';


const appConfig = registerAs('app', () => {
  const config = loadYamlConfig();
  return config.app;
});

const databaseConfig = registerAs('database', () => {
  const config = loadYamlConfig();
  return config.database;
});


export default Object.assign(appConfig, databaseConfig);