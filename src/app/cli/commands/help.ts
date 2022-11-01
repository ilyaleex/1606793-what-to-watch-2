import { CliCommandInterface } from '../contracts';

export default class HelpCommand implements CliCommandInterface {
  readonly name = '--help';

  async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
        `);
  }
}
