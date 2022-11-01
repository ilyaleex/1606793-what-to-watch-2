import { createReadStream } from 'fs';
import EventEmitter from 'events';
import { FileReaderInterface } from './contracts/index.js';

export class FileReaderService
  extends EventEmitter
  implements FileReaderInterface
{
  private static readonly HIGH_WATER_MARK = 16384;

  constructor(public filename: string) {
    super();
  }

  async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: FileReaderService.HIGH_WATER_MARK,
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;
        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
