import {Genre} from '../../../types/genre.enum';
import {IsDateString, IsNumber, IsEnum, IsInt, MaxLength, MinLength, IsMongoId, Max, IsArray} from 'class-validator';

export default class CreateFilmDto {
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public name!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum({Genre}, {message: 'genre must be one  of available genres'})
  public genre!: Genre;

  @IsInt({message: 'Field released must be an integer'})
  public year!: number;

  @IsNumber({},{message: 'rating must be a number'})
  @Max(10, {})
  public rating!: number;

  public previewVideoLink!: string;
  public videoLink!: string;

  @IsArray({message: 'Field starring must be an array'})
  @IsMongoId({each: true, message: 'starring field must be an array'})
  public starring!: string[];

  @MinLength(2, {message: 'Minimum director name length must be 2'})
  @MaxLength(100, {message: 'Maximum director name length must be 50'})
  public director!: string;

  @IsNumber({},{message: 'runTime must be a number'})
  public runTime!: number;

  @IsNumber({},{message: 'commentsCount must be a number'})
  public commentsCount!: number;

  public userId!: string;

  public posterImage!: string;
  public bgImage!: string;
  public bgColor!: string;
}

