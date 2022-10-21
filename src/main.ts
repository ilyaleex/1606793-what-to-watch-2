import 'reflect-metadata';
import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';
import {Container} from 'inversify';
import {ConfigInterface} from './common/config/config.interface.js';
import {Component} from './types/component.types.js';
import {LoggerInterface} from './common/logger/logger.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import {DatabaseInterface} from './common/database-client/database.interface.js';
import UserService from './modules/user/user.service.js';
import {UserServiceInterface} from './modules/user/user-service.interface.js';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import {types} from '@typegoose/typegoose';
import {FilmEntity, FilmModel} from './modules/film/film.entity.js';
import {FilmServiceInterface} from './modules/film/film-service.interface.js';
import FilmService from './modules/film/film.service.js';
import CommentService from './modules/comment/comment.service.js';
import {CommentEntity, CommentModel} from './modules/comment/comment.entity';
import {CommentServiceInterface} from './modules/comment/comment-service.interface';
import {ControllerInterface} from './common/controller/controller.interface.js';
import FilmController from './modules/film/film.controller.js';
import {ExceptionFilterInterface} from './common/errors/exception-filter.interface.js';
import ExceptionFilter from './common/errors/exception.filter.js';
import UserController from './modules/user/user.controller.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<FilmServiceInterface>(Component.FilmServiceInterface).to(FilmService);
applicationContainer.bind<types.ModelType<FilmEntity>>(Component.FilmModel).toConstantValue(FilmModel);
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

applicationContainer.bind<ControllerInterface>(Component.CategoryController).to(FilmController).inSingletonScope();
applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
