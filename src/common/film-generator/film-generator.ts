import {MockData} from '../../types/mock-data.type.js';
import {FilmGeneratorInterface} from './film-generator.interface.js';
import {generateRandomValue, getRandomItem} from '../../utils/random.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RELEASE_YEAR = 1950;
const MAX_RELEASE_YEAR = 2010;
const MIN_RATING = 0;
const MAX_RATING = 10;
const MIN_RUNTIME = 60;
const MAX_RUNTIME = 100;
const MIN_COMMENT_AMOUNT = 0;
const MAX_COMMENT_AMOUNT = 10;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const posted =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem<string>(this.mockData.genres);
    const released = generateRandomValue(MIN_RELEASE_YEAR, MAX_RELEASE_YEAR);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const previewVideoLink = getRandomItem<string>(this.mockData.videoLinks);
    const videoLink = getRandomItem<string>(this.mockData.videoLinks);
    const starring = getRandomItem<string>(this.mockData.starrings);
    const director = getRandomItem<string>(this.mockData.directors);
    const runTime = generateRandomValue(MIN_RUNTIME, MAX_RUNTIME);
    const commentsAmount = generateRandomValue(MIN_COMMENT_AMOUNT, MAX_COMMENT_AMOUNT);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);

    return [
      name, description, posted, genre, released, rating, previewVideoLink, videoLink,
      starring, director, runTime, commentsAmount, posterImage, backgroundImage, backgroundColor, userName, email, avatarUrl, password
    ].join('\t');
  }
}
