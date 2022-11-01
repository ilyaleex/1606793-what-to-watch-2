import dayjs from 'dayjs';
import { MockData, GeneratorInterface } from './contracts/index.js';
import { WeekDay } from './constants/index.js';
import {
  generateRandomValue,
  getRandomElement,
  getRandomElements,
} from './utils/index.js';

export class MockGenerator implements GeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  generate(): string {
    return [
      getRandomElement(this.mockData.names),
      getRandomElement(this.mockData.descriptions),
      dayjs()
        .subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day')
        .toISOString(),
      getRandomElement(this.mockData.genres),
      generateRandomValue(1995, 2005),
      getRandomElement(this.mockData.ratings),
      getRandomElement(this.mockData.videos),
      getRandomElement(this.mockData.previewVideos),
      getRandomElements(this.mockData.actors).join(';'),
      getRandomElement(this.mockData.directors),
      generateRandomValue(120, 196),
      generateRandomValue(0, 0),
      getRandomElement(this.mockData.users),
      getRandomElement(this.mockData.emails),
      getRandomElement(this.mockData.passwords),
      getRandomElement(this.mockData.avatars),
      getRandomElement(this.mockData.posters),
      getRandomElement(this.mockData.backgroundUrl),
      getRandomElement(this.mockData.backgroundColor),
    ].join('\t');
  }
}
