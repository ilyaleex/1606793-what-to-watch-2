import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {CommentEntity} from './comment.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DEFAULT_COMMENT_COUNT} from './comment.const.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(filmId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    dto.filmId = filmId;
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return comment.populate(['userId']);
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({filmId})
      .sort({publishDate: 'descending'})
      .limit(DEFAULT_COMMENT_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async findAllByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({filmId})
      .exec();
  }

  public async deleteAllByFilmId(filmId: string): Promise<void> {
    this.commentModel
      .deleteMany({filmId})
      .exec();
  }
}
