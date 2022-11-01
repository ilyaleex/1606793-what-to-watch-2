import { User } from './';

export type FilmBase = {
  name: string;
  description: string;
  published: string;
  genre: string;
  releaseDate: number;
  video: string;
  previewVideo: string;
  actors: string[];
  director: string;
  duration: number;
  user: User;
  poster: string;
  backgroundUrl: string;
  backgroundColor: string;
};
