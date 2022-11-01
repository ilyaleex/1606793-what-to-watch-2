import { createWriteStream, WriteStream } from 'fs';
import { FileWriterInterface } from './contracts/index.js';

export class FileWriterService implements FileWriterInterface {
  private static readonly HIGH_WATER_MARK = 16384;

  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: FileWriterService.HIGH_WATER_MARK,
      autoClose: true,
    });
  }

  async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
