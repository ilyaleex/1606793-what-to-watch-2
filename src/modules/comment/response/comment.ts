import { Expose, Type } from 'class-transformer';
import { UserResponse } from '../../user/response/index.js';

export class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public published!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public author!: {
    name: string;
    email: string;
    avatar: string;
  };
}
