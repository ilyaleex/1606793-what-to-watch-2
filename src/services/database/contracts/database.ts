interface DatabaseInterface {
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
}

export default DatabaseInterface;
