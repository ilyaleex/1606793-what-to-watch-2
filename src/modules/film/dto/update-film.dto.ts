import {Genre} from '../../../types/genre.enum';

export default class UpdateFilmDto {
  public name?: string;
  public description?: string;
  public type?: Genre;
  public year?: number;
  public rating?: number;
  public previewVideoLink?: string;
  public videoLink?: string;
  public starring?: string[];
  public director?: string;
  public runTime?: number;
  public posterImage?: string;
  public bgImage?: string;
  public bgColor?: string;
}

