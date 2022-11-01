interface CliCommandInterface {
  readonly name: string;
  execute(...parameters: string[]): void;
}

export default CliCommandInterface;
