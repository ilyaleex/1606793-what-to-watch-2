import {IsMongoId, IsNumber, Max, MaxLength, MinLength} from 'class-validator';

export default class CreateCommentDto {
  @MinLength(5, {message: 'Minimum title length must be 2'})
  @MaxLength(1024, {message: 'Maximum title length must be 100'})
  public text!: string;

  @IsNumber({},{message: 'rating must be a number'})
  @Max(10, {})
  public rating!: number;

  public userId!: string;

  @IsMongoId({message: 'filmId field must be valid an id'})
  public filmId!: string;
}

