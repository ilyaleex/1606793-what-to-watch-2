import { injectable, inject } from 'inversify';
import { config } from 'dotenv';
import { ConfigInterface } from './contracts/index.js';
import { LoggerInterface } from '../../contracts/index.js';
import { Schema } from './contracts/index.js';
import { configSchema } from './schema.js';
import { ContainerIoC } from '../../constants/index.js';

@injectable()
export class ConfigService implements ConfigInterface {
  private config: Schema;

  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        'Cannot read .env file. Perhaps the file does not exists.'
      );
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info(JSON.stringify(this.config));
  }

  get<T extends keyof Schema>(key: T): Schema[T] {
    return this.config[key];
  }

  getFullSchema(): Schema {
    return this.config;
  }
}
