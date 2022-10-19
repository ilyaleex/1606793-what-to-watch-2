import { DocumentType } from '@typegoose/typegoose';
import CreateCommentDto from './dto/create-comment.dto.js';
import {CommentEntity} from './comment.entity.js';

export interface CommentServiceInterface {
  create(filmId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[] | null>;
  findAllByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[] | null>;
  deleteAllByFilmId(filmId: string): Promise<void>;
}
