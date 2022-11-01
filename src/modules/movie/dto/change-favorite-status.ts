import { IsEnum } from 'class-validator';
import { Favorite } from '../constants/index.js';

export class ChangeFavoriteStatusDto {
  @IsEnum(Favorite, { message: 'Invalid passed value' })
  public isFavorite!: Favorite;
}
