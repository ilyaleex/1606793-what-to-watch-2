export default class CreateFilmDto {
  public name!: string;
  public description!: string;
  public posted!: Date;
  public genre!: string;
  public released!: number;
  public rating!: number;
  public previewVideoLink!: string;
  public videoLink!: string;
  public starring!: string[];
  public director!: string;
  public runTime!: number;
  public commentsAmount!: number;
  public userId!: string;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
}

