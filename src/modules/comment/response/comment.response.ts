import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response';
import {FilmResponse} from '../../film/response/film.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({name: 'createdAt'})
  public postDate!: string;

  @Expose({name: 'filmId'})
  @Type(() => FilmResponse)
  public film!: FilmResponse;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
