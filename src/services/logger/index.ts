import { injectable } from 'inversify';
import pino, { Logger as PinoLogger } from 'pino';
import { LoggerInterface } from '../../contracts/index.js';

@injectable()
export class LoggerService implements LoggerInterface {
  private logger!: PinoLogger;

  constructor() {
    this.logger = pino();
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
