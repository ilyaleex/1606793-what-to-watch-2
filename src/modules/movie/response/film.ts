import { Expose, Type } from 'class-transformer';
import { UserResponse } from '../../user/response/index.js';

export class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public published!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public previewVideo!: string;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public isFavorite!: boolean;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: string;

  @Expose()
  public poster!: string;
}
