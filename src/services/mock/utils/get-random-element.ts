import { generateRandomValue } from './index.js';

const getRandomElement = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];

export default getRandomElement;
