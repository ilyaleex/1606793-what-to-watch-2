import {Film} from '../types/types.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    name,
    description,
    posted,
    genre,
    released,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    commentsAmount,
    posterImage,
    backgroundImage,
    backgroundColor,
    userName,
    email,
    avatarUrl,
    password
  ] = tokens;

  return {
    name,
    description,
    posted: new Date(posted),
    genre,
    released: Number.parseInt(released, 10),
    rating: Number.parseFloat(rating),
    previewVideoLink,
    videoLink,
    starring: starring.split(','),
    director,
    runTime: Number.parseInt(runTime, 10),
    commentsAmount: Number.parseInt(commentsAmount, 10),
    posterImage,
    backgroundImage,
    backgroundColor,
    user: {userName, email, avatarUrl, password},
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
