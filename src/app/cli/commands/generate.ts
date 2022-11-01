import got from 'got';
import { CliCommandInterface } from '../contracts';
import { MockData } from '../../../services/mock/contracts/index.js';
import { MockGenerator } from '../../../services/mock/index.js';
import { FileWriterService } from '../../../services/file-writer/index.js';

export default class GenerateCommand implements CliCommandInterface {
  readonly name = '--generate';

  private data!: MockData;

  async execute(...params: string[]) {
    const [count, filepath, url] = params;
    const countNumber = parseInt(count, 10);

    try {
      this.data = await got.get(url).json();
    } catch {
      console.log(`Cannot load data from url ${url}`);
    }

    const generator = new MockGenerator(this.data);
    const fileWriter = new FileWriterService(filepath);

    for (let i = 0; i < countNumber; i++) {
      await fileWriter.write(generator.generate());
    }
  }
}
