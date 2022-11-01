import { NewFilm } from '../../types/new-film';
import { CreateFilmDto } from '../../dto/index.js';

export const adaptMovieToServer = (movie: NewFilm): CreateFilmDto => ({
  ...movie,
  releaseDate: movie.released,
  video: movie.videoLink,
  previewVideo: movie.previewVideoLink,
  actors: movie.starring,
  duration: movie.runTime,
  poster: movie.posterImage,
  backgroundUrl: movie.backgroundImage,
  published: new Date().toISOString(),
});
