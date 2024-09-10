import { Writable } from 'stream';
import { DataSource, LessThan, Repository } from 'typeorm';
import { AppLog } from './app-log.entity';

class DatabaseStream extends Writable {
  private applogRepository: Repository<AppLog>;
  private dataSource: DataSource;
  maxRecords: number;

  constructor(options: any, maxRecords: number = 1000) {
    super({ objectMode: true });
    this.maxRecords = maxRecords;
    this.initDatabase(options);
  }

  private async initDatabase(options: any) {
    try {
      this.dataSource = new DataSource(options);

      await this.dataSource.initialize();
      this.applogRepository = this.dataSource.getRepository(AppLog);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async _write(
    info: any,
    encoding: string,
    callback: (error?: Error | null) => void,
  ) {
    try {
      await this.removeLimitedRecord();
      const { level, message, timestamp, ...meta } = info;
      const log = this.applogRepository.create({
        level,
        message,
        timestamp,
        meta: JSON.stringify(meta) == '{}' ? null : JSON.stringify(meta),
      });
      await this.applogRepository.save(log);
      await this.deleteOldLogs();
      callback();
    } catch (error) {
      console.error('Error logging to database:', error);
      callback(error);
    }
  }

  private async deleteOldLogs() {
    const retentionPeriod = 30;
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - retentionPeriod);

    try {
      await this.applogRepository.delete({
        timestamp: LessThan(dateThreshold),
      });
    } catch (error) {
      console.error('Error deleting old logs:', error);
    }
  }

  private async removeLimitedRecord() {
    try {
      const recordCount = await this.applogRepository.count();
      if (recordCount >= this.maxRecords) {
        const oldestRecord = await this.applogRepository.find({
          order: { timestamp: 'ASC' },
          take: 1,
        });
        if (oldestRecord.length > 0) {
          await this.applogRepository.remove(oldestRecord);
        }
      }
    } catch (error) {
      console.error('Error ensuring record limit:', error);
    }
  }
}

export default DatabaseStream;
