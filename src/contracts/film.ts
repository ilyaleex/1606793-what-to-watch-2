import { FilmBase } from './';

export type Film = FilmBase & {
  rating: number;
  commentsCount: number;
};
