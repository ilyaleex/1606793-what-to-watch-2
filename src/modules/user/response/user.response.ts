import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public userName!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;
}
