export class CreateFilmDto {
  name!: string;
  description!: string;
  published!: string;
  genre!: string;
  releaseDate!: number;
  video!: string;
  previewVideo!: string;
  actors!: string[];
  director!: string;
  duration!: number;
  poster!: string;
  backgroundUrl!: string;
  backgroundColor!: string;
}
