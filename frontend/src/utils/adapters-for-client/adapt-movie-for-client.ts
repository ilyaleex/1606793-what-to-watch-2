import { Film } from '../../types/film.js';
import { FilmDetailsResponse } from '../../dto/index.js';

export const adaptMovieForClient = (data: FilmDetailsResponse): Film => ({
  ...data,
  posterImage: data.poster,
  backgroundImage: data.backgroundUrl,
  videoLink: data.video,
  previewVideoLink: data.previewVideo,
  starring: data.actors,
  runTime: data.duration,
  released: data.releaseDate,
  isFavorite: data.isFavorite,
  user: {
    ...data.user,
    avatarUrl: data.user.avatar,
    token: '',
  },
});
