import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { FilmEntity } from '../movie/index.js';

export interface Comment extends defaultClasses.Base {}

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public text!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public published!: string;

  @prop({
    ref: FilmEntity,
    required: true,
  })
  public movieId!: Ref<FilmEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: false })
  public deleted!: boolean;
}

export const CommentModel = getModelForClass(CommentEntity);
