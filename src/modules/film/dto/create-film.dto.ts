import {Genre} from '../../../types/genre.enum';

export default class CreateFilmDto {
  public name!: string;
  public description!: string;
  public postDate!: Date;
  public type!: Genre;
  public year!: number;
  public rating!: number;
  public previewVideoLink!: string;
  public videoLink!: string;
  public starring!: string[];
  public director!: string;
  public runTime!: number;
  public commentsCount!: number;
  public userId!: string;
  public posterImage!: string;
  public bgImage!: string;
  public bgColor!: string;
}

