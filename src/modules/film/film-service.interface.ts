import {DocumentType} from '@typegoose/typegoose';
import CreateFilmDto from './dto/create-film.dto.js';
import {FilmEntity} from './film.entity.js';
import UpdateFilmDto from './dto/update-film.dto.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  findById(FilmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  findByGenreId(genreId: string): Promise<DocumentType<FilmEntity>[]>;
  findDetails(filmId: string): Promise<DocumentType<FilmEntity>[]>;
  findPromo(): Promise<DocumentType<FilmEntity> | null>;
  findWatchlist(): Promise<DocumentType<FilmEntity>[]>;
  findAndChangeFavoriteStatus(filmId: string, status: 0 | 1): Promise<DocumentType<FilmEntity> | null>;
}

