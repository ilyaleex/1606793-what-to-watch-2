import {Genre} from '../../../types/genre.enum.js';
import {IsArray, IsEnum, IsInt, IsMongoId, IsNumber, IsOptional, Max, MaxLength, MinLength} from 'class-validator';

export default class UpdateFilmDto {
  @IsOptional()
  @MinLength(2, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsEnum({Genre}, {message: 'genre must be one  of available genres'})
  public genre?: Genre;

  @IsOptional()
  @IsInt({message: 'Field released must be an integer'})
  public year?: number;

  @IsOptional()
  @IsNumber({},{message: 'rating must be a number'})
  @Max(10, {})
  public rating?: number;

  public previewVideoLink?: string;
  public videoLink?: string;

  @IsOptional()
  @IsArray({message: 'Field starring must be an array'})
  @IsMongoId({each: true, message: 'starring field must be an array'})
  public starring?: string[];

  @IsOptional()
  @MinLength(2, {message: 'Minimum director name length must be 2'})
  @MaxLength(100, {message: 'Maximum director name length must be 50'})
  public director?: string;

  @IsOptional()
  @IsNumber({},{message: 'runTime must be a number'})
  public runTime?: number;

  public posterImage?: string;
  public bgImage?: string;
  public bgColor?: string;
}

