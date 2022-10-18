import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
  collection: 'films'
  }
  })
export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public description!: string;

  @prop({required: true})
  public image!: string;

  @prop({required: true})
  public posted!: Date;

  @prop({required: true})
  public genre!: number;

  @prop({required: true})
  public released!: number;

  @prop({required: true})
  public rating!: number;

  @prop({required: true})
  public previewVideoLink!: string;

  @prop({required: true})
  public videoLink!: string;

  @prop({required: true})
  public starring!: string[];

  @prop({required: true})
  public director!: string;

  @prop({required: true})
  public runTime!: number;

  @prop({default: 0})
  public commentsAmount!: number;

  @prop({
    ref: UserEntity,
    required: true
    })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public posterImage!: string;

  @prop({required: true})
  public backgroundImage!: string;

  @prop({required: true})
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);

