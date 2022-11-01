import { CreateCommentDto } from '../../dto/index.js';
import { NewReview } from '../../types/new-review';

export const adaptCommentForServer = (
  comment: NewReview
): CreateCommentDto => ({
  ...comment,
  text: comment.comment,
});
