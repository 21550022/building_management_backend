import {WinstonModuleOptions} from 'nest-winston';
import {format, transports} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import {dataSourceOptions} from './database.config';
import DatabaseStream from 'src/helpers/app-log/database-stream';

const logFilePath = './logs/server-%DATE%.log';
const errorLogFilePath = './logs/error-%DATE%.log';
const logMaxSize = '128m';
const logMaxCount = '14d';

const formatTimestamp = format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' })

const customFormat = format.printf(({ timestamp, level, message, ...meta }) => {
  const metaString = JSON.stringify(meta);
  return `${timestamp}\t${level.toUpperCase()}\t${message}\t${metaString}`;
});


export const loggerOption: WinstonModuleOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    customFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        formatTimestamp,
      ),
      level: 'info'
    }),
    new DailyRotateFile({
      filename: logFilePath,
      datePattern: 'DD-MM-YYYY',
      maxSize: logMaxSize,
      maxFiles: logMaxCount,
      format: format.combine(
        formatTimestamp,
        customFormat,
      ),
      level: 'info'
    }),
    new DailyRotateFile({
      filename: errorLogFilePath,
      datePattern: 'DD-MM-YYYY',
      maxSize: logMaxSize,
      maxFiles: logMaxCount,
      format: format.combine(
        formatTimestamp,
        customFormat,
      ),
      level: 'error'
    }),
    new transports.Stream({
      stream: new DatabaseStream(dataSourceOptions),
    })
  ]
}