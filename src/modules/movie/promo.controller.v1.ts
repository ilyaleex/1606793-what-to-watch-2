import { inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContainerIoC } from '../../constants/index.js';
import { LoggerInterface } from '../../contracts/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { HttpMethod } from '../../constants/index.js';
import { FilmServiceInterface } from './contracts/index.js';
import { ConfigInterface } from '../../services/config/contracts/index.js';
import { processDto } from '../../utils/index.js';
import { FilmDetailsResponse } from './response/index.js';

export class FilmPromoController extends ControllerBase {
  constructor(
    @inject(ContainerIoC.LoggerInterface) logger: LoggerInterface,
    @inject(ContainerIoC.FilmService) private filmService: FilmServiceInterface,
    @inject(ContainerIoC.ConfigInterface) configService: ConfigInterface
  ) {
    super(logger, configService);

    this.logger.info('Register route for FilmFavoriteController');

    this.registerRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.show,
    });
  }

  async show(_req: Request, res: Response) {
    const record = await this.filmService.getPromo();
    this.send(res, StatusCodes.OK, processDto(FilmDetailsResponse, record));
  }
}
