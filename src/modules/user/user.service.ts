import {UserEntity} from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserServiceInterface} from './user-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import LoginUserDto from './dto/login-user.dto.js';
import {DEFAULT_AVATAR_FILE_NAME} from './user.const.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatarPath: DEFAULT_AVATAR_FILE_NAME});
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = await this.findByEmail(dto.email);
    return user ? user : this.create(dto, salt);
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const existingUser = await this.findByEmail(dto.email);

    if (!existingUser) {
      return null;
    }

    return existingUser.verifyPassword(dto.password, salt) ? existingUser : null;
  }
}
