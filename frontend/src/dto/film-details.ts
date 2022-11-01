import { UserResponse } from './user.js';

export class FilmDetailsResponse {
  id!: string;
  name!: string;
  description!: string;
  published!: string;
  genre!: string;
  releaseDate!: number;
  video!: string;
  previewVideo!: string;
  commentsCount!: number;
  rating!: number;
  actors!: string[];
  isFavorite!: boolean;
  director!: string;
  duration!: number;
  user!: UserResponse;
  poster!: string;
  backgroundUrl!: string;
  backgroundColor!: string;
}
