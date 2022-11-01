import 'reflect-metadata';
import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { DatabaseInterface } from './contracts';
import { ContainerIoC } from '../../constants/index.js';
import { LoggerInterface } from '../../contracts/index.js';

@injectable()
export class DatabaseService implements DatabaseInterface {
  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface
  ) {}

  async connect(url: string): Promise<void> {
    this.logger.info('Connection to database...');
    await mongoose.connect(url);
    this.logger.info('Database connected');
  }

  async disconnect(): Promise<void> {
    return mongoose.disconnect();
  }
}
