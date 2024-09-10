// import {registerAs} from '@nestjs/config';
// import {loadYamlConfig} from 'src/utils/loadYamlConfig';
import {configDotenv} from 'dotenv';

configDotenv();



// const appConfig = registerAs('app', () => {
//   const config = loadYamlConfig();
//   return config.app;
// });

// const databaseConfig = registerAs('database', () => {
//   const config = loadYamlConfig();
//   return config.database;
// });


// export default Object.assign(appConfig, databaseConfig);


export default () => ({
  app: {
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT, 10),
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  }
});