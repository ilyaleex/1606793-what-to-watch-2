import { IsOptional, IsBoolean } from 'class-validator';
import { CreateCommentDto } from './create-comment.js';

export class UpdateCommentDto extends CreateCommentDto {
  @IsOptional()
  @IsBoolean({ message: 'deleted field has not boolean value' })
  public deleted?: boolean;
}
