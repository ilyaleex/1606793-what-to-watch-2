import { Length, IsEmail, IsString } from 'class-validator';
import { USERNAME_LENGTH, PASSWORD_LENGTH } from '../constants/index.js';

export class CreateUserDto {
  @IsString({ message: 'name must be a string' })
  @Length(USERNAME_LENGTH.MIN, USERNAME_LENGTH.MAX, {
    message: 'name must be from 1 to 5 symbols length',
  })
  public name!: string;

  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be valid email address.' })
  public email!: string;

  @IsString({ message: 'password must be a string' })
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {
    message: 'password must be from 6 to 12 symbols length',
  })
  public password!: string;
}
