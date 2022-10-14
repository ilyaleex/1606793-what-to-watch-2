import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types';
import {FilmEntity} from './film.entity';
import {DocumentType, types} from '@typegoose/typegoose';
import CreateFilmDto from './dto/create-film.dto';
import {LoggerInterface} from '../../common/logger/logger.interface';
import {FilmServiceInterface} from './film-service.interface';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.name}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findById(filmId).exec();
  }
}
