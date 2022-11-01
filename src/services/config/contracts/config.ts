import { Schema } from './index.js';

interface ConfigInterface {
  get<T extends keyof Schema>(key: T): Schema[T];
  getFullSchema(): Schema;
}

export default ConfigInterface;
