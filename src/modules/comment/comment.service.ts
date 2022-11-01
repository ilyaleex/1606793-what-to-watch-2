import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerInterface } from '../../contracts/index.js';
import { CommentServiceInterface } from './contracts/comment-service.js';
import { ContainerIoC, SortType } from '../../constants/index.js';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto/index.js';

@injectable()
export class CommentService implements CommentServiceInterface {
  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface,
    @inject(ContainerIoC.CommentModel)
    private commentModel: types.ModelType<CommentEntity>
  ) {}

  async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const record = await this.commentModel.create(dto);
    this.logger.info('Comment added');
    return record.populate(['userId']);
  }

  async show(
    movieId: string,
    limit: number
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ movieId })
      .sort({ createdAt: SortType.Desc })
      .limit(limit)
      .populate(['userId']);
  }

  async update(
    movieId: string,
    dto: Partial<UpdateCommentDto>
  ): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findByIdAndUpdate({ _id: movieId }, dto, {
      new: true,
    });
  }

  async delete(movieId: string): Promise<void> {
    const records = await this.commentModel.find({ movieId: movieId });
    for await (const record of records) {
      await this.update(record.id, { deleted: true });
    }
  }
}
