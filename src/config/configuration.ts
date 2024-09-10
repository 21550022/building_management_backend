import { configDotenv } from 'dotenv';

configDotenv();

export default () => ({
  app: {
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT),
  },
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
