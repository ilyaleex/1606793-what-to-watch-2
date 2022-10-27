import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public genre!: string;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public posterLink!: string;

  @Expose()
  public commentCount!: number;
}
