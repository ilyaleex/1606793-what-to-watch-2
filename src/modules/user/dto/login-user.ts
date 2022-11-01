import { Length, IsEmail, IsString } from 'class-validator';
import { PASSWORD_LENGTH } from '../constants/index.js';

export class LoginUserDto {
  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be valid email address.' })
  public email!: string;

  @IsString({ message: 'password must be a string' })
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {
    message: 'password must be from 6 to 12 symbols length',
  })
  public password!: string;
}
