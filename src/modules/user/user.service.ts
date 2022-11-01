import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerInterface } from '../../contracts/index.js';
import { UserServiceInterface } from './contracts/index.js';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/index.js';
import { UserEntity } from './user.entity.js';
import { ContainerIoC } from '../../constants/index.js';
import { DEFAULT_AVATAR } from './constants/index.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface,
    @inject(ContainerIoC.UserModel)
    private userModel: types.ModelType<UserEntity>
  ) {}

  async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const { password } = dto;
    const user = new UserEntity({ ...dto, avatar: DEFAULT_AVATAR });
    user.setPassword(password, salt);

    const record = await this.userModel.create(user);

    this.logger.info(`New user created: ${record.email}`);

    return record;
  }

  async update(
    userId: string,
    dto: UpdateUserDto
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(
      { _id: userId },
      {
        avatar: dto.avatar,
      },
      {
        new: true,
      }
    );
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const { email } = dto;
    const existingUser = await this.findByEmail(email);
    return existingUser ?? this.create(dto, salt);
  }

  async isExists(documentId: string): Promise<boolean> {
    return !!(await this.userModel.exists({ _id: documentId, deleted: false }));
  }

  async verifyUser(
    dto: LoginUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity> | null> {
    const { email, password } = dto;
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!user.verifyPassword(password, salt)) {
      return null;
    }

    return user;
  }
}
