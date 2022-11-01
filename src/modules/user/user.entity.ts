import { UserInterface } from './contracts/index.js';
import { User } from '../../contracts/index.js';
import typegoose, {
  getModelForClass,
  defaultClasses,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/index.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity
  extends defaultClasses.TimeStamps
  implements UserInterface
{
  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true, default: '' })
  public password!: string;

  @prop({ default: '' })
  public avatar!: string;

  constructor(data: User) {
    super();

    const { name, email, avatar } = data;

    this.email = email;
    this.name = name;
    this.avatar = avatar;
  }

  setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  getPassword() {
    return this.password;
  }

  verifyPassword(password: string, salt: string): boolean {
    return createSHA256(password, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
