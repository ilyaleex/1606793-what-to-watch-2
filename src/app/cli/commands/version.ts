import chalk from 'chalk';
import { readFileSync } from 'fs';
import { CliCommandInterface } from '../contracts';

export default class VersionCommand implements CliCommandInterface {
  readonly name = '--version';

  async execute() {
    const version = this.readVersion();
    console.log(chalk.red(version));
  }

  private readVersion(): string | null {
    try {
      const json = readFileSync('./package.json', 'utf-8');
      const { version } = JSON.parse(json);
      return version;
    } catch (e) {
      return null;
    }
  }
}
