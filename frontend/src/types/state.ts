import { store } from '../store/index';
import { Film } from './film.js';
import { Review } from './review.js';
import { User } from './user.js';
import { AuthorizationStatus } from '../const';

export type FilmsState = {
  films: Film[];
  isLoading: boolean;
};

export type GenreState = {
  activeGenre: string;
  filmsByGenre: Film[];
  isLoading: boolean;
};

export type FilmState = {
  activeFilm: Film | null;
  isLoading: boolean;
};

export type SimilarFilmsState = {
  similarFilms: Film[];
  isLoading: boolean;
};

export type FavoriteFilmsState = {
  favoriteFilms: Film[];
  isLoading: boolean;
};

export type PromoState = {
  promoFilm: Film | null;
  isLoading: boolean;
};

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
