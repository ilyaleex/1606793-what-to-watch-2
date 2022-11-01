import 'reflect-metadata';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { LoggerService } from './services/logger/index.js';
import { LoggerInterface } from './contracts/index.js';
import { ConfigService } from './services/config/index.js';
import { ConfigInterface } from './services/config/contracts/index.js';
import { Application } from './app/application/index.js';
import { DatabaseService } from './services/database/index.js';
import { DatabaseInterface } from './services/database/contracts/index.js';
import { ControllerInterface } from './services/controller/contracts/index.js';
import { ContainerIoC } from './constants/index.js';
import {
  UserService,
  UserServiceInterface,
  UserModel,
  UserEntity,
  UserController,
} from './modules/user/index.js';
import {
  FilmService,
  FilmServiceInterface,
  FilmController,
  FilmFavoriteController,
  FilmPromoController,
  FilmModel,
  FilmEntity,
} from './modules/movie/index.js';
import {
  CommentService,
  CommentServiceInterface,
  CommentModel,
  CommentEntity,
  CommentController,
} from './modules/comment/index.js';
import {
  ExceptionFilter,
  ExceptionFilterInterface,
} from './services/error/index.js';

const container = new Container();
container
  .bind<Application>(ContainerIoC.Application)
  .to(Application)
  .inSingletonScope();
container
  .bind<LoggerInterface>(ContainerIoC.LoggerInterface)
  .to(LoggerService)
  .inSingletonScope();
container
  .bind<ConfigInterface>(ContainerIoC.ConfigInterface)
  .to(ConfigService)
  .inSingletonScope();
container
  .bind<DatabaseInterface>(ContainerIoC.DatabaseInterface)
  .to(DatabaseService)
  .inSingletonScope();

container.bind<UserServiceInterface>(ContainerIoC.UserService).to(UserService);
container
  .bind<types.ModelType<UserEntity>>(ContainerIoC.UserModel)
  .toConstantValue(UserModel);
container
  .bind<ControllerInterface>(ContainerIoC.UserController)
  .to(UserController)
  .inSingletonScope();

container.bind<FilmServiceInterface>(ContainerIoC.FilmService).to(FilmService);
container
  .bind<types.ModelType<FilmEntity>>(ContainerIoC.FilmModel)
  .toConstantValue(FilmModel);
container
  .bind<ControllerInterface>(ContainerIoC.FilmController)
  .to(FilmController)
  .inSingletonScope();
container
  .bind<ControllerInterface>(ContainerIoC.FilmFavoriteController)
  .to(FilmFavoriteController)
  .inSingletonScope();
container
  .bind<ControllerInterface>(ContainerIoC.FilmPromoController)
  .to(FilmPromoController)
  .inSingletonScope();

container
  .bind<CommentServiceInterface>(ContainerIoC.CommentService)
  .to(CommentService);
container
  .bind<types.ModelType<CommentEntity>>(ContainerIoC.CommentModel)
  .toConstantValue(CommentModel);
container
  .bind<ControllerInterface>(ContainerIoC.CommentController)
  .to(CommentController)
  .inSingletonScope();

container
  .bind<ExceptionFilterInterface>(ContainerIoC.ExceptionFilter)
  .to(ExceptionFilter)
  .inSingletonScope();

const app = container.get<Application>(ContainerIoC.Application);

await app.init();
