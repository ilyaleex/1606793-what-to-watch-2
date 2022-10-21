import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose()
  public userName!: string ;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;
}
