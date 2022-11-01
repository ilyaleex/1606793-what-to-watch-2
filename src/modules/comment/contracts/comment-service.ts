import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from '../comment.entity.js';
import { CreateCommentDto } from '../dto/index.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  show(movieId: string, limit: number): Promise<DocumentType<CommentEntity>[]>;
  update(
    movieId: string,
    dto: Partial<CreateCommentDto>
  ): Promise<DocumentType<CommentEntity> | null>;
  delete(movieId: string): Promise<void>;
}
