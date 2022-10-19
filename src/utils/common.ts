import {Film} from '../types/types.js';
import crypto from 'crypto';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    name,
    description,
    postDate,
    genre,
    releaseYear,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    commentsCount,
    posterImage,
    bgImage,
    bgColor,
    userName,
    email,
    avatarUrl,
    password
  ] = tokens;

  return {
    name,
    description,
    postDate: new Date(postDate),
    genre,
    releaseYear: Number.parseInt(releaseYear, 10),
    rating: Number.parseFloat(rating),
    previewVideoLink,
    videoLink,
    starring: starring.split(','),
    director,
    runTime: Number.parseInt(runTime, 10),
    commentsCount: Number.parseInt(commentsCount, 10),
    posterImage,
    bgImage,
    bgColor,
    user: {userName, email, avatarUrl, password},
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
