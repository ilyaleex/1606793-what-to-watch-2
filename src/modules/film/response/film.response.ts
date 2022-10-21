import {Expose} from 'class-transformer';

export class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public genre!: string;

  @Expose()
  public userId!: string;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public posterLink!: string;

  @Expose()
  public commentCount!: number;
}
