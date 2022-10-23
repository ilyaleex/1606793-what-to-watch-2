import {User} from '../../types/types.js';
import typegoose, {defaultClasses, getModelForClass} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
  collection: 'users'
  }
  })
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: CreateUserDto) {
    super();

    this.userName = data.userName;
    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.password = data.password;
  }

  @prop({unique: true, required: true})
  public userName!: string;

  @prop({required: true})
  public email!: string;

  @prop({required: false})
  public avatarUrl: string;

  @prop({required: true})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const passwordHash = createSHA256(password, salt);
    return passwordHash === this.getPassword();
  }
}

export const UserModel = getModelForClass(UserEntity);
