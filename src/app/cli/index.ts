import { CliCommandInterface } from './contracts/index.js';

type ParsedCommand = {
  [key: string]: string[];
};

export class CLI {
  private commands: { [propertyName: string]: CliCommandInterface } = {};

  private defaultCommand = '--help';

  registerCommands(commandList: CliCommandInterface[]) {
    this.commands = commandList.reduce((acc, command) => {
      acc[command.name] = command;
      return acc;
    }, this.commands);
  }

  getCommand(command: string) {
    return this.commands[command] ?? this.commands[this.defaultCommand];
  }

  processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, argument) => {
      if (argument.startsWith('--')) {
        acc[argument] = [];
        command = argument;
      } else if (command && argument) {
        acc[command].push(argument);
      }
      return acc;
    }, parsedCommand);
  }
}
