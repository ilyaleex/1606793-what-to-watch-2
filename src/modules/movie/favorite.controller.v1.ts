import * as core from 'express-serve-static-core';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContainerIoC } from '../../constants/index.js';
import { LoggerInterface } from '../../contracts/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { HttpMethod } from '../../constants/index.js';
import { FilmServiceInterface } from './contracts/index.js';
import { ConfigInterface } from '../../services/config/contracts/index.js';
import { ChangeFavoriteStatusDto } from './dto/index.js';
import { processDto } from '../../utils/index.js';
import { FilmResponse, FilmDetailsResponse } from './response/index.js';
import {
  ValidateObjectIdMiddleware,
  ValidateObjectDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../middlewares/index.js';

export class FilmFavoriteController extends ControllerBase {
  constructor(
    @inject(ContainerIoC.LoggerInterface) logger: LoggerInterface,
    @inject(ContainerIoC.ConfigInterface) configService: ConfigInterface,
    @inject(ContainerIoC.FilmService) private filmService: FilmServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register route for FilmFavoriteController');

    this.registerRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new ValidateObjectDtoMiddleware(ChangeFavoriteStatusDto),
        new PrivateRouteMiddleware(),
      ],
    });
  }

  async show(_req: Request, res: Response) {
    const records = await this.filmService.getFavorites();
    this.send(res, StatusCodes.OK, processDto(FilmResponse, records));
  }

  async update(
    req: Request<
      core.ParamsDictionary | { movieId: string },
      Record<string, unknown>,
      ChangeFavoriteStatusDto
    >,
    res: Response
  ) {
    const {
      params: { movieId },
      body: { isFavorite },
    } = req;
    const record = await this.filmService.changeFavoriteStatus(
      movieId,
      isFavorite
    );

    this.send(res, StatusCodes.OK, processDto(FilmDetailsResponse, record));
  }
}
