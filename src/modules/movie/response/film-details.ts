import { Expose, Type } from 'class-transformer';
import { UserResponse } from '../../user/response/index.js';

export class FilmDetailsResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public published!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public releaseDate!: string;

  @Expose()
  public video!: string;

  @Expose()
  public previewVideo!: string;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public actors!: string;

  @Expose()
  public director!: string;

  @Expose()
  public duration!: number;

  @Expose()
  public isFavorite!: boolean;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: string;

  @Expose()
  public poster!: string;

  @Expose()
  public backgroundUrl!: string;

  @Expose()
  public backgroundColor!: string;
}
