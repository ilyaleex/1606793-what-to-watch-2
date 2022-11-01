import {
  Length,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Genre } from '../../../contracts/index.js';
import {
  NAME_LENGTH,
  DESCRIPTION_LENGTH,
  DIRECTOR_NAME_LENGTH,
} from '../constants/index.js';

export class CreateFilmDto {
  @IsString({ message: 'name is required' })
  @Length(NAME_LENGTH.MIN, NAME_LENGTH.MAX, {
    message: 'name field must be from 2 to 100 symbols length',
  })
  public name!: string;

  @IsString({ message: 'description is required' })
  @Length(DESCRIPTION_LENGTH.MIN, DESCRIPTION_LENGTH.MAX, {
    message: 'description field must be from 20 to 1024 symbols length',
  })
  public description!: string;

  @IsDateString({ message: 'published must have a valid format' })
  public published!: string;

  @IsEnum(Genre, { message: 'Invalid passed genre' })
  public genre!: string;

  @IsNumber({}, { message: 'releaseDate must be number' })
  public releaseDate!: number;

  @IsString({ message: 'video is required' })
  public video!: string;

  @IsString({ message: 'previewVideo is required' })
  public previewVideo!: string;

  @IsArray({ message: 'actors must be array of string' })
  public actors!: string[];

  @IsString({ message: 'director is required' })
  @Length(DIRECTOR_NAME_LENGTH.MIN, DIRECTOR_NAME_LENGTH.MAX, {
    message: 'director field must be from 20 to 1024 symbols length',
  })
  public director!: string;

  @IsNumber({}, { message: 'duration is required' })
  public duration!: number;

  @IsString({ message: 'poster is required' })
  public poster!: string;

  @IsString({ message: 'poster is required' })
  public backgroundUrl!: string;

  @IsString({ message: 'poster is required' })
  public backgroundColor!: string;

  @IsOptional()
  @IsBoolean({ message: 'deleted field has not boolean value' })
  public deleted?: boolean;

  @IsOptional()
  @IsMongoId({ message: 'userId field must be a valid id' })
  public userId?: string;
}
