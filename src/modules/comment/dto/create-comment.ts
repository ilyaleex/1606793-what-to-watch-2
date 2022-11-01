import {
  Length,
  IsString,
  IsNumber,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DESCRIPTION_LENGTH } from '../constants/index.js';

export class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(DESCRIPTION_LENGTH.MIN, DESCRIPTION_LENGTH.MAX, {
    message: 'Text must be from 5 to 1024 symbols length',
  })
  public text!: string;

  @IsNumber({}, { message: 'rating is required' })
  @Min(1, { message: 'rating must not be less than 1' })
  @Max(10, { message: 'rating must not be greater than 10' })
  public rating!: number;

  @IsOptional()
  @IsMongoId({ message: 'userId field must be a valid id' })
  public movieId?: string;

  @IsOptional()
  @IsMongoId({ message: 'userId field must be a valid id' })
  public userId?: string;

  @IsOptional()
  @IsDateString({ message: 'Date must have a valid format' })
  public published?: string;
}
