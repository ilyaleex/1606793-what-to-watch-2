import { Review } from '../../types/review.js';
import { CommentResponse } from '../../dto/index.js';

export const adaptCommentsForClient = (data: CommentResponse[]): Review[] =>
  data.map((item) => ({
    ...item,
    comment: item.text,
    date: item.published,
    user: {
      ...item.author,
    },
  }));
