import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {FilmEntity} from './film.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import CreateFilmDto from './dto/create-film.dto.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {FilmServiceInterface} from './film-service.interface.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DEFAULT_FILM_COUNT} from './film.const.js';
import {Types} from 'mongoose';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userId', 'comments'])
      .exec();
  }

  public async find(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .populate(['userId', 'comments'])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId', 'comments'])
      .exec();
  }

  public async findByGenreId(genreId: string): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({genreId})
      .sort({postDate: 'descending'})
      .limit(DEFAULT_FILM_COUNT)
      .populate(['userId', 'comments'])
      .exec();
  }

  public async findDetails(filmId: string): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .aggregate([
        {$match:{ _id: new Types.ObjectId(filmId)}},
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            pipeline: [
              { $project: { userName: 1, email: 1, avatarPath: 1, password: 1}}
            ],
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            id: { $toString: '$_id'}, commentsCount: { $size: '$comments'}, rating: { $avg: '$comments.rating'}
          }
        },
        { $unset: 'comments' },
        { $sort: { releaseYear: -1 } },
      ]).exec();
  }

  public async findPromo(): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({}).sort({ releaseYear: -1 }).exec();
  }

  public async findWatchlist(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find({isFavorite: true}).exec();
  }

  public async findAndChangeFavoriteStatus(filmId: string, status: 0 | 1): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmId, {isFavorite: status}, {new: true}).exec();
  }

  public async exists(filmId: string): Promise<boolean> {
    return (await this.filmModel.exists({_id: filmId})) !== null;
  }
}
