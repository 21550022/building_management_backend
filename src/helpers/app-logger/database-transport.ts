import * as TransportStream from 'winston-transport';
import { Repository } from 'typeorm';
import { AppLogger } from 'src/modules/app-logger/entities/app-logger.entity';

export class DatabaseTransport extends TransportStream {
  private logRepository: Repository<AppLogger>;

  constructor(logRepository: Repository<AppLogger>) {
    super();
    this.logRepository = logRepository;
  }

  async log(info: any, callback: () => void) {
    const { level, context, message, timestamp, ...meta } = info;

    try {
      await this.logRepository.save({
        level,
        context,
        message,
        meta: JSON.stringify(meta) == '{}' ? null : JSON.stringify(meta),
      });
    } catch (error) {
      console.log('Error when saving log to database', error);
      throw error;
    }
    callback();
  }
}
