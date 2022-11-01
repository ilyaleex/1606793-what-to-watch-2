import typegoose, {
  getModelForClass,
  defaultClasses,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

const { prop, modelOptions } = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'movies',
  },
})
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  @prop({ default: new Date().toISOString() })
  public published!: string;

  @prop({ required: true })
  public genre!: string;

  @prop({ required: true })
  public releaseDate!: string;

  @prop({ required: true })
  public video!: string;

  @prop({ required: true })
  public previewVideo!: string;

  @prop({ required: true })
  public actors!: string[];

  @prop({ required: true })
  public director!: string;

  @prop({ required: true })
  public duration!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({ required: true })
  public poster!: string;

  @prop({ required: true })
  public backgroundUrl!: string;

  @prop({ required: true })
  public backgroundColor!: string;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ default: false })
  public isPromo!: boolean;

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop({ default: false })
  public deleted!: boolean;
}

export const FilmModel = getModelForClass(FilmEntity);
