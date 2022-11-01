import * as core from 'express-serve-static-core';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContainerIoC } from '../../constants/index.js';
import { LoggerInterface, QueryParams } from '../../contracts/index.js';
import { CreateFilmDto } from './dto/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { HttpMethod } from '../../constants/index.js';
import { FilmServiceInterface } from './contracts/index.js';
import { ConfigInterface } from '../../services/config/contracts/index.js';
import { CommentServiceInterface } from '../comment/index.js';
import { processDto } from '../../utils/index.js';
import { FilmResponse, FilmDetailsResponse } from './response/index.js';
import {
  ValidateObjectIdMiddleware,
  EntityExistsMiddleware,
  ValidateObjectDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../middlewares/index.js';
import { HttpError } from '../../services/error/index.js';
import { DEFAULT_FILM_COUNT } from './constants/index.js';

export class FilmController extends ControllerBase {
  constructor(
    @inject(ContainerIoC.LoggerInterface) logger: LoggerInterface,
    @inject(ContainerIoC.FilmService) private filmService: FilmServiceInterface,
    @inject(ContainerIoC.ConfigInterface) configService: ConfigInterface,
    @inject(ContainerIoC.CommentService)
    private commentService: CommentServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register route for FilmController');

    this.registerRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.show,
    });

    this.registerRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectDtoMiddleware(CreateFilmDto),
        new PrivateRouteMiddleware(),
      ],
    });

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Get,
      handler: this.getDetails,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new EntityExistsMiddleware('movieId', this.filmService, 'Film service'),
      ],
    });

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new EntityExistsMiddleware('movieId', this.filmService, 'Film service'),
        new ValidateObjectDtoMiddleware(CreateFilmDto),
        new PrivateRouteMiddleware(),
      ],
    });

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new EntityExistsMiddleware('movieId', this.filmService, 'Film service'),
        new PrivateRouteMiddleware(),
      ],
    });
  }

  async show(
    req: Request<Record<string, unknown>, unknown, unknown, QueryParams>,
    res: Response
  ) {
    const { limit: queryLimit, genre } = req.query;
    const limit = queryLimit ?? DEFAULT_FILM_COUNT;
    const records = genre
      ? await this.filmService.getListByGenre(genre, limit)
      : await this.filmService.show(limit);

    this.send(res, StatusCodes.OK, processDto(FilmResponse, records));
  }

  async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateFilmDto
    >,
    res: Response
  ): Promise<void> {
    const {
      body,
      user: { id: userId },
    } = req;

    const record = await this.filmService.create({ ...body, userId });
    this.created(res, processDto(FilmDetailsResponse, record));
  }

  async getDetails(req: Request, res: Response) {
    const {
      params: { movieId },
    } = req;

    const record = await this.filmService.getFilmDetails(movieId);
    this.send(res, StatusCodes.OK, processDto(FilmDetailsResponse, record));
  }

  async update(
    req: Request<
      core.ParamsDictionary | { movieId: string },
      Record<string, unknown>,
      CreateFilmDto
    >,
    res: Response
  ) {
    const {
      body,
      params: { movieId },
      user: { id },
    } = req;
    const film = await this.filmService.getFilmByUserId(id);

    if (!film) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied',
        'UserController'
      );
    }

    const record = await this.filmService.update(movieId, body);
    this.send(res, StatusCodes.OK, processDto(FilmDetailsResponse, record));
  }

  async delete(req: Request, res: Response) {
    const {
      params: { movieId },
      user: { id },
    } = req;
    const film = await this.filmService.getFilmByUserId(id);

    if (!film) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Access denied',
        'UserController'
      );
    }

    await this.filmService.delete(movieId);
    await this.commentService.delete(movieId);

    this.noContent(res);
  }
}
