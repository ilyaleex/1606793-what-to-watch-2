export class CommentResponse {
  id!: string;
  text!: string;
  rating!: number;
  published!: string;
  author!: {
    name: string;
    email: string;
    avatar: string;
  };
}
