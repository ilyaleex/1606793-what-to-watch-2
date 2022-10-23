import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {FilmServiceInterface} from '../film/film-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware';

export type IndexParams = {
  filmId: string
}

export type CreateParams = {
  filmId: string
}

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });
  }

  public async create(
    {params}: Request<core.ParamsDictionary | CreateParams,
      Record<string, unknown>, CreateCommentDto>,
    res: Response,
  ): Promise<void> {

    const comment = await this.filmService.exists(params.filmId);
    this.send(res, StatusCodes.CREATED, fillDTO(CommentResponse, comment));
  }

  public async index(
    {params}: Request<core.ParamsDictionary | IndexParams>,
    res: Response,
  ): Promise<void> {

    const comments = await this.commentService.findByFilmId(params.filmId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
