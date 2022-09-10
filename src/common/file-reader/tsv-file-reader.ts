import {Film} from '../../types.js';
import {readFileSync} from 'fs';
import {FileReaderInterface} from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name,
        description,
        posted,
        genre,
        released,
        rating,
        previewVideoLink,
        videoLink,
        starring,
        director,
        runTime,
        commentsAmount,
        posterImage,
        backgroundImage,
        backgroundColor,
        userName,
        email,
        avatarUrl,
        password,
      ]) => ({
        name,
        description,
        posted: new Date(posted),
        genre,
        released: Number.parseInt(released, 10),
        rating: Number.parseFloat(rating),
        previewVideoLink,
        videoLink,
        starring: starring.split(','),
        director,
        runTime: Number.parseInt(runTime, 10),
        commentsAmount: Number.parseInt(commentsAmount, 10),
        user: {userName, email, avatarUrl, password},
        posterImage,
        backgroundImage,
        backgroundColor,
      }));
  }
}
