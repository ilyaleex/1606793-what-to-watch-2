import CreateUserDto from './dto/create-user.fto';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
