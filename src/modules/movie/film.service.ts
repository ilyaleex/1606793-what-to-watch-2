import 'reflect-metadata';
import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerInterface } from '../../contracts/index.js';
import { FilmServiceInterface } from './contracts/index.js';
import { CreateFilmDto } from './dto/index.js';
import { FilmEntity } from './film.entity.js';
import { ContainerIoC } from '../../constants/index.js';
import { Genre } from '../../contracts/index.js';
import { Favorite } from './constants/index.js';

@injectable()
export class FilmService implements FilmServiceInterface {
  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface,
    @inject(ContainerIoC.FilmModel)
    private filmModel: types.ModelType<FilmEntity>
  ) {}

  async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const record = await this.filmModel.create(dto);

    this.logger.info('New film added to database');

    return record.populate(['userId']);
  }

  async update(
    movieId: string,
    dto: Partial<CreateFilmDto>
  ): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate({ _id: movieId }, dto, {
        new: true,
      })
      .populate(['userId']);
  }

  async delete(movieId: string): Promise<void> {
    await this.update(movieId, { deleted: true });
  }

  async show(limit: number): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({ deleted: false })
      .limit(limit)
      .populate(['userId']);
  }

  async getFilmDetails(
    movieId: string
  ): Promise<DocumentType<FilmEntity & { rating: number }>> {
    const ObjectId = mongoose.Types.ObjectId;
    const result = await this.filmModel.aggregate([
      { $match: { _id: new ObjectId(movieId) } },
      {
        $lookup: {
          from: 'comments',
          as: 'comments',
          let: { movie: '$_id' },
          pipeline: [{ $match: { $expr: { $eq: ['$movieId', '$$movie'] } } }],
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$userId' },
          pipeline: [{ $match: { $expr: { $eq: ['$$userId', '$_id'] } } }],
          as: 'userId',
        },
      },
      {
        $addFields: {
          commentsCount: { $size: '$comments' },
          rating: {
            $divide: [
              { $sum: '$comments.rating' },
              {
                $cond: {
                  if: {
                    $gt: [{ $size: '$comments' }, 0],
                  },
                  then: {
                    $size: '$comments',
                  },
                  else: 1,
                },
              },
            ],
          },
          id: movieId,
        },
      },
      { $unwind: '$userId' },
      { $unset: ['comments'] },
    ]);

    return result[0] ?? null;
  }

  async getListByGenre(
    genre: Genre,
    limit: number
  ): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel.find({ genre }).limit(limit).populate(['userId']);
  }

  async getFilmByUserId(
    userId: string
  ): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findOne({ userId });
  }

  async getPromo(): Promise<DocumentType<FilmEntity> | null> {
    const record = await this.filmModel.findOne({ isPromo: true });
    return record ? this.getFilmDetails(record.id) : null;
  }

  async getFavorites(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({ isFavorite: true, deleted: false })
      .populate(['userId']);
  }

  async changeFavoriteStatus(
    movieId: string,
    status: Favorite
  ): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(
        { _id: movieId },
        { isFavorite: status },
        {
          new: true,
        }
      )
      .populate(['userId']);
  }

  async incrementCommentCount(
    movieId: string
  ): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(movieId, {
      $inc: {
        commentsCount: 1,
      },
    });
  }

  async isExists(documentId: string): Promise<boolean> {
    return !!(await this.filmModel.exists({ _id: documentId, deleted: false }));
  }
}
