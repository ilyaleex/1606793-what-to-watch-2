import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {FilmEntity} from '../film/film.entity.js';
import {CommentLength} from './enums/comment-length.enum.js';
import {Rating} from './enums/rating.enum.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
  collection: 'comments'
  }
  })
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: CommentLength.Min, maxlength: CommentLength.Max })
  public text!: string;

  @prop({ required: true})
  public publishDate!: Date;

  @prop({ required: true, min: Rating.Min, max: Rating.Max })
  public rating!: number;

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ ref: FilmEntity, required: true })
  public filmId!: Ref<FilmEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);

