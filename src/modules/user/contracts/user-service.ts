import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '../dto/index.js';
import { UserEntity } from '../user.entity.js';
import { EntityExistsInterface } from '../../../contracts/index.js';

interface UserServiceInterface extends EntityExistsInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  update(
    userId: string,
    dto: UpdateUserDto
  ): Promise<DocumentType<UserEntity> | null>;
  verifyUser(
    dto: LoginUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity> | null>;
}

export default UserServiceInterface;
