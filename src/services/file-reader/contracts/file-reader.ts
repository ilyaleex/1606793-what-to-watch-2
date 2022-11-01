interface FileReaderInterface {
  readonly filename: string;
  read(): void;
}

export default FileReaderInterface;
