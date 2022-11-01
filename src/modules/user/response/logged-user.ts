import { Expose } from 'class-transformer';

export class LoggedUserResponse {
  @Expose()
  public email!: string;

  @Expose()
  public token!: string;
}
