import { WinstonModuleOptions } from 'nest-winston';
import { format } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';



const logFilePath = './logs/server-%DATE%.log';
const errorLogFilePath = './logs/error-%DATE%.log';
const logMaxSize = '128m';
const logMaxCount = '14d';

const formatTimestamp = format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss A' });

const nestLikeFormat = nestWinstonModuleUtilities.format.nestLike('MyApp', {
  colors: false,
  prettyPrint: true,
  processId: true,
  appName: true,
})

export const loggerOption: WinstonModuleOptions = {
  level: 'info',
  format: format.combine(
    formatTimestamp,
    format.ms(),
    nestLikeFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: logFilePath,
      datePattern: 'DD-MM-YYYY',
      maxSize: logMaxSize,
      maxFiles: logMaxCount,
      level: 'info',
    }),
    new DailyRotateFile({
      filename: errorLogFilePath,
      datePattern: 'DD-MM-YYYY',
      maxSize: logMaxSize,
      maxFiles: logMaxCount,
      level: 'error',
    }),
    // new transports.Stream({
    //   stream: new DatabaseStream(),
    // }),
  ],
};
