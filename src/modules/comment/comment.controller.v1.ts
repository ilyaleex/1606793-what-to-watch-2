import * as core from 'express-serve-static-core';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContainerIoC } from '../../constants/index.js';
import { LoggerInterface } from '../../contracts/index.js';
import { ControllerBase } from '../../services/controller/index.js';
import { ConfigInterface } from '../../services/config/contracts/index.js';
import { HttpMethod } from '../../constants/index.js';
import { CommentServiceInterface } from './contracts/index.js';
import { FilmServiceInterface } from '../movie/index.js';
import { processDto } from '../../utils/index.js';
import { CommentResponse } from './response/index.js';
import {
  ValidateObjectIdMiddleware,
  EntityExistsMiddleware,
  ValidateObjectDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../middlewares/index.js';
import { CreateCommentDto } from './dto/index.js';
import { DEFAULT_COMMENT_COUNT } from './constants/index.js';

export class CommentController extends ControllerBase {
  constructor(
    @inject(ContainerIoC.LoggerInterface) logger: LoggerInterface,
    @inject(ContainerIoC.CommentService)
    private commentService: CommentServiceInterface,
    @inject(ContainerIoC.ConfigInterface) configService: ConfigInterface,
    @inject(ContainerIoC.FilmService) private filmService: FilmServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register route for CommentController');

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new EntityExistsMiddleware('movieId', this.filmService, 'Film service'),
      ],
    });

    this.registerRoute({
      path: '/:movieId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new EntityExistsMiddleware('movieId', this.filmService, 'Film service'),
        new ValidateObjectDtoMiddleware(CreateCommentDto),
        new PrivateRouteMiddleware(),
      ],
    });
  }

  async show(req: Request, res: Response) {
    const { movieId } = req.params;
    const comments = await this.commentService.show(
      movieId,
      DEFAULT_COMMENT_COUNT
    );
    this.send(res, StatusCodes.OK, processDto(CommentResponse, comments));
  }

  async create(
    req: Request<
      core.ParamsDictionary | { movieId: string },
      Record<string, unknown>,
      CreateCommentDto
    >,
    res: Response
  ) {
    const {
      params: { movieId },
      body: { text, rating },
      user: { id: userId },
    } = req;

    const commentRecord = await this.commentService.create({
      text,
      rating,
      published: new Date().toISOString(),
      userId,
      movieId,
    });
    await this.filmService.incrementCommentCount(movieId);

    this.created(res, processDto(CommentResponse, commentRecord));
  }
}
