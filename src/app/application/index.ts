import 'reflect-metadata';
import cors from 'cors';
import express, { Express } from 'express';
import { injectable, inject } from 'inversify';
import { LoggerInterface } from '../../contracts/index.js';
import { ConfigInterface } from '../../services/config/contracts/index.js';
import { DatabaseInterface } from '../../services/database/contracts/index.js';
import { ControllerInterface } from '../../services/controller/contracts/index.js';
import { ExceptionFilterInterface } from '../../services/error/index.js';
import { ContainerIoC, Route } from '../../constants/index.js';
import { getUri } from '../../services/database/utils/index.js';
import { AuthenticationMiddleware } from '../../middlewares/index.js';

@injectable()
export class Application {
  private express: Express;

  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface,
    @inject(ContainerIoC.ConfigInterface) private config: ConfigInterface,
    @inject(ContainerIoC.DatabaseInterface) private db: DatabaseInterface,
    @inject(ContainerIoC.UserController)
    private userController: ControllerInterface,
    @inject(ContainerIoC.ExceptionFilter)
    private exceptionFilter: ExceptionFilterInterface,
    @inject(ContainerIoC.CommentController)
    private commentController: ControllerInterface,
    @inject(ContainerIoC.FilmController)
    private filmController: ControllerInterface,
    @inject(ContainerIoC.FilmFavoriteController)
    private filmFavoriteController: ControllerInterface,
    @inject(ContainerIoC.FilmPromoController)
    private filmPromoController: ControllerInterface
  ) {
    this.express = express();
  }

  async init() {
    this.logger.info('Application inintializing...');

    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } =
      this.config.getFullSchema();
    const url = getUri(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME);

    await this.db.connect(url);

    await this.startServer();
  }

  private async startServer() {
    this.initMiddlewares();
    this.initRoutes();
    this.initExceptionFilter();
    this.express.listen(this.config.get('PORT'));

    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`
    );
  }

  private async initMiddlewares() {
    const authMiddleware = new AuthenticationMiddleware(
      this.config.get('SECRET_JWT')
    );
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(authMiddleware.execute.bind(authMiddleware));
    this.express.use(
      '/upload',
      express.static(this.config.get('UPLOAD_FILES_DIRECTORY'))
    );
    this.express.use(
      '/static',
      express.static(this.config.get('STATIC_FILES_DIRECTORY'))
    );
  }

  private initRoutes() {
    this.express.use(
      this.getUrlWithApiVersions(Route.Users),
      this.userController.router
    );
    this.express.use(
      this.getUrlWithApiVersions(Route.Comments),
      this.commentController.router
    );

    this.express.use(
      this.getUrlWithApiVersions(Route.Movies),
      this.filmController.router
    );

    this.express.use(
      this.getUrlWithApiVersions(Route.Favorite),
      this.filmFavoriteController.router
    );

    this.express.use(
      this.getUrlWithApiVersions(Route.Promo),
      this.filmPromoController.router
    );
  }

  private getUrlWithApiVersions(path: string) {
    const { API_PREFIX } = this.config.getFullSchema();
    return `${API_PREFIX}/${path}`.replace(/\/{2,}/g, '/');
  }

  private initExceptionFilter() {
    this.express.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }
}
