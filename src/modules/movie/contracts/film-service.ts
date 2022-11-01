import { DocumentType } from '@typegoose/typegoose';
import { CreateFilmDto } from '../dto/index.js';
import { FilmEntity } from '../index.js';
import { Genre, EntityExistsInterface } from '../../../contracts/index.js';
import { Favorite } from '../constants/index.js';

interface FilmServiceInterface extends EntityExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  update(
    movieId: string,
    dto: Partial<CreateFilmDto>
  ): Promise<DocumentType<FilmEntity> | null>;
  delete(movieId: string): Promise<void>;
  show(limit: number): Promise<DocumentType<FilmEntity>[]>;
  getFilmDetails(movieId: string): Promise<DocumentType<FilmEntity>>;
  getListByGenre(
    genre: Genre,
    limit: number
  ): Promise<DocumentType<FilmEntity>[]>;
  getPromo(): Promise<DocumentType<FilmEntity> | null>;
  getFavorites(): Promise<DocumentType<FilmEntity>[]>;
  changeFavoriteStatus(
    movieId: string,
    status: Favorite
  ): Promise<DocumentType<FilmEntity> | null>;
  incrementCommentCount(
    movieId: string
  ): Promise<DocumentType<FilmEntity> | null>;
  getFilmByUserId(userId: string): Promise<DocumentType<FilmEntity> | null>;
}

export default FilmServiceInterface;
